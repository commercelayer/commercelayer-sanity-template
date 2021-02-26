/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 *
 */
"use strict";

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];
    return arr2;
  }
}

const nullthrows = require("nullthrows");

const generate = require("@babel/generator").default;
/* $FlowFixMe(>=0.99.0 site=react_native_fb) This comment suppresses an error
 * found when Flow v0.99 was deployed. To see the error, delete this comment
 * and run Flow. */

const template = require("@babel/template").default;
/* $FlowFixMe(>=0.99.0 site=react_native_fb) This comment suppresses an error
 * found when Flow v0.99 was deployed. To see the error, delete this comment
 * and run Flow. */

const traverse = require("@babel/traverse").default;

const types = require("@babel/types");

/**
 * Produces a Babel template that will throw at runtime when the require call
 * is reached. This makes dynamic require errors catchable by libraries that
 * want to use them.
 */
const dynamicRequireErrorTemplate = template(`
  (function(line) {
    throw new Error(
      'Dynamic require defined at line ' + line + '; not supported by Metro',
    );
  })(LINE)
`);
/**
 * Produces a Babel template that transforms an "import(...)" call into a
 * "require(...)" call to the asyncRequire specified.
 */

const makeAsyncRequireTemplate = template(`
  require(ASYNC_REQUIRE_MODULE_PATH)(MODULE_ID, MODULE_NAME)
`);
const makeAsyncPrefetchTemplate = template(`
  require(ASYNC_REQUIRE_MODULE_PATH).prefetch(MODULE_ID, MODULE_NAME)
`);
const makeJSResourceTemplate = template(`
  require(ASYNC_REQUIRE_MODULE_PATH).resource(MODULE_ID, MODULE_NAME)
`);
/**
 * Transform all the calls to `require()` and `import()` in a file into ID-
 * independent code, and return the list of dependencies. For example, a call
 * like `require('Foo')` could be transformed to `require(_depMap[3], 'Foo')`
 * where `_depMap` is provided by the outer scope. As such, we don't need to
 * know the actual module ID.
 *
 * The second argument is only provided for debugging purposes.
 */

function collectDependencies(ast, options) {
  const visited = new WeakSet();
  const state = {
    asyncRequireModulePathStringLiteral: null,
    dependency: 0,
    dependencyCalls: new Set(),
    dependencyData: new Map(),
    dependencyIndexes: new Map(),
    dependencyMapIdentifier: null,
    dynamicRequires: options.dynamicRequires,
    keepRequireNames: options.keepRequireNames,
    disableRequiresTransform: !!options.disableRequiresTransform,
    allowOptionalDependencies: options.allowOptionalDependencies
  };
  const visitor = {
    CallExpression(path, state) {
      if (visited.has(path.node)) {
        return;
      }

      const callee = path.get("callee");
      const name = callee.node.name;

      if (callee.isImport()) {
        processImportCall(path, state, {
          prefetchOnly: false
        });
        return;
      }

      if (name === "__prefetchImport" && !path.scope.getBinding(name)) {
        processImportCall(path, state, {
          prefetchOnly: true
        });
        return;
      }

      if (
        (name === "__jsResource" ||
          name === "__conditionallySplitJSResource") &&
        !path.scope.getBinding(name)
      ) {
        processImportCall(path, state, {
          prefetchOnly: false,
          jsResource: true
        });
        return;
      }

      if (state.dependencyCalls.has(name) && !path.scope.getBinding(name)) {
        visited.add(processRequireCall(path, state).node);
      }
    },

    ImportDeclaration: collectImports,
    ExportNamedDeclaration: collectImports,
    ExportAllDeclaration: collectImports,

    Program(path, state) {
      state.asyncRequireModulePathStringLiteral = types.stringLiteral(
        options.asyncRequireModulePath
      );
      state.dependencyMapIdentifier = path.scope.generateUidIdentifier(
        "dependencyMap"
      );
      state.dependencyCalls = new Set(
        ["require"].concat(_toConsumableArray(options.inlineableCalls))
      );
    }
  };
  traverse(ast, visitor, null, state); // Compute the list of dependencies.

  const dependencies = new Array(state.dependency);

  for (const _ref of state.dependencyData) {
    var _ref2 = _slicedToArray(_ref, 2);

    const name = _ref2[0];
    const data = _ref2[1];
    dependencies[nullthrows(state.dependencyIndexes.get(name))] = {
      name,
      data
    };
  }

  return {
    ast,
    dependencies,
    dependencyMapName: nullthrows(state.dependencyMapIdentifier).name
  };
}

function collectImports(path, state) {
  if (path.node.source) {
    const dep = getDependency(
      state,
      path.node.source.value,
      {
        prefetchOnly: false
      },
      path.node.loc
    );
    dep.data.isAsync = false;
  }
}

function processImportCall(path, state, opts) {
  const name = getModuleNameFromCallArgs(path);

  if (name == null) {
    throw new InvalidRequireCallError(path);
  }

  const options = _objectSpread({}, opts, {
    isOptional: isOptionalDependency(name, path, state)
  });

  const dep = getDependency(state, name, options, path.node.loc);

  if (!options.prefetchOnly) {
    delete dep.data.isPrefetchOnly;
  }

  if (state.disableRequiresTransform) {
    return path;
  }

  const ASYNC_REQUIRE_MODULE_PATH = state.asyncRequireModulePathStringLiteral;
  const MODULE_ID = types.memberExpression(
    state.dependencyMapIdentifier,
    types.numericLiteral(dep.index),
    true
  );
  const MODULE_NAME = types.stringLiteral(name);

  if (options.jsResource) {
    path.replaceWith(
      makeJSResourceTemplate({
        ASYNC_REQUIRE_MODULE_PATH,
        MODULE_ID,
        MODULE_NAME
      })
    );
  } else if (!options.prefetchOnly) {
    path.replaceWith(
      makeAsyncRequireTemplate({
        ASYNC_REQUIRE_MODULE_PATH,
        MODULE_ID,
        MODULE_NAME
      })
    );
  } else {
    path.replaceWith(
      makeAsyncPrefetchTemplate({
        ASYNC_REQUIRE_MODULE_PATH,
        MODULE_ID,
        MODULE_NAME
      })
    );
  }

  return path;
}

function processRequireCall(path, state) {
  const name = getModuleNameFromCallArgs(path);

  if (name == null) {
    if (state.dynamicRequires === "reject") {
      throw new InvalidRequireCallError(path);
    }

    path.replaceWith(
      dynamicRequireErrorTemplate({
        LINE: "" + path.node.loc.start.line
      })
    );
    return path;
  }

  const dep = getDependency(
    state,
    name,
    {
      prefetchOnly: false,
      isOptional: isOptionalDependency(name, path, state)
    },
    path.node.loc
  );
  dep.data.isAsync = false;
  delete dep.data.isPrefetchOnly;

  if (state.disableRequiresTransform) {
    return path;
  }

  const moduleIDExpression = types.memberExpression(
    state.dependencyMapIdentifier,
    types.numericLiteral(dep.index),
    true
  );
  path.node.arguments = state.keepRequireNames
    ? [moduleIDExpression, types.stringLiteral(name)]
    : [moduleIDExpression];
  return path;
}

function getDependency(state, name, options, loc) {
  let index = state.dependencyIndexes.get(name);
  let data = state.dependencyData.get(name);

  if (!data) {
    index = state.dependency++;
    data = {
      isAsync: true,
      locs: []
    };

    if (options.prefetchOnly) {
      data.isPrefetchOnly = true;
    }

    if (options.isOptional) {
      data.isOptional = true;
    }

    state.dependencyIndexes.set(name, index);
    state.dependencyData.set(name, data);
  }

  if (loc != null) {
    data.locs.push(loc);
  }

  return {
    index: nullthrows(index),
    data: nullthrows(data)
  };
}

const isOptionalDependency = (name, path, state) => {
  const allowOptionalDependencies = state.allowOptionalDependencies;

  const isExcluded = () =>
    Array.isArray(allowOptionalDependencies.exclude) &&
    allowOptionalDependencies.exclude.includes(name);

  if (!allowOptionalDependencies || isExcluded()) {
    return false;
  } // Valid statement stack for single-level try-block: expressionStatement -> blockStatement -> tryStatement

  let sCount = 0;
  let p = path;

  while (p && sCount < 3) {
    if (p.isStatement()) {
      if (p.node.type === "BlockStatement") {
        // A single-level should have the tryStatement immediately followed BlockStatement
        // with the key 'block' to distinguish from the finally block, which has key = 'finalizer'
        return p.parentPath.node.type === "TryStatement" && p.key === "block";
      }

      sCount += 1;
    }

    p = p.parentPath;
  }

  return false;
};

function getModuleNameFromCallArgs(path) {
  const expectedCount =
    path.node.callee.name === "__conditionallySplitJSResource" ? 2 : 1;

  if (path.get("arguments").length !== expectedCount) {
    throw new InvalidRequireCallError(path);
  }

  const result = path.get("arguments.0").evaluate();

  if (result.confident && typeof result.value === "string") {
    return result.value;
  }

  return null;
}

collectDependencies.getModuleNameFromCallArgs = getModuleNameFromCallArgs;

class InvalidRequireCallError extends Error {
  constructor(_ref3) {
    let node = _ref3.node;
    const line = node.loc && node.loc.start && node.loc.start.line;
    super(
      `Invalid call at line ${line || "<unknown>"}: ${generate(node).code}`
    );
  }
}

collectDependencies.InvalidRequireCallError = InvalidRequireCallError;
module.exports = collectDependencies;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */
"use strict";

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

const HasteFS = require("./HasteFS");

const Module = require("./Module");

const ModuleCache = require("./ModuleCache");

const defaults = require("metro-config/src/defaults/defaults");

const parsePlatformFilePath = require("../../node-haste/lib/parsePlatformFilePath");

const path = require("path");

const _require = require("../../node-haste/DependencyGraph/ModuleResolution"),
  ModuleResolver = _require.ModuleResolver;

const _require2 = require("jest-haste-map"),
  ModuleMap = _require2.ModuleMap;

const platforms = new Set(defaults.platforms);
const GENERIC_PLATFORM = "g";
const PACKAGE_JSON = path.sep + "package.json";
const NULL_MODULE = {
  path: "/",

  getPackage() {},

  isHaste() {
    throw new Error("not implemented");
  },

  getName() {
    throw new Error("not implemented");
  }
};
const NODE_MODULES = path.sep + "node_modules" + path.sep;

const isNodeModules = file => file.includes(NODE_MODULES); // This function maps the ModuleGraph data structure to jest-haste-map's ModuleMap

const createModuleMap = _ref => {
  let files = _ref.files,
    moduleCache = _ref.moduleCache,
    sourceExts = _ref.sourceExts;
  const map = new Map();
  files.forEach(filePath => {
    if (isNodeModules(filePath)) {
      return;
    }

    let id;
    let module;

    if (filePath.endsWith(PACKAGE_JSON)) {
      module = moduleCache.getPackage(filePath);
      id = module.data.name;
    } else if (sourceExts.indexOf(path.extname(filePath).substr(1)) !== -1) {
      module = moduleCache.getModule(filePath);
      id = module.name;
    }

    if (!(id && module && module.isHaste())) {
      return;
    }

    const mapModule = map.get(id) || Object.create(null);
    const platform =
      parsePlatformFilePath(filePath, platforms).platform || GENERIC_PLATFORM;
    const existingModule = mapModule[platform]; // 0 = Module, 1 = Package in jest-haste-map

    mapModule[platform] = [filePath, module.type === "Package" ? 1 : 0];

    if (existingModule && existingModule[0] !== filePath) {
      throw new Error(
        [
          "@providesModule naming collision:",
          `  Duplicate module name: \`${id}\``,
          `  Paths: \`${filePath}\` collides with \`${existingModule[0]}\``,
          "",
          "This error is caused by a @providesModule declaration " +
            "with the same name across two different files."
        ].join("\n")
      );
    }

    map.set(id, mapModule);
  });
  return map;
};

exports.createResolveFn = function(options) {
  const assetExts = options.assetExts,
    assetResolutions = options.assetResolutions,
    extraNodeModules = options.extraNodeModules,
    transformedFiles = options.transformedFiles,
    sourceExts = options.sourceExts,
    platform = options.platform;
  const files = Object.keys(transformedFiles);

  function getTransformedFile(path) {
    const result = transformedFiles[path];

    if (!result) {
      throw new Error(`"${path} does not exist`);
    }

    return result;
  }

  const hasteFS = new HasteFS(files);
  const moduleCache = new ModuleCache(
    filePath => hasteFS.closest(filePath, "package.json"),
    getTransformedFile
  );
  const assetExtensions = new Set(assetExts.map(asset => "." + asset));

  const isAssetFile = file => assetExtensions.has(path.extname(file));

  const moduleResolver = new ModuleResolver({
    dirExists: filePath => hasteFS.dirExists(filePath),
    doesFileExist: filePath => hasteFS.exists(filePath),
    extraNodeModules,
    isAssetFile,
    mainFields: options.mainFields,
    // $FlowFixMe -- error revealed by types-first codemod
    moduleCache,
    moduleMap: new ModuleMap({
      duplicates: new Map(),
      map: createModuleMap({
        files,
        moduleCache,
        sourceExts
      }),
      mocks: new Map(),
      rootDir: ""
    }),
    preferNativePlatform: true,
    projectRoot: "",
    resolveAsset: (dirPath, assetName, extension) => {
      const basePath = dirPath + path.sep + assetName;
      const assets = [basePath + extension]
        .concat(
          _toConsumableArray(
            assetResolutions.map(
              resolution => basePath + "@" + resolution + "x" + extension
            )
          )
        )
        .filter(candidate => hasteFS.exists(candidate));
      return assets.length ? assets : null;
    },
    resolveRequest: options.resolveRequest,
    sourceExts
  });
  return (id, sourcePath) => {
    const from =
      sourcePath != null
        ? new Module(sourcePath, moduleCache, getTransformedFile(sourcePath))
        : NULL_MODULE;
    const allowHaste = !isNodeModules(from.path); // $FlowFixMe -- error revealed by types-first codemod

    return moduleResolver.resolveDependency(from, id, allowHaste, platform)
      .path;
  };
};

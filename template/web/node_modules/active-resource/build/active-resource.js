(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios'), require('es6-promise'), require('qs'), require('underscore'), require('underscore.string'), require('underscore.inflection')) :
  typeof define === 'function' && define.amd ? define(['axios', 'es6-promise', 'qs', 'underscore', 'underscore.string', 'underscore.inflection'], factory) :
  (global.ActiveResource = factory(global.axios,global.es6Promise,global.Qs,global._,global.s));
}(this, (function (axios,es6Promise,Qs,_,s) { 'use strict';

  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;
  es6Promise = es6Promise && es6Promise.hasOwnProperty('default') ? es6Promise['default'] : es6Promise;
  Qs = Qs && Qs.hasOwnProperty('default') ? Qs['default'] : Qs;
  _ = _ && _.hasOwnProperty('default') ? _['default'] : _;
  s = s && s.hasOwnProperty('default') ? s['default'] : s;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var ActiveResource;
  if (!((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined')) {
    window.Promise = es6Promise.Promise;
  }

  var activeResource = ActiveResource = function ActiveResource() {
    _classCallCheck(this, ActiveResource);
  };
  (function () {
    // Extends a klass with a mixin's members, so the klass itself will have those members
    // @param [Class] klass the object to extend the mixin into
    // @param [Class,Object] mixin the methods/members to extend into the obj
    // @param [Boolean] overwrite overwrite the methods in mixin already on klass
    ActiveResource.extend = function (klass, mixin) {
      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return Object.getOwnPropertyNames(mixin).filter(function (name) {
        return ['arguments', 'caller', 'length', 'name', 'prototype'].indexOf(name) < 0;
      }).forEach(function (name) {
        var method;
        method = mixin[name];

        if (!(!overwrite && klass[name] || method.__excludeFromExtend)) {
          return klass[name] = method;
        }
      });
    }; // Adds a mixin's members to a klass prototype, so instances of that klass will
    // have those members
    // @param [Class] klass the klass to include mixin members in when instantiated
    // @param [Class,Object] mixin the methods/members to include into the klass instances
    // @param [Boolean] overwrite overwrite the methods in mixin already on klass


    ActiveResource.include = function (klass, mixin) {
      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this.extend(klass.prototype, mixin, overwrite);
    };
  }).call(undefined);
  (function () {
    // Provides support methods for determing the type (also known as klass) of different objects in
    // the ActiveResource framework
    ActiveResource.prototype.Typing = function () {
      var getPrototypeOf$$1;

      var Typing =
      /*#__PURE__*/
      function () {
        function Typing() {
          _classCallCheck(this, Typing);
        }

        _createClass(Typing, null, [{
          key: "klass",
          // Returns the class of the object
          // @return [Class] the class for the object
          value: function klass() {
            return this.constructor;
          } // Determines if this object is of type `klass`
          // @return [Boolean] whether or not the object is of type klass

        }, {
          key: "isA",
          value: function isA(klass) {
            var match, object;
            object = this.constructor;
            match = object === klass;

            while (!(match || (object = getPrototypeOf$$1(object)) == null)) {
              match = object === klass;
            }

            return match;
          }
        }]);

        return Typing;
      }();

      

      getPrototypeOf$$1 = function getPrototypeOf$$1(o) {
        var _getPrototypeOf$$1;

        _getPrototypeOf$$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf$$1(o);
      };

      return Typing;
    }.call(this);
  }).call(undefined);
  (function () {
    // Creates a library that holds resources classes
    // @param [String] baseUrl the base url for the resource server
    // @option [Object] headers the headers to send with each request made in this library
    // @option [Interface] interface the interface to use when making requests and building responses
    // @option [Object] constantizeScope the scope to use when calling #constantize
    // @option [Boolean] immutable if true, resources will act as immutable structures
    // @option [Boolean] includePolymorphicRepeats if true, primary data’s relationships will send polymorphic owner data to
    //   the server despite that data also being the primary data (a repetition, some servers don't make the assumption)
    // @option [Boolean] strictAttributes if true, only attributes defined in a class via the static attributes method will
    //   be returned from resource.attributes()
    // @return [ResourceLibrary] the created resource library
    ActiveResource.createResourceLibrary = function (baseUrl) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var ResourceLibrary, _interface, library;

      _interface = options.interface || ActiveResource.Interfaces.JsonApi;

      library = ResourceLibrary =
      /*#__PURE__*/
      function () {
        function ResourceLibrary() {
          var _this2 = this;

          _classCallCheck(this, ResourceLibrary);

          var Base, base, resourceLibrary;
          Object.defineProperties(this, {
            headers: {
              get: function get$$1() {
                return _this2._headers;
              },
              set: function set(value) {
                _this2._headers = value;
                return _this2.interface = new _interface(_this2);
              }
            }
          });
          this.baseUrl = baseUrl.charAt(baseUrl.length - 1) === '/' ? baseUrl : "".concat(baseUrl, "/");
          this._headers = options.headers;
          this.interface = new _interface(this);
          this.constantizeScope = options['constantizeScope'];
          this.immutable = options.immutable;
          this.includePolymorphicRepeats = options.includePolymorphicRepeats;
          this.strictAttributes = options.strictAttributes;
          base = this.immutable ? ActiveResource.prototype.Immutable.prototype.Base : ActiveResource.prototype.Base;
          resourceLibrary = this;

          this.Base = Base = function () {
            var Base =
            /*#__PURE__*/
            function (_base) {
              _inherits(Base, _base);

              function Base() {
                _classCallCheck(this, Base);

                return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
              }

              return Base;
            }(base);

            
            Base.resourceLibrary = resourceLibrary;
            return Base;
          }.call(this);
        } // Constantizes a className string into an actual ActiveResource::Base class
        // @note If constantizeScope is null, checks the property on the resource library
        // @note Throws exception if klass cannot be found
        // @param [String] className the class name to look for a constant with
        // @return [Class] the class constant corresponding to the name provided


        _createClass(ResourceLibrary, [{
          key: "constantize",
          value: function constantize(className) {
            var i, klass, len, scope, v;
            klass = null;

            if (!_.isUndefined(className) && !_.isNull(className)) {
              scope = this.constantizeScope && _.values(this.constantizeScope) || _.values(this);

              for (i = 0, len = scope.length; i < len; i++) {
                v = scope[i];

                if (_.isObject(v) && v.className === className) {
                  klass = v;
                }
              }
            }

            if (klass == null) {
              throw "NameError: klass ".concat(className, " does not exist");
            }

            return klass;
          } // Creates an ActiveResource::Base class from klass provided
          // @param [Class] klass the klass to create into an ActiveResource::Base class in the library
          // @return [Class] the klass now inheriting from ActiveResource::Base

        }, {
          key: "createResource",
          value: function createResource(klass) {
            klass.className || (klass.className = klass.name);
            klass.queryName || (klass.queryName = _.pluralize(s.underscored(klass.className)));

            if (typeof klass.define === "function") {
              klass.define();
            }

            (this.constantizeScope || this)[klass.className] = klass;
            return klass;
          }
        }]);

        return ResourceLibrary;
      }();

      return new library();
    };
  }).call(undefined);
  (function () {
    // Abstract class for defining an interface between a server and ActiveResource
    // TODO: Ensure contentType is consistent in requests/responses
    ActiveResource.Interfaces = ActiveResource.prototype.Interfaces = function () {
      var Interfaces = function Interfaces() {
        _classCallCheck(this, Interfaces);
      };

      

      Interfaces.prototype.Base = function () {
        var Base =
        /*#__PURE__*/
        function () {
          function Base(resourceLibrary) {
            _classCallCheck(this, Base);

            this.resourceLibrary = resourceLibrary;
            this.axios = axios.create({
              headers: _.extend(_.clone(this.resourceLibrary.headers || {}), {
                'Content-Type': this.constructor.contentType
              })
            });
            this.axios.interceptors.response.use(function (config) {
              return config;
            }, function (error) {
              if (error.response.status === 408 || error.code === 'ECONNABORTED') {
                return Promise.reject({
                  response: {
                    data: {
                      errors: [{
                        code: 'timeout',
                        detail: "Timeout occurred while loading ".concat(error.config.url)
                      }]
                    }
                  }
                });
              } else {
                return Promise.reject(error);
              }
            });
          }

          _createClass(Base, [{
            key: "request",
            value: function request(url, method, data) {
              var options;
              options = {
                responseType: 'json',
                method: method,
                url: url
              };

              if (method === 'GET') {
                options.params = data;

                options.paramsSerializer = function (params) {
                  return Qs.stringify(params, {
                    arrayFormat: 'brackets'
                  });
                };
              } else {
                options.data = data;
              }

              return this.axios.request(options);
            } // Make GET request
            // @param [String] url the url to query
            // @param [Object] queryParams query params to send to the server

          }, {
            key: "get",
            value: function get$$1(url, queryParams) {
              throw '#get not implemented on base interface';
            } // Make POST request
            // @param [String] url the url to query
            // @param [Object] resourceData the resourceData to send to the server
            // @param [Object] options options that may modify the data sent to the server

          }, {
            key: "post",
            value: function post(url, resourceData, options) {
              throw '#post not implemented on base interface';
            } // Make PATCH request
            // @param [String] url the url to query
            // @param [Object] resourceData the resourceData to send to the server
            // @param [Object] options options that may modify the data sent to the server

          }, {
            key: "patch",
            value: function patch(url, resourceData, options) {
              throw '#patch not implemented on base interface';
            } // Make PUT request
            // @param [String] url the url to query
            // @param [Object] resourceData the resourceData to send to the server
            // @param [Object] options options that may modify the data sent to the server

          }, {
            key: "put",
            value: function put(url, resourceData, options) {
              throw '#put not implemented on base interface';
            } // Make DELETE request
            // @param [String] url the url to query
            // @param [Object] resourceData the resourceData to send to the server
            // @param [Object] options options that may modify the data sent to the server

          }, {
            key: "delete",
            value: function _delete(url, resourceData, options) {
              throw '#delete not implemented on base interface';
            }
          }]);

          return Base;
        }();

        
        Base.contentType = 'application/json';
        return Base;
      }.call(this);

      return Interfaces;
    }.call(this);
  }).call(undefined);
  (function () {
    // Implements an interface according the JSON API standard defined by (http://jsonapi.org/format/)
    // @example JSON API format
    //   response = {
    //     data: {
    //       id: "10",
    //       type: "merchants", # plural type name
    //       attributes: {
    //         name: "...",
    //         balance: "...",
    //       },
    //       links: {
    //         self: "https://app.getoccasion.com/api/v1/merchants/10"
    //       },
    //       relationships: {
    //         products: [
    //           { id: "1202", type: "products" },
    //           { id: "1203", type: "products" }
    //         ]
    //       }
    //     },
    //     included: [
    //       { id: "1202", type: "products", attributes: { title: "..." } },
    //       { id: "1203", type: "products", attributes: { title: "..." } }
    //     ]
    //   }
    ActiveResource.Interfaces.JsonApi = ActiveResource.prototype.Interfaces.prototype.JsonApi = function () {
      var JsonApi =
      /*#__PURE__*/
      function (_ActiveResource$proto) {
        _inherits(JsonApi, _ActiveResource$proto);

        function JsonApi() {
          _classCallCheck(this, JsonApi);

          return _possibleConstructorReturn(this, _getPrototypeOf(JsonApi).apply(this, arguments));
        }

        _createClass(JsonApi, [{
          key: "request",
          // Makes an HTTP request to a url with data
          // @note Uses base request, but checks to make sure response is in JSON API format
          // @param [String] url the url to query
          // @param [String] method the HTTP verb to use for the request
          // @param [Object] data the data to send to the server
          value: function request(url, method, data) {
            return _get(_getPrototypeOf(JsonApi.prototype), "request", this).call(this, url, method, data).then(function (response) {
              var ref;

              if (!(((ref = response.data) != null ? ref.data : void 0) != null || response.status === 204)) {
                throw "Response from ".concat(url, " was not in JSON API format");
              }

              return response.data;
            });
          } //---------------------------------------------------------------------------
          //---------------------------------------------------------------------------
          //                        FORMAT CONVERSION FUNCTIONS
          //                  (convert to/from underscored/camelcase)
          //               JSON format / Javascript format respectively
          //---------------------------------------------------------------------------
          //---------------------------------------------------------------------------
          // Converts an object's attributes to underscore format
          // @note Usually the attributes are in camelCase format, the standard for Javascript
          // @param [Object] the object to convert the attributes of to underscore format
          // @return [Object] the object with attributes in underscore format

        }, {
          key: "toUnderscored",
          value: function toUnderscored(object) {
            var _this3 = this;

            var k, underscored, underscorize, v;
            underscored = {};

            underscorize = function underscorize(value) {
              if (_.isObject(value) && !(typeof value.isA === "function" ? value.isA(ActiveResource.prototype.Base) : void 0) && !(typeof value.isA === "function" ? value.isA(ActiveResource.prototype.Collection) : void 0) && !_.isDate(value)) {
                return _this3.toUnderscored(value);
              } else {
                return value;
              }
            };

            for (k in object) {
              v = object[k];
              underscored[s.underscored(k)] = _.isArray(v) ? _.map(v, underscorize) : underscorize(v);
            }

            return underscored;
          } // Converts an object's attributes to camelCase format
          // @note Usually the attributes are in underscore format, the standard for data
          //   from a Rails server
          // @param [Object] the object to convert the attributes of to camelCase format
          // @return [Object] the object with attributes in camelCase format

        }, {
          key: "toCamelCase",
          value: function toCamelCase(object) {
            var _this4 = this;

            var camelize, camelized, k, v;
            camelized = {};

            camelize = function camelize(value) {
              if (_.isObject(value) && !(typeof value.isA === "function" ? value.isA(ActiveResource.prototype.Base) : void 0) && !(typeof value.isA === "function" ? value.isA(ActiveResource.prototype.Collection) : void 0)) {
                return _this4.toCamelCase(value);
              } else {
                return value;
              }
            };

            for (k in object) {
              v = object[k];
              camelized[s.camelize(k)] = _.isArray(v) ? _.map(v, camelize) : camelize(v);
            }

            return camelized;
          } //---------------------------------------------------------------------------
          //---------------------------------------------------------------------------
          //                 JSONAPI GET REQUEST FORMATTING FUNCTIONS
          //                 (build sparse fieldsets, include trees)
          //---------------------------------------------------------------------------
          //---------------------------------------------------------------------------
          // Takes in an object of filter key/value pairs and builds them into a JSON API filter object
          // @note Used in constructing queryParams of GET queries
          // @note If value is an ActiveResource, it will be transformed to use the resource's primaryKey
          // @param [Object] filters the object containing filter data to be transformed
          // @return [Object] the transformed filters

        }, {
          key: "buildFilters",
          value: function buildFilters(filters) {
            return this.toUnderscored(_.mapObject(filters, function (value) {
              var transformValue;

              transformValue = function transformValue(v) {
                if (v != null ? typeof v.isA === "function" ? v.isA(ActiveResource.prototype.Base) : void 0 : void 0) {
                  return v[v.klass().primaryKey];
                } else if (_.isNull(v)) {
                  return '%00';
                } else {
                  return v;
                }
              };

              if (_.isArray(value) || (value != null ? typeof value.isA === "function" ? value.isA(ActiveResource.Collection) : void 0 : void 0)) {
                return ActiveResource.Collection.build(value).map(function (v) {
                  return transformValue(v);
                }).join();
              } else {
                return transformValue(value);
              }
            }));
          } // Takes in an object of modelName/fieldArray pairs and joins the fieldArray into a string
          // @note Used in constructing queryParams of GET queries
          // @note Will merge include queryParams into fields
          // @example
          //   { order: ['id', 'updatedAt'] } # => { order: 'id,updated_at' }
          // @param [Object] fields the object containing field data to be built into a fieldSet
          // @param [Object] queryParams the object containing include and __root data to be built into a fieldSet
          // @return [Object] the built field set
          // 1. If queryParams.include, merge those into fields
          //   1. Iterate over of array of includes from queryParams.includes or array of objects/values from nested includes
          //   2. If string, add to keyForString, which is either queryParams.__root or the key for the nested include
          //   3. If object, split into individual keys as objects and add value to appropriate field for key
          //   4. If value of object is an array or object, split that and iterate over it until a singular value is reached
          // 2. Then, go through each key of the object, map its array of fields to underscored fields
          // 3. Take the mapped array of fields and join them, replacing the value of the key with the joined string

        }, {
          key: "buildSparseFieldset",
          value: function buildSparseFieldset(fields, queryParams) {
            var _mergeNestedIncludes;

            fields = _.clone(fields);

            if (queryParams.include) {
              _mergeNestedIncludes = function mergeNestedIncludes(includes) {
                var keyForString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : queryParams.__root;
                return ActiveResource.Collection.build(includes).each(function (include) {
                  var k, key, value;

                  if (_.isString(include)) {
                    fields[keyForString] || (fields[keyForString] = []);
                    fields[keyForString] = fields[keyForString].slice(0);
                    return fields[keyForString].push(include);
                  } else if (_.isObject(include)) {
                    if (_.keys(include).length > 1) {
                      return _mergeNestedIncludes(function () {
                        var j, len, ref, results;
                        ref = _.keys(include);
                        results = [];

                        for (j = 0, len = ref.length; j < len; j++) {
                          k = ref[j];
                          results.push(_.pick(include, k));
                        }

                        return results;
                      }());
                    } else {
                      key = _.keys(include)[0];
                      value = _.values(include)[0];

                      if (_.isArray(value)) {
                        _mergeNestedIncludes(value, key);

                        return;
                      } else if (_.isObject(value)) {
                        _mergeNestedIncludes(function () {
                          var j, len, ref, results;
                          ref = _.keys(value);
                          results = [];

                          for (j = 0, len = ref.length; j < len; j++) {
                            k = ref[j];
                            results.push(_.pick(value, k));
                          }

                          return results;
                        }());

                        value = _.keys(value)[0];
                      }

                      fields[key] || (fields[key] = []);
                      fields[key] = fields[key].slice(0);
                      return fields[key].push(value);
                    }
                  }
                });
              };

              _mergeNestedIncludes(queryParams.include);
            }

            return this.toUnderscored(_.mapObject(fields, function (fieldArray) {
              return _.map(fieldArray, function (f) {
                return s.underscored(f);
              }).join();
            }));
          } // Takes in an array of include objects (strings, nested strings in objects) and turns them into a
          // dotted include tree
          // @note Used in constructing queryParams of GET queries
          // @example
          //   ['merchant','products'] # => 'merchant,products'
          // @example
          //   ['merchant',{ products: ['orders','venue'] }] # => 'merchant,products.orders,products.venue'
          // @param [Object] includes the array containing includes to build into an include tree
          // @return [Object] the built include tree
          // 1. Iterate over each include, adding each as a formatted string to includeStrArray
          // 2. If include is object, format it by passing it into function buildNestedIncludes that
          //    takes an object { transactions: ... } and recurses over it to produce an array of
          //    strings like ['transactions.X','transactions.Y']
          //    * The object can be of three forms:
          //      1. { transactions: 'include' }
          //      2. { transactions: ['includes','includes2'] }
          //      3. { transactions: { deeperInclude: ... } }
          //    * If of form 1 or 2, it returns an array of strings with the modelName followed by the include name
          //      ['transactions.includes','transactions.includes2']
          //    * If of form 3, it recurses, passing the value { deeperInclude: ... } into buildNestedIncludes and
          //      eventually returning an array of strings ['transactions.deeperInclude.X','transactions.deeperInclude.Y']
          // 3. If include is string, it is formatted
          // 4. Return the includeStrArray as a ',' joined string

        }, {
          key: "buildIncludeTree",
          value: function buildIncludeTree(includes) {
            var _buildNestedIncludes;

            _buildNestedIncludes = function buildNestedIncludes(object) {
              var includeCollection, modelName, value;
              modelName = s.underscored(_.keys(object)[0]);
              value = _.values(object)[0];
              includeCollection = ActiveResource.prototype.Collection.build([value]).flatten().map(function (item) {
                if (_.isString(item)) {
                  return _.map(item.split(','), function (i) {
                    return s.underscored(i);
                  });
                } else if (_.isObject(item)) {
                  return _buildNestedIncludes(item);
                }
              }).flatten();
              return includeCollection.map(function (i) {
                return "".concat(modelName, ".").concat(i);
              }).toArray();
            };

            return ActiveResource.prototype.Collection.build(includes).inject([], function (includeStrArray, include) {
              if (_.isObject(include)) {
                includeStrArray.push.apply(includeStrArray, _toConsumableArray(_buildNestedIncludes(include)));
                return includeStrArray;
              } else {
                includeStrArray.push(s.underscored(include));
                return includeStrArray;
              }
            }).join();
          } // Builds a list of sorting params based on an object that defines asc/desc ordering
          // @example
          //   { updatedAt: 'asc' } # => 'updated_at'
          // @example
          //   { createdAt: 'desc', updatedAt: 'asc' }
          //   # => '-created_at,updated_at'
          // @param [Object] sortObject the object defining sorting columns
          // @return [String] a JSON API formatted string that defines sorting

        }, {
          key: "buildSortList",
          value: function buildSortList(sortObject) {
            var column, dir, output;
            output = [];

            for (column in sortObject) {
              dir = sortObject[column];

              if (dir === 'asc') {
                output.push(s.underscored(column));
              } else if (dir === 'desc') {
                output.push("-".concat(s.underscored(column)));
              }
            }

            return output.join(',');
          } //---------------------------------------------------------------------------
          //---------------------------------------------------------------------------
          //                 JSONAPI POST REQUEST FORMATTING FUNCTIONS
          //          builds resources into a resource document to send in POST,
          //                     PATCH, PUT, and DELETE requests
          //---------------------------------------------------------------------------
          //---------------------------------------------------------------------------
          // Builds a resource identifier (id + type) from a resource
          // @param [ActiveResource::Base] the resource to convert to a resource identifier
          // @return [Object] the resource identifier for the object

        }, {
          key: "buildResourceIdentifier",
          value: function buildResourceIdentifier(resource) {
            var identifier, primaryKeyValue;
            identifier = {
              type: resource.klass().queryName
            };

            if (primaryKeyValue = resource[resource.klass().primaryKey]) {
              identifier[resource.klass().primaryKey] = primaryKeyValue.toString();
            }

            return identifier;
          } // Builds a relationship object for a resource, given a resource
          // @param [ActiveResource::Base] resource the resource to get relationship data from
          // @return [Object] the built relationship object for the resource

        }, {
          key: "buildResourceRelationships",
          value: function buildResourceRelationships(resource, relationships) {
            var _this5 = this;

            var onlyChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var output;
            output = {};

            _.each(relationships, function (relationship) {
              var reflection, target;
              reflection = resource.klass().reflectOnAssociation(relationship);
              target = resource.association(reflection.name).target;

              if (!onlyChanged && (reflection.collection() && target.empty() || target == null)) {
                return;
              }

              return output[s.underscored(reflection.name)] = {
                data: _this5.buildResourceDocument({
                  resourceData: target,
                  onlyResourceIdentifiers: !reflection.autosave(),
                  onlyChanged: onlyChanged,
                  parentReflection: reflection.polymorphic() ? reflection.polymorphicInverseOf(target.klass()) : reflection.inverseOf()
                })
              };
            });

            return output;
          } // Builds a resource document in JSON API format to be sent to the server in persistence calls
          // @param [ActiveResource::Base,Array<ActiveResource::Base>] resourceData the resourceData to convert to a resource document
          // @param [Boolean] onlyResourceIdentifiers if true, only renders the primary key/type (a resource identifier)
          //   if false, also renders attributes and relationships
          // @return [Array] an array of resource identifiers, possibly with attributes/relationships

        }, {
          key: "buildResourceDocument",
          value: function buildResourceDocument(_ref) {
            var _this6 = this;

            var resourceData = _ref.resourceData,
                onlyResourceIdentifiers = _ref.onlyResourceIdentifiers,
                onlyChanged = _ref.onlyChanged,
                parentReflection = _ref.parentReflection;
            var data;
            onlyResourceIdentifiers = onlyResourceIdentifiers || false;
            onlyChanged = onlyChanged || false;
            data = ActiveResource.prototype.Collection.build(resourceData).compact().map(function (resource) {
              var attributes, changedFields, documentResource, relationships;
              documentResource = _this6.buildResourceIdentifier(resource);

              if (!onlyResourceIdentifiers) {
                attributes = _.omit(resource.attributes({
                  readWrite: true
                }), resource.klass().primaryKey);
                relationships = _.keys(resource.klass().reflections());

                if (parentReflection) {
                  if (!(parentReflection.polymorphic() && _this6.resourceLibrary.includePolymorphicRepeats)) {
                    relationships = _.without(relationships, parentReflection.name);
                  }
                }

                if (onlyChanged) {
                  changedFields = resource.changedFields().toArray();
                  attributes = _.pick.apply(_, [attributes].concat(_toConsumableArray(changedFields)));
                  relationships = _.intersection(relationships, changedFields);
                }

                documentResource['attributes'] = _this6.toUnderscored(attributes);
                documentResource['relationships'] = _this6.buildResourceRelationships(resource, relationships, onlyChanged);
              }

              return documentResource;
            });

            if (_.isArray(resourceData) || _.isObject(resourceData) && (typeof resourceData.isA === "function" ? resourceData.isA(ActiveResource.prototype.Collection) : void 0)) {
              return data.toArray();
            } else {
              return data.first() || null;
            }
          } //---------------------------------------------------------------------------
          //---------------------------------------------------------------------------
          //                 JSONAPI RESPONSE CONSTRUCTION FUNCTIONS
          //          (takes JSONAPI responses and builds them into resources)
          //---------------------------------------------------------------------------
          //---------------------------------------------------------------------------
          // Builds a "resource" from the JSON API into an ActiveResource of type `type`
          // @example
          //   Before: Object{ id: '100', type: 'orders', attributes: { verification_code: '...' }, relationships: { ... } }
          //   After:  Order{ id: 100, verificationCode: '...' }
          // @param [Object] data the data of the resource to instantiate
          // @param [Array] includes the array of includes to search for resource relationships in
          // @param [ActiveResource::Base] existingResource an existingResource to use instead of building a new one
          // @param [ActiveResource::Base] parentRelationship the owner relationship name/resource that is building this resource
          // @return [ActiveResource] the built ActiveResource

        }, {
          key: "buildResource",
          value: function buildResource(data, includes, _ref2) {
            var _this7 = this;

            var existingResource = _ref2.existingResource,
                parentRelationship = _ref2.parentRelationship;
            var attributes, justCreated, resource;
            resource = existingResource || this.resourceLibrary.constantize(_.singularize(s.classify(data['type']))).build();
            justCreated = existingResource && existingResource.newResource();
            attributes = data['attributes'] || {};

            if (data[resource.klass().primaryKey]) {
              attributes[resource.klass().primaryKey] = data[resource.klass().primaryKey].toString();
            }

            if (parentRelationship != null) {
              attributes = _.extend(attributes, parentRelationship);
            }

            attributes = this.addRelationshipsToFields(attributes, data['relationships'], includes, resource);
            attributes = this.toCamelCase(attributes);

            resource.__assignFields(attributes);

            resource.__links = _.extend(resource.links(), data['links']);
            resource.klass().reflectOnAllAssociations().each(function (reflection) {
              var association, ref, ref1, ref2, ref3, relationship, relationshipEmpty, relationshipLinks, selfLink, url_safe_reflection_name;
              association = resource.association(reflection.name);

              if ((relationshipLinks = (ref = data['relationships']) != null ? (ref1 = ref[s.underscored(reflection.name)]) != null ? ref1['links'] : void 0 : void 0) != null) {
                association.__links = _.extend(association.links(), _.mapObject(relationshipLinks, function (l) {
                  return ActiveResource.prototype.Links.__constructLink(l);
                }));
              } else if ((selfLink = resource.links()['self']) != null) {
                url_safe_reflection_name = s.underscored(reflection.name);
                association.__links = {
                  self: ActiveResource.prototype.Links.__constructLink(selfLink, 'relationships', url_safe_reflection_name),
                  related: ActiveResource.prototype.Links.__constructLink(selfLink, url_safe_reflection_name)
                };
              }

              relationshipEmpty = _.isObject(relationship = (ref2 = data['relationships']) != null ? (ref3 = ref2[s.underscored(reflection.name)]) != null ? ref3['data'] : void 0 : void 0) ? _.keys(relationship).length === 0 : _this7.resourceLibrary.immutable ? !_.isUndefined(relationship) && (_.isNull(relationship) || _.isEmpty(relationship) || _.has(attributes, reflection.name)) : relationship != null ? relationship.length === 0 : true;

              if (_.has(attributes, reflection.name) || relationshipEmpty) {
                return association.loaded(true);
              }
            });

            if (justCreated) {
              resource.__executeCallbacks('afterCreate');
            }

            resource.__executeCallbacks('afterRequest');

            return resource;
          } // Interprets all the relationships identified in a resource, searching the `included` part of the response
          //   for each object of each relationship and building it into the resource attributes
          // @example singular relationship
          //   object = {
          //     id: '10', type: 'orders',
          //     attributes: { verification_code: '...' },
          //     relationships: {
          //       product: { data: { id: '1202', type: 'products' } }
          //     }
          //   }
          //  included = [
          //    { id: '1202', type: 'products', attributes: { title: '...' } }
          //  ]
          //   sets attributes['product'] = Product{ id: 1202, title: '...' }
          //   @note (this is the instantiated ActiveResource class for the include)
          // @example plural relationship
          //   object = {
          //     id: '10', type: 'merchants',
          //     attributes: { name: '...' },
          //     relationships: {
          //       products: { data: [{ id: '1202', type: 'products' },{ id: '1203', type: 'products' }] }
          //     }
          //   }
          //  included = [
          //    { id: '1202', type: 'products', attributes: { title: '...' } },
          //    { id: '1202', type: 'products', attributes: { title: '...' } }
          //  ]
          //   sets attributes['products'] = [
          //     Product{ id: 1202, title: '...' },
          //     Product{ id: 1203, title: '...' }
          //   ]
          // @param [Object] attributes the attribute object to build relationships into
          // @param [Object] relationships the object defining the relationships to be built into `attributes`
          // @param [Array] includes the array of includes to search for relationship resources in
          // @param [ActiveResource::Base] resource the resource to get the primary key of
          // @return [Object] the attributes with all relationships built into it

        }, {
          key: "addRelationshipsToFields",
          value: function addRelationshipsToFields(attributes, relationships, includes, resource) {
            var _this8 = this;

            _.each(relationships, function (relationship, relationshipName) {
              var include, reflection, relationshipItems;

              if (reflection = resource.klass().reflectOnAssociation(s.camelize(relationshipName))) {
                if (reflection.collection()) {
                  relationshipItems = ActiveResource.prototype.Collection.build(relationship['data']).map(function (relationshipMember, index) {
                    return _this8.findResourceForRelationship(relationshipMember, includes, resource, reflection, index);
                  }).compact();

                  if (!(typeof relationshipItems.empty === "function" ? relationshipItems.empty() : void 0)) {
                    return attributes[relationshipName] = relationshipItems;
                  }
                } else if (relationship['data'] != null) {
                  include = _this8.findResourceForRelationship(relationship['data'], includes, resource, reflection);

                  if (include != null) {
                    return attributes[relationshipName] = include;
                  }
                }
              }
            });

            return attributes;
          } // Finds a resource in the 'included' collection of the response, based on relationship data taken from another
          //   resource, and builds it into an ActiveResource
          // @note If an include is not found, but relationship data is present, the resource identifiers are matched to
          //   resources already on the existing relationship so that these resources will be moved into __fields
          // @example
          //   relationshipData = { id: '1202', type: 'products' }
          //   includes = [{ id: '102', type: 'orders', attributes: { ... }, { id: '1202', type: 'products', attributes: { ... } }]
          //   returns { id: '1202', type: 'products', ... }
          // @param [Object] relationshipData the data defining the relationship to match an include to
          // @param [Array] includes the array of includes to search for relationships in
          // @param [ActiveResource::Base] resource the resource to get the primary key of
          // @param [Reflection] reflection the reflection for the relationship
          // @param [Integer] index the index of the relationship data (only in collection relationships)
          // @return [ActiveResource::Base] the include built into an ActiveResource::Base

        }, {
          key: "findResourceForRelationship",
          value: function findResourceForRelationship(relationshipData, includes, resource, reflection, index) {
            var buildResourceOptions, findConditions, include, parentReflection, potentialTarget, primaryKey, target;
            primaryKey = resource.klass().primaryKey;
            findConditions = {
              type: relationshipData.type
            };
            findConditions[primaryKey] = relationshipData[primaryKey];
            include = _.findWhere(includes, findConditions);

            if (reflection.collection()) {
              target = resource.association(reflection.name).target.detect(function (t) {
                return t[primaryKey] === findConditions[primaryKey];
              }) || resource.association(reflection.name).target.get(index);
            } else if ((potentialTarget = resource.association(reflection.name).target) != null) {
              if (!reflection.polymorphic() || potentialTarget.klass().queryName === findConditions['type']) {
                target = potentialTarget;
              }
            }

            buildResourceOptions = {};

            if (reflection.polymorphic()) {
              parentReflection = reflection.polymorphicInverseOf(this.resourceLibrary.constantize(_.singularize(s.classify(relationshipData['type']))));
            } else {
              parentReflection = reflection.inverseOf();
            }

            if (parentReflection != null) {
              buildResourceOptions.parentRelationship = {};
              buildResourceOptions.parentRelationship[parentReflection.name] = parentReflection.collection() ? [resource] : resource;
            }

            if (target != null) {
              buildResourceOptions.existingResource = target;
            }

            if (target != null || include != null) {
              return this.buildResource(include || {}, includes, buildResourceOptions);
            }
          } // Merges the changes made from a POST/PUT/PATCH call into the resource that called it
          // @param [Object] response The response to pull persisted changes from
          // @param [ActiveResource::Base] the resource to merge persisted changes into
          // @return [ActiveResource::Base] the resource, now persisted, with updated changes

        }, {
          key: "mergePersistedChanges",
          value: function mergePersistedChanges(response, resource) {
            return this.buildResource(response['data'], response['included'], {
              existingResource: resource
            });
          } // Adds errors in making a POST/PUT/PATCH call into the resource that called it
          // @note The format for resource errors is as follows:
          //   {
          //     "errors": [
          //       {
          //         "source": { "pointer": "/data/attributes/title" },
          //         "code": "blank",
          //         "detail": "Title cannot be blank."
          //       },
          //       {
          //         "source": { "pointer": "/data/relationships/product" },
          //         "code": "blank",
          //         "detail": "Product cannot be blank."
          //       },
          //       {
          //         "source": { "pointer": "/data/relationships/product/data/attributes/title" },
          //         "code": "blank",
          //         "detail": "Title cannot be blank."
          //       }
          //     ]
          //   }
          // @param [Object] response The response to pull errors from
          // @param [ActiveResource::Base] the resource to add errors onto
          // @return [ActiveResource::Base] the unpersisted resource, now with errors

        }, {
          key: "resourceErrors",
          value: function resourceErrors(resource, errors) {
            var errorCollection;
            errorCollection = ActiveResource.Collection.build(errors).map(function (error) {
              var field;
              field = [];

              if (error['source']['pointer'] === '/data') {
                field.push('base');
              } else {
                _.each(error['source']['pointer'].split('/data'), function (i) {
                  var m;

                  if ((m = i.match(/\/(attributes|relationships|)\/(\w+)/)) != null) {
                    return field.push(s.camelize(m[2]));
                  }
                });
              }

              return resource.errors().__buildError(field.join('.'), s.camelize(error['code']), error['detail']);
            });
            resource.errors().propagate(errorCollection);
            return resource;
          } // De-serializes errors from the error response to GET and DELETE requests,
          // which will be of the form: { source: { parameter: '...' } }
          // @note The format for parameter errors is as follows:
          //   {
          //     "errors": [
          //       {
          //         "source": { "parameter": "a_parameter" },
          //         "code": "invalid",
          //         "detail": "a_parameter was invalid."
          //       }
          //     ]
          //   }
          // @param [Array] errors the errors to de-serialize
          // @return [Collection] the collection of errors

        }, {
          key: "parameterErrors",
          value: function parameterErrors(errors) {
            return ActiveResource.prototype.Collection.build(errors).map(function (error) {
              var out, ref;
              out = {
                detail: error['detail'],
                message: error['detail']
              };

              if (((ref = error['source']) != null ? ref['parameter'] : void 0) != null) {
                out['parameter'] = s.camelize(error['source']['parameter']);
              }

              out['code'] = s.camelize(error['code']);
              return out;
            });
          } //---------------------------------------------------------------------------
          //---------------------------------------------------------------------------
          //                          HTTP REQUEST METHODS
          //          (takes JSONAPI responses and builds them into resources)
          //---------------------------------------------------------------------------
          //---------------------------------------------------------------------------
          // Make GET request
          // @param [String] url the url to query
          // @param [Object] queryParams query params to send to the server

        }, {
          key: "get",
          value: function get$$1(url) {
            var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var _this, data;

            data = {};

            if (queryParams['filter'] != null) {
              data['filter'] = this.buildFilters(queryParams['filter']);
            }

            if (queryParams['fields'] != null) {
              data['fields'] = this.buildSparseFieldset(queryParams['fields'], queryParams);
            }

            if (queryParams['include'] != null) {
              data['include'] = this.buildIncludeTree(queryParams['include']);
            }

            if (queryParams['sort'] != null) {
              data['sort'] = this.buildSortList(queryParams['sort']);
            }

            if (queryParams['page'] != null) {
              data['page'] = queryParams['page'];
            }

            if (queryParams['limit'] != null) {
              data['limit'] = queryParams['limit'];
            }

            if (queryParams['offset'] != null) {
              data['offset'] = queryParams['offset'];
            }

            _this = this;
            return this.request(url, 'GET', data).then(function (response) {
              var built;
              built = ActiveResource.prototype.CollectionResponse.build(_.flatten([response.data])).map(function (object) {
                object = _this.buildResource(object, response.included, {});
                object.assignResourceRelatedQueryParams(queryParams);
                return object;
              });
              built.links(response.links);

              if (_.isArray(response.data)) {
                return built;
              } else {
                return built.first();
              }
            }, function (errors) {
              return Promise.reject(_this.parameterErrors(errors.response.data['errors']));
            });
          } // Make POST request
          // @param [String] url the url to query
          // @param [Object] resourceData the resourceData to send to the server
          // @param [Object] options options that may modify the data sent to the server
          // @option [Boolean] onlyResourceIdentifiers if false, render the attributes and relationships
          //   of each resource into the resource document

        }, {
          key: "post",
          value: function post(url, resourceData) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var _this, data, queryParams;

            data = {
              data: this.buildResourceDocument({
                resourceData: resourceData,
                onlyResourceIdentifiers: options['onlyResourceIdentifiers']
              })
            };

            if (!options['onlyResourceIdentifiers']) {
              queryParams = resourceData.queryParams();

              if (queryParams['fields'] != null) {
                data['fields'] = this.buildSparseFieldset(queryParams['fields'], queryParams);
              }

              if (queryParams['include'] != null) {
                data['include'] = this.buildIncludeTree(queryParams['include']);
              }
            }

            _this = this;
            return this.request(url, 'POST', data).then(function (response) {
              if (options['onlyResourceIdentifiers']) {
                return response;
              } else {
                return _this.mergePersistedChanges(response, resourceData);
              }
            }, function (errors) {
              if (options['onlyResourceIdentifiers']) {
                return Promise.reject(errors);
              } else {
                return Promise.reject(_this.resourceErrors(resourceData, errors.response.data['errors']));
              }
            });
          } // Make PATCH request
          // @param [String] url the url to query
          // @param [Object] resourceData the resourceData to send to the server
          // @param [Object] options options that may modify the data sent to the server
          //   @see #post

        }, {
          key: "patch",
          value: function patch(url, resourceData) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var _this, data, queryParams;

            data = {
              data: this.buildResourceDocument({
                resourceData: resourceData,
                onlyResourceIdentifiers: options['onlyResourceIdentifiers'],
                onlyChanged: true
              })
            };

            if (!options['onlyResourceIdentifiers']) {
              queryParams = resourceData.queryParams();

              if (queryParams['fields'] != null) {
                data['fields'] = this.buildSparseFieldset(queryParams['fields'], queryParams);
              }

              if (queryParams['include'] != null) {
                data['include'] = this.buildIncludeTree(queryParams['include']);
              }
            }

            _this = this;
            return this.request(url, 'PATCH', data).then(function (response) {
              if (options['onlyResourceIdentifiers']) {
                return response;
              } else {
                return _this.mergePersistedChanges(response, resourceData);
              }
            }, function (errors) {
              if (options['onlyResourceIdentifiers']) {
                return Promise.reject(errors);
              } else {
                return Promise.reject(_this.resourceErrors(resourceData, errors.response.data['errors']));
              }
            });
          } // Make PUT request
          // @param [String] url the url to query
          // @param [Object] resourceData the resourceData to send to the server
          // @param [Object] options options that may modify the data sent to the server
          //   @see #post

        }, {
          key: "put",
          value: function put(url, resourceData) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var _this, data, queryParams;

            data = {
              data: this.buildResourceDocument({
                resourceData: resourceData,
                onlyResourceIdentifiers: options['onlyResourceIdentifiers']
              })
            };

            if (!options['onlyResourceIdentifiers']) {
              queryParams = resourceData.queryParams();

              if (queryParams['fields'] != null) {
                data['fields'] = this.buildSparseFieldset(queryParams['fields'], queryParams);
              }

              if (queryParams['include'] != null) {
                data['include'] = this.buildIncludeTree(queryParams['include']);
              }
            }

            _this = this;
            return this.request(url, 'PUT', data).then(function (response) {
              if (options['onlyResourceIdentifiers']) {
                return response;
              } else {
                return _this.mergePersistedChanges(response, resourceData);
              }
            }, function (errors) {
              if (options['onlyResourceIdentifiers']) {
                return Promise.reject(errors);
              } else {
                return Promise.reject(_this.resourceErrors(resourceData, errors.response.data['errors']));
              }
            });
          } // Make DELETE request
          // @note There are two instances where a DELETE request will be made
          //   1. A resource is to be deleted, by calling `DELETE /api/v1/:type/:id`
          //     * In this case, the data will simply be {}
          //   2. A relationship is to have members removed, by calling `DELETE /api/v1/:type/:id/relationships/:relationship`
          //     * In this case, the data will have to be resource identifiers
          // @param [String] url the url to query
          // @param [Object] resourceData the resourceData to send to the server
          // @param [Object] options options that may modify the data sent to the server
          //   @see #post

        }, {
          key: "delete",
          value: function _delete(url, resourceData) {
            var _this, data;

            data = resourceData != null ? {
              data: this.buildResourceDocument({
                resourceData: resourceData,
                onlyResourceIdentifiers: true
              })
            } : {};
            _this = this;
            return this.request(url, 'DELETE', data).then(null, function (errors) {
              if (errors.response.data) {
                return Promise.reject(_this.parameterErrors(errors.response.data['errors']));
              } else {
                return Promise.reject(null);
              }
            });
          }
        }]);

        return JsonApi;
      }(ActiveResource.prototype.Interfaces.prototype.Base);

      
      JsonApi.contentType = 'application/vnd.api+json';
      return JsonApi;
    }.call(this);
  }).call(undefined);
  (function () {
    // Adds methods for managing associations, which are built at the instance level
    // based on reflections stored at the class level of ActiveResources
    ActiveResource.prototype.Associations =
    /*#__PURE__*/
    function () {
      function Associations() {
        _classCallCheck(this, Associations);
      }

      _createClass(Associations, [{
        key: "association",
        // Finds an association on a resource, and creates it if it was not built yet
        // @note Throws error if association does not exist
        // @param [String] name the name of the association
        // @return [Association] the association for the resource
        value: function association(name) {
          var association, reflection;
          this.__associations || (this.__associations = {});

          if ((association = this.__associations[name]) == null) {
            if ((reflection = this.klass().reflectOnAssociation(name)) == null) {
              throw "Association ".concat(name, " does not exist");
            }

            association = new (reflection.associationClass())(this, reflection);
            this.__associations[name] = association;
          }

          return association;
        } // Builds a one-to-many relationship between an ActiveResource and another collection of ActiveResources
        // @param [String] name the name of the association
        // @param [Object] options the options to build the association with

      }], [{
        key: "hasMany",
        value: function hasMany(name) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var reflection;
          reflection = ActiveResource.prototype.Associations.prototype.Builder.prototype.HasMany.build(this, name, options);
          return ActiveResource.prototype.Reflection.addReflection(this, name, reflection);
        } // Builds a one-to-one relationship between one ActiveResource and another. This should be used
        // if the class does not contain the foreign_key. If this class contains the foreign_key, you should
        // use #belongsTo() instead
        // @param [String] name the name of the association
        // @param [Object] options the options to build the association with

      }, {
        key: "hasOne",
        value: function hasOne(name) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var reflection;
          reflection = ActiveResource.prototype.Associations.prototype.Builder.prototype.HasOne.build(this, name, options);
          return ActiveResource.prototype.Reflection.addReflection(this, name, reflection);
        } // Builds a one-to-one relationship between one ActiveResource and another. This should be used
        // if the class contains the foreign_key. If the other class contains the foreign_key, you should
        // use #hasOne() instead
        // @param [String] name the name of the association
        // @param [Object] options the options to build the association with

      }, {
        key: "belongsTo",
        value: function belongsTo(name) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var reflection;
          reflection = ActiveResource.prototype.Associations.prototype.Builder.prototype.BelongsTo.build(this, name, options);
          return ActiveResource.prototype.Reflection.addReflection(this, name, reflection);
        }
      }]);

      return Associations;
    }();
  }).call(undefined);
  (function () {
    // ActiveResource methods for managing attributes of resources
    ActiveResource.prototype.Attributes =
    /*#__PURE__*/
    function () {
      function Attributes() {
        _classCallCheck(this, Attributes);
      }

      _createClass(Attributes, [{
        key: "attributes",
        // Used to establish attribute fields for a resource class
        // @note Attribute fields are tracked along with relationships using `klass().fields()`
        // @see fields.coffee
        // @example Add attributes
        //   class Order extends MyLibrary.Base {
        //     static define() {
        //       this.attributes('price', 'tax')
        //     }
        //   }
        // @example Retrieve klass attributes
        //   resource.klass().attributes()
        // @param [Array<String>] attributes the attributes to add to the list of attributes the class tracks
        // @return [Collection<String>] the klass attributes
        value: function attributes() {
          var _this$__attributes$al;

          var options;
          options = {};

          for (var _len = arguments.length, _attributes = new Array(_len), _key = 0; _key < _len; _key++) {
            _attributes[_key] = arguments[_key];
          }

          if (_.isObject(_.last(_attributes))) {
            options = _attributes.pop();
          }

          if (this.__attributes == null) {
            this.__attributes = {
              all: ActiveResource.prototype.Collection.build(),
              read: ActiveResource.prototype.Collection.build(),
              readWrite: ActiveResource.prototype.Collection.build()
            };
          }

          if (options.readOnly) {
            var _this$__attributes$re;

            (_this$__attributes$re = this.__attributes.read).push.apply(_this$__attributes$re, _attributes);
          } else {
            var _this$__attributes$re2;

            (_this$__attributes$re2 = this.__attributes.readWrite).push.apply(_this$__attributes$re2, _attributes);
          }

          (_this$__attributes$al = this.__attributes.all).push.apply(_this$__attributes$al, _attributes);

          return this.__attributes;
        } // Checks if the resource has an attribute
        // @param [String] attribute the attribute to check the existence of on the resource
        // @return [Boolean] whether or not the resource has the attribute

      }], [{
        key: "hasAttribute",
        value: function hasAttribute(attribute) {
          return this.__readAttribute(attribute) != null;
        } // Assigns `attributes` to the resource, using @__assignAttributes to allow this method
        //   to be overridden easier
        // @param [Object] attributes the attributes to assign

      }, {
        key: "assignAttributes",
        value: function assignAttributes(attributes) {
          return this.__assignAttributes(attributes);
        } // Retrieves all the attributes of the resource
        // @return [Object] the attributes of the resource

      }, {
        key: "attributes",
        value: function attributes() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var k, output, ref, v;
          output = {};
          ref = this;

          for (k in ref) {
            v = ref[k];

            if (this.__validAttribute(k, v, options)) {
              output[k] = v;
            }
          }

          return output;
        } // Reloads all the attributes from the server, using saved @__queryParams
        // to ensure proper field and include reloading
        // @example
        //   Order.includes('transactions').last().then (order) ->
        //     order.transactions.last().amount == 3.0 # TRUE
        //     Transaction.find(order.transactions.last().id).then (transaction) ->
        //       transaction.update amount: 5, ->
        //         order.transactions.last().amount == 3.0 # TRUE
        //         order.reload().then ->
        //           order.transactions.last().amount == 5.0 # TRUE
        // @return [Promise] a promise to return the reloaded ActiveResource **or** 404 NOT FOUND

      }, {
        key: "reload",
        value: function reload() {
          var ref, resource, url;

          if (!(this.persisted() || ((ref = this.id) != null ? ref.toString().length : void 0) > 0)) {
            throw 'Cannot reload a resource that is not persisted or has an ID';
          }

          resource = this;
          url = this.links()['self'] || ActiveResource.prototype.Links.__constructLink(this.links()['related'], this.id.toString());
          return this.interface().get(url, this.queryParams()).then(function (reloaded) {
            resource.__assignFields(reloaded.attributes());

            resource.klass().reflectOnAllAssociations().each(function (reflection) {
              var target;
              target = reloaded.association(reflection.name).reader();

              if (typeof reflection.collection === "function" ? reflection.collection() : void 0) {
                target = target.toArray();
              }

              return resource.association(reflection.name).writer(target, false);
            });
            return resource;
          });
        } // private
        // Assigns `attributes` to the resource
        // @param [Object] attributes the attributes to assign

      }, {
        key: "__assignAttributes",
        value: function __assignAttributes(attributes) {
          var k, v;

          for (k in attributes) {
            v = attributes[k];

            try {
              this.association(k).writer(v, false);
            } catch (error) {
              this[k] = v;
            }
          }

          return null;
        } // Reads an attribute on the resource
        // @param [String] attribute the attribute to read
        // @return [Object] the attribute

      }, {
        key: "__readAttribute",
        value: function __readAttribute(attribute) {
          return this.attributes()[attribute];
        } // Determines whether or not an attribute is a valid attribute on the resource class
        // @note A property is valid to be in `attributes` if it meets these conditions:
        //   1. It must not be a function
        //   2. It must not be a reserved keyword
        //   3. It must not be an association
        // @param [String] attribute the attribute to determine validity for
        // @param [Number,String,Object] value the value for the attribute, relevant for !strictAttributes mode
        // @param [Object] options the options to modify valid attributes with

      }, {
        key: "__validAttribute",
        value: function __validAttribute(attribute, value, options) {
          var e, reserved;
          reserved = ['__super__', '__associations', '__errors', '__fields', '__links', '__queryParams'];

          if (this.klass().resourceLibrary.strictAttributes) {
            if (options.readOnly) {
              return this.klass().attributes().read.include(attribute);
            } else if (options.readWrite) {
              return this.klass().attributes().readWrite.include(attribute);
            } else {
              return this.klass().attributes().all.include(attribute);
            }
          } else {
            return !_.isFunction(value) && !_.contains(reserved, attribute) && function () {
              try {
                return this.association(attribute) == null;
              } catch (error) {
                return true;
              }
            }.call(this);
          }
        }
      }]);

      return Attributes;
    }();
  }).call(undefined);
  (function () {
    // ActiveResource callbacks to execute around things like requests and initialization
    ActiveResource.prototype.Callbacks =
    /*#__PURE__*/
    function () {
      function Callbacks() {
        _classCallCheck(this, Callbacks);
      }

      _createClass(Callbacks, [{
        key: "callbacks",
        value: function callbacks() {
          return this.__callbacks || (this.__callbacks = {
            afterBuild: ActiveResource.prototype.Collection.build(),
            afterCreate: ActiveResource.prototype.Collection.build(),
            afterRequest: ActiveResource.prototype.Collection.build()
          });
        }
      }, {
        key: "afterBuild",
        value: function afterBuild(func) {
          return this.callbacks()['afterBuild'].push(func);
        }
      }, {
        key: "afterCreate",
        value: function afterCreate(func) {
          return this.callbacks()['afterCreate'].push(func);
        }
      }, {
        key: "afterRequest",
        value: function afterRequest(func) {
          return this.callbacks()['afterRequest'].push(func);
        } // private

      }], [{
        key: "__executeCallbacks",
        value: function __executeCallbacks(type) {
          var _this9 = this;

          return this.klass().callbacks()[type].each(function (callback) {
            return _.bind(callback, _this9)();
          });
        }
      }]);

      return Callbacks;
    }();
  }).call(undefined);
  (function () {
    // ActiveResource cloning
    ActiveResource.prototype.Cloning =
    /*#__PURE__*/
    function () {
      function Cloning() {
        _classCallCheck(this, Cloning);
      }

      _createClass(Cloning, null, [{
        key: "clone",
        // Clones the resource and its relationship resources recursively
        value: function clone() {
          return this.__createClone({});
        } // private
        // Clones a resource recursively, taking in a cloner argument to protect against circular cloning
        //   of relationships
        // @note This will clone:
        //   1. Resource errors
        //   2. Resource links
        //   3. Resource queryParams
        //   4. Resource attributes
        //   5. Resource relationships
        //     a. Relationship links
        //     b. Relationship loaded status
        //     c. Relationship resources, according to these principles:
        //       1. An autosave association is interpreted as part of the identity of a resource. If the resource
        //          is cloned, the autosave association target is cloned, and vice-versa.
        //       2. Only clone a related resource if it is part of the identity of the resource being cloned.
        // @option [ActiveResource::Base] cloner the resource cloning this resource (always a related resource)
        // @option [ActiveResource::Base] newCloner the clone of cloner to reassign fields to
        // @return [ActiveResource::Base] the cloned resource

      }, {
        key: "__createClone",
        value: function __createClone(_ref3) {
          var _this10 = this;

          var cloner = _ref3.cloner,
              newCloner = _ref3.newCloner;
          var attributes, clone;
          clone = this.klass().build();
          this.errors().each(function (attribute, e) {
            return clone.errors().push(_.clone(e));
          });
          clone.__links = _.clone(this.links());
          clone.__queryParams = _.clone(this.queryParams());
          attributes = {};
          attributes[this.klass().primaryKey] = this[this.klass().primaryKey];

          clone.__assignAttributes(_.extend(attributes, this.attributes()));

          this.klass().fields().each(function (f) {
            var newAssociation, oldAssociation, ref, ref1, ref2, ref3, reflection, target;
            clone.__fields[f] = ((ref = _this10.__fields[f]) != null ? ref.toArray : void 0) != null ? _this10.__fields[f].clone() : _this10.__fields[f];

            try {
              oldAssociation = _this10.association(f);
              newAssociation = clone.association(f);
              newAssociation.__links = _.clone(oldAssociation.links());

              if (oldAssociation.loaded()) {
                newAssociation.loaded(true);
              }

              reflection = oldAssociation.reflection;
              target = reflection.collection() ? reflection.autosave() && oldAssociation.target.include(cloner) ? _this10.__createCollectionAutosaveAssociationClone(oldAssociation, {
                parentClone: clone,
                cloner: cloner,
                newCloner: newCloner
              }) : ((ref1 = reflection.inverseOf()) != null ? ref1.autosave() : void 0) ? _this10.__createCollectionInverseAutosaveAssociationClone(oldAssociation, {
                parentClone: clone,
                cloner: cloner
              }) : oldAssociation.target : reflection.polymorphic() ? oldAssociation.target : reflection.autosave() && oldAssociation.target === cloner ? _this10.__createSingularAutosaveAssociationClone(oldAssociation, {
                parentClone: clone,
                newCloner: newCloner
              }) : ((ref2 = reflection.inverseOf()) != null ? ref2.autosave() : void 0) && oldAssociation.target != null ? _this10.__createSingularInverseAutosaveAssociationClone(oldAssociation, {
                parentClone: clone,
                cloner: cloner
              }) : (((ref3 = reflection.inverseOf()) != null ? ref3.collection() : void 0) ? _this10.__replaceSingularInverseCollectionAssociationClone(oldAssociation, {
                parentClone: clone
              }) : void 0, oldAssociation.target);
              return newAssociation.writer(target, false);
            } catch (error) {
              return true;
            }
          });
          return clone;
        } // Creates a clone of an autosave collection association on parentClone when cloner of
        //   parentClone is in the association's target
        // @example
        //   An order has many orderItems that it autosaves. When an orderItem is cloned, clone the order
        //   and replace the cloned orderItem in its orderItems collection but skip cloning the other
        //   orderItems.
        // @note The following changes are made:
        //   1. Replaces the cloner with the newCloner in the collection on parentClone
        //   2. Replaces the cloner with the newCloner in the parentClone fields cache so newCloner
        //        is not registered as a change in the collection
        //   3. Replaces the inverse belongsTo association on each member of the collection with parentClone
        // @param [Association] association the association that is being cloned
        // @param [ActiveResource] parentClone the cloned owner that is cloning the association
        // @param [ActiveResource] cloner the original related resource that initiated parentClone to be cloned
        // @param [ActiveResource] newCloner the clone of cloner
        // @return [Collection] the clone of the collection association

      }, {
        key: "__createCollectionAutosaveAssociationClone",
        value: function __createCollectionAutosaveAssociationClone(association, _ref4) {
          var _this11 = this;

          var parentClone = _ref4.parentClone,
              cloner = _ref4.cloner,
              newCloner = _ref4.newCloner;
          var clone, inverse;
          clone = association.target.clone();
          clone.replace(cloner, newCloner);

          parentClone.__fields[association.reflection.name].replace(cloner, newCloner);

          if ((inverse = association.reflection.inverseOf()) != null) {
            clone.each(function (t) {
              if (t.__fields[inverse.name] === _this11) {
                t.__fields[inverse.name] = parentClone;
              }

              return t.association(inverse.name).writer(parentClone, false);
            });
          }

          return clone;
        } // Clones each item in a collection association on parentClone when the inverse of the association
        //   is autosaving
        // @example
        //   A customer has many orders, and each order autosaves the customer so that customer information
        //   can be updated with each new order. When the order is cloned, clone the customer and since the
        //   customer is cloned, clone each order that it has but skip cloning the order that initiated
        //   cloning.
        // @note The following changes are made:
        //   1. Clones each item in the association
        //   2. Replaces each item in the parentClone fields cache with the clone of each item
        //   3. Skips cloning the item that is the cloner of parentClone
        // @param [Association] association the association that is being cloned
        // @param [ActiveResource] parentClone the cloned owner that is cloning the association
        // @param [ActiveResource] cloner the original related resource that initiated parentClone to be cloned
        // @return [Collection] the original collection association

      }, {
        key: "__createCollectionInverseAutosaveAssociationClone",
        value: function __createCollectionInverseAutosaveAssociationClone(association, _ref5) {
          var _this12 = this;

          var parentClone = _ref5.parentClone,
              cloner = _ref5.cloner;
          return association.target.map(function (t) {
            var clone;

            if (cloner != null && cloner === t) {
              return cloner;
            } else {
              clone = t.__createClone({
                cloner: _this12,
                newCloner: parentClone
              });

              parentClone.__fields[association.reflection.name].replace(t, clone);

              return clone;
            }
          });
        } // Clones an autosaving singular association on parentClone when cloner is the association's target
        // @example
        //   A customer has many orders, and each order autosaves the customer so that customer information
        //   can be updated with each new order. When the customer is cloned, it will clone its orders,
        //   and each order should replace the customer on its belongsTo association with the cloned one.
        // @note The following changes are made:
        //   1. Replaces the association target with newCloner
        //   2. Replaces the parentClone fields cache with newCloner so newCloner is not registered as a change
        // @param [Association] association the association that is being cloned
        // @param [ActiveResource] parentClone the cloned owner that is cloning the association
        // @param [ActiveResource] newCloner the clone of cloner
        // @return [ActiveResource] the new association target, newCloner

      }, {
        key: "__createSingularAutosaveAssociationClone",
        value: function __createSingularAutosaveAssociationClone(association, _ref6) {
          var parentClone = _ref6.parentClone,
              newCloner = _ref6.newCloner;
          parentClone.__fields[association.reflection.name] = newCloner;
          return newCloner;
        } // Clones a singular association on parentClone when the inverse of the association is autosaving and
        //   the association has a target that can be cloned
        // @example
        //   An order has one rating that it autosaves. When the rating is cloned, clone the order it belongs to.
        // @note
        //   1. If the association target is cloner, no changes are needed
        //   2. If association target is not cloner, clone the association target and replace parentClone field cache
        //        with the clone so that the clone is not registered as a change
        // @param [Association] association the association that is being cloned
        // @param [ActiveResource] parentClone the cloned owner that is cloning the association
        // @param [ActiveResource] cloner the original related resource that initiated parentClone to be cloned
        // @return [ActiveResource] the new association target

      }, {
        key: "__createSingularInverseAutosaveAssociationClone",
        value: function __createSingularInverseAutosaveAssociationClone(association, _ref7) {
          var parentClone = _ref7.parentClone,
              cloner = _ref7.cloner;
          var clone;

          if (association.target === cloner) {
            return cloner;
          } else {
            clone = association.target.__createClone({
              cloner: this,
              newCloner: parentClone
            });

            if (parentClone.__fields[association.reflection.name] === association.target) {
              parentClone.__fields[association.reflection.name] = clone;
            }

            return clone;
          }
        } // When parentClone has a belongsTo association that is inverse of a collection association, replace
        //   the original of parentClone with parentClone in the collection association
        // @example
        //   An order has many orderItems. When an orderItem is cloned, replace it in the orderItems
        //   collection of the order that it belongs to.
        // @param [Association] association the association that is being cloned
        // @param [ActiveResource] parentClone the cloned owner that is cloning the association

      }, {
        key: "__replaceSingularInverseCollectionAssociationClone",
        value: function __replaceSingularInverseCollectionAssociationClone(association, _ref8) {
          var parentClone = _ref8.parentClone;
          var inverse;
          inverse = association.reflection.inverseOf();
          return association.target.association(inverse.name).target.replace(this, parentClone);
        }
      }]);

      return Cloning;
    }();
  }).call(undefined);
  (function () {
    // Wraps a Javascript array with some useful functions native to Ruby Arrays
    ActiveResource.Collection = ActiveResource.prototype.Collection = function () {
      var Collection =
      /*#__PURE__*/
      function () {
        _createClass(Collection, null, [{
          key: "build",
          // Builds a new ActiveResource::Collection
          // @param [Array,Collection,Value] array the array/value to wrap in a collection
          // @return [Collection] the built Collection
          value: function build() {
            var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            if (array != null ? typeof array.isA === "function" ? array.isA(this) : void 0 : void 0) {
              return array.clone();
            } else if ((array != null ? array.length : void 0) != null) {
              return new this(array);
            } else {
              return new this([array]);
            }
          } // @param [Array] __collection the collection to wrap with Collection functionality

        }]);

        function Collection() {
          var __collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

          _classCallCheck(this, Collection);

          this.__collection = __collection;
        } // Returns the size of the collection
        // @return [Integer] the size of the collection


        _createClass(Collection, [{
          key: "size",
          value: function size() {
            return _.size(this.__collection);
          } // Indicates whether or not the collection is empty
          // @return [Boolean] whether or not the collection is empty

        }, {
          key: "empty",
          value: function empty() {
            return this.size() === 0;
          } // Check whether or not the specified item is in the collection
          // @param [Value] item the item to check for in the collection
          // @return [Boolean] whether or not the item is in the collection

        }, {
          key: "include",
          value: function include(item) {
            return this.indexOf(item) >= 0;
          } // Get the index of the specified item in the collection
          // @param [Value] item the item to get the index for in the collection
          // @return [Integer] the index of the item in the collection, or -1 if it is not in the collection

        }, {
          key: "indexOf",
          value: function indexOf(item) {
            return _.indexOf(this.__collection, item);
          } // Gets the item at the index of the collection
          // @param [Integer] index the index to get
          // @return [Value] the item at the index

        }, {
          key: "get",
          value: function get$$1(index) {
            if (!(index >= this.size())) {
              return this.__collection[index];
            }
          } // Sets the index of the collection to the item
          // @param [Integer] index the index to set
          // @param [Value] item the item to set on the index

        }, {
          key: "set",
          value: function set(index, item) {
            if (!(index >= this.size())) {
              return this.__collection[index] = item;
            }
          } // Finds original in the collection and if found, replaces it with next
          // @param [Value] original the original item to replace in the collection
          // @param [Value] next the next value to replace the item
          // @return [

        }, {
          key: "replace",
          value: function replace(original, next) {
            var index;

            if ((index = this.indexOf(original)) > -1) {
              this.set(index, next);
            }

            return next;
          } // @return [Array] all the resources loaded in this collection as an array

        }, {
          key: "toArray",
          value: function toArray() {
            return this.__collection;
          } // @note Alias for toArray()
          // @return [Array] all the resources loaded in this collection as an array

        }, {
          key: "all",
          value: function all() {
            return this.toArray();
          } // Get the first N resources from this association
          // @param n [Integer] the number of resources to return
          // @return  [Array] array of N resources

        }, {
          key: "first",
          value: function first(n) {
            var output;
            output = _.first(this.__collection, n || 1);

            if (n) {
              return output;
            } else {
              return output[0];
            }
          } // Get the last N resources from this association
          // @param n [Integer] the number of resources to return
          // @return  [Array] array of N resources

        }, {
          key: "last",
          value: function last(n) {
            var output;
            output = _.last(this.__collection, n || 1);

            if (n) {
              return output;
            } else {
              return output[0];
            }
          } // Performs an iteratee function on each item of the collection
          // @param [Function] iteratee the function to call with each item of the collection passed in

        }, {
          key: "each",
          value: function each(iteratee) {
            return _.each(this.__collection, iteratee);
          } // Injects a persisting object as well as each item of the collection into an iteratee, boiling down
          // the collection into a single value that is returned
          // @param memo an initial value to pass into the iteratee
          // @param [Function] iteratee the function to iterate over with the object and items of the collection
          // @return [Collection] the boiled down value as a result of each iteration of the iteratee

        }, {
          key: "inject",
          value: function inject(memo, iteratee) {
            return _.reduce(this.__collection, iteratee, memo);
          } // Maps each item of the collection into a new collection using the iteratee
          // @param [Function] iteratee the function to call with each item of the collection passed in
          // @return [ActiveResource::Collection] a collection mapped based on the iteratee

        }, {
          key: "map",
          value: function map(iteratee) {
            return this.constructor.build(_.map(this.__collection, iteratee));
          } // Removes all null values from the array (undefined, null)
          // @return [ActiveResource::Collection] a collection with all null values removed

        }, {
          key: "compact",
          value: function compact(iteratee) {
            return this.constructor.build(_.without(this.__collection, null, void 0));
          } // Joins each item of the collection as a string, with a separator
          // @param [String] separator the string to separate each item of the collection with
          // @return [String] the joined collection

        }, {
          key: "join",
          value: function join() {
            var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ',';
            return s.join.apply(s, [separator].concat(_toConsumableArray(_.map(this.__collection, function (i) {
              return i.toString();
            }))));
          } // Flattens a deep nested array into a shallow array
          // @return [Collection] the shallow collection

        }, {
          key: "flatten",
          value: function flatten() {
            return this.constructor.build(_.flatten(this.__collection));
          } // Push items onto the end of this collection
          // @param [Array] items a list of items to push onto the collection

        }, {
          key: "push",
          value: function push() {
            var _this$__collection;

            return (_this$__collection = this.__collection).push.apply(_this$__collection, arguments);
          } // Unshifts items onto the beginning of this collection
          // @param [Array] items a list of items to unshift onto the collection

        }, {
          key: "unshift",
          value: function unshift() {
            var _this$__collection2;

            return (_this$__collection2 = this.__collection).unshift.apply(_this$__collection2, arguments);
          } // Pops items off the end of this collection
          // @return [Item] the last item popped off the collection

        }, {
          key: "pop",
          value: function pop() {
            return this.__collection.pop();
          } // Shifts items off the beginning of this collection
          // @return [Item] the first item shifted off the collection

        }, {
          key: "shift",
          value: function shift() {
            return this.__collection.shift();
          } // Deletes an item from the collection and returns it
          // @param [Array<Value>] items the items to delete from the collection
          // @return [Array] an array of items deleted from the collection

        }, {
          key: "delete",
          value: function _delete() {
            var deleted;

            for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              items[_key2] = arguments[_key2];
            }

            deleted = _.intersection(this.__collection, items);
            this.__collection = _.without.apply(_, [this.__collection].concat(items));
            return deleted;
          } // Clear the collection (does not delete on server)

        }, {
          key: "clear",
          value: function clear() {
            return this.__collection = [];
          } // Looks through each item in the collection, returning an array of all items that pass the
          // truth test (predicate)
          // @param predicate [Function] the function to evaluate each item in the collection with
          // @return [ActiveResource::Collection] a collection with only item that return true in the predicate

        }, {
          key: "select",
          value: function select(predicate) {
            return this.constructor.build(_.filter(this.__collection, predicate));
          } // Get the first item that returns true from the predicate
          // @param [Function] predicate the function to evaluate each resource in the collection with
          // @return [Value] the first resource that returned true in the predicate

        }, {
          key: "detect",
          value: function detect(predicate) {
            return _.detect(this.__collection, predicate);
          } // Duplicates the items of the collection into a new collection
          // @return [Collection] the cloned collection of original items

        }, {
          key: "clone",
          value: function clone() {
            return this.constructor.build(_.map(this.__collection, function (i) {
              return i;
            }));
          }
        }]);

        return Collection;
      }();

      
      ActiveResource.include(Collection, ActiveResource.prototype.Typing);
      return Collection;
    }.call(this);
  }).call(undefined);
  (function () {
    // Wraps an ActiveResource::Collection with some useful functions specific to GET responses
    ActiveResource.CollectionResponse = ActiveResource.prototype.CollectionResponse =
    /*#__PURE__*/
    function (_ActiveResource$proto2) {
      _inherits(CollectionResponse, _ActiveResource$proto2);

      function CollectionResponse() {
        _classCallCheck(this, CollectionResponse);

        return _possibleConstructorReturn(this, _getPrototypeOf(CollectionResponse).apply(this, arguments));
      }

      _createClass(CollectionResponse, [{
        key: "links",
        // Retrieves and sets the links that were sent at the top level in the response
        // @param [Object] data the link data to set this CollectionResponse's links to
        // @return [Object] the link data for the response
        value: function links() {
          var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          if (!_.isEmpty(data) || this.__links == null) {
            this.__links = data;
          }

          return this.__links;
        } // Indicates whether or not a prev link was included in the response
        // @return [Boolean] whether or not the response has a previous page that can be loaded

      }, {
        key: "hasPrevPage",
        value: function hasPrevPage() {
          return this.links()['prev'] != null;
        } // Indicates whether or not a next link was included in the response
        // @return [Boolean] whether or not the response has a next page that can be loaded

      }, {
        key: "hasNextPage",
        value: function hasNextPage() {
          return this.links()['next'] != null;
        } // Loads data at links()['prev'] if there is a link
        // @return [Promise] a promise to return the previous page of data, or errors

      }, {
        key: "prevPage",
        value: function prevPage() {
          if (this.hasPrevPage()) {
            return this.prevPagePromise || (this.prevPagePromise = this.first().klass().resourceLibrary.interface.get(this.links()['prev']));
          }
        } // Loads data at links()['next'] if there is a link
        // @return [Promise] a promise to return the next page of data, or errors

      }, {
        key: "nextPage",
        value: function nextPage() {
          if (this.hasNextPage()) {
            return this.nextPagePromise || (this.nextPagePromise = this.first().klass().resourceLibrary.interface.get(this.links()['next']));
          }
        } // Converts this a plain ActiveResource::Collection
        // @return [Collection] the converted collection for this CollectionResponse

      }, {
        key: "toCollection",
        value: function toCollection() {
          return ActiveResource.prototype.Collection.build(this.toArray());
        }
      }], [{
        key: "build",
        // Builds a new ActiveResource::CollectionResponse
        // @param [Array,Collection,Object] array the array/object to wrap in a collection
        // @return [CollectionResponse] the built CollectionResponse
        value: function build() {
          var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

          if (typeof array.isA === "function" ? array.isA(ActiveResource.prototype.Collection) : void 0) {
            return new this(array.toArray());
          } else {
            return _get(_getPrototypeOf(CollectionResponse), "build", this).call(this, array);
          }
        }
      }]);

      return CollectionResponse;
    }(ActiveResource.prototype.Collection);
  }).call(undefined);
  (function () {
    // A class for managing errors associated with persisting an ActiveResource
    // Also adds instance methods to ActiveResource::Base to manage the class itself
    // @example
    //   product = Product{ title: '' }
    //   product.save ->
    //     unless product.valid?()
    //       product.errors()
    ActiveResource.Errors = ActiveResource.prototype.Errors =
    /*#__PURE__*/
    function () {
      _createClass(Errors, null, [{
        key: "errors",
        // Caches an instance of this class on ActiveResource::Base#errors in order to manage
        // that resource's errors
        // @return [ActiveResource::Errors] the errors class for the resource
        value: function errors() {
          return this.__errors || (this.__errors = new ActiveResource.prototype.Errors(this));
        } // Indicates whether or not the resource is valid?
        // @note A resource is valid if it does not have any errors
        // @return [Boolean] whether or not the resource is valid

      }, {
        key: "valid",
        value: function valid() {
          return this.errors().empty();
        } // Instantiates with a @base resource and @__errors storage object
        // @param [ActiveResource::Base] the resource that these errors apply to

      }]);

      function Errors(base) {
        _classCallCheck(this, Errors);

        this.base = base;
        this.reset();
      }

      _createClass(Errors, [{
        key: "reset",
        value: function reset() {
          return this.__errors = {};
        }
      }, {
        key: "clear",
        value: function clear() {
          return this.reset();
        } // Adds an error with code and message to the error object for an field
        // @param [String] field the field the error applies to
        //   Or 'base' if it applies to the base object
        // @param [String] code the code for the error
        // @param [String] detail the message for the error
        // @return [Object] the error object created and added to storage

      }, {
        key: "add",
        value: function add(field, code) {
          var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
          return this.__add(field, code, detail);
        } // Adds an array of errors
        // @see #add for individual error params
        // @param [Array<Array>] errors error objects to add

      }, {
        key: "addAll",
        value: function addAll() {
          var _this13 = this;

          for (var _len3 = arguments.length, errors = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            errors[_key3] = arguments[_key3];
          }

          return _.map(errors, function (error) {
            return _this13.__add.apply(_this13, _toConsumableArray(error));
          });
        } // Propagates errors with nested fields down through relationships to their appropriate resources
        // TODO: Propagate errors to appropriate collection item instead of just first
        // @param [ActiveResource.Collection<Object>] errors the errors to propagate down the resource

      }, {
        key: "propagate",
        value: function propagate(errors) {
          var _this14 = this;

          return errors.each(function (error) {
            var association, field, nestedError, nestedErrors, nestedField, ref, ref1;
            nestedField = error.field.split('.');
            field = nestedField.shift();

            _this14.push(error);

            try {
              association = _this14.base.association(field);
              nestedError = _.clone(error);
              nestedError.field = nestedField.length === 0 && 'base' || nestedField.join('.');
              nestedErrors = ActiveResource.Collection.build([nestedError]);

              if (association.reflection.collection()) {
                return (ref = association.target.first()) != null ? ref.errors().propagate(nestedErrors) : void 0;
              } else {
                return (ref1 = association.target) != null ? ref1.errors().propagate(nestedErrors) : void 0;
              }
            } catch (error1) {}
          });
        } // Adds an existing error with field to this errors object
        // @param [Object] error the error to push onto this errors object
        // @return [Object] the error object

      }, {
        key: "push",
        value: function push(error) {
          var base, name;
          (base = this.__errors)[name = error.field] || (base[name] = []);

          this.__errors[error.field].push(error);

          return error;
        } // Indicates whether or not the error with code `code` is on the `field`
        // @param [String] field the field to check if the error exists on
        // @param [String] code the code to check for on the field
        // @return [Boolean] whether or not the error with code is on the field

      }, {
        key: "added",
        value: function added(field, code) {
          return ActiveResource.prototype.Collection.build(this.__errors[field]).detect(function (e) {
            return e.code === code;
          }) != null;
        } // Indicates whether or not there are errors for a specific field
        // @param [String] field the field to see if there are errors for
        // @return [Boolean] whether or not the field has errors

      }, {
        key: "include",
        value: function include(field) {
          return this.__errors[field] != null && _.size(this.__errors[field]) > 0;
        } // Indicates whether or not the errors object is empty
        // @return [Boolean] whether or not the errors object is empty

      }, {
        key: "empty",
        value: function empty() {
          return this.size() === 0;
        } // Indicates the size of the errors array
        // @return [Integer] the number of errors

      }, {
        key: "size",
        value: function size() {
          return _.size(this.toArray());
        } // Delete the errors for a specific field
        // @param [String] field the field to delete errors for

      }, {
        key: "delete",
        value: function _delete(field) {
          return this.__errors[field] = [];
        } // Iterates over each error key, value pair in the errors object
        // using a provided iterator that takes in two arguments (field, error)
        // @example
        //   resource.errors().each (field, error) ->
        //     # Will yield 'name' and { code: '...', message: '...' }
        //     # Then, will yield 'name' and { code: '...', message: '...' }
        // @param [Function] iterator the function to use to iterate over errors

      }, {
        key: "each",
        value: function each(iterator) {
          return _.each(this.__errors, function (errors, field) {
            var error, i, len, results;
            results = [];

            for (i = 0, len = errors.length; i < len; i++) {
              error = errors[i];
              results.push(iterator(field, error));
            }

            return results;
          });
        } // Returns the error object for an field
        // @param [String] field the name of field to get errors for
        // @return [Object] the error object for the field

      }, {
        key: "forField",
        value: function forField(field) {
          var _this15 = this;

          return ActiveResource.prototype.Collection.build(_.keys(this.__errors)).select(function (k) {
            return s.startsWith(k, field);
          }).map(function (k) {
            return _this15.__errors[k];
          }).flatten();
        } // Returns the error object for an field
        // @param [String] field the field to get errors for
        // @return [Object] the error object for the field

      }, {
        key: "detailsForField",
        value: function detailsForField(field) {
          return this.forField(field).inject({}, function (out, error) {
            out[error.code] = error.detail;
            return out;
          });
        } // Returns the error object for base
        // @return [Object] the error object for base

      }, {
        key: "forBase",
        value: function forBase() {
          return this.forField('base');
        } // Converts the errors object to an array of errors
        // @return [Array] the errors object converted to an array of errors

      }, {
        key: "toArray",
        value: function toArray() {
          var errors, field, output, ref;
          output = [];
          ref = this.__errors;

          for (field in ref) {
            var _output;

            errors = ref[field];

            (_output = output).push.apply(_output, _toConsumableArray(errors));
          }

          return output;
        } // Convert the errors object to a collection of errors
        // @return [Collection] the errors object converted to a collection of errors

      }, {
        key: "toCollection",
        value: function toCollection() {
          return ActiveResource.prototype.Collection.build(this.toArray());
        } // private
        // Adds an error with code and message to the error object for an field
        // @param [String] field the field the error applies to
        //   Or 'base' if it applies to the base object
        // @param [String] code the code for the error
        // @param [String] detail the message for the error
        // @return [Object] the error object created and added to storage

      }, {
        key: "__add",
        value: function __add(field, code) {
          var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
          var base, error;
          (base = this.__errors)[field] || (base[field] = []);

          this.__errors[field].push(error = this.__buildError(field, code, detail));

          return error;
        } // @param [String] field the field the error applies to
        //   Or 'base' if it applies to the base object
        // @param [String] code the code for the error
        // @param [String] detail the message for the error
        // @return [Object] a mapped object that represents an error

      }, {
        key: "__buildError",
        value: function __buildError(field, code, detail) {
          return {
            field: field,
            code: code,
            detail: detail,
            message: detail
          };
        }
      }]);

      return Errors;
    }();
  }).call(undefined);
  (function () {
    // ActiveResource methods for managing changes in tracked fields
    ActiveResource.prototype.Fields =
    /*#__PURE__*/
    function () {
      function Fields() {
        _classCallCheck(this, Fields);
      }

      _createClass(Fields, [{
        key: "fields",
        // Returns all of the fields of the klass (attributes + relationships)
        // @return [Collection<String>] the names of all the fields of the klass
        value: function fields() {
          var _output2, _output3;

          var attributes, output;
          attributes = this.attributes();
          output = ActiveResource.prototype.Collection.build(attributes.all);

          (_output2 = output).push.apply(_output2, _toConsumableArray(attributes.read.toArray()));

          (_output3 = output).push.apply(_output3, _toConsumableArray(_.keys(this.reflections())));

          return output;
        } // Called in Base constructor to initialize tracking for each field by creating the `__field` object and storing
        //   either blank Collection or null for each field

      }], [{
        key: "__initializeFields",
        value: function __initializeFields() {
          var _this16 = this;

          this.__fields = {};
          return this.klass().fields().each(function (field) {
            var ref;

            if ((ref = _this16.klass().reflectOnAssociation(field)) != null ? ref.collection() : void 0) {
              return _this16.__fields[field] = ActiveResource.prototype.Collection.build();
            } else {
              return _this16.__fields[field] = null;
            }
          });
        } // Called after requests, used to assign the values for fields according to the server's response and
        //   update the control for field tracking
        // @note Each time `changedFields()` is run, the current value of each field is compared against the fields last assigned
        //   using this method.
        // @param [Object] fields the fields to assign and use as the control for field change tracking

      }, {
        key: "__assignFields",
        value: function __assignFields(fields) {
          var _this17 = this;

          _.each(fields, function (v, k) {
            if (!_.has(_this17.__fields, k)) {
              return;
            }

            try {
              if (_this17.association(k).reflection.collection()) {
                return _this17.__fields[k] = ActiveResource.prototype.Collection.build(v);
              } else {
                return _this17.__fields[k] = v;
              }
            } catch (error) {
              return _this17.__fields[k] = v;
            }
          });

          return this.__assignAttributes(fields);
        } // If true, at least one field on the resource has changed
        // @return [Boolean] whether or not the resource has changed

      }, {
        key: "changed",
        value: function changed() {
          return !this.changedFields().empty();
        } // Returns all of the fields that have been changed since the last server response
        // @return [Collection<String>] the changed fields for the resource

      }, {
        key: "changedFields",
        value: function changedFields() {
          var _this18 = this;

          return this.klass().fields().select(function (field) {
            var association, newField, newTargets, oldField;
            oldField = _this18.__fields[field];
            newField = _this18[field];

            try {
              // Relationship field if association found
              association = _this18.association(field);
              newField = _this18[field]();

              if (association.reflection.collection()) {
                if (oldField.size() !== newField.size()) {
                  return true;
                }

                newTargets = newField.target().select(function (t) {
                  return !oldField.include(t) || association.reflection.autosave() && t.changed();
                });
                return !newTargets.empty();
              } else {
                return oldField != newField || association.reflection.autosave() && newField.changed();
              }
            } catch (error) {
              // Attribute field if association not found
              // Check that they are not equal, and that its not a case of undefined !== null
              return oldField != newField && !_.isUndefined(newField);
            }
          });
        }
      }]);

      return Fields;
    }();
  }).call(undefined);
  (function () {
    // ActiveResource methods for managing links of resources to their servers
    ActiveResource.Links = ActiveResource.prototype.Links =
    /*#__PURE__*/
    function () {
      function Links() {
        _classCallCheck(this, Links);
      }

      _createClass(Links, [{
        key: "links",
        // Links to query the server for this persisted resource with
        value: function links() {
          return this.__links || (this.__links = _.clone(this.klass().links()));
        } // @note Static method
        // Links to query the server for this model with
        // @return [Object] the URL links used to query this resource type

      }], [{
        key: "links",
        value: function links() {
          if (this.resourceLibrary.baseUrl == null) {
            throw 'baseUrl is not set';
          }

          if (this.queryName == null) {
            throw 'queryName is not set';
          }

          return this.__links || (this.__links = {
            related: this.resourceLibrary.baseUrl + this.queryName + '/'
          });
        } // @note Static method
        // Constructs formatted links
        // @param [Array<String>] args the segments of a URL to join
        // @return [String] joined segments of URL together with /

      }, {
        key: "__constructLink",
        value: function __constructLink() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return _.map(args, function (str) {
            if (s.endsWith(str, '/')) {
              return str;
            } else {
              return str + '/';
            }
          }).join('');
        }
      }]);

      return Links;
    }();
  }).call(undefined);
  (function () {
    // ActiveResource methods for persisting local resources with the server
    ActiveResource.prototype.Persistence =
    /*#__PURE__*/
    function () {
      function Persistence() {
        _classCallCheck(this, Persistence);
      }

      _createClass(Persistence, null, [{
        key: "persisted",
        // Whether or not this resource is persisted on the server
        // @note If the resource has a `self` link, that means it has a link to itself on the server,
        //   thus, it is persisted. Before a resource has a `self` link, it will have a `related` link
        //   that belongs to its @klass()
        // @example
        //   @klass().links() == { related: '/api/v1/orders' }
        //   @links() == { self: '/api/v1/orders/1' }
        //   return true
        // @example
        //   @klass().links() == { related: '/api/v1/orders' }
        //   @links() == { related: '/api/v1/orders' }
        //   return false
        // @return [Boolean] whether or not the resource is persisted on the server
        value: function persisted() {
          return this.links()['self'] != null;
        } // Whether or not this resource is a new resource
        // @note Is the opposite of persisted()
        // @return [Boolean] whether or not the resource is a new resource

      }, {
        key: "newResource",
        value: function newResource() {
          return !this.persisted();
        } // Save any changes to the resource, and inserts the resource into callback after
        // @note
        //   If !resource.persisted(), then create it
        //   If resource.persisted(), then update it
        // @note
        //   Callback will be called regardless if the resource is successfully saved
        //   This is useful because ActiveResource builds regardless if it is valid or not,
        //   and one can read the errors on a resource in the same function as success
        // @example
        //   Order.build(...).save (savedresource) ->
        //     if savedresource.valid()
        //       ...
        //     else
        //       savedresource.errors.each (e) ->
        //         ...
        // @example
        //   resource.save ->
        //     if resource.valid()
        //       ...
        //     else
        //       resource.errors()
        // @param [Function] callback the callback to pass the ActiveResource into
        // @return [Promise] a promise to return the ActiveResource, valid or invalid

      }, {
        key: "save",
        value: function save(callback) {
          return this.__createOrUpdate().then(callback, callback);
        } // Update specific attributes of the resource, save it, and insert resource into callback after
        // @note
        //   If !resource.persisted(), then create it
        //   If resource.persisted(), then update it
        // @note
        //   Callback will be called regardless if the resource is successfully saved
        //   This is useful because ActiveResource builds regardless if it is valid or not,
        //   and one can read the errors on a resource in the same function as success
        // @example
        //   resource.update { title: '...', price: '...' }, ->
        //     if resource.valid()
        //       ...
        //     else
        //       resource.errors()
        // @param [Object] attributes the attributes to update in the resource
        // @param [Function] callback the callback to pass the ActiveResource into
        // @return [Promise] a promise to return the ActiveResource, valid or invalid

      }, {
        key: "update",
        value: function update(attributes, callback) {
          var attributesKeys, oldAttributes;
          attributesKeys = ActiveResource.prototype.Collection.build(_.keys(attributes));
          oldAttributes = _.pick(this.attributes(), attributesKeys.toArray());
          oldAttributes = _.defaults(oldAttributes, attributesKeys.inject({}, function (obj, k) {
            obj[k] = null;
            return obj;
          }));

          this.__assignAttributes(attributes);

          return this.__createOrUpdate().then(null, function (resource) {
            resource.__assignAttributes(oldAttributes);

            return resource;
          }).then(callback, callback);
        } // Deletes the resource from the server, assuming callbacks pass
        // TODO: Remove the resource from all associations as well
        // @example
        // Order.last().then (order) ->
        //   order.destroy()
        //   .then (destroyedresource) ->
        //     ...
        //   .catch ->
        //     ...

      }, {
        key: "destroy",
        value: function destroy() {
          var resource;
          return this.klass().resourceLibrary.interface.delete(this.links()['self'], resource = this).then(function () {
            resource.__links = {};
            return resource;
          });
        } // private
        // Called by `save` and `update` to determine if we should create a new resource with attributes
        // on the server, or simply update a persisted resource with the attributes
        // @note This uses the `related` link of the resource (example: `/api/v1/orders`) if it is not persisted,
        //   since that is the create endpoint. If the resource is persisted, it uses the `self` link of the resource,
        //   which would be `/api/v1/orders/:id`, so we can make changes to the persisted resource
        // @note This uses `PUT` for update instead of `PATCH` because until we implement dirty attributes
        //   we have to send the entire resource to the server, warranting use of the `PUT` verb
        // @return [Promise] a promise to return the persisted ActiveResource **or** ActiveResource with errors

      }, {
        key: "__createOrUpdate",
        value: function __createOrUpdate() {
          this.errors().reset();

          if (this.persisted()) {
            return this.klass().resourceLibrary.interface.patch(this.links()['self'], this);
          } else {
            return this.klass().resourceLibrary.interface.post(this.links()['related'], this);
          }
        }
      }]);

      return Persistence;
    }();
  }).call(undefined);
  (function () {
    ActiveResource.prototype.QueryParams = function () {
      var COLLECTION_RELATED, RESOURCE_RELATED;

      var QueryParams =
      /*#__PURE__*/
      function () {
        function QueryParams() {
          _classCallCheck(this, QueryParams);
        }

        _createClass(QueryParams, null, [{
          key: "queryParams",
          // Gets a queryParams object for `this`
          // If `this` is an instance of a class, instantiate its queryParams with that of its classes,
          // which will have built-in queryParams from autosave associations and `fields` declarations
          // TODO: Add autosave associations to default klass().queryParams (returns {} right now)
          // @return [Object] the queryParams for `this`
          value: function queryParams() {
            return this.__queryParams || (this.__queryParams = (typeof this.isA === "function" ? this.isA(ActiveResource.prototype.Base) : void 0) ? _.clone(this.klass().queryParams()) : {});
          } // Gets the queryParams for a given reflection of a resource's class
          // @note This is used by associations when doing any queries (reload, etc) to get the
          //   includes/fields that the association was initially created with in their owner's call,
          //   thus maintaining their fields/includes instead of getting all fields & no includes:
          // @example
          //   Product.includes(orders: 'customer').select('title', orders: ['price']).first()
          //   .then (resource) ->
          //     resource.queryParamsForReflection(resource.klass().reflectOnAssociation('orders'))
          //     => { includes: ['customer'], fields: { orders: ['price'] } }
          // @param [Reflection] reflection the reflection to get queryParams for
          // @return [Object] the queryParams for the reflections

        }, {
          key: "queryParamsForReflection",
          value: function queryParamsForReflection(reflection) {
            var includes, queryParams, ref;
            queryParams = {};

            if (this.queryParams()['include'] != null) {
              includes = ActiveResource.prototype.Collection.build(this.queryParams()['include']).inject([], function (out, i) {
                if (_.isObject(i)) {
                  _.each(_.keys(i), function (i2) {
                    if (i2 === reflection.name) {
                      return out.push.apply(out, _toConsumableArray(_.flatten([i[i2]])));
                    }
                  });
                }

                return out;
              });

              if (includes.length !== 0) {
                queryParams['include'] = includes;
              }
            }

            if (!(typeof reflection.polymorphic === "function" ? reflection.polymorphic() : void 0) && ((ref = this.queryParams()['fields']) != null ? ref[reflection.klass().queryName] : void 0) != null) {
              queryParams['fields'] = _.pick(this.queryParams()['fields'], reflection.klass().queryName);
            }

            return queryParams;
          }
        }, {
          key: "assignQueryParams",
          value: function assignQueryParams(queryParams) {
            return this.__queryParams = queryParams;
          } // Used to assign only resource related queryParams like `fields` and `include` to an object
          // @param [Object] queryParams the queryParams to pick resource related params out of and assign
          //   to `this`

        }, {
          key: "assignResourceRelatedQueryParams",
          value: function assignResourceRelatedQueryParams(queryParams) {
            return this.assignQueryParams(_.pick.apply(_, [queryParams].concat(_toConsumableArray(RESOURCE_RELATED))));
          }
        }, {
          key: "resetQueryParams",
          value: function resetQueryParams() {
            return this.__queryParams = {};
          }
        }, {
          key: "__resourceRelatedParams",
          value: function __resourceRelatedParams() {
            return _.pick.apply(_, [this.queryParams()].concat(_toConsumableArray(RESOURCE_RELATED)));
          }
        }, {
          key: "__collectionRelatedParams",
          value: function __collectionRelatedParams() {
            return _.pick.apply(_, [this.queryParams()].concat(_toConsumableArray(COLLECTION_RELATED)));
          } // Extends a value param of queryParams with the new value passed in
          // @example
          //   @__queryParams = { limit: 2 }
          //   param = 'limit'
          //   value = 5
          //   return { limit: 5 }
          // @note queryParams defaults to @__queryParams, but this function can be used
          //   to modify any object
          // @param [String] param the name of the param to extend
          // @param [Object] value the value to replace on the param
          // @param [Object] queryParams the object to modify instead of @__queryParams
          // @return [Object] the extended queryParams

        }, {
          key: "__extendValueParam",
          value: function __extendValueParam(param, value, queryParams) {
            queryParams || (queryParams = _.clone(this.queryParams()));
            queryParams[param] = value;
            return queryParams;
          } // Extends an object param of queryParams with the options passed in
          // @example
          //   @__queryParams = { fields: { order: '...' } }
          //   param = 'fields'
          //   options = { transactions: 'id,amount' }
          //   return { fields: { order: '...', transactions: 'id,amount' } }
          // @note queryParams defaults to @__queryParams, but this function can be used
          //   to modify any object
          // @param [String] param the name of the param to extend
          // @param [Object] options the options to add to the param
          // @param [Object] queryParams the object to modify instead of @__queryParams
          // @return [Object] the extended queryParams

        }, {
          key: "__extendObjectParam",
          value: function __extendObjectParam(param, options, queryParams) {
            queryParams || (queryParams = _.clone(this.queryParams()));
            queryParams[param] = _.extend(queryParams[param] || {}, options);
            return queryParams;
          } // Push items onto an array param of queryParams
          // @example
          //   @__queryParams = { sort: ['id'] }
          //   param = 'sort'
          //   value = 'updatedAt'
          //   return { sort: ['id', 'updatedAt'] }
          // @note queryParams defaults to @__queryParams, but this function can be used
          //   to modify any object
          // @param [String] param the name of the param to extend
          // @param [Array<String,Object>] items items to push onto the collection param
          // @param [Object] queryParams the object to modify instead of @__queryParams
          // @return [Object] the extended queryParams

        }, {
          key: "__extendArrayParam",
          value: function __extendArrayParam(param, items, queryParams) {
            queryParams || (queryParams = _.clone(this.queryParams())); // shallow clone

            queryParams[param] = queryParams[param] ? queryParams[param].slice(0) : []; // clone array

            if (items != null) {
              var _queryParams$param;

              (_queryParams$param = queryParams[param]).push.apply(_queryParams$param, _toConsumableArray(items));
            }

            return queryParams;
          }
        }]);

        return QueryParams;
      }();

       // private

      RESOURCE_RELATED = ['fields', 'include'];
      COLLECTION_RELATED = ['filter', 'sort', 'page'];
      return QueryParams;
    }.call(this);
  }).call(undefined);
  (function () {
    // Adds methods for managing reflections, which reflect on associations of ActiveResources
    ActiveResource.Reflection = ActiveResource.prototype.Reflection = function () {
      var Reflection =
      /*#__PURE__*/
      function () {
        function Reflection() {
          _classCallCheck(this, Reflection);
        }

        _createClass(Reflection, [{
          key: "reflections",
          // Returns an object with the name of the reflection as the key and a Reflection as the value
          // @example
          //   Order.reflections() == { transactions: HasManyReflection }
          // @return [Object] the name/reflection pair object for all reflections of the ActiveResource
          value: function reflections() {
            return this.__reflections || (this.__reflections = {});
          } // Returns all reflections of associations of the ActiveResource class
          // @param [String] macro filters reflections by their macro
          // @return [Collection] a collection of reflections of all associations

        }, {
          key: "reflectOnAllAssociations",
          value: function reflectOnAllAssociations() {
            var macro = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var reflections;
            reflections = ActiveResource.prototype.Collection.build(_.values(this.__reflections));

            if (macro) {
              reflections = reflections.select(function (r) {
                return r.macro === macro;
              });
            }

            return reflections;
          } // @return [Reflection] the reflection of a specific association

        }, {
          key: "reflectOnAssociation",
          value: function reflectOnAssociation(association) {
            return this.reflections()[association];
          } // Returns all reflections of autosaving associations of the ActiveResource class
          // @return [Collection] a collection of reflections of all autosaving associations

        }, {
          key: "reflectOnAllAutosaveAssociations",
          value: function reflectOnAllAutosaveAssociations() {
            var reflections;
            reflections = ActiveResource.prototype.Collection.build(_.values(this.__reflections));
            return reflections.select(function (r) {
              return typeof r.autosave === "function" ? r.autosave() : void 0;
            });
          } // Creates a reflection of an association
          // @param [String] macro the macro type for the reflection (hasMany, hasOne, belongsTo)
          // @param [String] name the name of the association to reflect on
          // @param [Object] options the options to build into the reflection
          // @param [Class] activeResource the ActiveResource class that owns this reflection
          // @return [Reflection] the built reflection of an association

        }], [{
          key: "create",
          value: function create(macro, name, options, activeResource) {
            var klass;

            klass = function () {
              switch (macro) {
                case 'hasMany':
                  return Reflection.prototype.HasManyReflection;

                case 'hasOne':
                  return Reflection.prototype.HasOneReflection;

                case 'belongsTo':
                  return Reflection.prototype.BelongsToReflection;
              }
            }();

            return new klass(name, options, activeResource);
          } // Adds a reflection to the ActiveResource's class
          // @param [Class] ar the ActiveResource class to add the reflection to
          // @param [String] name the name of the reflection
          // @param [Reflection] reflection the reflection to add to the class

        }, {
          key: "addReflection",
          value: function addReflection(ar, name, reflection) {
            var r;
            r = {};
            r[name] = reflection;
            return ar.__reflections = _.extend(ar.__reflections || {}, r);
          }
        }]);

        return Reflection;
      }();

      

      Reflection.prototype.AbstractReflection = function () {
        var INVALID_AUTOMATIC_INVERSE_OPTIONS, VALID_AUTOMATIC_INVERSE_MACROS, automaticInverseOf, canFindInverseOfAutomatically, validInverseReflection; // Reflects on associations between ActiveResources. This is stored at the class level,
        // and when an ActiveResource is instantiated the reflection is built into an appropriate
        // Association

        var AbstractReflection =
        /*#__PURE__*/
        function () {
          // @param [String] name the name of the association to reflect on
          // @param [Object] options the options to build into the reflection
          // @param [Class] activeResource the ActiveResource class that owns this reflection
          function AbstractReflection(name1, options1, activeResource1) {
            _classCallCheck(this, AbstractReflection);

            this.name = name1;
            this.options = options1;
            this.activeResource = activeResource1;

            if (this.autosave()) {
              this.activeResource.assignQueryParams(this.activeResource.__extendArrayParam('include', [this.name]));
            }
          } // Returns the target klass that this reflection reflects on
          // @note Will throw error if called on polymorphic reflection
          // @return [Class] The klass that this reflection reflects on


          _createClass(AbstractReflection, [{
            key: "klass",
            value: function klass() {
              return this.activeResource.resourceLibrary.constantize(this.className());
            }
          }, {
            key: "type",
            value: function type() {
              return this.__type || (this.__type = this.options['as'] && (this.options['foreignType'] || "".concat(this.options['as'], "Type")));
            } // @return [String] the className of the klass this reflection reflects on

          }, {
            key: "className",
            value: function className() {
              return this.__className || (this.__className = this.options['className'] || this.__deriveClassName());
            } // @return [String] the foreignKey of the reflection

          }, {
            key: "foreignKey",
            value: function foreignKey() {
              return this.__foreignKey || (this.__foreignKey = this.options['foreignKey'] || this.__deriveForeignKey());
            } // @return [String] the foreignType of the reflection

          }, {
            key: "foreignType",
            value: function foreignType() {
              return this.__foreignType || (this.__foreignType = this.options['foreignType'] || "".concat(this.name, "Type"));
            } // @param [Class] the class to get the primary key of
            // @return [String] the primary key for the associated klass this reflects on

          }, {
            key: "associationPrimaryKey",
            value: function associationPrimaryKey(klass) {
              return this.options['primaryKey'] || this.__primaryKey(klass || this.klass());
            } // @return [String] the primaryKey for the owner ActiveResource of the reflection

          }, {
            key: "activeResourcePrimaryKey",
            value: function activeResourcePrimaryKey() {
              return this.__activeResourcePrimaryKey || (this.__activeResourcePrimaryKey = this.options['primaryKey'] || this.__primaryKey(this.activeResource));
            } // @return [Boolean] whether or not this reflection is for a collection of resources

          }, {
            key: "collection",
            value: function collection() {
              return false;
            } // @return [Boolean] whether or not this reflection is the hasOne side of a singular reflection

          }, {
            key: "hasOne",
            value: function hasOne() {
              return false;
            } // @return [Boolean] whether or not this reflection is the belongsTo side of a singular reflection

          }, {
            key: "belongsTo",
            value: function belongsTo() {
              return false;
            } // @return [Boolean] whether or not the association can be constructed via a build/create method

          }, {
            key: "constructable",
            value: function constructable() {
              return true;
            } // @return [Boolean] whether or not the association is polymorphic

          }, {
            key: "polymorphic",
            value: function polymorphic() {
              return this.options['polymorphic'] || false;
            } // @return [Boolean] whether or not this is an autosave association

          }, {
            key: "autosave",
            value: function autosave() {
              return this.options['autosave'] || false;
            }
          }, {
            key: "buildAssociation",
            value: function buildAssociation() {
              return this.klass().build();
            } // Whether or not the reflection has an inverse

          }, {
            key: "hasInverse",
            value: function hasInverse() {
              return this.__inverseName() != null;
            } // The inverseOf this reflection on the target klass
            // @example
            //   Product.hasMany('orders')
            //   Order.belongsTo('product')
            //   Product.reflectOnAssociation('orders').inverseOf()
            //     # => Order.reflectOnAssociation('product')
            // @return [Reflection] the inverseOf this reflection

          }, {
            key: "inverseOf",
            value: function inverseOf() {
              if (!this.hasInverse()) {
                return;
              }

              return this.__inverseOf || (this.__inverseOf = this.klass().reflectOnAssociation(this.__inverseName()));
            } // Finds the inverseOf a polymorphic reflection, given a class to search the reflections of
            // @note The child side of the relationship must define @options['inverseOf'] in order for
            //   this to work
            // @example
            //   Order.hasMany('comments', as: 'resource')
            //   Comment.belongsTo('resource', polymorphic: true, inverseOf: 'comments')
            //   Comment.reflectOnAssociation('resource').polymorphicInverseOf(Order)
            //   # => Order.reflectOnAssociation('comments')
            // @param [Class] associatedClass the class to check for the inverseOf reflection on
            // @return [Reflection] the inverseOf this polymorphic reflection

          }, {
            key: "polymorphicInverseOf",
            value: function polymorphicInverseOf(associatedClass) {
              var inverseRelationship;

              if (this.hasInverse()) {
                if (inverseRelationship = associatedClass.reflectOnAssociation(this.options['inverseOf'])) {
                  return inverseRelationship;
                }
              }
            } // private
            // Derives the class name of the reflection from its name
            // @return [String] the class name of the reflection

          }, {
            key: "__deriveClassName",
            value: function __deriveClassName() {
              return s.classify(_.singularize(this.name));
            } // Derives the foreign key of the reflection based on its type
            // @return [String] the foreign key of the reflection

          }, {
            key: "__deriveForeignKey",
            value: function __deriveForeignKey() {
              if (this.belongsTo()) {
                return "".concat(this.name, "Id");
              } else if (this.options['as']) {
                return "".concat(this.options['as'], "Id");
              } else {
                return "".concat(s.camelize(this.activeResource.className, true), "Id");
              }
            } // Determines the primaryKey of a given class
            // @note Throws an error if the primaryKey could not be determined
            // @param [Class] klass the klass to determine the primaryKey of
            // @return [String] the primaryKey of the class

          }, {
            key: "__primaryKey",
            value: function __primaryKey(klass) {
              return klass.primaryKey || function () {
                throw "Unknown primary key for ".concat(klass.className);
              }();
            } // The name of the inverseOf this reflection
            // @example
            //   Product.has_many('orders')
            //   Product.reflectOnAssociation('orders').inverseName() # => 'product'
            // @return [String] the name of the inverseOf this reflection

          }, {
            key: "__inverseName",
            value: function __inverseName() {
              return this.options['inverseOf'] || (this.__automaticInverseOf === false ? null : this.__automaticInverseOf || (this.__automaticInverseOf = automaticInverseOf(this)));
            }
          }]);

          return AbstractReflection;
        }();

        
        ActiveResource.include(AbstractReflection, ActiveResource.prototype.Typing);
        AbstractReflection.__excludeFromExtend = true; // Finds the inverseOf the reflection automatically, either because an inverseOf option
        // was specified or through using the name of the ActiveResource to find this reflection
        // on the target klass
        // @note A belongsTo reflection will not have an automaticInverseOf if it belongsTo a
        //   one-to-many reflection
        // @param [Reflection] the reflection to find the automaticInverseOf
        // @return [Reflection,Boolean] the automaticInverseOf reflection for this reflection

        automaticInverseOf = function automaticInverseOf(reflection) {
          var e, inverseName, inverseReflection;

          if (canFindInverseOfAutomatically(reflection)) {
            inverseName = s.camelize(reflection.options['as'] || reflection.activeResource.className, true);

            try {
              inverseReflection = reflection.klass().reflectOnAssociation(inverseName);
            } catch (error) {
              inverseReflection = false;
            }

            if (validInverseReflection(reflection, inverseReflection)) {
              return inverseName;
            }
          }

          return false;
        };

        VALID_AUTOMATIC_INVERSE_MACROS = ['hasMany', 'hasOne', 'belongsTo'];
        INVALID_AUTOMATIC_INVERSE_OPTIONS = ['polymorphic']; // Check that reflection does not have any options that prevent us from being
        // able to guess its inverse automatically.
        // @note
        //   1. The 'inverseOf' option cannot be false
        //   2. The reflection macro must be in the list of valid automatic inverse macros
        //   3. The reflection must not have any options like 'polymorphic' that prevent us
        //      from correctly guessing the inverse
        // @param [Reflection] reflection the reflection to check if we can find the inverseOf automatically
        // @return [Boolean] whether or not we can find the inverseOf automatically

        canFindInverseOfAutomatically = function canFindInverseOfAutomatically(reflection) {
          return reflection.options['inverseOf'] !== false && _.include(VALID_AUTOMATIC_INVERSE_MACROS, reflection.macro) && _.isEmpty(_.pick.apply(_, [reflection.options].concat(_toConsumableArray(INVALID_AUTOMATIC_INVERSE_OPTIONS))));
        }; // Checks if inverse reflection that is returned from `automaticInverseOf` method is a
        // valid reflection. We must make sure that the reflections ActiveResource className matches
        // up with the current reflections klass className
        // @note klass() will always be valid because when theres an error from calling `klass()`,
        //   `reflection` will already be set to false
        // @param [Reflection] reflection the reflection this inverseReflection will be for
        // @param [Reflection,Boolean] inverseReflection the inverse reflection to check the validity of
        // @return [Boolean] whether or not the inverse reflection is valid


        validInverseReflection = function validInverseReflection(reflection, inverseReflection) {
          return inverseReflection && reflection.klass().className === inverseReflection.activeResource.className && canFindInverseOfAutomatically(inverseReflection);
        };

        return AbstractReflection;
      }.call(this);

      Reflection.prototype.HasManyReflection = function () {
        var HasManyReflection =
        /*#__PURE__*/
        function (_Reflection$prototype) {
          _inherits(HasManyReflection, _Reflection$prototype);

          function HasManyReflection() {
            _classCallCheck(this, HasManyReflection);

            return _possibleConstructorReturn(this, _getPrototypeOf(HasManyReflection).apply(this, arguments));
          }

          _createClass(HasManyReflection, [{
            key: "collection",
            value: function collection() {
              return true;
            }
          }, {
            key: "associationClass",
            value: function associationClass() {
              return ActiveResource.prototype.Associations.prototype.HasManyAssociation;
            }
          }]);

          return HasManyReflection;
        }(Reflection.prototype.AbstractReflection);

        
        HasManyReflection.__excludeFromExtend = true;
        HasManyReflection.prototype.macro = 'hasMany';
        return HasManyReflection;
      }.call(this);

      Reflection.prototype.HasOneReflection = function () {
        var HasOneReflection =
        /*#__PURE__*/
        function (_Reflection$prototype2) {
          _inherits(HasOneReflection, _Reflection$prototype2);

          function HasOneReflection() {
            _classCallCheck(this, HasOneReflection);

            return _possibleConstructorReturn(this, _getPrototypeOf(HasOneReflection).apply(this, arguments));
          }

          _createClass(HasOneReflection, [{
            key: "hasOne",
            value: function hasOne() {
              return true;
            }
          }, {
            key: "associationClass",
            value: function associationClass() {
              return ActiveResource.prototype.Associations.prototype.HasOneAssociation;
            }
          }]);

          return HasOneReflection;
        }(Reflection.prototype.AbstractReflection);

        
        HasOneReflection.__excludeFromExtend = true;
        HasOneReflection.prototype.macro = 'hasOne';
        return HasOneReflection;
      }.call(this);

      Reflection.prototype.BelongsToReflection = function () {
        var BelongsToReflection =
        /*#__PURE__*/
        function (_Reflection$prototype3) {
          _inherits(BelongsToReflection, _Reflection$prototype3);

          function BelongsToReflection() {
            _classCallCheck(this, BelongsToReflection);

            return _possibleConstructorReturn(this, _getPrototypeOf(BelongsToReflection).apply(this, arguments));
          }

          _createClass(BelongsToReflection, [{
            key: "belongsTo",
            value: function belongsTo() {
              return true;
            }
          }, {
            key: "constructable",
            value: function constructable() {
              return !this.polymorphic();
            }
          }, {
            key: "associationClass",
            value: function associationClass() {
              if (this.polymorphic()) {
                return ActiveResource.prototype.Associations.prototype.BelongsToPolymorphicAssociation;
              } else {
                return ActiveResource.prototype.Associations.prototype.BelongsToAssociation;
              }
            }
          }]);

          return BelongsToReflection;
        }(Reflection.prototype.AbstractReflection);

        
        BelongsToReflection.__excludeFromExtend = true;
        BelongsToReflection.prototype.macro = 'belongsTo';
        return BelongsToReflection;
      }.call(this);

      return Reflection;
    }.call(this);
  }).call(undefined);
  (function () {
    // Relation constructs queries based on a chained series of functions that extend the chain
    // or execute the built query, then building the result and returning it as either an
    // ActiveResource::Base or Collection of ActiveResource::Base
    // ActiveResource::Base extends Relation and Relation.prototype in order to add class level and instance level
    // Relation functions to its class level. Relation instances build extended Relation instances, but
    // ActiveResource::Base subclasses can build extended Relation instances much like Rails
    // @example
    //   Order.where(price: 5.0).all()
    // @example
    //   Order.where(price: 5.0).order('updatedAt').page(2).perPage(5).all()
    // @example
    //   Order.includes('transactions').select('id','price',transactions: ['id','amount']).first(5)
    // @example
    //   Order.find(token: 'as8h2nW')
    // @example
    //   Order.includes('transactions').findBy(token: 'as8h2nW')
    ActiveResource.Relation = ActiveResource.prototype.Relation = function () {
      var Relation =
      /*#__PURE__*/
      function () {
        // @param [ActiveResource::Base] base the resource class this relation is for
        // @param [Object] __queryParams the __queryParams already built by previous links in
        //   the Relation chain
        function Relation(base, __queryParams) {
          var _this19 = this;

          _classCallCheck(this, Relation);

          var INTERNAL_METHODS, classMethods, customClassMethods, mixin;
          this.base = base;
          this.__queryParams = __queryParams;
          this.queryName = this.base.queryName;

          if (this.base.isA(Function)) {
            INTERNAL_METHODS = ['arguments', 'caller', 'length', 'name', 'prototype', '__super__', 'className', 'queryName', 'resourceLibrary', '__attributes', '__callbacks', '__links', '__reflections', '__queryParams'];
            classMethods = _.difference(Object.getOwnPropertyNames(this.base), _.keys(ActiveResource.prototype.Base));
            customClassMethods = _.difference(classMethods, INTERNAL_METHODS);
            mixin = ActiveResource.Collection.build(customClassMethods).inject({}, function (obj, method) {
              obj[method] = _this19.base[method];
              return obj;
            });
            ActiveResource.extend(this, mixin);
          }
        } // Returns links to the server for the resource that this relation is for
        // This will always be { related: baseUrl + '/[@base.queryName]' }
        // @return [Object] string URLs for the resource


        _createClass(Relation, [{
          key: "links",
          value: function links() {
            return this.base.links();
          } // Returns the interface for the resource, taken from its klass's resourceLibrary
          // @return [Interface] the interface to use for this resource

        }, {
          key: "interface",
          value: function _interface() {
            return this.base.interface();
          } // Adds filters to the query
          // @example
          //  .where(price: 5.0) = { filter: { price: 5.0 } }
          // @param [Object] options the hash of filters to add the query
          // @return [ActiveResource::Relation] the extended relation with added `filter` params
          // 1. Extend __queryParams['filter'] with the additional options
          // 2. Create new relation with the extended __queryParams

        }, {
          key: "where",
          value: function where(options) {
            return this.__newRelation(this.__extendObjectParam('filter', options));
          } // Sorts the query based on columns
          // @example
          //  .order(updatedAt: 'asc') = { sort: 'updatedAt' }
          // @example
          //  .order(price: 'desc') = { sort: '-price' }
          // @example
          //  .order(price: 'desc', updatedAt: 'asc') = { sort: '-price,updatedAt' }
          // @param [Array<String>] args a list of columns to order the query by
          // @return [ActiveResource::Relation] the extended relation with added `sort` params
          // 1. Add sorting key/value pairs to __queryParams['sort'] object
          // 2. Create new relation with the extended __queryParams

        }, {
          key: "order",
          value: function order(args) {
            return this.__newRelation(this.__extendObjectParam('sort', args));
          } // Selects the fields to return from the query
          // @example
          //  Order.select('id', 'updatedAt') = { fields: { orders: 'id,updatedAt' } }
          // @example
          //  Order.includes('transactions').select('id', 'updatedAt', transactions: 'amount') =
          //    { fields: { orders: 'id,updatedAt', transactions: 'amount' } }
          // @example
          //  Order.includes(transactions: 'merchant')
          //  .select('id', 'updatedAt', transactions: 'amount', merchant: ['id', 'name']) =
          //    { fields: { orders: 'id,updatedAt', transactions: 'amount', merchant: 'id,name' } }
          // @note Just because the merchant include is nested, does not mean we nest the merchant fields definition
          // @param [Array<String,Object>] args an array of field representations to cull the query by
          // @return [ActiveResource::Relation] the extended relation with added `sort` params
          // 1. Build new queryParams so we don't persist across relation constructions
          // 2. Set queryParams.__root to @queryName so we can use it for future merging of fields/includes in interfaces
          // 3. Flatten the field arguments into an array of strings/objects and iterate over it
          // 4. Determine the model name for each field
          //   * If object: model name is the key (Order.select({ transactions: [...] }) # => transactions)
          //   * If string: model name is @base.queryName (Order.select('id') # => orders)
          // 5. Append the list of fields to the array of fields for that model
          //   * If object: first value of arg is array to append (Order.select({ transactions: ['id'] }) => ['id'])
          //   * If string: arg itself is item to append to array (Order.select('id') => ['id'])
          // 6. Create new relation with the extended queryParams

        }, {
          key: "select",
          value: function select() {
            var _this20 = this;

            var queryParams;
            queryParams = _.clone(this.queryParams());
            queryParams['fields'] || (queryParams['fields'] = {});
            queryParams['__root'] || (queryParams['__root'] = this.queryName);

            for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              args[_key5] = arguments[_key5];
            }

            ActiveResource.prototype.Collection.build(args).map(function (a) {
              var i, key, len, ref, results;

              if (_.isObject(a)) {
                ref = _.keys(a);
                results = [];

                for (i = 0, len = ref.length; i < len; i++) {
                  key = ref[i];
                  results.push(_.pick(a, key));
                }

                return results;
              } else {
                return a;
              }
            }).flatten().each(function (arg) {
              var modelName;
              modelName = _.isObject(arg) ? _.keys(arg)[0] : queryParams.__root;
              return queryParams['fields'] = _this20.__extendArrayParam(modelName, _.isObject(arg) ? [_.values(arg)[0]] : [arg], queryParams['fields']);
            });
            return this.__newRelation(queryParams);
          } // Defines the page number of the query
          // @example
          //  .page(2) = { page: { number: 2 } }
          // @param [Integer] value the page number to define for the query
          // @return [ActiveResource::Relation] the extended relation with added `page.number` param

        }, {
          key: "page",
          value: function page(value) {
            return this.__newRelation(this.__extendObjectParam('page', {
              number: value
            }));
          } // Defines the page size of the query
          // @example
          //  .perPage(5) = { page: { size: 5 } }
          // @param [Integer] value the page size to define for the query
          // @return [ActiveResource::Relation] the extended relation with added `page.size` param

        }, {
          key: "perPage",
          value: function perPage(value) {
            return this.__newRelation(this.__extendObjectParam('page', {
              size: value
            }));
          } // Defines the limit on the number of resources to query
          // @example
          //  .limit(2) = { limit: 2 }
          // @param [Integer] value the limit on the number of resources to query
          // @return [ActiveResource::Relation] the extended relation with added `limit` param

        }, {
          key: "limit",
          value: function limit(value) {
            return this.__newRelation(this.__extendValueParam('limit', value));
          } // Defines the offset to start querying resources at
          // @example
          //  .offset(2) = { offset: 2 }
          // @param [Integer] value the offset to start querying resources at
          // @return [ActiveResource::Relation] the extended relation with added `offset` param

        }, {
          key: "offset",
          value: function offset(value) {
            return this.__newRelation(this.__extendValueParam('offset', value));
          } // Adds association includes to the query
          // @example
          //   .includes('merchant','product') = { include: ['merchant','product'] }
          // @example
          //   .includes('merchant','product',transactions: ['paymentMethod','paymentGateway']) =
          //     { ['merchant','product',{ transactions: ['paymentMethod','paymentGateway'] }] }
          // @example
          //   .includes('merchant','product',transactions: { paymentMethod: 'customer' }]) =
          //     { ['merchant','product',{ transactions: { paymentMethod: 'customer' } }] }
          // @param [Array<String,Object>] args the representations of includes to add to the query
          // @return [ActiveResource::Relation] the extended relation with added `include` params
          // 1. Go through array of args and separate objects with multiple keys in arrays of single key objects so
          //    the array does this: ['1', '2', { 3: 'a', 4: 'b' }] => ['1', '2', { 3: 'a' }, { 4: 'b' }]
          // 1. Append flattened array args to __queryParams['include'] collection
          // 2. Create new relation with extended __queryParams

        }, {
          key: "includes",
          value: function includes() {
            for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
              args[_key6] = arguments[_key6];
            }

            args = ActiveResource.prototype.Collection.build(args).map(function (a) {
              var i, key, len, ref, results;

              if (_.isObject(a)) {
                ref = _.keys(a);
                results = [];

                for (i = 0, len = ref.length; i < len; i++) {
                  key = ref[i];
                  results.push(_.pick(a, key));
                }

                return results;
              } else {
                return a;
              }
            }).flatten().toArray();
            return this.__newRelation(this.__extendArrayParam('include', args));
          } // Builds a new ActiveResource of the type for this relation
          // @example
          //   Order.build(price: 5.0, merchant: merchant)
          // @example
          //   Order.where(price: 5.0).build(merchant: merchant)
          // @param [Object] attributes the attributes to build the resource with
          // @return [ActiveResource::Base] the built resource
          // 1. If @base exists (class is Relation), then build base()
          // 2. If @base does not exist (class is Base), then build this()
          // 3. Assign attributes passed in to built resource
          // 4. Assign the filters of the Relation to the built resource
          // 5. Return the built resource

        }, {
          key: "build",
          value: function build() {
            var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var resource;
            resource = this.base != null ? new this.base() : new this();

            resource.__assignAttributes(_.extend(attributes, this.queryParams()['filter']));

            resource.assignResourceRelatedQueryParams(this.queryParams());

            resource.__executeCallbacks('afterBuild');

            return resource;
          } // Builds a new ActiveResource of the type for this relation and persists it on the server
          // @example
          //   Order.create(price: 5.0, merchant: merchant)
          // @example
          //   Order.where(price: 5.0).create(merchant: merchant)
          // @param [Object] attributes the attributes to build the resource with
          // @param [Function] callback the callback to pass the ActiveResource into on completion
          // @return [Promise] a promise to return the ActiveResource, valid or invalid

        }, {
          key: "create",
          value: function create() {
            var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callback = arguments.length > 1 ? arguments[1] : undefined;
            return this.build(attributes).save(callback);
          } // TODO: Add `updateAll` and `destroyAll` when JSON API supports mass updating/destroying
          // https://github.com/json-api/json-api/issues/795
          // Retrieves an ActiveResource in the relation corresponding to an ID
          // @param [Integer,String] primaryKey the primary key of the resource to query the server for
          // @return [Promise] a promise to return the ActiveResource **or** errors

        }, {
          key: "find",
          value: function find(primaryKey) {
            var url;

            if (primaryKey == null) {
              return;
            }

            url = ActiveResource.prototype.Links.__constructLink(this.links()['related'], primaryKey.toString());
            return this.interface().get(url, this.queryParams());
          } // Retrieves the first ActiveResource in the relation corresponding to conditions
          // @param [Object] conditions the conditions to filter by
          // @return [Promise] a promise to return the ActiveResource **or** errors

        }, {
          key: "findBy",
          value: function findBy(conditions) {
            return this.where(conditions).first();
          } // Retrieves all resources in the relation
          // @return [Promise] a promise to return a Collection of ActiveResources **or** errors

        }, {
          key: "all",
          value: function all() {
            return this.interface().get(this.links()['related'], this.queryParams());
          } // Retrieves all resources in the relation and calls a function with each one of them
          // @param [Function] iteratee the function to call with each item of the relation
          // @return [Promise] a promise that returns the collection **or** errors

        }, {
          key: "each",
          value: function each(iteratee) {
            return this.all().then(function (collection) {
              collection.each(iteratee);
              return collection;
            });
          } // Retrieves the first n ActiveResource in the relation
          // @param [Integer] n the number of resources to retrieve
          // @return [Promise] a promise to return an Array of n ActiveResources **or** errors
          // 1. If there are no page params set, we can apply limit n to optimize the query
          // => * If page params are set, we risk retrieving the "first" resource incorrectly
          // 2. Query all resources in the relation and then return the first N resources from the resulting collection

        }, {
          key: "first",
          value: function first(n) {
            var relation;
            relation = this.queryParams()['page'] != null ? this : this.limit(n || 1);
            return relation.all().then(function (collection) {
              return collection.first(n);
            });
          } // Retrieves the last n ActiveResource in the relation
          // @param [Integer] n the number of resources to retrieve
          // @return [Promise] a promise to return an Array of n ActiveResources **or** errors
          // 1. If there are no page params set, we can apply limit and offset to optimize the query
          // => * If page params are set, we risk retrieving the "last" resource incorrectly
          // 2. Query all resources in the relation and then return the last N resources from the resulting collection

        }, {
          key: "last",
          value: function last(n) {
            var relation;
            relation = this.queryParams()['page'] != null ? this : this.offset(-(n || 1)).limit(n || 1);
            return relation.all().then(function (collection) {
              return collection.last(n);
            });
          } // private
          // Creates a new ActiveResource::Relation with the extended __queryParams passed in
          // @param [Object] queryParams the extended query params for the relation
          // @return [ActiveResource::Relation] the new Relation for the extended query

        }, {
          key: "__newRelation",
          value: function __newRelation(queryParams) {
            return new this.constructor(this.base, queryParams);
          }
        }]);

        return Relation;
      }();

      
      ActiveResource.include(Relation, ActiveResource.prototype.QueryParams);
      ActiveResource.include(Relation, ActiveResource.prototype.Typing);
      return Relation;
    }.call(this);
  }).call(undefined);
  (function () {
    // Core methods and members for Base class
    ActiveResource.prototype.Core = function () {
      var Core =
      /*#__PURE__*/
      function () {
        function Core() {
          _classCallCheck(this, Core);
        }

        _createClass(Core, [{
          key: "interface",
          // The interface to use when querying the server for this resource
          value: function _interface() {
            return this.klass().interface();
          } // Creates a new ActiveResource::Relation with the extended queryParams passed in
          // @param [Object] queryParams the extended query params for the relation
          // @return [ActiveResource::Relation] the new Relation for the extended query

        }, {
          key: "toString",
          value: function toString() {
            return JSON.stringify(this.interface().buildResourceDocument({
              resourceData: this
            }));
          }
        }], [{
          key: "interface",
          // The interface to use when querying the server for this class
          value: function _interface() {
            return this.resourceLibrary.interface;
          }
        }, {
          key: "__newRelation",
          value: function __newRelation(queryParams) {
            return new ActiveResource.prototype.Relation(this, queryParams);
          }
        }]);

        return Core;
      }();

       // The name to use when constantizing on the client
      // @example 'Product'
      // @note On a production server where minification occurs, the actual name of classes
      //   `@constructor.name` will change from `Product` to perhaps `p`. But, since a class
      //   is added as a variable to its resource library (or its prototype), we can use this
      //   method to determine the name of the variable in the resource library scope
      // @className = ''
      // The name to use when querying the server for this resource
      // @example 'products'
      // @queryName = ''
      // The primary key by which to index this resource

      Core.primaryKey = 'id';
      return Core;
    }.call(this);
  }).call(undefined);
  (function () {
    // Base class for interfacing with ActiveResources
    // @example
    //   class window.Order extends ActiveResource::Base
    //     this.className = 'Order'
    //     this.queryName = 'orders'
    //     @belongsTo('product')
    //     @hasMany('comments', as: 'resource')
    ActiveResource.prototype.Base = function () {
      var Base = function Base() {
        _classCallCheck(this, Base);

        this.__initializeFields();
      };

      
      ActiveResource.extend(Base, ActiveResource.prototype.Associations);
      ActiveResource.extend(Base, ActiveResource.prototype.Attributes.prototype);
      ActiveResource.extend(Base, ActiveResource.prototype.Callbacks.prototype);
      ActiveResource.extend(Base, ActiveResource.prototype.Core);
      ActiveResource.extend(Base, ActiveResource.prototype.Fields.prototype);
      ActiveResource.extend(Base, ActiveResource.prototype.Links);
      ActiveResource.extend(Base, ActiveResource.prototype.Reflection.prototype);
      ActiveResource.extend(Base, ActiveResource.prototype.Relation.prototype);
      ActiveResource.include(Base, ActiveResource.prototype.Associations.prototype);
      ActiveResource.include(Base, ActiveResource.prototype.Core.prototype);
      ActiveResource.include(Base, ActiveResource.prototype.Attributes);
      ActiveResource.include(Base, ActiveResource.prototype.Callbacks);
      ActiveResource.include(Base, ActiveResource.prototype.Cloning);
      ActiveResource.include(Base, ActiveResource.prototype.Errors);
      ActiveResource.include(Base, ActiveResource.prototype.Fields);
      ActiveResource.include(Base, ActiveResource.prototype.Links.prototype);
      ActiveResource.include(Base, ActiveResource.prototype.Persistence);
      ActiveResource.include(Base, ActiveResource.prototype.QueryParams);
      ActiveResource.include(Base, ActiveResource.prototype.Typing);
      return Base;
    }.call(this);
  }).call(undefined);
  (function () {
    // The instantiated class that manages an association for an ActiveResource
    ActiveResource.prototype.Associations.prototype.Association = function () {
      var Association =
      /*#__PURE__*/
      function () {
        // @param [ActiveResource::Base] the resource that owners this association
        // @param [ActiveResource::Reflection] reflection the reflection of the association
        function Association(owner, reflection) {
          _classCallCheck(this, Association);

          this.owner = owner;
          this.reflection = reflection;
          this.reset();
        } // Delegate the klass of the association to its reflection
        // @return [Class] the ActiveResource class for the association


        _createClass(Association, [{
          key: "klass",
          value: function klass() {
            return this.reflection.klass();
          } // Delegate the options of the association to its reflection
          // @return [Object] the options for the association

        }, {
          key: "options",
          value: function options() {
            return this.reflection.options;
          } // Retrieves the links for the association
          // @note Two types of links:
          //   {
          //     links: {
          //       self:    '/products/1/relationships/orders',  # Called when modifying relationships
          //       related: '/products/1/orders'                 # Called when creating/finding target
          //     }
          //   }
          // @return [Object] the links for the association

        }, {
          key: "links",
          value: function links() {
            return this.__links || (this.__links = _.clone(this.klass().links()));
          } // The interface that the owner of this association uses

        }, {
          key: "interface",
          value: function _interface() {
            return this.owner.klass().interface();
          } // Resets the loaded flag to `false` and the target to `nil`

        }, {
          key: "reset",
          value: function reset() {
            this.__loaded = false;
            return this.target = null;
          } // Reloads the target and returns `this` on success
          // @return [Promise] a promise to return the reloaded association **or** errors

        }, {
          key: "reload",
          value: function reload() {
            var _this;

            this.reset();
            _this = this;
            return this.loadTarget().then(function () {
              return _this;
            });
          } // A setter and getter for the loaded flag
          // @note @loaded() is the getter
          // @note @loaded(true) is the setter
          // @param [Boolean] set whether or not to set loaded flag to true
          // @return [Boolean] the loaded flag

        }, {
          key: "loaded",
          value: function loaded() {
            var set = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (set) {
              this.__loaded = true;
            }

            return this.__loaded;
          } // Loads the target if needed and returns it
          // This method is abstract in the sense that it relies on `__findTarget`,
          // which is expected to be provided by descendants
          // If the target is already loaded it is just returned. Thus, you can call
          // loadTarget unconditionally to get the target
          // @return [Promise] a promise to return the loaded target **or** 404 error

        }, {
          key: "loadTarget",
          value: function loadTarget() {
            var _this21 = this;

            if (this.__canFindTarget()) {
              return this.__findTarget().then(function (loadedTarget) {
                _this21.target = loadedTarget;

                _this21.loaded(true);

                return loadedTarget;
              }).catch(function () {
                return _this21.reset();
              });
            } else {
              this.reset();
              return null;
            }
          } // Sets the inverse association of the resource to the owner of the association
          // @example
          //   GiftCard.hasOne('order')
          //   Order.belongsTo('giftCard')
          //   g = GiftCard.build()
          //   o = Order.build()
          //   g.association('order').setInverseInstance(o)
          //   o.association('giftCard').target == g
          // @param [ActiveResource::Base] the resource to set the inverse association of
          // @return [ActiveResource::Base] the resource, possibly with an inversed association

        }, {
          key: "setInverseInstance",
          value: function setInverseInstance(resource) {
            var inverse;

            if (this.__invertibleFor(resource)) {
              inverse = resource.association(this.__inverseReflectionFor(resource).name);

              if (inverse.reflection.collection()) {
                inverse.addToTarget(this.owner);
              } else {
                inverse.target = this.owner;
              }
            }

            return resource;
          } // private
          // Throws error if we try to assign resource of one type to an association that requires another type
          // @param [Object] resource the value/resource being assigned to the association

        }, {
          key: "__raiseOnTypeMismatch",
          value: function __raiseOnTypeMismatch(resource) {
            if (!(typeof resource.isA === "function" ? resource.isA(this.reflection.klass()) : void 0)) {
              throw "".concat(this.reflection.className(), " expected, got ").concat(resource, " which is an instance of ").concat(resource.constructor);
            }
          } // Whether or not we can find the target
          // We can find the target if:
          // 1. The owner resource is not a new resource, or we have a foreign key to query with
          // 2. The target klass exists (so we can build the target)
          // @return [Boolean] whether or not we can find the target

        }, {
          key: "__canFindTarget",
          value: function __canFindTarget() {
            return (!this.owner.newResource() || this.__foreignKeyPresent()) && this.klass();
          } // Defines attributes to create new resources with this association
          // @return [Object] the attributes to create new resources with this association with

        }, {
          key: "__creationAttributes",
          value: function __creationAttributes() {
            var attributes, base, base1;
            attributes = {};

            if ((typeof (base = this.reflection).hasOne === "function" ? base.hasOne() : void 0) || (typeof (base1 = this.reflection).collection === "function" ? base1.collection() : void 0)) {
              attributes[this.reflection.foreignKey()] = this.owner[this.reflection.activeResourcePrimaryKey()];

              if (this.reflection.options['as']) {
                attributes[this.reflection.type()] = this.owner.klass().className;
              }
            }

            return attributes;
          } // If the resource library of the owner klass is immutable, then execute callback in the context
          //   of a clone of the owner association, and return the cloned owner from the method calling
          //   __cloneOnCallbackIfImmutable
          // @note If immutable is true, then value will be cloned before assignment to owner.clone
          // @note Used by association writer, build, create, concat, delete
          // @param [Boolean] checkImmutable if true, check if immutable, otherwise just run the normal fn
          // @param [ActiveResource, Array<ActiveResource>] value the value to assign to the relationship
          // @param [Function] fn the function to execute, potentially in the scope of the cloned owner
          // @return [Resource, Promise] if immutable, return cloned owner, otherwise return the value returned by fn

        }, {
          key: "__executeOnCloneIfImmutable",
          value: function __executeOnCloneIfImmutable(checkImmutable, value, fn) {
            var _this22 = this;

            var clone, newValue, result;

            if (checkImmutable && this.owner.klass().resourceLibrary.immutable) {
              clone = this.owner.clone();
              newValue = ActiveResource.Collection.build(value).map(function (val) {
                return (val != null ? val.__createClone({
                  cloner: _this22.owner,
                  newCloner: clone
                }) : void 0) || null;
              });
              result = _.bind(fn, clone.association(this.reflection.name))(((typeof value.isA === "function" ? value.isA(ActiveResource.Collection) : void 0) || _.isArray(value)) && newValue.toArray() || newValue.first());

              if (result.then != null) {
                return result.then(function () {
                  return clone;
                });
              } else {
                return clone;
              }
            } else {
              return _.bind(fn, this)(value);
            }
          } // Used by hasOne and hasMany to set their owner attributes on belongsTo resources

        }, {
          key: "__setOwnerAttributes",
          value: function __setOwnerAttributes(resource) {
            var key, ref, results, value;
            ref = this.__creationAttributes();
            results = [];

            for (key in ref) {
              value = ref[key];
              results.push(resource[key] = value);
            }

            return results;
          } // Returns true if there is a foreign key present on the owner which
          // references the target. This is used to determine whether we can load
          // the target if the owner is currently a new resource (and therefore
          // without a key). If the owner is a new resource then foreign_key must
          // be present in order to load target.
          // Currently implemented by belongsTo (vanilla and polymorphic)

        }, {
          key: "__foreignKeyPresent",
          value: function __foreignKeyPresent() {
            return false;
          } // Can be redefined by subclasses, notably polymorphic belongs_to
          // The resource parameter is necessary to support polymorphic inverses as we must check for
          // the association in the specific class of the resource.
          // @param [ActiveResource::Base] the resource with reflection to find an inverseOf()
          // @return [ActiveResource::Reflection] the inverse reflection for the resource's reflection

        }, {
          key: "__inverseReflectionFor",
          value: function __inverseReflectionFor(resource) {
            return this.reflection.inverseOf();
          } // Returns true if inverse association on the given resource needs to be set.
          // This method is redefined by subclasses.
          // @param [ActiveResource::Base] the resource to determine if we need to set the inverse association for
          // @return [Boolean] whether or not the inverse association needs to be set

        }, {
          key: "__invertibleFor",
          value: function __invertibleFor(resource) {
            return this.__inverseReflectionFor(resource) != null;
          } // @return [Boolean] returns true if the resource contains the foreignKey

        }, {
          key: "__foreignKeyFor",
          value: function __foreignKeyFor(resource) {
            return typeof resource.hasAttribute === "function" ? resource.hasAttribute(this.reflection.foreignKey()) : void 0;
          } // Builds a resource in the association with the given attributes
          // @param [Object] attributes the attributes to build the resource with
          // @return [ActiveResource::Base] the built resource in the association

        }, {
          key: "__buildResource",
          value: function __buildResource(attributes) {
            var resource;
            resource = this.reflection.buildAssociation();

            resource.__assignAttributes(attributes);

            return resource;
          }
        }]);

        return Association;
      }();

      
      ActiveResource.include(Association, ActiveResource.prototype.Typing); // Don't add this class when extending/include the parent

      Association.__excludeFromExtend = true;
      return Association;
    }.call(this);
  }).call(undefined);
  (function () {
    // CollectionAssociation is an abstract class that provides common stuff to ease the implementation
    // of association proxies that represent collections.
    ActiveResource.prototype.Associations.prototype.CollectionAssociation =
    /*#__PURE__*/
    function (_ActiveResource$proto3) {
      _inherits(CollectionAssociation, _ActiveResource$proto3);

      // @note Adds @queryName so it can be used in CollectionProxy when making Relations
      // @param [ActiveResource::Base] the resource that owners this association
      // @param [ActiveResource::Reflection] reflection the reflection of the association
      function CollectionAssociation(owner, reflection) {
        var _this23;

        _classCallCheck(this, CollectionAssociation);

        _this23 = _possibleConstructorReturn(this, _getPrototypeOf(CollectionAssociation).apply(this, arguments));
        _this23.owner = owner;
        _this23.reflection = reflection;
        _this23.queryName = _this23.klass().queryName;
        return _this23;
      } // Getter for the proxy to the target


      _createClass(CollectionAssociation, [{
        key: "reader",
        value: function reader() {
          return this.proxy || (this.proxy = new ActiveResource.prototype.Associations.prototype.CollectionProxy(this));
        } // Setter for the target
        // @param [Collection,Array] resources the resources to assign to the association
        // @param [Boolean] save whether or not to persist the assignment on the server before
        //   continuing with the local assignment
        // @param [Boolean] checkImmutable if true, check if immutable when applying changes
        // @return [Promise] a promise that indicates that the assignment was successful **or** errors

      }, {
        key: "writer",
        value: function writer(resources) {
          var save = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          var checkImmutable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          return this.__executeOnCloneIfImmutable(checkImmutable, resources, function (resources) {
            var _this24 = this;

            var base, localAssignment, persistedResources;
            resources = ActiveResource.prototype.Collection.build(resources);
            resources.each(function (r) {
              return _this24.__raiseOnTypeMismatch(r);
            });
            persistedResources = resources.select(function (r) {
              return typeof r.persisted === "function" ? r.persisted() : void 0;
            });

            localAssignment = function localAssignment() {
              if (save) {
                _this24.loaded(true);
              }

              _this24.replace(resources);

              return resources;
            };

            if (save && !(typeof (base = this.owner).newResource === "function" ? base.newResource() : void 0) && (resources.empty() || !persistedResources.empty())) {
              return this.__persistAssignment(persistedResources.toArray()).then(localAssignment);
            } else {
              return localAssignment();
            }
          });
        } // Builds resource(s) for the association
        // @param [Object,Array<Object>] attributes the attributes to build into the resource
        // @return [ActiveResource::Base] the built resource(s) for the association, with attributes

      }, {
        key: "build",
        value: function build() {
          var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return this.__executeOnCloneIfImmutable(true, [], function () {
            var _this25 = this;

            if (_.isArray(attributes)) {
              return ActiveResource.prototype.Collection.build(attributes).map(function (attr) {
                return _this25.build(attr);
              });
            } else {
              return this.__concatResources(ActiveResource.prototype.Collection.build(this.__buildResource(attributes))).first();
            }
          });
        } // Creates resource for the association
        // @todo Add support for multiple resource creation when JSON API supports it
        // @param [Object] attributes the attributes to build into the resource
        // @param [Object] queryParams the options to add to the query, like `fields` and `include`
        // @param [Function] callback the function to pass the built resource into after calling create
        //   @note May not be persisted, in which case `resource.errors().empty? == false`
        // @return [ActiveResource::Base] a promise to return the persisted resource **or** errors

      }, {
        key: "create",
        value: function create() {
          var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _.noop();
          return this.__executeOnCloneIfImmutable(true, [], function () {
            return this.__createResource(attributes, queryParams, callback);
          });
        } // Pushes resources onto the target
        // @param [Collection,Array] resources the resources to push onto the association
        // @return [Promise] a promise that indicates that the concat was successful **or** errors

      }, {
        key: "concat",
        value: function concat(resources) {
          return this.__executeOnCloneIfImmutable(true, resources, function () {
            var _this26 = this;

            var base, persistedResources;
            resources = ActiveResource.prototype.Collection.build(resources);
            resources.each(function (r) {
              return _this26.__raiseOnTypeMismatch(r);
            });

            if (!(typeof (base = this.owner).newResource === "function" ? base.newResource() : void 0) && (persistedResources = resources.select(function (r) {
              return typeof r.persisted === "function" ? r.persisted() : void 0;
            })).size()) {
              // TODO: Do something better with unpersisted resources, like saving them
              return this.__persistConcat(persistedResources.toArray()).then(function () {
                return _this26.__concatResources(resources);
              });
            } else {
              return this.__concatResources(resources);
            }
          });
        } // Deletes resources from the target
        // @param [Collection,Array] resources the resources to delete from the association
        // @return [Promise] a promise that indicates that the delete was successful **or** errors

      }, {
        key: "delete",
        value: function _delete(resources) {
          return this.__executeOnCloneIfImmutable(true, resources, function () {
            var _this27 = this;

            var base, persistedResources;
            resources = ActiveResource.prototype.Collection.build(resources);
            resources.each(function (r) {
              return _this27.__raiseOnTypeMismatch(r);
            });

            if (!(typeof (base = this.owner).newResource === "function" ? base.newResource() : void 0) && (persistedResources = resources.select(function (r) {
              return typeof r.persisted === "function" ? r.persisted() : void 0;
            })).size()) {
              return this.__persistDelete(persistedResources.toArray()).then(function () {
                return _this27.__removeResources(resources);
              });
            } else {
              return this.__removeResources(resources);
            }
          });
        }
      }, {
        key: "reset",
        value: function reset() {
          _get(_getPrototypeOf(CollectionAssociation.prototype), "reset", this).call(this);

          return this.target = ActiveResource.prototype.Collection.build();
        } // Adds the resource to the target
        // @note Uses `replaceOnTarget` to replace the resource in the target if it is
        //   already in the target
        // @param [ActiveResource::Base] resource the resource to add to the target

      }, {
        key: "addToTarget",
        value: function addToTarget(resource) {
          var index;
          index = _.indexOf(this.target.toArray(), resource);

          if (index < 0) {
            index = null;
          }

          return this.replaceOnTarget(resource, index);
        } // Pushes the resource onto the target or replaces it if there is an index
        // @param [ActiveResource::Base] resource the resource to add to/replace on the target
        // @param [Integer] index the index of the existing resource to replace

      }, {
        key: "replaceOnTarget",
        value: function replaceOnTarget(resource, index) {
          if (index != null) {
            this.target.set(index, resource);
          } else {
            this.target.push(resource);
          }

          this.setInverseInstance(resource);
          return resource;
        } // Checks whether or not the target is empty
        // @note Does not take into consideration that the target may not be loaded,
        //   so if you want to truly know if the association is empty, check that
        //   `association(...).loaded() and association(...).empty()`
        // @return [Boolean] whether or not the target is empty

      }, {
        key: "empty",
        value: function empty() {
          return this.target.empty();
        } // private

      }, {
        key: "__findTarget",
        value: function __findTarget() {
          var _this;

          _this = this;
          return this.interface().get(this.links()['related'], this.owner.queryParamsForReflection(this.reflection)).then(function (resources) {
            resources.each(function (r) {
              return _this.setInverseInstance(r);
            });
            return resources;
          });
        } // Replaces the target with `other`
        // @param [Collection] other the array to replace on the target

      }, {
        key: "replace",
        value: function replace(other) {
          this.__removeResources(this.target);

          return this.__concatResources(other);
        } // Concats resources onto the target
        // @param [Collection] resources the resources to concat onto the target

      }, {
        key: "__concatResources",
        value: function __concatResources(resources) {
          var _this28 = this;

          resources.each(function (resource) {
            _this28.addToTarget(resource);

            return _this28.insertResource(resource);
          });
          return resources;
        } // Removes the resources from the target
        // @note Only calls @__deleteResources for now, but can implement callbacks when
        //   the library gets to that point
        // @param [Collection] the resources to remove from the association

      }, {
        key: "__removeResources",
        value: function __removeResources(resources) {
          return this.__deleteResources(resources);
        } // Deletes the resources from the target
        // @note Expected to be defined by descendants
        // @param [Collection] resources the resource to delete from the association

      }, {
        key: "__deleteResources",
        value: function __deleteResources(resources) {
          throw '__deleteResources not implemented on CollectionAssociation';
        } // Persists the new association by patching the owner's relationship endpoint
        // @param [Array] resources the resource to delete from the association

      }, {
        key: "__persistAssignment",
        value: function __persistAssignment(resources) {
          return this.interface().patch(this.links()['self'], resources, {
            onlyResourceIdentifiers: true
          });
        } // Persists a concat to the association by posting to the owner's relationship endpoint
        // @param [Array] resources the resource to delete from the association

      }, {
        key: "__persistConcat",
        value: function __persistConcat(resources) {
          return this.interface().post(this.links()['self'], resources, {
            onlyResourceIdentifiers: true
          });
        } // Persists deleting resources from the association by deleting it on the owner's relationship endpoint
        // @param [Array] resources the resource to delete from the association

      }, {
        key: "__persistDelete",
        value: function __persistDelete(resources) {
          return this.interface().delete(this.links()['self'], resources, {
            onlyResourceIdentifiers: true
          });
        } // @see #create

      }, {
        key: "__createResource",
        value: function __createResource(attributes, queryParams, callback) {
          var _this, base, resource;

          if (!(typeof (base = this.owner).persisted === "function" ? base.persisted() : void 0)) {
            throw 'You cannot call create on an association unless the parent is saved';
          }

          resource = this.__buildResource(attributes);
          resource.assignQueryParams(queryParams);
          this.insertResource(resource);
          _this = this;
          return resource.save(callback).then(function () {
            _this.addToTarget(resource);

            return resource;
          });
        }
      }]);

      return CollectionAssociation;
    }(ActiveResource.prototype.Associations.prototype.Association);
  }).call(undefined);
  (function () {
    // Manages a hasMany association in the same form as a Relation, except all queries
    // are made with association links and a lot of the methods make use of Association
    // to accomplish their goal
    ActiveResource.prototype.Associations.prototype.CollectionProxy = function () {
      var CollectionProxy =
      /*#__PURE__*/
      function (_ActiveResource$proto4) {
        _inherits(CollectionProxy, _ActiveResource$proto4);

        function CollectionProxy() {
          _classCallCheck(this, CollectionProxy);

          return _possibleConstructorReturn(this, _getPrototypeOf(CollectionProxy).apply(this, arguments));
        }

        _createClass(CollectionProxy, [{
          key: "target",
          value: function target() {
            return this.base.target;
          } // Override Relation#queryParams so we can merge together the queryParams of both
          // owner.queryParamsForReflection(thisReflection) and the queryParams of the association
          // class. This is important because we have to use the queryParams that were used to
          // initially load this association, but if we ever do another query here we must also use
          // the queryParams for the klass so autosave associations will be reloaded if we do something
          // like `product.orders().create(orderItems: [...])`, if Order#orderItems were an autosave
          // association
          // TODO: If we ever include an association, we should automatically add nested includes for
          // each default include of that association's class
          // @return [Object] queryParams the queryParams for the collection proxy

        }, {
          key: "queryParams",
          value: function queryParams() {
            var _this29 = this;

            return this.__queryParams || (this.__queryParams = function () {
              var base, klassQueryParams, queryParams;
              queryParams = _.clone(_this29.base.owner.queryParamsForReflection(_this29.base.reflection));

              if (!(typeof (base = _this29.base.reflection).polymorphic === "function" ? base.polymorphic() : void 0)) {
                klassQueryParams = _.clone(_this29.base.klass().queryParams());

                if (klassQueryParams['include'] != null) {
                  queryParams = _this29.__extendArrayParam('include', klassQueryParams['include'], queryParams);
                }

                if (klassQueryParams['fields'] != null) {
                  _.each(klassQueryParams['fields'], function (v, k) {
                    var v2;

                    if (v2 = queryParams['fields'][k]) {
                      var _v;

                      return (_v = v2).push.apply(_v, _toConsumableArray(v));
                    } else {
                      return queryParams['fields'][k] = v;
                    }
                  });
                }
              }

              return queryParams;
            }());
          } // Gets all the items in the association
          // @note This method will not set the target of the association to the response,
          //   it will only retrieve the target of the association and return it
          //   You must preload the association or call `load[Association]()` or
          //   `association(...).loadTarget()`
          // @param [Object] options the options to use when getting the items
          // @option [Boolean] cached if true, uses items already cached locallys
          // TODO: Add cached versions of first, last, find, where, empty etc.

        }, {
          key: "all",
          value: function all() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (options['cached']) {
              return this.target();
            } else {
              return _get(_getPrototypeOf(CollectionProxy.prototype), "all", this).call(this);
            }
          } // Loads into the target the result of `all` (which does not write its
          // result to target)
          // @note This differs from @base.loadTarget() because that does not use queryParams()
          //   like Relation or CollectionProxy
          // @return [Promise] the array of cached collection association items

        }, {
          key: "load",
          value: function load() {
            var _this30 = this;

            return this.all().then(function (collection) {
              return _this30.base.writer(collection, false, true);
            });
          } // Gets the cached association collection and returns it as an array
          // @return [Array<ActiveResource::Base>] the array of cached collection association items

        }, {
          key: "toArray",
          value: function toArray() {
            return this.all({
              cached: true
            }).toArray();
          } // Returns the size of the target currently loaded into memory
          // @return [Integer] the size of the loaded target

        }, {
          key: "size",
          value: function size() {
            return this.target().size();
          } // Checks whether or not the target is empty
          // @note Does not take into consideration that the target may not be loaded,
          //   so if you want to truly know if the association is empty, check that
          //   `association(...).loaded() and association(...).empty()`
          // @return [Boolean] whether or not the target is empty

        }, {
          key: "empty",
          value: function empty() {
            return this.target().empty();
          } // Assigns the association to `other`
          // @param [Array,Collection] other the other collection to set the association to
          // @param [Boolean] save whether or not to persist the assignment on the server
          // @return [Promise] a promise to return a success indicator (204 No Content) **or**
          //   an error indicator (403 Forbidden)

        }, {
          key: "assign",
          value: function assign(other) {
            var save = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            return this.base.writer(other, save, true);
          } // Pushes the resources onto the association
          // @param [Array,Collection] resources the resources to push onto the association
          // @return [Promise] a promise to return a success indicator (204 No Content) **or**
          //   an error indicator (403 Forbidden)

        }, {
          key: "push",
          value: function push(resources) {
            return this.base.concat(resources);
          } // Builds resource(s) for the association
          // @see CollectionAssociation#build
          // @param [Object,Array<Object>] attributes the attributes to build into the resource
          // @return [ActiveResource::Base] the built resource(s) for the association, with attributes

        }, {
          key: "build",
          value: function build() {
            var _this31 = this;

            var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var resources;
            attributes = _.isArray(attributes) ? _.map(attributes, function (attr) {
              return _.extend(attr, _this31.queryParams()['filter']);
            }) : _.extend(attributes, this.queryParams()['filter']);
            resources = ActiveResource.prototype.Collection.build(this.base.build(attributes));
            resources.each(function (r) {
              return r.assignResourceRelatedQueryParams(_this31.queryParams());
            });

            if (resources.size() > 1) {
              return resources;
            } else {
              return resources.first();
            }
          } // Create resource for the association
          // @see CollectionAssociation#create
          // @param [Object] attributes the attributes to build into the resource
          // @param [Function] callback the function to pass the built resource into after calling create
          //   @note May not be persisted, in which case `resource.errors().empty? == false`
          // @return [ActiveResource::Base] a promise to return the persisted resource **or** errors

        }, {
          key: "create",
          value: function create() {
            var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callback = arguments.length > 1 ? arguments[1] : undefined;
            attributes = _.extend(attributes, this.queryParams()['filter']);
            return this.base.create(attributes, this.__resourceRelatedParams(), callback);
          } // Reloads the association
          // @return [Promise<ActiveResource::Base>] a promise to return the reloaded target **or** errors

        }, {
          key: "reload",
          value: function reload() {
            return this.base.reload();
          } // Deletes the resources from the association
          // @param [Array,Collection] resources the resources to delete from the association
          // @return [Promise] a promise to return a success indicator (204 No Content) **or**
          //   an error indicator (403 Forbidden)

        }, {
          key: "delete",
          value: function _delete(resources) {
            return this.base.delete(resources);
          } // Deletes all the resources in the association from the association
          // @return [Promise] a promise to return a success indicator (204 No Content) **or**
          //   an error indicator (403 Forbidden)

        }, {
          key: "deleteAll",
          value: function deleteAll() {
            return this.base.delete(this.target());
          }
        }]);

        return CollectionProxy;
      }(ActiveResource.prototype.Relation);

       // Don't add this class when extending/include the parent

      CollectionProxy.__excludeFromExtend = true;
      return CollectionProxy;
    }.call(this);
  }).call(undefined);
  (function () {
    ActiveResource.prototype.Associations.prototype.HasManyAssociation =
    /*#__PURE__*/
    function (_ActiveResource$proto5) {
      _inherits(HasManyAssociation, _ActiveResource$proto5);

      function HasManyAssociation() {
        _classCallCheck(this, HasManyAssociation);

        return _possibleConstructorReturn(this, _getPrototypeOf(HasManyAssociation).apply(this, arguments));
      }

      _createClass(HasManyAssociation, [{
        key: "insertResource",
        // Inserts a resource into the collection by setting its owner attributes and inversing it
        // @param [ActiveResource::Base] resource the resource to insert into the collection
        value: function insertResource(resource) {
          this.__setOwnerAttributes(resource);

          return this.setInverseInstance(resource);
        } // Deletes resources from the target and removes their foreign key
        // @param [Array] resources the resources to delete from the target

      }, {
        key: "__deleteResources",
        value: function __deleteResources(resources) {
          var _this32 = this;

          resources.each(function (resource) {
            var inverse;

            if ((inverse = _this32.reflection.inverseOf()) != null) {
              return resource.association(inverse.name).replace(null);
            } else {
              return resource[_this32.reflection.foreignKey()] = null;
            }
          });
          return this.target = ActiveResource.prototype.Collection.build(_.difference(this.target.toArray(), resources.toArray()));
        }
      }]);

      return HasManyAssociation;
    }(ActiveResource.prototype.Associations.prototype.CollectionAssociation);
  }).call(undefined);
  (function () {
    ActiveResource.prototype.Associations.prototype.SingularAssociation =
    /*#__PURE__*/
    function (_ActiveResource$proto6) {
      _inherits(SingularAssociation, _ActiveResource$proto6);

      function SingularAssociation() {
        _classCallCheck(this, SingularAssociation);

        return _possibleConstructorReturn(this, _getPrototypeOf(SingularAssociation).apply(this, arguments));
      }

      _createClass(SingularAssociation, [{
        key: "reader",
        // Getter for the target
        value: function reader() {
          return this.target;
        } // Setter for the target
        // @param [ActiveResource::Base] resources the resource to assign to the association
        // @param [Boolean] save whether or not to persist the assignment on the server before
        //   continuing with the local assignment
        // @param [Boolean] checkImmutable if true, check if immutable when applying changes
        // @return [Promise] a promise that indicates that the assignment was successful **or** errors

      }, {
        key: "writer",
        value: function writer(resource) {
          var save = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          var checkImmutable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          return this.__executeOnCloneIfImmutable(checkImmutable, resource, function (resource) {
            var _this33 = this;

            var base, localAssignment;

            if (resource != null) {
              this.__raiseOnTypeMismatch(resource);
            }

            localAssignment = function localAssignment() {
              if (save) {
                _this33.loaded(true);
              }

              return _this33.replace(resource);
            };

            if (save && !(typeof (base = this.owner).newResource === "function" ? base.newResource() : void 0)) {
              return this.__persistAssignment(resource).then(localAssignment);
            } else {
              return localAssignment();
            }
          });
        } // Builds a resource for the association
        // @param [Object] attributes the attributes to build into the resource
        // @return [ActiveResource::Base] the built resource for the association, with attributes

      }, {
        key: "build",
        value: function build() {
          var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return this.__executeOnCloneIfImmutable(true, [], function () {
            var resource;
            resource = this.__buildResource(attributes);
            this.replace(resource);
            return resource;
          });
        } // Creates a resource for the association
        // @param [Object] attributes the attributes to build into the resource
        // @param [Object] queryParams the options to add to the query, like `fields` and `include`
        // @param [Function] callback the function to pass the built resource into after calling create
        //   @note May not be persisted, in which case `resource.errors().empty? == false`
        // @return [ActiveResource::Base] a promise to return the persisted resource **or** errors

      }, {
        key: "create",
        value: function create() {
          var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var callback = arguments.length > 2 ? arguments[2] : undefined;
          return this.__executeOnCloneIfImmutable(true, [], function () {
            return this.__createResource(attributes, queryParams, callback);
          });
        } // private

      }, {
        key: "replace",
        value: function replace(resource) {
          return raise('Subclasses must implement a replace(resource) method');
        } // Persists the new association by patching the owner's relationship endpoint

      }, {
        key: "__persistAssignment",
        value: function __persistAssignment(resource) {
          return this.interface().patch(this.links()['self'], resource, {
            onlyResourceIdentifiers: true
          });
        } // Gets the resource that is the target
        // @return [Promise] a promise to return the resource **or** error 404

      }, {
        key: "__getResource",
        value: function __getResource() {
          return this.interface().get(this.links()['related'], this.owner.queryParamsForReflection(this.reflection));
        } // Finds target using either the owner's relationship endpoint
        // @return [Promise] a promise to return the target **or** error 404

      }, {
        key: "__findTarget",
        value: function __findTarget() {
          var _this;

          _this = this;
          return this.__getResource().then(function (resource) {
            return _this.setInverseInstance(resource);
          });
        } // Creates a resource for the association
        // @see #create
        // @return [Promise] a promise to return the created target **or** errors

      }, {
        key: "__createResource",
        value: function __createResource(attributes, queryParams, callback) {
          var _this, base, resource;

          if (!(typeof (base = this.owner).persisted === "function" ? base.persisted() : void 0)) {
            throw 'You cannot call create on an association unless the parent is saved';
          }

          resource = this.__buildResource(attributes);
          resource.assignQueryParams(queryParams);
          this.replace(resource);
          _this = this;
          return resource.save(callback).then(function () {
            _this.loaded(true);

            return resource;
          });
        }
      }]);

      return SingularAssociation;
    }(ActiveResource.prototype.Associations.prototype.Association);
  }).call(undefined);
  (function () {
    ActiveResource.prototype.Associations.prototype.HasOneAssociation =
    /*#__PURE__*/
    function (_ActiveResource$proto7) {
      _inherits(HasOneAssociation, _ActiveResource$proto7);

      function HasOneAssociation() {
        _classCallCheck(this, HasOneAssociation);

        return _possibleConstructorReturn(this, _getPrototypeOf(HasOneAssociation).apply(this, arguments));
      }

      _createClass(HasOneAssociation, [{
        key: "replace",
        // private
        value: function replace(resource) {
          this.__removeTarget();

          if (resource) {
            this.__setOwnerAttributes(resource);

            this.setInverseInstance(resource);
            return this.target = resource;
          }
        } // TODO: Add delete/destroy dependency processing

      }, {
        key: "__removeTarget",
        value: function __removeTarget() {
          if (this.target) {
            this.__nullifyOwnerAttributes(this.target);
          }

          return this.target = null;
        }
      }, {
        key: "__nullifyOwnerAttributes",
        value: function __nullifyOwnerAttributes(resource) {
          return resource[this.reflection.foreignKey()] = null;
        }
      }]);

      return HasOneAssociation;
    }(ActiveResource.prototype.Associations.prototype.SingularAssociation);
  }).call(undefined);
  (function () {
    ActiveResource.prototype.Associations.prototype.BelongsToAssociation =
    /*#__PURE__*/
    function (_ActiveResource$proto8) {
      _inherits(BelongsToAssociation, _ActiveResource$proto8);

      function BelongsToAssociation() {
        _classCallCheck(this, BelongsToAssociation);

        return _possibleConstructorReturn(this, _getPrototypeOf(BelongsToAssociation).apply(this, arguments));
      }

      _createClass(BelongsToAssociation, [{
        key: "reset",
        value: function reset() {
          _get(_getPrototypeOf(BelongsToAssociation.prototype), "reset", this).call(this);

          return this.updated = false;
        } // private

      }, {
        key: "replace",
        value: function replace(resource) {
          if (resource) {
            this.__replaceKeys(resource);

            this.setInverseInstance(resource);
            this.updated = true;
          } else {
            this.__removeKeys();
          }

          return this.target = resource;
        } // Gets the resource that is the target of this association, using either the
        // owner's relationship data endpoint, or the foreign key to query the resource's root URL
        // @return [Promise] a promise to return the resource **or** error 404

      }, {
        key: "__getResource",
        value: function __getResource() {
          if (!this.owner.newResource()) {
            // @example Uses @links()['related'] == '/orders/1/product'
            return _get(_getPrototypeOf(BelongsToAssociation.prototype), "__getResource", this).call(this);
          } else {
            // @example Uses @links()['related'] == '/products/:product_id'
            return this.interface().get(this.links()['related'] + this.owner[this.reflection.foreignKey()], this.owner.queryParamsForReflection(this.reflection));
          }
        } // Replaces the foreign key of the owner with the primary key of the resource (the new target)
        // @param [ActiveResource::Base] resource the resource with a primaryKey to replace the foreignKey of the owner

      }, {
        key: "__replaceKeys",
        value: function __replaceKeys(resource) {
          return this.owner[this.reflection.foreignKey()] = resource.__readAttribute(this.reflection.associationPrimaryKey(resource.klass()));
        } // Removes the foreign key of the owner

      }, {
        key: "__removeKeys",
        value: function __removeKeys() {
          return this.owner[this.reflection.foreignKey()] = null;
        }
      }, {
        key: "__foreignKeyPresent",
        value: function __foreignKeyPresent() {
          return this.owner.__readAttribute(this.reflection.foreignKey()) != null;
        }
      }]);

      return BelongsToAssociation;
    }(ActiveResource.prototype.Associations.prototype.SingularAssociation);
  }).call(undefined);
  (function () {
    ActiveResource.prototype.Associations.prototype.BelongsToPolymorphicAssociation =
    /*#__PURE__*/
    function (_ActiveResource$proto9) {
      _inherits(BelongsToPolymorphicAssociation, _ActiveResource$proto9);

      function BelongsToPolymorphicAssociation() {
        _classCallCheck(this, BelongsToPolymorphicAssociation);

        return _possibleConstructorReturn(this, _getPrototypeOf(BelongsToPolymorphicAssociation).apply(this, arguments));
      }

      _createClass(BelongsToPolymorphicAssociation, [{
        key: "klass",
        value: function klass() {
          var type;
          type = this.owner[this.reflection.foreignType()];

          try {
            return this.owner.klass().resourceLibrary.constantize(type);
          } catch (error) {
            return void 0;
          }
        }
      }, {
        key: "links",
        value: function links() {
          if (this.klass()) {
            return _get(_getPrototypeOf(BelongsToPolymorphicAssociation.prototype), "links", this).call(this);
          } else {
            return {};
          }
        } // private
        // Replaces the foreignKey && foreignType of the owner
        // @see BelongsToAssociation#__replaceKeys

      }, {
        key: "__replaceKeys",
        value: function __replaceKeys(resource) {
          _get(_getPrototypeOf(BelongsToPolymorphicAssociation.prototype), "__replaceKeys", this).call(this, resource);

          return this.owner[this.reflection.foreignType()] = resource.klass().className;
        } // Removes the foreignKey && foreignType of the owner
        // @see BelongsToAssociation#__removeKeys

      }, {
        key: "__removeKeys",
        value: function __removeKeys() {
          _get(_getPrototypeOf(BelongsToPolymorphicAssociation.prototype), "__removeKeys", this).call(this);

          return this.owner[this.reflection.foreignType()] = null;
        } // Gets the inverse reflection of the polymorphic reflection

      }, {
        key: "__inverseReflectionFor",
        value: function __inverseReflectionFor(resource) {
          return this.reflection.polymorphicInverseOf(resource.klass());
        }
      }, {
        key: "__raiseOnTypeMismatch",
        value: function __raiseOnTypeMismatch(resource) {}
      }]);

      return BelongsToPolymorphicAssociation;
    }(ActiveResource.prototype.Associations.prototype.BelongsToAssociation); // A polymorphic association cannot have a type mismatch, by definition

  }).call(undefined);
  (function () {
    // Defines accessors on ActiveResources for managing associations, handling
    // foreign key reassignment, persistence, etc.
    ActiveResource.prototype.Associations.prototype.Builder = function () {
      var Builder = function Builder() {
        _classCallCheck(this, Builder);
      };

       // Don't add this class when extending/include the parent

      Builder.__excludeFromExtend = true;

      Builder.prototype.Association =
      /*#__PURE__*/
      function () {
        function Association() {
          _classCallCheck(this, Association);
        }

        _createClass(Association, null, [{
          key: "build",
          // Builds a reflection of an association and defines accessor methods into instances of the model
          // @param [Class] model the ActiveResource class to apply the association to
          // @param [String] name the name of the association
          // @param [Object] options options to apply to the association
          // @return [Reflection] the built reflection
          value: function build(model, name, options) {
            var reflection;
            reflection = ActiveResource.prototype.Reflection.create(this.macro, name, options, model);
            this.defineAccessors(model, reflection);
            return reflection;
          } // Defines getter/setter methods on the model for the association
          // @param [Class] model the ActiveResource class to apply the association to
          // @param [Reflection] reflection the reflection of the association to build accessors for

        }, {
          key: "defineAccessors",
          value: function defineAccessors(model, reflection) {
            var name;
            name = reflection.name;
            this.defineReaders(model, name);
            return this.defineWriters(model, name);
          } // Defines getter methods on the model for the association
          // @param [Class] mixin the class to mix getter methods into
          // @param [String] name the name of the association

        }, {
          key: "defineReaders",
          value: function defineReaders(mixin, name) {
            mixin.prototype[name] = function () {
              return this.association(name).reader();
            };

            return mixin.prototype["load".concat(s.capitalize(name))] = function () {
              return this.association(name).loadTarget();
            };
          } // Defines setter methods on the model for the association
          // @note In Rails, this method is defined much like `@define_readers` because
          //   operator overloading exists in Ruby. However, because operator overloading does
          //   not exist in Javascript, we must define `assign()` methods for associations. But,
          //   because singular association targets are assigned as variables to their owner model,
          //   whereas collection association targets are wrapped in a proxy, we must define the
          //   `assign()` methods in different ways. Singular association assignment is defined on
          //   the owner model as `assign_[target_klass]()`, whereas collection association
          //   assignment is defined on the proxy object, as `assign()`
          // @param [Class] mixin the class to mix getter methods into
          // @param [String] name the name of the association

        }, {
          key: "defineWriters",
          value: function defineWriters(mixin, name) {
            return _.noop();
          }
        }]);

        return Association;
      }();

      return Builder;
    }.call(this);
  }).call(undefined);
  (function () {
    ActiveResource.prototype.Associations.prototype.Builder.prototype.CollectionAssociation =
    /*#__PURE__*/
    function (_ActiveResource$proto10) {
      _inherits(CollectionAssociation, _ActiveResource$proto10);

      function CollectionAssociation() {
        _classCallCheck(this, CollectionAssociation);

        return _possibleConstructorReturn(this, _getPrototypeOf(CollectionAssociation).apply(this, arguments));
      }

      return CollectionAssociation;
    }(ActiveResource.prototype.Associations.prototype.Builder.prototype.Association);
  }).call(undefined);
  (function () {
    ActiveResource.prototype.Associations.prototype.Builder.prototype.HasMany = function () {
      var HasMany =
      /*#__PURE__*/
      function (_ActiveResource$proto11) {
        _inherits(HasMany, _ActiveResource$proto11);

        function HasMany() {
          _classCallCheck(this, HasMany);

          return _possibleConstructorReturn(this, _getPrototypeOf(HasMany).apply(this, arguments));
        }

        return HasMany;
      }(ActiveResource.prototype.Associations.prototype.Builder.prototype.CollectionAssociation);

      
      HasMany.macro = 'hasMany';
      return HasMany;
    }.call(this);
  }).call(undefined);
  (function () {
    ActiveResource.prototype.Associations.prototype.Builder.prototype.SingularAssociation =
    /*#__PURE__*/
    function (_ActiveResource$proto12) {
      _inherits(SingularAssociation, _ActiveResource$proto12);

      function SingularAssociation() {
        _classCallCheck(this, SingularAssociation);

        return _possibleConstructorReturn(this, _getPrototypeOf(SingularAssociation).apply(this, arguments));
      }

      _createClass(SingularAssociation, null, [{
        key: "defineAccessors",
        // Defines getter/setter methods on the model for the association
        // @param [Class] model the ActiveResource class to apply the association to
        // @param [Reflection] reflection the reflection of the association to build accessors for
        value: function defineAccessors(model, reflection) {
          _get(_getPrototypeOf(SingularAssociation), "defineAccessors", this).apply(this, arguments);

          if (typeof reflection.constructable === "function" ? reflection.constructable() : void 0) {
            return this.defineConstructors(model, reflection.name);
          }
        } // Defines setter methods on the model for the association
        // @param [Class] mixin the class to mix getter methods into
        // @param [String] name the name of the association

      }, {
        key: "defineWriters",
        value: function defineWriters(mixin, name) {
          mixin.prototype["assign".concat(s.capitalize(name))] = function (value) {
            return this.association(name).writer(value, false, true);
          };

          return mixin.prototype["update".concat(s.capitalize(name))] = function (value) {
            return this.association(name).writer(value, true, true);
          };
        } // Defines builder methods on the model for the association
        // @note This is only called on associations with reflections that are `constructable?`
        //   Polymorphic reflections are not constructable, because the type is ambiguous
        // @param [Class] mixin the class to mix construction methods into
        // @param [String] name the name of the association

      }, {
        key: "defineConstructors",
        value: function defineConstructors(mixin, name) {
          mixin.prototype["build".concat(s.capitalize(name))] = function (attributes) {
            return this.association(name).build(attributes);
          };

          return mixin.prototype["create".concat(s.capitalize(name))] = function (attributes, callback) {
            return this.association(name).create(attributes, callback);
          };
        }
      }]);

      return SingularAssociation;
    }(ActiveResource.prototype.Associations.prototype.Builder.prototype.Association);
  }).call(undefined);
  (function () {
    ActiveResource.prototype.Associations.prototype.Builder.prototype.BelongsTo = function () {
      var BelongsTo =
      /*#__PURE__*/
      function (_ActiveResource$proto13) {
        _inherits(BelongsTo, _ActiveResource$proto13);

        function BelongsTo() {
          _classCallCheck(this, BelongsTo);

          return _possibleConstructorReturn(this, _getPrototypeOf(BelongsTo).apply(this, arguments));
        }

        return BelongsTo;
      }(ActiveResource.prototype.Associations.prototype.Builder.prototype.SingularAssociation);

      
      BelongsTo.macro = 'belongsTo';
      return BelongsTo;
    }.call(this);
  }).call(undefined);
  (function () {
    ActiveResource.prototype.Associations.prototype.Builder.prototype.HasOne = function () {
      var HasOne =
      /*#__PURE__*/
      function (_ActiveResource$proto14) {
        _inherits(HasOne, _ActiveResource$proto14);

        function HasOne() {
          _classCallCheck(this, HasOne);

          return _possibleConstructorReturn(this, _getPrototypeOf(HasOne).apply(this, arguments));
        }

        return HasOne;
      }(ActiveResource.prototype.Associations.prototype.Builder.prototype.SingularAssociation);

      
      HasOne.macro = 'hasOne';
      return HasOne;
    }.call(this);
  }).call(undefined);
  (function () {
    ActiveResource.prototype.Immutable = function Immutable() {
      _classCallCheck(this, Immutable);
    };
  }).call(undefined);
  (function () {
    // ActiveResource methods for managing attributes of immutable resources
    ActiveResource.prototype.Immutable.prototype.Attributes =
    /*#__PURE__*/
    function () {
      function Attributes() {
        _classCallCheck(this, Attributes);
      }

      _createClass(Attributes, null, [{
        key: "assignAttributes",
        // Assigns `attributes` to a new resource cloned from this immutable resource
        // @param [Object] attributes the attributes to assign
        value: function assignAttributes(attributes) {
          var clone;
          clone = this.clone();

          clone.__assignAttributes(attributes);

          return clone;
        }
      }, {
        key: "reload",
        value: function reload() {
          var ref, resource, url;

          if (!(this.persisted() || ((ref = this.id) != null ? ref.toString().length : void 0) > 0)) {
            throw 'Cannot reload a resource that is not persisted or has an ID';
          }

          resource = this.clone();
          url = this.links()['self'] || ActiveResource.prototype.Links.__constructLink(this.links()['related'], this.id.toString());
          return this.interface().get(url, this.queryParams()).then(function (reloaded) {
            var fields;
            fields = reloaded.attributes();
            resource.klass().reflectOnAllAssociations().each(function (reflection) {
              var association, target;
              association = reloaded.association(reflection.name);

              if (!association.loaded()) {
                return;
              }

              target = association.reader();

              if (typeof reflection.collection === "function" ? reflection.collection() : void 0) {
                target = target.toArray();
              }

              return fields[reflection.name] = target;
            });

            resource.__assignFields(fields);

            return resource;
          });
        }
      }]);

      return Attributes;
    }();
  }).call(undefined);
  (function () {
    // ActiveResource methods for managing attributes of immutable resources
    ActiveResource.prototype.Immutable.prototype.Errors =
    /*#__PURE__*/
    function (_ActiveResource$proto15) {
      _inherits(Errors, _ActiveResource$proto15);

      function Errors() {
        _classCallCheck(this, Errors);

        return _possibleConstructorReturn(this, _getPrototypeOf(Errors).apply(this, arguments));
      }

      _createClass(Errors, [{
        key: "add",
        // Adds an error with code and message to a new immutable resource's error object for a field
        // @param [String] field the field the error applies to
        //   Or 'base' if it applies to the base object
        // @param [String] code the code for the error
        // @param [String] detail the message for the error
        // @return [ActiveResource::Base] the new resource with the error added
        value: function add(field, code) {
          var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
          var clone;
          clone = this.base.clone();

          clone.errors().__add(field, code, detail);

          return clone;
        } // Adds an array of errors in a new immutable resource and returns the resource
        // @see #add for individual error params
        // @param [Array<Array>] errors error objects to add
        // @return [ActiveResource::Base] the new resource with the errors added

      }, {
        key: "addAll",
        value: function addAll() {
          var clone;
          clone = this.base.clone();

          for (var _len7 = arguments.length, errors = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            errors[_key7] = arguments[_key7];
          }

          _.map(errors, function (error) {
            var _clone$errors;

            return (_clone$errors = clone.errors()).__add.apply(_clone$errors, _toConsumableArray(error));
          });

          return clone;
        } // Propagates errors with nested fields down through relationships to their appropriate resources
        // @note Clones any resource that has errors added to it and replaces it on the owner's association target
        // @param [ActiveResource.Collection<Object>] errors the errors to propagate down the resource

      }, {
        key: "propagate",
        value: function propagate(errors) {
          var _this34 = this;

          var errorsByTarget;
          errorsByTarget = errors.inject({}, function (targetObject, error) {
            var association, field, nestedError, nestedField;
            nestedField = error.field.split('.');
            field = nestedField.shift();
            nestedError = _.clone(error);

            if (targetObject[field] == null) {
              try {
                association = _this34.base.association(field);
              } catch (error1) {
                association = null;
              }

              targetObject[field] = {
                association: association,
                errors: ActiveResource.Collection.build()
              };
            }

            if (targetObject[field].association != null) {
              nestedError.field = nestedField.length === 0 && 'base' || nestedField.join('.');
            }

            targetObject[field].errors.push(nestedError);
            return targetObject;
          });
          return _.each(errorsByTarget, function (errorsForTarget, k) {
            var association, baseErrors, clone, ref, relationshipResource;

            if (errorsForTarget.association != null) {
              association = errorsForTarget.association;

              if (association.reflection.collection()) {
                baseErrors = errorsForTarget.errors.select(function (e) {
                  return e.field === 'base';
                });
                baseErrors.each(function (e) {
                  e.field = k;
                  return errorsForTarget.errors.delete(e);
                });
                baseErrors.each(function (e) {
                  return _this34.push(e);
                });
                relationshipResource = association.target.first();

                if (clone = relationshipResource != null ? relationshipResource.__createClone({
                  cloner: _this34.base
                }) : void 0) {
                  _this34.base.__fields[association.reflection.name].replace(relationshipResource, clone);

                  association.target.replace(relationshipResource, clone);
                  clone.errors().clear();
                  return clone.errors().propagate(errorsForTarget.errors);
                }
              } else {
                if (clone = (ref = association.target) != null ? ref.__createClone({
                  cloner: _this34.base
                }) : void 0) {
                  clone.errors().clear();
                  return clone.errors().propagate(errorsForTarget.errors);
                }
              }
            } else {
              return errorsForTarget.errors.each(function (e) {
                return _this34.push(e);
              });
            }
          });
        }
      }], [{
        key: "errors",
        // Override ActiveResource::Errors#errors so that errors on resources are managed immutably
        value: function errors() {
          return this.__errors || (this.__errors = new ActiveResource.prototype.Immutable.prototype.Errors(this));
        }
      }]);

      return Errors;
    }(ActiveResource.prototype.Errors);
  }).call(undefined);
  (function () {
    // ActiveResource methods for managing persistence of immutable resources to the server
    ActiveResource.prototype.Immutable.prototype.Persistence =
    /*#__PURE__*/
    function () {
      function Persistence() {
        _classCallCheck(this, Persistence);
      }

      _createClass(Persistence, null, [{
        key: "update",
        // Update specific attributes of the resource, save it, and insert resource into callback after
        // @param [Object] attributes the attributes to update in the resource
        // @param [Function] callback the callback to pass the ActiveResource into
        // @return [Promise] a promise to return the ActiveResource, valid or invalid
        value: function update(attributes, callback) {
          var attributesKeys, oldAttributes;
          attributesKeys = ActiveResource.prototype.Collection.build(_.keys(attributes));
          oldAttributes = _.pick(this.attributes(), attributesKeys.toArray());
          oldAttributes = _.defaults(oldAttributes, attributesKeys.inject({}, function (obj, k) {
            obj[k] = null;
            return obj;
          }));
          return this.__createOrUpdate(this.assignAttributes(attributes)).then(null, function (resource) {
            resource.__assignAttributes(oldAttributes);

            return resource;
          }).then(callback, callback);
        } // Override default __createOrUpdate so it will use a clone in persisting the record

      }, {
        key: "__createOrUpdate",
        value: function __createOrUpdate() {
          var clone = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.clone();
          clone.errors().reset();

          if (clone.persisted()) {
            return this.klass().resourceLibrary.interface.patch(this.links()['self'], clone);
          } else {
            return this.klass().resourceLibrary.interface.post(this.links()['related'], clone);
          }
        }
      }]);

      return Persistence;
    }();
  }).call(undefined);
  (function () {
    ActiveResource.prototype.Immutable.prototype.Base = function () {
      var Base =
      /*#__PURE__*/
      function (_ActiveResource$proto16) {
        _inherits(Base, _ActiveResource$proto16);

        function Base() {
          _classCallCheck(this, Base);

          return _possibleConstructorReturn(this, _getPrototypeOf(Base).call(this));
        }

        return Base;
      }(ActiveResource.prototype.Base);

      
      ActiveResource.include(Base, ActiveResource.prototype.Immutable.prototype.Attributes, true);
      ActiveResource.include(Base, ActiveResource.prototype.Immutable.prototype.Errors, true);
      ActiveResource.include(Base, ActiveResource.prototype.Immutable.prototype.Persistence, true);
      return Base;
    }.call(this);
  }).call(undefined);

  return activeResource;

})));

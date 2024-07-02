import {
  _defineProperty,
  _extends
} from "./chunk-G6I2PDTS.js";
import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-ZS7NZCD4.js";

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/@algolia/events/events.js
var require_events = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/@algolia/events/events.js"(exports, module) {
    function EventEmitter2() {
      this._events = this._events || {};
      this._maxListeners = this._maxListeners || void 0;
    }
    module.exports = EventEmitter2;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._maxListeners = void 0;
    EventEmitter2.defaultMaxListeners = 10;
    EventEmitter2.prototype.setMaxListeners = function(n32) {
      if (!isNumber(n32) || n32 < 0 || isNaN(n32))
        throw TypeError("n must be a positive number");
      this._maxListeners = n32;
      return this;
    };
    EventEmitter2.prototype.emit = function(type) {
      var er, handler, len, args, i32, listeners;
      if (!this._events)
        this._events = {};
      if (type === "error") {
        if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
          er = arguments[1];
          if (er instanceof Error) {
            throw er;
          } else {
            var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
            err.context = er;
            throw err;
          }
        }
      }
      handler = this._events[type];
      if (isUndefined(handler))
        return false;
      if (isFunction(handler)) {
        switch (arguments.length) {
          case 1:
            handler.call(this);
            break;
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          default:
            args = Array.prototype.slice.call(arguments, 1);
            handler.apply(this, args);
        }
      } else if (isObject(handler)) {
        args = Array.prototype.slice.call(arguments, 1);
        listeners = handler.slice();
        len = listeners.length;
        for (i32 = 0; i32 < len; i32++)
          listeners[i32].apply(this, args);
      }
      return true;
    };
    EventEmitter2.prototype.addListener = function(type, listener) {
      var m14;
      if (!isFunction(listener))
        throw TypeError("listener must be a function");
      if (!this._events)
        this._events = {};
      if (this._events.newListener)
        this.emit(
          "newListener",
          type,
          isFunction(listener.listener) ? listener.listener : listener
        );
      if (!this._events[type])
        this._events[type] = listener;
      else if (isObject(this._events[type]))
        this._events[type].push(listener);
      else
        this._events[type] = [this._events[type], listener];
      if (isObject(this._events[type]) && !this._events[type].warned) {
        if (!isUndefined(this._maxListeners)) {
          m14 = this._maxListeners;
        } else {
          m14 = EventEmitter2.defaultMaxListeners;
        }
        if (m14 && m14 > 0 && this._events[type].length > m14) {
          this._events[type].warned = true;
          console.error(
            "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
            this._events[type].length
          );
          if (typeof console.trace === "function") {
            console.trace();
          }
        }
      }
      return this;
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.once = function(type, listener) {
      if (!isFunction(listener))
        throw TypeError("listener must be a function");
      var fired = false;
      function g9() {
        this.removeListener(type, g9);
        if (!fired) {
          fired = true;
          listener.apply(this, arguments);
        }
      }
      g9.listener = listener;
      this.on(type, g9);
      return this;
    };
    EventEmitter2.prototype.removeListener = function(type, listener) {
      var list, position, length, i32;
      if (!isFunction(listener))
        throw TypeError("listener must be a function");
      if (!this._events || !this._events[type])
        return this;
      list = this._events[type];
      length = list.length;
      position = -1;
      if (list === listener || isFunction(list.listener) && list.listener === listener) {
        delete this._events[type];
        if (this._events.removeListener)
          this.emit("removeListener", type, listener);
      } else if (isObject(list)) {
        for (i32 = length; i32-- > 0; ) {
          if (list[i32] === listener || list[i32].listener && list[i32].listener === listener) {
            position = i32;
            break;
          }
        }
        if (position < 0)
          return this;
        if (list.length === 1) {
          list.length = 0;
          delete this._events[type];
        } else {
          list.splice(position, 1);
        }
        if (this._events.removeListener)
          this.emit("removeListener", type, listener);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function(type) {
      var key2, listeners;
      if (!this._events)
        return this;
      if (!this._events.removeListener) {
        if (arguments.length === 0)
          this._events = {};
        else if (this._events[type])
          delete this._events[type];
        return this;
      }
      if (arguments.length === 0) {
        for (key2 in this._events) {
          if (key2 === "removeListener")
            continue;
          this.removeAllListeners(key2);
        }
        this.removeAllListeners("removeListener");
        this._events = {};
        return this;
      }
      listeners = this._events[type];
      if (isFunction(listeners)) {
        this.removeListener(type, listeners);
      } else if (listeners) {
        while (listeners.length)
          this.removeListener(type, listeners[listeners.length - 1]);
      }
      delete this._events[type];
      return this;
    };
    EventEmitter2.prototype.listeners = function(type) {
      var ret;
      if (!this._events || !this._events[type])
        ret = [];
      else if (isFunction(this._events[type]))
        ret = [this._events[type]];
      else
        ret = this._events[type].slice();
      return ret;
    };
    EventEmitter2.prototype.listenerCount = function(type) {
      if (this._events) {
        var evlistener = this._events[type];
        if (isFunction(evlistener))
          return 1;
        else if (evlistener)
          return evlistener.length;
      }
      return 0;
    };
    EventEmitter2.listenerCount = function(emitter, type) {
      return emitter.listenerCount(type);
    };
    function isFunction(arg) {
      return typeof arg === "function";
    }
    function isNumber(arg) {
      return typeof arg === "number";
    }
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    function isUndefined(arg) {
      return arg === void 0;
    }
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/inherits.js
var require_inherits = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/inherits.js"(exports, module) {
    "use strict";
    function inherits(ctor, superCtor) {
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
    module.exports = inherits;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/DerivedHelper/index.js
var require_DerivedHelper = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/DerivedHelper/index.js"(exports, module) {
    "use strict";
    var EventEmitter2 = require_events();
    var inherits = require_inherits();
    function DerivedHelper(mainHelper, fn, recommendFn) {
      this.main = mainHelper;
      this.fn = fn;
      this.recommendFn = recommendFn;
      this.lastResults = null;
      this.lastRecommendResults = null;
    }
    inherits(DerivedHelper, EventEmitter2);
    DerivedHelper.prototype.detach = function() {
      this.removeAllListeners();
      this.main.detachDerivedHelper(this);
    };
    DerivedHelper.prototype.getModifiedState = function(parameters) {
      return this.fn(parameters);
    };
    DerivedHelper.prototype.getModifiedRecommendState = function(parameters) {
      return this.recommendFn(parameters);
    };
    module.exports = DerivedHelper;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js
var require_escapeFacetValue = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js"(exports, module) {
    "use strict";
    function escapeFacetValue2(value) {
      if (typeof value !== "string")
        return value;
      return String(value).replace(/^-/, "\\-");
    }
    function unescapeFacetValue2(value) {
      if (typeof value !== "string")
        return value;
      return value.replace(/^\\-/, "-");
    }
    module.exports = {
      escapeFacetValue: escapeFacetValue2,
      unescapeFacetValue: unescapeFacetValue2
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/merge.js
var require_merge = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/merge.js"(exports, module) {
    "use strict";
    function clone(value) {
      if (typeof value === "object" && value !== null) {
        return _merge(Array.isArray(value) ? [] : {}, value);
      }
      return value;
    }
    function isObjectOrArrayOrFunction(value) {
      return typeof value === "function" || Array.isArray(value) || Object.prototype.toString.call(value) === "[object Object]";
    }
    function _merge(target, source) {
      if (target === source) {
        return target;
      }
      for (var key2 in source) {
        if (!Object.prototype.hasOwnProperty.call(source, key2) || key2 === "__proto__" || key2 === "constructor") {
          continue;
        }
        var sourceVal = source[key2];
        var targetVal = target[key2];
        if (typeof targetVal !== "undefined" && typeof sourceVal === "undefined") {
          continue;
        }
        if (isObjectOrArrayOrFunction(targetVal) && isObjectOrArrayOrFunction(sourceVal)) {
          target[key2] = _merge(targetVal, sourceVal);
        } else {
          target[key2] = clone(sourceVal);
        }
      }
      return target;
    }
    function merge(target) {
      if (!isObjectOrArrayOrFunction(target)) {
        target = {};
      }
      for (var i32 = 1, l27 = arguments.length; i32 < l27; i32++) {
        var source = arguments[i32];
        if (isObjectOrArrayOrFunction(source)) {
          _merge(target, source);
        }
      }
      return target;
    }
    module.exports = merge;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/objectHasKeys.js
var require_objectHasKeys = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/objectHasKeys.js"(exports, module) {
    "use strict";
    function objectHasKeys(obj) {
      return obj && Object.keys(obj).length > 0;
    }
    module.exports = objectHasKeys;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/omit.js
var require_omit = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/omit.js"(exports, module) {
    "use strict";
    function _objectWithoutPropertiesLoose21(source, excluded) {
      if (source === null)
        return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key2;
      var i32;
      for (i32 = 0; i32 < sourceKeys.length; i32++) {
        key2 = sourceKeys[i32];
        if (excluded.indexOf(key2) >= 0)
          continue;
        target[key2] = source[key2];
      }
      return target;
    }
    module.exports = _objectWithoutPropertiesLoose21;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/RecommendParameters/index.js
var require_RecommendParameters = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/RecommendParameters/index.js"(exports, module) {
    "use strict";
    function RecommendParameters(opts) {
      opts = opts || {};
      this.params = opts.params || [];
    }
    RecommendParameters.prototype = {
      constructor: RecommendParameters,
      addParams: function(params) {
        var newParams = this.params.slice();
        newParams.push(params);
        return new RecommendParameters({ params: newParams });
      },
      removeParams: function(id2) {
        return new RecommendParameters({
          params: this.params.filter(function(param) {
            return param.$$id !== id2;
          })
        });
      },
      addFrequentlyBoughtTogether: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "bought-together" })
        );
      },
      addRelatedProducts: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "related-products" })
        );
      },
      addTrendingItems: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "trending-items" })
        );
      },
      addTrendingFacets: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "trending-facets" })
        );
      },
      addLookingSimilar: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "looking-similar" })
        );
      },
      _buildQueries: function(indexName, cache) {
        return this.params.filter(function(params) {
          return cache[params.$$id] === void 0;
        }).map(function(params) {
          var query = Object.assign({}, params, { indexName });
          delete query.$$id;
          return query;
        });
      }
    };
    module.exports = RecommendParameters;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/RecommendResults/index.js
var require_RecommendResults = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/RecommendResults/index.js"(exports, module) {
    "use strict";
    function RecommendResults(state, results) {
      this._state = state;
      this._rawResults = {};
      var self = this;
      state.params.forEach(function(param) {
        var id2 = param.$$id;
        self[id2] = results[id2];
        self._rawResults[id2] = results[id2];
      });
    }
    RecommendResults.prototype = {
      constructor: RecommendResults
    };
    module.exports = RecommendResults;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/requestBuilder.js
var require_requestBuilder = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/requestBuilder.js"(exports, module) {
    "use strict";
    var merge = require_merge();
    function sortObject(obj) {
      return Object.keys(obj).sort().reduce(function(acc, curr) {
        acc[curr] = obj[curr];
        return acc;
      }, {});
    }
    var requestBuilder = {
      /**
       * Get all the queries to send to the client, those queries can used directly
       * with the Algolia client.
       * @private
       * @param  {string} index The name of the index
       * @param  {SearchParameters} state The state from which to get the queries
       * @return {object[]} The queries
       */
      _getQueries: function getQueries(index3, state) {
        var queries = [];
        queries.push({
          indexName: index3,
          params: requestBuilder._getHitsSearchParams(state)
        });
        state.getRefinedDisjunctiveFacets().forEach(function(refinedFacet) {
          queries.push({
            indexName: index3,
            params: requestBuilder._getDisjunctiveFacetSearchParams(
              state,
              refinedFacet
            )
          });
        });
        state.getRefinedHierarchicalFacets().forEach(function(refinedFacet) {
          var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
          var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
          var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
          if (currentRefinement.length > 0 && currentRefinement[0].split(separator).length > 1) {
            var filtersMap = currentRefinement[0].split(separator).slice(0, -1).reduce(function createFiltersMap(map, segment, level) {
              return map.concat({
                attribute: hierarchicalFacet.attributes[level],
                value: level === 0 ? segment : [map[map.length - 1].value, segment].join(separator)
              });
            }, []);
            filtersMap.forEach(function(filter, level) {
              var params = requestBuilder._getDisjunctiveFacetSearchParams(
                state,
                filter.attribute,
                level === 0
              );
              function hasHierarchicalFacetFilter(value) {
                return hierarchicalFacet.attributes.some(function(attribute) {
                  return attribute === value.split(":")[0];
                });
              }
              var filteredFacetFilters = (params.facetFilters || []).reduce(
                function(acc, facetFilter) {
                  if (Array.isArray(facetFilter)) {
                    var filtered = facetFilter.filter(function(filterValue) {
                      return !hasHierarchicalFacetFilter(filterValue);
                    });
                    if (filtered.length > 0) {
                      acc.push(filtered);
                    }
                  }
                  if (typeof facetFilter === "string" && !hasHierarchicalFacetFilter(facetFilter)) {
                    acc.push(facetFilter);
                  }
                  return acc;
                },
                []
              );
              var parent = filtersMap[level - 1];
              if (level > 0) {
                params.facetFilters = filteredFacetFilters.concat(
                  parent.attribute + ":" + parent.value
                );
              } else {
                params.facetFilters = filteredFacetFilters.length > 0 ? filteredFacetFilters : void 0;
              }
              queries.push({ indexName: index3, params });
            });
          }
        });
        return queries;
      },
      /**
       * Build search parameters used to fetch hits
       * @private
       * @param  {SearchParameters} state The state from which to get the queries
       * @return {object.<string, any>} The search parameters for hits
       */
      _getHitsSearchParams: function(state) {
        var facets = state.facets.concat(state.disjunctiveFacets).concat(requestBuilder._getHitsHierarchicalFacetsAttributes(state)).sort();
        var facetFilters = requestBuilder._getFacetFilters(state);
        var numericFilters = requestBuilder._getNumericFilters(state);
        var tagFilters = requestBuilder._getTagFilters(state);
        var additionalParams = {};
        if (facets.length > 0) {
          additionalParams.facets = facets.indexOf("*") > -1 ? ["*"] : facets;
        }
        if (tagFilters.length > 0) {
          additionalParams.tagFilters = tagFilters;
        }
        if (facetFilters.length > 0) {
          additionalParams.facetFilters = facetFilters;
        }
        if (numericFilters.length > 0) {
          additionalParams.numericFilters = numericFilters;
        }
        return sortObject(merge({}, state.getQueryParams(), additionalParams));
      },
      /**
       * Build search parameters used to fetch a disjunctive facet
       * @private
       * @param  {SearchParameters} state The state from which to get the queries
       * @param  {string} facet the associated facet name
       * @param  {boolean} hierarchicalRootLevel ?? FIXME
       * @return {object} The search parameters for a disjunctive facet
       */
      _getDisjunctiveFacetSearchParams: function(state, facet, hierarchicalRootLevel) {
        var facetFilters = requestBuilder._getFacetFilters(
          state,
          facet,
          hierarchicalRootLevel
        );
        var numericFilters = requestBuilder._getNumericFilters(state, facet);
        var tagFilters = requestBuilder._getTagFilters(state);
        var additionalParams = {
          hitsPerPage: 0,
          page: 0,
          analytics: false,
          clickAnalytics: false
        };
        if (tagFilters.length > 0) {
          additionalParams.tagFilters = tagFilters;
        }
        var hierarchicalFacet = state.getHierarchicalFacetByName(facet);
        if (hierarchicalFacet) {
          additionalParams.facets = requestBuilder._getDisjunctiveHierarchicalFacetAttribute(
            state,
            hierarchicalFacet,
            hierarchicalRootLevel
          );
        } else {
          additionalParams.facets = facet;
        }
        if (numericFilters.length > 0) {
          additionalParams.numericFilters = numericFilters;
        }
        if (facetFilters.length > 0) {
          additionalParams.facetFilters = facetFilters;
        }
        return sortObject(merge({}, state.getQueryParams(), additionalParams));
      },
      /**
       * Return the numeric filters in an algolia request fashion
       * @private
       * @param {SearchParameters} state the state from which to get the filters
       * @param {string} [facetName] the name of the attribute for which the filters should be excluded
       * @return {string[]} the numeric filters in the algolia format
       */
      _getNumericFilters: function(state, facetName) {
        if (state.numericFilters) {
          return state.numericFilters;
        }
        var numericFilters = [];
        Object.keys(state.numericRefinements).forEach(function(attribute) {
          var operators = state.numericRefinements[attribute] || {};
          Object.keys(operators).forEach(function(operator) {
            var values = operators[operator] || [];
            if (facetName !== attribute) {
              values.forEach(function(value) {
                if (Array.isArray(value)) {
                  var vs = value.map(function(v7) {
                    return attribute + operator + v7;
                  });
                  numericFilters.push(vs);
                } else {
                  numericFilters.push(attribute + operator + value);
                }
              });
            }
          });
        });
        return numericFilters;
      },
      /**
       * Return the tags filters depending on which format is used, either tagFilters or tagRefinements
       * @private
       * @param {SearchParameters} state the state from which to get the filters
       * @return {string} Tag filters in a single string
       */
      _getTagFilters: function(state) {
        if (state.tagFilters) {
          return state.tagFilters;
        }
        return state.tagRefinements.join(",");
      },
      /**
       * Build facetFilters parameter based on current refinements. The array returned
       * contains strings representing the facet filters in the algolia format.
       * @private
       * @param  {SearchParameters} state The state from which to get the queries
       * @param  {string} [facet] if set, the current disjunctive facet
       * @param  {boolean} [hierarchicalRootLevel] ?? FIXME
       * @return {array.<string>} The facet filters in the algolia format
       */
      _getFacetFilters: function(state, facet, hierarchicalRootLevel) {
        var facetFilters = [];
        var facetsRefinements = state.facetsRefinements || {};
        Object.keys(facetsRefinements).sort().forEach(function(facetName) {
          var facetValues = facetsRefinements[facetName] || [];
          facetValues.slice().sort().forEach(function(facetValue) {
            facetFilters.push(facetName + ":" + facetValue);
          });
        });
        var facetsExcludes = state.facetsExcludes || {};
        Object.keys(facetsExcludes).sort().forEach(function(facetName) {
          var facetValues = facetsExcludes[facetName] || [];
          facetValues.sort().forEach(function(facetValue) {
            facetFilters.push(facetName + ":-" + facetValue);
          });
        });
        var disjunctiveFacetsRefinements = state.disjunctiveFacetsRefinements || {};
        Object.keys(disjunctiveFacetsRefinements).sort().forEach(function(facetName) {
          var facetValues = disjunctiveFacetsRefinements[facetName] || [];
          if (facetName === facet || !facetValues || facetValues.length === 0) {
            return;
          }
          var orFilters = [];
          facetValues.slice().sort().forEach(function(facetValue) {
            orFilters.push(facetName + ":" + facetValue);
          });
          facetFilters.push(orFilters);
        });
        var hierarchicalFacetsRefinements = state.hierarchicalFacetsRefinements || {};
        Object.keys(hierarchicalFacetsRefinements).sort().forEach(function(facetName) {
          var facetValues = hierarchicalFacetsRefinements[facetName] || [];
          var facetValue = facetValues[0];
          if (facetValue === void 0) {
            return;
          }
          var hierarchicalFacet = state.getHierarchicalFacetByName(facetName);
          var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
          var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
          var attributeToRefine;
          var attributesIndex;
          if (facet === facetName) {
            if (facetValue.indexOf(separator) === -1 || !rootPath && hierarchicalRootLevel === true || rootPath && rootPath.split(separator).length === facetValue.split(separator).length) {
              return;
            }
            if (!rootPath) {
              attributesIndex = facetValue.split(separator).length - 2;
              facetValue = facetValue.slice(0, facetValue.lastIndexOf(separator));
            } else {
              attributesIndex = rootPath.split(separator).length - 1;
              facetValue = rootPath;
            }
            attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
          } else {
            attributesIndex = facetValue.split(separator).length - 1;
            attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
          }
          if (attributeToRefine) {
            facetFilters.push([attributeToRefine + ":" + facetValue]);
          }
        });
        return facetFilters;
      },
      _getHitsHierarchicalFacetsAttributes: function(state) {
        var out = [];
        return state.hierarchicalFacets.reduce(
          // ask for as much levels as there's hierarchical refinements
          function getHitsAttributesForHierarchicalFacet(allAttributes, hierarchicalFacet) {
            var hierarchicalRefinement = state.getHierarchicalRefinement(
              hierarchicalFacet.name
            )[0];
            if (!hierarchicalRefinement) {
              allAttributes.push(hierarchicalFacet.attributes[0]);
              return allAttributes;
            }
            var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
            var level = hierarchicalRefinement.split(separator).length;
            var newAttributes = hierarchicalFacet.attributes.slice(0, level + 1);
            return allAttributes.concat(newAttributes);
          },
          out
        );
      },
      _getDisjunctiveHierarchicalFacetAttribute: function(state, hierarchicalFacet, rootLevel) {
        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        if (rootLevel === true) {
          var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
          var attributeIndex = 0;
          if (rootPath) {
            attributeIndex = rootPath.split(separator).length;
          }
          return [hierarchicalFacet.attributes[attributeIndex]];
        }
        var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0] || "";
        var parentLevel = hierarchicalRefinement.split(separator).length - 1;
        return hierarchicalFacet.attributes.slice(0, parentLevel + 1);
      },
      getSearchForFacetQuery: function(facetName, query, maxFacetHits, state) {
        var stateForSearchForFacetValues = state.isDisjunctiveFacet(facetName) ? state.clearRefinements(facetName) : state;
        var searchForFacetSearchParameters = {
          facetQuery: query,
          facetName
        };
        if (typeof maxFacetHits === "number") {
          searchForFacetSearchParameters.maxFacetHits = maxFacetHits;
        }
        return sortObject(
          merge(
            {},
            requestBuilder._getHitsSearchParams(stateForSearchForFacetValues),
            searchForFacetSearchParameters
          )
        );
      }
    };
    module.exports = requestBuilder;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/defaultsPure.js
var require_defaultsPure = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/defaultsPure.js"(exports, module) {
    "use strict";
    module.exports = function defaultsPure() {
      var sources = Array.prototype.slice.call(arguments);
      return sources.reduceRight(function(acc, source) {
        Object.keys(Object(source)).forEach(function(key2) {
          if (source[key2] === void 0) {
            return;
          }
          if (acc[key2] !== void 0) {
            delete acc[key2];
          }
          acc[key2] = source[key2];
        });
        return acc;
      }, {});
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/find.js
var require_find = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/find.js"(exports, module) {
    "use strict";
    module.exports = function find2(array, comparator) {
      if (!Array.isArray(array)) {
        return void 0;
      }
      for (var i32 = 0; i32 < array.length; i32++) {
        if (comparator(array[i32])) {
          return array[i32];
        }
      }
      return void 0;
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/intersection.js
var require_intersection = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/intersection.js"(exports, module) {
    "use strict";
    function intersection(arr1, arr2) {
      return arr1.filter(function(value, index3) {
        return arr2.indexOf(value) > -1 && arr1.indexOf(value) === index3;
      });
    }
    module.exports = intersection;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/valToNumber.js
var require_valToNumber = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/valToNumber.js"(exports, module) {
    "use strict";
    function valToNumber(v7) {
      if (typeof v7 === "number") {
        return v7;
      } else if (typeof v7 === "string") {
        return parseFloat(v7);
      } else if (Array.isArray(v7)) {
        return v7.map(valToNumber);
      }
      throw new Error(
        "The value should be a number, a parsable string or an array of those."
      );
    }
    module.exports = valToNumber;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/utils/isValidUserToken.js
var require_isValidUserToken = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/utils/isValidUserToken.js"(exports, module) {
    "use strict";
    module.exports = function isValidUserToken(userToken) {
      if (userToken === null) {
        return false;
      }
      return /^[a-zA-Z0-9_-]{1,64}$/.test(userToken);
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/SearchParameters/RefinementList.js
var require_RefinementList = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/SearchParameters/RefinementList.js"(exports, module) {
    "use strict";
    var defaultsPure = require_defaultsPure();
    var objectHasKeys = require_objectHasKeys();
    var omit2 = require_omit();
    var lib = {
      /**
       * Adds a refinement to a RefinementList
       * @param {RefinementList} refinementList the initial list
       * @param {string} attribute the attribute to refine
       * @param {string} value the value of the refinement, if the value is not a string it will be converted
       * @return {RefinementList} a new and updated refinement list
       */
      addRefinement: function addRefinement(refinementList, attribute, value) {
        if (lib.isRefined(refinementList, attribute, value)) {
          return refinementList;
        }
        var valueAsString = "" + value;
        var facetRefinement = !refinementList[attribute] ? [valueAsString] : refinementList[attribute].concat(valueAsString);
        var mod = {};
        mod[attribute] = facetRefinement;
        return defaultsPure({}, mod, refinementList);
      },
      /**
       * Removes refinement(s) for an attribute:
       *  - if the value is specified removes the refinement for the value on the attribute
       *  - if no value is specified removes all the refinements for this attribute
       * @param {RefinementList} refinementList the initial list
       * @param {string} attribute the attribute to refine
       * @param {string} [value] the value of the refinement
       * @return {RefinementList} a new and updated refinement lst
       */
      removeRefinement: function removeRefinement(refinementList, attribute, value) {
        if (value === void 0) {
          return lib.clearRefinement(refinementList, function(v7, f15) {
            return attribute === f15;
          });
        }
        var valueAsString = "" + value;
        return lib.clearRefinement(refinementList, function(v7, f15) {
          return attribute === f15 && valueAsString === v7;
        });
      },
      /**
       * Toggles the refinement value for an attribute.
       * @param {RefinementList} refinementList the initial list
       * @param {string} attribute the attribute to refine
       * @param {string} value the value of the refinement
       * @return {RefinementList} a new and updated list
       */
      toggleRefinement: function toggleRefinement(refinementList, attribute, value) {
        if (value === void 0)
          throw new Error("toggleRefinement should be used with a value");
        if (lib.isRefined(refinementList, attribute, value)) {
          return lib.removeRefinement(refinementList, attribute, value);
        }
        return lib.addRefinement(refinementList, attribute, value);
      },
      /**
       * Clear all or parts of a RefinementList. Depending on the arguments, three
       * kinds of behavior can happen:
       *  - if no attribute is provided: clears the whole list
       *  - if an attribute is provided as a string: clears the list for the specific attribute
       *  - if an attribute is provided as a function: discards the elements for which the function returns true
       * @param {RefinementList} refinementList the initial list
       * @param {string} [attribute] the attribute or function to discard
       * @param {string} [refinementType] optional parameter to give more context to the attribute function
       * @return {RefinementList} a new and updated refinement list
       */
      clearRefinement: function clearRefinement2(refinementList, attribute, refinementType) {
        if (attribute === void 0) {
          if (!objectHasKeys(refinementList)) {
            return refinementList;
          }
          return {};
        } else if (typeof attribute === "string") {
          return omit2(refinementList, [attribute]);
        } else if (typeof attribute === "function") {
          var hasChanged = false;
          var newRefinementList = Object.keys(refinementList).reduce(
            function(memo, key2) {
              var values = refinementList[key2] || [];
              var facetList = values.filter(function(value) {
                return !attribute(value, key2, refinementType);
              });
              if (facetList.length !== values.length) {
                hasChanged = true;
              }
              memo[key2] = facetList;
              return memo;
            },
            {}
          );
          if (hasChanged)
            return newRefinementList;
          return refinementList;
        }
        return void 0;
      },
      /**
       * Test if the refinement value is used for the attribute. If no refinement value
       * is provided, test if the refinementList contains any refinement for the
       * given attribute.
       * @param {RefinementList} refinementList the list of refinement
       * @param {string} attribute name of the attribute
       * @param {string} [refinementValue] value of the filter/refinement
       * @return {boolean} true if the attribute is refined, false otherwise
       */
      isRefined: function isRefined2(refinementList, attribute, refinementValue) {
        var containsRefinements = Boolean(refinementList[attribute]) && refinementList[attribute].length > 0;
        if (refinementValue === void 0 || !containsRefinements) {
          return containsRefinements;
        }
        var refinementValueAsString = "" + refinementValue;
        return refinementList[attribute].indexOf(refinementValueAsString) !== -1;
      }
    };
    module.exports = lib;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/SearchParameters/index.js
var require_SearchParameters = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/SearchParameters/index.js"(exports, module) {
    "use strict";
    var defaultsPure = require_defaultsPure();
    var find2 = require_find();
    var intersection = require_intersection();
    var merge = require_merge();
    var objectHasKeys = require_objectHasKeys();
    var omit2 = require_omit();
    var valToNumber = require_valToNumber();
    var isValidUserToken = require_isValidUserToken();
    var RefinementList2 = require_RefinementList();
    function isEqualNumericRefinement(a30, b3) {
      if (Array.isArray(a30) && Array.isArray(b3)) {
        return a30.length === b3.length && a30.every(function(el, i32) {
          return isEqualNumericRefinement(b3[i32], el);
        });
      }
      return a30 === b3;
    }
    function findArray(array, searchedValue) {
      return find2(array, function(currentValue) {
        return isEqualNumericRefinement(currentValue, searchedValue);
      });
    }
    function SearchParameters(newParameters) {
      var params = newParameters ? SearchParameters._parseNumbers(newParameters) : {};
      if (params.userToken !== void 0 && !isValidUserToken(params.userToken)) {
        console.warn(
          "[algoliasearch-helper] The `userToken` parameter is invalid. This can lead to wrong analytics.\n  - Format: [a-zA-Z0-9_-]{1,64}"
        );
      }
      this.facets = params.facets || [];
      this.disjunctiveFacets = params.disjunctiveFacets || [];
      this.hierarchicalFacets = params.hierarchicalFacets || [];
      this.facetsRefinements = params.facetsRefinements || {};
      this.facetsExcludes = params.facetsExcludes || {};
      this.disjunctiveFacetsRefinements = params.disjunctiveFacetsRefinements || {};
      this.numericRefinements = params.numericRefinements || {};
      this.tagRefinements = params.tagRefinements || [];
      this.hierarchicalFacetsRefinements = params.hierarchicalFacetsRefinements || {};
      var self = this;
      Object.keys(params).forEach(function(paramName) {
        var isKeyKnown = SearchParameters.PARAMETERS.indexOf(paramName) !== -1;
        var isValueDefined = params[paramName] !== void 0;
        if (!isKeyKnown && isValueDefined) {
          self[paramName] = params[paramName];
        }
      });
    }
    SearchParameters.PARAMETERS = Object.keys(new SearchParameters());
    SearchParameters._parseNumbers = function(partialState) {
      if (partialState instanceof SearchParameters)
        return partialState;
      var numbers = {};
      var numberKeys = [
        "aroundPrecision",
        "aroundRadius",
        "getRankingInfo",
        "minWordSizefor2Typos",
        "minWordSizefor1Typo",
        "page",
        "maxValuesPerFacet",
        "distinct",
        "minimumAroundRadius",
        "hitsPerPage",
        "minProximity"
      ];
      numberKeys.forEach(function(k5) {
        var value = partialState[k5];
        if (typeof value === "string") {
          var parsedValue = parseFloat(value);
          numbers[k5] = isNaN(parsedValue) ? value : parsedValue;
        }
      });
      if (Array.isArray(partialState.insideBoundingBox)) {
        numbers.insideBoundingBox = partialState.insideBoundingBox.map(function(geoRect) {
          if (Array.isArray(geoRect)) {
            return geoRect.map(function(value) {
              return parseFloat(value);
            });
          }
          return geoRect;
        });
      }
      if (partialState.numericRefinements) {
        var numericRefinements = {};
        Object.keys(partialState.numericRefinements).forEach(function(attribute) {
          var operators = partialState.numericRefinements[attribute] || {};
          numericRefinements[attribute] = {};
          Object.keys(operators).forEach(function(operator) {
            var values = operators[operator];
            var parsedValues = values.map(function(v7) {
              if (Array.isArray(v7)) {
                return v7.map(function(vPrime) {
                  if (typeof vPrime === "string") {
                    return parseFloat(vPrime);
                  }
                  return vPrime;
                });
              } else if (typeof v7 === "string") {
                return parseFloat(v7);
              }
              return v7;
            });
            numericRefinements[attribute][operator] = parsedValues;
          });
        });
        numbers.numericRefinements = numericRefinements;
      }
      return merge(partialState, numbers);
    };
    SearchParameters.make = function makeSearchParameters(newParameters) {
      var instance = new SearchParameters(newParameters);
      var hierarchicalFacets = newParameters.hierarchicalFacets || [];
      hierarchicalFacets.forEach(function(facet) {
        if (facet.rootPath) {
          var currentRefinement = instance.getHierarchicalRefinement(facet.name);
          if (currentRefinement.length > 0 && currentRefinement[0].indexOf(facet.rootPath) !== 0) {
            instance = instance.clearRefinements(facet.name);
          }
          currentRefinement = instance.getHierarchicalRefinement(facet.name);
          if (currentRefinement.length === 0) {
            instance = instance.toggleHierarchicalFacetRefinement(
              facet.name,
              facet.rootPath
            );
          }
        }
      });
      return instance;
    };
    SearchParameters.validate = function(currentState, parameters) {
      var params = parameters || {};
      if (currentState.tagFilters && params.tagRefinements && params.tagRefinements.length > 0) {
        return new Error(
          "[Tags] Cannot switch from the managed tag API to the advanced API. It is probably an error, if it is really what you want, you should first clear the tags with clearTags method."
        );
      }
      if (currentState.tagRefinements.length > 0 && params.tagFilters) {
        return new Error(
          "[Tags] Cannot switch from the advanced tag API to the managed API. It is probably an error, if it is not, you should first clear the tags with clearTags method."
        );
      }
      if (currentState.numericFilters && params.numericRefinements && objectHasKeys(params.numericRefinements)) {
        return new Error(
          "[Numeric filters] Can't switch from the advanced to the managed API. It is probably an error, if this is really what you want, you have to first clear the numeric filters."
        );
      }
      if (objectHasKeys(currentState.numericRefinements) && params.numericFilters) {
        return new Error(
          "[Numeric filters] Can't switch from the managed API to the advanced. It is probably an error, if this is really what you want, you have to first clear the numeric filters."
        );
      }
      return null;
    };
    SearchParameters.prototype = {
      constructor: SearchParameters,
      /**
       * Remove all refinements (disjunctive + conjunctive + excludes + numeric filters)
       * @method
       * @param {undefined|string|SearchParameters.clearCallback} [attribute] optional string or function
       * - If not given, means to clear all the filters.
       * - If `string`, means to clear all refinements for the `attribute` named filter.
       * - If `function`, means to clear all the refinements that return truthy values.
       * @return {SearchParameters} new instance with filters cleared
       */
      clearRefinements: function clearRefinements2(attribute) {
        var patch = {
          numericRefinements: this._clearNumericRefinements(attribute),
          facetsRefinements: RefinementList2.clearRefinement(
            this.facetsRefinements,
            attribute,
            "conjunctiveFacet"
          ),
          facetsExcludes: RefinementList2.clearRefinement(
            this.facetsExcludes,
            attribute,
            "exclude"
          ),
          disjunctiveFacetsRefinements: RefinementList2.clearRefinement(
            this.disjunctiveFacetsRefinements,
            attribute,
            "disjunctiveFacet"
          ),
          hierarchicalFacetsRefinements: RefinementList2.clearRefinement(
            this.hierarchicalFacetsRefinements,
            attribute,
            "hierarchicalFacet"
          )
        };
        if (patch.numericRefinements === this.numericRefinements && patch.facetsRefinements === this.facetsRefinements && patch.facetsExcludes === this.facetsExcludes && patch.disjunctiveFacetsRefinements === this.disjunctiveFacetsRefinements && patch.hierarchicalFacetsRefinements === this.hierarchicalFacetsRefinements) {
          return this;
        }
        return this.setQueryParameters(patch);
      },
      /**
       * Remove all the refined tags from the SearchParameters
       * @method
       * @return {SearchParameters} new instance with tags cleared
       */
      clearTags: function clearTags() {
        if (this.tagFilters === void 0 && this.tagRefinements.length === 0)
          return this;
        return this.setQueryParameters({
          tagFilters: void 0,
          tagRefinements: []
        });
      },
      /**
       * Set the index.
       * @method
       * @param {string} index the index name
       * @return {SearchParameters} new instance
       */
      setIndex: function setIndex(index3) {
        if (index3 === this.index)
          return this;
        return this.setQueryParameters({
          index: index3
        });
      },
      /**
       * Query setter
       * @method
       * @param {string} newQuery value for the new query
       * @return {SearchParameters} new instance
       */
      setQuery: function setQuery(newQuery) {
        if (newQuery === this.query)
          return this;
        return this.setQueryParameters({
          query: newQuery
        });
      },
      /**
       * Page setter
       * @method
       * @param {number} newPage new page number
       * @return {SearchParameters} new instance
       */
      setPage: function setPage(newPage) {
        if (newPage === this.page)
          return this;
        return this.setQueryParameters({
          page: newPage
        });
      },
      /**
       * Facets setter
       * The facets are the simple facets, used for conjunctive (and) faceting.
       * @method
       * @param {string[]} facets all the attributes of the algolia records used for conjunctive faceting
       * @return {SearchParameters} new instance
       */
      setFacets: function setFacets(facets) {
        return this.setQueryParameters({
          facets
        });
      },
      /**
       * Disjunctive facets setter
       * Change the list of disjunctive (or) facets the helper chan handle.
       * @method
       * @param {string[]} facets all the attributes of the algolia records used for disjunctive faceting
       * @return {SearchParameters} new instance
       */
      setDisjunctiveFacets: function setDisjunctiveFacets(facets) {
        return this.setQueryParameters({
          disjunctiveFacets: facets
        });
      },
      /**
       * HitsPerPage setter
       * Hits per page represents the number of hits retrieved for this query
       * @method
       * @param {number} n number of hits retrieved per page of results
       * @return {SearchParameters} new instance
       */
      setHitsPerPage: function setHitsPerPage(n32) {
        if (this.hitsPerPage === n32)
          return this;
        return this.setQueryParameters({
          hitsPerPage: n32
        });
      },
      /**
       * typoTolerance setter
       * Set the value of typoTolerance
       * @method
       * @param {string} typoTolerance new value of typoTolerance ("true", "false", "min" or "strict")
       * @return {SearchParameters} new instance
       */
      setTypoTolerance: function setTypoTolerance(typoTolerance) {
        if (this.typoTolerance === typoTolerance)
          return this;
        return this.setQueryParameters({
          typoTolerance
        });
      },
      /**
       * Add a numeric filter for a given attribute
       * When value is an array, they are combined with OR
       * When value is a single value, it will combined with AND
       * @method
       * @param {string} attribute attribute to set the filter on
       * @param {string} operator operator of the filter (possible values: =, >, >=, <, <=, !=)
       * @param {number | number[]} value value of the filter
       * @return {SearchParameters} new instance
       * @example
       * // for price = 50 or 40
       * state.addNumericRefinement('price', '=', [50, 40]);
       * @example
       * // for size = 38 and 40
       * state.addNumericRefinement('size', '=', 38);
       * state.addNumericRefinement('size', '=', 40);
       */
      addNumericRefinement: function(attribute, operator, value) {
        var val = valToNumber(value);
        if (this.isNumericRefined(attribute, operator, val))
          return this;
        var mod = merge({}, this.numericRefinements);
        mod[attribute] = merge({}, mod[attribute]);
        if (mod[attribute][operator]) {
          mod[attribute][operator] = mod[attribute][operator].slice();
          mod[attribute][operator].push(val);
        } else {
          mod[attribute][operator] = [val];
        }
        return this.setQueryParameters({
          numericRefinements: mod
        });
      },
      /**
       * Get the list of conjunctive refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {string[]} list of refinements
       */
      getConjunctiveRefinements: function(facetName) {
        if (!this.isConjunctiveFacet(facetName)) {
          return [];
        }
        return this.facetsRefinements[facetName] || [];
      },
      /**
       * Get the list of disjunctive refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {string[]} list of refinements
       */
      getDisjunctiveRefinements: function(facetName) {
        if (!this.isDisjunctiveFacet(facetName)) {
          return [];
        }
        return this.disjunctiveFacetsRefinements[facetName] || [];
      },
      /**
       * Get the list of hierarchical refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {string[]} list of refinements
       */
      getHierarchicalRefinement: function(facetName) {
        return this.hierarchicalFacetsRefinements[facetName] || [];
      },
      /**
       * Get the list of exclude refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {string[]} list of refinements
       */
      getExcludeRefinements: function(facetName) {
        if (!this.isConjunctiveFacet(facetName)) {
          return [];
        }
        return this.facetsExcludes[facetName] || [];
      },
      /**
       * Remove all the numeric filter for a given (attribute, operator)
       * @method
       * @param {string} attribute attribute to set the filter on
       * @param {string} [operator] operator of the filter (possible values: =, >, >=, <, <=, !=)
       * @param {number} [number] the value to be removed
       * @return {SearchParameters} new instance
       */
      removeNumericRefinement: function(attribute, operator, number) {
        var paramValue = number;
        if (paramValue !== void 0) {
          if (!this.isNumericRefined(attribute, operator, paramValue)) {
            return this;
          }
          return this.setQueryParameters({
            numericRefinements: this._clearNumericRefinements(function(value, key2) {
              return key2 === attribute && value.op === operator && isEqualNumericRefinement(value.val, valToNumber(paramValue));
            })
          });
        } else if (operator !== void 0) {
          if (!this.isNumericRefined(attribute, operator))
            return this;
          return this.setQueryParameters({
            numericRefinements: this._clearNumericRefinements(function(value, key2) {
              return key2 === attribute && value.op === operator;
            })
          });
        }
        if (!this.isNumericRefined(attribute))
          return this;
        return this.setQueryParameters({
          numericRefinements: this._clearNumericRefinements(function(value, key2) {
            return key2 === attribute;
          })
        });
      },
      /**
       * Get the list of numeric refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {SearchParameters.OperatorList} list of refinements
       */
      getNumericRefinements: function(facetName) {
        return this.numericRefinements[facetName] || {};
      },
      /**
       * Return the current refinement for the (attribute, operator)
       * @param {string} attribute attribute in the record
       * @param {string} operator operator applied on the refined values
       * @return {Array.<number|number[]>} refined values
       */
      getNumericRefinement: function(attribute, operator) {
        return this.numericRefinements[attribute] && this.numericRefinements[attribute][operator];
      },
      /**
       * Clear numeric filters.
       * @method
       * @private
       * @param {string|SearchParameters.clearCallback} [attribute] optional string or function
       * - If not given, means to clear all the filters.
       * - If `string`, means to clear all refinements for the `attribute` named filter.
       * - If `function`, means to clear all the refinements that return truthy values.
       * @return {Object.<string, OperatorList>} new numeric refinements
       */
      _clearNumericRefinements: function _clearNumericRefinements(attribute) {
        if (attribute === void 0) {
          if (!objectHasKeys(this.numericRefinements)) {
            return this.numericRefinements;
          }
          return {};
        } else if (typeof attribute === "string") {
          return omit2(this.numericRefinements, [attribute]);
        } else if (typeof attribute === "function") {
          var hasChanged = false;
          var numericRefinements = this.numericRefinements;
          var newNumericRefinements = Object.keys(numericRefinements).reduce(
            function(memo, key2) {
              var operators = numericRefinements[key2];
              var operatorList = {};
              operators = operators || {};
              Object.keys(operators).forEach(function(operator) {
                var values = operators[operator] || [];
                var outValues = [];
                values.forEach(function(value) {
                  var predicateResult = attribute(
                    { val: value, op: operator },
                    key2,
                    "numeric"
                  );
                  if (!predicateResult)
                    outValues.push(value);
                });
                if (outValues.length !== values.length) {
                  hasChanged = true;
                }
                operatorList[operator] = outValues;
              });
              memo[key2] = operatorList;
              return memo;
            },
            {}
          );
          if (hasChanged)
            return newNumericRefinements;
          return this.numericRefinements;
        }
        return void 0;
      },
      /**
       * Add a facet to the facets attribute of the helper configuration, if it
       * isn't already present.
       * @method
       * @param {string} facet facet name to add
       * @return {SearchParameters} new instance
       */
      addFacet: function addFacet(facet) {
        if (this.isConjunctiveFacet(facet)) {
          return this;
        }
        return this.setQueryParameters({
          facets: this.facets.concat([facet])
        });
      },
      /**
       * Add a disjunctive facet to the disjunctiveFacets attribute of the helper
       * configuration, if it isn't already present.
       * @method
       * @param {string} facet disjunctive facet name to add
       * @return {SearchParameters} new instance
       */
      addDisjunctiveFacet: function addDisjunctiveFacet(facet) {
        if (this.isDisjunctiveFacet(facet)) {
          return this;
        }
        return this.setQueryParameters({
          disjunctiveFacets: this.disjunctiveFacets.concat([facet])
        });
      },
      /**
       * Add a hierarchical facet to the hierarchicalFacets attribute of the helper
       * configuration.
       * @method
       * @param {object} hierarchicalFacet hierarchical facet to add
       * @return {SearchParameters} new instance
       * @throws will throw an error if a hierarchical facet with the same name was already declared
       */
      addHierarchicalFacet: function addHierarchicalFacet(hierarchicalFacet) {
        if (this.isHierarchicalFacet(hierarchicalFacet.name)) {
          throw new Error(
            "Cannot declare two hierarchical facets with the same name: `" + hierarchicalFacet.name + "`"
          );
        }
        return this.setQueryParameters({
          hierarchicalFacets: this.hierarchicalFacets.concat([hierarchicalFacet])
        });
      },
      /**
       * Add a refinement on a "normal" facet
       * @method
       * @param {string} facet attribute to apply the faceting on
       * @param {string} value value of the attribute (will be converted to string)
       * @return {SearchParameters} new instance
       */
      addFacetRefinement: function addFacetRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        if (RefinementList2.isRefined(this.facetsRefinements, facet, value))
          return this;
        return this.setQueryParameters({
          facetsRefinements: RefinementList2.addRefinement(
            this.facetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Exclude a value from a "normal" facet
       * @method
       * @param {string} facet attribute to apply the exclusion on
       * @param {string} value value of the attribute (will be converted to string)
       * @return {SearchParameters} new instance
       */
      addExcludeRefinement: function addExcludeRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        if (RefinementList2.isRefined(this.facetsExcludes, facet, value))
          return this;
        return this.setQueryParameters({
          facetsExcludes: RefinementList2.addRefinement(
            this.facetsExcludes,
            facet,
            value
          )
        });
      },
      /**
       * Adds a refinement on a disjunctive facet.
       * @method
       * @param {string} facet attribute to apply the faceting on
       * @param {string} value value of the attribute (will be converted to string)
       * @return {SearchParameters} new instance
       */
      addDisjunctiveFacetRefinement: function addDisjunctiveFacetRefinement(facet, value) {
        if (!this.isDisjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the disjunctiveFacets attribute of the helper configuration"
          );
        }
        if (RefinementList2.isRefined(this.disjunctiveFacetsRefinements, facet, value))
          return this;
        return this.setQueryParameters({
          disjunctiveFacetsRefinements: RefinementList2.addRefinement(
            this.disjunctiveFacetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * addTagRefinement adds a tag to the list used to filter the results
       * @param {string} tag tag to be added
       * @return {SearchParameters} new instance
       */
      addTagRefinement: function addTagRefinement(tag) {
        if (this.isTagRefined(tag))
          return this;
        var modification = {
          tagRefinements: this.tagRefinements.concat(tag)
        };
        return this.setQueryParameters(modification);
      },
      /**
       * Remove a facet from the facets attribute of the helper configuration, if it
       * is present.
       * @method
       * @param {string} facet facet name to remove
       * @return {SearchParameters} new instance
       */
      removeFacet: function removeFacet(facet) {
        if (!this.isConjunctiveFacet(facet)) {
          return this;
        }
        return this.clearRefinements(facet).setQueryParameters({
          facets: this.facets.filter(function(f15) {
            return f15 !== facet;
          })
        });
      },
      /**
       * Remove a disjunctive facet from the disjunctiveFacets attribute of the
       * helper configuration, if it is present.
       * @method
       * @param {string} facet disjunctive facet name to remove
       * @return {SearchParameters} new instance
       */
      removeDisjunctiveFacet: function removeDisjunctiveFacet(facet) {
        if (!this.isDisjunctiveFacet(facet)) {
          return this;
        }
        return this.clearRefinements(facet).setQueryParameters({
          disjunctiveFacets: this.disjunctiveFacets.filter(function(f15) {
            return f15 !== facet;
          })
        });
      },
      /**
       * Remove a hierarchical facet from the hierarchicalFacets attribute of the
       * helper configuration, if it is present.
       * @method
       * @param {string} facet hierarchical facet name to remove
       * @return {SearchParameters} new instance
       */
      removeHierarchicalFacet: function removeHierarchicalFacet(facet) {
        if (!this.isHierarchicalFacet(facet)) {
          return this;
        }
        return this.clearRefinements(facet).setQueryParameters({
          hierarchicalFacets: this.hierarchicalFacets.filter(function(f15) {
            return f15.name !== facet;
          })
        });
      },
      /**
       * Remove a refinement set on facet. If a value is provided, it will clear the
       * refinement for the given value, otherwise it will clear all the refinement
       * values for the faceted attribute.
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {string} [value] value used to filter
       * @return {SearchParameters} new instance
       */
      removeFacetRefinement: function removeFacetRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        if (!RefinementList2.isRefined(this.facetsRefinements, facet, value))
          return this;
        return this.setQueryParameters({
          facetsRefinements: RefinementList2.removeRefinement(
            this.facetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Remove a negative refinement on a facet
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {string} value value used to filter
       * @return {SearchParameters} new instance
       */
      removeExcludeRefinement: function removeExcludeRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        if (!RefinementList2.isRefined(this.facetsExcludes, facet, value))
          return this;
        return this.setQueryParameters({
          facetsExcludes: RefinementList2.removeRefinement(
            this.facetsExcludes,
            facet,
            value
          )
        });
      },
      /**
       * Remove a refinement on a disjunctive facet
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {string} value value used to filter
       * @return {SearchParameters} new instance
       */
      removeDisjunctiveFacetRefinement: function removeDisjunctiveFacetRefinement(facet, value) {
        if (!this.isDisjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the disjunctiveFacets attribute of the helper configuration"
          );
        }
        if (!RefinementList2.isRefined(this.disjunctiveFacetsRefinements, facet, value))
          return this;
        return this.setQueryParameters({
          disjunctiveFacetsRefinements: RefinementList2.removeRefinement(
            this.disjunctiveFacetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Remove a tag from the list of tag refinements
       * @method
       * @param {string} tag the tag to remove
       * @return {SearchParameters} new instance
       */
      removeTagRefinement: function removeTagRefinement(tag) {
        if (!this.isTagRefined(tag))
          return this;
        var modification = {
          tagRefinements: this.tagRefinements.filter(function(t37) {
            return t37 !== tag;
          })
        };
        return this.setQueryParameters(modification);
      },
      /**
       * Generic toggle refinement method to use with facet, disjunctive facets
       * and hierarchical facets
       * @param  {string} facet the facet to refine
       * @param  {string} value the associated value
       * @return {SearchParameters} new instance
       * @throws will throw an error if the facet is not declared in the settings of the helper
       * @deprecated since version 2.19.0, see {@link SearchParameters#toggleFacetRefinement}
       */
      toggleRefinement: function toggleRefinement(facet, value) {
        return this.toggleFacetRefinement(facet, value);
      },
      /**
       * Generic toggle refinement method to use with facet, disjunctive facets
       * and hierarchical facets
       * @param  {string} facet the facet to refine
       * @param  {string} value the associated value
       * @return {SearchParameters} new instance
       * @throws will throw an error if the facet is not declared in the settings of the helper
       */
      toggleFacetRefinement: function toggleFacetRefinement(facet, value) {
        if (this.isHierarchicalFacet(facet)) {
          return this.toggleHierarchicalFacetRefinement(facet, value);
        } else if (this.isConjunctiveFacet(facet)) {
          return this.toggleConjunctiveFacetRefinement(facet, value);
        } else if (this.isDisjunctiveFacet(facet)) {
          return this.toggleDisjunctiveFacetRefinement(facet, value);
        }
        throw new Error(
          "Cannot refine the undeclared facet " + facet + "; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets"
        );
      },
      /**
       * Switch the refinement applied over a facet/value
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {SearchParameters} new instance
       */
      toggleConjunctiveFacetRefinement: function toggleConjunctiveFacetRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        return this.setQueryParameters({
          facetsRefinements: RefinementList2.toggleRefinement(
            this.facetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Switch the refinement applied over a facet/value
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {SearchParameters} new instance
       */
      toggleExcludeFacetRefinement: function toggleExcludeFacetRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        return this.setQueryParameters({
          facetsExcludes: RefinementList2.toggleRefinement(
            this.facetsExcludes,
            facet,
            value
          )
        });
      },
      /**
       * Switch the refinement applied over a facet/value
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {SearchParameters} new instance
       */
      toggleDisjunctiveFacetRefinement: function toggleDisjunctiveFacetRefinement(facet, value) {
        if (!this.isDisjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the disjunctiveFacets attribute of the helper configuration"
          );
        }
        return this.setQueryParameters({
          disjunctiveFacetsRefinements: RefinementList2.toggleRefinement(
            this.disjunctiveFacetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Switch the refinement applied over a facet/value
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {SearchParameters} new instance
       */
      toggleHierarchicalFacetRefinement: function toggleHierarchicalFacetRefinement(facet, value) {
        if (!this.isHierarchicalFacet(facet)) {
          throw new Error(
            facet + " is not defined in the hierarchicalFacets attribute of the helper configuration"
          );
        }
        var separator = this._getHierarchicalFacetSeparator(
          this.getHierarchicalFacetByName(facet)
        );
        var mod = {};
        var upOneOrMultipleLevel = this.hierarchicalFacetsRefinements[facet] !== void 0 && this.hierarchicalFacetsRefinements[facet].length > 0 && // remove current refinement:
        // refinement was 'beer > IPA', call is toggleRefine('beer > IPA'), refinement should be `beer`
        (this.hierarchicalFacetsRefinements[facet][0] === value || // remove a parent refinement of the current refinement:
        //  - refinement was 'beer > IPA > Flying dog'
        //  - call is toggleRefine('beer > IPA')
        //  - refinement should be `beer`
        this.hierarchicalFacetsRefinements[facet][0].indexOf(
          value + separator
        ) === 0);
        if (upOneOrMultipleLevel) {
          if (value.indexOf(separator) === -1) {
            mod[facet] = [];
          } else {
            mod[facet] = [value.slice(0, value.lastIndexOf(separator))];
          }
        } else {
          mod[facet] = [value];
        }
        return this.setQueryParameters({
          hierarchicalFacetsRefinements: defaultsPure(
            {},
            mod,
            this.hierarchicalFacetsRefinements
          )
        });
      },
      /**
       * Adds a refinement on a hierarchical facet.
       * @param {string} facet the facet name
       * @param {string} path the hierarchical facet path
       * @return {SearchParameter} the new state
       * @throws Error if the facet is not defined or if the facet is refined
       */
      addHierarchicalFacetRefinement: function(facet, path) {
        if (this.isHierarchicalFacetRefined(facet)) {
          throw new Error(facet + " is already refined.");
        }
        if (!this.isHierarchicalFacet(facet)) {
          throw new Error(
            facet + " is not defined in the hierarchicalFacets attribute of the helper configuration."
          );
        }
        var mod = {};
        mod[facet] = [path];
        return this.setQueryParameters({
          hierarchicalFacetsRefinements: defaultsPure(
            {},
            mod,
            this.hierarchicalFacetsRefinements
          )
        });
      },
      /**
       * Removes the refinement set on a hierarchical facet.
       * @param {string} facet the facet name
       * @return {SearchParameter} the new state
       * @throws Error if the facet is not defined or if the facet is not refined
       */
      removeHierarchicalFacetRefinement: function(facet) {
        if (!this.isHierarchicalFacetRefined(facet)) {
          return this;
        }
        var mod = {};
        mod[facet] = [];
        return this.setQueryParameters({
          hierarchicalFacetsRefinements: defaultsPure(
            {},
            mod,
            this.hierarchicalFacetsRefinements
          )
        });
      },
      /**
       * Switch the tag refinement
       * @method
       * @param {string} tag the tag to remove or add
       * @return {SearchParameters} new instance
       */
      toggleTagRefinement: function toggleTagRefinement(tag) {
        if (this.isTagRefined(tag)) {
          return this.removeTagRefinement(tag);
        }
        return this.addTagRefinement(tag);
      },
      /**
       * Test if the facet name is from one of the disjunctive facets
       * @method
       * @param {string} facet facet name to test
       * @return {boolean} true if facet is a disjunctive facet
       */
      isDisjunctiveFacet: function(facet) {
        return this.disjunctiveFacets.indexOf(facet) > -1;
      },
      /**
       * Test if the facet name is from one of the hierarchical facets
       * @method
       * @param {string} facetName facet name to test
       * @return {boolean} true if facetName is a hierarchical facet
       */
      isHierarchicalFacet: function(facetName) {
        return this.getHierarchicalFacetByName(facetName) !== void 0;
      },
      /**
       * Test if the facet name is from one of the conjunctive/normal facets
       * @method
       * @param {string} facet facet name to test
       * @return {boolean} true if facet is a conjunctive facet
       */
      isConjunctiveFacet: function(facet) {
        return this.facets.indexOf(facet) > -1;
      },
      /**
       * Returns true if the facet is refined, either for a specific value or in
       * general.
       * @method
       * @param {string} facet name of the attribute for used for faceting
       * @param {string} value, optional value. If passed will test that this value
       * is filtering the given facet.
       * @return {boolean} returns true if refined
       */
      isFacetRefined: function isFacetRefined2(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          return false;
        }
        return RefinementList2.isRefined(this.facetsRefinements, facet, value);
      },
      /**
       * Returns true if the facet contains exclusions or if a specific value is
       * excluded.
       *
       * @method
       * @param {string} facet name of the attribute for used for faceting
       * @param {string} [value] optional value. If passed will test that this value
       * is filtering the given facet.
       * @return {boolean} returns true if refined
       */
      isExcludeRefined: function isExcludeRefined(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          return false;
        }
        return RefinementList2.isRefined(this.facetsExcludes, facet, value);
      },
      /**
       * Returns true if the facet contains a refinement, or if a value passed is a
       * refinement for the facet.
       * @method
       * @param {string} facet name of the attribute for used for faceting
       * @param {string} value optional, will test if the value is used for refinement
       * if there is one, otherwise will test if the facet contains any refinement
       * @return {boolean} true if the facet is refined
       */
      isDisjunctiveFacetRefined: function isDisjunctiveFacetRefined(facet, value) {
        if (!this.isDisjunctiveFacet(facet)) {
          return false;
        }
        return RefinementList2.isRefined(
          this.disjunctiveFacetsRefinements,
          facet,
          value
        );
      },
      /**
       * Returns true if the facet contains a refinement, or if a value passed is a
       * refinement for the facet.
       * @method
       * @param {string} facet name of the attribute for used for faceting
       * @param {string} value optional, will test if the value is used for refinement
       * if there is one, otherwise will test if the facet contains any refinement
       * @return {boolean} true if the facet is refined
       */
      isHierarchicalFacetRefined: function isHierarchicalFacetRefined(facet, value) {
        if (!this.isHierarchicalFacet(facet)) {
          return false;
        }
        var refinements = this.getHierarchicalRefinement(facet);
        if (!value) {
          return refinements.length > 0;
        }
        return refinements.indexOf(value) !== -1;
      },
      /**
       * Test if the triple (attribute, operator, value) is already refined.
       * If only the attribute and the operator are provided, it tests if the
       * contains any refinement value.
       * @method
       * @param {string} attribute attribute for which the refinement is applied
       * @param {string} [operator] operator of the refinement
       * @param {string} [value] value of the refinement
       * @return {boolean} true if it is refined
       */
      isNumericRefined: function isNumericRefined(attribute, operator, value) {
        if (value === void 0 && operator === void 0) {
          return Boolean(this.numericRefinements[attribute]);
        }
        var isOperatorDefined = this.numericRefinements[attribute] && this.numericRefinements[attribute][operator] !== void 0;
        if (value === void 0 || !isOperatorDefined) {
          return isOperatorDefined;
        }
        var parsedValue = valToNumber(value);
        var isAttributeValueDefined = findArray(this.numericRefinements[attribute][operator], parsedValue) !== void 0;
        return isOperatorDefined && isAttributeValueDefined;
      },
      /**
       * Returns true if the tag refined, false otherwise
       * @method
       * @param {string} tag the tag to check
       * @return {boolean} true if tag is refined
       */
      isTagRefined: function isTagRefined(tag) {
        return this.tagRefinements.indexOf(tag) !== -1;
      },
      /**
       * Returns the list of all disjunctive facets refined
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {string[]} returns the list of refinements
       */
      getRefinedDisjunctiveFacets: function getRefinedDisjunctiveFacets() {
        var self = this;
        var disjunctiveNumericRefinedFacets = intersection(
          Object.keys(this.numericRefinements).filter(function(facet) {
            return Object.keys(self.numericRefinements[facet]).length > 0;
          }),
          this.disjunctiveFacets
        );
        return Object.keys(this.disjunctiveFacetsRefinements).filter(function(facet) {
          return self.disjunctiveFacetsRefinements[facet].length > 0;
        }).concat(disjunctiveNumericRefinedFacets).concat(this.getRefinedHierarchicalFacets()).sort();
      },
      /**
       * Returns the list of all disjunctive facets refined
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {string[]} returns the list of refinements
       */
      getRefinedHierarchicalFacets: function getRefinedHierarchicalFacets() {
        var self = this;
        return intersection(
          // enforce the order between the two arrays,
          // so that refinement name index === hierarchical facet index
          this.hierarchicalFacets.map(function(facet) {
            return facet.name;
          }),
          Object.keys(this.hierarchicalFacetsRefinements).filter(function(facet) {
            return self.hierarchicalFacetsRefinements[facet].length > 0;
          })
        ).sort();
      },
      /**
       * Returned the list of all disjunctive facets not refined
       * @method
       * @return {string[]} returns the list of facets that are not refined
       */
      getUnrefinedDisjunctiveFacets: function() {
        var refinedFacets = this.getRefinedDisjunctiveFacets();
        return this.disjunctiveFacets.filter(function(f15) {
          return refinedFacets.indexOf(f15) === -1;
        });
      },
      managedParameters: [
        "index",
        "facets",
        "disjunctiveFacets",
        "facetsRefinements",
        "hierarchicalFacets",
        "facetsExcludes",
        "disjunctiveFacetsRefinements",
        "numericRefinements",
        "tagRefinements",
        "hierarchicalFacetsRefinements"
      ],
      getQueryParams: function getQueryParams() {
        var managedParameters = this.managedParameters;
        var queryParams = {};
        var self = this;
        Object.keys(this).forEach(function(paramName) {
          var paramValue = self[paramName];
          if (managedParameters.indexOf(paramName) === -1 && paramValue !== void 0) {
            queryParams[paramName] = paramValue;
          }
        });
        return queryParams;
      },
      /**
       * Let the user set a specific value for a given parameter. Will return the
       * same instance if the parameter is invalid or if the value is the same as the
       * previous one.
       * @method
       * @param {string} parameter the parameter name
       * @param {any} value the value to be set, must be compliant with the definition
       * of the attribute on the object
       * @return {SearchParameters} the updated state
       */
      setQueryParameter: function setParameter(parameter, value) {
        if (this[parameter] === value)
          return this;
        var modification = {};
        modification[parameter] = value;
        return this.setQueryParameters(modification);
      },
      /**
       * Let the user set any of the parameters with a plain object.
       * @method
       * @param {object} params all the keys and the values to be updated
       * @return {SearchParameters} a new updated instance
       */
      setQueryParameters: function setQueryParameters(params) {
        if (!params)
          return this;
        var error = SearchParameters.validate(this, params);
        if (error) {
          throw error;
        }
        var self = this;
        var nextWithNumbers = SearchParameters._parseNumbers(params);
        var previousPlainObject = Object.keys(this).reduce(function(acc, key2) {
          acc[key2] = self[key2];
          return acc;
        }, {});
        var nextPlainObject = Object.keys(nextWithNumbers).reduce(
          function(previous, key2) {
            var isPreviousValueDefined = previous[key2] !== void 0;
            var isNextValueDefined = nextWithNumbers[key2] !== void 0;
            if (isPreviousValueDefined && !isNextValueDefined) {
              return omit2(previous, [key2]);
            }
            if (isNextValueDefined) {
              previous[key2] = nextWithNumbers[key2];
            }
            return previous;
          },
          previousPlainObject
        );
        return new this.constructor(nextPlainObject);
      },
      /**
       * Returns a new instance with the page reset. Two scenarios possible:
       * the page is omitted -> return the given instance
       * the page is set -> return a new instance with a page of 0
       * @return {SearchParameters} a new updated instance
       */
      resetPage: function() {
        if (this.page === void 0) {
          return this;
        }
        return this.setPage(0);
      },
      /**
       * Helper function to get the hierarchicalFacet separator or the default one (`>`)
       * @param  {object} hierarchicalFacet the hierarchicalFacet object
       * @return {string} returns the hierarchicalFacet.separator or `>` as default
       */
      _getHierarchicalFacetSortBy: function(hierarchicalFacet) {
        return hierarchicalFacet.sortBy || ["isRefined:desc", "name:asc"];
      },
      /**
       * Helper function to get the hierarchicalFacet separator or the default one (`>`)
       * @private
       * @param  {object} hierarchicalFacet the hierarchicalFacet object
       * @return {string} returns the hierarchicalFacet.separator or `>` as default
       */
      _getHierarchicalFacetSeparator: function(hierarchicalFacet) {
        return hierarchicalFacet.separator || " > ";
      },
      /**
       * Helper function to get the hierarchicalFacet prefix path or null
       * @private
       * @param  {object} hierarchicalFacet the hierarchicalFacet object
       * @return {string} returns the hierarchicalFacet.rootPath or null as default
       */
      _getHierarchicalRootPath: function(hierarchicalFacet) {
        return hierarchicalFacet.rootPath || null;
      },
      /**
       * Helper function to check if we show the parent level of the hierarchicalFacet
       * @private
       * @param  {object} hierarchicalFacet the hierarchicalFacet object
       * @return {string} returns the hierarchicalFacet.showParentLevel or true as default
       */
      _getHierarchicalShowParentLevel: function(hierarchicalFacet) {
        if (typeof hierarchicalFacet.showParentLevel === "boolean") {
          return hierarchicalFacet.showParentLevel;
        }
        return true;
      },
      /**
       * Helper function to get the hierarchicalFacet by it's name
       * @param  {string} hierarchicalFacetName the hierarchicalFacet name
       * @return {object} a hierarchicalFacet
       */
      getHierarchicalFacetByName: function(hierarchicalFacetName) {
        return find2(this.hierarchicalFacets, function(f15) {
          return f15.name === hierarchicalFacetName;
        });
      },
      /**
       * Get the current breadcrumb for a hierarchical facet, as an array
       * @param  {string} facetName Hierarchical facet name
       * @return {array.<string>} the path as an array of string
       */
      getHierarchicalFacetBreadcrumb: function(facetName) {
        if (!this.isHierarchicalFacet(facetName)) {
          return [];
        }
        var refinement = this.getHierarchicalRefinement(facetName)[0];
        if (!refinement)
          return [];
        var separator = this._getHierarchicalFacetSeparator(
          this.getHierarchicalFacetByName(facetName)
        );
        var path = refinement.split(separator);
        return path.map(function(part) {
          return part.trim();
        });
      },
      toString: function() {
        return JSON.stringify(this, null, 2);
      }
    };
    module.exports = SearchParameters;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/compact.js
var require_compact = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/compact.js"(exports, module) {
    "use strict";
    module.exports = function compact(array) {
      if (!Array.isArray(array)) {
        return [];
      }
      return array.filter(Boolean);
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/findIndex.js
var require_findIndex = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/findIndex.js"(exports, module) {
    "use strict";
    module.exports = function find2(array, comparator) {
      if (!Array.isArray(array)) {
        return -1;
      }
      for (var i32 = 0; i32 < array.length; i32++) {
        if (comparator(array[i32])) {
          return i32;
        }
      }
      return -1;
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/formatSort.js
var require_formatSort = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/formatSort.js"(exports, module) {
    "use strict";
    var find2 = require_find();
    module.exports = function formatSort(sortBy, defaults) {
      var defaultInstructions = (defaults || []).map(function(sort) {
        return sort.split(":");
      });
      return sortBy.reduce(
        function preparePredicate(out, sort) {
          var sortInstruction = sort.split(":");
          var matchingDefault = find2(
            defaultInstructions,
            function(defaultInstruction) {
              return defaultInstruction[0] === sortInstruction[0];
            }
          );
          if (sortInstruction.length > 1 || !matchingDefault) {
            out[0].push(sortInstruction[0]);
            out[1].push(sortInstruction[1]);
            return out;
          }
          out[0].push(matchingDefault[0]);
          out[1].push(matchingDefault[1]);
          return out;
        },
        [[], []]
      );
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/orderBy.js
var require_orderBy = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/orderBy.js"(exports, module) {
    "use strict";
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== void 0;
        var valIsNull = value === null;
        var othIsDefined = other !== void 0;
        var othIsNull = other === null;
        if (!othIsNull && value > other || valIsNull && othIsDefined || !valIsDefined) {
          return 1;
        }
        if (!valIsNull && value < other || othIsNull && valIsDefined || !othIsDefined) {
          return -1;
        }
      }
      return 0;
    }
    function orderBy(collection, iteratees, orders) {
      if (!Array.isArray(collection)) {
        return [];
      }
      if (!Array.isArray(orders)) {
        orders = [];
      }
      var result = collection.map(function(value, index3) {
        return {
          criteria: iteratees.map(function(iteratee) {
            return value[iteratee];
          }),
          index: index3,
          value
        };
      });
      result.sort(function comparer(object, other) {
        var index3 = -1;
        while (++index3 < object.criteria.length) {
          var res = compareAscending(object.criteria[index3], other.criteria[index3]);
          if (res) {
            if (index3 >= orders.length) {
              return res;
            }
            if (orders[index3] === "desc") {
              return -res;
            }
            return res;
          }
        }
        return object.index - other.index;
      });
      return result.map(function(res) {
        return res.value;
      });
    }
    module.exports = orderBy;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/SearchResults/generate-hierarchical-tree.js
var require_generate_hierarchical_tree = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/SearchResults/generate-hierarchical-tree.js"(exports, module) {
    "use strict";
    module.exports = generateTrees;
    var fv = require_escapeFacetValue();
    var find2 = require_find();
    var prepareHierarchicalFacetSortBy = require_formatSort();
    var orderBy = require_orderBy();
    var escapeFacetValue2 = fv.escapeFacetValue;
    var unescapeFacetValue2 = fv.unescapeFacetValue;
    function generateTrees(state) {
      return function generate(hierarchicalFacetResult, hierarchicalFacetIndex) {
        var hierarchicalFacet = state.hierarchicalFacets[hierarchicalFacetIndex];
        var hierarchicalFacetRefinement = state.hierarchicalFacetsRefinements[hierarchicalFacet.name] && state.hierarchicalFacetsRefinements[hierarchicalFacet.name][0] || "";
        var hierarchicalSeparator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var hierarchicalRootPath = state._getHierarchicalRootPath(hierarchicalFacet);
        var hierarchicalShowParentLevel = state._getHierarchicalShowParentLevel(hierarchicalFacet);
        var sortBy = prepareHierarchicalFacetSortBy(
          state._getHierarchicalFacetSortBy(hierarchicalFacet)
        );
        var rootExhaustive = hierarchicalFacetResult.every(function(facetResult) {
          return facetResult.exhaustive;
        });
        var generateTreeFn = generateHierarchicalTree(
          sortBy,
          hierarchicalSeparator,
          hierarchicalRootPath,
          hierarchicalShowParentLevel,
          hierarchicalFacetRefinement
        );
        var results = hierarchicalFacetResult;
        if (hierarchicalRootPath) {
          results = hierarchicalFacetResult.slice(
            hierarchicalRootPath.split(hierarchicalSeparator).length
          );
        }
        return results.reduce(generateTreeFn, {
          name: state.hierarchicalFacets[hierarchicalFacetIndex].name,
          count: null,
          // root level, no count
          isRefined: true,
          // root level, always refined
          path: null,
          // root level, no path
          escapedValue: null,
          exhaustive: rootExhaustive,
          data: null
        });
      };
    }
    function generateHierarchicalTree(sortBy, hierarchicalSeparator, hierarchicalRootPath, hierarchicalShowParentLevel, currentRefinement) {
      return function generateTree(hierarchicalTree, hierarchicalFacetResult, currentHierarchicalLevel) {
        var parent = hierarchicalTree;
        if (currentHierarchicalLevel > 0) {
          var level = 0;
          parent = hierarchicalTree;
          while (level < currentHierarchicalLevel) {
            var data = parent && Array.isArray(parent.data) ? parent.data : [];
            parent = find2(data, function(subtree) {
              return subtree.isRefined;
            });
            level++;
          }
        }
        if (parent) {
          var picked = Object.keys(hierarchicalFacetResult.data).map(function(facetValue) {
            return [facetValue, hierarchicalFacetResult.data[facetValue]];
          }).filter(function(tuple) {
            var facetValue = tuple[0];
            return onlyMatchingTree(
              facetValue,
              parent.path || hierarchicalRootPath,
              currentRefinement,
              hierarchicalSeparator,
              hierarchicalRootPath,
              hierarchicalShowParentLevel
            );
          });
          parent.data = orderBy(
            picked.map(function(tuple) {
              var facetValue = tuple[0];
              var facetCount = tuple[1];
              return format(
                facetCount,
                facetValue,
                hierarchicalSeparator,
                unescapeFacetValue2(currentRefinement),
                hierarchicalFacetResult.exhaustive
              );
            }),
            sortBy[0],
            sortBy[1]
          );
        }
        return hierarchicalTree;
      };
    }
    function onlyMatchingTree(facetValue, parentPath, currentRefinement, hierarchicalSeparator, hierarchicalRootPath, hierarchicalShowParentLevel) {
      if (hierarchicalRootPath && (facetValue.indexOf(hierarchicalRootPath) !== 0 || hierarchicalRootPath === facetValue)) {
        return false;
      }
      return !hierarchicalRootPath && facetValue.indexOf(hierarchicalSeparator) === -1 || // if there is a rootPath, being root level mean 1 level under rootPath
      hierarchicalRootPath && facetValue.split(hierarchicalSeparator).length - hierarchicalRootPath.split(hierarchicalSeparator).length === 1 || // if current refinement is a root level and current facetValue is a root level,
      // keep the facetValue
      facetValue.indexOf(hierarchicalSeparator) === -1 && currentRefinement.indexOf(hierarchicalSeparator) === -1 || // currentRefinement is a child of the facet value
      currentRefinement.indexOf(facetValue) === 0 || // facetValue is a child of the current parent, add it
      facetValue.indexOf(parentPath + hierarchicalSeparator) === 0 && (hierarchicalShowParentLevel || facetValue.indexOf(currentRefinement) === 0);
    }
    function format(facetCount, facetValue, hierarchicalSeparator, currentRefinement, exhaustive) {
      var parts = facetValue.split(hierarchicalSeparator);
      return {
        name: parts[parts.length - 1].trim(),
        path: facetValue,
        escapedValue: escapeFacetValue2(facetValue),
        count: facetCount,
        isRefined: currentRefinement === facetValue || currentRefinement.indexOf(facetValue + hierarchicalSeparator) === 0,
        exhaustive,
        data: null
      };
    }
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/SearchResults/index.js
var require_SearchResults = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/SearchResults/index.js"(exports, module) {
    "use strict";
    var compact = require_compact();
    var defaultsPure = require_defaultsPure();
    var fv = require_escapeFacetValue();
    var find2 = require_find();
    var findIndex2 = require_findIndex();
    var formatSort = require_formatSort();
    var merge = require_merge();
    var orderBy = require_orderBy();
    var escapeFacetValue2 = fv.escapeFacetValue;
    var unescapeFacetValue2 = fv.unescapeFacetValue;
    var generateHierarchicalTree = require_generate_hierarchical_tree();
    function getIndices(attributes) {
      var indices = {};
      attributes.forEach(function(val, idx) {
        indices[val] = idx;
      });
      return indices;
    }
    function assignFacetStats(dest, facetStats, key2) {
      if (facetStats && facetStats[key2]) {
        dest.stats = facetStats[key2];
      }
    }
    function findMatchingHierarchicalFacetFromAttributeName(hierarchicalFacets, hierarchicalAttributeName) {
      return find2(
        hierarchicalFacets,
        function facetKeyMatchesAttribute(hierarchicalFacet) {
          var facetNames = hierarchicalFacet.attributes || [];
          return facetNames.indexOf(hierarchicalAttributeName) > -1;
        }
      );
    }
    function SearchResults(state, results, options) {
      var mainSubResponse = results[0] || {};
      this._rawResults = results;
      var self = this;
      Object.keys(mainSubResponse).forEach(function(key2) {
        self[key2] = mainSubResponse[key2];
      });
      var opts = merge(
        {
          persistHierarchicalRootCount: false
        },
        options
      );
      Object.keys(opts).forEach(function(key2) {
        self[key2] = opts[key2];
      });
      this.processingTimeMS = results.reduce(function(sum, result) {
        return result.processingTimeMS === void 0 ? sum : sum + result.processingTimeMS;
      }, 0);
      this.disjunctiveFacets = [];
      this.hierarchicalFacets = state.hierarchicalFacets.map(
        function initFutureTree() {
          return [];
        }
      );
      this.facets = [];
      var disjunctiveFacets = state.getRefinedDisjunctiveFacets();
      var facetsIndices = getIndices(state.facets);
      var disjunctiveFacetsIndices = getIndices(state.disjunctiveFacets);
      var nextDisjunctiveResult = 1;
      var mainFacets = mainSubResponse.facets || {};
      Object.keys(mainFacets).forEach(function(facetKey) {
        var facetValueObject = mainFacets[facetKey];
        var hierarchicalFacet = findMatchingHierarchicalFacetFromAttributeName(
          state.hierarchicalFacets,
          facetKey
        );
        if (hierarchicalFacet) {
          var facetIndex = hierarchicalFacet.attributes.indexOf(facetKey);
          var idxAttributeName = findIndex2(state.hierarchicalFacets, function(f15) {
            return f15.name === hierarchicalFacet.name;
          });
          self.hierarchicalFacets[idxAttributeName][facetIndex] = {
            attribute: facetKey,
            data: facetValueObject,
            exhaustive: mainSubResponse.exhaustiveFacetsCount
          };
        } else {
          var isFacetDisjunctive = state.disjunctiveFacets.indexOf(facetKey) !== -1;
          var isFacetConjunctive = state.facets.indexOf(facetKey) !== -1;
          var position;
          if (isFacetDisjunctive) {
            position = disjunctiveFacetsIndices[facetKey];
            self.disjunctiveFacets[position] = {
              name: facetKey,
              data: facetValueObject,
              exhaustive: mainSubResponse.exhaustiveFacetsCount
            };
            assignFacetStats(
              self.disjunctiveFacets[position],
              mainSubResponse.facets_stats,
              facetKey
            );
          }
          if (isFacetConjunctive) {
            position = facetsIndices[facetKey];
            self.facets[position] = {
              name: facetKey,
              data: facetValueObject,
              exhaustive: mainSubResponse.exhaustiveFacetsCount
            };
            assignFacetStats(
              self.facets[position],
              mainSubResponse.facets_stats,
              facetKey
            );
          }
        }
      });
      this.hierarchicalFacets = compact(this.hierarchicalFacets);
      disjunctiveFacets.forEach(function(disjunctiveFacet) {
        var result = results[nextDisjunctiveResult];
        var facets = result && result.facets ? result.facets : {};
        var hierarchicalFacet = state.getHierarchicalFacetByName(disjunctiveFacet);
        Object.keys(facets).forEach(function(dfacet) {
          var facetResults = facets[dfacet];
          var position;
          if (hierarchicalFacet) {
            position = findIndex2(state.hierarchicalFacets, function(f15) {
              return f15.name === hierarchicalFacet.name;
            });
            var attributeIndex = findIndex2(
              self.hierarchicalFacets[position],
              function(f15) {
                return f15.attribute === dfacet;
              }
            );
            if (attributeIndex === -1) {
              return;
            }
            self.hierarchicalFacets[position][attributeIndex].data = merge(
              {},
              self.hierarchicalFacets[position][attributeIndex].data,
              facetResults
            );
          } else {
            position = disjunctiveFacetsIndices[dfacet];
            var dataFromMainRequest = mainSubResponse.facets && mainSubResponse.facets[dfacet] || {};
            self.disjunctiveFacets[position] = {
              name: dfacet,
              data: defaultsPure({}, facetResults, dataFromMainRequest),
              exhaustive: result.exhaustiveFacetsCount
            };
            assignFacetStats(
              self.disjunctiveFacets[position],
              result.facets_stats,
              dfacet
            );
            if (state.disjunctiveFacetsRefinements[dfacet]) {
              state.disjunctiveFacetsRefinements[dfacet].forEach(function(refinementValue) {
                if (!self.disjunctiveFacets[position].data[refinementValue] && state.disjunctiveFacetsRefinements[dfacet].indexOf(
                  unescapeFacetValue2(refinementValue)
                ) > -1) {
                  self.disjunctiveFacets[position].data[refinementValue] = 0;
                }
              });
            }
          }
        });
        nextDisjunctiveResult++;
      });
      state.getRefinedHierarchicalFacets().forEach(function(refinedFacet) {
        var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
        if (currentRefinement.length === 0 || currentRefinement[0].split(separator).length < 2) {
          return;
        }
        results.slice(nextDisjunctiveResult).forEach(function(result) {
          var facets = result && result.facets ? result.facets : {};
          Object.keys(facets).forEach(function(dfacet) {
            var facetResults = facets[dfacet];
            var position = findIndex2(state.hierarchicalFacets, function(f15) {
              return f15.name === hierarchicalFacet.name;
            });
            var attributeIndex = findIndex2(
              self.hierarchicalFacets[position],
              function(f15) {
                return f15.attribute === dfacet;
              }
            );
            if (attributeIndex === -1) {
              return;
            }
            var defaultData = {};
            if (currentRefinement.length > 0 && !self.persistHierarchicalRootCount) {
              var root = currentRefinement[0].split(separator)[0];
              defaultData[root] = self.hierarchicalFacets[position][attributeIndex].data[root];
            }
            self.hierarchicalFacets[position][attributeIndex].data = defaultsPure(
              defaultData,
              facetResults,
              self.hierarchicalFacets[position][attributeIndex].data
            );
          });
          nextDisjunctiveResult++;
        });
      });
      Object.keys(state.facetsExcludes).forEach(function(facetName) {
        var excludes = state.facetsExcludes[facetName];
        var position = facetsIndices[facetName];
        self.facets[position] = {
          name: facetName,
          data: mainFacets[facetName],
          exhaustive: mainSubResponse.exhaustiveFacetsCount
        };
        excludes.forEach(function(facetValue) {
          self.facets[position] = self.facets[position] || { name: facetName };
          self.facets[position].data = self.facets[position].data || {};
          self.facets[position].data[facetValue] = 0;
        });
      });
      this.hierarchicalFacets = this.hierarchicalFacets.map(
        generateHierarchicalTree(state)
      );
      this.facets = compact(this.facets);
      this.disjunctiveFacets = compact(this.disjunctiveFacets);
      this._state = state;
    }
    SearchResults.prototype.getFacetByName = function(name) {
      function predicate(facet) {
        return facet.name === name;
      }
      return find2(this.facets, predicate) || find2(this.disjunctiveFacets, predicate) || find2(this.hierarchicalFacets, predicate);
    };
    function extractNormalizedFacetValues(results, attribute) {
      function predicate(facet2) {
        return facet2.name === attribute;
      }
      if (results._state.isConjunctiveFacet(attribute)) {
        var facet = find2(results.facets, predicate);
        if (!facet)
          return [];
        return Object.keys(facet.data).map(function(name) {
          var value = escapeFacetValue2(name);
          return {
            name,
            escapedValue: value,
            count: facet.data[name],
            isRefined: results._state.isFacetRefined(attribute, value),
            isExcluded: results._state.isExcludeRefined(attribute, name)
          };
        });
      } else if (results._state.isDisjunctiveFacet(attribute)) {
        var disjunctiveFacet = find2(results.disjunctiveFacets, predicate);
        if (!disjunctiveFacet)
          return [];
        return Object.keys(disjunctiveFacet.data).map(function(name) {
          var value = escapeFacetValue2(name);
          return {
            name,
            escapedValue: value,
            count: disjunctiveFacet.data[name],
            isRefined: results._state.isDisjunctiveFacetRefined(attribute, value)
          };
        });
      } else if (results._state.isHierarchicalFacet(attribute)) {
        var hierarchicalFacetValues = find2(results.hierarchicalFacets, predicate);
        if (!hierarchicalFacetValues)
          return hierarchicalFacetValues;
        var hierarchicalFacet = results._state.getHierarchicalFacetByName(attribute);
        var separator = results._state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var currentRefinement = unescapeFacetValue2(
          results._state.getHierarchicalRefinement(attribute)[0] || ""
        );
        if (currentRefinement.indexOf(hierarchicalFacet.rootPath) === 0) {
          currentRefinement = currentRefinement.replace(
            hierarchicalFacet.rootPath + separator,
            ""
          );
        }
        var currentRefinementSplit = currentRefinement.split(separator);
        currentRefinementSplit.unshift(attribute);
        setIsRefined(hierarchicalFacetValues, currentRefinementSplit, 0);
        return hierarchicalFacetValues;
      }
      return void 0;
    }
    function setIsRefined(item2, currentRefinement, depth) {
      item2.isRefined = item2.name === (currentRefinement[depth] && currentRefinement[depth].trim());
      if (item2.data) {
        item2.data.forEach(function(child) {
          setIsRefined(child, currentRefinement, depth + 1);
        });
      }
    }
    function recSort(sortFn, node, names, level) {
      level = level || 0;
      if (Array.isArray(node)) {
        return sortFn(node, names[level]);
      }
      if (!node.data || node.data.length === 0) {
        return node;
      }
      var children = node.data.map(function(childNode) {
        return recSort(sortFn, childNode, names, level + 1);
      });
      var sortedChildren = sortFn(children, names[level]);
      var newNode = defaultsPure({ data: sortedChildren }, node);
      return newNode;
    }
    SearchResults.DEFAULT_SORT = ["isRefined:desc", "count:desc", "name:asc"];
    function vanillaSortFn(order, data) {
      return data.sort(order);
    }
    function sortViaFacetOrdering(facetValues, facetOrdering) {
      var orderedFacets = [];
      var remainingFacets = [];
      var hide = facetOrdering.hide || [];
      var order = facetOrdering.order || [];
      var reverseOrder = order.reduce(function(acc, name, i32) {
        acc[name] = i32;
        return acc;
      }, {});
      facetValues.forEach(function(item2) {
        var name = item2.path || item2.name;
        var hidden = hide.indexOf(name) > -1;
        if (!hidden && reverseOrder[name] !== void 0) {
          orderedFacets[reverseOrder[name]] = item2;
        } else if (!hidden) {
          remainingFacets.push(item2);
        }
      });
      orderedFacets = orderedFacets.filter(function(facet) {
        return facet;
      });
      var sortRemainingBy = facetOrdering.sortRemainingBy;
      var ordering;
      if (sortRemainingBy === "hidden") {
        return orderedFacets;
      } else if (sortRemainingBy === "alpha") {
        ordering = [
          ["path", "name"],
          ["asc", "asc"]
        ];
      } else {
        ordering = [["count"], ["desc"]];
      }
      return orderedFacets.concat(
        orderBy(remainingFacets, ordering[0], ordering[1])
      );
    }
    function getFacetOrdering(results, attribute) {
      return results.renderingContent && results.renderingContent.facetOrdering && results.renderingContent.facetOrdering.values && results.renderingContent.facetOrdering.values[attribute];
    }
    SearchResults.prototype.getFacetValues = function(attribute, opts) {
      var facetValues = extractNormalizedFacetValues(this, attribute);
      if (!facetValues) {
        return void 0;
      }
      var options = defaultsPure({}, opts, {
        sortBy: SearchResults.DEFAULT_SORT,
        // if no sortBy is given, attempt to sort based on facetOrdering
        // if it is given, we still allow to sort via facet ordering first
        facetOrdering: !(opts && opts.sortBy)
      });
      var results = this;
      var attributes;
      if (Array.isArray(facetValues)) {
        attributes = [attribute];
      } else {
        var config = results._state.getHierarchicalFacetByName(facetValues.name);
        attributes = config.attributes;
      }
      return recSort(
        function(data, facetName) {
          if (options.facetOrdering) {
            var facetOrdering = getFacetOrdering(results, facetName);
            if (facetOrdering) {
              return sortViaFacetOrdering(data, facetOrdering);
            }
          }
          if (Array.isArray(options.sortBy)) {
            var order = formatSort(options.sortBy, SearchResults.DEFAULT_SORT);
            return orderBy(data, order[0], order[1]);
          } else if (typeof options.sortBy === "function") {
            return vanillaSortFn(options.sortBy, data);
          }
          throw new Error(
            "options.sortBy is optional but if defined it must be either an array of string (predicates) or a sorting function"
          );
        },
        facetValues,
        attributes
      );
    };
    SearchResults.prototype.getFacetStats = function(attribute) {
      if (this._state.isConjunctiveFacet(attribute)) {
        return getFacetStatsIfAvailable(this.facets, attribute);
      } else if (this._state.isDisjunctiveFacet(attribute)) {
        return getFacetStatsIfAvailable(this.disjunctiveFacets, attribute);
      }
      return void 0;
    };
    function getFacetStatsIfAvailable(facetList, facetName) {
      var data = find2(facetList, function(facet) {
        return facet.name === facetName;
      });
      return data && data.stats;
    }
    SearchResults.prototype.getRefinements = function() {
      var state = this._state;
      var results = this;
      var res = [];
      Object.keys(state.facetsRefinements).forEach(function(attributeName) {
        state.facetsRefinements[attributeName].forEach(function(name) {
          res.push(
            getRefinement2(state, "facet", attributeName, name, results.facets)
          );
        });
      });
      Object.keys(state.facetsExcludes).forEach(function(attributeName) {
        state.facetsExcludes[attributeName].forEach(function(name) {
          res.push(
            getRefinement2(state, "exclude", attributeName, name, results.facets)
          );
        });
      });
      Object.keys(state.disjunctiveFacetsRefinements).forEach(function(attributeName) {
        state.disjunctiveFacetsRefinements[attributeName].forEach(function(name) {
          res.push(
            getRefinement2(
              state,
              "disjunctive",
              attributeName,
              name,
              results.disjunctiveFacets
            )
          );
        });
      });
      Object.keys(state.hierarchicalFacetsRefinements).forEach(function(attributeName) {
        state.hierarchicalFacetsRefinements[attributeName].forEach(function(name) {
          res.push(
            getHierarchicalRefinement(
              state,
              attributeName,
              name,
              results.hierarchicalFacets
            )
          );
        });
      });
      Object.keys(state.numericRefinements).forEach(function(attributeName) {
        var operators = state.numericRefinements[attributeName];
        Object.keys(operators).forEach(function(operator) {
          operators[operator].forEach(function(value) {
            res.push({
              type: "numeric",
              attributeName,
              name: value,
              numericValue: value,
              operator
            });
          });
        });
      });
      state.tagRefinements.forEach(function(name) {
        res.push({ type: "tag", attributeName: "_tags", name });
      });
      return res;
    };
    function getRefinement2(state, type, attributeName, name, resultsFacets) {
      var facet = find2(resultsFacets, function(f15) {
        return f15.name === attributeName;
      });
      var count = facet && facet.data && facet.data[name] ? facet.data[name] : 0;
      var exhaustive = facet && facet.exhaustive || false;
      return {
        type,
        attributeName,
        name,
        count,
        exhaustive
      };
    }
    function getHierarchicalRefinement(state, attributeName, name, resultsFacets) {
      var facetDeclaration = state.getHierarchicalFacetByName(attributeName);
      var separator = state._getHierarchicalFacetSeparator(facetDeclaration);
      var split = name.split(separator);
      var rootFacet = find2(resultsFacets, function(facet2) {
        return facet2.name === attributeName;
      });
      var facet = split.reduce(function(intermediateFacet, part) {
        var newFacet = intermediateFacet && find2(intermediateFacet.data, function(f15) {
          return f15.name === part;
        });
        return newFacet !== void 0 ? newFacet : intermediateFacet;
      }, rootFacet);
      var count = facet && facet.count || 0;
      var exhaustive = facet && facet.exhaustive || false;
      var path = facet && facet.path || "";
      return {
        type: "hierarchical",
        attributeName,
        name: path,
        count,
        exhaustive
      };
    }
    module.exports = SearchResults;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/flat.js
var require_flat = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/functions/flat.js"(exports, module) {
    module.exports = function flat(arr) {
      return arr.reduce(function(acc, val) {
        return acc.concat(val);
      }, []);
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/utils/sortAndMergeRecommendations.js
var require_sortAndMergeRecommendations = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/utils/sortAndMergeRecommendations.js"(exports, module) {
    "use strict";
    var find2 = require_find();
    var flat = require_flat();
    function getAverageIndices(indexTracker, nrOfObjs) {
      var avgIndices = [];
      Object.keys(indexTracker).forEach(function(key2) {
        if (indexTracker[key2].count < 2) {
          indexTracker[key2].indexSum += 100;
        }
        avgIndices.push({
          objectID: key2,
          avgOfIndices: indexTracker[key2].indexSum / nrOfObjs
        });
      });
      return avgIndices.sort(function(a30, b3) {
        return a30.avgOfIndices > b3.avgOfIndices ? 1 : -1;
      });
    }
    function sortAndMergeRecommendations(results) {
      var indexTracker = {};
      results.forEach(function(hits) {
        hits.forEach(function(hit, index3) {
          if (!indexTracker[hit.objectID]) {
            indexTracker[hit.objectID] = { indexSum: index3, count: 1 };
          } else {
            indexTracker[hit.objectID] = {
              indexSum: indexTracker[hit.objectID].indexSum + index3,
              count: indexTracker[hit.objectID].count + 1
            };
          }
        });
      });
      var sortedAverageIndices = getAverageIndices(indexTracker, results.length);
      var finalOrder = sortedAverageIndices.reduce(
        function(orderedHits, avgIndexRef) {
          var result = find2(flat(results), function(hit) {
            return hit.objectID === avgIndexRef.objectID;
          });
          return result ? orderedHits.concat(result) : orderedHits;
        },
        []
      );
      return finalOrder;
    }
    module.exports = sortAndMergeRecommendations;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/version.js
var require_version = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/version.js"(exports, module) {
    "use strict";
    module.exports = "3.22.1";
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/algoliasearch.helper.js
var require_algoliasearch_helper = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/src/algoliasearch.helper.js"(exports, module) {
    "use strict";
    var EventEmitter2 = require_events();
    var DerivedHelper = require_DerivedHelper();
    var escapeFacetValue2 = require_escapeFacetValue().escapeFacetValue;
    var inherits = require_inherits();
    var merge = require_merge();
    var objectHasKeys = require_objectHasKeys();
    var omit2 = require_omit();
    var RecommendParameters = require_RecommendParameters();
    var RecommendResults = require_RecommendResults();
    var requestBuilder = require_requestBuilder();
    var SearchParameters = require_SearchParameters();
    var SearchResults = require_SearchResults();
    var sortAndMergeRecommendations = require_sortAndMergeRecommendations();
    var version2 = require_version();
    function AlgoliaSearchHelper(client, index3, options, searchResultsOptions) {
      if (typeof client.addAlgoliaAgent === "function") {
        client.addAlgoliaAgent("JS Helper (" + version2 + ")");
      }
      this.setClient(client);
      var opts = options || {};
      opts.index = index3;
      this.state = SearchParameters.make(opts);
      this.recommendState = new RecommendParameters({
        params: opts.recommendState
      });
      this.lastResults = null;
      this.lastRecommendResults = null;
      this._queryId = 0;
      this._recommendQueryId = 0;
      this._lastQueryIdReceived = -1;
      this._lastRecommendQueryIdReceived = -1;
      this.derivedHelpers = [];
      this._currentNbQueries = 0;
      this._currentNbRecommendQueries = 0;
      this._searchResultsOptions = searchResultsOptions;
      this._recommendCache = {};
    }
    inherits(AlgoliaSearchHelper, EventEmitter2);
    AlgoliaSearchHelper.prototype.search = function() {
      this._search({ onlyWithDerivedHelpers: false });
      return this;
    };
    AlgoliaSearchHelper.prototype.searchOnlyWithDerivedHelpers = function() {
      this._search({ onlyWithDerivedHelpers: true });
      return this;
    };
    AlgoliaSearchHelper.prototype.recommend = function() {
      this._recommend();
      return this;
    };
    AlgoliaSearchHelper.prototype.getQuery = function() {
      var state = this.state;
      return requestBuilder._getHitsSearchParams(state);
    };
    AlgoliaSearchHelper.prototype.searchOnce = function(options, cb) {
      var tempState = !options ? this.state : this.state.setQueryParameters(options);
      var queries = requestBuilder._getQueries(tempState.index, tempState);
      var self = this;
      this._currentNbQueries++;
      this.emit("searchOnce", {
        state: tempState
      });
      if (cb) {
        this.client.search(queries).then(function(content) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) {
            self.emit("searchQueueEmpty");
          }
          cb(null, new SearchResults(tempState, content.results), tempState);
        }).catch(function(err) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) {
            self.emit("searchQueueEmpty");
          }
          cb(err, null, tempState);
        });
        return void 0;
      }
      return this.client.search(queries).then(
        function(content) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0)
            self.emit("searchQueueEmpty");
          return {
            content: new SearchResults(tempState, content.results),
            state: tempState,
            _originalResponse: content
          };
        },
        function(e34) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0)
            self.emit("searchQueueEmpty");
          throw e34;
        }
      );
    };
    AlgoliaSearchHelper.prototype.findAnswers = function(options) {
      console.warn("[algoliasearch-helper] answers is no longer supported");
      var state = this.state;
      var derivedHelper = this.derivedHelpers[0];
      if (!derivedHelper) {
        return Promise.resolve([]);
      }
      var derivedState = derivedHelper.getModifiedState(state);
      var data = merge(
        {
          attributesForPrediction: options.attributesForPrediction,
          nbHits: options.nbHits
        },
        {
          params: omit2(requestBuilder._getHitsSearchParams(derivedState), [
            "attributesToSnippet",
            "hitsPerPage",
            "restrictSearchableAttributes",
            "snippetEllipsisText"
          ])
        }
      );
      var errorMessage = "search for answers was called, but this client does not have a function client.initIndex(index).findAnswers";
      if (typeof this.client.initIndex !== "function") {
        throw new Error(errorMessage);
      }
      var index3 = this.client.initIndex(derivedState.index);
      if (typeof index3.findAnswers !== "function") {
        throw new Error(errorMessage);
      }
      return index3.findAnswers(derivedState.query, options.queryLanguages, data);
    };
    AlgoliaSearchHelper.prototype.searchForFacetValues = function(facet, query, maxFacetHits, userState) {
      var clientHasSFFV = typeof this.client.searchForFacetValues === "function";
      var clientHasInitIndex = typeof this.client.initIndex === "function";
      if (!clientHasSFFV && !clientHasInitIndex && typeof this.client.search !== "function") {
        throw new Error(
          "search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues or client.initIndex(index).searchForFacetValues"
        );
      }
      var state = this.state.setQueryParameters(userState || {});
      var isDisjunctive = state.isDisjunctiveFacet(facet);
      var algoliaQuery = requestBuilder.getSearchForFacetQuery(
        facet,
        query,
        maxFacetHits,
        state
      );
      this._currentNbQueries++;
      var self = this;
      var searchForFacetValuesPromise;
      if (clientHasSFFV) {
        searchForFacetValuesPromise = this.client.searchForFacetValues([
          { indexName: state.index, params: algoliaQuery }
        ]);
      } else if (clientHasInitIndex) {
        searchForFacetValuesPromise = this.client.initIndex(state.index).searchForFacetValues(algoliaQuery);
      } else {
        delete algoliaQuery.facetName;
        searchForFacetValuesPromise = this.client.search([
          {
            type: "facet",
            facet,
            indexName: state.index,
            params: algoliaQuery
          }
        ]).then(function processResponse(response) {
          return response.results[0];
        });
      }
      this.emit("searchForFacetValues", {
        state,
        facet,
        query
      });
      return searchForFacetValuesPromise.then(
        function addIsRefined(content) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0)
            self.emit("searchQueueEmpty");
          content = Array.isArray(content) ? content[0] : content;
          content.facetHits.forEach(function(f15) {
            f15.escapedValue = escapeFacetValue2(f15.value);
            f15.isRefined = isDisjunctive ? state.isDisjunctiveFacetRefined(facet, f15.escapedValue) : state.isFacetRefined(facet, f15.escapedValue);
          });
          return content;
        },
        function(e34) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0)
            self.emit("searchQueueEmpty");
          throw e34;
        }
      );
    };
    AlgoliaSearchHelper.prototype.setQuery = function(q2) {
      this._change({
        state: this.state.resetPage().setQuery(q2),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.clearRefinements = function(name) {
      this._change({
        state: this.state.resetPage().clearRefinements(name),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.clearTags = function() {
      this._change({
        state: this.state.resetPage().clearTags(),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addDisjunctiveFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().addDisjunctiveFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addDisjunctiveRefine = function() {
      return this.addDisjunctiveFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.addHierarchicalFacetRefinement = function(facet, path) {
      this._change({
        state: this.state.resetPage().addHierarchicalFacetRefinement(facet, path),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addNumericRefinement = function(attribute, operator, value) {
      this._change({
        state: this.state.resetPage().addNumericRefinement(attribute, operator, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().addFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addRefine = function() {
      return this.addFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.addFacetExclusion = function(facet, value) {
      this._change({
        state: this.state.resetPage().addExcludeRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addExclude = function() {
      return this.addFacetExclusion.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.addTag = function(tag) {
      this._change({
        state: this.state.resetPage().addTagRefinement(tag),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addFrequentlyBoughtTogether = function(params) {
      this._recommendChange({
        state: this.recommendState.addFrequentlyBoughtTogether(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addRelatedProducts = function(params) {
      this._recommendChange({
        state: this.recommendState.addRelatedProducts(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addTrendingItems = function(params) {
      this._recommendChange({
        state: this.recommendState.addTrendingItems(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addTrendingFacets = function(params) {
      this._recommendChange({
        state: this.recommendState.addTrendingFacets(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addLookingSimilar = function(params) {
      this._recommendChange({
        state: this.recommendState.addLookingSimilar(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeNumericRefinement = function(attribute, operator, value) {
      this._change({
        state: this.state.resetPage().removeNumericRefinement(attribute, operator, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeDisjunctiveFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().removeDisjunctiveFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeDisjunctiveRefine = function() {
      return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.removeHierarchicalFacetRefinement = function(facet) {
      this._change({
        state: this.state.resetPage().removeHierarchicalFacetRefinement(facet),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().removeFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeRefine = function() {
      return this.removeFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.removeFacetExclusion = function(facet, value) {
      this._change({
        state: this.state.resetPage().removeExcludeRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeExclude = function() {
      return this.removeFacetExclusion.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.removeTag = function(tag) {
      this._change({
        state: this.state.resetPage().removeTagRefinement(tag),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeFrequentlyBoughtTogether = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeRelatedProducts = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeTrendingItems = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeTrendingFacets = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeLookingSimilar = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.toggleFacetExclusion = function(facet, value) {
      this._change({
        state: this.state.resetPage().toggleExcludeFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.toggleExclude = function() {
      return this.toggleFacetExclusion.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.toggleRefinement = function(facet, value) {
      return this.toggleFacetRefinement(facet, value);
    };
    AlgoliaSearchHelper.prototype.toggleFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().toggleFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.toggleRefine = function() {
      return this.toggleFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.toggleTag = function(tag) {
      this._change({
        state: this.state.resetPage().toggleTagRefinement(tag),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.nextPage = function() {
      var page = this.state.page || 0;
      return this.setPage(page + 1);
    };
    AlgoliaSearchHelper.prototype.previousPage = function() {
      var page = this.state.page || 0;
      return this.setPage(page - 1);
    };
    function setCurrentPage(page) {
      if (page < 0)
        throw new Error("Page requested below 0.");
      this._change({
        state: this.state.setPage(page),
        isPageReset: false
      });
      return this;
    }
    AlgoliaSearchHelper.prototype.setCurrentPage = setCurrentPage;
    AlgoliaSearchHelper.prototype.setPage = setCurrentPage;
    AlgoliaSearchHelper.prototype.setIndex = function(name) {
      this._change({
        state: this.state.resetPage().setIndex(name),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.setQueryParameter = function(parameter, value) {
      this._change({
        state: this.state.resetPage().setQueryParameter(parameter, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.setState = function(newState) {
      this._change({
        state: SearchParameters.make(newState),
        isPageReset: false
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.overrideStateWithoutTriggeringChangeEvent = function(newState) {
      this.state = new SearchParameters(newState);
      return this;
    };
    AlgoliaSearchHelper.prototype.hasRefinements = function(attribute) {
      if (objectHasKeys(this.state.getNumericRefinements(attribute))) {
        return true;
      } else if (this.state.isConjunctiveFacet(attribute)) {
        return this.state.isFacetRefined(attribute);
      } else if (this.state.isDisjunctiveFacet(attribute)) {
        return this.state.isDisjunctiveFacetRefined(attribute);
      } else if (this.state.isHierarchicalFacet(attribute)) {
        return this.state.isHierarchicalFacetRefined(attribute);
      }
      return false;
    };
    AlgoliaSearchHelper.prototype.isExcluded = function(facet, value) {
      return this.state.isExcludeRefined(facet, value);
    };
    AlgoliaSearchHelper.prototype.isDisjunctiveRefined = function(facet, value) {
      return this.state.isDisjunctiveFacetRefined(facet, value);
    };
    AlgoliaSearchHelper.prototype.hasTag = function(tag) {
      return this.state.isTagRefined(tag);
    };
    AlgoliaSearchHelper.prototype.isTagRefined = function() {
      return this.hasTagRefinements.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.getIndex = function() {
      return this.state.index;
    };
    function getCurrentPage() {
      return this.state.page;
    }
    AlgoliaSearchHelper.prototype.getCurrentPage = getCurrentPage;
    AlgoliaSearchHelper.prototype.getPage = getCurrentPage;
    AlgoliaSearchHelper.prototype.getTags = function() {
      return this.state.tagRefinements;
    };
    AlgoliaSearchHelper.prototype.getRefinements = function(facetName) {
      var refinements = [];
      if (this.state.isConjunctiveFacet(facetName)) {
        var conjRefinements = this.state.getConjunctiveRefinements(facetName);
        conjRefinements.forEach(function(r32) {
          refinements.push({
            value: r32,
            type: "conjunctive"
          });
        });
        var excludeRefinements = this.state.getExcludeRefinements(facetName);
        excludeRefinements.forEach(function(r32) {
          refinements.push({
            value: r32,
            type: "exclude"
          });
        });
      } else if (this.state.isDisjunctiveFacet(facetName)) {
        var disjunctiveRefinements = this.state.getDisjunctiveRefinements(facetName);
        disjunctiveRefinements.forEach(function(r32) {
          refinements.push({
            value: r32,
            type: "disjunctive"
          });
        });
      }
      var numericRefinements = this.state.getNumericRefinements(facetName);
      Object.keys(numericRefinements).forEach(function(operator) {
        var value = numericRefinements[operator];
        refinements.push({
          value,
          operator,
          type: "numeric"
        });
      });
      return refinements;
    };
    AlgoliaSearchHelper.prototype.getNumericRefinement = function(attribute, operator) {
      return this.state.getNumericRefinement(attribute, operator);
    };
    AlgoliaSearchHelper.prototype.getHierarchicalFacetBreadcrumb = function(facetName) {
      return this.state.getHierarchicalFacetBreadcrumb(facetName);
    };
    AlgoliaSearchHelper.prototype._search = function(options) {
      var state = this.state;
      var states = [];
      var mainQueries = [];
      if (!options.onlyWithDerivedHelpers) {
        mainQueries = requestBuilder._getQueries(state.index, state);
        states.push({
          state,
          queriesCount: mainQueries.length,
          helper: this
        });
        this.emit("search", {
          state,
          results: this.lastResults
        });
      }
      var derivedQueries = this.derivedHelpers.map(function(derivedHelper) {
        var derivedState = derivedHelper.getModifiedState(state);
        var derivedStateQueries = derivedState.index ? requestBuilder._getQueries(derivedState.index, derivedState) : [];
        states.push({
          state: derivedState,
          queriesCount: derivedStateQueries.length,
          helper: derivedHelper
        });
        derivedHelper.emit("search", {
          state: derivedState,
          results: derivedHelper.lastResults
        });
        return derivedStateQueries;
      });
      var queries = Array.prototype.concat.apply(mainQueries, derivedQueries);
      var queryId = this._queryId++;
      this._currentNbQueries++;
      if (!queries.length) {
        return Promise.resolve({ results: [] }).then(
          this._dispatchAlgoliaResponse.bind(this, states, queryId)
        );
      }
      try {
        this.client.search(queries).then(this._dispatchAlgoliaResponse.bind(this, states, queryId)).catch(this._dispatchAlgoliaError.bind(this, queryId));
      } catch (error) {
        this.emit("error", {
          error
        });
      }
      return void 0;
    };
    AlgoliaSearchHelper.prototype._recommend = function() {
      var searchState = this.state;
      var recommendState = this.recommendState;
      var index3 = this.getIndex();
      var states = [{ state: recommendState, index: index3, helper: this }];
      var ids = recommendState.params.map(function(param) {
        return param.$$id;
      });
      this.emit("fetch", {
        recommend: {
          state: recommendState,
          results: this.lastRecommendResults
        }
      });
      var cache = this._recommendCache;
      var derivedQueries = this.derivedHelpers.map(function(derivedHelper) {
        var derivedIndex = derivedHelper.getModifiedState(searchState).index;
        if (!derivedIndex) {
          return [];
        }
        var derivedState = derivedHelper.getModifiedRecommendState(
          new RecommendParameters()
        );
        states.push({
          state: derivedState,
          index: derivedIndex,
          helper: derivedHelper
        });
        ids = Array.prototype.concat.apply(
          ids,
          derivedState.params.map(function(param) {
            return param.$$id;
          })
        );
        derivedHelper.emit("fetch", {
          recommend: {
            state: derivedState,
            results: derivedHelper.lastRecommendResults
          }
        });
        return derivedState._buildQueries(derivedIndex, cache);
      });
      var queries = Array.prototype.concat.apply(
        this.recommendState._buildQueries(index3, cache),
        derivedQueries
      );
      if (queries.length === 0) {
        return;
      }
      if (queries.length > 0 && typeof this.client.getRecommendations === "undefined") {
        console.warn(
          "Please update algoliasearch/lite to the latest version in order to use recommend widgets."
        );
        return;
      }
      var queryId = this._recommendQueryId++;
      this._currentNbRecommendQueries++;
      try {
        this.client.getRecommendations(queries).then(this._dispatchRecommendResponse.bind(this, queryId, states, ids)).catch(this._dispatchRecommendError.bind(this, queryId));
      } catch (error) {
        this.emit("error", {
          error
        });
      }
      return;
    };
    AlgoliaSearchHelper.prototype._dispatchAlgoliaResponse = function(states, queryId, content) {
      var self = this;
      if (queryId < this._lastQueryIdReceived) {
        return;
      }
      this._currentNbQueries -= queryId - this._lastQueryIdReceived;
      this._lastQueryIdReceived = queryId;
      if (this._currentNbQueries === 0)
        this.emit("searchQueueEmpty");
      var results = content.results.slice();
      states.forEach(function(s30) {
        var state = s30.state;
        var queriesCount = s30.queriesCount;
        var helper = s30.helper;
        var specificResults = results.splice(0, queriesCount);
        if (!state.index) {
          helper.emit("result", {
            results: null,
            state
          });
          return;
        }
        helper.lastResults = new SearchResults(
          state,
          specificResults,
          self._searchResultsOptions
        );
        helper.emit("result", {
          results: helper.lastResults,
          state
        });
      });
    };
    AlgoliaSearchHelper.prototype._dispatchRecommendResponse = function(queryId, states, ids, content) {
      if (queryId < this._lastRecommendQueryIdReceived) {
        return;
      }
      this._currentNbRecommendQueries -= queryId - this._lastRecommendQueryIdReceived;
      this._lastRecommendQueryIdReceived = queryId;
      if (this._currentNbRecommendQueries === 0)
        this.emit("recommendQueueEmpty");
      var cache = this._recommendCache;
      var idsMap = {};
      ids.filter(function(id2) {
        return cache[id2] === void 0;
      }).forEach(function(id2, index3) {
        if (!idsMap[id2])
          idsMap[id2] = [];
        idsMap[id2].push(index3);
      });
      Object.keys(idsMap).forEach(function(id2) {
        var indices = idsMap[id2];
        var firstResult = content.results[indices[0]];
        if (indices.length === 1) {
          cache[id2] = firstResult;
          return;
        }
        cache[id2] = Object.assign({}, firstResult, {
          hits: sortAndMergeRecommendations(
            indices.map(function(idx) {
              return content.results[idx].hits;
            })
          )
        });
      });
      var results = {};
      ids.forEach(function(id2) {
        results[id2] = cache[id2];
      });
      states.forEach(function(s30) {
        var state = s30.state;
        var helper = s30.helper;
        if (!s30.index) {
          helper.emit("recommend:result", {
            results: null,
            state
          });
          return;
        }
        helper.lastRecommendResults = new RecommendResults(state, results);
        helper.emit("recommend:result", {
          recommend: {
            results: helper.lastRecommendResults,
            state
          }
        });
      });
    };
    AlgoliaSearchHelper.prototype._dispatchAlgoliaError = function(queryId, error) {
      if (queryId < this._lastQueryIdReceived) {
        return;
      }
      this._currentNbQueries -= queryId - this._lastQueryIdReceived;
      this._lastQueryIdReceived = queryId;
      this.emit("error", {
        error
      });
      if (this._currentNbQueries === 0)
        this.emit("searchQueueEmpty");
    };
    AlgoliaSearchHelper.prototype._dispatchRecommendError = function(queryId, error) {
      if (queryId < this._lastRecommendQueryIdReceived) {
        return;
      }
      this._currentNbRecommendQueries -= queryId - this._lastRecommendQueryIdReceived;
      this._lastRecommendQueryIdReceived = queryId;
      this.emit("error", {
        error
      });
      if (this._currentNbRecommendQueries === 0)
        this.emit("recommendQueueEmpty");
    };
    AlgoliaSearchHelper.prototype.containsRefinement = function(query, facetFilters, numericFilters, tagFilters) {
      return query || facetFilters.length !== 0 || numericFilters.length !== 0 || tagFilters.length !== 0;
    };
    AlgoliaSearchHelper.prototype._hasDisjunctiveRefinements = function(facet) {
      return this.state.disjunctiveRefinements[facet] && this.state.disjunctiveRefinements[facet].length > 0;
    };
    AlgoliaSearchHelper.prototype._change = function(event) {
      var state = event.state;
      var isPageReset = event.isPageReset;
      if (state !== this.state) {
        this.state = state;
        this.emit("change", {
          state: this.state,
          results: this.lastResults,
          isPageReset
        });
      }
    };
    AlgoliaSearchHelper.prototype._recommendChange = function(event) {
      var state = event.state;
      if (state !== this.recommendState) {
        this.recommendState = state;
        this.emit("recommend:change", {
          search: {
            results: this.lastResults,
            state: this.state
          },
          recommend: {
            results: this.lastRecommendResults,
            state: this.recommendState
          }
        });
      }
    };
    AlgoliaSearchHelper.prototype.clearCache = function() {
      if (this.client.clearCache)
        this.client.clearCache();
      return this;
    };
    AlgoliaSearchHelper.prototype.setClient = function(newClient) {
      if (this.client === newClient)
        return this;
      if (typeof newClient.addAlgoliaAgent === "function") {
        newClient.addAlgoliaAgent("JS Helper (" + version2 + ")");
      }
      this.client = newClient;
      return this;
    };
    AlgoliaSearchHelper.prototype.getClient = function() {
      return this.client;
    };
    AlgoliaSearchHelper.prototype.derive = function(fn, recommendFn) {
      var derivedHelper = new DerivedHelper(this, fn, recommendFn);
      this.derivedHelpers.push(derivedHelper);
      return derivedHelper;
    };
    AlgoliaSearchHelper.prototype.detachDerivedHelper = function(derivedHelper) {
      var pos = this.derivedHelpers.indexOf(derivedHelper);
      if (pos === -1)
        throw new Error("Derived helper already detached");
      this.derivedHelpers.splice(pos, 1);
    };
    AlgoliaSearchHelper.prototype.hasPendingRequests = function() {
      return this._currentNbQueries > 0;
    };
    module.exports = AlgoliaSearchHelper;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/index.js
var require_algoliasearch_helper2 = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/algoliasearch-helper/index.js"(exports, module) {
    "use strict";
    var AlgoliaSearchHelper = require_algoliasearch_helper();
    var RecommendParameters = require_RecommendParameters();
    var RecommendResults = require_RecommendResults();
    var SearchParameters = require_SearchParameters();
    var SearchResults = require_SearchResults();
    function algoliasearchHelper5(client, index3, opts, searchResultsOptions) {
      return new AlgoliaSearchHelper(client, index3, opts, searchResultsOptions);
    }
    algoliasearchHelper5.version = require_version();
    algoliasearchHelper5.AlgoliaSearchHelper = AlgoliaSearchHelper;
    algoliasearchHelper5.SearchParameters = SearchParameters;
    algoliasearchHelper5.RecommendParameters = RecommendParameters;
    algoliasearchHelper5.SearchResults = SearchResults;
    algoliasearchHelper5.RecommendResults = RecommendResults;
    module.exports = algoliasearchHelper5;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/qs/lib/formats.js"(exports, module) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/qs/lib/utils.js"(exports, module) {
    "use strict";
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array = [];
      for (var i32 = 0; i32 < 256; ++i32) {
        array.push("%" + ((i32 < 16 ? "0" : "") + i32.toString(16)).toUpperCase());
      }
      return array;
    }();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item2 = queue.pop();
        var obj = item2.obj[item2.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j3 = 0; j3 < obj.length; ++j3) {
            if (typeof obj[j3] !== "undefined") {
              compacted.push(obj[j3]);
            }
          }
          item2.obj[item2.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var i32 = 0; i32 < source.length; ++i32) {
        if (typeof source[i32] !== "undefined") {
          obj[i32] = source[i32];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item2, i32) {
          if (has.call(target, i32)) {
            var targetItem = target[i32];
            if (targetItem && typeof targetItem === "object" && item2 && typeof item2 === "object") {
              target[i32] = merge2(targetItem, item2, options);
            } else {
              target.push(item2);
            }
          } else {
            target[i32] = item2;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key2) {
        var value = source[key2];
        if (has.call(acc, key2)) {
          acc[key2] = merge2(acc[key2], value, options);
        } else {
          acc[key2] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key2) {
        acc[key2] = source[key2];
        return acc;
      }, target);
    };
    var decode = function(str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e34) {
        return strWithoutPlus;
      }
    };
    var encode = function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var i32 = 0; i32 < string.length; ++i32) {
        var c23 = string.charCodeAt(i32);
        if (c23 === 45 || c23 === 46 || c23 === 95 || c23 === 126 || c23 >= 48 && c23 <= 57 || c23 >= 65 && c23 <= 90 || c23 >= 97 && c23 <= 122 || format === formats.RFC1738 && (c23 === 40 || c23 === 41)) {
          out += string.charAt(i32);
          continue;
        }
        if (c23 < 128) {
          out = out + hexTable[c23];
          continue;
        }
        if (c23 < 2048) {
          out = out + (hexTable[192 | c23 >> 6] + hexTable[128 | c23 & 63]);
          continue;
        }
        if (c23 < 55296 || c23 >= 57344) {
          out = out + (hexTable[224 | c23 >> 12] + hexTable[128 | c23 >> 6 & 63] + hexTable[128 | c23 & 63]);
          continue;
        }
        i32 += 1;
        c23 = 65536 + ((c23 & 1023) << 10 | string.charCodeAt(i32) & 1023);
        out += hexTable[240 | c23 >> 18] + hexTable[128 | c23 >> 12 & 63] + hexTable[128 | c23 >> 6 & 63] + hexTable[128 | c23 & 63];
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i32 = 0; i32 < queue.length; ++i32) {
        var item2 = queue[i32];
        var obj = item2.obj[item2.prop];
        var keys2 = Object.keys(obj);
        for (var j3 = 0; j3 < keys2.length; ++j3) {
          var key2 = keys2[j3];
          var val = obj[key2];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key2 });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a30, b3) {
      return [].concat(a30, b3);
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i32 = 0; i32 < val.length; i32 += 1) {
          mapped.push(fn(val[i32]));
        }
        return mapped;
      }
      return fn(val);
    };
    module.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isRegExp,
      maybeMap,
      merge
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/qs/lib/stringify.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key2) {
        return prefix + "[" + key2 + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var split = String.prototype.split;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v7) {
      return typeof v7 === "string" || typeof v7 === "number" || typeof v7 === "boolean" || typeof v7 === "symbol" || typeof v7 === "bigint";
    };
    var stringify = function stringify2(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset) {
      var obj = object;
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          if (generateArrayPrefix === "comma" && encodeValuesOnly) {
            var valuesArray = split.call(String(obj), ",");
            var valuesJoined = "";
            for (var i32 = 0; i32 < valuesArray.length; ++i32) {
              valuesJoined += (i32 === 0 ? "" : ",") + formatter(encoder(valuesArray[i32], defaults.encoder, charset, "value", format));
            }
            return [formatter(keyValue) + "=" + valuesJoined];
          }
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys2 = Object.keys(obj);
        objKeys = sort ? keys2.sort(sort) : keys2;
      }
      for (var j3 = 0; j3 < objKeys.length; ++j3) {
        var key2 = objKeys[j3];
        var value = typeof key2 === "object" && typeof key2.value !== "undefined" ? key2.value : obj[key2];
        if (skipNulls && value === null) {
          continue;
        }
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(prefix, key2) : prefix : prefix + (allowDots ? "." + key2 : "[" + key2 + "]");
        pushToArray(values, stringify2(
          value,
          keyPrefix,
          generateArrayPrefix,
          strictNullHandling,
          skipNulls,
          encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset
        ));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module.exports = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys2 = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && "indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = "indices";
      }
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      for (var i32 = 0; i32 < objKeys.length; ++i32) {
        var key2 = objKeys[i32];
        if (options.skipNulls && obj[key2] === null) {
          continue;
        }
        pushToArray(keys2, stringify(
          obj[key2],
          key2,
          generateArrayPrefix,
          options.strictNullHandling,
          options.skipNulls,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset
        ));
      }
      var joined = keys2.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/qs/lib/parse.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1;
      var i32;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i32 = 0; i32 < parts.length; ++i32) {
          if (parts[i32].indexOf("utf8=") === 0) {
            if (parts[i32] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i32] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i32;
            i32 = parts.length;
          }
        }
      }
      for (i32 = 0; i32 < parts.length; ++i32) {
        if (i32 === skipIndex) {
          continue;
        }
        var part = parts[i32];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key2, val;
        if (pos === -1) {
          key2 = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key2 = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(
            parseArrayValue(part.slice(pos + 1), options),
            function(encodedVal) {
              return options.decoder(encodedVal, defaults.decoder, charset, "value");
            }
          );
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (has.call(obj, key2)) {
          obj[key2] = utils.combine(obj[key2], val);
        } else {
          obj[key2] = val;
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);
      for (var i32 = chain.length - 1; i32 >= 0; --i32) {
        var obj;
        var root = chain[i32];
        if (root === "[]" && options.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var index3 = parseInt(cleanRoot, 10);
          if (!options.parseArrays && cleanRoot === "") {
            obj = { 0: leaf };
          } else if (!isNaN(index3) && root !== cleanRoot && String(index3) === cleanRoot && index3 >= 0 && (options.parseArrays && index3 <= options.arrayLimit)) {
            obj = [];
            obj[index3] = leaf;
          } else if (cleanRoot !== "__proto__") {
            obj[cleanRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key2 = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key2);
      var parent = segment ? key2.slice(0, segment.index) : key2;
      var keys2 = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys2.push(parent);
      }
      var i32 = 0;
      while (options.depth > 0 && (segment = child.exec(key2)) !== null && i32 < options.depth) {
        i32 += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys2.push(segment[1]);
      }
      if (segment) {
        keys2.push("[" + key2.slice(segment.index) + "]");
      }
      return parseObject(keys2, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      return {
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var keys2 = Object.keys(tempObj);
      for (var i32 = 0; i32 < keys2.length; ++i32) {
        var key2 = keys2[i32];
        var newObj = parseKeys(key2, tempObj[key2], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      return utils.compact(obj);
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/qs/lib/index.js"(exports, module) {
    "use strict";
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/hogan.js/lib/compiler.js
var require_compiler = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/hogan.js/lib/compiler.js"(exports) {
    (function(Hogan2) {
      var rIsWhitespace = /\S/, rQuot = /\"/g, rNewline = /\n/g, rCr = /\r/g, rSlash = /\\/g, rLineSep = /\u2028/, rParagraphSep = /\u2029/;
      Hogan2.tags = {
        "#": 1,
        "^": 2,
        "<": 3,
        "$": 4,
        "/": 5,
        "!": 6,
        ">": 7,
        "=": 8,
        "_v": 9,
        "{": 10,
        "&": 11,
        "_t": 12
      };
      Hogan2.scan = function scan(text, delimiters) {
        var len = text.length, IN_TEXT = 0, IN_TAG_TYPE = 1, IN_TAG = 2, state = IN_TEXT, tagType = null, tag = null, buf = "", tokens = [], seenTag = false, i32 = 0, lineStart = 0, otag = "{{", ctag = "}}";
        function addBuf() {
          if (buf.length > 0) {
            tokens.push({ tag: "_t", text: new String(buf) });
            buf = "";
          }
        }
        function lineIsWhitespace() {
          var isAllWhitespace = true;
          for (var j3 = lineStart; j3 < tokens.length; j3++) {
            isAllWhitespace = Hogan2.tags[tokens[j3].tag] < Hogan2.tags["_v"] || tokens[j3].tag == "_t" && tokens[j3].text.match(rIsWhitespace) === null;
            if (!isAllWhitespace) {
              return false;
            }
          }
          return isAllWhitespace;
        }
        function filterLine(haveSeenTag, noNewLine) {
          addBuf();
          if (haveSeenTag && lineIsWhitespace()) {
            for (var j3 = lineStart, next; j3 < tokens.length; j3++) {
              if (tokens[j3].text) {
                if ((next = tokens[j3 + 1]) && next.tag == ">") {
                  next.indent = tokens[j3].text.toString();
                }
                tokens.splice(j3, 1);
              }
            }
          } else if (!noNewLine) {
            tokens.push({ tag: "\n" });
          }
          seenTag = false;
          lineStart = tokens.length;
        }
        function changeDelimiters(text2, index3) {
          var close = "=" + ctag, closeIndex = text2.indexOf(close, index3), delimiters2 = trim(
            text2.substring(text2.indexOf("=", index3) + 1, closeIndex)
          ).split(" ");
          otag = delimiters2[0];
          ctag = delimiters2[delimiters2.length - 1];
          return closeIndex + close.length - 1;
        }
        if (delimiters) {
          delimiters = delimiters.split(" ");
          otag = delimiters[0];
          ctag = delimiters[1];
        }
        for (i32 = 0; i32 < len; i32++) {
          if (state == IN_TEXT) {
            if (tagChange(otag, text, i32)) {
              --i32;
              addBuf();
              state = IN_TAG_TYPE;
            } else {
              if (text.charAt(i32) == "\n") {
                filterLine(seenTag);
              } else {
                buf += text.charAt(i32);
              }
            }
          } else if (state == IN_TAG_TYPE) {
            i32 += otag.length - 1;
            tag = Hogan2.tags[text.charAt(i32 + 1)];
            tagType = tag ? text.charAt(i32 + 1) : "_v";
            if (tagType == "=") {
              i32 = changeDelimiters(text, i32);
              state = IN_TEXT;
            } else {
              if (tag) {
                i32++;
              }
              state = IN_TAG;
            }
            seenTag = i32;
          } else {
            if (tagChange(ctag, text, i32)) {
              tokens.push({
                tag: tagType,
                n: trim(buf),
                otag,
                ctag,
                i: tagType == "/" ? seenTag - otag.length : i32 + ctag.length
              });
              buf = "";
              i32 += ctag.length - 1;
              state = IN_TEXT;
              if (tagType == "{") {
                if (ctag == "}}") {
                  i32++;
                } else {
                  cleanTripleStache(tokens[tokens.length - 1]);
                }
              }
            } else {
              buf += text.charAt(i32);
            }
          }
        }
        filterLine(seenTag, true);
        return tokens;
      };
      function cleanTripleStache(token) {
        if (token.n.substr(token.n.length - 1) === "}") {
          token.n = token.n.substring(0, token.n.length - 1);
        }
      }
      function trim(s30) {
        if (s30.trim) {
          return s30.trim();
        }
        return s30.replace(/^\s*|\s*$/g, "");
      }
      function tagChange(tag, text, index3) {
        if (text.charAt(index3) != tag.charAt(0)) {
          return false;
        }
        for (var i32 = 1, l27 = tag.length; i32 < l27; i32++) {
          if (text.charAt(index3 + i32) != tag.charAt(i32)) {
            return false;
          }
        }
        return true;
      }
      var allowedInSuper = { "_t": true, "\n": true, "$": true, "/": true };
      function buildTree(tokens, kind, stack, customTags) {
        var instructions = [], opener = null, tail = null, token = null;
        tail = stack[stack.length - 1];
        while (tokens.length > 0) {
          token = tokens.shift();
          if (tail && tail.tag == "<" && !(token.tag in allowedInSuper)) {
            throw new Error("Illegal content in < super tag.");
          }
          if (Hogan2.tags[token.tag] <= Hogan2.tags["$"] || isOpener(token, customTags)) {
            stack.push(token);
            token.nodes = buildTree(tokens, token.tag, stack, customTags);
          } else if (token.tag == "/") {
            if (stack.length === 0) {
              throw new Error("Closing tag without opener: /" + token.n);
            }
            opener = stack.pop();
            if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
              throw new Error("Nesting error: " + opener.n + " vs. " + token.n);
            }
            opener.end = token.i;
            return instructions;
          } else if (token.tag == "\n") {
            token.last = tokens.length == 0 || tokens[0].tag == "\n";
          }
          instructions.push(token);
        }
        if (stack.length > 0) {
          throw new Error("missing closing tag: " + stack.pop().n);
        }
        return instructions;
      }
      function isOpener(token, tags) {
        for (var i32 = 0, l27 = tags.length; i32 < l27; i32++) {
          if (tags[i32].o == token.n) {
            token.tag = "#";
            return true;
          }
        }
      }
      function isCloser(close, open, tags) {
        for (var i32 = 0, l27 = tags.length; i32 < l27; i32++) {
          if (tags[i32].c == close && tags[i32].o == open) {
            return true;
          }
        }
      }
      function stringifySubstitutions(obj) {
        var items = [];
        for (var key2 in obj) {
          items.push('"' + esc(key2) + '": function(c,p,t,i) {' + obj[key2] + "}");
        }
        return "{ " + items.join(",") + " }";
      }
      function stringifyPartials(codeObj) {
        var partials = [];
        for (var key2 in codeObj.partials) {
          partials.push('"' + esc(key2) + '":{name:"' + esc(codeObj.partials[key2].name) + '", ' + stringifyPartials(codeObj.partials[key2]) + "}");
        }
        return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
      }
      Hogan2.stringify = function(codeObj, text, options) {
        return "{code: function (c,p,i) { " + Hogan2.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) + "}";
      };
      var serialNo = 0;
      Hogan2.generate = function(tree, text, options) {
        serialNo = 0;
        var context = { code: "", subs: {}, partials: {} };
        Hogan2.walk(tree, context);
        if (options.asString) {
          return this.stringify(context, text, options);
        }
        return this.makeTemplate(context, text, options);
      };
      Hogan2.wrapMain = function(code) {
        return 'var t=this;t.b(i=i||"");' + code + "return t.fl();";
      };
      Hogan2.template = Hogan2.Template;
      Hogan2.makeTemplate = function(codeObj, text, options) {
        var template = this.makePartials(codeObj);
        template.code = new Function("c", "p", "i", this.wrapMain(codeObj.code));
        return new this.template(template, text, this, options);
      };
      Hogan2.makePartials = function(codeObj) {
        var key2, template = { subs: {}, partials: codeObj.partials, name: codeObj.name };
        for (key2 in template.partials) {
          template.partials[key2] = this.makePartials(template.partials[key2]);
        }
        for (key2 in codeObj.subs) {
          template.subs[key2] = new Function("c", "p", "t", "i", codeObj.subs[key2]);
        }
        return template;
      };
      function esc(s30) {
        return s30.replace(rSlash, "\\\\").replace(rQuot, '\\"').replace(rNewline, "\\n").replace(rCr, "\\r").replace(rLineSep, "\\u2028").replace(rParagraphSep, "\\u2029");
      }
      function chooseMethod(s30) {
        return ~s30.indexOf(".") ? "d" : "f";
      }
      function createPartial(node, context) {
        var prefix = "<" + (context.prefix || "");
        var sym = prefix + node.n + serialNo++;
        context.partials[sym] = { name: node.n, partials: {} };
        context.code += 't.b(t.rp("' + esc(sym) + '",c,p,"' + (node.indent || "") + '"));';
        return sym;
      }
      Hogan2.codegen = {
        "#": function(node, context) {
          context.code += "if(t.s(t." + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,0,' + node.i + "," + node.end + ',"' + node.otag + " " + node.ctag + '")){t.rs(c,p,function(c,p,t){';
          Hogan2.walk(node.nodes, context);
          context.code += "});c.pop();}";
        },
        "^": function(node, context) {
          context.code += "if(!t.s(t." + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
          Hogan2.walk(node.nodes, context);
          context.code += "};";
        },
        ">": createPartial,
        "<": function(node, context) {
          var ctx = { partials: {}, code: "", subs: {}, inPartial: true };
          Hogan2.walk(node.nodes, ctx);
          var template = context.partials[createPartial(node, context)];
          template.subs = ctx.subs;
          template.partials = ctx.partials;
        },
        "$": function(node, context) {
          var ctx = { subs: {}, code: "", partials: context.partials, prefix: node.n };
          Hogan2.walk(node.nodes, ctx);
          context.subs[node.n] = ctx.code;
          if (!context.inPartial) {
            context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
          }
        },
        "\n": function(node, context) {
          context.code += write('"\\n"' + (node.last ? "" : " + i"));
        },
        "_v": function(node, context) {
          context.code += "t.b(t.v(t." + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
        },
        "_t": function(node, context) {
          context.code += write('"' + esc(node.text) + '"');
        },
        "{": tripleStache,
        "&": tripleStache
      };
      function tripleStache(node, context) {
        context.code += "t.b(t.t(t." + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
      }
      function write(s30) {
        return "t.b(" + s30 + ");";
      }
      Hogan2.walk = function(nodelist, context) {
        var func;
        for (var i32 = 0, l27 = nodelist.length; i32 < l27; i32++) {
          func = Hogan2.codegen[nodelist[i32].tag];
          func && func(nodelist[i32], context);
        }
        return context;
      };
      Hogan2.parse = function(tokens, text, options) {
        options = options || {};
        return buildTree(tokens, "", [], options.sectionTags || []);
      };
      Hogan2.cache = {};
      Hogan2.cacheKey = function(text, options) {
        return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join("||");
      };
      Hogan2.compile = function(text, options) {
        options = options || {};
        var key2 = Hogan2.cacheKey(text, options);
        var template = this.cache[key2];
        if (template) {
          var partials = template.partials;
          for (var name in partials) {
            delete partials[name].instance;
          }
          return template;
        }
        template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
        return this.cache[key2] = template;
      };
    })(typeof exports !== "undefined" ? exports : Hogan);
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/hogan.js/lib/template.js
var require_template = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/hogan.js/lib/template.js"(exports) {
    var Hogan2 = {};
    (function(Hogan3) {
      Hogan3.Template = function(codeObj, text, compiler, options) {
        codeObj = codeObj || {};
        this.r = codeObj.code || this.r;
        this.c = compiler;
        this.options = options || {};
        this.text = text || "";
        this.partials = codeObj.partials || {};
        this.subs = codeObj.subs || {};
        this.buf = "";
      };
      Hogan3.Template.prototype = {
        // render: replaced by generated code.
        r: function(context, partials, indent) {
          return "";
        },
        // variable escaping
        v: hoganEscape,
        // triple stache
        t: coerceToString,
        render: function render(context, partials, indent) {
          return this.ri([context], partials || {}, indent);
        },
        // render internal -- a hook for overrides that catches partials too
        ri: function(context, partials, indent) {
          return this.r(context, partials, indent);
        },
        // ensurePartial
        ep: function(symbol, partials) {
          var partial = this.partials[symbol];
          var template = partials[partial.name];
          if (partial.instance && partial.base == template) {
            return partial.instance;
          }
          if (typeof template == "string") {
            if (!this.c) {
              throw new Error("No compiler available.");
            }
            template = this.c.compile(template, this.options);
          }
          if (!template) {
            return null;
          }
          this.partials[symbol].base = template;
          if (partial.subs) {
            if (!partials.stackText)
              partials.stackText = {};
            for (key in partial.subs) {
              if (!partials.stackText[key]) {
                partials.stackText[key] = this.activeSub !== void 0 && partials.stackText[this.activeSub] ? partials.stackText[this.activeSub] : this.text;
              }
            }
            template = createSpecializedPartial(
              template,
              partial.subs,
              partial.partials,
              this.stackSubs,
              this.stackPartials,
              partials.stackText
            );
          }
          this.partials[symbol].instance = template;
          return template;
        },
        // tries to find a partial in the current scope and render it
        rp: function(symbol, context, partials, indent) {
          var partial = this.ep(symbol, partials);
          if (!partial) {
            return "";
          }
          return partial.ri(context, partials, indent);
        },
        // render a section
        rs: function(context, partials, section) {
          var tail = context[context.length - 1];
          if (!isArray(tail)) {
            section(context, partials, this);
            return;
          }
          for (var i32 = 0; i32 < tail.length; i32++) {
            context.push(tail[i32]);
            section(context, partials, this);
            context.pop();
          }
        },
        // maybe start a section
        s: function(val, ctx, partials, inverted, start, end, tags) {
          var pass;
          if (isArray(val) && val.length === 0) {
            return false;
          }
          if (typeof val == "function") {
            val = this.ms(val, ctx, partials, inverted, start, end, tags);
          }
          pass = !!val;
          if (!inverted && pass && ctx) {
            ctx.push(typeof val == "object" ? val : ctx[ctx.length - 1]);
          }
          return pass;
        },
        // find values with dotted names
        d: function(key2, ctx, partials, returnFound) {
          var found, names = key2.split("."), val = this.f(names[0], ctx, partials, returnFound), doModelGet = this.options.modelGet, cx2 = null;
          if (key2 === "." && isArray(ctx[ctx.length - 2])) {
            val = ctx[ctx.length - 1];
          } else {
            for (var i32 = 1; i32 < names.length; i32++) {
              found = findInScope(names[i32], val, doModelGet);
              if (found !== void 0) {
                cx2 = val;
                val = found;
              } else {
                val = "";
              }
            }
          }
          if (returnFound && !val) {
            return false;
          }
          if (!returnFound && typeof val == "function") {
            ctx.push(cx2);
            val = this.mv(val, ctx, partials);
            ctx.pop();
          }
          return val;
        },
        // find values with normal names
        f: function(key2, ctx, partials, returnFound) {
          var val = false, v7 = null, found = false, doModelGet = this.options.modelGet;
          for (var i32 = ctx.length - 1; i32 >= 0; i32--) {
            v7 = ctx[i32];
            val = findInScope(key2, v7, doModelGet);
            if (val !== void 0) {
              found = true;
              break;
            }
          }
          if (!found) {
            return returnFound ? false : "";
          }
          if (!returnFound && typeof val == "function") {
            val = this.mv(val, ctx, partials);
          }
          return val;
        },
        // higher order templates
        ls: function(func, cx2, partials, text, tags) {
          var oldTags = this.options.delimiters;
          this.options.delimiters = tags;
          this.b(this.ct(coerceToString(func.call(cx2, text)), cx2, partials));
          this.options.delimiters = oldTags;
          return false;
        },
        // compile text
        ct: function(text, cx2, partials) {
          if (this.options.disableLambda) {
            throw new Error("Lambda features disabled.");
          }
          return this.c.compile(text, this.options).render(cx2, partials);
        },
        // template result buffering
        b: function(s30) {
          this.buf += s30;
        },
        fl: function() {
          var r32 = this.buf;
          this.buf = "";
          return r32;
        },
        // method replace section
        ms: function(func, ctx, partials, inverted, start, end, tags) {
          var textSource, cx2 = ctx[ctx.length - 1], result = func.call(cx2);
          if (typeof result == "function") {
            if (inverted) {
              return true;
            } else {
              textSource = this.activeSub && this.subsText && this.subsText[this.activeSub] ? this.subsText[this.activeSub] : this.text;
              return this.ls(result, cx2, partials, textSource.substring(start, end), tags);
            }
          }
          return result;
        },
        // method replace variable
        mv: function(func, ctx, partials) {
          var cx2 = ctx[ctx.length - 1];
          var result = func.call(cx2);
          if (typeof result == "function") {
            return this.ct(coerceToString(result.call(cx2)), cx2, partials);
          }
          return result;
        },
        sub: function(name, context, partials, indent) {
          var f15 = this.subs[name];
          if (f15) {
            this.activeSub = name;
            f15(context, partials, this, indent);
            this.activeSub = false;
          }
        }
      };
      function findInScope(key2, scope, doModelGet) {
        var val;
        if (scope && typeof scope == "object") {
          if (scope[key2] !== void 0) {
            val = scope[key2];
          } else if (doModelGet && scope.get && typeof scope.get == "function") {
            val = scope.get(key2);
          }
        }
        return val;
      }
      function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
        function PartialTemplate() {
        }
        ;
        PartialTemplate.prototype = instance;
        function Substitutions() {
        }
        ;
        Substitutions.prototype = instance.subs;
        var key2;
        var partial = new PartialTemplate();
        partial.subs = new Substitutions();
        partial.subsText = {};
        partial.buf = "";
        stackSubs = stackSubs || {};
        partial.stackSubs = stackSubs;
        partial.subsText = stackText;
        for (key2 in subs) {
          if (!stackSubs[key2])
            stackSubs[key2] = subs[key2];
        }
        for (key2 in stackSubs) {
          partial.subs[key2] = stackSubs[key2];
        }
        stackPartials = stackPartials || {};
        partial.stackPartials = stackPartials;
        for (key2 in partials) {
          if (!stackPartials[key2])
            stackPartials[key2] = partials[key2];
        }
        for (key2 in stackPartials) {
          partial.partials[key2] = stackPartials[key2];
        }
        return partial;
      }
      var rAmp = /&/g, rLt = /</g, rGt = />/g, rApos = /\'/g, rQuot = /\"/g, hChars = /[&<>\"\']/;
      function coerceToString(val) {
        return String(val === null || val === void 0 ? "" : val);
      }
      function hoganEscape(str) {
        str = coerceToString(str);
        return hChars.test(str) ? str.replace(rAmp, "&amp;").replace(rLt, "&lt;").replace(rGt, "&gt;").replace(rApos, "&#39;").replace(rQuot, "&quot;") : str;
      }
      var isArray = Array.isArray || function(a30) {
        return Object.prototype.toString.call(a30) === "[object Array]";
      };
    })(typeof exports !== "undefined" ? exports : Hogan2);
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/hogan.js/lib/hogan.js
var require_hogan = __commonJS({
  "../../../FILE/HBuilderProjects/newsDemo1/node_modules/hogan.js/lib/hogan.js"(exports, module) {
    var Hogan2 = require_compiler();
    Hogan2.Template = require_template().Template;
    Hogan2.template = Hogan2.Template;
    module.exports = Hogan2;
  }
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/util/suit.js
function suit_default(r32, e34, o26) {
  if (!r32)
    throw new Error("You need to provide `widgetName` in your data");
  var t37 = ["ais-" + r32];
  return e34 && t37.push("-" + e34), o26 && t37.push("--" + o26), t37.join("");
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/mixins/suit.js
var t = function(t37) {
  var a30 = t37.name;
  return { props: { classNames: { type: Object, default: void 0 } }, methods: { suit: function(t38, e34) {
    var r32 = suit_default(a30, t38, e34), i32 = this.classNames && this.classNames[r32];
    return i32 ? [r32, i32].join(" ") : r32;
  } } };
};

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/util/polyfills.js
function e(e34) {
  for (var r32 = arguments, n32 = 1; n32 < arguments.length; n32++) {
    var o26 = null != r32[n32] ? r32[n32] : {}, c23 = Object.keys(o26);
    "function" == typeof Object.getOwnPropertySymbols && (c23 = c23.concat(Object.getOwnPropertySymbols(o26).filter(function(e35) {
      return Object.getOwnPropertyDescriptor(o26, e35).enumerable;
    }))), c23.forEach(function(r33) {
      t2(e34, r33, o26[r33]);
    });
  }
  return e34;
}
function t2(e34, t37, r32) {
  return t37 in e34 ? Object.defineProperty(e34, t37, { value: r32, enumerable: true, configurable: true, writable: true }) : e34[t37] = r32, e34;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/util/vue-compat/index-vue3.js
import { h as e2 } from "vue";
import * as t3 from "vue";
import { createApp, createSSRApp, h, nextTick, version } from "vue";
var o = false;
var r = true;
function n(t37) {
  function o26(t38, o27) {
    for (var r32 = [], n32 = arguments.length - 2; n32-- > 0; )
      r32[n32] = arguments[n32 + 2];
    var s30 = r32.length > 0 ? r32 : void 0;
    if ("object" == typeof o27 && (o27.attrs || o27.props || o27.scopedSlots || o27.on)) {
      var u26 = Object.keys(o27.on || {}), c23 = Object.assign({}, o27, o27.attrs, o27.props, u26.reduce(function(e34, t39) {
        return e34["on" + t39[0].toUpperCase() + t39.slice(1)] = o27.on[t39], e34;
      }, {}));
      return delete c23.attrs, delete c23.props, delete c23.scopedSlots, u26.forEach(function(e34) {
        return delete c23.on[e34];
      }), c23.on && 0 === Object.keys(c23.on).length && delete c23.on, e2(t38, c23, o27.scopedSlots ? Object.assign({ default: function() {
        return s30;
      } }, o27.scopedSlots) : s30);
    }
    return e2(t38, o27, s30);
  }
  return function() {
    return t37.call(this, o26);
  };
}
function s(e34) {
  var t37 = e34.$slots || e34.slots;
  return "function" == typeof t37.default ? t37.default() : t37.default;
}
function u(e34, t37) {
  return (e34.$slots || e34.slots || {})[t37];
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/util/warn.js
var n2 = /* @__PURE__ */ new Set();
function a(a30) {
  n2.has(a30) || (n2.add(a30), console.warn(a30));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/mixins/widget.js
var n3 = function(n32, i32) {
  var s30;
  void 0 === n32 && (n32 = {});
  var a30 = n32.connector;
  return void 0 === i32 && (i32 = {}), (s30 = { inject: { instantSearchInstance: { from: "$_ais_instantSearchInstance", default: function() {
    var t37 = this.$options._componentTag;
    throw new TypeError('It looks like you forgot to wrap your Algolia search component "<' + t37 + '>" inside of an "<ais-instant-search>" component.');
  } }, getParentIndex: { from: "$_ais_getParentIndex", default: function() {
    var t37 = this;
    return function() {
      return t37.instantSearchInstance.mainIndex;
    };
  } } }, data: function() {
    return { state: null };
  }, created: function() {
    if ("function" == typeof a30) {
      if (this.factory = a30(this.updateState, function() {
      }), this.widget = e(this.factory(this.widgetParams), i32), this.getParentIndex().addWidgets([this.widget]), this.instantSearchInstance._initialResults && !this.instantSearchInstance.started) {
        if ("function" != typeof this.instantSearchInstance.__forceRender)
          throw new Error("You are using server side rendering with <ais-instant-search> instead of <ais-instant-search-ssr>.");
        this.instantSearchInstance.__forceRender(this.widget, this.getParentIndex());
      }
    } else
      true !== a30 && a("You are using the InstantSearch widget mixin, but didn't provide a connector.\nWhile this is technically possible, and will give you access to the Helper,\nit's not the recommended way of making custom components.\n\nIf you want to disable this message, pass { connector: true } to the mixin.\n\nRead more on using connectors: https://alg.li/vue-custom");
  } }).beforeUnmount = function() {
    this.widget && this.getParentIndex().removeWidgets([this.widget]);
  }, s30.watch = { widgetParams: { handler: function(e34) {
    this.state = null, this.getParentIndex().removeWidgets([this.widget]), this.widget = e(this.factory(e34), i32), this.getParentIndex().addWidgets([this.widget]);
  }, deep: true } }, s30.methods = { updateState: function(t37, e34) {
    void 0 === t37 && (t37 = {}), e34 || (this.state = t37);
  } }, s30;
};

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/addWidgetId.js
var id = 0;
function addWidgetId(widget) {
  if (widget.dependsOn !== "recommend") {
    return;
  }
  widget.$$id = id++;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/capitalize.js
function capitalize(text) {
  return text.toString().charAt(0).toUpperCase() + text.toString().slice(1);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/noop.js
function noop() {
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/logger.js
var deprecate = function deprecate2(fn, message) {
  return fn;
};
var warn = noop;
var _warning = noop;
if (true) {
  warn = function warn2(message) {
    console.warn("[InstantSearch.js]: ".concat(message.trim()));
  };
  deprecate = function deprecate3(fn, message) {
    var hasAlreadyPrinted = false;
    return function() {
      if (!hasAlreadyPrinted) {
        hasAlreadyPrinted = true;
        true ? warn(message) : void 0;
      }
      return fn.apply(void 0, arguments);
    };
  };
  _warning = function warning(condition, message) {
    if (condition) {
      return;
    }
    var hasAlreadyPrinted = _warning.cache[message];
    if (!hasAlreadyPrinted) {
      _warning.cache[message] = true;
      true ? warn(message) : void 0;
    }
  };
  _warning.cache = {};
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/typedObject.js
var keys = Object.keys;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/checkIndexUiState.js
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _slicedToArray(arr, i32) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i32) || _unsupportedIterableToArray(arr, i32) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray(o26, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _iterableToArrayLimit(arr, i32) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i32) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i32); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function getWidgetNames(connectorName) {
  switch (connectorName) {
    case "range":
      return [];
    case "menu":
      return ["menu", "menuSelect"];
    default:
      return [connectorName];
  }
}
var stateToWidgetsMap = {
  query: {
    connectors: ["connectSearchBox"],
    widgets: ["ais.searchBox", "ais.autocomplete", "ais.voiceSearch"]
  },
  refinementList: {
    connectors: ["connectRefinementList"],
    widgets: ["ais.refinementList"]
  },
  menu: {
    connectors: ["connectMenu"],
    widgets: ["ais.menu"]
  },
  hierarchicalMenu: {
    connectors: ["connectHierarchicalMenu"],
    widgets: ["ais.hierarchicalMenu"]
  },
  numericMenu: {
    connectors: ["connectNumericMenu"],
    widgets: ["ais.numericMenu"]
  },
  ratingMenu: {
    connectors: ["connectRatingMenu"],
    widgets: ["ais.ratingMenu"]
  },
  range: {
    connectors: ["connectRange"],
    widgets: ["ais.rangeInput", "ais.rangeSlider", "ais.range"]
  },
  toggle: {
    connectors: ["connectToggleRefinement"],
    widgets: ["ais.toggleRefinement"]
  },
  geoSearch: {
    connectors: ["connectGeoSearch"],
    widgets: ["ais.geoSearch"]
  },
  sortBy: {
    connectors: ["connectSortBy"],
    widgets: ["ais.sortBy"]
  },
  page: {
    connectors: ["connectPagination"],
    widgets: ["ais.pagination", "ais.infiniteHits"]
  },
  hitsPerPage: {
    connectors: ["connectHitsPerPage"],
    widgets: ["ais.hitsPerPage"]
  },
  configure: {
    connectors: ["connectConfigure"],
    widgets: ["ais.configure"]
  },
  places: {
    connectors: [],
    widgets: ["ais.places"]
  }
};
function checkIndexUiState(_ref7) {
  var index3 = _ref7.index, indexUiState = _ref7.indexUiState;
  var mountedWidgets = index3.getWidgets().map(function(widget) {
    return widget.$$type;
  }).filter(Boolean);
  var missingWidgets = keys(indexUiState).reduce(function(acc, parameter) {
    var widgetUiState = stateToWidgetsMap[parameter];
    if (!widgetUiState) {
      return acc;
    }
    var requiredWidgets = widgetUiState.widgets;
    if (requiredWidgets && !requiredWidgets.some(function(requiredWidget) {
      return mountedWidgets.includes(requiredWidget);
    })) {
      acc.push([parameter, {
        connectors: widgetUiState.connectors,
        widgets: widgetUiState.widgets.map(function(widgetIdentifier) {
          return widgetIdentifier.split("ais.")[1];
        })
      }]);
    }
    return acc;
  }, []);
  true ? _warning(missingWidgets.length === 0, 'The UI state for the index "'.concat(index3.getIndexId(), '" is not consistent with the widgets mounted.\n\nThis can happen when the UI state is specified via `initialUiState`, `routing` or `setUiState` but that the widgets responsible for this state were not added. This results in those query parameters not being sent to the API.\n\nTo fully reflect the state, some widgets need to be added to the index "').concat(index3.getIndexId(), '":\n\n').concat(missingWidgets.map(function(_ref23) {
    var _ref44;
    var _ref33 = _slicedToArray(_ref23, 2), stateParameter = _ref33[0], widgets = _ref33[1].widgets;
    return "- `".concat(stateParameter, "` needs one of these widgets: ").concat((_ref44 = []).concat.apply(_ref44, _toConsumableArray(widgets.map(function(name) {
      return getWidgetNames(name);
    }))).map(function(name) {
      return '"'.concat(name, '"');
    }).join(", "));
  }).join("\n"), '\n\nIf you do not wish to display widgets but still want to support their search parameters, you can mount "virtual widgets" that don\'t render anything:\n\n```\n').concat(missingWidgets.filter(function(_ref52) {
    var _ref63 = _slicedToArray(_ref52, 2), _stateParameter = _ref63[0], connectors = _ref63[1].connectors;
    return connectors.length > 0;
  }).map(function(_ref72) {
    var _ref8 = _slicedToArray(_ref72, 2), _stateParameter = _ref8[0], _ref8$ = _ref8[1], connectors = _ref8$.connectors, widgets = _ref8$.widgets;
    var capitalizedWidget = capitalize(widgets[0]);
    var connectorName = connectors[0];
    return "const virtual".concat(capitalizedWidget, " = ").concat(connectorName, "(() => null);");
  }).join("\n"), "\n\nsearch.addWidgets([\n  ").concat(missingWidgets.filter(function(_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2), _stateParameter = _ref10[0], connectors = _ref10[1].connectors;
    return connectors.length > 0;
  }).map(function(_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2), _stateParameter = _ref12[0], widgets = _ref12[1].widgets;
    var capitalizedWidget = capitalize(widgets[0]);
    return "virtual".concat(capitalizedWidget, "({ /* ... */ })");
  }).join(",\n  "), "\n]);\n```\n\nIf you're using custom widgets that do set these query parameters, we recommend using connectors instead.\n\nSee https://www.algolia.com/doc/guides/building-search-ui/widgets/customize-an-existing-widget/js/#customize-the-complete-ui-of-the-widgets")) : void 0;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/getObjectType.js
function getObjectType(object) {
  return Object.prototype.toString.call(object).slice(8, -1);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/checkRendering.js
function checkRendering(rendering, usage) {
  if (rendering === void 0 || typeof rendering !== "function") {
    throw new Error("The render function is not valid (received type ".concat(getObjectType(rendering), ").\n\n").concat(usage));
  }
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/clearRefinements.js
function clearRefinements(_ref7) {
  var helper = _ref7.helper, _ref$attributesToClea = _ref7.attributesToClear, attributesToClear = _ref$attributesToClea === void 0 ? [] : _ref$attributesToClea;
  var finalState = helper.state.setPage(0);
  finalState = attributesToClear.reduce(function(state, attribute) {
    if (finalState.isNumericRefined(attribute)) {
      return state.removeNumericRefinement(attribute);
    }
    if (finalState.isHierarchicalFacet(attribute)) {
      return state.removeHierarchicalFacetRefinement(attribute);
    }
    if (finalState.isDisjunctiveFacet(attribute)) {
      return state.removeDisjunctiveFacetRefinement(attribute);
    }
    if (finalState.isConjunctiveFacet(attribute)) {
      return state.removeFacetRefinement(attribute);
    }
    return state;
  }, finalState);
  if (attributesToClear.indexOf("query") !== -1) {
    finalState = finalState.setQuery("");
  }
  return finalState;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/escape-html.js
var htmlEntities = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var regexUnescapedHtml = /[&<>"']/g;
var regexHasUnescapedHtml = RegExp(regexUnescapedHtml.source);
function escape2(value) {
  return value && regexHasUnescapedHtml.test(value) ? value.replace(regexUnescapedHtml, function(character) {
    return htmlEntities[character];
  }) : value;
}
var htmlCharacters = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
};
var regexEscapedHtml = /&(amp|quot|lt|gt|#39);/g;
var regexHasEscapedHtml = RegExp(regexEscapedHtml.source);
function unescape2(value) {
  return value && regexHasEscapedHtml.test(value) ? value.replace(regexEscapedHtml, function(character) {
    return htmlCharacters[character];
  }) : value;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/isPlainObject.js
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function getTag(value) {
  if (value === null) {
    return value === void 0 ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}
function isObjectLike(value) {
  return _typeof(value) === "object" && value !== null;
}
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  var proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/escape-highlight.js
function _typeof2(obj) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof2(obj);
}
function _objectDestructuringEmpty(obj) {
  if (obj == null)
    throw new TypeError("Cannot destructure " + obj);
}
function _extends2() {
  _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
function ownKeys(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys(Object(source), true).forEach(function(key2) {
      _defineProperty2(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty2(obj, key2, value) {
  key2 = _toPropertyKey(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key2 = _toPrimitive(arg, "string");
  return _typeof2(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive(input, hint) {
  if (_typeof2(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof2(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var TAG_PLACEHOLDER = {
  highlightPreTag: "__ais-highlight__",
  highlightPostTag: "__/ais-highlight__"
};
var TAG_REPLACEMENT = {
  highlightPreTag: "<mark>",
  highlightPostTag: "</mark>"
};
function replaceTagsAndEscape(value) {
  return escape2(value).replace(new RegExp(TAG_PLACEHOLDER.highlightPreTag, "g"), TAG_REPLACEMENT.highlightPreTag).replace(new RegExp(TAG_PLACEHOLDER.highlightPostTag, "g"), TAG_REPLACEMENT.highlightPostTag);
}
function recursiveEscape(input) {
  if (isPlainObject(input) && typeof input.value !== "string") {
    return Object.keys(input).reduce(function(acc, key2) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty2({}, key2, recursiveEscape(input[key2])));
    }, {});
  }
  if (Array.isArray(input)) {
    return input.map(recursiveEscape);
  }
  return _objectSpread(_objectSpread({}, input), {}, {
    value: replaceTagsAndEscape(input.value)
  });
}
function escapeHits(hits) {
  if (hits.__escaped === void 0) {
    hits = hits.map(function(_ref7) {
      var hit = _extends2({}, (_objectDestructuringEmpty(_ref7), _ref7));
      if (hit._highlightResult) {
        hit._highlightResult = recursiveEscape(hit._highlightResult);
      }
      if (hit._snippetResult) {
        hit._snippetResult = recursiveEscape(hit._snippetResult);
      }
      return hit;
    });
    hits.__escaped = true;
  }
  return hits;
}
function escapeFacets(facetHits) {
  return facetHits.map(function(h13) {
    return _objectSpread(_objectSpread({}, h13), {}, {
      highlighted: replaceTagsAndEscape(h13.highlighted)
    });
  });
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/concatHighlightedParts.js
function concatHighlightedParts(parts) {
  var highlightPreTag = TAG_REPLACEMENT.highlightPreTag, highlightPostTag = TAG_REPLACEMENT.highlightPostTag;
  return parts.map(function(part) {
    return part.isHighlighted ? highlightPreTag + part.value + highlightPostTag : part.value;
  }).join("");
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/createConcurrentSafePromise.js
function createConcurrentSafePromise() {
  var basePromiseId = -1;
  var latestResolvedId = -1;
  var latestResolvedValue = void 0;
  return function runConcurrentSafePromise(promise) {
    var currentPromiseId = ++basePromiseId;
    return Promise.resolve(promise).then(function(x3) {
      if (latestResolvedValue && currentPromiseId < latestResolvedId) {
        return latestResolvedValue;
      }
      latestResolvedId = currentPromiseId;
      latestResolvedValue = x3;
      return x3;
    });
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/isFacetRefined.js
function isFacetRefined(helper, facet, value) {
  if (helper.state.isHierarchicalFacet(facet)) {
    return helper.state.isHierarchicalFacetRefined(facet, value);
  } else if (helper.state.isConjunctiveFacet(facet)) {
    return helper.state.isFacetRefined(facet, value);
  } else {
    return helper.state.isDisjunctiveFacetRefined(facet, value);
  }
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/createSendEventForFacet.js
function ownKeys2(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread2(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys2(Object(source), true).forEach(function(key2) {
      _defineProperty3(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty3(obj, key2, value) {
  key2 = _toPropertyKey2(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey2(arg) {
  var key2 = _toPrimitive2(arg, "string");
  return _typeof3(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive2(input, hint) {
  if (_typeof3(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof3(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _typeof3(obj) {
  "@babel/helpers - typeof";
  return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof3(obj);
}
function _slicedToArray2(arr, i32) {
  return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i32) || _unsupportedIterableToArray2(arr, i32) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray2(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray2(o26, minLen);
}
function _arrayLikeToArray2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _iterableToArrayLimit2(arr, i32) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i32) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i32); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles2(arr) {
  if (Array.isArray(arr))
    return arr;
}
function createSendEventForFacet(_ref7) {
  var instantSearchInstance = _ref7.instantSearchInstance, helper = _ref7.helper, attr = _ref7.attribute, widgetType = _ref7.widgetType;
  var sendEventForFacet = function sendEventForFacet2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var facetValue = args[1], _args$ = args[2], eventName = _args$ === void 0 ? "Filter Applied" : _args$, _args$2 = args[3], additionalData = _args$2 === void 0 ? {} : _args$2;
    var _args$0$split = args[0].split(":"), _args$0$split2 = _slicedToArray2(_args$0$split, 2), eventType = _args$0$split2[0], eventModifier = _args$0$split2[1];
    var attribute = typeof attr === "string" ? attr : attr(facetValue);
    if (args.length === 1 && _typeof3(args[0]) === "object") {
      instantSearchInstance.sendEventToInsights(args[0]);
    } else if (eventType === "click" && args.length >= 2 && args.length <= 4) {
      if (!isFacetRefined(helper, attribute, facetValue)) {
        instantSearchInstance.sendEventToInsights({
          insightsMethod: "clickedFilters",
          widgetType,
          eventType,
          eventModifier,
          payload: _objectSpread2({
            eventName,
            index: helper.getIndex(),
            filters: ["".concat(attribute, ":").concat(facetValue)]
          }, additionalData),
          attribute
        });
      }
    } else if (true) {
      throw new Error("You need to pass between two and four arguments like:\n  sendEvent('click', facetValue, eventName?, additionalData?);\n\nIf you want to send a custom payload, you can pass one object: sendEvent(customPayload);\n");
    }
  };
  return sendEventForFacet;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/serializer.js
function serializePayload(payload) {
  return btoa(encodeURIComponent(JSON.stringify(payload)));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/createSendEventForHits.js
function ownKeys3(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread3(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys3(Object(source), true).forEach(function(key2) {
      _defineProperty4(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys3(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty4(obj, key2, value) {
  key2 = _toPropertyKey3(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey3(arg) {
  var key2 = _toPrimitive3(arg, "string");
  return _typeof4(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive3(input, hint) {
  if (_typeof4(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof4(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray3(arr, i32) {
  return _arrayWithHoles3(arr) || _iterableToArrayLimit3(arr, i32) || _unsupportedIterableToArray3(arr, i32) || _nonIterableRest3();
}
function _nonIterableRest3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray3(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray3(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray3(o26, minLen);
}
function _arrayLikeToArray3(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _iterableToArrayLimit3(arr, i32) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i32) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i32); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles3(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _typeof4(obj) {
  "@babel/helpers - typeof";
  return _typeof4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof4(obj);
}
function chunk(arr) {
  var chunkSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 20;
  var chunks = [];
  for (var i32 = 0; i32 < Math.ceil(arr.length / chunkSize); i32++) {
    chunks.push(arr.slice(i32 * chunkSize, (i32 + 1) * chunkSize));
  }
  return chunks;
}
function _buildEventPayloadsForHits(_ref7) {
  var getIndex = _ref7.getIndex, widgetType = _ref7.widgetType, methodName = _ref7.methodName, args = _ref7.args, instantSearchInstance = _ref7.instantSearchInstance;
  if (args.length === 1 && _typeof4(args[0]) === "object") {
    return [args[0]];
  }
  var _args$0$split = args[0].split(":"), _args$0$split2 = _slicedToArray3(_args$0$split, 2), eventType = _args$0$split2[0], eventModifier = _args$0$split2[1];
  var hits = args[1];
  var eventName = args[2];
  var additionalData = args[3] || {};
  if (!hits) {
    if (true) {
      throw new Error("You need to pass hit or hits as the second argument like:\n  ".concat(methodName, "(eventType, hit);\n  "));
    } else {
      return [];
    }
  }
  if ((eventType === "click" || eventType === "conversion") && !eventName) {
    if (true) {
      throw new Error("You need to pass eventName as the third argument for 'click' or 'conversion' events like:\n  ".concat(methodName, "('click', hit, 'Product Purchased');\n\n  To learn more about event naming: https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/in-depth/clicks-conversions-best-practices/\n  "));
    } else {
      return [];
    }
  }
  var hitsArray = Array.isArray(hits) ? hits : [hits];
  if (hitsArray.length === 0) {
    return [];
  }
  var queryID = hitsArray[0].__queryID;
  var hitsChunks = chunk(hitsArray);
  var objectIDsByChunk = hitsChunks.map(function(batch) {
    return batch.map(function(hit) {
      return hit.objectID;
    });
  });
  var positionsByChunk = hitsChunks.map(function(batch) {
    return batch.map(function(hit) {
      return hit.__position;
    });
  });
  if (eventType === "view") {
    if (instantSearchInstance.status !== "idle") {
      return [];
    }
    return hitsChunks.map(function(batch, i32) {
      return {
        insightsMethod: "viewedObjectIDs",
        widgetType,
        eventType,
        payload: _objectSpread3({
          eventName: eventName || "Hits Viewed",
          index: getIndex(),
          objectIDs: objectIDsByChunk[i32]
        }, additionalData),
        hits: batch,
        eventModifier
      };
    });
  } else if (eventType === "click") {
    return hitsChunks.map(function(batch, i32) {
      return {
        insightsMethod: "clickedObjectIDsAfterSearch",
        widgetType,
        eventType,
        payload: _objectSpread3({
          eventName: eventName || "Hit Clicked",
          index: getIndex(),
          queryID,
          objectIDs: objectIDsByChunk[i32],
          positions: positionsByChunk[i32]
        }, additionalData),
        hits: batch,
        eventModifier
      };
    });
  } else if (eventType === "conversion") {
    return hitsChunks.map(function(batch, i32) {
      return {
        insightsMethod: "convertedObjectIDsAfterSearch",
        widgetType,
        eventType,
        payload: _objectSpread3({
          eventName: eventName || "Hit Converted",
          index: getIndex(),
          queryID,
          objectIDs: objectIDsByChunk[i32]
        }, additionalData),
        hits: batch,
        eventModifier
      };
    });
  } else if (true) {
    throw new Error('eventType("'.concat(eventType, '") is not supported.\n    If you want to send a custom payload, you can pass one object: ').concat(methodName, "(customPayload);\n    "));
  } else {
    return [];
  }
}
function createSendEventForHits(_ref23) {
  var instantSearchInstance = _ref23.instantSearchInstance, getIndex = _ref23.getIndex, widgetType = _ref23.widgetType;
  var sentEvents = {};
  var timer = void 0;
  var sendEventForHits = function sendEventForHits2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var payloads = _buildEventPayloadsForHits({
      widgetType,
      getIndex,
      methodName: "sendEvent",
      args,
      instantSearchInstance
    });
    payloads.forEach(function(payload) {
      if (payload.eventType === "click" && payload.eventModifier === "internal" && sentEvents[payload.eventType]) {
        return;
      }
      sentEvents[payload.eventType] = true;
      instantSearchInstance.sendEventToInsights(payload);
    });
    clearTimeout(timer);
    timer = setTimeout(function() {
      sentEvents = {};
    }, 0);
  };
  return sendEventForHits;
}
function createBindEventForHits(_ref33) {
  var getIndex = _ref33.getIndex, widgetType = _ref33.widgetType, instantSearchInstance = _ref33.instantSearchInstance;
  var bindEventForHits = function bindEventForHits2() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var payloads = _buildEventPayloadsForHits({
      widgetType,
      getIndex,
      methodName: "bindEvent",
      args,
      instantSearchInstance
    });
    return payloads.length ? "data-insights-event=".concat(serializePayload(payloads)) : "";
  };
  return bindEventForHits;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/isIndexWidget.js
function isIndexWidget(widget) {
  return widget.$$type === "ais.index";
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/setIndexHelperState.js
function setIndexHelperState(finalUiState, indexWidget) {
  var nextIndexUiState = finalUiState[indexWidget.getIndexId()] || {};
  if (true) {
    checkIndexUiState({
      index: indexWidget,
      indexUiState: nextIndexUiState
    });
  }
  indexWidget.getHelper().setState(indexWidget.getWidgetSearchParameters(indexWidget.getHelper().state, {
    uiState: nextIndexUiState
  }));
  indexWidget.getWidgets().filter(isIndexWidget).forEach(function(widget) {
    return setIndexHelperState(finalUiState, widget);
  });
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/debounce.js
function debounce(func, wait) {
  var lastTimeout = null;
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return new Promise(function(resolve, reject) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function() {
        lastTimeout = null;
        Promise.resolve(func.apply(void 0, args)).then(resolve).catch(reject);
      }, wait);
    });
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/defer.js
var nextMicroTask = Promise.resolve();
function defer(callback) {
  var progress = null;
  var cancelled = false;
  var fn = function fn2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (progress !== null) {
      return;
    }
    progress = nextMicroTask.then(function() {
      progress = null;
      if (cancelled) {
        cancelled = false;
        return;
      }
      callback.apply(void 0, args);
    });
  };
  fn.wait = function() {
    if (progress === null) {
      throw new Error("The deferred function should be called before calling `wait()`");
    }
    return progress;
  };
  fn.cancel = function() {
    if (progress === null) {
      return;
    }
    cancelled = true;
  };
  return fn;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/documentation.js
function createDocumentationLink(_ref7) {
  var name = _ref7.name, _ref$connector = _ref7.connector, connector = _ref$connector === void 0 ? false : _ref$connector;
  return ["https://www.algolia.com/doc/api-reference/widgets/", name, "/js/", connector ? "#connector" : ""].join("");
}
function createDocumentationMessageGenerator() {
  for (var _len = arguments.length, widgets = new Array(_len), _key = 0; _key < _len; _key++) {
    widgets[_key] = arguments[_key];
  }
  var links = widgets.map(function(widget) {
    return createDocumentationLink(widget);
  }).join(", ");
  return function(message) {
    return [message, "See documentation: ".concat(links)].filter(Boolean).join("\n\n");
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/escapeFacetValue.js
function unescapeFacetValue(value) {
  if (typeof value === "string") {
    return value.replace(/^\\-/, "-");
  }
  return value;
}
function escapeFacetValue(value) {
  if (typeof value === "number" && value < 0 || typeof value === "string") {
    return String(value).replace(/^-/, "\\-");
  }
  return value;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/find.js
function find(items, predicate) {
  var value;
  for (var i32 = 0; i32 < items.length; i32++) {
    value = items[i32];
    if (predicate(value, i32, items)) {
      return value;
    }
  }
  return void 0;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/findIndex.js
function findIndex(array, comparator) {
  if (!Array.isArray(array)) {
    return -1;
  }
  for (var i32 = 0; i32 < array.length; i32++) {
    if (comparator(array[i32])) {
      return i32;
    }
  }
  return -1;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/getAppIdAndApiKey.js
function getAppIdAndApiKey(searchClient) {
  if (searchClient.transporter) {
    var _searchClient$transpo = searchClient.transporter, headers = _searchClient$transpo.headers, queryParameters = _searchClient$transpo.queryParameters;
    var APP_ID = "x-algolia-application-id";
    var API_KEY = "x-algolia-api-key";
    var appId = headers[APP_ID] || queryParameters[APP_ID];
    var apiKey = headers[API_KEY] || queryParameters[API_KEY];
    return [appId, apiKey];
  } else {
    return [searchClient.applicationID, searchClient.apiKey];
  }
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/isDomElement.js
function isDomElement(object) {
  return object instanceof HTMLElement || Boolean(object) && object.nodeType > 0;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/getContainerNode.js
function getContainerNode(selectorOrHTMLElement) {
  var isSelectorString = typeof selectorOrHTMLElement === "string";
  var domElement = isSelectorString ? document.querySelector(selectorOrHTMLElement) : selectorOrHTMLElement;
  if (!isDomElement(domElement)) {
    var errorMessage = "Container must be `string` or `HTMLElement`.";
    if (isSelectorString) {
      errorMessage += " Unable to find ".concat(selectorOrHTMLElement);
    }
    throw new Error(errorMessage);
  }
  return domElement;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/getHighlightedParts.js
function getHighlightedParts(highlightedValue) {
  var highlightPostTag = TAG_REPLACEMENT.highlightPostTag, highlightPreTag = TAG_REPLACEMENT.highlightPreTag;
  var splitByPreTag = highlightedValue.split(highlightPreTag);
  var firstValue = splitByPreTag.shift();
  var elements = !firstValue ? [] : [{
    value: firstValue,
    isHighlighted: false
  }];
  splitByPreTag.forEach(function(split) {
    var splitByPostTag = split.split(highlightPostTag);
    elements.push({
      value: splitByPostTag[0],
      isHighlighted: true
    });
    if (splitByPostTag[1] !== "") {
      elements.push({
        value: splitByPostTag[1],
        isHighlighted: false
      });
    }
  });
  return elements;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/getHighlightFromSiblings.js
var hasAlphanumeric = new RegExp(/\w/i);
function getHighlightFromSiblings(parts, i32) {
  var _parts, _parts2;
  var current = parts[i32];
  var isNextHighlighted = ((_parts = parts[i32 + 1]) === null || _parts === void 0 ? void 0 : _parts.isHighlighted) || true;
  var isPreviousHighlighted = ((_parts2 = parts[i32 - 1]) === null || _parts2 === void 0 ? void 0 : _parts2.isHighlighted) || true;
  if (!hasAlphanumeric.test(unescape2(current.value)) && isPreviousHighlighted === isNextHighlighted) {
    return isPreviousHighlighted;
  }
  return current.isHighlighted;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/getPropertyByPath.js
function getPropertyByPath(object, path) {
  var parts = Array.isArray(path) ? path : path.split(".");
  return parts.reduce(function(current, key2) {
    return current && current[key2];
  }, object);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/getRefinements.js
function getRefinement(state, type, attribute, name) {
  var resultsFacets = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
  var res = {
    type,
    attribute,
    name,
    escapedValue: escapeFacetValue(name)
  };
  var facet = find(resultsFacets, function(resultsFacet) {
    return resultsFacet.name === attribute;
  });
  var count;
  if (type === "hierarchical") {
    var facetDeclaration = state.getHierarchicalFacetByName(attribute);
    var nameParts = name.split(facetDeclaration.separator);
    var getFacetRefinement = function getFacetRefinement2(facetData) {
      return function(refinementKey) {
        return facetData[refinementKey];
      };
    };
    var _loop = function _loop2(i33) {
      facet = facet && facet.data && find(Object.keys(facet.data).map(getFacetRefinement(facet.data)), function(refinement) {
        return refinement.name === nameParts[i33];
      });
    };
    for (var i32 = 0; facet !== void 0 && i32 < nameParts.length; ++i32) {
      _loop(i32);
    }
    count = facet && facet.count;
  } else {
    count = facet && facet.data && facet.data[res.name];
  }
  if (count !== void 0) {
    res.count = count;
  }
  if (facet && facet.exhaustive !== void 0) {
    res.exhaustive = facet.exhaustive;
  }
  return res;
}
function getRefinements(results, state) {
  var includesQuery = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var refinements = [];
  var _state$facetsRefineme = state.facetsRefinements, facetsRefinements = _state$facetsRefineme === void 0 ? {} : _state$facetsRefineme, _state$facetsExcludes = state.facetsExcludes, facetsExcludes = _state$facetsExcludes === void 0 ? {} : _state$facetsExcludes, _state$disjunctiveFac = state.disjunctiveFacetsRefinements, disjunctiveFacetsRefinements = _state$disjunctiveFac === void 0 ? {} : _state$disjunctiveFac, _state$hierarchicalFa = state.hierarchicalFacetsRefinements, hierarchicalFacetsRefinements = _state$hierarchicalFa === void 0 ? {} : _state$hierarchicalFa, _state$numericRefinem = state.numericRefinements, numericRefinements = _state$numericRefinem === void 0 ? {} : _state$numericRefinem, _state$tagRefinements = state.tagRefinements, tagRefinements = _state$tagRefinements === void 0 ? [] : _state$tagRefinements;
  Object.keys(facetsRefinements).forEach(function(attribute) {
    var refinementNames = facetsRefinements[attribute];
    refinementNames.forEach(function(refinementName) {
      refinements.push(getRefinement(state, "facet", attribute, refinementName, results.facets));
    });
  });
  Object.keys(facetsExcludes).forEach(function(attribute) {
    var refinementNames = facetsExcludes[attribute];
    refinementNames.forEach(function(refinementName) {
      refinements.push({
        type: "exclude",
        attribute,
        name: refinementName,
        exclude: true
      });
    });
  });
  Object.keys(disjunctiveFacetsRefinements).forEach(function(attribute) {
    var refinementNames = disjunctiveFacetsRefinements[attribute];
    refinementNames.forEach(function(refinementName) {
      refinements.push(getRefinement(
        state,
        "disjunctive",
        attribute,
        // We unescape any disjunctive refined values with `unescapeFacetValue` because
        // they can be escaped on negative numeric values with `escapeFacetValue`.
        unescapeFacetValue(refinementName),
        results.disjunctiveFacets
      ));
    });
  });
  Object.keys(hierarchicalFacetsRefinements).forEach(function(attribute) {
    var refinementNames = hierarchicalFacetsRefinements[attribute];
    refinementNames.forEach(function(refinement) {
      refinements.push(getRefinement(state, "hierarchical", attribute, refinement, results.hierarchicalFacets));
    });
  });
  Object.keys(numericRefinements).forEach(function(attribute) {
    var operators = numericRefinements[attribute];
    Object.keys(operators).forEach(function(operatorOriginal) {
      var operator = operatorOriginal;
      var valueOrValues = operators[operator];
      var refinementNames = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
      refinementNames.forEach(function(refinementName) {
        refinements.push({
          type: "numeric",
          attribute,
          name: "".concat(refinementName),
          numericValue: refinementName,
          operator
        });
      });
    });
  });
  tagRefinements.forEach(function(refinementName) {
    refinements.push({
      type: "tag",
      attribute: "_tags",
      name: refinementName
    });
  });
  if (includesQuery && state.query && state.query.trim()) {
    refinements.push({
      attribute: "query",
      type: "query",
      name: state.query,
      query: state.query
    });
  }
  return refinements;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/getWidgetAttribute.js
function getWidgetAttribute(widget, initOptions) {
  var _widget$getWidgetRend;
  var renderState = (_widget$getWidgetRend = widget.getWidgetRenderState) === null || _widget$getWidgetRend === void 0 ? void 0 : _widget$getWidgetRend.call(widget, initOptions);
  var attribute = null;
  if (renderState && renderState.widgetParams) {
    var widgetParams = renderState.widgetParams;
    if (widgetParams.attribute) {
      attribute = widgetParams.attribute;
    } else if (Array.isArray(widgetParams.attributes)) {
      attribute = widgetParams.attributes[0];
    }
  }
  if (typeof attribute !== "string") {
    throw new Error("Could not find the attribute of the widget:\n\n".concat(JSON.stringify(widget), "\n\nPlease check whether the widget's getWidgetRenderState returns widgetParams.attribute correctly."));
  }
  return attribute;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/hits-absolute-position.js
function _typeof5(obj) {
  "@babel/helpers - typeof";
  return _typeof5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof5(obj);
}
function ownKeys4(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread4(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys4(Object(source), true).forEach(function(key2) {
      _defineProperty5(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys4(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty5(obj, key2, value) {
  key2 = _toPropertyKey4(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey4(arg) {
  var key2 = _toPrimitive4(arg, "string");
  return _typeof5(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive4(input, hint) {
  if (_typeof5(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof5(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function addAbsolutePosition(hits, page, hitsPerPage) {
  return hits.map(function(hit, idx) {
    return _objectSpread4(_objectSpread4({}, hit), {}, {
      __position: hitsPerPage * page + idx + 1
    });
  });
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/hits-query-id.js
function _typeof6(obj) {
  "@babel/helpers - typeof";
  return _typeof6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof6(obj);
}
function ownKeys5(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread5(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys5(Object(source), true).forEach(function(key2) {
      _defineProperty6(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys5(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty6(obj, key2, value) {
  key2 = _toPropertyKey5(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey5(arg) {
  var key2 = _toPrimitive5(arg, "string");
  return _typeof6(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive5(input, hint) {
  if (_typeof6(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof6(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function addQueryID(hits, queryID) {
  if (!queryID) {
    return hits;
  }
  return hits.map(function(hit) {
    return _objectSpread5(_objectSpread5({}, hit), {}, {
      __queryID: queryID
    });
  });
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/hydrateRecommendCache.js
function _typeof7(obj) {
  "@babel/helpers - typeof";
  return _typeof7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof7(obj);
}
function ownKeys6(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread6(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys6(Object(source), true).forEach(function(key2) {
      _defineProperty7(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys6(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty7(obj, key2, value) {
  key2 = _toPropertyKey6(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey6(arg) {
  var key2 = _toPrimitive6(arg, "string");
  return _typeof7(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive6(input, hint) {
  if (_typeof7(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof7(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function hydrateRecommendCache(helper, initialResults) {
  var recommendCache = Object.keys(initialResults).reduce(function(acc, indexName) {
    var initialResult = initialResults[indexName];
    if (initialResult.recommendResults) {
      return _objectSpread6(_objectSpread6({}, acc), initialResult.recommendResults.results);
    }
    return acc;
  }, {});
  helper._recommendCache = recommendCache;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/hydrateSearchClient.js
function _typeof8(obj) {
  "@babel/helpers - typeof";
  return _typeof8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof8(obj);
}
function _slicedToArray4(arr, i32) {
  return _arrayWithHoles4(arr) || _iterableToArrayLimit4(arr, i32) || _unsupportedIterableToArray4(arr, i32) || _nonIterableRest4();
}
function _nonIterableRest4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray4(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray4(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray4(o26, minLen);
}
function _arrayLikeToArray4(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _iterableToArrayLimit4(arr, i32) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i32) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i32); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles4(arr) {
  if (Array.isArray(arr))
    return arr;
}
function ownKeys7(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread7(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys7(Object(source), true).forEach(function(key2) {
      _defineProperty8(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys7(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty8(obj, key2, value) {
  key2 = _toPropertyKey7(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey7(arg) {
  var key2 = _toPrimitive7(arg, "string");
  return _typeof8(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive7(input, hint) {
  if (_typeof8(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof8(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function hydrateSearchClient(client, results) {
  if (!results) {
    return;
  }
  if ((!("transporter" in client) || client._cacheHydrated) && (!client._useCache || typeof client.addAlgoliaAgent !== "function")) {
    return;
  }
  var cachedRequest = Object.keys(results).map(function(key2) {
    var _results$key = results[key2], state = _results$key.state, requestParams = _results$key.requestParams, serverResults = _results$key.results;
    return serverResults && state ? serverResults.map(function(result) {
      return _objectSpread7({
        indexName: state.index || result.index
      }, requestParams || result.params ? {
        params: serializeQueryParameters(requestParams || deserializeQueryParameters(result.params))
      } : {});
    }) : [];
  });
  var cachedResults = Object.keys(results).reduce(function(acc, key2) {
    var res = results[key2].results;
    if (!res) {
      return acc;
    }
    return acc.concat(res);
  }, []);
  if ("transporter" in client && !client._cacheHydrated) {
    client._cacheHydrated = true;
    var baseMethod = client.search;
    client.search = function(requests) {
      for (var _len = arguments.length, methodArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        methodArgs[_key - 1] = arguments[_key];
      }
      var requestsWithSerializedParams = requests.map(function(request) {
        return _objectSpread7(_objectSpread7({}, request), {}, {
          params: serializeQueryParameters(request.params)
        });
      });
      return client.transporter.responsesCache.get({
        method: "search",
        args: [requestsWithSerializedParams].concat(methodArgs)
      }, function() {
        return baseMethod.apply(void 0, [requests].concat(methodArgs));
      });
    };
    client.transporter.responsesCache.set({
      method: "search",
      args: cachedRequest
    }, {
      results: cachedResults
    });
  }
  if (!("transporter" in client)) {
    var cacheKey = "/1/indexes/*/queries_body_".concat(JSON.stringify({
      requests: cachedRequest
    }));
    client.cache = _objectSpread7(_objectSpread7({}, client.cache), {}, _defineProperty8({}, cacheKey, JSON.stringify({
      results: Object.keys(results).map(function(key2) {
        return results[key2].results;
      })
    })));
  }
}
function deserializeQueryParameters(parameters) {
  return parameters.split("&").reduce(function(acc, parameter) {
    var _parameter$split = parameter.split("="), _parameter$split2 = _slicedToArray4(_parameter$split, 2), key2 = _parameter$split2[0], value = _parameter$split2[1];
    acc[key2] = value ? decodeURIComponent(value) : "";
    return acc;
  }, {});
}
function serializeQueryParameters(parameters) {
  var isObjectOrArray = function isObjectOrArray2(value) {
    return Object.prototype.toString.call(value) === "[object Object]" || Object.prototype.toString.call(value) === "[object Array]";
  };
  var encode = function encode2(format) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    var i32 = 0;
    return format.replace(/%s/g, function() {
      return encodeURIComponent(args[i32++]);
    });
  };
  return Object.keys(parameters).map(function(key2) {
    return encode("%s=%s", key2, isObjectOrArray(parameters[key2]) ? JSON.stringify(parameters[key2]) : parameters[key2]);
  }).join("&");
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/isEqual.js
function isPrimitive(obj) {
  return obj !== Object(obj);
}
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (isPrimitive(first) || isPrimitive(second) || typeof first === "function" || typeof second === "function") {
    return first === second;
  }
  if (Object.keys(first).length !== Object.keys(second).length) {
    return false;
  }
  for (var _i = 0, _Object$keys = Object.keys(first); _i < _Object$keys.length; _i++) {
    var key2 = _Object$keys[_i];
    if (!(key2 in second)) {
      return false;
    }
    if (!isEqual(first[key2], second[key2])) {
      return false;
    }
  }
  return true;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/isFiniteNumber.js
function isFiniteNumber(value) {
  return typeof value === "number" && isFinite(value);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/isSpecialClick.js
function isSpecialClick(event) {
  var isMiddleClick = event.button === 1;
  return isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/walkIndex.js
function walkIndex(indexWidget, callback) {
  callback(indexWidget);
  indexWidget.getWidgets().forEach(function(widget) {
    if (isIndexWidget(widget)) {
      walkIndex(widget, callback);
    }
  });
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/uniq.js
function uniq(array) {
  return array.filter(function(value, index3, self) {
    return self.indexOf(value) === index3;
  });
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/mergeSearchParameters.js
function _typeof9(obj) {
  "@babel/helpers - typeof";
  return _typeof9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof9(obj);
}
var _excluded = ["facets", "disjunctiveFacets", "facetsRefinements", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacets", "hierarchicalFacetsRefinements", "ruleContexts"];
function ownKeys8(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread8(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys8(Object(source), true).forEach(function(key2) {
      _defineProperty9(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys8(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty9(obj, key2, value) {
  key2 = _toPropertyKey8(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey8(arg) {
  var key2 = _toPrimitive8(arg, "string");
  return _typeof9(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive8(input, hint) {
  if (_typeof9(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof9(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
var mergeWithRest = function mergeWithRest2(left, right) {
  var facets = right.facets, disjunctiveFacets = right.disjunctiveFacets, facetsRefinements = right.facetsRefinements, facetsExcludes = right.facetsExcludes, disjunctiveFacetsRefinements = right.disjunctiveFacetsRefinements, numericRefinements = right.numericRefinements, tagRefinements = right.tagRefinements, hierarchicalFacets = right.hierarchicalFacets, hierarchicalFacetsRefinements = right.hierarchicalFacetsRefinements, ruleContexts = right.ruleContexts, rest = _objectWithoutProperties(right, _excluded);
  return left.setQueryParameters(rest);
};
var mergeFacets = function mergeFacets2(left, right) {
  return right.facets.reduce(function(_2, name) {
    return _2.addFacet(name);
  }, left);
};
var mergeDisjunctiveFacets = function mergeDisjunctiveFacets2(left, right) {
  return right.disjunctiveFacets.reduce(function(_2, name) {
    return _2.addDisjunctiveFacet(name);
  }, left);
};
var mergeHierarchicalFacets = function mergeHierarchicalFacets2(left, right) {
  return left.setQueryParameters({
    hierarchicalFacets: right.hierarchicalFacets.reduce(function(facets, facet) {
      var index3 = findIndex(facets, function(_2) {
        return _2.name === facet.name;
      });
      if (index3 === -1) {
        return facets.concat(facet);
      }
      var nextFacets = facets.slice();
      nextFacets.splice(index3, 1, facet);
      return nextFacets;
    }, left.hierarchicalFacets)
  });
};
var mergeTagRefinements = function mergeTagRefinements2(left, right) {
  return right.tagRefinements.reduce(function(_2, value) {
    return _2.addTagRefinement(value);
  }, left);
};
var mergeFacetRefinements = function mergeFacetRefinements2(left, right) {
  return left.setQueryParameters({
    facetsRefinements: _objectSpread8(_objectSpread8({}, left.facetsRefinements), right.facetsRefinements)
  });
};
var mergeFacetsExcludes = function mergeFacetsExcludes2(left, right) {
  return left.setQueryParameters({
    facetsExcludes: _objectSpread8(_objectSpread8({}, left.facetsExcludes), right.facetsExcludes)
  });
};
var mergeDisjunctiveFacetsRefinements = function mergeDisjunctiveFacetsRefinements2(left, right) {
  return left.setQueryParameters({
    disjunctiveFacetsRefinements: _objectSpread8(_objectSpread8({}, left.disjunctiveFacetsRefinements), right.disjunctiveFacetsRefinements)
  });
};
var mergeNumericRefinements = function mergeNumericRefinements2(left, right) {
  return left.setQueryParameters({
    numericRefinements: _objectSpread8(_objectSpread8({}, left.numericRefinements), right.numericRefinements)
  });
};
var mergeHierarchicalFacetsRefinements = function mergeHierarchicalFacetsRefinements2(left, right) {
  return left.setQueryParameters({
    hierarchicalFacetsRefinements: _objectSpread8(_objectSpread8({}, left.hierarchicalFacetsRefinements), right.hierarchicalFacetsRefinements)
  });
};
var mergeRuleContexts = function mergeRuleContexts2(left, right) {
  var ruleContexts = uniq([].concat(left.ruleContexts).concat(right.ruleContexts).filter(Boolean));
  if (ruleContexts.length > 0) {
    return left.setQueryParameters({
      ruleContexts
    });
  }
  return left;
};
var mergeSearchParameters = function mergeSearchParameters2() {
  for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
    parameters[_key] = arguments[_key];
  }
  return parameters.reduce(function(left, right) {
    var hierarchicalFacetsRefinementsMerged = mergeHierarchicalFacetsRefinements(left, right);
    var hierarchicalFacetsMerged = mergeHierarchicalFacets(hierarchicalFacetsRefinementsMerged, right);
    var tagRefinementsMerged = mergeTagRefinements(hierarchicalFacetsMerged, right);
    var numericRefinementsMerged = mergeNumericRefinements(tagRefinementsMerged, right);
    var disjunctiveFacetsRefinementsMerged = mergeDisjunctiveFacetsRefinements(numericRefinementsMerged, right);
    var facetsExcludesMerged = mergeFacetsExcludes(disjunctiveFacetsRefinementsMerged, right);
    var facetRefinementsMerged = mergeFacetRefinements(facetsExcludesMerged, right);
    var disjunctiveFacetsMerged = mergeDisjunctiveFacets(facetRefinementsMerged, right);
    var ruleContextsMerged = mergeRuleContexts(disjunctiveFacetsMerged, right);
    var facetsMerged = mergeFacets(ruleContextsMerged, right);
    return mergeWithRest(facetsMerged, right);
  });
};

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/range.js
function _toConsumableArray2(arr) {
  return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray5(arr) || _nonIterableSpread2();
}
function _nonIterableSpread2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray5(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray5(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray5(o26, minLen);
}
function _iterableToArray2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles2(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray5(arr);
}
function _arrayLikeToArray5(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function range(_ref7) {
  var _ref$start = _ref7.start, start = _ref$start === void 0 ? 0 : _ref$start, end = _ref7.end, _ref$step = _ref7.step, step = _ref$step === void 0 ? 1 : _ref$step;
  var limitStep = step === 0 ? 1 : step;
  var arrayLength = Math.round((end - start) / limitStep);
  return _toConsumableArray2(Array(arrayLength)).map(function(_2, current) {
    return start + current * limitStep;
  });
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/render-args.js
function createInitArgs(instantSearchInstance, parent, uiState) {
  var helper = parent.getHelper();
  return {
    uiState,
    helper,
    parent,
    instantSearchInstance,
    state: helper.state,
    renderState: instantSearchInstance.renderState,
    templatesConfig: instantSearchInstance.templatesConfig,
    createURL: parent.createURL,
    scopedResults: [],
    searchMetadata: {
      isSearchStalled: instantSearchInstance.status === "stalled"
    },
    status: instantSearchInstance.status,
    error: instantSearchInstance.error
  };
}
function createRenderArgs(instantSearchInstance, parent, widget) {
  var results = parent.getResultsForWidget(widget);
  var helper = parent.getHelper();
  return {
    helper,
    parent,
    instantSearchInstance,
    results,
    scopedResults: parent.getScopedResults(),
    state: results && "_state" in results ? results._state : helper.state,
    renderState: instantSearchInstance.renderState,
    templatesConfig: instantSearchInstance.templatesConfig,
    createURL: parent.createURL,
    searchMetadata: {
      isSearchStalled: instantSearchInstance.status === "stalled"
    },
    status: instantSearchInstance.status,
    error: instantSearchInstance.error
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/resolveSearchParameters.js
function resolveSearchParameters(current) {
  var parent = current.getParent();
  var states = [current.getHelper().state];
  while (parent !== null) {
    states = [parent.getHelper().state].concat(states);
    parent = parent.getParent();
  }
  return states;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/reverseHighlightedParts.js
function _typeof10(obj) {
  "@babel/helpers - typeof";
  return _typeof10 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof10(obj);
}
function ownKeys9(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread9(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys9(Object(source), true).forEach(function(key2) {
      _defineProperty10(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys9(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty10(obj, key2, value) {
  key2 = _toPropertyKey9(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey9(arg) {
  var key2 = _toPrimitive9(arg, "string");
  return _typeof10(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive9(input, hint) {
  if (_typeof10(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof10(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function reverseHighlightedParts(parts) {
  if (!parts.some(function(part) {
    return part.isHighlighted;
  })) {
    return parts.map(function(part) {
      return _objectSpread9(_objectSpread9({}, part), {}, {
        isHighlighted: false
      });
    });
  }
  return parts.map(function(part, i32) {
    return _objectSpread9(_objectSpread9({}, part), {}, {
      isHighlighted: !getHighlightFromSiblings(parts, i32)
    });
  });
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/safelyRunOnBrowser.js
function safelyRunOnBrowser(callback) {
  var _ref7 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    fallback: function fallback2() {
      return void 0;
    }
  }, fallback = _ref7.fallback;
  if (typeof window === "undefined") {
    return fallback();
  }
  return callback({
    window
  });
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/utils/toArray.js
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/answers/connectAnswers.js
function _typeof11(obj) {
  "@babel/helpers - typeof";
  return _typeof11 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof11(obj);
}
function ownKeys10(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread10(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys10(Object(source), true).forEach(function(key2) {
      _defineProperty11(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys10(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty11(obj, key2, value) {
  key2 = _toPropertyKey10(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey10(arg) {
  var key2 = _toPrimitive10(arg, "string");
  return _typeof11(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive10(input, hint) {
  if (_typeof11(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof11(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function hasFindAnswersMethod(answersIndex) {
  return typeof answersIndex.findAnswers === "function";
}
var withUsage = createDocumentationMessageGenerator({
  name: "answers",
  connector: true
});
var connectAnswers = function connectAnswers2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function(widgetParams) {
    var _ref7 = widgetParams || {}, queryLanguages = _ref7.queryLanguages, attributesForPrediction = _ref7.attributesForPrediction, _ref$nbHits = _ref7.nbHits, nbHits = _ref$nbHits === void 0 ? 1 : _ref$nbHits, _ref$renderDebounceTi = _ref7.renderDebounceTime, renderDebounceTime = _ref$renderDebounceTi === void 0 ? 100 : _ref$renderDebounceTi, _ref$searchDebounceTi = _ref7.searchDebounceTime, searchDebounceTime = _ref$searchDebounceTi === void 0 ? 100 : _ref$searchDebounceTi, _ref$escapeHTML = _ref7.escapeHTML, escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML, _ref$extraParameters = _ref7.extraParameters, extraParameters = _ref$extraParameters === void 0 ? {} : _ref$extraParameters;
    if (!queryLanguages || queryLanguages.length === 0) {
      throw new Error(withUsage("The `queryLanguages` expects an array of strings."));
    }
    var runConcurrentSafePromise = createConcurrentSafePromise();
    var lastHits = [];
    var isLoading = false;
    var debouncedRender = debounce(renderFn, renderDebounceTime);
    var debouncedRefine;
    return {
      $$type: "ais.answers",
      init: function init(initOptions) {
        var state = initOptions.state, instantSearchInstance = initOptions.instantSearchInstance;
        var answersIndex = instantSearchInstance.client.initIndex(state.index);
        if (!hasFindAnswersMethod(answersIndex)) {
          throw new Error(withUsage("`algoliasearch` >= 4.8.0 required."));
        }
        debouncedRefine = debounce(answersIndex.findAnswers, searchDebounceTime);
        renderFn(_objectSpread10(_objectSpread10({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var _this = this;
        var query = renderOptions.state.query;
        if (!query) {
          lastHits = [];
          isLoading = false;
          renderFn(_objectSpread10(_objectSpread10({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
          return;
        }
        lastHits = [];
        isLoading = true;
        renderFn(_objectSpread10(_objectSpread10({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
        runConcurrentSafePromise(debouncedRefine(query, queryLanguages, _objectSpread10(_objectSpread10({}, extraParameters), {}, {
          nbHits,
          attributesForPrediction
        }))).then(function(result) {
          if (!result) {
            return;
          }
          if (escapeHTML && result.hits.length > 0) {
            result.hits = escapeHits(result.hits);
          }
          var hitsWithAbsolutePosition = addAbsolutePosition(result.hits, 0, nbHits);
          var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, result.queryID);
          lastHits = hitsWithAbsolutePositionAndQueryID;
          isLoading = false;
          debouncedRender(_objectSpread10(_objectSpread10({}, _this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
        });
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread10(_objectSpread10({}, renderState), {}, {
          answers: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState() {
        return {
          hits: lastHits,
          isLoading,
          widgetParams
        };
      },
      dispose: function dispose(_ref23) {
        var state = _ref23.state;
        unmountFn();
        return state;
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state) {
        return state;
      }
    };
  };
};
var connectAnswers_default = connectAnswers;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/dynamic-widgets/connectDynamicWidgets.js
function ownKeys11(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread11(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys11(Object(source), true).forEach(function(key2) {
      _defineProperty12(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys11(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty12(obj, key2, value) {
  key2 = _toPropertyKey11(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey11(arg) {
  var key2 = _toPrimitive11(arg, "string");
  return _typeof12(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive11(input, hint) {
  if (_typeof12(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof12(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _typeof12(obj) {
  "@babel/helpers - typeof";
  return _typeof12 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof12(obj);
}
var withUsage2 = createDocumentationMessageGenerator({
  name: "dynamic-widgets",
  connector: true
});
var MAX_WILDCARD_FACETS = 20;
var connectDynamicWidgets = function connectDynamicWidgets2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage2());
  return function(widgetParams) {
    var widgets = widgetParams.widgets, _widgetParams$maxValu = widgetParams.maxValuesPerFacet, maxValuesPerFacet = _widgetParams$maxValu === void 0 ? 20 : _widgetParams$maxValu, _widgetParams$facets = widgetParams.facets, facets = _widgetParams$facets === void 0 ? ["*"] : _widgetParams$facets, _widgetParams$transfo = widgetParams.transformItems, transformItems = _widgetParams$transfo === void 0 ? function(items) {
      return items;
    } : _widgetParams$transfo, fallbackWidget = widgetParams.fallbackWidget;
    if (!(widgets && Array.isArray(widgets) && widgets.every(function(widget) {
      return _typeof12(widget) === "object";
    }))) {
      throw new Error(withUsage2("The `widgets` option expects an array of widgets."));
    }
    if (!Array.isArray(facets)) {
      throw new Error(withUsage2("The `facets` option only accepts an array of facets, you passed ".concat(JSON.stringify(facets))));
    }
    var localWidgets = /* @__PURE__ */ new Map();
    return {
      $$type: "ais.dynamicWidgets",
      init: function init(initOptions) {
        widgets.forEach(function(widget) {
          var attribute = getWidgetAttribute(widget, initOptions);
          localWidgets.set(attribute, {
            widget,
            isMounted: false
          });
        });
        renderFn(_objectSpread11(_objectSpread11({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var parent = renderOptions.parent;
        var renderState = this.getWidgetRenderState(renderOptions);
        var widgetsToUnmount = [];
        var widgetsToMount = [];
        if (fallbackWidget) {
          renderState.attributesToRender.forEach(function(attribute) {
            if (!localWidgets.has(attribute)) {
              var widget = fallbackWidget({
                attribute
              });
              localWidgets.set(attribute, {
                widget,
                isMounted: false
              });
            }
          });
        }
        localWidgets.forEach(function(_ref7, attribute) {
          var widget = _ref7.widget, isMounted = _ref7.isMounted;
          var shouldMount = renderState.attributesToRender.indexOf(attribute) > -1;
          if (!isMounted && shouldMount) {
            widgetsToMount.push(widget);
            localWidgets.set(attribute, {
              widget,
              isMounted: true
            });
          } else if (isMounted && !shouldMount) {
            widgetsToUnmount.push(widget);
            localWidgets.set(attribute, {
              widget,
              isMounted: false
            });
          }
        });
        parent.addWidgets(widgetsToMount);
        setTimeout(function() {
          return parent.removeWidgets(widgetsToUnmount);
        }, 0);
        renderFn(_objectSpread11(_objectSpread11({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref23) {
        var parent = _ref23.parent;
        var toRemove = [];
        localWidgets.forEach(function(_ref33) {
          var widget = _ref33.widget, isMounted = _ref33.isMounted;
          if (isMounted) {
            toRemove.push(widget);
          }
        });
        parent.removeWidgets(toRemove);
        unmountFn();
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state) {
        return facets.reduce(function(acc, curr) {
          return acc.addFacet(curr);
        }, state.setQueryParameters({
          maxValuesPerFacet: Math.max(maxValuesPerFacet || 0, state.maxValuesPerFacet || 0)
        }));
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread11(_objectSpread11({}, renderState), {}, {
          dynamicWidgets: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref44) {
        var _results$renderingCon, _results$renderingCon2, _results$renderingCon3, _results$renderingCon4;
        var results = _ref44.results, state = _ref44.state;
        if (!results) {
          return {
            attributesToRender: [],
            widgetParams
          };
        }
        var attributesToRender = transformItems((_results$renderingCon = (_results$renderingCon2 = results.renderingContent) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.facetOrdering) === null || _results$renderingCon3 === void 0 ? void 0 : (_results$renderingCon4 = _results$renderingCon3.facets) === null || _results$renderingCon4 === void 0 ? void 0 : _results$renderingCon4.order) !== null && _results$renderingCon !== void 0 ? _results$renderingCon : [], {
          results
        });
        if (!Array.isArray(attributesToRender)) {
          throw new Error(withUsage2("The `transformItems` option expects a function that returns an Array."));
        }
        true ? _warning(maxValuesPerFacet >= (state.maxValuesPerFacet || 0), "The maxValuesPerFacet set by dynamic widgets (".concat(maxValuesPerFacet, ") is smaller than one of the limits set by a widget (").concat(state.maxValuesPerFacet, "). This causes a mismatch in query parameters and thus an extra network request when that widget is mounted.")) : void 0;
        true ? _warning(attributesToRender.length <= MAX_WILDCARD_FACETS || widgetParams.facets !== void 0, "More than ".concat(MAX_WILDCARD_FACETS, ` facets are requested to be displayed without explicitly setting which facets to retrieve. This could have a performance impact. Set "facets" to [] to do two smaller network requests, or explicitly to ['*'] to avoid this warning.`)) : void 0;
        return {
          attributesToRender,
          widgetParams
        };
      }
    };
  };
};
var connectDynamicWidgets_default = connectDynamicWidgets;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/clear-refinements/connectClearRefinements.js
function _typeof13(obj) {
  "@babel/helpers - typeof";
  return _typeof13 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof13(obj);
}
function _toConsumableArray3(arr) {
  return _arrayWithoutHoles3(arr) || _iterableToArray3(arr) || _unsupportedIterableToArray6(arr) || _nonIterableSpread3();
}
function _nonIterableSpread3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray6(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray6(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray6(o26, minLen);
}
function _iterableToArray3(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles3(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray6(arr);
}
function _arrayLikeToArray6(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function ownKeys12(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread12(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys12(Object(source), true).forEach(function(key2) {
      _defineProperty13(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys12(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty13(obj, key2, value) {
  key2 = _toPropertyKey12(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey12(arg) {
  var key2 = _toPrimitive12(arg, "string");
  return _typeof13(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive12(input, hint) {
  if (_typeof13(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof13(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage3 = createDocumentationMessageGenerator({
  name: "clear-refinements",
  connector: true
});
var connectClearRefinements = function connectClearRefinements2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage3());
  return function(widgetParams) {
    var _ref7 = widgetParams || {}, _ref$includedAttribut = _ref7.includedAttributes, includedAttributes = _ref$includedAttribut === void 0 ? [] : _ref$includedAttribut, _ref$excludedAttribut = _ref7.excludedAttributes, excludedAttributes = _ref$excludedAttribut === void 0 ? ["query"] : _ref$excludedAttribut, _ref$transformItems = _ref7.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (widgetParams && widgetParams.includedAttributes && widgetParams.excludedAttributes) {
      throw new Error(withUsage3("The options `includedAttributes` and `excludedAttributes` cannot be used together."));
    }
    var connectorState = {
      refine: noop,
      createURL: function createURL() {
        return "";
      },
      attributesToClear: []
    };
    var cachedRefine = function cachedRefine2() {
      return connectorState.refine();
    };
    var cachedCreateURL = function cachedCreateURL2() {
      return connectorState.createURL();
    };
    return {
      $$type: "ais.clearRefinements",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread12(_objectSpread12({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread12(_objectSpread12({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread12(_objectSpread12({}, renderState), {}, {
          clearRefinements: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref23) {
        var createURL = _ref23.createURL, scopedResults = _ref23.scopedResults, results = _ref23.results;
        connectorState.attributesToClear = scopedResults.reduce(function(attributesToClear, scopedResult) {
          return attributesToClear.concat(getAttributesToClear({
            scopedResult,
            includedAttributes,
            excludedAttributes,
            transformItems,
            results
          }));
        }, []);
        connectorState.refine = function() {
          connectorState.attributesToClear.forEach(function(_ref33) {
            var indexHelper = _ref33.helper, items = _ref33.items;
            indexHelper.setState(clearRefinements({
              helper: indexHelper,
              attributesToClear: items
            })).search();
          });
        };
        connectorState.createURL = function() {
          return createURL(mergeSearchParameters.apply(void 0, _toConsumableArray3(connectorState.attributesToClear.map(function(_ref44) {
            var indexHelper = _ref44.helper, items = _ref44.items;
            return clearRefinements({
              helper: indexHelper,
              attributesToClear: items
            });
          }))));
        };
        var canRefine = connectorState.attributesToClear.some(function(attributeToClear) {
          return attributeToClear.items.length > 0;
        });
        return {
          canRefine,
          hasRefinements: canRefine,
          refine: cachedRefine,
          createURL: cachedCreateURL,
          widgetParams
        };
      }
    };
  };
};
function getAttributesToClear(_ref52) {
  var scopedResult = _ref52.scopedResult, includedAttributes = _ref52.includedAttributes, excludedAttributes = _ref52.excludedAttributes, transformItems = _ref52.transformItems, results = _ref52.results;
  var includesQuery = includedAttributes.indexOf("query") !== -1 || excludedAttributes.indexOf("query") === -1;
  return {
    helper: scopedResult.helper,
    items: transformItems(uniq(getRefinements(scopedResult.results, scopedResult.helper.state, includesQuery).map(function(refinement) {
      return refinement.attribute;
    }).filter(function(attribute) {
      return (
        // If the array is empty (default case), we keep all the attributes
        includedAttributes.length === 0 || // Otherwise, only add the specified attributes
        includedAttributes.indexOf(attribute) !== -1
      );
    }).filter(function(attribute) {
      return (
        // If the query is included, we ignore the default `excludedAttributes = ['query']`
        attribute === "query" && includesQuery || // Otherwise, ignore the excluded attributes
        excludedAttributes.indexOf(attribute) === -1
      );
    })), {
      results
    })
  };
}
var connectClearRefinements_default = connectClearRefinements;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements.js
function _typeof14(obj) {
  "@babel/helpers - typeof";
  return _typeof14 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof14(obj);
}
function _toConsumableArray4(arr) {
  return _arrayWithoutHoles4(arr) || _iterableToArray4(arr) || _unsupportedIterableToArray7(arr) || _nonIterableSpread4();
}
function _nonIterableSpread4() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray7(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray7(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray7(o26, minLen);
}
function _iterableToArray4(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles4(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray7(arr);
}
function _arrayLikeToArray7(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function ownKeys13(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread13(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys13(Object(source), true).forEach(function(key2) {
      _defineProperty14(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys13(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty14(obj, key2, value) {
  key2 = _toPropertyKey13(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey13(arg) {
  var key2 = _toPrimitive13(arg, "string");
  return _typeof14(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive13(input, hint) {
  if (_typeof14(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof14(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage4 = createDocumentationMessageGenerator({
  name: "current-refinements",
  connector: true
});
var connectCurrentRefinements = function connectCurrentRefinements2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage4());
  return function(widgetParams) {
    if ((widgetParams || {}).includedAttributes && (widgetParams || {}).excludedAttributes) {
      throw new Error(withUsage4("The options `includedAttributes` and `excludedAttributes` cannot be used together."));
    }
    var _ref7 = widgetParams || {}, includedAttributes = _ref7.includedAttributes, _ref$excludedAttribut = _ref7.excludedAttributes, excludedAttributes = _ref$excludedAttribut === void 0 ? ["query"] : _ref$excludedAttribut, _ref$transformItems = _ref7.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    return {
      $$type: "ais.currentRefinements",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread13(_objectSpread13({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread13(_objectSpread13({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread13(_objectSpread13({}, renderState), {}, {
          currentRefinements: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref23) {
        var results = _ref23.results, scopedResults = _ref23.scopedResults, _createURL = _ref23.createURL, helper = _ref23.helper;
        function getItems() {
          if (!results) {
            return transformItems(getRefinementsItems({
              results: {},
              helper,
              indexId: helper.state.index,
              includedAttributes,
              excludedAttributes
            }), {
              results
            });
          }
          return scopedResults.reduce(function(accResults, scopedResult) {
            return accResults.concat(transformItems(getRefinementsItems({
              results: scopedResult.results,
              helper: scopedResult.helper,
              indexId: scopedResult.indexId,
              includedAttributes,
              excludedAttributes
            }), {
              results
            }));
          }, []);
        }
        var items = getItems();
        return {
          items,
          canRefine: items.length > 0,
          refine: function refine(refinement) {
            return clearRefinement(helper, refinement);
          },
          createURL: function createURL(refinement) {
            return _createURL(clearRefinementFromState(helper.state, refinement));
          },
          widgetParams
        };
      }
    };
  };
};
function getRefinementsItems(_ref33) {
  var results = _ref33.results, helper = _ref33.helper, indexId = _ref33.indexId, includedAttributes = _ref33.includedAttributes, excludedAttributes = _ref33.excludedAttributes;
  var includesQuery = (includedAttributes || []).indexOf("query") !== -1 || (excludedAttributes || []).indexOf("query") === -1;
  var filterFunction = includedAttributes ? function(item2) {
    return includedAttributes.indexOf(item2.attribute) !== -1;
  } : function(item2) {
    return excludedAttributes.indexOf(item2.attribute) === -1;
  };
  var items = getRefinements(results, helper.state, includesQuery).map(normalizeRefinement).filter(filterFunction);
  return items.reduce(function(allItems, currentItem) {
    return [].concat(_toConsumableArray4(allItems.filter(function(item2) {
      return item2.attribute !== currentItem.attribute;
    })), [{
      indexName: helper.state.index,
      indexId,
      attribute: currentItem.attribute,
      label: currentItem.attribute,
      refinements: items.filter(function(result) {
        return result.attribute === currentItem.attribute;
      }).sort(function(a30, b3) {
        return a30.type === "numeric" ? a30.value - b3.value : 0;
      }),
      refine: function refine(refinement) {
        return clearRefinement(helper, refinement);
      }
    }]);
  }, []);
}
function clearRefinementFromState(state, refinement) {
  state = state.resetPage();
  switch (refinement.type) {
    case "facet":
      return state.removeFacetRefinement(refinement.attribute, String(refinement.value));
    case "disjunctive":
      return state.removeDisjunctiveFacetRefinement(refinement.attribute, String(refinement.value));
    case "hierarchical":
      return state.removeHierarchicalFacetRefinement(refinement.attribute);
    case "exclude":
      return state.removeExcludeRefinement(refinement.attribute, String(refinement.value));
    case "numeric":
      return state.removeNumericRefinement(refinement.attribute, refinement.operator, String(refinement.value));
    case "tag":
      return state.removeTagRefinement(String(refinement.value));
    case "query":
      return state.setQueryParameter("query", "");
    default:
      true ? _warning(false, 'The refinement type "'.concat(refinement.type, '" does not exist and cannot be cleared from the current refinements.')) : void 0;
      return state;
  }
}
function clearRefinement(helper, refinement) {
  helper.setState(clearRefinementFromState(helper.state, refinement)).search();
}
function getOperatorSymbol(operator) {
  switch (operator) {
    case ">=":
      return "≥";
    case "<=":
      return "≤";
    default:
      return operator;
  }
}
function normalizeRefinement(refinement) {
  var value = getValue(refinement);
  var label = refinement.operator ? "".concat(getOperatorSymbol(refinement.operator), " ").concat(refinement.name) : refinement.name;
  var normalizedRefinement = {
    attribute: refinement.attribute,
    type: refinement.type,
    value,
    label
  };
  if (refinement.operator !== void 0) {
    normalizedRefinement.operator = refinement.operator;
  }
  if (refinement.count !== void 0) {
    normalizedRefinement.count = refinement.count;
  }
  if (refinement.exhaustive !== void 0) {
    normalizedRefinement.exhaustive = refinement.exhaustive;
  }
  return normalizedRefinement;
}
function getValue(refinement) {
  if (refinement.type === "numeric") {
    return Number(refinement.name);
  }
  if ("escapedValue" in refinement) {
    return refinement.escapedValue;
  }
  return refinement.name;
}
var connectCurrentRefinements_default = connectCurrentRefinements;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu.js
function _typeof15(obj) {
  "@babel/helpers - typeof";
  return _typeof15 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof15(obj);
}
var _excluded2 = ["name", "escapedValue", "data", "path"];
function ownKeys14(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread14(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys14(Object(source), true).forEach(function(key2) {
      _defineProperty15(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys14(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty15(obj, key2, value) {
  key2 = _toPropertyKey14(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey14(arg) {
  var key2 = _toPrimitive14(arg, "string");
  return _typeof15(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive14(input, hint) {
  if (_typeof15(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof15(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties2(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose2(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose2(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function _slicedToArray5(arr, i32) {
  return _arrayWithHoles5(arr) || _iterableToArrayLimit5(arr, i32) || _unsupportedIterableToArray8(arr, i32) || _nonIterableRest5();
}
function _nonIterableRest5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray8(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray8(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray8(o26, minLen);
}
function _arrayLikeToArray8(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _iterableToArrayLimit5(arr, i32) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i32) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i32); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles5(arr) {
  if (Array.isArray(arr))
    return arr;
}
var withUsage5 = createDocumentationMessageGenerator({
  name: "hierarchical-menu",
  connector: true
});
var DEFAULT_SORT = ["name:asc"];
var connectHierarchicalMenu = function connectHierarchicalMenu2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage5());
  return function(widgetParams) {
    var _ref7 = widgetParams || {}, attributes = _ref7.attributes, _ref$separator = _ref7.separator, separator = _ref$separator === void 0 ? " > " : _ref$separator, _ref$rootPath = _ref7.rootPath, rootPath = _ref$rootPath === void 0 ? null : _ref$rootPath, _ref$showParentLevel = _ref7.showParentLevel, showParentLevel = _ref$showParentLevel === void 0 ? true : _ref$showParentLevel, _ref$limit = _ref7.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$showMore = _ref7.showMore, showMore = _ref$showMore === void 0 ? false : _ref$showMore, _ref$showMoreLimit = _ref7.showMoreLimit, showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit, _ref$sortBy = _ref7.sortBy, sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT : _ref$sortBy, _ref$transformItems = _ref7.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
      throw new Error(withUsage5("The `attributes` option expects an array of strings."));
    }
    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage5("The `showMoreLimit` option must be greater than `limit`."));
    }
    var _attributes = _slicedToArray5(attributes, 1), hierarchicalFacetName = _attributes[0];
    var sendEvent;
    var toggleShowMore = function toggleShowMore2() {
    };
    function cachedToggleShowMore() {
      toggleShowMore();
    }
    var _refine;
    var isShowingMore = false;
    function createToggleShowMore(renderOptions, widget) {
      return function() {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }
    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }
    function _prepareFacetValues(facetValues) {
      return facetValues.slice(0, getLimit()).map(function(_ref23) {
        var label = _ref23.name, value = _ref23.escapedValue, data = _ref23.data, path = _ref23.path, subValue = _objectWithoutProperties2(_ref23, _excluded2);
        var item2 = _objectSpread14(_objectSpread14({}, subValue), {}, {
          value,
          label,
          data: null
        });
        if (Array.isArray(data)) {
          item2.data = _prepareFacetValues(data);
        }
        return item2;
      });
    }
    return {
      $$type: "ais.hierarchicalMenu",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread14(_objectSpread14({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        toggleShowMore = createToggleShowMore(renderOptions, this);
        renderFn(_objectSpread14(_objectSpread14({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref33) {
        var state = _ref33.state;
        unmountFn();
        return state.removeHierarchicalFacet(hierarchicalFacetName).setQueryParameter("maxValuesPerFacet", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread14(_objectSpread14({}, renderState), {}, {
          hierarchicalMenu: _objectSpread14(_objectSpread14({}, renderState.hierarchicalMenu), {}, _defineProperty15({}, hierarchicalFacetName, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref44) {
        var _this = this;
        var results = _ref44.results, state = _ref44.state, createURL = _ref44.createURL, instantSearchInstance = _ref44.instantSearchInstance, helper = _ref44.helper;
        var items = [];
        var canToggleShowMore = false;
        var _createURL = function _createURL2(facetValue) {
          return createURL(function(uiState) {
            return _this.getWidgetUiState(uiState, {
              searchParameters: state.resetPage().toggleFacetRefinement(hierarchicalFacetName, facetValue),
              helper
            });
          });
        };
        if (!sendEvent) {
          sendEvent = createSendEventForFacet({
            instantSearchInstance,
            helper,
            attribute: function attribute(facetValue) {
              var index3 = facetValue.split(separator).length - 1;
              return attributes[index3];
            },
            widgetType: this.$$type
          });
        }
        if (!_refine) {
          _refine = function _refine2(facetValue) {
            sendEvent("click:internal", facetValue);
            helper.toggleFacetRefinement(hierarchicalFacetName, facetValue).search();
          };
        }
        if (results) {
          var facetValues = results.getFacetValues(hierarchicalFacetName, {
            sortBy,
            facetOrdering: sortBy === DEFAULT_SORT
          });
          var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
          var hasExhaustiveItems = (state.maxValuesPerFacet || 0) > getLimit() ? facetItems.length <= getLimit() : facetItems.length < getLimit();
          canToggleShowMore = showMore && (isShowingMore || !hasExhaustiveItems);
          items = transformItems(_prepareFacetValues(facetItems), {
            results
          });
        }
        return {
          items,
          refine: _refine,
          canRefine: items.length > 0,
          createURL: _createURL,
          sendEvent,
          widgetParams,
          isShowingMore,
          toggleShowMore: cachedToggleShowMore,
          canToggleShowMore
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref52) {
        var searchParameters = _ref52.searchParameters;
        var path = searchParameters.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);
        return removeEmptyRefinementsFromUiState(_objectSpread14(_objectSpread14({}, uiState), {}, {
          hierarchicalMenu: _objectSpread14(_objectSpread14({}, uiState.hierarchicalMenu), {}, _defineProperty15({}, hierarchicalFacetName, path))
        }), hierarchicalFacetName);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref63) {
        var uiState = _ref63.uiState;
        var values = uiState.hierarchicalMenu && uiState.hierarchicalMenu[hierarchicalFacetName];
        if (searchParameters.isConjunctiveFacet(hierarchicalFacetName) || searchParameters.isDisjunctiveFacet(hierarchicalFacetName)) {
          true ? _warning(false, 'HierarchicalMenu: Attribute "'.concat(hierarchicalFacetName, '" is already used by another widget applying conjunctive or disjunctive faceting.\nAs this is not supported, please make sure to remove this other widget or this HierarchicalMenu widget will not work at all.')) : void 0;
          return searchParameters;
        }
        if (searchParameters.isHierarchicalFacet(hierarchicalFacetName)) {
          var facet = searchParameters.getHierarchicalFacetByName(hierarchicalFacetName);
          true ? _warning(isEqual(facet.attributes, attributes) && facet.separator === separator && facet.rootPath === rootPath, "Using Breadcrumb and HierarchicalMenu on the same facet with different options overrides the configuration of the HierarchicalMenu.") : void 0;
        }
        var withFacetConfiguration = searchParameters.removeHierarchicalFacet(hierarchicalFacetName).addHierarchicalFacet({
          name: hierarchicalFacetName,
          attributes,
          separator,
          rootPath,
          showParentLevel
        });
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter("maxValuesPerFacet", nextMaxValuesPerFacet);
        if (!values) {
          return withMaxValuesPerFacet.setQueryParameters({
            hierarchicalFacetsRefinements: _objectSpread14(_objectSpread14({}, withMaxValuesPerFacet.hierarchicalFacetsRefinements), {}, _defineProperty15({}, hierarchicalFacetName, []))
          });
        }
        return withMaxValuesPerFacet.addHierarchicalFacetRefinement(hierarchicalFacetName, values.join(separator));
      }
    };
  };
};
function removeEmptyRefinementsFromUiState(indexUiState, attribute) {
  if (!indexUiState.hierarchicalMenu) {
    return indexUiState;
  }
  if (!indexUiState.hierarchicalMenu[attribute] || indexUiState.hierarchicalMenu[attribute].length === 0) {
    delete indexUiState.hierarchicalMenu[attribute];
  }
  if (Object.keys(indexUiState.hierarchicalMenu).length === 0) {
    delete indexUiState.hierarchicalMenu;
  }
  return indexUiState;
}
var connectHierarchicalMenu_default = connectHierarchicalMenu;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/hits/connectHits.js
function _typeof16(obj) {
  "@babel/helpers - typeof";
  return _typeof16 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof16(obj);
}
function ownKeys15(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread15(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys15(Object(source), true).forEach(function(key2) {
      _defineProperty16(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys15(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty16(obj, key2, value) {
  key2 = _toPropertyKey15(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey15(arg) {
  var key2 = _toPrimitive15(arg, "string");
  return _typeof16(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive15(input, hint) {
  if (_typeof16(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof16(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage6 = createDocumentationMessageGenerator({
  name: "hits",
  connector: true
});
var connectHits_default = function connectHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage6());
  return function(widgetParams) {
    var _ref7 = widgetParams || {}, _ref$escapeHTML = _ref7.escapeHTML, escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML, _ref$transformItems = _ref7.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    var sendEvent;
    var bindEvent;
    return {
      $$type: "ais.hits",
      init: function init(initOptions) {
        renderFn(_objectSpread15(_objectSpread15({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var renderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread15(_objectSpread15({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
        renderState.sendEvent("view:internal", renderState.items);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread15(_objectSpread15({}, renderState), {}, {
          hits: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref23) {
        var _results$renderingCon, _results$renderingCon2, _results$renderingCon3;
        var results = _ref23.results, helper = _ref23.helper, instantSearchInstance = _ref23.instantSearchInstance;
        if (!sendEvent) {
          sendEvent = createSendEventForHits({
            instantSearchInstance,
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type
          });
        }
        if (!bindEvent) {
          bindEvent = createBindEventForHits({
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type,
            instantSearchInstance
          });
        }
        if (!results) {
          return {
            hits: [],
            items: [],
            results: void 0,
            banner: void 0,
            sendEvent,
            bindEvent,
            widgetParams
          };
        }
        if (escapeHTML && results.hits.length > 0) {
          results.hits = escapeHits(results.hits);
        }
        var hitsWithAbsolutePosition = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
        var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, results.queryID);
        var items = transformItems(hitsWithAbsolutePositionAndQueryID, {
          results
        });
        var banner = (_results$renderingCon = results.renderingContent) === null || _results$renderingCon === void 0 ? void 0 : (_results$renderingCon2 = _results$renderingCon.widgets) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.banners) === null || _results$renderingCon3 === void 0 ? void 0 : _results$renderingCon3[0];
        return {
          hits: items,
          items,
          results,
          banner,
          sendEvent,
          bindEvent,
          widgetParams
        };
      },
      dispose: function dispose(_ref33) {
        var state = _ref33.state;
        unmountFn();
        if (!escapeHTML) {
          return state;
        }
        return state.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function(acc, key2) {
          return _objectSpread15(_objectSpread15({}, acc), {}, _defineProperty16({}, key2, void 0));
        }, {}));
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _uiState) {
        if (!escapeHTML) {
          return state;
        }
        return state.setQueryParameters(TAG_PLACEHOLDER);
      }
    };
  };
};

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/insights/client.js
function _typeof17(obj) {
  "@babel/helpers - typeof";
  return _typeof17 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof17(obj);
}
function ownKeys16(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread16(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys16(Object(source), true).forEach(function(key2) {
      _defineProperty17(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys16(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty17(obj, key2, value) {
  key2 = _toPropertyKey16(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey16(arg) {
  var key2 = _toPrimitive16(arg, "string");
  return _typeof17(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive16(input, hint) {
  if (_typeof17(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof17(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var getSelectedHits = function getSelectedHits2(hits, selectedObjectIDs) {
  return selectedObjectIDs.map(function(objectID) {
    var hit = find(hits, function(h13) {
      return h13.objectID === objectID;
    });
    if (typeof hit === "undefined") {
      throw new Error('Could not find objectID "'.concat(objectID, '" passed to `clickedObjectIDsAfterSearch` in the returned hits. This is necessary to infer the absolute position and the query ID.'));
    }
    return hit;
  });
};
var getQueryID = function getQueryID2(selectedHits) {
  var queryIDs = uniq(selectedHits.map(function(hit) {
    return hit.__queryID;
  }));
  if (queryIDs.length > 1) {
    throw new Error("Insights currently allows a single `queryID`. The `objectIDs` provided map to multiple `queryID`s.");
  }
  var queryID = queryIDs[0];
  if (typeof queryID !== "string") {
    throw new Error("Could not infer `queryID`. Ensure InstantSearch `clickAnalytics: true` was added with the Configure widget.\n\nSee: https://alg.li/lNiZZ7");
  }
  return queryID;
};
var getPositions = function getPositions2(selectedHits) {
  return selectedHits.map(function(hit) {
    return hit.__position;
  });
};
var inferPayload = function inferPayload2(_ref7) {
  var method = _ref7.method, results = _ref7.results, hits = _ref7.hits, objectIDs = _ref7.objectIDs;
  var index3 = results.index;
  var selectedHits = getSelectedHits(hits, objectIDs);
  var queryID = getQueryID(selectedHits);
  switch (method) {
    case "clickedObjectIDsAfterSearch": {
      var positions = getPositions(selectedHits);
      return {
        index: index3,
        queryID,
        objectIDs,
        positions
      };
    }
    case "convertedObjectIDsAfterSearch":
      return {
        index: index3,
        queryID,
        objectIDs
      };
    default:
      throw new Error('Unsupported method passed to insights: "'.concat(method, '".'));
  }
};
var wrapInsightsClient = function wrapInsightsClient2(aa, results, hits) {
  return function(method) {
    for (var _len = arguments.length, payloads = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      payloads[_key - 1] = arguments[_key];
    }
    var payload = payloads[0];
    true ? _warning(false, "`insights` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : void 0;
    if (!aa) {
      var withInstantSearchUsage = createDocumentationMessageGenerator({
        name: "instantsearch"
      });
      throw new Error(withInstantSearchUsage("The `insightsClient` option has not been provided to `instantsearch`."));
    }
    if (!Array.isArray(payload.objectIDs)) {
      throw new TypeError("Expected `objectIDs` to be an array.");
    }
    var inferredPayload = inferPayload({
      method,
      results,
      hits,
      objectIDs: payload.objectIDs
    });
    aa(method, _objectSpread16(_objectSpread16({}, inferredPayload), payload));
  };
};
function withInsights(connector) {
  return function(renderFn, unmountFn) {
    return connector(function(renderOptions, isFirstRender) {
      var results = renderOptions.results, hits = renderOptions.hits, instantSearchInstance = renderOptions.instantSearchInstance;
      if (results && hits && instantSearchInstance) {
        var insights2 = wrapInsightsClient(instantSearchInstance.insightsClient, results, hits);
        return renderFn(_objectSpread16(_objectSpread16({}, renderOptions), {}, {
          insights: insights2
        }), isFirstRender);
      }
      return renderFn(renderOptions, isFirstRender);
    }, unmountFn);
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/preact/dist/preact.module.js
var n4;
var l;
var u2;
var t4;
var i;
var o2;
var r2;
var f;
var e3;
var c;
var s2;
var a2;
var h2 = {};
var p = [];
var v = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var y = Array.isArray;
function d(n32, l27) {
  for (var u26 in l27)
    n32[u26] = l27[u26];
  return n32;
}
function w(n32) {
  var l27 = n32.parentNode;
  l27 && l27.removeChild(n32);
}
function _(l27, u26, t37) {
  var i32, o26, r32, f15 = {};
  for (r32 in u26)
    "key" == r32 ? i32 = u26[r32] : "ref" == r32 ? o26 = u26[r32] : f15[r32] = u26[r32];
  if (arguments.length > 2 && (f15.children = arguments.length > 3 ? n4.call(arguments, 2) : t37), "function" == typeof l27 && null != l27.defaultProps)
    for (r32 in l27.defaultProps)
      void 0 === f15[r32] && (f15[r32] = l27.defaultProps[r32]);
  return g(l27, f15, i32, o26, null);
}
function g(n32, t37, i32, o26, r32) {
  var f15 = { type: n32, props: t37, key: i32, ref: o26, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == r32 ? ++u2 : r32, __i: -1, __u: 0 };
  return null == r32 && null != l.vnode && l.vnode(f15), f15;
}
function m() {
  return { current: null };
}
function k(n32) {
  return n32.children;
}
function b(n32, l27) {
  this.props = n32, this.context = l27;
}
function x(n32, l27) {
  if (null == l27)
    return n32.__ ? x(n32.__, n32.__i + 1) : null;
  for (var u26; l27 < n32.__k.length; l27++)
    if (null != (u26 = n32.__k[l27]) && null != u26.__e)
      return u26.__e;
  return "function" == typeof n32.type ? x(n32) : null;
}
function C(n32) {
  var l27, u26;
  if (null != (n32 = n32.__) && null != n32.__c) {
    for (n32.__e = n32.__c.base = null, l27 = 0; l27 < n32.__k.length; l27++)
      if (null != (u26 = n32.__k[l27]) && null != u26.__e) {
        n32.__e = n32.__c.base = u26.__e;
        break;
      }
    return C(n32);
  }
}
function M(n32) {
  (!n32.__d && (n32.__d = true) && i.push(n32) && !P.__r++ || o2 !== l.debounceRendering) && ((o2 = l.debounceRendering) || r2)(P);
}
function P() {
  var n32, u26, t37, o26, r32, e34, c23, s30;
  for (i.sort(f); n32 = i.shift(); )
    n32.__d && (u26 = i.length, o26 = void 0, e34 = (r32 = (t37 = n32).__v).__e, c23 = [], s30 = [], t37.__P && ((o26 = d({}, r32)).__v = r32.__v + 1, l.vnode && l.vnode(o26), O(t37.__P, o26, r32, t37.__n, t37.__P.namespaceURI, 32 & r32.__u ? [e34] : null, c23, null == e34 ? x(r32) : e34, !!(32 & r32.__u), s30), o26.__v = r32.__v, o26.__.__k[o26.__i] = o26, j(c23, o26, s30), o26.__e != e34 && C(o26)), i.length > u26 && i.sort(f));
  P.__r = 0;
}
function S(n32, l27, u26, t37, i32, o26, r32, f15, e34, c23, s30) {
  var a30, v7, y6, d8, w4, _2 = t37 && t37.__k || p, g9 = l27.length;
  for (u26.__d = e34, $(u26, l27, _2), e34 = u26.__d, a30 = 0; a30 < g9; a30++)
    null != (y6 = u26.__k[a30]) && "boolean" != typeof y6 && "function" != typeof y6 && (v7 = -1 === y6.__i ? h2 : _2[y6.__i] || h2, y6.__i = a30, O(n32, y6, v7, i32, o26, r32, f15, e34, c23, s30), d8 = y6.__e, y6.ref && v7.ref != y6.ref && (v7.ref && N(v7.ref, null, y6), s30.push(y6.ref, y6.__c || d8, y6)), null == w4 && null != d8 && (w4 = d8), 65536 & y6.__u || v7.__k === y6.__k ? (e34 && "string" == typeof y6.type && !n32.contains(e34) && (e34 = x(v7)), e34 = I(y6, e34, n32)) : "function" == typeof y6.type && void 0 !== y6.__d ? e34 = y6.__d : d8 && (e34 = d8.nextSibling), y6.__d = void 0, y6.__u &= -196609);
  u26.__d = e34, u26.__e = w4;
}
function $(n32, l27, u26) {
  var t37, i32, o26, r32, f15, e34 = l27.length, c23 = u26.length, s30 = c23, a30 = 0;
  for (n32.__k = [], t37 = 0; t37 < e34; t37++)
    r32 = t37 + a30, null != (i32 = n32.__k[t37] = null == (i32 = l27[t37]) || "boolean" == typeof i32 || "function" == typeof i32 ? null : "string" == typeof i32 || "number" == typeof i32 || "bigint" == typeof i32 || i32.constructor == String ? g(null, i32, null, null, null) : y(i32) ? g(k, { children: i32 }, null, null, null) : void 0 === i32.constructor && i32.__b > 0 ? g(i32.type, i32.props, i32.key, i32.ref ? i32.ref : null, i32.__v) : i32) ? (i32.__ = n32, i32.__b = n32.__b + 1, f15 = L(i32, u26, r32, s30), i32.__i = f15, o26 = null, -1 !== f15 && (s30--, (o26 = u26[f15]) && (o26.__u |= 131072)), null == o26 || null === o26.__v ? (-1 == f15 && a30--, "function" != typeof i32.type && (i32.__u |= 65536)) : f15 !== r32 && (f15 == r32 - 1 ? a30 = f15 - r32 : f15 == r32 + 1 ? a30++ : f15 > r32 ? s30 > e34 - r32 ? a30 += f15 - r32 : a30-- : f15 < r32 && a30++, f15 !== t37 + a30 && (i32.__u |= 65536))) : (o26 = u26[r32]) && null == o26.key && o26.__e && 0 == (131072 & o26.__u) && (o26.__e == n32.__d && (n32.__d = x(o26)), V(o26, o26, false), u26[r32] = null, s30--);
  if (s30)
    for (t37 = 0; t37 < c23; t37++)
      null != (o26 = u26[t37]) && 0 == (131072 & o26.__u) && (o26.__e == n32.__d && (n32.__d = x(o26)), V(o26, o26));
}
function I(n32, l27, u26) {
  var t37, i32;
  if ("function" == typeof n32.type) {
    for (t37 = n32.__k, i32 = 0; t37 && i32 < t37.length; i32++)
      t37[i32] && (t37[i32].__ = n32, l27 = I(t37[i32], l27, u26));
    return l27;
  }
  n32.__e != l27 && (u26.insertBefore(n32.__e, l27 || null), l27 = n32.__e);
  do {
    l27 = l27 && l27.nextSibling;
  } while (null != l27 && 8 === l27.nodeType);
  return l27;
}
function L(n32, l27, u26, t37) {
  var i32 = n32.key, o26 = n32.type, r32 = u26 - 1, f15 = u26 + 1, e34 = l27[u26];
  if (null === e34 || e34 && i32 == e34.key && o26 === e34.type && 0 == (131072 & e34.__u))
    return u26;
  if (t37 > (null != e34 && 0 == (131072 & e34.__u) ? 1 : 0))
    for (; r32 >= 0 || f15 < l27.length; ) {
      if (r32 >= 0) {
        if ((e34 = l27[r32]) && 0 == (131072 & e34.__u) && i32 == e34.key && o26 === e34.type)
          return r32;
        r32--;
      }
      if (f15 < l27.length) {
        if ((e34 = l27[f15]) && 0 == (131072 & e34.__u) && i32 == e34.key && o26 === e34.type)
          return f15;
        f15++;
      }
    }
  return -1;
}
function T(n32, l27, u26) {
  "-" === l27[0] ? n32.setProperty(l27, null == u26 ? "" : u26) : n32[l27] = null == u26 ? "" : "number" != typeof u26 || v.test(l27) ? u26 : u26 + "px";
}
function A(n32, l27, u26, t37, i32) {
  var o26;
  n:
    if ("style" === l27)
      if ("string" == typeof u26)
        n32.style.cssText = u26;
      else {
        if ("string" == typeof t37 && (n32.style.cssText = t37 = ""), t37)
          for (l27 in t37)
            u26 && l27 in u26 || T(n32.style, l27, "");
        if (u26)
          for (l27 in u26)
            t37 && u26[l27] === t37[l27] || T(n32.style, l27, u26[l27]);
      }
    else if ("o" === l27[0] && "n" === l27[1])
      o26 = l27 !== (l27 = l27.replace(/(PointerCapture)$|Capture$/i, "$1")), l27 = l27.toLowerCase() in n32 || "onFocusOut" === l27 || "onFocusIn" === l27 ? l27.toLowerCase().slice(2) : l27.slice(2), n32.l || (n32.l = {}), n32.l[l27 + o26] = u26, u26 ? t37 ? u26.u = t37.u : (u26.u = e3, n32.addEventListener(l27, o26 ? s2 : c, o26)) : n32.removeEventListener(l27, o26 ? s2 : c, o26);
    else {
      if ("http://www.w3.org/2000/svg" == i32)
        l27 = l27.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l27 && "height" != l27 && "href" != l27 && "list" != l27 && "form" != l27 && "tabIndex" != l27 && "download" != l27 && "rowSpan" != l27 && "colSpan" != l27 && "role" != l27 && "popover" != l27 && l27 in n32)
        try {
          n32[l27] = null == u26 ? "" : u26;
          break n;
        } catch (n33) {
        }
      "function" == typeof u26 || (null == u26 || false === u26 && "-" !== l27[4] ? n32.removeAttribute(l27) : n32.setAttribute(l27, "popover" == l27 && 1 == u26 ? "" : u26));
    }
}
function F(n32) {
  return function(u26) {
    if (this.l) {
      var t37 = this.l[u26.type + n32];
      if (null == u26.t)
        u26.t = e3++;
      else if (u26.t < t37.u)
        return;
      return t37(l.event ? l.event(u26) : u26);
    }
  };
}
function O(n32, u26, t37, i32, o26, r32, f15, e34, c23, s30) {
  var a30, h13, p7, v7, w4, _2, g9, m14, x3, C2, M2, P3, $2, I2, H, L3, T2 = u26.type;
  if (void 0 !== u26.constructor)
    return null;
  128 & t37.__u && (c23 = !!(32 & t37.__u), r32 = [e34 = u26.__e = t37.__e]), (a30 = l.__b) && a30(u26);
  n:
    if ("function" == typeof T2)
      try {
        if (m14 = u26.props, x3 = "prototype" in T2 && T2.prototype.render, C2 = (a30 = T2.contextType) && i32[a30.__c], M2 = a30 ? C2 ? C2.props.value : a30.__ : i32, t37.__c ? g9 = (h13 = u26.__c = t37.__c).__ = h13.__E : (x3 ? u26.__c = h13 = new T2(m14, M2) : (u26.__c = h13 = new b(m14, M2), h13.constructor = T2, h13.render = q), C2 && C2.sub(h13), h13.props = m14, h13.state || (h13.state = {}), h13.context = M2, h13.__n = i32, p7 = h13.__d = true, h13.__h = [], h13._sb = []), x3 && null == h13.__s && (h13.__s = h13.state), x3 && null != T2.getDerivedStateFromProps && (h13.__s == h13.state && (h13.__s = d({}, h13.__s)), d(h13.__s, T2.getDerivedStateFromProps(m14, h13.__s))), v7 = h13.props, w4 = h13.state, h13.__v = u26, p7)
          x3 && null == T2.getDerivedStateFromProps && null != h13.componentWillMount && h13.componentWillMount(), x3 && null != h13.componentDidMount && h13.__h.push(h13.componentDidMount);
        else {
          if (x3 && null == T2.getDerivedStateFromProps && m14 !== v7 && null != h13.componentWillReceiveProps && h13.componentWillReceiveProps(m14, M2), !h13.__e && (null != h13.shouldComponentUpdate && false === h13.shouldComponentUpdate(m14, h13.__s, M2) || u26.__v === t37.__v)) {
            for (u26.__v !== t37.__v && (h13.props = m14, h13.state = h13.__s, h13.__d = false), u26.__e = t37.__e, u26.__k = t37.__k, u26.__k.forEach(function(n33) {
              n33 && (n33.__ = u26);
            }), P3 = 0; P3 < h13._sb.length; P3++)
              h13.__h.push(h13._sb[P3]);
            h13._sb = [], h13.__h.length && f15.push(h13);
            break n;
          }
          null != h13.componentWillUpdate && h13.componentWillUpdate(m14, h13.__s, M2), x3 && null != h13.componentDidUpdate && h13.__h.push(function() {
            h13.componentDidUpdate(v7, w4, _2);
          });
        }
        if (h13.context = M2, h13.props = m14, h13.__P = n32, h13.__e = false, $2 = l.__r, I2 = 0, x3) {
          for (h13.state = h13.__s, h13.__d = false, $2 && $2(u26), a30 = h13.render(h13.props, h13.state, h13.context), H = 0; H < h13._sb.length; H++)
            h13.__h.push(h13._sb[H]);
          h13._sb = [];
        } else
          do {
            h13.__d = false, $2 && $2(u26), a30 = h13.render(h13.props, h13.state, h13.context), h13.state = h13.__s;
          } while (h13.__d && ++I2 < 25);
        h13.state = h13.__s, null != h13.getChildContext && (i32 = d(d({}, i32), h13.getChildContext())), x3 && !p7 && null != h13.getSnapshotBeforeUpdate && (_2 = h13.getSnapshotBeforeUpdate(v7, w4)), S(n32, y(L3 = null != a30 && a30.type === k && null == a30.key ? a30.props.children : a30) ? L3 : [L3], u26, t37, i32, o26, r32, f15, e34, c23, s30), h13.base = u26.__e, u26.__u &= -161, h13.__h.length && f15.push(h13), g9 && (h13.__E = h13.__ = null);
      } catch (n33) {
        u26.__v = null, c23 || null != r32 ? (u26.__e = e34, u26.__u |= c23 ? 160 : 32, r32[r32.indexOf(e34)] = null) : (u26.__e = t37.__e, u26.__k = t37.__k), l.__e(n33, u26, t37);
      }
    else
      null == r32 && u26.__v === t37.__v ? (u26.__k = t37.__k, u26.__e = t37.__e) : u26.__e = z(t37.__e, u26, t37, i32, o26, r32, f15, c23, s30);
  (a30 = l.diffed) && a30(u26);
}
function j(n32, u26, t37) {
  u26.__d = void 0;
  for (var i32 = 0; i32 < t37.length; i32++)
    N(t37[i32], t37[++i32], t37[++i32]);
  l.__c && l.__c(u26, n32), n32.some(function(u27) {
    try {
      n32 = u27.__h, u27.__h = [], n32.some(function(n33) {
        n33.call(u27);
      });
    } catch (n33) {
      l.__e(n33, u27.__v);
    }
  });
}
function z(l27, u26, t37, i32, o26, r32, f15, e34, c23) {
  var s30, a30, p7, v7, d8, _2, g9, m14 = t37.props, k5 = u26.props, b3 = u26.type;
  if ("svg" === b3 ? o26 = "http://www.w3.org/2000/svg" : "math" === b3 ? o26 = "http://www.w3.org/1998/Math/MathML" : o26 || (o26 = "http://www.w3.org/1999/xhtml"), null != r32) {
    for (s30 = 0; s30 < r32.length; s30++)
      if ((d8 = r32[s30]) && "setAttribute" in d8 == !!b3 && (b3 ? d8.localName === b3 : 3 === d8.nodeType)) {
        l27 = d8, r32[s30] = null;
        break;
      }
  }
  if (null == l27) {
    if (null === b3)
      return document.createTextNode(k5);
    l27 = document.createElementNS(o26, b3, k5.is && k5), r32 = null, e34 = false;
  }
  if (null === b3)
    m14 === k5 || e34 && l27.data === k5 || (l27.data = k5);
  else {
    if (r32 = r32 && n4.call(l27.childNodes), m14 = t37.props || h2, !e34 && null != r32)
      for (m14 = {}, s30 = 0; s30 < l27.attributes.length; s30++)
        m14[(d8 = l27.attributes[s30]).name] = d8.value;
    for (s30 in m14)
      if (d8 = m14[s30], "children" == s30)
        ;
      else if ("dangerouslySetInnerHTML" == s30)
        p7 = d8;
      else if ("key" !== s30 && !(s30 in k5)) {
        if ("value" == s30 && "defaultValue" in k5 || "checked" == s30 && "defaultChecked" in k5)
          continue;
        A(l27, s30, null, d8, o26);
      }
    for (s30 in k5)
      d8 = k5[s30], "children" == s30 ? v7 = d8 : "dangerouslySetInnerHTML" == s30 ? a30 = d8 : "value" == s30 ? _2 = d8 : "checked" == s30 ? g9 = d8 : "key" === s30 || e34 && "function" != typeof d8 || m14[s30] === d8 || A(l27, s30, d8, m14[s30], o26);
    if (a30)
      e34 || p7 && (a30.__html === p7.__html || a30.__html === l27.innerHTML) || (l27.innerHTML = a30.__html), u26.__k = [];
    else if (p7 && (l27.innerHTML = ""), S(l27, y(v7) ? v7 : [v7], u26, t37, i32, "foreignObject" === b3 ? "http://www.w3.org/1999/xhtml" : o26, r32, f15, r32 ? r32[0] : t37.__k && x(t37, 0), e34, c23), null != r32)
      for (s30 = r32.length; s30--; )
        null != r32[s30] && w(r32[s30]);
    e34 || (s30 = "value", void 0 !== _2 && (_2 !== l27[s30] || "progress" === b3 && !_2 || "option" === b3 && _2 !== m14[s30]) && A(l27, s30, _2, m14[s30], o26), s30 = "checked", void 0 !== g9 && g9 !== l27[s30] && A(l27, s30, g9, m14[s30], o26));
  }
  return l27;
}
function N(n32, u26, t37) {
  try {
    "function" == typeof n32 ? n32(u26) : n32.current = u26;
  } catch (n33) {
    l.__e(n33, t37);
  }
}
function V(n32, u26, t37) {
  var i32, o26;
  if (l.unmount && l.unmount(n32), (i32 = n32.ref) && (i32.current && i32.current !== n32.__e || N(i32, null, u26)), null != (i32 = n32.__c)) {
    if (i32.componentWillUnmount)
      try {
        i32.componentWillUnmount();
      } catch (n33) {
        l.__e(n33, u26);
      }
    i32.base = i32.__P = null;
  }
  if (i32 = n32.__k)
    for (o26 = 0; o26 < i32.length; o26++)
      i32[o26] && V(i32[o26], u26, t37 || "function" != typeof n32.type);
  t37 || null == n32.__e || w(n32.__e), n32.__c = n32.__ = n32.__e = n32.__d = void 0;
}
function q(n32, l27, u26) {
  return this.constructor(n32, u26);
}
function B(u26, t37, i32) {
  var o26, r32, f15, e34;
  l.__ && l.__(u26, t37), r32 = (o26 = "function" == typeof i32) ? null : i32 && i32.__k || t37.__k, f15 = [], e34 = [], O(t37, u26 = (!o26 && i32 || t37).__k = _(k, null, [u26]), r32 || h2, h2, t37.namespaceURI, !o26 && i32 ? [i32] : r32 ? null : t37.firstChild ? n4.call(t37.childNodes) : null, f15, !o26 && i32 ? i32 : r32 ? r32.__e : t37.firstChild, o26, e34), j(f15, u26, e34);
}
n4 = p.slice, l = { __e: function(n32, l27, u26, t37) {
  for (var i32, o26, r32; l27 = l27.__; )
    if ((i32 = l27.__c) && !i32.__)
      try {
        if ((o26 = i32.constructor) && null != o26.getDerivedStateFromError && (i32.setState(o26.getDerivedStateFromError(n32)), r32 = i32.__d), null != i32.componentDidCatch && (i32.componentDidCatch(n32, t37 || {}), r32 = i32.__d), r32)
          return i32.__E = i32;
      } catch (l28) {
        n32 = l28;
      }
  throw n32;
} }, u2 = 0, t4 = function(n32) {
  return null != n32 && null == n32.constructor;
}, b.prototype.setState = function(n32, l27) {
  var u26;
  u26 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n32 && (n32 = n32(d({}, u26), this.props)), n32 && d(u26, n32), null != n32 && this.__v && (l27 && this._sb.push(l27), M(this));
}, b.prototype.forceUpdate = function(n32) {
  this.__v && (this.__e = true, n32 && this.__h.push(n32), M(this));
}, b.prototype.render = k, i = [], r2 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n32, l27) {
  return n32.__v.__b - l27.__v.__b;
}, P.__r = 0, e3 = 0, c = F(false), s2 = F(true), a2 = 0;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/helpers/insights.js
function _typeof18(obj) {
  "@babel/helpers - typeof";
  return _typeof18 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof18(obj);
}
function writeDataAttributes(_ref7) {
  var method = _ref7.method, payload = _ref7.payload;
  if (_typeof18(payload) !== "object") {
    throw new Error("The insights helper expects the payload to be an object.");
  }
  var serializedPayload;
  try {
    serializedPayload = serializePayload(payload);
  } catch (error) {
    throw new Error("Could not JSON serialize the payload object.");
  }
  return 'data-insights-method="'.concat(method, '" data-insights-payload="').concat(serializedPayload, '"');
}
function insights(method, payload) {
  true ? _warning(false, "`insights` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : void 0;
  return writeDataAttributes({
    method,
    payload
  });
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/hits/connectHitsWithInsights.js
var connectHitsWithInsights = withInsights(connectHits_default);
var connectHitsWithInsights_default = connectHitsWithInsights;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage.js
function _typeof19(obj) {
  "@babel/helpers - typeof";
  return _typeof19 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof19(obj);
}
function _toConsumableArray5(arr) {
  return _arrayWithoutHoles5(arr) || _iterableToArray5(arr) || _unsupportedIterableToArray9(arr) || _nonIterableSpread5();
}
function _nonIterableSpread5() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray9(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray9(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray9(o26, minLen);
}
function _iterableToArray5(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles5(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray9(arr);
}
function _arrayLikeToArray9(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function ownKeys17(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread17(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys17(Object(source), true).forEach(function(key2) {
      _defineProperty18(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys17(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty18(obj, key2, value) {
  key2 = _toPropertyKey17(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey17(arg) {
  var key2 = _toPrimitive17(arg, "string");
  return _typeof19(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive17(input, hint) {
  if (_typeof19(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof19(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage7 = createDocumentationMessageGenerator({
  name: "hits-per-page",
  connector: true
});
var connectHitsPerPage = function connectHitsPerPage2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage7());
  return function(widgetParams) {
    var _ref7 = widgetParams || {}, userItems = _ref7.items, _ref$transformItems = _ref7.transformItems, transformItems = _ref$transformItems === void 0 ? function(items2) {
      return items2;
    } : _ref$transformItems;
    if (!Array.isArray(userItems)) {
      throw new Error(withUsage7("The `items` option expects an array of objects."));
    }
    var items = userItems;
    var defaultItems = items.filter(function(item2) {
      return item2.default === true;
    });
    if (defaultItems.length === 0) {
      throw new Error(withUsage7("A default value must be specified in `items`."));
    }
    if (defaultItems.length > 1) {
      throw new Error(withUsage7("More than one default value is specified in `items`."));
    }
    var defaultItem = defaultItems[0];
    var normalizeItems = function normalizeItems2(_ref23) {
      var hitsPerPage = _ref23.hitsPerPage;
      return items.map(function(item2) {
        return _objectSpread17(_objectSpread17({}, item2), {}, {
          isRefined: Number(item2.value) === Number(hitsPerPage)
        });
      });
    };
    var connectorState = {
      getRefine: function getRefine(helper) {
        return function(value) {
          return !value && value !== 0 ? helper.setQueryParameter("hitsPerPage", void 0).search() : helper.setQueryParameter("hitsPerPage", value).search();
        };
      },
      createURLFactory: function createURLFactory(_ref33) {
        var state = _ref33.state, createURL = _ref33.createURL, getWidgetUiState = _ref33.getWidgetUiState, helper = _ref33.helper;
        return function(value) {
          return createURL(function(uiState) {
            return getWidgetUiState(uiState, {
              searchParameters: state.resetPage().setQueryParameter("hitsPerPage", !value && value !== 0 ? void 0 : value),
              helper
            });
          });
        };
      }
    };
    return {
      $$type: "ais.hitsPerPage",
      init: function init(initOptions) {
        var state = initOptions.state, instantSearchInstance = initOptions.instantSearchInstance;
        var isCurrentInOptions = items.some(function(item2) {
          return Number(state.hitsPerPage) === Number(item2.value);
        });
        if (!isCurrentInOptions) {
          true ? _warning(state.hitsPerPage !== void 0, "\n`hitsPerPage` is not defined.\nThe option `hitsPerPage` needs to be set using the `configure` widget.\n\nLearn more: https://www.algolia.com/doc/api-reference/widgets/hits-per-page/js/\n            ") : void 0;
          true ? _warning(false, '\nThe `items` option of `hitsPerPage` does not contain the "hits per page" value coming from the state: '.concat(state.hitsPerPage, ".\n\nYou may want to add another entry to the `items` option with this value.")) : void 0;
          items = [
            // The helper will convert the empty string to `undefined`.
            {
              value: "",
              label: ""
            }
          ].concat(_toConsumableArray5(items));
        }
        renderFn(_objectSpread17(_objectSpread17({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread17(_objectSpread17({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref44) {
        var state = _ref44.state;
        unmountFn();
        return state.setQueryParameter("hitsPerPage", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread17(_objectSpread17({}, renderState), {}, {
          hitsPerPage: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref52) {
        var state = _ref52.state, results = _ref52.results, createURL = _ref52.createURL, helper = _ref52.helper;
        var canRefine = results ? results.nbHits > 0 : false;
        return {
          items: transformItems(normalizeItems(state), {
            results
          }),
          refine: connectorState.getRefine(helper),
          createURL: connectorState.createURLFactory({
            state,
            createURL,
            getWidgetUiState: this.getWidgetUiState,
            helper
          }),
          hasNoResults: !canRefine,
          canRefine,
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref63) {
        var searchParameters = _ref63.searchParameters;
        var hitsPerPage = searchParameters.hitsPerPage;
        if (hitsPerPage === void 0 || hitsPerPage === defaultItem.value) {
          return uiState;
        }
        return _objectSpread17(_objectSpread17({}, uiState), {}, {
          hitsPerPage
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref72) {
        var uiState = _ref72.uiState;
        return searchParameters.setQueryParameters({
          hitsPerPage: uiState.hitsPerPage || defaultItem.value
        });
      }
    };
  };
};
var connectHitsPerPage_default = connectHitsPerPage;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits.js
function _typeof20(obj) {
  "@babel/helpers - typeof";
  return _typeof20 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof20(obj);
}
var _excluded3 = ["page"];
var _excluded22 = ["clickAnalytics", "userToken"];
function ownKeys18(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread18(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys18(Object(source), true).forEach(function(key2) {
      _defineProperty19(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys18(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty19(obj, key2, value) {
  key2 = _toPropertyKey18(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey18(arg) {
  var key2 = _toPrimitive18(arg, "string");
  return _typeof20(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive18(input, hint) {
  if (_typeof20(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof20(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toConsumableArray6(arr) {
  return _arrayWithoutHoles6(arr) || _iterableToArray6(arr) || _unsupportedIterableToArray10(arr) || _nonIterableSpread6();
}
function _nonIterableSpread6() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray10(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray10(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray10(o26, minLen);
}
function _iterableToArray6(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles6(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray10(arr);
}
function _arrayLikeToArray10(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _objectWithoutProperties3(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose3(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose3(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
var withUsage8 = createDocumentationMessageGenerator({
  name: "infinite-hits",
  connector: true
});
function getStateWithoutPage(state) {
  var _ref7 = state || {}, page = _ref7.page, rest = _objectWithoutProperties3(_ref7, _excluded3);
  return rest;
}
function normalizeState(state) {
  var _ref23 = state || {}, clickAnalytics = _ref23.clickAnalytics, userToken = _ref23.userToken, rest = _objectWithoutProperties3(_ref23, _excluded22);
  return rest;
}
function getInMemoryCache() {
  var cachedHits = null;
  var cachedState = null;
  return {
    read: function read(_ref33) {
      var state = _ref33.state;
      return isEqual(cachedState, getStateWithoutPage(state)) ? cachedHits : null;
    },
    write: function write(_ref44) {
      var state = _ref44.state, hits = _ref44.hits;
      cachedState = getStateWithoutPage(state);
      cachedHits = hits;
    }
  };
}
function extractHitsFromCachedHits(cachedHits) {
  return Object.keys(cachedHits).map(Number).sort(function(a30, b3) {
    return a30 - b3;
  }).reduce(function(acc, page) {
    return acc.concat(cachedHits[page]);
  }, []);
}
var connectInfiniteHits_default = function connectInfiniteHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage8());
  return function(widgetParams) {
    var _ref52 = widgetParams || {}, _ref5$escapeHTML = _ref52.escapeHTML, escapeHTML = _ref5$escapeHTML === void 0 ? true : _ref5$escapeHTML, _ref5$transformItems = _ref52.transformItems, transformItems = _ref5$transformItems === void 0 ? function(items) {
      return items;
    } : _ref5$transformItems, _ref5$cache = _ref52.cache, cache = _ref5$cache === void 0 ? getInMemoryCache() : _ref5$cache;
    var showPrevious;
    var showMore;
    var sendEvent;
    var bindEvent;
    var getFirstReceivedPage = function getFirstReceivedPage2(state, cachedHits) {
      var _state$page = state.page, page = _state$page === void 0 ? 0 : _state$page;
      var pages = Object.keys(cachedHits).map(Number);
      if (pages.length === 0) {
        return page;
      } else {
        return Math.min.apply(Math, [page].concat(_toConsumableArray6(pages)));
      }
    };
    var getLastReceivedPage = function getLastReceivedPage2(state, cachedHits) {
      var _state$page2 = state.page, page = _state$page2 === void 0 ? 0 : _state$page2;
      var pages = Object.keys(cachedHits).map(Number);
      if (pages.length === 0) {
        return page;
      } else {
        return Math.max.apply(Math, [page].concat(_toConsumableArray6(pages)));
      }
    };
    var getShowPrevious = function getShowPrevious2(helper) {
      return function() {
        helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread18(_objectSpread18({}, helper.state), {}, {
          page: getFirstReceivedPage(helper.state, cache.read({
            state: normalizeState(helper.state)
          }) || {}) - 1
        })).searchWithoutTriggeringOnStateChange();
      };
    };
    var getShowMore = function getShowMore2(helper) {
      return function() {
        helper.setPage(getLastReceivedPage(helper.state, cache.read({
          state: normalizeState(helper.state)
        }) || {}) + 1).search();
      };
    };
    return {
      $$type: "ais.infiniteHits",
      init: function init(initOptions) {
        renderFn(_objectSpread18(_objectSpread18({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        var widgetRenderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread18(_objectSpread18({}, widgetRenderState), {}, {
          instantSearchInstance
        }), false);
        sendEvent("view:internal", widgetRenderState.currentPageHits);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread18(_objectSpread18({}, renderState), {}, {
          infiniteHits: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref63) {
        var _results$renderingCon, _results$renderingCon2, _results$renderingCon3;
        var results = _ref63.results, helper = _ref63.helper, parent = _ref63.parent, existingState = _ref63.state, instantSearchInstance = _ref63.instantSearchInstance;
        var isFirstPage;
        var currentPageHits = [];
        var state = parent.getPreviousState() || existingState;
        var cachedHits = cache.read({
          state: normalizeState(state)
        }) || {};
        var banner = results === null || results === void 0 ? void 0 : (_results$renderingCon = results.renderingContent) === null || _results$renderingCon === void 0 ? void 0 : (_results$renderingCon2 = _results$renderingCon.widgets) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.banners) === null || _results$renderingCon3 === void 0 ? void 0 : _results$renderingCon3[0];
        if (!results) {
          showPrevious = getShowPrevious(helper);
          showMore = getShowMore(helper);
          sendEvent = createSendEventForHits({
            instantSearchInstance,
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type
          });
          bindEvent = createBindEventForHits({
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type,
            instantSearchInstance
          });
          isFirstPage = state.page === void 0 || getFirstReceivedPage(state, cachedHits) === 0;
        } else {
          var _state$disjunctiveFac, _state$hierarchicalFa;
          var _state$page3 = state.page, _page = _state$page3 === void 0 ? 0 : _state$page3;
          if (escapeHTML && results.hits.length > 0) {
            results.hits = escapeHits(results.hits);
          }
          var hitsWithAbsolutePosition = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
          var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, results.queryID);
          var transformedHits = transformItems(hitsWithAbsolutePositionAndQueryID, {
            results
          });
          var hasDynamicWidgets = false;
          walkIndex(instantSearchInstance.mainIndex, function(indexWidget) {
            if (!hasDynamicWidgets && indexWidget.getWidgets().some(function(_ref7) {
              var $$type5 = _ref7.$$type;
              return $$type5 === "ais.dynamicWidgets";
            })) {
              hasDynamicWidgets = true;
            }
          });
          var hasNoFacets = !((_state$disjunctiveFac = state.disjunctiveFacets) !== null && _state$disjunctiveFac !== void 0 && _state$disjunctiveFac.length) && !(state.facets || []).filter(function(f15) {
            return f15 !== "*";
          }).length && !((_state$hierarchicalFa = state.hierarchicalFacets) !== null && _state$hierarchicalFa !== void 0 && _state$hierarchicalFa.length);
          if (cachedHits[_page] === void 0 && !results.__isArtificial && instantSearchInstance.status === "idle" && !(hasDynamicWidgets && hasNoFacets)) {
            cachedHits[_page] = transformedHits;
            cache.write({
              state: normalizeState(state),
              hits: cachedHits
            });
          }
          currentPageHits = transformedHits;
          isFirstPage = getFirstReceivedPage(state, cachedHits) === 0;
        }
        var items = extractHitsFromCachedHits(cachedHits);
        var isLastPage = results ? results.nbPages <= getLastReceivedPage(state, cachedHits) + 1 : true;
        return {
          hits: items,
          items,
          currentPageHits,
          sendEvent,
          bindEvent,
          banner,
          results,
          showPrevious,
          showMore,
          isFirstPage,
          isLastPage,
          widgetParams
        };
      },
      dispose: function dispose(_ref8) {
        var state = _ref8.state;
        unmountFn();
        var stateWithoutPage = state.setQueryParameter("page", void 0);
        if (!escapeHTML) {
          return stateWithoutPage;
        }
        return stateWithoutPage.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function(acc, key2) {
          return _objectSpread18(_objectSpread18({}, acc), {}, _defineProperty19({}, key2, void 0));
        }, {}));
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref9) {
        var searchParameters = _ref9.searchParameters;
        var page = searchParameters.page || 0;
        if (!page) {
          return uiState;
        }
        return _objectSpread18(_objectSpread18({}, uiState), {}, {
          // The page in the UI state is incremented by one
          // to expose the user value (not `0`).
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref10) {
        var uiState = _ref10.uiState;
        var widgetSearchParameters = searchParameters;
        if (escapeHTML) {
          widgetSearchParameters = searchParameters.setQueryParameters(TAG_PLACEHOLDER);
        }
        var page = uiState.page ? uiState.page - 1 : 0;
        return widgetSearchParameters.setQueryParameter("page", page);
      }
    };
  };
};

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/infinite-hits/connectInfiniteHitsWithInsights.js
var connectInfiniteHitsWithInsights = withInsights(connectInfiniteHits_default);
var connectInfiniteHitsWithInsights_default = connectInfiniteHitsWithInsights;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/menu/connectMenu.js
var _excluded4 = ["name", "escapedValue", "path"];
function _typeof21(obj) {
  "@babel/helpers - typeof";
  return _typeof21 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof21(obj);
}
function _objectWithoutProperties4(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose4(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose4(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function _slicedToArray6(arr, i32) {
  return _arrayWithHoles6(arr) || _iterableToArrayLimit6(arr, i32) || _unsupportedIterableToArray11(arr, i32) || _nonIterableRest6();
}
function _nonIterableRest6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray11(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray11(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray11(o26, minLen);
}
function _arrayLikeToArray11(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _iterableToArrayLimit6(arr, i32) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i32) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i32); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles6(arr) {
  if (Array.isArray(arr))
    return arr;
}
function ownKeys19(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread19(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys19(Object(source), true).forEach(function(key2) {
      _defineProperty20(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys19(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty20(obj, key2, value) {
  key2 = _toPropertyKey19(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey19(arg) {
  var key2 = _toPrimitive19(arg, "string");
  return _typeof21(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive19(input, hint) {
  if (_typeof21(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof21(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage9 = createDocumentationMessageGenerator({
  name: "menu",
  connector: true
});
var DEFAULT_SORT2 = ["isRefined", "name:asc"];
var connectMenu = function connectMenu2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage9());
  return function(widgetParams) {
    var _ref7 = widgetParams || {}, attribute = _ref7.attribute, _ref$limit = _ref7.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$showMore = _ref7.showMore, showMore = _ref$showMore === void 0 ? false : _ref$showMore, _ref$showMoreLimit = _ref7.showMoreLimit, showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit, _ref$sortBy = _ref7.sortBy, sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT2 : _ref$sortBy, _ref$transformItems = _ref7.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attribute) {
      throw new Error(withUsage9("The `attribute` option is required."));
    }
    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage9("The `showMoreLimit` option must be greater than `limit`."));
    }
    var sendEvent;
    var _createURL;
    var _refine;
    var isShowingMore = false;
    var toggleShowMore = function toggleShowMore2() {
    };
    function createToggleShowMore(renderOptions, widget) {
      return function() {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }
    function cachedToggleShowMore() {
      toggleShowMore();
    }
    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }
    return {
      $$type: "ais.menu",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread19(_objectSpread19({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread19(_objectSpread19({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref23) {
        var state = _ref23.state;
        unmountFn();
        return state.removeHierarchicalFacet(attribute).setQueryParameter("maxValuesPerFacet", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread19(_objectSpread19({}, renderState), {}, {
          menu: _objectSpread19(_objectSpread19({}, renderState.menu), {}, _defineProperty20({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var _this = this;
        var results = renderOptions.results, createURL = renderOptions.createURL, instantSearchInstance = renderOptions.instantSearchInstance, helper = renderOptions.helper;
        var items = [];
        var canToggleShowMore = false;
        if (!sendEvent) {
          sendEvent = createSendEventForFacet({
            instantSearchInstance,
            helper,
            attribute,
            widgetType: this.$$type
          });
        }
        if (!_createURL) {
          _createURL = function _createURL2(facetValue) {
            return createURL(function(uiState) {
              return _this.getWidgetUiState(uiState, {
                searchParameters: helper.state.resetPage().toggleFacetRefinement(attribute, facetValue),
                helper
              });
            });
          };
        }
        if (!_refine) {
          _refine = function _refine2(facetValue) {
            var _helper$getHierarchic = helper.getHierarchicalFacetBreadcrumb(attribute), _helper$getHierarchic2 = _slicedToArray6(_helper$getHierarchic, 1), refinedItem = _helper$getHierarchic2[0];
            sendEvent("click:internal", facetValue ? facetValue : refinedItem);
            helper.toggleFacetRefinement(attribute, facetValue ? facetValue : refinedItem).search();
          };
        }
        if (renderOptions.results) {
          toggleShowMore = createToggleShowMore(renderOptions, this);
        }
        if (results) {
          var facetValues = results.getFacetValues(attribute, {
            sortBy,
            facetOrdering: sortBy === DEFAULT_SORT2
          });
          var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
          canToggleShowMore = showMore && (isShowingMore || facetItems.length > getLimit());
          items = transformItems(facetItems.slice(0, getLimit()).map(function(_ref33) {
            var label = _ref33.name, value = _ref33.escapedValue, path = _ref33.path, item2 = _objectWithoutProperties4(_ref33, _excluded4);
            return _objectSpread19(_objectSpread19({}, item2), {}, {
              label,
              value
            });
          }), {
            results
          });
        }
        return {
          items,
          createURL: _createURL,
          refine: _refine,
          sendEvent,
          canRefine: items.length > 0,
          widgetParams,
          isShowingMore,
          toggleShowMore: cachedToggleShowMore,
          canToggleShowMore
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref44) {
        var searchParameters = _ref44.searchParameters;
        var _searchParameters$get = searchParameters.getHierarchicalFacetBreadcrumb(attribute), _searchParameters$get2 = _slicedToArray6(_searchParameters$get, 1), value = _searchParameters$get2[0];
        return removeEmptyRefinementsFromUiState2(_objectSpread19(_objectSpread19({}, uiState), {}, {
          menu: _objectSpread19(_objectSpread19({}, uiState.menu), {}, _defineProperty20({}, attribute, value))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref52) {
        var uiState = _ref52.uiState;
        var value = uiState.menu && uiState.menu[attribute];
        if (searchParameters.isConjunctiveFacet(attribute) || searchParameters.isDisjunctiveFacet(attribute)) {
          true ? _warning(false, 'Menu: Attribute "'.concat(attribute, '" is already used by another widget applying conjunctive or disjunctive faceting.\nAs this is not supported, please make sure to remove this other widget or this Menu widget will not work at all.')) : void 0;
          return searchParameters;
        }
        var withFacetConfiguration = searchParameters.removeHierarchicalFacet(attribute).addHierarchicalFacet({
          name: attribute,
          attributes: [attribute]
        });
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter("maxValuesPerFacet", nextMaxValuesPerFacet);
        if (!value) {
          return withMaxValuesPerFacet.setQueryParameters({
            hierarchicalFacetsRefinements: _objectSpread19(_objectSpread19({}, withMaxValuesPerFacet.hierarchicalFacetsRefinements), {}, _defineProperty20({}, attribute, []))
          });
        }
        return withMaxValuesPerFacet.addHierarchicalFacetRefinement(attribute, value);
      }
    };
  };
};
function removeEmptyRefinementsFromUiState2(indexUiState, attribute) {
  if (!indexUiState.menu) {
    return indexUiState;
  }
  if (indexUiState.menu[attribute] === void 0) {
    delete indexUiState.menu[attribute];
  }
  if (Object.keys(indexUiState.menu).length === 0) {
    delete indexUiState.menu;
  }
  return indexUiState;
}
var connectMenu_default = connectMenu;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/numeric-menu/connectNumericMenu.js
function _typeof22(obj) {
  "@babel/helpers - typeof";
  return _typeof22 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof22(obj);
}
function _createForOfIteratorHelper(o26, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o26[Symbol.iterator] || o26["@@iterator"];
  if (!it) {
    if (Array.isArray(o26) || (it = _unsupportedIterableToArray12(o26)) || allowArrayLike && o26 && typeof o26.length === "number") {
      if (it)
        o26 = it;
      var i32 = 0;
      var F2 = function F3() {
      };
      return { s: F2, n: function n32() {
        if (i32 >= o26.length)
          return { done: true };
        return { done: false, value: o26[i32++] };
      }, e: function e34(_e2) {
        throw _e2;
      }, f: F2 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s30() {
    it = it.call(o26);
  }, n: function n32() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e34(_e3) {
    didErr = true;
    err = _e3;
  }, f: function f15() {
    try {
      if (!normalCompletion && it.return != null)
        it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray7(arr, i32) {
  return _arrayWithHoles7(arr) || _iterableToArrayLimit7(arr, i32) || _unsupportedIterableToArray12(arr, i32) || _nonIterableRest7();
}
function _nonIterableRest7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray12(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray12(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray12(o26, minLen);
}
function _arrayLikeToArray12(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _iterableToArrayLimit7(arr, i32) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i32) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i32); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles7(arr) {
  if (Array.isArray(arr))
    return arr;
}
function ownKeys20(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread20(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys20(Object(source), true).forEach(function(key2) {
      _defineProperty21(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys20(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty21(obj, key2, value) {
  key2 = _toPropertyKey20(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey20(arg) {
  var key2 = _toPrimitive20(arg, "string");
  return _typeof22(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive20(input, hint) {
  if (_typeof22(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof22(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage10 = createDocumentationMessageGenerator({
  name: "numeric-menu",
  connector: true
});
var $$type = "ais.numericMenu";
var createSendEvent = function createSendEvent2(_ref7) {
  var instantSearchInstance = _ref7.instantSearchInstance;
  return function() {
    if (arguments.length === 1) {
      instantSearchInstance.sendEventToInsights(arguments.length <= 0 ? void 0 : arguments[0]);
      return;
    }
  };
};
var connectNumericMenu = function connectNumericMenu2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage10());
  return function(widgetParams) {
    var _ref23 = widgetParams || {}, _ref2$attribute = _ref23.attribute, attribute = _ref2$attribute === void 0 ? "" : _ref2$attribute, _ref2$items = _ref23.items, items = _ref2$items === void 0 ? [] : _ref2$items, _ref2$transformItems = _ref23.transformItems, transformItems = _ref2$transformItems === void 0 ? function(item2) {
      return item2;
    } : _ref2$transformItems;
    if (attribute === "") {
      throw new Error(withUsage10("The `attribute` option is required."));
    }
    if (!items || items.length === 0) {
      throw new Error(withUsage10("The `items` option expects an array of objects."));
    }
    var prepareItems2 = function prepareItems3(state) {
      return items.map(function(_ref33) {
        var start = _ref33.start, end = _ref33.end, label = _ref33.label;
        return {
          label,
          value: encodeURI(JSON.stringify({
            start,
            end
          })),
          isRefined: isRefined(state, attribute, {
            start,
            end,
            label
          })
        };
      });
    };
    var connectorState = {};
    return {
      $$type,
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread20(_objectSpread20({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread20(_objectSpread20({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref44) {
        var state = _ref44.state;
        unmountFn();
        return state.removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref52) {
        var searchParameters = _ref52.searchParameters;
        var values = searchParameters.getNumericRefinements(attribute);
        var equal = values["="] && values["="][0];
        if (equal || equal === 0) {
          return _objectSpread20(_objectSpread20({}, uiState), {}, {
            numericMenu: _objectSpread20(_objectSpread20({}, uiState.numericMenu), {}, _defineProperty21({}, attribute, "".concat(values["="])))
          });
        }
        var min = values[">="] && values[">="][0] || "";
        var max = values["<="] && values["<="][0] || "";
        return removeEmptyRefinementsFromUiState3(_objectSpread20(_objectSpread20({}, uiState), {}, {
          numericMenu: _objectSpread20(_objectSpread20({}, uiState.numericMenu), {}, _defineProperty21({}, attribute, "".concat(min, ":").concat(max)))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref63) {
        var uiState = _ref63.uiState;
        var value = uiState.numericMenu && uiState.numericMenu[attribute];
        var withoutRefinements = searchParameters.setQueryParameters({
          numericRefinements: _objectSpread20(_objectSpread20({}, searchParameters.numericRefinements), {}, _defineProperty21({}, attribute, {}))
        });
        if (!value) {
          return withoutRefinements;
        }
        var isExact = value.indexOf(":") === -1;
        if (isExact) {
          return withoutRefinements.addNumericRefinement(attribute, "=", Number(value));
        }
        var _value$split$map = value.split(":").map(parseFloat), _value$split$map2 = _slicedToArray7(_value$split$map, 2), min = _value$split$map2[0], max = _value$split$map2[1];
        var withMinRefinement = isFiniteNumber(min) ? withoutRefinements.addNumericRefinement(attribute, ">=", min) : withoutRefinements;
        var withMaxRefinement = isFiniteNumber(max) ? withMinRefinement.addNumericRefinement(attribute, "<=", max) : withMinRefinement;
        return withMaxRefinement;
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread20(_objectSpread20({}, renderState), {}, {
          numericMenu: _objectSpread20(_objectSpread20({}, renderState.numericMenu), {}, _defineProperty21({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref7) {
        var _this = this;
        var results = _ref7.results, state = _ref7.state, instantSearchInstance = _ref7.instantSearchInstance, helper = _ref7.helper, createURL = _ref7.createURL;
        if (!connectorState.refine) {
          connectorState.refine = function(facetValue) {
            var refinedState = getRefinedState(helper.state, attribute, facetValue);
            connectorState.sendEvent("click:internal", facetValue);
            helper.setState(refinedState).search();
          };
        }
        if (!connectorState.createURL) {
          connectorState.createURL = function(newState) {
            return function(facetValue) {
              return createURL(function(uiState) {
                return _this.getWidgetUiState(uiState, {
                  searchParameters: getRefinedState(newState, attribute, facetValue),
                  helper
                });
              });
            };
          };
        }
        if (!connectorState.sendEvent) {
          connectorState.sendEvent = createSendEvent({
            instantSearchInstance
          });
        }
        var hasNoResults = results ? results.nbHits === 0 : true;
        var preparedItems = prepareItems2(state);
        var allIsSelected = true;
        var _iterator = _createForOfIteratorHelper(preparedItems), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var item2 = _step.value;
            if (item2.isRefined && decodeURI(item2.value) !== "{}") {
              allIsSelected = false;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return {
          createURL: connectorState.createURL(state),
          items: transformItems(preparedItems, {
            results
          }),
          hasNoResults,
          canRefine: !(hasNoResults && allIsSelected),
          refine: connectorState.refine,
          sendEvent: connectorState.sendEvent,
          widgetParams
        };
      }
    };
  };
};
function isRefined(state, attribute, option) {
  var currentRefinements = state.getNumericRefinements(attribute);
  if (option.start !== void 0 && option.end !== void 0) {
    if (option.start === option.end) {
      return hasNumericRefinement(currentRefinements, "=", option.start);
    } else {
      return hasNumericRefinement(currentRefinements, ">=", option.start) && hasNumericRefinement(currentRefinements, "<=", option.end);
    }
  }
  if (option.start !== void 0) {
    return hasNumericRefinement(currentRefinements, ">=", option.start);
  }
  if (option.end !== void 0) {
    return hasNumericRefinement(currentRefinements, "<=", option.end);
  }
  if (option.start === void 0 && option.end === void 0) {
    return Object.keys(currentRefinements).every(function(operator) {
      return (currentRefinements[operator] || []).length === 0;
    });
  }
  return false;
}
function getRefinedState(state, attribute, facetValue) {
  var resolvedState = state;
  var refinedOption = JSON.parse(decodeURI(facetValue));
  var currentRefinements = resolvedState.getNumericRefinements(attribute);
  if (refinedOption.start === void 0 && refinedOption.end === void 0) {
    return resolvedState.removeNumericRefinement(attribute);
  }
  if (!isRefined(resolvedState, attribute, refinedOption)) {
    resolvedState = resolvedState.removeNumericRefinement(attribute);
  }
  if (refinedOption.start !== void 0 && refinedOption.end !== void 0) {
    if (refinedOption.start > refinedOption.end) {
      throw new Error("option.start should be > to option.end");
    }
    if (refinedOption.start === refinedOption.end) {
      if (hasNumericRefinement(currentRefinements, "=", refinedOption.start)) {
        resolvedState = resolvedState.removeNumericRefinement(attribute, "=", refinedOption.start);
      } else {
        resolvedState = resolvedState.addNumericRefinement(attribute, "=", refinedOption.start);
      }
      return resolvedState;
    }
  }
  if (refinedOption.start !== void 0) {
    if (hasNumericRefinement(currentRefinements, ">=", refinedOption.start)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute, ">=", refinedOption.start);
    }
    resolvedState = resolvedState.addNumericRefinement(attribute, ">=", refinedOption.start);
  }
  if (refinedOption.end !== void 0) {
    if (hasNumericRefinement(currentRefinements, "<=", refinedOption.end)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute, "<=", refinedOption.end);
    }
    resolvedState = resolvedState.addNumericRefinement(attribute, "<=", refinedOption.end);
  }
  if (typeof resolvedState.page === "number") {
    resolvedState.page = 0;
  }
  return resolvedState;
}
function hasNumericRefinement(currentRefinements, operator, value) {
  return currentRefinements[operator] !== void 0 && currentRefinements[operator].includes(value);
}
function removeEmptyRefinementsFromUiState3(indexUiState, attribute) {
  if (!indexUiState.numericMenu) {
    return indexUiState;
  }
  if (indexUiState.numericMenu[attribute] === ":") {
    delete indexUiState.numericMenu[attribute];
  }
  if (Object.keys(indexUiState.numericMenu).length === 0) {
    delete indexUiState.numericMenu;
  }
  return indexUiState;
}
var connectNumericMenu_default = connectNumericMenu;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/pagination/Paginator.js
function _typeof23(obj) {
  "@babel/helpers - typeof";
  return _typeof23 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof23(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i32 = 0; i32 < props.length; i32++) {
    var descriptor = props[i32];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey21(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty22(obj, key2, value) {
  key2 = _toPropertyKey21(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey21(arg) {
  var key2 = _toPrimitive21(arg, "string");
  return _typeof23(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive21(input, hint) {
  if (_typeof23(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof23(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var Paginator = function() {
  function Paginator2(params) {
    _classCallCheck(this, Paginator2);
    _defineProperty22(this, "currentPage", void 0);
    _defineProperty22(this, "total", void 0);
    _defineProperty22(this, "padding", void 0);
    this.currentPage = params.currentPage;
    this.total = params.total;
    this.padding = params.padding;
  }
  _createClass(Paginator2, [{
    key: "pages",
    value: function pages() {
      var total = this.total, currentPage = this.currentPage, padding = this.padding;
      if (total === 0)
        return [0];
      var totalDisplayedPages = this.nbPagesDisplayed(padding, total);
      if (totalDisplayedPages === total) {
        return range({
          end: total
        });
      }
      var paddingLeft = this.calculatePaddingLeft(currentPage, padding, total, totalDisplayedPages);
      var paddingRight = totalDisplayedPages - paddingLeft;
      var first = currentPage - paddingLeft;
      var last = currentPage + paddingRight;
      return range({
        start: first,
        end: last
      });
    }
  }, {
    key: "nbPagesDisplayed",
    value: function nbPagesDisplayed(padding, total) {
      return Math.min(2 * padding + 1, total);
    }
  }, {
    key: "calculatePaddingLeft",
    value: function calculatePaddingLeft(current, padding, total, totalDisplayedPages) {
      if (current <= padding) {
        return current;
      }
      if (current >= total - padding) {
        return totalDisplayedPages - (total - current);
      }
      return padding;
    }
  }, {
    key: "isLastPage",
    value: function isLastPage() {
      return this.currentPage === this.total - 1 || this.total === 0;
    }
  }, {
    key: "isFirstPage",
    value: function isFirstPage() {
      return this.currentPage === 0;
    }
  }]);
  return Paginator2;
}();
var Paginator_default = Paginator;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/pagination/connectPagination.js
function _typeof24(obj) {
  "@babel/helpers - typeof";
  return _typeof24 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof24(obj);
}
function ownKeys21(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread21(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys21(Object(source), true).forEach(function(key2) {
      _defineProperty23(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys21(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty23(obj, key2, value) {
  key2 = _toPropertyKey22(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey22(arg) {
  var key2 = _toPrimitive22(arg, "string");
  return _typeof24(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive22(input, hint) {
  if (_typeof24(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof24(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage11 = createDocumentationMessageGenerator({
  name: "pagination",
  connector: true
});
var connectPagination = function connectPagination2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage11());
  return function(widgetParams) {
    var _ref7 = widgetParams || {}, totalPages = _ref7.totalPages, _ref$padding = _ref7.padding, padding = _ref$padding === void 0 ? 3 : _ref$padding;
    var pager = new Paginator_default({
      currentPage: 0,
      total: 0,
      padding
    });
    var connectorState = {};
    function getMaxPage(_ref23) {
      var nbPages = _ref23.nbPages;
      return totalPages !== void 0 ? Math.min(totalPages, nbPages) : nbPages;
    }
    return {
      $$type: "ais.pagination",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread21(_objectSpread21({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread21(_objectSpread21({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref33) {
        var state = _ref33.state;
        unmountFn();
        return state.setQueryParameter("page", void 0);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref44) {
        var searchParameters = _ref44.searchParameters;
        var page = searchParameters.page || 0;
        if (!page) {
          return uiState;
        }
        return _objectSpread21(_objectSpread21({}, uiState), {}, {
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref52) {
        var uiState = _ref52.uiState;
        var page = uiState.page ? uiState.page - 1 : 0;
        return searchParameters.setQueryParameter("page", page);
      },
      getWidgetRenderState: function getWidgetRenderState(_ref63) {
        var results = _ref63.results, helper = _ref63.helper, state = _ref63.state, createURL = _ref63.createURL;
        if (!connectorState.refine) {
          connectorState.refine = function(page2) {
            helper.setPage(page2);
            helper.search();
          };
        }
        if (!connectorState.createURL) {
          connectorState.createURL = function(page2) {
            return createURL(function(uiState) {
              return _objectSpread21(_objectSpread21({}, uiState), {}, {
                page: page2 + 1
              });
            });
          };
        }
        var page = state.page || 0;
        var nbPages = getMaxPage(results || {
          nbPages: 0
        });
        pager.currentPage = page;
        pager.total = nbPages;
        return {
          createURL: connectorState.createURL,
          refine: connectorState.refine,
          canRefine: nbPages > 1,
          currentRefinement: page,
          nbHits: (results === null || results === void 0 ? void 0 : results.nbHits) || 0,
          nbPages,
          pages: results ? pager.pages() : [],
          isFirstPage: pager.isFirstPage(),
          isLastPage: pager.isLastPage(),
          widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread21(_objectSpread21({}, renderState), {}, {
          pagination: this.getWidgetRenderState(renderOptions)
        });
      }
    };
  };
};
var connectPagination_default = connectPagination;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/range/connectRange.js
function _typeof25(obj) {
  "@babel/helpers - typeof";
  return _typeof25 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof25(obj);
}
function ownKeys22(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread22(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys22(Object(source), true).forEach(function(key2) {
      _defineProperty24(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys22(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty24(obj, key2, value) {
  key2 = _toPropertyKey23(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey23(arg) {
  var key2 = _toPrimitive23(arg, "string");
  return _typeof25(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive23(input, hint) {
  if (_typeof25(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof25(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray8(arr, i32) {
  return _arrayWithHoles8(arr) || _iterableToArrayLimit8(arr, i32) || _unsupportedIterableToArray13(arr, i32) || _nonIterableRest8();
}
function _nonIterableRest8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray13(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray13(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray13(o26, minLen);
}
function _arrayLikeToArray13(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _iterableToArrayLimit8(arr, i32) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i32) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i32); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles8(arr) {
  if (Array.isArray(arr))
    return arr;
}
var withUsage12 = createDocumentationMessageGenerator({
  name: "range-input",
  connector: true
}, {
  name: "range-slider",
  connector: true
});
var $$type2 = "ais.range";
function toPrecision(_ref7) {
  var min = _ref7.min, max = _ref7.max, precision = _ref7.precision;
  var pow = Math.pow(10, precision);
  return {
    min: min ? Math.floor(min * pow) / pow : min,
    max: max ? Math.ceil(max * pow) / pow : max
  };
}
var connectRange = function connectRange2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage12());
  return function(widgetParams) {
    var _ref23 = widgetParams || {}, _ref2$attribute = _ref23.attribute, attribute = _ref2$attribute === void 0 ? "" : _ref2$attribute, minBound = _ref23.min, maxBound = _ref23.max, _ref2$precision = _ref23.precision, precision = _ref2$precision === void 0 ? 0 : _ref2$precision;
    if (!attribute) {
      throw new Error(withUsage12("The `attribute` option is required."));
    }
    if (isFiniteNumber(minBound) && isFiniteNumber(maxBound) && minBound > maxBound) {
      throw new Error(withUsage12("The `max` option can't be lower than `min`."));
    }
    var formatToNumber = function formatToNumber2(v7) {
      return Number(Number(v7).toFixed(precision));
    };
    var rangeFormatter = {
      from: function from(v7) {
        return v7.toLocaleString();
      },
      to: function to(v7) {
        return formatToNumber(v7).toLocaleString();
      }
    };
    var getRefinedState2 = function getRefinedState3(helper, currentRange, nextMin, nextMax) {
      var resolvedState = helper.state;
      var currentRangeMin = currentRange.min, currentRangeMax = currentRange.max;
      var _ref33 = resolvedState.getNumericRefinement(attribute, ">=") || [], _ref44 = _slicedToArray8(_ref33, 1), min = _ref44[0];
      var _ref52 = resolvedState.getNumericRefinement(attribute, "<=") || [], _ref63 = _slicedToArray8(_ref52, 1), max = _ref63[0];
      var isResetMin = nextMin === void 0 || nextMin === "";
      var isResetMax = nextMax === void 0 || nextMax === "";
      var _toPrecision = toPrecision({
        min: !isResetMin ? parseFloat(nextMin) : void 0,
        max: !isResetMax ? parseFloat(nextMax) : void 0,
        precision
      }), nextMinAsNumber = _toPrecision.min, nextMaxAsNumber = _toPrecision.max;
      var newNextMin;
      if (!isFiniteNumber(minBound) && currentRangeMin === nextMinAsNumber) {
        newNextMin = void 0;
      } else if (isFiniteNumber(minBound) && isResetMin) {
        newNextMin = minBound;
      } else {
        newNextMin = nextMinAsNumber;
      }
      var newNextMax;
      if (!isFiniteNumber(maxBound) && currentRangeMax === nextMaxAsNumber) {
        newNextMax = void 0;
      } else if (isFiniteNumber(maxBound) && isResetMax) {
        newNextMax = maxBound;
      } else {
        newNextMax = nextMaxAsNumber;
      }
      var isResetNewNextMin = newNextMin === void 0;
      var isGreaterThanCurrentRange = isFiniteNumber(currentRangeMin) && currentRangeMin <= newNextMin;
      var isMinValid = isResetNewNextMin || isFiniteNumber(newNextMin) && (!isFiniteNumber(currentRangeMin) || isGreaterThanCurrentRange);
      var isResetNewNextMax = newNextMax === void 0;
      var isLowerThanRange = isFiniteNumber(newNextMax) && currentRangeMax >= newNextMax;
      var isMaxValid = isResetNewNextMax || isFiniteNumber(newNextMax) && (!isFiniteNumber(currentRangeMax) || isLowerThanRange);
      var hasMinChange = min !== newNextMin;
      var hasMaxChange = max !== newNextMax;
      if ((hasMinChange || hasMaxChange) && isMinValid && isMaxValid) {
        resolvedState = resolvedState.removeNumericRefinement(attribute);
        if (isFiniteNumber(newNextMin)) {
          resolvedState = resolvedState.addNumericRefinement(attribute, ">=", newNextMin);
        }
        if (isFiniteNumber(newNextMax)) {
          resolvedState = resolvedState.addNumericRefinement(attribute, "<=", newNextMax);
        }
        return resolvedState.resetPage();
      }
      return null;
    };
    var createSendEvent7 = function createSendEvent8(instantSearchInstance) {
      return function() {
        if (arguments.length === 1) {
          instantSearchInstance.sendEventToInsights(arguments.length <= 0 ? void 0 : arguments[0]);
          return;
        }
      };
    };
    function _getCurrentRange(stats) {
      var min;
      if (isFiniteNumber(minBound)) {
        min = minBound;
      } else if (isFiniteNumber(stats.min)) {
        min = stats.min;
      } else {
        min = 0;
      }
      var max;
      if (isFiniteNumber(maxBound)) {
        max = maxBound;
      } else if (isFiniteNumber(stats.max)) {
        max = stats.max;
      } else {
        max = 0;
      }
      return toPrecision({
        min,
        max,
        precision
      });
    }
    function _getCurrentRefinement(helper) {
      var _ref7 = helper.getNumericRefinement(attribute, ">=") || [], _ref8 = _slicedToArray8(_ref7, 1), minValue = _ref8[0];
      var _ref9 = helper.getNumericRefinement(attribute, "<=") || [], _ref10 = _slicedToArray8(_ref9, 1), maxValue = _ref10[0];
      var min = isFiniteNumber(minValue) ? minValue : -Infinity;
      var max = isFiniteNumber(maxValue) ? maxValue : Infinity;
      return [min, max];
    }
    function _refine(helper, currentRange) {
      return function() {
        var _ref11 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [void 0, void 0], _ref12 = _slicedToArray8(_ref11, 2), nextMin = _ref12[0], nextMax = _ref12[1];
        var refinedState = getRefinedState2(helper, currentRange, nextMin, nextMax);
        if (refinedState) {
          helper.setState(refinedState).search();
        }
      };
    }
    return {
      $$type: $$type2,
      init: function init(initOptions) {
        renderFn(_objectSpread22(_objectSpread22({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread22(_objectSpread22({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread22(_objectSpread22({}, renderState), {}, {
          range: _objectSpread22(_objectSpread22({}, renderState.range), {}, _defineProperty24({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref13) {
        var results = _ref13.results, helper = _ref13.helper, instantSearchInstance = _ref13.instantSearchInstance;
        var facetsFromResults = results && results.disjunctiveFacets || [];
        var facet = find(facetsFromResults, function(facetResult) {
          return facetResult.name === attribute;
        });
        var stats = facet && facet.stats || {
          min: void 0,
          max: void 0
        };
        var currentRange = _getCurrentRange(stats);
        var start = _getCurrentRefinement(helper);
        var refine;
        if (!results) {
          refine = _refine(helper, {
            min: void 0,
            max: void 0
          });
        } else {
          refine = _refine(helper, currentRange);
        }
        return {
          refine,
          canRefine: currentRange.min !== currentRange.max,
          format: rangeFormatter,
          range: currentRange,
          sendEvent: createSendEvent7(instantSearchInstance),
          widgetParams: _objectSpread22(_objectSpread22({}, widgetParams), {}, {
            precision
          }),
          start
        };
      },
      dispose: function dispose(_ref14) {
        var state = _ref14.state;
        unmountFn();
        return state.removeDisjunctiveFacet(attribute).removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref15) {
        var searchParameters = _ref15.searchParameters;
        var _searchParameters$get = searchParameters.getNumericRefinements(attribute), _searchParameters$get2 = _searchParameters$get[">="], min = _searchParameters$get2 === void 0 ? [] : _searchParameters$get2, _searchParameters$get3 = _searchParameters$get["<="], max = _searchParameters$get3 === void 0 ? [] : _searchParameters$get3;
        if (min.length === 0 && max.length === 0) {
          return uiState;
        }
        return _objectSpread22(_objectSpread22({}, uiState), {}, {
          range: _objectSpread22(_objectSpread22({}, uiState.range), {}, _defineProperty24({}, attribute, "".concat(min, ":").concat(max)))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref16) {
        var uiState = _ref16.uiState;
        var widgetSearchParameters = searchParameters.addDisjunctiveFacet(attribute).setQueryParameters({
          numericRefinements: _objectSpread22(_objectSpread22({}, searchParameters.numericRefinements), {}, _defineProperty24({}, attribute, {}))
        });
        if (isFiniteNumber(minBound)) {
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, ">=", minBound);
        }
        if (isFiniteNumber(maxBound)) {
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, "<=", maxBound);
        }
        var value = uiState.range && uiState.range[attribute];
        if (!value || value.indexOf(":") === -1) {
          return widgetSearchParameters;
        }
        var _value$split$map = value.split(":").map(parseFloat), _value$split$map2 = _slicedToArray8(_value$split$map, 2), lowerBound = _value$split$map2[0], upperBound = _value$split$map2[1];
        if (isFiniteNumber(lowerBound) && (!isFiniteNumber(minBound) || minBound < lowerBound)) {
          widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, ">=");
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, ">=", lowerBound);
        }
        if (isFiniteNumber(upperBound) && (!isFiniteNumber(maxBound) || upperBound < maxBound)) {
          widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, "<=");
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, "<=", upperBound);
        }
        return widgetSearchParameters;
      }
    };
  };
};
var connectRange_default = connectRange;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/refinement-list/connectRefinementList.js
function _typeof26(obj) {
  "@babel/helpers - typeof";
  return _typeof26 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof26(obj);
}
var _excluded5 = ["name", "escapedValue"];
var _excluded23 = ["escapedValue", "value"];
function ownKeys23(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread23(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys23(Object(source), true).forEach(function(key2) {
      _defineProperty25(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys23(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty25(obj, key2, value) {
  key2 = _toPropertyKey24(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey24(arg) {
  var key2 = _toPrimitive24(arg, "string");
  return _typeof26(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive24(input, hint) {
  if (_typeof26(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof26(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties5(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose5(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose5(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
var withUsage13 = createDocumentationMessageGenerator({
  name: "refinement-list",
  connector: true
});
var DEFAULT_SORT3 = ["isRefined", "count:desc", "name:asc"];
var connectRefinementList = function connectRefinementList2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage13());
  return function(widgetParams) {
    var _ref7 = widgetParams || {}, attribute = _ref7.attribute, _ref$operator = _ref7.operator, operator = _ref$operator === void 0 ? "or" : _ref$operator, _ref$limit = _ref7.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$showMore = _ref7.showMore, showMore = _ref$showMore === void 0 ? false : _ref$showMore, _ref$showMoreLimit = _ref7.showMoreLimit, showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit, _ref$sortBy = _ref7.sortBy, sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT3 : _ref$sortBy, _ref$escapeFacetValue = _ref7.escapeFacetValues, escapeFacetValues = _ref$escapeFacetValue === void 0 ? true : _ref$escapeFacetValue, _ref$transformItems = _ref7.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attribute) {
      throw new Error(withUsage13("The `attribute` option is required."));
    }
    if (!/^(and|or)$/.test(operator)) {
      throw new Error(withUsage13('The `operator` must one of: `"and"`, `"or"` (got "'.concat(operator, '").')));
    }
    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage13("`showMoreLimit` should be greater than `limit`."));
    }
    var formatItems = function formatItems2(_ref23) {
      var label = _ref23.name, value = _ref23.escapedValue, item2 = _objectWithoutProperties5(_ref23, _excluded5);
      return _objectSpread23(_objectSpread23({}, item2), {}, {
        value,
        label,
        highlighted: label
      });
    };
    var lastResultsFromMainSearch;
    var lastItemsFromMainSearch = [];
    var hasExhaustiveItems = true;
    var triggerRefine;
    var sendEvent;
    var isShowingMore = false;
    var toggleShowMore = function toggleShowMore2() {
    };
    function cachedToggleShowMore() {
      toggleShowMore();
    }
    function createToggleShowMore(renderOptions, widget) {
      return function() {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }
    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }
    var searchForFacetValues = function searchForFacetValues2() {
      return function() {
      };
    };
    var createSearchForFacetValues = function createSearchForFacetValues2(helper, widget) {
      return function(renderOptions) {
        return function(query) {
          var instantSearchInstance = renderOptions.instantSearchInstance, searchResults = renderOptions.results;
          if (query === "" && lastItemsFromMainSearch) {
            renderFn(_objectSpread23(_objectSpread23({}, widget.getWidgetRenderState(_objectSpread23(_objectSpread23({}, renderOptions), {}, {
              results: lastResultsFromMainSearch
            }))), {}, {
              instantSearchInstance
            }), false);
          } else {
            var tags = {
              highlightPreTag: escapeFacetValues ? TAG_PLACEHOLDER.highlightPreTag : TAG_REPLACEMENT.highlightPreTag,
              highlightPostTag: escapeFacetValues ? TAG_PLACEHOLDER.highlightPostTag : TAG_REPLACEMENT.highlightPostTag
            };
            helper.searchForFacetValues(
              attribute,
              query,
              // We cap the `maxFacetHits` value to 100 because the Algolia API
              // doesn't support a greater number.
              // See https://www.algolia.com/doc/api-reference/api-parameters/maxFacetHits/
              Math.min(getLimit(), 100),
              tags
            ).then(function(results) {
              var facetValues = escapeFacetValues ? escapeFacets(results.facetHits) : results.facetHits;
              var normalizedFacetValues = transformItems(facetValues.map(function(_ref33) {
                var escapedValue = _ref33.escapedValue, value = _ref33.value, item2 = _objectWithoutProperties5(_ref33, _excluded23);
                return _objectSpread23(_objectSpread23({}, item2), {}, {
                  value: escapedValue,
                  label: value
                });
              }), {
                results: searchResults
              });
              renderFn(_objectSpread23(_objectSpread23({}, widget.getWidgetRenderState(_objectSpread23(_objectSpread23({}, renderOptions), {}, {
                results: lastResultsFromMainSearch
              }))), {}, {
                items: normalizedFacetValues,
                canToggleShowMore: false,
                canRefine: true,
                isFromSearch: true,
                instantSearchInstance
              }), false);
            });
          }
        };
      };
    };
    return {
      $$type: "ais.refinementList",
      init: function init(initOptions) {
        renderFn(_objectSpread23(_objectSpread23({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread23(_objectSpread23({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread23(_objectSpread23({}, renderState), {}, {
          refinementList: _objectSpread23(_objectSpread23({}, renderState.refinementList), {}, _defineProperty25({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var _this = this;
        var results = renderOptions.results, state = renderOptions.state, _createURL = renderOptions.createURL, instantSearchInstance = renderOptions.instantSearchInstance, helper = renderOptions.helper;
        var items = [];
        var facetValues = [];
        if (!sendEvent || !triggerRefine || !searchForFacetValues) {
          sendEvent = createSendEventForFacet({
            instantSearchInstance,
            helper,
            attribute,
            widgetType: this.$$type
          });
          triggerRefine = function triggerRefine2(facetValue) {
            sendEvent("click:internal", facetValue);
            helper.toggleFacetRefinement(attribute, facetValue).search();
          };
          searchForFacetValues = createSearchForFacetValues(helper, this);
        }
        if (results) {
          var values = results.getFacetValues(attribute, {
            sortBy,
            facetOrdering: sortBy === DEFAULT_SORT3
          });
          facetValues = values && Array.isArray(values) ? values : [];
          items = transformItems(facetValues.slice(0, getLimit()).map(formatItems), {
            results
          });
          var maxValuesPerFacetConfig = state.maxValuesPerFacet;
          var currentLimit = getLimit();
          hasExhaustiveItems = maxValuesPerFacetConfig > currentLimit ? facetValues.length <= currentLimit : facetValues.length < currentLimit;
          lastResultsFromMainSearch = results;
          lastItemsFromMainSearch = items;
          if (renderOptions.results) {
            toggleShowMore = createToggleShowMore(renderOptions, this);
          }
        }
        var searchFacetValues = searchForFacetValues && searchForFacetValues(renderOptions);
        var canShowLess = isShowingMore && lastItemsFromMainSearch.length > limit;
        var canShowMore = showMore && !hasExhaustiveItems;
        var canToggleShowMore = canShowLess || canShowMore;
        return {
          createURL: function createURL(facetValue) {
            return _createURL(function(uiState) {
              return _this.getWidgetUiState(uiState, {
                searchParameters: state.resetPage().toggleFacetRefinement(attribute, facetValue),
                helper
              });
            });
          },
          items,
          refine: triggerRefine,
          searchForItems: searchFacetValues,
          isFromSearch: false,
          canRefine: items.length > 0,
          widgetParams,
          isShowingMore,
          canToggleShowMore,
          toggleShowMore: cachedToggleShowMore,
          sendEvent,
          hasExhaustiveItems
        };
      },
      dispose: function dispose(_ref44) {
        var state = _ref44.state;
        unmountFn();
        var withoutMaxValuesPerFacet = state.setQueryParameter("maxValuesPerFacet", void 0);
        if (operator === "and") {
          return withoutMaxValuesPerFacet.removeFacet(attribute);
        }
        return withoutMaxValuesPerFacet.removeDisjunctiveFacet(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref52) {
        var searchParameters = _ref52.searchParameters;
        var values = operator === "or" ? searchParameters.getDisjunctiveRefinements(attribute) : searchParameters.getConjunctiveRefinements(attribute);
        return removeEmptyRefinementsFromUiState4(_objectSpread23(_objectSpread23({}, uiState), {}, {
          refinementList: _objectSpread23(_objectSpread23({}, uiState.refinementList), {}, _defineProperty25({}, attribute, values))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref63) {
        var uiState = _ref63.uiState;
        var isDisjunctive = operator === "or";
        if (searchParameters.isHierarchicalFacet(attribute)) {
          true ? _warning(false, 'RefinementList: Attribute "'.concat(attribute, '" is already used by another widget applying hierarchical faceting.\nAs this is not supported, please make sure to remove this other widget or this RefinementList widget will not work at all.')) : void 0;
          return searchParameters;
        }
        if (isDisjunctive && searchParameters.isConjunctiveFacet(attribute) || !isDisjunctive && searchParameters.isDisjunctiveFacet(attribute)) {
          true ? _warning(false, 'RefinementList: Attribute "'.concat(attribute, '" is used by another refinement list with a different operator.\nAs this is not supported, please make sure to only use this attribute with one of the two operators.')) : void 0;
          return searchParameters;
        }
        var values = uiState.refinementList && uiState.refinementList[attribute];
        var withFacetConfiguration = isDisjunctive ? searchParameters.addDisjunctiveFacet(attribute).removeDisjunctiveFacetRefinement(attribute) : searchParameters.addFacet(attribute).removeFacetRefinement(attribute);
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter("maxValuesPerFacet", nextMaxValuesPerFacet);
        if (!values) {
          var key2 = isDisjunctive ? "disjunctiveFacetsRefinements" : "facetsRefinements";
          return withMaxValuesPerFacet.setQueryParameters(_defineProperty25({}, key2, _objectSpread23(_objectSpread23({}, withMaxValuesPerFacet[key2]), {}, _defineProperty25({}, attribute, []))));
        }
        return values.reduce(function(parameters, value) {
          return isDisjunctive ? parameters.addDisjunctiveFacetRefinement(attribute, value) : parameters.addFacetRefinement(attribute, value);
        }, withMaxValuesPerFacet);
      }
    };
  };
};
function removeEmptyRefinementsFromUiState4(indexUiState, attribute) {
  if (!indexUiState.refinementList) {
    return indexUiState;
  }
  if (!indexUiState.refinementList[attribute] || indexUiState.refinementList[attribute].length === 0) {
    delete indexUiState.refinementList[attribute];
  }
  if (Object.keys(indexUiState.refinementList).length === 0) {
    delete indexUiState.refinementList;
  }
  return indexUiState;
}
var connectRefinementList_default = connectRefinementList;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/related-products/connectRelatedProducts.js
var withUsage14 = createDocumentationMessageGenerator({
  name: "related-products",
  connector: true
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/search-box/connectSearchBox.js
function _typeof27(obj) {
  "@babel/helpers - typeof";
  return _typeof27 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof27(obj);
}
function ownKeys24(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread24(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys24(Object(source), true).forEach(function(key2) {
      _defineProperty26(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys24(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty26(obj, key2, value) {
  key2 = _toPropertyKey25(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey25(arg) {
  var key2 = _toPrimitive25(arg, "string");
  return _typeof27(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive25(input, hint) {
  if (_typeof27(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof27(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage15 = createDocumentationMessageGenerator({
  name: "search-box",
  connector: true
});
var defaultQueryHook = function defaultQueryHook2(query, hook) {
  return hook(query);
};
var connectSearchBox = function connectSearchBox2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage15());
  return function(widgetParams) {
    var _ref7 = widgetParams || {}, _ref$queryHook = _ref7.queryHook, queryHook = _ref$queryHook === void 0 ? defaultQueryHook : _ref$queryHook;
    var _refine;
    var _clear;
    return {
      $$type: "ais.searchBox",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread24(_objectSpread24({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread24(_objectSpread24({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref23) {
        var state = _ref23.state;
        unmountFn();
        return state.setQueryParameter("query", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread24(_objectSpread24({}, renderState), {}, {
          searchBox: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref33) {
        var helper = _ref33.helper, instantSearchInstance = _ref33.instantSearchInstance, state = _ref33.state;
        if (!_refine) {
          _refine = function _refine2(query) {
            queryHook(query, function(q2) {
              return helper.setQuery(q2).search();
            });
          };
          _clear = function _clear2() {
            helper.setQuery("").search();
          };
        }
        return {
          query: state.query || "",
          refine: _refine,
          clear: _clear,
          widgetParams,
          isSearchStalled: instantSearchInstance.status === "stalled"
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref44) {
        var searchParameters = _ref44.searchParameters;
        var query = searchParameters.query || "";
        if (query === "" || uiState && uiState.query === query) {
          return uiState;
        }
        return _objectSpread24(_objectSpread24({}, uiState), {}, {
          query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref52) {
        var uiState = _ref52.uiState;
        return searchParameters.setQueryParameter("query", uiState.query || "");
      }
    };
  };
};
var connectSearchBox_default = connectSearchBox;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/sort-by/connectSortBy.js
function _typeof28(obj) {
  "@babel/helpers - typeof";
  return _typeof28 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof28(obj);
}
function ownKeys25(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread25(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys25(Object(source), true).forEach(function(key2) {
      _defineProperty27(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys25(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty27(obj, key2, value) {
  key2 = _toPropertyKey26(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey26(arg) {
  var key2 = _toPrimitive26(arg, "string");
  return _typeof28(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive26(input, hint) {
  if (_typeof28(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof28(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage16 = createDocumentationMessageGenerator({
  name: "sort-by",
  connector: true
});
var connectSortBy = function connectSortBy2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage16());
  var connectorState = {};
  return function(widgetParams) {
    var _ref7 = widgetParams || {}, items = _ref7.items, _ref$transformItems = _ref7.transformItems, transformItems = _ref$transformItems === void 0 ? function(x3) {
      return x3;
    } : _ref$transformItems;
    if (!Array.isArray(items)) {
      throw new Error(withUsage16("The `items` option expects an array of objects."));
    }
    return {
      $$type: "ais.sortBy",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        var widgetRenderState = this.getWidgetRenderState(initOptions);
        var currentIndex = widgetRenderState.currentRefinement;
        var isCurrentIndexInItems = find(items, function(item2) {
          return item2.value === currentIndex;
        });
        true ? _warning(isCurrentIndexInItems !== void 0, 'The index named "'.concat(currentIndex, '" is not listed in the `items` of `sortBy`.')) : void 0;
        renderFn(_objectSpread25(_objectSpread25({}, widgetRenderState), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread25(_objectSpread25({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref23) {
        var state = _ref23.state;
        unmountFn();
        return connectorState.initialIndex ? state.setIndex(connectorState.initialIndex) : state;
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread25(_objectSpread25({}, renderState), {}, {
          sortBy: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref33) {
        var results = _ref33.results, helper = _ref33.helper, state = _ref33.state, parent = _ref33.parent;
        if (!connectorState.initialIndex && parent) {
          connectorState.initialIndex = parent.getIndexName();
        }
        if (!connectorState.setIndex) {
          connectorState.setIndex = function(indexName) {
            helper.setIndex(indexName).search();
          };
        }
        var hasNoResults = results ? results.nbHits === 0 : true;
        return {
          currentRefinement: state.index,
          options: transformItems(items, {
            results
          }),
          refine: connectorState.setIndex,
          hasNoResults,
          canRefine: !hasNoResults && items.length > 0,
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref44) {
        var searchParameters = _ref44.searchParameters;
        var currentIndex = searchParameters.index;
        return _objectSpread25(_objectSpread25({}, uiState), {}, {
          sortBy: currentIndex !== connectorState.initialIndex ? currentIndex : void 0
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref52) {
        var uiState = _ref52.uiState;
        return searchParameters.setQueryParameter("index", uiState.sortBy || connectorState.initialIndex || searchParameters.index);
      }
    };
  };
};
var connectSortBy_default = connectSortBy;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/rating-menu/connectRatingMenu.js
function _typeof29(obj) {
  "@babel/helpers - typeof";
  return _typeof29 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof29(obj);
}
function _toConsumableArray7(arr) {
  return _arrayWithoutHoles7(arr) || _iterableToArray7(arr) || _unsupportedIterableToArray14(arr) || _nonIterableSpread7();
}
function _nonIterableSpread7() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray7(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles7(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray14(arr);
}
function ownKeys26(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread26(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys26(Object(source), true).forEach(function(key2) {
      _defineProperty28(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys26(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty28(obj, key2, value) {
  key2 = _toPropertyKey27(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey27(arg) {
  var key2 = _toPrimitive27(arg, "string");
  return _typeof29(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive27(input, hint) {
  if (_typeof29(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof29(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray9(arr, i32) {
  return _arrayWithHoles9(arr) || _iterableToArrayLimit9(arr, i32) || _unsupportedIterableToArray14(arr, i32) || _nonIterableRest9();
}
function _nonIterableRest9() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray14(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray14(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray14(o26, minLen);
}
function _arrayLikeToArray14(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _iterableToArrayLimit9(arr, i32) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i32) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i32); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles9(arr) {
  if (Array.isArray(arr))
    return arr;
}
var withUsage17 = createDocumentationMessageGenerator({
  name: "rating-menu",
  connector: true
});
var $$type3 = "ais.ratingMenu";
var MAX_VALUES_PER_FACET_API_LIMIT = 1e3;
var STEP = 1;
var createSendEvent3 = function createSendEvent4(_ref7) {
  var instantSearchInstance = _ref7.instantSearchInstance, helper = _ref7.helper, getRefinedStar = _ref7.getRefinedStar, attribute = _ref7.attribute;
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1) {
      instantSearchInstance.sendEventToInsights(args[0]);
      return;
    }
    var facetValue = args[1], _args$ = args[2], eventName = _args$ === void 0 ? "Filter Applied" : _args$;
    var _args$0$split = args[0].split(":"), _args$0$split2 = _slicedToArray9(_args$0$split, 2), eventType = _args$0$split2[0], eventModifier = _args$0$split2[1];
    if (eventType !== "click") {
      return;
    }
    var isRefined2 = getRefinedStar() === Number(facetValue);
    if (!isRefined2) {
      instantSearchInstance.sendEventToInsights({
        insightsMethod: "clickedFilters",
        widgetType: $$type3,
        eventType,
        eventModifier,
        payload: {
          eventName,
          index: helper.getIndex(),
          filters: ["".concat(attribute, ">=").concat(facetValue)]
        },
        attribute
      });
    }
  };
};
var connectRatingMenu = function connectRatingMenu2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage17());
  return function(widgetParams) {
    var _ref23 = widgetParams || {}, attribute = _ref23.attribute, _ref2$max = _ref23.max, max = _ref2$max === void 0 ? 5 : _ref2$max;
    var sendEvent;
    if (!attribute) {
      throw new Error(withUsage17("The `attribute` option is required."));
    }
    var _getRefinedStar = function getRefinedStar(state) {
      var _values$;
      var values = state.getNumericRefinements(attribute);
      if (!((_values$ = values[">="]) !== null && _values$ !== void 0 && _values$.length)) {
        return void 0;
      }
      return values[">="][0];
    };
    var getFacetsMaxDecimalPlaces = function getFacetsMaxDecimalPlaces2(facetResults) {
      var maxDecimalPlaces = 0;
      facetResults.forEach(function(facetResult) {
        var _facetResult$name$spl = facetResult.name.split("."), _facetResult$name$spl2 = _slicedToArray9(_facetResult$name$spl, 2), _facetResult$name$spl3 = _facetResult$name$spl2[1], decimal = _facetResult$name$spl3 === void 0 ? "" : _facetResult$name$spl3;
        maxDecimalPlaces = Math.max(maxDecimalPlaces, decimal.length);
      });
      return maxDecimalPlaces;
    };
    var getFacetValuesWarningMessage = function getFacetValuesWarningMessage2(_ref33) {
      var maxDecimalPlaces = _ref33.maxDecimalPlaces, maxFacets = _ref33.maxFacets, maxValuesPerFacet = _ref33.maxValuesPerFacet;
      var maxDecimalPlacesInRange = Math.max(0, Math.floor(Math.log10(MAX_VALUES_PER_FACET_API_LIMIT / max)));
      var maxFacetsInRange = Math.min(MAX_VALUES_PER_FACET_API_LIMIT, Math.pow(10, maxDecimalPlacesInRange) * max);
      var solutions = [];
      if (maxFacets > MAX_VALUES_PER_FACET_API_LIMIT) {
        solutions.push('- Update your records to lower the precision of the values in the "'.concat(attribute, '" attribute (for example: ').concat(5.123456789.toPrecision(maxDecimalPlaces + 1), " to ").concat(5.123456789.toPrecision(maxDecimalPlacesInRange + 1), ")"));
      }
      if (maxValuesPerFacet < maxFacetsInRange) {
        solutions.push("- Increase the maximum number of facet values to ".concat(maxFacetsInRange, ' using the "configure" widget ').concat(createDocumentationLink({
          name: "configure"
        }), ' and the "maxValuesPerFacet" parameter https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/'));
      }
      return "The ".concat(attribute, " attribute can have ").concat(maxFacets, " different values (0 to ").concat(max, " with a maximum of ").concat(maxDecimalPlaces, " decimals = ").concat(maxFacets, ") but you retrieved only ").concat(maxValuesPerFacet, " facet values. Therefore the number of results that match the refinements can be incorrect.\n    ").concat(solutions.length ? "To resolve this problem you can:\n".concat(solutions.join("\n")) : "");
    };
    function getRefinedState2(state, facetValue) {
      var isRefined2 = _getRefinedStar(state) === Number(facetValue);
      var emptyState = state.resetPage().removeNumericRefinement(attribute);
      if (!isRefined2) {
        return emptyState.addNumericRefinement(attribute, "<=", max).addNumericRefinement(attribute, ">=", Number(facetValue));
      }
      return emptyState;
    }
    var toggleRefinement = function toggleRefinement2(helper, facetValue) {
      sendEvent("click:internal", facetValue);
      helper.setState(getRefinedState2(helper.state, facetValue)).search();
    };
    var connectorState = {
      toggleRefinementFactory: function toggleRefinementFactory(helper) {
        return toggleRefinement.bind(null, helper);
      },
      createURLFactory: function createURLFactory(_ref44) {
        var state = _ref44.state, createURL = _ref44.createURL, getWidgetUiState = _ref44.getWidgetUiState, helper = _ref44.helper;
        return function(value) {
          return createURL(function(uiState) {
            return getWidgetUiState(uiState, {
              searchParameters: getRefinedState2(state, value),
              helper
            });
          });
        };
      }
    };
    return {
      $$type: $$type3,
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread26(_objectSpread26({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread26(_objectSpread26({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread26(_objectSpread26({}, renderState), {}, {
          ratingMenu: _objectSpread26(_objectSpread26({}, renderState.ratingMenu), {}, _defineProperty28({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref52) {
        var helper = _ref52.helper, results = _ref52.results, state = _ref52.state, instantSearchInstance = _ref52.instantSearchInstance, createURL = _ref52.createURL;
        var facetValues = [];
        if (!sendEvent) {
          sendEvent = createSendEvent3({
            instantSearchInstance,
            helper,
            getRefinedStar: function getRefinedStar() {
              return _getRefinedStar(helper.state);
            },
            attribute
          });
        }
        var refinementIsApplied = false;
        var totalCount = 0;
        var facetResults = results === null || results === void 0 ? void 0 : results.getFacetValues(attribute, {});
        if (results && facetResults) {
          var maxValuesPerFacet = facetResults.length;
          var maxDecimalPlaces = getFacetsMaxDecimalPlaces(facetResults);
          var maxFacets = Math.pow(10, maxDecimalPlaces) * max;
          true ? _warning(maxFacets <= maxValuesPerFacet || Boolean(results.__isArtificial), getFacetValuesWarningMessage({
            maxDecimalPlaces,
            maxFacets,
            maxValuesPerFacet
          })) : void 0;
          var refinedStar = _getRefinedStar(state);
          var _loop = function _loop2(star2) {
            var isRefined2 = refinedStar === star2;
            refinementIsApplied = refinementIsApplied || isRefined2;
            var count = facetResults.filter(function(f15) {
              return Number(f15.name) >= star2 && Number(f15.name) <= max;
            }).map(function(f15) {
              return f15.count;
            }).reduce(function(sum, current) {
              return sum + current;
            }, 0);
            totalCount += count;
            if (refinedStar && !isRefined2 && count === 0) {
              return "continue";
            }
            var stars = _toConsumableArray7(new Array(Math.floor(max / STEP))).map(function(_v, i32) {
              return i32 * STEP < star2;
            });
            facetValues.push({
              stars,
              name: String(star2),
              label: String(star2),
              value: String(star2),
              count,
              isRefined: isRefined2
            });
          };
          for (var star = STEP; star < max; star += STEP) {
            var _ret = _loop(star);
            if (_ret === "continue")
              continue;
          }
        }
        facetValues = facetValues.reverse();
        var hasNoResults = results ? results.nbHits === 0 : true;
        return {
          items: facetValues,
          hasNoResults,
          canRefine: (!hasNoResults || refinementIsApplied) && totalCount > 0,
          refine: connectorState.toggleRefinementFactory(helper),
          sendEvent,
          createURL: connectorState.createURLFactory({
            state,
            createURL,
            helper,
            getWidgetUiState: this.getWidgetUiState
          }),
          widgetParams
        };
      },
      dispose: function dispose(_ref63) {
        var state = _ref63.state;
        unmountFn();
        return state.removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref7) {
        var searchParameters = _ref7.searchParameters;
        var value = _getRefinedStar(searchParameters);
        return removeEmptyRefinementsFromUiState5(_objectSpread26(_objectSpread26({}, uiState), {}, {
          ratingMenu: _objectSpread26(_objectSpread26({}, uiState.ratingMenu), {}, _defineProperty28({}, attribute, typeof value === "number" ? value : void 0))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref8) {
        var uiState = _ref8.uiState;
        var value = uiState.ratingMenu && uiState.ratingMenu[attribute];
        var withDisjunctiveFacet = searchParameters.addDisjunctiveFacet(attribute).removeNumericRefinement(attribute).removeDisjunctiveFacetRefinement(attribute);
        if (!value) {
          return withDisjunctiveFacet.setQueryParameters({
            numericRefinements: _objectSpread26(_objectSpread26({}, withDisjunctiveFacet.numericRefinements), {}, _defineProperty28({}, attribute, {}))
          });
        }
        return withDisjunctiveFacet.addNumericRefinement(attribute, "<=", max).addNumericRefinement(attribute, ">=", value);
      }
    };
  };
};
function removeEmptyRefinementsFromUiState5(indexUiState, attribute) {
  if (!indexUiState.ratingMenu) {
    return indexUiState;
  }
  if (typeof indexUiState.ratingMenu[attribute] !== "number") {
    delete indexUiState.ratingMenu[attribute];
  }
  if (Object.keys(indexUiState.ratingMenu).length === 0) {
    delete indexUiState.ratingMenu;
  }
  return indexUiState;
}
var connectRatingMenu_default = connectRatingMenu;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/stats/connectStats.js
function _typeof30(obj) {
  "@babel/helpers - typeof";
  return _typeof30 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof30(obj);
}
function ownKeys27(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread27(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys27(Object(source), true).forEach(function(key2) {
      _defineProperty29(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys27(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty29(obj, key2, value) {
  key2 = _toPropertyKey28(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey28(arg) {
  var key2 = _toPrimitive28(arg, "string");
  return _typeof30(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive28(input, hint) {
  if (_typeof30(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof30(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage18 = createDocumentationMessageGenerator({
  name: "stats",
  connector: true
});
var connectStats = function connectStats2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage18());
  return function(widgetParams) {
    return {
      $$type: "ais.stats",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread27(_objectSpread27({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread27(_objectSpread27({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread27(_objectSpread27({}, renderState), {}, {
          stats: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref7) {
        var results = _ref7.results, state = _ref7.state;
        if (!results) {
          return {
            hitsPerPage: state.hitsPerPage,
            nbHits: 0,
            nbSortedHits: void 0,
            areHitsSorted: false,
            nbPages: 0,
            page: state.page || 0,
            processingTimeMS: -1,
            query: state.query || "",
            widgetParams
          };
        }
        return {
          hitsPerPage: results.hitsPerPage,
          nbHits: results.nbHits,
          nbSortedHits: results.nbSortedHits,
          areHitsSorted: typeof results.appliedRelevancyStrictness !== "undefined" && results.appliedRelevancyStrictness > 0 && results.nbSortedHits !== results.nbHits,
          nbPages: results.nbPages,
          page: results.page,
          processingTimeMS: results.processingTimeMS,
          query: results.query,
          widgetParams
        };
      }
    };
  };
};
var connectStats_default = connectStats;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/toggle-refinement/connectToggleRefinement.js
function _typeof31(obj) {
  "@babel/helpers - typeof";
  return _typeof31 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof31(obj);
}
function ownKeys28(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread28(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys28(Object(source), true).forEach(function(key2) {
      _defineProperty30(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys28(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty30(obj, key2, value) {
  key2 = _toPropertyKey29(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey29(arg) {
  var key2 = _toPrimitive29(arg, "string");
  return _typeof31(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive29(input, hint) {
  if (_typeof31(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof31(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray10(arr, i32) {
  return _arrayWithHoles10(arr) || _iterableToArrayLimit10(arr, i32) || _unsupportedIterableToArray15(arr, i32) || _nonIterableRest10();
}
function _nonIterableRest10() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray15(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray15(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray15(o26, minLen);
}
function _arrayLikeToArray15(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _iterableToArrayLimit10(arr, i32) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i32) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i32); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles10(arr) {
  if (Array.isArray(arr))
    return arr;
}
var withUsage19 = createDocumentationMessageGenerator({
  name: "toggle-refinement",
  connector: true
});
var $$type4 = "ais.toggleRefinement";
var createSendEvent5 = function createSendEvent6(_ref7) {
  var instantSearchInstance = _ref7.instantSearchInstance, helper = _ref7.helper, attribute = _ref7.attribute, on = _ref7.on;
  var sendEventForToggle = function sendEventForToggle2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1) {
      instantSearchInstance.sendEventToInsights(args[0]);
      return;
    }
    var isRefined2 = args[1], _args$ = args[2], eventName = _args$ === void 0 ? "Filter Applied" : _args$;
    var _args$0$split = args[0].split(":"), _args$0$split2 = _slicedToArray10(_args$0$split, 2), eventType = _args$0$split2[0], eventModifier = _args$0$split2[1];
    if (eventType !== "click" || on === void 0) {
      return;
    }
    if (!isRefined2) {
      instantSearchInstance.sendEventToInsights({
        insightsMethod: "clickedFilters",
        widgetType: $$type4,
        eventType,
        eventModifier,
        payload: {
          eventName,
          index: helper.getIndex(),
          filters: on.map(function(value) {
            return "".concat(attribute, ":").concat(value);
          })
        },
        attribute
      });
    }
  };
  return sendEventForToggle;
};
var connectToggleRefinement = function connectToggleRefinement2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage19());
  return function(widgetParams) {
    var _ref23 = widgetParams || {}, attribute = _ref23.attribute, _ref2$on = _ref23.on, userOn = _ref2$on === void 0 ? true : _ref2$on, userOff = _ref23.off;
    if (!attribute) {
      throw new Error(withUsage19("The `attribute` option is required."));
    }
    var hasAnOffValue = userOff !== void 0;
    var on = toArray(userOn).map(escapeFacetValue);
    var off = hasAnOffValue ? toArray(userOff).map(escapeFacetValue) : void 0;
    var sendEvent;
    var toggleRefinementFactory = function toggleRefinementFactory2(helper) {
      return function() {
        var _ref33 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
          isRefined: false
        }, isRefined2 = _ref33.isRefined;
        if (!isRefined2) {
          sendEvent("click:internal", isRefined2);
          if (hasAnOffValue) {
            off.forEach(function(v7) {
              return helper.removeDisjunctiveFacetRefinement(attribute, v7);
            });
          }
          on.forEach(function(v7) {
            return helper.addDisjunctiveFacetRefinement(attribute, v7);
          });
        } else {
          on.forEach(function(v7) {
            return helper.removeDisjunctiveFacetRefinement(attribute, v7);
          });
          if (hasAnOffValue) {
            off.forEach(function(v7) {
              return helper.addDisjunctiveFacetRefinement(attribute, v7);
            });
          }
        }
        helper.search();
      };
    };
    var connectorState = {
      createURLFactory: function createURLFactory(isRefined2, _ref44) {
        var state = _ref44.state, createURL = _ref44.createURL, getWidgetUiState = _ref44.getWidgetUiState, helper = _ref44.helper;
        return function() {
          state = state.resetPage();
          var valuesToRemove = isRefined2 ? on : off;
          if (valuesToRemove) {
            valuesToRemove.forEach(function(v7) {
              state = state.removeDisjunctiveFacetRefinement(attribute, v7);
            });
          }
          var valuesToAdd = isRefined2 ? off : on;
          if (valuesToAdd) {
            valuesToAdd.forEach(function(v7) {
              state = state.addDisjunctiveFacetRefinement(attribute, v7);
            });
          }
          return createURL(function(uiState) {
            return getWidgetUiState(uiState, {
              searchParameters: state,
              helper
            });
          });
        };
      }
    };
    return {
      $$type: $$type4,
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread28(_objectSpread28({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread28(_objectSpread28({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref52) {
        var state = _ref52.state;
        unmountFn();
        return state.removeDisjunctiveFacet(attribute);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread28(_objectSpread28({}, renderState), {}, {
          toggleRefinement: _objectSpread28(_objectSpread28({}, renderState.toggleRefinement), {}, _defineProperty30({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref63) {
        var state = _ref63.state, helper = _ref63.helper, results = _ref63.results, createURL = _ref63.createURL, instantSearchInstance = _ref63.instantSearchInstance;
        var isRefined2 = results ? on.every(function(v7) {
          return state.isDisjunctiveFacetRefined(attribute, v7);
        }) : on.every(function(v7) {
          return state.isDisjunctiveFacetRefined(attribute, v7);
        });
        var onFacetValue = {
          isRefined: isRefined2,
          count: 0
        };
        var offFacetValue = {
          isRefined: hasAnOffValue && !isRefined2,
          count: 0
        };
        if (results) {
          var offValue = toArray(off || false);
          var allFacetValues = results.getFacetValues(attribute, {}) || [];
          var onData = on.map(function(v7) {
            return find(allFacetValues, function(_ref7) {
              var escapedValue = _ref7.escapedValue;
              return escapedValue === escapeFacetValue(String(v7));
            });
          }).filter(function(v7) {
            return v7 !== void 0;
          });
          var offData = hasAnOffValue ? offValue.map(function(v7) {
            return find(allFacetValues, function(_ref8) {
              var escapedValue = _ref8.escapedValue;
              return escapedValue === escapeFacetValue(String(v7));
            });
          }).filter(function(v7) {
            return v7 !== void 0;
          }) : [];
          onFacetValue = {
            isRefined: onData.length ? onData.every(function(v7) {
              return v7.isRefined;
            }) : false,
            count: onData.reduce(function(acc, v7) {
              return acc + v7.count;
            }, 0) || null
          };
          offFacetValue = {
            isRefined: offData.length ? offData.every(function(v7) {
              return v7.isRefined;
            }) : false,
            count: offData.reduce(function(acc, v7) {
              return acc + v7.count;
            }, 0) || allFacetValues.reduce(function(total, _ref9) {
              var count = _ref9.count;
              return total + count;
            }, 0)
          };
        }
        if (!sendEvent) {
          sendEvent = createSendEvent5({
            instantSearchInstance,
            attribute,
            on,
            helper
          });
        }
        var nextRefinement = isRefined2 ? offFacetValue : onFacetValue;
        return {
          value: {
            name: attribute,
            isRefined: isRefined2,
            count: results ? nextRefinement.count : null,
            onFacetValue,
            offFacetValue
          },
          createURL: connectorState.createURLFactory(isRefined2, {
            state,
            createURL,
            helper,
            getWidgetUiState: this.getWidgetUiState
          }),
          sendEvent,
          canRefine: Boolean(results ? nextRefinement.count : null),
          refine: toggleRefinementFactory(helper),
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref10) {
        var searchParameters = _ref10.searchParameters;
        var isRefined2 = on && on.every(function(v7) {
          return searchParameters.isDisjunctiveFacetRefined(attribute, v7);
        });
        if (!isRefined2) {
          var _uiState$toggle;
          (_uiState$toggle = uiState.toggle) === null || _uiState$toggle === void 0 ? true : delete _uiState$toggle[attribute];
          return uiState;
        }
        return _objectSpread28(_objectSpread28({}, uiState), {}, {
          toggle: _objectSpread28(_objectSpread28({}, uiState.toggle), {}, _defineProperty30({}, attribute, isRefined2))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref11) {
        var uiState = _ref11.uiState;
        if (searchParameters.isHierarchicalFacet(attribute) || searchParameters.isConjunctiveFacet(attribute)) {
          true ? _warning(false, 'ToggleRefinement: Attribute "'.concat(attribute, '" is already used by another widget of a different type.\nAs this is not supported, please make sure to remove this other widget or this ToggleRefinement widget will not work at all.')) : void 0;
          return searchParameters;
        }
        var withFacetConfiguration = searchParameters.addDisjunctiveFacet(attribute).removeDisjunctiveFacetRefinement(attribute);
        var isRefined2 = Boolean(uiState.toggle && uiState.toggle[attribute]);
        if (isRefined2) {
          if (on) {
            on.forEach(function(v7) {
              withFacetConfiguration = withFacetConfiguration.addDisjunctiveFacetRefinement(attribute, v7);
            });
          }
          return withFacetConfiguration;
        }
        if (hasAnOffValue) {
          if (off) {
            off.forEach(function(v7) {
              withFacetConfiguration = withFacetConfiguration.addDisjunctiveFacetRefinement(attribute, v7);
            });
          }
          return withFacetConfiguration;
        }
        return withFacetConfiguration.setQueryParameters({
          disjunctiveFacetsRefinements: _objectSpread28(_objectSpread28({}, searchParameters.disjunctiveFacetsRefinements), {}, _defineProperty30({}, attribute, []))
        });
      }
    };
  };
};
var connectToggleRefinement_default = connectToggleRefinement;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/trending-items/connectTrendingItems.js
var withUsage20 = createDocumentationMessageGenerator({
  name: "trending-items",
  connector: true
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/breadcrumb/connectBreadcrumb.js
function _typeof32(obj) {
  "@babel/helpers - typeof";
  return _typeof32 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof32(obj);
}
function ownKeys29(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread29(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys29(Object(source), true).forEach(function(key2) {
      _defineProperty31(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys29(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty31(obj, key2, value) {
  key2 = _toPropertyKey30(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey30(arg) {
  var key2 = _toPrimitive30(arg, "string");
  return _typeof32(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive30(input, hint) {
  if (_typeof32(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof32(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray11(arr, i32) {
  return _arrayWithHoles11(arr) || _iterableToArrayLimit11(arr, i32) || _unsupportedIterableToArray16(arr, i32) || _nonIterableRest11();
}
function _nonIterableRest11() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray16(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray16(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray16(o26, minLen);
}
function _arrayLikeToArray16(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _iterableToArrayLimit11(arr, i32) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i32) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i32); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles11(arr) {
  if (Array.isArray(arr))
    return arr;
}
var withUsage21 = createDocumentationMessageGenerator({
  name: "breadcrumb",
  connector: true
});
var connectBreadcrumb = function connectBreadcrumb2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage21());
  var connectorState = {};
  return function(widgetParams) {
    var _ref7 = widgetParams || {}, attributes = _ref7.attributes, _ref$separator = _ref7.separator, separator = _ref$separator === void 0 ? " > " : _ref$separator, _ref$rootPath = _ref7.rootPath, rootPath = _ref$rootPath === void 0 ? null : _ref$rootPath, _ref$transformItems = _ref7.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
      throw new Error(withUsage21("The `attributes` option expects an array of strings."));
    }
    var _attributes = _slicedToArray11(attributes, 1), hierarchicalFacetName = _attributes[0];
    function getRefinedState2(state, facetValue) {
      if (!facetValue) {
        var breadcrumb = state.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);
        if (breadcrumb.length === 0) {
          return state;
        } else {
          return state.resetPage().toggleFacetRefinement(hierarchicalFacetName, breadcrumb[0]);
        }
      }
      return state.resetPage().toggleFacetRefinement(hierarchicalFacetName, facetValue);
    }
    return {
      $$type: "ais.breadcrumb",
      init: function init(initOptions) {
        renderFn(_objectSpread29(_objectSpread29({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread29(_objectSpread29({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread29(_objectSpread29({}, renderState), {}, {
          breadcrumb: _objectSpread29(_objectSpread29({}, renderState.breadcrumb), {}, _defineProperty31({}, hierarchicalFacetName, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref23) {
        var _this = this;
        var helper = _ref23.helper, createURL = _ref23.createURL, results = _ref23.results, state = _ref23.state;
        function getItems() {
          if (!results || state.hierarchicalFacets.length === 0) {
            return [];
          }
          var _state$hierarchicalFa = _slicedToArray11(state.hierarchicalFacets, 1), facetName = _state$hierarchicalFa[0].name;
          var facetValues = results.getFacetValues(facetName, {});
          var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
          var items2 = transformItems(shiftItemsValues(prepareItems(facetItems)), {
            results
          });
          return items2;
        }
        var items = getItems();
        if (!connectorState.createURL) {
          connectorState.createURL = function(facetValue) {
            return createURL(function(uiState) {
              return _this.getWidgetUiState(uiState, {
                searchParameters: getRefinedState2(helper.state, facetValue),
                helper
              });
            });
          };
        }
        if (!connectorState.refine) {
          connectorState.refine = function(facetValue) {
            helper.setState(getRefinedState2(helper.state, facetValue)).search();
          };
        }
        return {
          canRefine: items.length > 0,
          createURL: connectorState.createURL,
          items,
          refine: connectorState.refine,
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref33) {
        var searchParameters = _ref33.searchParameters;
        var path = searchParameters.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);
        return removeEmptyRefinementsFromUiState6(_objectSpread29(_objectSpread29({}, uiState), {}, {
          hierarchicalMenu: _objectSpread29(_objectSpread29({}, uiState.hierarchicalMenu), {}, _defineProperty31({}, hierarchicalFacetName, path))
        }), hierarchicalFacetName);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref44) {
        var uiState = _ref44.uiState;
        var values = uiState.hierarchicalMenu && uiState.hierarchicalMenu[hierarchicalFacetName];
        if (searchParameters.isConjunctiveFacet(hierarchicalFacetName) || searchParameters.isDisjunctiveFacet(hierarchicalFacetName)) {
          true ? _warning(false, 'HierarchicalMenu: Attribute "'.concat(hierarchicalFacetName, '" is already used by another widget applying conjunctive or disjunctive faceting.\nAs this is not supported, please make sure to remove this other widget or this HierarchicalMenu widget will not work at all.')) : void 0;
          return searchParameters;
        }
        if (searchParameters.isHierarchicalFacet(hierarchicalFacetName)) {
          var facet = searchParameters.getHierarchicalFacetByName(hierarchicalFacetName);
          true ? _warning(isEqual(facet.attributes, attributes) && facet.separator === separator && facet.rootPath === rootPath, "Using Breadcrumb and HierarchicalMenu on the same facet with different options overrides the configuration of the HierarchicalMenu.") : void 0;
        }
        var withFacetConfiguration = searchParameters.removeHierarchicalFacet(hierarchicalFacetName).addHierarchicalFacet({
          name: hierarchicalFacetName,
          attributes,
          separator,
          rootPath
        });
        if (!values) {
          return withFacetConfiguration.setQueryParameters({
            hierarchicalFacetsRefinements: _objectSpread29(_objectSpread29({}, withFacetConfiguration.hierarchicalFacetsRefinements), {}, _defineProperty31({}, hierarchicalFacetName, []))
          });
        }
        return withFacetConfiguration.addHierarchicalFacetRefinement(hierarchicalFacetName, values.join(separator));
      }
    };
  };
};
function prepareItems(data) {
  return data.reduce(function(result, currentItem) {
    if (currentItem.isRefined) {
      result.push({
        label: currentItem.name,
        value: currentItem.escapedValue
      });
      if (Array.isArray(currentItem.data)) {
        result = result.concat(prepareItems(currentItem.data));
      }
    }
    return result;
  }, []);
}
function shiftItemsValues(array) {
  return array.map(function(x3, idx) {
    return {
      label: x3.label,
      value: idx + 1 === array.length ? null : array[idx + 1].value
    };
  });
}
function removeEmptyRefinementsFromUiState6(indexUiState, attribute) {
  if (!indexUiState.hierarchicalMenu) {
    return indexUiState;
  }
  if (!indexUiState.hierarchicalMenu[attribute] || !indexUiState.hierarchicalMenu[attribute].length) {
    delete indexUiState.hierarchicalMenu[attribute];
  }
  if (Object.keys(indexUiState.hierarchicalMenu).length === 0) {
    delete indexUiState.hierarchicalMenu;
  }
  return indexUiState;
}
var connectBreadcrumb_default = connectBreadcrumb;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/geo-search/connectGeoSearch.js
var withUsage22 = createDocumentationMessageGenerator({
  name: "geo-search",
  connector: true
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/powered-by/connectPoweredBy.js
var withUsage23 = createDocumentationMessageGenerator({
  name: "powered-by",
  connector: true
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/configure/connectConfigure.js
var import_algoliasearch_helper = __toESM(require_algoliasearch_helper2(), 1);
function _typeof33(obj) {
  "@babel/helpers - typeof";
  return _typeof33 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof33(obj);
}
function ownKeys30(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread30(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys30(Object(source), true).forEach(function(key2) {
      _defineProperty32(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys30(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty32(obj, key2, value) {
  key2 = _toPropertyKey31(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey31(arg) {
  var key2 = _toPrimitive31(arg, "string");
  return _typeof33(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive31(input, hint) {
  if (_typeof33(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof33(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage24 = createDocumentationMessageGenerator({
  name: "configure",
  connector: true
});
function getInitialSearchParameters(state, widgetParams) {
  return state.setQueryParameters(Object.keys(widgetParams.searchParameters).reduce(function(acc, key2) {
    return _objectSpread30(_objectSpread30({}, acc), {}, _defineProperty32({}, key2, void 0));
  }, {}));
}
var connectConfigure = function connectConfigure2() {
  var renderFn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : noop;
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  return function(widgetParams) {
    if (!widgetParams || !isPlainObject(widgetParams.searchParameters)) {
      throw new Error(withUsage24("The `searchParameters` option expects an object."));
    }
    var connectorState = {};
    function refine(helper) {
      return function(searchParameters) {
        var actualState = getInitialSearchParameters(helper.state, widgetParams);
        var nextSearchParameters = mergeSearchParameters(actualState, new import_algoliasearch_helper.default.SearchParameters(searchParameters));
        widgetParams.searchParameters = searchParameters;
        helper.setState(nextSearchParameters).search();
      };
    }
    return {
      $$type: "ais.configure",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread30(_objectSpread30({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread30(_objectSpread30({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref7) {
        var state = _ref7.state;
        unmountFn();
        return getInitialSearchParameters(state, widgetParams);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        var _renderState$configur;
        var widgetRenderState = this.getWidgetRenderState(renderOptions);
        return _objectSpread30(_objectSpread30({}, renderState), {}, {
          configure: _objectSpread30(_objectSpread30({}, widgetRenderState), {}, {
            widgetParams: _objectSpread30(_objectSpread30({}, widgetRenderState.widgetParams), {}, {
              searchParameters: mergeSearchParameters(new import_algoliasearch_helper.default.SearchParameters((_renderState$configur = renderState.configure) === null || _renderState$configur === void 0 ? void 0 : _renderState$configur.widgetParams.searchParameters), new import_algoliasearch_helper.default.SearchParameters(widgetRenderState.widgetParams.searchParameters)).getQueryParams()
            })
          })
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref23) {
        var helper = _ref23.helper;
        if (!connectorState.refine) {
          connectorState.refine = refine(helper);
        }
        return {
          refine: connectorState.refine,
          widgetParams
        };
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _ref33) {
        var uiState = _ref33.uiState;
        return mergeSearchParameters(state, new import_algoliasearch_helper.default.SearchParameters(_objectSpread30(_objectSpread30({}, uiState.configure), widgetParams.searchParameters)));
      },
      getWidgetUiState: function getWidgetUiState(uiState) {
        return _objectSpread30(_objectSpread30({}, uiState), {}, {
          configure: _objectSpread30(_objectSpread30({}, uiState.configure), widgetParams.searchParameters)
        });
      }
    };
  };
};
var connectConfigure_default = connectConfigure;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/configure-related-items/connectConfigureRelatedItems.js
var import_algoliasearch_helper2 = __toESM(require_algoliasearch_helper2(), 1);
function _typeof34(obj) {
  "@babel/helpers - typeof";
  return _typeof34 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof34(obj);
}
function ownKeys31(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread31(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys31(Object(source), true).forEach(function(key2) {
      _defineProperty33(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys31(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty33(obj, key2, value) {
  key2 = _toPropertyKey32(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey32(arg) {
  var key2 = _toPrimitive32(arg, "string");
  return _typeof34(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive32(input, hint) {
  if (_typeof34(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof34(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toConsumableArray8(arr) {
  return _arrayWithoutHoles8(arr) || _iterableToArray8(arr) || _unsupportedIterableToArray17(arr) || _nonIterableSpread8();
}
function _nonIterableSpread8() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray17(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray17(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray17(o26, minLen);
}
function _iterableToArray8(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles8(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray17(arr);
}
function _arrayLikeToArray17(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
var withUsage25 = createDocumentationMessageGenerator({
  name: "configure-related-items",
  connector: true
});
function createOptionalFilter(_ref7) {
  var attributeName = _ref7.attributeName, attributeValue = _ref7.attributeValue, attributeScore = _ref7.attributeScore;
  return "".concat(attributeName, ":").concat(attributeValue, "<score=").concat(attributeScore || 1, ">");
}
var connectConfigureRelatedItems = function connectConfigureRelatedItems2(renderFn, unmountFn) {
  return function(widgetParams) {
    var _ref23 = widgetParams || {}, hit = _ref23.hit, matchingPatterns = _ref23.matchingPatterns, _ref2$transformSearch = _ref23.transformSearchParameters, transformSearchParameters = _ref2$transformSearch === void 0 ? function(x3) {
      return x3;
    } : _ref2$transformSearch;
    if (!hit) {
      throw new Error(withUsage25("The `hit` option is required."));
    }
    if (!matchingPatterns) {
      throw new Error(withUsage25("The `matchingPatterns` option is required."));
    }
    var optionalFilters = Object.keys(matchingPatterns).reduce(function(acc, attributeName) {
      var attribute = matchingPatterns[attributeName];
      var attributeValue = getPropertyByPath(hit, attributeName);
      var attributeScore = attribute.score;
      if (Array.isArray(attributeValue)) {
        return [].concat(_toConsumableArray8(acc), [attributeValue.map(function(attributeSubValue) {
          return createOptionalFilter({
            attributeName,
            attributeValue: attributeSubValue,
            attributeScore
          });
        })]);
      }
      if (typeof attributeValue === "string") {
        return [].concat(_toConsumableArray8(acc), [createOptionalFilter({
          attributeName,
          attributeValue,
          attributeScore
        })]);
      }
      true ? _warning(false, "\nThe `matchingPatterns` option returned a value of type ".concat(getObjectType(attributeValue), ' for the "').concat(attributeName, '" key. This value was not sent to Algolia because `optionalFilters` only supports strings and array of strings.\n\nYou can remove the "').concat(attributeName, '" key from the `matchingPatterns` option.\n\nSee https://www.algolia.com/doc/api-reference/api-parameters/optionalFilters/\n            ')) : void 0;
      return acc;
    }, []);
    var searchParameters = _objectSpread31({}, transformSearchParameters(new import_algoliasearch_helper2.default.SearchParameters({
      sumOrFiltersScores: true,
      facetFilters: ["objectID:-".concat(hit.objectID)],
      optionalFilters
    })));
    var makeWidget = connectConfigure_default(renderFn, unmountFn);
    return _objectSpread31(_objectSpread31({}, makeWidget({
      searchParameters
    })), {}, {
      $$type: "ais.configureRelatedItems"
    });
  };
};
var connectConfigureRelatedItems_default = connectConfigureRelatedItems;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/autocomplete/connectAutocomplete.js
function _typeof35(obj) {
  "@babel/helpers - typeof";
  return _typeof35 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof35(obj);
}
function ownKeys32(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread32(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys32(Object(source), true).forEach(function(key2) {
      _defineProperty34(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys32(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty34(obj, key2, value) {
  key2 = _toPropertyKey33(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey33(arg) {
  var key2 = _toPrimitive33(arg, "string");
  return _typeof35(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive33(input, hint) {
  if (_typeof35(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof35(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage26 = createDocumentationMessageGenerator({
  name: "autocomplete",
  connector: true
});
var connectAutocomplete = function connectAutocomplete2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage26());
  return function(widgetParams) {
    var _ref7 = widgetParams || {}, _ref$escapeHTML = _ref7.escapeHTML, escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML;
    true ? _warning(!widgetParams.indices, "\nThe option `indices` has been removed from the Autocomplete connector.\n\nThe indices to target are now inferred from the widgets tree.\n".concat(Array.isArray(widgetParams.indices) ? "\nAn alternative would be:\n\nconst autocomplete = connectAutocomplete(renderer);\n\nsearch.addWidgets([\n  ".concat(widgetParams.indices.map(function(_ref23) {
      var value = _ref23.value;
      return "index({ indexName: '".concat(value, "' }),");
    }).join("\n  "), "\n  autocomplete()\n]);\n") : "", "\n      ")) : void 0;
    var connectorState = {};
    return {
      $$type: "ais.autocomplete",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread32(_objectSpread32({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        var renderState = this.getWidgetRenderState(renderOptions);
        renderState.indices.forEach(function(_ref33) {
          var sendEvent = _ref33.sendEvent, hits = _ref33.hits;
          sendEvent("view:internal", hits);
        });
        renderFn(_objectSpread32(_objectSpread32({}, renderState), {}, {
          instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread32(_objectSpread32({}, renderState), {}, {
          autocomplete: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref44) {
        var _this = this;
        var helper = _ref44.helper, state = _ref44.state, scopedResults = _ref44.scopedResults, instantSearchInstance = _ref44.instantSearchInstance;
        if (!connectorState.refine) {
          connectorState.refine = function(query) {
            helper.setQuery(query).search();
          };
        }
        var indices = scopedResults.map(function(scopedResult) {
          scopedResult.results.hits = escapeHTML ? escapeHits(scopedResult.results.hits) : scopedResult.results.hits;
          var sendEvent = createSendEventForHits({
            instantSearchInstance,
            getIndex: function getIndex() {
              return scopedResult.results.index;
            },
            widgetType: _this.$$type
          });
          return {
            indexId: scopedResult.indexId,
            indexName: scopedResult.results.index,
            hits: scopedResult.results.hits,
            results: scopedResult.results,
            sendEvent
          };
        });
        return {
          currentRefinement: state.query || "",
          indices,
          refine: connectorState.refine,
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref52) {
        var searchParameters = _ref52.searchParameters;
        var query = searchParameters.query || "";
        if (query === "" || uiState && uiState.query === query) {
          return uiState;
        }
        return _objectSpread32(_objectSpread32({}, uiState), {}, {
          query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref63) {
        var uiState = _ref63.uiState;
        var parameters = {
          query: uiState.query || ""
        };
        if (!escapeHTML) {
          return searchParameters.setQueryParameters(parameters);
        }
        return searchParameters.setQueryParameters(_objectSpread32(_objectSpread32({}, parameters), TAG_PLACEHOLDER));
      },
      dispose: function dispose(_ref72) {
        var state = _ref72.state;
        unmountFn();
        var stateWithoutQuery = state.setQueryParameter("query", void 0);
        if (!escapeHTML) {
          return stateWithoutQuery;
        }
        return stateWithoutQuery.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function(acc, key2) {
          return _objectSpread32(_objectSpread32({}, acc), {}, _defineProperty34({}, key2, void 0));
        }, {}));
      }
    };
  };
};
var connectAutocomplete_default = connectAutocomplete;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/query-rules/connectQueryRules.js
function _typeof36(obj) {
  "@babel/helpers - typeof";
  return _typeof36 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof36(obj);
}
function ownKeys33(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread33(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys33(Object(source), true).forEach(function(key2) {
      _defineProperty35(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys33(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty35(obj, key2, value) {
  key2 = _toPropertyKey34(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey34(arg) {
  var key2 = _toPrimitive34(arg, "string");
  return _typeof36(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive34(input, hint) {
  if (_typeof36(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof36(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toConsumableArray9(arr) {
  return _arrayWithoutHoles9(arr) || _iterableToArray9(arr) || _unsupportedIterableToArray18(arr) || _nonIterableSpread9();
}
function _nonIterableSpread9() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray18(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray18(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray18(o26, minLen);
}
function _iterableToArray9(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles9(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray18(arr);
}
function _arrayLikeToArray18(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
var withUsage27 = createDocumentationMessageGenerator({
  name: "query-rules",
  connector: true
});
function hasStateRefinements(state) {
  return [state.disjunctiveFacetsRefinements, state.facetsRefinements, state.hierarchicalFacetsRefinements, state.numericRefinements].some(function(refinement) {
    return Boolean(refinement && Object.keys(refinement).length > 0);
  });
}
function escapeRuleContext(ruleName) {
  return ruleName.replace(/[^a-z0-9-_]+/gi, "_");
}
function getRuleContextsFromTrackedFilters(_ref7) {
  var helper = _ref7.helper, sharedHelperState = _ref7.sharedHelperState, trackedFilters = _ref7.trackedFilters;
  var ruleContexts = Object.keys(trackedFilters).reduce(function(facets, facetName) {
    var facetRefinements = getRefinements(helper.lastResults || {}, sharedHelperState, true).filter(function(refinement) {
      return refinement.attribute === facetName;
    }).map(function(refinement) {
      return refinement.numericValue || refinement.name;
    });
    var getTrackedFacetValues = trackedFilters[facetName];
    var trackedFacetValues = getTrackedFacetValues(facetRefinements);
    return [].concat(_toConsumableArray9(facets), _toConsumableArray9(facetRefinements.filter(function(facetRefinement) {
      return trackedFacetValues.includes(facetRefinement);
    }).map(function(facetValue) {
      return escapeRuleContext("ais-".concat(facetName, "-").concat(facetValue));
    })));
  }, []);
  return ruleContexts;
}
function applyRuleContexts(event) {
  var helper = this.helper, initialRuleContexts = this.initialRuleContexts, trackedFilters = this.trackedFilters, transformRuleContexts = this.transformRuleContexts;
  var sharedHelperState = event.state;
  var previousRuleContexts = sharedHelperState.ruleContexts || [];
  var newRuleContexts = getRuleContextsFromTrackedFilters({
    helper,
    sharedHelperState,
    trackedFilters
  });
  var nextRuleContexts = [].concat(_toConsumableArray9(initialRuleContexts), _toConsumableArray9(newRuleContexts));
  true ? _warning(nextRuleContexts.length <= 10, "\nThe maximum number of `ruleContexts` is 10. They have been sliced to that limit.\nConsider using `transformRuleContexts` to minimize the number of rules sent to Algolia.\n") : void 0;
  var ruleContexts = transformRuleContexts(nextRuleContexts).slice(0, 10);
  if (!isEqual(previousRuleContexts, ruleContexts)) {
    helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread33(_objectSpread33({}, sharedHelperState), {}, {
      ruleContexts
    }));
  }
}
var connectQueryRules = function connectQueryRules2(_render) {
  var unmount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(_render, withUsage27());
  return function(widgetParams) {
    var _ref23 = widgetParams || {}, _ref2$trackedFilters = _ref23.trackedFilters, trackedFilters = _ref2$trackedFilters === void 0 ? {} : _ref2$trackedFilters, _ref2$transformRuleCo = _ref23.transformRuleContexts, transformRuleContexts = _ref2$transformRuleCo === void 0 ? function(rules) {
      return rules;
    } : _ref2$transformRuleCo, _ref2$transformItems = _ref23.transformItems, transformItems = _ref2$transformItems === void 0 ? function(items) {
      return items;
    } : _ref2$transformItems;
    Object.keys(trackedFilters).forEach(function(facetName) {
      if (typeof trackedFilters[facetName] !== "function") {
        throw new Error(withUsage27(`'The "`.concat(facetName, '" filter value in the `trackedFilters` option expects a function.')));
      }
    });
    var hasTrackedFilters = Object.keys(trackedFilters).length > 0;
    var initialRuleContexts = [];
    var onHelperChange;
    return {
      $$type: "ais.queryRules",
      init: function init(initOptions) {
        var helper = initOptions.helper, state = initOptions.state, instantSearchInstance = initOptions.instantSearchInstance;
        initialRuleContexts = state.ruleContexts || [];
        onHelperChange = applyRuleContexts.bind({
          helper,
          initialRuleContexts,
          trackedFilters,
          transformRuleContexts
        });
        if (hasTrackedFilters) {
          if (hasStateRefinements(state) || Boolean(widgetParams.transformRuleContexts)) {
            onHelperChange({
              state
            });
          }
          helper.on("change", onHelperChange);
        }
        _render(_objectSpread33(_objectSpread33({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        _render(_objectSpread33(_objectSpread33({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      getWidgetRenderState: function getWidgetRenderState(_ref33) {
        var results = _ref33.results;
        var _ref44 = results || {}, _ref4$userData = _ref44.userData, userData = _ref4$userData === void 0 ? [] : _ref4$userData;
        var items = transformItems(userData, {
          results
        });
        return {
          items,
          widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread33(_objectSpread33({}, renderState), {}, {
          queryRules: this.getWidgetRenderState(renderOptions)
        });
      },
      dispose: function dispose(_ref52) {
        var helper = _ref52.helper, state = _ref52.state;
        unmount();
        if (hasTrackedFilters) {
          helper.removeListener("change", onHelperChange);
          return state.setQueryParameter("ruleContexts", initialRuleContexts);
        }
        return state;
      }
    };
  };
};
var connectQueryRules_default = connectQueryRules;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/voiceSearchHelper/index.js
function _typeof37(obj) {
  "@babel/helpers - typeof";
  return _typeof37 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof37(obj);
}
function ownKeys34(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread34(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys34(Object(source), true).forEach(function(key2) {
      _defineProperty36(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys34(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty36(obj, key2, value) {
  key2 = _toPropertyKey35(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey35(arg) {
  var key2 = _toPrimitive35(arg, "string");
  return _typeof37(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive35(input, hint) {
  if (_typeof37(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof37(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var createVoiceSearchHelper = function createVoiceSearchHelper2(_ref7) {
  var searchAsYouSpeak = _ref7.searchAsYouSpeak, language = _ref7.language, onQueryChange = _ref7.onQueryChange, onStateChange = _ref7.onStateChange;
  var SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;
  var getDefaultState = function getDefaultState2(status) {
    return {
      status,
      transcript: "",
      isSpeechFinal: false,
      errorCode: void 0
    };
  };
  var state = getDefaultState("initial");
  var recognition;
  var isBrowserSupported = function isBrowserSupported2() {
    return Boolean(SpeechRecognitionAPI);
  };
  var isListening = function isListening2() {
    return state.status === "askingPermission" || state.status === "waiting" || state.status === "recognizing";
  };
  var setState = function setState2() {
    var newState = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    state = _objectSpread34(_objectSpread34({}, state), newState);
    onStateChange();
  };
  var getState = function getState2() {
    return state;
  };
  var resetState = function resetState2() {
    var status = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "initial";
    setState(getDefaultState(status));
  };
  var onStart = function onStart2() {
    setState({
      status: "waiting"
    });
  };
  var onError = function onError2(event) {
    setState({
      status: "error",
      errorCode: event.error
    });
  };
  var onResult = function onResult2(event) {
    setState({
      status: "recognizing",
      transcript: event.results[0] && event.results[0][0] && event.results[0][0].transcript || "",
      isSpeechFinal: event.results[0] && event.results[0].isFinal
    });
    if (searchAsYouSpeak && state.transcript) {
      onQueryChange(state.transcript);
    }
  };
  var onEnd = function onEnd2() {
    if (!state.errorCode && state.transcript && !searchAsYouSpeak) {
      onQueryChange(state.transcript);
    }
    if (state.status !== "error") {
      setState({
        status: "finished"
      });
    }
  };
  var startListening = function startListening2() {
    recognition = new SpeechRecognitionAPI();
    if (!recognition) {
      return;
    }
    resetState("askingPermission");
    recognition.interimResults = true;
    if (language) {
      recognition.lang = language;
    }
    recognition.addEventListener("start", onStart);
    recognition.addEventListener("error", onError);
    recognition.addEventListener("result", onResult);
    recognition.addEventListener("end", onEnd);
    recognition.start();
  };
  var dispose = function dispose2() {
    if (!recognition) {
      return;
    }
    recognition.stop();
    recognition.removeEventListener("start", onStart);
    recognition.removeEventListener("error", onError);
    recognition.removeEventListener("result", onResult);
    recognition.removeEventListener("end", onEnd);
    recognition = void 0;
  };
  var stopListening = function stopListening2() {
    dispose();
    resetState("finished");
  };
  return {
    getState,
    isBrowserSupported,
    isListening,
    startListening,
    stopListening,
    dispose
  };
};
var voiceSearchHelper_default = createVoiceSearchHelper;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/voice-search/connectVoiceSearch.js
function _typeof38(obj) {
  "@babel/helpers - typeof";
  return _typeof38 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof38(obj);
}
function ownKeys35(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread35(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys35(Object(source), true).forEach(function(key2) {
      _defineProperty37(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys35(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty37(obj, key2, value) {
  key2 = _toPropertyKey36(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey36(arg) {
  var key2 = _toPrimitive36(arg, "string");
  return _typeof38(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive36(input, hint) {
  if (_typeof38(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof38(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage28 = createDocumentationMessageGenerator({
  name: "voice-search",
  connector: true
});
var connectVoiceSearch = function connectVoiceSearch2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage28());
  return function(widgetParams) {
    var _widgetParams$searchA = widgetParams.searchAsYouSpeak, searchAsYouSpeak = _widgetParams$searchA === void 0 ? false : _widgetParams$searchA, language = widgetParams.language, additionalQueryParameters = widgetParams.additionalQueryParameters, _widgetParams$createV = widgetParams.createVoiceSearchHelper, createVoiceSearchHelper3 = _widgetParams$createV === void 0 ? voiceSearchHelper_default : _widgetParams$createV;
    return {
      $$type: "ais.voiceSearch",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread35(_objectSpread35({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread35(_objectSpread35({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread35(_objectSpread35({}, renderState), {}, {
          voiceSearch: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var _this = this;
        var helper = renderOptions.helper, instantSearchInstance = renderOptions.instantSearchInstance;
        if (!this._refine) {
          this._refine = function(query) {
            if (query !== helper.state.query) {
              var queryLanguages = language ? [language.split("-")[0]] : void 0;
              helper.setQueryParameter("queryLanguages", queryLanguages);
              if (typeof additionalQueryParameters === "function") {
                helper.setState(helper.state.setQueryParameters(_objectSpread35({
                  ignorePlurals: true,
                  removeStopWords: true,
                  // @ts-ignore (optionalWords only allows array in v3, while string is also valid)
                  optionalWords: query
                }, additionalQueryParameters({
                  query
                }))));
              }
              helper.setQuery(query).search();
            }
          };
        }
        if (!this._voiceSearchHelper) {
          this._voiceSearchHelper = createVoiceSearchHelper3({
            searchAsYouSpeak,
            language,
            onQueryChange: function onQueryChange(query) {
              return _this._refine(query);
            },
            onStateChange: function onStateChange() {
              renderFn(_objectSpread35(_objectSpread35({}, _this.getWidgetRenderState(renderOptions)), {}, {
                instantSearchInstance
              }), false);
            }
          });
        }
        var _voiceSearchHelper = this._voiceSearchHelper, isBrowserSupported = _voiceSearchHelper.isBrowserSupported, isListening = _voiceSearchHelper.isListening, startListening = _voiceSearchHelper.startListening, stopListening = _voiceSearchHelper.stopListening, getState = _voiceSearchHelper.getState;
        return {
          isBrowserSupported: isBrowserSupported(),
          isListening: isListening(),
          toggleListening: function toggleListening() {
            if (!isBrowserSupported()) {
              return;
            }
            if (isListening()) {
              stopListening();
            } else {
              startListening();
            }
          },
          voiceListeningState: getState(),
          widgetParams
        };
      },
      dispose: function dispose(_ref7) {
        var state = _ref7.state;
        this._voiceSearchHelper.dispose();
        unmountFn();
        var newState = state;
        if (typeof additionalQueryParameters === "function") {
          var additional = additionalQueryParameters({
            query: ""
          });
          var toReset = additional ? Object.keys(additional).reduce(function(acc, current) {
            acc[current] = void 0;
            return acc;
          }, {}) : {};
          newState = state.setQueryParameters(_objectSpread35({
            // @ts-ignore (queryLanguages is not added to algoliasearch v3)
            queryLanguages: void 0,
            ignorePlurals: void 0,
            removeStopWords: void 0,
            optionalWords: void 0
          }, toReset));
        }
        return newState.setQueryParameter("query", void 0);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref23) {
        var searchParameters = _ref23.searchParameters;
        var query = searchParameters.query || "";
        if (!query) {
          return uiState;
        }
        return _objectSpread35(_objectSpread35({}, uiState), {}, {
          query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref33) {
        var uiState = _ref33.uiState;
        return searchParameters.setQueryParameter("query", uiState.query || "");
      }
    };
  };
};
var connectVoiceSearch_default = connectVoiceSearch;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/relevant-sort/connectRelevantSort.js
function _typeof39(obj) {
  "@babel/helpers - typeof";
  return _typeof39 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof39(obj);
}
function ownKeys36(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread36(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys36(Object(source), true).forEach(function(key2) {
      _defineProperty38(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys36(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty38(obj, key2, value) {
  key2 = _toPropertyKey37(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey37(arg) {
  var key2 = _toPrimitive37(arg, "string");
  return _typeof39(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive37(input, hint) {
  if (_typeof39(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof39(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var connectRelevantSort = function connectRelevantSort2() {
  var renderFn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : noop;
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  return function(widgetParams) {
    var connectorState = {};
    return {
      $$type: "ais.relevantSort",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread36(_objectSpread36({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread36(_objectSpread36({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref7) {
        var state = _ref7.state;
        unmountFn();
        return state.setQueryParameter("relevancyStrictness", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread36(_objectSpread36({}, renderState), {}, {
          relevantSort: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref23) {
        var results = _ref23.results, helper = _ref23.helper;
        if (!connectorState.refine) {
          connectorState.refine = function(relevancyStrictness) {
            helper.setQueryParameter("relevancyStrictness", relevancyStrictness).search();
          };
        }
        var _ref33 = results || {}, appliedRelevancyStrictness = _ref33.appliedRelevancyStrictness;
        var isVirtualReplica = appliedRelevancyStrictness !== void 0;
        return {
          isRelevantSorted: typeof appliedRelevancyStrictness !== "undefined" && appliedRelevancyStrictness > 0,
          isVirtualReplica,
          canRefine: isVirtualReplica,
          refine: connectorState.refine,
          widgetParams
        };
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _ref44) {
        var _uiState$relevantSort;
        var uiState = _ref44.uiState;
        return state.setQueryParameter("relevancyStrictness", (_uiState$relevantSort = uiState.relevantSort) !== null && _uiState$relevantSort !== void 0 ? _uiState$relevantSort : state.relevancyStrictness);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref52) {
        var searchParameters = _ref52.searchParameters;
        return _objectSpread36(_objectSpread36({}, uiState), {}, {
          relevantSort: searchParameters.relevancyStrictness || uiState.relevantSort
        });
      }
    };
  };
};
var connectRelevantSort_default = connectRelevantSort;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/frequently-bought-together/connectFrequentlyBoughtTogether.js
var withUsage29 = createDocumentationMessageGenerator({
  name: "frequently-bought-together",
  connector: true
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/looking-similar/connectLookingSimilar.js
var withUsage30 = createDocumentationMessageGenerator({
  name: "looking-similar",
  connector: true
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/connectors/index.js
var EXPERIMENTAL_connectAnswers = deprecate(connectAnswers_default, "answers is no longer supported");
var EXPERIMENTAL_connectDynamicWidgets = deprecate(connectDynamicWidgets_default, "use connectDynamicWidgets");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Autocomplete.vue_vue&type=script&lang.js
var Autocomplete_vue_vue_type_script_lang_default = { name: "AisAutocomplete", mixins: [n3({ connector: connectAutocomplete_default }, { $$widgetType: "ais.autocomplete" }), t({ name: "Autocomplete" })], props: { escapeHTML: { type: Boolean, required: false, default: true } }, computed: { widgetParams: function() {
  return { escapeHTML: this.escapeHTML };
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Autocomplete.vue_vue&type=template&id=52a2a414&lang.js
import { openBlock as e4, createElementBlock as n5, normalizeClass as t5, renderSlot as i2, createElementVNode as r3, toDisplayString as u3, createCommentVNode as l2, createTextVNode as s3 } from "vue";
var a3 = r3("p", null, " This widget doesn't render anything without a filled in default slot. ", -1);
var d2 = r3("p", null, "query, function to refine and results are provided.", -1);
var f2 = r3("pre", null, "refine: Function", -1);
var c2 = r3("summary", null, [r3("code", null, "indices"), s3(":")], -1);
function o3(s30, o26, m14, p7, v7, y6) {
  return s30.state ? (e4(), n5("div", { key: 0, class: t5(s30.suit()) }, [i2(s30.$slots, "default", { refine: s30.state.refine, currentRefinement: s30.state.currentRefinement, indices: s30.state.indices }, function() {
    return [a3, d2, f2, r3("pre", null, 'currentRefinement: "' + u3(s30.state.currentRefinement) + '"', 1), r3("details", null, [c2, r3("pre", null, u3(s30.state.indices), 1)])];
  })], 2)) : l2("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Autocomplete.vue.js
Autocomplete_vue_vue_type_script_lang_default.render = o3;
var Autocomplete_vue_default = Autocomplete_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/mitt/dist/mitt.es.js
function mitt_es_default(n32) {
  return { all: n32 = n32 || /* @__PURE__ */ new Map(), on: function(t37, e34) {
    var i32 = n32.get(t37);
    i32 && i32.push(e34) || n32.set(t37, [e34]);
  }, off: function(t37, e34) {
    var i32 = n32.get(t37);
    i32 && i32.splice(i32.indexOf(e34) >>> 0, 1);
  }, emit: function(t37, e34) {
    (n32.get(t37) || []).slice().map(function(n33) {
      n33(e34);
    }), (n32.get("*") || []).slice().map(function(n33) {
      n33(t37, e34);
    });
  } };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/mixins/panel.js
var i3 = function() {
  var e34;
  return (e34 = { props: { emitter: { type: Object, required: false, default: function() {
    return mitt_es_default();
  } } }, provide: function() {
    var t37;
    return (t37 = {}).instantSearchPanelEmitter = this.emitter, t37;
  }, data: function() {
    return { canRefine: true };
  }, created: function() {
    var t37 = this;
    this.emitter.on("PANEL_CHANGE_EVENT", function(e35) {
      t37.updateCanRefine(e35);
    });
  } }).beforeUnmount = function() {
    this.emitter.all.clear();
  }, e34.methods = { updateCanRefine: function(t37) {
    this.canRefine = t37;
  } }, e34;
};
var r4 = function(t37) {
  void 0 === t37 && (t37 = {});
  var e34 = t37.mapStateToCanRefine;
  return void 0 === e34 && (e34 = function(t38) {
    return Boolean(t38.canRefine);
  }), { inject: { emitter: { from: "instantSearchPanelEmitter", default: function() {
    return { emit: function() {
    } };
  } } }, data: function() {
    return { state: null, hasAlreadyEmitted: false };
  }, watch: { state: { immediate: true, handler: function(t38, n32) {
    if (t38) {
      var i32 = e34(n32 || {}), r32 = e34(t38);
      this.hasAlreadyEmitted && i32 === r32 || (this.emitter.emit("PANEL_CHANGE_EVENT", r32), this.hasAlreadyEmitted = true);
    }
  } } } };
};

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Breadcrumb.vue_vue&type=script&lang.js
var Breadcrumb_vue_vue_type_script_lang_default = { name: "AisBreadcrumb", mixins: [n3({ connector: connectBreadcrumb_default }, { $$widgetType: "ais.breadcrumb" }), r4(), t({ name: "Breadcrumb" })], props: { attributes: { type: Array, required: true }, separator: { type: String, default: void 0 }, rootPath: { type: String, default: void 0 }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { attributes: this.attributes, separator: this.separator, rootPath: this.rootPath, transformItems: this.transformItems };
} }, methods: { isLastItem: function(t37) {
  return this.state.items.length - 1 === t37;
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Breadcrumb.vue_vue&type=template&id=ea18edbe&lang.js
import { openBlock as e5, createElementBlock as t6, normalizeClass as s4, renderSlot as n6, createElementVNode as i4, withModifiers as a4, createTextVNode as r5, Fragment as l3, renderList as u4, toDisplayString as c3, createCommentVNode as o4 } from "vue";
var f3 = ["href"];
var m2 = ["href"];
var k2 = ["href", "onClick"];
function h3(h13, L3, R, p7, v7, d8) {
  return h13.state ? (e5(), t6("div", { key: 0, class: s4([h13.suit(), !h13.state.canRefine && h13.suit("", "noRefinement")]) }, [n6(h13.$slots, "default", { items: h13.state.items, canRefine: h13.state.canRefine, refine: h13.state.refine, createURL: h13.state.createURL }, function() {
    return [i4("ul", { class: s4(h13.suit("list")) }, [i4("li", { class: s4([h13.suit("item"), !h13.state.items.length && h13.suit("item", "selected")]) }, [Boolean(h13.state.items.length) ? (e5(), t6("a", { key: 0, href: h13.state.createURL(), class: s4(h13.suit("link")), onClick: L3[0] || (L3[0] = a4(function(e34) {
      return h13.state.refine();
    }, ["prevent"])) }, [n6(h13.$slots, "rootLabel", {}, function() {
      return [r5("Home")];
    })], 10, f3)) : (e5(), t6("a", { key: 1, href: h13.state.createURL(null), class: s4(h13.suit("link")), onClick: L3[1] || (L3[1] = a4(function(e34) {
      return h13.state.refine(null);
    }, ["prevent"])) }, [n6(h13.$slots, "rootLabel", {}, function() {
      return [r5("Home")];
    })], 10, m2))], 2), (e5(true), t6(l3, null, u4(h13.state.items, function(u26, o26) {
      return e5(), t6("li", { key: u26.label, class: s4([h13.suit("item"), d8.isLastItem(o26) && h13.suit("item", "selected")]) }, [i4("span", { class: s4(h13.suit("separator")), "aria-hidden": "true" }, [n6(h13.$slots, "separator", {}, function() {
        return [r5(">")];
      })], 2), d8.isLastItem(o26) ? (e5(), t6(l3, { key: 1 }, [r5(c3(u26.label), 1)], 64)) : (e5(), t6("a", { key: 0, href: h13.state.createURL(u26.value), class: s4(h13.suit("link")), onClick: a4(function(e34) {
        return h13.state.refine(u26.value);
      }, ["prevent"]) }, c3(u26.label), 11, k2))], 2);
    }), 128))], 2)];
  })], 2)) : o4("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Breadcrumb.vue.js
Breadcrumb_vue_vue_type_script_lang_default.render = h3;
var Breadcrumb_vue_default = Breadcrumb_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/ClearRefinements.vue_vue&type=script&lang.js
var ClearRefinements_vue_vue_type_script_lang_default = { name: "AisClearRefinements", mixins: [n3({ connector: connectClearRefinements_default }, { $$widgetType: "ais.clearRefinements" }), r4(), t({ name: "ClearRefinements" })], props: { excludedAttributes: { type: Array, default: void 0 }, includedAttributes: { type: Array, default: void 0 }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { includedAttributes: this.includedAttributes, excludedAttributes: this.excludedAttributes, transformItems: this.transformItems };
}, canRefine: function() {
  return this.state.hasRefinements;
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/ClearRefinements.vue_vue&type=template&id=41d81b11&lang.js
import { openBlock as e6, createElementBlock as t7, normalizeClass as n7, renderSlot as r6, createElementVNode as a5, withModifiers as i5, createTextVNode as s5, createCommentVNode as f4 } from "vue";
var u5 = ["disabled"];
function o5(o26, c23, l27, d8, b3, p7) {
  return o26.state ? (e6(), t7("div", { key: 0, class: n7(o26.suit()) }, [r6(o26.$slots, "default", { canRefine: p7.canRefine, refine: o26.state.refine, createURL: o26.state.createURL }, function() {
    return [a5("button", { type: "reset", class: n7([o26.suit("button"), !p7.canRefine && o26.suit("button", "disabled")]), disabled: !p7.canRefine, onClick: c23[0] || (c23[0] = i5(function() {
      for (var e34, t37 = [], n32 = arguments.length; n32--; )
        t37[n32] = arguments[n32];
      return o26.state.refine && (e34 = o26.state).refine.apply(e34, t37);
    }, ["prevent"])) }, [r6(o26.$slots, "resetLabel", {}, function() {
      return [s5(" Clear refinements ")];
    })], 10, u5)];
  })], 2)) : f4("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/ClearRefinements.vue.js
ClearRefinements_vue_vue_type_script_lang_default.render = o5;
var ClearRefinements_vue_default = ClearRefinements_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Configure.js
var Configure_default = { inheritAttrs: false, name: "AisConfigure", mixins: [t({ name: "Configure" }), n3({ connector: connectConfigure_default }, { $$widgetType: "ais.configure" })], computed: { widgetParams: function() {
  return { searchParameters: Object.assign({}, this.$attrs) };
} }, render: n(function(t37) {
  var e34 = this.$slots.default;
  return this.state && e34 ? t37("div", { class: this.suit() }, [e34({ refine: this.state.refine, searchParameters: this.state.widgetParams.searchParameters })]) : null;
}) };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/ConfigureRelatedItems.js
var ConfigureRelatedItems_default = { inheritAttrs: false, name: "AisExperimentalConfigureRelatedItems", mixins: [n3({ connector: connectConfigureRelatedItems_default }, { $$widgetType: "ais.configureRelatedItems" })], props: { hit: { type: Object, required: true }, matchingPatterns: { type: Object, required: true }, transformSearchParameters: { type: Function, required: false } }, computed: { widgetParams: function() {
  return { hit: this.hit, matchingPatterns: this.matchingPatterns, transformSearchParameters: this.transformSearchParameters };
} }, render: function() {
  return null;
} };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/CurrentRefinements.vue_vue&type=script&lang.js
var CurrentRefinements_vue_vue_type_script_lang_default = { name: "AisCurrentRefinements", mixins: [t({ name: "CurrentRefinements" }), n3({ connector: connectCurrentRefinements_default }, { $$widgetType: "ais.currentRefinements" }), r4()], props: { includedAttributes: { type: Array, default: void 0 }, excludedAttributes: { type: Array, default: void 0 }, transformItems: { type: Function, default: void 0 } }, computed: { noRefinement: function() {
  return this.state && 0 === this.state.items.length;
}, widgetParams: function() {
  return { includedAttributes: this.includedAttributes, excludedAttributes: this.excludedAttributes, transformItems: this.transformItems };
} }, methods: { createItemKey: function(t37) {
  var e34 = t37.attribute, i32 = t37.value;
  return [e34, t37.type, i32, t37.operator].join(":");
}, capitalize: function(t37) {
  return t37 ? t37.toString().charAt(0).toLocaleUpperCase() + t37.toString().slice(1) : "";
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/CurrentRefinements.vue_vue&type=template&id=5584328f&lang.js
import { openBlock as e7, createElementBlock as t8, normalizeClass as n8, renderSlot as i6, createElementVNode as s6, Fragment as r7, renderList as a6, toDisplayString as l4, createTextVNode as u6, withModifiers as c4, createCommentVNode as f5 } from "vue";
var o6 = { key: 0 };
var m3 = ["onClick"];
function y2(y6, b3, R, k5, p7, L3) {
  return y6.state ? (e7(), t8("div", { key: 0, class: n8([y6.suit(), L3.noRefinement && y6.suit("", "noRefinement")]) }, [i6(y6.$slots, "default", { refine: y6.state.refine, items: y6.state.items, createURL: y6.state.createURL }, function() {
    return [s6("ul", { class: n8(y6.suit("list")) }, [(e7(true), t8(r7, null, a6(y6.state.items, function(f15) {
      return e7(), t8("li", { key: f15.attribute, class: n8(y6.suit("item")) }, [i6(y6.$slots, "item", { refine: f15.refine, item: f15, createURL: y6.state.createURL }, function() {
        return [s6("span", { class: n8(y6.suit("label")) }, l4(L3.capitalize(f15.label)) + ": ", 3), (e7(true), t8(r7, null, a6(f15.refinements, function(a30) {
          return e7(), t8("span", { key: L3.createItemKey(a30), class: n8(y6.suit("category")) }, [i6(y6.$slots, "refinement", { refine: f15.refine, refinement: a30, createURL: y6.state.createURL }, function() {
            return [s6("span", { class: n8(y6.suit("categoryLabel")) }, ["query" === a30.attribute ? (e7(), t8("q", o6, l4(a30.label), 1)) : (e7(), t8(r7, { key: 1 }, [u6(l4(a30.label), 1)], 64))], 2), s6("button", { class: n8(y6.suit("delete")), type: "button", onClick: c4(function(e34) {
              return f15.refine(a30);
            }, ["left", "exact"]) }, " ✕ ", 10, m3)];
          })], 2);
        }), 128))];
      })], 2);
    }), 128))], 2)];
  })], 2)) : f5("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/CurrentRefinements.vue.js
CurrentRefinements_vue_vue_type_script_lang_default.render = y2;
var CurrentRefinements_vue_default = CurrentRefinements_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/HierarchicalMenuList.vue_vue&type=script&lang.js
var HierarchicalMenuList_vue_vue_type_script_lang_default = { name: "HierarchicalMenuList", props: { items: { type: Array, required: true }, level: { type: Number, required: true }, refine: { type: Function, required: true }, createURL: { type: Function, required: true }, suit: { type: Function, required: true } } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/HierarchicalMenuList.vue_vue&type=template&id=420e1cd4&lang.js
import { resolveComponent as e8, openBlock as t9, createElementBlock as i7, normalizeClass as l5, Fragment as s7, renderList as a7, createElementVNode as n9, withModifiers as u7, toDisplayString as r8, createBlock as c5, createCommentVNode as v2 } from "vue";
var f6 = ["href", "onClick"];
function m4(m14, o26, d8, h13, k5, p7) {
  var R = e8("hierarchical-menu-list", true);
  return d8.items.length > 0 ? (t9(), i7("ul", { key: 0, class: l5([d8.suit("list"), d8.level > 0 && d8.suit("list", "child"), d8.suit("list", "lvl" + d8.level)]) }, [(t9(true), i7(s7, null, a7(d8.items, function(e34) {
    return t9(), i7("li", { key: e34.value, class: l5([d8.suit("item"), e34.isRefined && d8.suit("item", "selected"), e34.data && e34.data.length > 0 && d8.suit("item", "parent")]) }, [n9("a", { href: d8.createURL(e34.value), class: l5([d8.suit("link"), e34.isRefined && d8.suit("link", "selected")]), onClick: u7(function(t37) {
      return d8.refine(e34.value);
    }, ["prevent"]) }, [n9("span", { class: l5(d8.suit("label")) }, r8(e34.label), 3), n9("span", { class: l5(d8.suit("count")) }, r8(e34.count), 3)], 10, f6), e34.data ? (t9(), c5(R, { key: 0, items: e34.data, level: d8.level + 1, refine: d8.refine, createURL: d8.createURL, suit: d8.suit }, null, 8, ["items", "level", "refine", "createURL", "suit"])) : v2("", true)], 2);
  }), 128))], 2)) : v2("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/HierarchicalMenuList.vue.js
HierarchicalMenuList_vue_vue_type_script_lang_default.render = m4;
var HierarchicalMenuList_vue_default = HierarchicalMenuList_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/HierarchicalMenu.vue_vue&type=script&lang.js
var HierarchicalMenu_vue_vue_type_script_lang_default = { name: "AisHierarchicalMenu", mixins: [t({ name: "HierarchicalMenu" }), n3({ connector: connectHierarchicalMenu_default }, { $$widgetType: "ais.hierarchicalMenu" }), r4()], components: { HierarchicalMenuList: HierarchicalMenuList_vue_default }, props: { attributes: { type: Array, required: true }, limit: { type: Number, default: void 0 }, showMoreLimit: { type: Number, default: void 0 }, showMore: { type: Boolean, default: false }, sortBy: { type: [Array, Function], default: void 0 }, separator: { type: String, default: void 0 }, rootPath: { type: String, default: void 0 }, showParentLevel: { type: Boolean, default: void 0 }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { attributes: this.attributes, limit: this.limit, showMore: this.showMore, showMoreLimit: this.showMoreLimit, separator: this.separator, rootPath: this.rootPath, showParentLevel: this.showParentLevel, sortBy: this.sortBy, transformItems: this.transformItems };
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/HierarchicalMenu.vue_vue&type=template&id=15099ac6&lang.js
import { resolveComponent as e9, openBlock as t10, createElementBlock as o7, normalizeClass as s8, renderSlot as r9, createVNode as n10, withModifiers as a8, createTextVNode as i8, toDisplayString as l6, createCommentVNode as g2 } from "vue";
var h4 = ["disabled"];
function c6(c23, u26, w4, M2, f15, S2) {
  var d8 = e9("hierarchical-menu-list");
  return c23.state ? (t10(), o7("div", { key: 0, class: s8([c23.suit(), !c23.state.canRefine && c23.suit("", "noRefinement")]) }, [r9(c23.$slots, "default", { items: c23.state.items, canRefine: c23.state.canRefine, canToggleShowMore: c23.state.canToggleShowMore, isShowingMore: c23.state.isShowingMore, refine: c23.state.refine, createURL: c23.state.createURL, toggleShowMore: c23.state.toggleShowMore, sendEvent: c23.state.sendEvent }, function() {
    return [n10(d8, { items: c23.state.items, level: 0, refine: c23.state.refine, createURL: c23.state.createURL, suit: c23.suit }, null, 8, ["items", "refine", "createURL", "suit"]), w4.showMore ? (t10(), o7("button", { key: 0, class: s8([c23.suit("showMore"), !c23.state.canToggleShowMore && c23.suit("showMore", "disabled")]), disabled: !c23.state.canToggleShowMore, onClick: u26[0] || (u26[0] = a8(function() {
      for (var e34, t37 = [], o26 = arguments.length; o26--; )
        t37[o26] = arguments[o26];
      return c23.state.toggleShowMore && (e34 = c23.state).toggleShowMore.apply(e34, t37);
    }, ["prevent"])) }, [r9(c23.$slots, "showMoreLabel", { isShowingMore: c23.state.isShowingMore }, function() {
      return [i8(l6(c23.state.isShowingMore ? "Show less" : "Show more"), 1)];
    })], 10, h4)) : g2("", true)];
  })], 2)) : g2("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/HierarchicalMenu.vue.js
HierarchicalMenu_vue_vue_type_script_lang_default.render = c6;
var HierarchicalMenu_vue_default = HierarchicalMenu_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Highlighter.js
import { Fragment as t12 } from "vue";

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose6(r32, e34) {
  if (null == r32)
    return {};
  var t37 = {};
  for (var n32 in r32)
    if ({}.hasOwnProperty.call(r32, n32)) {
      if (e34.indexOf(n32) >= 0)
        continue;
      t37[n32] = r32[n32];
    }
  return t37;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function _objectWithoutProperties6(e34, t37) {
  if (null == e34)
    return {};
  var o26, r32, i32 = _objectWithoutPropertiesLoose6(e34, t37);
  if (Object.getOwnPropertySymbols) {
    var n32 = Object.getOwnPropertySymbols(e34);
    for (r32 = 0; r32 < n32.length; r32++)
      o26 = n32[r32], t37.indexOf(o26) >= 0 || {}.propertyIsEnumerable.call(e34, o26) && (i32[o26] = e34[o26]);
  }
  return i32;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch-ui-components/dist/es/lib/cx.js
function cx() {
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }
  return classNames.reduce(function(acc, className) {
    if (Array.isArray(className)) {
      return acc.concat(className);
    }
    return acc.concat([className]);
  }, []).filter(Boolean).join(" ");
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch-ui-components/dist/es/components/recommend-shared/DefaultEmpty.js
function createDefaultEmptyComponent(_ref7) {
  var createElement = _ref7.createElement, Fragment2 = _ref7.Fragment;
  var _ref23 = createElement(Fragment2, null, "No results");
  return function DefaultEmpty() {
    return _ref23;
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch-ui-components/dist/es/components/recommend-shared/DefaultHeader.js
function createDefaultHeaderComponent(_ref7) {
  var createElement = _ref7.createElement;
  return function DefaultHeader(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, items = userProps.items, translations = userProps.translations;
    if (!items || items.length < 1) {
      return null;
    }
    if (!translations.title) {
      return null;
    }
    return createElement("h3", {
      className: classNames.title
    }, translations.title);
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch-ui-components/dist/es/components/recommend-shared/DefaultItem.js
function createDefaultItemComponent(_ref7) {
  var createElement = _ref7.createElement, Fragment2 = _ref7.Fragment;
  return function DefaultItem(userProps) {
    return createElement(Fragment2, null, JSON.stringify(userProps.item, null, 2));
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch-ui-components/dist/es/components/recommend-shared/ListView.js
function createListViewComponent(_ref7) {
  var createElement = _ref7.createElement;
  return function ListView(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, ItemComponent = userProps.itemComponent, items = userProps.items, sendEvent = userProps.sendEvent;
    return createElement("div", {
      className: classNames.container
    }, createElement("ol", {
      className: classNames.list
    }, items.map(function(item2) {
      return createElement("li", {
        key: item2.objectID,
        className: classNames.item,
        onClick: sendEvent,
        onAuxClick: sendEvent
      }, createElement(ItemComponent, {
        item: item2
      }));
    })));
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch-ui-components/dist/es/components/FrequentlyBoughtTogether.js
var _excluded6 = ["classNames", "emptyComponent", "headerComponent", "itemComponent", "view", "items", "status", "translations", "sendEvent"];
function ownKeys37(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread37(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys37(Object(source), true).forEach(function(key2) {
      _defineProperty(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys37(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function createFrequentlyBoughtTogetherComponent(_ref7) {
  var createElement = _ref7.createElement, Fragment2 = _ref7.Fragment;
  return function FrequentlyBoughtTogether2(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, _userProps$emptyCompo = userProps.emptyComponent, EmptyComponent = _userProps$emptyCompo === void 0 ? createDefaultEmptyComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$emptyCompo, _userProps$headerComp = userProps.headerComponent, HeaderComponent = _userProps$headerComp === void 0 ? createDefaultHeaderComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$headerComp, _userProps$itemCompon = userProps.itemComponent, ItemComponent = _userProps$itemCompon === void 0 ? createDefaultItemComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$itemCompon, _userProps$view = userProps.view, View = _userProps$view === void 0 ? createListViewComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$view, items = userProps.items, status = userProps.status, userTranslations = userProps.translations, sendEvent = userProps.sendEvent, props = _objectWithoutProperties6(userProps, _excluded6);
    var translations = _objectSpread37({
      title: "Frequently bought together",
      sliderLabel: "Frequently bought together products"
    }, userTranslations);
    var cssClasses = {
      root: cx("ais-FrequentlyBoughtTogether", classNames.root),
      emptyRoot: cx("ais-FrequentlyBoughtTogether", classNames.root, "ais-FrequentlyBoughtTogether--empty", classNames.emptyRoot, props.className),
      title: cx("ais-FrequentlyBoughtTogether-title", classNames.title),
      container: cx("ais-FrequentlyBoughtTogether-container", classNames.container),
      list: cx("ais-FrequentlyBoughtTogether-list", classNames.list),
      item: cx("ais-FrequentlyBoughtTogether-item", classNames.item)
    };
    if (items.length === 0 && status === "idle") {
      return createElement("section", _extends({}, props, {
        className: cssClasses.emptyRoot
      }), createElement(EmptyComponent, null));
    }
    return createElement("section", _extends({}, props, {
      className: cssClasses.root
    }), createElement(HeaderComponent, {
      classNames: cssClasses,
      items,
      translations
    }), createElement(View, {
      classNames: cssClasses,
      translations,
      itemComponent: ItemComponent,
      items,
      sendEvent
    }));
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch-ui-components/dist/es/components/Highlight.js
var _excluded7 = ["parts", "highlightedTagName", "nonHighlightedTagName", "separator", "className", "classNames"];
function createHighlightPartComponent(_ref7) {
  var createElement = _ref7.createElement;
  return function HighlightPart(_ref23) {
    var classNames = _ref23.classNames, children = _ref23.children, highlightedTagName = _ref23.highlightedTagName, isHighlighted = _ref23.isHighlighted, nonHighlightedTagName = _ref23.nonHighlightedTagName;
    var TagName = isHighlighted ? highlightedTagName : nonHighlightedTagName;
    return createElement(TagName, {
      className: isHighlighted ? classNames.highlighted : classNames.nonHighlighted
    }, children);
  };
}
function createHighlightComponent(_ref33) {
  var createElement = _ref33.createElement, Fragment2 = _ref33.Fragment;
  var HighlightPart = createHighlightPartComponent({
    createElement,
    Fragment: Fragment2
  });
  return function Highlight3(userProps) {
    var parts = userProps.parts, _userProps$highlighte = userProps.highlightedTagName, highlightedTagName = _userProps$highlighte === void 0 ? "mark" : _userProps$highlighte, _userProps$nonHighlig = userProps.nonHighlightedTagName, nonHighlightedTagName = _userProps$nonHighlig === void 0 ? "span" : _userProps$nonHighlig, _userProps$separator = userProps.separator, separator = _userProps$separator === void 0 ? ", " : _userProps$separator, className = userProps.className, _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, props = _objectWithoutProperties6(userProps, _excluded7);
    return createElement("span", _extends({}, props, {
      className: cx(classNames.root, className)
    }), parts.map(function(part, partIndex) {
      var isLastPart = partIndex === parts.length - 1;
      return createElement(Fragment2, {
        key: partIndex
      }, part.map(function(subPart, subPartIndex) {
        return createElement(HighlightPart, {
          key: subPartIndex,
          classNames,
          highlightedTagName,
          nonHighlightedTagName,
          isHighlighted: subPart.isHighlighted
        }, subPart.value);
      }), !isLastPart && createElement("span", {
        className: classNames.separator
      }, separator));
    }));
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch-ui-components/dist/es/components/Hits.js
var _excluded8 = ["classNames", "hits", "itemComponent", "sendEvent", "emptyComponent", "banner", "bannerComponent"];
function createDefaultBannerComponent(_ref7) {
  var createElement = _ref7.createElement;
  return function DefaultBanner(_ref23) {
    var classNames = _ref23.classNames, banner = _ref23.banner;
    if (!banner.image.urls[0].url) {
      return null;
    }
    return createElement("aside", {
      className: cx("ais-Hits-banner", classNames.bannerRoot)
    }, banner.link ? createElement("a", {
      className: cx("ais-Hits-banner-link", classNames.bannerLink),
      href: banner.link.url,
      target: banner.link.target
    }, createElement("img", {
      className: cx("ais-Hits-banner-image", classNames.bannerImage),
      src: banner.image.urls[0].url,
      alt: banner.image.title
    })) : createElement("img", {
      className: cx("ais-Hits-banner-image", classNames.bannerImage),
      src: banner.image.urls[0].url,
      alt: banner.image.title
    }));
  };
}
function createHitsComponent(_ref33) {
  var createElement = _ref33.createElement, Fragment2 = _ref33.Fragment;
  var DefaultBannerComponent = createDefaultBannerComponent({
    createElement,
    Fragment: Fragment2
  });
  return function Hits2(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, hits = userProps.hits, ItemComponent = userProps.itemComponent, sendEvent = userProps.sendEvent, EmptyComponent = userProps.emptyComponent, banner = userProps.banner, BannerComponent = userProps.bannerComponent, props = _objectWithoutProperties6(userProps, _excluded8);
    return createElement("div", _extends({}, props, {
      className: cx("ais-Hits", classNames.root, hits.length === 0 && cx("ais-Hits--empty", classNames.emptyRoot), props.className)
    }), banner && (BannerComponent ? createElement(BannerComponent, {
      className: cx("ais-Hits-banner", classNames.bannerRoot),
      banner
    }) : createElement(DefaultBannerComponent, {
      classNames,
      banner
    })), hits.length === 0 && EmptyComponent ? createElement(EmptyComponent, null) : createElement("ol", {
      className: cx("ais-Hits-list", classNames.list)
    }, hits.map(function(hit, index3) {
      return createElement(ItemComponent, {
        key: hit.objectID,
        hit,
        index: index3,
        className: cx("ais-Hits-item", classNames.item),
        onClick: function onClick() {
          sendEvent("click:internal", hit, "Hit Clicked");
        },
        onAuxClick: function onAuxClick() {
          sendEvent("click:internal", hit, "Hit Clicked");
        }
      });
    })));
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch-ui-components/dist/es/components/RelatedProducts.js
var _excluded9 = ["classNames", "emptyComponent", "headerComponent", "itemComponent", "view", "items", "status", "translations", "sendEvent"];
function ownKeys38(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread38(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys38(Object(source), true).forEach(function(key2) {
      _defineProperty(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys38(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function createRelatedProductsComponent(_ref7) {
  var createElement = _ref7.createElement, Fragment2 = _ref7.Fragment;
  return function RelatedProducts2(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, _userProps$emptyCompo = userProps.emptyComponent, EmptyComponent = _userProps$emptyCompo === void 0 ? createDefaultEmptyComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$emptyCompo, _userProps$headerComp = userProps.headerComponent, HeaderComponent = _userProps$headerComp === void 0 ? createDefaultHeaderComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$headerComp, _userProps$itemCompon = userProps.itemComponent, ItemComponent = _userProps$itemCompon === void 0 ? createDefaultItemComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$itemCompon, _userProps$view = userProps.view, View = _userProps$view === void 0 ? createListViewComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$view, items = userProps.items, status = userProps.status, userTranslations = userProps.translations, sendEvent = userProps.sendEvent, props = _objectWithoutProperties6(userProps, _excluded9);
    var translations = _objectSpread38({
      title: "Related products",
      sliderLabel: "Related products"
    }, userTranslations);
    var cssClasses = {
      root: cx("ais-RelatedProducts", classNames.root),
      emptyRoot: cx("ais-RelatedProducts", classNames.root, "ais-RelatedProducts--empty", classNames.emptyRoot, props.className),
      title: cx("ais-RelatedProducts-title", classNames.title),
      container: cx("ais-RelatedProducts-container", classNames.container),
      list: cx("ais-RelatedProducts-list", classNames.list),
      item: cx("ais-RelatedProducts-item", classNames.item)
    };
    if (items.length === 0 && status === "idle") {
      return createElement("section", _extends({}, props, {
        className: cssClasses.emptyRoot
      }), createElement(EmptyComponent, null));
    }
    return createElement("section", _extends({}, props, {
      className: cssClasses.root
    }), createElement(HeaderComponent, {
      classNames: cssClasses,
      items,
      translations
    }), createElement(View, {
      classNames: cssClasses,
      translations,
      itemComponent: ItemComponent,
      items,
      sendEvent
    }));
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch-ui-components/dist/es/components/TrendingItems.js
var _excluded10 = ["classNames", "emptyComponent", "headerComponent", "itemComponent", "view", "items", "status", "translations", "sendEvent"];
function ownKeys39(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread39(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys39(Object(source), true).forEach(function(key2) {
      _defineProperty(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys39(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function createTrendingItemsComponent(_ref7) {
  var createElement = _ref7.createElement, Fragment2 = _ref7.Fragment;
  return function TrendingItems2(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, _userProps$emptyCompo = userProps.emptyComponent, EmptyComponent = _userProps$emptyCompo === void 0 ? createDefaultEmptyComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$emptyCompo, _userProps$headerComp = userProps.headerComponent, HeaderComponent = _userProps$headerComp === void 0 ? createDefaultHeaderComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$headerComp, _userProps$itemCompon = userProps.itemComponent, ItemComponent = _userProps$itemCompon === void 0 ? createDefaultItemComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$itemCompon, _userProps$view = userProps.view, View = _userProps$view === void 0 ? createListViewComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$view, items = userProps.items, status = userProps.status, userTranslations = userProps.translations, sendEvent = userProps.sendEvent, props = _objectWithoutProperties6(userProps, _excluded10);
    var translations = _objectSpread39({
      title: "Trending items",
      sliderLabel: "Trending items"
    }, userTranslations);
    var cssClasses = {
      root: cx("ais-TrendingItems", classNames.root),
      emptyRoot: cx("ais-TrendingItems", classNames.root, "ais-TrendingItems--empty", classNames.emptyRoot, props.className),
      title: cx("ais-TrendingItems-title", classNames.title),
      container: cx("ais-TrendingItems-container", classNames.container),
      list: cx("ais-TrendingItems-list", classNames.list),
      item: cx("ais-TrendingItems-item", classNames.item)
    };
    if (items.length === 0 && status === "idle") {
      return createElement("section", _extends({}, props, {
        className: cssClasses.emptyRoot
      }), createElement(EmptyComponent, null));
    }
    return createElement("section", _extends({}, props, {
      className: cssClasses.root
    }), createElement(HeaderComponent, {
      classNames: cssClasses,
      items,
      translations
    }), createElement(View, {
      classNames: cssClasses,
      translations,
      itemComponent: ItemComponent,
      items,
      sendEvent
    }));
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch-ui-components/dist/es/components/LookingSimilar.js
var _excluded11 = ["classNames", "emptyComponent", "headerComponent", "itemComponent", "view", "items", "status", "translations", "sendEvent"];
function ownKeys40(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread40(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys40(Object(source), true).forEach(function(key2) {
      _defineProperty(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys40(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function createLookingSimilarComponent(_ref7) {
  var createElement = _ref7.createElement, Fragment2 = _ref7.Fragment;
  return function LookingSimilar2(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, _userProps$emptyCompo = userProps.emptyComponent, EmptyComponent = _userProps$emptyCompo === void 0 ? createDefaultEmptyComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$emptyCompo, _userProps$headerComp = userProps.headerComponent, HeaderComponent = _userProps$headerComp === void 0 ? createDefaultHeaderComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$headerComp, _userProps$itemCompon = userProps.itemComponent, ItemComponent = _userProps$itemCompon === void 0 ? createDefaultItemComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$itemCompon, _userProps$view = userProps.view, View = _userProps$view === void 0 ? createListViewComponent({
      createElement,
      Fragment: Fragment2
    }) : _userProps$view, items = userProps.items, status = userProps.status, userTranslations = userProps.translations, sendEvent = userProps.sendEvent, props = _objectWithoutProperties6(userProps, _excluded11);
    var translations = _objectSpread40({
      title: "Looking similar",
      sliderLabel: "Looking similar"
    }, userTranslations);
    var cssClasses = {
      root: cx("ais-LookingSimilar", classNames.root),
      emptyRoot: cx("ais-LookingSimilar", classNames.root, "ais-LookingSimilar--empty", classNames.emptyRoot, props.className),
      title: cx("ais-LookingSimilar-title", classNames.title),
      container: cx("ais-LookingSimilar-container", classNames.container),
      list: cx("ais-LookingSimilar-list", classNames.list),
      item: cx("ais-LookingSimilar-item", classNames.item)
    };
    if (items.length === 0 && status === "idle") {
      return createElement("section", _extends({}, props, {
        className: cssClasses.emptyRoot
      }), createElement(EmptyComponent, null));
    }
    return createElement("section", _extends({}, props, {
      className: cssClasses.root
    }), createElement(HeaderComponent, {
      classNames: cssClasses,
      items,
      translations
    }), createElement(View, {
      classNames: cssClasses,
      translations,
      itemComponent: ItemComponent,
      items,
      sendEvent
    }));
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/util/pragma.js
import { h as r10, Fragment as t11 } from "vue";
import { Fragment } from "vue";
var e10 = function(e34, n32, i32) {
  if (!i32)
    return r10(e34, n32);
  if (e34 === t11)
    return r10(e34, Array.isArray(i32) ? i32 : [i32]);
  var f15 = "string" == typeof i32 ? { default: function() {
    return i32;
  } } : i32, o26 = "string" == typeof e34 ? n32 : Object.assign(n32, { children: i32 });
  return r10(e34, o26, f15);
};

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Highlighter.js
var g3 = createHighlightComponent({ createElement: e10, Fragment: t12 });
var Highlighter_default = { name: "AisHighlighter", props: { hit: { type: Object, required: true }, attribute: { type: String, required: true }, highlightedTagName: { type: String, default: "mark" }, suit: { type: Function, required: true }, highlightProperty: { type: String, required: true }, preTag: { type: String, required: true }, postTag: { type: String, required: true } }, render: function() {
  var i32 = getPropertyByPath(this.hit[this.highlightProperty], this.attribute) || [], n32 = (Array.isArray(i32) ? i32 : [i32]).map(function(t37) {
    return getHighlightedParts(unescape2(t37.value || "")).map(function(t38) {
      var i33 = t38.value;
      return { value: " " === i33 ? "  " : i33, isHighlighted: t38.isHighlighted };
    });
  });
  return e10(g3, { classNames: { root: this.suit(), highlighted: this.suit("highlighted") }, highlightedTagName: this.highlightedTagName, nonHighlightedTagName: t12, parts: n32 });
} };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Highlight.vue_vue&type=script&lang.js
var Highlight_vue_vue_type_script_lang_default = { name: "AisHighlight", mixins: [t({ name: "Highlight" })], components: { AisHighlighter: Highlighter_default }, props: { hit: { type: Object, required: true }, attribute: { type: String, required: true }, highlightedTagName: { type: String, default: "mark" } } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Highlight.vue_vue&type=template&id=214ecb36&lang.js
import { resolveComponent as t13, openBlock as i9, createBlock as h5 } from "vue";
function g4(g9, e34, a30, r32, u26, l27) {
  var m14 = t13("ais-highlighter");
  return i9(), h5(m14, { hit: a30.hit, attribute: a30.attribute, "highlighted-tag-name": a30.highlightedTagName, suit: g9.suit, "highlight-property": "_highlightResult", "pre-tag": "<mark>", "post-tag": "</mark>" }, null, 8, ["hit", "attribute", "highlighted-tag-name", "suit"]);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Highlight.vue.js
Highlight_vue_vue_type_script_lang_default.render = g4;
var Highlight_vue_default = Highlight_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Hits.js
var Hits_default = { name: "AisHits", mixins: [n3({ connector: connectHitsWithInsights_default }, { $$widgetType: "ais.hits" }), t({ name: "Hits" })], props: { escapeHTML: { type: Boolean, default: true }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { escapeHTML: this.escapeHTML, transformItems: this.transformItems };
} }, render: n(function(t37) {
  var s30 = this;
  if (!this.state)
    return null;
  var i32 = u(this, "default"), n32 = u(this, "item");
  return !n32 && i32 ? t37("div", { attrs: { class: this.suit() } }, [i32({ items: this.state.items, insights: this.state.insights, sendEvent: this.state.sendEvent })]) : t37(createHitsComponent({ createElement: t37 }), { hits: this.state.items, itemComponent: function(e34) {
    var i33 = e34.hit, a30 = e34.index, r32 = e34.onClick, o26 = e34.onAuxClick, m14 = (e34.key, function(t38, s31) {
      var e35 = {};
      for (var i34 in t38)
        Object.prototype.hasOwnProperty.call(t38, i34) && -1 === s31.indexOf(i34) && (e35[i34] = t38[i34]);
      return e35;
    }(e34, ["hit", "index", "onClick", "onAuxClick", "key"]));
    return t37("li", { key: i33.objectID, attrs: m14, on: { click: r32, auxclick: o26 } }, [n32 && n32({ item: i33, index: a30, insights: s30.state.insights, sendEvent: s30.state.sendEvent }) || "objectID: " + i33.objectID + ", index: " + a30]);
  }, sendEvent: this.state.sendEvent, classNames: this.classNames && { root: this.classNames["ais-Hits"], list: this.classNames["ais-Hits-list"], item: this.classNames["ais-Hits-item"] } });
}) };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/HitsPerPage.vue_vue&type=script&lang.js
var HitsPerPage_vue_vue_type_script_lang_default = { name: "AisHitsPerPage", mixins: [t({ name: "HitsPerPage" }), n3({ connector: connectHitsPerPage_default }, { $$widgetType: "ais.hitsPerPage" }), r4()], props: { items: { type: Array, required: true }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { items: this.items, transformItems: this.transformItems };
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/HitsPerPage.vue_vue&type=template&id=5d43db9c&lang.js
import { openBlock as e11, createElementBlock as t14, normalizeClass as s9, renderSlot as a9, createElementVNode as n11, Fragment as u8, renderList as i10, toDisplayString as r11, createCommentVNode as l7 } from "vue";
var c7 = ["value", "selected"];
function o8(o26, f15, v7, R, m14, d8) {
  return o26.state ? (e11(), t14("div", { key: 0, class: s9(o26.suit()) }, [a9(o26.$slots, "default", { items: o26.state.items, refine: o26.state.refine, hasNoResults: o26.state.hasNoResults, canRefine: o26.state.canRefine, createURL: o26.state.createURL }, function() {
    return [n11("select", { class: s9(o26.suit("select")), onChange: f15[0] || (f15[0] = function(e34) {
      return o26.state.refine(Number(e34.currentTarget.value));
    }) }, [(e11(true), t14(u8, null, i10(o26.state.items, function(a30) {
      return e11(), t14("option", { key: a30.value, class: s9(o26.suit("option")), value: a30.value, selected: a30.isRefined }, r11(a30.label), 11, c7);
    }), 128))], 34)];
  })], 2)) : l7("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/HitsPerPage.vue.js
HitsPerPage_vue_vue_type_script_lang_default.render = o8;
var HitsPerPage_vue_default = HitsPerPage_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/index/index.js
var import_algoliasearch_helper3 = __toESM(require_algoliasearch_helper2());
function _typeof40(obj) {
  "@babel/helpers - typeof";
  return _typeof40 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof40(obj);
}
var _excluded12 = ["initialSearchParameters"];
var _excluded24 = ["initialRecommendParameters"];
function ownKeys41(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread41(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys41(Object(source), true).forEach(function(key2) {
      _defineProperty39(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys41(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty39(obj, key2, value) {
  key2 = _toPropertyKey38(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey38(arg) {
  var key2 = _toPrimitive38(arg, "string");
  return _typeof40(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive38(input, hint) {
  if (_typeof40(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof40(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toConsumableArray10(arr) {
  return _arrayWithoutHoles10(arr) || _iterableToArray10(arr) || _unsupportedIterableToArray19(arr) || _nonIterableSpread10();
}
function _nonIterableSpread10() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray19(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray19(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray19(o26, minLen);
}
function _iterableToArray10(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles10(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray19(arr);
}
function _arrayLikeToArray19(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _objectWithoutProperties7(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose7(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose7(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
var withUsage31 = createDocumentationMessageGenerator({
  name: "index-widget"
});
function privateHelperSetState(helper, _ref7) {
  var state = _ref7.state, recommendState = _ref7.recommendState, isPageReset = _ref7.isPageReset, _uiState = _ref7._uiState;
  if (state !== helper.state) {
    helper.state = state;
    helper.emit("change", {
      state: helper.state,
      results: helper.lastResults,
      isPageReset,
      _uiState
    });
  }
  if (recommendState !== helper.recommendState) {
    helper.recommendState = recommendState;
  }
}
function getLocalWidgetsUiState(widgets, widgetStateOptions) {
  var initialUiState = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return widgets.reduce(function(uiState, widget) {
    if (isIndexWidget(widget)) {
      return uiState;
    }
    if (!widget.getWidgetUiState && !widget.getWidgetState) {
      return uiState;
    }
    if (widget.getWidgetUiState) {
      return widget.getWidgetUiState(uiState, widgetStateOptions);
    }
    return widget.getWidgetState(uiState, widgetStateOptions);
  }, initialUiState);
}
function getLocalWidgetsSearchParameters(widgets, widgetSearchParametersOptions) {
  var initialSearchParameters = widgetSearchParametersOptions.initialSearchParameters, rest = _objectWithoutProperties7(widgetSearchParametersOptions, _excluded12);
  return widgets.reduce(function(state, widget) {
    if (!widget.getWidgetSearchParameters || isIndexWidget(widget)) {
      return state;
    }
    if (widget.dependsOn === "search" && widget.getWidgetParameters) {
      return widget.getWidgetParameters(state, rest);
    }
    return widget.getWidgetSearchParameters(state, rest);
  }, initialSearchParameters);
}
function getLocalWidgetsRecommendParameters(widgets, widgetRecommendParametersOptions) {
  var initialRecommendParameters = widgetRecommendParametersOptions.initialRecommendParameters, rest = _objectWithoutProperties7(widgetRecommendParametersOptions, _excluded24);
  return widgets.reduce(function(state, widget) {
    if (!isIndexWidget(widget) && widget.dependsOn === "recommend" && widget.getWidgetParameters) {
      return widget.getWidgetParameters(state, rest);
    }
    return state;
  }, initialRecommendParameters);
}
function resetPageFromWidgets(widgets) {
  var indexWidgets = widgets.filter(isIndexWidget);
  if (indexWidgets.length === 0) {
    return;
  }
  indexWidgets.forEach(function(widget) {
    var widgetHelper = widget.getHelper();
    privateHelperSetState(widgetHelper, {
      state: widgetHelper.state.resetPage(),
      recommendState: widgetHelper.recommendState,
      isPageReset: true
    });
    resetPageFromWidgets(widget.getWidgets());
  });
}
function resolveScopedResultsFromWidgets(widgets) {
  var indexWidgets = widgets.filter(isIndexWidget);
  return indexWidgets.reduce(function(scopedResults, current) {
    return scopedResults.concat.apply(scopedResults, [{
      indexId: current.getIndexId(),
      results: current.getResults(),
      helper: current.getHelper()
    }].concat(_toConsumableArray10(resolveScopedResultsFromWidgets(current.getWidgets()))));
  }, []);
}
var index = function index2(widgetParams) {
  if (widgetParams === void 0 || widgetParams.indexName === void 0) {
    throw new Error(withUsage31("The `indexName` option is required."));
  }
  var indexName = widgetParams.indexName, _widgetParams$indexId = widgetParams.indexId, indexId = _widgetParams$indexId === void 0 ? indexName : _widgetParams$indexId;
  var localWidgets = [];
  var localUiState = {};
  var localInstantSearchInstance = null;
  var localParent = null;
  var helper = null;
  var derivedHelper = null;
  var lastValidSearchParameters = null;
  var hasRecommendWidget = false;
  var hasSearchWidget = false;
  return {
    $$type: "ais.index",
    $$widgetType: "ais.index",
    getIndexName: function getIndexName() {
      return indexName;
    },
    getIndexId: function getIndexId() {
      return indexId;
    },
    getHelper: function getHelper() {
      return helper;
    },
    getResults: function getResults() {
      var _derivedHelper;
      if (!((_derivedHelper = derivedHelper) !== null && _derivedHelper !== void 0 && _derivedHelper.lastResults))
        return null;
      derivedHelper.lastResults._state = helper.state;
      return derivedHelper.lastResults;
    },
    getResultsForWidget: function getResultsForWidget(widget) {
      var _helper;
      if (widget.dependsOn !== "recommend" || isIndexWidget(widget) || widget.$$id === void 0) {
        return this.getResults();
      }
      if (!((_helper = helper) !== null && _helper !== void 0 && _helper.lastRecommendResults)) {
        return null;
      }
      return helper.lastRecommendResults[widget.$$id];
    },
    getPreviousState: function getPreviousState() {
      return lastValidSearchParameters;
    },
    getScopedResults: function getScopedResults() {
      var widgetParent = this.getParent();
      var widgetSiblings;
      if (widgetParent) {
        widgetSiblings = widgetParent.getWidgets();
      } else if (indexName.length === 0) {
        widgetSiblings = this.getWidgets();
      } else {
        widgetSiblings = [this];
      }
      return resolveScopedResultsFromWidgets(widgetSiblings);
    },
    getParent: function getParent() {
      return localParent;
    },
    createURL: function createURL(nextState) {
      if (typeof nextState === "function") {
        return localInstantSearchInstance._createURL(_defineProperty39({}, indexId, nextState(localUiState)));
      }
      return localInstantSearchInstance._createURL(_defineProperty39({}, indexId, getLocalWidgetsUiState(localWidgets, {
        searchParameters: nextState,
        helper
      })));
    },
    getWidgets: function getWidgets() {
      return localWidgets;
    },
    addWidgets: function addWidgets(widgets) {
      var _this = this;
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage31("The `addWidgets` method expects an array of widgets."));
      }
      if (widgets.some(function(widget) {
        return typeof widget.init !== "function" && typeof widget.render !== "function";
      })) {
        throw new Error(withUsage31("The widget definition expects a `render` and/or an `init` method."));
      }
      widgets.forEach(function(widget) {
        if (isIndexWidget(widget)) {
          return;
        }
        if (localInstantSearchInstance && widget.dependsOn === "recommend") {
          localInstantSearchInstance._hasRecommendWidget = true;
        } else if (localInstantSearchInstance) {
          localInstantSearchInstance._hasSearchWidget = true;
        } else if (widget.dependsOn === "recommend") {
          hasRecommendWidget = true;
        } else {
          hasSearchWidget = true;
        }
        addWidgetId(widget);
      });
      localWidgets = localWidgets.concat(widgets);
      if (localInstantSearchInstance && Boolean(widgets.length)) {
        privateHelperSetState(helper, {
          state: getLocalWidgetsSearchParameters(localWidgets, {
            uiState: localUiState,
            initialSearchParameters: helper.state
          }),
          recommendState: getLocalWidgetsRecommendParameters(localWidgets, {
            uiState: localUiState,
            initialRecommendParameters: helper.recommendState
          }),
          _uiState: localUiState
        });
        widgets.forEach(function(widget) {
          if (widget.getRenderState) {
            var renderState = widget.getRenderState(localInstantSearchInstance.renderState[_this.getIndexId()] || {}, createInitArgs(localInstantSearchInstance, _this, localInstantSearchInstance._initialUiState));
            storeRenderState({
              renderState,
              instantSearchInstance: localInstantSearchInstance,
              parent: _this
            });
          }
        });
        widgets.forEach(function(widget) {
          if (widget.init) {
            widget.init(createInitArgs(localInstantSearchInstance, _this, localInstantSearchInstance._initialUiState));
          }
        });
        localInstantSearchInstance.scheduleSearch();
      }
      return this;
    },
    removeWidgets: function removeWidgets(widgets) {
      var _this2 = this;
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage31("The `removeWidgets` method expects an array of widgets."));
      }
      if (widgets.some(function(widget) {
        return typeof widget.dispose !== "function";
      })) {
        throw new Error(withUsage31("The widget definition expects a `dispose` method."));
      }
      localWidgets = localWidgets.filter(function(widget) {
        return widgets.indexOf(widget) === -1;
      });
      localWidgets.forEach(function(widget) {
        if (isIndexWidget(widget)) {
          return;
        }
        if (localInstantSearchInstance && widget.dependsOn === "recommend") {
          localInstantSearchInstance._hasRecommendWidget = true;
        } else if (localInstantSearchInstance) {
          localInstantSearchInstance._hasSearchWidget = true;
        } else if (widget.dependsOn === "recommend") {
          hasRecommendWidget = true;
        } else {
          hasSearchWidget = true;
        }
      });
      if (localInstantSearchInstance && Boolean(widgets.length)) {
        var _widgets$reduce = widgets.reduce(function(states, widget) {
          var next = widget.dispose({
            helper,
            state: states.cleanedSearchState,
            recommendState: states.cleanedRecommendState,
            parent: _this2
          });
          if (next instanceof import_algoliasearch_helper3.default.RecommendParameters) {
            states.cleanedRecommendState = next;
          } else if (next) {
            states.cleanedSearchState = next;
          }
          return states;
        }, {
          cleanedSearchState: helper.state,
          cleanedRecommendState: helper.recommendState
        }), cleanedSearchState = _widgets$reduce.cleanedSearchState, cleanedRecommendState = _widgets$reduce.cleanedRecommendState;
        var newState = localInstantSearchInstance.future.preserveSharedStateOnUnmount ? getLocalWidgetsSearchParameters(localWidgets, {
          uiState: localUiState,
          initialSearchParameters: new import_algoliasearch_helper3.default.SearchParameters({
            index: this.getIndexName()
          })
        }) : getLocalWidgetsSearchParameters(localWidgets, {
          uiState: getLocalWidgetsUiState(localWidgets, {
            searchParameters: cleanedSearchState,
            helper
          }),
          initialSearchParameters: cleanedSearchState
        });
        localUiState = getLocalWidgetsUiState(localWidgets, {
          searchParameters: newState,
          helper
        });
        helper.setState(newState);
        helper.recommendState = cleanedRecommendState;
        if (localWidgets.length) {
          localInstantSearchInstance.scheduleSearch();
        }
      }
      return this;
    },
    init: function init(_ref23) {
      var _this3 = this, _instantSearchInstanc;
      var instantSearchInstance = _ref23.instantSearchInstance, parent = _ref23.parent, uiState = _ref23.uiState;
      if (helper !== null) {
        return;
      }
      localInstantSearchInstance = instantSearchInstance;
      localParent = parent;
      localUiState = uiState[indexId] || {};
      var mainHelper = instantSearchInstance.mainHelper;
      var parameters = getLocalWidgetsSearchParameters(localWidgets, {
        uiState: localUiState,
        initialSearchParameters: new import_algoliasearch_helper3.default.SearchParameters({
          index: indexName
        })
      });
      var recommendParameters = getLocalWidgetsRecommendParameters(localWidgets, {
        uiState: localUiState,
        initialRecommendParameters: new import_algoliasearch_helper3.default.RecommendParameters()
      });
      helper = (0, import_algoliasearch_helper3.default)({}, parameters.index, parameters);
      helper.recommendState = recommendParameters;
      helper.search = function() {
        if (instantSearchInstance.onStateChange) {
          instantSearchInstance.onStateChange({
            uiState: instantSearchInstance.mainIndex.getWidgetUiState({}),
            setUiState: function setUiState(nextState) {
              return instantSearchInstance.setUiState(nextState, false);
            }
          });
          return mainHelper;
        }
        return mainHelper.search();
      };
      helper.searchWithoutTriggeringOnStateChange = function() {
        return mainHelper.search();
      };
      helper.searchForFacetValues = function(facetName, facetValue, maxFacetHits, userState) {
        var state = helper.state.setQueryParameters(userState);
        return mainHelper.searchForFacetValues(facetName, facetValue, maxFacetHits, state);
      };
      derivedHelper = mainHelper.derive(function() {
        return mergeSearchParameters.apply(void 0, [mainHelper.state].concat(_toConsumableArray10(resolveSearchParameters(_this3))));
      }, function() {
        return _this3.getHelper().recommendState;
      });
      var indexInitialResults = (_instantSearchInstanc = instantSearchInstance._initialResults) === null || _instantSearchInstanc === void 0 ? void 0 : _instantSearchInstanc[this.getIndexId()];
      if (indexInitialResults !== null && indexInitialResults !== void 0 && indexInitialResults.results) {
        var results = new import_algoliasearch_helper3.default.SearchResults(new import_algoliasearch_helper3.default.SearchParameters(indexInitialResults.state), indexInitialResults.results);
        derivedHelper.lastResults = results;
        helper.lastResults = results;
      }
      if (indexInitialResults !== null && indexInitialResults !== void 0 && indexInitialResults.recommendResults) {
        var recommendResults = new import_algoliasearch_helper3.default.RecommendResults(new import_algoliasearch_helper3.default.RecommendParameters({
          params: indexInitialResults.recommendResults.params
        }), indexInitialResults.recommendResults.results);
        derivedHelper.lastRecommendResults = recommendResults;
        helper.lastRecommendResults = recommendResults;
      }
      helper.on("change", function(_ref33) {
        var isPageReset = _ref33.isPageReset;
        if (isPageReset) {
          resetPageFromWidgets(localWidgets);
        }
      });
      derivedHelper.on("search", function() {
        instantSearchInstance.scheduleStalledRender();
        if (true) {
          checkIndexUiState({
            index: _this3,
            indexUiState: localUiState
          });
        }
      });
      derivedHelper.on("result", function(_ref44) {
        var results2 = _ref44.results;
        instantSearchInstance.scheduleRender();
        helper.lastResults = results2;
        lastValidSearchParameters = results2 === null || results2 === void 0 ? void 0 : results2._state;
      });
      derivedHelper.on("recommend:result", function(_ref52) {
        var recommend = _ref52.recommend;
        instantSearchInstance.scheduleRender();
        helper.lastRecommendResults = recommend.results;
      });
      localWidgets.forEach(function(widget) {
        if (widget.getRenderState) {
          var renderState = widget.getRenderState(instantSearchInstance.renderState[_this3.getIndexId()] || {}, createInitArgs(instantSearchInstance, _this3, uiState));
          storeRenderState({
            renderState,
            instantSearchInstance,
            parent: _this3
          });
        }
      });
      localWidgets.forEach(function(widget) {
        true ? _warning(
          // if it has NO getWidgetState or if it has getWidgetUiState, we don't warn
          // aka we warn if there's _only_ getWidgetState
          !widget.getWidgetState || Boolean(widget.getWidgetUiState),
          "The `getWidgetState` method is renamed `getWidgetUiState` and will no longer exist under that name in InstantSearch.js 5.x. Please use `getWidgetUiState` instead."
        ) : void 0;
        if (widget.init) {
          widget.init(createInitArgs(instantSearchInstance, _this3, uiState));
        }
      });
      helper.on("change", function(event) {
        var state = event.state;
        var _uiState = event._uiState;
        localUiState = getLocalWidgetsUiState(localWidgets, {
          searchParameters: state,
          helper
        }, _uiState || {});
        if (!instantSearchInstance.onStateChange) {
          instantSearchInstance.onInternalStateChange();
        }
      });
      if (indexInitialResults) {
        instantSearchInstance.scheduleRender();
      }
      if (hasRecommendWidget) {
        instantSearchInstance._hasRecommendWidget = true;
      }
      if (hasSearchWidget) {
        instantSearchInstance._hasSearchWidget = true;
      }
    },
    render: function render(_ref63) {
      var _derivedHelper2, _this4 = this;
      var instantSearchInstance = _ref63.instantSearchInstance;
      if (instantSearchInstance.status === "error" && !instantSearchInstance.mainHelper.hasPendingRequests() && lastValidSearchParameters) {
        helper.setState(lastValidSearchParameters);
      }
      var widgetsToRender = this.getResults() || (_derivedHelper2 = derivedHelper) !== null && _derivedHelper2 !== void 0 && _derivedHelper2.lastRecommendResults ? localWidgets : localWidgets.filter(isIndexWidget);
      widgetsToRender = widgetsToRender.filter(function(widget) {
        if (!widget.shouldRender) {
          return true;
        }
        return widget.shouldRender({
          instantSearchInstance
        });
      });
      widgetsToRender.forEach(function(widget) {
        if (widget.getRenderState) {
          var renderState = widget.getRenderState(instantSearchInstance.renderState[_this4.getIndexId()] || {}, createRenderArgs(instantSearchInstance, _this4, widget));
          storeRenderState({
            renderState,
            instantSearchInstance,
            parent: _this4
          });
        }
      });
      widgetsToRender.forEach(function(widget) {
        if (widget.render) {
          widget.render(createRenderArgs(instantSearchInstance, _this4, widget));
        }
      });
    },
    dispose: function dispose() {
      var _this5 = this, _helper2, _derivedHelper3;
      localWidgets.forEach(function(widget) {
        if (widget.dispose && helper) {
          widget.dispose({
            helper,
            state: helper.state,
            recommendState: helper.recommendState,
            parent: _this5
          });
        }
      });
      localInstantSearchInstance = null;
      localParent = null;
      (_helper2 = helper) === null || _helper2 === void 0 ? void 0 : _helper2.removeAllListeners();
      helper = null;
      (_derivedHelper3 = derivedHelper) === null || _derivedHelper3 === void 0 ? void 0 : _derivedHelper3.detach();
      derivedHelper = null;
    },
    getWidgetUiState: function getWidgetUiState(uiState) {
      return localWidgets.filter(isIndexWidget).reduce(function(previousUiState, innerIndex) {
        return innerIndex.getWidgetUiState(previousUiState);
      }, _objectSpread41(_objectSpread41({}, uiState), {}, _defineProperty39({}, indexId, _objectSpread41(_objectSpread41({}, uiState[indexId]), localUiState))));
    },
    getWidgetState: function getWidgetState(uiState) {
      true ? _warning(false, "The `getWidgetState` method is renamed `getWidgetUiState` and will no longer exist under that name in InstantSearch.js 5.x. Please use `getWidgetUiState` instead.") : void 0;
      return this.getWidgetUiState(uiState);
    },
    getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref7) {
      var uiState = _ref7.uiState;
      return getLocalWidgetsSearchParameters(localWidgets, {
        uiState,
        initialSearchParameters: searchParameters
      });
    },
    refreshUiState: function refreshUiState() {
      localUiState = getLocalWidgetsUiState(localWidgets, {
        searchParameters: this.getHelper().state,
        helper: this.getHelper()
      }, localUiState);
    },
    setIndexUiState: function setIndexUiState(indexUiState) {
      var nextIndexUiState = typeof indexUiState === "function" ? indexUiState(localUiState) : indexUiState;
      localInstantSearchInstance.setUiState(function(state) {
        return _objectSpread41(_objectSpread41({}, state), {}, _defineProperty39({}, indexId, nextIndexUiState));
      });
    }
  };
};
var index_default = index;
function storeRenderState(_ref8) {
  var renderState = _ref8.renderState, instantSearchInstance = _ref8.instantSearchInstance, parent = _ref8.parent;
  var parentIndexName = parent ? parent.getIndexId() : instantSearchInstance.mainIndex.getIndexId();
  instantSearchInstance.renderState = _objectSpread41(_objectSpread41({}, instantSearchInstance.renderState), {}, _defineProperty39({}, parentIndexName, _objectSpread41(_objectSpread41({}, instantSearchInstance.renderState[parentIndexName]), renderState)));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Index.js
var Index_default = { name: "AisIndex", mixins: [t({ name: "Index" }), n3({ connector: function() {
  return index_default;
} }, { $$widgetType: "ais.index" })], provide: function() {
  var e34 = this;
  return { $_ais_getParentIndex: function() {
    return e34.widget;
  } };
}, props: { indexName: { type: String, required: true }, indexId: { type: String, required: false } }, render: n(function(e34) {
  return e34("div", {}, s(this));
}), computed: { widgetParams: function() {
  return { indexName: this.indexName, indexId: this.indexId };
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/suit.js
var NAMESPACE = "ais";
var component = function component2(componentName) {
  return function() {
    var _ref7 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, descendantName = _ref7.descendantName, modifierName = _ref7.modifierName;
    var descendent = descendantName ? "-".concat(descendantName) : "";
    var modifier = modifierName ? "--".concat(modifierName) : "";
    return "".concat(NAMESPACE, "-").concat(componentName).concat(descendent).concat(modifier);
  };
};

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/helpers/highlight.js
var suit = component("Highlight");
function highlight(_ref7) {
  var attribute = _ref7.attribute, _ref$highlightedTagNa = _ref7.highlightedTagName, highlightedTagName = _ref$highlightedTagNa === void 0 ? "mark" : _ref$highlightedTagNa, hit = _ref7.hit, _ref$cssClasses = _ref7.cssClasses, cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  true ? _warning(false, "`instantsearch.highlight` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `Highlight` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var highlightAttributeResult = getPropertyByPath(hit._highlightResult, attribute);
  true ? _warning(highlightAttributeResult, 'Could not enable highlight for "'.concat(attribute, '", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var _ref23 = highlightAttributeResult || {}, _ref2$value = _ref23.value, attributeValue = _ref2$value === void 0 ? "" : _ref2$value;
  var className = suit({
    descendantName: "highlighted"
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : "");
  return attributeValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, "g"), "<".concat(highlightedTagName, ' class="').concat(className, '">')).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, "g"), "</".concat(highlightedTagName, ">"));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/helpers/reverseHighlight.js
var suit2 = component("ReverseHighlight");
function reverseHighlight(_ref7) {
  var attribute = _ref7.attribute, _ref$highlightedTagNa = _ref7.highlightedTagName, highlightedTagName = _ref$highlightedTagNa === void 0 ? "mark" : _ref$highlightedTagNa, hit = _ref7.hit, _ref$cssClasses = _ref7.cssClasses, cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  true ? _warning(false, "`instantsearch.reverseHighlight` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `ReverseHighlight` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var highlightAttributeResult = getPropertyByPath(hit._highlightResult, attribute);
  true ? _warning(highlightAttributeResult, 'Could not enable reverse highlight for "'.concat(attribute, '", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var _ref23 = highlightAttributeResult || {}, _ref2$value = _ref23.value, attributeValue = _ref2$value === void 0 ? "" : _ref2$value;
  var className = suit2({
    descendantName: "highlighted"
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : "");
  var reverseHighlightedValue = concatHighlightedParts(reverseHighlightedParts(getHighlightedParts(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, "g"), "<".concat(highlightedTagName, ' class="').concat(className, '">')).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, "g"), "</".concat(highlightedTagName, ">"));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/helpers/snippet.js
var suit3 = component("Snippet");
function snippet(_ref7) {
  var attribute = _ref7.attribute, _ref$highlightedTagNa = _ref7.highlightedTagName, highlightedTagName = _ref$highlightedTagNa === void 0 ? "mark" : _ref$highlightedTagNa, hit = _ref7.hit, _ref$cssClasses = _ref7.cssClasses, cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  true ? _warning(false, "`instantsearch.snippet` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `Snippet` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var snippetAttributeResult = getPropertyByPath(hit._snippetResult, attribute);
  true ? _warning(snippetAttributeResult, 'Could not enable snippet for "'.concat(attribute, '", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var _ref23 = snippetAttributeResult || {}, _ref2$value = _ref23.value, attributeValue = _ref2$value === void 0 ? "" : _ref2$value;
  var className = suit3({
    descendantName: "highlighted"
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : "");
  return attributeValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, "g"), "<".concat(highlightedTagName, ' class="').concat(className, '">')).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, "g"), "</".concat(highlightedTagName, ">"));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/helpers/reverseSnippet.js
var suit4 = component("ReverseSnippet");
function reverseSnippet(_ref7) {
  var attribute = _ref7.attribute, _ref$highlightedTagNa = _ref7.highlightedTagName, highlightedTagName = _ref$highlightedTagNa === void 0 ? "mark" : _ref$highlightedTagNa, hit = _ref7.hit, _ref$cssClasses = _ref7.cssClasses, cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  true ? _warning(false, "`instantsearch.reverseSnippet` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `ReverseSnippet` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var snippetAttributeResult = getPropertyByPath(hit._snippetResult, attribute);
  true ? _warning(snippetAttributeResult, 'Could not enable reverse snippet for "'.concat(attribute, '", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var _ref23 = snippetAttributeResult || {}, _ref2$value = _ref23.value, attributeValue = _ref2$value === void 0 ? "" : _ref2$value;
  var className = suit4({
    descendantName: "highlighted"
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : "");
  var reverseHighlightedValue = concatHighlightedParts(reverseHighlightedParts(getHighlightedParts(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, "g"), "<".concat(highlightedTagName, ' class="').concat(className, '">')).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, "g"), "</".concat(highlightedTagName, ">"));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/helpers/get-insights-anonymous-user-token.js
function _typeof41(obj) {
  "@babel/helpers - typeof";
  return _typeof41 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof41(obj);
}
var ANONYMOUS_TOKEN_COOKIE_KEY = "_ALGOLIA";
function getCookie(name) {
  if ((typeof document === "undefined" ? "undefined" : _typeof41(document)) !== "object" || typeof document.cookie !== "string") {
    return void 0;
  }
  var prefix = "".concat(name, "=");
  var cookies = document.cookie.split(";");
  for (var i32 = 0; i32 < cookies.length; i32++) {
    var cookie = cookies[i32];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(prefix) === 0) {
      return cookie.substring(prefix.length, cookie.length);
    }
  }
  return void 0;
}
function getInsightsAnonymousUserTokenInternal() {
  return getCookie(ANONYMOUS_TOKEN_COOKIE_KEY);
}
function getInsightsAnonymousUserToken() {
  true ? _warning(false, "`getInsightsAnonymousUserToken` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : void 0;
  return getInsightsAnonymousUserTokenInternal();
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/infiniteHitsCache/sessionStorage.js
var _excluded13 = ["page"];
function _objectWithoutProperties8(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose8(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose8(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function getStateWithoutPage2(state) {
  var _ref7 = state || {}, page = _ref7.page, rest = _objectWithoutProperties8(_ref7, _excluded13);
  return rest;
}
var KEY = "ais.infiniteHits";
function createInfiniteHitsSessionStorageCache() {
  return {
    read: function read(_ref23) {
      var state = _ref23.state;
      var sessionStorage = safelyRunOnBrowser(function(_ref33) {
        var window2 = _ref33.window;
        return window2.sessionStorage;
      });
      if (!sessionStorage) {
        return null;
      }
      try {
        var cache = JSON.parse(
          // @ts-expect-error JSON.parse() requires a string, but it actually accepts null, too.
          sessionStorage.getItem(KEY)
        );
        return cache && isEqual(cache.state, getStateWithoutPage2(state)) ? cache.hits : null;
      } catch (error) {
        if (error instanceof SyntaxError) {
          try {
            sessionStorage.removeItem(KEY);
          } catch (err) {
          }
        }
        return null;
      }
    },
    write: function write(_ref44) {
      var state = _ref44.state, hits = _ref44.hits;
      var sessionStorage = safelyRunOnBrowser(function(_ref52) {
        var window2 = _ref52.window;
        return window2.sessionStorage;
      });
      if (!sessionStorage) {
        return;
      }
      try {
        sessionStorage.setItem(KEY, JSON.stringify({
          state: getStateWithoutPage2(state),
          hits
        }));
      } catch (error) {
      }
    }
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/InstantSearch.js
var import_events = __toESM(require_events(), 1);
var import_algoliasearch_helper4 = __toESM(require_algoliasearch_helper2(), 1);

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/middlewares/createInsightsMiddleware.js
function _typeof42(obj) {
  "@babel/helpers - typeof";
  return _typeof42 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof42(obj);
}
function ownKeys42(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread42(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys42(Object(source), true).forEach(function(key2) {
      _defineProperty40(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys42(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty40(obj, key2, value) {
  key2 = _toPropertyKey39(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey39(arg) {
  var key2 = _toPrimitive39(arg, "string");
  return _typeof42(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive39(input, hint) {
  if (_typeof42(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof42(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray12(arr, i32) {
  return _arrayWithHoles12(arr) || _iterableToArrayLimit12(arr, i32) || _unsupportedIterableToArray20(arr, i32) || _nonIterableRest12();
}
function _nonIterableRest12() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit12(arr, i32) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i32) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i32); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles12(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray11(arr) {
  return _arrayWithoutHoles11(arr) || _iterableToArray11(arr) || _unsupportedIterableToArray20(arr) || _nonIterableSpread11();
}
function _nonIterableSpread11() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray20(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray20(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray20(o26, minLen);
}
function _iterableToArray11(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles11(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray20(arr);
}
function _arrayLikeToArray20(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
var ALGOLIA_INSIGHTS_VERSION = "2.13.0";
var ALGOLIA_INSIGHTS_SRC = "https://cdn.jsdelivr.net/npm/search-insights@".concat(ALGOLIA_INSIGHTS_VERSION, "/dist/search-insights.min.js");
function createInsightsMiddleware() {
  var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _insightsClient = props.insightsClient, insightsInitParams = props.insightsInitParams, onEvent = props.onEvent, _props$$$internal = props.$$internal, $$internal = _props$$$internal === void 0 ? false : _props$$$internal, _props$$$automatic = props.$$automatic, $$automatic = _props$$$automatic === void 0 ? false : _props$$$automatic;
  var potentialInsightsClient = _insightsClient;
  if (!_insightsClient && _insightsClient !== null) {
    safelyRunOnBrowser(function(_ref7) {
      var window2 = _ref7.window;
      var pointer = window2.AlgoliaAnalyticsObject || "aa";
      if (typeof pointer === "string") {
        potentialInsightsClient = window2[pointer];
      }
      if (!potentialInsightsClient) {
        window2.AlgoliaAnalyticsObject = pointer;
        if (!window2[pointer]) {
          window2[pointer] = function() {
            if (!window2[pointer].queue) {
              window2[pointer].queue = [];
            }
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            window2[pointer].queue.push(args);
          };
          window2[pointer].version = ALGOLIA_INSIGHTS_VERSION;
          window2[pointer].shouldAddScript = true;
        }
        potentialInsightsClient = window2[pointer];
      }
    });
  }
  var insightsClient = potentialInsightsClient || noop;
  return function(_ref23) {
    var instantSearchInstance = _ref23.instantSearchInstance;
    var existingInsightsMiddlewares = instantSearchInstance.middleware.filter(function(m14) {
      return m14.instance.$$type === "ais.insights" && m14.instance.$$internal;
    }).map(function(m14) {
      return m14.creator;
    });
    instantSearchInstance.unuse.apply(instantSearchInstance, _toConsumableArray11(existingInsightsMiddlewares));
    var _getAppIdAndApiKey = getAppIdAndApiKey(instantSearchInstance.client), _getAppIdAndApiKey2 = _slicedToArray12(_getAppIdAndApiKey, 2), appId = _getAppIdAndApiKey2[0], apiKey = _getAppIdAndApiKey2[1];
    true ? _warning(Boolean(appId && apiKey), "could not extract Algolia credentials from searchClient in insights middleware.") : void 0;
    var queuedUserToken = void 0;
    var queuedAuthenticatedUserToken = void 0;
    var userTokenBeforeInit = void 0;
    var authenticatedUserTokenBeforeInit = void 0;
    var queue = insightsClient.queue;
    if (Array.isArray(queue)) {
      var _map = ["setUserToken", "setAuthenticatedUserToken"].map(function(key2) {
        var _ref33 = find(queue.slice().reverse(), function(_ref52) {
          var _ref63 = _slicedToArray12(_ref52, 1), method = _ref63[0];
          return method === key2;
        }) || [], _ref44 = _slicedToArray12(_ref33, 2), value = _ref44[1];
        return value;
      });
      var _map2 = _slicedToArray12(_map, 2);
      queuedUserToken = _map2[0];
      queuedAuthenticatedUserToken = _map2[1];
    }
    insightsClient("getUserToken", null, function(_error, userToken) {
      userTokenBeforeInit = normalizeUserToken(userToken);
    });
    insightsClient("getAuthenticatedUserToken", null, function(_error, userToken) {
      authenticatedUserTokenBeforeInit = normalizeUserToken(userToken);
    });
    if (insightsInitParams || !isModernInsightsClient(insightsClient)) {
      insightsClient("init", _objectSpread42({
        appId,
        apiKey,
        partial: true
      }, insightsInitParams));
    }
    var initialParameters;
    var helper;
    return {
      $$type: "ais.insights",
      $$internal,
      $$automatic,
      onStateChange: function onStateChange() {
      },
      subscribe: function subscribe() {
        if (!insightsClient.shouldAddScript)
          return;
        var errorMessage = "[insights middleware]: could not load search-insights.js. Please load it manually following https://alg.li/insights-init";
        try {
          var script = document.createElement("script");
          script.async = true;
          script.src = ALGOLIA_INSIGHTS_SRC;
          script.onerror = function() {
            instantSearchInstance.emit("error", new Error(errorMessage));
          };
          document.body.appendChild(script);
          insightsClient.shouldAddScript = false;
        } catch (cause) {
          insightsClient.shouldAddScript = false;
          instantSearchInstance.emit("error", new Error(errorMessage));
        }
      },
      started: function started() {
        insightsClient("addAlgoliaAgent", "insights-middleware");
        helper = instantSearchInstance.mainHelper;
        initialParameters = {
          userToken: helper.state.userToken,
          clickAnalytics: helper.state.clickAnalytics
        };
        if (!$$automatic) {
          helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread42(_objectSpread42({}, helper.state), {}, {
            clickAnalytics: true
          }));
        }
        if (!$$internal) {
          instantSearchInstance.scheduleSearch();
        }
        var setUserTokenToSearch = function setUserTokenToSearch2(userToken) {
          var immediate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          var normalizedUserToken = normalizeUserToken(userToken);
          if (!normalizedUserToken) {
            return;
          }
          var existingToken = helper.state.userToken;
          function applyToken() {
            helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread42(_objectSpread42({}, helper.state), {}, {
              userToken: normalizedUserToken
            }));
            if (existingToken && existingToken !== userToken) {
              instantSearchInstance.scheduleSearch();
            }
          }
          if (!immediate) {
            setTimeout(applyToken, 0);
          } else {
            applyToken();
          }
        };
        var anonymousUserToken = getInsightsAnonymousUserTokenInternal();
        if (anonymousUserToken) {
          setUserTokenToSearch(anonymousUserToken, true);
        }
        function setUserToken(token, userToken, authenticatedUserToken) {
          setUserTokenToSearch(token, true);
          if (userToken) {
            insightsClient("setUserToken", userToken);
          }
          if (authenticatedUserToken) {
            insightsClient("setAuthenticatedUserToken", authenticatedUserToken);
          }
        }
        var tokenBeforeInit = authenticatedUserTokenBeforeInit || userTokenBeforeInit;
        var queuedToken = queuedAuthenticatedUserToken || queuedUserToken;
        if (tokenBeforeInit) {
          setUserToken(tokenBeforeInit, userTokenBeforeInit, authenticatedUserTokenBeforeInit);
        } else if (queuedToken) {
          setUserToken(queuedToken, queuedUserToken, queuedAuthenticatedUserToken);
        }
        insightsClient("onUserTokenChange", setUserTokenToSearch, {
          immediate: true
        });
        insightsClient("onAuthenticatedUserTokenChange", function(authenticatedUserToken) {
          if (!authenticatedUserToken) {
            insightsClient("getUserToken", null, function(_2, userToken) {
              setUserTokenToSearch(userToken);
            });
          }
          setUserTokenToSearch(authenticatedUserToken);
        }, {
          immediate: true
        });
        var insightsClientWithLocalCredentials = insightsClient;
        if (isModernInsightsClient(insightsClient)) {
          insightsClientWithLocalCredentials = function insightsClientWithLocalCredentials2(method, payload) {
            var extraParams = {
              headers: {
                "X-Algolia-Application-Id": appId,
                "X-Algolia-API-Key": apiKey
              }
            };
            return insightsClient(method, payload, extraParams);
          };
        }
        instantSearchInstance.sendEventToInsights = function(event) {
          if (onEvent) {
            onEvent(event, insightsClientWithLocalCredentials);
          } else if (event.insightsMethod) {
            event.payload.algoliaSource = ["instantsearch"];
            if ($$automatic) {
              event.payload.algoliaSource.push("instantsearch-automatic");
            }
            if (event.eventModifier === "internal") {
              event.payload.algoliaSource.push("instantsearch-internal");
            }
            insightsClientWithLocalCredentials(event.insightsMethod, event.payload);
            true ? _warning(Boolean(helper.state.userToken), "\nCannot send event to Algolia Insights because `userToken` is not set.\n\nSee documentation: https://www.algolia.com/doc/guides/building-search-ui/going-further/send-insights-events/js/#setting-the-usertoken\n") : void 0;
          } else {
            true ? _warning(false, "Cannot send event to Algolia Insights because `insightsMethod` option is missing.") : void 0;
          }
        };
      },
      unsubscribe: function unsubscribe() {
        insightsClient("onUserTokenChange", void 0);
        insightsClient("onAuthenticatedUserTokenChange", void 0);
        instantSearchInstance.sendEventToInsights = noop;
        if (helper && initialParameters) {
          helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread42(_objectSpread42({}, helper.state), initialParameters));
          instantSearchInstance.scheduleSearch();
        }
      }
    };
  };
}
function isModernInsightsClient(client) {
  var _split$map = (client.version || "").split(".").map(Number), _split$map2 = _slicedToArray12(_split$map, 2), major = _split$map2[0], minor = _split$map2[1];
  var v32 = major >= 3;
  var v2_6 = major === 2 && minor >= 6;
  var v1_10 = major === 1 && minor >= 10;
  return v32 || v2_6 || v1_10;
}
function normalizeUserToken(userToken) {
  if (!userToken) {
    return void 0;
  }
  return typeof userToken === "number" ? userToken.toString() : userToken;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/middlewares/createMetadataMiddleware.js
function extractWidgetPayload(widgets, instantSearchInstance, payload) {
  var initOptions = createInitArgs(instantSearchInstance, instantSearchInstance.mainIndex, instantSearchInstance._initialUiState);
  widgets.forEach(function(widget) {
    var widgetParams = {};
    if (widget.getWidgetRenderState) {
      var renderState = widget.getWidgetRenderState(initOptions);
      if (renderState && renderState.widgetParams) {
        widgetParams = renderState.widgetParams;
      }
    }
    var params = Object.keys(widgetParams).filter(function(key2) {
      return widgetParams[key2] !== void 0;
    });
    payload.widgets.push({
      type: widget.$$type,
      widgetType: widget.$$widgetType,
      params
    });
    if (widget.$$type === "ais.index") {
      extractWidgetPayload(widget.getWidgets(), instantSearchInstance, payload);
    }
  });
}
function isMetadataEnabled() {
  return safelyRunOnBrowser(function(_ref7) {
    var _window$navigator, _window$navigator$use;
    var window2 = _ref7.window;
    return ((_window$navigator = window2.navigator) === null || _window$navigator === void 0 ? void 0 : (_window$navigator$use = _window$navigator.userAgent) === null || _window$navigator$use === void 0 ? void 0 : _window$navigator$use.indexOf("Algolia Crawler")) > -1;
  }, {
    fallback: function fallback() {
      return false;
    }
  });
}
function createMetadataMiddleware() {
  var _ref23 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref2$$$internal = _ref23.$$internal, $$internal = _ref2$$$internal === void 0 ? false : _ref2$$$internal;
  return function(_ref33) {
    var instantSearchInstance = _ref33.instantSearchInstance;
    var payload = {
      widgets: []
    };
    var payloadContainer = document.createElement("meta");
    var refNode = document.querySelector("head");
    payloadContainer.name = "instantsearch:widgets";
    return {
      $$type: "ais.metadata",
      $$internal,
      onStateChange: function onStateChange() {
      },
      subscribe: function subscribe() {
        setTimeout(function() {
          var client = instantSearchInstance.client;
          payload.ua = client.transporter && client.transporter.userAgent ? client.transporter.userAgent.value : client._ua;
          extractWidgetPayload(instantSearchInstance.mainIndex.getWidgets(), instantSearchInstance, payload);
          instantSearchInstance.middleware.forEach(function(middleware) {
            return payload.widgets.push({
              middleware: true,
              type: middleware.instance.$$type,
              internal: middleware.instance.$$internal
            });
          });
          payloadContainer.content = JSON.stringify(payload);
          refNode.appendChild(payloadContainer);
        }, 0);
      },
      started: function started() {
      },
      unsubscribe: function unsubscribe() {
        payloadContainer.remove();
      }
    };
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/routers/history.js
var import_qs = __toESM(require_lib(), 1);
function _typeof43(obj) {
  "@babel/helpers - typeof";
  return _typeof43 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof43(obj);
}
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties2(target, props) {
  for (var i32 = 0; i32 < props.length; i32++) {
    var descriptor = props[i32];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey40(descriptor.key), descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties2(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty41(obj, key2, value) {
  key2 = _toPropertyKey40(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey40(arg) {
  var key2 = _toPrimitive40(arg, "string");
  return _typeof43(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive40(input, hint) {
  if (_typeof43(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof43(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var setWindowTitle = function setWindowTitle2(title) {
  if (title) {
    window.document.title = title;
  }
};
var BrowserHistory = function() {
  function BrowserHistory2(_ref7) {
    var _this = this;
    var windowTitle = _ref7.windowTitle, _ref$writeDelay = _ref7.writeDelay, writeDelay = _ref$writeDelay === void 0 ? 400 : _ref$writeDelay, createURL = _ref7.createURL, parseURL = _ref7.parseURL, getLocation = _ref7.getLocation, start = _ref7.start, dispose = _ref7.dispose, push = _ref7.push, cleanUrlOnDispose = _ref7.cleanUrlOnDispose;
    _classCallCheck2(this, BrowserHistory2);
    _defineProperty41(this, "$$type", "ais.browser");
    _defineProperty41(this, "windowTitle", void 0);
    _defineProperty41(this, "writeDelay", void 0);
    _defineProperty41(this, "_createURL", void 0);
    _defineProperty41(this, "parseURL", void 0);
    _defineProperty41(this, "getLocation", void 0);
    _defineProperty41(this, "writeTimer", void 0);
    _defineProperty41(this, "_onPopState", void 0);
    _defineProperty41(this, "inPopState", false);
    _defineProperty41(this, "isDisposed", false);
    _defineProperty41(this, "latestAcknowledgedHistory", 0);
    _defineProperty41(this, "_start", void 0);
    _defineProperty41(this, "_dispose", void 0);
    _defineProperty41(this, "_push", void 0);
    _defineProperty41(this, "_cleanUrlOnDispose", void 0);
    this.windowTitle = windowTitle;
    this.writeTimer = void 0;
    this.writeDelay = writeDelay;
    this._createURL = createURL;
    this.parseURL = parseURL;
    this.getLocation = getLocation;
    this._start = start;
    this._dispose = dispose;
    this._push = push;
    this._cleanUrlOnDispose = typeof cleanUrlOnDispose === "undefined" ? true : cleanUrlOnDispose;
    if (typeof cleanUrlOnDispose === "undefined") {
      console.info("Starting from the next major version, InstantSearch will not clean up the URL from active refinements when it is disposed.\n\nWe recommend setting `cleanUrlOnDispose` to false to adopt this change today.\nTo stay with the current behaviour and remove this warning, set the option to true.\n\nSee documentation: ".concat(createDocumentationLink({
        name: "history-router"
      }), "#widget-param-cleanurlondispose"));
    }
    safelyRunOnBrowser(function(_ref23) {
      var window2 = _ref23.window;
      var title = _this.windowTitle && _this.windowTitle(_this.read());
      setWindowTitle(title);
      _this.latestAcknowledgedHistory = window2.history.length;
    });
  }
  _createClass2(BrowserHistory2, [{
    key: "read",
    value: function read() {
      return this.parseURL({
        qsModule: import_qs.default,
        location: this.getLocation()
      });
    }
    /**
     * Pushes a search state into the URL.
     */
  }, {
    key: "write",
    value: function write(routeState) {
      var _this2 = this;
      safelyRunOnBrowser(function(_ref33) {
        var window2 = _ref33.window;
        var url = _this2.createURL(routeState);
        var title = _this2.windowTitle && _this2.windowTitle(routeState);
        if (_this2.writeTimer) {
          clearTimeout(_this2.writeTimer);
        }
        _this2.writeTimer = setTimeout(function() {
          setWindowTitle(title);
          if (_this2.shouldWrite(url)) {
            if (_this2._push) {
              _this2._push(url);
            } else {
              window2.history.pushState(routeState, title || "", url);
            }
            _this2.latestAcknowledgedHistory = window2.history.length;
          }
          _this2.inPopState = false;
          _this2.writeTimer = void 0;
        }, _this2.writeDelay);
      });
    }
    /**
     * Sets a callback on the `onpopstate` event of the history API of the current page.
     * It enables the URL sync to keep track of the changes.
     */
  }, {
    key: "onUpdate",
    value: function onUpdate(callback) {
      var _this3 = this;
      if (this._start) {
        this._start(function() {
          callback(_this3.read());
        });
      }
      this._onPopState = function() {
        if (_this3.writeTimer) {
          clearTimeout(_this3.writeTimer);
          _this3.writeTimer = void 0;
        }
        _this3.inPopState = true;
        callback(_this3.read());
      };
      safelyRunOnBrowser(function(_ref44) {
        var window2 = _ref44.window;
        window2.addEventListener("popstate", _this3._onPopState);
      });
    }
    /**
     * Creates a complete URL from a given syncable UI state.
     *
     * It always generates the full URL, not a relative one.
     * This allows to handle cases like using a <base href>.
     * See: https://github.com/algolia/instantsearch/issues/790
     */
  }, {
    key: "createURL",
    value: function createURL(routeState) {
      var url = this._createURL({
        qsModule: import_qs.default,
        routeState,
        location: this.getLocation()
      });
      if (true) {
        try {
          new URL(url);
        } catch (e34) {
          true ? _warning(false, "The URL returned by the `createURL` function is invalid.\nPlease make sure it returns an absolute URL to avoid issues, e.g: `https://algolia.com/search?query=iphone`.") : void 0;
        }
      }
      return url;
    }
    /**
     * Removes the event listener and cleans up the URL.
     */
  }, {
    key: "dispose",
    value: function dispose() {
      var _this4 = this;
      if (this._dispose) {
        this._dispose();
      }
      this.isDisposed = true;
      safelyRunOnBrowser(function(_ref52) {
        var window2 = _ref52.window;
        if (_this4._onPopState) {
          window2.removeEventListener("popstate", _this4._onPopState);
        }
      });
      if (this.writeTimer) {
        clearTimeout(this.writeTimer);
      }
      if (this._cleanUrlOnDispose) {
        this.write({});
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.isDisposed = false;
    }
  }, {
    key: "shouldWrite",
    value: function shouldWrite(url) {
      var _this5 = this;
      return safelyRunOnBrowser(function(_ref63) {
        var window2 = _ref63.window;
        var lastPushWasByISAfterDispose = !(_this5.isDisposed && _this5.latestAcknowledgedHistory !== window2.history.length);
        return (
          // When the last state change was through popstate, the IS.js state changes,
          // but that should not write the URL.
          !_this5.inPopState && // When the previous pushState after dispose was by IS.js, we want to write the URL.
          lastPushWasByISAfterDispose && // When the URL is the same as the current one, we do not want to write it.
          url !== window2.location.href
        );
      });
    }
  }]);
  return BrowserHistory2;
}();
function historyRouter() {
  var _ref7 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref7$createURL = _ref7.createURL, createURL = _ref7$createURL === void 0 ? function(_ref8) {
    var qsModule = _ref8.qsModule, routeState = _ref8.routeState, location2 = _ref8.location;
    var protocol = location2.protocol, hostname = location2.hostname, _location$port = location2.port, port = _location$port === void 0 ? "" : _location$port, pathname = location2.pathname, hash = location2.hash;
    var queryString = qsModule.stringify(routeState);
    var portWithPrefix = port === "" ? "" : ":".concat(port);
    if (!queryString) {
      return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname).concat(hash);
    }
    return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname, "?").concat(queryString).concat(hash);
  } : _ref7$createURL, _ref7$parseURL = _ref7.parseURL, parseURL = _ref7$parseURL === void 0 ? function(_ref9) {
    var qsModule = _ref9.qsModule, location2 = _ref9.location;
    return qsModule.parse(location2.search.slice(1), {
      arrayLimit: 99
    });
  } : _ref7$parseURL, _ref7$writeDelay = _ref7.writeDelay, writeDelay = _ref7$writeDelay === void 0 ? 400 : _ref7$writeDelay, windowTitle = _ref7.windowTitle, _ref7$getLocation = _ref7.getLocation, getLocation = _ref7$getLocation === void 0 ? function() {
    return safelyRunOnBrowser(function(_ref10) {
      var window2 = _ref10.window;
      return window2.location;
    }, {
      fallback: function fallback() {
        throw new Error("You need to provide `getLocation` to the `history` router in environments where `window` does not exist.");
      }
    });
  } : _ref7$getLocation, start = _ref7.start, dispose = _ref7.dispose, push = _ref7.push, cleanUrlOnDispose = _ref7.cleanUrlOnDispose;
  return new BrowserHistory({
    createURL,
    parseURL,
    writeDelay,
    windowTitle,
    getLocation,
    start,
    dispose,
    push,
    cleanUrlOnDispose
  });
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/stateMappings/simple.js
function _typeof44(obj) {
  "@babel/helpers - typeof";
  return _typeof44 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof44(obj);
}
var _excluded14 = ["configure"];
function ownKeys43(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread43(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys43(Object(source), true).forEach(function(key2) {
      _defineProperty42(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys43(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty42(obj, key2, value) {
  key2 = _toPropertyKey41(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey41(arg) {
  var key2 = _toPrimitive41(arg, "string");
  return _typeof44(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive41(input, hint) {
  if (_typeof44(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof44(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties9(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose9(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose9(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function getIndexStateWithoutConfigure(uiState) {
  var configure = uiState.configure, trackedUiState = _objectWithoutProperties9(uiState, _excluded14);
  return trackedUiState;
}
function simpleStateMapping() {
  return {
    $$type: "ais.simple",
    stateToRoute: function stateToRoute(uiState) {
      return Object.keys(uiState).reduce(function(state, indexId) {
        return _objectSpread43(_objectSpread43({}, state), {}, _defineProperty42({}, indexId, getIndexStateWithoutConfigure(uiState[indexId])));
      }, {});
    },
    routeToState: function routeToState() {
      var routeState = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return Object.keys(routeState).reduce(function(state, indexId) {
        return _objectSpread43(_objectSpread43({}, state), {}, _defineProperty42({}, indexId, getIndexStateWithoutConfigure(routeState[indexId])));
      }, {});
    }
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/middlewares/createRouterMiddleware.js
function _typeof45(obj) {
  "@babel/helpers - typeof";
  return _typeof45 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof45(obj);
}
function ownKeys44(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread44(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys44(Object(source), true).forEach(function(key2) {
      _defineProperty43(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys44(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty43(obj, key2, value) {
  key2 = _toPropertyKey42(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey42(arg) {
  var key2 = _toPrimitive42(arg, "string");
  return _typeof45(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive42(input, hint) {
  if (_typeof45(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof45(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var createRouterMiddleware = function createRouterMiddleware2() {
  var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _props$router = props.router, router = _props$router === void 0 ? historyRouter() : _props$router, _props$stateMapping = props.stateMapping, stateMapping = _props$stateMapping === void 0 ? simpleStateMapping() : _props$stateMapping, _props$$$internal = props.$$internal, $$internal = _props$$$internal === void 0 ? false : _props$$$internal;
  return function(_ref7) {
    var instantSearchInstance = _ref7.instantSearchInstance;
    function topLevelCreateURL(nextState) {
      var previousUiState = (
        // If only the mainIndex is initialized, we don't yet know what other
        // index widgets are used. Therefore we fall back to the initialUiState.
        // We can't indiscriminately use the initialUiState because then we
        // reintroduce state that was changed by the user.
        // When there are no widgets, we are sure the user can't yet have made
        // any changes.
        instantSearchInstance.mainIndex.getWidgets().length === 0 ? instantSearchInstance._initialUiState : instantSearchInstance.mainIndex.getWidgetUiState({})
      );
      var uiState = Object.keys(nextState).reduce(function(acc, indexId) {
        return _objectSpread44(_objectSpread44({}, acc), {}, _defineProperty43({}, indexId, nextState[indexId]));
      }, previousUiState);
      var route = stateMapping.stateToRoute(uiState);
      return router.createURL(route);
    }
    instantSearchInstance._createURL = topLevelCreateURL;
    var lastRouteState = void 0;
    var initialUiState = instantSearchInstance._initialUiState;
    return {
      $$type: "ais.router({router:".concat(router.$$type || "__unknown__", ", stateMapping:").concat(stateMapping.$$type || "__unknown__", "})"),
      $$internal,
      onStateChange: function onStateChange(_ref23) {
        var uiState = _ref23.uiState;
        var routeState = stateMapping.stateToRoute(uiState);
        if (lastRouteState === void 0 || !isEqual(lastRouteState, routeState)) {
          router.write(routeState);
          lastRouteState = routeState;
        }
      },
      subscribe: function subscribe() {
        true ? _warning(Object.keys(initialUiState).length === 0, "Using `initialUiState` together with routing is not recommended. The `initialUiState` will be overwritten by the URL parameters.") : void 0;
        instantSearchInstance._initialUiState = _objectSpread44(_objectSpread44({}, initialUiState), stateMapping.routeToState(router.read()));
        router.onUpdate(function(route) {
          if (instantSearchInstance.mainIndex.getWidgets().length > 0) {
            instantSearchInstance.setUiState(stateMapping.routeToState(route));
          }
        });
      },
      started: function started() {
        var _router$start;
        (_router$start = router.start) === null || _router$start === void 0 ? void 0 : _router$start.call(router);
      },
      unsubscribe: function unsubscribe() {
        router.dispose();
      }
    };
  };
};

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/templating/prepareTemplateProps.js
function _typeof46(obj) {
  "@babel/helpers - typeof";
  return _typeof46 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof46(obj);
}
function ownKeys45(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread45(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys45(Object(source), true).forEach(function(key2) {
      _defineProperty44(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys45(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty44(obj, key2, value) {
  key2 = _toPropertyKey43(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey43(arg) {
  var key2 = _toPrimitive43(arg, "string");
  return _typeof46(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive43(input, hint) {
  if (_typeof46(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof46(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toConsumableArray12(arr) {
  return _arrayWithoutHoles12(arr) || _iterableToArray12(arr) || _unsupportedIterableToArray21(arr) || _nonIterableSpread12();
}
function _nonIterableSpread12() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray21(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray21(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray21(o26, minLen);
}
function _iterableToArray12(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles12(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray21(arr);
}
function _arrayLikeToArray21(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function prepareTemplates(defaultTemplates2) {
  var templates = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var allKeys = uniq([].concat(_toConsumableArray12(Object.keys(defaultTemplates2 || {})), _toConsumableArray12(Object.keys(templates))));
  return allKeys.reduce(function(config, key2) {
    var defaultTemplate = defaultTemplates2 ? defaultTemplates2[key2] : void 0;
    var customTemplate = templates[key2];
    var isCustomTemplate = customTemplate !== void 0 && customTemplate !== defaultTemplate;
    config.templates[key2] = isCustomTemplate ? customTemplate : defaultTemplate;
    config.useCustomCompileOptions[key2] = isCustomTemplate;
    return config;
  }, {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    templates: {},
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    useCustomCompileOptions: {}
  });
}
function prepareTemplateProps(_ref7) {
  var defaultTemplates2 = _ref7.defaultTemplates, templates = _ref7.templates, templatesConfig = _ref7.templatesConfig;
  var preparedTemplates = prepareTemplates(defaultTemplates2, templates);
  return _objectSpread45({
    templatesConfig
  }, preparedTemplates);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/templating/renderTemplate.js
var import_hogan = __toESM(require_hogan(), 1);

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/htm/dist/htm.module.js
var n12 = function(t37, s30, r32, e34) {
  var u26;
  s30[0] = 0;
  for (var h13 = 1; h13 < s30.length; h13++) {
    var p7 = s30[h13++], a30 = s30[h13] ? (s30[0] |= p7 ? 1 : 2, r32[s30[h13++]]) : s30[++h13];
    3 === p7 ? e34[0] = a30 : 4 === p7 ? e34[1] = Object.assign(e34[1] || {}, a30) : 5 === p7 ? (e34[1] = e34[1] || {})[s30[++h13]] = a30 : 6 === p7 ? e34[1][s30[++h13]] += a30 + "" : p7 ? (u26 = t37.apply(a30, n12(t37, a30, r32, ["", null])), e34.push(u26), a30[0] ? s30[0] |= 2 : (s30[h13 - 2] = 0, s30[h13] = u26)) : e34.push(a30);
  }
  return e34;
};
var t15 = /* @__PURE__ */ new Map();
function htm_module_default(s30) {
  var r32 = t15.get(this);
  return r32 || (r32 = /* @__PURE__ */ new Map(), t15.set(this, r32)), (r32 = n12(this, r32.get(s30) || (r32.set(s30, r32 = function(n32) {
    for (var t37, s31, r33 = 1, e34 = "", u26 = "", h13 = [0], p7 = function(n33) {
      1 === r33 && (n33 || (e34 = e34.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h13.push(0, n33, e34) : 3 === r33 && (n33 || e34) ? (h13.push(3, n33, e34), r33 = 2) : 2 === r33 && "..." === e34 && n33 ? h13.push(4, n33, 0) : 2 === r33 && e34 && !n33 ? h13.push(5, 0, true, e34) : r33 >= 5 && ((e34 || !n33 && 5 === r33) && (h13.push(r33, 0, e34, s31), r33 = 6), n33 && (h13.push(r33, n33, 0, s31), r33 = 6)), e34 = "";
    }, a30 = 0; a30 < n32.length; a30++) {
      a30 && (1 === r33 && p7(), p7(a30));
      for (var l27 = 0; l27 < n32[a30].length; l27++)
        t37 = n32[a30][l27], 1 === r33 ? "<" === t37 ? (p7(), h13 = [h13], r33 = 3) : e34 += t37 : 4 === r33 ? "--" === e34 && ">" === t37 ? (r33 = 1, e34 = "") : e34 = t37 + e34[0] : u26 ? t37 === u26 ? u26 = "" : e34 += t37 : '"' === t37 || "'" === t37 ? u26 = t37 : ">" === t37 ? (p7(), r33 = 1) : r33 && ("=" === t37 ? (r33 = 5, s31 = e34, e34 = "") : "/" === t37 && (r33 < 5 || ">" === n32[a30][l27 + 1]) ? (p7(), 3 === r33 && (h13 = h13[0]), r33 = h13, (h13 = h13[0]).push(2, 0, r33), r33 = 0) : " " === t37 || "	" === t37 || "\n" === t37 || "\r" === t37 ? (p7(), r33 = 2) : e34 += t37), 3 === r33 && "!--" === e34 && (r33 = 4, h13 = h13[0]);
    }
    return p7(), h13;
  }(s30)), r32), arguments, [])).length > 1 ? r32 : r32[0];
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/htm/preact/index.module.js
var m5 = htm_module_default.bind(_);

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/InternalHighlight/InternalHighlight.js
var InternalHighlight = createHighlightComponent({
  createElement: _,
  Fragment: k
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/Highlight/Highlight.js
var _excluded15 = ["classNames"];
function _extends3() {
  _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends3.apply(this, arguments);
}
function _objectWithoutProperties10(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose10(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose10(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function Highlight(_ref7) {
  var _ref$classNames = _ref7.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, props = _objectWithoutProperties10(_ref7, _excluded15);
  return _(InternalHighlight, _extends3({
    classNames: {
      root: cx("ais-Highlight", classNames.root),
      highlighted: cx("ais-Highlight-highlighted", classNames.highlighted),
      nonHighlighted: cx("ais-Highlight-nonHighlighted", classNames.nonHighlighted),
      separator: cx("ais-Highlight-separator", classNames.separator)
    }
  }, props));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/helpers/components/Highlight.js
var _excluded16 = ["hit", "attribute", "cssClasses"];
function _extends4() {
  _extends4 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends4.apply(this, arguments);
}
function _objectWithoutProperties11(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose11(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose11(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function Highlight2(_ref7) {
  var hit = _ref7.hit, attribute = _ref7.attribute, cssClasses = _ref7.cssClasses, props = _objectWithoutProperties11(_ref7, _excluded16);
  var property = getPropertyByPath(hit._highlightResult, attribute) || [];
  var properties = toArray(property);
  true ? _warning(Boolean(properties.length), 'Could not enable highlight for "'.concat(attribute.toString(), '", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var parts = properties.map(function(_ref23) {
    var value = _ref23.value;
    return getHighlightedParts(unescape2(value || ""));
  });
  return _(Highlight, _extends4({}, props, {
    parts,
    classNames: cssClasses
  }));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/ReverseHighlight/ReverseHighlight.js
var _excluded17 = ["classNames"];
function _extends5() {
  _extends5 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends5.apply(this, arguments);
}
function _objectWithoutProperties12(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose12(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose12(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function ReverseHighlight(_ref7) {
  var _ref$classNames = _ref7.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, props = _objectWithoutProperties12(_ref7, _excluded17);
  return _(InternalHighlight, _extends5({
    classNames: {
      root: cx("ais-ReverseHighlight", classNames.root),
      highlighted: cx("ais-ReverseHighlight-highlighted", classNames.highlighted),
      nonHighlighted: cx("ais-ReverseHighlight-nonHighlighted", classNames.nonHighlighted),
      separator: cx("ais-ReverseHighlight-separator", classNames.separator)
    }
  }, props));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/helpers/components/ReverseHighlight.js
function _typeof47(obj) {
  "@babel/helpers - typeof";
  return _typeof47 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof47(obj);
}
var _excluded18 = ["hit", "attribute", "cssClasses"];
var _excluded25 = ["isHighlighted"];
function _extends6() {
  _extends6 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends6.apply(this, arguments);
}
function ownKeys46(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread46(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys46(Object(source), true).forEach(function(key2) {
      _defineProperty45(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys46(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty45(obj, key2, value) {
  key2 = _toPropertyKey44(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey44(arg) {
  var key2 = _toPrimitive44(arg, "string");
  return _typeof47(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive44(input, hint) {
  if (_typeof47(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof47(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties13(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose13(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose13(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function ReverseHighlight2(_ref7) {
  var hit = _ref7.hit, attribute = _ref7.attribute, cssClasses = _ref7.cssClasses, props = _objectWithoutProperties13(_ref7, _excluded18);
  var property = getPropertyByPath(hit._highlightResult, attribute) || [];
  var properties = toArray(property);
  true ? _warning(Boolean(properties.length), 'Could not enable highlight for "'.concat(attribute.toString(), '", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var parts = properties.map(function(_ref23) {
    var value = _ref23.value;
    return getHighlightedParts(unescape2(value || "")).map(function(_ref33) {
      var isHighlighted = _ref33.isHighlighted, rest = _objectWithoutProperties13(_ref33, _excluded25);
      return _objectSpread46(_objectSpread46({}, rest), {}, {
        isHighlighted: !isHighlighted
      });
    });
  });
  return _(ReverseHighlight, _extends6({}, props, {
    parts,
    classNames: cssClasses
  }));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/ReverseSnippet/ReverseSnippet.js
var _excluded19 = ["classNames"];
function _extends7() {
  _extends7 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends7.apply(this, arguments);
}
function _objectWithoutProperties14(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose14(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose14(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function ReverseSnippet(_ref7) {
  var _ref$classNames = _ref7.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, props = _objectWithoutProperties14(_ref7, _excluded19);
  return _(InternalHighlight, _extends7({
    classNames: {
      root: cx("ais-ReverseSnippet", classNames.root),
      highlighted: cx("ais-ReverseSnippet-highlighted", classNames.highlighted),
      nonHighlighted: cx("ais-ReverseSnippet-nonHighlighted", classNames.nonHighlighted),
      separator: cx("ais-ReverseSnippet-separator", classNames.separator)
    }
  }, props));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/helpers/components/ReverseSnippet.js
function _typeof48(obj) {
  "@babel/helpers - typeof";
  return _typeof48 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof48(obj);
}
var _excluded20 = ["hit", "attribute", "cssClasses"];
var _excluded26 = ["isHighlighted"];
function _extends8() {
  _extends8 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends8.apply(this, arguments);
}
function ownKeys47(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread47(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys47(Object(source), true).forEach(function(key2) {
      _defineProperty46(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys47(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty46(obj, key2, value) {
  key2 = _toPropertyKey45(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey45(arg) {
  var key2 = _toPrimitive45(arg, "string");
  return _typeof48(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive45(input, hint) {
  if (_typeof48(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof48(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties15(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose15(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose15(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function ReverseSnippet2(_ref7) {
  var hit = _ref7.hit, attribute = _ref7.attribute, cssClasses = _ref7.cssClasses, props = _objectWithoutProperties15(_ref7, _excluded20);
  var property = getPropertyByPath(hit._snippetResult, attribute) || [];
  var properties = toArray(property);
  true ? _warning(Boolean(properties.length), 'Could not enable snippet for "'.concat(attribute.toString(), '", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var parts = properties.map(function(_ref23) {
    var value = _ref23.value;
    return getHighlightedParts(unescape2(value || "")).map(function(_ref33) {
      var isHighlighted = _ref33.isHighlighted, rest = _objectWithoutProperties15(_ref33, _excluded26);
      return _objectSpread47(_objectSpread47({}, rest), {}, {
        isHighlighted: !isHighlighted
      });
    });
  });
  return _(ReverseSnippet, _extends8({}, props, {
    parts,
    classNames: cssClasses
  }));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/Snippet/Snippet.js
var _excluded21 = ["classNames"];
function _extends9() {
  _extends9 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends9.apply(this, arguments);
}
function _objectWithoutProperties16(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose16(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose16(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function Snippet(_ref7) {
  var _ref$classNames = _ref7.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, props = _objectWithoutProperties16(_ref7, _excluded21);
  return _(InternalHighlight, _extends9({
    classNames: {
      root: cx("ais-Snippet", classNames.root),
      highlighted: cx("ais-Snippet-highlighted", classNames.highlighted),
      nonHighlighted: cx("ais-Snippet-nonHighlighted", classNames.nonHighlighted),
      separator: cx("ais-Snippet-separator", classNames.separator)
    }
  }, props));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/helpers/components/Snippet.js
var _excluded27 = ["hit", "attribute", "cssClasses"];
function _extends10() {
  _extends10 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends10.apply(this, arguments);
}
function _objectWithoutProperties17(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose17(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose17(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function Snippet2(_ref7) {
  var hit = _ref7.hit, attribute = _ref7.attribute, cssClasses = _ref7.cssClasses, props = _objectWithoutProperties17(_ref7, _excluded27);
  var property = getPropertyByPath(hit._snippetResult, attribute) || [];
  var properties = toArray(property);
  true ? _warning(Boolean(properties.length), 'Could not enable snippet for "'.concat(attribute.toString(), '", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var parts = properties.map(function(_ref23) {
    var value = _ref23.value;
    return getHighlightedParts(unescape2(value || ""));
  });
  return _(Snippet, _extends10({}, props, {
    parts,
    classNames: cssClasses
  }));
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/templating/renderTemplate.js
function _typeof49(obj) {
  "@babel/helpers - typeof";
  return _typeof49 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof49(obj);
}
function ownKeys48(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread48(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys48(Object(source), true).forEach(function(key2) {
      _defineProperty47(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys48(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty47(obj, key2, value) {
  key2 = _toPropertyKey46(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey46(arg) {
  var key2 = _toPrimitive46(arg, "string");
  return _typeof49(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive46(input, hint) {
  if (_typeof49(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof49(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function transformHelpersToHogan() {
  var helpers = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var compileOptions = arguments.length > 1 ? arguments[1] : void 0;
  var data = arguments.length > 2 ? arguments[2] : void 0;
  return Object.keys(helpers).reduce(function(acc, helperKey) {
    return _objectSpread48(_objectSpread48({}, acc), {}, _defineProperty47({}, helperKey, function() {
      var _this = this;
      return function(text) {
        var render = function render2(value) {
          return import_hogan.default.compile(value, compileOptions).render(_this);
        };
        return helpers[helperKey].call(data, text, render);
      };
    }));
  }, {});
}
function renderTemplate(_ref7) {
  var templates = _ref7.templates, templateKey = _ref7.templateKey, compileOptions = _ref7.compileOptions, helpers = _ref7.helpers, data = _ref7.data, bindEvent = _ref7.bindEvent, sendEvent = _ref7.sendEvent;
  var template = templates[templateKey];
  if (typeof template !== "string" && typeof template !== "function") {
    throw new Error("Template must be 'string' or 'function', was '".concat(_typeof49(template), "' (key: ").concat(templateKey, ")"));
  }
  if (typeof template === "function") {
    var params = bindEvent || {};
    params.html = m5;
    params.sendEvent = sendEvent;
    params.components = {
      Highlight: Highlight2,
      ReverseHighlight: ReverseHighlight2,
      Snippet: Snippet2,
      ReverseSnippet: ReverseSnippet2
    };
    return template(data, params);
  }
  var transformedHelpers = transformHelpersToHogan(helpers, compileOptions, data);
  return import_hogan.default.compile(template, compileOptions).render(_objectSpread48(_objectSpread48({}, data), {}, {
    helpers: transformedHelpers
  })).replace(/[ \n\r\t\f\xA0]+/g, function(spaces) {
    return spaces.replace(/(^|\xA0+)[^\xA0]+/g, "$1 ");
  }).trim();
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/Template/Template.js
function _extends11() {
  _extends11 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends11.apply(this, arguments);
}
function _typeof50(obj) {
  "@babel/helpers - typeof";
  return _typeof50 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof50(obj);
}
function _toConsumableArray13(arr) {
  return _arrayWithoutHoles13(arr) || _iterableToArray13(arr) || _unsupportedIterableToArray22(arr) || _nonIterableSpread13();
}
function _nonIterableSpread13() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray22(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray22(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray22(o26, minLen);
}
function _iterableToArray13(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles13(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray22(arr);
}
function _arrayLikeToArray22(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _classCallCheck3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties3(target, props) {
  for (var i32 = 0; i32 < props.length; i32++) {
    var descriptor = props[i32];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey47(descriptor.key), descriptor);
  }
}
function _createClass3(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties3(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties3(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o26, p7) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf8(o27, p8) {
    o27.__proto__ = p8;
    return o27;
  };
  return _setPrototypeOf(o26, p7);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof50(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e34) {
    return false;
  }
}
function _getPrototypeOf(o26) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf8(o27) {
    return o27.__proto__ || Object.getPrototypeOf(o27);
  };
  return _getPrototypeOf(o26);
}
function _defineProperty48(obj, key2, value) {
  key2 = _toPropertyKey47(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey47(arg) {
  var key2 = _toPrimitive47(arg, "string");
  return _typeof50(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive47(input, hint) {
  if (_typeof50(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof50(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var RawHtml = function(_Component) {
  _inherits(RawHtml2, _Component);
  var _super = _createSuper(RawHtml2);
  function RawHtml2() {
    var _this;
    _classCallCheck3(this, RawHtml2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty48(_assertThisInitialized(_this), "ref", m());
    _defineProperty48(_assertThisInitialized(_this), "nodes", []);
    return _this;
  }
  _createClass3(RawHtml2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var fragment = new DocumentFragment();
      var root = document.createElement("div");
      root.innerHTML = this.props.content;
      this.nodes = _toConsumableArray13(root.childNodes);
      this.nodes.forEach(function(node) {
        return fragment.appendChild(node);
      });
      this.ref.current.replaceWith(fragment);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.nodes.forEach(function(node) {
        if (node instanceof Element) {
          node.outerHTML = "";
          return;
        }
        node.nodeValue = "";
      });
      if (this.nodes[0].nodeValue) {
        this.nodes[0].nodeValue = "";
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _("div", {
        ref: this.ref
      });
    }
  }]);
  return RawHtml2;
}(b);
var defaultProps = {
  data: {},
  rootTagName: "div",
  useCustomCompileOptions: {},
  templates: {},
  templatesConfig: {}
};
var Template = function(_Component2) {
  _inherits(Template2, _Component2);
  var _super2 = _createSuper(Template2);
  function Template2() {
    _classCallCheck3(this, Template2);
    return _super2.apply(this, arguments);
  }
  _createClass3(Template2, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !isEqual(this.props.data, nextProps.data) || this.props.templateKey !== nextProps.templateKey || !isEqual(this.props.rootProps, nextProps.rootProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      if (true) {
        var nonFunctionTemplates = Object.keys(this.props.templates).filter(function(key2) {
          return typeof _this2.props.templates[key2] !== "function";
        });
        true ? _warning(nonFunctionTemplates.length === 0, "Hogan.js and string-based templates are deprecated and will not be supported in InstantSearch.js 5.x.\n\nYou can replace them with function-form templates and use either the provided `html` function or JSX templates.\n\nString-based templates: ".concat(nonFunctionTemplates.join(", "), ".\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/#upgrade-templates")) : void 0;
      }
      var RootTagName = this.props.rootTagName === "fragment" ? k : this.props.rootTagName;
      var useCustomCompileOptions = this.props.useCustomCompileOptions[this.props.templateKey];
      var compileOptions = useCustomCompileOptions ? this.props.templatesConfig.compileOptions : {};
      var content = renderTemplate({
        templates: this.props.templates,
        templateKey: this.props.templateKey,
        compileOptions,
        helpers: this.props.templatesConfig.helpers,
        data: this.props.data,
        bindEvent: this.props.bindEvent,
        sendEvent: this.props.sendEvent
      });
      if (content === null) {
        return null;
      }
      if (_typeof50(content) === "object") {
        return _(RootTagName, this.props.rootProps, content);
      }
      if (RootTagName === k) {
        return _(RawHtml, {
          content,
          key: content
        });
      }
      return _(RootTagName, _extends11({}, this.props.rootProps, {
        dangerouslySetInnerHTML: {
          __html: content
        }
      }));
    }
  }]);
  return Template2;
}(b);
_defineProperty48(Template, "defaultProps", defaultProps);
var Template_default = Template;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/Answers/Answers.js
function _typeof51(obj) {
  "@babel/helpers - typeof";
  return _typeof51 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof51(obj);
}
function ownKeys49(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread49(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys49(Object(source), true).forEach(function(key2) {
      _defineProperty49(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys49(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty49(obj, key2, value) {
  key2 = _toPropertyKey48(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey48(arg) {
  var key2 = _toPrimitive48(arg, "string");
  return _typeof51(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive48(input, hint) {
  if (_typeof51(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof51(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _extends12() {
  _extends12 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends12.apply(this, arguments);
}
var Answers = function Answers2(_ref7) {
  var hits = _ref7.hits, isLoading = _ref7.isLoading, cssClasses = _ref7.cssClasses, templateProps = _ref7.templateProps;
  return _("div", {
    className: cx(cssClasses.root, hits.length === 0 && cssClasses.emptyRoot)
  }, _(Template_default, _extends12({}, templateProps, {
    templateKey: "header",
    rootProps: {
      className: cssClasses.header
    },
    data: {
      hits,
      isLoading
    }
  })), isLoading ? _(Template_default, _extends12({}, templateProps, {
    templateKey: "loader",
    rootProps: {
      className: cssClasses.loader
    }
  })) : _("ul", {
    className: cssClasses.list
  }, hits.map(function(hit, index3) {
    return _(Template_default, _extends12({}, templateProps, {
      templateKey: "item",
      rootTagName: "li",
      rootProps: {
        className: cssClasses.item
      },
      key: hit.objectID,
      data: _objectSpread49(_objectSpread49({}, hit), {}, {
        get __hitIndex() {
          true ? _warning(false, "The `__hitIndex` property is deprecated. Use the absolute `__position` instead.") : void 0;
          return index3;
        }
      })
    }));
  })));
};
var Answers_default = Answers;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/answers/defaultTemplates.js
var defaultTemplates = {
  header: function header() {
    return "";
  },
  loader: function loader() {
    return "";
  },
  item: function item(_item) {
    return JSON.stringify(_item);
  }
};
var defaultTemplates_default = defaultTemplates;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/answers/answers.js
function _typeof52(obj) {
  "@babel/helpers - typeof";
  return _typeof52 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof52(obj);
}
function ownKeys50(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread50(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys50(Object(source), true).forEach(function(key2) {
      _defineProperty50(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys50(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty50(obj, key2, value) {
  key2 = _toPropertyKey49(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey49(arg) {
  var key2 = _toPrimitive49(arg, "string");
  return _typeof52(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive49(input, hint) {
  if (_typeof52(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof52(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage32 = createDocumentationMessageGenerator({
  name: "answers"
});
var suit5 = component("Answers");
var renderer = function renderer2(_ref7) {
  var containerNode = _ref7.containerNode, cssClasses = _ref7.cssClasses, renderState = _ref7.renderState, templates = _ref7.templates;
  return function(_ref23, isFirstRendering) {
    var hits = _ref23.hits, isLoading = _ref23.isLoading, instantSearchInstance = _ref23.instantSearchInstance;
    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates_default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates
      });
      return;
    }
    B(_(Answers_default, {
      cssClasses,
      hits,
      isLoading,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};
var answersWidget = function answersWidget2(widgetParams) {
  var _ref33 = widgetParams || {}, container = _ref33.container, attributesForPrediction = _ref33.attributesForPrediction, queryLanguages = _ref33.queryLanguages, nbHits = _ref33.nbHits, searchDebounceTime = _ref33.searchDebounceTime, renderDebounceTime = _ref33.renderDebounceTime, escapeHTML = _ref33.escapeHTML, extraParameters = _ref33.extraParameters, _ref3$templates = _ref33.templates, templates = _ref3$templates === void 0 ? {} : _ref3$templates, _ref3$cssClasses = _ref33.cssClasses, userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;
  if (!container) {
    throw new Error(withUsage32("The `container` option is required."));
  }
  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit5(), userCssClasses.root),
    emptyRoot: cx(suit5({
      modifierName: "empty"
    }), userCssClasses.emptyRoot),
    header: cx(suit5({
      descendantName: "header"
    }), userCssClasses.header),
    loader: cx(suit5({
      descendantName: "loader"
    }), userCssClasses.loader),
    list: cx(suit5({
      descendantName: "list"
    }), userCssClasses.list),
    item: cx(suit5({
      descendantName: "item"
    }), userCssClasses.item)
  };
  var specializedRenderer = renderer({
    containerNode,
    cssClasses,
    templates,
    renderState: {}
  });
  var makeWidget = connectAnswers_default(specializedRenderer, function() {
    return B(null, containerNode);
  });
  return _objectSpread50(_objectSpread50({}, makeWidget({
    attributesForPrediction,
    queryLanguages,
    nbHits,
    searchDebounceTime,
    renderDebounceTime,
    escapeHTML,
    extraParameters
  })), {}, {
    $$widgetType: "ais.answers"
  });
};
var answers_default = deprecate(answersWidget, "The answers widget is deprecated and will be removed in InstantSearch.js 5.0");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/dynamic-widgets/dynamic-widgets.js
function _typeof53(obj) {
  "@babel/helpers - typeof";
  return _typeof53 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof53(obj);
}
var _excluded28 = ["container", "widgets", "fallbackWidget"];
function ownKeys51(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread51(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys51(Object(source), true).forEach(function(key2) {
      _defineProperty51(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys51(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty51(obj, key2, value) {
  key2 = _toPropertyKey50(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey50(arg) {
  var key2 = _toPrimitive50(arg, "string");
  return _typeof53(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive50(input, hint) {
  if (_typeof53(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof53(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties18(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose18(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose18(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
var withUsage33 = createDocumentationMessageGenerator({
  name: "dynamic-widgets"
});
var suit6 = component("DynamicWidgets");
function createContainer(rootContainer) {
  var container = document.createElement("div");
  container.className = suit6({
    descendantName: "widget"
  });
  rootContainer.appendChild(container);
  return container;
}
var dynamicWidgets = function dynamicWidgets2(widgetParams) {
  var _ref7 = widgetParams || {}, containerSelector = _ref7.container, widgets = _ref7.widgets, fallbackWidget = _ref7.fallbackWidget, otherWidgetParams = _objectWithoutProperties18(_ref7, _excluded28);
  if (!containerSelector) {
    throw new Error(withUsage33("The `container` option is required."));
  }
  if (!(widgets && Array.isArray(widgets) && widgets.every(function(widget2) {
    return typeof widget2 === "function";
  }))) {
    throw new Error(withUsage33("The `widgets` option expects an array of callbacks."));
  }
  var userContainer = getContainerNode(containerSelector);
  var rootContainer = document.createElement("div");
  rootContainer.className = suit6();
  var containers = /* @__PURE__ */ new Map();
  var connectorWidgets = [];
  var makeWidget = connectDynamicWidgets_default(function(_ref23, isFirstRender) {
    var attributesToRender = _ref23.attributesToRender;
    if (isFirstRender) {
      userContainer.appendChild(rootContainer);
    }
    attributesToRender.forEach(function(attribute) {
      if (!containers.has(attribute)) {
        return;
      }
      var container = containers.get(attribute);
      rootContainer.appendChild(container);
    });
  }, function() {
    userContainer.removeChild(rootContainer);
  });
  var widget = makeWidget(_objectSpread51(_objectSpread51({}, otherWidgetParams), {}, {
    widgets: connectorWidgets,
    fallbackWidget: typeof fallbackWidget === "function" ? function(_ref33) {
      var attribute = _ref33.attribute;
      var container = createContainer(rootContainer);
      containers.set(attribute, container);
      return fallbackWidget({
        attribute,
        container
      });
    } : void 0
  }));
  return _objectSpread51(_objectSpread51({}, widget), {}, {
    init: function init(initOptions) {
      widgets.forEach(function(cb) {
        var container = createContainer(rootContainer);
        var childWidget = cb(container);
        var attribute = getWidgetAttribute(childWidget, initOptions);
        containers.set(attribute, container);
        connectorWidgets.push(childWidget);
      });
      widget.init(initOptions);
    },
    $$widgetType: "ais.dynamicWidgets"
  });
};
var dynamic_widgets_default = dynamicWidgets;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/analytics/analytics.js
var withUsage34 = createDocumentationMessageGenerator({
  name: "analytics"
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/breadcrumb/breadcrumb.js
var withUsage35 = createDocumentationMessageGenerator({
  name: "breadcrumb"
});
var suit7 = component("Breadcrumb");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/clear-refinements/clear-refinements.js
var withUsage36 = createDocumentationMessageGenerator({
  name: "clear-refinements"
});
var suit8 = component("ClearRefinements");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/current-refinements/current-refinements.js
var withUsage37 = createDocumentationMessageGenerator({
  name: "current-refinements"
});
var suit9 = component("CurrentRefinements");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/geo-search/defaultTemplates.js
var _ref = _("p", null, "Your custom HTML Marker");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/geo-search/geo-search.js
var withUsage38 = createDocumentationMessageGenerator({
  name: "geo-search"
});
var suit10 = component("GeoSearch");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/SearchBox/SearchBox.js
function _typeof54(obj) {
  "@babel/helpers - typeof";
  return _typeof54 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof54(obj);
}
function _classCallCheck4(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties4(target, props) {
  for (var i32 = 0; i32 < props.length; i32++) {
    var descriptor = props[i32];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey51(descriptor.key), descriptor);
  }
}
function _createClass4(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties4(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties4(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass)
    _setPrototypeOf2(subClass, superClass);
}
function _setPrototypeOf2(o26, p7) {
  _setPrototypeOf2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf8(o27, p8) {
    o27.__proto__ = p8;
    return o27;
  };
  return _setPrototypeOf2(o26, p7);
}
function _createSuper2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf2(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf2(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn2(this, result);
  };
}
function _possibleConstructorReturn2(self, call) {
  if (call && (_typeof54(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized2(self);
}
function _assertThisInitialized2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct2() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e34) {
    return false;
  }
}
function _getPrototypeOf2(o26) {
  _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf8(o27) {
    return o27.__proto__ || Object.getPrototypeOf(o27);
  };
  return _getPrototypeOf2(o26);
}
function _defineProperty52(obj, key2, value) {
  key2 = _toPropertyKey51(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey51(arg) {
  var key2 = _toPrimitive51(arg, "string");
  return _typeof54(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive51(input, hint) {
  if (_typeof54(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof54(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var defaultProps2 = {
  query: "",
  showSubmit: true,
  showReset: true,
  showLoadingIndicator: true,
  autofocus: false,
  searchAsYouType: true,
  ignoreCompositionEvents: false,
  isSearchStalled: false,
  disabled: false,
  ariaLabel: "Search",
  onChange: noop,
  onSubmit: noop,
  onReset: noop,
  refine: noop
};
var SearchBox = function(_Component) {
  _inherits2(SearchBox2, _Component);
  var _super = _createSuper2(SearchBox2);
  function SearchBox2() {
    var _this;
    _classCallCheck4(this, SearchBox2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty52(_assertThisInitialized2(_this), "state", {
      query: _this.props.query,
      focused: false
    });
    _defineProperty52(_assertThisInitialized2(_this), "input", m());
    _defineProperty52(_assertThisInitialized2(_this), "onInput", function(event) {
      var _this$props = _this.props, searchAsYouType = _this$props.searchAsYouType, refine = _this$props.refine, onChange = _this$props.onChange;
      var query = event.target.value;
      if (!(_this.props.ignoreCompositionEvents && event.isComposing)) {
        if (searchAsYouType) {
          refine(query);
        }
        _this.setState({
          query
        });
        onChange(event);
      }
    });
    _defineProperty52(_assertThisInitialized2(_this), "onSubmit", function(event) {
      var _this$props2 = _this.props, searchAsYouType = _this$props2.searchAsYouType, refine = _this$props2.refine, onSubmit = _this$props2.onSubmit;
      event.preventDefault();
      event.stopPropagation();
      if (_this.input.current) {
        _this.input.current.blur();
      }
      if (!searchAsYouType) {
        refine(_this.state.query);
      }
      onSubmit(event);
      return false;
    });
    _defineProperty52(_assertThisInitialized2(_this), "onReset", function(event) {
      var _this$props3 = _this.props, refine = _this$props3.refine, onReset = _this$props3.onReset;
      var query = "";
      if (_this.input.current) {
        _this.input.current.focus();
      }
      refine(query);
      _this.setState({
        query
      });
      onReset(event);
    });
    _defineProperty52(_assertThisInitialized2(_this), "onBlur", function() {
      _this.setState({
        focused: false
      });
    });
    _defineProperty52(_assertThisInitialized2(_this), "onFocus", function() {
      _this.setState({
        focused: true
      });
    });
    return _this;
  }
  _createClass4(SearchBox2, [{
    key: "resetInput",
    value: (
      /**
       * This public method is used in the RefinementList SFFV search box
       * to reset the input state when an item is selected.
       *
       * @see RefinementList#componentWillReceiveProps
       * @return {undefined}
       */
      function resetInput() {
        this.setState({
          query: ""
        });
      }
    )
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!this.state.focused && nextProps.query !== this.state.query) {
        this.setState({
          query: nextProps.query
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props, cssClasses = _this$props4.cssClasses, placeholder = _this$props4.placeholder, autofocus = _this$props4.autofocus, showSubmit = _this$props4.showSubmit, showReset = _this$props4.showReset, showLoadingIndicator = _this$props4.showLoadingIndicator, templates = _this$props4.templates, isSearchStalled = _this$props4.isSearchStalled, ariaLabel = _this$props4.ariaLabel;
      return _("div", {
        className: cssClasses.root
      }, _("form", {
        action: "",
        role: "search",
        className: cssClasses.form,
        noValidate: true,
        onSubmit: this.onSubmit,
        onReset: this.onReset
      }, _("input", {
        ref: this.input,
        value: this.state.query,
        disabled: this.props.disabled,
        className: cssClasses.input,
        type: "search",
        placeholder,
        autoFocus: autofocus,
        autoComplete: "off",
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: "false",
        maxLength: 512,
        onInput: this.onInput,
        oncompositionend: this.onInput,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        "aria-label": ariaLabel
      }), _(Template_default, {
        templateKey: "submit",
        rootTagName: "button",
        rootProps: {
          className: cssClasses.submit,
          type: "submit",
          title: "Submit the search query",
          hidden: !showSubmit
        },
        templates,
        data: {
          cssClasses
        }
      }), _(Template_default, {
        templateKey: "reset",
        rootTagName: "button",
        rootProps: {
          className: cssClasses.reset,
          type: "reset",
          title: "Clear the search query",
          hidden: !(showReset && this.state.query.trim() && !isSearchStalled)
        },
        templates,
        data: {
          cssClasses
        }
      }), showLoadingIndicator && _(Template_default, {
        templateKey: "loadingIndicator",
        rootTagName: "span",
        rootProps: {
          className: cssClasses.loadingIndicator,
          hidden: !isSearchStalled
        },
        templates,
        data: {
          cssClasses
        }
      })));
    }
  }]);
  return SearchBox2;
}(b);
_defineProperty52(SearchBox, "defaultProps", defaultProps2);
var SearchBox_default = SearchBox;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/RefinementList/RefinementListItem.js
function _extends13() {
  _extends13 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends13.apply(this, arguments);
}
function RefinementListItem(_ref7) {
  var className = _ref7.className, handleClick = _ref7.handleClick, facetValueToRefine = _ref7.facetValueToRefine, isRefined2 = _ref7.isRefined, templateProps = _ref7.templateProps, templateKey = _ref7.templateKey, templateData = _ref7.templateData, subItems = _ref7.subItems;
  return _("li", {
    className,
    onClick: function onClick(originalEvent) {
      handleClick({
        facetValueToRefine,
        isRefined: isRefined2,
        originalEvent
      });
    }
  }, _(Template_default, _extends13({}, templateProps, {
    templateKey,
    data: templateData
  })), subItems);
}
var RefinementListItem_default = RefinementListItem;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/RefinementList/RefinementList.js
var _excluded29 = ["root"];
function _typeof55(obj) {
  "@babel/helpers - typeof";
  return _typeof55 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof55(obj);
}
function ownKeys52(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread52(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys52(Object(source), true).forEach(function(key2) {
      _defineProperty53(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys52(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _extends14() {
  _extends14 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends14.apply(this, arguments);
}
function _objectWithoutProperties19(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose19(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose19(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
function _classCallCheck5(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties5(target, props) {
  for (var i32 = 0; i32 < props.length; i32++) {
    var descriptor = props[i32];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey52(descriptor.key), descriptor);
  }
}
function _createClass5(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties5(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties5(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits3(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass)
    _setPrototypeOf3(subClass, superClass);
}
function _setPrototypeOf3(o26, p7) {
  _setPrototypeOf3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf8(o27, p8) {
    o27.__proto__ = p8;
    return o27;
  };
  return _setPrototypeOf3(o26, p7);
}
function _createSuper3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct3();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf3(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf3(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn3(this, result);
  };
}
function _possibleConstructorReturn3(self, call) {
  if (call && (_typeof55(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized3(self);
}
function _assertThisInitialized3(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct3() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e34) {
    return false;
  }
}
function _getPrototypeOf3(o26) {
  _getPrototypeOf3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf8(o27) {
    return o27.__proto__ || Object.getPrototypeOf(o27);
  };
  return _getPrototypeOf3(o26);
}
function _defineProperty53(obj, key2, value) {
  key2 = _toPropertyKey52(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey52(arg) {
  var key2 = _toPrimitive52(arg, "string");
  return _typeof55(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive52(input, hint) {
  if (_typeof55(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof55(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var defaultProps3 = {
  cssClasses: {},
  depth: 0
};
function isHierarchicalMenuItem(facetValue) {
  return facetValue.data !== void 0;
}
var RefinementList = function(_Component) {
  _inherits3(RefinementList2, _Component);
  var _super = _createSuper3(RefinementList2);
  function RefinementList2() {
    var _this;
    _classCallCheck5(this, RefinementList2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty53(_assertThisInitialized3(_this), "searchBox", m());
    _defineProperty53(_assertThisInitialized3(_this), "_generateFacetItem", function(facetValue) {
      var subItems;
      if (isHierarchicalMenuItem(facetValue) && Array.isArray(facetValue.data) && facetValue.data.length > 0) {
        var _this$props$cssClasse = _this.props.cssClasses, root = _this$props$cssClasse.root, cssClasses = _objectWithoutProperties19(_this$props$cssClasse, _excluded29);
        subItems = _(RefinementList2, _extends14({}, _this.props, {
          // We want to keep `root` required for external usage but not for the
          // sub items.
          cssClasses,
          depth: _this.props.depth + 1,
          facetValues: facetValue.data,
          showMore: false,
          className: _this.props.cssClasses.childList
        }));
      }
      var url = _this.props.createURL(facetValue.value);
      var templateData = _objectSpread52(_objectSpread52({}, facetValue), {}, {
        url,
        attribute: _this.props.attribute,
        cssClasses: _this.props.cssClasses,
        isFromSearch: _this.props.isFromSearch
      });
      var key2 = facetValue.value;
      if (facetValue.isRefined !== void 0) {
        key2 += "/".concat(facetValue.isRefined);
      }
      if (facetValue.count !== void 0) {
        key2 += "/".concat(facetValue.count);
      }
      var refinementListItemClassName = cx(_this.props.cssClasses.item, facetValue.isRefined && _this.props.cssClasses.selectedItem, !facetValue.count && _this.props.cssClasses.disabledItem, Boolean(isHierarchicalMenuItem(facetValue) && Array.isArray(facetValue.data) && facetValue.data.length > 0) && _this.props.cssClasses.parentItem);
      return _(RefinementListItem_default, {
        templateKey: "item",
        key: key2,
        facetValueToRefine: facetValue.value,
        handleClick: _this.handleItemClick,
        isRefined: facetValue.isRefined,
        className: refinementListItemClassName,
        subItems,
        templateData,
        templateProps: _this.props.templateProps
      });
    });
    _defineProperty53(_assertThisInitialized3(_this), "handleItemClick", function(_ref7) {
      var facetValueToRefine = _ref7.facetValueToRefine, isRefined2 = _ref7.isRefined, originalEvent = _ref7.originalEvent;
      if (isSpecialClick(originalEvent)) {
        return;
      }
      var parent = originalEvent.target;
      if (parent === null || parent.parentNode === null) {
        return;
      }
      if (isRefined2 && parent.parentNode.querySelector('input[type="radio"]:checked')) {
        return;
      }
      if (parent.tagName === "INPUT") {
        _this.refine(facetValueToRefine);
        return;
      }
      while (parent !== originalEvent.currentTarget) {
        if (parent.tagName === "LABEL" && (parent.querySelector('input[type="checkbox"]') || parent.querySelector('input[type="radio"]'))) {
          return;
        }
        if (parent.tagName === "A" && parent.href) {
          originalEvent.preventDefault();
        }
        parent = parent.parentNode;
      }
      originalEvent.stopPropagation();
      _this.refine(facetValueToRefine);
    });
    return _this;
  }
  _createClass5(RefinementList2, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var areFacetValuesDifferent = !isEqual(this.props.facetValues, nextProps.facetValues);
      return areFacetValuesDifferent;
    }
  }, {
    key: "refine",
    value: function refine(facetValueToRefine) {
      this.props.toggleRefinement(facetValueToRefine);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.searchBox.current && !nextProps.isFromSearch) {
        this.searchBox.current.resetInput();
      }
    }
  }, {
    key: "refineFirstValue",
    value: function refineFirstValue() {
      var firstValue = this.props.facetValues && this.props.facetValues[0];
      if (firstValue) {
        var actualValue = firstValue.value;
        this.props.toggleRefinement(actualValue);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var showMoreButtonClassName = cx(this.props.cssClasses.showMore, !(this.props.showMore === true && this.props.canToggleShowMore) && this.props.cssClasses.disabledShowMore);
      var showMoreButton = this.props.showMore === true && _(Template_default, _extends14({}, this.props.templateProps, {
        templateKey: "showMoreText",
        rootTagName: "button",
        rootProps: {
          className: showMoreButtonClassName,
          disabled: !this.props.canToggleShowMore,
          onClick: this.props.toggleShowMore
        },
        data: {
          isShowingMore: this.props.isShowingMore
        }
      }));
      var shouldDisableSearchBox = this.props.searchIsAlwaysActive !== true && !(this.props.isFromSearch || !this.props.hasExhaustiveItems);
      var searchBox = this.props.searchFacetValues && _("div", {
        className: this.props.cssClasses.searchBox
      }, _(SearchBox_default, {
        ref: this.searchBox,
        placeholder: this.props.searchPlaceholder,
        disabled: shouldDisableSearchBox,
        cssClasses: this.props.cssClasses.searchable,
        templates: this.props.searchBoxTemplateProps.templates,
        onChange: function onChange(event) {
          return _this2.props.searchFacetValues(event.target.value);
        },
        onReset: function onReset() {
          return _this2.props.searchFacetValues("");
        },
        onSubmit: function onSubmit() {
          return _this2.refineFirstValue();
        },
        searchAsYouType: false,
        ariaLabel: "Search for filters"
      }));
      var facetValues = this.props.facetValues && this.props.facetValues.length > 0 && _("ul", {
        className: this.props.cssClasses.list
      }, this.props.facetValues.map(this._generateFacetItem, this));
      var noResults = this.props.searchFacetValues && this.props.isFromSearch && (!this.props.facetValues || this.props.facetValues.length === 0) && _(Template_default, _extends14({}, this.props.templateProps, {
        templateKey: "searchableNoResults",
        rootProps: {
          className: this.props.cssClasses.noResults
        }
      }));
      var rootClassName = cx(this.props.cssClasses.root, (!this.props.facetValues || this.props.facetValues.length === 0) && this.props.cssClasses.noRefinementRoot, this.props.className);
      return _("div", {
        className: rootClassName
      }, this.props.children, searchBox, facetValues, noResults, showMoreButton);
    }
  }]);
  return RefinementList2;
}(b);
_defineProperty53(RefinementList, "defaultProps", defaultProps3);

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/formatNumber.js
function formatNumber(value, numberLocale) {
  return value.toLocaleString(numberLocale);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/hierarchical-menu/hierarchical-menu.js
var withUsage39 = createDocumentationMessageGenerator({
  name: "hierarchical-menu"
});
var suit11 = component("HierarchicalMenu");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/hits/hits.js
var withUsage40 = createDocumentationMessageGenerator({
  name: "hits"
});
var Hits = createHitsComponent({
  createElement: _,
  Fragment: k
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/hits-per-page/hits-per-page.js
var withUsage41 = createDocumentationMessageGenerator({
  name: "hits-per-page"
});
var suit12 = component("HitsPerPage");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/infinite-hits/infinite-hits.js
var withUsage42 = createDocumentationMessageGenerator({
  name: "infinite-hits"
});
var suit13 = component("InfiniteHits");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/menu/menu.js
var withUsage43 = createDocumentationMessageGenerator({
  name: "menu"
});
var suit14 = component("Menu");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/menu-select/menu-select.js
var withUsage44 = createDocumentationMessageGenerator({
  name: "menu-select"
});
var suit15 = component("MenuSelect");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/numeric-menu/numeric-menu.js
var withUsage45 = createDocumentationMessageGenerator({
  name: "numeric-menu"
});
var suit16 = component("NumericMenu");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/pagination/pagination.js
var suit17 = component("Pagination");
var withUsage46 = createDocumentationMessageGenerator({
  name: "pagination"
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/preact/hooks/dist/hooks.module.js
var t16;
var r12;
var u9;
var i11;
var f7 = [];
var c8 = l;
var e12 = c8.__b;
var a10 = c8.__r;
var v3 = c8.diffed;
var l8 = c8.__c;
var m6 = c8.unmount;
var s10 = c8.__;
function j2() {
  for (var n32; n32 = f7.shift(); )
    if (n32.__P && n32.__H)
      try {
        n32.__H.__h.forEach(z2), n32.__H.__h.forEach(B2), n32.__H.__h = [];
      } catch (t37) {
        n32.__H.__h = [], c8.__e(t37, n32.__v);
      }
}
c8.__b = function(n32) {
  r12 = null, e12 && e12(n32);
}, c8.__ = function(n32, t37) {
  n32 && t37.__k && t37.__k.__m && (n32.__m = t37.__k.__m), s10 && s10(n32, t37);
}, c8.__r = function(n32) {
  a10 && a10(n32), t16 = 0;
  var i32 = (r12 = n32.__c).__H;
  i32 && (u9 === r12 ? (i32.__h = [], r12.__h = [], i32.__.forEach(function(n33) {
    n33.__N && (n33.__ = n33.__N), n33.i = n33.__N = void 0;
  })) : (i32.__h.forEach(z2), i32.__h.forEach(B2), i32.__h = [], t16 = 0)), u9 = r12;
}, c8.diffed = function(n32) {
  v3 && v3(n32);
  var t37 = n32.__c;
  t37 && t37.__H && (t37.__H.__h.length && (1 !== f7.push(t37) && i11 === c8.requestAnimationFrame || ((i11 = c8.requestAnimationFrame) || w2)(j2)), t37.__H.__.forEach(function(n33) {
    n33.i && (n33.__H = n33.i), n33.i = void 0;
  })), u9 = r12 = null;
}, c8.__c = function(n32, t37) {
  t37.some(function(n33) {
    try {
      n33.__h.forEach(z2), n33.__h = n33.__h.filter(function(n34) {
        return !n34.__ || B2(n34);
      });
    } catch (r32) {
      t37.some(function(n34) {
        n34.__h && (n34.__h = []);
      }), t37 = [], c8.__e(r32, n33.__v);
    }
  }), l8 && l8(n32, t37);
}, c8.unmount = function(n32) {
  m6 && m6(n32);
  var t37, r32 = n32.__c;
  r32 && r32.__H && (r32.__H.__.forEach(function(n33) {
    try {
      z2(n33);
    } catch (n34) {
      t37 = n34;
    }
  }), r32.__H = void 0, t37 && c8.__e(t37, r32.__v));
};
var k3 = "function" == typeof requestAnimationFrame;
function w2(n32) {
  var t37, r32 = function() {
    clearTimeout(u26), k3 && cancelAnimationFrame(t37), setTimeout(n32);
  }, u26 = setTimeout(r32, 100);
  k3 && (t37 = requestAnimationFrame(r32));
}
function z2(n32) {
  var t37 = r12, u26 = n32.__c;
  "function" == typeof u26 && (n32.__c = void 0, u26()), r12 = t37;
}
function B2(n32) {
  var t37 = r12;
  n32.__c = n32.__(), r12 = t37;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/panel/panel.js
var withUsage47 = createDocumentationMessageGenerator({
  name: "panel"
});
var suit18 = component("Panel");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/places/places.js
function _typeof56(obj) {
  "@babel/helpers - typeof";
  return _typeof56 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof56(obj);
}
var _excluded30 = ["placesReference", "defaultPosition"];
var _excluded210 = ["places"];
function ownKeys53(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread53(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys53(Object(source), true).forEach(function(key2) {
      _defineProperty54(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys53(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty54(obj, key2, value) {
  key2 = _toPropertyKey53(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey53(arg) {
  var key2 = _toPrimitive53(arg, "string");
  return _typeof56(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive53(input, hint) {
  if (_typeof56(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof56(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties20(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose20(source, excluded);
  var key2, i32;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i32 = 0; i32 < sourceSymbolKeys.length; i32++) {
      key2 = sourceSymbolKeys[i32];
      if (excluded.indexOf(key2) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2))
        continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose20(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key2, i32;
  for (i32 = 0; i32 < sourceKeys.length; i32++) {
    key2 = sourceKeys[i32];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source[key2];
  }
  return target;
}
var placesWidget = function placesWidget2(widgetParams) {
  var _ref7 = widgetParams || {}, placesReference = _ref7.placesReference, _ref$defaultPosition = _ref7.defaultPosition, defaultPosition = _ref$defaultPosition === void 0 ? [] : _ref$defaultPosition, placesOptions = _objectWithoutProperties20(_ref7, _excluded30);
  if (typeof placesReference !== "function") {
    throw new Error("The `placesReference` option requires a valid Places.js reference.");
  }
  var placesAutocomplete = placesReference(placesOptions);
  var state = {
    query: "",
    initialLatLngViaIP: void 0,
    isInitialLatLngViaIPSet: false
  };
  return {
    $$type: "ais.places",
    $$widgetType: "ais.places",
    init: function init(_ref23) {
      var helper = _ref23.helper;
      placesAutocomplete.on("change", function(eventOptions) {
        var _eventOptions$suggest = eventOptions.suggestion, value = _eventOptions$suggest.value, _eventOptions$suggest2 = _eventOptions$suggest.latlng, lat = _eventOptions$suggest2.lat, lng = _eventOptions$suggest2.lng;
        state.query = value;
        helper.setQueryParameter("insideBoundingBox", void 0).setQueryParameter("aroundLatLngViaIP", false).setQueryParameter("aroundLatLng", "".concat(lat, ",").concat(lng)).search();
      });
      placesAutocomplete.on("clear", function() {
        state.query = "";
        helper.setQueryParameter("insideBoundingBox", void 0);
        if (defaultPosition.length > 1) {
          helper.setQueryParameter("aroundLatLngViaIP", false).setQueryParameter("aroundLatLng", defaultPosition.join(","));
        } else {
          helper.setQueryParameter("aroundLatLngViaIP", state.initialLatLngViaIP).setQueryParameter("aroundLatLng", void 0);
        }
        helper.search();
      });
    },
    getWidgetUiState: function getWidgetUiState(uiState, _ref33) {
      var searchParameters = _ref33.searchParameters;
      var position = searchParameters.aroundLatLng || defaultPosition.join(",");
      var hasPositionSet = position !== defaultPosition.join(",");
      if (!hasPositionSet && !state.query) {
        var places = uiState.places, uiStateWithoutPlaces = _objectWithoutProperties20(uiState, _excluded210);
        return uiStateWithoutPlaces;
      }
      return _objectSpread53(_objectSpread53({}, uiState), {}, {
        places: {
          query: state.query,
          position
        }
      });
    },
    getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref44) {
      var uiState = _ref44.uiState;
      var _ref52 = uiState.places || {}, _ref5$query = _ref52.query, query = _ref5$query === void 0 ? "" : _ref5$query, _ref5$position = _ref52.position, position = _ref5$position === void 0 ? defaultPosition.join(",") : _ref5$position;
      state.query = query;
      if (!state.isInitialLatLngViaIPSet) {
        state.isInitialLatLngViaIPSet = true;
        state.initialLatLngViaIP = searchParameters.aroundLatLngViaIP;
      }
      placesAutocomplete.setVal(query);
      placesAutocomplete.close();
      return searchParameters.setQueryParameter("insideBoundingBox", void 0).setQueryParameter("aroundLatLngViaIP", false).setQueryParameter("aroundLatLng", position || void 0);
    },
    getRenderState: function getRenderState(renderState, renderOptions) {
      return _objectSpread53(_objectSpread53({}, renderState), {}, {
        places: this.getWidgetRenderState(renderOptions)
      });
    },
    getWidgetRenderState: function getWidgetRenderState() {
      return {
        widgetParams
      };
    }
  };
};
var places_default = deprecate(placesWidget, "The places widget is deprecated and will be removed in InstantSearch.js 5.0.");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/powered-by/powered-by.js
var suit19 = component("PoweredBy");
var withUsage48 = createDocumentationMessageGenerator({
  name: "powered-by"
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/query-rule-context/query-rule-context.js
var withUsage49 = createDocumentationMessageGenerator({
  name: "query-rule-context"
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/query-rule-custom-data/query-rule-custom-data.js
var withUsage50 = createDocumentationMessageGenerator({
  name: "query-rule-custom-data"
});
var suit20 = component("QueryRuleCustomData");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/related-products/related-products.js
var withUsage51 = createDocumentationMessageGenerator({
  name: "related-products"
});
var RelatedProducts = createRelatedProductsComponent({
  createElement: _,
  Fragment: k
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/RangeInput/RangeInput.js
function _typeof57(obj) {
  "@babel/helpers - typeof";
  return _typeof57 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof57(obj);
}
function _extends15() {
  _extends15 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends15.apply(this, arguments);
}
function _classCallCheck6(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties6(target, props) {
  for (var i32 = 0; i32 < props.length; i32++) {
    var descriptor = props[i32];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey54(descriptor.key), descriptor);
  }
}
function _createClass6(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties6(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties6(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits4(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass)
    _setPrototypeOf4(subClass, superClass);
}
function _setPrototypeOf4(o26, p7) {
  _setPrototypeOf4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf8(o27, p8) {
    o27.__proto__ = p8;
    return o27;
  };
  return _setPrototypeOf4(o26, p7);
}
function _createSuper4(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct4();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf4(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf4(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn4(this, result);
  };
}
function _possibleConstructorReturn4(self, call) {
  if (call && (_typeof57(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized4(self);
}
function _assertThisInitialized4(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct4() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e34) {
    return false;
  }
}
function _getPrototypeOf4(o26) {
  _getPrototypeOf4 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf8(o27) {
    return o27.__proto__ || Object.getPrototypeOf(o27);
  };
  return _getPrototypeOf4(o26);
}
function _defineProperty55(obj, key2, value) {
  key2 = _toPropertyKey54(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey54(arg) {
  var key2 = _toPrimitive54(arg, "string");
  return _typeof57(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive54(input, hint) {
  if (_typeof57(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof57(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function stripLeadingZeroFromInput(value) {
  return value.replace(/^(0+)\d/, function(part) {
    return Number(part).toString();
  });
}
var RangeInput = function(_Component) {
  _inherits4(RangeInput2, _Component);
  var _super = _createSuper4(RangeInput2);
  function RangeInput2() {
    var _this$props$values$mi, _this$props$values$ma;
    var _this;
    _classCallCheck6(this, RangeInput2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty55(_assertThisInitialized4(_this), "state", {
      min: (_this$props$values$mi = _this.props.values.min) === null || _this$props$values$mi === void 0 ? void 0 : _this$props$values$mi.toString(),
      max: (_this$props$values$ma = _this.props.values.max) === null || _this$props$values$ma === void 0 ? void 0 : _this$props$values$ma.toString()
    });
    _defineProperty55(_assertThisInitialized4(_this), "onInput", function(key2) {
      return function(event) {
        var _ref7 = event.currentTarget, value = _ref7.value;
        _this.setState(_defineProperty55({}, key2, value));
      };
    });
    _defineProperty55(_assertThisInitialized4(_this), "onSubmit", function(event) {
      event.preventDefault();
      var _this$state = _this.state, min = _this$state.min, max = _this$state.max;
      _this.props.refine([min ? Number(min) : void 0, max ? Number(max) : void 0]);
    });
    return _this;
  }
  _createClass6(RangeInput2, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _nextProps$values$min, _nextProps$values$max;
      this.setState({
        min: (_nextProps$values$min = nextProps.values.min) === null || _nextProps$values$min === void 0 ? void 0 : _nextProps$values$min.toString(),
        max: (_nextProps$values$max = nextProps.values.max) === null || _nextProps$values$max === void 0 ? void 0 : _nextProps$values$max.toString()
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state, minValue = _this$state2.min, maxValue = _this$state2.max;
      var _this$props = this.props, min = _this$props.min, max = _this$props.max, step = _this$props.step, cssClasses = _this$props.cssClasses, templateProps = _this$props.templateProps;
      var isDisabled = min && max ? min >= max : false;
      var hasRefinements = Boolean(minValue || maxValue);
      var rootClassNames = cx(cssClasses.root, !hasRefinements && cssClasses.noRefinement);
      return _("div", {
        className: rootClassNames
      }, _("form", {
        className: cssClasses.form,
        onSubmit: this.onSubmit
      }, _("label", {
        className: cssClasses.label
      }, _("input", {
        className: cx(cssClasses.input, cssClasses.inputMin),
        type: "number",
        min,
        max,
        step,
        value: stripLeadingZeroFromInput(minValue !== null && minValue !== void 0 ? minValue : ""),
        onInput: this.onInput("min"),
        placeholder: min === null || min === void 0 ? void 0 : min.toString(),
        disabled: isDisabled
      })), _(Template_default, _extends15({}, templateProps, {
        templateKey: "separatorText",
        rootTagName: "span",
        rootProps: {
          className: cssClasses.separator
        }
      })), _("label", {
        className: cssClasses.label
      }, _("input", {
        className: cx(cssClasses.input, cssClasses.inputMax),
        type: "number",
        min,
        max,
        step,
        value: stripLeadingZeroFromInput(maxValue !== null && maxValue !== void 0 ? maxValue : ""),
        onInput: this.onInput("max"),
        placeholder: max === null || max === void 0 ? void 0 : max.toString(),
        disabled: isDisabled
      })), _(Template_default, _extends15({}, templateProps, {
        templateKey: "submitText",
        rootTagName: "button",
        rootProps: {
          type: "submit",
          className: cssClasses.submit,
          disabled: isDisabled
        }
      }))));
    }
  }]);
  return RangeInput2;
}(b);

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/range-input/range-input.js
var withUsage52 = createDocumentationMessageGenerator({
  name: "range-input"
});
var suit21 = component("RangeInput");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/Slider/Pit.js
function _typeof58(obj) {
  "@babel/helpers - typeof";
  return _typeof58 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof58(obj);
}
function ownKeys54(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread54(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys54(Object(source), true).forEach(function(key2) {
      _defineProperty56(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys54(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty56(obj, key2, value) {
  key2 = _toPropertyKey55(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey55(arg) {
  var key2 = _toPrimitive55(arg, "string");
  return _typeof58(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive55(input, hint) {
  if (_typeof58(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof58(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var Pit = function Pit2(_ref7) {
  var style = _ref7.style, children = _ref7.children;
  var positionValue = Math.round(parseFloat(style.left));
  var shouldDisplayValue = [0, 50, 100].includes(positionValue);
  var value = children;
  var pitValue = Math.round(parseInt(value, 10) * 100) / 100;
  return _("div", {
    style: _objectSpread54(_objectSpread54({}, style), {}, {
      marginLeft: positionValue === 100 ? "-2px" : 0
    }),
    className: cx("rheostat-marker", "rheostat-marker-horizontal", shouldDisplayValue && "rheostat-marker-large")
  }, shouldDisplayValue && _("div", {
    className: "rheostat-value"
  }, pitValue));
};
var Pit_default = Pit;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/Slider/Rheostat.js
function _typeof59(obj) {
  "@babel/helpers - typeof";
  return _typeof59 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof59(obj);
}
function _defineProperties7(target, props) {
  for (var i32 = 0; i32 < props.length; i32++) {
    var descriptor = props[i32];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey56(descriptor.key), descriptor);
  }
}
function _createClass7(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties7(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties7(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _classCallCheck7(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _inherits5(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass)
    _setPrototypeOf5(subClass, superClass);
}
function _setPrototypeOf5(o26, p7) {
  _setPrototypeOf5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf8(o27, p8) {
    o27.__proto__ = p8;
    return o27;
  };
  return _setPrototypeOf5(o26, p7);
}
function _createSuper5(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct5();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf5(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf5(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn5(this, result);
  };
}
function _possibleConstructorReturn5(self, call) {
  if (call && (_typeof59(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized5(self);
}
function _assertThisInitialized5(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct5() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e34) {
    return false;
  }
}
function _getPrototypeOf5(o26) {
  _getPrototypeOf5 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf8(o27) {
    return o27.__proto__ || Object.getPrototypeOf(o27);
  };
  return _getPrototypeOf5(o26);
}
function _defineProperty57(obj, key2, value) {
  key2 = _toPropertyKey56(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey56(arg) {
  var key2 = _toPrimitive56(arg, "string");
  return _typeof59(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive56(input, hint) {
  if (_typeof59(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof59(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _extends16() {
  _extends16 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends16.apply(this, arguments);
}
var KEYS = {
  DOWN: 40,
  END: 35,
  ESC: 27,
  HOME: 36,
  LEFT: 37,
  PAGE_DOWN: 34,
  PAGE_UP: 33,
  RIGHT: 39,
  UP: 38
};
var PERCENT_EMPTY = 0;
var PERCENT_FULL = 100;
function getPosition(value, min, max) {
  return (value - min) / (max - min) * 100;
}
function getValue2(pos, min, max) {
  var decimal = pos / 100;
  if (pos === 0) {
    return min;
  } else if (pos === 100) {
    return max;
  }
  return Math.round((max - min) * decimal + min);
}
function getClassName(props) {
  var orientation = props.orientation === "vertical" ? "rheostat-vertical" : "rheostat-horizontal";
  return ["rheostat", orientation].concat(props.className.split(" ")).join(" ");
}
function getHandleFor(ev) {
  return Number(ev.currentTarget.getAttribute("data-handle-key"));
}
function killEvent(ev) {
  ev.stopPropagation();
  ev.preventDefault();
}
function Button(props) {
  return _("button", _extends16({}, props, {
    type: "button"
  }));
}
var _ref6 = _("div", {
  className: "rheostat-background"
});
var Rheostat = function(_Component) {
  _inherits5(Rheostat2, _Component);
  var _super = _createSuper5(Rheostat2);
  function Rheostat2() {
    var _this;
    _classCallCheck7(this, Rheostat2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty57(_assertThisInitialized5(_this), "x", [0, 0].map(function(y6) {
      return y6;
    }));
    _defineProperty57(_assertThisInitialized5(_this), "state", {
      className: getClassName(_this.props),
      // non-null thanks to defaultProps
      handlePos: _this.props.values.map(function(value) {
        return getPosition(value, _this.props.min, _this.props.max);
      }),
      handleDimensions: 0,
      mousePos: null,
      sliderBox: {},
      slidingIndex: null,
      // non-null thanks to defaultProps
      values: _this.props.values
    });
    _defineProperty57(_assertThisInitialized5(_this), "rheostat", m());
    _defineProperty57(_assertThisInitialized5(_this), "componentWillReceiveProps", function(nextProps) {
      var _this$props = _this.props, className = _this$props.className, disabled = _this$props.disabled, min = _this$props.min, max = _this$props.max, orientation = _this$props.orientation;
      var _this$state = _this.state, values = _this$state.values, slidingIndex = _this$state.slidingIndex;
      var minMaxChanged = nextProps.min !== min || nextProps.max !== max;
      var valuesChanged = values.length !== nextProps.values.length || values.some(function(value, idx) {
        return nextProps.values[idx] !== value;
      });
      var orientationChanged = nextProps.className !== className || nextProps.orientation !== orientation;
      var willBeDisabled = nextProps.disabled && !disabled;
      if (orientationChanged) {
        _this.setState({
          className: getClassName(nextProps)
        });
      }
      if (minMaxChanged || valuesChanged)
        _this.updateNewValues(nextProps);
      if (willBeDisabled && slidingIndex !== null) {
        _this.endSlide();
      }
    });
    _defineProperty57(_assertThisInitialized5(_this), "getPublicState", function() {
      var _this$props2 = _this.props, min = _this$props2.min, max = _this$props2.max;
      var values = _this.state.values;
      return {
        max,
        min,
        values
      };
    });
    _defineProperty57(_assertThisInitialized5(_this), "getSliderBoundingBox", function() {
      var node = _this.rheostat.current;
      var rect = node.getBoundingClientRect();
      return {
        height: rect.height || node.clientHeight,
        left: rect.left,
        top: rect.top,
        width: rect.width || node.clientWidth
      };
    });
    _defineProperty57(_assertThisInitialized5(_this), "getProgressStyle", function(idx) {
      var handlePos = _this.state.handlePos;
      var value = handlePos[idx];
      if (idx === 0) {
        return _this.props.orientation === "vertical" ? {
          height: "".concat(value, "%"),
          top: 0
        } : {
          left: 0,
          width: "".concat(value, "%")
        };
      }
      var prevValue = handlePos[idx - 1];
      var diffValue = value - prevValue;
      return _this.props.orientation === "vertical" ? {
        height: "".concat(diffValue, "%"),
        top: "".concat(prevValue, "%")
      } : {
        left: "".concat(prevValue, "%"),
        width: "".concat(diffValue, "%")
      };
    });
    _defineProperty57(_assertThisInitialized5(_this), "getMinValue", function(idx) {
      return _this.state.values[idx - 1] ? Math.max(_this.props.min, _this.state.values[idx - 1]) : _this.props.min;
    });
    _defineProperty57(_assertThisInitialized5(_this), "getMaxValue", function(idx) {
      return _this.state.values[idx + 1] ? Math.min(_this.props.max, _this.state.values[idx + 1]) : _this.props.max;
    });
    _defineProperty57(_assertThisInitialized5(_this), "getHandleDimensions", function(ev, sliderBox) {
      var handleNode = ev.currentTarget || null;
      if (!handleNode)
        return 0;
      return _this.props.orientation === "vertical" ? handleNode.clientHeight / sliderBox.height * PERCENT_FULL / 2 : handleNode.clientWidth / sliderBox.width * PERCENT_FULL / 2;
    });
    _defineProperty57(_assertThisInitialized5(_this), "getClosestSnapPoint", function(value) {
      if (!_this.props.snapPoints.length)
        return value;
      return _this.props.snapPoints.reduce(function(snapTo, snap) {
        return Math.abs(snapTo - value) < Math.abs(snap - value) ? snapTo : snap;
      });
    });
    _defineProperty57(_assertThisInitialized5(_this), "getSnapPosition", function(positionPercent) {
      if (!_this.props.snap)
        return positionPercent;
      var _ref7 = _this.props, max = _ref7.max, min = _ref7.min;
      var value = getValue2(positionPercent, min, max);
      var snapValue = _this.getClosestSnapPoint(value);
      return getPosition(snapValue, min, max);
    });
    _defineProperty57(_assertThisInitialized5(_this), "getNextPositionForKey", function(idx, keyCode) {
      var _stepMultiplier;
      var _this$state2 = _this.state, handlePos = _this$state2.handlePos, values = _this$state2.values;
      var _ref23 = _this.props, max = _ref23.max, min = _ref23.min, snapPoints = _ref23.snapPoints;
      var shouldSnap = _this.props.snap;
      var proposedValue = values[idx];
      var proposedPercentage = handlePos[idx];
      var originalPercentage = proposedPercentage;
      var stepValue = 1;
      if (max >= 100) {
        proposedPercentage = Math.round(proposedPercentage);
      } else {
        stepValue = 100 / (max - min);
      }
      var currentIndex = null;
      if (shouldSnap) {
        currentIndex = snapPoints.indexOf(_this.getClosestSnapPoint(values[idx]));
      }
      var stepMultiplier = (_stepMultiplier = {}, _defineProperty57(_stepMultiplier, KEYS.LEFT, function(v7) {
        return v7 * -1;
      }), _defineProperty57(_stepMultiplier, KEYS.RIGHT, function(v7) {
        return v7;
      }), _defineProperty57(_stepMultiplier, KEYS.UP, function(v7) {
        return v7;
      }), _defineProperty57(_stepMultiplier, KEYS.DOWN, function(v7) {
        return v7 * -1;
      }), _defineProperty57(_stepMultiplier, KEYS.PAGE_DOWN, function(v7) {
        return v7 > 1 ? -v7 : v7 * -10;
      }), _defineProperty57(_stepMultiplier, KEYS.PAGE_UP, function(v7) {
        return v7 > 1 ? v7 : v7 * 10;
      }), _stepMultiplier);
      if (Object.prototype.hasOwnProperty.call(stepMultiplier, keyCode)) {
        proposedPercentage += stepMultiplier[keyCode](stepValue);
        if (shouldSnap) {
          if (!currentIndex) {
          } else if (proposedPercentage > originalPercentage) {
            if (currentIndex < snapPoints.length - 1) {
              proposedValue = snapPoints[currentIndex + 1];
            }
          } else if (currentIndex > 0) {
            proposedValue = snapPoints[currentIndex - 1];
          }
        }
      } else if (keyCode === KEYS.HOME) {
        proposedPercentage = PERCENT_EMPTY;
        if (shouldSnap) {
          proposedValue = snapPoints[0];
        }
      } else if (keyCode === KEYS.END) {
        proposedPercentage = PERCENT_FULL;
        if (shouldSnap) {
          proposedValue = snapPoints[snapPoints.length - 1];
        }
      } else {
        return null;
      }
      return shouldSnap ? getPosition(proposedValue, min, max) : proposedPercentage;
    });
    _defineProperty57(_assertThisInitialized5(_this), "getNextState", function(idx, proposedPosition) {
      var handlePos = _this.state.handlePos;
      var _ref33 = _this.props, max = _ref33.max, min = _ref33.min;
      var actualPosition = _this.validatePosition(idx, proposedPosition);
      var nextHandlePos = handlePos.map(function(pos, index3) {
        return index3 === idx ? actualPosition : pos;
      });
      return {
        handlePos: nextHandlePos,
        values: nextHandlePos.map(function(pos) {
          return getValue2(pos, min, max);
        })
      };
    });
    _defineProperty57(_assertThisInitialized5(_this), "getClosestHandle", function(positionPercent) {
      var handlePos = _this.state.handlePos;
      return handlePos.reduce(function(closestIdx, _node, idx) {
        var challenger = Math.abs(handlePos[idx] - positionPercent);
        var current = Math.abs(handlePos[closestIdx] - positionPercent);
        return challenger < current ? idx : closestIdx;
      }, 0);
    });
    _defineProperty57(_assertThisInitialized5(_this), "setStartSlide", function(ev, x3, y6) {
      var sliderBox = _this.getSliderBoundingBox();
      _this.setState({
        handleDimensions: _this.getHandleDimensions(ev, sliderBox),
        mousePos: {
          x: x3,
          y: y6
        },
        sliderBox,
        slidingIndex: getHandleFor(ev)
      });
    });
    _defineProperty57(_assertThisInitialized5(_this), "startMouseSlide", function(ev) {
      _this.setStartSlide(ev, ev.clientX, ev.clientY);
      document.addEventListener("mousemove", _this.handleMouseSlide, false);
      document.addEventListener("mouseup", _this.endSlide, false);
      killEvent(ev);
    });
    _defineProperty57(_assertThisInitialized5(_this), "startTouchSlide", function(ev) {
      if (ev.changedTouches.length > 1)
        return;
      var touch = ev.changedTouches[0];
      _this.setStartSlide(ev, touch.clientX, touch.clientY);
      document.addEventListener("touchmove", _this.handleTouchSlide, false);
      document.addEventListener("touchend", _this.endSlide, false);
      if (_this.props.onSliderDragStart)
        _this.props.onSliderDragStart();
      killEvent(ev);
    });
    _defineProperty57(_assertThisInitialized5(_this), "handleMouseSlide", function(ev) {
      if (_this.state.slidingIndex === null)
        return;
      _this.handleSlide(ev.clientX, ev.clientY);
      killEvent(ev);
    });
    _defineProperty57(_assertThisInitialized5(_this), "handleTouchSlide", function(ev) {
      if (_this.state.slidingIndex === null)
        return;
      if (ev.changedTouches.length > 1) {
        _this.endSlide();
        return;
      }
      var touch = ev.changedTouches[0];
      _this.handleSlide(touch.clientX, touch.clientY);
      killEvent(ev);
    });
    _defineProperty57(_assertThisInitialized5(_this), "handleSlide", function(x3, y6) {
      var _this$state3 = _this.state, idx = _this$state3.slidingIndex, sliderBox = _this$state3.sliderBox;
      var positionPercent = _this.props.orientation === "vertical" ? (y6 - sliderBox.top) / sliderBox.height * PERCENT_FULL : (x3 - sliderBox.left) / sliderBox.width * PERCENT_FULL;
      _this.slideTo(idx, positionPercent);
      if (_this.canMove(idx, positionPercent)) {
        _this.setState({
          mousePos: {
            x: x3,
            y: y6
          }
        });
        if (_this.props.onSliderDragMove)
          _this.props.onSliderDragMove();
      }
    });
    _defineProperty57(_assertThisInitialized5(_this), "endSlide", function() {
      var idx = _this.state.slidingIndex;
      _this.setState({
        slidingIndex: null
      });
      document.removeEventListener("mouseup", _this.endSlide, false);
      document.removeEventListener("touchend", _this.endSlide, false);
      document.removeEventListener("touchmove", _this.handleTouchSlide, false);
      document.removeEventListener("mousemove", _this.handleMouseSlide, false);
      if (_this.props.onSliderDragEnd)
        _this.props.onSliderDragEnd();
      if (_this.props.snap) {
        var positionPercent = _this.getSnapPosition(_this.state.handlePos[idx]);
        _this.slideTo(idx, positionPercent, function() {
          return _this.fireChangeEvent();
        });
      } else {
        _this.fireChangeEvent();
      }
    });
    _defineProperty57(_assertThisInitialized5(_this), "handleClick", function(ev) {
      if (ev.target.getAttribute("data-handle-key")) {
        return;
      }
      var sliderBox = _this.getSliderBoundingBox();
      var positionDecimal = _this.props.orientation === "vertical" ? (ev.clientY - sliderBox.top) / sliderBox.height : (ev.clientX - sliderBox.left) / sliderBox.width;
      var positionPercent = positionDecimal * PERCENT_FULL;
      var handleId = _this.getClosestHandle(positionPercent);
      var validPositionPercent = _this.getSnapPosition(positionPercent);
      _this.slideTo(handleId, validPositionPercent, function() {
        return _this.fireChangeEvent();
      });
      if (_this.props.onClick)
        _this.props.onClick();
    });
    _defineProperty57(_assertThisInitialized5(_this), "handleKeydown", function(ev) {
      var idx = getHandleFor(ev);
      if (ev.keyCode === KEYS.ESC) {
        ev.currentTarget.blur();
        return;
      }
      var proposedPercentage = _this.getNextPositionForKey(idx, ev.keyCode);
      if (proposedPercentage === null)
        return;
      if (_this.canMove(idx, proposedPercentage)) {
        _this.slideTo(idx, proposedPercentage, function() {
          return _this.fireChangeEvent();
        });
        if (_this.props.onKeyPress)
          _this.props.onKeyPress();
      }
      killEvent(ev);
    });
    _defineProperty57(_assertThisInitialized5(_this), "validatePosition", function(idx, proposedPosition) {
      var _this$state4 = _this.state, handlePos = _this$state4.handlePos, handleDimensions = _this$state4.handleDimensions;
      return Math.max(
        Math.min(
          proposedPosition,
          handlePos[idx + 1] !== void 0 ? handlePos[idx + 1] - handleDimensions : PERCENT_FULL
          // 100% is the highest value
        ),
        handlePos[idx - 1] !== void 0 ? handlePos[idx - 1] + handleDimensions : PERCENT_EMPTY
        // 0% is the lowest value
      );
    });
    _defineProperty57(_assertThisInitialized5(_this), "validateValues", function(proposedValues, props) {
      var _ref44 = props || _this.props, max = _ref44.max, min = _ref44.min;
      return proposedValues.map(function(value, idx, values) {
        var realValue = Math.max(Math.min(value, max), min);
        if (values.length && realValue < values[idx - 1]) {
          return values[idx - 1];
        }
        return realValue;
      });
    });
    _defineProperty57(_assertThisInitialized5(_this), "canMove", function(idx, proposedPosition) {
      var _this$state5 = _this.state, handlePos = _this$state5.handlePos, handleDimensions = _this$state5.handleDimensions;
      if (proposedPosition < PERCENT_EMPTY)
        return false;
      if (proposedPosition > PERCENT_FULL)
        return false;
      var nextHandlePosition = handlePos[idx + 1] !== void 0 ? handlePos[idx + 1] - handleDimensions : Infinity;
      if (proposedPosition > nextHandlePosition)
        return false;
      var prevHandlePosition = handlePos[idx - 1] !== void 0 ? handlePos[idx - 1] + handleDimensions : -Infinity;
      if (proposedPosition < prevHandlePosition)
        return false;
      return true;
    });
    _defineProperty57(_assertThisInitialized5(_this), "fireChangeEvent", function() {
      var onChange = _this.props.onChange;
      if (onChange)
        onChange(_this.getPublicState());
    });
    _defineProperty57(_assertThisInitialized5(_this), "slideTo", function(idx, proposedPosition, onAfterSet) {
      var nextState = _this.getNextState(idx, proposedPosition);
      _this.setState(nextState, function() {
        var onValuesUpdated = _this.props.onValuesUpdated;
        if (onValuesUpdated)
          onValuesUpdated(_this.getPublicState());
        if (onAfterSet)
          onAfterSet();
      });
    });
    _defineProperty57(_assertThisInitialized5(_this), "updateNewValues", function(nextProps) {
      var slidingIndex = _this.state.slidingIndex;
      if (slidingIndex !== null) {
        return;
      }
      var max = nextProps.max, min = nextProps.min, values = nextProps.values;
      var nextValues = _this.validateValues(values, nextProps);
      _this.setState({
        handlePos: nextValues.map(function(value) {
          return getPosition(value, min, max);
        }),
        values: nextValues
      }, function() {
        return _this.fireChangeEvent();
      });
    });
    _defineProperty57(_assertThisInitialized5(_this), "render", function() {
      var _ref52 = _this.props, children = _ref52.children, disabled = _ref52.disabled, Handle = _ref52.handle, max = _ref52.max, min = _ref52.min, orientation = _ref52.orientation, PitComponent = _ref52.pitComponent, pitPoints = _ref52.pitPoints, ProgressBar = _ref52.progressBar;
      var _this$state6 = _this.state, className = _this$state6.className, handlePos = _this$state6.handlePos, values = _this$state6.values;
      return _("div", {
        className,
        ref: _this.rheostat,
        onClick: disabled ? void 0 : _this.handleClick,
        style: {
          position: "relative"
        }
      }, _ref6, handlePos.map(function(pos, idx) {
        var handleStyle = orientation === "vertical" ? {
          top: "".concat(pos, "%"),
          position: "absolute"
        } : {
          left: "".concat(pos, "%"),
          position: "absolute"
        };
        return _(Handle, {
          "aria-valuemax": _this.getMaxValue(idx),
          "aria-valuemin": _this.getMinValue(idx),
          "aria-valuenow": values[idx],
          "aria-disabled": disabled,
          "data-handle-key": idx,
          className: "rheostat-handle",
          key: "handle-".concat(idx),
          onClick: killEvent,
          onKeyDown: disabled ? void 0 : _this.handleKeydown,
          onMouseDown: disabled ? void 0 : _this.startMouseSlide,
          onTouchStart: disabled ? void 0 : _this.startTouchSlide,
          role: "slider",
          style: handleStyle,
          tabIndex: 0
        });
      }), handlePos.map(function(_node, idx, arr) {
        if (idx === 0 && arr.length > 1) {
          return null;
        }
        return _(ProgressBar, {
          className: "rheostat-progress",
          key: "progress-bar-".concat(idx),
          style: _this.getProgressStyle(idx)
        });
      }), PitComponent && pitPoints.map(function(n32) {
        var pos = getPosition(n32, min, max);
        var pitStyle = orientation === "vertical" ? {
          top: "".concat(pos, "%"),
          position: "absolute"
        } : {
          left: "".concat(pos, "%"),
          position: "absolute"
        };
        return _(PitComponent, {
          key: "pit-".concat(n32),
          style: pitStyle
        }, n32);
      }), children);
    });
    return _this;
  }
  return _createClass7(Rheostat2);
}(b);
_defineProperty57(Rheostat, "defaultProps", {
  className: "",
  children: null,
  disabled: false,
  handle: Button,
  max: PERCENT_FULL,
  min: PERCENT_EMPTY,
  onClick: null,
  onChange: null,
  onKeyPress: null,
  onSliderDragEnd: null,
  onSliderDragMove: null,
  onSliderDragStart: null,
  onValuesUpdated: null,
  orientation: "horizontal",
  pitComponent: null,
  pitPoints: [],
  progressBar: "div",
  snap: false,
  snapPoints: [],
  values: [PERCENT_EMPTY]
});
var Rheostat_default = Rheostat;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/components/Slider/Slider.js
function _toConsumableArray14(arr) {
  return _arrayWithoutHoles14(arr) || _iterableToArray14(arr) || _unsupportedIterableToArray23(arr) || _nonIterableSpread14();
}
function _nonIterableSpread14() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray23(o26, minLen) {
  if (!o26)
    return;
  if (typeof o26 === "string")
    return _arrayLikeToArray23(o26, minLen);
  var n32 = Object.prototype.toString.call(o26).slice(8, -1);
  if (n32 === "Object" && o26.constructor)
    n32 = o26.constructor.name;
  if (n32 === "Map" || n32 === "Set")
    return Array.from(o26);
  if (n32 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n32))
    return _arrayLikeToArray23(o26, minLen);
}
function _iterableToArray14(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles14(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray23(arr);
}
function _arrayLikeToArray23(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i32 = 0, arr2 = new Array(len); i32 < len; i32++)
    arr2[i32] = arr[i32];
  return arr2;
}
function _extends17() {
  _extends17 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i32 = 1; i32 < arguments.length; i32++) {
      var source = arguments[i32];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends17.apply(this, arguments);
}
function _typeof60(obj) {
  "@babel/helpers - typeof";
  return _typeof60 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof60(obj);
}
function _classCallCheck8(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties8(target, props) {
  for (var i32 = 0; i32 < props.length; i32++) {
    var descriptor = props[i32];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey57(descriptor.key), descriptor);
  }
}
function _createClass8(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties8(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties8(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits6(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass)
    _setPrototypeOf6(subClass, superClass);
}
function _setPrototypeOf6(o26, p7) {
  _setPrototypeOf6 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf8(o27, p8) {
    o27.__proto__ = p8;
    return o27;
  };
  return _setPrototypeOf6(o26, p7);
}
function _createSuper6(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct6();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf6(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf6(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn6(this, result);
  };
}
function _possibleConstructorReturn6(self, call) {
  if (call && (_typeof60(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized6(self);
}
function _assertThisInitialized6(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct6() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e34) {
    return false;
  }
}
function _getPrototypeOf6(o26) {
  _getPrototypeOf6 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf8(o27) {
    return o27.__proto__ || Object.getPrototypeOf(o27);
  };
  return _getPrototypeOf6(o26);
}
function _defineProperty58(obj, key2, value) {
  key2 = _toPropertyKey57(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey57(arg) {
  var key2 = _toPrimitive57(arg, "string");
  return _typeof60(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive57(input, hint) {
  if (_typeof60(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof60(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var Slider = function(_Component) {
  _inherits6(Slider2, _Component);
  var _super = _createSuper6(Slider2);
  function Slider2() {
    var _this;
    _classCallCheck8(this, Slider2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty58(_assertThisInitialized6(_this), "handleChange", function(_ref7) {
      var values = _ref7.values;
      if (!_this.isDisabled) {
        _this.props.refine(values);
      }
    });
    _defineProperty58(_assertThisInitialized6(_this), "createHandleComponent", function(tooltips) {
      return function(props) {
        var roundedValue = Math.round(
          // have to cast as a string, as the value given to the prop is a number, but becomes a string when read
          parseFloat(props["aria-valuenow"]) * 100
        ) / 100;
        var value = _typeof60(tooltips) === "object" && tooltips.format ? tooltips.format(roundedValue) : roundedValue;
        var className = cx(props.className, props["data-handle-key"] === 0 && "rheostat-handle-lower", props["data-handle-key"] === 1 && "rheostat-handle-upper");
        var ariaLabel = props["data-handle-key"] === 0 ? "Minimum Filter Handle" : "Maximum Filter Handle";
        return _("div", _extends17({}, props, {
          className,
          "aria-label": ariaLabel
        }), tooltips && _("div", {
          className: "rheostat-tooltip"
        }, value));
      };
    });
    return _this;
  }
  _createClass8(Slider2, [{
    key: "isDisabled",
    get: function get3() {
      return this.props.min >= this.props.max;
    }
  }, {
    key: "computeDefaultPitPoints",
    value: (
      // creates an array number where to display a pit point on the slider
      function computeDefaultPitPoints(_ref23) {
        var min = _ref23.min, max = _ref23.max;
        var totalLength = max - min;
        var steps = 34;
        var stepsLength = totalLength / steps;
        var pitPoints = [min].concat(_toConsumableArray14(range({
          end: steps - 1
        }).map(function(step) {
          return min + stepsLength * (step + 1);
        })), [max]);
        return pitPoints;
      }
    )
    // creates an array of values where the slider should snap to
  }, {
    key: "computeSnapPoints",
    value: function computeSnapPoints(_ref33) {
      var min = _ref33.min, max = _ref33.max, step = _ref33.step;
      if (!step)
        return void 0;
      return [].concat(_toConsumableArray14(range({
        start: min,
        end: max,
        step
      })), [max]);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props, tooltips = _this$props.tooltips, step = _this$props.step, pips = _this$props.pips, values = _this$props.values, cssClasses = _this$props.cssClasses;
      var _ref44 = this.isDisabled ? {
        min: this.props.min,
        max: this.props.max + 1e-3
      } : this.props, min = _ref44.min, max = _ref44.max;
      var snapPoints = this.computeSnapPoints({
        min,
        max,
        step
      });
      var pitPoints = pips === false ? [] : this.computeDefaultPitPoints({
        min,
        max
      });
      return _("div", {
        className: cx(cssClasses.root, this.isDisabled && cssClasses.disabledRoot)
      }, _(Rheostat_default, {
        handle: this.createHandleComponent(tooltips),
        onChange: this.handleChange,
        min,
        max,
        pitComponent: Pit_default,
        pitPoints,
        snap: true,
        snapPoints,
        values: this.isDisabled ? [min, max] : values,
        disabled: this.isDisabled
      }));
    }
  }]);
  return Slider2;
}(b);

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/range-slider/range-slider.js
var withUsage53 = createDocumentationMessageGenerator({
  name: "range-slider"
});
var suit22 = component("RangeSlider");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/rating-menu/rating-menu.js
var withUsage54 = createDocumentationMessageGenerator({
  name: "rating-menu"
});
var suit23 = component("RatingMenu");
var _ref3 = _("path", {
  d: "M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
});
var _ref4 = _("path", {
  d: "M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/search-box/defaultTemplates.js
var _ref2 = _("path", {
  d: "M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
});
var _ref42 = _("path", {
  d: "M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
});
var _ref62 = _("g", {
  fill: "none",
  "fill-rule": "evenodd"
}, _("g", {
  transform: "translate(1 1)",
  "stroke-width": "2"
}, _("circle", {
  "stroke-opacity": ".5",
  cx: "18",
  cy: "18",
  r: "18"
}), _("path", {
  d: "M36 18c0-9.94-8.06-18-18-18"
}, _("animateTransform", {
  attributeName: "transform",
  type: "rotate",
  from: "0 18 18",
  to: "360 18 18",
  dur: "1s",
  repeatCount: "indefinite"
}))));

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/refinement-list/refinement-list.js
var withUsage55 = createDocumentationMessageGenerator({
  name: "refinement-list"
});
var suit24 = component("RefinementList");
var searchBoxSuit = component("SearchBox");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/relevant-sort/relevant-sort.js
var withUsage56 = createDocumentationMessageGenerator({
  name: "relevant-sort"
});
var suit25 = component("RelevantSort");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/search-box/search-box.js
var withUsage57 = createDocumentationMessageGenerator({
  name: "search-box"
});
var suit26 = component("SearchBox");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/sort-by/sort-by.js
var withUsage58 = createDocumentationMessageGenerator({
  name: "sort-by"
});
var suit27 = component("SortBy");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/stats/stats.js
var withUsage59 = createDocumentationMessageGenerator({
  name: "stats"
});
var suit28 = component("Stats");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/toggle-refinement/toggle-refinement.js
var withUsage60 = createDocumentationMessageGenerator({
  name: "toggle-refinement"
});
var suit29 = component("ToggleRefinement");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/trending-items/trending-items.js
var withUsage61 = createDocumentationMessageGenerator({
  name: "trending-items"
});
var TrendingItems = createTrendingItemsComponent({
  createElement: _,
  Fragment: k
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/voice-search/defaultTemplates.js
var _ref22 = _(k, null, _("line", {
  x1: "1",
  y1: "1",
  x2: "23",
  y2: "23"
}), _("path", {
  d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"
}), _("path", {
  d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"
}), _("line", {
  x1: "12",
  y1: "19",
  x2: "12",
  y2: "23"
}), _("line", {
  x1: "8",
  y1: "23",
  x2: "16",
  y2: "23"
}));
var _ref32 = _("path", {
  d: "M19 10v2a7 7 0 0 1-14 0v-2"
});
var _ref43 = _("line", {
  x1: "12",
  y1: "19",
  x2: "12",
  y2: "23"
});
var _ref5 = _("line", {
  x1: "8",
  y1: "23",
  x2: "16",
  y2: "23"
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/voice-search/voice-search.js
var withUsage62 = createDocumentationMessageGenerator({
  name: "voice-search"
});
var suit30 = component("VoiceSearch");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/frequently-bought-together/frequently-bought-together.js
var withUsage63 = createDocumentationMessageGenerator({
  name: "frequently-bought-together"
});
var FrequentlyBoughtTogether = createFrequentlyBoughtTogetherComponent({
  createElement: _,
  Fragment: k
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/looking-similar/looking-similar.js
var withUsage64 = createDocumentationMessageGenerator({
  name: "looking-similar"
});
var LookingSimilar = createLookingSimilarComponent({
  createElement: _,
  Fragment: k
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/widgets/index.js
var EXPERIMENTAL_answers = deprecate(answers_default, "answers is no longer supported");
var EXPERIMENTAL_dynamicWidgets = deprecate(dynamic_widgets_default, "use dynamicWidgets");

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/createHelpers.js
function _typeof61(obj) {
  "@babel/helpers - typeof";
  return _typeof61 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof61(obj);
}
function ownKeys55(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread55(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys55(Object(source), true).forEach(function(key2) {
      _defineProperty59(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys55(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty59(obj, key2, value) {
  key2 = _toPropertyKey58(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey58(arg) {
  var key2 = _toPrimitive58(arg, "string");
  return _typeof61(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive58(input, hint) {
  if (_typeof61(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof61(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function hoganHelpers(_ref7) {
  var numberLocale = _ref7.numberLocale;
  return {
    formatNumber: function formatNumber2(value, render) {
      return formatNumber(Number(render(value)), numberLocale);
    },
    highlight: function highlight2(options, render) {
      try {
        var highlightOptions = JSON.parse(options);
        return render(highlight(_objectSpread55(_objectSpread55({}, highlightOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error('\nThe highlight helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }');
      }
    },
    reverseHighlight: function reverseHighlight2(options, render) {
      try {
        var reverseHighlightOptions = JSON.parse(options);
        return render(reverseHighlight(_objectSpread55(_objectSpread55({}, reverseHighlightOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error('\n  The reverseHighlight helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }');
      }
    },
    snippet: function snippet2(options, render) {
      try {
        var snippetOptions = JSON.parse(options);
        return render(snippet(_objectSpread55(_objectSpread55({}, snippetOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error('\nThe snippet helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }');
      }
    },
    reverseSnippet: function reverseSnippet2(options, render) {
      try {
        var reverseSnippetOptions = JSON.parse(options);
        return render(reverseSnippet(_objectSpread55(_objectSpread55({}, reverseSnippetOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error('\n  The reverseSnippet helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }');
      }
    },
    insights: function insights2(options, render) {
      try {
        var _JSON$parse = JSON.parse(options), method = _JSON$parse.method, payload = _JSON$parse.payload;
        return render(insights(method, _objectSpread55({
          objectIDs: [this.objectID]
        }, payload)));
      } catch (error) {
        throw new Error('\nThe insights helper expects a JSON object of the format:\n{ "method": "method-name", "payload": { "eventName": "name of the event" } }');
      }
    }
  };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/version.js
var version_default = "4.72.1";

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/InstantSearch.js
function _typeof62(obj) {
  "@babel/helpers - typeof";
  return _typeof62 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof62(obj);
}
function ownKeys56(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread56(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys56(Object(source), true).forEach(function(key2) {
      _defineProperty60(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys56(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _classCallCheck9(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties9(target, props) {
  for (var i32 = 0; i32 < props.length; i32++) {
    var descriptor = props[i32];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey59(descriptor.key), descriptor);
  }
}
function _createClass9(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties9(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties9(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits7(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass)
    _setPrototypeOf7(subClass, superClass);
}
function _setPrototypeOf7(o26, p7) {
  _setPrototypeOf7 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf8(o27, p8) {
    o27.__proto__ = p8;
    return o27;
  };
  return _setPrototypeOf7(o26, p7);
}
function _createSuper7(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct7();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf7(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf7(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn7(this, result);
  };
}
function _possibleConstructorReturn7(self, call) {
  if (call && (_typeof62(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized7(self);
}
function _assertThisInitialized7(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct7() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e34) {
    return false;
  }
}
function _getPrototypeOf7(o26) {
  _getPrototypeOf7 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf8(o27) {
    return o27.__proto__ || Object.getPrototypeOf(o27);
  };
  return _getPrototypeOf7(o26);
}
function _defineProperty60(obj, key2, value) {
  key2 = _toPropertyKey59(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey59(arg) {
  var key2 = _toPrimitive59(arg, "string");
  return _typeof62(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive59(input, hint) {
  if (_typeof62(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof62(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage65 = createDocumentationMessageGenerator({
  name: "instantsearch"
});
function defaultCreateURL() {
  return "#";
}
var INSTANTSEARCH_FUTURE_DEFAULTS = {
  preserveSharedStateOnUnmount: false,
  persistHierarchicalRootCount: false
};
var InstantSearch = function(_EventEmitter) {
  _inherits7(InstantSearch2, _EventEmitter);
  var _super = _createSuper7(InstantSearch2);
  function InstantSearch2(options) {
    var _options$future2;
    var _this;
    _classCallCheck9(this, InstantSearch2);
    _this = _super.call(this);
    _defineProperty60(_assertThisInitialized7(_this), "client", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "indexName", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "insightsClient", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "onStateChange", null);
    _defineProperty60(_assertThisInitialized7(_this), "future", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "helper", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "mainHelper", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "mainIndex", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "started", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "templatesConfig", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "renderState", {});
    _defineProperty60(_assertThisInitialized7(_this), "_stalledSearchDelay", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "_searchStalledTimer", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "_initialUiState", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "_initialResults", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "_createURL", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "_searchFunction", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "_mainHelperSearch", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "_hasSearchWidget", false);
    _defineProperty60(_assertThisInitialized7(_this), "_hasRecommendWidget", false);
    _defineProperty60(_assertThisInitialized7(_this), "_insights", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "middleware", []);
    _defineProperty60(_assertThisInitialized7(_this), "sendEventToInsights", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "status", "idle");
    _defineProperty60(_assertThisInitialized7(_this), "error", void 0);
    _defineProperty60(_assertThisInitialized7(_this), "scheduleSearch", defer(function() {
      if (_this.started) {
        _this.mainHelper.search();
      }
    }));
    _defineProperty60(_assertThisInitialized7(_this), "scheduleRender", defer(function() {
      var _this$mainHelper;
      var shouldResetStatus = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      if (!((_this$mainHelper = _this.mainHelper) !== null && _this$mainHelper !== void 0 && _this$mainHelper.hasPendingRequests())) {
        clearTimeout(_this._searchStalledTimer);
        _this._searchStalledTimer = null;
        if (shouldResetStatus) {
          _this.status = "idle";
          _this.error = void 0;
        }
      }
      _this.mainIndex.render({
        instantSearchInstance: _assertThisInitialized7(_this)
      });
      _this.emit("render");
    }));
    _defineProperty60(_assertThisInitialized7(_this), "onInternalStateChange", defer(function() {
      var nextUiState = _this.mainIndex.getWidgetUiState({});
      _this.middleware.forEach(function(_ref7) {
        var instance = _ref7.instance;
        instance.onStateChange({
          uiState: nextUiState
        });
      });
    }));
    _this.setMaxListeners(100);
    var _options$indexName = options.indexName, indexName = _options$indexName === void 0 ? "" : _options$indexName, numberLocale = options.numberLocale, _options$initialUiSta = options.initialUiState, initialUiState = _options$initialUiSta === void 0 ? {} : _options$initialUiSta, _options$routing = options.routing, routing = _options$routing === void 0 ? null : _options$routing, _options$insights = options.insights, insights2 = _options$insights === void 0 ? void 0 : _options$insights, searchFunction = options.searchFunction, _options$stalledSearc = options.stalledSearchDelay, stalledSearchDelay = _options$stalledSearc === void 0 ? 200 : _options$stalledSearc, _options$searchClient = options.searchClient, searchClient = _options$searchClient === void 0 ? null : _options$searchClient, _options$insightsClie = options.insightsClient, insightsClient = _options$insightsClie === void 0 ? null : _options$insightsClie, _options$onStateChang = options.onStateChange, onStateChange = _options$onStateChang === void 0 ? null : _options$onStateChang, _options$future = options.future, future = _options$future === void 0 ? _objectSpread56(_objectSpread56({}, INSTANTSEARCH_FUTURE_DEFAULTS), options.future || {}) : _options$future;
    if (searchClient === null) {
      throw new Error(withUsage65("The `searchClient` option is required."));
    }
    if (typeof searchClient.search !== "function") {
      throw new Error("The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/");
    }
    if (typeof searchClient.addAlgoliaAgent === "function") {
      searchClient.addAlgoliaAgent("instantsearch.js (".concat(version_default, ")"));
    }
    true ? _warning(insightsClient === null, "`insightsClient` property has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : void 0;
    if (insightsClient && typeof insightsClient !== "function") {
      throw new Error(withUsage65("The `insightsClient` option should be a function."));
    }
    true ? _warning(!options.searchParameters, "The `searchParameters` option is deprecated and will not be supported in InstantSearch.js 4.x.\n\nYou can replace it with the `configure` widget:\n\n```\nsearch.addWidgets([\n  configure(".concat(JSON.stringify(options.searchParameters, null, 2), ")\n]);\n```\n\nSee ").concat(createDocumentationLink({
      name: "configure"
    }))) : void 0;
    if (((_options$future2 = options.future) === null || _options$future2 === void 0 ? void 0 : _options$future2.preserveSharedStateOnUnmount) === void 0) {
      console.info("Starting from the next major version, InstantSearch will change how widgets state is preserved when they are removed. InstantSearch will keep the state of unmounted widgets to be usable by other widgets with the same attribute.\n\nWe recommend setting `future.preserveSharedStateOnUnmount` to true to adopt this change today.\nTo stay with the current behaviour and remove this warning, set the option to false.\n\nSee documentation: ".concat(createDocumentationLink({
        name: "instantsearch"
      }), "#widget-param-future\n          "));
    }
    _this.client = searchClient;
    _this.future = future;
    _this.insightsClient = insightsClient;
    _this.indexName = indexName;
    _this.helper = null;
    _this.mainHelper = null;
    _this.mainIndex = index_default({
      indexName
    });
    _this.onStateChange = onStateChange;
    _this.started = false;
    _this.templatesConfig = {
      helpers: hoganHelpers({
        numberLocale
      }),
      compileOptions: {}
    };
    _this._stalledSearchDelay = stalledSearchDelay;
    _this._searchStalledTimer = null;
    _this._createURL = defaultCreateURL;
    _this._initialUiState = initialUiState;
    _this._initialResults = null;
    _this._insights = insights2;
    if (searchFunction) {
      true ? _warning(false, "The `searchFunction` option is deprecated. Use `onStateChange` instead.") : void 0;
      _this._searchFunction = searchFunction;
    }
    _this.sendEventToInsights = noop;
    if (routing) {
      var routerOptions = typeof routing === "boolean" ? {} : routing;
      routerOptions.$$internal = true;
      _this.use(createRouterMiddleware(routerOptions));
    }
    if (insights2) {
      var insightsOptions = typeof insights2 === "boolean" ? {} : insights2;
      insightsOptions.$$internal = true;
      _this.use(createInsightsMiddleware(insightsOptions));
    }
    if (isMetadataEnabled()) {
      _this.use(createMetadataMiddleware({
        $$internal: true
      }));
    }
    return _this;
  }
  _createClass9(InstantSearch2, [{
    key: "_isSearchStalled",
    get: (
      /**
       * @deprecated use `status === 'stalled'` instead
       */
      function get3() {
        true ? _warning(false, '`InstantSearch._isSearchStalled` is deprecated and will be removed in InstantSearch.js 5.0.\n\nUse `InstantSearch.status === "stalled"` instead.') : void 0;
        return this.status === "stalled";
      }
    )
  }, {
    key: "use",
    value: function use() {
      var _this2 = this;
      for (var _len = arguments.length, middleware = new Array(_len), _key = 0; _key < _len; _key++) {
        middleware[_key] = arguments[_key];
      }
      var newMiddlewareList = middleware.map(function(fn) {
        var newMiddleware = _objectSpread56({
          $$type: "__unknown__",
          $$internal: false,
          subscribe: noop,
          started: noop,
          unsubscribe: noop,
          onStateChange: noop
        }, fn({
          instantSearchInstance: _this2
        }));
        _this2.middleware.push({
          creator: fn,
          instance: newMiddleware
        });
        return newMiddleware;
      });
      if (this.started) {
        newMiddlewareList.forEach(function(m14) {
          m14.subscribe();
          m14.started();
        });
      }
      return this;
    }
    /**
     * Removes a middleware from the InstantSearch lifecycle.
     */
  }, {
    key: "unuse",
    value: function unuse() {
      for (var _len2 = arguments.length, middlewareToUnuse = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        middlewareToUnuse[_key2] = arguments[_key2];
      }
      this.middleware.filter(function(m14) {
        return middlewareToUnuse.includes(m14.creator);
      }).forEach(function(m14) {
        return m14.instance.unsubscribe();
      });
      this.middleware = this.middleware.filter(function(m14) {
        return !middlewareToUnuse.includes(m14.creator);
      });
      return this;
    }
    // @major we shipped with EXPERIMENTAL_use, but have changed that to just `use` now
  }, {
    key: "EXPERIMENTAL_use",
    value: function EXPERIMENTAL_use() {
      true ? _warning(false, "The middleware API is now considered stable, so we recommend replacing `EXPERIMENTAL_use` with `use` before upgrading to the next major version.") : void 0;
      return this.use.apply(this, arguments);
    }
    /**
     * Adds a widget to the search instance.
     * A widget can be added either before or after InstantSearch has started.
     * @param widget The widget to add to InstantSearch.
     *
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`.
     */
  }, {
    key: "addWidget",
    value: function addWidget(widget) {
      true ? _warning(false, "addWidget will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`") : void 0;
      return this.addWidgets([widget]);
    }
    /**
     * Adds multiple widgets to the search instance.
     * Widgets can be added either before or after InstantSearch has started.
     * @param widgets The array of widgets to add to InstantSearch.
     */
  }, {
    key: "addWidgets",
    value: function addWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage65("The `addWidgets` method expects an array of widgets. Please use `addWidget`."));
      }
      if (widgets.some(function(widget) {
        return typeof widget.init !== "function" && typeof widget.render !== "function";
      })) {
        throw new Error(withUsage65("The widget definition expects a `render` and/or an `init` method."));
      }
      this.mainIndex.addWidgets(widgets);
      return this;
    }
    /**
     * Removes a widget from the search instance.
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`
     * @param widget The widget instance to remove from InstantSearch.
     *
     * The widget must implement a `dispose()` method to clear its state.
     */
  }, {
    key: "removeWidget",
    value: function removeWidget(widget) {
      true ? _warning(false, "removeWidget will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`") : void 0;
      return this.removeWidgets([widget]);
    }
    /**
     * Removes multiple widgets from the search instance.
     * @param widgets Array of widgets instances to remove from InstantSearch.
     *
     * The widgets must implement a `dispose()` method to clear their states.
     */
  }, {
    key: "removeWidgets",
    value: function removeWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage65("The `removeWidgets` method expects an array of widgets. Please use `removeWidget`."));
      }
      if (widgets.some(function(widget) {
        return typeof widget.dispose !== "function";
      })) {
        throw new Error(withUsage65("The widget definition expects a `dispose` method."));
      }
      this.mainIndex.removeWidgets(widgets);
      return this;
    }
    /**
     * Ends the initialization of InstantSearch.js and triggers the
     * first search.
     */
  }, {
    key: "start",
    value: function start() {
      var _this3 = this;
      if (this.started) {
        throw new Error(withUsage65("The `start` method has already been called once."));
      }
      var mainHelper = this.mainHelper || (0, import_algoliasearch_helper4.default)(this.client, this.indexName, void 0, {
        persistHierarchicalRootCount: this.future.persistHierarchicalRootCount
      });
      mainHelper.search = function() {
        _this3.status = "loading";
        _this3.scheduleRender(false);
        true ? _warning(Boolean(_this3.indexName) || _this3.mainIndex.getWidgets().some(isIndexWidget), "No indexName provided, nor an explicit index widget in the widgets tree. This is required to be able to display results.") : void 0;
        if (_this3._hasSearchWidget) {
          mainHelper.searchOnlyWithDerivedHelpers();
        }
        if (_this3._hasRecommendWidget) {
          mainHelper.recommend();
        }
        return mainHelper;
      };
      if (this._searchFunction) {
        var fakeClient = {
          search: function search() {
            return new Promise(noop);
          }
        };
        this._mainHelperSearch = mainHelper.search.bind(mainHelper);
        mainHelper.search = function() {
          var mainIndexHelper = _this3.mainIndex.getHelper();
          var searchFunctionHelper = (0, import_algoliasearch_helper4.default)(fakeClient, mainIndexHelper.state.index, mainIndexHelper.state);
          searchFunctionHelper.once("search", function(_ref23) {
            var state = _ref23.state;
            mainIndexHelper.overrideStateWithoutTriggeringChangeEvent(state);
            _this3._mainHelperSearch();
          });
          searchFunctionHelper.on("change", function(_ref33) {
            var state = _ref33.state;
            mainIndexHelper.setState(state);
          });
          _this3._searchFunction(searchFunctionHelper);
          return mainHelper;
        };
      }
      mainHelper.on("error", function(_ref44) {
        var error = _ref44.error;
        if (!(error instanceof Error)) {
          var err = error;
          error = Object.keys(err).reduce(function(acc, key2) {
            acc[key2] = err[key2];
            return acc;
          }, new Error(err.message));
        }
        error.error = error;
        _this3.error = error;
        _this3.status = "error";
        _this3.scheduleRender(false);
        _this3.emit("error", error);
      });
      this.mainHelper = mainHelper;
      this.middleware.forEach(function(_ref52) {
        var instance = _ref52.instance;
        instance.subscribe();
      });
      this.mainIndex.init({
        instantSearchInstance: this,
        parent: null,
        uiState: this._initialUiState
      });
      if (this._initialResults) {
        hydrateSearchClient(this.client, this._initialResults);
        hydrateRecommendCache(this.mainHelper, this._initialResults);
        var originalScheduleSearch = this.scheduleSearch;
        this.scheduleSearch = defer(noop);
        defer(function() {
          _this3.scheduleSearch = originalScheduleSearch;
        })();
      } else if (this.mainIndex.getWidgets().length > 0) {
        this.scheduleSearch();
      }
      this.helper = this.mainIndex.getHelper();
      this.started = true;
      this.middleware.forEach(function(_ref63) {
        var instance = _ref63.instance;
        instance.started();
      });
      if (typeof this._insights === "undefined") {
        mainHelper.derivedHelpers[0].once("result", function() {
          var hasAutomaticInsights = _this3.mainIndex.getScopedResults().some(function(_ref7) {
            var results = _ref7.results;
            return results === null || results === void 0 ? void 0 : results._automaticInsights;
          });
          if (hasAutomaticInsights) {
            _this3.use(createInsightsMiddleware({
              $$internal: true,
              $$automatic: true
            }));
          }
        });
      }
    }
    /**
     * Removes all widgets without triggering a search afterwards.
     * @return {undefined} This method does not return anything
     */
  }, {
    key: "dispose",
    value: function dispose() {
      var _this$mainHelper2;
      this.scheduleSearch.cancel();
      this.scheduleRender.cancel();
      clearTimeout(this._searchStalledTimer);
      this.removeWidgets(this.mainIndex.getWidgets());
      this.mainIndex.dispose();
      this.started = false;
      this.removeAllListeners();
      (_this$mainHelper2 = this.mainHelper) === null || _this$mainHelper2 === void 0 ? void 0 : _this$mainHelper2.removeAllListeners();
      this.mainHelper = null;
      this.helper = null;
      this.middleware.forEach(function(_ref8) {
        var instance = _ref8.instance;
        instance.unsubscribe();
      });
    }
  }, {
    key: "scheduleStalledRender",
    value: function scheduleStalledRender() {
      var _this4 = this;
      if (!this._searchStalledTimer) {
        this._searchStalledTimer = setTimeout(function() {
          _this4.status = "stalled";
          _this4.scheduleRender();
        }, this._stalledSearchDelay);
      }
    }
    /**
     * Set the UI state and trigger a search.
     * @param uiState The next UI state or a function computing it from the current state
     * @param callOnStateChange private parameter used to know if the method is called from a state change
     */
  }, {
    key: "setUiState",
    value: function setUiState(uiState) {
      var _this5 = this;
      var callOnStateChange = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (!this.mainHelper) {
        throw new Error(withUsage65("The `start` method needs to be called before `setUiState`."));
      }
      this.mainIndex.refreshUiState();
      var nextUiState = typeof uiState === "function" ? uiState(this.mainIndex.getWidgetUiState({})) : uiState;
      if (this.onStateChange && callOnStateChange) {
        this.onStateChange({
          uiState: nextUiState,
          setUiState: function setUiState2(finalUiState) {
            setIndexHelperState(typeof finalUiState === "function" ? finalUiState(nextUiState) : finalUiState, _this5.mainIndex);
            _this5.scheduleSearch();
            _this5.onInternalStateChange();
          }
        });
      } else {
        setIndexHelperState(nextUiState, this.mainIndex);
        this.scheduleSearch();
        this.onInternalStateChange();
      }
    }
  }, {
    key: "getUiState",
    value: function getUiState() {
      if (this.started) {
        this.mainIndex.refreshUiState();
      }
      return this.mainIndex.getWidgetUiState({});
    }
  }, {
    key: "createURL",
    value: function createURL() {
      var nextState = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (!this.started) {
        throw new Error(withUsage65("The `start` method needs to be called before `createURL`."));
      }
      return this._createURL(nextState);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      if (!this.mainHelper) {
        throw new Error(withUsage65("The `start` method needs to be called before `refresh`."));
      }
      this.mainHelper.clearCache().search();
    }
  }]);
  return InstantSearch2;
}(import_events.default);
var InstantSearch_default = InstantSearch;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/index.js
var instantsearch = function instantsearch2(options) {
  return new InstantSearch_default(options);
};
instantsearch.version = version_default;
instantsearch.createInfiniteHitsSessionStorageCache = deprecate(createInfiniteHitsSessionStorageCache, "import { createInfiniteHitsSessionStorageCache } from 'instantsearch.js/es/lib/infiniteHitsCache'");
instantsearch.highlight = deprecate(highlight, "import { highlight } from 'instantsearch.js/es/helpers'");
instantsearch.reverseHighlight = deprecate(reverseHighlight, "import { reverseHighlight } from 'instantsearch.js/es/helpers'");
instantsearch.snippet = deprecate(snippet, "import { snippet } from 'instantsearch.js/es/helpers'");
instantsearch.reverseSnippet = deprecate(reverseSnippet, "import { reverseSnippet } from 'instantsearch.js/es/helpers'");
instantsearch.insights = insights;
instantsearch.getInsightsAnonymousUserToken = getInsightsAnonymousUserToken;
Object.defineProperty(instantsearch, "widgets", {
  get: function get() {
    throw new ReferenceError(`"instantsearch.widgets" are not available from the ES build.

To import the widgets:

import { searchBox } from 'instantsearch.js/es/widgets'`);
  }
});
Object.defineProperty(instantsearch, "connectors", {
  get: function get2() {
    throw new ReferenceError(`"instantsearch.connectors" are not available from the ES build.

To import the connectors:

import { connectSearchBox } from 'instantsearch.js/es/connectors'`);
  }
});
var es_default = instantsearch;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/util/createInstantSearchComponent.js
import { version as e13 } from "vue";

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/package.json.js
var r13 = "4.17.5";

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/util/createInstantSearchComponent.js
var r14 = function(r32) {
  var c23;
  return e(((c23 = { mixins: [t({ name: "InstantSearch" })], provide: function() {
    return { $_ais_instantSearchInstance: this.instantSearchInstance };
  }, watch: { searchClient: function(n32) {
    a(false), this.instantSearchInstance.helper.setClient(n32).search();
  }, indexName: function(n32) {
    this.instantSearchInstance.helper.setIndex(n32 || "").search();
  }, stalledSearchDelay: function(n32) {
    this.instantSearchInstance._stalledSearchDelay = n32;
  }, routing: function() {
    throw new Error("routing configuration can not be changed dynamically at this point.\n\nPlease open a new issue: https://github.com/algolia/instantsearch/discussions/new?category=ideas&labels=triage%2cLibrary%3A+Vue+InstantSearch&title=Feature%20request%3A%20dynamic%20props");
  }, onStateChange: function() {
    throw new Error("onStateChange configuration can not be changed dynamically at this point.\n\nPlease open a new issue: https://github.com/algolia/instantsearch/discussions/new?category=ideas&labels=triage%2cLibrary%3A+Vue+InstantSearch&title=Feature%20request%3A%20dynamic%20props");
  }, searchFunction: function(n32) {
    this.instantSearchInstance._searchFunction = n32;
  }, middlewares: { immediate: true, handler: function(n32, t37) {
    var e34 = this;
    (t37 || []).filter(function(t38) {
      return -1 === (n32 || []).indexOf(t38);
    }).forEach(function(n33) {
      e34.instantSearchInstance.unuse(n33);
    }), (n32 || []).filter(function(n33) {
      return -1 === (t37 || []).indexOf(n33);
    }).forEach(function(n33) {
      e34.instantSearchInstance.use(n33);
    });
  } }, future: function(n32) {
    this.instantSearchInstance.future = Object.assign(INSTANTSEARCH_FUTURE_DEFAULTS, n32);
  } }, created: function() {
    var n32 = this.instantSearchInstance.client;
    "function" == typeof n32.addAlgoliaAgent && (n32.addAlgoliaAgent("Vue (" + e13 + ")"), n32.addAlgoliaAgent("Vue InstantSearch (" + r13 + ")"));
  }, mounted: function() {
    var n32 = this;
    this.$nextTick(function() {
      n32.instantSearchInstance.started || n32.instantSearchInstance.start();
    });
  } }).beforeUnmount = function() {
    this.instantSearchInstance.started && this.instantSearchInstance.dispose(), this.instantSearchInstance.__initialSearchResults = void 0;
  }, c23), r32);
};

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/InstantSearch.js
var r15 = "Vue InstantSearch: You used the prop api-key or app-id.\nThese have been replaced by search-client.\n\nSee more info here: https://www.algolia.com/doc/api-reference/widgets/instantsearch/vue/#widget-param-search-client";
var InstantSearch_default2 = r14({ name: "AisInstantSearch", props: { searchClient: { type: Object, required: true }, insightsClient: { type: Function, default: void 0 }, indexName: { type: String, required: true }, routing: { default: void 0, validator: function(t37) {
  return !("boolean" == typeof t37 || !t37.router && !t37.stateMapping) || (a("The `routing` option expects an object with `router` and/or `stateMapping`.\n\nSee https://www.algolia.com/doc/api-reference/widgets/instantsearch/vue/#widget-param-routing"), false);
} }, insights: { default: void 0, validator: function(t37) {
  return void 0 === t37 || "boolean" == typeof t37 || "object" == typeof t37;
} }, stalledSearchDelay: { type: Number, default: void 0 }, searchFunction: { type: Function, default: void 0 }, onStateChange: { type: Function, default: void 0 }, initialUiState: { type: Object, default: void 0 }, apiKey: { type: String, default: void 0, validator: function(t37) {
  return t37 && a(r15), false;
} }, appId: { type: String, default: void 0, validator: function(t37) {
  return t37 && a(r15), false;
} }, middlewares: { type: Array, default: null }, future: { type: Object, default: void 0 } }, data: function() {
  return { instantSearchInstance: es_default({ searchClient: this.searchClient, insightsClient: this.insightsClient, insights: this.insights, indexName: this.indexName, routing: this.routing, stalledSearchDelay: this.stalledSearchDelay, searchFunction: this.searchFunction, onStateChange: this.onStateChange, initialUiState: this.initialUiState, future: this.future }) };
}, render: n(function(t37) {
  var i32;
  return t37("div", { class: (i32 = {}, i32[this.suit()] = true, i32[this.suit("", "ssr")] = false, i32) }, s(this));
}) });

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/InstantSearchSsr.js
var InstantSearchSsr_default = r14({ name: "AisInstantSearchSsr", inject: { $_ais_ssrInstantSearchInstance: { default: function() {
  throw new Error("`createServerRootMixin` is required when using SSR.");
} } }, data: function() {
  return { instantSearchInstance: this.$_ais_ssrInstantSearchInstance };
}, render: n(function(t37) {
  var e34;
  return t37("div", { class: (e34 = {}, e34[this.suit()] = true, e34[this.suit("", "ssr")] = true, e34) }, s(this));
}) });

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/InfiniteHits.vue_vue&type=script&lang.js
var InfiniteHits_vue_vue_type_script_lang_default = { name: "AisInfiniteHits", mixins: [n3({ connector: connectInfiniteHitsWithInsights_default }, { $$widgetType: "ais.infiniteHits" }), t({ name: "InfiniteHits" })], props: { showPrevious: { type: Boolean, default: false }, escapeHTML: { type: Boolean, default: true }, transformItems: { type: Function, default: void 0 }, cache: { type: Object, default: void 0 } }, computed: { widgetParams: function() {
  return { showPrevious: this.showPrevious, escapeHTML: this.escapeHTML, transformItems: this.transformItems, cache: this.cache };
} }, methods: { refinePrevious: function() {
  this.state.showPrevious();
}, refineNext: function() {
  this.state.showMore();
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/InfiniteHits.vue_vue&type=template&id=1b2a109e&lang.js
import { openBlock as e14, createElementBlock as t17, normalizeClass as s11, renderSlot as i12, createElementVNode as n13, createCommentVNode as r16, Fragment as a11, renderList as o9, createTextVNode as u10, toDisplayString as l9 } from "vue";
var c9 = ["disabled"];
var d3 = ["onClick", "onAuxclick"];
var f8 = ["disabled"];
function v4(v7, P3, g9, k5, x3, b3) {
  return v7.state ? (e14(), t17("div", { key: 0, class: s11(v7.suit()) }, [g9.showPrevious ? i12(v7.$slots, "loadPrevious", { key: 0, refinePrevious: b3.refinePrevious, page: v7.state.results.page, isFirstPage: v7.state.isFirstPage }, function() {
    return [n13("button", { class: s11([v7.suit("loadPrevious"), v7.state.isFirstPage && v7.suit("loadPrevious", "disabled")]), disabled: v7.state.isFirstPage, onClick: P3[0] || (P3[0] = function(e34) {
      return b3.refinePrevious();
    }) }, " Show previous results ", 10, c9)];
  }) : r16("", true), i12(v7.$slots, "default", { items: v7.state.items, results: v7.state.results, isLastPage: v7.state.isLastPage, refinePrevious: b3.refinePrevious, refineNext: b3.refineNext, refine: b3.refineNext, insights: v7.state.insights, sendEvent: v7.state.sendEvent }, function() {
    return [n13("ol", { class: s11(v7.suit("list")) }, [(e14(true), t17(a11, null, o9(v7.state.items, function(n32, r32) {
      return e14(), t17("li", { class: s11(v7.suit("item")), key: n32.objectID, onClick: function(e34) {
        return v7.state.sendEvent("click:internal", n32, "Hit Clicked");
      }, onAuxclick: function(e34) {
        return v7.state.sendEvent("click:internal", n32, "Hit Clicked");
      } }, [i12(v7.$slots, "item", { item: n32, index: r32, insights: v7.state.insights, sendEvent: v7.state.sendEvent }, function() {
        return [u10(" objectID: " + l9(n32.objectID) + ", index: " + l9(r32), 1)];
      })], 42, d3);
    }), 128))], 2), i12(v7.$slots, "loadMore", { refineNext: b3.refineNext, refine: b3.refineNext, page: v7.state.results.page, isLastPage: v7.state.isLastPage }, function() {
      return [n13("button", { class: s11([v7.suit("loadMore"), v7.state.isLastPage && v7.suit("loadMore", "disabled")]), disabled: v7.state.isLastPage, onClick: P3[1] || (P3[1] = function(e34) {
        return b3.refineNext();
      }) }, " Show more results ", 10, f8)];
    })];
  })], 2)) : r16("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/InfiniteHits.vue.js
InfiniteHits_vue_vue_type_script_lang_default.render = v4;
var InfiniteHits_vue_default = InfiniteHits_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Menu.vue_vue&type=script&lang.js
var Menu_vue_vue_type_script_lang_default = { name: "AisMenu", mixins: [t({ name: "Menu" }), n3({ connector: connectMenu_default }, { $$widgetType: "ais.menu" }), r4()], props: { attribute: { type: String, required: true }, limit: { type: Number, default: void 0 }, showMoreLimit: { type: Number, default: void 0 }, showMore: { type: Boolean, default: false }, sortBy: { type: [Array, Function], default: void 0 }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { attribute: this.attribute, limit: this.limit, showMore: this.showMore, showMoreLimit: this.showMoreLimit, sortBy: this.sortBy, transformItems: this.transformItems };
}, showShowMoreButton: function() {
  return this.state.canRefine && this.showMore;
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Menu.vue_vue&type=template&id=55b32cf6&lang.js
import { openBlock as e15, createElementBlock as t18, normalizeClass as s12, renderSlot as o10, createElementVNode as n14, Fragment as i13, renderList as a12, withModifiers as r17, toDisplayString as l10, createTextVNode as u11, createCommentVNode as c10 } from "vue";
var h7 = ["href", "onClick"];
var g5 = ["disabled"];
function w3(w4, f15, M2, S2, d8, v7) {
  return w4.state ? (e15(), t18("div", { key: 0, class: s12([w4.suit(), !w4.state.canRefine && w4.suit("", "noRefinement")]) }, [o10(w4.$slots, "default", { items: w4.state.items, canRefine: w4.state.canRefine, canToggleShowMore: w4.state.canToggleShowMore, isShowingMore: w4.state.isShowingMore, refine: w4.state.refine, createURL: w4.state.createURL, toggleShowMore: w4.state.toggleShowMore, sendEvent: w4.state.sendEvent }, function() {
    return [n14("ul", { class: s12(w4.suit("list")) }, [(e15(true), t18(i13, null, a12(w4.state.items, function(o26) {
      return e15(), t18("li", { key: o26.value, class: s12([w4.suit("item"), o26.isRefined && w4.suit("item", "selected")]) }, [n14("a", { href: w4.state.createURL(o26.value), class: s12(w4.suit("link")), onClick: r17(function(e34) {
        return w4.state.refine(o26.value);
      }, ["prevent"]) }, [n14("span", { class: s12(w4.suit("label")) }, l10(o26.label), 3), n14("span", { class: s12(w4.suit("count")) }, l10(o26.count), 3)], 10, h7)], 2);
    }), 128))], 2), v7.showShowMoreButton ? (e15(), t18("button", { key: 0, class: s12([w4.suit("showMore"), !w4.state.canToggleShowMore && w4.suit("showMore", "disabled")]), disabled: !w4.state.canToggleShowMore, onClick: f15[0] || (f15[0] = r17(function(e34) {
      return w4.state.toggleShowMore();
    }, ["prevent"])) }, [o10(w4.$slots, "showMoreLabel", { isShowingMore: w4.state.isShowingMore }, function() {
      return [u11(l10(w4.state.isShowingMore ? "Show less" : "Show more"), 1)];
    })], 10, g5)) : c10("", true)];
  })], 2)) : c10("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Menu.vue.js
Menu_vue_vue_type_script_lang_default.render = w3;
var Menu_vue_default = Menu_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/MenuSelect.vue_vue&type=script&lang.js
var MenuSelect_vue_vue_type_script_lang_default = { name: "AisMenuSelect", mixins: [t({ name: "MenuSelect" }), n3({ connector: connectMenu_default }, { $$widgetType: "ais.menuSelect" }), r4()], props: { attribute: { type: String, required: true }, limit: { type: Number, default: 10 }, sortBy: { type: [Array, Function], default: void 0 }, transformItems: { type: Function, default: function(t37) {
  return t37;
} } }, computed: { widgetParams: function() {
  return { attribute: this.attribute, limit: this.limit, sortBy: this.sortBy, transformItems: this.transformItems };
} }, methods: { refine: function(t37) {
  this.state.refine(t37);
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/MenuSelect.vue_vue&type=template&id=11a03a77&lang.js
import { openBlock as e16, createElementBlock as t19, normalizeClass as n15, renderSlot as s13, createElementVNode as i14, createTextVNode as a13, Fragment as u12, renderList as l11, toDisplayString as o11, createCommentVNode as r18 } from "vue";
var c11 = ["value", "selected"];
function f9(f15, v7, d8, m14, p7, R) {
  return f15.state ? (e16(), t19("div", { key: 0, class: n15([f15.suit(), !f15.state.canRefine && f15.suit("", "noRefinement")]) }, [s13(f15.$slots, "default", { items: f15.state.items, canRefine: f15.state.canRefine, refine: R.refine, createURL: f15.state.createURL, sendEvent: f15.state.sendEvent }, function() {
    return [i14("select", { class: n15(f15.suit("select")), onChange: v7[0] || (v7[0] = function(e34) {
      return R.refine(e34.currentTarget.value);
    }) }, [i14("option", { class: n15(f15.suit("option")), value: "" }, [s13(f15.$slots, "defaultOption", {}, function() {
      return [a13(" See all ")];
    })], 2), (e16(true), t19(u12, null, l11(f15.state.items, function(i32) {
      return e16(), t19("option", { key: i32.value, class: n15(f15.suit("option")), value: i32.value, selected: i32.isRefined }, [s13(f15.$slots, "item", { item: i32 }, function() {
        return [a13(o11(i32.label) + " (" + o11(i32.count) + ") ", 1)];
      })], 10, c11);
    }), 128))], 34)];
  })], 2)) : r18("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/MenuSelect.vue.js
MenuSelect_vue_vue_type_script_lang_default.render = f9;
var MenuSelect_vue_default = MenuSelect_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/NumericMenu.vue_vue&type=script&lang.js
var NumericMenu_vue_vue_type_script_lang_default = { name: "AisNumericMenu", mixins: [n3({ connector: connectNumericMenu_default }, { $$widgetType: "ais.numericMenu" }), t({ name: "NumericMenu" }), r4()], props: { attribute: { type: String, required: true }, items: { type: Array, required: true }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { attribute: this.attribute, transformItems: this.transformItems, items: this.items };
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/NumericMenu.vue_vue&type=template&id=583b28d4&lang.js
import { openBlock as e17, createElementBlock as t20, normalizeClass as s14, renderSlot as a14, createElementVNode as n16, Fragment as i15, renderList as l12, toDisplayString as u13, createCommentVNode as r19 } from "vue";
var c12 = ["name", "value", "checked"];
function f10(f15, o26, d8, m14, v7, R) {
  return f15.state ? (e17(), t20("div", { key: 0, class: s14([f15.suit(), !f15.state.canRefine && f15.suit("", "noRefinement")]) }, [a14(f15.$slots, "default", { items: f15.state.items, canRefine: f15.state.canRefine, refine: f15.state.refine, createURL: f15.state.createURL, sendEvent: f15.state.sendEvent }, function() {
    return [n16("ul", { class: s14([f15.suit("list")]) }, [(e17(true), t20(i15, null, l12(f15.state.items, function(a30) {
      return e17(), t20("li", { key: a30.label, class: s14([f15.suit("item"), a30.isRefined && f15.suit("item", "selected")]) }, [n16("label", { class: s14(f15.suit("label")) }, [n16("input", { type: "radio", class: s14(f15.suit("radio")), name: d8.attribute, value: a30.value, checked: a30.isRefined, onChange: o26[0] || (o26[0] = function(e34) {
        return f15.state.refine(e34.target.value);
      }) }, null, 42, c12), n16("span", { class: s14(f15.suit("labelText")) }, u13(a30.label), 3)], 2)], 2);
    }), 128))], 2)];
  })], 2)) : r19("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/NumericMenu.vue.js
NumericMenu_vue_vue_type_script_lang_default.render = f10;
var NumericMenu_vue_default = NumericMenu_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Pagination.vue_vue&type=script&lang.js
var Pagination_vue_vue_type_script_lang_default = { name: "AisPagination", mixins: [t({ name: "Pagination" }), n3({ connector: connectPagination_default }, { $$widgetType: "ais.pagination" }), r4()], props: { padding: { type: Number, default: void 0, validator: function(t37) {
  return t37 > 0;
} }, totalPages: { type: Number, default: void 0, validator: function(t37) {
  return t37 > 0;
} }, showFirst: { type: Boolean, default: true }, showLast: { type: Boolean, default: true }, showNext: { type: Boolean, default: true }, showPrevious: { type: Boolean, default: true } }, computed: { widgetParams: function() {
  return { padding: this.padding, totalPages: this.totalPages };
} }, emits: ["page-change"], methods: { refine: function(t37) {
  var e34 = Math.min(Math.max(t37, 0), this.state.nbPages - 1);
  this.state.refine(e34), this.$emit("page-change", e34);
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Pagination.vue_vue&type=template&id=5b708f87&lang.js
import { openBlock as e18, createElementBlock as t21, normalizeClass as a15, renderSlot as s15, createElementVNode as i16, withModifiers as n17, createCommentVNode as r20, Fragment as u14, renderList as l13, toDisplayString as c13 } from "vue";
var f11 = ["href"];
var g6 = ["href"];
var P2 = ["href", "aria-label", "onClick"];
var o12 = ["href"];
var L2 = ["aria-label", "href"];
var m7 = ["aria-label"];
function k4(k5, R, b3, p7, U, v7) {
  var F2;
  return k5.state ? (e18(), t21("div", { key: 0, class: a15((F2 = {}, F2[k5.suit()] = true, F2[k5.suit("", "noRefinement")] = k5.state.nbPages <= 1, F2)) }, [s15(k5.$slots, "default", { refine: v7.refine, createURL: k5.state.createURL, currentRefinement: k5.state.currentRefinement, nbHits: k5.state.nbHits, nbPages: k5.state.nbPages, pages: k5.state.pages, isFirstPage: k5.state.isFirstPage, isLastPage: k5.state.isLastPage }, function() {
    var p8, U2, F3, h13;
    return [i16("ul", { class: a15(k5.suit("list")) }, [b3.showFirst ? (e18(), t21("li", { key: 0, class: a15((p8 = {}, p8[k5.suit("item")] = true, p8[k5.suit("item", "disabled")] = k5.state.isFirstPage, p8[k5.suit("item", "firstPage")] = true, p8)) }, [s15(k5.$slots, "first", { createURL: function() {
      return k5.state.createURL(0);
    }, isFirstPage: k5.state.isFirstPage, refine: function() {
      return v7.refine(0);
    } }, function() {
      return [k5.state.isFirstPage ? (e18(), t21("span", { key: 1, class: a15(k5.suit("link")), "aria-label": "First Page" }, "‹‹", 2)) : (e18(), t21("a", { key: 0, class: a15(k5.suit("link")), "aria-label": "First Page", href: k5.state.createURL(0), onClick: R[0] || (R[0] = n17(function(e34) {
        return v7.refine(0);
      }, ["exact", "left", "prevent"])) }, "‹‹", 10, f11))];
    })], 2)) : r20("", true), b3.showPrevious ? (e18(), t21("li", { key: 1, class: a15((U2 = {}, U2[k5.suit("item")] = true, U2[k5.suit("item", "disabled")] = k5.state.isFirstPage, U2[k5.suit("item", "previousPage")] = true, U2)) }, [s15(k5.$slots, "previous", { createURL: function() {
      return k5.state.createURL(k5.state.currentRefinement - 1);
    }, isFirstPage: k5.state.isFirstPage, refine: function() {
      return v7.refine(k5.state.currentRefinement - 1);
    } }, function() {
      return [k5.state.isFirstPage ? (e18(), t21("span", { key: 1, class: a15(k5.suit("link")), "aria-label": "Previous Page" }, "‹", 2)) : (e18(), t21("a", { key: 0, class: a15(k5.suit("link")), "aria-label": "Previous Page", href: k5.state.createURL(k5.state.currentRefinement - 1), onClick: R[1] || (R[1] = n17(function(e34) {
        return v7.refine(k5.state.currentRefinement - 1);
      }, ["exact", "left", "prevent"])) }, "‹", 10, g6))];
    })], 2)) : r20("", true), (e18(true), t21(u14, null, l13(k5.state.pages, function(r32) {
      var u26;
      return e18(), t21("li", { class: a15((u26 = {}, u26[k5.suit("item")] = true, u26[k5.suit("item", "page")] = true, u26[k5.suit("item", "selected")] = k5.state.currentRefinement === r32, u26)), key: r32 }, [s15(k5.$slots, "item", { page: r32, createURL: function() {
        return k5.state.createURL(r32);
      }, isFirstPage: k5.state.isFirstPage, isLastPage: k5.state.isLastPage, refine: function() {
        return v7.refine(r32);
      } }, function() {
        return [i16("a", { class: a15(k5.suit("link")), href: k5.state.createURL(r32), "aria-label": "Page " + (r32 + 1), onClick: n17(function(e34) {
          return v7.refine(r32);
        }, ["exact", "left", "prevent"]) }, c13(r32 + 1), 11, P2)];
      })], 2);
    }), 128)), b3.showNext ? (e18(), t21("li", { key: 2, class: a15((F3 = {}, F3[k5.suit("item")] = true, F3[k5.suit("item", "disabled")] = k5.state.isLastPage, F3[k5.suit("item", "nextPage")] = true, F3)) }, [s15(k5.$slots, "next", { createURL: function() {
      return k5.state.createURL(k5.state.currentRefinement + 1);
    }, isLastPage: k5.state.isLastPage, refine: function() {
      return v7.refine(k5.state.currentRefinement + 1);
    } }, function() {
      return [k5.state.isLastPage ? (e18(), t21("span", { key: 1, class: a15(k5.suit("link")), "aria-label": "Next Page" }, "›", 2)) : (e18(), t21("a", { key: 0, class: a15(k5.suit("link")), "aria-label": "Next Page", href: k5.state.createURL(k5.state.currentRefinement + 1), onClick: R[2] || (R[2] = n17(function(e34) {
        return v7.refine(k5.state.currentRefinement + 1);
      }, ["exact", "left", "prevent"])) }, "›", 10, o12))];
    })], 2)) : r20("", true), b3.showLast ? (e18(), t21("li", { key: 3, class: a15((h13 = {}, h13[k5.suit("item")] = true, h13[k5.suit("item", "disabled")] = k5.state.isLastPage, h13[k5.suit("item", "lastPage")] = true, h13)) }, [s15(k5.$slots, "last", { createURL: function() {
      return k5.state.createURL(k5.state.nbPages - 1);
    }, isLastPage: k5.state.isLastPage, refine: function() {
      return v7.refine(k5.state.nbPages - 1);
    } }, function() {
      return [k5.state.isLastPage ? (e18(), t21("span", { key: 1, class: a15(k5.suit("link")), "aria-label": "Last Page, Page " + k5.state.nbPages }, " ›› ", 10, m7)) : (e18(), t21("a", { key: 0, class: a15(k5.suit("link")), "aria-label": "Last Page, Page " + k5.state.nbPages, href: k5.state.createURL(k5.state.nbPages - 1), onClick: R[3] || (R[3] = n17(function(e34) {
        return v7.refine(k5.state.nbPages - 1);
      }, ["exact", "left", "prevent"])) }, "››", 10, L2))];
    })], 2)) : r20("", true)], 2)];
  })], 2)) : r20("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Pagination.vue.js
Pagination_vue_vue_type_script_lang_default.render = k4;
var Pagination_vue_default = Pagination_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Panel.vue_vue&type=script&lang.js
var Panel_vue_vue_type_script_lang_default = { name: "AisPanel", mixins: [t({ name: "Panel" }), i3()], methods: { getSlot: function(i32) {
  return this.$slots[i32];
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Panel.vue_vue&type=template&id=7fcc1827&lang.js
import { openBlock as e19, createElementBlock as s16, normalizeClass as t22, renderSlot as n18, createCommentVNode as i17, createElementVNode as o13 } from "vue";
function a16(a30, f15, r32, l27, c23, d8) {
  return e19(), s16("div", { class: t22([a30.suit(), !a30.canRefine && a30.suit("", "noRefinement")]) }, [d8.getSlot("header") ? (e19(), s16("div", { key: 0, class: t22(a30.suit("header")) }, [n18(a30.$slots, "header", { hasRefinements: a30.canRefine })], 2)) : i17("", true), o13("div", { class: t22(a30.suit("body")) }, [n18(a30.$slots, "default", { hasRefinements: a30.canRefine })], 2), d8.getSlot("footer") ? (e19(), s16("div", { key: 1, class: t22(a30.suit("footer")) }, [n18(a30.$slots, "footer", { hasRefinements: a30.canRefine })], 2)) : i17("", true)], 2);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Panel.vue.js
Panel_vue_vue_type_script_lang_default.render = a16;
var Panel_vue_default = Panel_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/PoweredBy.vue_vue&type=script&lang.js
var PoweredBy_vue_vue_type_script_lang_default = { name: "AisPoweredBy", mixins: [t({ name: "PoweredBy" })], props: { theme: { default: "light", validator: function(t37) {
  return -1 !== ["light", "dark"].indexOf(t37);
} } }, computed: { algoliaUrl: function() {
  return "https://www.algolia.com/?utm_source=vue-instantsearch&utm_medium=website&utm_content=" + (location ? location.hostname : "") + "&utm_campaign=poweredby";
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/PoweredBy.vue_vue&type=template&id=1cd6879e&lang.js
import { openBlock as c14, createElementBlock as a17, normalizeClass as h8, createElementVNode as l14 } from "vue";
var v5 = ["href"];
var m8 = ["fill"];
var s17 = ["fill"];
function e20(e34, t37, i32, r32, z3, o26) {
  return c14(), a17("div", { class: h8([e34.suit(), e34.suit("", i32.theme)]) }, [l14("a", { class: h8(e34.suit("link")), href: o26.algoliaUrl, target: "_blank", rel: "noopener", "aria-label": "search by Algolia" }, [(c14(), a17("svg", { style: { height: "1.2em", width: "auto" }, class: h8([e34.suit("logo"), e34.suit("", i32.theme)]), viewBox: "0 0 572 64" }, [l14("path", { fill: "dark" === i32.theme ? "#FFF" : "#36395A", d: "M16 48.3c-3.4 0-6.3-.6-8.7-1.7A12.4 12.4 0 0 1 1.9 42C.6 40 0 38 0 35.4h6.5a6.7 6.7 0 0 0 3.9 6c1.4.7 3.3 1.1 5.6 1.1 2.2 0 4-.3 5.4-1a7 7 0 0 0 3-2.4 6 6 0 0 0 1-3.4c0-1.5-.6-2.8-1.9-3.7-1.3-1-3.3-1.6-5.9-1.8l-4-.4c-3.7-.3-6.6-1.4-8.8-3.4a10 10 0 0 1-3.3-7.9c0-2.4.6-4.6 1.8-6.4a12 12 0 0 1 5-4.3c2.2-1 4.7-1.6 7.5-1.6s5.5.5 7.6 1.6a12 12 0 0 1 5 4.4c1.2 1.8 1.8 4 1.8 6.7h-6.5a6.4 6.4 0 0 0-3.5-5.9c-1-.6-2.6-1-4.4-1s-3.2.3-4.4 1c-1.1.6-2 1.4-2.6 2.4-.5 1-.8 2-.8 3.1a5 5 0 0 0 1.5 3.6c1 1 2.6 1.7 4.7 1.9l4 .3c2.8.2 5.2.8 7.2 1.8 2.1 1 3.7 2.2 4.9 3.8a9.7 9.7 0 0 1 1.7 5.8c0 2.5-.7 4.7-2 6.6a13 13 0 0 1-5.6 4.4c-2.4 1-5.2 1.6-8.4 1.6Zm35.6 0c-2.6 0-4.8-.4-6.7-1.3a13 13 0 0 1-4.7-3.5 17.1 17.1 0 0 1-3.6-10.4v-1c0-2 .3-3.8 1-5.6a13 13 0 0 1 7.3-8.3 15 15 0 0 1 6.3-1.4A13.2 13.2 0 0 1 64 24.3c1 2.2 1.6 4.6 1.6 7.2V34H39.4v-4.3h21.8l-1.8 2.2c0-2-.3-3.7-.9-5.1a7.3 7.3 0 0 0-2.7-3.4c-1.2-.7-2.7-1.1-4.6-1.1s-3.4.4-4.7 1.3a8 8 0 0 0-2.9 3.6c-.6 1.5-.9 3.3-.9 5.4 0 2 .3 3.7 1 5.3a7.9 7.9 0 0 0 2.8 3.7c1.3.8 3 1.3 5 1.3s3.8-.5 5.1-1.3c1.3-1 2.1-2 2.4-3.2h6a11.8 11.8 0 0 1-7 8.7 16 16 0 0 1-6.4 1.2ZM80 48c-2.2 0-4-.3-5.7-1a8.4 8.4 0 0 1-3.7-3.3 9.7 9.7 0 0 1-1.3-5.2c0-2 .5-3.8 1.5-5.2a9 9 0 0 1 4.3-3.1c1.8-.7 4-1 6.7-1H89v4.1h-7.5c-2 0-3.4.5-4.4 1.4-1 1-1.6 2.1-1.6 3.6s.5 2.7 1.6 3.6c1 1 2.5 1.4 4.4 1.4 1.1 0 2.2-.2 3.2-.7 1-.4 1.9-1 2.6-2 .6-1 1-2.4 1-4.2l1.7 2.1c-.2 2-.7 3.8-1.5 5.2a9 9 0 0 1-3.4 3.3 12 12 0 0 1-5.3 1Zm9.5-.7v-8.8h-1v-10c0-1.8-.5-3.2-1.4-4.1-1-1-2.4-1.4-4.2-1.4a142.9 142.9 0 0 0-10.2.4v-5.6a74.8 74.8 0 0 1 8.6-.4c3 0 5.5.4 7.5 1.2s3.4 2 4.4 3.6c1 1.7 1.4 4 1.4 6.7v18.4h-5Zm12.9 0V17.8h5v12.3h-.2c0-4.2 1-7.4 2.8-9.5a11 11 0 0 1 8.3-3.1h1v5.6h-2a9 9 0 0 0-6.3 2.2c-1.5 1.5-2.2 3.6-2.2 6.4v15.6h-6.4Zm34.4 1a15 15 0 0 1-6.6-1.3c-1.9-.9-3.4-2-4.7-3.5a15.5 15.5 0 0 1-2.7-5c-.6-1.7-1-3.6-1-5.4v-1c0-2 .4-3.8 1-5.6a15 15 0 0 1 2.8-4.9c1.3-1.5 2.8-2.6 4.6-3.5a16.4 16.4 0 0 1 13.3.2c2 1 3.5 2.3 4.8 4a12 12 0 0 1 2 6H144c-.2-1.6-1-3-2.2-4.1a7.5 7.5 0 0 0-5.2-1.7 8 8 0 0 0-4.7 1.3 8 8 0 0 0-2.8 3.6 13.8 13.8 0 0 0 0 10.3c.6 1.5 1.5 2.7 2.8 3.6s2.8 1.3 4.8 1.3c1.5 0 2.7-.2 3.8-.8a7 7 0 0 0 2.6-2c.7-1 1-2 1.2-3.2h6.2a11 11 0 0 1-2 6.2 15.1 15.1 0 0 1-11.8 5.5Zm19.7-1v-40h6.4V31h-1.3c0-3 .4-5.5 1.1-7.6a9.7 9.7 0 0 1 3.5-4.8A9.9 9.9 0 0 1 172 17h.3c3.5 0 6 1.1 7.9 3.5 1.7 2.3 2.6 5.7 2.6 10v16.8h-6.4V29.6c0-2.1-.6-3.8-1.8-5a6.4 6.4 0 0 0-4.8-1.8c-2 0-3.7.7-5 2a7.8 7.8 0 0 0-1.9 5.5v17h-6.4Zm63.8 1a12.2 12.2 0 0 1-10.9-6.2 19 19 0 0 1-1.8-7.3h1.4v12.5h-5.1v-40h6.4v19.8l-2 3.5c.2-3.1.8-5.7 1.9-7.7a11 11 0 0 1 4.4-4.5c1.8-1 3.9-1.5 6.1-1.5a13.4 13.4 0 0 1 12.8 9.1c.7 1.9 1 3.8 1 6v1c0 2.2-.3 4.1-1 6a13.6 13.6 0 0 1-13.2 9.4Zm-1.2-5.5a8.4 8.4 0 0 0 7.9-5c.7-1.5 1.1-3.3 1.1-5.3s-.4-3.8-1.1-5.3a8.7 8.7 0 0 0-3.2-3.6 9.6 9.6 0 0 0-9.2-.2 8.5 8.5 0 0 0-3.3 3.2c-.8 1.4-1.3 3-1.3 5v2.3a9 9 0 0 0 1.3 4.8 9 9 0 0 0 3.4 3c1.4.7 2.8 1 4.4 1Zm27.3 3.9-10-28.9h6.5l9.5 28.9h-6Zm-7.5 12.2v-5.7h4.9c1 0 2-.1 2.9-.4a4 4 0 0 0 2-1.4c.4-.7.9-1.6 1.2-2.7l8.6-30.9h6.2l-9.3 32.4a14 14 0 0 1-2.5 5 8.9 8.9 0 0 1-4 2.8c-1.5.6-3.4.9-5.6.9h-4.4Zm9-12.2v-5.2h6.4v5.2H248Z" }, null, 8, m8), l14("path", { fill: "dark" === i32.theme ? "#FFF" : "#003DFF", d: "M534.4 9.1H528a.8.8 0 0 1-.7-.7V1.8c0-.4.2-.7.6-.8l6.5-1c.4 0 .8.2.9.6v7.8c0 .4-.4.7-.8.7zM428 35.2V.8c0-.5-.3-.8-.7-.8h-.2l-6.4 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.5 0 .8-.4.8-.8V43c0-.4-.3-.7-.6-.8-4.5-.5-4.5-6-4.5-7zm106.5-21.8H528c-.4 0-.7.4-.7.8v34c0 .4.3.8.7.8h6.5c.4 0 .8-.4.8-.8v-34c0-.5-.4-.8-.8-.8zm-17.7 21.8V.8c0-.5-.3-.8-.8-.8l-6.5 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.4 0 .8-.4.8-.8V43c0-.4-.3-.7-.7-.8-4.4-.5-4.4-6-4.4-7zm-22.2-20.6a16.5 16.5 0 0 1 8.6 9.3c.8 2.2 1.3 4.8 1.3 7.5a19.4 19.4 0 0 1-4.6 12.6 14.8 14.8 0 0 1-5.2 3.6c-2 .9-5.2 1.4-6.8 1.4a21 21 0 0 1-6.7-1.4 15.4 15.4 0 0 1-8.6-9.3 21.3 21.3 0 0 1 0-14.4 15.2 15.2 0 0 1 8.6-9.3c2-.8 4.3-1.2 6.7-1.2s4.6.4 6.7 1.2zm-6.7 27.6c2.7 0 4.7-1 6.2-3s2.2-4.3 2.2-7.8-.7-6.3-2.2-8.3-3.5-3-6.2-3-4.7 1-6.1 3c-1.5 2-2.2 4.8-2.2 8.3s.7 5.8 2.2 7.8 3.5 3 6.2 3zm-88.8-28.8c-6.2 0-11.7 3.3-14.8 8.2a18.6 18.6 0 0 0 4.8 25.2c1.8 1.2 4 1.8 6.2 1.7s.1 0 .1 0h.9c4.2-.7 8-4 9.1-8.1v7.4c0 .4.3.7.8.7h6.4a.7.7 0 0 0 .7-.7V14.2c0-.5-.3-.8-.7-.8h-13.5zm6.3 26.5a9.8 9.8 0 0 1-5.7 2h-.5a10 10 0 0 1-9.2-14c1.4-3.7 5-6.3 9-6.3h6.4v18.3zm152.3-26.5h13.5c.5 0 .8.3.8.7v33.7c0 .4-.3.7-.8.7h-6.4a.7.7 0 0 1-.8-.7v-7.4c-1.2 4-4.8 7.4-9 8h-.1a4.2 4.2 0 0 1-.5.1h-.9a10.3 10.3 0 0 1-7-2.6c-4-3.3-6.5-8.4-6.5-14.2 0-3.7 1-7.2 3-10 3-5 8.5-8.3 14.7-8.3zm.6 28.4c2.2-.1 4.2-.6 5.7-2V21.7h-6.3a9.8 9.8 0 0 0-9 6.4 10.2 10.2 0 0 0 9.1 13.9h.5zM452.8 13.4c-6.2 0-11.7 3.3-14.8 8.2a18.5 18.5 0 0 0 3.6 24.3 10.4 10.4 0 0 0 13 .6c2.2-1.5 3.8-3.7 4.5-6.1v7.8c0 2.8-.8 5-2.2 6.3-1.5 1.5-4 2.2-7.5 2.2l-6-.3c-.3 0-.7.2-.8.5l-1.6 5.5c-.1.4.1.8.5 1h.1c2.8.4 5.5.6 7 .6 6.3 0 11-1.4 14-4.1 2.7-2.5 4.2-6.3 4.5-11.4V14.2c0-.5-.4-.8-.8-.8h-13.5zm6.3 8.2v18.3a9.6 9.6 0 0 1-5.6 2h-1a10.3 10.3 0 0 1-8.8-14c1.4-3.7 5-6.3 9-6.3h6.4zM291 31.5A32 32 0 0 1 322.8 0h30.8c.6 0 1.2.5 1.2 1.2v61.5c0 1.1-1.3 1.7-2.2 1l-19.2-17a18 18 0 0 1-11 3.4 18.1 18.1 0 1 1 18.2-14.8c-.1.4-.5.7-.9.6-.1 0-.3 0-.4-.2l-3.8-3.4c-.4-.3-.6-.8-.7-1.4a12 12 0 1 0-2.4 8.3c.4-.4 1-.5 1.6-.2l14.7 13.1v-46H323a26 26 0 1 0 10 49.7c.8-.4 1.6-.2 2.3.3l3 2.7c.3.2.3.7 0 1l-.2.2a32 32 0 0 1-47.2-28.6z" }, null, 8, s17)], 2))], 10, v5)], 2);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/PoweredBy.vue.js
PoweredBy_vue_vue_type_script_lang_default.render = e20;
var PoweredBy_vue_default = PoweredBy_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/QueryRuleContext.js
var QueryRuleContext_default = { name: "AisQueryRuleContext", mixins: [t({ name: "QueryRuleContext" }), n3({ connector: connectQueryRules_default }, { $$widgetType: "ais.queryRuleContext" })], props: { trackedFilters: { type: Object, required: true }, transformRuleContexts: { type: Function, required: false, default: void 0 } }, computed: { widgetParams: function() {
  return { trackedFilters: this.trackedFilters, transformRuleContexts: this.transformRuleContexts };
} }, render: function() {
  return null;
} };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/QueryRuleCustomData.vue_vue&type=script&lang.js
var QueryRuleCustomData_vue_vue_type_script_lang_default = { name: "AisQueryRuleCustomData", mixins: [t({ name: "QueryRuleCustomData" }), n3({ connector: connectQueryRules_default }, { $$widgetType: "ais.queryRuleCustomData" })], props: { transformItems: { type: Function, required: false, default: void 0 } }, computed: { widgetParams: function() {
  return { transformItems: this.transformItems };
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/QueryRuleCustomData.vue_vue&type=template&id=1e550962&lang.js
import { openBlock as t23, createElementBlock as e21, normalizeClass as n19, renderSlot as i18, Fragment as s18, renderList as u15, createElementVNode as r21, toDisplayString as o14, createCommentVNode as l15 } from "vue";
function m9(m14, f15, a30, c23, d8, p7) {
  return m14.state ? (t23(), e21("div", { key: 0, class: n19(m14.suit()) }, [i18(m14.$slots, "default", { items: m14.state.items }, function() {
    return [(t23(true), e21(s18, null, u15(m14.state.items, function(n32, s30) {
      return t23(), e21("div", { key: s30 }, [i18(m14.$slots, "item", { item: n32 }, function() {
        return [r21("pre", null, o14(n32), 1)];
      })]);
    }), 128))];
  })], 2)) : l15("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/QueryRuleCustomData.vue.js
QueryRuleCustomData_vue_vue_type_script_lang_default.render = m9;
var QueryRuleCustomData_vue_default = QueryRuleCustomData_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/RangeInput.vue_vue&type=script&lang.js
var RangeInput_vue_vue_type_script_lang_default = { name: "AisRangeInput", mixins: [t({ name: "RangeInput" }), n3({ connector: connectRange_default }, { $$widgetType: "ais.rangeInput" }), r4()], props: { attribute: { type: String, required: true }, min: { type: Number, required: false, default: void 0 }, max: { type: Number, required: false, default: void 0 }, precision: { type: Number, required: false, default: 0 } }, data: function() {
  return { minInput: void 0, maxInput: void 0 };
}, updated: function() {
  this.minInput = void 0, this.maxInput = void 0;
}, computed: { widgetParams: function() {
  return { attribute: this.attribute, min: this.min, max: this.max, precision: this.precision };
}, step: function() {
  return 1 / Math.pow(10, this.precision);
}, values: function() {
  var t37 = this.state.start, i32 = t37[0], e34 = t37[1], n32 = this.state.range, r32 = n32.min, s30 = n32.max;
  return { min: i32 !== -1 / 0 && i32 !== r32 ? i32 : void 0, max: e34 !== 1 / 0 && e34 !== s30 ? e34 : void 0 };
} }, methods: { pick: function(t37, i32) {
  return null != t37 ? t37 : i32;
}, refine: function(t37) {
  var i32 = t37.min, e34 = t37.max;
  this.state.refine([i32, e34]);
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/RangeInput.vue_vue&type=template&id=3e30e816&lang.js
import { openBlock as e22, createElementBlock as t24, normalizeClass as n20, renderSlot as a18, createElementVNode as s19, withModifiers as u16, createTextVNode as i19, createCommentVNode as r22 } from "vue";
var l16 = ["step", "min", "max", "placeholder", "value"];
var m10 = ["step", "min", "max", "placeholder", "value"];
function p2(p7, o26, c23, f15, v7, x3) {
  return p7.state ? (e22(), t24("div", { key: 0, class: n20([p7.suit(), !p7.state.canRefine && p7.suit("", "noRefinement")]) }, [a18(p7.$slots, "default", { currentRefinement: x3.values, refine: x3.refine, canRefine: p7.state.canRefine, range: p7.state.range, sendEvent: p7.state.sendEvent }, function() {
    return [s19("form", { class: n20(p7.suit("form")), onSubmit: o26[2] || (o26[2] = u16(function(e34) {
      return x3.refine({ min: x3.pick(v7.minInput, x3.values.min), max: x3.pick(v7.maxInput, x3.values.max) });
    }, ["prevent"])) }, [s19("label", { class: n20(p7.suit("label")) }, [a18(p7.$slots, "minLabel"), s19("input", { type: "number", class: n20([p7.suit("input"), p7.suit("input", "min")]), step: x3.step, min: p7.state.range.min, max: p7.state.range.max, placeholder: p7.state.range.min, value: x3.values.min, onChange: o26[0] || (o26[0] = function(e34) {
      return v7.minInput = e34.currentTarget.value;
    }) }, null, 42, l16)], 2), s19("span", { class: n20(p7.suit("separator")) }, [a18(p7.$slots, "separator", {}, function() {
      return [i19("to")];
    })], 2), s19("label", { class: n20(p7.suit("label")) }, [a18(p7.$slots, "maxLabel"), s19("input", { class: n20([p7.suit("input"), p7.suit("input", "max")]), type: "number", step: x3.step, min: p7.state.range.min, max: p7.state.range.max, placeholder: p7.state.range.max, value: x3.values.max, onChange: o26[1] || (o26[1] = function(e34) {
      return v7.maxInput = e34.currentTarget.value;
    }) }, null, 42, m10)], 2), s19("button", { class: n20(p7.suit("submit")), type: "submit" }, [a18(p7.$slots, "submitLabel", {}, function() {
      return [i19(" Go ")];
    })], 2)], 34)];
  })], 2)) : r22("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/RangeInput.vue.js
RangeInput_vue_vue_type_script_lang_default.render = p2;
var RangeInput_vue_default = RangeInput_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/RatingMenu.vue_vue&type=script&lang.js
var RatingMenu_vue_vue_type_script_lang_default = { name: "AisRatingMenu", mixins: [t({ name: "RatingMenu" }), n3({ connector: connectRatingMenu_default }, { $$widgetType: "ais.ratingMenu" }), r4()], props: { attribute: { type: String, required: true }, max: { type: Number, default: void 0 } }, computed: { widgetParams: function() {
  return { attribute: this.attribute, max: this.max };
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/RatingMenu.vue_vue&type=template&id=c025dd38&lang.js
import { openBlock as t25, createElementBlock as e23, normalizeClass as s20, renderSlot as a19, createElementVNode as i20, Fragment as n21, renderList as l17, withModifiers as u17, createTextVNode as r23, toDisplayString as c15, createCommentVNode as o15 } from "vue";
var d4 = { style: { display: "none" } };
var h9 = [i20("symbol", { id: "ais-RatingMenu-starSymbol", viewBox: "0 0 24 24" }, [i20("path", { d: "M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" })], -1), i20("symbol", { id: "ais-RatingMenu-starEmptySymbol", viewBox: "0 0 24 24" }, [i20("path", { d: "M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z" })], -1)];
var f12 = ["href", "aria-label", "onClick"];
var m11 = [i20("use", { "xlink:href": "#ais-RatingMenu-starSymbol" }, null, -1)];
var y4 = [i20("use", { "xlink:href": "#ais-RatingMenu-starEmptySymbol" }, null, -1)];
function p3(p7, v7, R, b3, g9, k5) {
  return p7.state ? (t25(), e23("div", { key: 0, class: s20(p7.suit()) }, [a19(p7.$slots, "default", { items: p7.state.items, refine: p7.state.refine, createURL: p7.state.createURL, sendEvent: p7.state.sendEvent, canRefine: p7.state.canRefine }, function() {
    return [(t25(), e23("svg", d4, h9)), i20("ul", { class: s20(p7.suit("list")) }, [(t25(true), e23(n21, null, l17(p7.state.items, function(o26, d8) {
      return t25(), e23("li", { key: d8, class: s20([p7.suit("item"), o26.isRefined && p7.suit("item", "selected")]) }, [i20("div", null, [i20("a", { href: p7.state.createURL(o26.value), "aria-label": o26.value + " & up", class: s20(p7.suit("link")), onClick: u17(function(t37) {
        return p7.state.refine(o26.value);
      }, ["prevent"]) }, [(t25(true), e23(n21, null, l17(o26.stars, function(a30, i32) {
        return t25(), e23(n21, null, [a30 ? (t25(), e23("svg", { "aria-hidden": "true", width: "24", height: "24", class: s20([p7.suit("starIcon"), p7.suit("starIcon--full")]), key: i32 + "-full" }, m11, 2)) : (t25(), e23("svg", { class: s20([p7.suit("starIcon"), p7.suit("starIcon--empty")]), "aria-hidden": "true", width: "24", height: "24", key: i32 + "-empty" }, y4, 2))], 64);
      }), 256)), i20("span", { class: s20(p7.suit("label")), "aria-hidden": "true" }, [a19(p7.$slots, "andUp", {}, function() {
        return [r23("& Up")];
      })], 2), i20("span", { class: s20(p7.suit("count")) }, c15(o26.count), 3)], 10, f12)])], 2);
    }), 128))], 2)];
  })], 2)) : o15("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/RatingMenu.vue.js
RatingMenu_vue_vue_type_script_lang_default.render = p3;
var RatingMenu_vue_default = RatingMenu_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/SearchInput.vue_vue&type=script&lang.js
var SearchInput_vue_vue_type_script_lang_default = { name: "SearchInput", mixins: [t({ name: "SearchBox" })], props: { placeholder: { type: String, default: "Search here…" }, autofocus: { type: Boolean, default: false }, showLoadingIndicator: { type: Boolean, default: false }, shouldShowLoadingIndicator: { type: Boolean, default: false }, ignoreCompositionEvents: { type: Boolean, default: false }, submitTitle: { type: String, default: "Search" }, resetTitle: { type: String, default: "Clear" }, value: { type: String, required: false, default: void 0 }, modelValue: { type: String, required: false, default: void 0 } }, emits: ["input", "update:modelValue", "blur", "focus", "reset"], data: function() {
  return { query: "" };
}, methods: { isFocused: function() {
  return document.activeElement === this.$refs.input;
}, onInput: function(e34) {
  this.ignoreCompositionEvents && e34.isComposing || (this.$emit("input", e34.target.value), this.$emit("update:modelValue", e34.target.value));
}, onFormSubmit: function() {
  this.$refs.input.blur();
}, onFormReset: function() {
  this.$emit("input", ""), this.$emit("update:modelValue", ""), this.$emit("reset");
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/SearchInput.vue_vue&type=template&id=79e30e4e&lang.js
import { openBlock as t26, createElementBlock as o16, normalizeClass as e24, withModifiers as n22, createElementVNode as i21, renderSlot as a20, createCommentVNode as r24, createStaticVNode as l18 } from "vue";
var u18 = ["placeholder", "autofocus", "value"];
var s21 = ["title", "hidden"];
var c16 = [i21("path", { d: "M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z" }, null, -1)];
var d5 = ["title", "hidden"];
var h10 = [i21("path", { d: "M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z" }, null, -1)];
var f13 = ["hidden"];
var m12 = ["aria-hidden"];
var p4 = [l18('<g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform></path></g></g>', 1)];
function g7(l27, g9, v7, b3, w4, I2) {
  return t26(), o16("form", { action: "", role: "search", novalidate: "", class: e24(l27.suit("form")), onSubmit: g9[4] || (g9[4] = n22(function() {
    for (var t37 = [], o26 = arguments.length; o26--; )
      t37[o26] = arguments[o26];
    return I2.onFormSubmit && I2.onFormSubmit.apply(I2, t37);
  }, ["prevent"])), onReset: g9[5] || (g9[5] = n22(function() {
    for (var t37 = [], o26 = arguments.length; o26--; )
      t37[o26] = arguments[o26];
    return I2.onFormReset && I2.onFormReset.apply(I2, t37);
  }, ["prevent"])) }, [i21("input", { type: "search", autocorrect: "off", autocapitalize: "off", autocomplete: "off", spellcheck: "false", maxlength: "512", "aria-label": "Search", placeholder: v7.placeholder, autofocus: v7.autofocus, class: e24(l27.suit("input")), value: v7.value || v7.modelValue, onFocus: g9[0] || (g9[0] = function(t37) {
    return l27.$emit("focus", t37);
  }), onBlur: g9[1] || (g9[1] = function(t37) {
    return l27.$emit("blur", t37);
  }), onInput: g9[2] || (g9[2] = function(t37) {
    return I2.onInput(t37);
  }), onCompositionend: g9[3] || (g9[3] = function(t37) {
    return I2.onInput(t37);
  }), ref: "input" }, null, 42, u18), i21("button", { type: "submit", title: v7.submitTitle, class: e24(l27.suit("submit")), hidden: v7.showLoadingIndicator && v7.shouldShowLoadingIndicator }, [a20(l27.$slots, "submit-icon", {}, function() {
    return [(t26(), o16("svg", { "aria-hidden": "true", width: "10", height: "10", viewBox: "0 0 40 40", class: e24(l27.suit("submitIcon")) }, c16, 2))];
  })], 10, s21), i21("button", { type: "reset", title: v7.resetTitle, class: e24(l27.suit("reset")), hidden: !v7.value && !v7.modelValue || v7.showLoadingIndicator && v7.shouldShowLoadingIndicator }, [a20(l27.$slots, "reset-icon", {}, function() {
    return [(t26(), o16("svg", { "aria-hidden": "true", height: "10", viewBox: "0 0 20 20", class: e24(l27.suit("resetIcon")), width: "10" }, h10, 2))];
  })], 10, d5), v7.showLoadingIndicator ? (t26(), o16("span", { key: 0, hidden: !v7.shouldShowLoadingIndicator, class: e24(l27.suit("loadingIndicator")) }, [a20(l27.$slots, "loading-indicator", {}, function() {
    return [(t26(), o16("svg", { "aria-hidden": !v7.shouldShowLoadingIndicator, "aria-label": "Results are loading", width: "16", height: "16", stroke: "#444", viewBox: "0 0 38 38", class: e24(l27.suit("loadingIcon")) }, p4, 10, m12))];
  })], 10, f13)) : r24("", true)], 34);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/SearchInput.vue.js
SearchInput_vue_vue_type_script_lang_default.render = g7;
var SearchInput_vue_default = SearchInput_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/RefinementList.vue_vue&type=script&lang.js
var a21 = function() {
};
var RefinementList_vue_vue_type_script_lang_default = { name: "AisRefinementList", components: { SearchInput: SearchInput_vue_default, AisHighlight: Highlight_vue_default }, mixins: [t({ name: "RefinementList" }), n3({ connector: connectRefinementList_default }, { $$widgetType: "ais.refinementList" }), r4()], props: { attribute: { type: String, required: true }, searchable: { type: Boolean, default: void 0 }, searchablePlaceholder: { type: String, required: false, default: "Search here…" }, operator: { default: "or", validator: function(e34) {
  return "and" === e34 || "or" === e34;
}, required: false }, limit: { type: Number, required: false, default: void 0 }, showMoreLimit: { type: Number, required: false, default: void 0 }, showMore: { type: Boolean, required: false, default: false }, sortBy: { type: [Array, Function], required: false, default: void 0 }, transformItems: { type: Function, required: false, default: void 0 } }, data: function() {
  return { searchForFacetValuesQuery: "" };
}, computed: { searchForFacetValues: { get: function() {
  return this.searchForFacetValuesQuery;
}, set: function(e34) {
  this.state.searchForItems(e34), this.searchForFacetValuesQuery = e34;
} }, toggleShowMore: function() {
  return this.state.toggleShowMore || a21;
}, items: function() {
  return this.state.items.map(function(e34) {
    return Object.assign({}, e34, { _highlightResult: { item: { value: e34.highlighted } } });
  });
}, widgetParams: function() {
  return { attribute: this.attribute, operator: this.operator, limit: this.limit, showMore: this.showMore, showMoreLimit: this.showMoreLimit, sortBy: this.sortBy, escapeFacetValues: true, transformItems: this.transformItems };
} }, methods: { refine: function(e34) {
  this.state.refine(e34), this.searchForFacetValuesQuery = "";
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/RefinementList.vue_vue&type=template&id=e39e9d16&lang.js
import { resolveComponent as e25, openBlock as s22, createElementBlock as t27, normalizeClass as a22, renderSlot as o17, createVNode as l19, createCommentVNode as r25, createElementVNode as n23, Fragment as i22, renderList as c17, toDisplayString as u19, createTextVNode as h11 } from "vue";
var g8 = ["value", "checked", "onChange"];
var m13 = ["disabled"];
function d6(d8, f15, w4, M2, S2, b3) {
  var v7 = e25("search-input"), F2 = e25("ais-highlight");
  return d8.state ? (s22(), t27("div", { key: 0, class: a22([d8.suit(), 0 === b3.items.length && d8.suit("", "noRefinement")]) }, [o17(d8.$slots, "default", { items: b3.items, refine: b3.refine, searchForItems: d8.state.searchForItems, searchForItemsQuery: S2.searchForFacetValuesQuery, toggleShowMore: b3.toggleShowMore, canToggleShowMore: d8.state.canToggleShowMore, isShowingMore: d8.state.isShowingMore, createURL: d8.state.createURL, isFromSearch: d8.state.isFromSearch, canRefine: d8.state.canRefine, sendEvent: d8.state.sendEvent }, function() {
    var e34;
    return [w4.searchable ? (s22(), t27("div", { key: 0, class: a22(d8.suit("searchBox")) }, [l19(v7, { modelValue: b3.searchForFacetValues, "onUpdate:modelValue": f15[0] || (f15[0] = function(e35) {
      return b3.searchForFacetValues = e35;
    }), "show-loading-indicator": true, placeholder: w4.searchablePlaceholder, "class-names": d8.classNames }, null, 8, ["modelValue", "placeholder", "class-names"])], 2)) : r25("", true), d8.state.isFromSearch && 0 === b3.items.length ? o17(d8.$slots, "noResults", { key: 1, query: b3.searchForFacetValues }, function() {
      return [n23("div", { class: a22(d8.suit("noResults")) }, "No results.", 2)];
    }) : r25("", true), b3.items.length > 0 ? (s22(), t27("ul", { key: 2, class: a22(d8.suit("list")) }, [(s22(true), t27(i22, null, c17(b3.items, function(e35) {
      return s22(), t27("li", { class: a22([d8.suit("item"), e35.isRefined && d8.suit("item", "selected")]), key: e35.value }, [o17(d8.$slots, "item", { item: e35, refine: b3.refine, createURL: d8.state.createURL }, function() {
        return [n23("label", { class: a22(d8.suit("label")) }, [n23("input", { class: a22(d8.suit("checkbox")), type: "checkbox", value: e35.value, checked: e35.isRefined, onChange: function(s30) {
          return b3.refine(e35.value);
        } }, null, 42, g8), w4.searchable ? (s22(), t27("span", { key: 0, class: a22(d8.suit("labelText")) }, [l19(F2, { attribute: "item", hit: e35 }, null, 8, ["hit"])], 2)) : (s22(), t27("span", { key: 1, class: a22(d8.suit("labelText")) }, u19(e35.label), 3)), n23("span", { class: a22(d8.suit("count")) }, u19(e35.count), 3)], 2)];
      })], 2);
    }), 128))], 2)) : r25("", true), w4.showMore ? (s22(), t27("button", { key: 3, class: a22([d8.suit("showMore"), (e34 = {}, e34[d8.suit("showMore", "disabled")] = !d8.state.canToggleShowMore, e34)]), onClick: f15[1] || (f15[1] = function() {
      for (var e35 = [], s30 = arguments.length; s30--; )
        e35[s30] = arguments[s30];
      return b3.toggleShowMore && b3.toggleShowMore.apply(b3, e35);
    }), disabled: !d8.state.canToggleShowMore }, [o17(d8.$slots, "showMoreLabel", { isShowingMore: d8.state.isShowingMore }, function() {
      return [h11(" Show " + u19(d8.state.isShowingMore ? "less" : "more"), 1)];
    })], 10, m13)) : r25("", true)];
  })], 2)) : r25("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/RefinementList.vue.js
RefinementList_vue_vue_type_script_lang_default.render = d6;
var RefinementList_vue_default = RefinementList_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/StateResults.vue_vue&type=script&lang.js
var n24;
var StateResults_vue_vue_type_script_lang_default = ((n24 = { name: "AisStateResults", mixins: [n3({ connector: true }), t({ name: "StateResults" })], props: { catchError: { type: Boolean, default: false } }, data: function() {
  var t37 = this;
  return { renderFn: function() {
    var e34 = t37.instantSearchInstance, r32 = e34.status, n32 = e34.error, s30 = t37.getParentIndex().getResults(), i32 = t37.getParentIndex().getHelper(), a30 = i32 ? i32.state : null;
    t37.state = { results: s30, state: a30, status: r32, error: n32 };
  } };
}, created: function() {
  this.instantSearchInstance.addListener("render", this.renderFn), this.renderFn();
} }).beforeUnmount = function() {
  this.widget && (this.instantSearchInstance.removeListener("render", this.renderFn), this.errorFn && this.instantSearchInstance.removeListener("error", this.errorFn));
}, n24.watch = { catchError: { immediate: true, handler: function(t37) {
  t37 ? (this.errorFn = function() {
  }, this.instantSearchInstance.addListener("error", this.errorFn)) : this.errorFn && (this.instantSearchInstance.removeListener("error", this.errorFn), this.errorFn = void 0);
} } }, n24.computed = { stateResults: function() {
  var t37 = this.state, r32 = t37.results, n32 = t37.state, s30 = t37.status, i32 = t37.error;
  return e({}, r32, { results: r32, state: n32, status: s30, error: i32 });
} }, n24);

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/StateResults.vue_vue&type=template&id=f5047700&lang.js
import { openBlock as t28, createElementBlock as e26, normalizeClass as s23, renderSlot as a23, normalizeProps as l20, guardReactiveProps as r26, createElementVNode as n25, toDisplayString as u20, createCommentVNode as o18 } from "vue";
var i23 = n25("p", null, " Use this component to have a different layout based on a certain state. ", -1);
var c18 = n25("p", null, "Fill in the slot, and get access to the following things:", -1);
function p5(p7, f15, d8, h13, v7, y6) {
  return p7.state && p7.state.state && p7.state.results ? (t28(), e26("div", { key: 0, class: s23(p7.suit()) }, [a23(p7.$slots, "default", l20(r26(y6.stateResults)), function() {
    return [i23, c18, n25("pre", null, "results: " + u20(Object.keys(p7.state.results)), 1), n25("pre", null, "state: " + u20(Object.keys(p7.state.state)), 1), n25("pre", null, "status: " + u20(p7.state.status), 1), n25("pre", null, "error: " + u20(p7.state.error), 1)];
  })], 2)) : o18("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/StateResults.vue.js
StateResults_vue_vue_type_script_lang_default.render = p5;
var StateResults_vue_default = StateResults_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/SearchBox.vue_vue&type=script&lang.js
var SearchBox_vue_vue_type_script_lang_default = { name: "AisSearchBox", mixins: [n3({ connector: connectSearchBox_default }, { $$widgetType: "ais.searchBox" }), t({ name: "SearchBox" })], components: { SearchInput: SearchInput_vue_default }, props: { placeholder: { type: String, default: "" }, autofocus: { type: Boolean, default: false }, showLoadingIndicator: { type: Boolean, default: true }, ignoreCompositionEvents: { type: Boolean, default: false }, submitTitle: { type: String, default: "Submit the search query" }, resetTitle: { type: String, default: "Clear the search query" }, value: { type: String, default: void 0 }, modelValue: { type: String, default: void 0 }, queryHook: { type: Function, default: void 0 } }, data: function() {
  return { localValue: "", isVue2: o, isVue3: r };
}, computed: { widgetParams: function() {
  return { queryHook: this.queryHook };
}, isControlled: function() {
  return void 0 !== this.value || void 0 !== this.modelValue;
}, model: function() {
  return this.value || this.modelValue;
}, currentRefinement: { get: function() {
  this.isControlled && this.model !== this.localValue && (this.localValue = this.model, this.$emit("input", this.model), this.$emit("update:modelValue", this.model), this.state.refine(this.model));
  var e34 = this.$refs.searchInput;
  return e34 && e34.isFocused() ? this.localValue : this.model || this.state.query || "";
}, set: function(e34) {
  this.localValue = e34, this.state.refine(e34), this.isControlled && (this.$emit("input", e34), this.$emit("update:modelValue", e34));
} } } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/SearchBox.vue_vue&type=template&id=b43316e4&lang.js
import { resolveComponent as e27, openBlock as t29, createElementBlock as n26, normalizeClass as i24, renderSlot as o19, createVNode as s24, createSlots as r27, withCtx as u21, createCommentVNode as a24 } from "vue";
function l21(l27, c23, d8, m14, f15, h13) {
  var g9 = e27("search-input");
  return l27.state ? (t29(), n26("div", { key: 0, class: i24(l27.suit()) }, [o19(l27.$slots, "default", { currentRefinement: h13.currentRefinement, isSearchStalled: l27.state.isSearchStalled, refine: l27.state.refine }, function() {
    return [s24(g9, { onFocus: c23[0] || (c23[0] = function(e34) {
      return l27.$emit("focus", e34);
    }), onBlur: c23[1] || (c23[1] = function(e34) {
      return l27.$emit("blur", e34);
    }), onReset: c23[2] || (c23[2] = function(e34) {
      return l27.$emit("reset");
    }), placeholder: d8.placeholder, autofocus: d8.autofocus, "show-loading-indicator": d8.showLoadingIndicator, "should-show-loading-indicator": l27.state.isSearchStalled, "ignore-composition-events": d8.ignoreCompositionEvents, "submit-title": d8.submitTitle, "reset-title": d8.resetTitle, "class-names": l27.classNames, modelValue: h13.currentRefinement, "onUpdate:modelValue": c23[3] || (c23[3] = function(e34) {
      return h13.currentRefinement = e34;
    }), ref: "searchInput" }, r27({ default: u21(function() {
      return [f15.isVue2 ? o19(l27.$slots, "loading-indicator", { key: 0, slot: "loading-indicator" }) : a24("", true), f15.isVue2 ? o19(l27.$slots, "submit-icon", { key: 1, slot: "submit-icon" }) : a24("", true), f15.isVue2 ? o19(l27.$slots, "reset-icon", { key: 2, slot: "reset-icon" }) : a24("", true)];
    }), _: 2 }, [f15.isVue3 ? { name: "loading-indicator", fn: u21(function() {
      return [o19(l27.$slots, "loading-indicator")];
    }), key: "0" } : void 0, f15.isVue3 ? { name: "submit-icon", fn: u21(function() {
      return [o19(l27.$slots, "submit-icon")];
    }), key: "1" } : void 0, f15.isVue3 ? { name: "reset-icon", fn: u21(function() {
      return [o19(l27.$slots, "reset-icon")];
    }), key: "2" } : void 0]), 1032, ["placeholder", "autofocus", "show-loading-indicator", "should-show-loading-indicator", "ignore-composition-events", "submit-title", "reset-title", "class-names", "modelValue"])];
  })], 2)) : a24("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/SearchBox.vue.js
SearchBox_vue_vue_type_script_lang_default.render = l21;
var SearchBox_vue_default = SearchBox_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Snippet.vue_vue&type=script&lang.js
var Snippet_vue_vue_type_script_lang_default = { name: "AisSnippet", mixins: [t({ name: "Snippet" })], components: { AisHighlighter: Highlighter_default }, props: { hit: { type: Object, required: true }, attribute: { type: String, required: true }, highlightedTagName: { type: String, default: "mark" } } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Snippet.vue_vue&type=template&id=edc35952&lang.js
import { resolveComponent as t30, openBlock as i25, createBlock as h12 } from "vue";
function e28(e34, a30, g9, r32, u26, l27) {
  var p7 = t30("ais-highlighter");
  return i25(), h12(p7, { hit: g9.hit, attribute: g9.attribute, "highlighted-tag-name": g9.highlightedTagName, suit: e34.suit, "highlight-property": "_snippetResult", "pre-tag": "<mark>", "post-tag": "</mark>" }, null, 8, ["hit", "attribute", "highlighted-tag-name", "suit"]);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Snippet.vue.js
Snippet_vue_vue_type_script_lang_default.render = e28;
var Snippet_vue_default = Snippet_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/SortBy.vue_vue&type=script&lang.js
var SortBy_vue_vue_type_script_lang_default = { name: "AisSortBy", mixins: [t({ name: "SortBy" }), n3({ connector: connectSortBy_default }, { $$widgetType: "ais.sortBy" }), r4()], props: { items: { type: Array, required: true }, transformItems: { type: Function, default: void 0 } }, computed: { widgetParams: function() {
  return { items: this.items, transformItems: this.transformItems };
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/SortBy.vue_vue&type=template&id=78751313&lang.js
import { openBlock as e29, createElementBlock as t31, normalizeClass as n27, renderSlot as s25, createElementVNode as a25, Fragment as r28, renderList as u22, toDisplayString as l22, createCommentVNode as i26 } from "vue";
var o20 = ["value", "selected"];
function c19(c23, f15, v7, R, m14, p7) {
  return c23.state ? (e29(), t31("div", { key: 0, class: n27(c23.suit()) }, [s25(c23.$slots, "default", { items: c23.state.options, hasNoResults: c23.state.hasNoResults, refine: c23.state.refine, currentRefinement: c23.state.currentRefinement, canRefine: c23.state.canRefine }, function() {
    return [a25("select", { class: n27(c23.suit("select")), onChange: f15[0] || (f15[0] = function(e34) {
      return c23.state.refine(e34.currentTarget.value);
    }), "aria-label": "Sort results by" }, [(e29(true), t31(r28, null, u22(c23.state.options, function(s30) {
      return e29(), t31("option", { key: s30.value, class: n27(c23.suit("option")), value: s30.value, selected: s30.value === c23.state.currentRefinement }, l22(s30.label), 11, o20);
    }), 128))], 34)];
  })], 2)) : i26("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/SortBy.vue.js
SortBy_vue_vue_type_script_lang_default.render = c19;
var SortBy_vue_default = SortBy_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Stats.vue_vue&type=script&lang.js
var Stats_vue_vue_type_script_lang_default = { name: "AisStats", mixins: [n3({ connector: connectStats_default }, { $$widgetType: "ais.stats" }), t({ name: "Stats" })], computed: { sortedResultsSentence: function() {
  var t37 = this.state, e34 = t37.nbHits, s30 = t37.nbSortedHits, r32 = "sorted out of " + e34.toLocaleString();
  return 0 === s30 ? "No relevant results " + r32 : 1 === s30 ? "1 relevant result " + r32 : s30 > 1 ? (s30 || 0).toLocaleString() + " relevant results " + r32 : "";
}, resultsSentence: function() {
  var t37 = this.state.nbHits;
  return 0 === t37 ? "No results" : 1 === t37 ? "1 result" : t37 > 1 ? t37.toLocaleString() + " results" : "";
}, widgetParams: function() {
  return {};
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Stats.vue_vue&type=template&id=67854642&lang.js
import { openBlock as t32, createElementBlock as e30, normalizeClass as s26, renderSlot as n28, mergeProps as r29, createElementVNode as a26, Fragment as u23, createTextVNode as i27, toDisplayString as o21, createCommentVNode as l23 } from "vue";
function c20(c23, S2, d8, f15, p7, m14) {
  return c23.state ? (t32(), e30("div", { key: 0, class: s26(c23.suit()) }, [n28(c23.$slots, "default", r29(c23.state, { results: c23.state.instantSearchInstance.helper.lastResults }), function() {
    return [a26("span", { class: s26(c23.suit("text")) }, [c23.state.areHitsSorted ? (t32(), e30(u23, { key: 0 }, [i27(o21(m14.sortedResultsSentence), 1)], 64)) : (t32(), e30(u23, { key: 1 }, [i27(o21(m14.resultsSentence), 1)], 64)), i27(" found in " + o21(c23.state.processingTimeMS.toLocaleString()) + "ms", 1)], 2)];
  })], 2)) : l23("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/Stats.vue.js
Stats_vue_vue_type_script_lang_default.render = c20;
var Stats_vue_default = Stats_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/ToggleRefinement.vue_vue&type=script&lang.js
var ToggleRefinement_vue_vue_type_script_lang_default = { name: "AisToggleRefinement", mixins: [t({ name: "ToggleRefinement" }), n3({ connector: connectToggleRefinement_default }, { $$widgetType: "ais.toggleRefinement" }), r4()], props: { attribute: { type: String, required: true }, on: { type: [String, Number, Boolean, Array], required: false, default: true }, off: { type: [String, Number, Boolean, Array], required: false, default: void 0 }, label: { type: String, default: void 0 } }, computed: { widgetParams: function() {
  return { attribute: this.attribute, on: this.on, off: this.off };
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/ToggleRefinement.vue_vue&type=template&id=fc27238e&lang.js
import { openBlock as e31, createElementBlock as t33, normalizeClass as a27, renderSlot as n29, createElementVNode as s27, toDisplayString as l24, createCommentVNode as u24 } from "vue";
var c21 = ["name", "value", "checked"];
function i28(i32, o26, r32, v7, f15, d8) {
  return i32.state ? (e31(), t33("div", { key: 0, class: a27([i32.suit(), !i32.state.canRefine && i32.suit("", "noRefinement")]) }, [n29(i32.$slots, "default", { value: i32.state.value, canRefine: i32.state.canRefine, refine: i32.state.refine, createURL: i32.state.createURL, sendEvent: i32.state.sendEvent }, function() {
    return [s27("label", { class: a27(i32.suit("label")) }, [s27("input", { class: a27(i32.suit("checkbox")), type: "checkbox", name: i32.state.value.name, value: r32.on, checked: i32.state.value.isRefined, onChange: o26[0] || (o26[0] = function(e34) {
      return i32.state.refine(i32.state.value);
    }) }, null, 42, c21), s27("span", { class: a27(i32.suit("labelText")) }, l24(r32.label || i32.state.value.name), 3), null !== i32.state.value.count ? (e31(), t33("span", { key: 0, class: a27(i32.suit("count")) }, l24(i32.state.value.count.toLocaleString()), 3)) : u24("", true)], 2)];
  })], 2)) : u24("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/ToggleRefinement.vue.js
ToggleRefinement_vue_vue_type_script_lang_default.render = i28;
var ToggleRefinement_vue_default = ToggleRefinement_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/VoiceSearch.vue_vue&type=script&lang.js
var VoiceSearch_vue_vue_type_script_lang_default = { name: "AisVoiceSearch", mixins: [n3({ connector: connectVoiceSearch_default }, { $$widgetType: "ais.voiceSearch" }), t({ name: "VoiceSearch" })], props: { searchAsYouSpeak: { type: Boolean, required: false, default: void 0 }, language: { type: String, default: void 0 }, additionalQueryParameters: { type: Object, default: void 0 }, buttonTitle: { type: String, required: false, default: "Search by voice" }, disabledButtonTitle: { type: String, required: false, default: "Search by voice (not supported on this browser)" } }, data: function() {
  return { buttonSvgAttrs: { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" } };
}, computed: { widgetParams: function() {
  return { searchAsYouSpeak: this.searchAsYouSpeak, language: this.language, additionalQueryParameters: this.additionalQueryParameters };
}, errorNotAllowed: function() {
  return "error" === this.state.voiceListeningState.status && "not-allowed" === this.state.voiceListeningState.errorCode;
}, rootSlotProps: function() {
  return { isBrowserSupported: this.state.isBrowserSupported, isListening: this.state.isListening, toggleListening: this.state.toggleListening, voiceListeningState: this.state.voiceListeningState };
}, innerSlotProps: function() {
  return { status: this.state.voiceListeningState.status, errorCode: this.state.voiceListeningState.errorCode, isListening: this.state.isListening, transcript: this.state.voiceListeningState.transcript, isSpeechFinal: this.state.voiceListeningState.isSpeechFinal, isBrowserSupported: this.state.isBrowserSupported };
} }, methods: { handleClick: function(t37) {
  t37.currentTarget.blur(), this.state.toggleListening();
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/VoiceSearch.vue_vue&type=template&id=c25adbd0&lang.js
import { openBlock as t34, createElementBlock as n30, normalizeClass as e32, renderSlot as l25, normalizeProps as i29, guardReactiveProps as s28, createElementVNode as o22, mergeProps as r30, toDisplayString as a28, createCommentVNode as u25, createStaticVNode as p6 } from "vue";
var d7 = ["title", "disabled"];
var v6 = [p6('<line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>', 5)];
var y5 = ["fill"];
var c22 = o22("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }, null, -1);
var x2 = o22("line", { x1: "12", y1: "19", x2: "12", y2: "23" }, null, -1);
var b2 = o22("line", { x1: "8", y1: "23", x2: "16", y2: "23" }, null, -1);
function f14(p7, f15, h13, S2, g9, k5) {
  return p7.state ? (t34(), n30("div", { key: 0, class: e32(p7.suit()) }, [l25(p7.$slots, "default", i29(s28(k5.rootSlotProps)), function() {
    return [o22("button", { type: "button", class: e32(p7.suit("button")), title: p7.state.isBrowserSupported ? h13.buttonTitle : h13.disabledButtonTitle, disabled: !p7.state.isBrowserSupported, onClick: f15[0] || (f15[0] = function() {
      for (var t37 = [], n32 = arguments.length; n32--; )
        t37[n32] = arguments[n32];
      return k5.handleClick && k5.handleClick.apply(k5, t37);
    }) }, [l25(p7.$slots, "buttonText", i29(s28(k5.innerSlotProps)), function() {
      return [k5.errorNotAllowed ? (t34(), n30("svg", i29(r30({ key: 0 }, g9.buttonSvgAttrs)), v6, 16)) : (t34(), n30("svg", i29(r30({ key: 1 }, g9.buttonSvgAttrs)), [o22("path", { d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z", fill: p7.state.isListening ? "currentColor" : "none" }, null, 8, y5), c22, x2, b2], 16))];
    })], 10, d7), o22("div", { class: e32(p7.suit("status")) }, [l25(p7.$slots, "status", i29(s28(k5.innerSlotProps)), function() {
      return [o22("p", null, a28(p7.state.voiceListeningState.transcript), 1)];
    })], 2)];
  })], 2)) : u25("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/VoiceSearch.vue.js
VoiceSearch_vue_vue_type_script_lang_default.render = f14;
var VoiceSearch_vue_default = VoiceSearch_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/RelevantSort.vue_vue&type=script&lang.js
var RelevantSort_vue_vue_type_script_lang_default = { name: "AisRelevantSort", mixins: [t({ name: "RelevantSort" }), n3({ connector: connectRelevantSort_default }, { $$widgetType: "ais.relevantSort" })], methods: { refine: function() {
  this.state.isRelevantSorted ? this.state.refine(0) : this.state.refine(void 0);
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/RelevantSort.vue_vue&type=template&id=d83cf556&lang.js
import { openBlock as t35, createElementBlock as e33, normalizeClass as s29, renderSlot as n31, createElementVNode as r31, createTextVNode as i30, toDisplayString as a29, createCommentVNode as l26 } from "vue";
function o23(o26, u26, v7, d8, c23, f15) {
  return o26.state && o26.state.isVirtualReplica ? (t35(), e33("div", { key: 0, class: s29(o26.suit()) }, [n31(o26.$slots, "default", { isRelevantSorted: o26.state.isRelevantSorted, refine: o26.state.refine }, function() {
    return [r31("div", { class: s29(o26.suit("text")) }, [n31(o26.$slots, "text", { isRelevantSorted: o26.state.isRelevantSorted })], 2), r31("button", { type: "button", class: s29(o26.suit("button")), onClick: u26[0] || (u26[0] = function(t37) {
      return f15.refine();
    }) }, [n31(o26.$slots, "button", { isRelevantSorted: o26.state.isRelevantSorted }, function() {
      return [i30(a29(o26.state.isRelevantSorted ? "See all results" : "See relevant results"), 1)];
    })], 2)];
  })], 2)) : l26("", true);
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/RelevantSort.vue.js
RelevantSort_vue_vue_type_script_lang_default.render = o23;
var RelevantSort_vue_default = RelevantSort_vue_vue_type_script_lang_default;

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/DynamicWidgets.js
var DynamicWidgets_default = { name: "AisDynamicWidgets", mixins: [n3({ connector: connectDynamicWidgets_default }, { $$widgetType: "ais.dynamicWidgets" }), t({ name: "DynamicWidgets" })], props: { transformItems: { type: Function, default: void 0 }, facets: { type: Array, default: void 0 }, maxValuesPerFacet: { type: Number, default: void 0 } }, render: n(function(t37) {
  var i32 = this, s30 = /* @__PURE__ */ new Map();
  if ((s(this) || []).forEach(function(e34) {
    var r32 = function t38(e35) {
      var i33, r33 = e35.props;
      if (r33) {
        if (r33.attribute)
          return r33.attribute;
        if (Array.isArray(r33.attributes))
          return r33.attributes[0];
      }
      if (i33 = e35.children && e35.children.default && e35.children.default(), Array.isArray(i33))
        return i33.reduce(function(e36, i34) {
          return e36 || t38(i34);
        }, void 0);
    }(e34);
    r32 && s30.set(r32, t37("div", { key: r32, class: [i32.suit("widget")] }, [e34]));
  }), !this.state) {
    var a30 = [];
    return s30.forEach(function(t38) {
      return a30.push(t38);
    }), t37("div", e({ class: [this.suit()] }, { attrs: { hidden: true } }), a30);
  }
  return t37("div", { class: [this.suit()] }, this.state.attributesToRender.map(function(t38) {
    return s30.get(t38);
  }));
}), computed: { widgetParams: function() {
  return { transformItems: this.transformItems, facets: this.facets, maxValuesPerFacet: this.maxValuesPerFacet, widgets: [] };
} } };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/components/ExperimentalDynamicWidgets.js
var ExperimentalDynamicWidgets_default = Object.assign({}, DynamicWidgets_default, { name: "AisExperimentalDynamicWidgets", mounted: function() {
  a("Use AisDynamicWidgets instead of AisExperimentalDynamicWidgets.");
} });

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/widgets.js
var widgets_exports = {};
__export(widgets_exports, {
  AisAutocomplete: () => Autocomplete_vue_default,
  AisBreadcrumb: () => Breadcrumb_vue_default,
  AisClearRefinements: () => ClearRefinements_vue_default,
  AisConfigure: () => Configure_default,
  AisCurrentRefinements: () => CurrentRefinements_vue_default,
  AisDynamicWidgets: () => DynamicWidgets_default,
  AisExperimentalConfigureRelatedItems: () => ConfigureRelatedItems_default,
  AisExperimentalDynamicWidgets: () => ExperimentalDynamicWidgets_default,
  AisHierarchicalMenu: () => HierarchicalMenu_vue_default,
  AisHighlight: () => Highlight_vue_default,
  AisHits: () => Hits_default,
  AisHitsPerPage: () => HitsPerPage_vue_default,
  AisIndex: () => Index_default,
  AisInfiniteHits: () => InfiniteHits_vue_default,
  AisInstantSearch: () => InstantSearch_default2,
  AisInstantSearchSsr: () => InstantSearchSsr_default,
  AisMenu: () => Menu_vue_default,
  AisMenuSelect: () => MenuSelect_vue_default,
  AisNumericMenu: () => NumericMenu_vue_default,
  AisPagination: () => Pagination_vue_default,
  AisPanel: () => Panel_vue_default,
  AisPoweredBy: () => PoweredBy_vue_default,
  AisQueryRuleContext: () => QueryRuleContext_default,
  AisQueryRuleCustomData: () => QueryRuleCustomData_vue_default,
  AisRangeInput: () => RangeInput_vue_default,
  AisRatingMenu: () => RatingMenu_vue_default,
  AisRefinementList: () => RefinementList_vue_default,
  AisRelevantSort: () => RelevantSort_vue_default,
  AisSearchBox: () => SearchBox_vue_default,
  AisSnippet: () => Snippet_vue_default,
  AisSortBy: () => SortBy_vue_default,
  AisStateResults: () => StateResults_vue_default,
  AisStats: () => Stats_vue_default,
  AisToggleRefinement: () => ToggleRefinement_vue_default,
  AisVoiceSearch: () => VoiceSearch_vue_default
});

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/plugin.js
var o24 = { install: function(o26) {
  Object.keys(widgets_exports).forEach(function(t37) {
    o26.component(widgets_exports[t37].name, widgets_exports[t37]);
  });
} };

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/util/createServerRootMixin.js
import { createSSRApp as t36 } from "vue";

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/instantsearch.js/es/lib/server.js
function _typeof63(obj) {
  "@babel/helpers - typeof";
  return _typeof63 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof63(obj);
}
function ownKeys57(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread57(target) {
  for (var i32 = 1; i32 < arguments.length; i32++) {
    var source = null != arguments[i32] ? arguments[i32] : {};
    i32 % 2 ? ownKeys57(Object(source), true).forEach(function(key2) {
      _defineProperty61(target, key2, source[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys57(Object(source)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
    });
  }
  return target;
}
function _defineProperty61(obj, key2, value) {
  key2 = _toPropertyKey60(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey60(arg) {
  var key2 = _toPrimitive60(arg, "string");
  return _typeof63(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive60(input, hint) {
  if (_typeof63(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof63(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function waitForResults(search) {
  var skipRecommend = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var helper = search.mainHelper;
  var requestParamsList;
  var client = helper.getClient();
  helper.setClient(_objectSpread57(_objectSpread57({}, client), {}, {
    search: function search2(queries) {
      requestParamsList = queries.map(function(_ref7) {
        var params = _ref7.params;
        return params;
      });
      return client.search(queries);
    }
  }));
  search._hasSearchWidget && helper.searchOnlyWithDerivedHelpers();
  !skipRecommend && search._hasRecommendWidget && helper.recommend();
  return new Promise(function(resolve, reject) {
    var searchResultsReceived = !search._hasSearchWidget;
    var recommendResultsReceived = !search._hasRecommendWidget || skipRecommend;
    helper.derivedHelpers[0].on("result", function() {
      searchResultsReceived = true;
      if (recommendResultsReceived) {
        resolve(requestParamsList);
      }
    });
    helper.derivedHelpers[0].on("recommend:result", function() {
      recommendResultsReceived = true;
      if (searchResultsReceived) {
        resolve(requestParamsList);
      }
    });
    helper.on("error", function(error) {
      reject(error);
    });
    search.on("error", function(error) {
      reject(error);
    });
    helper.derivedHelpers.forEach(function(derivedHelper) {
      return derivedHelper.on("error", function(error) {
        reject(error);
      });
    });
  });
}
function getInitialResults(rootIndex, requestParamsList) {
  var initialResults = {};
  var requestParamsIndex = 0;
  walkIndex(rootIndex, function(widget) {
    var _widget$getHelper;
    var searchResults = widget.getResults();
    var recommendResults = (_widget$getHelper = widget.getHelper()) === null || _widget$getHelper === void 0 ? void 0 : _widget$getHelper.lastRecommendResults;
    if (searchResults || recommendResults) {
      var requestParams = requestParamsList === null || requestParamsList === void 0 ? void 0 : requestParamsList[requestParamsIndex++];
      initialResults[widget.getIndexId()] = _objectSpread57(_objectSpread57(_objectSpread57({}, searchResults && {
        state: _objectSpread57({}, searchResults._state),
        results: searchResults._rawResults
      }), recommendResults && {
        recommendResults: {
          // We have to stringify + parse because of some explicitly undefined values.
          params: JSON.parse(JSON.stringify(recommendResults._state.params)),
          results: recommendResults._rawResults
        }
      }), requestParams && {
        requestParams
      });
    }
  });
  if (Object.keys(initialResults).length === 0) {
    throw new Error("The root index does not have any results. Make sure you have at least one widget that provides results.");
  }
  return initialResults;
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/src/util/createServerRootMixin.js
function o25(e34, r32) {
  void 0 === r32 && (r32 = {});
  var n32 = r32.mixins;
  void 0 === n32 && (n32 = []);
  var s30, o26 = { serverPrefetch: void 0, fetch: void 0, _base: void 0, name: "ais-ssr-root-component" }, i32 = Object.assign({}, e34.$options, o26);
  return i32.mixins = n32.concat(i32.mixins || []), s30 = t36(i32), e34.$router && s30.use(e34.$router), e34.$store && s30.use(e34.$store), e34.$i18n && s30.use(e34.$i18n), s30.$slots = e34.$slots, s30.$root = e34.$root, s30;
}
function i31(t37) {
  void 0 === t37 && (t37 = {});
  var i32 = t37.$cloneComponent;
  void 0 === i32 && (i32 = o25);
  var a30 = function(t38, o26) {
    var i33, a31 = es_default(t38);
    return a31.findResultsState = function(t39) {
      var e34, r32, u26 = t39.component, c23 = t39.renderToString;
      if (!c23)
        throw new Error("findResultsState requires `renderToString: (component) => Promise<string>` in the first argument.");
      return Promise.resolve().then(function() {
        e34 = o26(u26, { mixins: [{ beforeCreate: function() {
          var t40 = Object.getOwnPropertyDescriptor(u26, "$nuxt"), e35 = !!t40 && (t40.writable || t40.set);
          u26.$nuxt && e35 && (this.$nuxt = u26.$nuxt);
        }, created: function() {
          (r32 = this.instantsearch).start(), r32.started = false;
        } }] });
      }).then(function() {
        return c23(e34);
      }).then(function() {
        return waitForResults(r32);
      }).then(function(t40) {
        return i33 = getInitialResults(r32.mainIndex, t40), a31.hydrate(i33), a31.getState();
      });
    }, a31.getState = function() {
      if (!i33)
        throw new Error("You need to wait for findResultsState to finish");
      return i33;
    }, a31.__forceRender = function(t39, e34) {
      var r32 = e34.getResults();
      if (null !== r32) {
        var n32 = r32._state, s30 = e34.getHelper();
        s30.state = n32, t39.render({ helper: s30, results: r32, scopedResults: e34.getScopedResults(), parent: e34, state: n32, templatesConfig: {}, createURL: e34.createURL, instantSearchInstance: a31, searchMetadata: { isSearchStalled: false } });
      }
    }, a31.hydrate = function(t39) {
      t39 ? (a31._initialResults = t39, a31.start(), a31.started = false) : a("The result of `findResultsState()` needs to be passed to `hydrate()`.");
    }, a31;
  }(t37, i32);
  return { provide: function() {
    return { $_ais_ssrInstantSearchInstance: this.instantsearch };
  }, data: function() {
    return { instantsearch: a30 };
  } };
}

// ../../../FILE/HBuilderProjects/newsDemo1/node_modules/vue-instantsearch/vue3/es/index.js
var es_default2 = o24;
export {
  Autocomplete_vue_default as AisAutocomplete,
  Breadcrumb_vue_default as AisBreadcrumb,
  ClearRefinements_vue_default as AisClearRefinements,
  Configure_default as AisConfigure,
  CurrentRefinements_vue_default as AisCurrentRefinements,
  DynamicWidgets_default as AisDynamicWidgets,
  ConfigureRelatedItems_default as AisExperimentalConfigureRelatedItems,
  ExperimentalDynamicWidgets_default as AisExperimentalDynamicWidgets,
  HierarchicalMenu_vue_default as AisHierarchicalMenu,
  Highlight_vue_default as AisHighlight,
  Hits_default as AisHits,
  HitsPerPage_vue_default as AisHitsPerPage,
  Index_default as AisIndex,
  InfiniteHits_vue_default as AisInfiniteHits,
  InstantSearch_default2 as AisInstantSearch,
  InstantSearchSsr_default as AisInstantSearchSsr,
  Menu_vue_default as AisMenu,
  MenuSelect_vue_default as AisMenuSelect,
  NumericMenu_vue_default as AisNumericMenu,
  Pagination_vue_default as AisPagination,
  Panel_vue_default as AisPanel,
  PoweredBy_vue_default as AisPoweredBy,
  QueryRuleContext_default as AisQueryRuleContext,
  QueryRuleCustomData_vue_default as AisQueryRuleCustomData,
  RangeInput_vue_default as AisRangeInput,
  RatingMenu_vue_default as AisRatingMenu,
  RefinementList_vue_default as AisRefinementList,
  RelevantSort_vue_default as AisRelevantSort,
  SearchBox_vue_default as AisSearchBox,
  Snippet_vue_default as AisSnippet,
  SortBy_vue_default as AisSortBy,
  StateResults_vue_default as AisStateResults,
  Stats_vue_default as AisStats,
  ToggleRefinement_vue_default as AisToggleRefinement,
  VoiceSearch_vue_default as AisVoiceSearch,
  i31 as createServerRootMixin,
  t as createSuitMixin,
  n3 as createWidgetMixin,
  es_default2 as default
};
//# sourceMappingURL=vue-instantsearch_vue3_es.js.map

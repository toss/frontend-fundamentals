import {
  __export
} from "./chunk-PZ5AY32C.js";

// ../../.yarn/cache/tslib-npm-2.8.1-66590b21b8-3e2e043d5c.zip/node_modules/tslib/tslib.es6.mjs
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign3(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from2.length, ar; i < l; i++) {
    if (ar || !(i in from2)) {
      if (!ar) ar = Array.prototype.slice.call(from2, 0, i);
      ar[i] = from2[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/messages.js
var SUCCESS_MESSAGE = "Event tracked successfully";
var UNEXPECTED_ERROR_MESSAGE = "Unexpected error occurred";
var MAX_RETRIES_EXCEEDED_MESSAGE = "Event rejected due to exceeded retry count";
var OPT_OUT_MESSAGE = "Event skipped due to optOut config";
var MISSING_API_KEY_MESSAGE = "Event rejected due to missing API key";
var INVALID_API_KEY = "Invalid API key";
var CLIENT_NOT_INITIALIZED = "Client not initialized";

// ../../.yarn/cache/@amplitude-analytics-types-npm-2.8.4-b44cc9d406-ad9cb6b8a7.zip/node_modules/@amplitude/analytics-types/lib/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  DEFAULT_ACTION_CLICK_ALLOWLIST: () => DEFAULT_ACTION_CLICK_ALLOWLIST,
  DEFAULT_CSS_SELECTOR_ALLOWLIST: () => DEFAULT_CSS_SELECTOR_ALLOWLIST,
  DEFAULT_DATA_ATTRIBUTE_PREFIX: () => DEFAULT_DATA_ATTRIBUTE_PREFIX,
  IdentifyOperation: () => IdentifyOperation,
  LogLevel: () => LogLevel,
  OfflineDisabled: () => OfflineDisabled,
  RevenueProperty: () => RevenueProperty,
  ServerZone: () => ServerZone,
  SpecialEventType: () => SpecialEventType,
  Status: () => Status
});

// ../../.yarn/cache/@amplitude-analytics-types-npm-2.8.4-b44cc9d406-ad9cb6b8a7.zip/node_modules/@amplitude/analytics-types/lib/esm/event.js
var IdentifyOperation;
(function(IdentifyOperation2) {
  IdentifyOperation2["SET"] = "$set";
  IdentifyOperation2["SET_ONCE"] = "$setOnce";
  IdentifyOperation2["ADD"] = "$add";
  IdentifyOperation2["APPEND"] = "$append";
  IdentifyOperation2["PREPEND"] = "$prepend";
  IdentifyOperation2["REMOVE"] = "$remove";
  IdentifyOperation2["PREINSERT"] = "$preInsert";
  IdentifyOperation2["POSTINSERT"] = "$postInsert";
  IdentifyOperation2["UNSET"] = "$unset";
  IdentifyOperation2["CLEAR_ALL"] = "$clearAll";
})(IdentifyOperation || (IdentifyOperation = {}));
var RevenueProperty;
(function(RevenueProperty2) {
  RevenueProperty2["REVENUE_PRODUCT_ID"] = "$productId";
  RevenueProperty2["REVENUE_QUANTITY"] = "$quantity";
  RevenueProperty2["REVENUE_PRICE"] = "$price";
  RevenueProperty2["REVENUE_TYPE"] = "$revenueType";
  RevenueProperty2["REVENUE"] = "$revenue";
})(RevenueProperty || (RevenueProperty = {}));
var SpecialEventType;
(function(SpecialEventType2) {
  SpecialEventType2["IDENTIFY"] = "$identify";
  SpecialEventType2["GROUP_IDENTIFY"] = "$groupidentify";
  SpecialEventType2["REVENUE"] = "revenue_amount";
})(SpecialEventType || (SpecialEventType = {}));

// ../../.yarn/cache/@amplitude-analytics-types-npm-2.8.4-b44cc9d406-ad9cb6b8a7.zip/node_modules/@amplitude/analytics-types/lib/esm/logger.js
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["None"] = 0] = "None";
  LogLevel2[LogLevel2["Error"] = 1] = "Error";
  LogLevel2[LogLevel2["Warn"] = 2] = "Warn";
  LogLevel2[LogLevel2["Verbose"] = 3] = "Verbose";
  LogLevel2[LogLevel2["Debug"] = 4] = "Debug";
})(LogLevel || (LogLevel = {}));

// ../../.yarn/cache/@amplitude-analytics-types-npm-2.8.4-b44cc9d406-ad9cb6b8a7.zip/node_modules/@amplitude/analytics-types/lib/esm/server-zone.js
var ServerZone;
(function(ServerZone2) {
  ServerZone2["US"] = "US";
  ServerZone2["EU"] = "EU";
})(ServerZone || (ServerZone = {}));

// ../../.yarn/cache/@amplitude-analytics-types-npm-2.8.4-b44cc9d406-ad9cb6b8a7.zip/node_modules/@amplitude/analytics-types/lib/esm/status.js
var Status;
(function(Status2) {
  Status2["Unknown"] = "unknown";
  Status2["Skipped"] = "skipped";
  Status2["Success"] = "success";
  Status2["RateLimit"] = "rate_limit";
  Status2["PayloadTooLarge"] = "payload_too_large";
  Status2["Invalid"] = "invalid";
  Status2["Failed"] = "failed";
  Status2["Timeout"] = "Timeout";
  Status2["SystemError"] = "SystemError";
})(Status || (Status = {}));

// ../../.yarn/cache/@amplitude-analytics-types-npm-2.8.4-b44cc9d406-ad9cb6b8a7.zip/node_modules/@amplitude/analytics-types/lib/esm/offline.js
var OfflineDisabled = null;

// ../../.yarn/cache/@amplitude-analytics-types-npm-2.8.4-b44cc9d406-ad9cb6b8a7.zip/node_modules/@amplitude/analytics-types/lib/esm/element-interactions.js
var DEFAULT_CSS_SELECTOR_ALLOWLIST = [
  "a",
  "button",
  "input",
  "select",
  "textarea",
  "label",
  "video",
  "audio",
  '[contenteditable="true" i]',
  "[data-amp-default-track]",
  ".amp-default-track"
];
var DEFAULT_DATA_ATTRIBUTE_PREFIX = "data-amp-track-";
var DEFAULT_ACTION_CLICK_ALLOWLIST = ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6"];

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/utils/result-builder.js
var buildResult = function(event, code, message) {
  if (code === void 0) {
    code = 0;
  }
  if (message === void 0) {
    message = Status.Unknown;
  }
  return { event, code, message };
};

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/utils/uuid.js
var UUID = function(a) {
  return a ? (
    // a random number from 0 to 15
    (a ^ // unless b is 8,
    Math.random() * // in which case
    16 >> // a random number from
    a / 4).toString(16)
  ) : (
    // or otherwise a concatenated string:
    (String(1e7) + // 10000000 +
    String(-1e3) + // -1000 +
    String(-4e3) + // -4000 +
    String(-8e3) + // -80000000 +
    String(-1e11)).replace(
      // replacing
      /[018]/g,
      // zeroes, ones, and eights with
      UUID
    )
  );
};

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/timeline.js
var Timeline = (
  /** @class */
  function() {
    function Timeline2(client) {
      this.client = client;
      this.queue = [];
      this.applying = false;
      this.plugins = [];
    }
    Timeline2.prototype.register = function(plugin, config3) {
      var _a, _b;
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              if (this.plugins.some(function(existingPlugin) {
                return existingPlugin.name === plugin.name;
              })) {
                config3.loggerProvider.warn("Plugin with name ".concat(plugin.name, " already exists, skipping registration"));
                return [
                  2
                  /*return*/
                ];
              }
              if (plugin.name === void 0) {
                plugin.name = UUID();
                config3.loggerProvider.warn("Plugin name is undefined. \n      Generating a random UUID for plugin name: ".concat(plugin.name, ". \n      Set a name for the plugin to prevent it from being added multiple times."));
              }
              plugin.type = (_a = plugin.type) !== null && _a !== void 0 ? _a : "enrichment";
              return [4, (_b = plugin.setup) === null || _b === void 0 ? void 0 : _b.call(plugin, config3, this.client)];
            case 1:
              _c.sent();
              this.plugins.push(plugin);
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    Timeline2.prototype.deregister = function(pluginName, config3) {
      var _a;
      return __awaiter(this, void 0, void 0, function() {
        var index2, plugin;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              index2 = this.plugins.findIndex(function(plugin2) {
                return plugin2.name === pluginName;
              });
              if (index2 === -1) {
                config3.loggerProvider.warn("Plugin with name ".concat(pluginName, " does not exist, skipping deregistration"));
                return [
                  2
                  /*return*/
                ];
              }
              plugin = this.plugins[index2];
              this.plugins.splice(index2, 1);
              return [4, (_a = plugin.teardown) === null || _a === void 0 ? void 0 : _a.call(plugin)];
            case 1:
              _b.sent();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    Timeline2.prototype.reset = function(client) {
      this.applying = false;
      var plugins = this.plugins;
      plugins.map(function(plugin) {
        var _a;
        return (_a = plugin.teardown) === null || _a === void 0 ? void 0 : _a.call(plugin);
      });
      this.plugins = [];
      this.client = client;
    };
    Timeline2.prototype.push = function(event) {
      var _this = this;
      return new Promise(function(resolve) {
        _this.queue.push([event, resolve]);
        _this.scheduleApply(0);
      });
    };
    Timeline2.prototype.scheduleApply = function(timeout2) {
      var _this = this;
      if (this.applying)
        return;
      this.applying = true;
      setTimeout(function() {
        void _this.apply(_this.queue.shift()).then(function() {
          _this.applying = false;
          if (_this.queue.length > 0) {
            _this.scheduleApply(0);
          }
        });
      }, timeout2);
    };
    Timeline2.prototype.apply = function(item) {
      return __awaiter(this, void 0, void 0, function() {
        var _a, event, _b, resolve, before, before_1, before_1_1, plugin, e, e_1_1, enrichment, enrichment_1, enrichment_1_1, plugin, e, e_2_1, destination, executeDestinations;
        var e_1, _c, e_2, _d;
        return __generator(this, function(_e) {
          switch (_e.label) {
            case 0:
              if (!item) {
                return [
                  2
                  /*return*/
                ];
              }
              _a = __read(item, 1), event = _a[0];
              _b = __read(item, 2), resolve = _b[1];
              before = this.plugins.filter(function(plugin2) {
                return plugin2.type === "before";
              });
              _e.label = 1;
            case 1:
              _e.trys.push([1, 6, 7, 8]);
              before_1 = __values(before), before_1_1 = before_1.next();
              _e.label = 2;
            case 2:
              if (!!before_1_1.done) return [3, 5];
              plugin = before_1_1.value;
              if (!plugin.execute) {
                return [3, 4];
              }
              return [4, plugin.execute(__assign({}, event))];
            case 3:
              e = _e.sent();
              if (e === null) {
                resolve({ event, code: 0, message: "" });
                return [
                  2
                  /*return*/
                ];
              } else {
                event = e;
              }
              _e.label = 4;
            case 4:
              before_1_1 = before_1.next();
              return [3, 2];
            case 5:
              return [3, 8];
            case 6:
              e_1_1 = _e.sent();
              e_1 = { error: e_1_1 };
              return [3, 8];
            case 7:
              try {
                if (before_1_1 && !before_1_1.done && (_c = before_1.return)) _c.call(before_1);
              } finally {
                if (e_1) throw e_1.error;
              }
              return [
                7
                /*endfinally*/
              ];
            case 8:
              enrichment = this.plugins.filter(function(plugin2) {
                return plugin2.type === "enrichment" || plugin2.type === void 0;
              });
              _e.label = 9;
            case 9:
              _e.trys.push([9, 14, 15, 16]);
              enrichment_1 = __values(enrichment), enrichment_1_1 = enrichment_1.next();
              _e.label = 10;
            case 10:
              if (!!enrichment_1_1.done) return [3, 13];
              plugin = enrichment_1_1.value;
              if (!plugin.execute) {
                return [3, 12];
              }
              return [4, plugin.execute(__assign({}, event))];
            case 11:
              e = _e.sent();
              if (e === null) {
                resolve({ event, code: 0, message: "" });
                return [
                  2
                  /*return*/
                ];
              } else {
                event = e;
              }
              _e.label = 12;
            case 12:
              enrichment_1_1 = enrichment_1.next();
              return [3, 10];
            case 13:
              return [3, 16];
            case 14:
              e_2_1 = _e.sent();
              e_2 = { error: e_2_1 };
              return [3, 16];
            case 15:
              try {
                if (enrichment_1_1 && !enrichment_1_1.done && (_d = enrichment_1.return)) _d.call(enrichment_1);
              } finally {
                if (e_2) throw e_2.error;
              }
              return [
                7
                /*endfinally*/
              ];
            case 16:
              destination = this.plugins.filter(function(plugin2) {
                return plugin2.type === "destination";
              });
              executeDestinations = destination.map(function(plugin2) {
                var eventClone = __assign({}, event);
                return plugin2.execute(eventClone).catch(function(e2) {
                  return buildResult(eventClone, 0, String(e2));
                });
              });
              void Promise.all(executeDestinations).then(function(_a2) {
                var _b2 = __read(_a2, 1), result = _b2[0];
                var resolveResult = result || buildResult(event, 100, "Event not tracked, no destination plugins on the instance");
                resolve(resolveResult);
              });
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    Timeline2.prototype.flush = function() {
      return __awaiter(this, void 0, void 0, function() {
        var queue2, destination, executeDestinations;
        var _this = this;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              queue2 = this.queue;
              this.queue = [];
              return [4, Promise.all(queue2.map(function(item) {
                return _this.apply(item);
              }))];
            case 1:
              _a.sent();
              destination = this.plugins.filter(function(plugin) {
                return plugin.type === "destination";
              });
              executeDestinations = destination.map(function(plugin) {
                return plugin.flush && plugin.flush();
              });
              return [4, Promise.all(executeDestinations)];
            case 2:
              _a.sent();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    return Timeline2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/constants.js
var UNSET_VALUE = "-";
var AMPLITUDE_PREFIX = "AMP";
var STORAGE_PREFIX = "".concat(AMPLITUDE_PREFIX, "_unsent");
var AMPLITUDE_SERVER_URL = "https://api2.amplitude.com/2/httpapi";
var EU_AMPLITUDE_SERVER_URL = "https://api.eu.amplitude.com/2/httpapi";
var AMPLITUDE_BATCH_SERVER_URL = "https://api2.amplitude.com/batch";
var EU_AMPLITUDE_BATCH_SERVER_URL = "https://api.eu.amplitude.com/batch";

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/utils/valid-properties.js
var MAX_PROPERTY_KEYS = 1e3;
var isValidObject = function(properties) {
  if (Object.keys(properties).length > MAX_PROPERTY_KEYS) {
    return false;
  }
  for (var key in properties) {
    var value = properties[key];
    if (!isValidProperties(key, value))
      return false;
  }
  return true;
};
var isValidProperties = function(property, value) {
  var e_1, _a;
  if (typeof property !== "string")
    return false;
  if (Array.isArray(value)) {
    var isValid = true;
    try {
      for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
        var valueElement = value_1_1.value;
        if (Array.isArray(valueElement)) {
          return false;
        } else if (typeof valueElement === "object") {
          isValid = isValid && isValidObject(valueElement);
        } else if (!["number", "string"].includes(typeof valueElement)) {
          return false;
        }
        if (!isValid) {
          return false;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  } else if (value === null || value === void 0) {
    return false;
  } else if (typeof value === "object") {
    return isValidObject(value);
  } else if (!["number", "string", "boolean"].includes(typeof value)) {
    return false;
  }
  return true;
};

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/identify.js
var Identify = (
  /** @class */
  function() {
    function Identify2() {
      this._propertySet = /* @__PURE__ */ new Set();
      this._properties = {};
    }
    Identify2.prototype.getUserProperties = function() {
      return __assign({}, this._properties);
    };
    Identify2.prototype.set = function(property, value) {
      this._safeSet(IdentifyOperation.SET, property, value);
      return this;
    };
    Identify2.prototype.setOnce = function(property, value) {
      this._safeSet(IdentifyOperation.SET_ONCE, property, value);
      return this;
    };
    Identify2.prototype.append = function(property, value) {
      this._safeSet(IdentifyOperation.APPEND, property, value);
      return this;
    };
    Identify2.prototype.prepend = function(property, value) {
      this._safeSet(IdentifyOperation.PREPEND, property, value);
      return this;
    };
    Identify2.prototype.postInsert = function(property, value) {
      this._safeSet(IdentifyOperation.POSTINSERT, property, value);
      return this;
    };
    Identify2.prototype.preInsert = function(property, value) {
      this._safeSet(IdentifyOperation.PREINSERT, property, value);
      return this;
    };
    Identify2.prototype.remove = function(property, value) {
      this._safeSet(IdentifyOperation.REMOVE, property, value);
      return this;
    };
    Identify2.prototype.add = function(property, value) {
      this._safeSet(IdentifyOperation.ADD, property, value);
      return this;
    };
    Identify2.prototype.unset = function(property) {
      this._safeSet(IdentifyOperation.UNSET, property, UNSET_VALUE);
      return this;
    };
    Identify2.prototype.clearAll = function() {
      this._properties = {};
      this._properties[IdentifyOperation.CLEAR_ALL] = UNSET_VALUE;
      return this;
    };
    Identify2.prototype._safeSet = function(operation, property, value) {
      if (this._validate(operation, property, value)) {
        var userPropertyMap = this._properties[operation];
        if (userPropertyMap === void 0) {
          userPropertyMap = {};
          this._properties[operation] = userPropertyMap;
        }
        userPropertyMap[property] = value;
        this._propertySet.add(property);
        return true;
      }
      return false;
    };
    Identify2.prototype._validate = function(operation, property, value) {
      if (this._properties[IdentifyOperation.CLEAR_ALL] !== void 0) {
        return false;
      }
      if (this._propertySet.has(property)) {
        return false;
      }
      if (operation === IdentifyOperation.ADD) {
        return typeof value === "number";
      }
      if (operation !== IdentifyOperation.UNSET && operation !== IdentifyOperation.REMOVE) {
        return isValidProperties(property, value);
      }
      return true;
    };
    return Identify2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/utils/event-builder.js
var createTrackEvent = function(eventInput, eventProperties, eventOptions) {
  var baseEvent = typeof eventInput === "string" ? { event_type: eventInput } : eventInput;
  return __assign(__assign(__assign({}, baseEvent), eventOptions), eventProperties && { event_properties: eventProperties });
};
var createIdentifyEvent = function(identify2, eventOptions) {
  var identifyEvent = __assign(__assign({}, eventOptions), { event_type: SpecialEventType.IDENTIFY, user_properties: identify2.getUserProperties() });
  return identifyEvent;
};
var createGroupIdentifyEvent = function(groupType, groupName, identify2, eventOptions) {
  var _a;
  var groupIdentify2 = __assign(__assign({}, eventOptions), { event_type: SpecialEventType.GROUP_IDENTIFY, group_properties: identify2.getUserProperties(), groups: (_a = {}, _a[groupType] = groupName, _a) });
  return groupIdentify2;
};
var createGroupEvent = function(groupType, groupName, eventOptions) {
  var _a;
  var identify2 = new Identify();
  identify2.set(groupType, groupName);
  var groupEvent = __assign(__assign({}, eventOptions), { event_type: SpecialEventType.IDENTIFY, user_properties: identify2.getUserProperties(), groups: (_a = {}, _a[groupType] = groupName, _a) });
  return groupEvent;
};
var createRevenueEvent = function(revenue2, eventOptions) {
  return __assign(__assign({}, eventOptions), { event_type: SpecialEventType.REVENUE, event_properties: revenue2.getEventProperties() });
};

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/utils/return-wrapper.js
var returnWrapper = function(awaitable) {
  return {
    promise: awaitable || Promise.resolve()
  };
};

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/core-client.js
var AmplitudeCore = (
  /** @class */
  function() {
    function AmplitudeCore2(name) {
      if (name === void 0) {
        name = "$default";
      }
      this.initializing = false;
      this.isReady = false;
      this.q = [];
      this.dispatchQ = [];
      this.logEvent = this.track.bind(this);
      this.timeline = new Timeline(this);
      this.name = name;
    }
    AmplitudeCore2.prototype._init = function(config3) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              this.config = config3;
              this.timeline.reset(this);
              return [4, this.runQueuedFunctions("q")];
            case 1:
              _a.sent();
              this.isReady = true;
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    AmplitudeCore2.prototype.runQueuedFunctions = function(queueName) {
      return __awaiter(this, void 0, void 0, function() {
        var queuedFunctions, queuedFunctions_1, queuedFunctions_1_1, queuedFunction, val, e_1_1;
        var e_1, _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              queuedFunctions = this[queueName];
              this[queueName] = [];
              _b.label = 1;
            case 1:
              _b.trys.push([1, 8, 9, 10]);
              queuedFunctions_1 = __values(queuedFunctions), queuedFunctions_1_1 = queuedFunctions_1.next();
              _b.label = 2;
            case 2:
              if (!!queuedFunctions_1_1.done) return [3, 7];
              queuedFunction = queuedFunctions_1_1.value;
              val = queuedFunction();
              if (!(val && "promise" in val)) return [3, 4];
              return [4, val.promise];
            case 3:
              _b.sent();
              return [3, 6];
            case 4:
              return [4, val];
            case 5:
              _b.sent();
              _b.label = 6;
            case 6:
              queuedFunctions_1_1 = queuedFunctions_1.next();
              return [3, 2];
            case 7:
              return [3, 10];
            case 8:
              e_1_1 = _b.sent();
              e_1 = { error: e_1_1 };
              return [3, 10];
            case 9:
              try {
                if (queuedFunctions_1_1 && !queuedFunctions_1_1.done && (_a = queuedFunctions_1.return)) _a.call(queuedFunctions_1);
              } finally {
                if (e_1) throw e_1.error;
              }
              return [
                7
                /*endfinally*/
              ];
            case 10:
              if (!this[queueName].length) return [3, 12];
              return [4, this.runQueuedFunctions(queueName)];
            case 11:
              _b.sent();
              _b.label = 12;
            case 12:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    AmplitudeCore2.prototype.track = function(eventInput, eventProperties, eventOptions) {
      var event = createTrackEvent(eventInput, eventProperties, eventOptions);
      return returnWrapper(this.dispatch(event));
    };
    AmplitudeCore2.prototype.identify = function(identify2, eventOptions) {
      var event = createIdentifyEvent(identify2, eventOptions);
      return returnWrapper(this.dispatch(event));
    };
    AmplitudeCore2.prototype.groupIdentify = function(groupType, groupName, identify2, eventOptions) {
      var event = createGroupIdentifyEvent(groupType, groupName, identify2, eventOptions);
      return returnWrapper(this.dispatch(event));
    };
    AmplitudeCore2.prototype.setGroup = function(groupType, groupName, eventOptions) {
      var event = createGroupEvent(groupType, groupName, eventOptions);
      return returnWrapper(this.dispatch(event));
    };
    AmplitudeCore2.prototype.revenue = function(revenue2, eventOptions) {
      var event = createRevenueEvent(revenue2, eventOptions);
      return returnWrapper(this.dispatch(event));
    };
    AmplitudeCore2.prototype.add = function(plugin) {
      if (!this.isReady) {
        this.q.push(this._addPlugin.bind(this, plugin));
        return returnWrapper();
      }
      return this._addPlugin(plugin);
    };
    AmplitudeCore2.prototype._addPlugin = function(plugin) {
      return returnWrapper(this.timeline.register(plugin, this.config));
    };
    AmplitudeCore2.prototype.remove = function(pluginName) {
      if (!this.isReady) {
        this.q.push(this._removePlugin.bind(this, pluginName));
        return returnWrapper();
      }
      return this._removePlugin(pluginName);
    };
    AmplitudeCore2.prototype._removePlugin = function(pluginName) {
      return returnWrapper(this.timeline.deregister(pluginName, this.config));
    };
    AmplitudeCore2.prototype.dispatchWithCallback = function(event, callback) {
      if (!this.isReady) {
        return callback(buildResult(event, 0, CLIENT_NOT_INITIALIZED));
      }
      void this.process(event).then(callback);
    };
    AmplitudeCore2.prototype.dispatch = function(event) {
      return __awaiter(this, void 0, void 0, function() {
        var _this = this;
        return __generator(this, function(_a) {
          if (!this.isReady) {
            return [2, new Promise(function(resolve) {
              _this.dispatchQ.push(_this.dispatchWithCallback.bind(_this, event, resolve));
            })];
          }
          return [2, this.process(event)];
        });
      });
    };
    AmplitudeCore2.prototype.process = function(event) {
      return __awaiter(this, void 0, void 0, function() {
        var result, e_2, message, result;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              if (this.config.optOut) {
                return [2, buildResult(event, 0, OPT_OUT_MESSAGE)];
              }
              return [4, this.timeline.push(event)];
            case 1:
              result = _a.sent();
              result.code === 200 ? this.config.loggerProvider.log(result.message) : result.code === 100 ? this.config.loggerProvider.warn(result.message) : this.config.loggerProvider.error(result.message);
              return [2, result];
            case 2:
              e_2 = _a.sent();
              message = String(e_2);
              this.config.loggerProvider.error(message);
              result = buildResult(event, 0, message);
              return [2, result];
            case 3:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    AmplitudeCore2.prototype.setOptOut = function(optOut) {
      if (!this.isReady) {
        this.q.push(this._setOptOut.bind(this, Boolean(optOut)));
        return;
      }
      this._setOptOut(optOut);
    };
    AmplitudeCore2.prototype._setOptOut = function(optOut) {
      this.config.optOut = Boolean(optOut);
    };
    AmplitudeCore2.prototype.flush = function() {
      return returnWrapper(this.timeline.flush());
    };
    return AmplitudeCore2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/revenue.js
var Revenue = (
  /** @class */
  function() {
    function Revenue2() {
      this.productId = "";
      this.quantity = 1;
      this.price = 0;
    }
    Revenue2.prototype.setProductId = function(productId) {
      this.productId = productId;
      return this;
    };
    Revenue2.prototype.setQuantity = function(quantity) {
      if (quantity > 0) {
        this.quantity = quantity;
      }
      return this;
    };
    Revenue2.prototype.setPrice = function(price) {
      this.price = price;
      return this;
    };
    Revenue2.prototype.setRevenueType = function(revenueType) {
      this.revenueType = revenueType;
      return this;
    };
    Revenue2.prototype.setRevenue = function(revenue2) {
      this.revenue = revenue2;
      return this;
    };
    Revenue2.prototype.setEventProperties = function(properties) {
      if (isValidObject(properties)) {
        this.properties = properties;
      }
      return this;
    };
    Revenue2.prototype.getEventProperties = function() {
      var eventProperties = this.properties ? __assign({}, this.properties) : {};
      eventProperties[RevenueProperty.REVENUE_PRODUCT_ID] = this.productId;
      eventProperties[RevenueProperty.REVENUE_QUANTITY] = this.quantity;
      eventProperties[RevenueProperty.REVENUE_PRICE] = this.price;
      eventProperties[RevenueProperty.REVENUE_TYPE] = this.revenueType;
      eventProperties[RevenueProperty.REVENUE] = this.revenue;
      return eventProperties;
    };
    return Revenue2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/utils/chunk.js
var chunk = function(arr, size) {
  var chunkSize = Math.max(size, 1);
  return arr.reduce(function(chunks, element, index2) {
    var chunkIndex = Math.floor(index2 / chunkSize);
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }
    chunks[chunkIndex].push(element);
    return chunks;
  }, []);
};

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/logger.js
var PREFIX = "Amplitude Logger ";
var Logger = (
  /** @class */
  function() {
    function Logger2() {
      this.logLevel = LogLevel.None;
    }
    Logger2.prototype.disable = function() {
      this.logLevel = LogLevel.None;
    };
    Logger2.prototype.enable = function(logLevel) {
      if (logLevel === void 0) {
        logLevel = LogLevel.Warn;
      }
      this.logLevel = logLevel;
    };
    Logger2.prototype.log = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (this.logLevel < LogLevel.Verbose) {
        return;
      }
      console.log("".concat(PREFIX, "[Log]: ").concat(args.join(" ")));
    };
    Logger2.prototype.warn = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (this.logLevel < LogLevel.Warn) {
        return;
      }
      console.warn("".concat(PREFIX, "[Warn]: ").concat(args.join(" ")));
    };
    Logger2.prototype.error = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (this.logLevel < LogLevel.Error) {
        return;
      }
      console.error("".concat(PREFIX, "[Error]: ").concat(args.join(" ")));
    };
    Logger2.prototype.debug = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (this.logLevel < LogLevel.Debug) {
        return;
      }
      console.log("".concat(PREFIX, "[Debug]: ").concat(args.join(" ")));
    };
    return Logger2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/config.js
var getDefaultConfig = function() {
  return {
    flushMaxRetries: 12,
    flushQueueSize: 200,
    flushIntervalMillis: 1e4,
    instanceName: "$default_instance",
    logLevel: LogLevel.Warn,
    loggerProvider: new Logger(),
    offline: false,
    optOut: false,
    serverUrl: AMPLITUDE_SERVER_URL,
    serverZone: "US",
    useBatch: false
  };
};
var Config = (
  /** @class */
  function() {
    function Config2(options) {
      var _a, _b, _c, _d;
      this._optOut = false;
      var defaultConfig = getDefaultConfig();
      this.apiKey = options.apiKey;
      this.flushIntervalMillis = (_a = options.flushIntervalMillis) !== null && _a !== void 0 ? _a : defaultConfig.flushIntervalMillis;
      this.flushMaxRetries = options.flushMaxRetries || defaultConfig.flushMaxRetries;
      this.flushQueueSize = options.flushQueueSize || defaultConfig.flushQueueSize;
      this.instanceName = options.instanceName || defaultConfig.instanceName;
      this.loggerProvider = options.loggerProvider || defaultConfig.loggerProvider;
      this.logLevel = (_b = options.logLevel) !== null && _b !== void 0 ? _b : defaultConfig.logLevel;
      this.minIdLength = options.minIdLength;
      this.plan = options.plan;
      this.ingestionMetadata = options.ingestionMetadata;
      this.offline = options.offline !== void 0 ? options.offline : defaultConfig.offline;
      this.optOut = (_c = options.optOut) !== null && _c !== void 0 ? _c : defaultConfig.optOut;
      this.serverUrl = options.serverUrl;
      this.serverZone = options.serverZone || defaultConfig.serverZone;
      this.storageProvider = options.storageProvider;
      this.transportProvider = options.transportProvider;
      this.useBatch = (_d = options.useBatch) !== null && _d !== void 0 ? _d : defaultConfig.useBatch;
      this.loggerProvider.enable(this.logLevel);
      var serverConfig = createServerConfig(options.serverUrl, options.serverZone, options.useBatch);
      this.serverZone = serverConfig.serverZone;
      this.serverUrl = serverConfig.serverUrl;
    }
    Object.defineProperty(Config2.prototype, "optOut", {
      get: function() {
        return this._optOut;
      },
      set: function(optOut) {
        this._optOut = optOut;
      },
      enumerable: false,
      configurable: true
    });
    return Config2;
  }()
);
var getServerUrl = function(serverZone, useBatch) {
  if (serverZone === "EU") {
    return useBatch ? EU_AMPLITUDE_BATCH_SERVER_URL : EU_AMPLITUDE_SERVER_URL;
  }
  return useBatch ? AMPLITUDE_BATCH_SERVER_URL : AMPLITUDE_SERVER_URL;
};
var createServerConfig = function(serverUrl, serverZone, useBatch) {
  if (serverUrl === void 0) {
    serverUrl = "";
  }
  if (serverZone === void 0) {
    serverZone = getDefaultConfig().serverZone;
  }
  if (useBatch === void 0) {
    useBatch = getDefaultConfig().useBatch;
  }
  if (serverUrl) {
    return { serverUrl, serverZone: void 0 };
  }
  var _serverZone = ["US", "EU"].includes(serverZone) ? serverZone : getDefaultConfig().serverZone;
  return {
    serverZone: _serverZone,
    serverUrl: getServerUrl(_serverZone, useBatch)
  };
};
var RequestMetadata = (
  /** @class */
  function() {
    function RequestMetadata2() {
      this.sdk = {
        metrics: {
          histogram: {}
        }
      };
    }
    RequestMetadata2.prototype.recordHistogram = function(key, value) {
      this.sdk.metrics.histogram[key] = value;
    };
    return RequestMetadata2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/plugins/destination.js
function getErrorMessage(error) {
  if (error instanceof Error)
    return error.message;
  return String(error);
}
function getResponseBodyString(res) {
  var responseBodyString = "";
  try {
    if ("body" in res) {
      responseBodyString = JSON.stringify(res.body, null, 2);
    }
  } catch (_a) {
  }
  return responseBodyString;
}
var Destination = (
  /** @class */
  function() {
    function Destination2() {
      this.name = "amplitude";
      this.type = "destination";
      this.retryTimeout = 1e3;
      this.throttleTimeout = 3e4;
      this.storageKey = "";
      this.scheduled = null;
      this.queue = [];
    }
    Destination2.prototype.setup = function(config3) {
      var _a;
      return __awaiter(this, void 0, void 0, function() {
        var unsent;
        var _this = this;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              this.config = config3;
              this.storageKey = "".concat(STORAGE_PREFIX, "_").concat(this.config.apiKey.substring(0, 10));
              return [4, (_a = this.config.storageProvider) === null || _a === void 0 ? void 0 : _a.get(this.storageKey)];
            case 1:
              unsent = _b.sent();
              if (unsent && unsent.length > 0) {
                void Promise.all(unsent.map(function(event) {
                  return _this.execute(event);
                })).catch();
              }
              return [2, Promise.resolve(void 0)];
          }
        });
      });
    };
    Destination2.prototype.execute = function(event) {
      var _this = this;
      if (!event.insert_id) {
        event.insert_id = UUID();
      }
      return new Promise(function(resolve) {
        var context2 = {
          event,
          attempts: 0,
          callback: function(result) {
            return resolve(result);
          },
          timeout: 0
        };
        void _this.addToQueue(context2);
      });
    };
    Destination2.prototype.getTryableList = function(list) {
      var _this = this;
      return list.filter(function(context2) {
        if (context2.attempts < _this.config.flushMaxRetries) {
          context2.attempts += 1;
          return true;
        }
        void _this.fulfillRequest([context2], 500, MAX_RETRIES_EXCEEDED_MESSAGE);
        return false;
      });
    };
    Destination2.prototype.scheduleTryable = function(list, shouldAddToQueue) {
      var _this = this;
      if (shouldAddToQueue === void 0) {
        shouldAddToQueue = false;
      }
      list.forEach(function(context2) {
        if (shouldAddToQueue) {
          _this.queue = _this.queue.concat(context2);
        }
        if (context2.timeout === 0) {
          _this.schedule(_this.config.flushIntervalMillis);
          return;
        }
        setTimeout(function() {
          context2.timeout = 0;
          _this.schedule(0);
        }, context2.timeout);
      });
    };
    Destination2.prototype.addToQueue = function() {
      var list = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        list[_i] = arguments[_i];
      }
      var tryable = this.getTryableList(list);
      this.scheduleTryable(tryable, true);
      this.saveEvents();
    };
    Destination2.prototype.schedule = function(timeout2) {
      var _this = this;
      if (this.scheduled || this.config.offline) {
        return;
      }
      this.scheduled = setTimeout(function() {
        void _this.flush(true).then(function() {
          if (_this.queue.length > 0) {
            _this.schedule(timeout2);
          }
        });
      }, timeout2);
    };
    Destination2.prototype.flush = function(useRetry) {
      if (useRetry === void 0) {
        useRetry = false;
      }
      return __awaiter(this, void 0, void 0, function() {
        var list, later, batches;
        var _this = this;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (this.config.offline) {
                this.config.loggerProvider.debug("Skipping flush while offline.");
                return [
                  2
                  /*return*/
                ];
              }
              list = [];
              later = [];
              this.queue.forEach(function(context2) {
                return context2.timeout === 0 ? list.push(context2) : later.push(context2);
              });
              if (this.scheduled) {
                clearTimeout(this.scheduled);
                this.scheduled = null;
              }
              batches = chunk(list, this.config.flushQueueSize);
              return [4, batches.reduce(function(promise, batch) {
                return __awaiter(_this, void 0, void 0, function() {
                  return __generator(this, function(_a2) {
                    switch (_a2.label) {
                      case 0:
                        return [4, promise];
                      case 1:
                        _a2.sent();
                        return [4, this.send(batch, useRetry)];
                      case 2:
                        return [2, _a2.sent()];
                    }
                  });
                });
              }, Promise.resolve())];
            case 1:
              _a.sent();
              this.scheduleTryable(later);
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    Destination2.prototype.send = function(list, useRetry) {
      if (useRetry === void 0) {
        useRetry = true;
      }
      return __awaiter(this, void 0, void 0, function() {
        var payload, serverUrl, res, e_1, errorMessage;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!this.config.apiKey) {
                return [2, this.fulfillRequest(list, 400, MISSING_API_KEY_MESSAGE)];
              }
              payload = {
                api_key: this.config.apiKey,
                events: list.map(function(context2) {
                  var _a2 = context2.event, extra = _a2.extra, eventWithoutExtra = __rest(_a2, ["extra"]);
                  return eventWithoutExtra;
                }),
                options: {
                  min_id_length: this.config.minIdLength
                },
                client_upload_time: (/* @__PURE__ */ new Date()).toISOString(),
                request_metadata: this.config.requestMetadata
              };
              this.config.requestMetadata = new RequestMetadata();
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, , 4]);
              serverUrl = createServerConfig(this.config.serverUrl, this.config.serverZone, this.config.useBatch).serverUrl;
              return [4, this.config.transportProvider.send(serverUrl, payload)];
            case 2:
              res = _a.sent();
              if (res === null) {
                this.fulfillRequest(list, 0, UNEXPECTED_ERROR_MESSAGE);
                return [
                  2
                  /*return*/
                ];
              }
              if (!useRetry) {
                if ("body" in res) {
                  this.fulfillRequest(list, res.statusCode, "".concat(res.status, ": ").concat(getResponseBodyString(res)));
                } else {
                  this.fulfillRequest(list, res.statusCode, res.status);
                }
                return [
                  2
                  /*return*/
                ];
              }
              this.handleResponse(res, list);
              return [3, 4];
            case 3:
              e_1 = _a.sent();
              errorMessage = getErrorMessage(e_1);
              this.config.loggerProvider.error(errorMessage);
              this.handleResponse({ status: Status.Failed, statusCode: 0 }, list);
              return [3, 4];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    Destination2.prototype.handleResponse = function(res, list) {
      var status = res.status;
      switch (status) {
        case Status.Success: {
          this.handleSuccessResponse(res, list);
          break;
        }
        case Status.Invalid: {
          this.handleInvalidResponse(res, list);
          break;
        }
        case Status.PayloadTooLarge: {
          this.handlePayloadTooLargeResponse(res, list);
          break;
        }
        case Status.RateLimit: {
          this.handleRateLimitResponse(res, list);
          break;
        }
        default: {
          this.config.loggerProvider.warn(`{code: 0, error: "Status '`.concat(status, "' provided for ").concat(list.length, ' events"}'));
          this.handleOtherResponse(list);
          break;
        }
      }
    };
    Destination2.prototype.handleSuccessResponse = function(res, list) {
      this.fulfillRequest(list, res.statusCode, SUCCESS_MESSAGE);
    };
    Destination2.prototype.handleInvalidResponse = function(res, list) {
      var _this = this;
      if (res.body.missingField || res.body.error.startsWith(INVALID_API_KEY)) {
        this.fulfillRequest(list, res.statusCode, res.body.error);
        return;
      }
      var dropIndex = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(Object.values(res.body.eventsWithInvalidFields)), false), __read(Object.values(res.body.eventsWithMissingFields)), false), __read(Object.values(res.body.eventsWithInvalidIdLengths)), false), __read(res.body.silencedEvents), false).flat();
      var dropIndexSet = new Set(dropIndex);
      var retry2 = list.filter(function(context2, index2) {
        if (dropIndexSet.has(index2)) {
          _this.fulfillRequest([context2], res.statusCode, res.body.error);
          return;
        }
        return true;
      });
      if (retry2.length > 0) {
        this.config.loggerProvider.warn(getResponseBodyString(res));
      }
      var tryable = this.getTryableList(retry2);
      this.scheduleTryable(tryable);
    };
    Destination2.prototype.handlePayloadTooLargeResponse = function(res, list) {
      if (list.length === 1) {
        this.fulfillRequest(list, res.statusCode, res.body.error);
        return;
      }
      this.config.loggerProvider.warn(getResponseBodyString(res));
      this.config.flushQueueSize /= 2;
      var tryable = this.getTryableList(list);
      this.scheduleTryable(tryable);
    };
    Destination2.prototype.handleRateLimitResponse = function(res, list) {
      var _this = this;
      var dropUserIds = Object.keys(res.body.exceededDailyQuotaUsers);
      var dropDeviceIds = Object.keys(res.body.exceededDailyQuotaDevices);
      var throttledIndex = res.body.throttledEvents;
      var dropUserIdsSet = new Set(dropUserIds);
      var dropDeviceIdsSet = new Set(dropDeviceIds);
      var throttledIndexSet = new Set(throttledIndex);
      var retry2 = list.filter(function(context2, index2) {
        if (context2.event.user_id && dropUserIdsSet.has(context2.event.user_id) || context2.event.device_id && dropDeviceIdsSet.has(context2.event.device_id)) {
          _this.fulfillRequest([context2], res.statusCode, res.body.error);
          return;
        }
        if (throttledIndexSet.has(index2)) {
          context2.timeout = _this.throttleTimeout;
        }
        return true;
      });
      if (retry2.length > 0) {
        this.config.loggerProvider.warn(getResponseBodyString(res));
      }
      var tryable = this.getTryableList(retry2);
      this.scheduleTryable(tryable);
    };
    Destination2.prototype.handleOtherResponse = function(list) {
      var _this = this;
      var later = list.map(function(context2) {
        context2.timeout = context2.attempts * _this.retryTimeout;
        return context2;
      });
      var tryable = this.getTryableList(later);
      this.scheduleTryable(tryable);
    };
    Destination2.prototype.fulfillRequest = function(list, code, message) {
      this.removeEvents(list);
      list.forEach(function(context2) {
        return context2.callback(buildResult(context2.event, code, message));
      });
    };
    Destination2.prototype.saveEvents = function() {
      if (!this.config.storageProvider) {
        return;
      }
      var updatedEvents = this.queue.map(function(context2) {
        return context2.event;
      });
      void this.config.storageProvider.set(this.storageKey, updatedEvents);
    };
    Destination2.prototype.removeEvents = function(eventsToRemove) {
      this.queue = this.queue.filter(function(queuedContext) {
        return !eventsToRemove.some(function(context2) {
          return context2.event.insert_id === queuedContext.event.insert_id;
        });
      });
      this.saveEvents();
    };
    return Destination2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/utils/debug.js
var getStacktrace = function(ignoreDepth) {
  if (ignoreDepth === void 0) {
    ignoreDepth = 0;
  }
  var trace = new Error().stack || "";
  return trace.split("\n").slice(2 + ignoreDepth).map(function(text) {
    return text.trim();
  });
};
var getClientLogConfig = function(client) {
  return function() {
    var _a = __assign({}, client.config), logger = _a.loggerProvider, logLevel = _a.logLevel;
    return {
      logger,
      logLevel
    };
  };
};
var getValueByStringPath = function(obj, path) {
  var e_1, _a;
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  try {
    for (var _b = __values(path.split(".")), _c = _b.next(); !_c.done; _c = _b.next()) {
      var attr2 = _c.value;
      if (attr2 in obj) {
        obj = obj[attr2];
      } else {
        return;
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return obj;
};
var getClientStates = function(client, paths) {
  return function() {
    var e_2, _a;
    var res = {};
    try {
      for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
        var path = paths_1_1.value;
        res[path] = getValueByStringPath(client, path);
      }
    } catch (e_2_1) {
      e_2 = { error: e_2_1 };
    } finally {
      try {
        if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
    return res;
  };
};
var debugWrapper = function(fn, fnName, getLogConfig, getStates, fnContext) {
  if (fnContext === void 0) {
    fnContext = null;
  }
  return function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var _a = getLogConfig(), logger = _a.logger, logLevel = _a.logLevel;
    if (logLevel && logLevel < LogLevel.Debug || !logLevel || !logger) {
      return fn.apply(fnContext, args);
    }
    var debugContext = {
      type: "invoke public method",
      name: fnName,
      args,
      stacktrace: getStacktrace(1),
      time: {
        start: (/* @__PURE__ */ new Date()).toISOString()
      },
      states: {}
    };
    if (getStates && debugContext.states) {
      debugContext.states.before = getStates();
    }
    var result = fn.apply(fnContext, args);
    if (result && result.promise) {
      result.promise.then(function() {
        if (getStates && debugContext.states) {
          debugContext.states.after = getStates();
        }
        if (debugContext.time) {
          debugContext.time.end = (/* @__PURE__ */ new Date()).toISOString();
        }
        logger.debug(JSON.stringify(debugContext, null, 2));
      });
    } else {
      if (getStates && debugContext.states) {
        debugContext.states.after = getStates();
      }
      if (debugContext.time) {
        debugContext.time.end = (/* @__PURE__ */ new Date()).toISOString();
      }
      logger.debug(JSON.stringify(debugContext, null, 2));
    }
    return result;
  };
};

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/storage/memory.js
var MemoryStorage = (
  /** @class */
  function() {
    function MemoryStorage2() {
      this.memoryStorage = /* @__PURE__ */ new Map();
    }
    MemoryStorage2.prototype.isEnabled = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2, true];
        });
      });
    };
    MemoryStorage2.prototype.get = function(key) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2, this.memoryStorage.get(key)];
        });
      });
    };
    MemoryStorage2.prototype.getRaw = function(key) {
      return __awaiter(this, void 0, void 0, function() {
        var value;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.get(key)];
            case 1:
              value = _a.sent();
              return [2, value ? JSON.stringify(value) : void 0];
          }
        });
      });
    };
    MemoryStorage2.prototype.set = function(key, value) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          this.memoryStorage.set(key, value);
          return [
            2
            /*return*/
          ];
        });
      });
    };
    MemoryStorage2.prototype.remove = function(key) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          this.memoryStorage.delete(key);
          return [
            2
            /*return*/
          ];
        });
      });
    };
    MemoryStorage2.prototype.reset = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          this.memoryStorage.clear();
          return [
            2
            /*return*/
          ];
        });
      });
    };
    return MemoryStorage2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-core-npm-2.5.5-e7000e5652-c68e3fb614.zip/node_modules/@amplitude/analytics-core/lib/esm/transports/base.js
var BaseTransport = (
  /** @class */
  function() {
    function BaseTransport2() {
    }
    BaseTransport2.prototype.send = function(_serverUrl, _payload) {
      return Promise.resolve(null);
    };
    BaseTransport2.prototype.buildResponse = function(responseJSON) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
      if (typeof responseJSON !== "object") {
        return null;
      }
      var statusCode = responseJSON.code || 0;
      var status = this.buildStatus(statusCode);
      switch (status) {
        case Status.Success:
          return {
            status,
            statusCode,
            body: {
              eventsIngested: (_a = responseJSON.events_ingested) !== null && _a !== void 0 ? _a : 0,
              payloadSizeBytes: (_b = responseJSON.payload_size_bytes) !== null && _b !== void 0 ? _b : 0,
              serverUploadTime: (_c = responseJSON.server_upload_time) !== null && _c !== void 0 ? _c : 0
            }
          };
        case Status.Invalid:
          return {
            status,
            statusCode,
            body: {
              error: (_d = responseJSON.error) !== null && _d !== void 0 ? _d : "",
              missingField: (_e = responseJSON.missing_field) !== null && _e !== void 0 ? _e : "",
              eventsWithInvalidFields: (_f = responseJSON.events_with_invalid_fields) !== null && _f !== void 0 ? _f : {},
              eventsWithMissingFields: (_g = responseJSON.events_with_missing_fields) !== null && _g !== void 0 ? _g : {},
              eventsWithInvalidIdLengths: (_h = responseJSON.events_with_invalid_id_lengths) !== null && _h !== void 0 ? _h : {},
              epsThreshold: (_j = responseJSON.eps_threshold) !== null && _j !== void 0 ? _j : 0,
              exceededDailyQuotaDevices: (_k = responseJSON.exceeded_daily_quota_devices) !== null && _k !== void 0 ? _k : {},
              silencedDevices: (_l = responseJSON.silenced_devices) !== null && _l !== void 0 ? _l : [],
              silencedEvents: (_m = responseJSON.silenced_events) !== null && _m !== void 0 ? _m : [],
              throttledDevices: (_o = responseJSON.throttled_devices) !== null && _o !== void 0 ? _o : {},
              throttledEvents: (_p = responseJSON.throttled_events) !== null && _p !== void 0 ? _p : []
            }
          };
        case Status.PayloadTooLarge:
          return {
            status,
            statusCode,
            body: {
              error: (_q = responseJSON.error) !== null && _q !== void 0 ? _q : ""
            }
          };
        case Status.RateLimit:
          return {
            status,
            statusCode,
            body: {
              error: (_r = responseJSON.error) !== null && _r !== void 0 ? _r : "",
              epsThreshold: (_s = responseJSON.eps_threshold) !== null && _s !== void 0 ? _s : 0,
              throttledDevices: (_t = responseJSON.throttled_devices) !== null && _t !== void 0 ? _t : {},
              throttledUsers: (_u = responseJSON.throttled_users) !== null && _u !== void 0 ? _u : {},
              exceededDailyQuotaDevices: (_v = responseJSON.exceeded_daily_quota_devices) !== null && _v !== void 0 ? _v : {},
              exceededDailyQuotaUsers: (_w = responseJSON.exceeded_daily_quota_users) !== null && _w !== void 0 ? _w : {},
              throttledEvents: (_x = responseJSON.throttled_events) !== null && _x !== void 0 ? _x : []
            }
          };
        case Status.Timeout:
        default:
          return {
            status,
            statusCode
          };
      }
    };
    BaseTransport2.prototype.buildStatus = function(code) {
      if (code >= 200 && code < 300) {
        return Status.Success;
      }
      if (code === 429) {
        return Status.RateLimit;
      }
      if (code === 413) {
        return Status.PayloadTooLarge;
      }
      if (code === 408) {
        return Status.Timeout;
      }
      if (code >= 400 && code < 500) {
        return Status.Invalid;
      }
      if (code >= 500) {
        return Status.Failed;
      }
      return Status.Unknown;
    };
    return BaseTransport2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/global-scope.js
var getGlobalScope = function() {
  var ampIntegrationContextName = "ampIntegrationContext";
  if (typeof globalThis !== "undefined" && typeof globalThis[ampIntegrationContextName] !== "undefined") {
    return globalThis[ampIntegrationContextName];
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  return void 0;
};

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/query-params.js
var getQueryParams = function() {
  var _a;
  var globalScope = getGlobalScope();
  if (!((_a = globalScope === null || globalScope === void 0 ? void 0 : globalScope.location) === null || _a === void 0 ? void 0 : _a.search)) {
    return {};
  }
  var pairs2 = globalScope.location.search.substring(1).split("&").filter(Boolean);
  var params = pairs2.reduce(function(acc, curr) {
    var query = curr.split("=", 2);
    var key = tryDecodeURIComponent(query[0]);
    var value = tryDecodeURIComponent(query[1]);
    if (!value) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  return params;
};
var tryDecodeURIComponent = function(value) {
  if (value === void 0) {
    value = "";
  }
  try {
    return decodeURIComponent(value);
  } catch (_a) {
    return "";
  }
};

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/attribution/constants.js
var UTM_CAMPAIGN = "utm_campaign";
var UTM_CONTENT = "utm_content";
var UTM_ID = "utm_id";
var UTM_MEDIUM = "utm_medium";
var UTM_SOURCE = "utm_source";
var UTM_TERM = "utm_term";
var DCLID = "dclid";
var FBCLID = "fbclid";
var GBRAID = "gbraid";
var GCLID = "gclid";
var KO_CLICK_ID = "ko_click_id";
var LI_FAT_ID = "li_fat_id";
var MSCLKID = "msclkid";
var RDT_CID = "rtd_cid";
var TTCLID = "ttclid";
var TWCLID = "twclid";
var WBRAID = "wbraid";
var EMPTY_VALUE = "EMPTY";
var BASE_CAMPAIGN = {
  utm_campaign: void 0,
  utm_content: void 0,
  utm_id: void 0,
  utm_medium: void 0,
  utm_source: void 0,
  utm_term: void 0,
  referrer: void 0,
  referring_domain: void 0,
  dclid: void 0,
  gbraid: void 0,
  gclid: void 0,
  fbclid: void 0,
  ko_click_id: void 0,
  li_fat_id: void 0,
  msclkid: void 0,
  rtd_cid: void 0,
  ttclid: void 0,
  twclid: void 0,
  wbraid: void 0
};
var MKTG = "MKTG";

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/attribution/campaign-parser.js
var CampaignParser = (
  /** @class */
  function() {
    function CampaignParser2() {
    }
    CampaignParser2.prototype.parse = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2, __assign(__assign(__assign(__assign({}, BASE_CAMPAIGN), this.getUtmParam()), this.getReferrer()), this.getClickIds())];
        });
      });
    };
    CampaignParser2.prototype.getUtmParam = function() {
      var params = getQueryParams();
      var utmCampaign = params[UTM_CAMPAIGN];
      var utmContent = params[UTM_CONTENT];
      var utmId = params[UTM_ID];
      var utmMedium = params[UTM_MEDIUM];
      var utmSource = params[UTM_SOURCE];
      var utmTerm = params[UTM_TERM];
      return {
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        utm_id: utmId,
        utm_medium: utmMedium,
        utm_source: utmSource,
        utm_term: utmTerm
      };
    };
    CampaignParser2.prototype.getReferrer = function() {
      var _a, _b;
      var data = {
        referrer: void 0,
        referring_domain: void 0
      };
      try {
        data.referrer = document.referrer || void 0;
        data.referring_domain = (_b = (_a = data.referrer) === null || _a === void 0 ? void 0 : _a.split("/")[2]) !== null && _b !== void 0 ? _b : void 0;
      } catch (_c) {
      }
      return data;
    };
    CampaignParser2.prototype.getClickIds = function() {
      var _a;
      var params = getQueryParams();
      return _a = {}, _a[DCLID] = params[DCLID], _a[FBCLID] = params[FBCLID], _a[GBRAID] = params[GBRAID], _a[GCLID] = params[GCLID], _a[KO_CLICK_ID] = params[KO_CLICK_ID], _a[LI_FAT_ID] = params[LI_FAT_ID], _a[MSCLKID] = params[MSCLKID], _a[RDT_CID] = params[RDT_CID], _a[TTCLID] = params[TTCLID], _a[TWCLID] = params[TWCLID], _a[WBRAID] = params[WBRAID], _a;
    };
    return CampaignParser2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/cookie-name.js
var getCookieName = function(apiKey, postKey, limit) {
  if (postKey === void 0) {
    postKey = "";
  }
  if (limit === void 0) {
    limit = 10;
  }
  return [AMPLITUDE_PREFIX, postKey, apiKey.substring(0, limit)].filter(Boolean).join("_");
};
var getOldCookieName = function(apiKey) {
  return "".concat(AMPLITUDE_PREFIX.toLowerCase(), "_").concat(apiKey.substring(0, 6));
};

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/attribution/campaign-tracker.js
var CampaignTracker = (
  /** @class */
  function() {
    function CampaignTracker2(apiKey, options) {
      var _a, _b;
      this.storage = options.storage;
      this.storageKey = getCookieName(apiKey, MKTG);
      this.parser = new CampaignParser();
      this.track = options.track;
      this.onNewCampaign = options.onNewCampaign;
      this.disabled = Boolean(options.disabled);
      this.trackNewCampaigns = Boolean(options.trackNewCampaigns);
      this.trackPageViews = Boolean(options.trackPageViews);
      this.excludeReferrers = (_a = options.excludeReferrers) !== null && _a !== void 0 ? _a : [];
      if (typeof location !== "undefined") {
        this.excludeReferrers.unshift(location.hostname);
      }
      this.initialEmptyValue = (_b = options.initialEmptyValue) !== null && _b !== void 0 ? _b : EMPTY_VALUE;
    }
    CampaignTracker2.prototype.isNewCampaign = function(current, previous, ignoreSubdomainInReferrer) {
      if (ignoreSubdomainInReferrer === void 0) {
        ignoreSubdomainInReferrer = false;
      }
      var referrer = current.referrer, referring_domain = current.referring_domain, currentCampaign = __rest(current, ["referrer", "referring_domain"]);
      var _a = previous || {}, _previous_referrer = _a.referrer, prevReferringDomain = _a.referring_domain, previousCampaign = __rest(_a, ["referrer", "referring_domain"]);
      if (current.referring_domain && this.excludeReferrers.includes(current.referring_domain)) {
        return false;
      }
      var hasNewCampaign = JSON.stringify(currentCampaign) !== JSON.stringify(previousCampaign);
      var hasNewDomain = ignoreSubdomainInReferrer ? domainWithoutSubdomain(referring_domain || "") !== domainWithoutSubdomain(prevReferringDomain || "") : referring_domain !== prevReferringDomain;
      return !previous || hasNewCampaign || hasNewDomain;
    };
    CampaignTracker2.prototype.saveCampaignToStorage = function(campaign) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.storage.set(this.storageKey, campaign)];
            case 1:
              _a.sent();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CampaignTracker2.prototype.getCampaignFromStorage = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.storage.get(this.storageKey)];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    CampaignTracker2.prototype.createCampaignEvent = function(campaign) {
      var _this = this;
      var campaignParameters = __assign(__assign({}, BASE_CAMPAIGN), campaign);
      var identifyEvent = Object.entries(campaignParameters).reduce(function(identify2, _a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        identify2.setOnce("initial_".concat(key), value || _this.initialEmptyValue);
        if (value) {
          return identify2.set(key, value);
        }
        return identify2.unset(key);
      }, new Identify());
      var pageViewEvent = {
        event_type: "Page View",
        event_properties: {
          page_title: (
            /* istanbul ignore next */
            typeof document !== "undefined" && document.title || ""
          ),
          page_location: (
            /* istanbul ignore next */
            typeof location !== "undefined" && location.href || ""
          ),
          page_path: (
            /* istanbul ignore next */
            typeof location !== "undefined" && location.pathname || ""
          )
        }
      };
      return __assign(__assign({}, createIdentifyEvent(identifyEvent)), this.trackPageViews && pageViewEvent);
    };
    CampaignTracker2.prototype.send = function(isNewSession2) {
      return __awaiter(this, void 0, void 0, function() {
        var currentCampaign, previousCampaign;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (this.disabled) {
                return [
                  2
                  /*return*/
                ];
              }
              return [4, this.parser.parse()];
            case 1:
              currentCampaign = _a.sent();
              return [4, this.getCampaignFromStorage()];
            case 2:
              previousCampaign = _a.sent();
              if (!isNewSession2) {
                if (!this.trackNewCampaigns || !this.isNewCampaign(currentCampaign, previousCampaign)) {
                  return [
                    2
                    /*return*/
                  ];
                }
                this.onNewCampaign(currentCampaign);
              }
              return [4, this.track(this.createCampaignEvent(currentCampaign))];
            case 3:
              _a.sent();
              return [4, this.saveCampaignToStorage(currentCampaign)];
            case 4:
              _a.sent();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    return CampaignTracker2;
  }()
);
var domainWithoutSubdomain = function(domain) {
  var parts = domain.split(".");
  if (parts.length <= 2) {
    return domain;
  }
  return parts.slice(parts.length - 2, parts.length).join(".");
};

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/attribution/helpers.js
var domainWithoutSubdomain2 = function(domain) {
  var parts = domain.split(".");
  if (parts.length <= 2) {
    return domain;
  }
  return parts.slice(parts.length - 2, parts.length).join(".");
};
var isDirectTraffic = function(current) {
  return Object.values(current).every(function(value) {
    return !value;
  });
};
var isNewCampaign = function(current, previous, options, logger, isNewSession2) {
  if (isNewSession2 === void 0) {
    isNewSession2 = true;
  }
  var referrer = current.referrer, referring_domain = current.referring_domain, currentCampaign = __rest(current, ["referrer", "referring_domain"]);
  var _a = previous || {}, _previous_referrer = _a.referrer, prevReferringDomain = _a.referring_domain, previousCampaign = __rest(_a, ["referrer", "referring_domain"]);
  if (isExcludedReferrer(options.excludeReferrers, current.referring_domain)) {
    logger.debug("This is not a new campaign because ".concat(current.referring_domain, " is in the exclude referrer list."));
    return false;
  }
  if (!isNewSession2 && isDirectTraffic(current) && previous) {
    logger.debug("This is not a new campaign because this is a direct traffic in the same session.");
    return false;
  }
  var hasNewCampaign = JSON.stringify(currentCampaign) !== JSON.stringify(previousCampaign);
  var hasNewDomain = domainWithoutSubdomain2(referring_domain || "") !== domainWithoutSubdomain2(prevReferringDomain || "");
  var result = !previous || hasNewCampaign || hasNewDomain;
  if (!result) {
    logger.debug("This is not a new campaign because it's the same as the previous one.");
  } else {
    logger.debug("This is a new campaign. An $identify event will be sent.");
  }
  return result;
};
var isExcludedReferrer = function(excludeReferrers, referringDomain) {
  if (excludeReferrers === void 0) {
    excludeReferrers = [];
  }
  if (referringDomain === void 0) {
    referringDomain = "";
  }
  return excludeReferrers.some(function(value) {
    return value instanceof RegExp ? value.test(referringDomain) : value === referringDomain;
  });
};
var createCampaignEvent = function(campaign, options) {
  var campaignParameters = __assign(__assign({}, BASE_CAMPAIGN), campaign);
  var identifyEvent = Object.entries(campaignParameters).reduce(function(identify2, _a) {
    var _b;
    var _c = __read(_a, 2), key = _c[0], value = _c[1];
    identify2.setOnce("initial_".concat(key), (_b = value !== null && value !== void 0 ? value : options.initialEmptyValue) !== null && _b !== void 0 ? _b : "EMPTY");
    if (value) {
      return identify2.set(key, value);
    }
    return identify2.unset(key);
  }, new Identify());
  return createIdentifyEvent(identifyEvent);
};
var getDefaultExcludedReferrers = function(cookieDomain) {
  var domain = cookieDomain;
  if (domain) {
    if (domain.startsWith(".")) {
      domain = domain.substring(1);
    }
    return [new RegExp("".concat(domain.replace(".", "\\."), "$"))];
  }
  return [];
};

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/storage/helpers.js
var getStorageKey = function(apiKey, postKey, limit) {
  if (postKey === void 0) {
    postKey = "";
  }
  if (limit === void 0) {
    limit = 10;
  }
  return [AMPLITUDE_PREFIX, postKey, apiKey.substring(0, limit)].filter(Boolean).join("_");
};

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/session.js
var isNewSession = function(sessionTimeout, lastEventTime) {
  if (lastEventTime === void 0) {
    lastEventTime = Date.now();
  }
  var currentTime = Date.now();
  var timeSinceLastEvent = currentTime - lastEventTime;
  return timeSinceLastEvent > sessionTimeout;
};

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/attribution/web-attribution.js
var WebAttribution = (
  /** @class */
  function() {
    function WebAttribution2(options, config3) {
      var _a;
      this.shouldTrackNewCampaign = false;
      this.options = __assign({ initialEmptyValue: "EMPTY", resetSessionOnNewCampaign: false, excludeReferrers: getDefaultExcludedReferrers((_a = config3.cookieOptions) === null || _a === void 0 ? void 0 : _a.domain) }, options);
      this.storage = config3.cookieStorage;
      this.storageKey = getStorageKey(config3.apiKey, "MKTG");
      this.currentCampaign = BASE_CAMPAIGN;
      this.sessionTimeout = config3.sessionTimeout;
      this.lastEventTime = config3.lastEventTime;
      this.logger = config3.loggerProvider;
      config3.loggerProvider.log("Installing web attribution tracking.");
    }
    WebAttribution2.prototype.init = function() {
      return __awaiter(this, void 0, void 0, function() {
        var isEventInNewSession;
        var _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              return [4, this.fetchCampaign()];
            case 1:
              _a = __read.apply(void 0, [_b.sent(), 2]), this.currentCampaign = _a[0], this.previousCampaign = _a[1];
              isEventInNewSession = !this.lastEventTime ? true : isNewSession(this.sessionTimeout, this.lastEventTime);
              if (!isNewCampaign(this.currentCampaign, this.previousCampaign, this.options, this.logger, isEventInNewSession)) return [3, 3];
              this.shouldTrackNewCampaign = true;
              return [4, this.storage.set(this.storageKey, this.currentCampaign)];
            case 2:
              _b.sent();
              _b.label = 3;
            case 3:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    WebAttribution2.prototype.fetchCampaign = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, Promise.all([new CampaignParser().parse(), this.storage.get(this.storageKey)])];
            case 1:
              return [2, _a.sent()];
          }
        });
      });
    };
    WebAttribution2.prototype.generateCampaignEvent = function(event_id) {
      this.shouldTrackNewCampaign = false;
      var campaignEvent = createCampaignEvent(this.currentCampaign, this.options);
      if (event_id) {
        campaignEvent.event_id = event_id;
      }
      return campaignEvent;
    };
    WebAttribution2.prototype.shouldSetSessionIdOnNewCampaign = function() {
      return this.shouldTrackNewCampaign && !!this.options.resetSessionOnNewCampaign;
    };
    return WebAttribution2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/storage/cookie.js
var CookieStorage = (
  /** @class */
  function() {
    function CookieStorage2(options) {
      this.options = __assign({}, options);
    }
    CookieStorage2.prototype.isEnabled = function() {
      return __awaiter(this, void 0, void 0, function() {
        var testStrorage, testKey, value, _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              if (!getGlobalScope()) {
                return [2, false];
              }
              CookieStorage2.testValue = String(Date.now());
              testStrorage = new CookieStorage2(this.options);
              testKey = "AMP_TEST";
              _b.label = 1;
            case 1:
              _b.trys.push([1, 4, 5, 7]);
              return [4, testStrorage.set(testKey, CookieStorage2.testValue)];
            case 2:
              _b.sent();
              return [4, testStrorage.get(testKey)];
            case 3:
              value = _b.sent();
              return [2, value === CookieStorage2.testValue];
            case 4:
              _a = _b.sent();
              return [2, false];
            case 5:
              return [4, testStrorage.remove(testKey)];
            case 6:
              _b.sent();
              return [
                7
                /*endfinally*/
              ];
            case 7:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CookieStorage2.prototype.get = function(key) {
      var _a;
      return __awaiter(this, void 0, void 0, function() {
        var value, decodedValue;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              return [4, this.getRaw(key)];
            case 1:
              value = _b.sent();
              if (!value) {
                return [2, void 0];
              }
              try {
                decodedValue = (_a = decodeCookiesAsDefault(value)) !== null && _a !== void 0 ? _a : decodeCookiesWithDoubleUrlEncoding(value);
                if (decodedValue === void 0) {
                  console.error("Amplitude Logger [Error]: Failed to decode cookie value for key: ".concat(key, ", value: ").concat(value));
                  return [2, void 0];
                }
                return [2, JSON.parse(decodedValue)];
              } catch (_c) {
                console.error("Amplitude Logger [Error]: Failed to parse cookie value for key: ".concat(key, ", value: ").concat(value));
                return [2, void 0];
              }
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CookieStorage2.prototype.getRaw = function(key) {
      var _a, _b;
      return __awaiter(this, void 0, void 0, function() {
        var globalScope, cookie, match;
        return __generator(this, function(_c) {
          globalScope = getGlobalScope();
          cookie = (_b = (_a = globalScope === null || globalScope === void 0 ? void 0 : globalScope.document) === null || _a === void 0 ? void 0 : _a.cookie.split("; ")) !== null && _b !== void 0 ? _b : [];
          match = cookie.find(function(c) {
            return c.indexOf(key + "=") === 0;
          });
          if (!match) {
            return [2, void 0];
          }
          return [2, match.substring(key.length + 1)];
        });
      });
    };
    CookieStorage2.prototype.set = function(key, value) {
      var _a;
      return __awaiter(this, void 0, void 0, function() {
        var expirationDays, expires, expireDate, date, str, globalScope, errorMessage;
        return __generator(this, function(_b) {
          try {
            expirationDays = (_a = this.options.expirationDays) !== null && _a !== void 0 ? _a : 0;
            expires = value !== null ? expirationDays : -1;
            expireDate = void 0;
            if (expires) {
              date = /* @__PURE__ */ new Date();
              date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1e3);
              expireDate = date;
            }
            str = "".concat(key, "=").concat(btoa(encodeURIComponent(JSON.stringify(value))));
            if (expireDate) {
              str += "; expires=".concat(expireDate.toUTCString());
            }
            str += "; path=/";
            if (this.options.domain) {
              str += "; domain=".concat(this.options.domain);
            }
            if (this.options.secure) {
              str += "; Secure";
            }
            if (this.options.sameSite) {
              str += "; SameSite=".concat(this.options.sameSite);
            }
            globalScope = getGlobalScope();
            if (globalScope) {
              globalScope.document.cookie = str;
            }
          } catch (error) {
            errorMessage = error instanceof Error ? error.message : String(error);
            console.error("Amplitude Logger [Error]: Failed to set cookie for key: ".concat(key, ". Error: ").concat(errorMessage));
          }
          return [
            2
            /*return*/
          ];
        });
      });
    };
    CookieStorage2.prototype.remove = function(key) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, this.set(key, null)];
            case 1:
              _a.sent();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    CookieStorage2.prototype.reset = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [
            2
            /*return*/
          ];
        });
      });
    };
    return CookieStorage2;
  }()
);
var decodeCookiesAsDefault = function(value) {
  try {
    return decodeURIComponent(atob(value));
  } catch (_a) {
    return void 0;
  }
};
var decodeCookiesWithDoubleUrlEncoding = function(value) {
  try {
    return decodeURIComponent(atob(decodeURIComponent(value)));
  } catch (_a) {
    return void 0;
  }
};

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/transports/fetch.js
var FetchTransport = (
  /** @class */
  function(_super) {
    __extends(FetchTransport2, _super);
    function FetchTransport2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    FetchTransport2.prototype.send = function(serverUrl, payload) {
      return __awaiter(this, void 0, void 0, function() {
        var options, response, responseText;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (typeof fetch === "undefined") {
                throw new Error("FetchTransport is not supported");
              }
              options = {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "*/*"
                },
                body: JSON.stringify(payload),
                method: "POST"
              };
              return [4, fetch(serverUrl, options)];
            case 1:
              response = _a.sent();
              return [4, response.text()];
            case 2:
              responseText = _a.sent();
              try {
                return [2, this.buildResponse(JSON.parse(responseText))];
              } catch (_b) {
                return [2, this.buildResponse({ code: response.status })];
              }
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    return FetchTransport2;
  }(BaseTransport)
);

// ../../.yarn/cache/@amplitude-analytics-connector-npm-1.6.2-4840891850-b9653ce55b.zip/node_modules/@amplitude/analytics-connector/dist/analytics-connector.esm.js
var ApplicationContextProviderImpl = (
  /** @class */
  function() {
    function ApplicationContextProviderImpl2() {
    }
    ApplicationContextProviderImpl2.prototype.getApplicationContext = function() {
      return {
        versionName: this.versionName,
        language: getLanguage(),
        platform: "Web",
        os: void 0,
        deviceModel: void 0
      };
    };
    return ApplicationContextProviderImpl2;
  }()
);
var getLanguage = function() {
  return typeof navigator !== "undefined" && (navigator.languages && navigator.languages[0] || navigator.language) || "";
};
var EventBridgeImpl = (
  /** @class */
  function() {
    function EventBridgeImpl2() {
      this.queue = [];
    }
    EventBridgeImpl2.prototype.logEvent = function(event) {
      if (!this.receiver) {
        if (this.queue.length < 512) {
          this.queue.push(event);
        }
      } else {
        this.receiver(event);
      }
    };
    EventBridgeImpl2.prototype.setEventReceiver = function(receiver) {
      this.receiver = receiver;
      if (this.queue.length > 0) {
        this.queue.forEach(function(event) {
          receiver(event);
        });
        this.queue = [];
      }
    };
    return EventBridgeImpl2;
  }()
);
var __assign2 = function() {
  __assign2 = Object.assign || function __assign3(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
function __values2(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read2(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
var isEqual = function(obj1, obj2) {
  var e_1, _a;
  var primitive = ["string", "number", "boolean", "undefined"];
  var typeA = typeof obj1;
  var typeB = typeof obj2;
  if (typeA !== typeB) {
    return false;
  }
  try {
    for (var primitive_1 = __values2(primitive), primitive_1_1 = primitive_1.next(); !primitive_1_1.done; primitive_1_1 = primitive_1.next()) {
      var p = primitive_1_1.value;
      if (p === typeA) {
        return obj1 === obj2;
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (primitive_1_1 && !primitive_1_1.done && (_a = primitive_1.return)) _a.call(primitive_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  if (obj1 == null && obj2 == null) {
    return true;
  } else if (obj1 == null || obj2 == null) {
    return false;
  }
  if (obj1.length !== obj2.length) {
    return false;
  }
  var isArrayA = Array.isArray(obj1);
  var isArrayB = Array.isArray(obj2);
  if (isArrayA !== isArrayB) {
    return false;
  }
  if (isArrayA && isArrayB) {
    for (var i = 0; i < obj1.length; i++) {
      if (!isEqual(obj1[i], obj2[i])) {
        return false;
      }
    }
  } else {
    var sorted1 = Object.keys(obj1).sort();
    var sorted2 = Object.keys(obj2).sort();
    if (!isEqual(sorted1, sorted2)) {
      return false;
    }
    var result_1 = true;
    Object.keys(obj1).forEach(function(key) {
      if (!isEqual(obj1[key], obj2[key])) {
        result_1 = false;
      }
    });
    return result_1;
  }
  return true;
};
var ID_OP_SET = "$set";
var ID_OP_UNSET = "$unset";
var ID_OP_CLEAR_ALL = "$clearAll";
if (!Object.entries) {
  Object.entries = function(obj) {
    var ownProps = Object.keys(obj);
    var i = ownProps.length;
    var resArray = new Array(i);
    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }
    return resArray;
  };
}
var IdentityStoreImpl = (
  /** @class */
  function() {
    function IdentityStoreImpl2() {
      this.identity = { userProperties: {} };
      this.listeners = /* @__PURE__ */ new Set();
    }
    IdentityStoreImpl2.prototype.editIdentity = function() {
      var self2 = this;
      var actingUserProperties = __assign2({}, this.identity.userProperties);
      var actingIdentity = __assign2(__assign2({}, this.identity), { userProperties: actingUserProperties });
      return {
        setUserId: function(userId) {
          actingIdentity.userId = userId;
          return this;
        },
        setDeviceId: function(deviceId) {
          actingIdentity.deviceId = deviceId;
          return this;
        },
        setUserProperties: function(userProperties) {
          actingIdentity.userProperties = userProperties;
          return this;
        },
        setOptOut: function(optOut) {
          actingIdentity.optOut = optOut;
          return this;
        },
        updateUserProperties: function(actions) {
          var e_1, _a, e_2, _b, e_3, _c;
          var actingProperties = actingIdentity.userProperties || {};
          try {
            for (var _d = __values2(Object.entries(actions)), _e = _d.next(); !_e.done; _e = _d.next()) {
              var _f = __read2(_e.value, 2), action = _f[0], properties = _f[1];
              switch (action) {
                case ID_OP_SET:
                  try {
                    for (var _g = (e_2 = void 0, __values2(Object.entries(properties))), _h = _g.next(); !_h.done; _h = _g.next()) {
                      var _j = __read2(_h.value, 2), key = _j[0], value = _j[1];
                      actingProperties[key] = value;
                    }
                  } catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                  } finally {
                    try {
                      if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                    } finally {
                      if (e_2) throw e_2.error;
                    }
                  }
                  break;
                case ID_OP_UNSET:
                  try {
                    for (var _k = (e_3 = void 0, __values2(Object.keys(properties))), _l = _k.next(); !_l.done; _l = _k.next()) {
                      var key = _l.value;
                      delete actingProperties[key];
                    }
                  } catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                  } finally {
                    try {
                      if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                    } finally {
                      if (e_3) throw e_3.error;
                    }
                  }
                  break;
                case ID_OP_CLEAR_ALL:
                  actingProperties = {};
                  break;
              }
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          actingIdentity.userProperties = actingProperties;
          return this;
        },
        commit: function() {
          self2.setIdentity(actingIdentity);
          return this;
        }
      };
    };
    IdentityStoreImpl2.prototype.getIdentity = function() {
      return __assign2({}, this.identity);
    };
    IdentityStoreImpl2.prototype.setIdentity = function(identity2) {
      var originalIdentity = __assign2({}, this.identity);
      this.identity = __assign2({}, identity2);
      if (!isEqual(originalIdentity, this.identity)) {
        this.listeners.forEach(function(listener) {
          listener(identity2);
        });
      }
    };
    IdentityStoreImpl2.prototype.addIdentityListener = function(listener) {
      this.listeners.add(listener);
    };
    IdentityStoreImpl2.prototype.removeIdentityListener = function(listener) {
      this.listeners.delete(listener);
    };
    return IdentityStoreImpl2;
  }()
);
var safeGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : self;
var AnalyticsConnector = (
  /** @class */
  function() {
    function AnalyticsConnector2() {
      this.identityStore = new IdentityStoreImpl();
      this.eventBridge = new EventBridgeImpl();
      this.applicationContextProvider = new ApplicationContextProviderImpl();
    }
    AnalyticsConnector2.getInstance = function(instanceName) {
      if (!safeGlobal["analyticsConnectorInstances"]) {
        safeGlobal["analyticsConnectorInstances"] = {};
      }
      if (!safeGlobal["analyticsConnectorInstances"][instanceName]) {
        safeGlobal["analyticsConnectorInstances"][instanceName] = new AnalyticsConnector2();
      }
      return safeGlobal["analyticsConnectorInstances"][instanceName];
    };
    return AnalyticsConnector2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/analytics-connector.js
var getAnalyticsConnector = function(instanceName) {
  if (instanceName === void 0) {
    instanceName = "$default_instance";
  }
  return AnalyticsConnector.getInstance(instanceName);
};
var setConnectorUserId = function(userId, instanceName) {
  getAnalyticsConnector(instanceName).identityStore.editIdentity().setUserId(userId).commit();
};
var setConnectorDeviceId = function(deviceId, instanceName) {
  getAnalyticsConnector(instanceName).identityStore.editIdentity().setDeviceId(deviceId).commit();
};

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/plugins/identity.js
var IdentityEventSender = (
  /** @class */
  function() {
    function IdentityEventSender2() {
      this.name = "identity";
      this.type = "before";
      this.identityStore = getAnalyticsConnector().identityStore;
    }
    IdentityEventSender2.prototype.execute = function(context2) {
      return __awaiter(this, void 0, void 0, function() {
        var userProperties;
        return __generator(this, function(_a) {
          userProperties = context2.user_properties;
          if (userProperties) {
            this.identityStore.editIdentity().updateUserProperties(userProperties).commit();
          }
          return [2, context2];
        });
      });
    };
    IdentityEventSender2.prototype.setup = function(config3) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          if (config3.instanceName) {
            this.identityStore = getAnalyticsConnector(config3.instanceName).identityStore;
          }
          return [
            2
            /*return*/
          ];
        });
      });
    };
    return IdentityEventSender2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/language.js
var getLanguage2 = function() {
  var _a, _b, _c, _d;
  if (typeof navigator === "undefined")
    return "";
  var userLanguage = navigator.userLanguage;
  return (_d = (_c = (_b = (_a = navigator.languages) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : navigator.language) !== null && _c !== void 0 ? _c : userLanguage) !== null && _d !== void 0 ? _d : "";
};

// ../../.yarn/cache/@amplitude-analytics-client-common-npm-2.3.7-d57dc99580-c1ecb7493b.zip/node_modules/@amplitude/analytics-client-common/lib/esm/default-tracking.js
var isTrackingEnabled = function(autocapture, event) {
  if (typeof autocapture === "boolean") {
    return autocapture;
  }
  if ((autocapture === null || autocapture === void 0 ? void 0 : autocapture[event]) === false) {
    return false;
  }
  return true;
};
var isAttributionTrackingEnabled = function(autocapture) {
  return isTrackingEnabled(autocapture, "attribution");
};
var isFileDownloadTrackingEnabled = function(autocapture) {
  return isTrackingEnabled(autocapture, "fileDownloads");
};
var isFormInteractionTrackingEnabled = function(autocapture) {
  return isTrackingEnabled(autocapture, "formInteractions");
};
var isPageViewTrackingEnabled = function(autocapture) {
  return isTrackingEnabled(autocapture, "pageViews");
};
var isSessionTrackingEnabled = function(autocapture) {
  return isTrackingEnabled(autocapture, "sessions");
};
var isElementInteractionsEnabled = function(autocapture) {
  if (typeof autocapture === "boolean") {
    return autocapture;
  }
  if (typeof autocapture === "object" && (autocapture.elementInteractions === true || typeof autocapture.elementInteractions === "object")) {
    return true;
  }
  return false;
};
var getElementInteractionsConfig = function(config3) {
  if (isElementInteractionsEnabled(config3.autocapture) && typeof config3.autocapture === "object" && typeof config3.autocapture.elementInteractions === "object") {
    return config3.autocapture.elementInteractions;
  }
  return void 0;
};
var getPageViewTrackingConfig = function(config3) {
  var trackOn = function() {
    return false;
  };
  var trackHistoryChanges = void 0;
  var eventType;
  var pageCounter = config3.pageCounter;
  var isDefaultPageViewTrackingEnabled = isPageViewTrackingEnabled(config3.defaultTracking);
  if (isDefaultPageViewTrackingEnabled) {
    trackOn = void 0;
    eventType = void 0;
    if (config3.defaultTracking && typeof config3.defaultTracking === "object" && config3.defaultTracking.pageViews && typeof config3.defaultTracking.pageViews === "object") {
      if ("trackOn" in config3.defaultTracking.pageViews) {
        trackOn = config3.defaultTracking.pageViews.trackOn;
      }
      if ("trackHistoryChanges" in config3.defaultTracking.pageViews) {
        trackHistoryChanges = config3.defaultTracking.pageViews.trackHistoryChanges;
      }
      if ("eventType" in config3.defaultTracking.pageViews && config3.defaultTracking.pageViews.eventType) {
        eventType = config3.defaultTracking.pageViews.eventType;
      }
    }
  }
  return {
    trackOn,
    trackHistoryChanges,
    eventType,
    pageCounter
  };
};
var getAttributionTrackingConfig = function(config3) {
  if (isAttributionTrackingEnabled(config3.defaultTracking) && config3.defaultTracking && typeof config3.defaultTracking === "object" && config3.defaultTracking.attribution && typeof config3.defaultTracking.attribution === "object") {
    return __assign({}, config3.defaultTracking.attribution);
  }
  return {};
};

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/utils/snippet-helper.js
var runQueuedFunctions = function(instance, queue2) {
  convertProxyObjectToRealObject(instance, queue2);
};
var convertProxyObjectToRealObject = function(instance, queue2) {
  for (var i = 0; i < queue2.length; i++) {
    var _a = queue2[i], name_1 = _a.name, args = _a.args, resolve = _a.resolve;
    var fn = instance && instance[name_1];
    if (typeof fn === "function") {
      var result = fn.apply(instance, args);
      if (typeof resolve === "function") {
        resolve(result === null || result === void 0 ? void 0 : result.promise);
      }
    }
  }
  return instance;
};
var isInstanceProxy = function(instance) {
  var instanceProxy = instance;
  return instanceProxy && instanceProxy._q !== void 0;
};

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/version.js
var VERSION = "2.11.11";

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/lib-prefix.js
var LIBPREFIX = "amplitude-ts";

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/plugins/context.js
var BROWSER_PLATFORM = "Web";
var IP_ADDRESS = "$remote";
var Context = (
  /** @class */
  function() {
    function Context2() {
      this.name = "@amplitude/plugin-context-browser";
      this.type = "before";
      this.library = "".concat(LIBPREFIX, "/").concat(VERSION);
      if (typeof navigator !== "undefined") {
        this.userAgent = navigator.userAgent;
      }
    }
    Context2.prototype.setup = function(config3) {
      this.config = config3;
      return Promise.resolve(void 0);
    };
    Context2.prototype.execute = function(context2) {
      var _a, _b;
      return __awaiter(this, void 0, void 0, function() {
        var time, lastEventId, nextEventId, event;
        return __generator(this, function(_c) {
          time = (/* @__PURE__ */ new Date()).getTime();
          lastEventId = (_a = this.config.lastEventId) !== null && _a !== void 0 ? _a : -1;
          nextEventId = (_b = context2.event_id) !== null && _b !== void 0 ? _b : lastEventId + 1;
          this.config.lastEventId = nextEventId;
          if (!context2.time) {
            this.config.lastEventTime = time;
          }
          event = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({ user_id: this.config.userId, device_id: this.config.deviceId, session_id: this.config.sessionId, time }, this.config.appVersion && { app_version: this.config.appVersion }), this.config.trackingOptions.platform && { platform: BROWSER_PLATFORM }), this.config.trackingOptions.language && { language: getLanguage2() }), this.config.trackingOptions.ipAddress && { ip: IP_ADDRESS }), { insert_id: UUID(), partner_id: this.config.partnerId, plan: this.config.plan }), this.config.ingestionMetadata && {
            ingestion_metadata: {
              source_name: this.config.ingestionMetadata.sourceName,
              source_version: this.config.ingestionMetadata.sourceVersion
            }
          }), context2), { event_id: nextEventId, library: this.library, user_agent: this.userAgent });
          return [2, event];
        });
      });
    };
    return Context2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/storage/browser-storage.js
var BrowserStorage = (
  /** @class */
  function() {
    function BrowserStorage2(storage) {
      this.storage = storage;
    }
    BrowserStorage2.prototype.isEnabled = function() {
      return __awaiter(this, void 0, void 0, function() {
        var random, testStorage, testKey, value, _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              if (!this.storage) {
                return [2, false];
              }
              random = String(Date.now());
              testStorage = new BrowserStorage2(this.storage);
              testKey = "AMP_TEST";
              _b.label = 1;
            case 1:
              _b.trys.push([1, 4, 5, 7]);
              return [4, testStorage.set(testKey, random)];
            case 2:
              _b.sent();
              return [4, testStorage.get(testKey)];
            case 3:
              value = _b.sent();
              return [2, value === random];
            case 4:
              _a = _b.sent();
              return [2, false];
            case 5:
              return [4, testStorage.remove(testKey)];
            case 6:
              _b.sent();
              return [
                7
                /*endfinally*/
              ];
            case 7:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    BrowserStorage2.prototype.get = function(key) {
      return __awaiter(this, void 0, void 0, function() {
        var value, _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              _b.trys.push([0, 2, , 3]);
              return [4, this.getRaw(key)];
            case 1:
              value = _b.sent();
              if (!value) {
                return [2, void 0];
              }
              return [2, JSON.parse(value)];
            case 2:
              _a = _b.sent();
              console.error("[Amplitude] Error: Could not get value from storage");
              return [2, void 0];
            case 3:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    BrowserStorage2.prototype.getRaw = function(key) {
      var _a;
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_b) {
          return [2, ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.getItem(key)) || void 0];
        });
      });
    };
    BrowserStorage2.prototype.set = function(key, value) {
      var _a;
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_b) {
          try {
            (_a = this.storage) === null || _a === void 0 ? void 0 : _a.setItem(key, JSON.stringify(value));
          } catch (_c) {
          }
          return [
            2
            /*return*/
          ];
        });
      });
    };
    BrowserStorage2.prototype.remove = function(key) {
      var _a;
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_b) {
          try {
            (_a = this.storage) === null || _a === void 0 ? void 0 : _a.removeItem(key);
          } catch (_c) {
          }
          return [
            2
            /*return*/
          ];
        });
      });
    };
    BrowserStorage2.prototype.reset = function() {
      var _a;
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_b) {
          try {
            (_a = this.storage) === null || _a === void 0 ? void 0 : _a.clear();
          } catch (_c) {
          }
          return [
            2
            /*return*/
          ];
        });
      });
    };
    return BrowserStorage2;
  }()
);

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/storage/local-storage.js
var MAX_ARRAY_LENGTH = 1e3;
var LocalStorage = (
  /** @class */
  function(_super) {
    __extends(LocalStorage2, _super);
    function LocalStorage2(config3) {
      var _this = this;
      var _a;
      _this = _super.call(this, (_a = getGlobalScope()) === null || _a === void 0 ? void 0 : _a.localStorage) || this;
      _this.loggerProvider = config3 === null || config3 === void 0 ? void 0 : config3.loggerProvider;
      return _this;
    }
    LocalStorage2.prototype.set = function(key, value) {
      var _a;
      return __awaiter(this, void 0, void 0, function() {
        var droppedEventsCount;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              if (!(Array.isArray(value) && value.length > MAX_ARRAY_LENGTH)) return [3, 2];
              droppedEventsCount = value.length - MAX_ARRAY_LENGTH;
              return [4, _super.prototype.set.call(this, key, value.slice(0, MAX_ARRAY_LENGTH))];
            case 1:
              _b.sent();
              (_a = this.loggerProvider) === null || _a === void 0 ? void 0 : _a.error("Failed to save ".concat(droppedEventsCount, " events because the queue length exceeded ").concat(MAX_ARRAY_LENGTH, "."));
              return [3, 4];
            case 2:
              return [4, _super.prototype.set.call(this, key, value)];
            case 3:
              _b.sent();
              _b.label = 4;
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    return LocalStorage2;
  }(BrowserStorage)
);

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/storage/session-storage.js
var SessionStorage = (
  /** @class */
  function(_super) {
    __extends(SessionStorage2, _super);
    function SessionStorage2() {
      var _a;
      return _super.call(this, (_a = getGlobalScope()) === null || _a === void 0 ? void 0 : _a.sessionStorage) || this;
    }
    return SessionStorage2;
  }(BrowserStorage)
);

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/transports/xhr.js
var XHRTransport = (
  /** @class */
  function(_super) {
    __extends(XHRTransport2, _super);
    function XHRTransport2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.state = {
        done: 4
      };
      return _this;
    }
    XHRTransport2.prototype.send = function(serverUrl, payload) {
      return __awaiter(this, void 0, void 0, function() {
        var _this = this;
        return __generator(this, function(_a) {
          return [2, new Promise(function(resolve, reject) {
            if (typeof XMLHttpRequest === "undefined") {
              reject(new Error("XHRTransport is not supported."));
            }
            var xhr = new XMLHttpRequest();
            xhr.open("POST", serverUrl, true);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === _this.state.done) {
                var responseText = xhr.responseText;
                try {
                  resolve(_this.buildResponse(JSON.parse(responseText)));
                } catch (_a2) {
                  resolve(_this.buildResponse({ code: xhr.status }));
                }
              }
            };
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "*/*");
            xhr.send(JSON.stringify(payload));
          })];
        });
      });
    };
    return XHRTransport2;
  }(BaseTransport)
);

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/transports/send-beacon.js
var SendBeaconTransport = (
  /** @class */
  function(_super) {
    __extends(SendBeaconTransport2, _super);
    function SendBeaconTransport2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    SendBeaconTransport2.prototype.send = function(serverUrl, payload) {
      return __awaiter(this, void 0, void 0, function() {
        var _this = this;
        return __generator(this, function(_a) {
          return [2, new Promise(function(resolve, reject) {
            var globalScope = getGlobalScope();
            if (!(globalScope === null || globalScope === void 0 ? void 0 : globalScope.navigator.sendBeacon)) {
              throw new Error("SendBeaconTransport is not supported");
            }
            try {
              var data = JSON.stringify(payload);
              var success = globalScope.navigator.sendBeacon(serverUrl, JSON.stringify(payload));
              if (success) {
                return resolve(_this.buildResponse({
                  code: 200,
                  events_ingested: payload.events.length,
                  payload_size_bytes: data.length,
                  server_upload_time: Date.now()
                }));
              }
              return resolve(_this.buildResponse({ code: 500 }));
            } catch (e) {
              reject(e);
            }
          })];
        });
      });
    };
    return SendBeaconTransport2;
  }(BaseTransport)
);

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/cookie-migration/index.js
var parseLegacyCookies = function(apiKey, cookieStorage, deleteLegacyCookies) {
  if (deleteLegacyCookies === void 0) {
    deleteLegacyCookies = true;
  }
  return __awaiter(void 0, void 0, void 0, function() {
    var cookieName, cookies, _a, deviceId, userId, optOut, sessionId, lastEventTime, lastEventId;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          cookieName = getOldCookieName(apiKey);
          return [4, cookieStorage.getRaw(cookieName)];
        case 1:
          cookies = _b.sent();
          if (!cookies) {
            return [2, {
              optOut: false
            }];
          }
          if (!deleteLegacyCookies) return [3, 3];
          return [4, cookieStorage.remove(cookieName)];
        case 2:
          _b.sent();
          _b.label = 3;
        case 3:
          _a = __read(cookies.split("."), 6), deviceId = _a[0], userId = _a[1], optOut = _a[2], sessionId = _a[3], lastEventTime = _a[4], lastEventId = _a[5];
          return [2, {
            deviceId,
            userId: decode(userId),
            sessionId: parseTime(sessionId),
            lastEventId: parseTime(lastEventId),
            lastEventTime: parseTime(lastEventTime),
            optOut: Boolean(optOut)
          }];
      }
    });
  });
};
var parseTime = function(num) {
  var integer = parseInt(num, 32);
  if (isNaN(integer)) {
    return void 0;
  }
  return integer;
};
var decode = function(value) {
  if (!atob || !escape || !value) {
    return void 0;
  }
  try {
    return decodeURIComponent(escape(atob(value)));
  } catch (_a) {
    return void 0;
  }
};

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/constants.js
var DEFAULT_EVENT_PREFIX = "[Amplitude]";
var DEFAULT_PAGE_VIEW_EVENT = "".concat(DEFAULT_EVENT_PREFIX, " Page Viewed");
var DEFAULT_FORM_START_EVENT = "".concat(DEFAULT_EVENT_PREFIX, " Form Started");
var DEFAULT_FORM_SUBMIT_EVENT = "".concat(DEFAULT_EVENT_PREFIX, " Form Submitted");
var DEFAULT_FILE_DOWNLOAD_EVENT = "".concat(DEFAULT_EVENT_PREFIX, " File Downloaded");
var DEFAULT_SESSION_START_EVENT = "session_start";
var DEFAULT_SESSION_END_EVENT = "session_end";
var FILE_EXTENSION = "".concat(DEFAULT_EVENT_PREFIX, " File Extension");
var FILE_NAME = "".concat(DEFAULT_EVENT_PREFIX, " File Name");
var LINK_ID = "".concat(DEFAULT_EVENT_PREFIX, " Link ID");
var LINK_TEXT = "".concat(DEFAULT_EVENT_PREFIX, " Link Text");
var LINK_URL = "".concat(DEFAULT_EVENT_PREFIX, " Link URL");
var FORM_ID = "".concat(DEFAULT_EVENT_PREFIX, " Form ID");
var FORM_NAME = "".concat(DEFAULT_EVENT_PREFIX, " Form Name");
var FORM_DESTINATION = "".concat(DEFAULT_EVENT_PREFIX, " Form Destination");
var DEFAULT_IDENTITY_STORAGE = "cookie";
var DEFAULT_SERVER_ZONE = "US";

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/config.js
var BrowserConfig = (
  /** @class */
  function(_super) {
    __extends(BrowserConfig2, _super);
    function BrowserConfig2(apiKey, appVersion, cookieStorage, cookieOptions, defaultTracking, autocapture, deviceId, flushIntervalMillis, flushMaxRetries, flushQueueSize, identityStorage, ingestionMetadata, instanceName, lastEventId, lastEventTime, loggerProvider, logLevel, minIdLength, offline, optOut, partnerId, plan, serverUrl, serverZone, sessionId, sessionTimeout, storageProvider, trackingOptions, transport, useBatch, fetchRemoteConfig, userId, pageCounter, debugLogsEnabled) {
      if (cookieStorage === void 0) {
        cookieStorage = new MemoryStorage();
      }
      if (cookieOptions === void 0) {
        cookieOptions = {
          domain: "",
          expiration: 365,
          sameSite: "Lax",
          secure: false,
          upgrade: true
        };
      }
      if (flushIntervalMillis === void 0) {
        flushIntervalMillis = 1e3;
      }
      if (flushMaxRetries === void 0) {
        flushMaxRetries = 5;
      }
      if (flushQueueSize === void 0) {
        flushQueueSize = 30;
      }
      if (identityStorage === void 0) {
        identityStorage = DEFAULT_IDENTITY_STORAGE;
      }
      if (loggerProvider === void 0) {
        loggerProvider = new Logger();
      }
      if (logLevel === void 0) {
        logLevel = LogLevel.Warn;
      }
      if (offline === void 0) {
        offline = false;
      }
      if (optOut === void 0) {
        optOut = false;
      }
      if (serverUrl === void 0) {
        serverUrl = "";
      }
      if (serverZone === void 0) {
        serverZone = DEFAULT_SERVER_ZONE;
      }
      if (sessionTimeout === void 0) {
        sessionTimeout = 30 * 60 * 1e3;
      }
      if (storageProvider === void 0) {
        storageProvider = new LocalStorage({ loggerProvider });
      }
      if (trackingOptions === void 0) {
        trackingOptions = {
          ipAddress: true,
          language: true,
          platform: true
        };
      }
      if (transport === void 0) {
        transport = "fetch";
      }
      if (useBatch === void 0) {
        useBatch = false;
      }
      if (fetchRemoteConfig === void 0) {
        fetchRemoteConfig = false;
      }
      var _this = _super.call(this, { apiKey, storageProvider, transportProvider: createTransport(transport) }) || this;
      _this.apiKey = apiKey;
      _this.appVersion = appVersion;
      _this.cookieOptions = cookieOptions;
      _this.defaultTracking = defaultTracking;
      _this.autocapture = autocapture;
      _this.flushIntervalMillis = flushIntervalMillis;
      _this.flushMaxRetries = flushMaxRetries;
      _this.flushQueueSize = flushQueueSize;
      _this.identityStorage = identityStorage;
      _this.ingestionMetadata = ingestionMetadata;
      _this.instanceName = instanceName;
      _this.loggerProvider = loggerProvider;
      _this.logLevel = logLevel;
      _this.minIdLength = minIdLength;
      _this.offline = offline;
      _this.partnerId = partnerId;
      _this.plan = plan;
      _this.serverUrl = serverUrl;
      _this.serverZone = serverZone;
      _this.sessionTimeout = sessionTimeout;
      _this.storageProvider = storageProvider;
      _this.trackingOptions = trackingOptions;
      _this.transport = transport;
      _this.useBatch = useBatch;
      _this.fetchRemoteConfig = fetchRemoteConfig;
      _this._optOut = false;
      _this._cookieStorage = cookieStorage;
      _this.deviceId = deviceId;
      _this.lastEventId = lastEventId;
      _this.lastEventTime = lastEventTime;
      _this.optOut = optOut;
      _this.sessionId = sessionId;
      _this.pageCounter = pageCounter;
      _this.userId = userId;
      _this.debugLogsEnabled = debugLogsEnabled;
      _this.loggerProvider.enable(debugLogsEnabled ? LogLevel.Debug : _this.logLevel);
      return _this;
    }
    Object.defineProperty(BrowserConfig2.prototype, "cookieStorage", {
      get: function() {
        return this._cookieStorage;
      },
      set: function(cookieStorage) {
        if (this._cookieStorage !== cookieStorage) {
          this._cookieStorage = cookieStorage;
          this.updateStorage();
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BrowserConfig2.prototype, "deviceId", {
      get: function() {
        return this._deviceId;
      },
      set: function(deviceId) {
        if (this._deviceId !== deviceId) {
          this._deviceId = deviceId;
          this.updateStorage();
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BrowserConfig2.prototype, "userId", {
      get: function() {
        return this._userId;
      },
      set: function(userId) {
        if (this._userId !== userId) {
          this._userId = userId;
          this.updateStorage();
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BrowserConfig2.prototype, "sessionId", {
      get: function() {
        return this._sessionId;
      },
      set: function(sessionId) {
        if (this._sessionId !== sessionId) {
          this._sessionId = sessionId;
          this.updateStorage();
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BrowserConfig2.prototype, "optOut", {
      get: function() {
        return this._optOut;
      },
      set: function(optOut) {
        if (this._optOut !== optOut) {
          this._optOut = optOut;
          this.updateStorage();
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BrowserConfig2.prototype, "lastEventTime", {
      get: function() {
        return this._lastEventTime;
      },
      set: function(lastEventTime) {
        if (this._lastEventTime !== lastEventTime) {
          this._lastEventTime = lastEventTime;
          this.updateStorage();
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BrowserConfig2.prototype, "lastEventId", {
      get: function() {
        return this._lastEventId;
      },
      set: function(lastEventId) {
        if (this._lastEventId !== lastEventId) {
          this._lastEventId = lastEventId;
          this.updateStorage();
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BrowserConfig2.prototype, "pageCounter", {
      get: function() {
        return this._pageCounter;
      },
      set: function(pageCounter) {
        if (this._pageCounter !== pageCounter) {
          this._pageCounter = pageCounter;
          this.updateStorage();
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BrowserConfig2.prototype, "debugLogsEnabled", {
      set: function(debugLogsEnabled) {
        if (this._debugLogsEnabled !== debugLogsEnabled) {
          this._debugLogsEnabled = debugLogsEnabled;
          this.updateStorage();
        }
      },
      enumerable: false,
      configurable: true
    });
    BrowserConfig2.prototype.updateStorage = function() {
      var cache = {
        deviceId: this._deviceId,
        userId: this._userId,
        sessionId: this._sessionId,
        optOut: this._optOut,
        lastEventTime: this._lastEventTime,
        lastEventId: this._lastEventId,
        pageCounter: this._pageCounter,
        debugLogsEnabled: this._debugLogsEnabled
      };
      void this.cookieStorage.set(getCookieName(this.apiKey), cache);
    };
    return BrowserConfig2;
  }(Config)
);
var useBrowserConfig = function(apiKey, options, amplitudeInstance) {
  if (options === void 0) {
    options = {};
  }
  return __awaiter(void 0, void 0, void 0, function() {
    var identityStorage, cookieOptions, _a, _b, cookieStorage, legacyCookies, previousCookies, queryParams, deviceId, lastEventId, lastEventTime, optOut, sessionId, userId, trackingOptions, pageCounter, debugLogsEnabled, browserConfig;
    var _c;
    var _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
    return __generator(this, function(_3) {
      switch (_3.label) {
        case 0:
          identityStorage = options.identityStorage || DEFAULT_IDENTITY_STORAGE;
          _c = {};
          if (!(identityStorage !== DEFAULT_IDENTITY_STORAGE)) return [3, 1];
          _a = "";
          return [3, 5];
        case 1:
          if (!((_e = (_d = options.cookieOptions) === null || _d === void 0 ? void 0 : _d.domain) !== null && _e !== void 0)) return [3, 2];
          _b = _e;
          return [3, 4];
        case 2:
          return [4, getTopLevelDomain()];
        case 3:
          _b = _3.sent();
          _3.label = 4;
        case 4:
          _a = _b;
          _3.label = 5;
        case 5:
          cookieOptions = __assign.apply(void 0, [(_c.domain = _a, _c.expiration = 365, _c.sameSite = "Lax", _c.secure = false, _c.upgrade = true, _c), options.cookieOptions]);
          cookieStorage = createCookieStorage(options.identityStorage, cookieOptions);
          return [4, parseLegacyCookies(apiKey, cookieStorage, (_g = (_f = options.cookieOptions) === null || _f === void 0 ? void 0 : _f.upgrade) !== null && _g !== void 0 ? _g : true)];
        case 6:
          legacyCookies = _3.sent();
          return [4, cookieStorage.get(getCookieName(apiKey))];
        case 7:
          previousCookies = _3.sent();
          queryParams = getQueryParams();
          deviceId = (_m = (_l = (_k = (_j = (_h = options.deviceId) !== null && _h !== void 0 ? _h : queryParams.ampDeviceId) !== null && _j !== void 0 ? _j : queryParams.deviceId) !== null && _k !== void 0 ? _k : previousCookies === null || previousCookies === void 0 ? void 0 : previousCookies.deviceId) !== null && _l !== void 0 ? _l : legacyCookies.deviceId) !== null && _m !== void 0 ? _m : UUID();
          lastEventId = (_o = previousCookies === null || previousCookies === void 0 ? void 0 : previousCookies.lastEventId) !== null && _o !== void 0 ? _o : legacyCookies.lastEventId;
          lastEventTime = (_p = previousCookies === null || previousCookies === void 0 ? void 0 : previousCookies.lastEventTime) !== null && _p !== void 0 ? _p : legacyCookies.lastEventTime;
          optOut = (_r = (_q = options.optOut) !== null && _q !== void 0 ? _q : previousCookies === null || previousCookies === void 0 ? void 0 : previousCookies.optOut) !== null && _r !== void 0 ? _r : legacyCookies.optOut;
          sessionId = (_s = previousCookies === null || previousCookies === void 0 ? void 0 : previousCookies.sessionId) !== null && _s !== void 0 ? _s : legacyCookies.sessionId;
          userId = (_u = (_t = options.userId) !== null && _t !== void 0 ? _t : previousCookies === null || previousCookies === void 0 ? void 0 : previousCookies.userId) !== null && _u !== void 0 ? _u : legacyCookies.userId;
          amplitudeInstance.previousSessionDeviceId = (_v = previousCookies === null || previousCookies === void 0 ? void 0 : previousCookies.deviceId) !== null && _v !== void 0 ? _v : legacyCookies.deviceId;
          amplitudeInstance.previousSessionUserId = (_w = previousCookies === null || previousCookies === void 0 ? void 0 : previousCookies.userId) !== null && _w !== void 0 ? _w : legacyCookies.userId;
          trackingOptions = {
            ipAddress: (_y = (_x = options.trackingOptions) === null || _x === void 0 ? void 0 : _x.ipAddress) !== null && _y !== void 0 ? _y : true,
            language: (_0 = (_z = options.trackingOptions) === null || _z === void 0 ? void 0 : _z.language) !== null && _0 !== void 0 ? _0 : true,
            platform: (_2 = (_1 = options.trackingOptions) === null || _1 === void 0 ? void 0 : _1.platform) !== null && _2 !== void 0 ? _2 : true
          };
          pageCounter = previousCookies === null || previousCookies === void 0 ? void 0 : previousCookies.pageCounter;
          debugLogsEnabled = previousCookies === null || previousCookies === void 0 ? void 0 : previousCookies.debugLogsEnabled;
          if (options.autocapture !== void 0) {
            options.defaultTracking = options.autocapture;
          }
          browserConfig = new BrowserConfig(apiKey, options.appVersion, cookieStorage, cookieOptions, options.defaultTracking, options.autocapture, deviceId, options.flushIntervalMillis, options.flushMaxRetries, options.flushQueueSize, identityStorage, options.ingestionMetadata, options.instanceName, lastEventId, lastEventTime, options.loggerProvider, options.logLevel, options.minIdLength, options.offline, optOut, options.partnerId, options.plan, options.serverUrl, options.serverZone, sessionId, options.sessionTimeout, options.storageProvider, trackingOptions, options.transport, options.useBatch, options.fetchRemoteConfig, userId, pageCounter, debugLogsEnabled);
          return [4, browserConfig.storageProvider.isEnabled()];
        case 8:
          if (!_3.sent()) {
            browserConfig.loggerProvider.warn("Storage provider ".concat(browserConfig.storageProvider.constructor.name, " is not enabled. Falling back to MemoryStorage."));
            browserConfig.storageProvider = new MemoryStorage();
          }
          return [2, browserConfig];
      }
    });
  });
};
var createCookieStorage = function(identityStorage, cookieOptions) {
  if (identityStorage === void 0) {
    identityStorage = DEFAULT_IDENTITY_STORAGE;
  }
  if (cookieOptions === void 0) {
    cookieOptions = {};
  }
  switch (identityStorage) {
    case "localStorage":
      return new LocalStorage();
    case "sessionStorage":
      return new SessionStorage();
    case "none":
      return new MemoryStorage();
    case "cookie":
    default:
      return new CookieStorage(__assign(__assign({}, cookieOptions), { expirationDays: cookieOptions.expiration }));
  }
};
var createTransport = function(transport) {
  if (transport === "xhr") {
    return new XHRTransport();
  }
  if (transport === "beacon") {
    return new SendBeaconTransport();
  }
  return new FetchTransport();
};
var getTopLevelDomain = function(url) {
  return __awaiter(void 0, void 0, void 0, function() {
    var host, parts, levels, storageKey, i, i, domain, options, storage, value;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4, new CookieStorage().isEnabled()];
        case 1:
          if (!_a.sent() || !url && (typeof location === "undefined" || !location.hostname)) {
            return [2, ""];
          }
          host = url !== null && url !== void 0 ? url : location.hostname;
          parts = host.split(".");
          levels = [];
          storageKey = "AMP_TLDTEST";
          for (i = parts.length - 2; i >= 0; --i) {
            levels.push(parts.slice(i).join("."));
          }
          i = 0;
          _a.label = 2;
        case 2:
          if (!(i < levels.length)) return [3, 7];
          domain = levels[i];
          options = { domain: "." + domain };
          storage = new CookieStorage(options);
          return [4, storage.set(storageKey, 1)];
        case 3:
          _a.sent();
          return [4, storage.get(storageKey)];
        case 4:
          value = _a.sent();
          if (!value) return [3, 6];
          return [4, storage.remove(storageKey)];
        case 5:
          _a.sent();
          return [2, "." + domain];
        case 6:
          i++;
          return [3, 2];
        case 7:
          return [2, ""];
      }
    });
  });
};

// ../../.yarn/cache/@amplitude-plugin-page-view-tracking-browser-npm-2.3.7-2981891894-e07570e342.zip/node_modules/@amplitude/plugin-page-view-tracking-browser/lib/esm/utils.js
var omitUndefined = function(input) {
  var obj = {};
  for (var key in input) {
    var val = input[key];
    if (val) {
      obj[key] = val;
    }
  }
  return obj;
};

// ../../.yarn/cache/@amplitude-plugin-page-view-tracking-browser-npm-2.3.7-2981891894-e07570e342.zip/node_modules/@amplitude/plugin-page-view-tracking-browser/lib/esm/page-view-tracking.js
var defaultPageViewEvent = "[Amplitude] Page Viewed";
var pageViewTrackingPlugin = function(options) {
  if (options === void 0) {
    options = {};
  }
  var amplitude;
  var globalScope = getGlobalScope();
  var loggerProvider = void 0;
  var pushState;
  var localConfig;
  var trackOn = options.trackOn, trackHistoryChanges = options.trackHistoryChanges, _a = options.eventType, eventType = _a === void 0 ? defaultPageViewEvent : _a;
  var getDecodeURI = function(locationStr) {
    var decodedLocationStr = locationStr;
    try {
      decodedLocationStr = decodeURI(locationStr);
    } catch (e) {
      loggerProvider === null || loggerProvider === void 0 ? void 0 : loggerProvider.error("Malformed URI sequence: ", e);
    }
    return decodedLocationStr;
  };
  var createPageViewEvent = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var locationHREF, _a2;
      var _b;
      return __generator(this, function(_c) {
        switch (_c.label) {
          case 0:
            locationHREF = getDecodeURI(typeof location !== "undefined" && location.href || "");
            _b = {
              event_type: eventType
            };
            _a2 = [{}];
            return [4, getCampaignParams()];
          case 1:
            return [2, (_b.event_properties = __assign.apply(void 0, [__assign.apply(void 0, _a2.concat([_c.sent()])), { "[Amplitude] Page Domain": (
              /* istanbul ignore next */
              typeof location !== "undefined" && location.hostname || ""
            ), "[Amplitude] Page Location": locationHREF, "[Amplitude] Page Path": (
              /* istanbul ignore next */
              typeof location !== "undefined" && getDecodeURI(location.pathname) || ""
            ), "[Amplitude] Page Title": (
              /* istanbul ignore next */
              typeof document !== "undefined" && document.title || ""
            ), "[Amplitude] Page URL": locationHREF.split("?")[0] }]), _b)];
        }
      });
    });
  };
  var shouldTrackOnPageLoad = function() {
    return typeof trackOn === "undefined" || typeof trackOn === "function" && trackOn();
  };
  var previousURL = typeof location !== "undefined" ? location.href : null;
  var trackHistoryPageView = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var newURL, shouldTrackPageView, _a2, _b, _c;
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            newURL = location.href;
            shouldTrackPageView = shouldTrackHistoryPageView(trackHistoryChanges, newURL, previousURL || "") && shouldTrackOnPageLoad();
            previousURL = newURL;
            if (!shouldTrackPageView) return [3, 4];
            loggerProvider === null || loggerProvider === void 0 ? void 0 : loggerProvider.log("Tracking page view event");
            if (!(amplitude === null || amplitude === void 0)) return [3, 1];
            _a2 = void 0;
            return [3, 3];
          case 1:
            _c = (_b = amplitude).track;
            return [4, createPageViewEvent()];
          case 2:
            _a2 = _c.apply(_b, [_d.sent()]);
            _d.label = 3;
          case 3:
            _a2;
            _d.label = 4;
          case 4:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  };
  var trackHistoryPageViewWrapper = function() {
    void trackHistoryPageView();
  };
  var plugin = {
    name: "@amplitude/plugin-page-view-tracking-browser",
    type: "enrichment",
    setup: function(config3, client) {
      return __awaiter(void 0, void 0, void 0, function() {
        var _a2, _b;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              amplitude = client;
              localConfig = config3;
              loggerProvider = config3.loggerProvider;
              loggerProvider.log("Installing @amplitude/plugin-page-view-tracking-browser");
              if (globalScope) {
                globalScope.addEventListener("popstate", trackHistoryPageViewWrapper);
                pushState = globalScope.history.pushState;
                globalScope.history.pushState = new Proxy(globalScope.history.pushState, {
                  apply: function(target, thisArg, _a3) {
                    var _b2 = __read(_a3, 3), state = _b2[0], unused = _b2[1], url = _b2[2];
                    target.apply(thisArg, [state, unused, url]);
                    void trackHistoryPageView();
                  }
                });
              }
              if (!shouldTrackOnPageLoad()) return [3, 2];
              loggerProvider.log("Tracking page view event");
              _b = (_a2 = amplitude).track;
              return [4, createPageViewEvent()];
            case 1:
              _b.apply(_a2, [_c.sent()]);
              _c.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    },
    execute: function(event) {
      return __awaiter(void 0, void 0, void 0, function() {
        var pageViewEvent;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              if (!(trackOn === "attribution" && isCampaignEvent(event))) return [3, 2];
              loggerProvider === null || loggerProvider === void 0 ? void 0 : loggerProvider.log("Enriching campaign event to page view event with campaign parameters");
              return [4, createPageViewEvent()];
            case 1:
              pageViewEvent = _a2.sent();
              event.event_type = pageViewEvent.event_type;
              event.event_properties = __assign(__assign({}, event.event_properties), pageViewEvent.event_properties);
              _a2.label = 2;
            case 2:
              if (localConfig && event.event_type === eventType) {
                localConfig.pageCounter = !localConfig.pageCounter ? 1 : localConfig.pageCounter + 1;
                event.event_properties = __assign(__assign({}, event.event_properties), { "[Amplitude] Page Counter": localConfig.pageCounter });
              }
              return [2, event];
          }
        });
      });
    },
    teardown: function() {
      return __awaiter(void 0, void 0, void 0, function() {
        return __generator(this, function(_a2) {
          if (globalScope) {
            globalScope.removeEventListener("popstate", trackHistoryPageViewWrapper);
            if (pushState) {
              globalScope.history.pushState = pushState;
            }
          }
          return [
            2
            /*return*/
          ];
        });
      });
    }
  };
  return plugin;
};
var getCampaignParams = function() {
  return __awaiter(void 0, void 0, void 0, function() {
    var _a;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _a = omitUndefined;
          return [4, new CampaignParser().parse()];
        case 1:
          return [2, _a.apply(void 0, [_b.sent()])];
      }
    });
  });
};
var isCampaignEvent = function(event) {
  if (event.event_type === "$identify" && event.user_properties) {
    var properties = event.user_properties;
    var $set = properties[IdentifyOperation.SET] || {};
    var $unset = properties[IdentifyOperation.UNSET] || {};
    var userProperties_1 = __spreadArray(__spreadArray([], __read(Object.keys($set)), false), __read(Object.keys($unset)), false);
    return Object.keys(BASE_CAMPAIGN).every(function(value) {
      return userProperties_1.includes(value);
    });
  }
  return false;
};
var shouldTrackHistoryPageView = function(trackingOption, newURLStr, oldURLStr) {
  switch (trackingOption) {
    case "pathOnly": {
      if (oldURLStr == "")
        return true;
      var newURL = new URL(newURLStr);
      var oldURL = new URL(oldURLStr);
      var newBaseStr = newURL.origin + newURL.pathname;
      var oldBaseStr = oldURL.origin + oldURL.pathname;
      return newBaseStr !== oldBaseStr;
    }
    default:
      return newURLStr !== oldURLStr;
  }
};

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/plugins/form-interaction-tracking.js
var formInteractionTracking = function() {
  var observer;
  var eventListeners = [];
  var addEventListener = function(element, type2, handler) {
    element.addEventListener(type2, handler);
    eventListeners.push({
      element,
      type: type2,
      handler
    });
  };
  var removeClickListeners = function() {
    eventListeners.forEach(function(_a) {
      var element = _a.element, type2 = _a.type, handler = _a.handler;
      element === null || element === void 0 ? void 0 : element.removeEventListener(type2, handler);
    });
    eventListeners = [];
  };
  var name = "@amplitude/plugin-form-interaction-tracking-browser";
  var type = "enrichment";
  var setup = function(config3, amplitude) {
    return __awaiter(void 0, void 0, void 0, function() {
      var _a;
      return __generator(this, function(_b) {
        (_a = getGlobalScope()) === null || _a === void 0 ? void 0 : _a.addEventListener("load", function() {
          if (!amplitude) {
            config3.loggerProvider.warn("Form interaction tracking requires a later version of @amplitude/analytics-browser. Form interaction events are not tracked.");
            return;
          }
          if (typeof document === "undefined") {
            return;
          }
          var addFormInteractionListener = function(form) {
            var hasFormChanged = false;
            addEventListener(form, "change", function() {
              var _a2;
              if (!hasFormChanged) {
                amplitude.track(DEFAULT_FORM_START_EVENT, (_a2 = {}, _a2[FORM_ID] = stringOrUndefined(form.id), _a2[FORM_NAME] = stringOrUndefined(form.name), _a2[FORM_DESTINATION] = form.action, _a2));
              }
              hasFormChanged = true;
            });
            addEventListener(form, "submit", function() {
              var _a2, _b2;
              if (!hasFormChanged) {
                amplitude.track(DEFAULT_FORM_START_EVENT, (_a2 = {}, _a2[FORM_ID] = stringOrUndefined(form.id), _a2[FORM_NAME] = stringOrUndefined(form.name), _a2[FORM_DESTINATION] = form.action, _a2));
              }
              amplitude.track(DEFAULT_FORM_SUBMIT_EVENT, (_b2 = {}, _b2[FORM_ID] = stringOrUndefined(form.id), _b2[FORM_NAME] = stringOrUndefined(form.name), _b2[FORM_DESTINATION] = form.action, _b2));
              hasFormChanged = false;
            });
          };
          var forms = Array.from(document.getElementsByTagName("form"));
          forms.forEach(addFormInteractionListener);
          if (typeof MutationObserver !== "undefined") {
            observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                  if (node.nodeName === "FORM") {
                    addFormInteractionListener(node);
                  }
                  if ("querySelectorAll" in node && typeof node.querySelectorAll === "function") {
                    Array.from(node.querySelectorAll("form")).map(addFormInteractionListener);
                  }
                });
              });
            });
            observer.observe(document.body, {
              subtree: true,
              childList: true
            });
          }
        });
        return [
          2
          /*return*/
        ];
      });
    });
  };
  var execute = function(event) {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2, event];
      });
    });
  };
  var teardown = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        observer === null || observer === void 0 ? void 0 : observer.disconnect();
        removeClickListeners();
        return [
          2
          /*return*/
        ];
      });
    });
  };
  return {
    name,
    type,
    setup,
    execute,
    teardown
  };
};
var stringOrUndefined = function(name) {
  if (typeof name !== "string") {
    return void 0;
  }
  return name;
};

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/plugins/file-download-tracking.js
var fileDownloadTracking = function() {
  var observer;
  var eventListeners = [];
  var addEventListener = function(element, type2, handler) {
    element.addEventListener(type2, handler);
    eventListeners.push({
      element,
      type: type2,
      handler
    });
  };
  var removeClickListeners = function() {
    eventListeners.forEach(function(_a) {
      var element = _a.element, type2 = _a.type, handler = _a.handler;
      element === null || element === void 0 ? void 0 : element.removeEventListener(type2, handler);
    });
    eventListeners = [];
  };
  var name = "@amplitude/plugin-file-download-tracking-browser";
  var type = "enrichment";
  var setup = function(config3, amplitude) {
    return __awaiter(void 0, void 0, void 0, function() {
      var _a;
      return __generator(this, function(_b) {
        (_a = getGlobalScope()) === null || _a === void 0 ? void 0 : _a.addEventListener("load", function() {
          if (!amplitude) {
            config3.loggerProvider.warn("File download tracking requires a later version of @amplitude/analytics-browser. File download events are not tracked.");
            return;
          }
          if (typeof document === "undefined") {
            return;
          }
          var addFileDownloadListener = function(a) {
            var url;
            try {
              url = new URL(a.href, window.location.href);
            } catch (_a2) {
              return;
            }
            var result = ext.exec(url.href);
            var fileExtension = result === null || result === void 0 ? void 0 : result[1];
            if (fileExtension) {
              addEventListener(a, "click", function() {
                var _a2;
                if (fileExtension) {
                  amplitude.track(DEFAULT_FILE_DOWNLOAD_EVENT, (_a2 = {}, _a2[FILE_EXTENSION] = fileExtension, _a2[FILE_NAME] = url.pathname, _a2[LINK_ID] = a.id, _a2[LINK_TEXT] = a.text, _a2[LINK_URL] = a.href, _a2));
                }
              });
            }
          };
          var ext = /\.(pdf|xlsx?|docx?|txt|rtf|csv|exe|key|pp(s|t|tx)|7z|pkg|rar|gz|zip|avi|mov|mp4|mpe?g|wmv|midi?|mp3|wav|wma)(\?.+)?$/;
          var links = Array.from(document.getElementsByTagName("a"));
          links.forEach(addFileDownloadListener);
          if (typeof MutationObserver !== "undefined") {
            observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                  if (node.nodeName === "A") {
                    addFileDownloadListener(node);
                  }
                  if ("querySelectorAll" in node && typeof node.querySelectorAll === "function") {
                    Array.from(node.querySelectorAll("a")).map(addFileDownloadListener);
                  }
                });
              });
            });
            observer.observe(document.body, {
              subtree: true,
              childList: true
            });
          }
        });
        return [
          2
          /*return*/
        ];
      });
    });
  };
  var execute = function(event) {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2, event];
      });
    });
  };
  var teardown = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        observer === null || observer === void 0 ? void 0 : observer.disconnect();
        removeClickListeners();
        return [
          2
          /*return*/
        ];
      });
    });
  };
  return {
    name,
    type,
    setup,
    execute,
    teardown
  };
};

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/det-notification.js
var notified = false;
var detNotify = function(config3) {
  if (notified || config3.defaultTracking !== void 0) {
    return;
  }
  var message = "`options.defaultTracking` is set to undefined. This implicitly configures your Amplitude instance to track Page Views, Sessions, File Downloads, and Form Interactions. You can suppress this warning by explicitly setting a value to `options.defaultTracking`. The value must either be a boolean, to enable and disable all default events, or an object, for advanced configuration. For example:\n\namplitude.init(<YOUR_API_KEY>, {\n  defaultTracking: true,\n});\n\nVisit https://www.docs.developers.amplitude.com/data/sdks/browser-2/#tracking-default-events for more details.";
  config3.loggerProvider.warn(message);
  notified = true;
};

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/plugins/network-connectivity-checker.js
var networkConnectivityCheckerPlugin = function() {
  var name = "@amplitude/plugin-network-checker-browser";
  var type = "before";
  var globalScope = getGlobalScope();
  var eventListeners = [];
  var addNetworkListener = function(type2, handler) {
    if (globalScope) {
      globalScope.addEventListener(type2, handler);
      eventListeners.push({
        type: type2,
        handler
      });
    }
  };
  var removeNetworkListeners = function() {
    eventListeners.forEach(function(_a) {
      var type2 = _a.type, handler = _a.handler;
      if (globalScope) {
        globalScope.removeEventListener(type2, handler);
      }
    });
    eventListeners = [];
  };
  var setup = function(config3, amplitude) {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        if (typeof navigator === "undefined") {
          config3.loggerProvider.debug("Network connectivity checker plugin is disabled because navigator is not available.");
          config3.offline = false;
          return [
            2
            /*return*/
          ];
        }
        config3.offline = !navigator.onLine;
        addNetworkListener("online", function() {
          config3.loggerProvider.debug("Network connectivity changed to online.");
          config3.offline = false;
          setTimeout(function() {
            amplitude.flush();
          }, config3.flushIntervalMillis);
        });
        addNetworkListener("offline", function() {
          config3.loggerProvider.debug("Network connectivity changed to offline.");
          config3.offline = true;
        });
        return [
          2
          /*return*/
        ];
      });
    });
  };
  var teardown = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        removeNetworkListeners();
        return [
          2
          /*return*/
        ];
      });
    });
  };
  return {
    name,
    type,
    setup,
    teardown
  };
};

// ../../.yarn/cache/@amplitude-analytics-remote-config-npm-0.4.1-59ac2ce6d4-b48564fe18.zip/node_modules/@amplitude/analytics-remote-config/lib/esm/remote-config.js
var UNEXPECTED_NETWORK_ERROR_MESSAGE = "Network error occurred, remote config fetch failed";
var SUCCESS_REMOTE_CONFIG = "Remote config successfully fetched";
var MAX_RETRIES_EXCEEDED_MESSAGE2 = "Remote config fetch rejected due to exceeded retry count";
var TIMEOUT_MESSAGE = "Remote config fetch rejected due to timeout after 5 seconds";
var UNEXPECTED_ERROR_MESSAGE2 = "Unexpected error occurred";
var REMOTE_CONFIG_SERVER_URL = "https://sr-client-cfg.amplitude.com/config";
var REMOTE_CONFIG_SERVER_URL_STAGING = "https://sr-client-cfg.stag2.amplitude.com/config";
var REMOTE_CONFIG_SERVER_URL_EU = "https://sr-client-cfg.eu.amplitude.com/config";
var RemoteConfigFetch = (
  /** @class */
  function() {
    function RemoteConfigFetch2(_a) {
      var localConfig = _a.localConfig, configKeys = _a.configKeys;
      var _this = this;
      this.retryTimeout = 1e3;
      this.attempts = 0;
      this.sessionTargetingMatch = false;
      this.metrics = {};
      this.getRemoteConfig = function(configNamespace, key, sessionId) {
        return __awaiter(_this, void 0, void 0, function() {
          var fetchStartTime, configAPIResponse, remoteConfig;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                fetchStartTime = Date.now();
                return [4, this.fetchWithTimeout(sessionId)];
              case 1:
                configAPIResponse = _a2.sent();
                if (configAPIResponse) {
                  remoteConfig = configAPIResponse.configs && configAPIResponse.configs[configNamespace];
                  if (remoteConfig) {
                    this.metrics.fetchTimeAPISuccess = Date.now() - fetchStartTime;
                    return [2, remoteConfig[key]];
                  }
                }
                this.metrics.fetchTimeAPIFail = Date.now() - fetchStartTime;
                return [2, void 0];
            }
          });
        });
      };
      this.fetchWithTimeout = function(sessionId) {
        return __awaiter(_this, void 0, void 0, function() {
          var controller, timeoutId, remoteConfig;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                controller = new AbortController();
                timeoutId = setTimeout(function() {
                  return controller.abort();
                }, 5e3);
                return [4, this.fetchRemoteConfig(controller.signal, sessionId)];
              case 1:
                remoteConfig = _a2.sent();
                clearTimeout(timeoutId);
                return [2, remoteConfig];
            }
          });
        });
      };
      this.fetchRemoteConfig = function(signal, sessionId) {
        return __awaiter(_this, void 0, void 0, function() {
          var urlParams, _a2, _b, configKey, options, serverUrl, res, parsedStatus, e_1, knownError;
          var e_2, _c;
          var _d;
          return __generator(this, function(_e) {
            switch (_e.label) {
              case 0:
                if (sessionId === this.lastFetchedSessionId && this.attempts >= this.localConfig.flushMaxRetries) {
                  return [2, this.completeRequest({ err: MAX_RETRIES_EXCEEDED_MESSAGE2 })];
                } else if (signal.aborted) {
                  return [2, this.completeRequest({ err: TIMEOUT_MESSAGE })];
                } else if (sessionId !== this.lastFetchedSessionId) {
                  this.lastFetchedSessionId = sessionId;
                  this.attempts = 0;
                }
                _e.label = 1;
              case 1:
                _e.trys.push([1, 3, , 4]);
                urlParams = new URLSearchParams({
                  api_key: this.localConfig.apiKey
                });
                try {
                  for (_a2 = __values(this.configKeys), _b = _a2.next(); !_b.done; _b = _a2.next()) {
                    configKey = _b.value;
                    urlParams.append("config_keys", configKey);
                  }
                } catch (e_2_1) {
                  e_2 = { error: e_2_1 };
                } finally {
                  try {
                    if (_b && !_b.done && (_c = _a2.return)) _c.call(_a2);
                  } finally {
                    if (e_2) throw e_2.error;
                  }
                }
                if (sessionId) {
                  urlParams.set("session_id", String(sessionId));
                }
                options = {
                  headers: {
                    Accept: "*/*"
                  },
                  method: "GET"
                };
                serverUrl = "".concat(this.getServerUrl(), "?").concat(urlParams.toString());
                this.attempts += 1;
                return [4, fetch(serverUrl, __assign(__assign({}, options), { signal }))];
              case 2:
                res = _e.sent();
                if (res === null) {
                  return [2, this.completeRequest({ err: UNEXPECTED_ERROR_MESSAGE2 })];
                }
                parsedStatus = new BaseTransport().buildStatus(res.status);
                switch (parsedStatus) {
                  case Status.Success:
                    this.attempts = 0;
                    return [2, this.parseAndStoreConfig(res)];
                  case Status.Failed:
                    return [2, this.retryFetch(signal, sessionId)];
                  default:
                    return [2, this.completeRequest({ err: UNEXPECTED_NETWORK_ERROR_MESSAGE })];
                }
                return [3, 4];
              case 3:
                e_1 = _e.sent();
                knownError = e_1;
                if (signal.aborted) {
                  return [2, this.completeRequest({ err: TIMEOUT_MESSAGE })];
                }
                return [2, this.completeRequest({ err: (_d = knownError.message) !== null && _d !== void 0 ? _d : UNEXPECTED_ERROR_MESSAGE2 })];
              case 4:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      this.retryFetch = function(signal, sessionId) {
        return __awaiter(_this, void 0, void 0, function() {
          var _this2 = this;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                return [4, new Promise(function(resolve) {
                  return setTimeout(resolve, _this2.attempts * _this2.retryTimeout);
                })];
              case 1:
                _a2.sent();
                return [2, this.fetchRemoteConfig(signal, sessionId)];
            }
          });
        });
      };
      this.parseAndStoreConfig = function(res) {
        return __awaiter(_this, void 0, void 0, function() {
          var remoteConfig;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                return [4, res.json()];
              case 1:
                remoteConfig = _a2.sent();
                this.completeRequest({ success: SUCCESS_REMOTE_CONFIG });
                return [2, remoteConfig];
            }
          });
        });
      };
      this.localConfig = localConfig;
      this.configKeys = configKeys;
    }
    RemoteConfigFetch2.prototype.getServerUrl = function() {
      if (this.localConfig.serverZone === ServerZone.STAGING) {
        return REMOTE_CONFIG_SERVER_URL_STAGING;
      }
      if (this.localConfig.serverZone === ServerZone.EU) {
        return REMOTE_CONFIG_SERVER_URL_EU;
      }
      return REMOTE_CONFIG_SERVER_URL;
    };
    RemoteConfigFetch2.prototype.completeRequest = function(_a) {
      var err = _a.err, success = _a.success;
      if (err) {
        throw new Error(err);
      } else if (success) {
        this.localConfig.loggerProvider.log(success);
      }
    };
    return RemoteConfigFetch2;
  }()
);
var createRemoteConfigFetch = function(_a) {
  var localConfig = _a.localConfig, configKeys = _a.configKeys;
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_b) {
      return [2, new RemoteConfigFetch({ localConfig, configKeys })];
    });
  });
};

// ../../.yarn/cache/@amplitude-analytics-remote-config-npm-0.4.1-59ac2ce6d4-b48564fe18.zip/node_modules/@amplitude/analytics-remote-config/lib/esm/index.js
var createRemoteConfigFetch2 = createRemoteConfigFetch;

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/config/joined-config.js
var BrowserJoinedConfigGenerator = (
  /** @class */
  function() {
    function BrowserJoinedConfigGenerator2(localConfig) {
      this.config = localConfig;
      this.config.loggerProvider.debug("Local configuration before merging with remote config", JSON.stringify(this.config, null, 2));
    }
    BrowserJoinedConfigGenerator2.prototype.initialize = function() {
      return __awaiter(this, void 0, void 0, function() {
        var _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              _a = this;
              return [4, createRemoteConfigFetch2({
                localConfig: this.config,
                configKeys: ["analyticsSDK"]
              })];
            case 1:
              _a.remoteConfigFetch = _b.sent();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    BrowserJoinedConfigGenerator2.prototype.generateJoinedConfig = function() {
      var _a, _b, _c;
      var _d;
      return __awaiter(this, void 0, void 0, function() {
        var remoteConfig, _e, e_1;
        return __generator(this, function(_f) {
          switch (_f.label) {
            case 0:
              _f.trys.push([0, 3, , 4]);
              _e = this.remoteConfigFetch;
              if (!_e) return [3, 2];
              return [4, this.remoteConfigFetch.getRemoteConfig("analyticsSDK", "browserSDK", this.config.sessionId)];
            case 1:
              _e = _f.sent();
              _f.label = 2;
            case 2:
              remoteConfig = _e;
              this.config.loggerProvider.debug("Remote configuration:", JSON.stringify(remoteConfig, null, 2));
              if (remoteConfig && "autocapture" in remoteConfig) {
                if (typeof remoteConfig.autocapture === "boolean") {
                  this.config.autocapture = remoteConfig.autocapture;
                }
                if (typeof remoteConfig.autocapture === "object") {
                  if (this.config.autocapture === void 0) {
                    this.config.autocapture = remoteConfig.autocapture;
                  }
                  if (typeof this.config.autocapture === "boolean") {
                    this.config.autocapture = __assign({ attribution: this.config.autocapture, fileDownloads: this.config.autocapture, formInteractions: this.config.autocapture, pageViews: this.config.autocapture, sessions: this.config.autocapture, elementInteractions: this.config.autocapture }, remoteConfig.autocapture);
                  }
                  if (typeof this.config.autocapture === "object") {
                    this.config.autocapture = __assign(__assign({}, this.config.autocapture), remoteConfig.autocapture);
                  }
                }
                this.config.defaultTracking = this.config.autocapture;
              }
              this.config.loggerProvider.debug("Joined configuration: ", JSON.stringify(this.config, null, 2));
              (_a = (_d = this.config).requestMetadata) !== null && _a !== void 0 ? _a : _d.requestMetadata = new RequestMetadata();
              if ((_b = this.remoteConfigFetch) === null || _b === void 0 ? void 0 : _b.metrics.fetchTimeAPISuccess) {
                this.config.requestMetadata.recordHistogram("remote_config_fetch_time_API_success", this.remoteConfigFetch.metrics.fetchTimeAPISuccess);
              }
              if ((_c = this.remoteConfigFetch) === null || _c === void 0 ? void 0 : _c.metrics.fetchTimeAPIFail) {
                this.config.requestMetadata.recordHistogram("remote_config_fetch_time_API_fail", this.remoteConfigFetch.metrics.fetchTimeAPIFail);
              }
              return [3, 4];
            case 3:
              e_1 = _f.sent();
              this.config.loggerProvider.error("Failed to fetch remote configuration because of error: ", e_1);
              return [3, 4];
            case 4:
              return [2, this.config];
          }
        });
      });
    };
    return BrowserJoinedConfigGenerator2;
  }()
);
var createBrowserJoinedConfigGenerator = function(localConfig) {
  return __awaiter(void 0, void 0, void 0, function() {
    var joinedConfigGenerator;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          joinedConfigGenerator = new BrowserJoinedConfigGenerator(localConfig);
          return [4, joinedConfigGenerator.initialize()];
        case 1:
          _a.sent();
          return [2, joinedConfigGenerator];
      }
    });
  });
};

// ../../.yarn/cache/@amplitude-plugin-autocapture-browser-npm-1.0.4-7936c5ddf6-3dc4ee8711.zip/node_modules/@amplitude/plugin-autocapture-browser/lib/esm/constants.js
var PLUGIN_NAME = "@amplitude/plugin-autocapture-browser";
var AMPLITUDE_ELEMENT_CLICKED_EVENT = "[Amplitude] Element Clicked";
var AMPLITUDE_ELEMENT_CHANGED_EVENT = "[Amplitude] Element Changed";
var AMPLITUDE_EVENT_PROP_ELEMENT_ID = "[Amplitude] Element ID";
var AMPLITUDE_EVENT_PROP_ELEMENT_CLASS = "[Amplitude] Element Class";
var AMPLITUDE_EVENT_PROP_ELEMENT_TAG = "[Amplitude] Element Tag";
var AMPLITUDE_EVENT_PROP_ELEMENT_TEXT = "[Amplitude] Element Text";
var AMPLITUDE_EVENT_PROP_ELEMENT_HIERARCHY = "[Amplitude] Element Hierarchy";
var AMPLITUDE_EVENT_PROP_ELEMENT_HREF = "[Amplitude] Element Href";
var AMPLITUDE_EVENT_PROP_ELEMENT_POSITION_LEFT = "[Amplitude] Element Position Left";
var AMPLITUDE_EVENT_PROP_ELEMENT_POSITION_TOP = "[Amplitude] Element Position Top";
var AMPLITUDE_EVENT_PROP_ELEMENT_ARIA_LABEL = "[Amplitude] Element Aria Label";
var AMPLITUDE_EVENT_PROP_ELEMENT_ATTRIBUTES = "[Amplitude] Element Attributes";
var AMPLITUDE_EVENT_PROP_ELEMENT_SELECTOR = "[Amplitude] Element Selector";
var AMPLITUDE_EVENT_PROP_ELEMENT_PARENT_LABEL = "[Amplitude] Element Parent Label";
var AMPLITUDE_EVENT_PROP_PAGE_URL = "[Amplitude] Page URL";
var AMPLITUDE_EVENT_PROP_PAGE_TITLE = "[Amplitude] Page Title";
var AMPLITUDE_EVENT_PROP_VIEWPORT_HEIGHT = "[Amplitude] Viewport Height";
var AMPLITUDE_EVENT_PROP_VIEWPORT_WIDTH = "[Amplitude] Viewport Width";
var AMPLITUDE_ORIGIN = "https://app.amplitude.com";
var AMPLITUDE_ORIGIN_EU = "https://app.eu.amplitude.com";
var AMPLITUDE_ORIGIN_STAGING = "https://apps.stag2.amplitude.com";
var AMPLITUDE_ORIGINS_MAP = {
  US: AMPLITUDE_ORIGIN,
  EU: AMPLITUDE_ORIGIN_EU,
  STAGING: AMPLITUDE_ORIGIN_STAGING
};
var AMPLITUDE_VISUAL_TAGGING_SELECTOR_SCRIPT_URL = "https://cdn.amplitude.com/libs/visual-tagging-selector-1.0.0-alpha.js.gz";
var AMPLITUDE_VISUAL_TAGGING_HIGHLIGHT_CLASS = "amp-visual-tagging-selector-highlight";

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function isFunction(value) {
  return typeof value === "function";
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function arrRemove(arr, item) {
  if (arr) {
    var index2 = arr.indexOf(item);
    0 <= index2 && arr.splice(index2, 1);
  }
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/Subscription.js
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty2 = new Subscription2();
    empty2.closed = true;
    return empty2;
  }();
  return Subscription2;
}();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/config.js
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
var timeoutProvider = {
  setTimeout: function(handler, timeout2) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = timeoutProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
      return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout2], __read(args)));
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout2], __read(args)));
  },
  clearTimeout: function(handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: void 0
};

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    var onUnhandledError = config.onUnhandledError;
    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/noop.js
function noop() {
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var COMPLETE_NOTIFICATION = function() {
  return createNotification("C", void 0, void 0);
}();
function errorNotification(error) {
  return createNotification("E", void 0, error);
}
function nextNotification(value) {
  return createNotification("N", value, void 0);
}
function createNotification(kind, value, error) {
  return {
    kind,
    value,
    error
  };
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var context = null;
function errorContext(cb) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    var isRoot = !context;
    if (isRoot) {
      context = { errorThrown: false, error: null };
    }
    cb();
    if (isRoot) {
      var _a = context, errorThrown = _a.errorThrown, error = _a.error;
      context = null;
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
function captureError(err) {
  if (config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/Subscriber.js
var Subscriber = function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) {
      handleStoppedNotification(nextNotification(value), this);
    } else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) {
      handleStoppedNotification(errorNotification(err), this);
    } else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) {
      handleStoppedNotification(COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
}(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
}();
var SafeSubscriber = function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      var context_1;
      if (_this && config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function() {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
}(Subscriber);
function handleUnhandledError(error) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    captureError(error);
  } else {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
function handleStoppedNotification(notification, subscriber) {
  var onStoppedNotification = config.onStoppedNotification;
  onStoppedNotification && timeoutProvider.setTimeout(function() {
    return onStoppedNotification(notification, subscriber);
  });
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/symbol/observable.js
var observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/identity.js
function identity(x) {
  return x;
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/pipe.js
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/Observable.js
var Observable = function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
}();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/lift.js
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init2) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init2(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
}(Subscriber);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/refCount.js
function refCount() {
  return operate(function(source, subscriber) {
    var connection = null;
    source._refCount++;
    var refCounter = createOperatorSubscriber(subscriber, void 0, void 0, void 0, function() {
      if (!source || source._refCount <= 0 || 0 < --source._refCount) {
        connection = null;
        return;
      }
      var sharedConnection = source._connection;
      var conn = connection;
      connection = null;
      if (sharedConnection && (!conn || sharedConnection === conn)) {
        sharedConnection.unsubscribe();
      }
      subscriber.unsubscribe();
    });
    source.subscribe(refCounter);
    if (!refCounter.closed) {
      connection = source.connect();
    }
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/observable/ConnectableObservable.js
var ConnectableObservable = function(_super) {
  __extends(ConnectableObservable2, _super);
  function ConnectableObservable2(source, subjectFactory) {
    var _this = _super.call(this) || this;
    _this.source = source;
    _this.subjectFactory = subjectFactory;
    _this._subject = null;
    _this._refCount = 0;
    _this._connection = null;
    if (hasLift(source)) {
      _this.lift = source.lift;
    }
    return _this;
  }
  ConnectableObservable2.prototype._subscribe = function(subscriber) {
    return this.getSubject().subscribe(subscriber);
  };
  ConnectableObservable2.prototype.getSubject = function() {
    var subject = this._subject;
    if (!subject || subject.isStopped) {
      this._subject = this.subjectFactory();
    }
    return this._subject;
  };
  ConnectableObservable2.prototype._teardown = function() {
    this._refCount = 0;
    var _connection = this._connection;
    this._subject = this._connection = null;
    _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
  };
  ConnectableObservable2.prototype.connect = function() {
    var _this = this;
    var connection = this._connection;
    if (!connection) {
      connection = this._connection = new Subscription();
      var subject_1 = this.getSubject();
      connection.add(this.source.subscribe(createOperatorSubscriber(subject_1, void 0, function() {
        _this._teardown();
        subject_1.complete();
      }, function(err) {
        _this._teardown();
        subject_1.error(err);
      }, function() {
        return _this._teardown();
      })));
      if (connection.closed) {
        this._connection = null;
        connection = Subscription.EMPTY;
      }
    }
    return connection;
  };
  ConnectableObservable2.prototype.refCount = function() {
    return refCount()(this);
  };
  return ConnectableObservable2;
}(Observable);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/performanceTimestampProvider.js
var performanceTimestampProvider = {
  now: function() {
    return (performanceTimestampProvider.delegate || performance).now();
  },
  delegate: void 0
};

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/animationFrameProvider.js
var animationFrameProvider = {
  schedule: function(callback) {
    var request = requestAnimationFrame;
    var cancel = cancelAnimationFrame;
    var delegate = animationFrameProvider.delegate;
    if (delegate) {
      request = delegate.requestAnimationFrame;
      cancel = delegate.cancelAnimationFrame;
    }
    var handle = request(function(timestamp2) {
      cancel = void 0;
      callback(timestamp2);
    });
    return new Subscription(function() {
      return cancel === null || cancel === void 0 ? void 0 : cancel(handle);
    });
  },
  requestAnimationFrame: function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var delegate = animationFrameProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
  },
  cancelAnimationFrame: function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var delegate = animationFrameProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
  },
  delegate: void 0
};

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/observable/dom/animationFrames.js
function animationFramesFactory(timestampProvider) {
  return new Observable(function(subscriber) {
    var provider = timestampProvider || performanceTimestampProvider;
    var start = provider.now();
    var id2 = 0;
    var run = function() {
      if (!subscriber.closed) {
        id2 = animationFrameProvider.requestAnimationFrame(function(timestamp2) {
          id2 = 0;
          var now = provider.now();
          subscriber.next({
            timestamp: timestampProvider ? now : timestamp2,
            elapsed: now - start
          });
          run();
        });
      }
    };
    run();
    return function() {
      if (id2) {
        animationFrameProvider.cancelAnimationFrame(id2);
      }
    };
  });
}
var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
var ObjectUnsubscribedError = createErrorClass(function(_super) {
  return function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = "ObjectUnsubscribedError";
    this.message = "object unsubscribed";
  };
});

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/Subject.js
var Subject = function(_super) {
  __extends(Subject2, _super);
  function Subject2() {
    var _this = _super.call(this) || this;
    _this.closed = false;
    _this.currentObservers = null;
    _this.observers = [];
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }
  Subject2.prototype.lift = function(operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };
  Subject2.prototype._throwIfClosed = function() {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
  };
  Subject2.prototype.next = function(value) {
    var _this = this;
    errorContext(function() {
      var e_1, _a;
      _this._throwIfClosed();
      if (!_this.isStopped) {
        if (!_this.currentObservers) {
          _this.currentObservers = Array.from(_this.observers);
        }
        try {
          for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
            var observer = _c.value;
            observer.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
    });
  };
  Subject2.prototype.error = function(err) {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.hasError = _this.isStopped = true;
        _this.thrownError = err;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  };
  Subject2.prototype.complete = function() {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.isStopped = true;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  };
  Subject2.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true;
    this.observers = this.currentObservers = null;
  };
  Object.defineProperty(Subject2.prototype, "observed", {
    get: function() {
      var _a;
      return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    },
    enumerable: false,
    configurable: true
  });
  Subject2.prototype._trySubscribe = function(subscriber) {
    this._throwIfClosed();
    return _super.prototype._trySubscribe.call(this, subscriber);
  };
  Subject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  };
  Subject2.prototype._innerSubscribe = function(subscriber) {
    var _this = this;
    var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
    if (hasError || isStopped) {
      return EMPTY_SUBSCRIPTION;
    }
    this.currentObservers = null;
    observers.push(subscriber);
    return new Subscription(function() {
      _this.currentObservers = null;
      arrRemove(observers, subscriber);
    });
  };
  Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  };
  Subject2.prototype.asObservable = function() {
    var observable2 = new Observable();
    observable2.source = this;
    return observable2;
  };
  Subject2.create = function(destination, source) {
    return new AnonymousSubject(destination, source);
  };
  return Subject2;
}(Observable);
var AnonymousSubject = function(_super) {
  __extends(AnonymousSubject2, _super);
  function AnonymousSubject2(destination, source) {
    var _this = _super.call(this) || this;
    _this.destination = destination;
    _this.source = source;
    return _this;
  }
  AnonymousSubject2.prototype.next = function(value) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  AnonymousSubject2.prototype.error = function(err) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  };
  AnonymousSubject2.prototype.complete = function() {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  };
  AnonymousSubject2.prototype._subscribe = function(subscriber) {
    var _a, _b;
    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
  };
  return AnonymousSubject2;
}(Subject);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js
var BehaviorSubject = function(_super) {
  __extends(BehaviorSubject2, _super);
  function BehaviorSubject2(_value) {
    var _this = _super.call(this) || this;
    _this._value = _value;
    return _this;
  }
  Object.defineProperty(BehaviorSubject2.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: false,
    configurable: true
  });
  BehaviorSubject2.prototype._subscribe = function(subscriber) {
    var subscription = _super.prototype._subscribe.call(this, subscriber);
    !subscription.closed && subscriber.next(this._value);
    return subscription;
  };
  BehaviorSubject2.prototype.getValue = function() {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
    if (hasError) {
      throw thrownError;
    }
    this._throwIfClosed();
    return _value;
  };
  BehaviorSubject2.prototype.next = function(value) {
    _super.prototype.next.call(this, this._value = value);
  };
  return BehaviorSubject2;
}(Subject);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js
var dateTimestampProvider = {
  now: function() {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: void 0
};

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/ReplaySubject.js
var ReplaySubject = function(_super) {
  __extends(ReplaySubject2, _super);
  function ReplaySubject2(_bufferSize, _windowTime, _timestampProvider) {
    if (_bufferSize === void 0) {
      _bufferSize = Infinity;
    }
    if (_windowTime === void 0) {
      _windowTime = Infinity;
    }
    if (_timestampProvider === void 0) {
      _timestampProvider = dateTimestampProvider;
    }
    var _this = _super.call(this) || this;
    _this._bufferSize = _bufferSize;
    _this._windowTime = _windowTime;
    _this._timestampProvider = _timestampProvider;
    _this._buffer = [];
    _this._infiniteTimeWindow = true;
    _this._infiniteTimeWindow = _windowTime === Infinity;
    _this._bufferSize = Math.max(1, _bufferSize);
    _this._windowTime = Math.max(1, _windowTime);
    return _this;
  }
  ReplaySubject2.prototype.next = function(value) {
    var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
    if (!isStopped) {
      _buffer.push(value);
      !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
    }
    this._trimBuffer();
    _super.prototype.next.call(this, value);
  };
  ReplaySubject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._trimBuffer();
    var subscription = this._innerSubscribe(subscriber);
    var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
    var copy = _buffer.slice();
    for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
      subscriber.next(copy[i]);
    }
    this._checkFinalizedStatuses(subscriber);
    return subscription;
  };
  ReplaySubject2.prototype._trimBuffer = function() {
    var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
    var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
    _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
    if (!_infiniteTimeWindow) {
      var now = _timestampProvider.now();
      var last3 = 0;
      for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
        last3 = i;
      }
      last3 && _buffer.splice(0, last3 + 1);
    }
  };
  return ReplaySubject2;
}(Subject);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/AsyncSubject.js
var AsyncSubject = function(_super) {
  __extends(AsyncSubject2, _super);
  function AsyncSubject2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this._value = null;
    _this._hasValue = false;
    _this._isComplete = false;
    return _this;
  }
  AsyncSubject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped || _isComplete) {
      _hasValue && subscriber.next(_value);
      subscriber.complete();
    }
  };
  AsyncSubject2.prototype.next = function(value) {
    if (!this.isStopped) {
      this._value = value;
      this._hasValue = true;
    }
  };
  AsyncSubject2.prototype.complete = function() {
    var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
    if (!_isComplete) {
      this._isComplete = true;
      _hasValue && _super.prototype.next.call(this, _value);
      _super.prototype.complete.call(this);
    }
  };
  return AsyncSubject2;
}(Subject);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/Action.js
var Action = function(_super) {
  __extends(Action2, _super);
  function Action2(scheduler, work) {
    return _super.call(this) || this;
  }
  Action2.prototype.schedule = function(state, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return this;
  };
  return Action2;
}(Subscription);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js
var intervalProvider = {
  setInterval: function(handler, timeout2) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = intervalProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
      return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout2], __read(args)));
    }
    return setInterval.apply(void 0, __spreadArray([handler, timeout2], __read(args)));
  },
  clearInterval: function(handle) {
    var delegate = intervalProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
  },
  delegate: void 0
};

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js
var AsyncAction = function(_super) {
  __extends(AsyncAction2, _super);
  function AsyncAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }
  AsyncAction2.prototype.schedule = function(state, delay2) {
    var _a;
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (this.closed) {
      return this;
    }
    this.state = state;
    var id2 = this.id;
    var scheduler = this.scheduler;
    if (id2 != null) {
      this.id = this.recycleAsyncId(scheduler, id2, delay2);
    }
    this.pending = true;
    this.delay = delay2;
    this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay2);
    return this;
  };
  AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay2);
  };
  AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id2, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null && this.delay === delay2 && this.pending === false) {
      return id2;
    }
    if (id2 != null) {
      intervalProvider.clearInterval(id2);
    }
    return void 0;
  };
  AsyncAction2.prototype.execute = function(state, delay2) {
    if (this.closed) {
      return new Error("executing a cancelled action");
    }
    this.pending = false;
    var error = this._execute(state, delay2);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };
  AsyncAction2.prototype._execute = function(state, _delay) {
    var errored = false;
    var errorValue;
    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = e ? e : new Error("Scheduled action threw falsy error");
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };
  AsyncAction2.prototype.unsubscribe = function() {
    if (!this.closed) {
      var _a = this, id2 = _a.id, scheduler = _a.scheduler;
      var actions = scheduler.actions;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      arrRemove(actions, this);
      if (id2 != null) {
        this.id = this.recycleAsyncId(scheduler, id2, null);
      }
      this.delay = null;
      _super.prototype.unsubscribe.call(this);
    }
  };
  return AsyncAction2;
}(Action);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/Immediate.js
var nextHandle = 1;
var resolved;
var activeHandles = {};
function findAndClearHandle(handle) {
  if (handle in activeHandles) {
    delete activeHandles[handle];
    return true;
  }
  return false;
}
var Immediate = {
  setImmediate: function(cb) {
    var handle = nextHandle++;
    activeHandles[handle] = true;
    if (!resolved) {
      resolved = Promise.resolve();
    }
    resolved.then(function() {
      return findAndClearHandle(handle) && cb();
    });
    return handle;
  },
  clearImmediate: function(handle) {
    findAndClearHandle(handle);
  }
};

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/immediateProvider.js
var setImmediate = Immediate.setImmediate;
var clearImmediate = Immediate.clearImmediate;
var immediateProvider = {
  setImmediate: function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var delegate = immediateProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
  },
  clearImmediate: function(handle) {
    var delegate = immediateProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
  },
  delegate: void 0
};

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/AsapAction.js
var AsapAction = function(_super) {
  __extends(AsapAction2, _super);
  function AsapAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }
  AsapAction2.prototype.requestAsyncId = function(scheduler, id2, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 !== null && delay2 > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id2, delay2);
    }
    scheduler.actions.push(this);
    return scheduler._scheduled || (scheduler._scheduled = immediateProvider.setImmediate(scheduler.flush.bind(scheduler, void 0)));
  };
  AsapAction2.prototype.recycleAsyncId = function(scheduler, id2, delay2) {
    var _a;
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null ? delay2 > 0 : this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id2, delay2);
    }
    var actions = scheduler.actions;
    if (id2 != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id2) {
      immediateProvider.clearImmediate(id2);
      if (scheduler._scheduled === id2) {
        scheduler._scheduled = void 0;
      }
    }
    return void 0;
  };
  return AsapAction2;
}(AsyncAction);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/Scheduler.js
var Scheduler = function() {
  function Scheduler2(schedulerActionCtor, now) {
    if (now === void 0) {
      now = Scheduler2.now;
    }
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }
  Scheduler2.prototype.schedule = function(work, delay2, state) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return new this.schedulerActionCtor(this, work).schedule(state, delay2);
  };
  Scheduler2.now = dateTimestampProvider.now;
  return Scheduler2;
}();

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js
var AsyncScheduler = function(_super) {
  __extends(AsyncScheduler2, _super);
  function AsyncScheduler2(SchedulerAction, now) {
    if (now === void 0) {
      now = Scheduler.now;
    }
    var _this = _super.call(this, SchedulerAction, now) || this;
    _this.actions = [];
    _this._active = false;
    return _this;
  }
  AsyncScheduler2.prototype.flush = function(action) {
    var actions = this.actions;
    if (this._active) {
      actions.push(action);
      return;
    }
    var error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsyncScheduler2;
}(Scheduler);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/AsapScheduler.js
var AsapScheduler = function(_super) {
  __extends(AsapScheduler2, _super);
  function AsapScheduler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  AsapScheduler2.prototype.flush = function(action) {
    this._active = true;
    var flushId = this._scheduled;
    this._scheduled = void 0;
    var actions = this.actions;
    var error;
    action = action || actions.shift();
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while ((action = actions[0]) && action.id === flushId && actions.shift());
    this._active = false;
    if (error) {
      while ((action = actions[0]) && action.id === flushId && actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsapScheduler2;
}(AsyncScheduler);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/asap.js
var asapScheduler = new AsapScheduler(AsapAction);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/async.js
var asyncScheduler = new AsyncScheduler(AsyncAction);
var async = asyncScheduler;

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/QueueAction.js
var QueueAction = function(_super) {
  __extends(QueueAction2, _super);
  function QueueAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }
  QueueAction2.prototype.schedule = function(state, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 > 0) {
      return _super.prototype.schedule.call(this, state, delay2);
    }
    this.delay = delay2;
    this.state = state;
    this.scheduler.flush(this);
    return this;
  };
  QueueAction2.prototype.execute = function(state, delay2) {
    return delay2 > 0 || this.closed ? _super.prototype.execute.call(this, state, delay2) : this._execute(state, delay2);
  };
  QueueAction2.prototype.requestAsyncId = function(scheduler, id2, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null && delay2 > 0 || delay2 == null && this.delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id2, delay2);
    }
    scheduler.flush(this);
    return 0;
  };
  return QueueAction2;
}(AsyncAction);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/QueueScheduler.js
var QueueScheduler = function(_super) {
  __extends(QueueScheduler2, _super);
  function QueueScheduler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return QueueScheduler2;
}(AsyncScheduler);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/queue.js
var queueScheduler = new QueueScheduler(QueueAction);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameAction.js
var AnimationFrameAction = function(_super) {
  __extends(AnimationFrameAction2, _super);
  function AnimationFrameAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }
  AnimationFrameAction2.prototype.requestAsyncId = function(scheduler, id2, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 !== null && delay2 > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id2, delay2);
    }
    scheduler.actions.push(this);
    return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider.requestAnimationFrame(function() {
      return scheduler.flush(void 0);
    }));
  };
  AnimationFrameAction2.prototype.recycleAsyncId = function(scheduler, id2, delay2) {
    var _a;
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null ? delay2 > 0 : this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id2, delay2);
    }
    var actions = scheduler.actions;
    if (id2 != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id2) {
      animationFrameProvider.cancelAnimationFrame(id2);
      scheduler._scheduled = void 0;
    }
    return void 0;
  };
  return AnimationFrameAction2;
}(AsyncAction);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameScheduler.js
var AnimationFrameScheduler = function(_super) {
  __extends(AnimationFrameScheduler2, _super);
  function AnimationFrameScheduler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  AnimationFrameScheduler2.prototype.flush = function(action) {
    this._active = true;
    var flushId = this._scheduled;
    this._scheduled = void 0;
    var actions = this.actions;
    var error;
    action = action || actions.shift();
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while ((action = actions[0]) && action.id === flushId && actions.shift());
    this._active = false;
    if (error) {
      while ((action = actions[0]) && action.id === flushId && actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AnimationFrameScheduler2;
}(AsyncScheduler);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/animationFrame.js
var animationFrameScheduler = new AnimationFrameScheduler(AnimationFrameAction);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduler/VirtualTimeScheduler.js
var VirtualTimeScheduler = function(_super) {
  __extends(VirtualTimeScheduler2, _super);
  function VirtualTimeScheduler2(schedulerActionCtor, maxFrames) {
    if (schedulerActionCtor === void 0) {
      schedulerActionCtor = VirtualAction;
    }
    if (maxFrames === void 0) {
      maxFrames = Infinity;
    }
    var _this = _super.call(this, schedulerActionCtor, function() {
      return _this.frame;
    }) || this;
    _this.maxFrames = maxFrames;
    _this.frame = 0;
    _this.index = -1;
    return _this;
  }
  VirtualTimeScheduler2.prototype.flush = function() {
    var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
    var error;
    var action;
    while ((action = actions[0]) && action.delay <= maxFrames) {
      actions.shift();
      this.frame = action.delay;
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    }
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  VirtualTimeScheduler2.frameTimeFactor = 10;
  return VirtualTimeScheduler2;
}(AsyncScheduler);
var VirtualAction = function(_super) {
  __extends(VirtualAction2, _super);
  function VirtualAction2(scheduler, work, index2) {
    if (index2 === void 0) {
      index2 = scheduler.index += 1;
    }
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.index = index2;
    _this.active = true;
    _this.index = scheduler.index = index2;
    return _this;
  }
  VirtualAction2.prototype.schedule = function(state, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (Number.isFinite(delay2)) {
      if (!this.id) {
        return _super.prototype.schedule.call(this, state, delay2);
      }
      this.active = false;
      var action = new VirtualAction2(this.scheduler, this.work);
      this.add(action);
      return action.schedule(state, delay2);
    } else {
      return Subscription.EMPTY;
    }
  };
  VirtualAction2.prototype.requestAsyncId = function(scheduler, id2, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    this.delay = scheduler.frame + delay2;
    var actions = scheduler.actions;
    actions.push(this);
    actions.sort(VirtualAction2.sortActions);
    return 1;
  };
  VirtualAction2.prototype.recycleAsyncId = function(scheduler, id2, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return void 0;
  };
  VirtualAction2.prototype._execute = function(state, delay2) {
    if (this.active === true) {
      return _super.prototype._execute.call(this, state, delay2);
    }
  };
  VirtualAction2.sortActions = function(a, b) {
    if (a.delay === b.delay) {
      if (a.index === b.index) {
        return 0;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return -1;
      }
    } else if (a.delay > b.delay) {
      return 1;
    } else {
      return -1;
    }
  };
  return VirtualAction2;
}(AsyncAction);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/observable/empty.js
var EMPTY = new Observable(function(subscriber) {
  return subscriber.complete();
});

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/isScheduler.js
function isScheduler(value) {
  return value && isFunction(value.schedule);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/args.js
function last(arr) {
  return arr[arr.length - 1];
}
function popScheduler(args) {
  return isScheduler(last(args)) ? args.pop() : void 0;
}
function popNumber(args, defaultValue) {
  return typeof last(args) === "number" ? args.pop() : defaultValue;
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
var isArrayLike = function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
};

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/isPromise.js
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
function isInteropObservable(input) {
  return isFunction(input[observable]);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/isIterable.js
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          if (false) return [3, 8];
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done) return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2) throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
function executeSchedule(parentSubscription, scheduler, work, delay2, repeat2) {
  if (delay2 === void 0) {
    delay2 = 0;
  }
  if (repeat2 === void 0) {
    repeat2 = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat2) {
      parentSubscription.add(this.schedule(null, delay2));
    } else {
      this.unsubscribe();
    }
  }, delay2);
  parentSubscription.add(scheduleSubscription);
  if (!repeat2) {
    return scheduleSubscription;
  }
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/observeOn.js
function observeOn(scheduler, delay2) {
  if (delay2 === void 0) {
    delay2 = 0;
  }
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay2);
    }, function() {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay2);
    }, function(err) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay2);
    }));
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js
function subscribeOn(scheduler, delay2) {
  if (delay2 === void 0) {
    delay2 = 0;
  }
  return operate(function(source, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source.subscribe(subscriber);
    }, delay2));
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var i = 0;
    return scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js
function scheduleIterable(input, scheduler) {
  return new Observable(function(subscriber) {
    var iterator2;
    executeSchedule(subscriber, scheduler, function() {
      iterator2 = input[iterator]();
      executeSchedule(subscriber, scheduler, function() {
        var _a;
        var value;
        var done;
        try {
          _a = iterator2.next(), value = _a.value, done = _a.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction(iterator2 === null || iterator2 === void 0 ? void 0 : iterator2.return) && iterator2.return();
    };
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/observable/from.js
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/observable/of.js
function of() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  return from(args, scheduler);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/observable/throwError.js
function throwError(errorOrErrorFactory, scheduler) {
  var errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
    return errorOrErrorFactory;
  };
  var init2 = function(subscriber) {
    return subscriber.error(errorFactory());
  };
  return new Observable(scheduler ? function(subscriber) {
    return scheduler.schedule(init2, 0, subscriber);
  } : init2);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/Notification.js
var NotificationKind;
(function(NotificationKind2) {
  NotificationKind2["NEXT"] = "N";
  NotificationKind2["ERROR"] = "E";
  NotificationKind2["COMPLETE"] = "C";
})(NotificationKind || (NotificationKind = {}));
var Notification = function() {
  function Notification2(kind, value, error) {
    this.kind = kind;
    this.value = value;
    this.error = error;
    this.hasValue = kind === "N";
  }
  Notification2.prototype.observe = function(observer) {
    return observeNotification(this, observer);
  };
  Notification2.prototype.do = function(nextHandler, errorHandler, completeHandler) {
    var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
    return kind === "N" ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === "E" ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
  };
  Notification2.prototype.accept = function(nextOrObserver, error, complete) {
    var _a;
    return isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next) ? this.observe(nextOrObserver) : this.do(nextOrObserver, error, complete);
  };
  Notification2.prototype.toObservable = function() {
    var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
    var result = kind === "N" ? of(value) : kind === "E" ? throwError(function() {
      return error;
    }) : kind === "C" ? EMPTY : 0;
    if (!result) {
      throw new TypeError("Unexpected notification kind " + kind);
    }
    return result;
  };
  Notification2.createNext = function(value) {
    return new Notification2("N", value);
  };
  Notification2.createError = function(err) {
    return new Notification2("E", void 0, err);
  };
  Notification2.createComplete = function() {
    return Notification2.completeNotification;
  };
  Notification2.completeNotification = new Notification2("C");
  return Notification2;
}();
function observeNotification(notification, observer) {
  var _a, _b, _c;
  var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
  if (typeof kind !== "string") {
    throw new TypeError('Invalid notification, missing "kind"');
  }
  kind === "N" ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === "E" ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/EmptyError.js
var EmptyError = createErrorClass(function(_super) {
  return function EmptyErrorImpl() {
    _super(this);
    this.name = "EmptyError";
    this.message = "no elements in sequence";
  };
});

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/ArgumentOutOfRangeError.js
var ArgumentOutOfRangeError = createErrorClass(function(_super) {
  return function ArgumentOutOfRangeErrorImpl() {
    _super(this);
    this.name = "ArgumentOutOfRangeError";
    this.message = "argument out of range";
  };
});

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/NotFoundError.js
var NotFoundError = createErrorClass(function(_super) {
  return function NotFoundErrorImpl(message) {
    _super(this);
    this.name = "NotFoundError";
    this.message = message;
  };
});

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/SequenceError.js
var SequenceError = createErrorClass(function(_super) {
  return function SequenceErrorImpl(message) {
    _super(this);
    this.name = "SequenceError";
    this.message = message;
  };
});

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/isDate.js
function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/timeout.js
var TimeoutError = createErrorClass(function(_super) {
  return function TimeoutErrorImpl(info) {
    if (info === void 0) {
      info = null;
    }
    _super(this);
    this.message = "Timeout has occurred";
    this.name = "TimeoutError";
    this.info = info;
  };
});
function timeout(config3, schedulerArg) {
  var _a = isValidDate(config3) ? { first: config3 } : typeof config3 === "number" ? { each: config3 } : config3, first2 = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
  if (first2 == null && each == null) {
    throw new TypeError("No timeout provided.");
  }
  return operate(function(source, subscriber) {
    var originalSourceSubscription;
    var timerSubscription;
    var lastValue = null;
    var seen = 0;
    var startTimer = function(delay2) {
      timerSubscription = executeSchedule(subscriber, scheduler, function() {
        try {
          originalSourceSubscription.unsubscribe();
          innerFrom(_with({
            meta,
            lastValue,
            seen
          })).subscribe(subscriber);
        } catch (err) {
          subscriber.error(err);
        }
      }, delay2);
    };
    originalSourceSubscription = source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
      seen++;
      subscriber.next(lastValue = value);
      each > 0 && startTimer(each);
    }, void 0, void 0, function() {
      if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
        timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
      }
      lastValue = null;
    }));
    !seen && startTimer(first2 != null ? typeof first2 === "number" ? first2 : +first2 - scheduler.now() : each);
  });
}
function timeoutErrorFactory(info) {
  throw new TimeoutError(info);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/map.js
function map(project, thisArg) {
  return operate(function(source, subscriber) {
    var index2 = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index2++));
    }));
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js
var isArray = Array.isArray;
function callOrApply(fn, args) {
  return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
  return map(function(args) {
    return callOrApply(fn, args);
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js
var isArray2 = Array.isArray;
var objectProto = Object.prototype;

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand2, innerSubScheduler, additionalFinalizer) {
  var buffer2 = [];
  var active = 0;
  var index2 = 0;
  var isComplete = false;
  var checkComplete = function() {
    if (isComplete && !buffer2.length && !active) {
      subscriber.complete();
    }
  };
  var outerNext = function(value) {
    return active < concurrent ? doInnerSub(value) : buffer2.push(value);
  };
  var doInnerSub = function(value) {
    expand2 && subscriber.next(value);
    active++;
    var innerComplete = false;
    innerFrom(project(value, index2++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
      onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
      if (expand2) {
        outerNext(innerValue);
      } else {
        subscriber.next(innerValue);
      }
    }, function() {
      innerComplete = true;
    }, void 0, function() {
      if (innerComplete) {
        try {
          active--;
          var _loop_1 = function() {
            var bufferedValue = buffer2.shift();
            if (innerSubScheduler) {
              executeSchedule(subscriber, innerSubScheduler, function() {
                return doInnerSub(bufferedValue);
              });
            } else {
              doInnerSub(bufferedValue);
            }
          };
          while (buffer2.length && active < concurrent) {
            _loop_1();
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };
  source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
    isComplete = true;
    checkComplete();
  }));
  return function() {
    additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
  };
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js
function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction(resultSelector)) {
    return mergeMap(function(a, i) {
      return map(function(b, ii) {
        return resultSelector(a, b, i, ii);
      })(innerFrom(project(a, i)));
    }, concurrent);
  } else if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return operate(function(source, subscriber) {
    return mergeInternals(source, subscriber, project, concurrent);
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js
function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  return mergeMap(identity, concurrent);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/concatAll.js
function concatAll() {
  return mergeAll(1);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/observable/concat.js
function concat() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return concatAll()(from(args, popScheduler(args)));
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js
var nodeEventEmitterMethods = ["addListener", "removeListener"];
var eventTargetMethods = ["addEventListener", "removeEventListener"];
var jqueryMethods = ["on", "off"];
function fromEvent(target, eventName, options, resultSelector) {
  if (isFunction(options)) {
    resultSelector = options;
    options = void 0;
  }
  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
  }
  var _a = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler, options);
    };
  }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add2 = _a[0], remove2 = _a[1];
  if (!add2) {
    if (isArrayLike(target)) {
      return mergeMap(function(subTarget) {
        return fromEvent(subTarget, eventName, options);
      })(innerFrom(target));
    }
  }
  if (!add2) {
    throw new TypeError("Invalid event target");
  }
  return new Observable(function(subscriber) {
    var handler = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return subscriber.next(1 < args.length ? args : args[0]);
    };
    add2(handler);
    return function() {
      return remove2(handler);
    };
  });
}
function toCommonHandlerRegistry(target, eventName) {
  return function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler);
    };
  };
}
function isNodeStyleEventEmitter(target) {
  return isFunction(target.addListener) && isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
  return isFunction(target.on) && isFunction(target.off);
}
function isEventTarget(target) {
  return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/observable/timer.js
function timer(dueTime, intervalOrScheduler, scheduler) {
  if (dueTime === void 0) {
    dueTime = 0;
  }
  if (scheduler === void 0) {
    scheduler = async;
  }
  var intervalDuration = -1;
  if (intervalOrScheduler != null) {
    if (isScheduler(intervalOrScheduler)) {
      scheduler = intervalOrScheduler;
    } else {
      intervalDuration = intervalOrScheduler;
    }
  }
  return new Observable(function(subscriber) {
    var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
    if (due < 0) {
      due = 0;
    }
    var n = 0;
    return scheduler.schedule(function() {
      if (!subscriber.closed) {
        subscriber.next(n++);
        if (0 <= intervalDuration) {
          this.schedule(void 0, intervalDuration);
        } else {
          subscriber.complete();
        }
      }
    }, due);
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/observable/merge.js
function merge() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  var concurrent = popNumber(args, Infinity);
  var sources = args;
  return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/observable/never.js
var NEVER = new Observable(noop);

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js
var isArray3 = Array.isArray;

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/filter.js
function filter(predicate, thisArg) {
  return operate(function(source, subscriber) {
    var index2 = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return predicate.call(thisArg, value, index2++) && subscriber.next(value);
    }));
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/buffer.js
function buffer(closingNotifier) {
  return operate(function(source, subscriber) {
    var currentBuffer = [];
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return currentBuffer.push(value);
    }, function() {
      subscriber.next(currentBuffer);
      subscriber.complete();
    }));
    innerFrom(closingNotifier).subscribe(createOperatorSubscriber(subscriber, function() {
      var b = currentBuffer;
      currentBuffer = [];
      subscriber.next(b);
    }, noop));
    return function() {
      currentBuffer = null;
    };
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js
function debounceTime(dueTime, scheduler) {
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  return operate(function(source, subscriber) {
    var activeTask = null;
    var lastValue = null;
    var lastTime = null;
    var emit = function() {
      if (activeTask) {
        activeTask.unsubscribe();
        activeTask = null;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };
    function emitWhenIdle() {
      var targetTime = lastTime + dueTime;
      var now = scheduler.now();
      if (now < targetTime) {
        activeTask = this.schedule(void 0, targetTime - now);
        subscriber.add(activeTask);
        return;
      }
      emit();
    }
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      lastValue = value;
      lastTime = scheduler.now();
      if (!activeTask) {
        activeTask = scheduler.schedule(emitWhenIdle, dueTime);
        subscriber.add(activeTask);
      }
    }, function() {
      emit();
      subscriber.complete();
    }, void 0, function() {
      lastValue = activeTask = null;
    }));
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/take.js
function take(count2) {
  return count2 <= 0 ? function() {
    return EMPTY;
  } : operate(function(source, subscriber) {
    var seen = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      if (++seen <= count2) {
        subscriber.next(value);
        if (count2 <= seen) {
          subscriber.complete();
        }
      }
    }));
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js
function ignoreElements() {
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, noop));
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/mapTo.js
function mapTo(value) {
  return map(function() {
    return value;
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/delayWhen.js
function delayWhen(delayDurationSelector, subscriptionDelay) {
  if (subscriptionDelay) {
    return function(source) {
      return concat(subscriptionDelay.pipe(take(1), ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
    };
  }
  return mergeMap(function(value, index2) {
    return innerFrom(delayDurationSelector(value, index2)).pipe(take(1), mapTo(value));
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/delay.js
function delay(due, scheduler) {
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  var duration = timer(due, scheduler);
  return delayWhen(function() {
    return duration;
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/pairwise.js
function pairwise() {
  return operate(function(source, subscriber) {
    var prev;
    var hasPrev = false;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var p = prev;
      prev = value;
      hasPrev && subscriber.next([p, value]);
      hasPrev = true;
    }));
  });
}

// ../../.yarn/cache/rxjs-npm-7.8.1-41c443a75b-b10cac1a52.zip/node_modules/rxjs/dist/esm5/internal/operators/switchMap.js
function switchMap(project, resultSelector) {
  return operate(function(source, subscriber) {
    var innerSubscriber = null;
    var index2 = 0;
    var isComplete = false;
    var checkComplete = function() {
      return isComplete && !innerSubscriber && subscriber.complete();
    };
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
      var innerIndex = 0;
      var outerIndex = index2++;
      innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = createOperatorSubscriber(subscriber, function(innerValue) {
        return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
      }, function() {
        innerSubscriber = null;
        checkComplete();
      }));
    }, function() {
      isComplete = true;
      checkComplete();
    }));
  });
}

// ../../.yarn/cache/@amplitude-plugin-autocapture-browser-npm-1.0.4-7936c5ddf6-3dc4ee8711.zip/node_modules/@amplitude/plugin-autocapture-browser/lib/esm/libs/finder.js
var config2;
var rootDocument;
function finder(input, options) {
  if (input.nodeType !== Node.ELEMENT_NODE) {
    throw new Error("Can't generate CSS selector for non-element node type.");
  }
  if ("html" === input.tagName.toLowerCase()) {
    return "html";
  }
  var defaults = {
    root: document.body,
    idName: function(_name) {
      return true;
    },
    className: function(_name) {
      return true;
    },
    tagName: function(_name) {
      return true;
    },
    attr: function(_name, _value) {
      return false;
    },
    seedMinLength: 1,
    optimizedMinLength: 2,
    threshold: 1e3,
    maxNumberOfTries: 1e4
  };
  config2 = __assign(__assign({}, defaults), options);
  rootDocument = findRootDocument(config2.root, defaults);
  var path = bottomUpSearch(input, "all", function() {
    return bottomUpSearch(input, "two", function() {
      return bottomUpSearch(input, "one", function() {
        return bottomUpSearch(input, "none");
      });
    });
  });
  if (path) {
    var optimized = sort(optimize(path, input));
    if (optimized.length > 0) {
      path = optimized[0];
    }
    return selector(path);
  } else {
    throw new Error("Selector was not found.");
  }
}
function findRootDocument(rootNode, defaults) {
  if (rootNode.nodeType === Node.DOCUMENT_NODE) {
    return rootNode;
  }
  if (rootNode === defaults.root) {
    return rootNode.ownerDocument;
  }
  return rootNode;
}
function bottomUpSearch(input, limit, fallback) {
  var path = null;
  var stack = [];
  var current = input;
  var i = 0;
  var _loop_1 = function() {
    var e_1, _a;
    var level = maybe(id(current)) || maybe.apply(void 0, __spreadArray([], __read(attr(current)), false)) || maybe.apply(void 0, __spreadArray([], __read(classNames(current)), false)) || maybe(tagName(current)) || [any()];
    var nth = index(current);
    if (limit == "all") {
      if (nth) {
        level = level.concat(level.filter(dispensableNth).map(function(node2) {
          return nthChild(node2, nth);
        }));
      }
    } else if (limit == "two") {
      level = level.slice(0, 1);
      if (nth) {
        level = level.concat(level.filter(dispensableNth).map(function(node2) {
          return nthChild(node2, nth);
        }));
      }
    } else if (limit == "one") {
      var _b = __read(level = level.slice(0, 1), 1), node = _b[0];
      if (nth && dispensableNth(node)) {
        level = [nthChild(node, nth)];
      }
    } else if (limit == "none") {
      level = [any()];
      if (nth) {
        level = [nthChild(level[0], nth)];
      }
    }
    try {
      for (var level_1 = (e_1 = void 0, __values(level)), level_1_1 = level_1.next(); !level_1_1.done; level_1_1 = level_1.next()) {
        var node = level_1_1.value;
        node.level = i;
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (level_1_1 && !level_1_1.done && (_a = level_1.return)) _a.call(level_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    stack.push(level);
    if (stack.length >= config2.seedMinLength) {
      path = findUniquePath(stack, fallback);
      if (path) {
        return "break";
      }
    }
    current = current.parentElement;
    i++;
  };
  while (current) {
    var state_1 = _loop_1();
    if (state_1 === "break")
      break;
  }
  if (!path) {
    path = findUniquePath(stack, fallback);
  }
  if (!path && fallback) {
    return fallback();
  }
  return path;
}
function findUniquePath(stack, fallback) {
  var e_2, _a;
  var numCombinations = stack.reduce(function(acc, i) {
    return acc * i.length;
  }, 1);
  if (numCombinations > config2.threshold) {
    return fallback ? fallback() : null;
  }
  var paths = sort(combinations(stack));
  try {
    for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
      var candidate = paths_1_1.value;
      if (unique(candidate)) {
        return candidate;
      }
    }
  } catch (e_2_1) {
    e_2 = { error: e_2_1 };
  } finally {
    try {
      if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
    } finally {
      if (e_2) throw e_2.error;
    }
  }
  return null;
}
function selector(path) {
  var node = path[0];
  var query = node.name;
  for (var i = 1; i < path.length; i++) {
    var level = path[i].level || 0;
    if (node.level === level - 1) {
      query = "".concat(path[i].name, " > ").concat(query);
    } else {
      query = "".concat(path[i].name, " ").concat(query);
    }
    node = path[i];
  }
  return query;
}
function penalty(path) {
  return path.map(function(node) {
    return node.penalty;
  }).reduce(function(acc, i) {
    return acc + i;
  }, 0);
}
function unique(path) {
  var css = selector(path);
  switch (rootDocument.querySelectorAll(css).length) {
    case 0:
      throw new Error("Can't select any node with this selector: ".concat(css));
    case 1:
      return true;
    default:
      return false;
  }
}
function id(input) {
  var elementId = input.getAttribute("id");
  if (elementId && config2.idName(elementId)) {
    return {
      name: "#" + CSS.escape(elementId),
      penalty: 0
    };
  }
  return null;
}
function attr(input) {
  var attrs = Array.from(input.attributes).filter(function(attr2) {
    return config2.attr(attr2.name, attr2.value);
  });
  return attrs.map(function(attr2) {
    return {
      name: "[".concat(CSS.escape(attr2.name), '="').concat(CSS.escape(attr2.value), '"]'),
      penalty: 0.5
    };
  });
}
function classNames(input) {
  var names = Array.from(input.classList).filter(config2.className);
  return names.map(function(name) {
    return {
      name: "." + CSS.escape(name),
      penalty: 1
    };
  });
}
function tagName(input) {
  var name = input.tagName.toLowerCase();
  if (config2.tagName(name)) {
    return {
      name,
      penalty: 2
    };
  }
  return null;
}
function any() {
  return {
    name: "*",
    penalty: 3
  };
}
function index(input) {
  var parent = input.parentNode;
  if (!parent) {
    return null;
  }
  var child = parent.firstChild;
  if (!child) {
    return null;
  }
  var i = 0;
  while (child) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      i++;
    }
    if (child === input) {
      break;
    }
    child = child.nextSibling;
  }
  return i;
}
function nthChild(node, i) {
  return {
    name: node.name + ":nth-child(".concat(i, ")"),
    penalty: node.penalty + 1
  };
}
function dispensableNth(node) {
  return node.name !== "html" && !node.name.startsWith("#");
}
function maybe() {
  var level = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    level[_i] = arguments[_i];
  }
  var list = level.filter(notEmpty);
  if (list.length > 0) {
    return list;
  }
  return null;
}
function notEmpty(value) {
  return value !== null && value !== void 0;
}
function combinations(stack, path) {
  var _a, _b, node, e_3_1;
  var e_3, _c;
  if (path === void 0) {
    path = [];
  }
  return __generator(this, function(_d) {
    switch (_d.label) {
      case 0:
        if (!(stack.length > 0)) return [3, 9];
        _d.label = 1;
      case 1:
        _d.trys.push([1, 6, 7, 8]);
        _a = __values(stack[0]), _b = _a.next();
        _d.label = 2;
      case 2:
        if (!!_b.done) return [3, 5];
        node = _b.value;
        return [5, __values(combinations(stack.slice(1, stack.length), path.concat(node)))];
      case 3:
        _d.sent();
        _d.label = 4;
      case 4:
        _b = _a.next();
        return [3, 2];
      case 5:
        return [3, 8];
      case 6:
        e_3_1 = _d.sent();
        e_3 = { error: e_3_1 };
        return [3, 8];
      case 7:
        try {
          if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
        } finally {
          if (e_3) throw e_3.error;
        }
        return [
          7
          /*endfinally*/
        ];
      case 8:
        return [3, 11];
      case 9:
        return [4, path];
      case 10:
        _d.sent();
        _d.label = 11;
      case 11:
        return [
          2
          /*return*/
        ];
    }
  });
}
function sort(paths) {
  return __spreadArray([], __read(paths), false).sort(function(a, b) {
    return penalty(a) - penalty(b);
  });
}
function optimize(path, input, scope) {
  var i, newPath, newPathKey;
  if (scope === void 0) {
    scope = {
      counter: 0,
      visited: /* @__PURE__ */ new Map()
    };
  }
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        if (!(path.length > 2 && path.length > config2.optimizedMinLength)) return [3, 5];
        i = 1;
        _a.label = 1;
      case 1:
        if (!(i < path.length - 1)) return [3, 5];
        if (scope.counter > config2.maxNumberOfTries) {
          return [
            2
            /*return*/
          ];
        }
        scope.counter += 1;
        newPath = __spreadArray([], __read(path), false);
        newPath.splice(i, 1);
        newPathKey = selector(newPath);
        if (scope.visited.has(newPathKey)) {
          return [
            2
            /*return*/
          ];
        }
        if (!(unique(newPath) && same(newPath, input))) return [3, 4];
        return [4, newPath];
      case 2:
        _a.sent();
        scope.visited.set(newPathKey, true);
        return [5, __values(optimize(newPath, input, scope))];
      case 3:
        _a.sent();
        _a.label = 4;
      case 4:
        i++;
        return [3, 1];
      case 5:
        return [
          2
          /*return*/
        ];
    }
  });
}
function same(path, input) {
  return rootDocument.querySelector(selector(path)) === input;
}

// ../../.yarn/cache/@amplitude-plugin-autocapture-browser-npm-1.0.4-7936c5ddf6-3dc4ee8711.zip/node_modules/@amplitude/plugin-autocapture-browser/lib/esm/helpers.js
var SENSITIVE_TAGS = ["input", "select", "textarea"];
var createShouldTrackEvent = function(autocaptureOptions, allowlist) {
  return function(actionType, element) {
    var _a, _b, _c;
    var pageUrlAllowlist = autocaptureOptions.pageUrlAllowlist, shouldTrackEventResolver = autocaptureOptions.shouldTrackEventResolver;
    var tag = (_b = (_a = element === null || element === void 0 ? void 0 : element.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a);
    if (!tag) {
      return false;
    }
    if (shouldTrackEventResolver) {
      return shouldTrackEventResolver(actionType, element);
    }
    if (!isPageUrlAllowed(window.location.href, pageUrlAllowlist)) {
      return false;
    }
    var elementType = String(element === null || element === void 0 ? void 0 : element.getAttribute("type")) || "";
    if (typeof elementType === "string") {
      switch (elementType.toLowerCase()) {
        case "hidden":
          return false;
        case "password":
          return false;
      }
    }
    if (allowlist) {
      var hasMatchAnyAllowedSelector = allowlist.some(function(selector2) {
        var _a2;
        return !!((_a2 = element === null || element === void 0 ? void 0 : element.matches) === null || _a2 === void 0 ? void 0 : _a2.call(element, selector2));
      });
      if (!hasMatchAnyAllowedSelector) {
        return false;
      }
    }
    switch (tag) {
      case "input":
      case "select":
      case "textarea":
        return actionType === "change" || actionType === "click";
      default: {
        var computedStyle = (_c = window === null || window === void 0 ? void 0 : window.getComputedStyle) === null || _c === void 0 ? void 0 : _c.call(window, element);
        if (computedStyle && computedStyle.getPropertyValue("cursor") === "pointer" && actionType === "click") {
          return true;
        }
        return actionType === "click";
      }
    }
  };
};
var isNonSensitiveString = function(text) {
  if (text == null) {
    return false;
  }
  if (typeof text === "string") {
    var ccRegex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    if (ccRegex.test((text || "").replace(/[- ]/g, ""))) {
      return false;
    }
    var ssnRegex = /(^\d{3}-?\d{2}-?\d{4}$)/;
    if (ssnRegex.test(text)) {
      return false;
    }
  }
  return true;
};
var isTextNode = function(node) {
  return !!node && node.nodeType === 3;
};
var isNonSensitiveElement = function(element) {
  var _a, _b, _c;
  var tag = (_b = (_a = element === null || element === void 0 ? void 0 : element.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a);
  var isContentEditable = element instanceof HTMLElement ? ((_c = element.getAttribute("contenteditable")) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === "true" : false;
  return !SENSITIVE_TAGS.includes(tag) && !isContentEditable;
};
var getText = function(element) {
  var text = "";
  if (isNonSensitiveElement(element) && element.childNodes && element.childNodes.length) {
    element.childNodes.forEach(function(child) {
      var childText = "";
      if (isTextNode(child)) {
        if (child.textContent) {
          childText = child.textContent;
        }
      } else {
        childText = getText(child);
      }
      text += childText.split(/(\s+)/).filter(isNonSensitiveString).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255);
    });
  }
  return text;
};
var getSelector = function(element, logger) {
  var _a, _b;
  var selector2 = "";
  try {
    selector2 = finder(element, {
      className: function(name) {
        return name !== AMPLITUDE_VISUAL_TAGGING_HIGHLIGHT_CLASS;
      },
      maxNumberOfTries: 1e3
    });
    return selector2;
  } catch (error) {
    if (logger) {
      var typedError = error;
      logger.warn("Failed to get selector with finder, use fallback strategy instead: ".concat(typedError.toString()));
    }
  }
  var tag = (_b = (_a = element === null || element === void 0 ? void 0 : element.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a);
  if (tag) {
    selector2 = tag;
  }
  var id2 = element.getAttribute("id");
  var className = element.getAttribute("class");
  if (id2) {
    selector2 = "#".concat(id2);
  } else if (className) {
    var classes = className.split(" ").filter(function(name) {
      return name !== AMPLITUDE_VISUAL_TAGGING_HIGHLIGHT_CLASS;
    }).join(".");
    if (classes) {
      selector2 = "".concat(selector2, ".").concat(classes);
    }
  }
  return selector2;
};
var isPageUrlAllowed = function(url, pageUrlAllowlist) {
  if (!pageUrlAllowlist || !pageUrlAllowlist.length) {
    return true;
  }
  return pageUrlAllowlist.some(function(allowedUrl) {
    if (typeof allowedUrl === "string") {
      return url === allowedUrl;
    }
    return url.match(allowedUrl);
  });
};
var getAttributesWithPrefix = function(element, prefix) {
  return element.getAttributeNames().reduce(function(attributes, attributeName) {
    if (attributeName.startsWith(prefix)) {
      var attributeKey = attributeName.replace(prefix, "");
      var attributeValue = element.getAttribute(attributeName);
      if (attributeKey) {
        attributes[attributeKey] = attributeValue || "";
      }
    }
    return attributes;
  }, {});
};
var isEmpty2 = function(value) {
  return value === void 0 || value === null || typeof value === "object" && Object.keys(value).length === 0 || typeof value === "string" && value.trim().length === 0;
};
var removeEmptyProperties = function(properties) {
  return Object.keys(properties).reduce(function(filteredProperties, key) {
    var value = properties[key];
    if (!isEmpty2(value)) {
      filteredProperties[key] = value;
    }
    return filteredProperties;
  }, {});
};
var getNearestLabel = function(element) {
  var parent = element.parentElement;
  if (!parent) {
    return "";
  }
  var labelElement;
  try {
    labelElement = parent.querySelector(":scope>span,h1,h2,h3,h4,h5,h6");
  } catch (error) {
    labelElement = null;
  }
  if (labelElement) {
    var labelText = labelElement.textContent || "";
    return isNonSensitiveString(labelText) ? labelText : "";
  }
  return getNearestLabel(parent);
};
var getClosestElement = function(element, selectors) {
  if (!element) {
    return null;
  }
  if (selectors.some(function(selector2) {
    var _a;
    return (_a = element === null || element === void 0 ? void 0 : element.matches) === null || _a === void 0 ? void 0 : _a.call(element, selector2);
  })) {
    return element;
  }
  return getClosestElement(element === null || element === void 0 ? void 0 : element.parentElement, selectors);
};
var getEventTagProps = function(element, logger) {
  var _a;
  var _b, _c;
  if (!element) {
    return {};
  }
  var tag = (_c = (_b = element === null || element === void 0 ? void 0 : element.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase) === null || _c === void 0 ? void 0 : _c.call(_b);
  var selector2 = getSelector(element, logger);
  var properties = (_a = {}, _a[AMPLITUDE_EVENT_PROP_ELEMENT_TAG] = tag, _a[AMPLITUDE_EVENT_PROP_ELEMENT_TEXT] = getText(element), _a[AMPLITUDE_EVENT_PROP_ELEMENT_SELECTOR] = selector2, _a[AMPLITUDE_EVENT_PROP_PAGE_URL] = window.location.href.split("?")[0], _a);
  return removeEmptyProperties(properties);
};
var asyncLoadScript = function(url) {
  return new Promise(function(resolve, reject) {
    var _a;
    try {
      var scriptElement = document.createElement("script");
      scriptElement.type = "text/javascript";
      scriptElement.async = true;
      scriptElement.src = url;
      scriptElement.addEventListener("load", function() {
        resolve({ status: true });
      }, { once: true });
      scriptElement.addEventListener("error", function() {
        reject({
          status: false,
          message: "Failed to load the script ".concat(url)
        });
      });
      (_a = document.head) === null || _a === void 0 ? void 0 : _a.appendChild(scriptElement);
    } catch (error) {
      reject(error);
    }
  });
};
function generateUniqueId() {
  return "".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9));
}
var filterOutNonTrackableEvents = function(event) {
  if (event.event.target === null || !event.closestTrackedAncestor) {
    return false;
  }
  return true;
};

// ../../.yarn/cache/@amplitude-plugin-autocapture-browser-npm-1.0.4-7936c5ddf6-3dc4ee8711.zip/node_modules/@amplitude/plugin-autocapture-browser/lib/esm/libs/messenger.js
var WindowMessenger = (
  /** @class */
  function() {
    function WindowMessenger2(_a) {
      var _b = _a === void 0 ? {} : _a, _c = _b.origin, origin = _c === void 0 ? AMPLITUDE_ORIGIN : _c;
      var _this = this;
      this.endpoint = AMPLITUDE_ORIGIN;
      this.requestCallbacks = {};
      this.onSelect = function(data) {
        _this.notify({ action: "element-selected", data });
      };
      this.onTrack = function(type, properties) {
        if (type === "selector-mode-changed") {
          _this.notify({ action: "track-selector-mode-changed", data: properties });
        } else if (type === "selector-moved") {
          _this.notify({ action: "track-selector-moved", data: properties });
        }
      };
      this.endpoint = origin;
    }
    WindowMessenger2.prototype.notify = function(message) {
      var _a, _b, _c, _d;
      (_b = (_a = this.logger) === null || _a === void 0 ? void 0 : _a.debug) === null || _b === void 0 ? void 0 : _b.call(_a, "Message sent: ", JSON.stringify(message));
      (_d = (_c = window.opener) === null || _c === void 0 ? void 0 : _c.postMessage) === null || _d === void 0 ? void 0 : _d.call(_c, message, this.endpoint);
    };
    WindowMessenger2.prototype.sendRequest = function(action, args, options) {
      var _this = this;
      if (options === void 0) {
        options = { timeout: 15e3 };
      }
      var id2 = generateUniqueId();
      var request = {
        id: id2,
        action,
        args
      };
      var promise = new Promise(function(resolve, reject) {
        _this.requestCallbacks[id2] = { resolve, reject };
        _this.notify(request);
        if ((options === null || options === void 0 ? void 0 : options.timeout) > 0) {
          setTimeout(function() {
            reject(new Error("".concat(action, " timed out (id: ").concat(id2, ")")));
            delete _this.requestCallbacks[id2];
          }, options.timeout);
        }
      });
      return promise;
    };
    WindowMessenger2.prototype.handleResponse = function(response) {
      var _a;
      if (!this.requestCallbacks[response.id]) {
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.warn("No callback found for request id: ".concat(response.id));
        return;
      }
      this.requestCallbacks[response.id].resolve(response.responseData);
      delete this.requestCallbacks[response.id];
    };
    WindowMessenger2.prototype.setup = function(_a) {
      var _this = this;
      var _b = _a === void 0 ? {} : _a, logger = _b.logger, endpoint = _b.endpoint, isElementSelectable = _b.isElementSelectable, cssSelectorAllowlist = _b.cssSelectorAllowlist, actionClickAllowlist = _b.actionClickAllowlist;
      this.logger = logger;
      if (endpoint && this.endpoint === AMPLITUDE_ORIGIN) {
        this.endpoint = endpoint;
      }
      var amplitudeVisualTaggingSelectorInstance = null;
      window.addEventListener("message", function(event) {
        var _a2, _b2, _c, _d, _e;
        (_b2 = (_a2 = _this.logger) === null || _a2 === void 0 ? void 0 : _a2.debug) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, "Message received: ", JSON.stringify(event));
        if (_this.endpoint !== event.origin) {
          return;
        }
        var eventData = event === null || event === void 0 ? void 0 : event.data;
        var action = eventData === null || eventData === void 0 ? void 0 : eventData.action;
        if (!action) {
          return;
        }
        if ("id" in eventData) {
          (_d = (_c = _this.logger) === null || _c === void 0 ? void 0 : _c.debug) === null || _d === void 0 ? void 0 : _d.call(_c, "Received Response to previous request: ", JSON.stringify(event));
          _this.handleResponse(eventData);
        } else {
          if (action === "ping") {
            _this.notify({ action: "pong" });
          } else if (action === "initialize-visual-tagging-selector") {
            var actionData_1 = eventData === null || eventData === void 0 ? void 0 : eventData.data;
            asyncLoadScript(AMPLITUDE_VISUAL_TAGGING_SELECTOR_SCRIPT_URL).then(function() {
              var _a3;
              amplitudeVisualTaggingSelectorInstance = (_a3 = window === null || window === void 0 ? void 0 : window.amplitudeVisualTaggingSelector) === null || _a3 === void 0 ? void 0 : _a3.call(window, {
                getEventTagProps,
                isElementSelectable: function(element) {
                  if (isElementSelectable) {
                    return isElementSelectable((actionData_1 === null || actionData_1 === void 0 ? void 0 : actionData_1.actionType) || "click", element);
                  }
                  return true;
                },
                onTrack: _this.onTrack,
                onSelect: _this.onSelect,
                visualHighlightClass: AMPLITUDE_VISUAL_TAGGING_HIGHLIGHT_CLASS,
                messenger: _this,
                cssSelectorAllowlist,
                actionClickAllowlist
              });
              _this.notify({ action: "selector-loaded" });
            }).catch(function() {
              var _a3;
              (_a3 = _this.logger) === null || _a3 === void 0 ? void 0 : _a3.warn("Failed to initialize visual tagging selector");
            });
          } else if (action === "close-visual-tagging-selector") {
            (_e = amplitudeVisualTaggingSelectorInstance === null || amplitudeVisualTaggingSelectorInstance === void 0 ? void 0 : amplitudeVisualTaggingSelectorInstance.close) === null || _e === void 0 ? void 0 : _e.call(amplitudeVisualTaggingSelectorInstance);
          }
        }
      });
      this.notify({ action: "page-loaded" });
    };
    return WindowMessenger2;
  }()
);

// ../../.yarn/cache/@amplitude-plugin-autocapture-browser-npm-1.0.4-7936c5ddf6-3dc4ee8711.zip/node_modules/@amplitude/plugin-autocapture-browser/lib/esm/hierarchy.js
var BLOCKED_ATTRIBUTES = [
  // Already captured elsewhere in the hierarchy object
  "id",
  "class",
  // non-useful and potentially large attribute
  "style",
  // sensitive as prefilled form data may populate this attribute
  "value",
  // DOM events
  "onclick",
  "onchange",
  "oninput",
  "onblur",
  "onsubmit",
  "onfocus",
  "onkeydown",
  "onkeyup",
  "onkeypress",
  // React specific
  "data-reactid",
  "data-react-checksum",
  "data-reactroot"
];
var SENSITIVE_ELEMENT_ATTRIBUTE_ALLOWLIST = ["type"];
var SVG_TAGS = ["svg", "path", "g"];
var HIGHLY_SENSITIVE_INPUT_TYPES = ["password", "hidden"];
var MAX_ATTRIBUTE_LENGTH = 128;
var MAX_HIERARCHY_LENGTH = 1024;
function getElementProperties(element) {
  var e_1, _a;
  var _b, _c, _d, _e;
  if (element === null) {
    return null;
  }
  var tagName2 = String(element.tagName).toLowerCase();
  var properties = {
    tag: tagName2
  };
  var siblings = Array.from((_c = (_b = element.parentElement) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : []);
  if (siblings.length) {
    properties.index = siblings.indexOf(element);
    properties.indexOfType = siblings.filter(function(el) {
      return el.tagName === element.tagName;
    }).indexOf(element);
  }
  var prevSiblingTag = (_e = (_d = element.previousElementSibling) === null || _d === void 0 ? void 0 : _d.tagName) === null || _e === void 0 ? void 0 : _e.toLowerCase();
  if (prevSiblingTag) {
    properties.prevSib = String(prevSiblingTag);
  }
  var id2 = element.getAttribute("id");
  if (id2) {
    properties.id = String(id2);
  }
  var classes = Array.from(element.classList);
  if (classes.length) {
    properties.classes = classes;
  }
  var attributes = {};
  var attributesArray = Array.from(element.attributes);
  var filteredAttributes = attributesArray.filter(function(attr3) {
    return !BLOCKED_ATTRIBUTES.includes(attr3.name);
  });
  var isSensitiveElement = !isNonSensitiveElement(element);
  if (!HIGHLY_SENSITIVE_INPUT_TYPES.includes(String(element.getAttribute("type"))) && !SVG_TAGS.includes(tagName2)) {
    try {
      for (var filteredAttributes_1 = __values(filteredAttributes), filteredAttributes_1_1 = filteredAttributes_1.next(); !filteredAttributes_1_1.done; filteredAttributes_1_1 = filteredAttributes_1.next()) {
        var attr2 = filteredAttributes_1_1.value;
        if (isSensitiveElement && !SENSITIVE_ELEMENT_ATTRIBUTE_ALLOWLIST.includes(attr2.name)) {
          continue;
        }
        attributes[attr2.name] = String(attr2.value).substring(0, MAX_ATTRIBUTE_LENGTH);
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (filteredAttributes_1_1 && !filteredAttributes_1_1.done && (_a = filteredAttributes_1.return)) _a.call(filteredAttributes_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  }
  if (Object.keys(attributes).length) {
    properties.attrs = attributes;
  }
  return properties;
}
function getAncestors(targetEl) {
  var ancestors = [];
  if (!targetEl) {
    return ancestors;
  }
  ancestors.push(targetEl);
  var current = targetEl.parentElement;
  while (current && current.tagName !== "HTML") {
    ancestors.push(current);
    current = current.parentElement;
  }
  return ancestors;
}
var getHierarchy = function(element) {
  var hierarchy = [];
  if (!element) {
    return [];
  }
  var ancestors = getAncestors(element);
  hierarchy = ensureListUnderLimit(ancestors.map(function(el) {
    return getElementProperties(el);
  }), MAX_HIERARCHY_LENGTH);
  return hierarchy;
};
function ensureListUnderLimit(list, bytesLimit) {
  var numChars = 0;
  for (var i = 0; i < list.length; i++) {
    var node = list[i];
    if (node === null) {
      numChars += 4;
    } else {
      var value = ensureUnicodePythonCompatible(node);
      numChars += value ? Array.from(value).length : 4;
    }
    if (numChars > bytesLimit) {
      return list.slice(0, i);
    }
  }
  return list;
}
function ensureUnicodePythonCompatible(value, nested) {
  if (nested === void 0) {
    nested = false;
  }
  try {
    if (value == null) {
      if (nested) {
        return "None";
      }
      return null;
    } else if (typeof value === "string") {
      if (nested) {
        value = value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r");
        if (value.includes('"')) {
          return "'".concat(value, "'");
        }
        if (value.includes("'")) {
          return '"'.concat(value.replace(/'/g, "\\'"), '"');
        }
        return "'".concat(value, "'");
      }
      return value;
    } else if (typeof value === "boolean") {
      return value ? "True" : "False";
    } else if (Array.isArray(value)) {
      var elements = value.map(function(o) {
        return ensureUnicodePythonCompatible(o, true);
      });
      return "[".concat(elements.join(", "), "]");
    } else if (typeof value === "object") {
      var entries = Object.entries(value).filter(function(_a) {
        var _b = __read(_a, 1), key = _b[0];
        return key != null;
      }).map(function(_a) {
        var _b = __read(_a, 2), key = _b[0], val = _b[1];
        return "".concat(String(ensureUnicodePythonCompatible(key, true)), ": ").concat(String(ensureUnicodePythonCompatible(val, true)));
      });
      var result = "{".concat(entries.join(", "), "}");
      if (result.includes("\\'")) {
        result = result.replace(/'/g, "'").replace(/'/g, "\\'");
      }
      return result;
    }
    return value.toString();
  } catch (e) {
    return null;
  }
}

// ../../.yarn/cache/@amplitude-plugin-autocapture-browser-npm-1.0.4-7936c5ddf6-3dc4ee8711.zip/node_modules/@amplitude/plugin-autocapture-browser/lib/esm/autocapture/track-click.js
var RAGE_CLICK_THRESHOLD = 5;
function trackClicks(_a) {
  var amplitude = _a.amplitude, allObservables = _a.allObservables, options = _a.options, shouldTrackEvent = _a.shouldTrackEvent;
  var clickObservable = allObservables.clickObservable;
  var comparisonTrigger = clickObservable.pipe(pairwise(), filter(function(_a2) {
    var _b = __read(_a2, 2), prev = _b[0], current = _b[1];
    var targetChanged = prev.event.target !== current.event.target;
    var samePos = Math.abs(current.event.screenX - prev.event.screenX) <= 20 && Math.abs(current.event.screenY - prev.event.screenY) <= 20;
    return targetChanged && !samePos;
  }));
  var timeoutTrigger = clickObservable.pipe(debounceTime(options.debounceTime), map(function() {
    return "timeout";
  }));
  var triggers = merge(comparisonTrigger, timeoutTrigger);
  var bufferedClicks = clickObservable.pipe(delay(0), filter(filterOutNonTrackableEvents), filter(function(click) {
    return shouldTrackEvent("click", click.closestTrackedAncestor);
  }), buffer(triggers));
  return bufferedClicks.subscribe(function(clicks) {
    var e_1, _a2;
    var clickType = clicks.length >= RAGE_CLICK_THRESHOLD ? AMPLITUDE_ELEMENT_CLICKED_EVENT : AMPLITUDE_ELEMENT_CLICKED_EVENT;
    try {
      for (var clicks_1 = __values(clicks), clicks_1_1 = clicks_1.next(); !clicks_1_1.done; clicks_1_1 = clicks_1.next()) {
        var click = clicks_1_1.value;
        amplitude === null || amplitude === void 0 ? void 0 : amplitude.track(clickType, click.targetElementProperties, {
          time: click.timestamp
        });
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (clicks_1_1 && !clicks_1_1.done && (_a2 = clicks_1.return)) _a2.call(clicks_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  });
}

// ../../.yarn/cache/@amplitude-plugin-autocapture-browser-npm-1.0.4-7936c5ddf6-3dc4ee8711.zip/node_modules/@amplitude/plugin-autocapture-browser/lib/esm/autocapture/track-change.js
function trackChange(_a) {
  var amplitude = _a.amplitude, allObservables = _a.allObservables, getEventProperties = _a.getEventProperties, shouldTrackEvent = _a.shouldTrackEvent;
  var changeObservable = allObservables.changeObservable;
  var filteredChangeObservable = changeObservable.pipe(filter(filterOutNonTrackableEvents), filter(function(changeEvent) {
    return shouldTrackEvent("change", changeEvent.closestTrackedAncestor);
  }));
  return filteredChangeObservable.subscribe(function(changeEvent) {
    amplitude === null || amplitude === void 0 ? void 0 : amplitude.track(AMPLITUDE_ELEMENT_CHANGED_EVENT, getEventProperties("change", changeEvent.closestTrackedAncestor));
  });
}

// ../../.yarn/cache/@amplitude-plugin-autocapture-browser-npm-1.0.4-7936c5ddf6-3dc4ee8711.zip/node_modules/@amplitude/plugin-autocapture-browser/lib/esm/autocapture/track-action-click.js
function trackActionClick(_a) {
  var amplitude = _a.amplitude, allObservables = _a.allObservables, options = _a.options, getEventProperties = _a.getEventProperties, shouldTrackEvent = _a.shouldTrackEvent, shouldTrackActionClick = _a.shouldTrackActionClick;
  var clickObservable = allObservables.clickObservable, mutationObservable = allObservables.mutationObservable, navigateObservable = allObservables.navigateObservable;
  var filteredClickObservable = clickObservable.pipe(filter(function(click) {
    return !shouldTrackEvent("click", click.closestTrackedAncestor);
  }), map(function(click) {
    var closestActionClickEl = getClosestElement(click.event.target, options.actionClickAllowlist);
    click.closestTrackedAncestor = closestActionClickEl;
    if (click.closestTrackedAncestor !== null) {
      click.targetElementProperties = getEventProperties(click.type, click.closestTrackedAncestor);
    }
    return click;
  }), filter(filterOutNonTrackableEvents), filter(function(clickEvent) {
    return shouldTrackActionClick("click", clickEvent.closestTrackedAncestor);
  }));
  var changeObservables = [mutationObservable];
  if (navigateObservable) {
    changeObservables.push(navigateObservable);
  }
  var mutationOrNavigate = merge.apply(void 0, __spreadArray([], __read(changeObservables), false));
  var actionClicks = filteredClickObservable.pipe(
    // If a mutation occurs within 0.5 seconds of a click event (timeout({ first: 500 })), it emits the original first click event.
    // take 1 to only limit the action events in case there are multiple
    switchMap(function(click) {
      return mutationOrNavigate.pipe(
        take(1),
        timeout({ first: 500, with: function() {
          return EMPTY;
        } }),
        // in case of timeout, map to empty to prevent any click from being emitted
        map(function() {
          return click;
        })
      );
    })
  );
  return actionClicks.subscribe(function(actionClick) {
    amplitude === null || amplitude === void 0 ? void 0 : amplitude.track(AMPLITUDE_ELEMENT_CLICKED_EVENT, getEventProperties("click", actionClick.closestTrackedAncestor), {
      time: actionClick.timestamp
    });
  });
}

// ../../.yarn/cache/@amplitude-plugin-autocapture-browser-npm-1.0.4-7936c5ddf6-3dc4ee8711.zip/node_modules/@amplitude/plugin-autocapture-browser/lib/esm/autocapture-plugin.js
var ObservablesEnum;
(function(ObservablesEnum2) {
  ObservablesEnum2["ClickObservable"] = "clickObservable";
  ObservablesEnum2["ChangeObservable"] = "changeObservable";
  ObservablesEnum2["NavigateObservable"] = "navigateObservable";
  ObservablesEnum2["MutationObservable"] = "mutationObservable";
})(ObservablesEnum || (ObservablesEnum = {}));
function isElementBasedEvent(event) {
  return event.type === "click" || event.type === "change";
}
var autocapturePlugin = function(options) {
  var _a, _b, _c;
  if (options === void 0) {
    options = {};
  }
  var _d = options.dataAttributePrefix, dataAttributePrefix = _d === void 0 ? DEFAULT_DATA_ATTRIBUTE_PREFIX : _d, _e = options.visualTaggingOptions, visualTaggingOptions = _e === void 0 ? {
    enabled: true,
    messenger: new WindowMessenger()
  } : _e;
  options.cssSelectorAllowlist = (_a = options.cssSelectorAllowlist) !== null && _a !== void 0 ? _a : DEFAULT_CSS_SELECTOR_ALLOWLIST;
  options.actionClickAllowlist = (_b = options.actionClickAllowlist) !== null && _b !== void 0 ? _b : DEFAULT_ACTION_CLICK_ALLOWLIST;
  options.debounceTime = (_c = options.debounceTime) !== null && _c !== void 0 ? _c : 0;
  var name = PLUGIN_NAME;
  var type = "enrichment";
  var subscriptions = [];
  var logger = void 0;
  var createObservables = function() {
    var _a2;
    var clickObservable = fromEvent(document, "click", { capture: true }).pipe(map(function(click) {
      return addAdditionalEventProperties(click, "click");
    }));
    var changeObservable = fromEvent(document, "change", { capture: true }).pipe(map(function(change) {
      return addAdditionalEventProperties(change, "change");
    }));
    var navigateObservable;
    if (window.navigation) {
      navigateObservable = fromEvent(window.navigation, "navigate").pipe(map(function(navigate) {
        return addAdditionalEventProperties(navigate, "navigate");
      }));
    }
    var mutationObservable = new Observable(function(observer) {
      var mutationObserver = new MutationObserver(function(mutations) {
        observer.next(mutations);
      });
      mutationObserver.observe(document.body, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
      });
      return function() {
        return mutationObserver.disconnect();
      };
    }).pipe(map(function(mutation) {
      return addAdditionalEventProperties(mutation, "mutation");
    }));
    return _a2 = {}, _a2[ObservablesEnum.ClickObservable] = clickObservable, _a2[ObservablesEnum.ChangeObservable] = changeObservable, // [ObservablesEnum.ErrorObservable]: errorObservable,
    _a2[ObservablesEnum.NavigateObservable] = navigateObservable, _a2[ObservablesEnum.MutationObservable] = mutationObservable, _a2;
  };
  var getEventProperties = function(actionType, element) {
    var _a2;
    var _b2, _c2;
    var tag = (_c2 = (_b2 = element === null || element === void 0 ? void 0 : element.tagName) === null || _b2 === void 0 ? void 0 : _b2.toLowerCase) === null || _c2 === void 0 ? void 0 : _c2.call(_b2);
    var rect = typeof element.getBoundingClientRect === "function" ? element.getBoundingClientRect() : { left: null, top: null };
    var ariaLabel = element.getAttribute("aria-label");
    var attributes = getAttributesWithPrefix(element, dataAttributePrefix);
    var nearestLabel = getNearestLabel(element);
    var selector2 = getSelector(element, logger);
    var properties = (_a2 = {}, _a2[AMPLITUDE_EVENT_PROP_ELEMENT_ID] = element.getAttribute("id") || "", _a2[AMPLITUDE_EVENT_PROP_ELEMENT_CLASS] = element.getAttribute("class"), _a2[AMPLITUDE_EVENT_PROP_ELEMENT_HIERARCHY] = getHierarchy(element), _a2[AMPLITUDE_EVENT_PROP_ELEMENT_TAG] = tag, _a2[AMPLITUDE_EVENT_PROP_ELEMENT_TEXT] = getText(element), _a2[AMPLITUDE_EVENT_PROP_ELEMENT_POSITION_LEFT] = rect.left == null ? null : Math.round(rect.left), _a2[AMPLITUDE_EVENT_PROP_ELEMENT_POSITION_TOP] = rect.top == null ? null : Math.round(rect.top), _a2[AMPLITUDE_EVENT_PROP_ELEMENT_ARIA_LABEL] = ariaLabel, _a2[AMPLITUDE_EVENT_PROP_ELEMENT_ATTRIBUTES] = attributes, _a2[AMPLITUDE_EVENT_PROP_ELEMENT_SELECTOR] = selector2, _a2[AMPLITUDE_EVENT_PROP_ELEMENT_PARENT_LABEL] = nearestLabel, _a2[AMPLITUDE_EVENT_PROP_PAGE_URL] = window.location.href.split("?")[0], _a2[AMPLITUDE_EVENT_PROP_PAGE_TITLE] = typeof document !== "undefined" && document.title || "", _a2[AMPLITUDE_EVENT_PROP_VIEWPORT_HEIGHT] = window.innerHeight, _a2[AMPLITUDE_EVENT_PROP_VIEWPORT_WIDTH] = window.innerWidth, _a2);
    if (tag === "a" && actionType === "click" && element instanceof HTMLAnchorElement) {
      properties[AMPLITUDE_EVENT_PROP_ELEMENT_HREF] = element.href;
    }
    return removeEmptyProperties(properties);
  };
  var addAdditionalEventProperties = function(event, type2) {
    var baseEvent = {
      event,
      timestamp: Date.now(),
      type: type2
    };
    if (isElementBasedEvent(baseEvent) && baseEvent.event.target !== null) {
      var closestTrackedAncestor = getClosestElement(baseEvent.event.target, options.cssSelectorAllowlist);
      if (closestTrackedAncestor) {
        baseEvent.closestTrackedAncestor = closestTrackedAncestor;
        baseEvent.targetElementProperties = getEventProperties(baseEvent.type, closestTrackedAncestor);
      }
      return baseEvent;
    }
    return baseEvent;
  };
  var setup = function(config3, amplitude) {
    return __awaiter(void 0, void 0, void 0, function() {
      var shouldTrackEvent, shouldTrackActionClick, allObservables, clickTrackingSubscription, changeSubscription, actionClickSubscription, allowlist, actionClickAllowlist;
      var _a2, _b2;
      return __generator(this, function(_c2) {
        logger = config3.loggerProvider;
        if (typeof document === "undefined") {
          return [
            2
            /*return*/
          ];
        }
        shouldTrackEvent = createShouldTrackEvent(options, options.cssSelectorAllowlist);
        shouldTrackActionClick = createShouldTrackEvent(options, options.actionClickAllowlist);
        allObservables = createObservables();
        clickTrackingSubscription = trackClicks({
          allObservables,
          options,
          amplitude,
          shouldTrackEvent
        });
        subscriptions.push(clickTrackingSubscription);
        changeSubscription = trackChange({
          allObservables,
          getEventProperties,
          amplitude,
          shouldTrackEvent
        });
        subscriptions.push(changeSubscription);
        actionClickSubscription = trackActionClick({
          allObservables,
          options,
          getEventProperties,
          amplitude,
          shouldTrackEvent,
          shouldTrackActionClick
        });
        subscriptions.push(actionClickSubscription);
        (_a2 = config3 === null || config3 === void 0 ? void 0 : config3.loggerProvider) === null || _a2 === void 0 ? void 0 : _a2.log("".concat(name, " has been successfully added."));
        if (window.opener && visualTaggingOptions.enabled) {
          allowlist = options.cssSelectorAllowlist;
          actionClickAllowlist = options.actionClickAllowlist;
          (_b2 = visualTaggingOptions.messenger) === null || _b2 === void 0 ? void 0 : _b2.setup(__assign(__assign({ logger: config3 === null || config3 === void 0 ? void 0 : config3.loggerProvider }, (config3 === null || config3 === void 0 ? void 0 : config3.serverZone) && { endpoint: AMPLITUDE_ORIGINS_MAP[config3.serverZone] }), { isElementSelectable: createShouldTrackEvent(options, __spreadArray(__spreadArray([], __read(allowlist), false), __read(actionClickAllowlist), false)), cssSelectorAllowlist: allowlist, actionClickAllowlist }));
        }
        return [
          2
          /*return*/
        ];
      });
    });
  };
  var execute = function(event) {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a2) {
        return [2, event];
      });
    });
  };
  var teardown = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var subscriptions_1, subscriptions_1_1, subscription;
      var e_1, _a2;
      return __generator(this, function(_b2) {
        try {
          for (subscriptions_1 = __values(subscriptions), subscriptions_1_1 = subscriptions_1.next(); !subscriptions_1_1.done; subscriptions_1_1 = subscriptions_1.next()) {
            subscription = subscriptions_1_1.value;
            subscription.unsubscribe();
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (subscriptions_1_1 && !subscriptions_1_1.done && (_a2 = subscriptions_1.return)) _a2.call(subscriptions_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        return [
          2
          /*return*/
        ];
      });
    });
  };
  return {
    name,
    type,
    setup,
    execute,
    teardown
  };
};

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/browser-client.js
var AmplitudeBrowser = (
  /** @class */
  function(_super) {
    __extends(AmplitudeBrowser2, _super);
    function AmplitudeBrowser2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    AmplitudeBrowser2.prototype.init = function(apiKey, userIdOrOptions, maybeOptions) {
      if (apiKey === void 0) {
        apiKey = "";
      }
      var userId;
      var options;
      if (arguments.length > 2) {
        userId = userIdOrOptions;
        options = maybeOptions;
      } else {
        if (typeof userIdOrOptions === "string") {
          userId = userIdOrOptions;
          options = void 0;
        } else {
          userId = userIdOrOptions === null || userIdOrOptions === void 0 ? void 0 : userIdOrOptions.userId;
          options = userIdOrOptions;
        }
      }
      return returnWrapper(this._init(__assign(__assign({}, options), { userId, apiKey })));
    };
    AmplitudeBrowser2.prototype._init = function(options) {
      var _a, _b, _c;
      return __awaiter(this, void 0, void 0, function() {
        var browserOptions, joinedConfigGenerator, attributionTrackingOptions, queryParams, querySessionId, connector;
        var _this = this;
        return __generator(this, function(_d) {
          switch (_d.label) {
            case 0:
              if (this.initializing) {
                return [
                  2
                  /*return*/
                ];
              }
              this.initializing = true;
              return [4, useBrowserConfig(options.apiKey, options, this)];
            case 1:
              browserOptions = _d.sent();
              if (!options.fetchRemoteConfig) return [3, 4];
              return [4, createBrowserJoinedConfigGenerator(browserOptions)];
            case 2:
              joinedConfigGenerator = _d.sent();
              return [4, joinedConfigGenerator.generateJoinedConfig()];
            case 3:
              browserOptions = _d.sent();
              _d.label = 4;
            case 4:
              return [4, _super.prototype._init.call(this, browserOptions)];
            case 5:
              _d.sent();
              this.logBrowserOptions(browserOptions);
              if (!isAttributionTrackingEnabled(this.config.defaultTracking)) return [3, 7];
              attributionTrackingOptions = getAttributionTrackingConfig(this.config);
              this.webAttribution = new WebAttribution(attributionTrackingOptions, this.config);
              return [4, this.webAttribution.init()];
            case 6:
              _d.sent();
              _d.label = 7;
            case 7:
              queryParams = getQueryParams();
              querySessionId = Number.isNaN(Number(queryParams.ampSessionId)) ? void 0 : Number(queryParams.ampSessionId);
              this.setSessionId((_c = (_b = (_a = options.sessionId) !== null && _a !== void 0 ? _a : querySessionId) !== null && _b !== void 0 ? _b : this.config.sessionId) !== null && _c !== void 0 ? _c : Date.now());
              connector = getAnalyticsConnector(options.instanceName);
              connector.identityStore.setIdentity({
                userId: this.config.userId,
                deviceId: this.config.deviceId
              });
              if (!(this.config.offline !== OfflineDisabled)) return [3, 9];
              return [4, this.add(networkConnectivityCheckerPlugin()).promise];
            case 8:
              _d.sent();
              _d.label = 9;
            case 9:
              return [4, this.add(new Destination()).promise];
            case 10:
              _d.sent();
              return [4, this.add(new Context()).promise];
            case 11:
              _d.sent();
              return [4, this.add(new IdentityEventSender()).promise];
            case 12:
              _d.sent();
              detNotify(this.config);
              if (!isFileDownloadTrackingEnabled(this.config.defaultTracking)) return [3, 14];
              this.config.loggerProvider.debug("Adding file download tracking plugin");
              return [4, this.add(fileDownloadTracking()).promise];
            case 13:
              _d.sent();
              _d.label = 14;
            case 14:
              if (!isFormInteractionTrackingEnabled(this.config.defaultTracking)) return [3, 16];
              this.config.loggerProvider.debug("Adding form interaction plugin");
              return [4, this.add(formInteractionTracking()).promise];
            case 15:
              _d.sent();
              _d.label = 16;
            case 16:
              if (!isPageViewTrackingEnabled(this.config.defaultTracking)) return [3, 18];
              this.config.loggerProvider.debug("Adding page view tracking plugin");
              return [4, this.add(pageViewTrackingPlugin(getPageViewTrackingConfig(this.config))).promise];
            case 17:
              _d.sent();
              _d.label = 18;
            case 18:
              if (!isElementInteractionsEnabled(this.config.autocapture)) return [3, 20];
              this.config.loggerProvider.debug("Adding user interactions plugin (autocapture plugin)");
              return [4, this.add(autocapturePlugin(getElementInteractionsConfig(this.config))).promise];
            case 19:
              _d.sent();
              _d.label = 20;
            case 20:
              this.initializing = false;
              return [4, this.runQueuedFunctions("dispatchQ")];
            case 21:
              _d.sent();
              connector.eventBridge.setEventReceiver(function(event) {
                void _this.track(event.eventType, event.eventProperties);
              });
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    AmplitudeBrowser2.prototype.getUserId = function() {
      var _a;
      return (_a = this.config) === null || _a === void 0 ? void 0 : _a.userId;
    };
    AmplitudeBrowser2.prototype.setUserId = function(userId) {
      if (!this.config) {
        this.q.push(this.setUserId.bind(this, userId));
        return;
      }
      this.config.loggerProvider.debug("function setUserId: ", userId);
      if (userId !== this.config.userId || userId === void 0) {
        this.config.userId = userId;
        setConnectorUserId(userId, this.config.instanceName);
      }
    };
    AmplitudeBrowser2.prototype.getDeviceId = function() {
      var _a;
      return (_a = this.config) === null || _a === void 0 ? void 0 : _a.deviceId;
    };
    AmplitudeBrowser2.prototype.setDeviceId = function(deviceId) {
      if (!this.config) {
        this.q.push(this.setDeviceId.bind(this, deviceId));
        return;
      }
      this.config.loggerProvider.debug("function setDeviceId: ", deviceId);
      this.config.deviceId = deviceId;
      setConnectorDeviceId(deviceId, this.config.instanceName);
    };
    AmplitudeBrowser2.prototype.reset = function() {
      this.setDeviceId(UUID());
      this.setUserId(void 0);
    };
    AmplitudeBrowser2.prototype.getSessionId = function() {
      var _a;
      return (_a = this.config) === null || _a === void 0 ? void 0 : _a.sessionId;
    };
    AmplitudeBrowser2.prototype.setSessionId = function(sessionId) {
      var _a;
      var promises = [];
      if (!this.config) {
        this.q.push(this.setSessionId.bind(this, sessionId));
        return returnWrapper(Promise.resolve());
      }
      if (sessionId === this.config.sessionId) {
        return returnWrapper(Promise.resolve());
      }
      this.config.loggerProvider.debug("function setSessionId: ", sessionId);
      var previousSessionId = this.getSessionId();
      var lastEventTime = this.config.lastEventTime;
      var lastEventId = (_a = this.config.lastEventId) !== null && _a !== void 0 ? _a : -1;
      this.config.sessionId = sessionId;
      this.config.lastEventTime = void 0;
      this.config.pageCounter = 0;
      if (isSessionTrackingEnabled(this.config.defaultTracking)) {
        if (previousSessionId && lastEventTime) {
          promises.push(this.track(DEFAULT_SESSION_END_EVENT, void 0, {
            device_id: this.previousSessionDeviceId,
            event_id: ++lastEventId,
            session_id: previousSessionId,
            time: lastEventTime + 1,
            user_id: this.previousSessionUserId
          }).promise);
        }
        this.config.lastEventTime = this.config.sessionId;
      }
      var isCampaignEventTracked = this.trackCampaignEventIfNeeded(++lastEventId, promises);
      if (isSessionTrackingEnabled(this.config.defaultTracking)) {
        promises.push(this.track(DEFAULT_SESSION_START_EVENT, void 0, {
          event_id: isCampaignEventTracked ? ++lastEventId : lastEventId,
          session_id: this.config.sessionId,
          time: this.config.lastEventTime
        }).promise);
      }
      this.previousSessionDeviceId = this.config.deviceId;
      this.previousSessionUserId = this.config.userId;
      return returnWrapper(Promise.all(promises));
    };
    AmplitudeBrowser2.prototype.extendSession = function() {
      if (!this.config) {
        this.q.push(this.extendSession.bind(this));
        return;
      }
      this.config.lastEventTime = Date.now();
    };
    AmplitudeBrowser2.prototype.setTransport = function(transport) {
      if (!this.config) {
        this.q.push(this.setTransport.bind(this, transport));
        return;
      }
      this.config.transportProvider = createTransport(transport);
    };
    AmplitudeBrowser2.prototype.identify = function(identify2, eventOptions) {
      if (isInstanceProxy(identify2)) {
        var queue2 = identify2._q;
        identify2._q = [];
        identify2 = convertProxyObjectToRealObject(new Identify(), queue2);
      }
      if (eventOptions === null || eventOptions === void 0 ? void 0 : eventOptions.user_id) {
        this.setUserId(eventOptions.user_id);
      }
      if (eventOptions === null || eventOptions === void 0 ? void 0 : eventOptions.device_id) {
        this.setDeviceId(eventOptions.device_id);
      }
      return _super.prototype.identify.call(this, identify2, eventOptions);
    };
    AmplitudeBrowser2.prototype.groupIdentify = function(groupType, groupName, identify2, eventOptions) {
      if (isInstanceProxy(identify2)) {
        var queue2 = identify2._q;
        identify2._q = [];
        identify2 = convertProxyObjectToRealObject(new Identify(), queue2);
      }
      return _super.prototype.groupIdentify.call(this, groupType, groupName, identify2, eventOptions);
    };
    AmplitudeBrowser2.prototype.revenue = function(revenue2, eventOptions) {
      if (isInstanceProxy(revenue2)) {
        var queue2 = revenue2._q;
        revenue2._q = [];
        revenue2 = convertProxyObjectToRealObject(new Revenue(), queue2);
      }
      return _super.prototype.revenue.call(this, revenue2, eventOptions);
    };
    AmplitudeBrowser2.prototype.trackCampaignEventIfNeeded = function(lastEventId, promises) {
      if (!this.webAttribution || !this.webAttribution.shouldTrackNewCampaign) {
        return false;
      }
      var campaignEvent = this.webAttribution.generateCampaignEvent(lastEventId);
      if (promises) {
        promises.push(this.track(campaignEvent).promise);
      } else {
        this.track(campaignEvent);
      }
      this.config.loggerProvider.log("Tracking attribution.");
      return true;
    };
    AmplitudeBrowser2.prototype.process = function(event) {
      return __awaiter(this, void 0, void 0, function() {
        var currentTime, isEventInNewSession, shouldSetSessionIdOnNewCampaign;
        return __generator(this, function(_a) {
          currentTime = Date.now();
          isEventInNewSession = isNewSession(this.config.sessionTimeout, this.config.lastEventTime);
          shouldSetSessionIdOnNewCampaign = this.webAttribution && this.webAttribution.shouldSetSessionIdOnNewCampaign();
          if (event.event_type !== DEFAULT_SESSION_START_EVENT && event.event_type !== DEFAULT_SESSION_END_EVENT && (!event.session_id || event.session_id === this.getSessionId())) {
            if (isEventInNewSession || shouldSetSessionIdOnNewCampaign) {
              this.setSessionId(currentTime);
              if (shouldSetSessionIdOnNewCampaign) {
                this.config.loggerProvider.log("Created a new session for new campaign.");
              }
            } else if (!isEventInNewSession) {
              this.trackCampaignEventIfNeeded();
            }
          }
          return [2, _super.prototype.process.call(this, event)];
        });
      });
    };
    AmplitudeBrowser2.prototype.logBrowserOptions = function(browserConfig) {
      try {
        var browserConfigCopy = __assign(__assign({}, browserConfig), { apiKey: browserConfig.apiKey.substring(0, 10) + "********" });
        this.config.loggerProvider.debug("Initialized Amplitude with BrowserConfig:", JSON.stringify(browserConfigCopy));
      } catch (e) {
        this.config.loggerProvider.error("Error logging browser config", e);
      }
    };
    return AmplitudeBrowser2;
  }(AmplitudeCore)
);

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/browser-client-factory.js
var createInstance = function() {
  var client = new AmplitudeBrowser();
  return {
    init: debugWrapper(client.init.bind(client), "init", getClientLogConfig(client), getClientStates(client, ["config"])),
    add: debugWrapper(client.add.bind(client), "add", getClientLogConfig(client), getClientStates(client, ["config.apiKey", "timeline.plugins"])),
    remove: debugWrapper(client.remove.bind(client), "remove", getClientLogConfig(client), getClientStates(client, ["config.apiKey", "timeline.plugins"])),
    track: debugWrapper(client.track.bind(client), "track", getClientLogConfig(client), getClientStates(client, ["config.apiKey", "timeline.queue.length"])),
    logEvent: debugWrapper(client.logEvent.bind(client), "logEvent", getClientLogConfig(client), getClientStates(client, ["config.apiKey", "timeline.queue.length"])),
    identify: debugWrapper(client.identify.bind(client), "identify", getClientLogConfig(client), getClientStates(client, ["config.apiKey", "timeline.queue.length"])),
    groupIdentify: debugWrapper(client.groupIdentify.bind(client), "groupIdentify", getClientLogConfig(client), getClientStates(client, ["config.apiKey", "timeline.queue.length"])),
    setGroup: debugWrapper(client.setGroup.bind(client), "setGroup", getClientLogConfig(client), getClientStates(client, ["config.apiKey", "timeline.queue.length"])),
    revenue: debugWrapper(client.revenue.bind(client), "revenue", getClientLogConfig(client), getClientStates(client, ["config.apiKey", "timeline.queue.length"])),
    flush: debugWrapper(client.flush.bind(client), "flush", getClientLogConfig(client), getClientStates(client, ["config.apiKey", "timeline.queue.length"])),
    getUserId: debugWrapper(client.getUserId.bind(client), "getUserId", getClientLogConfig(client), getClientStates(client, ["config", "config.userId"])),
    setUserId: debugWrapper(client.setUserId.bind(client), "setUserId", getClientLogConfig(client), getClientStates(client, ["config", "config.userId"])),
    getDeviceId: debugWrapper(client.getDeviceId.bind(client), "getDeviceId", getClientLogConfig(client), getClientStates(client, ["config", "config.deviceId"])),
    setDeviceId: debugWrapper(client.setDeviceId.bind(client), "setDeviceId", getClientLogConfig(client), getClientStates(client, ["config", "config.deviceId"])),
    reset: debugWrapper(client.reset.bind(client), "reset", getClientLogConfig(client), getClientStates(client, ["config", "config.userId", "config.deviceId"])),
    getSessionId: debugWrapper(client.getSessionId.bind(client), "getSessionId", getClientLogConfig(client), getClientStates(client, ["config"])),
    setSessionId: debugWrapper(client.setSessionId.bind(client), "setSessionId", getClientLogConfig(client), getClientStates(client, ["config"])),
    extendSession: debugWrapper(client.extendSession.bind(client), "extendSession", getClientLogConfig(client), getClientStates(client, ["config"])),
    setOptOut: debugWrapper(client.setOptOut.bind(client), "setOptOut", getClientLogConfig(client), getClientStates(client, ["config"])),
    setTransport: debugWrapper(client.setTransport.bind(client), "setTransport", getClientLogConfig(client), getClientStates(client, ["config"]))
  };
};
var browser_client_factory_default = createInstance();

// ../../.yarn/cache/@amplitude-analytics-browser-npm-2.11.11-3418b94cf3-103f7117f5.zip/node_modules/@amplitude/analytics-browser/lib/esm/index.js
var add = browser_client_factory_default.add;
var extendSession = browser_client_factory_default.extendSession;
var flush = browser_client_factory_default.flush;
var getDeviceId = browser_client_factory_default.getDeviceId;
var getSessionId = browser_client_factory_default.getSessionId;
var getUserId = browser_client_factory_default.getUserId;
var groupIdentify = browser_client_factory_default.groupIdentify;
var identify = browser_client_factory_default.identify;
var init = browser_client_factory_default.init;
var logEvent = browser_client_factory_default.logEvent;
var remove = browser_client_factory_default.remove;
var reset = browser_client_factory_default.reset;
var revenue = browser_client_factory_default.revenue;
var setDeviceId = browser_client_factory_default.setDeviceId;
var setGroup = browser_client_factory_default.setGroup;
var setOptOut = browser_client_factory_default.setOptOut;
var setSessionId = browser_client_factory_default.setSessionId;
var setTransport = browser_client_factory_default.setTransport;
var setUserId = browser_client_factory_default.setUserId;
var track = browser_client_factory_default.track;
export {
  Identify,
  Revenue,
  esm_exports as Types,
  add,
  createInstance,
  extendSession,
  flush,
  getDeviceId,
  getSessionId,
  getUserId,
  groupIdentify,
  identify,
  init,
  logEvent,
  remove,
  reset,
  revenue,
  runQueuedFunctions,
  setDeviceId,
  setGroup,
  setOptOut,
  setSessionId,
  setTransport,
  setUserId,
  track
};
//# sourceMappingURL=@amplitude_analytics-browser.js.map

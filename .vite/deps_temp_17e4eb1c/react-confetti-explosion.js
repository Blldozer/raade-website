import {
  require_prop_types,
  require_react_is
} from "./chunk-VPAMVI5C.js";
import {
  require_react
} from "./chunk-BYIBYIM7.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  __toESM
} from "./chunk-HXA6O6EE.js";

// node_modules/lodash/_baseRange.js
var require_baseRange = __commonJS({
  "node_modules/lodash/_baseRange.js"(exports, module) {
    var nativeCeil = Math.ceil;
    var nativeMax = Math.max;
    function baseRange(start, end, step, fromRight) {
      var index2 = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
      while (length--) {
        result[fromRight ? length : ++index2] = start;
        start += step;
      }
      return result;
    }
    module.exports = baseRange;
  }
});

// node_modules/lodash/eq.js
var require_eq = __commonJS({
  "node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports, module) {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "node_modules/lodash/isLength.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/lodash/isArrayLike.js"(exports, module) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module.exports = isArrayLike;
  }
});

// node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "node_modules/lodash/_isIndex.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// node_modules/lodash/_isIterateeCall.js
var require_isIterateeCall = __commonJS({
  "node_modules/lodash/_isIterateeCall.js"(exports, module) {
    var eq = require_eq();
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    function isIterateeCall(value, index2, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index2;
      if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
        return eq(object[index2], value);
      }
      return false;
    }
    module.exports = isIterateeCall;
  }
});

// node_modules/lodash/_trimmedEndIndex.js
var require_trimmedEndIndex = __commonJS({
  "node_modules/lodash/_trimmedEndIndex.js"(exports, module) {
    var reWhitespace = /\s/;
    function trimmedEndIndex(string) {
      var index2 = string.length;
      while (index2-- && reWhitespace.test(string.charAt(index2))) {
      }
      return index2;
    }
    module.exports = trimmedEndIndex;
  }
});

// node_modules/lodash/_baseTrim.js
var require_baseTrim = __commonJS({
  "node_modules/lodash/_baseTrim.js"(exports, module) {
    var trimmedEndIndex = require_trimmedEndIndex();
    var reTrimStart = /^\s+/;
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    module.exports = baseTrim;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// node_modules/lodash/toNumber.js
var require_toNumber = __commonJS({
  "node_modules/lodash/toNumber.js"(exports, module) {
    var baseTrim = require_baseTrim();
    var isObject = require_isObject();
    var isSymbol = require_isSymbol();
    var NAN = 0 / 0;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = baseTrim(value);
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = toNumber;
  }
});

// node_modules/lodash/toFinite.js
var require_toFinite = __commonJS({
  "node_modules/lodash/toFinite.js"(exports, module) {
    var toNumber = require_toNumber();
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    module.exports = toFinite;
  }
});

// node_modules/lodash/_createRange.js
var require_createRange = __commonJS({
  "node_modules/lodash/_createRange.js"(exports, module) {
    var baseRange = require_baseRange();
    var isIterateeCall = require_isIterateeCall();
    var toFinite = require_toFinite();
    function createRange(fromRight) {
      return function(start, end, step) {
        if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
          end = step = void 0;
        }
        start = toFinite(start);
        if (end === void 0) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        step = step === void 0 ? start < end ? 1 : -1 : toFinite(step);
        return baseRange(start, end, step, fromRight);
      };
    }
    module.exports = createRange;
  }
});

// node_modules/lodash/range.js
var require_range = __commonJS({
  "node_modules/lodash/range.js"(exports, module) {
    var createRange = require_createRange();
    var range = createRange();
    module.exports = range;
  }
});

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var init_objectWithoutPropertiesLoose = __esm({
  "node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"() {
  }
});

// node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
var init_objectWithoutProperties = __esm({
  "node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"() {
    init_objectWithoutPropertiesLoose();
  }
});

// node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
var init_extends = __esm({
  "node_modules/@babel/runtime/helpers/esm/extends.js"() {
  }
});

// node_modules/is-in-browser/dist/module.js
var _typeof, isBrowser, module_default;
var init_module = __esm({
  "node_modules/is-in-browser/dist/module.js"() {
    _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" && document.nodeType === 9;
    module_default = isBrowser;
  }
});

// node_modules/tiny-warning/dist/tiny-warning.esm.js
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }
    var text = "Warning: " + message;
    if (typeof console !== "undefined") {
      console.warn(text);
    }
    try {
      throw Error(text);
    } catch (x) {
    }
  }
}
var isProduction, tiny_warning_esm_default;
var init_tiny_warning_esm = __esm({
  "node_modules/tiny-warning/dist/tiny-warning.esm.js"() {
    isProduction = false;
    tiny_warning_esm_default = warning;
  }
});

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
var init_typeof = __esm({
  "node_modules/@babel/runtime/helpers/esm/typeof.js"() {
  }
});

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
  if ("object" != _typeof2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var init_toPrimitive = __esm({
  "node_modules/@babel/runtime/helpers/esm/toPrimitive.js"() {
    init_typeof();
  }
});

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof2(i) ? i : i + "";
}
var init_toPropertyKey = __esm({
  "node_modules/@babel/runtime/helpers/esm/toPropertyKey.js"() {
    init_typeof();
    init_toPrimitive();
  }
});

// node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
var init_createClass = __esm({
  "node_modules/@babel/runtime/helpers/esm/createClass.js"() {
    init_toPropertyKey();
  }
});

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}
var init_setPrototypeOf = __esm({
  "node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js"() {
  }
});

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
var init_inheritsLoose = __esm({
  "node_modules/@babel/runtime/helpers/esm/inheritsLoose.js"() {
    init_setPrototypeOf();
  }
});

// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
var init_assertThisInitialized = __esm({
  "node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js"() {
  }
});

// node_modules/jss/dist/jss.esm.js
function cloneStyle(style) {
  if (style == null || typeof style !== "object") return style;
  if (Array.isArray(style)) return style.map(cloneStyle);
  if (style.constructor !== plainObjectConstrurctor) return style;
  var newStyle = {};
  for (var name in style) {
    newStyle[name] = cloneStyle(style[name]);
  }
  return newStyle;
}
function createRule(name, decl, options) {
  if (name === void 0) {
    name = "unnamed";
  }
  var jss2 = options.jss;
  var declCopy = cloneStyle(decl);
  var rule = jss2.plugins.onCreateRule(name, declCopy, options);
  if (rule) return rule;
  if (name[0] === "@") {
    true ? tiny_warning_esm_default(false, "[JSS] Unknown rule " + name) : void 0;
  }
  return null;
}
function getWhitespaceSymbols(options) {
  if (options && options.format === false) {
    return {
      linebreak: "",
      space: ""
    };
  }
  return {
    linebreak: "\n",
    space: " "
  };
}
function indentStr(str, indent) {
  var result = "";
  for (var index2 = 0; index2 < indent; index2++) {
    result += "  ";
  }
  return result + str;
}
function toCss(selector, style, options) {
  if (options === void 0) {
    options = {};
  }
  var result = "";
  if (!style) return result;
  var _options = options, _options$indent = _options.indent, indent = _options$indent === void 0 ? 0 : _options$indent;
  var fallbacks = style.fallbacks;
  if (options.format === false) {
    indent = -Infinity;
  }
  var _getWhitespaceSymbols = getWhitespaceSymbols(options), linebreak = _getWhitespaceSymbols.linebreak, space = _getWhitespaceSymbols.space;
  if (selector) indent++;
  if (fallbacks) {
    if (Array.isArray(fallbacks)) {
      for (var index2 = 0; index2 < fallbacks.length; index2++) {
        var fallback = fallbacks[index2];
        for (var prop in fallback) {
          var value = fallback[prop];
          if (value != null) {
            if (result) result += linebreak;
            result += indentStr(prop + ":" + space + toCssValue(value) + ";", indent);
          }
        }
      }
    } else {
      for (var _prop in fallbacks) {
        var _value = fallbacks[_prop];
        if (_value != null) {
          if (result) result += linebreak;
          result += indentStr(_prop + ":" + space + toCssValue(_value) + ";", indent);
        }
      }
    }
  }
  for (var _prop2 in style) {
    var _value2 = style[_prop2];
    if (_value2 != null && _prop2 !== "fallbacks") {
      if (result) result += linebreak;
      result += indentStr(_prop2 + ":" + space + toCssValue(_value2) + ";", indent);
    }
  }
  if (!result && !options.allowEmpty) return result;
  if (!selector) return result;
  indent--;
  if (result) result = "" + linebreak + result + linebreak;
  return indentStr("" + selector + space + "{" + result, indent) + indentStr("}", indent);
}
function findHigherSheet(registry, options) {
  for (var i = 0; i < registry.length; i++) {
    var sheet = registry[i];
    if (sheet.attached && sheet.options.index > options.index && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }
  return null;
}
function findHighestSheet(registry, options) {
  for (var i = registry.length - 1; i >= 0; i--) {
    var sheet = registry[i];
    if (sheet.attached && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }
  return null;
}
function findCommentNode(text) {
  var head = getHead();
  for (var i = 0; i < head.childNodes.length; i++) {
    var node = head.childNodes[i];
    if (node.nodeType === 8 && node.nodeValue.trim() === text) {
      return node;
    }
  }
  return null;
}
function findPrevNode(options) {
  var registry = sheets.registry;
  if (registry.length > 0) {
    var sheet = findHigherSheet(registry, options);
    if (sheet && sheet.renderer) {
      return {
        parent: sheet.renderer.element.parentNode,
        node: sheet.renderer.element
      };
    }
    sheet = findHighestSheet(registry, options);
    if (sheet && sheet.renderer) {
      return {
        parent: sheet.renderer.element.parentNode,
        node: sheet.renderer.element.nextSibling
      };
    }
  }
  var insertionPoint = options.insertionPoint;
  if (insertionPoint && typeof insertionPoint === "string") {
    var comment = findCommentNode(insertionPoint);
    if (comment) {
      return {
        parent: comment.parentNode,
        node: comment.nextSibling
      };
    }
    true ? tiny_warning_esm_default(false, '[JSS] Insertion point "' + insertionPoint + '" not found.') : void 0;
  }
  return false;
}
function insertStyle(style, options) {
  var insertionPoint = options.insertionPoint;
  var nextNode = findPrevNode(options);
  if (nextNode !== false && nextNode.parent) {
    nextNode.parent.insertBefore(style, nextNode.node);
    return;
  }
  if (insertionPoint && typeof insertionPoint.nodeType === "number") {
    var insertionPointElement = insertionPoint;
    var parentNode = insertionPointElement.parentNode;
    if (parentNode) parentNode.insertBefore(style, insertionPointElement.nextSibling);
    else true ? tiny_warning_esm_default(false, "[JSS] Insertion point is not in the DOM.") : void 0;
    return;
  }
  getHead().appendChild(style);
}
function getDynamicStyles(styles) {
  var to = null;
  for (var key in styles) {
    var value = styles[key];
    var type = typeof value;
    if (type === "function") {
      if (!to) to = {};
      to[key] = value;
    } else if (type === "object" && value !== null && !Array.isArray(value)) {
      var extracted = getDynamicStyles(value);
      if (extracted) {
        if (!to) to = {};
        to[key] = extracted;
      }
    }
  }
  return to;
}
var plainObjectConstrurctor, join, toCssValue, escapeRegex, nativeEscape, escape, BaseStyleRule, StyleRule, pluginStyleRule, defaultToStringOptions, atRegExp, ConditionalRule, keyRegExp, pluginConditionalRule, defaultToStringOptions$1, nameRegExp, KeyframesRule, keyRegExp$1, refRegExp, findReferencedKeyframe, replaceRef, pluginKeyframesRule, KeyframeRule, pluginKeyframeRule, FontFaceRule, keyRegExp$2, pluginFontFaceRule, ViewportRule, pluginViewportRule, SimpleRule, keysMap, pluginSimpleRule, plugins, defaultUpdateOptions, forceUpdateOptions, RuleList, StyleSheet, PluginsRegistry, SheetsRegistry, sheets, globalThis$1, ns, moduleId, maxRules, createGenerateId, memoize, getPropertyValue, setProperty, removeProperty, setSelector, getHead, getNonce, _insertRule, getValidRuleInsertionIndex, createStyle, DomRenderer, instanceCounter, Jss, createJss, SheetsManager, hasCSSTOMSupport, index;
var init_jss_esm = __esm({
  "node_modules/jss/dist/jss.esm.js"() {
    init_extends();
    init_module();
    init_tiny_warning_esm();
    init_createClass();
    init_inheritsLoose();
    init_assertThisInitialized();
    init_objectWithoutPropertiesLoose();
    plainObjectConstrurctor = {}.constructor;
    join = function join2(value, by) {
      var result = "";
      for (var i = 0; i < value.length; i++) {
        if (value[i] === "!important") break;
        if (result) result += by;
        result += value[i];
      }
      return result;
    };
    toCssValue = function toCssValue2(value) {
      if (!Array.isArray(value)) return value;
      var cssValue = "";
      if (Array.isArray(value[0])) {
        for (var i = 0; i < value.length; i++) {
          if (value[i] === "!important") break;
          if (cssValue) cssValue += ", ";
          cssValue += join(value[i], " ");
        }
      } else cssValue = join(value, ", ");
      if (value[value.length - 1] === "!important") {
        cssValue += " !important";
      }
      return cssValue;
    };
    escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
    nativeEscape = typeof CSS !== "undefined" && CSS.escape;
    escape = function(str) {
      return nativeEscape ? nativeEscape(str) : str.replace(escapeRegex, "\\$1");
    };
    BaseStyleRule = function() {
      function BaseStyleRule2(key, style, options) {
        this.type = "style";
        this.isProcessed = false;
        var sheet = options.sheet, Renderer = options.Renderer;
        this.key = key;
        this.options = options;
        this.style = style;
        if (sheet) this.renderer = sheet.renderer;
        else if (Renderer) this.renderer = new Renderer();
      }
      var _proto = BaseStyleRule2.prototype;
      _proto.prop = function prop(name, value, options) {
        if (value === void 0) return this.style[name];
        var force = options ? options.force : false;
        if (!force && this.style[name] === value) return this;
        var newValue = value;
        if (!options || options.process !== false) {
          newValue = this.options.jss.plugins.onChangeValue(value, name, this);
        }
        var isEmpty = newValue == null || newValue === false;
        var isDefined = name in this.style;
        if (isEmpty && !isDefined && !force) return this;
        var remove = isEmpty && isDefined;
        if (remove) delete this.style[name];
        else this.style[name] = newValue;
        if (this.renderable && this.renderer) {
          if (remove) this.renderer.removeProperty(this.renderable, name);
          else this.renderer.setProperty(this.renderable, name, newValue);
          return this;
        }
        var sheet = this.options.sheet;
        if (sheet && sheet.attached) {
          true ? tiny_warning_esm_default(false, '[JSS] Rule is not linked. Missing sheet option "link: true".') : void 0;
        }
        return this;
      };
      return BaseStyleRule2;
    }();
    StyleRule = function(_BaseStyleRule) {
      _inheritsLoose(StyleRule2, _BaseStyleRule);
      function StyleRule2(key, style, options) {
        var _this;
        _this = _BaseStyleRule.call(this, key, style, options) || this;
        var selector = options.selector, scoped = options.scoped, sheet = options.sheet, generateId = options.generateId;
        if (selector) {
          _this.selectorText = selector;
        } else if (scoped !== false) {
          _this.id = generateId(_assertThisInitialized(_assertThisInitialized(_this)), sheet);
          _this.selectorText = "." + escape(_this.id);
        }
        return _this;
      }
      var _proto2 = StyleRule2.prototype;
      _proto2.applyTo = function applyTo(renderable) {
        var renderer = this.renderer;
        if (renderer) {
          var json = this.toJSON();
          for (var prop in json) {
            renderer.setProperty(renderable, prop, json[prop]);
          }
        }
        return this;
      };
      _proto2.toJSON = function toJSON() {
        var json = {};
        for (var prop in this.style) {
          var value = this.style[prop];
          if (typeof value !== "object") json[prop] = value;
          else if (Array.isArray(value)) json[prop] = toCssValue(value);
        }
        return json;
      };
      _proto2.toString = function toString(options) {
        var sheet = this.options.sheet;
        var link = sheet ? sheet.options.link : false;
        var opts = link ? _extends({}, options, {
          allowEmpty: true
        }) : options;
        return toCss(this.selectorText, this.style, opts);
      };
      _createClass(StyleRule2, [{
        key: "selector",
        set: function set2(selector) {
          if (selector === this.selectorText) return;
          this.selectorText = selector;
          var renderer = this.renderer, renderable = this.renderable;
          if (!renderable || !renderer) return;
          var hasChanged = renderer.setSelector(renderable, selector);
          if (!hasChanged) {
            renderer.replaceRule(renderable, this);
          }
        },
        get: function get2() {
          return this.selectorText;
        }
      }]);
      return StyleRule2;
    }(BaseStyleRule);
    pluginStyleRule = {
      onCreateRule: function onCreateRule(key, style, options) {
        if (key[0] === "@" || options.parent && options.parent.type === "keyframes") {
          return null;
        }
        return new StyleRule(key, style, options);
      }
    };
    defaultToStringOptions = {
      indent: 1,
      children: true
    };
    atRegExp = /@([\w-]+)/;
    ConditionalRule = function() {
      function ConditionalRule2(key, styles, options) {
        this.type = "conditional";
        this.isProcessed = false;
        this.key = key;
        var atMatch = key.match(atRegExp);
        this.at = atMatch ? atMatch[1] : "unknown";
        this.query = options.name || "@" + this.at;
        this.options = options;
        this.rules = new RuleList(_extends({}, options, {
          parent: this
        }));
        for (var name in styles) {
          this.rules.add(name, styles[name]);
        }
        this.rules.process();
      }
      var _proto = ConditionalRule2.prototype;
      _proto.getRule = function getRule(name) {
        return this.rules.get(name);
      };
      _proto.indexOf = function indexOf(rule) {
        return this.rules.indexOf(rule);
      };
      _proto.addRule = function addRule(name, style, options) {
        var rule = this.rules.add(name, style, options);
        if (!rule) return null;
        this.options.jss.plugins.onProcessRule(rule);
        return rule;
      };
      _proto.replaceRule = function replaceRule(name, style, options) {
        var newRule = this.rules.replace(name, style, options);
        if (newRule) this.options.jss.plugins.onProcessRule(newRule);
        return newRule;
      };
      _proto.toString = function toString(options) {
        if (options === void 0) {
          options = defaultToStringOptions;
        }
        var _getWhitespaceSymbols = getWhitespaceSymbols(options), linebreak = _getWhitespaceSymbols.linebreak;
        if (options.indent == null) options.indent = defaultToStringOptions.indent;
        if (options.children == null) options.children = defaultToStringOptions.children;
        if (options.children === false) {
          return this.query + " {}";
        }
        var children = this.rules.toString(options);
        return children ? this.query + " {" + linebreak + children + linebreak + "}" : "";
      };
      return ConditionalRule2;
    }();
    keyRegExp = /@container|@media|@supports\s+/;
    pluginConditionalRule = {
      onCreateRule: function onCreateRule2(key, styles, options) {
        return keyRegExp.test(key) ? new ConditionalRule(key, styles, options) : null;
      }
    };
    defaultToStringOptions$1 = {
      indent: 1,
      children: true
    };
    nameRegExp = /@keyframes\s+([\w-]+)/;
    KeyframesRule = function() {
      function KeyframesRule2(key, frames, options) {
        this.type = "keyframes";
        this.at = "@keyframes";
        this.isProcessed = false;
        var nameMatch = key.match(nameRegExp);
        if (nameMatch && nameMatch[1]) {
          this.name = nameMatch[1];
        } else {
          this.name = "noname";
          true ? tiny_warning_esm_default(false, "[JSS] Bad keyframes name " + key) : void 0;
        }
        this.key = this.type + "-" + this.name;
        this.options = options;
        var scoped = options.scoped, sheet = options.sheet, generateId = options.generateId;
        this.id = scoped === false ? this.name : escape(generateId(this, sheet));
        this.rules = new RuleList(_extends({}, options, {
          parent: this
        }));
        for (var name in frames) {
          this.rules.add(name, frames[name], _extends({}, options, {
            parent: this
          }));
        }
        this.rules.process();
      }
      var _proto = KeyframesRule2.prototype;
      _proto.toString = function toString(options) {
        if (options === void 0) {
          options = defaultToStringOptions$1;
        }
        var _getWhitespaceSymbols = getWhitespaceSymbols(options), linebreak = _getWhitespaceSymbols.linebreak;
        if (options.indent == null) options.indent = defaultToStringOptions$1.indent;
        if (options.children == null) options.children = defaultToStringOptions$1.children;
        if (options.children === false) {
          return this.at + " " + this.id + " {}";
        }
        var children = this.rules.toString(options);
        if (children) children = "" + linebreak + children + linebreak;
        return this.at + " " + this.id + " {" + children + "}";
      };
      return KeyframesRule2;
    }();
    keyRegExp$1 = /@keyframes\s+/;
    refRegExp = /\$([\w-]+)/g;
    findReferencedKeyframe = function findReferencedKeyframe2(val, keyframes) {
      if (typeof val === "string") {
        return val.replace(refRegExp, function(match, name) {
          if (name in keyframes) {
            return keyframes[name];
          }
          true ? tiny_warning_esm_default(false, '[JSS] Referenced keyframes rule "' + name + '" is not defined.') : void 0;
          return match;
        });
      }
      return val;
    };
    replaceRef = function replaceRef2(style, prop, keyframes) {
      var value = style[prop];
      var refKeyframe = findReferencedKeyframe(value, keyframes);
      if (refKeyframe !== value) {
        style[prop] = refKeyframe;
      }
    };
    pluginKeyframesRule = {
      onCreateRule: function onCreateRule3(key, frames, options) {
        return typeof key === "string" && keyRegExp$1.test(key) ? new KeyframesRule(key, frames, options) : null;
      },
      // Animation name ref replacer.
      onProcessStyle: function onProcessStyle(style, rule, sheet) {
        if (rule.type !== "style" || !sheet) return style;
        if ("animation-name" in style) replaceRef(style, "animation-name", sheet.keyframes);
        if ("animation" in style) replaceRef(style, "animation", sheet.keyframes);
        return style;
      },
      onChangeValue: function onChangeValue(val, prop, rule) {
        var sheet = rule.options.sheet;
        if (!sheet) {
          return val;
        }
        switch (prop) {
          case "animation":
            return findReferencedKeyframe(val, sheet.keyframes);
          case "animation-name":
            return findReferencedKeyframe(val, sheet.keyframes);
          default:
            return val;
        }
      }
    };
    KeyframeRule = function(_BaseStyleRule) {
      _inheritsLoose(KeyframeRule2, _BaseStyleRule);
      function KeyframeRule2() {
        return _BaseStyleRule.apply(this, arguments) || this;
      }
      var _proto = KeyframeRule2.prototype;
      _proto.toString = function toString(options) {
        var sheet = this.options.sheet;
        var link = sheet ? sheet.options.link : false;
        var opts = link ? _extends({}, options, {
          allowEmpty: true
        }) : options;
        return toCss(this.key, this.style, opts);
      };
      return KeyframeRule2;
    }(BaseStyleRule);
    pluginKeyframeRule = {
      onCreateRule: function onCreateRule4(key, style, options) {
        if (options.parent && options.parent.type === "keyframes") {
          return new KeyframeRule(key, style, options);
        }
        return null;
      }
    };
    FontFaceRule = function() {
      function FontFaceRule2(key, style, options) {
        this.type = "font-face";
        this.at = "@font-face";
        this.isProcessed = false;
        this.key = key;
        this.style = style;
        this.options = options;
      }
      var _proto = FontFaceRule2.prototype;
      _proto.toString = function toString(options) {
        var _getWhitespaceSymbols = getWhitespaceSymbols(options), linebreak = _getWhitespaceSymbols.linebreak;
        if (Array.isArray(this.style)) {
          var str = "";
          for (var index2 = 0; index2 < this.style.length; index2++) {
            str += toCss(this.at, this.style[index2]);
            if (this.style[index2 + 1]) str += linebreak;
          }
          return str;
        }
        return toCss(this.at, this.style, options);
      };
      return FontFaceRule2;
    }();
    keyRegExp$2 = /@font-face/;
    pluginFontFaceRule = {
      onCreateRule: function onCreateRule5(key, style, options) {
        return keyRegExp$2.test(key) ? new FontFaceRule(key, style, options) : null;
      }
    };
    ViewportRule = function() {
      function ViewportRule2(key, style, options) {
        this.type = "viewport";
        this.at = "@viewport";
        this.isProcessed = false;
        this.key = key;
        this.style = style;
        this.options = options;
      }
      var _proto = ViewportRule2.prototype;
      _proto.toString = function toString(options) {
        return toCss(this.key, this.style, options);
      };
      return ViewportRule2;
    }();
    pluginViewportRule = {
      onCreateRule: function onCreateRule6(key, style, options) {
        return key === "@viewport" || key === "@-ms-viewport" ? new ViewportRule(key, style, options) : null;
      }
    };
    SimpleRule = function() {
      function SimpleRule2(key, value, options) {
        this.type = "simple";
        this.isProcessed = false;
        this.key = key;
        this.value = value;
        this.options = options;
      }
      var _proto = SimpleRule2.prototype;
      _proto.toString = function toString(options) {
        if (Array.isArray(this.value)) {
          var str = "";
          for (var index2 = 0; index2 < this.value.length; index2++) {
            str += this.key + " " + this.value[index2] + ";";
            if (this.value[index2 + 1]) str += "\n";
          }
          return str;
        }
        return this.key + " " + this.value + ";";
      };
      return SimpleRule2;
    }();
    keysMap = {
      "@charset": true,
      "@import": true,
      "@namespace": true
    };
    pluginSimpleRule = {
      onCreateRule: function onCreateRule7(key, value, options) {
        return key in keysMap ? new SimpleRule(key, value, options) : null;
      }
    };
    plugins = [pluginStyleRule, pluginConditionalRule, pluginKeyframesRule, pluginKeyframeRule, pluginFontFaceRule, pluginViewportRule, pluginSimpleRule];
    defaultUpdateOptions = {
      process: true
    };
    forceUpdateOptions = {
      force: true,
      process: true
      /**
       * Contains rules objects and allows adding/removing etc.
       * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
       */
    };
    RuleList = function() {
      function RuleList2(options) {
        this.map = {};
        this.raw = {};
        this.index = [];
        this.counter = 0;
        this.options = options;
        this.classes = options.classes;
        this.keyframes = options.keyframes;
      }
      var _proto = RuleList2.prototype;
      _proto.add = function add(name, decl, ruleOptions) {
        var _this$options = this.options, parent = _this$options.parent, sheet = _this$options.sheet, jss2 = _this$options.jss, Renderer = _this$options.Renderer, generateId = _this$options.generateId, scoped = _this$options.scoped;
        var options = _extends({
          classes: this.classes,
          parent,
          sheet,
          jss: jss2,
          Renderer,
          generateId,
          scoped,
          name,
          keyframes: this.keyframes,
          selector: void 0
        }, ruleOptions);
        var key = name;
        if (name in this.raw) {
          key = name + "-d" + this.counter++;
        }
        this.raw[key] = decl;
        if (key in this.classes) {
          options.selector = "." + escape(this.classes[key]);
        }
        var rule = createRule(key, decl, options);
        if (!rule) return null;
        this.register(rule);
        var index2 = options.index === void 0 ? this.index.length : options.index;
        this.index.splice(index2, 0, rule);
        return rule;
      };
      _proto.replace = function replace(name, decl, ruleOptions) {
        var oldRule = this.get(name);
        var oldIndex = this.index.indexOf(oldRule);
        if (oldRule) {
          this.remove(oldRule);
        }
        var options = ruleOptions;
        if (oldIndex !== -1) options = _extends({}, ruleOptions, {
          index: oldIndex
        });
        return this.add(name, decl, options);
      };
      _proto.get = function get2(nameOrSelector) {
        return this.map[nameOrSelector];
      };
      _proto.remove = function remove(rule) {
        this.unregister(rule);
        delete this.raw[rule.key];
        this.index.splice(this.index.indexOf(rule), 1);
      };
      _proto.indexOf = function indexOf(rule) {
        return this.index.indexOf(rule);
      };
      _proto.process = function process2() {
        var plugins3 = this.options.jss.plugins;
        this.index.slice(0).forEach(plugins3.onProcessRule, plugins3);
      };
      _proto.register = function register(rule) {
        this.map[rule.key] = rule;
        if (rule instanceof StyleRule) {
          this.map[rule.selector] = rule;
          if (rule.id) this.classes[rule.key] = rule.id;
        } else if (rule instanceof KeyframesRule && this.keyframes) {
          this.keyframes[rule.name] = rule.id;
        }
      };
      _proto.unregister = function unregister(rule) {
        delete this.map[rule.key];
        if (rule instanceof StyleRule) {
          delete this.map[rule.selector];
          delete this.classes[rule.key];
        } else if (rule instanceof KeyframesRule) {
          delete this.keyframes[rule.name];
        }
      };
      _proto.update = function update2() {
        var name;
        var data;
        var options;
        if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) === "string") {
          name = arguments.length <= 0 ? void 0 : arguments[0];
          data = arguments.length <= 1 ? void 0 : arguments[1];
          options = arguments.length <= 2 ? void 0 : arguments[2];
        } else {
          data = arguments.length <= 0 ? void 0 : arguments[0];
          options = arguments.length <= 1 ? void 0 : arguments[1];
          name = null;
        }
        if (name) {
          this.updateOne(this.get(name), data, options);
        } else {
          for (var index2 = 0; index2 < this.index.length; index2++) {
            this.updateOne(this.index[index2], data, options);
          }
        }
      };
      _proto.updateOne = function updateOne(rule, data, options) {
        if (options === void 0) {
          options = defaultUpdateOptions;
        }
        var _this$options2 = this.options, plugins3 = _this$options2.jss.plugins, sheet = _this$options2.sheet;
        if (rule.rules instanceof RuleList2) {
          rule.rules.update(data, options);
          return;
        }
        var style = rule.style;
        plugins3.onUpdate(data, rule, sheet, options);
        if (options.process && style && style !== rule.style) {
          plugins3.onProcessStyle(rule.style, rule, sheet);
          for (var prop in rule.style) {
            var nextValue = rule.style[prop];
            var prevValue = style[prop];
            if (nextValue !== prevValue) {
              rule.prop(prop, nextValue, forceUpdateOptions);
            }
          }
          for (var _prop in style) {
            var _nextValue = rule.style[_prop];
            var _prevValue = style[_prop];
            if (_nextValue == null && _nextValue !== _prevValue) {
              rule.prop(_prop, null, forceUpdateOptions);
            }
          }
        }
      };
      _proto.toString = function toString(options) {
        var str = "";
        var sheet = this.options.sheet;
        var link = sheet ? sheet.options.link : false;
        var _getWhitespaceSymbols = getWhitespaceSymbols(options), linebreak = _getWhitespaceSymbols.linebreak;
        for (var index2 = 0; index2 < this.index.length; index2++) {
          var rule = this.index[index2];
          var css2 = rule.toString(options);
          if (!css2 && !link) continue;
          if (str) str += linebreak;
          str += css2;
        }
        return str;
      };
      return RuleList2;
    }();
    StyleSheet = function() {
      function StyleSheet2(styles, options) {
        this.attached = false;
        this.deployed = false;
        this.classes = {};
        this.keyframes = {};
        this.options = _extends({}, options, {
          sheet: this,
          parent: this,
          classes: this.classes,
          keyframes: this.keyframes
        });
        if (options.Renderer) {
          this.renderer = new options.Renderer(this);
        }
        this.rules = new RuleList(this.options);
        for (var name in styles) {
          this.rules.add(name, styles[name]);
        }
        this.rules.process();
      }
      var _proto = StyleSheet2.prototype;
      _proto.attach = function attach2() {
        if (this.attached) return this;
        if (this.renderer) this.renderer.attach();
        this.attached = true;
        if (!this.deployed) this.deploy();
        return this;
      };
      _proto.detach = function detach2() {
        if (!this.attached) return this;
        if (this.renderer) this.renderer.detach();
        this.attached = false;
        return this;
      };
      _proto.addRule = function addRule(name, decl, options) {
        var queue = this.queue;
        if (this.attached && !queue) this.queue = [];
        var rule = this.rules.add(name, decl, options);
        if (!rule) return null;
        this.options.jss.plugins.onProcessRule(rule);
        if (this.attached) {
          if (!this.deployed) return rule;
          if (queue) queue.push(rule);
          else {
            this.insertRule(rule);
            if (this.queue) {
              this.queue.forEach(this.insertRule, this);
              this.queue = void 0;
            }
          }
          return rule;
        }
        this.deployed = false;
        return rule;
      };
      _proto.replaceRule = function replaceRule(nameOrSelector, decl, options) {
        var oldRule = this.rules.get(nameOrSelector);
        if (!oldRule) return this.addRule(nameOrSelector, decl, options);
        var newRule = this.rules.replace(nameOrSelector, decl, options);
        if (newRule) {
          this.options.jss.plugins.onProcessRule(newRule);
        }
        if (this.attached) {
          if (!this.deployed) return newRule;
          if (this.renderer) {
            if (!newRule) {
              this.renderer.deleteRule(oldRule);
            } else if (oldRule.renderable) {
              this.renderer.replaceRule(oldRule.renderable, newRule);
            }
          }
          return newRule;
        }
        this.deployed = false;
        return newRule;
      };
      _proto.insertRule = function insertRule2(rule) {
        if (this.renderer) {
          this.renderer.insertRule(rule);
        }
      };
      _proto.addRules = function addRules(styles, options) {
        var added = [];
        for (var name in styles) {
          var rule = this.addRule(name, styles[name], options);
          if (rule) added.push(rule);
        }
        return added;
      };
      _proto.getRule = function getRule(nameOrSelector) {
        return this.rules.get(nameOrSelector);
      };
      _proto.deleteRule = function deleteRule(name) {
        var rule = typeof name === "object" ? name : this.rules.get(name);
        if (!rule || // Style sheet was created without link: true and attached, in this case we
        // won't be able to remove the CSS rule from the DOM.
        this.attached && !rule.renderable) {
          return false;
        }
        this.rules.remove(rule);
        if (this.attached && rule.renderable && this.renderer) {
          return this.renderer.deleteRule(rule.renderable);
        }
        return true;
      };
      _proto.indexOf = function indexOf(rule) {
        return this.rules.indexOf(rule);
      };
      _proto.deploy = function deploy() {
        if (this.renderer) this.renderer.deploy();
        this.deployed = true;
        return this;
      };
      _proto.update = function update2() {
        var _this$rules;
        (_this$rules = this.rules).update.apply(_this$rules, arguments);
        return this;
      };
      _proto.updateOne = function updateOne(rule, data, options) {
        this.rules.updateOne(rule, data, options);
        return this;
      };
      _proto.toString = function toString(options) {
        return this.rules.toString(options);
      };
      return StyleSheet2;
    }();
    PluginsRegistry = function() {
      function PluginsRegistry2() {
        this.plugins = {
          internal: [],
          external: []
        };
        this.registry = {};
      }
      var _proto = PluginsRegistry2.prototype;
      _proto.onCreateRule = function onCreateRule8(name, decl, options) {
        for (var i = 0; i < this.registry.onCreateRule.length; i++) {
          var rule = this.registry.onCreateRule[i](name, decl, options);
          if (rule) return rule;
        }
        return null;
      };
      _proto.onProcessRule = function onProcessRule(rule) {
        if (rule.isProcessed) return;
        var sheet = rule.options.sheet;
        for (var i = 0; i < this.registry.onProcessRule.length; i++) {
          this.registry.onProcessRule[i](rule, sheet);
        }
        if (rule.style) this.onProcessStyle(rule.style, rule, sheet);
        rule.isProcessed = true;
      };
      _proto.onProcessStyle = function onProcessStyle2(style, rule, sheet) {
        for (var i = 0; i < this.registry.onProcessStyle.length; i++) {
          rule.style = this.registry.onProcessStyle[i](rule.style, rule, sheet);
        }
      };
      _proto.onProcessSheet = function onProcessSheet(sheet) {
        for (var i = 0; i < this.registry.onProcessSheet.length; i++) {
          this.registry.onProcessSheet[i](sheet);
        }
      };
      _proto.onUpdate = function onUpdate(data, rule, sheet, options) {
        for (var i = 0; i < this.registry.onUpdate.length; i++) {
          this.registry.onUpdate[i](data, rule, sheet, options);
        }
      };
      _proto.onChangeValue = function onChangeValue2(value, prop, rule) {
        var processedValue = value;
        for (var i = 0; i < this.registry.onChangeValue.length; i++) {
          processedValue = this.registry.onChangeValue[i](processedValue, prop, rule);
        }
        return processedValue;
      };
      _proto.use = function use(newPlugin, options) {
        if (options === void 0) {
          options = {
            queue: "external"
          };
        }
        var plugins3 = this.plugins[options.queue];
        if (plugins3.indexOf(newPlugin) !== -1) {
          return;
        }
        plugins3.push(newPlugin);
        this.registry = [].concat(this.plugins.external, this.plugins.internal).reduce(function(registry, plugin) {
          for (var name in plugin) {
            if (name in registry) {
              registry[name].push(plugin[name]);
            } else {
              true ? tiny_warning_esm_default(false, '[JSS] Unknown hook "' + name + '".') : void 0;
            }
          }
          return registry;
        }, {
          onCreateRule: [],
          onProcessRule: [],
          onProcessStyle: [],
          onProcessSheet: [],
          onChangeValue: [],
          onUpdate: []
        });
      };
      return PluginsRegistry2;
    }();
    SheetsRegistry = function() {
      function SheetsRegistry2() {
        this.registry = [];
      }
      var _proto = SheetsRegistry2.prototype;
      _proto.add = function add(sheet) {
        var registry = this.registry;
        var index2 = sheet.options.index;
        if (registry.indexOf(sheet) !== -1) return;
        if (registry.length === 0 || index2 >= this.index) {
          registry.push(sheet);
          return;
        }
        for (var i = 0; i < registry.length; i++) {
          if (registry[i].options.index > index2) {
            registry.splice(i, 0, sheet);
            return;
          }
        }
      };
      _proto.reset = function reset() {
        this.registry = [];
      };
      _proto.remove = function remove(sheet) {
        var index2 = this.registry.indexOf(sheet);
        this.registry.splice(index2, 1);
      };
      _proto.toString = function toString(_temp) {
        var _ref = _temp === void 0 ? {} : _temp, attached = _ref.attached, options = _objectWithoutPropertiesLoose(_ref, ["attached"]);
        var _getWhitespaceSymbols = getWhitespaceSymbols(options), linebreak = _getWhitespaceSymbols.linebreak;
        var css2 = "";
        for (var i = 0; i < this.registry.length; i++) {
          var sheet = this.registry[i];
          if (attached != null && sheet.attached !== attached) {
            continue;
          }
          if (css2) css2 += linebreak;
          css2 += sheet.toString(options);
        }
        return css2;
      };
      _createClass(SheetsRegistry2, [{
        key: "index",
        /**
         * Current highest index number.
         */
        get: function get2() {
          return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
        }
      }]);
      return SheetsRegistry2;
    }();
    sheets = new SheetsRegistry();
    globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
    ns = "2f1acc6c3a606b082e5eef5e54414ffb";
    if (globalThis$1[ns] == null) globalThis$1[ns] = 0;
    moduleId = globalThis$1[ns]++;
    maxRules = 1e10;
    createGenerateId = function createGenerateId2(options) {
      if (options === void 0) {
        options = {};
      }
      var ruleCounter = 0;
      var generateId = function generateId2(rule, sheet) {
        ruleCounter += 1;
        if (ruleCounter > maxRules) {
          true ? tiny_warning_esm_default(false, "[JSS] You might have a memory leak. Rule counter is at " + ruleCounter + ".") : void 0;
        }
        var jssId = "";
        var prefix2 = "";
        if (sheet) {
          if (sheet.options.classNamePrefix) {
            prefix2 = sheet.options.classNamePrefix;
          }
          if (sheet.options.jss.id != null) {
            jssId = String(sheet.options.jss.id);
          }
        }
        if (options.minify) {
          return "" + (prefix2 || "c") + moduleId + jssId + ruleCounter;
        }
        return prefix2 + rule.key + "-" + moduleId + (jssId ? "-" + jssId : "") + "-" + ruleCounter;
      };
      return generateId;
    };
    memoize = function memoize2(fn) {
      var value;
      return function() {
        if (!value) value = fn();
        return value;
      };
    };
    getPropertyValue = function getPropertyValue2(cssRule, prop) {
      try {
        if (cssRule.attributeStyleMap) {
          return cssRule.attributeStyleMap.get(prop);
        }
        return cssRule.style.getPropertyValue(prop);
      } catch (err) {
        return "";
      }
    };
    setProperty = function setProperty2(cssRule, prop, value) {
      try {
        var cssValue = value;
        if (Array.isArray(value)) {
          cssValue = toCssValue(value);
        }
        if (cssRule.attributeStyleMap) {
          cssRule.attributeStyleMap.set(prop, cssValue);
        } else {
          var indexOfImportantFlag = cssValue ? cssValue.indexOf("!important") : -1;
          var cssValueWithoutImportantFlag = indexOfImportantFlag > -1 ? cssValue.substr(0, indexOfImportantFlag - 1) : cssValue;
          cssRule.style.setProperty(prop, cssValueWithoutImportantFlag, indexOfImportantFlag > -1 ? "important" : "");
        }
      } catch (err) {
        return false;
      }
      return true;
    };
    removeProperty = function removeProperty2(cssRule, prop) {
      try {
        if (cssRule.attributeStyleMap) {
          cssRule.attributeStyleMap.delete(prop);
        } else {
          cssRule.style.removeProperty(prop);
        }
      } catch (err) {
        true ? tiny_warning_esm_default(false, '[JSS] DOMException "' + err.message + '" was thrown. Tried to remove property "' + prop + '".') : void 0;
      }
    };
    setSelector = function setSelector2(cssRule, selectorText) {
      cssRule.selectorText = selectorText;
      return cssRule.selectorText === selectorText;
    };
    getHead = memoize(function() {
      return document.querySelector("head");
    });
    getNonce = memoize(function() {
      var node = document.querySelector('meta[property="csp-nonce"]');
      return node ? node.getAttribute("content") : null;
    });
    _insertRule = function insertRule(container, rule, index2) {
      try {
        if ("insertRule" in container) {
          container.insertRule(rule, index2);
        } else if ("appendRule" in container) {
          container.appendRule(rule);
        }
      } catch (err) {
        true ? tiny_warning_esm_default(false, "[JSS] " + err.message) : void 0;
        return false;
      }
      return container.cssRules[index2];
    };
    getValidRuleInsertionIndex = function getValidRuleInsertionIndex2(container, index2) {
      var maxIndex = container.cssRules.length;
      if (index2 === void 0 || index2 > maxIndex) {
        return maxIndex;
      }
      return index2;
    };
    createStyle = function createStyle2() {
      var el2 = document.createElement("style");
      el2.textContent = "\n";
      return el2;
    };
    DomRenderer = function() {
      function DomRenderer2(sheet) {
        this.getPropertyValue = getPropertyValue;
        this.setProperty = setProperty;
        this.removeProperty = removeProperty;
        this.setSelector = setSelector;
        this.hasInsertedRules = false;
        this.cssRules = [];
        if (sheet) sheets.add(sheet);
        this.sheet = sheet;
        var _ref = this.sheet ? this.sheet.options : {}, media = _ref.media, meta = _ref.meta, element = _ref.element;
        this.element = element || createStyle();
        this.element.setAttribute("data-jss", "");
        if (media) this.element.setAttribute("media", media);
        if (meta) this.element.setAttribute("data-meta", meta);
        var nonce = getNonce();
        if (nonce) this.element.setAttribute("nonce", nonce);
      }
      var _proto = DomRenderer2.prototype;
      _proto.attach = function attach2() {
        if (this.element.parentNode || !this.sheet) return;
        insertStyle(this.element, this.sheet.options);
        var deployed = Boolean(this.sheet && this.sheet.deployed);
        if (this.hasInsertedRules && deployed) {
          this.hasInsertedRules = false;
          this.deploy();
        }
      };
      _proto.detach = function detach2() {
        if (!this.sheet) return;
        var parentNode = this.element.parentNode;
        if (parentNode) parentNode.removeChild(this.element);
        if (this.sheet.options.link) {
          this.cssRules = [];
          this.element.textContent = "\n";
        }
      };
      _proto.deploy = function deploy() {
        var sheet = this.sheet;
        if (!sheet) return;
        if (sheet.options.link) {
          this.insertRules(sheet.rules);
          return;
        }
        this.element.textContent = "\n" + sheet.toString() + "\n";
      };
      _proto.insertRules = function insertRules(rules, nativeParent) {
        for (var i = 0; i < rules.index.length; i++) {
          this.insertRule(rules.index[i], i, nativeParent);
        }
      };
      _proto.insertRule = function insertRule2(rule, index2, nativeParent) {
        if (nativeParent === void 0) {
          nativeParent = this.element.sheet;
        }
        if (rule.rules) {
          var parent = rule;
          var latestNativeParent = nativeParent;
          if (rule.type === "conditional" || rule.type === "keyframes") {
            var _insertionIndex = getValidRuleInsertionIndex(nativeParent, index2);
            latestNativeParent = _insertRule(nativeParent, parent.toString({
              children: false
            }), _insertionIndex);
            if (latestNativeParent === false) {
              return false;
            }
            this.refCssRule(rule, _insertionIndex, latestNativeParent);
          }
          this.insertRules(parent.rules, latestNativeParent);
          return latestNativeParent;
        }
        var ruleStr = rule.toString();
        if (!ruleStr) return false;
        var insertionIndex = getValidRuleInsertionIndex(nativeParent, index2);
        var nativeRule = _insertRule(nativeParent, ruleStr, insertionIndex);
        if (nativeRule === false) {
          return false;
        }
        this.hasInsertedRules = true;
        this.refCssRule(rule, insertionIndex, nativeRule);
        return nativeRule;
      };
      _proto.refCssRule = function refCssRule(rule, index2, cssRule) {
        rule.renderable = cssRule;
        if (rule.options.parent instanceof StyleSheet) {
          this.cssRules.splice(index2, 0, cssRule);
        }
      };
      _proto.deleteRule = function deleteRule(cssRule) {
        var sheet = this.element.sheet;
        var index2 = this.indexOf(cssRule);
        if (index2 === -1) return false;
        sheet.deleteRule(index2);
        this.cssRules.splice(index2, 1);
        return true;
      };
      _proto.indexOf = function indexOf(cssRule) {
        return this.cssRules.indexOf(cssRule);
      };
      _proto.replaceRule = function replaceRule(cssRule, rule) {
        var index2 = this.indexOf(cssRule);
        if (index2 === -1) return false;
        this.element.sheet.deleteRule(index2);
        this.cssRules.splice(index2, 1);
        return this.insertRule(rule, index2);
      };
      _proto.getRules = function getRules() {
        return this.element.sheet.cssRules;
      };
      return DomRenderer2;
    }();
    instanceCounter = 0;
    Jss = function() {
      function Jss2(options) {
        this.id = instanceCounter++;
        this.version = "10.10.0";
        this.plugins = new PluginsRegistry();
        this.options = {
          id: {
            minify: false
          },
          createGenerateId,
          Renderer: module_default ? DomRenderer : null,
          plugins: []
        };
        this.generateId = createGenerateId({
          minify: false
        });
        for (var i = 0; i < plugins.length; i++) {
          this.plugins.use(plugins[i], {
            queue: "internal"
          });
        }
        this.setup(options);
      }
      var _proto = Jss2.prototype;
      _proto.setup = function setup(options) {
        if (options === void 0) {
          options = {};
        }
        if (options.createGenerateId) {
          this.options.createGenerateId = options.createGenerateId;
        }
        if (options.id) {
          this.options.id = _extends({}, this.options.id, options.id);
        }
        if (options.createGenerateId || options.id) {
          this.generateId = this.options.createGenerateId(this.options.id);
        }
        if (options.insertionPoint != null) this.options.insertionPoint = options.insertionPoint;
        if ("Renderer" in options) {
          this.options.Renderer = options.Renderer;
        }
        if (options.plugins) this.use.apply(this, options.plugins);
        return this;
      };
      _proto.createStyleSheet = function createStyleSheet(styles, options) {
        if (options === void 0) {
          options = {};
        }
        var _options = options, index2 = _options.index;
        if (typeof index2 !== "number") {
          index2 = sheets.index === 0 ? 0 : sheets.index + 1;
        }
        var sheet = new StyleSheet(styles, _extends({}, options, {
          jss: this,
          generateId: options.generateId || this.generateId,
          insertionPoint: this.options.insertionPoint,
          Renderer: this.options.Renderer,
          index: index2
        }));
        this.plugins.onProcessSheet(sheet);
        return sheet;
      };
      _proto.removeStyleSheet = function removeStyleSheet(sheet) {
        sheet.detach();
        sheets.remove(sheet);
        return this;
      };
      _proto.createRule = function createRule$1(name, style, options) {
        if (style === void 0) {
          style = {};
        }
        if (options === void 0) {
          options = {};
        }
        if (typeof name === "object") {
          return this.createRule(void 0, name, style);
        }
        var ruleOptions = _extends({}, options, {
          name,
          jss: this,
          Renderer: this.options.Renderer
        });
        if (!ruleOptions.generateId) ruleOptions.generateId = this.generateId;
        if (!ruleOptions.classes) ruleOptions.classes = {};
        if (!ruleOptions.keyframes) ruleOptions.keyframes = {};
        var rule = createRule(name, style, ruleOptions);
        if (rule) this.plugins.onProcessRule(rule);
        return rule;
      };
      _proto.use = function use() {
        var _this = this;
        for (var _len = arguments.length, plugins3 = new Array(_len), _key = 0; _key < _len; _key++) {
          plugins3[_key] = arguments[_key];
        }
        plugins3.forEach(function(plugin) {
          _this.plugins.use(plugin);
        });
        return this;
      };
      return Jss2;
    }();
    createJss = function createJss2(options) {
      return new Jss(options);
    };
    SheetsManager = function() {
      function SheetsManager2() {
        this.length = 0;
        this.sheets = /* @__PURE__ */ new WeakMap();
      }
      var _proto = SheetsManager2.prototype;
      _proto.get = function get2(key) {
        var entry = this.sheets.get(key);
        return entry && entry.sheet;
      };
      _proto.add = function add(key, sheet) {
        if (this.sheets.has(key)) return;
        this.length++;
        this.sheets.set(key, {
          sheet,
          refs: 0
        });
      };
      _proto.manage = function manage(key) {
        var entry = this.sheets.get(key);
        if (entry) {
          if (entry.refs === 0) {
            entry.sheet.attach();
          }
          entry.refs++;
          return entry.sheet;
        }
        tiny_warning_esm_default(false, "[JSS] SheetsManager: can't find sheet to manage");
        return void 0;
      };
      _proto.unmanage = function unmanage(key) {
        var entry = this.sheets.get(key);
        if (entry) {
          if (entry.refs > 0) {
            entry.refs--;
            if (entry.refs === 0) entry.sheet.detach();
          }
        } else {
          tiny_warning_esm_default(false, "SheetsManager: can't find sheet to unmanage");
        }
      };
      _createClass(SheetsManager2, [{
        key: "size",
        get: function get2() {
          return this.length;
        }
      }]);
      return SheetsManager2;
    }();
    hasCSSTOMSupport = typeof CSS === "object" && CSS != null && "number" in CSS;
    index = createJss();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/chainPropTypes.js
function chainPropTypes(propType1, propType2) {
  if (false) {
    return function() {
      return null;
    };
  }
  return function validate() {
    return propType1.apply(void 0, arguments) || propType2.apply(void 0, arguments);
  };
}
var init_chainPropTypes = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/chainPropTypes.js"() {
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/deepmerge.js
function isPlainObject(item) {
  return item && _typeof2(item) === "object" && item.constructor === Object;
}
function deepmerge(target, source) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    clone: true
  };
  var output = options.clone ? _extends({}, target) : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach(function(key) {
      if (key === "__proto__") {
        return;
      }
      if (isPlainObject(source[key]) && key in target) {
        output[key] = deepmerge(target[key], source[key], options);
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}
var init_deepmerge = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/deepmerge.js"() {
    init_extends();
    init_typeof();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/elementAcceptingRef.js
function isClassComponent(elementType2) {
  var _elementType$prototyp = elementType2.prototype, prototype = _elementType$prototyp === void 0 ? {} : _elementType$prototyp;
  return Boolean(prototype.isReactComponent);
}
function acceptingRef(props, propName, componentName, location, propFullName) {
  var element = props[propName];
  var safePropName = propFullName || propName;
  if (element == null) {
    return null;
  }
  var warningHint;
  var elementType2 = element.type;
  if (typeof elementType2 === "function" && !isClassComponent(elementType2)) {
    warningHint = "Did you accidentally use a plain function component for an element instead?";
  }
  if (warningHint !== void 0) {
    return new Error("Invalid ".concat(location, " `").concat(safePropName, "` supplied to `").concat(componentName, "`. ") + "Expected an element that can hold a ref. ".concat(warningHint, " ") + "For more information see https://mui.com/r/caveat-with-refs-guide");
  }
  return null;
}
var import_prop_types, elementAcceptingRef;
var init_elementAcceptingRef = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/elementAcceptingRef.js"() {
    import_prop_types = __toESM(require_prop_types());
    init_chainPropTypes();
    elementAcceptingRef = chainPropTypes(import_prop_types.default.element, acceptingRef);
    elementAcceptingRef.isRequired = chainPropTypes(import_prop_types.default.element.isRequired, acceptingRef);
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/elementTypeAcceptingRef.js
function isClassComponent2(elementType2) {
  var _elementType$prototyp = elementType2.prototype, prototype = _elementType$prototyp === void 0 ? {} : _elementType$prototyp;
  return Boolean(prototype.isReactComponent);
}
function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
  var propValue = props[propName];
  var safePropName = propFullName || propName;
  if (propValue == null) {
    return null;
  }
  var warningHint;
  if (typeof propValue === "function" && !isClassComponent2(propValue)) {
    warningHint = "Did you accidentally provide a plain function component instead?";
  }
  if (warningHint !== void 0) {
    return new Error("Invalid ".concat(location, " `").concat(safePropName, "` supplied to `").concat(componentName, "`. ") + "Expected an element type that can hold a ref. ".concat(warningHint, " ") + "For more information see https://mui.com/r/caveat-with-refs-guide");
  }
  return null;
}
var PropTypes2, elementTypeAcceptingRef_default;
var init_elementTypeAcceptingRef = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/elementTypeAcceptingRef.js"() {
    PropTypes2 = __toESM(require_prop_types());
    init_chainPropTypes();
    elementTypeAcceptingRef_default = chainPropTypes(PropTypes2.elementType, elementTypeAcceptingRef);
  }
});

// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
var init_defineProperty = __esm({
  "node_modules/@babel/runtime/helpers/esm/defineProperty.js"() {
    init_toPropertyKey();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/exactProp.js
function exactProp(propTypes) {
  if (false) {
    return propTypes;
  }
  return _extends({}, propTypes, _defineProperty({}, specialProperty, function(props) {
    var unsupportedProps = Object.keys(props).filter(function(prop) {
      return !propTypes.hasOwnProperty(prop);
    });
    if (unsupportedProps.length > 0) {
      return new Error("The following props are not supported: ".concat(unsupportedProps.map(function(prop) {
        return "`".concat(prop, "`");
      }).join(", "), ". Please remove them."));
    }
    return null;
  }));
}
var specialProperty;
var init_exactProp = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/exactProp.js"() {
    init_defineProperty();
    init_extends();
    specialProperty = "exact-prop: ​";
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/formatMuiErrorMessage.js
var init_formatMuiErrorMessage = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/formatMuiErrorMessage.js"() {
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/getDisplayName.js
function getFunctionName(fn) {
  var match = "".concat(fn).match(fnNameMatchRegex);
  var name = match && match[1];
  return name || "";
}
function getFunctionComponentName(Component) {
  var fallback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return Component.displayName || Component.name || getFunctionName(Component) || fallback;
}
function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== "" ? "".concat(wrapperName, "(").concat(functionName, ")") : wrapperName);
}
function getDisplayName(Component) {
  if (Component == null) {
    return void 0;
  }
  if (typeof Component === "string") {
    return Component;
  }
  if (typeof Component === "function") {
    return getFunctionComponentName(Component, "Component");
  }
  if (_typeof2(Component) === "object") {
    switch (Component.$$typeof) {
      case import_react_is.ForwardRef:
        return getWrappedName(Component, Component.render, "ForwardRef");
      case import_react_is.Memo:
        return getWrappedName(Component, Component.type, "memo");
      default:
        return void 0;
    }
  }
  return void 0;
}
var import_react_is, fnNameMatchRegex;
var init_getDisplayName = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/getDisplayName.js"() {
    init_typeof();
    import_react_is = __toESM(require_react_is());
    fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/HTMLElementType.js
var init_HTMLElementType = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/HTMLElementType.js"() {
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/ponyfillGlobal.js
var ponyfillGlobal_default;
var init_ponyfillGlobal = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/ponyfillGlobal.js"() {
    ponyfillGlobal_default = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/refType.js
var import_prop_types2, refType;
var init_refType = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/refType.js"() {
    import_prop_types2 = __toESM(require_prop_types());
    refType = import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object]);
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/index.js
var init_esm = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/node_modules/@material-ui/utils/esm/index.js"() {
    init_chainPropTypes();
    init_deepmerge();
    init_elementAcceptingRef();
    init_elementTypeAcceptingRef();
    init_exactProp();
    init_formatMuiErrorMessage();
    init_getDisplayName();
    init_HTMLElementType();
    init_ponyfillGlobal();
    init_refType();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/mergeClasses/mergeClasses.js
function mergeClasses() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var baseClasses = options.baseClasses, newClasses = options.newClasses, Component = options.Component;
  if (!newClasses) {
    return baseClasses;
  }
  var nextClasses = _extends({}, baseClasses);
  if (true) {
    if (typeof newClasses === "string") {
      console.error(["Material-UI: The value `".concat(newClasses, "` ") + "provided to the classes prop of ".concat(getDisplayName(Component), " is incorrect."), "You might want to use the className prop instead."].join("\n"));
      return baseClasses;
    }
  }
  Object.keys(newClasses).forEach(function(key) {
    if (true) {
      if (!baseClasses[key] && newClasses[key]) {
        console.error(["Material-UI: The key `".concat(key, "` ") + "provided to the classes prop is not implemented in ".concat(getDisplayName(Component), "."), "You can only override one of the following: ".concat(Object.keys(baseClasses).join(","), ".")].join("\n"));
      }
      if (newClasses[key] && typeof newClasses[key] !== "string") {
        console.error(["Material-UI: The key `".concat(key, "` ") + "provided to the classes prop is not valid for ".concat(getDisplayName(Component), "."), "You need to provide a non empty string instead of: ".concat(newClasses[key], ".")].join("\n"));
      }
    }
    if (newClasses[key]) {
      nextClasses[key] = "".concat(baseClasses[key], " ").concat(newClasses[key]);
    }
  });
  return nextClasses;
}
var init_mergeClasses = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/mergeClasses/mergeClasses.js"() {
    init_extends();
    init_esm();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/mergeClasses/index.js
var init_mergeClasses2 = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/mergeClasses/index.js"() {
    init_mergeClasses();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/makeStyles/multiKeyStore.js
var multiKeyStore, multiKeyStore_default;
var init_multiKeyStore = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/makeStyles/multiKeyStore.js"() {
    multiKeyStore = {
      set: function set(cache3, key1, key2, value) {
        var subCache = cache3.get(key1);
        if (!subCache) {
          subCache = /* @__PURE__ */ new Map();
          cache3.set(key1, subCache);
        }
        subCache.set(key2, value);
      },
      get: function get(cache3, key1, key2) {
        var subCache = cache3.get(key1);
        return subCache ? subCache.get(key2) : void 0;
      },
      delete: function _delete(cache3, key1, key2) {
        var subCache = cache3.get(key1);
        subCache.delete(key2);
      }
    };
    multiKeyStore_default = multiKeyStore;
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/useTheme/ThemeContext.js
var import_react, ThemeContext, ThemeContext_default;
var init_ThemeContext = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/useTheme/ThemeContext.js"() {
    import_react = __toESM(require_react());
    ThemeContext = import_react.default.createContext(null);
    if (true) {
      ThemeContext.displayName = "ThemeContext";
    }
    ThemeContext_default = ThemeContext;
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/useTheme/useTheme.js
function useTheme() {
  var theme = import_react2.default.useContext(ThemeContext_default);
  if (true) {
    import_react2.default.useDebugValue(theme);
  }
  return theme;
}
var import_react2;
var init_useTheme = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/useTheme/useTheme.js"() {
    import_react2 = __toESM(require_react());
    init_ThemeContext();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/useTheme/index.js
var init_useTheme2 = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/useTheme/index.js"() {
    init_useTheme();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/ThemeProvider/nested.js
var hasSymbol, nested_default;
var init_nested = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/ThemeProvider/nested.js"() {
    hasSymbol = typeof Symbol === "function" && Symbol.for;
    nested_default = hasSymbol ? Symbol.for("mui.nested") : "__THEME_NESTED__";
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/createGenerateClassName/createGenerateClassName.js
function createGenerateClassName() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _options$disableGloba = options.disableGlobal, disableGlobal = _options$disableGloba === void 0 ? false : _options$disableGloba, _options$productionPr = options.productionPrefix, productionPrefix = _options$productionPr === void 0 ? "jss" : _options$productionPr, _options$seed = options.seed, seed = _options$seed === void 0 ? "" : _options$seed;
  var seedPrefix = seed === "" ? "" : "".concat(seed, "-");
  var ruleCounter = 0;
  var getNextCounterId = function getNextCounterId2() {
    ruleCounter += 1;
    if (true) {
      if (ruleCounter >= 1e10) {
        console.warn(["Material-UI: You might have a memory leak.", "The ruleCounter is not supposed to grow that much."].join(""));
      }
    }
    return ruleCounter;
  };
  return function(rule, styleSheet) {
    var name = styleSheet.options.name;
    if (name && name.indexOf("Mui") === 0 && !styleSheet.options.link && !disableGlobal) {
      if (pseudoClasses.indexOf(rule.key) !== -1) {
        return "Mui-".concat(rule.key);
      }
      var prefix2 = "".concat(seedPrefix).concat(name, "-").concat(rule.key);
      if (!styleSheet.options.theme[nested_default] || seed !== "") {
        return prefix2;
      }
      return "".concat(prefix2, "-").concat(getNextCounterId());
    }
    if (false) {
      return "".concat(seedPrefix).concat(productionPrefix).concat(getNextCounterId());
    }
    var suffix = "".concat(rule.key, "-").concat(getNextCounterId());
    if (styleSheet.options.classNamePrefix) {
      return "".concat(seedPrefix).concat(styleSheet.options.classNamePrefix, "-").concat(suffix);
    }
    return "".concat(seedPrefix).concat(suffix);
  };
}
var pseudoClasses;
var init_createGenerateClassName = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/createGenerateClassName/createGenerateClassName.js"() {
    init_nested();
    pseudoClasses = ["checked", "disabled", "error", "focused", "focusVisible", "required", "expanded", "selected"];
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/createGenerateClassName/index.js
var init_createGenerateClassName2 = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/createGenerateClassName/index.js"() {
    init_createGenerateClassName();
  }
});

// node_modules/jss-plugin-rule-value-function/dist/jss-plugin-rule-value-function.esm.js
var now, fnValuesNs, fnRuleNs, functionPlugin, jss_plugin_rule_value_function_esm_default;
var init_jss_plugin_rule_value_function_esm = __esm({
  "node_modules/jss-plugin-rule-value-function/dist/jss-plugin-rule-value-function.esm.js"() {
    init_tiny_warning_esm();
    init_jss_esm();
    now = Date.now();
    fnValuesNs = "fnValues" + now;
    fnRuleNs = "fnStyle" + ++now;
    functionPlugin = function functionPlugin2() {
      return {
        onCreateRule: function onCreateRule8(name, decl, options) {
          if (typeof decl !== "function") return null;
          var rule = createRule(name, {}, options);
          rule[fnRuleNs] = decl;
          return rule;
        },
        onProcessStyle: function onProcessStyle2(style, rule) {
          if (fnValuesNs in rule || fnRuleNs in rule) return style;
          var fnValues = {};
          for (var prop in style) {
            var value = style[prop];
            if (typeof value !== "function") continue;
            delete style[prop];
            fnValues[prop] = value;
          }
          rule[fnValuesNs] = fnValues;
          return style;
        },
        onUpdate: function onUpdate(data, rule, sheet, options) {
          var styleRule = rule;
          var fnRule = styleRule[fnRuleNs];
          if (fnRule) {
            styleRule.style = fnRule(data) || {};
            if (true) {
              for (var prop in styleRule.style) {
                if (typeof styleRule.style[prop] === "function") {
                  true ? tiny_warning_esm_default(false, "[JSS] Function values inside function rules are not supported.") : void 0;
                  break;
                }
              }
            }
          }
          var fnValues = styleRule[fnValuesNs];
          if (fnValues) {
            for (var _prop in fnValues) {
              styleRule.prop(_prop, fnValues[_prop](data), options);
            }
          }
        }
      };
    };
    jss_plugin_rule_value_function_esm_default = functionPlugin;
  }
});

// node_modules/jss-plugin-global/dist/jss-plugin-global.esm.js
function addScope(selector, scope) {
  var parts = selector.split(separatorRegExp);
  var scoped = "";
  for (var i = 0; i < parts.length; i++) {
    scoped += scope + " " + parts[i].trim();
    if (parts[i + 1]) scoped += ", ";
  }
  return scoped;
}
function handleNestedGlobalContainerRule(rule, sheet) {
  var options = rule.options, style = rule.style;
  var rules = style ? style[at] : null;
  if (!rules) return;
  for (var name in rules) {
    sheet.addRule(name, rules[name], _extends({}, options, {
      selector: addScope(name, rule.selector)
    }));
  }
  delete style[at];
}
function handlePrefixedGlobalRule(rule, sheet) {
  var options = rule.options, style = rule.style;
  for (var prop in style) {
    if (prop[0] !== "@" || prop.substr(0, at.length) !== at) continue;
    var selector = addScope(prop.substr(at.length), rule.selector);
    sheet.addRule(selector, style[prop], _extends({}, options, {
      selector
    }));
    delete style[prop];
  }
}
function jssGlobal() {
  function onCreateRule8(name, styles, options) {
    if (!name) return null;
    if (name === at) {
      return new GlobalContainerRule(name, styles, options);
    }
    if (name[0] === "@" && name.substr(0, atPrefix.length) === atPrefix) {
      return new GlobalPrefixedRule(name, styles, options);
    }
    var parent = options.parent;
    if (parent) {
      if (parent.type === "global" || parent.options.parent && parent.options.parent.type === "global") {
        options.scoped = false;
      }
    }
    if (!options.selector && options.scoped === false) {
      options.selector = name;
    }
    return null;
  }
  function onProcessRule(rule, sheet) {
    if (rule.type !== "style" || !sheet) return;
    handleNestedGlobalContainerRule(rule, sheet);
    handlePrefixedGlobalRule(rule, sheet);
  }
  return {
    onCreateRule: onCreateRule8,
    onProcessRule
  };
}
var at, atPrefix, GlobalContainerRule, GlobalPrefixedRule, separatorRegExp, jss_plugin_global_esm_default;
var init_jss_plugin_global_esm = __esm({
  "node_modules/jss-plugin-global/dist/jss-plugin-global.esm.js"() {
    init_extends();
    init_jss_esm();
    at = "@global";
    atPrefix = "@global ";
    GlobalContainerRule = function() {
      function GlobalContainerRule2(key, styles, options) {
        this.type = "global";
        this.at = at;
        this.isProcessed = false;
        this.key = key;
        this.options = options;
        this.rules = new RuleList(_extends({}, options, {
          parent: this
        }));
        for (var selector in styles) {
          this.rules.add(selector, styles[selector]);
        }
        this.rules.process();
      }
      var _proto = GlobalContainerRule2.prototype;
      _proto.getRule = function getRule(name) {
        return this.rules.get(name);
      };
      _proto.addRule = function addRule(name, style, options) {
        var rule = this.rules.add(name, style, options);
        if (rule) this.options.jss.plugins.onProcessRule(rule);
        return rule;
      };
      _proto.replaceRule = function replaceRule(name, style, options) {
        var newRule = this.rules.replace(name, style, options);
        if (newRule) this.options.jss.plugins.onProcessRule(newRule);
        return newRule;
      };
      _proto.indexOf = function indexOf(rule) {
        return this.rules.indexOf(rule);
      };
      _proto.toString = function toString(options) {
        return this.rules.toString(options);
      };
      return GlobalContainerRule2;
    }();
    GlobalPrefixedRule = function() {
      function GlobalPrefixedRule2(key, style, options) {
        this.type = "global";
        this.at = at;
        this.isProcessed = false;
        this.key = key;
        this.options = options;
        var selector = key.substr(atPrefix.length);
        this.rule = options.jss.createRule(selector, style, _extends({}, options, {
          parent: this
        }));
      }
      var _proto2 = GlobalPrefixedRule2.prototype;
      _proto2.toString = function toString(options) {
        return this.rule ? this.rule.toString(options) : "";
      };
      return GlobalPrefixedRule2;
    }();
    separatorRegExp = /\s*,\s*/g;
    jss_plugin_global_esm_default = jssGlobal;
  }
});

// node_modules/jss-plugin-nested/dist/jss-plugin-nested.esm.js
function jssNested() {
  function getReplaceRef(container, sheet) {
    return function(match, key) {
      var rule = container.getRule(key) || sheet && sheet.getRule(key);
      if (rule) {
        return rule.selector;
      }
      true ? tiny_warning_esm_default(false, '[JSS] Could not find the referenced rule "' + key + '" in "' + (container.options.meta || container.toString()) + '".') : void 0;
      return key;
    };
  }
  function replaceParentRefs(nestedProp, parentProp) {
    var parentSelectors = parentProp.split(separatorRegExp2);
    var nestedSelectors = nestedProp.split(separatorRegExp2);
    var result = "";
    for (var i = 0; i < parentSelectors.length; i++) {
      var parent = parentSelectors[i];
      for (var j = 0; j < nestedSelectors.length; j++) {
        var nested = nestedSelectors[j];
        if (result) result += ", ";
        result += nested.indexOf("&") !== -1 ? nested.replace(parentRegExp, parent) : parent + " " + nested;
      }
    }
    return result;
  }
  function getOptions(rule, container, prevOptions) {
    if (prevOptions) return _extends({}, prevOptions, {
      index: prevOptions.index + 1
    });
    var nestingLevel = rule.options.nestingLevel;
    nestingLevel = nestingLevel === void 0 ? 1 : nestingLevel + 1;
    var options = _extends({}, rule.options, {
      nestingLevel,
      index: container.indexOf(rule) + 1
      // We don't need the parent name to be set options for chlid.
    });
    delete options.name;
    return options;
  }
  function onProcessStyle2(style, rule, sheet) {
    if (rule.type !== "style") return style;
    var styleRule = rule;
    var container = styleRule.options.parent;
    var options;
    var replaceRef3;
    for (var prop in style) {
      var isNested = prop.indexOf("&") !== -1;
      var isNestedConditional = prop[0] === "@";
      if (!isNested && !isNestedConditional) continue;
      options = getOptions(styleRule, container, options);
      if (isNested) {
        var selector = replaceParentRefs(prop, styleRule.selector);
        if (!replaceRef3) replaceRef3 = getReplaceRef(container, sheet);
        selector = selector.replace(refRegExp2, replaceRef3);
        var name = styleRule.key + "-" + prop;
        if ("replaceRule" in container) {
          container.replaceRule(name, style[prop], _extends({}, options, {
            selector
          }));
        } else {
          container.addRule(name, style[prop], _extends({}, options, {
            selector
          }));
        }
      } else if (isNestedConditional) {
        container.addRule(prop, {}, options).addRule(styleRule.key, style[prop], {
          selector: styleRule.selector
        });
      }
      delete style[prop];
    }
    return style;
  }
  return {
    onProcessStyle: onProcessStyle2
  };
}
var separatorRegExp2, parentRegExp, refRegExp2, jss_plugin_nested_esm_default;
var init_jss_plugin_nested_esm = __esm({
  "node_modules/jss-plugin-nested/dist/jss-plugin-nested.esm.js"() {
    init_extends();
    init_tiny_warning_esm();
    separatorRegExp2 = /\s*,\s*/g;
    parentRegExp = /&/g;
    refRegExp2 = /\$([\w-]+)/g;
    jss_plugin_nested_esm_default = jssNested;
  }
});

// node_modules/hyphenate-style-name/index.js
function toHyphenLower(match) {
  return "-" + match.toLowerCase();
}
function hyphenateStyleName(name) {
  if (cache.hasOwnProperty(name)) {
    return cache[name];
  }
  var hName = name.replace(uppercasePattern, toHyphenLower);
  return cache[name] = msPattern.test(hName) ? "-" + hName : hName;
}
var uppercasePattern, msPattern, cache, hyphenate_style_name_default;
var init_hyphenate_style_name = __esm({
  "node_modules/hyphenate-style-name/index.js"() {
    uppercasePattern = /[A-Z]/g;
    msPattern = /^ms-/;
    cache = {};
    hyphenate_style_name_default = hyphenateStyleName;
  }
});

// node_modules/jss-plugin-camel-case/dist/jss-plugin-camel-case.esm.js
function convertCase(style) {
  var converted = {};
  for (var prop in style) {
    var key = prop.indexOf("--") === 0 ? prop : hyphenate_style_name_default(prop);
    converted[key] = style[prop];
  }
  if (style.fallbacks) {
    if (Array.isArray(style.fallbacks)) converted.fallbacks = style.fallbacks.map(convertCase);
    else converted.fallbacks = convertCase(style.fallbacks);
  }
  return converted;
}
function camelCase() {
  function onProcessStyle2(style) {
    if (Array.isArray(style)) {
      for (var index2 = 0; index2 < style.length; index2++) {
        style[index2] = convertCase(style[index2]);
      }
      return style;
    }
    return convertCase(style);
  }
  function onChangeValue2(value, prop, rule) {
    if (prop.indexOf("--") === 0) {
      return value;
    }
    var hyphenatedProp = hyphenate_style_name_default(prop);
    if (prop === hyphenatedProp) return value;
    rule.prop(hyphenatedProp, value);
    return null;
  }
  return {
    onProcessStyle: onProcessStyle2,
    onChangeValue: onChangeValue2
  };
}
var jss_plugin_camel_case_esm_default;
var init_jss_plugin_camel_case_esm = __esm({
  "node_modules/jss-plugin-camel-case/dist/jss-plugin-camel-case.esm.js"() {
    init_hyphenate_style_name();
    jss_plugin_camel_case_esm_default = camelCase;
  }
});

// node_modules/jss-plugin-default-unit/dist/jss-plugin-default-unit.esm.js
function addCamelCasedVersion(obj) {
  var regExp2 = /(-[a-z])/g;
  var replace = function replace2(str) {
    return str[1].toUpperCase();
  };
  var newObj = {};
  for (var key in obj) {
    newObj[key] = obj[key];
    newObj[key.replace(regExp2, replace)] = obj[key];
  }
  return newObj;
}
function iterate(prop, value, options) {
  if (value == null) return value;
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      value[i] = iterate(prop, value[i], options);
    }
  } else if (typeof value === "object") {
    if (prop === "fallbacks") {
      for (var innerProp in value) {
        value[innerProp] = iterate(innerProp, value[innerProp], options);
      }
    } else {
      for (var _innerProp in value) {
        value[_innerProp] = iterate(prop + "-" + _innerProp, value[_innerProp], options);
      }
    }
  } else if (typeof value === "number" && isNaN(value) === false) {
    var unit = options[prop] || units[prop];
    if (unit && !(value === 0 && unit === px)) {
      return typeof unit === "function" ? unit(value).toString() : "" + value + unit;
    }
    return value.toString();
  }
  return value;
}
function defaultUnit(options) {
  if (options === void 0) {
    options = {};
  }
  var camelCasedOptions = addCamelCasedVersion(options);
  function onProcessStyle2(style, rule) {
    if (rule.type !== "style") return style;
    for (var prop in style) {
      style[prop] = iterate(prop, style[prop], camelCasedOptions);
    }
    return style;
  }
  function onChangeValue2(value, prop) {
    return iterate(prop, value, camelCasedOptions);
  }
  return {
    onProcessStyle: onProcessStyle2,
    onChangeValue: onChangeValue2
  };
}
var px, ms, percent, defaultUnits, units, jss_plugin_default_unit_esm_default;
var init_jss_plugin_default_unit_esm = __esm({
  "node_modules/jss-plugin-default-unit/dist/jss-plugin-default-unit.esm.js"() {
    init_jss_esm();
    px = hasCSSTOMSupport && CSS ? CSS.px : "px";
    ms = hasCSSTOMSupport && CSS ? CSS.ms : "ms";
    percent = hasCSSTOMSupport && CSS ? CSS.percent : "%";
    defaultUnits = {
      // Animation properties
      "animation-delay": ms,
      "animation-duration": ms,
      // Background properties
      "background-position": px,
      "background-position-x": px,
      "background-position-y": px,
      "background-size": px,
      // Border Properties
      border: px,
      "border-bottom": px,
      "border-bottom-left-radius": px,
      "border-bottom-right-radius": px,
      "border-bottom-width": px,
      "border-left": px,
      "border-left-width": px,
      "border-radius": px,
      "border-right": px,
      "border-right-width": px,
      "border-top": px,
      "border-top-left-radius": px,
      "border-top-right-radius": px,
      "border-top-width": px,
      "border-width": px,
      "border-block": px,
      "border-block-end": px,
      "border-block-end-width": px,
      "border-block-start": px,
      "border-block-start-width": px,
      "border-block-width": px,
      "border-inline": px,
      "border-inline-end": px,
      "border-inline-end-width": px,
      "border-inline-start": px,
      "border-inline-start-width": px,
      "border-inline-width": px,
      "border-start-start-radius": px,
      "border-start-end-radius": px,
      "border-end-start-radius": px,
      "border-end-end-radius": px,
      // Margin properties
      margin: px,
      "margin-bottom": px,
      "margin-left": px,
      "margin-right": px,
      "margin-top": px,
      "margin-block": px,
      "margin-block-end": px,
      "margin-block-start": px,
      "margin-inline": px,
      "margin-inline-end": px,
      "margin-inline-start": px,
      // Padding properties
      padding: px,
      "padding-bottom": px,
      "padding-left": px,
      "padding-right": px,
      "padding-top": px,
      "padding-block": px,
      "padding-block-end": px,
      "padding-block-start": px,
      "padding-inline": px,
      "padding-inline-end": px,
      "padding-inline-start": px,
      // Mask properties
      "mask-position-x": px,
      "mask-position-y": px,
      "mask-size": px,
      // Width and height properties
      height: px,
      width: px,
      "min-height": px,
      "max-height": px,
      "min-width": px,
      "max-width": px,
      // Position properties
      bottom: px,
      left: px,
      top: px,
      right: px,
      inset: px,
      "inset-block": px,
      "inset-block-end": px,
      "inset-block-start": px,
      "inset-inline": px,
      "inset-inline-end": px,
      "inset-inline-start": px,
      // Shadow properties
      "box-shadow": px,
      "text-shadow": px,
      // Column properties
      "column-gap": px,
      "column-rule": px,
      "column-rule-width": px,
      "column-width": px,
      // Font and text properties
      "font-size": px,
      "font-size-delta": px,
      "letter-spacing": px,
      "text-decoration-thickness": px,
      "text-indent": px,
      "text-stroke": px,
      "text-stroke-width": px,
      "word-spacing": px,
      // Motion properties
      motion: px,
      "motion-offset": px,
      // Outline properties
      outline: px,
      "outline-offset": px,
      "outline-width": px,
      // Perspective properties
      perspective: px,
      "perspective-origin-x": percent,
      "perspective-origin-y": percent,
      // Transform properties
      "transform-origin": percent,
      "transform-origin-x": percent,
      "transform-origin-y": percent,
      "transform-origin-z": percent,
      // Transition properties
      "transition-delay": ms,
      "transition-duration": ms,
      // Alignment properties
      "vertical-align": px,
      "flex-basis": px,
      // Some random properties
      "shape-margin": px,
      size: px,
      gap: px,
      // Grid properties
      grid: px,
      "grid-gap": px,
      "row-gap": px,
      "grid-row-gap": px,
      "grid-column-gap": px,
      "grid-template-rows": px,
      "grid-template-columns": px,
      "grid-auto-rows": px,
      "grid-auto-columns": px,
      // Not existing properties.
      // Used to avoid issues with jss-plugin-expand integration.
      "box-shadow-x": px,
      "box-shadow-y": px,
      "box-shadow-blur": px,
      "box-shadow-spread": px,
      "font-line-height": px,
      "text-shadow-x": px,
      "text-shadow-y": px,
      "text-shadow-blur": px
    };
    units = addCamelCasedVersion(defaultUnits);
    jss_plugin_default_unit_esm_default = defaultUnit;
  }
});

// node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
var init_arrayLikeToArray = __esm({
  "node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js"() {
  }
});

// node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
var init_arrayWithoutHoles = __esm({
  "node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js"() {
    init_arrayLikeToArray();
  }
});

// node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
var init_iterableToArray = __esm({
  "node_modules/@babel/runtime/helpers/esm/iterableToArray.js"() {
  }
});

// node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
var init_unsupportedIterableToArray = __esm({
  "node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js"() {
    init_arrayLikeToArray();
  }
});

// node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var init_nonIterableSpread = __esm({
  "node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js"() {
  }
});

// node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
var init_toConsumableArray = __esm({
  "node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"() {
    init_arrayWithoutHoles();
    init_iterableToArray();
    init_unsupportedIterableToArray();
    init_nonIterableSpread();
  }
});

// node_modules/css-vendor/dist/css-vendor.esm.js
function supportedKeyframes(key) {
  if (key[1] === "-") return key;
  if (prefix.js === "ms") return key;
  return "@" + prefix.css + "keyframes" + key.substr(10);
}
function toUpper(match, c) {
  return c ? c.toUpperCase() : "";
}
function camelize(str) {
  return str.replace(regExp, toUpper);
}
function pascalize(str) {
  return camelize("-" + str);
}
function supportedProperty17(prop, options) {
  if (options === void 0) {
    options = {};
  }
  if (!el) return prop;
  if (cache2[prop] != null) {
    return cache2[prop];
  }
  if (prop === "transition" || prop === "transform") {
    options[prop] = prop in el.style;
  }
  for (var i = 0; i < propertyDetectors.length; i++) {
    cache2[prop] = propertyDetectors[i](prop, el.style, options);
    if (cache2[prop]) break;
  }
  try {
    el.style[prop] = "";
  } catch (err) {
    return false;
  }
  return cache2[prop];
}
function prefixTransitionCallback(match, p1, p2) {
  if (p1 === "var") return "var";
  if (p1 === "all") return "all";
  if (p2 === "all") return ", all";
  var prefixedValue = p1 ? supportedProperty17(p1) : ", " + supportedProperty17(p2);
  if (!prefixedValue) return p1 || p2;
  return prefixedValue;
}
function supportedValue(property, value) {
  var prefixedValue = value;
  if (!el$1 || property === "content") return value;
  if (typeof prefixedValue !== "string" || !isNaN(parseInt(prefixedValue, 10))) {
    return prefixedValue;
  }
  var cacheKey = property + prefixedValue;
  if (cache$1[cacheKey] != null) {
    return cache$1[cacheKey];
  }
  try {
    el$1.style[property] = prefixedValue;
  } catch (err) {
    cache$1[cacheKey] = false;
    return false;
  }
  if (transitionProperties[property]) {
    prefixedValue = prefixedValue.replace(transPropsRegExp, prefixTransitionCallback);
  } else if (el$1.style[property] === "") {
    prefixedValue = prefix.css + prefixedValue;
    if (prefixedValue === "-ms-flex") el$1.style[property] = "-ms-flexbox";
    el$1.style[property] = prefixedValue;
    if (el$1.style[property] === "") {
      cache$1[cacheKey] = false;
      return false;
    }
  }
  el$1.style[property] = "";
  cache$1[cacheKey] = prefixedValue;
  return cache$1[cacheKey];
}
var js, css, vendor, browser, isTouch, jsCssMap, _document$createEleme, style, testProp, key, prefix, appearence, colorAdjust, regExp, mask, textOrientation, transform, transition, writingMode, userSelect, breakPropsOld, inlineLogicalOld, unprefixed, prefixed, scrollSnap, overscrollBehavior, propMap, flex2012, propMap$1, propKeys, prefixCss, flex2009, plugins2, propertyDetectors, noPrefill, el, cache2, computed, key$1, cache$1, transitionProperties, transPropsRegExp, el$1;
var init_css_vendor_esm = __esm({
  "node_modules/css-vendor/dist/css-vendor.esm.js"() {
    init_module();
    init_toConsumableArray();
    js = "";
    css = "";
    vendor = "";
    browser = "";
    isTouch = module_default && "ontouchstart" in document.documentElement;
    if (module_default) {
      jsCssMap = {
        Moz: "-moz-",
        ms: "-ms-",
        O: "-o-",
        Webkit: "-webkit-"
      };
      _document$createEleme = document.createElement("p"), style = _document$createEleme.style;
      testProp = "Transform";
      for (key in jsCssMap) {
        if (key + testProp in style) {
          js = key;
          css = jsCssMap[key];
          break;
        }
      }
      if (js === "Webkit" && "msHyphens" in style) {
        js = "ms";
        css = jsCssMap.ms;
        browser = "edge";
      }
      if (js === "Webkit" && "-apple-trailing-word" in style) {
        vendor = "apple";
      }
    }
    prefix = {
      js,
      css,
      vendor,
      browser,
      isTouch
    };
    appearence = {
      noPrefill: ["appearance"],
      supportedProperty: function supportedProperty(prop) {
        if (prop !== "appearance") return false;
        if (prefix.js === "ms") return "-webkit-" + prop;
        return prefix.css + prop;
      }
    };
    colorAdjust = {
      noPrefill: ["color-adjust"],
      supportedProperty: function supportedProperty2(prop) {
        if (prop !== "color-adjust") return false;
        if (prefix.js === "Webkit") return prefix.css + "print-" + prop;
        return prop;
      }
    };
    regExp = /[-\s]+(.)?/g;
    mask = {
      noPrefill: ["mask"],
      supportedProperty: function supportedProperty3(prop, style) {
        if (!/^mask/.test(prop)) return false;
        if (prefix.js === "Webkit") {
          var longhand = "mask-image";
          if (camelize(longhand) in style) {
            return prop;
          }
          if (prefix.js + pascalize(longhand) in style) {
            return prefix.css + prop;
          }
        }
        return prop;
      }
    };
    textOrientation = {
      noPrefill: ["text-orientation"],
      supportedProperty: function supportedProperty4(prop) {
        if (prop !== "text-orientation") return false;
        if (prefix.vendor === "apple" && !prefix.isTouch) {
          return prefix.css + prop;
        }
        return prop;
      }
    };
    transform = {
      noPrefill: ["transform"],
      supportedProperty: function supportedProperty5(prop, style, options) {
        if (prop !== "transform") return false;
        if (options.transform) {
          return prop;
        }
        return prefix.css + prop;
      }
    };
    transition = {
      noPrefill: ["transition"],
      supportedProperty: function supportedProperty6(prop, style, options) {
        if (prop !== "transition") return false;
        if (options.transition) {
          return prop;
        }
        return prefix.css + prop;
      }
    };
    writingMode = {
      noPrefill: ["writing-mode"],
      supportedProperty: function supportedProperty7(prop) {
        if (prop !== "writing-mode") return false;
        if (prefix.js === "Webkit" || prefix.js === "ms" && prefix.browser !== "edge") {
          return prefix.css + prop;
        }
        return prop;
      }
    };
    userSelect = {
      noPrefill: ["user-select"],
      supportedProperty: function supportedProperty8(prop) {
        if (prop !== "user-select") return false;
        if (prefix.js === "Moz" || prefix.js === "ms" || prefix.vendor === "apple") {
          return prefix.css + prop;
        }
        return prop;
      }
    };
    breakPropsOld = {
      supportedProperty: function supportedProperty9(prop, style) {
        if (!/^break-/.test(prop)) return false;
        if (prefix.js === "Webkit") {
          var jsProp = "WebkitColumn" + pascalize(prop);
          return jsProp in style ? prefix.css + "column-" + prop : false;
        }
        if (prefix.js === "Moz") {
          var _jsProp = "page" + pascalize(prop);
          return _jsProp in style ? "page-" + prop : false;
        }
        return false;
      }
    };
    inlineLogicalOld = {
      supportedProperty: function supportedProperty10(prop, style) {
        if (!/^(border|margin|padding)-inline/.test(prop)) return false;
        if (prefix.js === "Moz") return prop;
        var newProp = prop.replace("-inline", "");
        return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false;
      }
    };
    unprefixed = {
      supportedProperty: function supportedProperty11(prop, style) {
        return camelize(prop) in style ? prop : false;
      }
    };
    prefixed = {
      supportedProperty: function supportedProperty12(prop, style) {
        var pascalized = pascalize(prop);
        if (prop[0] === "-") return prop;
        if (prop[0] === "-" && prop[1] === "-") return prop;
        if (prefix.js + pascalized in style) return prefix.css + prop;
        if (prefix.js !== "Webkit" && "Webkit" + pascalized in style) return "-webkit-" + prop;
        return false;
      }
    };
    scrollSnap = {
      supportedProperty: function supportedProperty13(prop) {
        if (prop.substring(0, 11) !== "scroll-snap") return false;
        if (prefix.js === "ms") {
          return "" + prefix.css + prop;
        }
        return prop;
      }
    };
    overscrollBehavior = {
      supportedProperty: function supportedProperty14(prop) {
        if (prop !== "overscroll-behavior") return false;
        if (prefix.js === "ms") {
          return prefix.css + "scroll-chaining";
        }
        return prop;
      }
    };
    propMap = {
      "flex-grow": "flex-positive",
      "flex-shrink": "flex-negative",
      "flex-basis": "flex-preferred-size",
      "justify-content": "flex-pack",
      order: "flex-order",
      "align-items": "flex-align",
      "align-content": "flex-line-pack"
      // 'align-self' is handled by 'align-self' plugin.
    };
    flex2012 = {
      supportedProperty: function supportedProperty15(prop, style) {
        var newProp = propMap[prop];
        if (!newProp) return false;
        return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false;
      }
    };
    propMap$1 = {
      flex: "box-flex",
      "flex-grow": "box-flex",
      "flex-direction": ["box-orient", "box-direction"],
      order: "box-ordinal-group",
      "align-items": "box-align",
      "flex-flow": ["box-orient", "box-direction"],
      "justify-content": "box-pack"
    };
    propKeys = Object.keys(propMap$1);
    prefixCss = function prefixCss2(p) {
      return prefix.css + p;
    };
    flex2009 = {
      supportedProperty: function supportedProperty16(prop, style, _ref) {
        var multiple = _ref.multiple;
        if (propKeys.indexOf(prop) > -1) {
          var newProp = propMap$1[prop];
          if (!Array.isArray(newProp)) {
            return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false;
          }
          if (!multiple) return false;
          for (var i = 0; i < newProp.length; i++) {
            if (!(prefix.js + pascalize(newProp[0]) in style)) {
              return false;
            }
          }
          return newProp.map(prefixCss);
        }
        return false;
      }
    };
    plugins2 = [appearence, colorAdjust, mask, textOrientation, transform, transition, writingMode, userSelect, breakPropsOld, inlineLogicalOld, unprefixed, prefixed, scrollSnap, overscrollBehavior, flex2012, flex2009];
    propertyDetectors = plugins2.filter(function(p) {
      return p.supportedProperty;
    }).map(function(p) {
      return p.supportedProperty;
    });
    noPrefill = plugins2.filter(function(p) {
      return p.noPrefill;
    }).reduce(function(a, p) {
      a.push.apply(a, _toConsumableArray(p.noPrefill));
      return a;
    }, []);
    cache2 = {};
    if (module_default) {
      el = document.createElement("p");
      computed = window.getComputedStyle(document.documentElement, "");
      for (key$1 in computed) {
        if (!isNaN(key$1)) cache2[computed[key$1]] = computed[key$1];
      }
      noPrefill.forEach(function(x) {
        return delete cache2[x];
      });
    }
    cache$1 = {};
    transitionProperties = {
      transition: 1,
      "transition-property": 1,
      "-webkit-transition": 1,
      "-webkit-transition-property": 1
    };
    transPropsRegExp = /(^\s*[\w-]+)|, (\s*[\w-]+)(?![^()]*\))/g;
    if (module_default) el$1 = document.createElement("p");
  }
});

// node_modules/jss-plugin-vendor-prefixer/dist/jss-plugin-vendor-prefixer.esm.js
function jssVendorPrefixer() {
  function onProcessRule(rule) {
    if (rule.type === "keyframes") {
      var atRule = rule;
      atRule.at = supportedKeyframes(atRule.at);
    }
  }
  function prefixStyle(style) {
    for (var prop in style) {
      var value = style[prop];
      if (prop === "fallbacks" && Array.isArray(value)) {
        style[prop] = value.map(prefixStyle);
        continue;
      }
      var changeProp = false;
      var supportedProp = supportedProperty17(prop);
      if (supportedProp && supportedProp !== prop) changeProp = true;
      var changeValue = false;
      var supportedValue$1 = supportedValue(supportedProp, toCssValue(value));
      if (supportedValue$1 && supportedValue$1 !== value) changeValue = true;
      if (changeProp || changeValue) {
        if (changeProp) delete style[prop];
        style[supportedProp || prop] = supportedValue$1 || value;
      }
    }
    return style;
  }
  function onProcessStyle2(style, rule) {
    if (rule.type !== "style") return style;
    return prefixStyle(style);
  }
  function onChangeValue2(value, prop) {
    return supportedValue(prop, toCssValue(value)) || value;
  }
  return {
    onProcessRule,
    onProcessStyle: onProcessStyle2,
    onChangeValue: onChangeValue2
  };
}
var jss_plugin_vendor_prefixer_esm_default;
var init_jss_plugin_vendor_prefixer_esm = __esm({
  "node_modules/jss-plugin-vendor-prefixer/dist/jss-plugin-vendor-prefixer.esm.js"() {
    init_css_vendor_esm();
    init_jss_esm();
    jss_plugin_vendor_prefixer_esm_default = jssVendorPrefixer;
  }
});

// node_modules/jss-plugin-props-sort/dist/jss-plugin-props-sort.esm.js
function jssPropsSort() {
  var sort = function sort2(prop0, prop1) {
    if (prop0.length === prop1.length) {
      return prop0 > prop1 ? 1 : -1;
    }
    return prop0.length - prop1.length;
  };
  return {
    onProcessStyle: function onProcessStyle2(style, rule) {
      if (rule.type !== "style") return style;
      var newStyle = {};
      var props = Object.keys(style).sort(sort);
      for (var i = 0; i < props.length; i++) {
        newStyle[props[i]] = style[props[i]];
      }
      return newStyle;
    }
  };
}
var jss_plugin_props_sort_esm_default;
var init_jss_plugin_props_sort_esm = __esm({
  "node_modules/jss-plugin-props-sort/dist/jss-plugin-props-sort.esm.js"() {
    jss_plugin_props_sort_esm_default = jssPropsSort;
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/jssPreset/jssPreset.js
function jssPreset() {
  return {
    plugins: [
      jss_plugin_rule_value_function_esm_default(),
      jss_plugin_global_esm_default(),
      jss_plugin_nested_esm_default(),
      jss_plugin_camel_case_esm_default(),
      jss_plugin_default_unit_esm_default(),
      // Disable the vendor prefixer server-side, it does nothing.
      // This way, we can get a performance boost.
      // In the documentation, we are using `autoprefixer` to solve this problem.
      typeof window === "undefined" ? null : jss_plugin_vendor_prefixer_esm_default(),
      jss_plugin_props_sort_esm_default()
    ]
  };
}
var init_jssPreset = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/jssPreset/jssPreset.js"() {
    init_jss_plugin_rule_value_function_esm();
    init_jss_plugin_global_esm();
    init_jss_plugin_nested_esm();
    init_jss_plugin_camel_case_esm();
    init_jss_plugin_default_unit_esm();
    init_jss_plugin_vendor_prefixer_esm();
    init_jss_plugin_props_sort_esm();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/jssPreset/index.js
var init_jssPreset2 = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/jssPreset/index.js"() {
    init_jssPreset();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/StylesProvider/StylesProvider.js
function StylesProvider(props) {
  var children = props.children, _props$injectFirst = props.injectFirst, injectFirst = _props$injectFirst === void 0 ? false : _props$injectFirst, _props$disableGenerat = props.disableGeneration, disableGeneration = _props$disableGenerat === void 0 ? false : _props$disableGenerat, localOptions = _objectWithoutProperties(props, ["children", "injectFirst", "disableGeneration"]);
  var outerOptions = import_react3.default.useContext(StylesContext);
  var context = _extends({}, outerOptions, {
    disableGeneration
  }, localOptions);
  if (true) {
    if (typeof window === "undefined" && !context.sheetsManager) {
      console.error("Material-UI: You need to use the ServerStyleSheets API when rendering on the server.");
    }
  }
  if (true) {
    if (context.jss.options.insertionPoint && injectFirst) {
      console.error("Material-UI: You cannot use a custom insertionPoint and <StylesContext injectFirst> at the same time.");
    }
  }
  if (true) {
    if (injectFirst && localOptions.jss) {
      console.error("Material-UI: You cannot use the jss and injectFirst props at the same time.");
    }
  }
  if (!context.jss.options.insertionPoint && injectFirst && typeof window !== "undefined") {
    if (!injectFirstNode) {
      var head = document.head;
      injectFirstNode = document.createComment("mui-inject-first");
      head.insertBefore(injectFirstNode, head.firstChild);
    }
    context.jss = createJss({
      plugins: jssPreset().plugins,
      insertionPoint: injectFirstNode
    });
  }
  return import_react3.default.createElement(StylesContext.Provider, {
    value: context
  }, children);
}
var import_react3, import_prop_types3, jss, generateClassName, sheetsManager, defaultOptions, StylesContext, injectFirstNode;
var init_StylesProvider = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/StylesProvider/StylesProvider.js"() {
    init_extends();
    init_objectWithoutProperties();
    import_react3 = __toESM(require_react());
    import_prop_types3 = __toESM(require_prop_types());
    init_esm();
    init_createGenerateClassName2();
    init_jss_esm();
    init_jssPreset2();
    jss = createJss(jssPreset());
    generateClassName = createGenerateClassName();
    sheetsManager = /* @__PURE__ */ new Map();
    defaultOptions = {
      disableGeneration: false,
      generateClassName,
      jss,
      sheetsCache: null,
      sheetsManager,
      sheetsRegistry: null
    };
    StylesContext = import_react3.default.createContext(defaultOptions);
    if (true) {
      StylesContext.displayName = "StylesContext";
    }
    true ? StylesProvider.propTypes = {
      /**
       * Your component tree.
       */
      children: import_prop_types3.default.node.isRequired,
      /**
       * You can disable the generation of the styles with this option.
       * It can be useful when traversing the React tree outside of the HTML
       * rendering step on the server.
       * Let's say you are using react-apollo to extract all
       * the queries made by the interface server-side - you can significantly speed up the traversal with this prop.
       */
      disableGeneration: import_prop_types3.default.bool,
      /**
       * JSS's class name generator.
       */
      generateClassName: import_prop_types3.default.func,
      /**
       * By default, the styles are injected last in the <head> element of the page.
       * As a result, they gain more specificity than any other style sheet.
       * If you want to override Material-UI's styles, set this prop.
       */
      injectFirst: import_prop_types3.default.bool,
      /**
       * JSS's instance.
       */
      jss: import_prop_types3.default.object,
      /**
       * @ignore
       */
      serverGenerateClassName: import_prop_types3.default.func,
      /**
       * @ignore
       *
       * Beta feature.
       *
       * Cache for the sheets.
       */
      sheetsCache: import_prop_types3.default.object,
      /**
       * @ignore
       *
       * The sheetsManager is used to deduplicate style sheet injection in the page.
       * It's deduplicating using the (theme, styles) couple.
       * On the server, you should provide a new instance for each request.
       */
      sheetsManager: import_prop_types3.default.object,
      /**
       * @ignore
       *
       * Collect the sheets.
       */
      sheetsRegistry: import_prop_types3.default.object
    } : void 0;
    if (true) {
      true ? StylesProvider.propTypes = exactProp(StylesProvider.propTypes) : void 0;
    }
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/StylesProvider/index.js
var init_StylesProvider2 = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/StylesProvider/index.js"() {
    init_StylesProvider();
    init_StylesProvider();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/makeStyles/indexCounter.js
function increment() {
  indexCounter += 1;
  if (true) {
    if (indexCounter >= 0) {
      console.warn(["Material-UI: You might have a memory leak.", "The indexCounter is not supposed to grow that much."].join("\n"));
    }
  }
  return indexCounter;
}
var indexCounter;
var init_indexCounter = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/makeStyles/indexCounter.js"() {
    indexCounter = -1e9;
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/getStylesCreator/noopTheme.js
var noopTheme, noopTheme_default;
var init_noopTheme = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/getStylesCreator/noopTheme.js"() {
    noopTheme = {};
    noopTheme_default = noopTheme;
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/getStylesCreator/getStylesCreator.js
function getStylesCreator(stylesOrCreator) {
  var themingEnabled = typeof stylesOrCreator === "function";
  if (true) {
    if (_typeof2(stylesOrCreator) !== "object" && !themingEnabled) {
      console.error(["Material-UI: The `styles` argument provided is invalid.", "You need to provide a function generating the styles or a styles object."].join("\n"));
    }
  }
  return {
    create: function create(theme, name) {
      var styles;
      try {
        styles = themingEnabled ? stylesOrCreator(theme) : stylesOrCreator;
      } catch (err) {
        if (true) {
          if (themingEnabled === true && theme === noopTheme_default) {
            console.error(["Material-UI: The `styles` argument provided is invalid.", "You are providing a function without a theme in the context.", "One of the parent elements needs to use a ThemeProvider."].join("\n"));
          }
        }
        throw err;
      }
      if (!name || !theme.overrides || !theme.overrides[name]) {
        return styles;
      }
      var overrides = theme.overrides[name];
      var stylesWithOverrides = _extends({}, styles);
      Object.keys(overrides).forEach(function(key) {
        if (true) {
          if (!stylesWithOverrides[key]) {
            console.warn(["Material-UI: You are trying to override a style that does not exist.", "Fix the `".concat(key, "` key of `theme.overrides.").concat(name, "`.")].join("\n"));
          }
        }
        stylesWithOverrides[key] = deepmerge(stylesWithOverrides[key], overrides[key]);
      });
      return stylesWithOverrides;
    },
    options: {}
  };
}
var init_getStylesCreator = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/getStylesCreator/getStylesCreator.js"() {
    init_extends();
    init_typeof();
    init_esm();
    init_noopTheme();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/getStylesCreator/index.js
var init_getStylesCreator2 = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/getStylesCreator/index.js"() {
    init_getStylesCreator();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/makeStyles/makeStyles.js
function getClasses(_ref, classes, Component) {
  var state = _ref.state, stylesOptions = _ref.stylesOptions;
  if (stylesOptions.disableGeneration) {
    return classes || {};
  }
  if (!state.cacheClasses) {
    state.cacheClasses = {
      // Cache for the finalized classes value.
      value: null,
      // Cache for the last used classes prop pointer.
      lastProp: null,
      // Cache for the last used rendered classes pointer.
      lastJSS: {}
    };
  }
  var generate = false;
  if (state.classes !== state.cacheClasses.lastJSS) {
    state.cacheClasses.lastJSS = state.classes;
    generate = true;
  }
  if (classes !== state.cacheClasses.lastProp) {
    state.cacheClasses.lastProp = classes;
    generate = true;
  }
  if (generate) {
    state.cacheClasses.value = mergeClasses({
      baseClasses: state.cacheClasses.lastJSS,
      newClasses: classes,
      Component
    });
  }
  return state.cacheClasses.value;
}
function attach(_ref2, props) {
  var state = _ref2.state, theme = _ref2.theme, stylesOptions = _ref2.stylesOptions, stylesCreator = _ref2.stylesCreator, name = _ref2.name;
  if (stylesOptions.disableGeneration) {
    return;
  }
  var sheetManager = multiKeyStore_default.get(stylesOptions.sheetsManager, stylesCreator, theme);
  if (!sheetManager) {
    sheetManager = {
      refs: 0,
      staticSheet: null,
      dynamicStyles: null
    };
    multiKeyStore_default.set(stylesOptions.sheetsManager, stylesCreator, theme, sheetManager);
  }
  var options = _extends({}, stylesCreator.options, stylesOptions, {
    theme,
    flip: typeof stylesOptions.flip === "boolean" ? stylesOptions.flip : theme.direction === "rtl"
  });
  options.generateId = options.serverGenerateClassName || options.generateClassName;
  var sheetsRegistry = stylesOptions.sheetsRegistry;
  if (sheetManager.refs === 0) {
    var staticSheet;
    if (stylesOptions.sheetsCache) {
      staticSheet = multiKeyStore_default.get(stylesOptions.sheetsCache, stylesCreator, theme);
    }
    var styles = stylesCreator.create(theme, name);
    if (!staticSheet) {
      staticSheet = stylesOptions.jss.createStyleSheet(styles, _extends({
        link: false
      }, options));
      staticSheet.attach();
      if (stylesOptions.sheetsCache) {
        multiKeyStore_default.set(stylesOptions.sheetsCache, stylesCreator, theme, staticSheet);
      }
    }
    if (sheetsRegistry) {
      sheetsRegistry.add(staticSheet);
    }
    sheetManager.staticSheet = staticSheet;
    sheetManager.dynamicStyles = getDynamicStyles(styles);
  }
  if (sheetManager.dynamicStyles) {
    var dynamicSheet = stylesOptions.jss.createStyleSheet(sheetManager.dynamicStyles, _extends({
      link: true
    }, options));
    dynamicSheet.update(props);
    dynamicSheet.attach();
    state.dynamicSheet = dynamicSheet;
    state.classes = mergeClasses({
      baseClasses: sheetManager.staticSheet.classes,
      newClasses: dynamicSheet.classes
    });
    if (sheetsRegistry) {
      sheetsRegistry.add(dynamicSheet);
    }
  } else {
    state.classes = sheetManager.staticSheet.classes;
  }
  sheetManager.refs += 1;
}
function update(_ref3, props) {
  var state = _ref3.state;
  if (state.dynamicSheet) {
    state.dynamicSheet.update(props);
  }
}
function detach(_ref4) {
  var state = _ref4.state, theme = _ref4.theme, stylesOptions = _ref4.stylesOptions, stylesCreator = _ref4.stylesCreator;
  if (stylesOptions.disableGeneration) {
    return;
  }
  var sheetManager = multiKeyStore_default.get(stylesOptions.sheetsManager, stylesCreator, theme);
  sheetManager.refs -= 1;
  var sheetsRegistry = stylesOptions.sheetsRegistry;
  if (sheetManager.refs === 0) {
    multiKeyStore_default.delete(stylesOptions.sheetsManager, stylesCreator, theme);
    stylesOptions.jss.removeStyleSheet(sheetManager.staticSheet);
    if (sheetsRegistry) {
      sheetsRegistry.remove(sheetManager.staticSheet);
    }
  }
  if (state.dynamicSheet) {
    stylesOptions.jss.removeStyleSheet(state.dynamicSheet);
    if (sheetsRegistry) {
      sheetsRegistry.remove(state.dynamicSheet);
    }
  }
}
function useSynchronousEffect(func, values) {
  var key = import_react4.default.useRef([]);
  var output;
  var currentKey = import_react4.default.useMemo(function() {
    return {};
  }, values);
  if (key.current !== currentKey) {
    key.current = currentKey;
    output = func();
  }
  import_react4.default.useEffect(
    function() {
      return function() {
        if (output) {
          output();
        }
      };
    },
    [currentKey]
    // eslint-disable-line react-hooks/exhaustive-deps
  );
}
function makeStyles(stylesOrCreator) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var name = options.name, classNamePrefixOption = options.classNamePrefix, Component = options.Component, _options$defaultTheme = options.defaultTheme, defaultTheme = _options$defaultTheme === void 0 ? noopTheme_default : _options$defaultTheme, stylesOptions2 = _objectWithoutProperties(options, ["name", "classNamePrefix", "Component", "defaultTheme"]);
  var stylesCreator = getStylesCreator(stylesOrCreator);
  var classNamePrefix = name || classNamePrefixOption || "makeStyles";
  stylesCreator.options = {
    index: increment(),
    name,
    meta: classNamePrefix,
    classNamePrefix
  };
  var useStyles = function useStyles2() {
    var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var theme = useTheme() || defaultTheme;
    var stylesOptions = _extends({}, import_react4.default.useContext(StylesContext), stylesOptions2);
    var instance = import_react4.default.useRef();
    var shouldUpdate = import_react4.default.useRef();
    useSynchronousEffect(function() {
      var current = {
        name,
        state: {},
        stylesCreator,
        stylesOptions,
        theme
      };
      attach(current, props);
      shouldUpdate.current = false;
      instance.current = current;
      return function() {
        detach(current);
      };
    }, [theme, stylesCreator]);
    import_react4.default.useEffect(function() {
      if (shouldUpdate.current) {
        update(instance.current, props);
      }
      shouldUpdate.current = true;
    });
    var classes = getClasses(instance.current, props.classes, Component);
    if (true) {
      import_react4.default.useDebugValue(classes);
    }
    return classes;
  };
  return useStyles;
}
var import_react4;
var init_makeStyles = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/makeStyles/makeStyles.js"() {
    init_objectWithoutProperties();
    init_extends();
    import_react4 = __toESM(require_react());
    init_jss_esm();
    init_mergeClasses2();
    init_multiKeyStore();
    init_useTheme2();
    init_StylesProvider2();
    init_indexCounter();
    init_getStylesCreator2();
    init_noopTheme();
  }
});

// node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/makeStyles/index.js
var makeStyles_exports = {};
__export(makeStyles_exports, {
  default: () => makeStyles
});
var init_makeStyles2 = __esm({
  "node_modules/react-confetti-explosion/node_modules/@material-ui/styles/esm/makeStyles/index.js"() {
    init_makeStyles();
  }
});

// node_modules/lodash/toInteger.js
var require_toInteger = __commonJS({
  "node_modules/lodash/toInteger.js"(exports, module) {
    var toFinite = require_toFinite();
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    module.exports = toInteger;
  }
});

// node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "node_modules/lodash/_arrayMap.js"(exports, module) {
    function arrayMap(array, iteratee) {
      var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index2 < length) {
        result[index2] = iteratee(array[index2], index2, array);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js"(exports, module) {
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "node_modules/lodash/_baseToString.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// node_modules/lodash/toString.js
var require_toString = __commonJS({
  "node_modules/lodash/toString.js"(exports, module) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// node_modules/lodash/_createRound.js
var require_createRound = __commonJS({
  "node_modules/lodash/_createRound.js"(exports, module) {
    var root = require_root();
    var toInteger = require_toInteger();
    var toNumber = require_toNumber();
    var toString = require_toString();
    var nativeIsFinite = root.isFinite;
    var nativeMin = Math.min;
    function createRound(methodName) {
      var func = Math[methodName];
      return function(number, precision) {
        number = toNumber(number);
        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
        if (precision && nativeIsFinite(number)) {
          var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
          pair = (toString(value) + "e").split("e");
          return +(pair[0] + "e" + (+pair[1] - precision));
        }
        return func(number);
      };
    }
    module.exports = createRound;
  }
});

// node_modules/lodash/round.js
var require_round = __commonJS({
  "node_modules/lodash/round.js"(exports, module) {
    var createRound = require_createRound();
    var round = createRound("round");
    module.exports = round;
  }
});

// node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "node_modules/lodash/_listCacheClear.js"(exports, module) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "node_modules/lodash/_assocIndexOf.js"(exports, module) {
    var eq = require_eq();
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "node_modules/lodash/_listCacheDelete.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index2 == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index2, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "node_modules/lodash/_listCacheGet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    module.exports = listCacheGet;
  }
});

// node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "node_modules/lodash/_listCacheHas.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "node_modules/lodash/_listCacheSet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index2][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "node_modules/lodash/_ListCache.js"(exports, module) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "node_modules/lodash/_stackClear.js"(exports, module) {
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module.exports = stackClear;
  }
});

// node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "node_modules/lodash/_stackDelete.js"(exports, module) {
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    module.exports = stackDelete;
  }
});

// node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "node_modules/lodash/_stackGet.js"(exports, module) {
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module.exports = stackGet;
  }
});

// node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "node_modules/lodash/_stackHas.js"(exports, module) {
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module.exports = stackHas;
  }
});

// node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js"(exports, module) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js"(exports, module) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js"(exports, module) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js"(exports, module) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js"(exports, module) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js"(exports, module) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "node_modules/lodash/_Map.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Map2 = getNative(root, "Map");
    module.exports = Map2;
  }
});

// node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "node_modules/lodash/_nativeCreate.js"(exports, module) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "node_modules/lodash/_hashClear.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "node_modules/lodash/_hashDelete.js"(exports, module) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "node_modules/lodash/_hashGet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "node_modules/lodash/_hashHas.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "node_modules/lodash/_hashSet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "node_modules/lodash/_Hash.js"(exports, module) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "node_modules/lodash/_mapCacheClear.js"(exports, module) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "node_modules/lodash/_isKeyable.js"(exports, module) {
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "node_modules/lodash/_getMapData.js"(exports, module) {
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "node_modules/lodash/_mapCacheGet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "node_modules/lodash/_mapCacheHas.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "node_modules/lodash/_mapCacheSet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "node_modules/lodash/_MapCache.js"(exports, module) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "node_modules/lodash/_stackSet.js"(exports, module) {
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    module.exports = stackSet;
  }
});

// node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "node_modules/lodash/_Stack.js"(exports, module) {
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  }
});

// node_modules/lodash/_setCacheAdd.js
var require_setCacheAdd = __commonJS({
  "node_modules/lodash/_setCacheAdd.js"(exports, module) {
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    module.exports = setCacheAdd;
  }
});

// node_modules/lodash/_setCacheHas.js
var require_setCacheHas = __commonJS({
  "node_modules/lodash/_setCacheHas.js"(exports, module) {
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    module.exports = setCacheHas;
  }
});

// node_modules/lodash/_SetCache.js
var require_SetCache = __commonJS({
  "node_modules/lodash/_SetCache.js"(exports, module) {
    var MapCache = require_MapCache();
    var setCacheAdd = require_setCacheAdd();
    var setCacheHas = require_setCacheHas();
    function SetCache(values) {
      var index2 = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index2 < length) {
        this.add(values[index2]);
      }
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    module.exports = SetCache;
  }
});

// node_modules/lodash/_arraySome.js
var require_arraySome = __commonJS({
  "node_modules/lodash/_arraySome.js"(exports, module) {
    function arraySome(array, predicate) {
      var index2 = -1, length = array == null ? 0 : array.length;
      while (++index2 < length) {
        if (predicate(array[index2], index2, array)) {
          return true;
        }
      }
      return false;
    }
    module.exports = arraySome;
  }
});

// node_modules/lodash/_cacheHas.js
var require_cacheHas = __commonJS({
  "node_modules/lodash/_cacheHas.js"(exports, module) {
    function cacheHas(cache3, key) {
      return cache3.has(key);
    }
    module.exports = cacheHas;
  }
});

// node_modules/lodash/_equalArrays.js
var require_equalArrays = __commonJS({
  "node_modules/lodash/_equalArrays.js"(exports, module) {
    var SetCache = require_SetCache();
    var arraySome = require_arraySome();
    var cacheHas = require_cacheHas();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var arrStacked = stack.get(array);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array;
      }
      var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index2 < arrLength) {
        var arrValue = array[index2], othValue = other[index2];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    module.exports = equalArrays;
  }
});

// node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "node_modules/lodash/_Uint8Array.js"(exports, module) {
    var root = require_root();
    var Uint8Array = root.Uint8Array;
    module.exports = Uint8Array;
  }
});

// node_modules/lodash/_mapToArray.js
var require_mapToArray = __commonJS({
  "node_modules/lodash/_mapToArray.js"(exports, module) {
    function mapToArray(map) {
      var index2 = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index2] = [key, value];
      });
      return result;
    }
    module.exports = mapToArray;
  }
});

// node_modules/lodash/_setToArray.js
var require_setToArray = __commonJS({
  "node_modules/lodash/_setToArray.js"(exports, module) {
    function setToArray(set2) {
      var index2 = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index2] = value;
      });
      return result;
    }
    module.exports = setToArray;
  }
});

// node_modules/lodash/_equalByTag.js
var require_equalByTag = __commonJS({
  "node_modules/lodash/_equalByTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var Uint8Array = require_Uint8Array();
    var eq = require_eq();
    var equalArrays = require_equalArrays();
    var mapToArray = require_mapToArray();
    var setToArray = require_setToArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    module.exports = equalByTag;
  }
});

// node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "node_modules/lodash/_arrayPush.js"(exports, module) {
    function arrayPush(array, values) {
      var index2 = -1, length = values.length, offset = array.length;
      while (++index2 < length) {
        array[offset + index2] = values[index2];
      }
      return array;
    }
    module.exports = arrayPush;
  }
});

// node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isArray = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module.exports = baseGetAllKeys;
  }
});

// node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "node_modules/lodash/_arrayFilter.js"(exports, module) {
    function arrayFilter(array, predicate) {
      var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index2 < length) {
        var value = array[index2];
        if (predicate(value, index2, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    module.exports = arrayFilter;
  }
});

// node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "node_modules/lodash/stubArray.js"(exports, module) {
    function stubArray() {
      return [];
    }
    module.exports = stubArray;
  }
});

// node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "node_modules/lodash/_getSymbols.js"(exports, module) {
    var arrayFilter = require_arrayFilter();
    var stubArray = require_stubArray();
    var objectProto = Object.prototype;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    module.exports = getSymbols;
  }
});

// node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "node_modules/lodash/_baseTimes.js"(exports, module) {
    function baseTimes(n, iteratee) {
      var index2 = -1, result = Array(n);
      while (++index2 < n) {
        result[index2] = iteratee(index2);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});

// node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "node_modules/lodash/_baseIsArguments.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/lodash/isArguments.js"(exports, module) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(/* @__PURE__ */ function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "node_modules/lodash/stubFalse.js"(exports, module) {
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  }
});

// node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "node_modules/lodash/isBuffer.js"(exports, module) {
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  }
});

// node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module.exports = baseIsTypedArray;
  }
});

// node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "node_modules/lodash/_baseUnary.js"(exports, module) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

// node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "node_modules/lodash/_nodeUtil.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    module.exports = nodeUtil;
  }
});

// node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "node_modules/lodash/isTypedArray.js"(exports, module) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray;
  }
});

// node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});

// node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "node_modules/lodash/_isPrototype.js"(exports, module) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  }
});

// node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "node_modules/lodash/_overArg.js"(exports, module) {
    function overArg(func, transform2) {
      return function(arg) {
        return func(transform2(arg));
      };
    }
    module.exports = overArg;
  }
});

// node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "node_modules/lodash/_nativeKeys.js"(exports, module) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  }
});

// node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "node_modules/lodash/_baseKeys.js"(exports, module) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  }
});

// node_modules/lodash/keys.js
var require_keys = __commonJS({
  "node_modules/lodash/keys.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  }
});

// node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "node_modules/lodash/_getAllKeys.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbols = require_getSymbols();
    var keys = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    module.exports = getAllKeys;
  }
});

// node_modules/lodash/_equalObjects.js
var require_equalObjects = __commonJS({
  "node_modules/lodash/_equalObjects.js"(exports, module) {
    var getAllKeys = require_getAllKeys();
    var COMPARE_PARTIAL_FLAG = 1;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index2 = objLength;
      while (index2--) {
        var key = objProps[index2];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index2 < objLength) {
        key = objProps[index2];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    module.exports = equalObjects;
  }
});

// node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "node_modules/lodash/_DataView.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var DataView = getNative(root, "DataView");
    module.exports = DataView;
  }
});

// node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "node_modules/lodash/_Promise.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Promise2 = getNative(root, "Promise");
    module.exports = Promise2;
  }
});

// node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "node_modules/lodash/_Set.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Set = getNative(root, "Set");
    module.exports = Set;
  }
});

// node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "node_modules/lodash/_WeakMap.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var WeakMap2 = getNative(root, "WeakMap");
    module.exports = WeakMap2;
  }
});

// node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "node_modules/lodash/_getTag.js"(exports, module) {
    var DataView = require_DataView();
    var Map2 = require_Map();
    var Promise2 = require_Promise();
    var Set = require_Set();
    var WeakMap2 = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set);
    var weakMapCtorString = toSource(WeakMap2);
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module.exports = getTag;
  }
});

// node_modules/lodash/_baseIsEqualDeep.js
var require_baseIsEqualDeep = __commonJS({
  "node_modules/lodash/_baseIsEqualDeep.js"(exports, module) {
    var Stack = require_Stack();
    var equalArrays = require_equalArrays();
    var equalByTag = require_equalByTag();
    var equalObjects = require_equalObjects();
    var getTag = require_getTag();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isTypedArray = require_isTypedArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var objectTag = "[object Object]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    module.exports = baseIsEqualDeep;
  }
});

// node_modules/lodash/_baseIsEqual.js
var require_baseIsEqual = __commonJS({
  "node_modules/lodash/_baseIsEqual.js"(exports, module) {
    var baseIsEqualDeep = require_baseIsEqualDeep();
    var isObjectLike = require_isObjectLike();
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    module.exports = baseIsEqual;
  }
});

// node_modules/lodash/isEqual.js
var require_isEqual = __commonJS({
  "node_modules/lodash/isEqual.js"(exports, module) {
    var baseIsEqual = require_baseIsEqual();
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }
    module.exports = isEqual;
  }
});

// node_modules/react-confetti-explosion/lib/utils.js
var require_utils = __commonJS({
  "node_modules/react-confetti-explosion/lib/utils.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shouldBeCircle = exports.rotationTransforms = exports.coinFlip = exports.rotate = exports.mapRange = void 0;
    var isEqual_1 = __importDefault(require_isEqual());
    exports.mapRange = function(value, x1, y1, x2, y2) {
      return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
    };
    exports.rotate = function(degree, amount) {
      var result = degree + amount;
      return result > 360 ? result - 360 : result;
    };
    exports.coinFlip = function() {
      return Math.random() > 0.5;
    };
    var zAxisRotation = [0, 0, 1];
    exports.rotationTransforms = [
      // dual axis rotations (a bit more realistic)
      [1, 1, 0],
      [1, 0, 1],
      [0, 1, 1],
      // single axis rotations (a bit dumber)
      [1, 0, 0],
      [0, 1, 0],
      zAxisRotation
    ];
    exports.shouldBeCircle = function(rotationIndex) {
      return !isEqual_1.default(exports.rotationTransforms[rotationIndex], zAxisRotation) && exports.coinFlip();
    };
  }
});

// node_modules/react-confetti-explosion/lib/styles.js
var require_styles = __commonJS({
  "node_modules/react-confetti-explosion/lib/styles.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var makeStyles_1 = __importDefault((init_makeStyles2(), __toCommonJS(makeStyles_exports)));
    var round_1 = __importDefault(require_round());
    var utils_1 = require_utils();
    var ROTATION_SPEED_MIN = 200;
    var ROTATION_SPEED_MAX = 800;
    var CRAZY_PARTICLES_FREQUENCY = 0.1;
    var CRAZY_PARTICLE_CRAZINESS = 0.3;
    var BEZIER_MEDIAN = 0.5;
    var rotationKeyframes = utils_1.rotationTransforms.reduce(function(acc, xyz, i) {
      var _a;
      return __assign(__assign({}, acc), (_a = {}, _a["@keyframes rotation-" + i] = {
        to: {
          transform: "rotate3d(" + xyz.join() + ", 360deg)"
        }
      }, _a));
    }, {});
    var confettiKeyframes = function(degrees, height, width) {
      var xLandingPoints = degrees.reduce(function(acc, degree, i) {
        var _a;
        var landingPoint = utils_1.mapRange(Math.abs(utils_1.rotate(degree, 90) - 180), 0, 180, -width / 2, width / 2);
        return __assign(__assign({}, acc), (_a = {}, _a["@keyframes x-axis-" + i] = {
          to: {
            transform: "translateX(" + landingPoint + "px)"
          }
        }, _a));
      }, {});
      return __assign({ "@keyframes y-axis": {
        to: {
          transform: "translateY(" + height + "px)"
        }
      } }, xLandingPoints);
    };
    var confettoStyle = function(particle, duration, force, size, i) {
      var _a;
      var rotation = Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN;
      var rotationIndex = Math.round(Math.random() * (utils_1.rotationTransforms.length - 1));
      var durationChaos = duration - Math.round(Math.random() * 1e3);
      var shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
      var isCircle = utils_1.shouldBeCircle(rotationIndex);
      var x1 = shouldBeCrazy ? round_1.default(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
      var x2 = x1 * -1;
      var x3 = x1;
      var x4 = round_1.default(Math.abs(utils_1.mapRange(Math.abs(utils_1.rotate(particle.degree, 90) - 180), 0, 180, -1, 1)), 4);
      var y1 = round_1.default(Math.random() * BEZIER_MEDIAN, 4);
      var y2 = round_1.default(Math.random() * force * (utils_1.coinFlip() ? 1 : -1), 4);
      var y3 = BEZIER_MEDIAN;
      var y4 = round_1.default(Math.max(utils_1.mapRange(Math.abs(particle.degree - 180), 0, 180, force, -force), 0), 4);
      return _a = {}, _a["&#confetti-particle-" + i] = {
        animation: "$x-axis-" + i + " " + durationChaos + "ms forwards cubic-bezier(" + x1 + ", " + x2 + ", " + x3 + ", " + x4 + ")",
        "& > div": {
          width: isCircle ? size : Math.round(Math.random() * 4) + size / 2,
          height: isCircle ? size : Math.round(Math.random() * 2) + size,
          animation: "$y-axis " + durationChaos + "ms forwards cubic-bezier(" + y1 + ", " + y2 + ", " + y3 + ", " + y4 + ")",
          "&:after": __assign({ backgroundColor: particle.color, animation: "$rotation-" + rotationIndex + " " + rotation + "ms infinite linear" }, isCircle ? { borderRadius: "50%" } : {})
        }
      }, _a;
    };
    var useStyles = function(_a) {
      var particles = _a.particles, duration = _a.duration, height = _a.height, width = _a.width, force = _a.force, particleSize = _a.particleSize;
      return makeStyles_1.default(function() {
        var confettiStyles = particles.reduce(function(acc, particle, i) {
          return __assign(__assign({}, acc), confettoStyle(particle, duration, force, particleSize, i));
        }, {});
        return __assign(__assign(__assign({}, rotationKeyframes), confettiKeyframes(particles.map(function(particle) {
          return particle.degree;
        }), height, width)), { container: {
          width: 0,
          height: 0,
          position: "relative",
          overflow: "visible",
          zIndex: 1200
        }, particle: __assign(__assign({}, confettiStyles), { "& > div": {
          position: "absolute",
          left: 0,
          top: 0,
          "&:after": {
            content: "''",
            display: "block",
            width: "100%",
            height: "100%"
          }
        } }) });
      }, { name: "ConfettiExplosion" });
    };
    exports.default = useStyles;
  }
});

// node_modules/react-confetti-explosion/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-confetti-explosion/lib/index.js"(exports) {
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var React5 = __importStar(require_react());
    var range_1 = __importDefault(require_range());
    var styles_1 = __importDefault(require_styles());
    var FORCE = 0.5;
    var SIZE = 12;
    var FLOOR_HEIGHT = 800;
    var FLOOR_WIDTH = 1600;
    var PARTICLE_COUNT = 150;
    var DURATION = 3500;
    var COLORS = ["#FFC700", "#FF0000", "#2E3191", "#41BBC7"];
    var createParticles = function(count, colors) {
      var increment2 = 360 / count;
      return range_1.default(count).map(function(index2) {
        return {
          color: colors[index2 % colors.length],
          degree: increment2 * index2
        };
      });
    };
    function ConfettiExplosion(_a) {
      var _b = _a.particleCount, particleCount = _b === void 0 ? PARTICLE_COUNT : _b, _c = _a.duration, duration = _c === void 0 ? DURATION : _c, _d = _a.colors, colors = _d === void 0 ? COLORS : _d, _e = _a.particleSize, particleSize = _e === void 0 ? SIZE : _e, _f = _a.force, force = _f === void 0 ? FORCE : _f, _g = _a.height, height = _g === void 0 ? FLOOR_HEIGHT : _g, _h = _a.width, width = _h === void 0 ? FLOOR_WIDTH : _h, floorHeight = _a.floorHeight, floorWidth = _a.floorWidth;
      var particles = createParticles(particleCount, colors);
      var classes = styles_1.default({
        particles,
        duration,
        particleSize,
        force,
        width: floorWidth || width,
        height: floorHeight || height
      })();
      return React5.createElement("div", { className: classes.container }, particles.map(function(particle, i) {
        return React5.createElement(
          "div",
          { id: "confetti-particle-" + i, className: classes.particle, key: particle.degree },
          React5.createElement("div", null)
        );
      }));
    }
    exports.default = ConfettiExplosion;
  }
});
export default require_lib();
/*! Bundled license information:

jss/dist/jss.esm.js:
  (**
   * A better abstraction over CSS.
   *
   * @copyright Oleg Isonen (Slobodskoi) / Isonen 2014-present
   * @website https://github.com/cssinjs/jss
   * @license MIT
   *)

@material-ui/utils/esm/index.js:
  (** @license Material-UI v4.11.3
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=react-confetti-explosion.js.map

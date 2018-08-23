import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { Polymer } from '@polymer/polymer/polymer-legacy';
import * as Async from '@polymer/polymer/lib/utils/async.js'
import moment from 'moment/src/moment.js';
import 'jquery/dist/jquery.min.js';

export class BaseElement extends PolymerElement {
  constructor() {
    super();
  }

  $$(selector) {
    return this.shadowRoot.querySelector(selector)
  }
  $$$(selector) {
    return this.shadowRoot.querySelectorAll(selector)
  }

  //get object at path (e.g. object at "data[0].magic")
  _path(object, path) {
    var pathArr = _.toPath(path);
    var o = this._clone(object);
    for (var i=0; i<pathArr.length; i++) {
      if (typeof o === 'undefined') return;
      o = o[pathArr[i]];
    }
    return o;
  }

  _setPath(object, path, value) {
    var pathArr = _.toPath(path);
    var o = object;
    for (var i=0; i<pathArr.length-1; i++) {
      if (typeof o[pathArr[i]] === 'undefined') o[pathArr[i]] = { };
      o = o[pathArr[i]];
    }
    o[pathArr[pathArr.length-1]] = value;
  }

  //move "x.value" to just "x"
  _cleanValues(object) {
    var o = object;
    for (var key in o) {
      if (o.hasOwnProperty(key)) {
        if (key === "value") {
          o = o.value;
          return o;
        }
        else if (_.isObject(o[key])) o[key] = this._cleanValues(o[key]);
      }
    }
    return o;
  }

  _fire(event, detail) {
    this.dispatchEvent(new CustomEvent(event, {detail: detail, bubbles: true, composed: true}));
  }

  _async(f) {
    Async.idlePeriod.run(f);
  }

  _microTask(f) {
    Async.microTask.run(f);
  }

  _showToast(message, type, detail) {
    this.dispatchEvent(new CustomEvent('show-toast', {detail: { text: message, type: type || "", detail: detail || "" }, bubbles: true, composed: true}));
  }

  _showToastError(err) {
    if (typeof err === 'object') {
      this._showToast(err.message || "An unknown error occured", "error", err.detail || "");
    } else if (typeof err === 'string') {
      this._showToast(err, "error");
    } else {
      this._showToast("An unknown error occured", "error", err);
    }
  }

  _clone(a) {
    return JSON.parse(JSON.stringify(a));
  }

  _deepEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  _displayDate(date) {
    return moment(date).format("MMMM DD, YYYY")
  }

  _prettifyDateFromNow(date, removePrefix) {
    if (!date) return "";
    var time = moment(date);
    if (moment().diff(time, 'days') > 0.75) {
      return time.format("MMM D, Y [at] h:mm a");
    } else if (moment().diff(time, 'hours') > 0.75) {
      return time.format("h:mm a");
    } else return time.fromNow(removePrefix);
  }

  _prettifyDateToNow(date, removePrefix) {
    var time = moment(date);
    if (moment().diff(time, 'hours') < -0.75) {
      return time.format("h:mm a");
    } else return time.fromNow(removePrefix);
  }

  _get(url, options) {
    return this._method(url, "GET", undefined, options);
  }

  _put(url, data, options) {
    return this._method(url, "PUT", data, options);
  }

  _post(url, data, options) {
    return this._method(url, "POST", data, options);
  }

  _delete(url, data, options) {
    return this._method(url, "DELETE", data, options);
  }

  _method(url, method, data, options) {
    if (!options) options = { };
    var silent = !!options.silent;
    var auth = !!options.auth;
    var debug = !!options.debug;
    var showDetail = typeof options.detail !== 'undefined' ? options.detail : true;
    var contentType = options.contentType || 'application/json; charset=utf-8';
    var responseType = options.responseType || "json";
    var redirectOn401 = typeof options.redirectOn401 !== 'undefined' ? options.redirectOn401 : true;
    var redirectOn303 = typeof options.redirectOn303 !== 'undefined' ? options.redirectOn303 : true;
    var forceRespondWithText = !!options.forceRespondWithText;

    var self = this;
    return new Promise((resolve, reject) => {
      var req = {
        url: API_URL + url,
        contentType: contentType,
        method: method,
        dataType: responseType,
        success: (data) => {
          if (debug) console.log(data);
          resolve(data);
        },
        error: (xhr, textStatus) => {
          var result;

          if (forceRespondWithText) {
            result = xhr.responseText
          } else {
            result = xhr.responseJSON || (xhr.statusText == "OK" ? "An error occured" : "") || (xhr.statusText != "error" ? xhr.statusText : "") || "An error occured";
          }

          if (xhr.status === 501) //NOT IMPLEMENTED
          {
            self._showToast("Method not implemented", "error", `${method} ${url} is not yet implemented`);
            resolve(result);
            return;
          } else if (xhr.status === 502 || xhr.status === 504) {
            reject({ message: "Lost connection to Dynamo - refresh the page and try again", detail: xhr.statusText })
            return;
          } else if (xhr.status === 401 && redirectOn401) {
            window.localStorage.setItem("loggedOut", 1)
            window.location = "/login";
            return;
          } else if (xhr.status === 303 && redirectOn303) {
            if (window.location.pathname !== "/updating") {
              window.location = "/updating";
              return;
            } else {
              reject(result);
              return;
            }
          }

          if (debug) console.log(xhr.responseJSON, xhr.statusText, textStatus);
          var message = result.message || result || "An error occured";
          var detail = (xhr.responseJSON ? (xhr.responseJSON.detail || xhr.statusText || "") : (xhr.responseText || xhr.statusText || ""));
          if (detail.length > 0) detail = `Error at ${method} ${url} on ${moment().format("MMMM DD, YYYY HH:MM:SS Z")}: ` + detail;
          if (!showDetail) detail = "";
          if (!silent) self._showToast(message, "error", detail);
          reject(result);
        }
      };
      if (data) req.data = JSON.stringify(data);
      if (auth) {
        // req.xhrFields = { withCredentials: true };
        // req.crossDomain = true;
      }
      jQuery.ajax(req);
    });
  }

  _ajaxPlaceholder(success, data, timeout) {
    return new Promise(function(resolve, reject) {
       setTimeout(() => {
         if (success) resolve(data)
         else reject(data)
       }, typeof timeout === 'number' ? timeout : 3000);
    });
  }

  _validate(obj, val) {
    var errors = { success: true };
    for (var k in val) {
      if (val.hasOwnProperty(k)) {
        var v = val[k];
        if (v.required && (!obj || !obj[k])) {
          //field missing
          errors.success = false;
          errors.message = { type: "Error", text: "One or more fields below have errors. Check the fields and try again.", code: "FIELD_PRE_VALIDATION_ERROR" };
          var name = k.replace("-", "").replace(".", "-"); //data.back -> data-back
          errors[name] = "Field is required";
        }
        else if (v.pattern && (obj && obj[k])) {
          //make sure matches
          var re = new RegExp(v.pattern);
          if (!re.test(String(obj[k]))) {
            errors.success = false;
            errors.message = { type: "Error", text: "One or more fields below have errors. Check the fields and try again.", code: "FIELD_PRE_VALIDATION_ERROR" };
            var name = k.replace("-", "").replace(".", "-"); //data.back -> data-back
            errors[name] = v.errorMessage || "Invalid value for field";
          }
        }
      }
    }
    return errors;
  }

  _removeEmptyFields(_d) {
    var d = this._clone(_d);
    for (var key in d) {
      if (d.hasOwnProperty(key)) {
        if (typeof d[key] === 'boolean' || d[key] == null) continue;
        if (!d[key]) delete d[key];
      }
    }
    return d
  }

  _getAttributeFromEvent(e, prop, startsWith) {
    var result = this._getAttributeRecursively(e.currentTarget, prop, (s) => {
      return s && typeof s === "string" && (startsWith ? s.startsWith(startsWith) : true);
    });

    if (typeof result === 'undefined' || result == null) return null;

    return result.substring(startsWith.length)
  }

  _getAttributeRecursively(_el, prop, pred) {
    var el = _el;
    var data = null;
    pred = pred || ((o) => { return true });
    while (this._defined(el) && !this._defined(data)) {
      if (!!el.getAttribute) data = el.getAttribute(prop)
      if (this._defined(data) && !pred(data)) data = null;
      el = el.parentNode;
    }
    return data;
  }

  _getAttributeFromEventPath(path, prop, pred) {
    var result = null;
    pred = pred || ((o) => { return true });
    for (var i=0; i<path.length; i++) {
      var el = path[i]
      if (!this._defined(el) || !el.getAttribute) continue;
      var attr = el.getAttribute(prop)
      if (this._defined(attr) && !!attr.startsWith && pred(attr)) {
        result = attr;
        break;
      }
    }
    return result;
  }

  _findElementByParentRecursively(_el, f) {
    var el = _el;
    while(this._defined(el)) {
      if (f(el)) return el;
      el = el.parentNode;
    }
    return null;
  }

  _length(arr) {
    return this._defined(arr) && !!arr.length ? arr.length : 0;
  }

  _defined(o) {
    return (typeof o !== 'undefined') && o != null;
  }
  _have(arr) {
    return this._defined(arr) && arr.length > 0
  }
  _one(arr) {
    if (!this._have(arr)) return false;
    return arr.length == 1;
  }
  _moreThanOne(arr) {
    if (!this._have(arr)) return false;
    return arr.length > 1;
  }
  _nonZero(num) {
    return this._defined(num) && typeof num === "number" && num != 0;
  }
  _pick(obj, arr) {
    var picked = { };
    for (var key of arr) {
      picked[key] = obj[key];
    }
    return picked;
  }

  _or(a, b) {
    return a || b;
  }
  _orNot(a, b) {
    return a || !b;
  }
  _nor(a, b) {
    return !a && !b;
  }
  _and(a, b) {
    return a && b;
  }
  _andNot(a, b) {
    return a && !b;
  }
}

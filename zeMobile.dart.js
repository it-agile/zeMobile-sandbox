function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
$defProp(Object.prototype, '$index', function(i) {
  $throw(new NoSuchMethodException(this, "operator []", [i]));
});
$defProp(Array.prototype, '$index', function(index) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i];
});
$defProp(String.prototype, '$index', function(i) {
  return this[i];
});
$defProp(Object.prototype, '$setindex', function(i, value) {
  $throw(new NoSuchMethodException(this, "operator []=", [i, value]));
});
$defProp(Array.prototype, '$setindex', function(index, value) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i] = value;
});
function $wrap_call$0(fn) { return fn; }
function $wrap_call$1(fn) { return fn; };
function $wrap_call$2(fn) { return fn; };
function $add$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'string') {
    var str = (y == null) ? 'null' : y.toString();
    if (typeof(str) != 'string') {
      throw new Error("calling toString() on right hand operand of operator " +
      "+ did not return a String");
    }
    return x + str;
  } else if (typeof(x) == 'object') {
    return x.$add(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator +", [y]));
  }
}

function $add$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x + y;
  return $add$complex$(x, y);
}
function $bit_and$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$bit_and(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator &", [y]));
  }
}
function $bit_and$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x & y;
  return $bit_and$complex$(x, y);
}
function $eq$(x, y) {
  if (x == null) return y == null;
  return (typeof(x) != 'object') ? x === y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
$defProp(Object.prototype, '$eq', function(other) {
  return this === other;
});
function $gte$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$gte(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator >=", [y]));
  }
}
function $gte$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x >= y;
  return $gte$complex$(x, y);
}
function $ne$(x, y) {
  if (x == null) return y != null;
  return (typeof(x) != 'object') ? x !== y : !x.$eq(y);
}
function $sar$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$sar(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator >>", [y]));
  }
}
function $sar$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x >> y;
  return $sar$complex$(x, y);
}
function $truncdiv$(x, y) {
  if (typeof(x) == 'number') {
    if (typeof(y) == 'number') {
      if (y == 0) $throw(new IntegerDivisionByZeroException());
      var tmp = x / y;
      return (tmp < 0) ? Math.ceil(tmp) : Math.floor(tmp);
    } else {
      $throw(new IllegalArgumentException(y));
    }
  } else if (typeof(x) == 'object') {
    return x.$truncdiv(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator ~/", [y]));
  }
}
$defProp(Object.prototype, '$typeNameOf', (function() {
  function constructorNameWithFallback(obj) {
    var constructor = obj.constructor;
    if (typeof(constructor) == 'function') {
      // The constructor isn't null or undefined at this point. Try
      // to grab hold of its name.
      var name = constructor.name;
      // If the name is a non-empty string, we use that as the type
      // name of this object. On Firefox, we often get 'Object' as
      // the constructor name even for more specialized objects so
      // we have to fall through to the toString() based implementation
      // below in that case.
      if (typeof(name) == 'string' && name && name != 'Object') return name;
    }
    var string = Object.prototype.toString.call(obj);
    return string.substring(8, string.length - 1);
  }

  function chrome$typeNameOf() {
    var name = this.constructor.name;
    if (name == 'Window') return 'DOMWindow';
    if (name == 'CanvasPixelArray') return 'Uint8ClampedArray';
    return name;
  }

  function firefox$typeNameOf() {
    var name = constructorNameWithFallback(this);
    if (name == 'Window') return 'DOMWindow';
    if (name == 'Document') return 'HTMLDocument';
    if (name == 'XMLDocument') return 'Document';
    if (name == 'WorkerMessageEvent') return 'MessageEvent';
    return name;
  }

  function ie$typeNameOf() {
    var name = constructorNameWithFallback(this);
    if (name == 'Window') return 'DOMWindow';
    // IE calls both HTML and XML documents 'Document', so we check for the
    // xmlVersion property, which is the empty string on HTML documents.
    if (name == 'Document' && this.xmlVersion) return 'Document';
    if (name == 'Document') return 'HTMLDocument';
    if (name == 'HTMLTableDataCellElement') return 'HTMLTableCellElement';
    if (name == 'HTMLTableHeaderCellElement') return 'HTMLTableCellElement';
    if (name == 'MSStyleCSSProperties') return 'CSSStyleDeclaration';
    if (name == 'CanvasPixelArray') return 'Uint8ClampedArray';
    if (name == 'HTMLPhraseElement') return 'HTMLElement';
    return name;
  }

  // If we're not in the browser, we're almost certainly running on v8.
  if (typeof(navigator) != 'object') return chrome$typeNameOf;

  var userAgent = navigator.userAgent;
  if (/Chrome|DumpRenderTree/.test(userAgent)) return chrome$typeNameOf;
  if (/Firefox/.test(userAgent)) return firefox$typeNameOf;
  if (/MSIE/.test(userAgent)) return ie$typeNameOf;
  return function() { return constructorNameWithFallback(this); };
})());
$defProp(Object.prototype, "get$typeName", Object.prototype.$typeNameOf);
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
Function.prototype.bind = Function.prototype.bind ||
  function(thisObj) {
    var func = this;
    var funcLength = func.$length || func.length;
    var argsLength = arguments.length;
    if (argsLength > 1) {
      var boundArgs = Array.prototype.slice.call(arguments, 1);
      var bound = function() {
        // Prepend the bound arguments to the current arguments.
        var newArgs = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(newArgs, boundArgs);
        return func.apply(thisObj, newArgs);
      };
      bound.$length = Math.max(0, funcLength - (argsLength - 1));
      return bound;
    } else {
      var bound = function() {
        return func.apply(thisObj, arguments);
      };
      bound.$length = funcLength;
      return bound;
    }
  };
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var obj = this;
    var tag = obj.$typeNameOf();
    var method = methods[tag];
    if (!method) {
      var table = $dynamicMetadata;
      for (var i = 0; i < table.length; i++) {
        var entry = table[i];
        if (entry.map.hasOwnProperty(tag)) {
          method = methods[entry.tag];
          if (method) break;
        }
      }
    }
    method = method || methods.Object;

    var proto = Object.getPrototypeOf(obj);

    if (method == null) {
      // Trampoline to throw NoSuchMethodException (TODO: call noSuchMethod).
      method = function(){
        // Exact type check to prevent this code shadowing the dispatcher from a
        // subclass.
        if (Object.getPrototypeOf(this) === proto) {
          // TODO(sra): 'name' is the jsname, should be the Dart name.
          $throw(new NoSuchMethodException(
              obj, name, Array.prototype.slice.call(arguments)));
        }
        return Object.prototype[name].apply(this, arguments);
      };
    }

    if (!proto.hasOwnProperty(name)) {
      $defProp(proto, name, method);
    }

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  $defProp(Object.prototype, name, $dynamicBind);
  return methods;
}
if (typeof $dynamicMetadata == 'undefined') $dynamicMetadata = [];
function $dynamicSetMetadata(inputTable) {
  // TODO: Deal with light isolates.
  var table = [];
  for (var i = 0; i < inputTable.length; i++) {
    var tag = inputTable[i][0];
    var tags = inputTable[i][1];
    var map = {};
    var tagNames = tags.split('|');
    for (var j = 0; j < tagNames.length; j++) {
      map[tagNames[j]] = true;
    }
    table.push({tag: tag, tags: tags, map: map});
  }
  $dynamicMetadata = table;
}
$defProp(Object.prototype, "get$dynamic", function() {
  "use strict"; return this;
});
$defProp(Object.prototype, "noSuchMethod", function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
});
$defProp(Object.prototype, "$dom_addEventListener$3", function($0, $1, $2) {
  return this.noSuchMethod("$dom_addEventListener", [$0, $1, $2]);
});
$defProp(Object.prototype, "$dom_removeEventListener$3", function($0, $1, $2) {
  return this.noSuchMethod("$dom_removeEventListener", [$0, $1, $2]);
});
$defProp(Object.prototype, "add$1", function($0) {
  return this.noSuchMethod("add", [$0]);
});
$defProp(Object.prototype, "contains$1", function($0) {
  return this.noSuchMethod("contains", [$0]);
});
$defProp(Object.prototype, "end$0", function() {
  return this.noSuchMethod("end", []);
});
$defProp(Object.prototype, "filter$1", function($0) {
  return this.noSuchMethod("filter", [$0]);
});
$defProp(Object.prototype, "forEach$1", function($0) {
  return this.noSuchMethod("forEach", [$0]);
});
$defProp(Object.prototype, "indexOf$1", function($0) {
  return this.noSuchMethod("indexOf", [$0]);
});
$defProp(Object.prototype, "is$Collection", function() {
  return false;
});
$defProp(Object.prototype, "is$Duration", function() {
  return false;
});
$defProp(Object.prototype, "is$List", function() {
  return false;
});
$defProp(Object.prototype, "is$Map", function() {
  return false;
});
$defProp(Object.prototype, "is$RegExp", function() {
  return false;
});
$defProp(Object.prototype, "is$html_Element", function() {
  return false;
});
$defProp(Object.prototype, "map$1", function($0) {
  return this.noSuchMethod("map", [$0]);
});
$defProp(Object.prototype, "query$1", function($0) {
  return this.noSuchMethod("query", [$0]);
});
$defProp(Object.prototype, "remove$0", function() {
  return this.noSuchMethod("remove", []);
});
$defProp(Object.prototype, "remove$1", function($0) {
  return this.noSuchMethod("remove", [$0]);
});
$defProp(Object.prototype, "sort$1", function($0) {
  return this.noSuchMethod("sort", [$0]);
});
$defProp(Object.prototype, "start$0", function() {
  return this.noSuchMethod("start", []);
});
function IndexOutOfRangeException(_index) {
  this._index = _index;
}
IndexOutOfRangeException.prototype.is$IndexOutOfRangeException = function(){return true};
IndexOutOfRangeException.prototype.toString = function() {
  return ("IndexOutOfRangeException: " + this._index);
}
function IllegalAccessException() {

}
IllegalAccessException.prototype.toString = function() {
  return "Attempt to modify an immutable object";
}
function NoSuchMethodException(_receiver, _functionName, _arguments, _existingArgumentNames) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
  this._existingArgumentNames = _existingArgumentNames;
}
NoSuchMethodException.prototype.is$NoSuchMethodException = function(){return true};
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  if (null == this._existingArgumentNames) {
    return (("NoSuchMethodException : method not found: '" + this._functionName + "'\n") + ("Receiver: " + this._receiver + "\n") + ("Arguments: [" + sb + "]"));
  }
  else {
    var actualParameters = sb.toString();
    sb = new StringBufferImpl("");
    for (var i = (0);
     i < this._existingArgumentNames.get$length(); i++) {
      if (i > (0)) {
        sb.add(", ");
      }
      sb.add(this._existingArgumentNames.$index(i));
    }
    var formalParameters = sb.toString();
    return ("NoSuchMethodException: incorrect number of arguments passed to " + ("method named '" + this._functionName + "'\nReceiver: " + this._receiver + "\n") + ("Tried calling: " + this._functionName + "(" + actualParameters + ")\n") + ("Found: " + this._functionName + "(" + formalParameters + ")"));
  }
}
function ClosureArgumentMismatchException() {

}
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
function ObjectNotClosureException() {

}
ObjectNotClosureException.prototype.toString = function() {
  return "Object is not closure";
}
function IllegalArgumentException(arg) {
  this._arg = arg;
}
IllegalArgumentException.prototype.is$IllegalArgumentException = function(){return true};
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._arg);
}
function StackOverflowException() {

}
StackOverflowException.prototype.toString = function() {
  return "Stack Overflow";
}
function BadNumberFormatException(_s) {
  this._s = _s;
}
BadNumberFormatException.prototype.toString = function() {
  return ("BadNumberFormatException: '" + this._s + "'");
}
function NullPointerException(functionName, arguments) {
  this.functionName = functionName;
  this.arguments = arguments;
}
NullPointerException.prototype.toString = function() {
  if (this.functionName == null) {
    return this.get$exceptionName();
  }
  else {
    return (("" + this.get$exceptionName() + " : method: '" + this.functionName + "'\n") + "Receiver: null\n" + ("Arguments: " + this.arguments));
  }
}
NullPointerException.prototype.get$exceptionName = function() {
  return "NullPointerException";
}
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
function EmptyQueueException() {

}
EmptyQueueException.prototype.toString = function() {
  return "EmptyQueueException";
}
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
function IntegerDivisionByZeroException() {

}
IntegerDivisionByZeroException.prototype.is$IntegerDivisionByZeroException = function(){return true};
IntegerDivisionByZeroException.prototype.toString = function() {
  return "IntegerDivisionByZeroException";
}
Function.prototype.to$call$0 = function() {
  this.call$0 = this._genStub(0);
  this.to$call$0 = function() { return this.call$0; };
  return this.call$0;
};
Function.prototype.call$0 = function() {
  return this.to$call$0()();
};
function to$call$0(f) { return f && f.to$call$0(); }
Function.prototype.to$call$1 = function() {
  this.call$1 = this._genStub(1);
  this.to$call$1 = function() { return this.call$1; };
  return this.call$1;
};
Function.prototype.call$1 = function($0) {
  return this.to$call$1()($0);
};
function to$call$1(f) { return f && f.to$call$1(); }
Function.prototype.to$call$2 = function() {
  this.call$2 = this._genStub(2);
  this.to$call$2 = function() { return this.call$2; };
  return this.call$2;
};
Function.prototype.call$2 = function($0, $1) {
  return this.to$call$2()($0, $1);
};
function to$call$2(f) { return f && f.to$call$2(); }
Math.parseInt = function(str) {
    var match = /^\s*[+-]?(?:(0[xX][abcdefABCDEF0-9]+)|\d+)\s*$/.exec(str);
    if (!match) $throw(new BadNumberFormatException(str));
    var isHex = !!match[1];
    var ret = parseInt(str, isHex ? 16 : 10);
    if (isNaN(ret)) $throw(new BadNumberFormatException(str));
    return ret;
}
function Strings() {}
Strings.join = function(strings, separator) {
  return StringBase.join(strings, separator);
}
function print$(obj) {
  return _print(obj);
}
function _print(obj) {
  if (typeof console == 'object') {
    if (obj) obj = obj.toString();
    console.log(obj);
  } else if (typeof write === 'function') {
    write(obj);
    write('\n');
  }
}
function _toDartException(e) {
  function attachStack(dartEx) {
    // TODO(jmesserly): setting the stack property is not a long term solution.
    var stack = e.stack;
    // The stack contains the error message, and the stack is all that is
    // printed (the exception's toString() is never called).  Make the Dart
    // exception's toString() be the dominant message.
    if (typeof stack == 'string') {
      var message = dartEx.toString();
      if (/^(Type|Range)Error:/.test(stack)) {
        // Indent JS message (it can be helpful) so new message stands out.
        stack = '    (' + stack.substring(0, stack.indexOf('\n')) + ')\n' +
                stack.substring(stack.indexOf('\n') + 1);
      }
      stack = message + '\n' + stack;
    }
    dartEx.stack = stack;
    return dartEx;
  }

  if (e instanceof TypeError) {
    switch(e.type) {
      case 'property_not_function':
      case 'called_non_callable':
        if (e.arguments[0] == null) {
          return attachStack(new NullPointerException(null, []));
        } else {
          return attachStack(new ObjectNotClosureException());
        }
        break;
      case 'non_object_property_call':
      case 'non_object_property_load':
        return attachStack(new NullPointerException(null, []));
        break;
      case 'undefined_method':
        var mname = e.arguments[0];
        if (typeof(mname) == 'string' && (mname.indexOf('call$') == 0
            || mname == 'call' || mname == 'apply')) {
          return attachStack(new ObjectNotClosureException());
        } else {
          // TODO(jmesserly): fix noSuchMethod on operators so we don't hit this
          return attachStack(new NoSuchMethodException('', e.arguments[0], []));
        }
        break;
    }
  } else if (e instanceof RangeError) {
    if (e.message.indexOf('call stack') >= 0) {
      return attachStack(new StackOverflowException());
    }
  }
  return e;
}
var ListFactory = Array;
$defProp(ListFactory.prototype, "is$List", function(){return true});
$defProp(ListFactory.prototype, "is$Collection", function(){return true});
ListFactory.ListFactory$from$factory = function(other) {
  var list = [];
  for (var $$i = other.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    list.add$1(e);
  }
  return list;
}
$defProp(ListFactory.prototype, "get$length", function() { return this.length; });
$defProp(ListFactory.prototype, "set$length", function(value) { return this.length = value; });
$defProp(ListFactory.prototype, "add", function(value) {
  this.push(value);
});
$defProp(ListFactory.prototype, "addAll", function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var item = $$i.next();
    this.add(item);
  }
});
$defProp(ListFactory.prototype, "clear$_", function() {
  this.set$length((0));
});
$defProp(ListFactory.prototype, "removeLast", function() {
  return this.pop();
});
$defProp(ListFactory.prototype, "last", function() {
  return this.$index(this.get$length() - (1));
});
$defProp(ListFactory.prototype, "iterator", function() {
  return new ListIterator(this);
});
$defProp(ListFactory.prototype, "toString", function() {
  return Collections.collectionToString(this);
});
$defProp(ListFactory.prototype, "add$1", ListFactory.prototype.add);
$defProp(ListFactory.prototype, "filter$1", function($0) {
  return this.filter(to$call$1($0));
});
$defProp(ListFactory.prototype, "forEach$1", function($0) {
  return this.forEach(to$call$1($0));
});
$defProp(ListFactory.prototype, "indexOf$1", ListFactory.prototype.indexOf);
$defProp(ListFactory.prototype, "map$1", function($0) {
  return this.map(to$call$1($0));
});
$defProp(ListFactory.prototype, "sort$1", function($0) {
  return this.sort(to$call$2($0));
});
function ListIterator(array) {
  this._array = array;
  this._pos = (0);
}
ListIterator.prototype.hasNext = function() {
  return this._array.get$length() > this._pos;
}
ListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._array.$index(this._pos++);
}
function ImmutableMap(keyValuePairs) {
  this._internal = _map(keyValuePairs);
}
ImmutableMap.prototype.is$Map = function(){return true};
ImmutableMap.prototype.$index = function(key) {
  return this._internal.$index(key);
}
ImmutableMap.prototype.get$length = function() {
  return this._internal.get$length();
}
ImmutableMap.prototype.forEach = function(f) {
  this._internal.forEach$1(f);
}
ImmutableMap.prototype.containsKey = function(key) {
  return this._internal.containsKey(key);
}
ImmutableMap.prototype.$setindex = function(key, value) {
  $throw(const$0009);
}
ImmutableMap.prototype.remove = function(key) {
  $throw(const$0009);
}
ImmutableMap.prototype.toString = function() {
  return Maps.mapToString(this);
}
ImmutableMap.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
};
ImmutableMap.prototype.remove$1 = ImmutableMap.prototype.remove;
function JSSyntaxRegExp(pattern, multiLine, ignoreCase) {
  JSSyntaxRegExp._create$ctor.call(this, pattern, $add$(($eq$(multiLine, true) ? "m" : ""), ($eq$(ignoreCase, true) ? "i" : "")));
}
JSSyntaxRegExp._create$ctor = function(pattern, flags) {
  this.re = new RegExp(pattern, flags);
      this.pattern = pattern;
      this.multiLine = this.re.multiline;
      this.ignoreCase = this.re.ignoreCase;
}
JSSyntaxRegExp._create$ctor.prototype = JSSyntaxRegExp.prototype;
JSSyntaxRegExp.prototype.is$RegExp = function(){return true};
JSSyntaxRegExp.prototype.firstMatch = function(str) {
  var m = this._exec(str);
  return m == null ? null : new MatchImplementation(this.pattern, str, this._matchStart(m), this.get$_lastIndex(), m);
}
JSSyntaxRegExp.prototype._exec = function(str) {
  return this.re.exec(str);
}
JSSyntaxRegExp.prototype._matchStart = function(m) {
  return m.index;
}
JSSyntaxRegExp.prototype.get$_lastIndex = function() {
  return this.re.lastIndex;
}
JSSyntaxRegExp.prototype.hasMatch = function(str) {
  return this.re.test(str);
}
JSSyntaxRegExp.prototype.allMatches = function(str) {
  return new _AllMatchesIterable(this, str);
}
JSSyntaxRegExp.prototype.get$_global = function() {
  return new JSSyntaxRegExp._create$ctor(this.pattern, $add$($add$("g", (this.multiLine ? "m" : "")), (this.ignoreCase ? "i" : "")));
}
function MatchImplementation(pattern, str, _start, _end, _groups) {
  this.pattern = pattern;
  this.str = str;
  this._start = _start;
  this._end = _end;
  this._groups = _groups;
}
MatchImplementation.prototype.start = function() {
  return this._start;
}
MatchImplementation.prototype.end = function() {
  return this._end;
}
MatchImplementation.prototype.group = function(groupIndex) {
  return this._groups.$index(groupIndex);
}
MatchImplementation.prototype.$index = function(groupIndex) {
  return this._groups.$index(groupIndex);
}
MatchImplementation.prototype.end$0 = MatchImplementation.prototype.end;
MatchImplementation.prototype.start$0 = MatchImplementation.prototype.start;
function _AllMatchesIterable(_re, _str) {
  this._re = _re;
  this._str = _str;
}
_AllMatchesIterable.prototype.iterator = function() {
  return new _AllMatchesIterator(this._re, this._str);
}
function _AllMatchesIterator(re, _str) {
  this._str = _str;
  this._done = false;
  this._re = re.get$_global();
}
_AllMatchesIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  var result = this._next;
  this._next = null;
  return result;
}
_AllMatchesIterator.prototype.hasNext = function() {
  if (this._done) {
    return false;
  }
  else if (this._next != null) {
    return true;
  }
  this._next = this._re.firstMatch(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  }
  else {
    return true;
  }
}
var NumImplementation = Number;
NumImplementation.prototype.$negate = function() {
  'use strict'; return -this;
}
NumImplementation.prototype.remainder = function(other) {
  'use strict'; return this % other;
}
NumImplementation.prototype.isNaN = function() {
  'use strict'; return isNaN(this);
}
NumImplementation.prototype.isNegative = function() {
  'use strict'; return this == 0 ? (1 / this) < 0 : this < 0;
}
NumImplementation.prototype.abs = function() {
  'use strict'; return Math.abs(this);
}
NumImplementation.prototype.hashCode = function() {
  'use strict'; return this & 0x1FFFFFFF;
}
NumImplementation.prototype.toDouble = function() {
  'use strict'; return this + 0;
}
NumImplementation.prototype.compareTo = function(other) {
  var thisValue = this.toDouble();
  if (thisValue < other) {
    return (-1);
  }
  else if (thisValue > other) {
    return (1);
  }
  else if (thisValue == other) {
    if (thisValue == (0)) {
      var thisIsNegative = this.isNegative();
      var otherIsNegative = other.isNegative();
      if ($eq$(thisIsNegative, otherIsNegative)) return (0);
      if (thisIsNegative) return (-1);
      return (1);
    }
    return (0);
  }
  else if (this.isNaN()) {
    if (other.isNaN()) {
      return (0);
    }
    return (1);
  }
  else {
    return (-1);
  }
}
function DurationImplementation(days, hours, minutes, seconds, milliseconds) {
  this.inMilliseconds = days * (86400000) + hours * (3600000) + minutes * (60000) + seconds * (1000) + milliseconds;
}
DurationImplementation.prototype.is$Duration = function(){return true};
DurationImplementation.prototype.get$inMilliseconds = function() { return this.inMilliseconds; };
DurationImplementation.prototype.get$inHours = function() {
  return $truncdiv$(this.inMilliseconds, (3600000));
}
DurationImplementation.prototype.get$inMinutes = function() {
  return $truncdiv$(this.inMilliseconds, (60000));
}
DurationImplementation.prototype.get$inSeconds = function() {
  return $truncdiv$(this.inMilliseconds, (1000));
}
DurationImplementation.prototype.$eq = function(other) {
  if (!(other && other.is$Duration())) return false;
  return this.inMilliseconds == other.get$inMilliseconds();
}
DurationImplementation.prototype.hashCode = function() {
  return this.inMilliseconds.hashCode();
}
DurationImplementation.prototype.compareTo = function(other) {
  return this.inMilliseconds.compareTo(other.inMilliseconds);
}
DurationImplementation.prototype.toString = function() {
  function threeDigits(n) {
    if (n >= (100)) return ("" + n);
    if (n > (10)) return ("0" + n);
    return ("00" + n);
  }
  function twoDigits(n) {
    if (n >= (10)) return ("" + n);
    return ("0" + n);
  }
  if (this.inMilliseconds < (0)) {
    var duration = new DurationImplementation((0), (0), (0), (0), -this.inMilliseconds);
    return ("-" + duration);
  }
  var twoDigitMinutes = twoDigits(this.get$inMinutes().remainder((60)));
  var twoDigitSeconds = twoDigits(this.get$inSeconds().remainder((60)));
  var threeDigitMs = threeDigits(this.inMilliseconds.remainder((1000)));
  return ("" + this.get$inHours() + ":" + twoDigitMinutes + ":" + twoDigitSeconds + "." + threeDigitMs);
}
function Collections() {}
Collections.collectionToString = function(c) {
  var result = new StringBufferImpl("");
  Collections._emitCollection(c, result, new Array());
  return result.toString();
}
Collections._emitCollection = function(c, result, visiting) {
  visiting.add(c);
  var isList = !!(c && c.is$List());
  result.add(isList ? "[" : "{");
  var first = true;
  for (var $$i = c.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (!first) {
      result.add(", ");
    }
    first = false;
    Collections._emitObject(e, result, visiting);
  }
  result.add(isList ? "]" : "}");
  visiting.removeLast();
}
Collections._emitObject = function(o, result, visiting) {
  if (!!(o && o.is$Collection())) {
    if (Collections._containsRef(visiting, o)) {
      result.add(!!(o && o.is$List()) ? "[...]" : "{...}");
    }
    else {
      Collections._emitCollection(o, result, visiting);
    }
  }
  else if (!!(o && o.is$Map())) {
    if (Collections._containsRef(visiting, o)) {
      result.add("{...}");
    }
    else {
      Maps._emitMap(o, result, visiting);
    }
  }
  else {
    result.add($eq$(o) ? "null" : o);
  }
}
Collections._containsRef = function(c, ref) {
  for (var $$i = c.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if ((null == e ? null == (ref) : e === ref)) return true;
  }
  return false;
}
function HashMapImplementation() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation.prototype.is$Map = function(){return true};
HashMapImplementation._computeLoadLimit = function(capacity) {
  return $truncdiv$((capacity * (3)), (4));
}
HashMapImplementation._firstProbe = function(hashCode, length) {
  return hashCode & (length - (1));
}
HashMapImplementation._nextProbe = function(currentProbe, numberOfProbes, length) {
  return (currentProbe + numberOfProbes) & (length - (1));
}
HashMapImplementation.prototype._probeForAdding = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  var insertionIndex = (-1);
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) {
      if (insertionIndex < (0)) return hash;
      return insertionIndex;
    }
    else if ($eq$(existingKey, key)) {
      return hash;
    }
    else if ((insertionIndex < (0)) && ((null == const$0000 ? null == (existingKey) : const$0000 === existingKey))) {
      insertionIndex = hash;
    }
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._probeForLookup = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) return (-1);
    if ($eq$(existingKey, key)) return hash;
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._ensureCapacity = function() {
  var newNumberOfEntries = this._numberOfEntries + (1);
  if (newNumberOfEntries >= this._loadLimit) {
    this._grow(this._keys.get$length() * (2));
    return;
  }
  var capacity = this._keys.get$length();
  var numberOfFreeOrDeleted = capacity - newNumberOfEntries;
  var numberOfFree = numberOfFreeOrDeleted - this._numberOfDeleted;
  if (this._numberOfDeleted > numberOfFree) {
    this._grow(this._keys.get$length());
  }
}
HashMapImplementation._isPowerOfTwo = function(x) {
  return ((x & (x - (1))) == (0));
}
HashMapImplementation.prototype._grow = function(newCapacity) {
  var capacity = this._keys.get$length();
  this._loadLimit = HashMapImplementation._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  var oldValues = this._values;
  this._keys = new Array(newCapacity);
  this._values = new Array(newCapacity);
  for (var i = (0);
   i < capacity; i++) {
    var key = oldKeys.$index(i);
    if (null == key || (null == key ? null == (const$0000) : key === const$0000)) {
      continue;
    }
    var value = oldValues.$index(i);
    var newIndex = this._probeForAdding(key);
    this._keys.$setindex(newIndex, key);
    this._values.$setindex(newIndex, value);
  }
  this._numberOfDeleted = (0);
}
HashMapImplementation.prototype.$setindex = function(key, value) {
  var $0;
  this._ensureCapacity();
  var index = this._probeForAdding(key);
  if ((null == this._keys.$index(index)) || ((($0 = this._keys.$index(index)) == null ? null == (const$0000) : $0 === const$0000))) {
    this._numberOfEntries++;
  }
  this._keys.$setindex(index, key);
  this._values.$setindex(index, value);
}
HashMapImplementation.prototype.$index = function(key) {
  var index = this._probeForLookup(key);
  if (index < (0)) return null;
  return this._values.$index(index);
}
HashMapImplementation.prototype.remove = function(key) {
  var index = this._probeForLookup(key);
  if (index >= (0)) {
    this._numberOfEntries--;
    var value = this._values.$index(index);
    this._values.$setindex(index);
    this._keys.$setindex(index, const$0000);
    this._numberOfDeleted++;
    return value;
  }
  return null;
}
HashMapImplementation.prototype.get$length = function() {
  return this._numberOfEntries;
}
HashMapImplementation.prototype.forEach = function(f) {
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    var key = this._keys.$index(i);
    if ((null != key) && ((null == key ? null != (const$0000) : key !== const$0000))) {
      f(key, this._values.$index(i));
    }
  }
}
HashMapImplementation.prototype.containsKey = function(key) {
  return (this._probeForLookup(key) != (-1));
}
HashMapImplementation.prototype.toString = function() {
  return Maps.mapToString(this);
}
HashMapImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
};
HashMapImplementation.prototype.remove$1 = HashMapImplementation.prototype.remove;
$inherits(HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair, HashMapImplementation);
function HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
};
HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair.prototype.remove$1 = HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair.prototype.remove;
$inherits(HashMapImplementation_dart_core_String$Dynamic, HashMapImplementation);
function HashMapImplementation_dart_core_String$Dynamic() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$Dynamic.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
};
HashMapImplementation_dart_core_String$Dynamic.prototype.remove$1 = HashMapImplementation_dart_core_String$Dynamic.prototype.remove;
$inherits(HashMapImplementation_dart_core_String$dart_core_String, HashMapImplementation);
function HashMapImplementation_dart_core_String$dart_core_String() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$dart_core_String.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
};
HashMapImplementation_dart_core_String$dart_core_String.prototype.remove$1 = HashMapImplementation_dart_core_String$dart_core_String.prototype.remove;
function HashSetImplementation() {
  this._backingMap = new HashMapImplementation();
}
HashSetImplementation.prototype.is$Collection = function(){return true};
HashSetImplementation.prototype.add = function(value) {
  this._backingMap.$setindex(value, value);
}
HashSetImplementation.prototype.contains = function(value) {
  return this._backingMap.containsKey(value);
}
HashSetImplementation.prototype.remove = function(value) {
  if (!this._backingMap.containsKey(value)) return false;
  this._backingMap.remove(value);
  return true;
}
HashSetImplementation.prototype.addAll = function(collection) {
  var $this = this;
  collection.forEach$1(function _(value) {
    $this.add(value);
  }
  );
}
HashSetImplementation.prototype.forEach = function(f) {
  this._backingMap.forEach(function _(key, value) {
    f(key);
  }
  );
}
HashSetImplementation.prototype.map = function(f) {
  var result = new HashSetImplementation();
  this._backingMap.forEach(function _(key, value) {
    result.add(f(key));
  }
  );
  return result;
}
HashSetImplementation.prototype.filter = function(f) {
  var result = new HashSetImplementation();
  this._backingMap.forEach(function _(key, value) {
    if (f(key)) result.add(key);
  }
  );
  return result;
}
HashSetImplementation.prototype.get$length = function() {
  return this._backingMap.get$length();
}
HashSetImplementation.prototype.iterator = function() {
  return new HashSetIterator(this);
}
HashSetImplementation.prototype.toString = function() {
  return Collections.collectionToString(this);
}
HashSetImplementation.prototype.add$1 = HashSetImplementation.prototype.add;
HashSetImplementation.prototype.contains$1 = HashSetImplementation.prototype.contains;
HashSetImplementation.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
HashSetImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
HashSetImplementation.prototype.map$1 = function($0) {
  return this.map(to$call$1($0));
};
HashSetImplementation.prototype.remove$1 = HashSetImplementation.prototype.remove;
$inherits(HashSetImplementation_dart_core_String, HashSetImplementation);
function HashSetImplementation_dart_core_String() {
  this._backingMap = new HashMapImplementation_dart_core_String$dart_core_String();
}
HashSetImplementation_dart_core_String.prototype.add$1 = HashSetImplementation_dart_core_String.prototype.add;
HashSetImplementation_dart_core_String.prototype.contains$1 = HashSetImplementation_dart_core_String.prototype.contains;
HashSetImplementation_dart_core_String.prototype.map$1 = function($0) {
  return this.map(to$call$1($0));
};
HashSetImplementation_dart_core_String.prototype.remove$1 = HashSetImplementation_dart_core_String.prototype.remove;
function HashSetIterator(set_) {
  this._nextValidIndex = (-1);
  this._entries = set_._backingMap._keys;
  this._advance();
}
HashSetIterator.prototype.hasNext = function() {
  var $0;
  if (this._nextValidIndex >= this._entries.get$length()) return false;
  if ((($0 = this._entries.$index(this._nextValidIndex)) == null ? null == (const$0000) : $0 === const$0000)) {
    this._advance();
  }
  return this._nextValidIndex < this._entries.get$length();
}
HashSetIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  var res = this._entries.$index(this._nextValidIndex);
  this._advance();
  return res;
}
HashSetIterator.prototype._advance = function() {
  var length = this._entries.get$length();
  var entry;
  var deletedKey = const$0000;
  do {
    if (++this._nextValidIndex >= length) break;
    entry = this._entries.$index(this._nextValidIndex);
  }
  while ((null == entry) || ((null == entry ? null == (deletedKey) : entry === deletedKey)))
}
function _DeletedKeySentinel() {

}
function KeyValuePair(key, value) {
  this.key$_ = key;
  this.value = value;
}
KeyValuePair.prototype.get$value = function() { return this.value; };
KeyValuePair.prototype.set$value = function(value) { return this.value = value; };
function LinkedHashMapImplementation() {
  this._map = new HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair();
  this._list = new DoubleLinkedQueue_KeyValuePair();
}
LinkedHashMapImplementation.prototype.is$Map = function(){return true};
LinkedHashMapImplementation.prototype.$setindex = function(key, value) {
  if (this._map.containsKey(key)) {
    this._map.$index(key).get$element().set$value(value);
  }
  else {
    this._list.addLast(new KeyValuePair(key, value));
    this._map.$setindex(key, this._list.lastEntry());
  }
}
LinkedHashMapImplementation.prototype.$index = function(key) {
  var entry = this._map.$index(key);
  if (null == entry) return null;
  return entry.get$element().get$value();
}
LinkedHashMapImplementation.prototype.remove = function(key) {
  var entry = this._map.remove(key);
  if (null == entry) return null;
  entry.remove();
  return entry.get$element().get$value();
}
LinkedHashMapImplementation.prototype.forEach = function(f) {
  this._list.forEach(function _(entry) {
    f(entry.key$_, entry.value);
  }
  );
}
LinkedHashMapImplementation.prototype.containsKey = function(key) {
  return this._map.containsKey(key);
}
LinkedHashMapImplementation.prototype.get$length = function() {
  return this._map.get$length();
}
LinkedHashMapImplementation.prototype.toString = function() {
  return Maps.mapToString(this);
}
LinkedHashMapImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
};
LinkedHashMapImplementation.prototype.remove$1 = LinkedHashMapImplementation.prototype.remove;
function Maps() {}
Maps.mapToString = function(m) {
  var result = new StringBufferImpl("");
  Maps._emitMap(m, result, new Array());
  return result.toString();
}
Maps._emitMap = function(m, result, visiting) {
  visiting.add(m);
  result.add("{");
  var first = true;
  m.forEach$1((function (k, v) {
    if (!first) {
      result.add(", ");
    }
    first = false;
    Collections._emitObject(k, result, visiting);
    result.add(": ");
    Collections._emitObject(v, result, visiting);
  })
  );
  result.add("}");
  visiting.removeLast();
}
function DoubleLinkedQueueEntry(e) {
  this._element = e;
}
DoubleLinkedQueueEntry.prototype._link = function(p, n) {
  this._next = n;
  this._previous = p;
  p._next = this;
  n._previous = this;
}
DoubleLinkedQueueEntry.prototype.prepend = function(e) {
  new DoubleLinkedQueueEntry(e)._link(this._previous, this);
}
DoubleLinkedQueueEntry.prototype.remove = function() {
  this._previous._next = this._next;
  this._next._previous = this._previous;
  this._next = null;
  this._previous = null;
  return this._element;
}
DoubleLinkedQueueEntry.prototype._asNonSentinelEntry = function() {
  return this;
}
DoubleLinkedQueueEntry.prototype.previousEntry = function() {
  return this._previous._asNonSentinelEntry();
}
DoubleLinkedQueueEntry.prototype.get$element = function() {
  return this._element;
}
DoubleLinkedQueueEntry.prototype.remove$0 = DoubleLinkedQueueEntry.prototype.remove;
$inherits(DoubleLinkedQueueEntry_KeyValuePair, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_KeyValuePair(e) {
  this._element = e;
}
DoubleLinkedQueueEntry_KeyValuePair.prototype.remove$0 = DoubleLinkedQueueEntry_KeyValuePair.prototype.remove;
$inherits(_DoubleLinkedQueueEntrySentinel, DoubleLinkedQueueEntry);
function _DoubleLinkedQueueEntrySentinel() {
  DoubleLinkedQueueEntry.call(this, null);
  this._link(this, this);
}
_DoubleLinkedQueueEntrySentinel.prototype.remove = function() {
  $throw(const$0002);
}
_DoubleLinkedQueueEntrySentinel.prototype._asNonSentinelEntry = function() {
  return null;
}
_DoubleLinkedQueueEntrySentinel.prototype.get$element = function() {
  $throw(const$0002);
}
_DoubleLinkedQueueEntrySentinel.prototype.remove$0 = _DoubleLinkedQueueEntrySentinel.prototype.remove;
$inherits(_DoubleLinkedQueueEntrySentinel_KeyValuePair, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_KeyValuePair() {
  DoubleLinkedQueueEntry_KeyValuePair.call(this, null);
  this._link(this, this);
}
function DoubleLinkedQueue() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel();
}
DoubleLinkedQueue.prototype.is$Collection = function(){return true};
DoubleLinkedQueue.prototype.addLast = function(value) {
  this._sentinel.prepend(value);
}
DoubleLinkedQueue.prototype.add = function(value) {
  this.addLast(value);
}
DoubleLinkedQueue.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    this.add(e);
  }
}
DoubleLinkedQueue.prototype.lastEntry = function() {
  return this._sentinel.previousEntry();
}
DoubleLinkedQueue.prototype.get$length = function() {
  var counter = (0);
  this.forEach(function _(element) {
    counter++;
  }
  );
  return counter;
}
DoubleLinkedQueue.prototype.forEach = function(f) {
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    f(entry._element);
    entry = nextEntry;
  }
}
DoubleLinkedQueue.prototype.map = function(f) {
  var other = new DoubleLinkedQueue();
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    other.addLast(f(entry._element));
    entry = nextEntry;
  }
  return other;
}
DoubleLinkedQueue.prototype.filter = function(f) {
  var other = new DoubleLinkedQueue();
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    if (f(entry._element)) other.addLast(entry._element);
    entry = nextEntry;
  }
  return other;
}
DoubleLinkedQueue.prototype.iterator = function() {
  return new _DoubleLinkedQueueIterator(this._sentinel);
}
DoubleLinkedQueue.prototype.toString = function() {
  return Collections.collectionToString(this);
}
DoubleLinkedQueue.prototype.add$1 = DoubleLinkedQueue.prototype.add;
DoubleLinkedQueue.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
DoubleLinkedQueue.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
DoubleLinkedQueue.prototype.map$1 = function($0) {
  return this.map(to$call$1($0));
};
$inherits(DoubleLinkedQueue_KeyValuePair, DoubleLinkedQueue);
function DoubleLinkedQueue_KeyValuePair() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel_KeyValuePair();
}
DoubleLinkedQueue_KeyValuePair.prototype.map$1 = function($0) {
  return this.map(to$call$1($0));
};
function _DoubleLinkedQueueIterator(_sentinel) {
  this._sentinel = _sentinel;
  this._currentEntry = this._sentinel;
}
_DoubleLinkedQueueIterator.prototype.hasNext = function() {
  var $0;
  return (($0 = this._currentEntry._next) == null ? null != (this._sentinel) : $0 !== this._sentinel);
}
_DoubleLinkedQueueIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  this._currentEntry = this._currentEntry._next;
  return this._currentEntry.get$element();
}
function StringBufferImpl(content) {
  this.clear$_();
  this.add(content);
}
StringBufferImpl.prototype.get$length = function() {
  return this._length;
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (null == str || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.addAll = function(objects) {
  for (var $$i = objects.iterator(); $$i.hasNext(); ) {
    var obj = $$i.next();
    this.add(obj);
  }
  return this;
}
StringBufferImpl.prototype.clear$_ = function() {
  this._buffer = new Array();
  this._length = (0);
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == (0)) return "";
  if (this._buffer.get$length() == (1)) return this._buffer.$index((0));
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear$_();
  this._buffer.add(result);
  return result;
}
StringBufferImpl.prototype.add$1 = StringBufferImpl.prototype.add;
function StringBase() {}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = $add$($add$(s, separator), strings.$index(i));
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
var StringImplementation = String;
StringImplementation.prototype.get$length = function() { return this.length; };
StringImplementation.prototype.startsWith = function(other) {
    'use strict';
    if (other.length > this.length) return false;
    return other == this.substring(0, other.length);
}
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
StringImplementation.prototype.contains = function(pattern, startIndex) {
  'use strict'; return this.indexOf(pattern, startIndex) >= 0;
}
StringImplementation.prototype._replaceRegExp = function(from, to) {
  'use strict';return this.replace(from.re, to);
}
StringImplementation.prototype._replaceAll = function(from, to) {
  'use strict';
  from = new RegExp(from.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'g');
  to = to.replace(/\$/g, '$$$$'); // Escape sequences are fun!
  return this.replace(from, to);
}
StringImplementation.prototype.replaceAll = function(from, to) {
  if ((typeof(from) == 'string')) return this._replaceAll(from, to);
  if (!!(from && from.is$RegExp())) return this._replaceRegExp(from.get$dynamic().get$_global(), to);
  var buffer = new StringBufferImpl("");
  var lastMatchEnd = (0);
  var $$list = from.allMatches(this);
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var match = $$i.next();
    buffer.add$1(this.substring(lastMatchEnd, match.start$0()));
    buffer.add$1(to);
    lastMatchEnd = match.end$0();
  }
  buffer.add$1(this.substring(lastMatchEnd));
}
StringImplementation.prototype.split$_ = function(pattern) {
  if ((typeof(pattern) == 'string')) return this._split(pattern);
  if (!!(pattern && pattern.is$RegExp())) return this._splitRegExp(pattern);
  $throw("String.split(Pattern) unimplemented.");
}
StringImplementation.prototype._split = function(pattern) {
  'use strict'; return this.split(pattern);
}
StringImplementation.prototype._splitRegExp = function(pattern) {
  'use strict'; return this.split(pattern.re);
}
StringImplementation.prototype.allMatches = function(str) {
  $throw("String.allMatches(String str) unimplemented.");
}
StringImplementation.prototype.hashCode = function() {
      'use strict';
      var hash = 0;
      for (var i = 0; i < this.length; i++) {
        hash = 0x1fffffff & (hash + this.charCodeAt(i));
        hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
        hash ^= hash >> 6;
      }

      hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
      hash ^= hash >> 11;
      return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}
StringImplementation.prototype.compareTo = function(other) {
  'use strict'; return this == other ? 0 : this < other ? -1 : 1;
}
StringImplementation.prototype.contains$1 = StringImplementation.prototype.contains;
StringImplementation.prototype.indexOf$1 = StringImplementation.prototype.indexOf;
DateImplementation.withTimeZone$ctor = function(years, month, day, hours, minutes, seconds, milliseconds, timeZone) {
  this.timeZone = timeZone;
  this.value = DateImplementation._valueFromDecomposed(years, month, day, hours, minutes, seconds, milliseconds, timeZone.isUtc);
  if (null == this.value) $throw(new IllegalArgumentException(""));
  this._asJs();
}
DateImplementation.withTimeZone$ctor.prototype = DateImplementation.prototype;
DateImplementation.now$ctor = function() {
  this.timeZone = new TimeZoneImplementation.local$ctor();
  this.value = DateImplementation._now();
  this._asJs();
}
DateImplementation.now$ctor.prototype = DateImplementation.prototype;
DateImplementation.fromEpoch$ctor = function(value, timeZone) {
  this.value = value;
  this.timeZone = timeZone;
}
DateImplementation.fromEpoch$ctor.prototype = DateImplementation.prototype;
function DateImplementation() {}
DateImplementation.DateImplementation$factory = function(years, month, day, hours, minutes, seconds, milliseconds) {
  return new DateImplementation.withTimeZone$ctor(years, month, day, hours, minutes, seconds, milliseconds, new TimeZoneImplementation.local$ctor());
}
DateImplementation.prototype.get$value = function() { return this.value; };
DateImplementation.prototype.get$timeZone = function() { return this.timeZone; };
DateImplementation.prototype.$eq = function(other) {
  if (!((other instanceof DateImplementation))) return false;
  return (this.value == other.get$value()) && ($eq$(this.timeZone, other.get$timeZone()));
}
DateImplementation.prototype.$gte = function(other) {
  return this.value >= other.value;
}
DateImplementation.prototype.compareTo = function(other) {
  return this.value.compareTo(other.value);
}
DateImplementation.prototype.hashCode = function() {
  return this.value;
}
DateImplementation.prototype.get$year = function() {
  return this.isUtc() ? this._asJs().getUTCFullYear() :
      this._asJs().getFullYear();
}
DateImplementation.prototype.get$month = function() {
  return this.isUtc() ? this._asJs().getUTCMonth() + 1 :
        this._asJs().getMonth() + 1;
}
DateImplementation.prototype.get$day = function() {
  return this.isUtc() ? this._asJs().getUTCDate() :
        this._asJs().getDate();
}
DateImplementation.prototype.get$hours = function() {
  return this.isUtc() ? this._asJs().getUTCHours() :
        this._asJs().getHours();
}
DateImplementation.prototype.get$minutes = function() {
  return this.isUtc() ? this._asJs().getUTCMinutes() :
        this._asJs().getMinutes();
}
DateImplementation.prototype.get$seconds = function() {
  return this.isUtc() ? this._asJs().getUTCSeconds() :
        this._asJs().getSeconds();
}
DateImplementation.prototype.get$milliseconds = function() {
  return this.isUtc() ? this._asJs().getUTCMilliseconds() :
      this._asJs().getMilliseconds();
}
DateImplementation.prototype.isUtc = function() {
  return this.timeZone.isUtc;
}
DateImplementation.prototype.get$isUtc = function() {
  return this.isUtc.bind(this);
}
DateImplementation.prototype.toString = function() {
  function fourDigits(n) {
    var absN = n.abs();
    var sign = n < (0) ? "-" : "";
    if (absN >= (1000)) return ("" + n);
    if (absN >= (100)) return ("" + sign + "0" + absN);
    if (absN >= (10)) return ("" + sign + "00" + absN);
    if (absN >= (1)) return ("" + sign + "000" + absN);
  }
  function threeDigits(n) {
    if (n >= (100)) return ("" + n);
    if (n >= (10)) return ("0" + n);
    return ("00" + n);
  }
  function twoDigits(n) {
    if (n >= (10)) return ("" + n);
    return ("0" + n);
  }
  var y = fourDigits(this.get$year());
  var m = twoDigits(this.get$month());
  var d = twoDigits(this.get$day());
  var h = twoDigits(this.get$hours());
  var min = twoDigits(this.get$minutes());
  var sec = twoDigits(this.get$seconds());
  var ms = threeDigits(this.get$milliseconds());
  if (this.timeZone.isUtc) {
    return ("" + y + "-" + m + "-" + d + " " + h + ":" + min + ":" + sec + "." + ms + "Z");
  }
  else {
    return ("" + y + "-" + m + "-" + d + " " + h + ":" + min + ":" + sec + "." + ms);
  }
}
DateImplementation.prototype.add = function(duration) {
  return new DateImplementation.fromEpoch$ctor(this.value + duration.inMilliseconds, this.timeZone);
}
DateImplementation._valueFromDecomposed = function(years, month, day, hours, minutes, seconds, milliseconds, isUtc) {
  var jsMonth = month - 1;
    var date = new Date(0);
    if (isUtc) {
      date.setUTCFullYear(years, jsMonth, day);
      date.setUTCHours(hours, minutes, seconds, milliseconds);
    } else {
      date.setFullYear(years, jsMonth, day);
      date.setHours(hours, minutes, seconds, milliseconds);
    }
    var value = date.valueOf();
    if (isNaN(value)) return (void 0);
    return value;
}
DateImplementation._now = function() {
  return new Date().valueOf();
}
DateImplementation.prototype._asJs = function() {
    if (!this.date) {
      this.date = new Date(this.value);
    }
    return this.date;
}
DateImplementation.prototype.add$1 = DateImplementation.prototype.add;
TimeZoneImplementation.local$ctor = function() {
  this.isUtc = false;
}
TimeZoneImplementation.local$ctor.prototype = TimeZoneImplementation.prototype;
function TimeZoneImplementation() {}
TimeZoneImplementation.prototype.$eq = function(other) {
  if (!((other instanceof TimeZoneImplementation))) return false;
  return $eq$(this.isUtc, other.get$isUtc());
}
TimeZoneImplementation.prototype.toString = function() {
  if (this.isUtc) return "TimeZone (UTC)";
  return "TimeZone (Local)";
}
TimeZoneImplementation.prototype.get$isUtc = function() { return this.isUtc; };
$inherits(_ArgumentMismatchException, ClosureArgumentMismatchException);
function _ArgumentMismatchException(_message) {
  this._dart_coreimpl_message = _message;
  ClosureArgumentMismatchException.call(this);
}
_ArgumentMismatchException.prototype.toString = function() {
  return ("Closure argument mismatch: " + this._dart_coreimpl_message);
}
var _FunctionImplementation = Function;
_FunctionImplementation.prototype._genStub = function(argsLength, names) {
      // Fast path #1: if no named arguments and arg count matches.
      var thisLength = this.$length || this.length;
      if (thisLength == argsLength && !names) {
        return this;
      }

      var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
      var paramsBare = thisLength - paramsNamed;
      var argsNamed = names ? names.length : 0;
      var argsBare = argsLength - argsNamed;

      // Check we got the right number of arguments
      if (argsBare < paramsBare || argsLength > thisLength ||
          argsNamed > paramsNamed) {
        return function() {
          $throw(new _ArgumentMismatchException(
            'Wrong number of arguments to function. Expected ' + paramsBare +
            ' positional arguments and at most ' + paramsNamed +
            ' named arguments, but got ' + argsBare +
            ' positional arguments and ' + argsNamed + ' named arguments.'));
        };
      }

      // First, fill in all of the default values
      var p = new Array(paramsBare);
      if (paramsNamed) {
        p = p.concat(this.$optional.slice(paramsNamed));
      }
      // Fill in positional args
      var a = new Array(argsLength);
      for (var i = 0; i < argsBare; i++) {
        p[i] = a[i] = '$' + i;
      }
      // Then overwrite with supplied values for optional args
      var lastParameterIndex;
      var namesInOrder = true;
      for (var i = 0; i < argsNamed; i++) {
        var name = names[i];
        a[i + argsBare] = name;
        var j = this.$optional.indexOf(name);
        if (j < 0 || j >= paramsNamed) {
          return function() {
            $throw(new _ArgumentMismatchException(
              'Named argument "' + name + '" was not expected by function.' +
              ' Did you forget to mark the function parameter [optional]?'));
          };
        } else if (lastParameterIndex && lastParameterIndex > j) {
          namesInOrder = false;
        }
        p[j + paramsBare] = name;
        lastParameterIndex = j;
      }

      if (thisLength == argsLength && namesInOrder) {
        // Fast path #2: named arguments, but they're in order and all supplied.
        return this;
      }

      // Note: using Function instead of 'eval' to get a clean scope.
      // TODO(jmesserly): evaluate the performance of these stubs.
      var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
      return new Function('$f', 'return ' + f + '').call(null, this);
    
}
function _map(itemsAndKeys) {
  var ret = new LinkedHashMapImplementation();
  for (var i = (0);
   i < itemsAndKeys.get$length(); ) {
    ret.$setindex(itemsAndKeys.$index(i++), itemsAndKeys.$index(i++));
  }
  return ret;
}
function _constMap(itemsAndKeys) {
  return new ImmutableMap(itemsAndKeys);
}
$dynamic("$dom_addEventListener$3").EventTarget = function($0, $1, $2) {
  if (Object.getPrototypeOf(this).hasOwnProperty("$dom_addEventListener$3")) {
    return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
  }
  return Object.prototype.$dom_addEventListener$3.call(this, $0, $1, $2);
};
$dynamic("$dom_removeEventListener$3").EventTarget = function($0, $1, $2) {
  if (Object.getPrototypeOf(this).hasOwnProperty("$dom_removeEventListener$3")) {
    return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
  }
  return Object.prototype.$dom_removeEventListener$3.call(this, $0, $1, $2);
};
$dynamic("get$nodes").Node = function() {
  return new _ChildNodeListLazy(this);
}
$dynamic("remove").Node = function() {
  if ($ne$(this.get$parent())) {
    var parent = this.get$parent();
    parent.removeChild(this);
  }
  return this;
}
$dynamic("replaceWith").Node = function(otherNode) {
  try {
    var parent = this.get$parent();
    parent.replaceChild(otherNode, this);
  } catch (e) {
    e = _toDartException(e);
  }
  ;
  return this;
}
$dynamic("get$$$dom_attributes").Node = function() {
  return this.attributes;
}
$dynamic("get$$$dom_childNodes").Node = function() {
  return this.childNodes;
}
$dynamic("get$parent").Node = function() {
  return this.parentNode;
}
$dynamic("set$text").Node = function(value) {
  this.textContent = value;
}
$dynamic("contains$1").Node = function($0) {
  return this.contains($0);
};
$dynamic("remove$0").Node = function() {
  return this.remove();
};
$dynamic("is$html_Element").Element = function(){return true};
$dynamic("get$attributes").Element = function() {
  return new _ElementAttributeMap(this);
}
$dynamic("get$classes").Element = function() {
  return new _CssClassSet(this);
}
$dynamic("get$on").Element = function() {
  return new _ElementEventsImpl(this);
}
$dynamic("get$$$dom_className").Element = function() {
  return this.className;
}
$dynamic("set$$$dom_className").Element = function(value) {
  this.className = value;
}
$dynamic("get$id").Element = function() { return this.id; };
$dynamic("get$$$dom_lastElementChild").Element = function() {
  return this.lastElementChild;
}
$dynamic("get$click").Element = function() {
  return this.click.bind(this);
}
$dynamic("query$1").Element = function($0) {
  return this.querySelector($0);
};
$dynamic("$dom_addEventListener$3").AbstractWorker = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").AbstractWorker = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
function _EventsImpl(_ptr) {
  this._ptr = _ptr;
}
_EventsImpl.prototype.get$_ptr = function() { return this._ptr; };
_EventsImpl.prototype.$index = function(type) {
  return this._get(type.toLowerCase());
}
_EventsImpl.prototype._get = function(type) {
  return new _EventListenerListImpl(this._ptr, type);
}
$inherits(_AbstractWorkerEventsImpl, _EventsImpl);
function _AbstractWorkerEventsImpl() {}
$dynamic("get$name").HTMLAnchorElement = function() { return this.name; };
$dynamic("get$name").WebKitAnimation = function() { return this.name; };
$dynamic("get$length").WebKitAnimationList = function() { return this.length; };
$dynamic("get$name").HTMLAppletElement = function() { return this.name; };
$dynamic("get$name").Attr = function() { return this.name; };
$dynamic("get$value").Attr = function() { return this.value; };
$dynamic("set$value").Attr = function(value) { return this.value = value; };
$dynamic("get$length").AudioBuffer = function() { return this.length; };
$inherits(_AudioContextEventsImpl, _EventsImpl);
function _AudioContextEventsImpl() {}
$dynamic("get$on").HTMLMediaElement = function() {
  return new _MediaElementEventsImpl(this);
}
$dynamic("get$name").AudioParam = function() { return this.name; };
$dynamic("get$value").AudioParam = function() { return this.value; };
$dynamic("set$value").AudioParam = function(value) { return this.value = value; };
$dynamic("$dom_addEventListener$3").BatteryManager = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").BatteryManager = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_BatteryManagerEventsImpl, _EventsImpl);
function _BatteryManagerEventsImpl() {}
$dynamic("get$on").HTMLBodyElement = function() {
  return new _BodyElementEventsImpl(this);
}
$inherits(_ElementEventsImpl, _EventsImpl);
function _ElementEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_ElementEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
$inherits(_BodyElementEventsImpl, _ElementEventsImpl);
function _BodyElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
$dynamic("get$name").HTMLButtonElement = function() { return this.name; };
$dynamic("get$value").HTMLButtonElement = function() { return this.value; };
$dynamic("set$value").HTMLButtonElement = function(value) { return this.value = value; };
$dynamic("get$length").CharacterData = function() { return this.length; };
$dynamic("get$name").WebKitCSSKeyframesRule = function() { return this.name; };
$dynamic("get$length").CSSRuleList = function() { return this.length; };
$dynamic("get$length").CSSStyleDeclaration = function() { return this.length; };
$dynamic("get$length").CSSValueList = function() { return this.length; };
$dynamic("get$length").ClientRectList = function() { return this.length; };
var _ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$dynamic("$dom_addEventListener$3").DOMApplicationCache = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").DOMApplicationCache = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_DOMApplicationCacheEventsImpl, _EventsImpl);
function _DOMApplicationCacheEventsImpl() {}
$dynamic("get$name").DOMException = function() { return this.name; };
$dynamic("get$name").DOMFileSystem = function() { return this.name; };
$dynamic("get$name").DOMFileSystemSync = function() { return this.name; };
$dynamic("get$length").DOMMimeTypeArray = function() { return this.length; };
$dynamic("get$length").DOMPlugin = function() { return this.length; };
$dynamic("get$name").DOMPlugin = function() { return this.name; };
$dynamic("get$length").DOMPluginArray = function() { return this.length; };
$dynamic("get$length").DOMTokenList = function() { return this.length; };
$dynamic("add$1").DOMTokenList = function($0) {
  return this.add($0);
};
$dynamic("contains$1").DOMTokenList = function($0) {
  return this.contains($0);
};
$dynamic("remove$1").DOMTokenList = function($0) {
  return this.remove($0);
};
$dynamic("get$value").DOMSettableTokenList = function() { return this.value; };
$dynamic("set$value").DOMSettableTokenList = function(value) { return this.value = value; };
$dynamic("is$List").DOMStringList = function(){return true};
$dynamic("is$Collection").DOMStringList = function(){return true};
$dynamic("get$length").DOMStringList = function() { return this.length; };
$dynamic("$index").DOMStringList = function(index) {
  return this[index];
}
$dynamic("$setindex").DOMStringList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").DOMStringList = function() {
  return new _FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").DOMStringList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").DOMStringList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").DOMStringList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").DOMStringList = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").DOMStringList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").DOMStringList = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").DOMStringList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").DOMStringList = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").DOMStringList = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").DOMStringList = function($0) {
  return this.add($0);
};
$dynamic("contains$1").DOMStringList = function($0) {
  return this.contains($0);
};
$dynamic("filter$1").DOMStringList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").DOMStringList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").DOMStringList = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").DOMStringList = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").DOMStringList = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("get$length").DataTransferItemList = function() { return this.length; };
$dynamic("add$1").DataTransferItemList = function($0) {
  return this.add($0);
};
$dynamic("$dom_addEventListener$3").WorkerContext = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").WorkerContext = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_WorkerContextEventsImpl, _EventsImpl);
function _WorkerContextEventsImpl() {}
$inherits(_DedicatedWorkerContextEventsImpl, _WorkerContextEventsImpl);
function _DedicatedWorkerContextEventsImpl() {}
$dynamic("$dom_addEventListener$3").DeprecatedPeerConnection = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").DeprecatedPeerConnection = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_DeprecatedPeerConnectionEventsImpl, _EventsImpl);
function _DeprecatedPeerConnectionEventsImpl() {}
$dynamic("get$name").Entry = function() { return this.name; };
$dynamic("remove$1").Entry = function($0) {
  return this.remove($wrap_call$0(to$call$0($0)), $wrap_call$1(to$call$1(null)));
};
$dynamic("get$name").EntrySync = function() { return this.name; };
$dynamic("remove$0").EntrySync = function() {
  return this.remove();
};
$dynamic("is$html_Element").HTMLDocument = function(){return true};
$dynamic("get$on").HTMLDocument = function() {
  return new _DocumentEventsImpl(this);
}
$dynamic("query").HTMLDocument = function(selectors) {
  if (const$0005.hasMatch(selectors)) {
    return this.getElementById(selectors.substring((1)));
  }
  return this.$dom_querySelector(selectors);
}
$dynamic("$dom_querySelector").HTMLDocument = function(selectors) {
  return this.querySelector(selectors);
}
$dynamic("query$1").HTMLDocument = function($0) {
  return this.query($0);
};
$inherits(_DocumentEventsImpl, _ElementEventsImpl);
function _DocumentEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
_DocumentEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
_DocumentEventsImpl.prototype.get$touchMove = function() {
  return this._get("touchmove");
}
function FilteredElementList() {}
FilteredElementList.prototype.is$List = function(){return true};
FilteredElementList.prototype.is$Collection = function(){return true};
FilteredElementList.prototype.get$_filtered = function() {
  return ListFactory.ListFactory$from$factory(this._childNodes.filter$1((function (n) {
    return !!(n && n.is$html_Element());
  })
  ));
}
FilteredElementList.prototype.forEach = function(f) {
  this.get$_filtered().forEach$1(f);
}
FilteredElementList.prototype.$setindex = function(index, value) {
  this.$index(index).replaceWith(value);
}
FilteredElementList.prototype.add = function(value) {
  this._childNodes.add(value);
}
FilteredElementList.prototype.get$add = function() {
  return this.add.bind(this);
}
FilteredElementList.prototype.addAll = function(collection) {
  collection.forEach$1(this.get$add());
}
FilteredElementList.prototype.sort = function(compare) {
  $throw(const$0011);
}
FilteredElementList.prototype.clear$_ = function() {
  this._childNodes.clear$_();
}
FilteredElementList.prototype.removeLast = function() {
  var result = this.last();
  if ($ne$(result)) {
    result.remove$0();
  }
  return result;
}
FilteredElementList.prototype.map = function(f) {
  return this.get$_filtered().map$1(f);
}
FilteredElementList.prototype.filter = function(f) {
  return this.get$_filtered().filter$1(f);
}
FilteredElementList.prototype.get$length = function() {
  return this.get$_filtered().get$length();
}
FilteredElementList.prototype.$index = function(index) {
  return this.get$_filtered().$index(index);
}
FilteredElementList.prototype.iterator = function() {
  return this.get$_filtered().iterator();
}
FilteredElementList.prototype.indexOf = function(element, start) {
  return this.get$_filtered().indexOf(element, start);
}
FilteredElementList.prototype.last = function() {
  return this.get$_filtered().last();
}
FilteredElementList.prototype.add$1 = FilteredElementList.prototype.add;
FilteredElementList.prototype.filter$1 = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
FilteredElementList.prototype.forEach$1 = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
FilteredElementList.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
FilteredElementList.prototype.map$1 = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
FilteredElementList.prototype.sort$1 = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
function EmptyElementRect() {}
$dynamic("is$html_Element").DocumentFragment = function(){return true};
$dynamic("get$id").DocumentFragment = function() {
  return "";
}
$dynamic("get$parent").DocumentFragment = function() {
  return null;
}
$dynamic("get$attributes").DocumentFragment = function() {
  return const$0010;
}
$dynamic("get$classes").DocumentFragment = function() {
  return new HashSetImplementation_dart_core_String();
}
$dynamic("click").DocumentFragment = function() {

}
$dynamic("get$click").DocumentFragment = function() {
  return this.click.bind(this);
}
$dynamic("get$on").DocumentFragment = function() {
  return new _ElementEventsImpl(this);
}
$dynamic("query$1").DocumentFragment = function($0) {
  return this.querySelector($0);
};
$dynamic("get$name").DocumentType = function() { return this.name; };
function _ChildrenElementList() {}
_ChildrenElementList.prototype.is$List = function(){return true};
_ChildrenElementList.prototype.is$Collection = function(){return true};
_ChildrenElementList.prototype._toList = function() {
  var output = new Array(this._childElements.get$length());
  for (var i = (0), len = this._childElements.get$length();
   i < len; i++) {
    output.$setindex(i, this._childElements.$index(i));
  }
  return output;
}
_ChildrenElementList.prototype.forEach = function(f) {
  var $$list = this._childElements;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    f(element);
  }
}
_ChildrenElementList.prototype.filter = function(f) {
  var output = [];
  this.forEach((function (element) {
    if (f(element)) {
      output.add$1(element);
    }
  })
  );
  return new _FrozenElementList._wrap$ctor(output);
}
_ChildrenElementList.prototype.map = function(f) {
  var out = [];
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var el = $$i.next();
    out.add$1(f(el));
  }
  return out;
}
_ChildrenElementList.prototype.get$length = function() {
  return this._childElements.get$length();
}
_ChildrenElementList.prototype.$index = function(index) {
  return this._childElements.$index(index);
}
_ChildrenElementList.prototype.$setindex = function(index, value) {
  this._html_element.replaceChild(value, this._childElements.$index(index));
}
_ChildrenElementList.prototype.add = function(value) {
  this._html_element.appendChild(value);
  return value;
}
_ChildrenElementList.prototype.iterator = function() {
  return this._toList().iterator();
}
_ChildrenElementList.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    this._html_element.appendChild(element);
  }
}
_ChildrenElementList.prototype.sort = function(compare) {
  $throw(const$0011);
}
_ChildrenElementList.prototype.indexOf = function(element, start) {
  return _Lists.indexOf(this, element, start, this.get$length());
}
_ChildrenElementList.prototype.clear$_ = function() {
  this._html_element.set$text("");
}
_ChildrenElementList.prototype.removeLast = function() {
  var result = this.last();
  if ($ne$(result)) {
    this._html_element.removeChild(result);
  }
  return result;
}
_ChildrenElementList.prototype.last = function() {
  return this._html_element.get$$$dom_lastElementChild();
}
_ChildrenElementList.prototype.add$1 = _ChildrenElementList.prototype.add;
_ChildrenElementList.prototype.filter$1 = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
_ChildrenElementList.prototype.forEach$1 = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
_ChildrenElementList.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
_ChildrenElementList.prototype.map$1 = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
_ChildrenElementList.prototype.sort$1 = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
_FrozenElementList._wrap$ctor = function(_nodeList) {
  this._nodeList = _nodeList;
}
_FrozenElementList._wrap$ctor.prototype = _FrozenElementList.prototype;
function _FrozenElementList() {}
_FrozenElementList.prototype.is$List = function(){return true};
_FrozenElementList.prototype.is$Collection = function(){return true};
_FrozenElementList.prototype.forEach = function(f) {
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var el = $$i.next();
    f(el);
  }
}
_FrozenElementList.prototype.map = function(f) {
  var out = [];
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var el = $$i.next();
    out.add$1(f(el));
  }
  return out;
}
_FrozenElementList.prototype.filter = function(f) {
  var out = new _ElementList([]);
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var el = $$i.next();
    if (f(el)) out.add$1(el);
  }
  return out;
}
_FrozenElementList.prototype.get$length = function() {
  return this._nodeList.get$length();
}
_FrozenElementList.prototype.$index = function(index) {
  return this._nodeList.$index(index);
}
_FrozenElementList.prototype.$setindex = function(index, value) {
  $throw(const$0003);
}
_FrozenElementList.prototype.add = function(value) {
  $throw(const$0003);
}
_FrozenElementList.prototype.iterator = function() {
  return new _FrozenElementListIterator(this);
}
_FrozenElementList.prototype.addAll = function(collection) {
  $throw(const$0003);
}
_FrozenElementList.prototype.sort = function(compare) {
  $throw(const$0003);
}
_FrozenElementList.prototype.indexOf = function(element, start) {
  return this._nodeList.indexOf(element, start);
}
_FrozenElementList.prototype.clear$_ = function() {
  $throw(const$0003);
}
_FrozenElementList.prototype.removeLast = function() {
  $throw(const$0003);
}
_FrozenElementList.prototype.last = function() {
  return this._nodeList.last();
}
_FrozenElementList.prototype.add$1 = _FrozenElementList.prototype.add;
_FrozenElementList.prototype.filter$1 = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
_FrozenElementList.prototype.forEach$1 = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
_FrozenElementList.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
_FrozenElementList.prototype.map$1 = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
_FrozenElementList.prototype.sort$1 = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
function _FrozenElementListIterator(_list) {
  this._html_index = (0);
  this._html_list = _list;
}
_FrozenElementListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._html_list.$index(this._html_index++);
}
_FrozenElementListIterator.prototype.hasNext = function() {
  return this._html_index < this._html_list.get$length();
}
function _ListWrapper() {}
_ListWrapper.prototype.is$List = function(){return true};
_ListWrapper.prototype.is$Collection = function(){return true};
_ListWrapper.prototype.iterator = function() {
  return this._html_list.iterator();
}
_ListWrapper.prototype.forEach = function(f) {
  return this._html_list.forEach$1(f);
}
_ListWrapper.prototype.map = function(f) {
  return this._html_list.map$1(f);
}
_ListWrapper.prototype.filter = function(f) {
  return this._html_list.filter$1(f);
}
_ListWrapper.prototype.get$length = function() {
  return this._html_list.get$length();
}
_ListWrapper.prototype.$index = function(index) {
  return this._html_list.$index(index);
}
_ListWrapper.prototype.$setindex = function(index, value) {
  this._html_list.$setindex(index, value);
}
_ListWrapper.prototype.add = function(value) {
  return this._html_list.add(value);
}
_ListWrapper.prototype.addAll = function(collection) {
  return this._html_list.addAll(collection);
}
_ListWrapper.prototype.sort = function(compare) {
  return this._html_list.sort$1(compare);
}
_ListWrapper.prototype.indexOf = function(element, start) {
  return this._html_list.indexOf(element, start);
}
_ListWrapper.prototype.clear$_ = function() {
  return this._html_list.clear$_();
}
_ListWrapper.prototype.removeLast = function() {
  return this._html_list.removeLast();
}
_ListWrapper.prototype.last = function() {
  return this._html_list.last();
}
_ListWrapper.prototype.add$1 = _ListWrapper.prototype.add;
_ListWrapper.prototype.filter$1 = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
_ListWrapper.prototype.forEach$1 = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
_ListWrapper.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
_ListWrapper.prototype.map$1 = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
_ListWrapper.prototype.sort$1 = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$inherits(_ListWrapper_Element, _ListWrapper);
function _ListWrapper_Element(_list) {
  this._html_list = _list;
}
_ListWrapper_Element.prototype.add$1 = _ListWrapper_Element.prototype.add;
_ListWrapper_Element.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
_ListWrapper_Element.prototype.map$1 = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
_ListWrapper_Element.prototype.sort$1 = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$inherits(_ElementList, _ListWrapper_Element);
function _ElementList(list) {
  _ListWrapper_Element.call(this, list);
}
_ElementList.prototype.filter = function(f) {
  return new _ElementList(_ListWrapper_Element.prototype.filter.call(this, f));
}
_ElementList.prototype.filter$1 = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
function _ElementAttributeMap(_element) {
  this._html_element = _element;
}
_ElementAttributeMap.prototype.is$Map = function(){return true};
_ElementAttributeMap.prototype.containsKey = function(key) {
  return this._html_element.hasAttribute(key);
}
_ElementAttributeMap.prototype.$index = function(key) {
  return this._html_element.getAttribute(key);
}
_ElementAttributeMap.prototype.$setindex = function(key, value) {
  this._html_element.setAttribute(key, ("" + value));
}
_ElementAttributeMap.prototype.remove = function(key) {
  var value = this._html_element.getAttribute(key);
  this._html_element.removeAttribute(key);
  return value;
}
_ElementAttributeMap.prototype.forEach = function(f) {
  var attributes = this._html_element.get$$$dom_attributes();
  for (var i = (0), len = attributes.get$length();
   i < len; i++) {
    var item = attributes.$index(i);
    f(item.get$name(), item.get$value());
  }
}
_ElementAttributeMap.prototype.get$length = function() {
  return this._html_element.get$$$dom_attributes().length;
}
_ElementAttributeMap.prototype.forEach$1 = function($0) {
  return this.forEach($wrap_call$2(to$call$2($0)));
};
_ElementAttributeMap.prototype.remove$1 = _ElementAttributeMap.prototype.remove;
function _DataAttributeMap() {}
_DataAttributeMap.prototype.is$Map = function(){return true};
_DataAttributeMap.prototype.containsKey = function(key) {
  return this.$$dom_attributes.containsKey(this._attr(key));
}
_DataAttributeMap.prototype.$index = function(key) {
  return this.$$dom_attributes.$index(this._attr(key));
}
_DataAttributeMap.prototype.$setindex = function(key, value) {
  this.$$dom_attributes.$setindex(this._attr(key), ("" + value));
}
_DataAttributeMap.prototype.remove = function(key) {
  return this.$$dom_attributes.remove(this._attr(key));
}
_DataAttributeMap.prototype.forEach = function(f) {
  var $this = this;
  this.$$dom_attributes.forEach$1((function (key, value) {
    if ($this._matches(key)) {
      f($this._strip(key), value);
    }
  })
  );
}
_DataAttributeMap.prototype.getKeys = function() {
  var $this = this;
  var keys = new Array();
  this.$$dom_attributes.forEach$1((function (key, value) {
    if ($this._matches(key)) {
      keys.add$1($this._strip(key));
    }
  })
  );
  return keys;
}
_DataAttributeMap.prototype.get$length = function() {
  return this.getKeys().get$length();
}
_DataAttributeMap.prototype._attr = function(key) {
  return ("data-" + key);
}
_DataAttributeMap.prototype._matches = function(key) {
  return key.startsWith("data-");
}
_DataAttributeMap.prototype._strip = function(key) {
  return key.substring((5));
}
_DataAttributeMap.prototype.forEach$1 = function($0) {
  return this.forEach($wrap_call$2(to$call$2($0)));
};
_DataAttributeMap.prototype.remove$1 = _DataAttributeMap.prototype.remove;
function _CssClassSet(_element) {
  this._html_element = _element;
}
_CssClassSet.prototype.is$Collection = function(){return true};
_CssClassSet.prototype.toString = function() {
  return this._formatSet(this._read());
}
_CssClassSet.prototype.iterator = function() {
  return this._read().iterator();
}
_CssClassSet.prototype.forEach = function(f) {
  this._read().forEach$1(f);
}
_CssClassSet.prototype.map = function(f) {
  return this._read().map$1(f);
}
_CssClassSet.prototype.filter = function(f) {
  return this._read().filter$1(f);
}
_CssClassSet.prototype.get$length = function() {
  return this._read().get$length();
}
_CssClassSet.prototype.contains = function(value) {
  return this._read().contains(value);
}
_CssClassSet.prototype.add = function(value) {
  this._modify((function (s) {
    return s.add$1(value);
  })
  );
}
_CssClassSet.prototype.remove = function(value) {
  var s = this._read();
  var result = s.remove(value);
  this._write(s);
  return result;
}
_CssClassSet.prototype.addAll = function(collection) {
  this._modify((function (s) {
    return s.addAll(collection);
  })
  );
}
_CssClassSet.prototype._modify = function(f) {
  var s = this._read();
  f(s);
  this._write(s);
}
_CssClassSet.prototype._read = function() {
  var s = new HashSetImplementation_dart_core_String();
  var $$list = this._classname().split$_(" ");
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var name = $$i.next();
    var trimmed = name.trim();
    if (!trimmed.isEmpty()) {
      s.add(trimmed);
    }
  }
  return s;
}
_CssClassSet.prototype._classname = function() {
  return this._html_element.get$$$dom_className();
}
_CssClassSet.prototype._write = function(s) {
  this._html_element.set$$$dom_className(this._formatSet(s));
}
_CssClassSet.prototype._formatSet = function(s) {
  var list = ListFactory.ListFactory$from$factory(s);
  return Strings.join(list, " ");
}
_CssClassSet.prototype.add$1 = _CssClassSet.prototype.add;
_CssClassSet.prototype.contains$1 = _CssClassSet.prototype.contains;
_CssClassSet.prototype.filter$1 = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
_CssClassSet.prototype.forEach$1 = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
_CssClassSet.prototype.map$1 = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
_CssClassSet.prototype.remove$1 = _CssClassSet.prototype.remove;
function _SimpleClientRect() {}
_SimpleClientRect.prototype.$eq = function(other) {
  return null != other && this.left == other.left && this.top == other.top && this.width == other.width && this.height == other.height;
}
_SimpleClientRect.prototype.toString = function() {
  return ("(" + this.left + ", " + this.top + ", " + this.width + ", " + this.height + ")");
}
function _ElementRectImpl() {}
function _ElementFactoryProvider() {}
_ElementFactoryProvider.Element$tag$factory = function(tag) {
  return document.createElement(tag)
}
$dynamic("get$name").HTMLEmbedElement = function() { return this.name; };
$dynamic("get$length").EntryArray = function() { return this.length; };
$dynamic("get$length").EntryArraySync = function() { return this.length; };
$dynamic("get$name").EventException = function() { return this.name; };
$dynamic("$dom_addEventListener$3").EventSource = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").EventSource = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_EventSourceEventsImpl, _EventsImpl);
function _EventSourceEventsImpl() {}
function _EventListenerListImpl(_ptr, _type) {
  this._ptr = _ptr;
  this._type = _type;
}
_EventListenerListImpl.prototype.get$_ptr = function() { return this._ptr; };
_EventListenerListImpl.prototype.add = function(listener, useCapture) {
  this._add(listener, useCapture);
  return this;
}
_EventListenerListImpl.prototype.remove = function(listener, useCapture) {
  this._remove(listener, useCapture);
  return this;
}
_EventListenerListImpl.prototype._add = function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
}
_EventListenerListImpl.prototype._remove = function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
}
_EventListenerListImpl.prototype.add$1 = function($0) {
  return this.add($wrap_call$1(to$call$1($0)), false);
};
_EventListenerListImpl.prototype.remove$1 = function($0) {
  return this.remove($wrap_call$1(to$call$1($0)), false);
};
$dynamic("get$name").HTMLFieldSetElement = function() { return this.name; };
$dynamic("get$name").File = function() { return this.name; };
$dynamic("get$name").FileException = function() { return this.name; };
$dynamic("is$List").FileList = function(){return true};
$dynamic("is$Collection").FileList = function(){return true};
$dynamic("get$length").FileList = function() { return this.length; };
$dynamic("$index").FileList = function(index) {
  return this[index];
}
$dynamic("$setindex").FileList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").FileList = function() {
  return new _FixedSizeListIterator_html_File(this);
}
$dynamic("add").FileList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").FileList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").FileList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").FileList = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").FileList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").FileList = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").FileList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").FileList = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").FileList = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").FileList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").FileList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").FileList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").FileList = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").FileList = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").FileList = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("$dom_addEventListener$3").FileReader = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").FileReader = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_FileReaderEventsImpl, _EventsImpl);
function _FileReaderEventsImpl() {}
$dynamic("get$length").FileWriter = function() { return this.length; };
$dynamic("$dom_addEventListener$3").FileWriter = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").FileWriter = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_FileWriterEventsImpl, _EventsImpl);
function _FileWriterEventsImpl() {}
$dynamic("get$length").FileWriterSync = function() { return this.length; };
$dynamic("is$List").Float32Array = function(){return true};
$dynamic("is$Collection").Float32Array = function(){return true};
$dynamic("get$length").Float32Array = function() { return this.length; };
$dynamic("$index").Float32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float32Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").Float32Array = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").Float32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").Float32Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Float32Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Float32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").Float32Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").Float32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Float32Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Float32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").Float32Array = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").Float32Array = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Float32Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("is$List").Float64Array = function(){return true};
$dynamic("is$Collection").Float64Array = function(){return true};
$dynamic("get$length").Float64Array = function() { return this.length; };
$dynamic("$index").Float64Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float64Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float64Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float64Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float64Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float64Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").Float64Array = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").Float64Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").Float64Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Float64Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Float64Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").Float64Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").Float64Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Float64Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Float64Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").Float64Array = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").Float64Array = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Float64Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("get$length").HTMLFormElement = function() { return this.length; };
$dynamic("get$name").HTMLFormElement = function() { return this.name; };
$dynamic("get$name").HTMLFrameElement = function() { return this.name; };
$dynamic("get$on").HTMLFrameSetElement = function() {
  return new _FrameSetElementEventsImpl(this);
}
$inherits(_FrameSetElementEventsImpl, _ElementEventsImpl);
function _FrameSetElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
$dynamic("get$length").HTMLAllCollection = function() { return this.length; };
$dynamic("is$List").HTMLCollection = function(){return true};
$dynamic("is$Collection").HTMLCollection = function(){return true};
$dynamic("get$length").HTMLCollection = function() { return this.length; };
$dynamic("$index").HTMLCollection = function(index) {
  return this[index];
}
$dynamic("$setindex").HTMLCollection = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").HTMLCollection = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").HTMLCollection = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").HTMLCollection = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").HTMLCollection = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").HTMLCollection = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").HTMLCollection = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").HTMLCollection = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").HTMLCollection = function(element, start) {
  return _Lists.indexOf(this, element, start, this.get$length());
}
$dynamic("last").HTMLCollection = function() {
  return this.$index(this.get$length() - (1));
}
$dynamic("removeLast").HTMLCollection = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").HTMLCollection = function($0) {
  return this.add($0);
};
$dynamic("filter$1").HTMLCollection = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").HTMLCollection = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").HTMLCollection = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").HTMLCollection = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").HTMLCollection = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
$dynamic("remove$1").HTMLOptionsCollection = function($0) {
  return this.remove($0);
};
$dynamic("get$length").History = function() { return this.length; };
$dynamic("get$value").IDBCursorWithValue = function() { return this.value; };
$dynamic("get$name").IDBDatabase = function() { return this.name; };
$dynamic("$dom_addEventListener$3").IDBDatabase = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").IDBDatabase = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_IDBDatabaseEventsImpl, _EventsImpl);
function _IDBDatabaseEventsImpl() {}
$dynamic("get$name").IDBDatabaseException = function() { return this.name; };
$dynamic("get$name").IDBIndex = function() { return this.name; };
$dynamic("get$name").IDBObjectStore = function() { return this.name; };
$dynamic("add$1").IDBObjectStore = function($0) {
  return this.add($0);
};
$dynamic("$dom_addEventListener$3").IDBRequest = function($0, $1, $2) {
  if (Object.getPrototypeOf(this).hasOwnProperty("$dom_addEventListener$3")) {
    return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
  }
  return Object.prototype.$dom_addEventListener$3.call(this, $0, $1, $2);
};
$dynamic("$dom_removeEventListener$3").IDBRequest = function($0, $1, $2) {
  if (Object.getPrototypeOf(this).hasOwnProperty("$dom_removeEventListener$3")) {
    return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
  }
  return Object.prototype.$dom_removeEventListener$3.call(this, $0, $1, $2);
};
$inherits(_IDBRequestEventsImpl, _EventsImpl);
function _IDBRequestEventsImpl() {}
$dynamic("$dom_addEventListener$3").IDBTransaction = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").IDBTransaction = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_IDBTransactionEventsImpl, _EventsImpl);
function _IDBTransactionEventsImpl() {}
$dynamic("$dom_addEventListener$3").IDBVersionChangeRequest = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").IDBVersionChangeRequest = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_IDBVersionChangeRequestEventsImpl, _IDBRequestEventsImpl);
function _IDBVersionChangeRequestEventsImpl() {}
$dynamic("get$name").HTMLIFrameElement = function() { return this.name; };
$dynamic("get$name").HTMLImageElement = function() { return this.name; };
$dynamic("get$on").HTMLInputElement = function() {
  return new _InputElementEventsImpl(this);
}
$dynamic("get$name").HTMLInputElement = function() { return this.name; };
$dynamic("get$value").HTMLInputElement = function() { return this.value; };
$dynamic("set$value").HTMLInputElement = function(value) { return this.value = value; };
$inherits(_InputElementEventsImpl, _ElementEventsImpl);
function _InputElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
$dynamic("is$List").Int16Array = function(){return true};
$dynamic("is$Collection").Int16Array = function(){return true};
$dynamic("get$length").Int16Array = function() { return this.length; };
$dynamic("$index").Int16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int16Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").Int16Array = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").Int16Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").Int16Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Int16Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Int16Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").Int16Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").Int16Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int16Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Int16Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").Int16Array = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").Int16Array = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Int16Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("is$List").Int32Array = function(){return true};
$dynamic("is$Collection").Int32Array = function(){return true};
$dynamic("get$length").Int32Array = function() { return this.length; };
$dynamic("$index").Int32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").Int32Array = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").Int32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").Int32Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Int32Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Int32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").Int32Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").Int32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int32Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Int32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").Int32Array = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").Int32Array = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Int32Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("is$List").Int8Array = function(){return true};
$dynamic("is$Collection").Int8Array = function(){return true};
$dynamic("get$length").Int8Array = function() { return this.length; };
$dynamic("$index").Int8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int8Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").Int8Array = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").Int8Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").Int8Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Int8Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Int8Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").Int8Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").Int8Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int8Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Int8Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").Int8Array = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").Int8Array = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Int8Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("$dom_addEventListener$3").JavaScriptAudioNode = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").JavaScriptAudioNode = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_JavaScriptAudioNodeEventsImpl, _EventsImpl);
function _JavaScriptAudioNodeEventsImpl() {}
$dynamic("get$name").HTMLKeygenElement = function() { return this.name; };
$dynamic("get$value").HTMLLIElement = function() { return this.value; };
$dynamic("set$value").HTMLLIElement = function(value) { return this.value = value; };
$dynamic("$dom_addEventListener$3").MediaStream = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").MediaStream = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("get$name").HTMLMapElement = function() { return this.name; };
$dynamic("start$0").HTMLMarqueeElement = function() {
  return this.start();
};
$dynamic("$dom_addEventListener$3").MediaController = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").MediaController = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_MediaElementEventsImpl, _ElementEventsImpl);
function _MediaElementEventsImpl(_ptr) {
  _ElementEventsImpl.call(this, _ptr);
}
$dynamic("is$List").MediaList = function(){return true};
$dynamic("is$Collection").MediaList = function(){return true};
$dynamic("get$length").MediaList = function() { return this.length; };
$dynamic("$index").MediaList = function(index) {
  return this[index];
}
$dynamic("$setindex").MediaList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").MediaList = function() {
  return new _FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").MediaList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").MediaList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").MediaList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").MediaList = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").MediaList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").MediaList = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").MediaList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").MediaList = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").MediaList = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").MediaList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").MediaList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").MediaList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").MediaList = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").MediaList = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").MediaList = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$inherits(_MediaStreamEventsImpl, _EventsImpl);
function _MediaStreamEventsImpl() {}
$dynamic("get$length").MediaStreamList = function() { return this.length; };
$dynamic("get$length").MediaStreamTrackList = function() { return this.length; };
$dynamic("$dom_addEventListener$3").MessagePort = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").MessagePort = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("start$0").MessagePort = function() {
  return this.start();
};
$inherits(_MessagePortEventsImpl, _EventsImpl);
function _MessagePortEventsImpl() {}
$dynamic("get$name").HTMLMetaElement = function() { return this.name; };
$dynamic("get$value").HTMLMeterElement = function() { return this.value; };
$dynamic("set$value").HTMLMeterElement = function(value) { return this.value = value; };
$dynamic("is$List").NamedNodeMap = function(){return true};
$dynamic("is$Collection").NamedNodeMap = function(){return true};
$dynamic("get$length").NamedNodeMap = function() { return this.length; };
$dynamic("$index").NamedNodeMap = function(index) {
  return this[index];
}
$dynamic("$setindex").NamedNodeMap = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NamedNodeMap = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").NamedNodeMap = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").NamedNodeMap = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").NamedNodeMap = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").NamedNodeMap = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").NamedNodeMap = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").NamedNodeMap = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").NamedNodeMap = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").NamedNodeMap = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").NamedNodeMap = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").NamedNodeMap = function($0) {
  return this.add($0);
};
$dynamic("filter$1").NamedNodeMap = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").NamedNodeMap = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").NamedNodeMap = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").NamedNodeMap = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").NamedNodeMap = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
function _ChildNodeListLazy(_this) {
  this._this = _this;
}
_ChildNodeListLazy.prototype.is$List = function(){return true};
_ChildNodeListLazy.prototype.is$Collection = function(){return true};
_ChildNodeListLazy.prototype.last = function() {
  return this._this.lastChild;
}
_ChildNodeListLazy.prototype.add = function(value) {
  this._this.appendChild(value);
}
_ChildNodeListLazy.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var node = $$i.next();
    this._this.appendChild(node);
  }
}
_ChildNodeListLazy.prototype.removeLast = function() {
  var result = this.last();
  if ($ne$(result)) {
    this._this.removeChild(result);
  }
  return result;
}
_ChildNodeListLazy.prototype.clear$_ = function() {
  this._this.set$text("");
}
_ChildNodeListLazy.prototype.$setindex = function(index, value) {
  this._this.replaceChild(value, this.$index(index));
}
_ChildNodeListLazy.prototype.iterator = function() {
  return this._this.get$$$dom_childNodes().iterator();
}
_ChildNodeListLazy.prototype.forEach = function(f) {
  return _Collections.forEach(this, f);
}
_ChildNodeListLazy.prototype.map = function(f) {
  return _Collections.map(this, [], f);
}
_ChildNodeListLazy.prototype.filter = function(f) {
  return new _NodeListWrapper(_Collections.filter(this, [], f));
}
_ChildNodeListLazy.prototype.sort = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
_ChildNodeListLazy.prototype.indexOf = function(element, start) {
  return _Lists.indexOf(this, element, start, this.get$length());
}
_ChildNodeListLazy.prototype.get$length = function() {
  return this._this.get$$$dom_childNodes().length;
}
_ChildNodeListLazy.prototype.$index = function(index) {
  return this._this.get$$$dom_childNodes().$index(index);
}
_ChildNodeListLazy.prototype.add$1 = _ChildNodeListLazy.prototype.add;
_ChildNodeListLazy.prototype.filter$1 = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
_ChildNodeListLazy.prototype.forEach$1 = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
_ChildNodeListLazy.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
_ChildNodeListLazy.prototype.map$1 = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
_ChildNodeListLazy.prototype.sort$1 = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$inherits(_ListWrapper_Node, _ListWrapper);
function _ListWrapper_Node(_list) {
  this._html_list = _list;
}
_ListWrapper_Node.prototype.add$1 = _ListWrapper_Node.prototype.add;
_ListWrapper_Node.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
_ListWrapper_Node.prototype.map$1 = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
_ListWrapper_Node.prototype.sort$1 = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$inherits(_NodeListWrapper, _ListWrapper_Node);
function _NodeListWrapper(list) {
  _ListWrapper_Node.call(this, list);
}
_NodeListWrapper.prototype.filter = function(f) {
  return new _NodeListWrapper(this._html_list.filter$1(f));
}
_NodeListWrapper.prototype.filter$1 = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("is$List").NodeList = function(){return true};
$dynamic("is$Collection").NodeList = function(){return true};
$dynamic("iterator").NodeList = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").NodeList = function(value) {
  this._parent.appendChild(value);
}
$dynamic("addAll").NodeList = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var node = $$i.next();
    this._parent.appendChild(node);
  }
}
$dynamic("removeLast").NodeList = function() {
  var result = this.last();
  if ($ne$(result)) {
    this._parent.removeChild(result);
  }
  return result;
}
$dynamic("clear$_").NodeList = function() {
  this._parent.set$text("");
}
$dynamic("$setindex").NodeList = function(index, value) {
  this._parent.replaceChild(value, this.$index(index));
}
$dynamic("forEach").NodeList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").NodeList = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").NodeList = function(f) {
  return new _NodeListWrapper(_Collections.filter(this, [], f));
}
$dynamic("sort").NodeList = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").NodeList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").NodeList = function() {
  return this.$index(this.length - (1));
}
$dynamic("get$length").NodeList = function() { return this.length; };
$dynamic("$index").NodeList = function(index) {
  return this[index];
}
$dynamic("add$1").NodeList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").NodeList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").NodeList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").NodeList = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").NodeList = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").NodeList = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("query$1").NodeSelector = function($0) {
  return this.querySelector($0);
};
$inherits(_NotificationEventsImpl, _EventsImpl);
function _NotificationEventsImpl() {}
_NotificationEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
$dynamic("get$name").HTMLObjectElement = function() { return this.name; };
$dynamic("get$name").OperationNotAllowedException = function() { return this.name; };
$dynamic("get$value").HTMLOptionElement = function() { return this.value; };
$dynamic("set$value").HTMLOptionElement = function(value) { return this.value = value; };
$dynamic("get$name").HTMLOutputElement = function() { return this.name; };
$dynamic("get$value").HTMLOutputElement = function() { return this.value; };
$dynamic("set$value").HTMLOutputElement = function(value) { return this.value = value; };
$dynamic("get$name").HTMLParamElement = function() { return this.name; };
$dynamic("get$value").HTMLParamElement = function() { return this.value; };
$dynamic("set$value").HTMLParamElement = function(value) { return this.value = value; };
$dynamic("$dom_addEventListener$3").PeerConnection00 = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").PeerConnection00 = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_PeerConnection00EventsImpl, _EventsImpl);
function _PeerConnection00EventsImpl() {}
$dynamic("get$value").HTMLProgressElement = function() { return this.value; };
$dynamic("set$value").HTMLProgressElement = function(value) { return this.value = value; };
$dynamic("get$value").RadioNodeList = function() { return this.value; };
$dynamic("set$value").RadioNodeList = function(value) { return this.value = value; };
$dynamic("get$name").RangeException = function() { return this.name; };
$dynamic("get$length").SQLResultSetRowList = function() { return this.length; };
$dynamic("get$classes").SVGElement = function() {
  if (null == this.noSuchMethod("get:_cssClassSet", [])) {
    this.noSuchMethod("set:_cssClassSet", [new _AttributeClassSet(this.get$_ptr())]);
  }
  return this.noSuchMethod("get:_cssClassSet", []);
}
$dynamic("get$id").SVGElement = function() {
  return this.id;
}
$dynamic("get$value").SVGAngle = function() { return this.value; };
$dynamic("set$value").SVGAngle = function(value) { return this.value = value; };
$inherits(_AttributeClassSet, _CssClassSet);
function _AttributeClassSet(element) {
  _CssClassSet.call(this, element);
}
_AttributeClassSet.prototype._write = function(s) {
  this._html_element.get$attributes().$setindex("class", this._formatSet(s));
}
$inherits(_SVGElementInstanceEventsImpl, _EventsImpl);
function _SVGElementInstanceEventsImpl() {}
_SVGElementInstanceEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
$dynamic("get$length").SVGElementInstanceList = function() { return this.length; };
$dynamic("get$name").SVGException = function() { return this.name; };
$dynamic("get$value").SVGLength = function() { return this.value; };
$dynamic("set$value").SVGLength = function(value) { return this.value = value; };
$dynamic("get$value").SVGNumber = function() { return this.value; };
$dynamic("set$value").SVGNumber = function(value) { return this.value = value; };
$dynamic("get$length").HTMLSelectElement = function() { return this.length; };
$dynamic("get$name").HTMLSelectElement = function() { return this.name; };
$dynamic("get$value").HTMLSelectElement = function() { return this.value; };
$dynamic("set$value").HTMLSelectElement = function(value) { return this.value = value; };
$dynamic("get$name").SharedWorkerContext = function() { return this.name; };
$inherits(_SharedWorkerContextEventsImpl, _WorkerContextEventsImpl);
function _SharedWorkerContextEventsImpl() {}
$dynamic("get$length").SpeechGrammarList = function() { return this.length; };
$dynamic("get$length").SpeechInputResultList = function() { return this.length; };
$dynamic("$dom_addEventListener$3").SpeechRecognition = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").SpeechRecognition = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("start$0").SpeechRecognition = function() {
  return this.start();
};
$inherits(_SpeechRecognitionEventsImpl, _EventsImpl);
function _SpeechRecognitionEventsImpl() {}
$dynamic("get$length").SpeechRecognitionResult = function() { return this.length; };
$dynamic("get$length").SpeechRecognitionResultList = function() { return this.length; };
$dynamic("is$Map").Storage = function(){return true};
$dynamic("containsKey").Storage = function(key) {
  return this.getItem(key) != null;
}
$dynamic("$index").Storage = function(key) {
  return this.getItem(key);
}
$dynamic("$setindex").Storage = function(key, value) {
  return this.setItem(key, value);
}
$dynamic("remove").Storage = function(key) {
  var value = this.$index(key);
  this.removeItem(key);
  return value;
}
$dynamic("forEach").Storage = function(f) {
  for (var i = (0);
   true; i = $add$(i, (1))) {
    var key = this.key(i);
    if ($eq$(key)) return;
    f(key, this.$index(key));
  }
}
$dynamic("get$length").Storage = function() {
  return this.get$$$dom_length();
}
$dynamic("get$$$dom_length").Storage = function() {
  return this.length;
}
$dynamic("forEach$1").Storage = function($0) {
  return this.forEach($wrap_call$2(to$call$2($0)));
};
$dynamic("remove$1").Storage = function($0) {
  return this.remove($0);
};
$dynamic("is$List").StyleSheetList = function(){return true};
$dynamic("is$Collection").StyleSheetList = function(){return true};
$dynamic("get$length").StyleSheetList = function() { return this.length; };
$dynamic("$index").StyleSheetList = function(index) {
  return this[index];
}
$dynamic("$setindex").StyleSheetList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").StyleSheetList = function() {
  return new _FixedSizeListIterator_html_StyleSheet(this);
}
$dynamic("add").StyleSheetList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").StyleSheetList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").StyleSheetList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").StyleSheetList = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").StyleSheetList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").StyleSheetList = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").StyleSheetList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").StyleSheetList = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").StyleSheetList = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").StyleSheetList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").StyleSheetList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").StyleSheetList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").StyleSheetList = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").StyleSheetList = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").StyleSheetList = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("get$name").HTMLTextAreaElement = function() { return this.name; };
$dynamic("get$value").HTMLTextAreaElement = function() { return this.value; };
$dynamic("set$value").HTMLTextAreaElement = function(value) { return this.value = value; };
$dynamic("$dom_addEventListener$3").TextTrack = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").TextTrack = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_TextTrackEventsImpl, _EventsImpl);
function _TextTrackEventsImpl() {}
$dynamic("get$id").TextTrackCue = function() { return this.id; };
$dynamic("$dom_addEventListener$3").TextTrackCue = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").TextTrackCue = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_TextTrackCueEventsImpl, _EventsImpl);
function _TextTrackCueEventsImpl() {}
$dynamic("get$length").TextTrackCueList = function() { return this.length; };
$dynamic("get$length").TextTrackList = function() { return this.length; };
$dynamic("$dom_addEventListener$3").TextTrackList = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").TextTrackList = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_TextTrackListEventsImpl, _EventsImpl);
function _TextTrackListEventsImpl() {}
$dynamic("get$length").TimeRanges = function() { return this.length; };
$dynamic("is$List").TouchList = function(){return true};
$dynamic("is$Collection").TouchList = function(){return true};
$dynamic("get$length").TouchList = function() { return this.length; };
$dynamic("$index").TouchList = function(index) {
  return this[index];
}
$dynamic("$setindex").TouchList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").TouchList = function() {
  return new _FixedSizeListIterator_html_Touch(this);
}
$dynamic("add").TouchList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").TouchList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").TouchList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").TouchList = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").TouchList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").TouchList = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").TouchList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").TouchList = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").TouchList = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").TouchList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").TouchList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").TouchList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").TouchList = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").TouchList = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").TouchList = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("is$List").Uint16Array = function(){return true};
$dynamic("is$Collection").Uint16Array = function(){return true};
$dynamic("get$length").Uint16Array = function() { return this.length; };
$dynamic("$index").Uint16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint16Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").Uint16Array = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").Uint16Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").Uint16Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Uint16Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Uint16Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").Uint16Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").Uint16Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint16Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Uint16Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").Uint16Array = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").Uint16Array = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Uint16Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("is$List").Uint32Array = function(){return true};
$dynamic("is$Collection").Uint32Array = function(){return true};
$dynamic("get$length").Uint32Array = function() { return this.length; };
$dynamic("$index").Uint32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").Uint32Array = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").Uint32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").Uint32Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Uint32Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Uint32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").Uint32Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").Uint32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint32Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Uint32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").Uint32Array = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").Uint32Array = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Uint32Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("is$List").Uint8Array = function(){return true};
$dynamic("is$Collection").Uint8Array = function(){return true};
$dynamic("get$length").Uint8Array = function() { return this.length; };
$dynamic("$index").Uint8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint8Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("map").Uint8Array = function(f) {
  return _Collections.map(this, [], f);
}
$dynamic("filter").Uint8Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("sort").Uint8Array = function(compare) {
  $throw(new UnsupportedOperationException("Cannot sort immutable List."));
}
$dynamic("indexOf").Uint8Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Uint8Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeLast").Uint8Array = function() {
  $throw(new UnsupportedOperationException("Cannot removeLast on immutable List."));
}
$dynamic("add$1").Uint8Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint8Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Uint8Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
$dynamic("indexOf$1").Uint8Array = function($0) {
  return this.indexOf($0, (0));
};
$dynamic("map$1").Uint8Array = function($0) {
  return this.map($wrap_call$1(to$call$1($0)));
};
$dynamic("sort$1").Uint8Array = function($0) {
  return this.sort($wrap_call$2(to$call$2($0)));
};
$dynamic("get$name").WebGLActiveInfo = function() { return this.name; };
$dynamic("$dom_addEventListener$3").WebSocket = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").WebSocket = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_WebSocketEventsImpl, _EventsImpl);
function _WebSocketEventsImpl() {}
$dynamic("get$length").DOMWindow = function() { return this.length; };
$dynamic("get$name").DOMWindow = function() { return this.name; };
$dynamic("$dom_addEventListener$3").DOMWindow = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").DOMWindow = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_WindowEventsImpl, _EventsImpl);
function _WindowEventsImpl() {}
_WindowEventsImpl.prototype.get$click = function() {
  return this._get("click");
}
$inherits(_WorkerEventsImpl, _AbstractWorkerEventsImpl);
function _WorkerEventsImpl() {}
$dynamic("get$on").XMLHttpRequest = function() {
  return new _XMLHttpRequestEventsImpl(this);
}
$dynamic("$dom_addEventListener$3").XMLHttpRequest = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").XMLHttpRequest = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_XMLHttpRequestEventsImpl, _EventsImpl);
function _XMLHttpRequestEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_XMLHttpRequestEventsImpl.prototype.get$readyStateChange = function() {
  return this._get("readystatechange");
}
$dynamic("get$name").XMLHttpRequestException = function() { return this.name; };
$dynamic("$dom_addEventListener$3").XMLHttpRequestUpload = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("$dom_removeEventListener$3").XMLHttpRequestUpload = function($0, $1, $2) {
  return this.removeEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$inherits(_XMLHttpRequestUploadEventsImpl, _EventsImpl);
function _XMLHttpRequestUploadEventsImpl() {}
$dynamic("get$name").XPathException = function() { return this.name; };
function _AudioElementFactoryProvider() {}
function _CSSMatrixFactoryProvider() {}
function _DOMParserFactoryProvider() {}
function _DOMURLFactoryProvider() {}
function _DeprecatedPeerConnectionFactoryProvider() {}
function _EventSourceFactoryProvider() {}
function _FileReaderFactoryProvider() {}
function _FileReaderSyncFactoryProvider() {}
function _IceCandidateFactoryProvider() {}
function _MediaControllerFactoryProvider() {}
function _MediaStreamFactoryProvider() {}
function _MessageChannelFactoryProvider() {}
function _NotificationFactoryProvider() {}
function _OptionElementFactoryProvider() {}
function _PeerConnection00FactoryProvider() {}
function _SessionDescriptionFactoryProvider() {}
function _ShadowRootFactoryProvider() {}
function _SharedWorkerFactoryProvider() {}
function _SpeechGrammarFactoryProvider() {}
function _SpeechGrammarListFactoryProvider() {}
function _SpeechRecognitionFactoryProvider() {}
function _TextTrackCueFactoryProvider() {}
function _WorkerFactoryProvider() {}
function _XMLHttpRequestFactoryProvider() {}
_XMLHttpRequestFactoryProvider.XMLHttpRequest$factory = function() {
  return new XMLHttpRequest();
}
function _XMLSerializerFactoryProvider() {}
function _XPathEvaluatorFactoryProvider() {}
function _XSLTProcessorFactoryProvider() {}
function _Collections() {}
_Collections.forEach = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    f(e);
  }
}
_Collections.map = function(source, destination, f) {
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    destination.add(f(e));
  }
  return destination;
}
_Collections.filter = function(source, destination, f) {
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (f(e)) destination.add(e);
  }
  return destination;
}
function _XMLHttpRequestUtils() {}
function _MeasurementRequest() {}
_MeasurementRequest.prototype.get$value = function() { return this.value; };
_MeasurementRequest.prototype.set$value = function(value) { return this.value = value; };
function _EventFactoryProvider() {}
function _MouseEventFactoryProvider() {}
function _CSSStyleDeclarationFactoryProvider() {}
function _DocumentFragmentFactoryProvider() {}
function _SVGElementFactoryProvider() {}
function _SVGSVGElementFactoryProvider() {}
function _DOMWindowCrossFrameImpl() {}
_DOMWindowCrossFrameImpl.prototype.get$length = function() {
  return this._window.length;
}
function _AudioContextFactoryProvider() {}
function _PointFactoryProvider() {}
function _WebSocketFactoryProvider() {}
function _TextFactoryProvider() {}
function _IDBKeyRangeFactoryProvider() {}
function _TypedArrayFactoryProvider() {}
function Testing() {}
function _Device() {}
function _VariableSizeListIterator() {}
_VariableSizeListIterator.prototype.hasNext = function() {
  return this._html_array.get$length() > this._html_pos;
}
_VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._html_array.$index(this._html_pos++);
}
$inherits(_FixedSizeListIterator, _VariableSizeListIterator);
function _FixedSizeListIterator() {}
_FixedSizeListIterator.prototype.hasNext = function() {
  return this._html_length > this._html_pos;
}
$inherits(_VariableSizeListIterator_dart_core_String, _VariableSizeListIterator);
function _VariableSizeListIterator_dart_core_String(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_dart_core_String, _FixedSizeListIterator);
function _FixedSizeListIterator_dart_core_String(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_dart_core_String.call(this, array);
}
$inherits(_VariableSizeListIterator_int, _VariableSizeListIterator);
function _VariableSizeListIterator_int(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_int, _FixedSizeListIterator);
function _FixedSizeListIterator_int(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_int.call(this, array);
}
$inherits(_VariableSizeListIterator_num, _VariableSizeListIterator);
function _VariableSizeListIterator_num(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_num, _FixedSizeListIterator);
function _FixedSizeListIterator_num(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_num.call(this, array);
}
$inherits(_VariableSizeListIterator_html_File, _VariableSizeListIterator);
function _VariableSizeListIterator_html_File(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_html_File, _FixedSizeListIterator);
function _FixedSizeListIterator_html_File(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_File.call(this, array);
}
$inherits(_VariableSizeListIterator_html_Node, _VariableSizeListIterator);
function _VariableSizeListIterator_html_Node(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_html_Node, _FixedSizeListIterator);
function _FixedSizeListIterator_html_Node(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_Node.call(this, array);
}
$inherits(_VariableSizeListIterator_html_StyleSheet, _VariableSizeListIterator);
function _VariableSizeListIterator_html_StyleSheet(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_html_StyleSheet, _FixedSizeListIterator);
function _FixedSizeListIterator_html_StyleSheet(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_StyleSheet.call(this, array);
}
$inherits(_VariableSizeListIterator_html_Touch, _VariableSizeListIterator);
function _VariableSizeListIterator_html_Touch(array) {
  this._html_array = array;
  this._html_pos = (0);
}
$inherits(_FixedSizeListIterator_html_Touch, _FixedSizeListIterator);
function _FixedSizeListIterator_html_Touch(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_Touch.call(this, array);
}
function _Lists() {}
_Lists.indexOf = function(a, element, startIndex, endIndex) {
  if (startIndex >= a.get$length()) {
    return (-1);
  }
  if (startIndex < (0)) {
    startIndex = (0);
  }
  for (var i = startIndex;
   i < endIndex; i++) {
    if ($eq$(a.$index(i), element)) {
      return i;
    }
  }
  return (-1);
}
function get$$document() {
  return document;
}
var _cachedBrowserPrefix;
var _pendingRequests;
var _pendingMeasurementFrameCallbacks;
var _JSON = JSON;
function json_JSON() {}
json_JSON.parse = function(str) {
  return _JSON.parse(str, (function (_, obj) {
    var keys = _jsKeys(obj);
    if ($eq$(keys)) return obj;
    var map = new HashMapImplementation();
    for (var $$i = keys.iterator(); $$i.hasNext(); ) {
      var key = $$i.next();
      map.$setindex(key, _getValue(obj, key));
    }
    return map;
  })
  );
}
function _getValue(obj, key) {
  return obj[key]
}
function _jsKeys(obj) {
  if (obj != null && typeof obj == 'object' && !(obj instanceof Array)) {
  return Object.keys(obj);
  }
  return null;
}
function encodeURI$(text) {
  var encodedText = new StringBufferImpl("");
  var whiteList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~*'()#;,/?:@&=+$";
  var hexDigits = "0123456789ABCDEF";
  for (var i = (0);
   i < text.get$length(); i++) {
    if (whiteList.indexOf(text.$index(i)) != (-1)) {
      encodedText.add(text.$index(i));
      continue;
    }
    var charCode = text.charCodeAt(i);
    var byteList = [];
    if (charCode < (128)) {
      byteList.add(charCode);
    }
    else if (charCode < (2048)) {
      byteList.add(charCode >> (6) | (192));
      byteList.add(charCode & (63) | (128));
    }
    else if ((55296) <= charCode && charCode < (56320)) {
      var nextCharCode = text.get$length() == i + (1) ? (0) : text.charCodeAt(i + (1));
      if ((56320) <= nextCharCode && nextCharCode < (57344)) {
        charCode += (64);
        byteList.add(charCode >> (8) & (7) | (240));
        byteList.add(charCode >> (2) & (63) | (128));
        byteList.add(((charCode & (3)) << (4)) | (nextCharCode >> (6) & (15)) | (128));
        byteList.add(nextCharCode & (63) | (128));
      }
      else {
        $throw(new IllegalArgumentException("URI malformed: Orphaned low surrogate."));
      }
      i++;
    }
    else if ((56320) <= charCode && charCode < (57344)) {
      $throw(new IllegalArgumentException("URI malformed: Orphaned high surrogate."));
    }
    else if (charCode < (65536)) {
      byteList.add(charCode >> (12) | (224));
      byteList.add(charCode >> (6) & (63) | (128));
      byteList.add(charCode & (63) | (128));
    }
    for (var i0 = (0);
     i0 < byteList.get$length(); i0++) {
      encodedText.add("%").add(hexDigits[$sar$(byteList.$index(i0), (4))]).add(hexDigits[$bit_and$(byteList.$index(i0), (15))]);
    }
  }
  return encodedText.toString();
}
function encodeURIComponent$(text) {
  text = encodeURI$(text);
  return text.replaceAll("#", "%23").replaceAll(";", "%3B").replaceAll(",", "%2C").replaceAll("/", "%2F").replaceAll("?", "%3F").replaceAll(":", "%3A").replaceAll("@", "%40").replaceAll("&", "%26").replaceAll("=", "%3D").replaceAll("+", "%2B").replaceAll("$", "%24");
}
function AppBuilder() {}
AppBuilder.buildApp = function() {
  if ($globals.AppBuilder_app == null) {
    var errorDisplay = new ErrorDisplay();
    var elementCreator = new ElementCreator();
    var expander = new Expander();
    var loginModel = new LoginModel();
    var loginView = new LoginView();
    var login = new Login(loginModel, loginView);
    var webServiceRequester = new WebServiceRequester(login);
    var activityProvider = new ActivityProvider(errorDisplay, webServiceRequester);
    var timeEntryProvider = new TimeEntryProvider(errorDisplay, webServiceRequester);
    var timeEntryEditorFactory = new TimeEntryEditorFactory(elementCreator, expander, activityProvider);
    var dayDisplayFactory = new DayDisplayFactory(elementCreator, expander, timeEntryEditorFactory);
    var monthDisplayFactory = new MonthDisplayFactory(elementCreator, expander, dayDisplayFactory);
    $globals.AppBuilder_app = new App(activityProvider, timeEntryProvider, monthDisplayFactory);
  }
  return $globals.AppBuilder_app;
}
function App(activityProvider, timeEntryProvider, monthDisplayFactory) {
  this.activityProvider = activityProvider;
  this.timeEntryProvider = timeEntryProvider;
  this.monthDisplayFactory = monthDisplayFactory;
}
App.prototype.start = function() {
  var $this = this;
  this.activityProvider.fetchProjects((function (projects) {
    var currentDay = ZeDate.ZeDate$currentDay$factory();
    $this.timeEntryProvider.fetchTimeEntries(currentDay.month, currentDay.year, (function (month) {
      var monthDisplay = $this.monthDisplayFactory.createMonthDisplay(month);
      get$$document().body.get$nodes().add(monthDisplay.createUI());
    })
    );
  })
  );
}
App.prototype.start$0 = App.prototype.start;
function Login(model, view) {
  this.model = model;
  this.view = view;
}
Login.prototype.loginUserIfNotAlreadyLoggedIn = function(onUserLoggedIn) {
  var $this = this;
  if (this.model.isUserLoggedIn()) {
    onUserLoggedIn(this.model.user);
  }
  else {
    this.view.showLoginDialog((function (userName, password) {
      $this.model.loginUser(userName, password);
      onUserLoggedIn($this.model.user);
    })
    );
  }
}
function LoginView() {

}
LoginView.prototype.showLoginDialog = function(onLoginDialogFinished) {
  var loginDialogContent = _ElementFactoryProvider.Element$tag$factory("div");
  var nameInput = _ElementFactoryProvider.Element$tag$factory("input");
  nameInput.type = "text";
  nameInput.placeholder = "Name";
  nameInput.get$attributes().$setindex("autocapitalize", "off");
  nameInput.get$attributes().$setindex("autocorrect", "off");
  loginDialogContent.get$nodes().add(nameInput);
  var passwordInput = _ElementFactoryProvider.Element$tag$factory("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Passwort";
  loginDialogContent.get$nodes().add(passwordInput);
  var loginDialog = new Dialog("Log Dich in ze ein.", loginDialogContent, "Einloggen", null);
  loginDialog.show((function (pressedButtonText) {
    loginDialog.dispose();
    onLoginDialogFinished(nameInput.value, passwordInput.value);
  })
  );
}
function LoginModel() {

}
LoginModel.prototype.isUserLoggedIn = function() {
  return this.user != null;
}
LoginModel.prototype.loginUser = function(userName, password) {
  this.user = new User(userName, password);
}
function MonthDisplayFactory(elementCreator, expander, dayDisplayFactory) {
  this.elementCreator = elementCreator;
  this.expander = expander;
  this.dayDisplayFactory = dayDisplayFactory;
  this.monthNames = ["Nullember", "Januar", "Februar", "M\xe4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "Dezember"];
}
MonthDisplayFactory.prototype.createMonthDisplay = function(month) {
  var view = new MonthDisplayView(this.elementCreator, this.expander, this.monthNames);
  return new MonthDisplay(month, view, this.dayDisplayFactory);
}
function MonthDisplay(month, view, dayDisplayFactory) {
  this.month = month;
  this.view = view;
  this.dayDisplayFactory = dayDisplayFactory;
}
MonthDisplay.prototype.createUI = function() {
  this.view.createUI();
  this.view.setMonth(this.month.get$month(), this.month.get$year());
  var currentDay = new ZeDate((1), this.month.get$month(), this.month.get$year());
  while (currentDay.month == this.month.get$month()) {
    var dayDisplay = this.dayDisplayFactory.createDayDisplay(currentDay);
    this.view.daysElement.get$nodes().add(dayDisplay.createUI());
    var timeEntries = this.month.timeEntriesFor(currentDay);
    for (var $$i = timeEntries.iterator(); $$i.hasNext(); ) {
      var timeEntry = $$i.next();
      dayDisplay.addTimeEntry(timeEntry);
    }
    currentDay = currentDay.nextDay();
  }
  return this.view.containerElement;
}
function MonthDisplayView(elementCreator, expander, monthNames) {
  this.elementCreator = elementCreator;
  this.expander = expander;
  this.monthNames = monthNames;
}
MonthDisplayView.prototype.createUI = function() {
  this.containerElement = this.elementCreator.createElement$_("div", ["month", "container"]);
  var header = this.elementCreator.createElement$_("div", ["header", "monthHeader"]);
  this.containerElement.get$nodes().add(header);
  this.monthNameElement = this.elementCreator.createElement$_("span", ["monthName"]);
  header.get$nodes().add(this.monthNameElement);
  this.yearElement = this.elementCreator.createElement$_("span", ["year"]);
  header.get$nodes().add(this.yearElement);
  var floatRight = this.elementCreator.createElement$_("span", ["floatRight"]);
  header.get$nodes().add(floatRight);
  var expanderElement = this.elementCreator.createElement$_("span", ["expander"]);
  floatRight.get$nodes().add(expanderElement);
  this.daysElement = this.elementCreator.createElement$_("div", ["days", "content"]);
  this.containerElement.get$nodes().add(this.daysElement);
  this.expander.connect(this.containerElement);
  this.expander.expand(this.containerElement);
}
MonthDisplayView.prototype.setMonth = function(month, year) {
  this.monthNameElement.set$text(this.monthNames.$index(month));
  this.yearElement.set$text(("" + year));
}
function DayDisplayFactory(elementCreator, expander, timeEntryEditorFactory) {
  this.elementCreator = elementCreator;
  this.expander = expander;
  this.timeEntryEditorFactory = timeEntryEditorFactory;
}
DayDisplayFactory.prototype.createDayDisplay = function(day) {
  var view = new DayDisplayView(this.elementCreator, this.expander);
  return new DayDisplay(day, view, this.timeEntryEditorFactory);
}
function DayDisplay(day, view, timeEntryEditorFactory) {
  this.day = day;
  this.view = view;
  this.timeEntryEditorFactory = timeEntryEditorFactory;
}
DayDisplay.prototype.createUI = function() {
  this.view.createUI();
  this.view.set$dayDate(this.day);
  this.view.addEntryButton.get$on().get$click().add$1(this.get$addEntryButtonTouched());
  return this.view.containerElement;
}
DayDisplay.prototype.addTimeEntry = function(timeEntry) {
  var editor = this.timeEntryEditorFactory.createTimeEntryEditor(timeEntry);
  this.view.timeEntriesElement.insertBefore(editor.createUI(), this.view.addEntrySection);
}
DayDisplay.prototype.addEntryButtonTouched = function(event) {
  var newEntry = new TimeEntry.fresh$ctor();
  this.addTimeEntry(newEntry);
}
DayDisplay.prototype.get$addEntryButtonTouched = function() {
  return this.addEntryButtonTouched.bind(this);
}
function DayDisplayView(elementCreator, expander) {
  this.elementCreator = elementCreator;
  this.expander = expander;
}
DayDisplayView.prototype.createUI = function() {
  this.containerElement = this.elementCreator.createElement$_("div", ["day", "container"]);
  var header = this.elementCreator.createElement$_("div", ["header", "dayHeader"]);
  this.containerElement.get$nodes().add(header);
  this.dayDateElement = this.elementCreator.createElement$_("span", ["dayDate"]);
  header.get$nodes().add(this.dayDateElement);
  var floatRight = this.elementCreator.createElement$_("span", ["floatRight"]);
  header.get$nodes().add(floatRight);
  var expanderElement = this.elementCreator.createElement$_("span", ["expander"]);
  floatRight.get$nodes().add(expanderElement);
  this.timeEntriesElement = this.elementCreator.createElement$_("div", ["timeEntries", "content"]);
  this.containerElement.get$nodes().add(this.timeEntriesElement);
  this.addEntrySection = this.elementCreator.createElement$_("div", ["addEntrySection"]);
  this.timeEntriesElement.get$nodes().add(this.addEntrySection);
  this.addEntryButton = this.elementCreator.createElement$_("span", ["addEntryButton"]);
  this.addEntrySection.get$nodes().add(this.addEntryButton);
  this.expander.connect(this.containerElement);
  this.expander.collapse(this.containerElement);
}
DayDisplayView.prototype.set$dayDate = function(day) {
  var $0;
  return (this.dayDateElement.set$text(($0 = day.toGermanString())), $0);
}
function TimeEntryEditorFactory(elementCreator, expander, activityProvider) {
  this.elementCreator = elementCreator;
  this.expander = expander;
  this.activityProvider = activityProvider;
}
TimeEntryEditorFactory.prototype.createTimeEntryEditor = function(timeEntry) {
  var model = new TimeEntryEditorModel();
  var view = new TimeEntryEditorView(this.elementCreator);
  return new TimeEntryEditor(timeEntry, this.activityProvider, model, view);
}
function TimeEntryEditor(_timeEntry, activityProvider, model, view) {
  this._timeEntry = _timeEntry;
  this.activityProvider = activityProvider;
  this.model = model;
  this.view = view;
}
TimeEntryEditor.prototype.createUI = function() {
  this.view.createUI();
  this._updateTimeEntry(this._timeEntry);
  return this.view.editorElement;
}
TimeEntryEditor.prototype._updateTimeEntry = function(entry) {
  this._timeEntry = entry;
  var projects = this.activityProvider.fetchedProjects;
  var activity = entry.get$activityId() != null ? this.activityProvider.activityWithId(entry.get$activityId()) : null;
  var project = activity != null ? this.activityProvider.projectWithActivity(activity) : projects.$index((0));
  if (activity == null) activity = project.get$activities().$index((0));
  if (entry.get$activityId() != null) {
    this.view.set$timeFrom(entry.get$start());
    this.view.set$timeTo(entry.get$end());
    this.view.set$comment(entry.get$comment());
  }
  this.view.set$availableProjects(projects);
  this.view.set$project(project);
  this.view.set$availableActivities(project.get$activities());
  this.view.set$activity(activity);
}
function TimeEntryEditorModel() {

}
function TimeEntryEditorView(elementCreator) {
  this.elementCreator = elementCreator;
}
TimeEntryEditorView.prototype.createUI = function() {
  this.editorElement = this.elementCreator.createElement$_("div", ["timeEntry", "timeEntryView"]);
  this.timeFromInput = this.elementCreator.createElement$_("input", ["time", "entryTimeFrom"]);
  this.timeFromInput.type = "time";
  this.timeFromInput.disabled = true;
  this.timeToInput = this.elementCreator.createElement$_("input", ["time", "entryTimeTo"]);
  this.timeToInput.type = "time";
  this.timeToInput.disabled = true;
  this.projectSelect = this.elementCreator.createElement$_("select", ["project"]);
  this.projectSelect.disabled = true;
  this.activitySelect = this.elementCreator.createElement$_("select", ["project"]);
  this.activitySelect.disabled = true;
  this.commentTextArea = this.elementCreator.createElement$_("textarea", ["comment"]);
  this.commentTextArea.rows = (2);
  this.commentTextArea.disabled = true;
  this.editorElement.get$nodes().add(this.timeFromInput);
  this.editorElement.get$nodes().add(this.elementCreator.createElement$_("span", ["timeSeparator"]));
  this.editorElement.get$nodes().add(this.timeToInput);
  this.editorElement.get$nodes().add(this.projectSelect);
  this.editorElement.get$nodes().add(this.activitySelect);
  this.editorElement.get$nodes().add(this.commentTextArea);
}
TimeEntryEditorView.prototype.set$timeFrom = function(time) {
  var $0;
  return (this.timeFromInput.value = ($0 = time.toString()), $0);
}
TimeEntryEditorView.prototype.set$timeTo = function(time) {
  var $0;
  return (this.timeToInput.value = ($0 = time.toString()), $0);
}
TimeEntryEditorView.prototype.set$comment = function(comment) {
  var $0;
  return (this.commentTextArea.value = ($0 = comment), $0);
}
TimeEntryEditorView.prototype._replaceOptions = function(select, objects, value, text) {
  while (select.get$nodes().get$length() > (0)) {
    select.get$nodes().$index((0)).remove();
  }
  objects.forEach$1((function (object) {
    var option = _ElementFactoryProvider.Element$tag$factory("option");
    option.value = value(object);
    option.set$text(text(object));
    select.add(option, null);
  })
  );
}
TimeEntryEditorView.prototype._selectOption = function(select, value) {
  var optionToSelect = select.namedItem(value);
  select.selectedIndex = select.get$nodes().indexOf(optionToSelect, (0));
}
TimeEntryEditorView.prototype.set$activity = function(activity) {
  return this._selectOption(this.activitySelect, ("" + activity.get$id()));
}
TimeEntryEditorView.prototype.set$availableActivities = function(activityList) {
  return this._replaceOptions(this.activitySelect, activityList, (function (a) {
    return ("" + a.get$id());
  })
  , (function (a) {
    return a.get$name();
  })
  );
}
TimeEntryEditorView.prototype.set$availableProjects = function(projectList) {
  return this._replaceOptions(this.projectSelect, projectList, (function (p) {
    return p.get$name();
  })
  , (function (p) {
    return p.get$name();
  })
  );
}
TimeEntryEditorView.prototype.set$project = function(project) {
  return this._selectOption(this.projectSelect, project.get$name());
}
function User(name, password) {
  this.name = name;
  this.password = password;
}
User.prototype.get$name = function() { return this.name; };
function Month(monthJSON) {
  this.monthJSON = monthJSON;
}
Month.prototype.get$year = function() {
  return this.monthJSON.$index("jahr");
}
Month.prototype.get$month = function() {
  return this.monthJSON.$index("monat");
}
Month.prototype.get$timeEntries = function() {
  return this.monthJSON.$index("zeiten").map$1((function (timeEntryJSON) {
    return new TimeEntry(timeEntryJSON);
  })
  );
}
Month.prototype.timeEntriesFor = function(day) {
  return this.get$timeEntries().filter$1((function (entry) {
    return $eq$(entry.get$date(), day);
  })
  );
}
function TimeEntry(timeEntryJSON) {
  this.timeEntryJSON = timeEntryJSON;
}
TimeEntry.fresh$ctor = function() {
  this.timeEntryJSON = new HashMapImplementation_dart_core_String$Dynamic();
}
TimeEntry.fresh$ctor.prototype = TimeEntry.prototype;
TimeEntry.prototype.get$id = function() {
  return this.timeEntryJSON.$index("id");
}
TimeEntry.prototype.get$activityId = function() {
  return $ne$(this.timeEntryJSON.$index("taetigkeit")) ? this.timeEntryJSON.$index("taetigkeit").$index("id") : null;
}
TimeEntry.prototype.get$date = function() {
  return ZeDate.ZeDate$fromString$factory(this.timeEntryJSON.$index("tag"));
}
TimeEntry.prototype.get$start = function() {
  return new ZeTime.fromString$ctor(this.timeEntryJSON.$index("start"));
}
TimeEntry.prototype.get$end = function() {
  return new ZeTime.fromString$ctor(this.timeEntryJSON.$index("ende"));
}
TimeEntry.prototype.get$comment = function() {
  return this.timeEntryJSON.$index("kommentar");
}
function Project(_projectJSON) {
  this._projectJSON = _projectJSON;
}
Project.prototype.get$name = function() {
  return this._projectJSON.$index("name");
}
Project.prototype.get$activities = function() {
  if (this._activities == null) {
    var activityJSONs = this._projectJSON.$index("taetigkeiten");
    this._activities = ListFactory.ListFactory$from$factory(activityJSONs.map$1((function (activityJSON) {
      return new Activity(activityJSON);
    })
    ));
    this._activities.sort$1((function (a, b) {
      return a.get$name().compareTo(b.get$name());
    })
    );
  }
  return this._activities;
}
function Activity(_activityJSON) {
  this._activityJSON = _activityJSON;
}
Activity.prototype.get$id = function() {
  return this._activityJSON.$index("id");
}
Activity.prototype.get$name = function() {
  return this._activityJSON.$index("name");
}
function ZeDate(day, month, year) {
  this.day = day;
  this.month = month;
  this.year = year;
}
ZeDate.ZeDate$fromString$factory = function(dateString) {
  var dateReg = const$0008;
  var matches = dateReg.allMatches(dateString);
  for (var $$i = matches.iterator(); $$i.hasNext(); ) {
    var m = $$i.next();
    return new ZeDate(Math.parseInt(m.group((3))), Math.parseInt(m.group((2))), Math.parseInt(m.group((1))));
  }
}
ZeDate.ZeDate$fromDate$factory = function(date) {
  return new ZeDate(date.get$day(), date.get$month(), date.get$year());
}
ZeDate.ZeDate$currentDay$factory = function() {
  return ZeDate.ZeDate$fromDate$factory(new DateImplementation.now$ctor());
}
ZeDate.prototype.nextDay = function() {
  var thisDay = DateImplementation.DateImplementation$factory(this.year, this.month, this.day, (0), (0), (0), (0));
  return ZeDate.ZeDate$fromDate$factory(thisDay.add(const$0007));
}
ZeDate.prototype.$eq = function(other) {
  return !(other == null) && this.equals(other);
}
ZeDate.prototype.equals = function(other) {
  return (this.day == other.day) && (this.month == other.month) && (this.year == other.year);
}
ZeDate.prototype.toString = function() {
  return ("" + this.year + "-" + this._toStringWithLeadingZeros(this.month) + "-" + this._toStringWithLeadingZeros(this.day));
}
ZeDate.prototype.toGermanString = function() {
  return ("" + this._toStringWithLeadingZeros(this.day) + "." + this._toStringWithLeadingZeros(this.month) + "." + this.year);
}
ZeDate.prototype._toStringWithLeadingZeros = function(number) {
  return number < (10) ? ("0" + number) : ("" + number);
}
ZeTime.fromString$ctor = function(timeString) {
  if (timeString == null) return;
  var dateReg = const$0006;
  var matches = dateReg.allMatches(timeString);
  for (var $$i = matches.iterator(); $$i.hasNext(); ) {
    var m = $$i.next();
    this.hour = Math.parseInt(m.group((1)));
    this.minutes = Math.parseInt(m.group((2)));
    this.seconds = Math.parseInt(m.group((3)));
  }
}
ZeTime.fromString$ctor.prototype = ZeTime.prototype;
function ZeTime() {}
ZeTime.prototype.$eq = function(other) {
  return !(other == null) && this.equals(other);
}
ZeTime.prototype.equals = function(other) {
  return (this.hour == other.hour) && (this.minutes == other.minutes) && (this.seconds == other.seconds);
}
ZeTime.prototype.toString = function() {
  return ("" + this._toStringWithLeadingZeros(this.hour) + ":" + this._toStringWithLeadingZeros(this.minutes));
}
ZeTime.prototype._toStringWithLeadingZeros = function(number) {
  return number < (10) ? ("0" + number) : ("" + number);
}
function WebServiceRequester(login) {
  this.login = login;
}
WebServiceRequester.prototype.sendGet = function(url, onSuccess, onFailure) {
  this.sendRequest("GET", url, null, onSuccess, onFailure);
}
WebServiceRequester.prototype.sendRequest = function(method, url, parameters, onSuccess, onFailure) {
  var $this = this;
  this.login.loginUserIfNotAlreadyLoggedIn((function (user) {
    var req = _XMLHttpRequestFactoryProvider.XMLHttpRequest$factory();
    req.open(method, $this.equipWithUser(url, user), true, user.name, user.password);
    req.get$on().get$readyStateChange().add($wrap_call$1((function (event) {
      if (req.readyState == (4)) {
        if (req.status >= (200) && req.status < (300)) {
          onSuccess(req.responseText);
        }
        else {
          onFailure(req.status, req.responseText);
        }
      }
    })
    ), false);
    if (parameters != null) {
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send($this.encodeFormData(parameters));
    }
    else {
      req.send();
    }
  })
  );
}
WebServiceRequester.prototype.equipWithUser = function(url, user) {
  return url.replaceAll("@@USER@@", user.name);
}
WebServiceRequester.prototype.encodeFormData = function(data) {
  if (data == null) return "";
  var encodedData = new Array();
  data.forEach$1((function (name, value) {
    var encodedName = encodeURIComponent$(name.replaceAll("+", " "));
    var encodedValue = encodeURIComponent$(value.toString().replaceAll("+", " "));
    encodedData.add(("" + encodedName + "=" + encodedValue));
  })
  );
  return Strings.join(encodedData, "&");
}
function ActivityProvider(errorDisplay, requester) {
  this.errorDisplay = errorDisplay;
  this.requester = requester;
}
ActivityProvider.prototype.fetchProjects = function(onProjectsFetched) {
  var $this = this;
  if (this.fetchedProjects == null) {
    this.requester.sendGet("/api/projekte/", (function (response) {
      return $this._processFetchedProjects(response, onProjectsFetched);
    })
    , (function (statusCode, response) {
      return $this.errorDisplay.showWebServiceError(statusCode, response);
    })
    );
  }
  else {
    onProjectsFetched(this.fetchedProjects);
  }
}
ActivityProvider.prototype.activityWithId = function(id) {
  if (this.fetchedProjects != null) {
    var $$list = this.fetchedProjects;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var project = $$i.next();
      var activities = project.get$activities();
      if (activities != null) {
        for (var $i0 = activities.iterator(); $i0.hasNext(); ) {
          var activity = $i0.next();
          if (activity.get$id() == id) {
            return activity;
          }
        }
      }
    }
  }
  return null;
}
ActivityProvider.prototype.projectWithActivity = function(activity) {
  if (this.fetchedProjects != null) {
    var $$list = this.fetchedProjects;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var project = $$i.next();
      var activities = project.get$activities();
      if (activities != null && $gte$(activities.indexOf$1(activity), (0))) return project;
    }
  }
  return null;
}
ActivityProvider.prototype._processFetchedProjects = function(response, onProjectsFetched) {
  var projectJSONs = json_JSON.parse(response);
  this.fetchedProjects = ListFactory.ListFactory$from$factory(projectJSONs.map$1((function (projectJSON) {
    return new Project(projectJSON);
  })
  ));
  if (onProjectsFetched != null) {
    onProjectsFetched(this.fetchedProjects);
  }
}
function TimeEntryProvider(errorDisplay, webServiceRequester) {
  this.errorDisplay = errorDisplay;
  this.webServiceRequester = webServiceRequester;
}
TimeEntryProvider.prototype.fetchTimeEntries = function(month, year, onMonthFetched) {
  var $this = this;
  this.webServiceRequester.sendGet(("/api/monat/" + year + "/" + month + "/" + "@@USER@@" + "/"), (function (response) {
    return $this._processFetchedMonth(response, onMonthFetched);
  })
  , (function (statusCode, response) {
    return $this.errorDisplay.showWebServiceError(statusCode, response);
  })
  );
}
TimeEntryProvider.prototype._processFetchedMonth = function(response, onMonthFetched) {
  var month = new Month(json_JSON.parse(response));
  if (onMonthFetched != null) {
    onMonthFetched(month);
  }
}
function Expander() {

}
Expander.prototype.connect = function(element) {
  var expander = this.findExpander(element);
  var header = this.findHeader(expander);
  if (header != null) {
    header.get$on().get$click().add$1(this.get$executeExpander());
  }
}
Expander.prototype.executeExpander = function(event) {
  var container = this.findContainer(event.currentTarget);
  if (container != null) {
    if (container.get$classes().contains$1("containerCollapsed")) {
      this.expand(container);
    }
    else {
      this.collapse(container);
    }
  }
}
Expander.prototype.get$executeExpander = function() {
  return this.executeExpander.bind(this);
}
Expander.prototype.expand = function(element) {
  var container = this.findContainer(element);
  container.get$classes().remove$1("containerCollapsed");
  container.get$classes().add$1("containerExpanded");
}
Expander.prototype.collapse = function(element) {
  var container = this.findContainer(element);
  container.get$classes().remove$1("containerExpanded");
  container.get$classes().add$1("containerCollapsed");
}
Expander.prototype.findExpander = function(element) {
  if (element == null) return null;
  if (element.get$classes().contains$1("expander")) {
    return element;
  }
  return element.query$1(".expander");
}
Expander.prototype.findHeader = function(element) {
  if (element == null) return null;
  if (element.get$classes().contains$1("header")) {
    return element;
  }
  return this.findHeader(element.get$parent());
}
Expander.prototype.findContainer = function(element) {
  if (element == null) return null;
  if (element.get$classes().contains$1("container")) {
    return element;
  }
  return this.findContainer(element.get$parent());
}
function Dialog(text, content, okButtonText, cancelButtonText) {
  this.text = text;
  this.content = content;
  this.okButtonText = okButtonText;
  this.cancelButtonText = cancelButtonText;
}
Dialog.prototype.show = function(dialogCallback) {
  var $this = this;
  this.modalifier = _ElementFactoryProvider.Element$tag$factory("div");
  this.modalifier.get$classes().add$1("modalifier");
  this.dialogFrame = _ElementFactoryProvider.Element$tag$factory("div");
  this.dialogFrame.get$classes().add$1("dialog");
  var textDisplay = _ElementFactoryProvider.Element$tag$factory("div");
  textDisplay.get$classes().add$1("dialogText");
  textDisplay.set$text(this.text);
  this.dialogFrame.get$nodes().add(textDisplay);
  this.dialogFrame.get$nodes().add(this.content);
  var buttonBar = _ElementFactoryProvider.Element$tag$factory("div");
  buttonBar.get$classes().add$1("dialogButtonBar");
  this.dialogFrame.get$nodes().add(buttonBar);
  if (this.cancelButtonText != null) {
    var cancelButton = _ElementFactoryProvider.Element$tag$factory("a");
    cancelButton.get$classes().add$1("dialogCancelButton");
    cancelButton.set$text(this.cancelButtonText);
    cancelButton.get$on().get$click().add$1((function (event) {
      dialogCallback($this.cancelButtonText);
      event.preventDefault();
    })
    );
    buttonBar.get$nodes().add(cancelButton);
  }
  if (this.okButtonText != null) {
    var okButton = _ElementFactoryProvider.Element$tag$factory("a");
    okButton.get$classes().add$1("dialogOkButton");
    okButton.set$text(this.okButtonText);
    okButton.get$on().get$click().add$1((function (event) {
      dialogCallback($this.okButtonText);
      event.preventDefault();
    })
    );
    buttonBar.get$nodes().add(okButton);
  }
  this.modalifier.get$nodes().add(this.dialogFrame);
  this.touchMovePreventer = (function (event) {
    return event.preventDefault();
  })
  ;
  get$$document().get$on().get$touchMove().add($wrap_call$1(to$call$1(this.touchMovePreventer)), false);
  get$$document().body.get$classes().add$1("modalified");
  get$$document().body.get$nodes().add(this.modalifier);
}
Dialog.prototype.dispose = function() {
  get$$document().get$on().get$touchMove().remove($wrap_call$1(to$call$1(this.touchMovePreventer)), false);
  get$$document().body.get$classes().remove$1("modalified");
  this.modalifier.remove();
}
function ElementCreator() {

}
ElementCreator.prototype.createElement$_ = function(tagName, classes) {
  var element = _ElementFactoryProvider.Element$tag$factory(tagName);
  if (classes != null) {
    element.get$classes().addAll(classes);
  }
  return element;
}
function Tags() {}
function Classes() {}
function ErrorDisplay() {

}
ErrorDisplay.prototype.showWebServiceError = function(statusCode, response) {
  print$(("" + statusCode + " : " + response));
}
function main() {
  AppBuilder.buildApp().start();
}
(function(){
  var v0/*HTMLMediaElement*/ = 'HTMLMediaElement|HTMLAudioElement|HTMLVideoElement';
  var v1/*SVGElement*/ = 'SVGElement|SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGAnimationElement|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGSetElement|SVGCircleElement|SVGClipPathElement|SVGComponentTransferFunctionElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGlyphRefElement|SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTextContentElement|SVGTextPathElement|SVGTextPositioningElement|SVGAltGlyphElement|SVGTRefElement|SVGTSpanElement|SVGTextElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement';
  var v2/*CharacterData*/ = 'CharacterData|Comment|Text|CDATASection';
  var v3/*HTMLDocument*/ = 'HTMLDocument|SVGDocument';
  var v4/*DocumentFragment*/ = 'DocumentFragment|ShadowRoot';
  var v5/*Element*/ = [v0/*HTMLMediaElement*/,v1/*SVGElement*/,'Element|HTMLElement|HTMLAnchorElement|HTMLAppletElement|HTMLAreaElement|HTMLBRElement|HTMLBaseElement|HTMLBaseFontElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDetailsElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLInputElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLSelectElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement'].join('|');
  var v6/*AbstractWorker*/ = 'AbstractWorker|SharedWorker|Worker';
  var v7/*IDBRequest*/ = 'IDBRequest|IDBVersionChangeRequest';
  var v8/*MediaStream*/ = 'MediaStream|LocalMediaStream';
  var v9/*Node*/ = [v2/*CharacterData*/,v3/*HTMLDocument*/,v4/*DocumentFragment*/,v5/*Element*/,'Node|Attr|DocumentType|Entity|EntityReference|Notation|ProcessingInstruction'].join('|');
  var v10/*WorkerContext*/ = 'WorkerContext|DedicatedWorkerContext|SharedWorkerContext';
  var table = [
    ['AbstractWorker', v6/*AbstractWorker*/]
    , ['AudioParam', 'AudioParam|AudioGain']
    , ['CSSValueList', 'CSSValueList|WebKitCSSTransformValue|WebKitCSSFilterValue']
    , ['CharacterData', v2/*CharacterData*/]
    , ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList']
    , ['HTMLDocument', v3/*HTMLDocument*/]
    , ['DocumentFragment', v4/*DocumentFragment*/]
    , ['HTMLMediaElement', v0/*HTMLMediaElement*/]
    , ['SVGElement', v1/*SVGElement*/]
    , ['Element', v5/*Element*/]
    , ['Entry', 'Entry|DirectoryEntry|FileEntry']
    , ['EntrySync', 'EntrySync|DirectoryEntrySync|FileEntrySync']
    , ['IDBRequest', v7/*IDBRequest*/]
    , ['MediaStream', v8/*MediaStream*/]
    , ['Node', v9/*Node*/]
    , ['WorkerContext', v10/*WorkerContext*/]
    , ['EventTarget', [v6/*AbstractWorker*/,v7/*IDBRequest*/,v8/*MediaStream*/,v9/*Node*/,v10/*WorkerContext*/,'EventTarget|AudioContext|BatteryManager|DOMApplicationCache|DeprecatedPeerConnection|EventSource|FileReader|FileWriter|IDBDatabase|IDBTransaction|MediaController|MessagePort|Notification|PeerConnection00|SpeechRecognition|TextTrack|TextTrackCue|TextTrackList|WebSocket|DOMWindow|XMLHttpRequest|XMLHttpRequestUpload'].join('|')]
    , ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection']
    , ['NodeList', 'NodeList|RadioNodeList']
    , ['Uint8Array', 'Uint8Array|Uint8ClampedArray']
  ];
  $dynamicSetMetadata(table);
})();
function $static_init(){
  $globals.AppBuilder_app = null;
}
var const$0000 = Object.create(_DeletedKeySentinel.prototype, {});
var const$0001 = Object.create(NoMoreElementsException.prototype, {});
var const$0002 = Object.create(EmptyQueueException.prototype, {});
var const$0003 = Object.create(UnsupportedOperationException.prototype, {_message: {"value": "", writeable: false}});
var const$0005 = new JSSyntaxRegExp("^#[_a-zA-Z]\\w*$");
var const$0006 = new JSSyntaxRegExp("(\\d*):(\\d*):(\\d*)");
var const$0007 = Object.create(DurationImplementation.prototype, {inMilliseconds: {"value": (86400000), writeable: false}});
var const$0008 = new JSSyntaxRegExp("(\\d*)-(\\d*)-(\\d*)");
var const$0009 = Object.create(IllegalAccessException.prototype, {});
var const$0010 = _constMap([]);
var const$0011 = Object.create(UnsupportedOperationException.prototype, {_message: {"value": "TODO(jacobr): should we impl?", writeable: false}});
var $globals = {};
$static_init();
if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    main();
  });
} else {
  main();
}

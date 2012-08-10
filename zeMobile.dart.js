function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.DateImplementation = {"":
 ["isUtc?", "millisecondsSinceEpoch?"],
 super: "Object",
 get$weekday: function() {
  return $.Primitives_getWeekday(this);
 },
 get$millisecond: function() {
  return $.Primitives_getMilliseconds(this);
 },
 get$second: function() {
  return $.Primitives_getSeconds(this);
 },
 get$minute: function() {
  return $.Primitives_getMinutes(this);
 },
 get$hour: function() {
  return $.Primitives_getHours(this);
 },
 get$day: function() {
  return $.Primitives_getDay(this);
 },
 get$month: function() {
  return $.Primitives_getMonth(this);
 },
 get$year: function() {
  return $.Primitives_getYear(this);
 },
 add$1: function(duration) {
  return $.DateImplementation$fromMillisecondsSinceEpoch($.add(this.millisecondsSinceEpoch, duration.get$inMilliseconds()), this.isUtc);
 },
 toString$0: function() {
  var t1 = new $.DateImplementation_toString_fourDigits();
  var t2 = new $.DateImplementation_toString_threeDigits();
  var t3 = new $.DateImplementation_toString_twoDigits();
  var y = t1.$call$1(this.get$year());
  var m = t3.$call$1(this.get$month());
  var d = t3.$call$1(this.get$day());
  var h = t3.$call$1(this.get$hour());
  var min = t3.$call$1(this.get$minute());
  var sec = t3.$call$1(this.get$second());
  var ms = t2.$call$1(this.get$millisecond());
  if (this.isUtc === true) return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms) + 'Z';
  return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms);
 },
 hashCode$0: function() {
  return this.millisecondsSinceEpoch;
 },
 compareTo$1: function(other) {
  return $.compareTo(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$ge$1: function(other) {
  return $.ge(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$gt$1: function(other) {
  return $.gt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$le$1: function(other) {
  return $.le(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$lt$1: function(other) {
  return $.lt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$eq$1: function(other) {
  if (!((typeof other === 'object' && other !== null) && !!other.is$Date)) return false;
  return $.eq(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 DateImplementation$now$0: function() {
  $.Primitives_lazyAsJsDate(this);
 },
 DateImplementation$8: function(years, month, day, hour, minute, second, millisecond, isUtc) {
  $.Primitives_lazyAsJsDate(this);
 },
 DateImplementation$fromMillisecondsSinceEpoch$2: function(millisecondsSinceEpoch, isUtc) {
  var t1 = this.millisecondsSinceEpoch;
  if ($.gtB($.abs(t1), 8640000000000000)) throw $.captureStackTrace($.IllegalArgumentException$(t1));
  t1 = this.isUtc;
  if (t1 == null) throw $.captureStackTrace($.IllegalArgumentException$(t1));
 },
 is$Date: true
};

$$.DurationImplementation = {"":
 ["inMilliseconds?"],
 super: "Object",
 toString$0: function() {
  var t1 = new $.DurationImplementation_toString_threeDigits();
  var t2 = new $.DurationImplementation_toString_twoDigits();
  var t3 = this.inMilliseconds;
  if ($.ltB(t3, 0)) return '-' + $.S($.DurationImplementation$(0, 0, 0, 0, $.neg(t3)));
  var twoDigitMinutes = t2.$call$1($.remainder(this.get$inMinutes(), 60));
  var twoDigitSeconds = t2.$call$1($.remainder(this.get$inSeconds(), 60));
  var threeDigitMs = t1.$call$1($.remainder(t3, 1000));
  return $.S(this.get$inHours()) + ':' + $.S(twoDigitMinutes) + ':' + $.S(twoDigitSeconds) + '.' + $.S(threeDigitMs);
 },
 compareTo$1: function(other) {
  return $.compareTo(this.inMilliseconds, other.get$inMilliseconds());
 },
 hashCode$0: function() {
  return $.hashCode(this.inMilliseconds);
 },
 operator$eq$1: function(other) {
  if (!((typeof other === 'object' && other !== null) && !!other.is$Duration)) return false;
  return $.eq(this.inMilliseconds, other.get$inMilliseconds());
 },
 get$inSeconds: function() {
  return $.tdiv(this.inMilliseconds, 1000);
 },
 get$inMinutes: function() {
  return $.tdiv(this.inMilliseconds, 60000);
 },
 get$inHours: function() {
  return $.tdiv(this.inMilliseconds, 3600000);
 },
 is$Duration: true
};

$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
 }
};

$$.FutureImpl = {"":
 ["_completionListeners", "_exceptionHandlers", "_successListeners", "_exceptionHandled", "_stackTrace", "_exception", "_lib1_value", "_isComplete"],
 super: "Object",
 chain$1: function(transformation) {
  var completer = $.CompleterImpl$();
  this.handleException$1(new $.FutureImpl_chain_anon(this, completer));
  this.then$1(new $.FutureImpl_chain_anon0(completer, transformation));
  return completer.get$future();
 },
 transform$1: function(transformation) {
  var completer = $.CompleterImpl$();
  this.handleException$1(new $.FutureImpl_transform_anon(this, completer));
  this.then$1(new $.FutureImpl_transform_anon0(completer, transformation));
  return completer.get$future();
 },
 _setException$2: function(exception, stackTrace) {
  if (exception == null) throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true) throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
 },
 _setValue$1: function(value) {
  if (this._isComplete === true) throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._lib1_value = value;
  this._complete$0();
 },
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception == null)) {
      for (var t1 = $.iterator(this._exceptionHandlers); t1.hasNext$0() === true; ) {
        var handler = t1.next$0();
        if ($.eqB(handler.$call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    }
    if (this.get$hasValue() === true) {
      for (t1 = $.iterator(this._successListeners); t1.hasNext$0() === true; ) {
        var listener = t1.next$0();
        listener.$call$1(this.get$value());
      }
    } else {
      if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0)) throw $.captureStackTrace(this._exception);
    }
  } finally {
    for (t1 = $.iterator(this._completionListeners); t1.hasNext$0() === true; ) {
      var listener0 = t1.next$0();
      try {
        listener0.$call$1(this);
      } catch (exception) {
        $.unwrapException(exception);
      }
    }
  }
 },
 handleException$1: function(onException) {
  if (this._exceptionHandled === true) return;
  if (this._isComplete === true) {
    var t1 = this._exception;
    if (!(t1 == null)) this._exceptionHandled = onException.$call$1(t1);
  } else $.add$1(this._exceptionHandlers, onException);
 },
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true) onSuccess.$call$1(this.get$value());
  else {
    if (this.get$isComplete() !== true) $.add$1(this._successListeners, onSuccess);
    else {
      if (this._exceptionHandled !== true) throw $.captureStackTrace(this._exception);
    }
  }
 },
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception == null;
 },
 get$isComplete: function() {
  return this._isComplete;
 },
 get$stackTrace: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._stackTrace;
 },
 get$value: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null)) throw $.captureStackTrace(t1);
  return this._lib1_value;
 }
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
 },
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
 },
 get$future: function() {
  return this._futureImpl;
 }
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC2) && f.$call$2(key, $.index(this._values, i));
  }
 },
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC2) && f.$call$2(key, $.index(this._values, i));
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._keys, index, $.CTC2);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) return;
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t3 = t1.length;
  if (index < 0 || index >= t3) throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$indexSet$2$bailout(2, key, value, index, t1);
    t3 = t1.length;
    if (index < 0 || index >= t3) throw $.ioore(index);
    var t4 = t1[index] === $.CTC2;
    t1 = t4;
  } else t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number') return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._keys;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  t3 = t1.length;
  if (index < 0 || index >= t3) throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  var t5 = t1.length;
  if (index < 0 || index >= t5) throw $.ioore(index);
  t1[index] = value;
 },
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      index = env2;
      t1 = env3;
      break;
    case 2:
      key = env0;
      value = env1;
      index = env2;
      t1 = env3;
      break;
    case 3:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 4:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 5:
      value = env0;
      t1 = env1;
      index = env2;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = this._probeForAdding$1(key);
      var t1 = this._keys;
    case 1:
      state = 0;
    case 2:
      if (state == 2 || (state == 0 && !($.index(t1, index) == null))) {
        switch (state) {
          case 0:
            t1 = this._keys;
          case 2:
            state = 0;
            var t3 = $.index(t1, index) === $.CTC2;
            t1 = t3;
        }
      } else {
        t1 = true;
      }
    case 3:
      if (state == 3 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      }
      t1 = this._keys;
    case 4:
      state = 0;
      $.indexSet(t1, index, key);
      t1 = this._values;
    case 5:
      state = 0;
      $.indexSet(t1, index, value);
  }
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || (oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || (oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t4 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t4, ({E: 'V'}));
  this._values = t4;
  for (var i = 0; i < capacity; ++i) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC2) continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t4 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t4, ({E: 'V'}));
      this._values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC2) continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  $.gtB(this._numberOfDeleted, numberOfFree) && this._grow$1($.get$length(this._keys));
 },
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null) return -1;
    if ($.eqB(existingKey, key)) return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._probeForAdding$1$bailout(2, key, hash, numberOfProbes, insertionIndex, t1);
    var t3 = t1.length;
    if (hash < 0 || hash >= t3) throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0) return hash;
      return insertionIndex;
    }
    if ($.eqB(existingKey, key)) return hash;
    if (insertionIndex < 0 && $.CTC2 === existingKey) insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      key = env0;
      hash = env1;
      numberOfProbes = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!true) break L0;
            var t1 = this._keys;
          case 2:
            state = 0;
            var existingKey = $.index(t1, hash);
            if (existingKey == null) {
              if ($.ltB(insertionIndex, 0)) return hash;
              return insertionIndex;
            }
            if ($.eqB(existingKey, key)) return hash;
            if ($.ltB(insertionIndex, 0) && $.CTC2 === existingKey) insertionIndex = hash;
            var numberOfProbes0 = numberOfProbes + 1;
            hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
          case 3:
            state = 0;
            numberOfProbes = numberOfProbes0;
        }
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 filter$1: function(f) {
  var result = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  $.forEach(this._backingMap, new $.HashSetImplementation_filter__(f, result));
  return result;
 },
 map$1: function(f) {
  var result = $.HashSetImplementation$();
  $.forEach(this._backingMap, new $.HashSetImplementation_map__(f, result));
  return result;
 },
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
 },
 addAll$1: function(collection) {
  $.forEach(collection, new $.HashSetImplementation_addAll__(this));
 },
 remove$1: function(value) {
  var t1 = this._backingMap;
  if (t1.containsKey$1(value) !== true) return false;
  t1.remove$1(value);
  return true;
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0)) throw $.iae(value);
  var t3 = t1.length;
  if (value < 0 || value >= t3) throw $.ioore(value);
  t1[value] = value;
 },
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
 },
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$) break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    entry = t1[t2];
  } while ((entry == null || entry === $.CTC2));
 },
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$)) break;
    entry = $.index(t1, this._nextValidIndex);
  } while ((entry == null || entry === $.CTC2));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t3 = this._nextValidIndex;
  if (t3 !== (t3 | 0)) throw $.iae(t3);
  var t4 = t1.length;
  if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
  var res = t1[t3];
  this._advance$0();
  return res;
 },
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.hasNext$0$bailout(1, t1, t2);
  var t4 = t2.length;
  if (t1 >= t4) return false;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  if (t1 < 0 || t1 >= t4) throw $.ioore(t1);
  t2[t1] === $.CTC2 && this._advance$0();
  return this._nextValidIndex < t2.length;
 },
 hasNext$0$bailout: function(state, t1, t2) {
  if ($.geB(t1, $.get$length(t2))) return false;
  $.index(t2, this._nextValidIndex) === $.CTC2 && this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.index_10 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
 },
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null) return;
  entry.remove$0();
  return entry.get$element().get$value();
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null) return;
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0)) throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2) throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0)) throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3) throw $.ioore(key);
    t1[key] = t2;
  }
 },
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true) $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: 'KeyValuePair<K, V>'}));
  this._list = t1;
 },
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_lib1_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._lib1_element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
 },
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._lib1_element;
 },
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this._previous, this);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._lib1_element = e;
 }
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_lib1_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC7);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC7);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(other, ({E: 'E'}));
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_lib1_element()) === true && other.addLast$1(entry.get$_lib1_element());
    entry = nextEntry;
  }
  return other;
 },
 map$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    other.addLast$1(f.$call$1(entry.get$_lib1_element()));
    entry = nextEntry;
  }
  return other;
 },
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_lib1_element());
    entry = nextEntry;
  }
 },
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
 },
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true; ) {
    this.add$1(t1.next$0());
  }
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) return '';
  if ($.get$length(this._buffer) === 1) return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1.hasNext$0() === true; ) {
    this.add$1(t1.next$0());
  }
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true) return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number') return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number') return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
 },
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true) return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null) return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_lib1_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 },
 end$0: function() {
  return this._end;
 },
 get$end: function() { return new $.BoundClosure(this, 'end$0'); },
 start$0: function() {
  return this._lib1_start;
 },
 get$start: function() { return new $.BoundClosure(this, 'start$0'); }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
 }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) return false;
  if (!(this._next == null)) return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  }
  return true;
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var next = this._next;
  this._next = null;
  return next;
 }
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$());
  var value = (this.list[this.i]);
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
 },
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
 },
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1);
  return t1 < (this.list.length);
 },
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, (this.list.length));
 }
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

$$.ConstantMap = {"":
 ["_lib0_keys?", "_jsObject", "length?"],
 super: "Object",
 clear$0: function() {
  return this._throwImmutable$0();
 },
 remove$1: function(key) {
  return this._throwImmutable$0();
 },
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
 },
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC4);
 },
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 getValues$0: function() {
  var result = [];
  $.forEach(this._lib0_keys, new $.ConstantMap_getValues_anon(this, result));
  return result;
 },
 getKeys$0: function() {
  return this._lib0_keys;
 },
 forEach$1: function(f) {
  $.forEach(this._lib0_keys, new $.ConstantMap_forEach_anon(this, f));
 },
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true) return;
  return $.jsPropertyAccess(this._jsObject, key);
 },
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__')) return false;
  return $.jsHasOwnProperty(this._jsObject, key);
 },
 is$Map: function() { return true; }
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["pattern?", "str", "_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 },
 end$0: function() {
  return $.add(this._start, $.get$length(this.pattern));
 },
 get$end: function() { return new $.BoundClosure(this, 'end$0'); },
 start$0: function() {
  return this._start;
 },
 get$start: function() { return new $.BoundClosure(this, 'start$0'); }
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
 }
};

$$.IndexOutOfRangeException = {"":
 ["_value"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
 }
};

$$.IllegalAccessException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Attempt to modify an immutable object';
 }
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(2, t1, sb);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
 },
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null) return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      var actualParameters = sb.toString$0();
      sb = $.StringBufferImpl$('');
      for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      var formalParameters = sb.toString$0();
      t1 = this._functionName;
      return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
  }
 }
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
 }
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 }
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
 }
};

$$.BadNumberFormatException = {"":
 ["_s"],
 super: "Object",
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.S(this._s) + '\'';
 }
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null) return this.get$exceptionName();
  return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
 }
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
 }
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
 }
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 }
};

$$.NotImplementedException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
 }
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 }
};

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
 }
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
 }
};

$$.App = {"":
 ["expander", "settings", "monthDisplayFactory", "timeEntryProvider", "activityProvider"],
 super: "Object",
 displayCurrentDayInCurrentMonth$1: function(month) {
  var currentDay = $.ZeDate_ZeDate$currentDay();
  var monthDisplay = this.monthDisplayFactory.createMonthDisplay$1(month);
  $.add$1($.document().get$body().get$nodes(), monthDisplay.createUI$0());
  var currentDayElement = monthDisplay.get$view().get$containerElement().query$1('#day' + $.S($.toString(currentDay)));
  this.expander.expand$1(currentDayElement);
  currentDayElement.scrollIntoView$0();
 },
 get$displayCurrentDayInCurrentMonth: function() { return new $.BoundClosure0(this, 'displayCurrentDayInCurrentMonth$1'); },
 fetchCurrentMonthAfterFetchingProjects$1: function(projects) {
  var currentDay = $.ZeDate_ZeDate$currentDay();
  return this.timeEntryProvider.fetchTimeEntries$2(currentDay.get$month(), currentDay.get$year());
 },
 get$fetchCurrentMonthAfterFetchingProjects: function() { return new $.BoundClosure0(this, 'fetchCurrentMonthAfterFetchingProjects$1'); },
 start$0: function() {
  $.add$1($.document().get$body().get$nodes(), this.settings.createUI$0());
  this.activityProvider.fetchProjects$0().chain$1(this.get$fetchCurrentMonthAfterFetchingProjects()).then$1(this.get$displayCurrentDayInCurrentMonth());
 },
 get$start: function() { return new $.BoundClosure(this, 'start$0'); }
};

$$.Login = {"":
 ["model?", "view?"],
 super: "Object",
 loginUserIfNotAlreadyLoggedIn$0: function() {
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, ({T: 'User'}));
  var t1 = this.model;
  if (t1.isUserLoggedIn$0() === true) completer.complete$1(t1.get$user());
  else this.view.showLoginDialog$0().then$1(new $.Login_loginUserIfNotAlreadyLoggedIn_anon(this, completer));
  return completer.get$future();
 }
};

$$.LoginModel = {"":
 ["userRepository", "user?"],
 super: "Object",
 loginUser$2: function(userName, password) {
  this.user = $.User$(userName, password);
  this.userRepository.saveUser$1(this.user);
 },
 isUserLoggedIn$0: function() {
  if (this.user == null) this.user = this.userRepository.loadUser$0();
  return !(this.user == null);
 }
};

$$.LoginView = {"":
 ["passwordInput", "nameInput"],
 super: "Object",
 showLoginDialog$0: function() {
  var loginDialogContent = $._Elements_DivElement();
  this.nameInput = $._Elements_InputElement(null);
  this.nameInput.set$type('text');
  this.nameInput.set$placeholder('Name');
  $.indexSet(this.nameInput.get$attributes(), 'autocapitalize', 'off');
  $.indexSet(this.nameInput.get$attributes(), 'autocorrect', 'off');
  $.add$1(loginDialogContent.get$nodes(), this.nameInput);
  this.passwordInput = $._Elements_InputElement(null);
  this.passwordInput.set$type('password');
  this.passwordInput.set$placeholder('Passwort');
  $.add$1(loginDialogContent.get$nodes(), this.passwordInput);
  var loginDialog = $.Dialog$('Log Dich in ze ein.', loginDialogContent, 'Einloggen', null);
  var completer = $.CompleterImpl$();
  loginDialog.show$1(new $.LoginView_showLoginDialog_anon(completer, loginDialog));
  return completer.get$future();
 },
 get$password: function() {
  return this.passwordInput.get$value();
 },
 get$userName: function() {
  return this.nameInput.get$value();
 }
};

$$.MonthDisplayFactory = {"":
 ["dayDisplayFactory", "expander"],
 super: "Object",
 createMonthDisplay$1: function(month) {
  var view = $.MonthDisplayView$(this.expander);
  return $.MonthDisplay$($.MonthDisplayModel$(month), view, this.dayDisplayFactory);
 }
};

$$.MonthDisplay = {"":
 ["dayDisplayFactory", "model?", "view?"],
 super: "Object",
 createUI$0: function() {
  var t1 = this.view;
  t1.createUI$0();
  var t2 = this.model;
  var currentDay = t2.get$firstDayInMonth();
  for (var t3 = this.dayDisplayFactory; !(currentDay == null); ) {
    var dayDisplay = t3.createDayDisplay$1(currentDay);
    $.add$1(t1.get$daysElement().get$nodes(), dayDisplay.createUI$0());
    for (var t4 = $.iterator(t2.get$month().timeEntriesFor$1(currentDay)); t4.hasNext$0() === true; ) {
      dayDisplay.addTimeEntry$1(t4.next$0());
    }
    currentDay = t2.nextDayInMonth$1(currentDay);
  }
  return t1.get$containerElement();
 }
};

$$.MonthDisplayModel = {"":
 ["month?"],
 super: "Object",
 nextDayInMonth$1: function(currentDay) {
  var nextDay = currentDay.nextDay$0();
  return $.eqB(nextDay.get$month(), this.month.get$month()) ? nextDay : null;
 },
 get$firstDayInMonth: function() {
  var t1 = this.month;
  return $.ZeDate$(1, t1.get$month(), t1.get$year());
 }
};

$$.MonthDisplayView = {"":
 ["daysElement?", "yearElement", "monthNameElement", "containerElement?", "expander"],
 super: "Object",
 createUI$0: function() {
  this.containerElement = $._Elements_DivElement();
  $.addAll(this.containerElement.get$classes(), ['month', 'container']);
  this.daysElement = $._Elements_DivElement();
  $.addAll(this.daysElement.get$classes(), ['days', 'content']);
  $.add$1(this.containerElement.get$nodes(), this.daysElement);
 }
};

$$.DayDisplayFactory = {"":
 ["timeEntryEditorFactory", "expander"],
 super: "Object",
 createDayDisplay$1: function(day) {
  return $.DayDisplay$($.DayDisplayModel$(day), $.DayDisplayView$(this.expander), this.timeEntryEditorFactory);
 }
};

$$.DayDisplay = {"":
 ["timeEntryEditorFactory", "view?", "model?"],
 super: "Object",
 addTimeEntry$1: function(timeEntry) {
  var editor = this.timeEntryEditorFactory.createTimeEntryEditor$1(timeEntry);
  var t1 = this.view;
  t1.get$timeEntriesElement().insertBefore$2(editor.createUI$0(), t1.get$addEntrySection());
  return editor;
 },
 addEntryButtonTouched$1: function(event$) {
  this.addTimeEntry$1(this.model.createNewEntry$0()).editEntry$0();
 },
 get$addEntryButtonTouched: function() { return new $.BoundClosure0(this, 'addEntryButtonTouched$1'); },
 createUI$0: function() {
  var t1 = this.view;
  t1.createUI$0();
  var t2 = this.model;
  t1.set$dayDate(t2.get$day());
  t2 = t2.get$dayContainerId();
  t1.get$containerElement().set$id(t2);
  $.add$1(t1.get$addEntryButton().get$on().get$click(), this.get$addEntryButtonTouched());
  return t1.get$containerElement();
 }
};

$$.DayDisplayModel = {"":
 ["day?"],
 super: "Object",
 createNewEntry$0: function() {
  var newEntry = $.TimeEntry$(null, null, null, null, null, null);
  newEntry.date = this.day;
  return newEntry;
 },
 get$dayContainerId: function() {
  return 'day' + $.S($.toString(this.day));
 }
};

$$.DayDisplayView = {"":
 ["addEntryButton?", "addEntrySection?", "timeEntriesElement?", "dayDateElement", "headerElement", "containerElement?", "expander"],
 super: "Object",
 set$dayDate: function(day) {
  var t1 = day.toGermanString$0();
  this.dayDateElement.set$text(t1);
  day.isWeekend$0() === true && $.add$1(this.headerElement.get$classes(), 'weekend');
 },
 createUI$0: function() {
  this.containerElement = $._Elements_DivElement();
  $.addAll(this.containerElement.get$classes(), ['day', 'container']);
  this.headerElement = $._Elements_DivElement();
  $.addAll(this.headerElement.get$classes(), ['header', 'dayHeader']);
  $.add$1(this.containerElement.get$nodes(), this.headerElement);
  this.dayDateElement = $._Elements_SpanElement();
  $.add$1(this.dayDateElement.get$classes(), 'dayDate');
  $.add$1(this.headerElement.get$nodes(), this.dayDateElement);
  var floatRight = $._Elements_SpanElement();
  $.add$1(floatRight.get$classes(), 'floatRight');
  $.add$1(this.headerElement.get$nodes(), floatRight);
  var expanderElement = $._Elements_SpanElement();
  $.add$1(expanderElement.get$classes(), 'expander');
  $.add$1(floatRight.get$nodes(), expanderElement);
  this.timeEntriesElement = $._Elements_DivElement();
  $.addAll(this.timeEntriesElement.get$classes(), ['timeEntries', 'content']);
  $.add$1(this.containerElement.get$nodes(), this.timeEntriesElement);
  this.addEntrySection = $._Elements_DivElement();
  $.add$1(this.addEntrySection.get$classes(), 'addEntrySection');
  $.add$1(this.timeEntriesElement.get$nodes(), this.addEntrySection);
  this.addEntryButton = $._Elements_SpanElement();
  $.add$1(this.addEntryButton.get$classes(), 'addEntryButton');
  $.add$1(this.addEntrySection.get$nodes(), this.addEntryButton);
  var t1 = this.expander;
  t1.connect$1(this.containerElement);
  t1.collapse$1(this.containerElement);
 }
};

$$.TimeEntryEditorFactory = {"":
 ["expander", "timeEntryProvider", "activityProvider"],
 super: "Object",
 createTimeEntryEditor$1: function(timeEntry) {
  return $.TimeEntryEditor$($.TimeEntryEditorModel$(timeEntry, this.activityProvider, this.timeEntryProvider), $.TimeEntryEditorView$());
 }
};

$$.TimeEntryEditor = {"":
 ["view?", "model?"],
 super: "Object",
 removeEditor$0: function() {
  this.view.get$editorElement().remove$0();
 },
 deleteTouched$1: function(event$) {
  this.model.deleteEntry$0().then$1(new $.TimeEntryEditor_deleteTouched_anon(this));
  event$.preventDefault$0();
 },
 get$deleteTouched: function() { return new $.BoundClosure0(this, 'deleteTouched$1'); },
 saveTouched$1: function(event$) {
  var t1 = this.model;
  var t2 = this.view;
  t1.saveChanges$4($.Math_parseInt(t2.get$selectedActivityId()), t2.get$timeFrom(), t2.get$timeTo(), t2.get$comment()).then$1(new $.TimeEntryEditor_saveTouched_anon(this));
  event$.preventDefault$0();
 },
 get$saveTouched: function() { return new $.BoundClosure0(this, 'saveTouched$1'); },
 cancelTouched$1: function(event$) {
  this.overwriteViewDataWithTimeEntry$0();
  this.view.enableEditing$1(false);
  event$.preventDefault$0();
 },
 get$cancelTouched: function() { return new $.BoundClosure0(this, 'cancelTouched$1'); },
 editTouched$1: function(event$) {
  this.view.enableEditing$1(true);
  event$.preventDefault$0();
 },
 get$editTouched: function() { return new $.BoundClosure0(this, 'editTouched$1'); },
 editEntry$0: function() {
  this.view.enableEditing$1(true);
 },
 overwriteViewDataWithTimeEntry$0: function() {
  var t1 = this.model;
  var t2 = t1.get$start();
  var t3 = this.view;
  t3.set$timeFrom(t2);
  t3.set$timeTo(t1.get$end());
  t3.set$comment(t1.get$comment());
  var projects = t1.get$projects();
  t3.set$availableProjects(projects);
  var project = t1.get$project();
  if (!(project == null)) {
    t3.set$project(project);
    t3.set$availableActivities(project.get$activities());
    t3.set$activity(t1.get$activity());
  } else {
    t3.set$project($.index(projects, 0));
    t3.set$availableActivities($.index(projects, 0).get$activities());
    t3.set$activity($.index($.index(projects, 0).get$activities(), 0));
  }
 },
 createUI$0: function() {
  var t1 = this.view;
  t1.createUI$0();
  t1.set$activitiesDeterminer(this.model.get$activitiesForProject());
  this.overwriteViewDataWithTimeEntry$0();
  $.add$1(t1.get$editButton().get$on().get$click(), this.get$editTouched());
  $.add$1(t1.get$cancelButton().get$on().get$click(), this.get$cancelTouched());
  $.add$1(t1.get$saveButton().get$on().get$click(), this.get$saveTouched());
  $.add$1(t1.get$deleteButton().get$on().get$click(), this.get$deleteTouched());
  return t1.get$editorElement();
 }
};

$$.TimeEntryEditorModel = {"":
 ["_projectOfEntry", "_activityOfEntry", "timeEntryProvider", "activityProvider", "_projects", "_entry"],
 super: "Object",
 activitiesForProject$1: function(projectName) {
  return this.activityProvider.projectWithName$1(projectName).get$activities();
 },
 get$activitiesForProject: function() { return new $.BoundClosure0(this, 'activitiesForProject$1'); },
 deleteEntry$0: function() {
  if (this.get$isEntryNew() === true) return $.FutureImpl_FutureImpl$immediate('OK');
  return this.timeEntryProvider.delete$1(this._entry);
 },
 saveChanges$4: function(activityId, start, end, comment) {
  var t1 = this._entry;
  t1.set$activityId(activityId);
  t1.set$start(start);
  t1.set$end(end);
  t1.set$comment(comment);
  return this.timeEntryProvider.save$1(t1);
 },
 get$isEntryNew: function() {
  return this._entry.get$id() == null;
 },
 get$comment: function() {
  return this._entry.get$comment();
 },
 get$end: function() {
  return this._entry.get$end();
 },
 get$start: function() {
  return this._entry.get$start();
 },
 start$0: function() { return this.get$start().$call$0(); },
 get$project: function() {
  return this._projectOfEntry;
 },
 get$activity: function() {
  return this._activityOfEntry;
 },
 get$projects: function() {
  return this._projects;
 },
 TimeEntryEditorModel$3: function(timeEntry, activityProvider, timeEntryProvider) {
  this._entry = timeEntry;
  var t1 = this.activityProvider;
  this._projects = t1.get$fetchedProjects();
  this._activityOfEntry = t1.activityWithId$1(this._entry.get$activityId());
  var t2 = this._activityOfEntry;
  this._projectOfEntry = !(t2 == null) ? t1.projectWithActivity$1(t2) : null;
 }
};

$$.TimeEntryEditorView = {"":
 ["_projectSelectIndex!", "_projectSelectIntervalId=", "activitiesDeterminer!", "cancelButton?", "deleteButton?", "saveButton?", "editButton?", "commentTextArea", "activitySelect", "projectSelect?", "timeToInput", "timeFromInput", "editorElement?"],
 super: "Object",
 projectSelected$0: function() {
  if (!$.eqB(this._projectSelectIndex, this.projectSelect.get$selectedIndex())) {
    this.set$availableActivities(this.activitiesDeterminer$1(this.projectSelect.get$value()));
    this._projectSelectIndex = this.projectSelect.get$selectedIndex();
  }
 },
 get$projectSelected: function() { return new $.BoundClosure(this, 'projectSelected$0'); },
 setUpProjectSelectionAutoUpdate$0: function() {
  $.add$1(this.projectSelect.get$on().get$change(), new $.TimeEntryEditorView_setUpProjectSelectionAutoUpdate_anon(this));
  $.add$1(this.projectSelect.get$on().get$focus(), new $.TimeEntryEditorView_setUpProjectSelectionAutoUpdate_anon0(this));
  $.add$1(this.projectSelect.get$on().get$blur(), new $.TimeEntryEditorView_setUpProjectSelectionAutoUpdate_anon1(this));
 },
 _selectOption$2: function(select, value) {
  for (var i = 0; $.ltB(i, $.get$length(select.get$nodes())); ++i) {
    if ($.eqB($.index(select.get$nodes(), i).get$value(), value)) {
      select.set$selectedIndex(i);
      break;
    }
  }
 },
 _replaceOptions$4: function(select, objects, value, text) {
  for (; $.gtB($.get$length(select.get$nodes()), 0); ) {
    $.index(select.get$nodes(), 0).remove$0();
  }
  $.forEach(objects, new $.TimeEntryEditorView__replaceOptions_anon(value, text, select));
 },
 get$selectedActivityId: function() {
  return this.activitySelect.get$value();
 },
 set$activity: function(activity) {
  !(activity == null) && this._selectOption$2(this.activitySelect, $.S(activity.get$id()));
 },
 set$project: function(project) {
  !(project == null) && this._selectOption$2(this.projectSelect, project.get$name());
 },
 set$availableActivities: function(activityList) {
  return this._replaceOptions$4(this.activitySelect, activityList, new $.TimeEntryEditorView_availableActivities_anon(), new $.TimeEntryEditorView_availableActivities_anon0());
 },
 set$availableProjects: function(projectList) {
  return this._replaceOptions$4(this.projectSelect, projectList, new $.TimeEntryEditorView_availableProjects_anon(), new $.TimeEntryEditorView_availableProjects_anon0());
 },
 get$comment: function() {
  return this.commentTextArea.get$value();
 },
 set$comment: function(comment) {
  this.commentTextArea.set$value(comment);
  return comment;
 },
 get$timeTo: function() {
  return $.ZeTime_ZeTime$fromString(this.timeToInput.get$value());
 },
 set$timeTo: function(time) {
  var t1 = !(time == null) ? $.toString(time) : '';
  this.timeToInput.set$value(t1);
  return t1;
 },
 get$timeFrom: function() {
  return $.ZeTime_ZeTime$fromString(this.timeFromInput.get$value());
 },
 set$timeFrom: function(time) {
  var t1 = !(time == null) ? $.toString(time) : '';
  this.timeFromInput.set$value(t1);
  return t1;
 },
 enableEditing$1: function(enabled) {
  var t1 = enabled === true;
  var t2 = this.editorElement;
  if (t1) {
    t2.get$classes().remove$1('timeEntryView');
    $.add$1(this.editorElement.get$classes(), 'timeEntryEditing');
    this.commentTextArea.set$placeholder('Kommentar (f\xfcr Kunden sichtbar)');
  } else {
    t2.get$classes().remove$1('timeEntryEditing');
    $.add$1(this.editorElement.get$classes(), 'timeEntryView');
    this.commentTextArea.set$placeholder('');
  }
  t1 = !t1;
  this.timeFromInput.set$disabled(t1);
  this.timeToInput.set$disabled(t1);
  this.projectSelect.set$disabled(t1);
  this.activitySelect.set$disabled(t1);
  this.commentTextArea.set$disabled(t1);
 },
 createUI$0: function() {
  this.editorElement = $._Elements_DivElement();
  $.add$1(this.editorElement.get$classes(), 'timeEntry');
  this.timeFromInput = $._Elements_InputElement('time');
  $.addAll(this.timeFromInput.get$classes(), ['time', 'entryTimeFrom']);
  $.add$1(this.editorElement.get$nodes(), this.timeFromInput);
  var timeSeparator = $._Elements_SpanElement();
  $.add$1(timeSeparator.get$classes(), 'timeSeparator');
  $.add$1(this.editorElement.get$nodes(), timeSeparator);
  this.timeToInput = $._Elements_InputElement('time');
  $.addAll(this.timeToInput.get$classes(), ['time', 'entryTimeTo']);
  $.add$1(this.editorElement.get$nodes(), this.timeToInput);
  this.projectSelect = $._ElementFactoryProvider_Element$tag('select');
  $.add$1(this.projectSelect.get$classes(), 'project');
  $.add$1(this.editorElement.get$nodes(), this.projectSelect);
  this.activitySelect = $._ElementFactoryProvider_Element$tag('select');
  $.add$1(this.activitySelect.get$classes(), 'activity');
  $.add$1(this.editorElement.get$nodes(), this.activitySelect);
  this.commentTextArea = $._Elements_TextAreaElement();
  $.add$1(this.commentTextArea.get$classes(), 'comment');
  this.commentTextArea.set$rows(2);
  $.add$1(this.editorElement.get$nodes(), this.commentTextArea);
  var editorActionsElement = $._Elements_DivElement();
  $.add$1(editorActionsElement.get$classes(), 'timeEntryActions');
  $.add$1(this.editorElement.get$nodes(), editorActionsElement);
  this.editButton = $._Elements_AnchorElement(null);
  $.add$1(this.editButton.get$classes(), 'timeEntryEdit');
  this.editButton.set$text('Editieren');
  $.add$1(editorActionsElement.get$nodes(), this.editButton);
  this.saveButton = $._Elements_AnchorElement(null);
  $.add$1(this.saveButton.get$classes(), 'timeEntrySave');
  this.saveButton.set$text('Sichern');
  $.add$1(editorActionsElement.get$nodes(), this.saveButton);
  this.deleteButton = $._Elements_AnchorElement(null);
  $.add$1(this.deleteButton.get$classes(), 'timeEntryDelete');
  this.deleteButton.set$text('L\xf6schen');
  $.add$1(editorActionsElement.get$nodes(), this.deleteButton);
  this.cancelButton = $._Elements_AnchorElement(null);
  $.add$1(this.cancelButton.get$classes(), 'timeEntryCancel');
  this.cancelButton.set$text('Abbrechen');
  $.add$1(editorActionsElement.get$nodes(), this.cancelButton);
  this.enableEditing$1(false);
  this.setUpProjectSelectionAutoUpdate$0();
 },
 activitiesDeterminer$1: function(arg0) { return this.activitiesDeterminer.$call$1(arg0); }
};

$$.Settings = {"":
 ["activityProvider", "view?"],
 super: "Object",
 changeLoginButtonTouched$1: function(event$) {
 },
 get$changeLoginButtonTouched: function() { return new $.BoundClosure0(this, 'changeLoginButtonTouched$1'); },
 reloadTimeEntriesButtonTouched$1: function(event$) {
 },
 get$reloadTimeEntriesButtonTouched: function() { return new $.BoundClosure0(this, 'reloadTimeEntriesButtonTouched$1'); },
 reloadActivitiesButtonTouched$1: function(event$) {
  this.activityProvider.refetchProjects$0();
 },
 get$reloadActivitiesButtonTouched: function() { return new $.BoundClosure0(this, 'reloadActivitiesButtonTouched$1'); },
 createUI$0: function() {
  var t1 = this.view;
  t1.createUI$0();
  $.add$1(t1.get$reloadActivitiesButton().get$on().get$click(), this.get$reloadActivitiesButtonTouched());
  $.add$1(t1.get$reloadTimeEntriesButton().get$on().get$click(), this.get$reloadTimeEntriesButtonTouched());
  $.add$1(t1.get$changeLoginButton().get$on().get$click(), this.get$changeLoginButtonTouched());
  return t1.get$containerElement();
 }
};

$$.SettingsView = {"":
 ["changeLoginButton?", "passwordInput", "userNameInput", "reloadTimeEntriesButton?", "reloadActivitiesButton?", "containerElement?", "expander"],
 super: "Object",
 createUI$0: function() {
  this.containerElement = $._Elements_DivElement();
  $.addAll(this.containerElement.get$classes(), ['settings', 'container']);
  var header = $._Elements_DivElement();
  $.addAll(header.get$classes(), ['settingsHeader', 'header']);
  $.add$1(this.containerElement.get$nodes(), header);
  var title = $._Elements_SpanElement();
  $.add$1(title.get$classes(), 'settingsTitle');
  title.set$text('Einstellungen');
  $.add$1(header.get$nodes(), title);
  var floatRight = $._Elements_SpanElement();
  $.add$1(floatRight.get$classes(), 'floatRight');
  $.add$1(header.get$nodes(), floatRight);
  var expanderElement = $._Elements_SpanElement();
  $.add$1(expanderElement.get$classes(), 'expander');
  $.add$1(floatRight.get$nodes(), expanderElement);
  var content$ = $._Elements_DivElement();
  $.addAll(content$.get$classes(), ['settingsContent', 'content']);
  $.add$1(this.containerElement.get$nodes(), content$);
  var reloadSection = $._Elements_DivElement();
  $.addAll(reloadSection.get$classes(), ['reloadSection', 'section']);
  $.add$1(content$.get$nodes(), reloadSection);
  var reloadSectionTitle = $._Elements_SpanElement();
  $.add$1(reloadSectionTitle.get$classes(), 'sectionTitle');
  $.add$1(reloadSection.get$nodes(), reloadSectionTitle);
  reloadSectionTitle.set$text('Neu laden');
  this.reloadActivitiesButton = $._Elements_AnchorElement(null);
  $.add$1(this.reloadActivitiesButton.get$classes(), 'reloadActivities');
  this.reloadActivitiesButton.set$text('T\xe4tigkeiten');
  $.add$1(reloadSection.get$nodes(), this.reloadActivitiesButton);
  this.reloadTimeEntriesButton = $._Elements_AnchorElement(null);
  $.add$1(this.reloadTimeEntriesButton.get$classes(), 'reloadTimeEntries');
  this.reloadTimeEntriesButton.set$text('Zeiten');
  var loginSection = $._Elements_DivElement();
  $.addAll(loginSection.get$classes(), ['loginSection', 'section']);
  var loginSectionTitle = $._Elements_SpanElement();
  $.add$1(loginSectionTitle.get$classes(), 'sectionTitle');
  loginSectionTitle.set$text('Login \xe4ndern');
  $.add$1(loginSection.get$nodes(), loginSectionTitle);
  this.userNameInput = $._Elements_InputElement(null);
  this.userNameInput.set$type('text');
  this.userNameInput.set$placeholder('Name');
  $.indexSet(this.userNameInput.get$attributes(), 'autocapitalize', 'off');
  $.indexSet(this.userNameInput.get$attributes(), 'autocorrect', 'off');
  $.add$1(loginSection.get$nodes(), this.userNameInput);
  this.passwordInput = $._Elements_InputElement(null);
  this.passwordInput.set$type('password');
  this.passwordInput.set$placeholder('Passwort');
  $.add$1(loginSection.get$nodes(), this.passwordInput);
  this.changeLoginButton = $._Elements_AnchorElement(null);
  $.add$1(this.changeLoginButton.get$classes(), 'changeLogin');
  this.changeLoginButton.set$text('\xc4ndern');
  $.add$1(loginSection.get$nodes(), this.changeLoginButton);
  var versionInfo = $._Elements_DivElement();
  $.add$1(versionInfo.get$classes(), 'versionInfo');
  versionInfo.set$text('Build @@ZE_BUILD_NUMBER@@ / @@ZE_BUILD_TIME@@');
  $.add$1(content$.get$nodes(), versionInfo);
  var t1 = this.expander;
  t1.connect$1(this.containerElement);
  t1.collapse$1(this.containerElement);
 }
};

$$.User = {"":
 ["password?", "name?"],
 super: "Object",
 toString$0: function() {
  return 'User(' + $.S(this.name) + ', ' + $.S(this.password) + ')';
 },
 operator$eq$1: function(otherUser) {
  if (!(otherUser == null)) {
    if (!(this === otherUser)) {
      var t1 = $.eqB(this.name, otherUser.get$name()) && $.eqB(this.password, otherUser.get$password());
    } else t1 = true;
  } else t1 = false;
  return t1;
 }
};

$$.Month = {"":
 ["timeEntries?", "hoursToWork?", "hoursWorked?", "vacation?", "balance?", "month?", "year?"],
 super: "Object",
 toString$0: function() {
  return 'Month(' + $.S(this.year) + ', ' + $.S(this.month) + ', ' + $.S(this.balance) + ', ' + $.S(this.vacation) + ', ' + $.S(this.hoursWorked) + ', ' + $.S(this.hoursToWork) + ', ' + $.S(this.timeEntries) + ')';
 },
 operator$eq$1: function(other) {
  if (other == null) return false;
  if (other === this) return true;
  if (!$.eqB(other.get$year(), this.year) || (!$.eqB(other.get$month(), this.month) || (!$.eqB(other.get$balance(), this.balance) || (!$.eqB(other.get$vacation(), this.vacation) || (!$.eqB(other.get$hoursToWork(), this.hoursToWork) || !$.eqB(other.get$hoursWorked(), this.hoursWorked)))))) return false;
  if (this.timeEntries == null) return other.get$timeEntries() == null;
  if (other.get$timeEntries() == null) return false;
  if (!$.eqB($.get$length(this.timeEntries), $.get$length(other.get$timeEntries()))) return false;
  for (var i = 0; $.ltB(i, $.get$length(this.timeEntries)); ++i) {
    if (!$.eqB($.index(this.timeEntries, i), $.index(other.get$timeEntries(), i))) return false;
  }
  return true;
 },
 timeEntriesFor$1: function(day) {
  return $.ListFactory_List$from($.filter(this.timeEntries, new $.Month_timeEntriesFor_anon(day)));
 }
};

$$.TimeEntry = {"":
 ["comment=", "end=", "start=", "date?", "activityId=", "id="],
 super: "Object",
 toString$0: function() {
  return 'TimeEntry(' + $.S(this.id) + ', ' + $.S(this.activityId) + ', ' + $.S(this.date) + ', ' + $.S(this.start) + ', ' + $.S(this.end) + ', ' + $.S(this.comment) + ')';
 },
 operator$eq$1: function(other) {
  if (other == null) return false;
  if (other === this) return true;
  return $.eqB(this.id, other.get$id()) && ($.eqB(this.activityId, other.get$activityId()) && ($.eqB(this.date, other.get$date()) && ($.eqB(this.start, other.get$start()) && ($.eqB(this.end, other.get$end()) && $.eqB(this.comment, other.get$comment())))));
 },
 start$0: function() { return this.start.$call$0(); }
};

$$.Project = {"":
 ["activities?", "name?"],
 super: "Object",
 toString$0: function() {
  return 'Project(' + $.S(this.name) + ', ' + $.S(this.activities) + ')';
 },
 operator$eq$1: function(other) {
  if (other == null) return false;
  if (this === other) return true;
  if (!$.eqB(this.name, other.get$name())) return false;
  var t1 = this.activities;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$eq$1$bailout(1, other, t1);
  if (other.get$activities() == null) return false;
  if (!(t1.length === $.get$length(other.get$activities()))) return false;
  for (var i = 0; t2 = t1.length, i < t2; ++i) {
    if (i < 0 || i >= t2) throw $.ioore(i);
    if (!$.eqB(t1[i], $.index(other.get$activities(), i))) return false;
  }
  return true;
  var t2;
 },
 operator$eq$1$bailout: function(state, other, t1) {
  if (t1 == null) return other.get$activities() == null;
  if (other.get$activities() == null) return false;
  if (!$.eqB($.get$length(t1), $.get$length(other.get$activities()))) return false;
  for (var i = 0; $.ltB(i, $.get$length(t1)); ++i) {
    if (!$.eqB($.index(t1, i), $.index(other.get$activities(), i))) return false;
  }
  return true;
 }
};

$$.Activity = {"":
 ["name?", "id="],
 super: "Object",
 toString$0: function() {
  return 'Activity(' + $.S(this.id) + ', ' + $.S(this.name) + ')';
 },
 operator$eq$1: function(other) {
  if (!(other == null)) {
    if (!(this === other)) {
      var t1 = $.eqB(this.id, other.get$id()) && $.eqB(this.name, other.get$name());
    } else t1 = true;
  } else t1 = false;
  return t1;
 }
};

$$.ZeDate = {"":
 ["year?", "month?", "day?"],
 super: "Object",
 _toStringWithLeadingZeros$1: function(number) {
  return $.ltB(number, 10) ? '0' + $.S(number) : $.S(number);
 },
 toGermanString$0: function() {
  return $.S(this._toStringWithLeadingZeros$1(this.day)) + '.' + $.S(this._toStringWithLeadingZeros$1(this.month)) + '.' + $.S(this.year);
 },
 toString$0: function() {
  return $.S(this.year) + '-' + $.S(this._toStringWithLeadingZeros$1(this.month)) + '-' + $.S(this._toStringWithLeadingZeros$1(this.day));
 },
 equals$1: function(other) {
  return $.eqB(this.day, other.get$day()) && ($.eqB(this.month, other.get$month()) && $.eqB(this.year, other.get$year()));
 },
 operator$eq$1: function(other) {
  return !(other == null) && this.equals$1(other) === true;
 },
 isWeekend$0: function() {
  var weekday = $.DateImplementation$(this.year, this.month, this.day, 0, 0, 0, 0, false).get$weekday();
  return $.eqB(weekday, 6) || $.eqB(weekday, 7);
 },
 nextDay$0: function() {
  return $.ZeDate_ZeDate$fromDate($.DateImplementation$(this.year, this.month, this.day, 0, 0, 0, 0, false).add$1($.CTC10));
 }
};

$$.ZeTime = {"":
 ["minutes?", "hour?"],
 super: "Object",
 _toStringWithLeadingZeros$1: function(number) {
  return $.ltB(number, 10) ? '0' + $.S(number) : $.S(number);
 },
 toString$0: function() {
  return $.S(this._toStringWithLeadingZeros$1(this.hour)) + ':' + $.S(this._toStringWithLeadingZeros$1(this.minutes));
 },
 equals$1: function(other) {
  return $.eqB(this.hour, other.get$hour()) && $.eqB(this.minutes, other.get$minutes());
 },
 operator$eq$1: function(other) {
  return !(other == null) && this.equals$1(other) === true;
 }
};

$$.WebServiceRequester = {"":
 ["login"],
 super: "Object",
 encodeFormData$1: function(data) {
  if (data == null) return '';
  var encodedData = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(encodedData, ({E: 'String'}));
  $.forEach(data, new $.WebServiceRequester_encodeFormData_anon(encodedData));
  return $.Strings_join(encodedData, '&');
 },
 equipWithUser$2: function(url, user) {
  return $.replaceAll(url, '@@USER@@', user.get$name());
 },
 sendRequest$3: function(method, url, parameters) {
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, ({T: 'String'}));
  this.login.loginUserIfNotAlreadyLoggedIn$0().then$1(new $.WebServiceRequester_sendRequest_anon(method, completer, url, this, parameters));
  return completer.get$future();
 },
 sendRequest$2: function(method,url) {
  return this.sendRequest$3(method,url,null)
},
 sendGet$1: function(url) {
  return this.sendRequest$2('GET', url);
 }
};

$$.ActivityProvider = {"":
 ["fetchedProjects?", "repository", "requester", "errorDisplay"],
 super: "Object",
 _processFetchedProjects$1: function(response) {
  var t1 = this.repository;
  t1.importProjectsFromJSON$1(response);
  this.fetchedProjects = t1.loadProjects$0();
  return this.fetchedProjects;
 },
 get$_processFetchedProjects: function() { return new $.BoundClosure0(this, '_processFetchedProjects$1'); },
 projectWithName$1: function(name$) {
  var t1 = this.fetchedProjects;
  if (!(t1 == null)) {
    for (t1 = $.iterator(t1); t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      if ($.eqB(t2.get$name(), name$)) return t2;
    }
  }
  return;
 },
 projectWithActivity$1: function(activity) {
  var t1 = this.fetchedProjects;
  if (!(t1 == null)) {
    for (t1 = $.iterator(t1); t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      var activities = t2.get$activities();
      if (!(activities == null) && $.geB($.indexOf$1(activities, activity), 0)) return t2;
    }
  }
  return;
 },
 activityWithId$1: function(id) {
  var t1 = this.fetchedProjects;
  if (!(t1 == null)) {
    for (t1 = $.iterator(t1); t1.hasNext$0() === true; ) {
      var activities = t1.next$0().get$activities();
      if (!(activities == null)) {
        for (var t2 = $.iterator(activities); t2.hasNext$0() === true; ) {
          var t3 = t2.next$0();
          if ($.eqB(t3.get$id(), id)) return t3;
        }
      }
    }
  }
  return;
 },
 fetchProjects$0: function() {
  if (this.fetchedProjects == null) {
    this.fetchedProjects = this.repository.loadProjects$0();
    if (this.fetchedProjects == null) return this.refetchProjects$0();
  }
  var completer = $.CompleterImpl$();
  completer.complete$1(this.fetchedProjects);
  return completer.get$future();
 },
 refetchProjects$0: function() {
  var result = this.requester.sendGet$1('/api/projekte/');
  result.handleException$1(this.errorDisplay.get$showWebServiceError());
  return result.transform$1(this.get$_processFetchedProjects());
 }
};

$$.TimeEntryProvider = {"":
 ["cachedMonth", "repository", "webServiceRequester", "errorDisplay"],
 super: "Object",
 delete$1: function(timeEntry) {
  var requestFuture = this.webServiceRequester.sendRequest$2('DELETE', '/api/zeiten/' + $.S(timeEntry.get$date().get$year()) + '/' + $.S(timeEntry.get$date().get$month()) + '/' + '@@USER@@' + '/' + $.S(timeEntry.get$id()) + '/');
  requestFuture.handleException$1(this.errorDisplay.get$showWebServiceError());
  return requestFuture;
 },
 save$1: function(timeEntry) {
  var parameters = $.makeLiteralMap(['taetigkeit', timeEntry.get$activityId(), 'tag', timeEntry.get$date().toGermanString$0(), 'start', $.toString(timeEntry.get$start()), 'ende', $.toString(timeEntry.get$end()), 'kommentar', timeEntry.get$comment()]);
  var url = '/api/zeiten/' + $.S(timeEntry.get$date().get$year()) + '/' + $.S(timeEntry.get$date().get$month()) + '/' + '@@USER@@' + '/';
  if (!(timeEntry.get$id() == null)) {
    var url0 = url + $.S(timeEntry.get$id()) + '/';
    url = url0;
    var method = 'PUT';
  } else method = 'POST';
  var requestFuture = this.webServiceRequester.sendRequest$3(method, url, parameters);
  requestFuture.handleException$1(this.errorDisplay.get$showWebServiceError());
  return requestFuture;
 },
 _processFetchedMonth$1: function(response) {
  var t1 = this.repository;
  t1.importMonthFromJSON$1(response);
  var month = t1.loadMonth$0();
  this.cachedMonth = month;
  return month;
 },
 get$_processFetchedMonth: function() { return new $.BoundClosure0(this, '_processFetchedMonth$1'); },
 refetchTimeEntries$2: function(month, year) {
  var requestFuture = this.webServiceRequester.sendGet$1('/api/monat/' + $.S(year) + '/' + $.S(month) + '/' + '@@USER@@' + '/');
  requestFuture.handleException$1(this.errorDisplay.get$showWebServiceError());
  return requestFuture.transform$1(this.get$_processFetchedMonth());
 },
 fetchTimeEntries$2: function(month, year) {
  var t1 = this.repository;
  if (t1.hasMonth$2(month, year) === true) {
    var t2 = this.cachedMonth;
    return $.FutureImpl_FutureImpl$immediate(!(t2 == null) ? t2 : t1.loadMonth$0());
  }
  return this.refetchTimeEntries$2(month, year);
 }
};

$$.ActivityRepository = {"":
 [],
 super: "Object",
 extractActivity$1: function(activityJSON) {
  return $.Activity$($.index(activityJSON, 'id'), $.index(activityJSON, 'name'));
 },
 get$extractActivity: function() { return new $.BoundClosure0(this, 'extractActivity$1'); },
 extractProject$1: function(projectJSON) {
  var activities = $.ListFactory_List$from($.map($.index(projectJSON, 'taetigkeiten'), this.get$extractActivity()));
  $.sort(activities, new $.ActivityRepository_extractProject_anon());
  return $.Project$($.index(projectJSON, 'name'), activities);
 },
 get$extractProject: function() { return new $.BoundClosure0(this, 'extractProject$1'); },
 extractProjects$1: function(projectsJSON) {
  var projects = $.ListFactory_List$from($.map($.JSON_parse(projectsJSON), this.get$extractProject()));
  $.sort(projects, new $.ActivityRepository_extractProjects_anon());
  return projects;
 },
 importProjectsFromJSON$1: function(projectsJSON) {
  $.indexSet($.document().get$window().get$localStorage(), 'projects', projectsJSON);
 },
 loadProjects$0: function() {
  var projectsJSON = $.index($.document().get$window().get$localStorage(), 'projects');
  if (!(projectsJSON == null)) return this.extractProjects$1(projectsJSON);
  return;
 }
};

$$.UserRepository = {"":
 [],
 super: "Object",
 saveUser$1: function(user) {
  $.indexSet($.document().get$window().get$localStorage(), 'user', user.get$name());
  $.indexSet($.document().get$window().get$localStorage(), 'password', user.get$password());
 },
 loadUser$0: function() {
  var userName = $.index($.document().get$window().get$localStorage(), 'user');
  var password = $.index($.document().get$window().get$localStorage(), 'password');
  if (!(userName == null) && !(password == null)) return $.User$(userName, password);
  return;
 }
};

$$.TimeEntryRepository = {"":
 [],
 super: "Object",
 convertToDoubleFromGermanFormat$1: function(doubleString) {
  return $.Math_parseDouble($.replaceAll(doubleString, ',', '.'));
 },
 extractTimeEntry$1: function(timeEntryJSON) {
  if (timeEntryJSON == null) return;
  var entry = $.TimeEntry$(null, null, null, null, null, null);
  entry.id = $.index(timeEntryJSON, 'id');
  entry.activityId = !($.index(timeEntryJSON, 'taetigkeit') == null) ? $.index($.index(timeEntryJSON, 'taetigkeit'), 'id') : null;
  entry.date = $.ZeDate_ZeDate$fromString($.index(timeEntryJSON, 'tag'));
  entry.start = $.ZeTime_ZeTime$fromString($.index(timeEntryJSON, 'start'));
  entry.end = $.ZeTime_ZeTime$fromString($.index(timeEntryJSON, 'ende'));
  entry.comment = $.index(timeEntryJSON, 'kommentar');
  return entry;
 },
 get$extractTimeEntry: function() { return new $.BoundClosure0(this, 'extractTimeEntry$1'); },
 extractMonth$1: function(monthJSON) {
  if (monthJSON == null) return;
  var month = $.Month$(null, null, null, null, null, null, null);
  month.year = $.index(monthJSON, 'jahr');
  month.month = $.index(monthJSON, 'monat');
  month.balance = this.convertToDoubleFromGermanFormat$1($.index(monthJSON, 'saldo'));
  month.vacation = this.convertToDoubleFromGermanFormat$1($.index(monthJSON, 'urlaub'));
  month.hoursWorked = this.convertToDoubleFromGermanFormat$1($.index(monthJSON, 'ist_arbeitszeit'));
  month.hoursToWork = this.convertToDoubleFromGermanFormat$1($.index(monthJSON, 'soll_arbeitszeit'));
  month.timeEntries = $.ListFactory_List$from($.map($.index(monthJSON, 'zeiten'), this.get$extractTimeEntry()));
  return month;
 },
 importMonthFromJSON$1: function(monthJSON) {
  var monthMap = $.JSON_parse(monthJSON);
  var year = $.index(monthMap, 'jahr');
  var month = $.index(monthMap, 'monat');
  $.indexSet($.document().get$window().get$localStorage(), 'month', monthJSON);
  $.indexSet($.document().get$window().get$localStorage(), 'monthDesc', $.S(year) + $.S(month));
 },
 hasMonth$2: function(month, year) {
  return $.eq($.index($.window().get$localStorage(), 'monthDesc'), $.S(year) + $.S(month));
 },
 loadMonth$0: function() {
  var monthJSONString = $.index($.document().get$window().get$localStorage(), 'month');
  return this.extractMonth$1(!(monthJSONString == null) ? $.JSON_parse(monthJSONString) : null);
 }
};

$$.Expander = {"":
 [],
 super: "Object",
 findContainer$1: function(element) {
  if (element == null) return;
  if ($.contains$1(element.get$classes(), 'container') === true) return element;
  return this.findContainer$1(element.get$parent());
 },
 findHeader$1: function(element) {
  if (element == null) return;
  if ($.contains$1(element.get$classes(), 'header') === true) return element;
  return this.findHeader$1(element.get$parent());
 },
 findExpander$1: function(element) {
  if (element == null) return;
  if ($.contains$1(element.get$classes(), 'expander') === true) return element;
  return element.query$1('.expander');
 },
 collapse$1: function(element) {
  var container = this.findContainer$1(element);
  container.get$classes().remove$1('containerExpanded');
  $.add$1(container.get$classes(), 'containerCollapsed');
 },
 expand$1: function(element) {
  var container = this.findContainer$1(element);
  container.get$classes().remove$1('containerCollapsed');
  $.add$1(container.get$classes(), 'containerExpanded');
 },
 executeExpander$1: function(event$) {
  var container = this.findContainer$1(event$.get$currentTarget());
  if (!(container == null)) {
    if ($.contains$1(container.get$classes(), 'containerCollapsed') === true) this.expand$1(container);
    else this.collapse$1(container);
  }
 },
 get$executeExpander: function() { return new $.BoundClosure0(this, 'executeExpander$1'); },
 connect$1: function(element) {
  var header = this.findHeader$1(this.findExpander$1(element));
  !(header == null) && $.add$1(header.get$on().get$click(), this.get$executeExpander());
 }
};

$$.Dialog = {"":
 ["touchMovePreventer", "modalifier", "dialogFrame", "cancelButtonText?", "okButtonText?", "content", "text"],
 super: "Object",
 dispose$0: function() {
  $.document().get$on().get$touchMove().remove$1(this.touchMovePreventer);
  $.document().get$body().get$classes().remove$1('modalified');
  this.modalifier.remove$0();
 },
 show$1: function(dialogCallback) {
  this.modalifier = $._Elements_DivElement();
  $.add$1(this.modalifier.get$classes(), 'modalifier');
  this.dialogFrame = $._Elements_DivElement();
  $.add$1(this.dialogFrame.get$classes(), 'dialog');
  var textDisplay = $._Elements_DivElement();
  $.add$1(textDisplay.get$classes(), 'dialogText');
  textDisplay.set$text(this.text);
  $.add$1(this.dialogFrame.get$nodes(), textDisplay);
  $.add$1(this.dialogFrame.get$nodes(), this.content);
  var buttonBar = $._Elements_DivElement();
  $.add$1(buttonBar.get$classes(), 'dialogButtonBar');
  $.add$1(this.dialogFrame.get$nodes(), buttonBar);
  var t1 = this.cancelButtonText;
  if (!(t1 == null)) {
    var cancelButton = $._Elements_AnchorElement(null);
    $.add$1(cancelButton.get$classes(), 'dialogCancelButton');
    cancelButton.set$text(t1);
    $.add$1(cancelButton.get$on().get$click(), new $.Dialog_show_anon(this, dialogCallback));
    $.add$1(buttonBar.get$nodes(), cancelButton);
  }
  t1 = this.okButtonText;
  if (!(t1 == null)) {
    var okButton = $._Elements_AnchorElement(null);
    $.add$1(okButton.get$classes(), 'dialogOkButton');
    okButton.set$text(t1);
    $.add$1(okButton.get$on().get$click(), new $.Dialog_show_anon0(this, dialogCallback));
    $.add$1(buttonBar.get$nodes(), okButton);
  }
  $.add$1(this.modalifier.get$nodes(), this.dialogFrame);
  this.touchMovePreventer = new $.Dialog_show_anon1();
  $.add$1($.document().get$on().get$touchMove(), this.touchMovePreventer);
  $.add$1($.document().get$body().get$classes(), 'modalified');
  $.add$1($.document().get$body().get$nodes(), this.modalifier);
 }
};

$$.ErrorDisplay = {"":
 [],
 super: "Object",
 showWebServiceError$1: function(request) {
  $.print($.S(request.get$status()) + ' : ' + $.S(request.get$responseText()));
 },
 get$showWebServiceError: function() { return new $.BoundClosure0(this, 'showWebServiceError$1'); }
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$focus: function() {
  return this.operator$index$1('focus');
 },
 get$blur: function() {
  return this.operator$index$1('blur');
 }
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$readyStateChange: function() {
  return this.operator$index$1('readystatechange');
 },
 get$focus: function() {
  return this.operator$index$1('focus');
 },
 get$click: function() {
  return this.operator$index$1('click');
 },
 get$change: function() {
  return this.operator$index$1('change');
 },
 get$blur: function() {
  return this.operator$index$1('blur');
 }
};

$$._ElementAttributeMap = {"":
 ["_element?"],
 super: "Object",
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._element.get$$$dom_attributes());
 },
 getValues$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || (attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))) return this.getValues$0$bailout(1, attributes);
  var values = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(values, ({E: 'String'}));
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = attributes[i].get$value();
    var t3 = values.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    values[i] = t2;
  }
  return values;
 },
 getValues$0$bailout: function(state, attributes) {
  var values = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(values, ({E: 'String'}));
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$value();
    var t2 = values.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    values[i] = t1;
  }
  return values;
 },
 getKeys$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || (attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))) return this.getKeys$0$bailout(1, attributes);
  var keys = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(keys, ({E: 'String'}));
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = attributes[i].get$name();
    var t3 = keys.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    keys[i] = t2;
  }
  return keys;
 },
 getKeys$0$bailout: function(state, attributes) {
  var keys = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(keys, ({E: 'String'}));
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$name();
    var t2 = keys.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    keys[i] = t1;
  }
  return keys;
 },
 forEach$1: function(f) {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || (attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))) return this.forEach$1$bailout(1, f, attributes);
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var item = attributes[i];
    f.$call$2(item.get$name(), item.get$value());
  }
 },
 forEach$1$bailout: function(state, f, attributes) {
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var item = $.index(attributes, i);
    f.$call$2(item.get$name(), item.get$value());
  }
 },
 clear$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || (attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))) return this.clear$0$bailout(1, attributes);
  for (var i = attributes.length - 1; i >= 0; --i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    this.remove$1(attributes[i].get$name());
  }
 },
 clear$0$bailout: function(state, attributes) {
  for (var i = $.sub($.get$length(attributes), 1); $.geB(i, 0); i = $.sub(i, 1)) {
    this.remove$1($.index(attributes, i).get$name());
  }
 },
 remove$1: function(key) {
  var t1 = this._element;
  var value = t1.$dom_getAttribute$1(key);
  t1.$dom_removeAttribute$1(key);
  return value;
 },
 operator$indexSet$2: function(key, value) {
  this._element.$dom_setAttribute$2(key, $.S(value));
 },
 operator$index$1: function(key) {
  return this._element.$dom_getAttribute$1(key);
 },
 containsKey$1: function(key) {
  return this._element.$dom_hasAttribute$1(key);
 },
 is$Map: function() { return true; }
};

$$._CssClassSet = {"":
 ["_element?"],
 super: "Object",
 _formatSet$1: function(s) {
  return $.Strings_join($.ListFactory_List$from(s), ' ');
 },
 _write$1: function(s) {
  var t1 = this._formatSet$1(s);
  this._element.set$$$dom_className(t1);
 },
 _classname$0: function() {
  return this._element.get$$$dom_className();
 },
 _read$0: function() {
  var s = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(s, ({E: 'String'}));
  for (var t1 = $.iterator($.split(this._classname$0(), ' ')); t1.hasNext$0() === true; ) {
    var trimmed = $.trim(t1.next$0());
    $.isEmpty(trimmed) !== true && s.add$1(trimmed);
  }
  return s;
 },
 _modify$1: function(f) {
  var s = this._read$0();
  f.$call$1(s);
  this._write$1(s);
 },
 clear$0: function() {
  this._modify$1(new $._CssClassSet_clear_anon());
 },
 addAll$1: function(collection) {
  this._modify$1(new $._CssClassSet_addAll_anon(collection));
 },
 remove$1: function(value) {
  var s = this._read$0();
  var result = s.remove$1(value);
  this._write$1(s);
  return result;
 },
 add$1: function(value) {
  this._modify$1(new $._CssClassSet_add_anon(value));
 },
 contains$1: function(value) {
  return $.contains$1(this._read$0(), value);
 },
 get$length: function() {
  return $.get$length(this._read$0());
 },
 isEmpty$0: function() {
  return $.isEmpty(this._read$0());
 },
 filter$1: function(f) {
  return $.filter(this._read$0(), f);
 },
 map$1: function(f) {
  return $.map(this._read$0(), f);
 },
 forEach$1: function(f) {
  $.forEach(this._read$0(), f);
 },
 iterator$0: function() {
  return $.iterator(this._read$0());
 },
 toString$0: function() {
  return this._formatSet$1(this._read$0());
 },
 is$Collection: function() { return true; }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$focus: function() {
  return this.operator$index$1('focus');
 },
 get$click: function() {
  return this.operator$index$1('click');
 },
 get$change: function() {
  return this.operator$index$1('change');
 },
 get$blur: function() {
  return this.operator$index$1('blur');
 }
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
 },
 open$5: function(arg0, arg1, arg2, arg3, arg4) { return this.get$open().$call$5(arg0, arg1, arg2, arg3, arg4); }
};

$$._EventsImpl = {"":
 ["_ptr"],
 super: "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
 }
};

$$._EventListenerListImpl = {"":
 ["_type", "_ptr"],
 super: "Object",
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
 },
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
 },
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
  return this;
 },
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$focus: function() {
  return this.operator$index$1('focus');
 },
 get$blur: function() {
  return this.operator$index$1('blur');
 }
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
 },
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
 },
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._this.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._this.$dom_removeChild$1(result);
  return result;
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._this; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 last$0: function() {
  return this._this.lastChild;;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 setRange$4: function(start, rangeLength, from, startFrom) {
  return $.setRange$4(this._lib_list, start, rangeLength, from, startFrom);
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,0)
},
 removeLast$0: function() {
  return $.removeLast(this._lib_list);
 },
 clear$0: function() {
  return $.clear(this._lib_list);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._lib_list, element, start);
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  return $.sort(this._lib_list, compare);
 },
 addAll$1: function(collection) {
  return $.addAll(this._lib_list, collection);
 },
 addLast$1: function(value) {
  return $.addLast(this._lib_list, value);
 },
 add$1: function(value) {
  return $.add$1(this._lib_list, value);
 },
 set$length: function(newLength) {
  $.set$length(this._lib_list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._lib_list, index, value);
 },
 operator$index$1: function(index) {
  return $.index(this._lib_list, index);
 },
 get$length: function() {
  return $.get$length(this._lib_list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._lib_list);
 },
 filter$1: function(f) {
  return $.filter(this._lib_list, f);
 },
 map$1: function(f) {
  return $.map(this._lib_list, f);
 },
 forEach$1: function(f) {
  return $.forEach(this._lib_list, f);
 },
 iterator$0: function() {
  return $.iterator(this._lib_list);
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_lib_list"],
 super: "_ListWrapper",
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._lib_list, f));
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
 }
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
 },
 open$5: function(arg0, arg1, arg2, arg3, arg4) { return this.get$open().$call$5(arg0, arg1, arg2, arg3, arg4); }
};

$$._AttributeClassSet = {"":
 ["_element"],
 super: "_CssClassSet",
 _write$1: function(s) {
  $.indexSet(this._element.get$attributes(), 'class', this._formatSet$1(s));
 },
 $dom_className$0: function() {
  return $.index(this._element.get$attributes(), 'class');
 },
 get$$$dom_className: function() { return new $.BoundClosure(this, '$dom_className$0'); }
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$focus: function() {
  return this.operator$index$1('focus');
 },
 get$click: function() {
  return this.operator$index$1('click');
 },
 get$change: function() {
  return this.operator$index$1('change');
 },
 get$blur: function() {
  return this.operator$index$1('blur');
 }
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl",
 get$connect: function() {
  return this.operator$index$1('connect');
 },
 connect$1: function(arg0) { return this.get$connect().$call$1(arg0); }
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$start: function() {
  return this.operator$index$1('start');
 },
 start$0: function() { return this.get$start().$call$0(); },
 get$end: function() {
  return this.operator$index$1('end');
 }
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
 },
 open$5: function(arg0, arg1, arg2, arg3, arg4) { return this.get$open().$call$5(arg0, arg1, arg2, arg3, arg4); }
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$focus: function() {
  return this.operator$index$1('focus');
 },
 get$click: function() {
  return this.operator$index$1('click');
 },
 get$change: function() {
  return this.operator$index$1('change');
 },
 get$blur: function() {
  return this.operator$index$1('blur');
 }
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl"
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$readyStateChange: function() {
  return this.operator$index$1('readystatechange');
 }
};

$$._XMLHttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number') return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number') return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0)) throw $.iae(t3);
  var t5 = t1.length;
  if (t3 < 0 || t3 >= t5) throw $.ioore(t3);
  return t1[t3];
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
 },
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number') return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
 }
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
 },
 reset$0: function() {
 },
 operator$indexSet$2: function(object, info) {
 },
 operator$index$1: function(object) {
  return;
 }
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List())) return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map()) return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort) return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync) return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
 },
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
 }
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = ({});
  var t2 = this._visited;
  t1.copy_1 = $.index(t2, map);
  var t3 = t1.copy_1;
  if (!(t3 == null)) return t3;
  t1.copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
 },
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null)) return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
 },
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null)) return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    result[i] = t2;
  }
  return result;
 },
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result[i] = t1;
  }
  return result;
 },
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
 },
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Deserializer = {"":
 [],
 super: "Object",
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object' || keys === null || (keys.constructor !== Array && !keys.is$JavaScriptIndexingBehavior()))) return this._deserializeMap$1$bailout(1, x, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object' || values === null || (values.constructor !== Array && !values.is$JavaScriptIndexingBehavior()))) return this._deserializeMap$1$bailout(2, values, result, keys);
  var len = keys.length;
  for (var i = 0; i < len; ++i) {
    var t1 = keys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    var t2 = values.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result.operator$indexSet$2(key, this._deserializeHelper$1(values[i]));
  }
  return result;
 },
 _deserializeMap$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      result = env1;
      keys = env2;
      break;
    case 2:
      values = env0;
      result = env1;
      keys = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.HashMapImplementation$();
      var id = $.index(x, 1);
      $.indexSet(this._deserialized, id, result);
      var keys = $.index(x, 2);
    case 1:
      state = 0;
      var values = $.index(x, 3);
    case 2:
      state = 0;
      var len = $.get$length(keys);
      for (var i = 0; $.ltB(i, len); ++i) {
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
      }
      return result;
  }
 },
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object' || dartList === null || ((dartList.constructor !== Array || !!dartList.immutable$list) && !dartList.is$JavaScriptIndexingBehavior())) return this._deserializeList$1$bailout(1, dartList, id);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; ++i) {
    var t1 = dartList.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._deserializeHelper$1(dartList[i]);
    var t3 = dartList.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    dartList[i] = t2;
  }
  return dartList;
 },
 _deserializeList$1$bailout: function(state, dartList, id) {
  $.indexSet(this._deserialized, id, dartList);
  var len = $.get$length(dartList);
  for (var i = 0; $.ltB(i, len); ++i) {
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  }
  return dartList;
 },
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  return $.index(this._deserialized, id);
 },
 _deserializeHelper$1: function(x) {
  if ($._Deserializer_isPrimitive(x) === true) return x;
  switch ($.index(x, 0)) {
    case 'ref':
      return this._deserializeRef$1(x);
    case 'list':
      return this._deserializeList$1(x);
    case 'map':
      return this._deserializeMap$1(x);
    case 'sendport':
      return this.deserializeSendPort$1(x);
    default:
      throw $.captureStackTrace('Unexpected serialized object');
  }
 },
 deserialize$1: function(x) {
  if ($._Deserializer_isPrimitive(x) === true) return x;
  this._deserialized = $.HashMapImplementation$();
  return this._deserializeHelper$1(x);
 }
};

$$._Manager = {"":
 ["managers?", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  $.isEmpty(this.isolates) === true && this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
 },
 _nativeInitWorkerMessageHandler$0: function() {
      $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  ;
 },
 _nativeDetectEnvironment$0: function() {
      this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  ;
 },
 get$needSerialization: function() {
  return this.get$useWorkers();
 },
 get$useWorkers: function() {
  return this.supportsWorkers;
 },
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
 }
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id="],
 super: "Object",
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
 },
 _setGlobals$0: function() {
  $setGlobals(this);;
 },
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.$call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    !(t1 == null) && t1._setGlobals$0();
  }
  return result;
 },
 initGlobals$0: function() {
  $initGlobals(this);;
 },
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
 }
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState().get$isWorker() !== true) this._runHelper$0();
  else {
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }
  }
 },
 _runHelper$0: function() {
  if (!($._window() == null)) new $._EventLoop__runHelper_next(this).$call$0();
  else {
    for (; this.runIteration$0() === true; ) {
    }
  }
 },
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true) $._globalState().maybeCloseWorker$0();
    else {
      if (!($._globalState().get$rootContext() == null) && ($._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && ($._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true))) throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    }
    return false;
  }
  event$.process$0();
  return true;
 },
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true) return;
  return t1.removeFirst$0();
 },
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
 }
};

$$._IsolateEvent = {"":
 ["message", "fn", "isolate"],
 super: "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
 }
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
  $globalThis.postMessage(msg);;
 },
 set$id: function(i) {
  throw $.captureStackTrace($.NotImplementedException$(null));
 },
 get$id: function() {
  return 0;
 }
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 _checkReplyTo$1: function(replyTo) {
  if (!(replyTo == null) && (!((typeof replyTo === 'object' && replyTo !== null) && !!replyTo.is$_NativeJsSendPort) && (!((typeof replyTo === 'object' && replyTo !== null) && !!replyTo.is$_WorkerSendPort) && !((typeof replyTo === 'object' && replyTo !== null) && !!replyTo.is$_BufferingSendPort)))) throw $.captureStackTrace($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));
 },
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
 },
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._NativeJsSendPort_send_anon(this, message, replyTo));
 },
 send$1: function(message) {
  return this.send$2(message,null)
},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
 },
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort) {
    var t1 = $.eqB(this._workerId, other._workerId) && ($.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId));
  } else t1 = false;
  return t1;
 },
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._WorkerSendPort_send_anon(this, message, replyTo));
 },
 send$1: function(message) {
  return this.send$2(message,null)
},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 super: "_MessageTraverser",
 visitSendPort$1: function(port) {
  typeof port === 'object' && port !== null && !!port.is$_BufferingSendPort && port.get$_port() == null && $.add$1(this.ports, port.get$_futurePort());
 },
 visitMap$1: function(map) {
  var t1 = this._visited;
  if (!($.index(t1, map) == null)) return;
  $.indexSet(t1, map, true);
  $.forEach(map.getValues$0(), new $._PendingSendPortFinder_visitMap_anon(this));
 },
 visitList$1: function(list) {
  var t1 = this._visited;
  if (!($.index(t1, list) == null)) return;
  $.indexSet(t1, list, true);
  $.forEach(list, new $._PendingSendPortFinder_visitList_anon(this));
 },
 visitPrimitive$1: function(x) {
 },
 _PendingSendPortFinder$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
 },
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
 },
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
 },
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
 },
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsDeserializer = {"":
 ["_deserialized"],
 super: "_Deserializer",
 deserializeSendPort$1: function(x) {
  var managerId = $.index(x, 1);
  var isolateId = $.index(x, 2);
  var receivePortId = $.index(x, 3);
  if ($.eqB(managerId, $._globalState().get$currentManagerId())) {
    var isolate = $.index($._globalState().get$isolates(), isolateId);
    if (isolate == null) return;
    return $._NativeJsSendPort$(isolate.lookup$1(receivePortId), isolateId);
  }
  return $._WorkerSendPort$(managerId, isolateId, receivePortId);
 }
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
  return o['__MessageTraverser__attached_info__'];;
 },
 _setAttachedInfo$2: function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;;
 },
 _clearAttachedInfo$1: function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);;
 },
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number') return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
 },
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
 },
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
 }
};

$$._ListRange = {"":
 ["_lib2_length", "_offset", "_source"],
 super: "Object",
 get$length: function() {
  return this._lib2_length;
 },
 iterator$0: function() {
  var t1 = this._source;
  var t2 = this._offset;
  return $._ListRangeIteratorImpl$(t1, t2, $.add(t2, this._lib2_length));
 },
 _ListRange$3: function(source, offset, length$) {
  var t1 = this._offset;
  if ($.ltB(t1, 0) || $.gtB(t1, $.get$length(this._source))) throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  var t2 = this._lib2_length;
  if (!(t2 == null) && $.ltB(t2, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(t2));
  if ($.gtB($.add(t2, t1), $.get$length(this._source))) throw $.captureStackTrace($.IndexOutOfRangeException$($.add(t2, t1)));
 }
};

$$._ListRangeIteratorImpl = {"":
 ["_lib2_end", "_offset", "_source"],
 super: "Object",
 next$0: function() {
  var t1 = this._source;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1, 0);
  var t3 = this._offset;
  if (typeof t3 !== 'number') return this.next$0$bailout(2, t1, t3);
  this._offset = t3 + 1;
  if (t3 !== (t3 | 0)) throw $.iae(t3);
  var t5 = t1.length;
  if (t3 < 0 || t3 >= t5) throw $.ioore(t3);
  return t1[t3];
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._source;
    case 1:
      state = 0;
      var t3 = this._offset;
    case 2:
      state = 0;
      this._offset = $.add(t3, 1);
      return $.index(t1, t3);
  }
 },
 hasNext$0: function() {
  var t1 = this._offset;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._lib2_end;
  if (typeof t3 !== 'number') return this.hasNext$0$bailout(2, t1, t3);
  return t1 < t3;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._offset;
    case 1:
      state = 0;
      var t3 = this._lib2_end;
    case 2:
      state = 0;
      return $.lt(t1, t3);
  }
 }
};

$$._JsonParser = {"":
 ["position", "length?", "json"],
 super: "Object",
 _error$1: function(message) {
  throw $.captureStackTrace(message);
 },
 _token$0: function() {
  for (var t1 = this.json; true; ) {
    if ($.geB(this.position, $.get$length(this))) return;
    var char$ = $.charCodeAt(t1, this.position);
    var token = $.index($._JsonParser_tokens, char$);
    if (token === 32) {
      this.position = $.add(this.position, 1);
      continue;
    }
    if (token == null) return 0;
    return token;
  }
 },
 _nextChar$0: function() {
  var t1 = this.position;
  if (typeof t1 !== 'number') return this._nextChar$0$bailout(1, t1, 0);
  this.position = t1 + 1;
  t1 = this.position;
  if (typeof t1 !== 'number') return this._nextChar$0$bailout(2, t1, 0);
  var t3 = $.get$length(this);
  if (typeof t3 !== 'number') return this._nextChar$0$bailout(3, t3, t1);
  if (t1 >= t3) return 0;
  return $.charCodeAt(this.json, this.position);
 },
 _nextChar$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.position;
    case 1:
      state = 0;
      this.position = $.add(t1, 1);
      t1 = this.position;
    case 2:
      state = 0;
      var t3 = $.get$length(this);
    case 3:
      state = 0;
      if ($.geB(t1, t3)) return 0;
      return $.charCodeAt(this.json, this.position);
  }
 },
 _char$0: function() {
  var t1 = this.position;
  if (typeof t1 !== 'number') return this._char$0$bailout(1, t1, 0);
  var t3 = $.get$length(this);
  if (typeof t3 !== 'number') return this._char$0$bailout(2, t1, t3);
  t1 >= t3 && this._error$1('Unexpected end of JSON stream');
  return $.charCodeAt(this.json, this.position);
 },
 _char$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.position;
    case 1:
      state = 0;
      var t3 = $.get$length(this);
    case 2:
      state = 0;
      $.geB(t1, t3) && this._error$1('Unexpected end of JSON stream');
      return $.charCodeAt(this.json, this.position);
  }
 },
 _isToken$1: function(tokenKind) {
  return $.eq(this._token$0(), tokenKind);
 },
 _isDigit$1: function(char$) {
  if (typeof char$ !== 'number') return this._isDigit$1$bailout(1, char$);
  return char$ >= 48 && char$ <= 57;
 },
 _isDigit$1$bailout: function(state, char$) {
  return $.geB(char$, 48) && $.leB(char$, 57);
 },
 _parseNumber$0: function() {
  this._isToken$1(45) !== true && this._error$1('Expected number literal');
  var startPos = this.position;
  var char$ = this._char$0();
  if (char$ === 45) char$ = this._nextChar$0();
  if (char$ === 48) char$ = this._nextChar$0();
  else {
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true; ) {
        char$ = this._nextChar$0();
      }
    } else this._error$1('Expected digit when parsing number');
  }
  if (char$ === 46) {
    char$ = this._nextChar$0();
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true; ) {
        char$ = this._nextChar$0();
      }
      var isInt = false;
    } else {
      this._error$1('Expected digit following comma');
      isInt = true;
    }
  } else isInt = true;
  if (char$ === 101 || char$ === 69) {
    char$ = this._nextChar$0();
    if (char$ === 45 || char$ === 43) char$ = this._nextChar$0();
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true; ) {
        char$ = this._nextChar$0();
      }
      isInt = false;
    } else this._error$1('Expected digit following \'e\' or \'E\'');
  }
  var number = $.substring$2(this.json, startPos, this.position);
  if (isInt) return $.Math_parseInt(number);
  return $.Math_parseDouble(number);
 },
 _parseString$0: function() {
  this._isToken$1(34) !== true && this._error$1('Expected string literal');
  this.position = $.add(this.position, 1);
  var charCodes = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(charCodes, ({E: 'int'}));
  for (var t1 = this.json; true; ) {
    var c = this._char$0();
    if ($.eqB(c, 34)) {
      this.position = $.add(this.position, 1);
      break;
    }
    if ($.eqB(c, 92)) {
      this.position = $.add(this.position, 1);
      $.eqB(this.position, $.get$length(this)) && this._error$1('\\ at the end of input');
      switch (this._char$0()) {
        case 34:
          c = 34;
          break;
        case 92:
          c = 92;
          break;
        case 47:
          c = 47;
          break;
        case 98:
          c = 8;
          break;
        case 110:
          c = 10;
          break;
        case 114:
          c = 13;
          break;
        case 102:
          c = 12;
          break;
        case 116:
          c = 9;
          break;
        case 117:
          $.gtB($.add(this.position, 5), $.get$length(this)) && this._error$1('Invalid unicode esacape sequence');
          var codeString = $.substring$2(t1, $.add(this.position, 1), $.add(this.position, 5));
          try {
            c = $.Math_parseInt('0x' + $.S(codeString));
          } catch (exception) {
            $.unwrapException(exception);
            this._error$1('Invalid unicode esacape sequence');
          }
          this.position = $.add(this.position, 4);
          break;
        default:
          this._error$1('Invalid esacape sequence in string literal');
      }
    }
    charCodes.push(c);
    this.position = $.add(this.position, 1);
  }
  return $.Strings_String$fromCharCodes(charCodes);
 },
 _parseList$0: function() {
  var list = [];
  this.position = $.add(this.position, 1);
  if (this._isToken$1(93) !== true) {
    for (; true; ) {
      $.add$1(list, this._parseValue$0());
      if (this._isToken$1(44) !== true) break;
      this.position = $.add(this.position, 1);
    }
    this._isToken$1(93) !== true && this._error$1('Expected \']\' at end of list');
  }
  this.position = $.add(this.position, 1);
  return list;
 },
 _parseObject$0: function() {
  var object = $.makeLiteralMap([]);
  if (typeof object !== 'object' || object === null || ((object.constructor !== Array || !!object.immutable$list) && !object.is$JavaScriptIndexingBehavior())) return this._parseObject$0$bailout(1, object);
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true; ) {
      var key = this._parseString$0();
      this._isToken$1(58) !== true && this._error$1('Expected \':\' when parsing object');
      this.position = $.add(this.position, 1);
      var t1 = this._parseValue$0();
      if (key !== (key | 0)) throw $.iae(key);
      var t2 = object.length;
      if (key < 0 || key >= t2) throw $.ioore(key);
      object[key] = t1;
      if (this._isToken$1(44) !== true) break;
      this.position = $.add(this.position, 1);
    }
    this._isToken$1(125) !== true && this._error$1('Expected \'}\' at end of object');
  }
  this.position = $.add(this.position, 1);
  return object;
 },
 _parseObject$0$bailout: function(state, object) {
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true; ) {
      var key = this._parseString$0();
      this._isToken$1(58) !== true && this._error$1('Expected \':\' when parsing object');
      this.position = $.add(this.position, 1);
      $.indexSet(object, key, this._parseValue$0());
      if (this._isToken$1(44) !== true) break;
      this.position = $.add(this.position, 1);
    }
    this._isToken$1(125) !== true && this._error$1('Expected \'}\' at end of object');
  }
  this.position = $.add(this.position, 1);
  return object;
 },
 _expectKeyword$2: function(word, value) {
  for (var i = 0; $.ltB(i, $.get$length(word)); ++i) {
    !$.eqB(this._char$0(), $.charCodeAt(word, i)) && this._error$1('Expected keyword \'' + $.S(word) + '\'');
    this.position = $.add(this.position, 1);
  }
  return value;
 },
 _parseValue$0: function() {
  var token = this._token$0();
  token == null && this._error$1('Nothing to parse');
  switch (token) {
    case 34:
      return this._parseString$0();
    case 45:
      return this._parseNumber$0();
    case 110:
      return this._expectKeyword$2('null', null);
    case 102:
      return this._expectKeyword$2('false', false);
    case 116:
      return this._expectKeyword$2('true', true);
    case 123:
      return this._parseObject$0();
    case 91:
      return this._parseList$0();
    default:
      this._error$1('Unexpected token');
  }
 },
 _parseToplevel$0: function() {
  var result = this._parseValue$0();
  !(this._token$0() == null) && this._error$1('Junk at the end of JSON input');
  return result;
 },
 _JsonParser$_internal$1: function(json) {
  if (!($._JsonParser_tokens == null)) return;
  var t1 = $.ListFactory_List(126);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  $._JsonParser_tokens = t1;
  $.indexSet($._JsonParser_tokens, 9, 32);
  $.indexSet($._JsonParser_tokens, 10, 32);
  $.indexSet($._JsonParser_tokens, 13, 32);
  $.indexSet($._JsonParser_tokens, 32, 32);
  $.indexSet($._JsonParser_tokens, 48, 45);
  $.indexSet($._JsonParser_tokens, 49, 45);
  $.indexSet($._JsonParser_tokens, 50, 45);
  $.indexSet($._JsonParser_tokens, 51, 45);
  $.indexSet($._JsonParser_tokens, 52, 45);
  $.indexSet($._JsonParser_tokens, 53, 45);
  $.indexSet($._JsonParser_tokens, 54, 45);
  $.indexSet($._JsonParser_tokens, 55, 45);
  $.indexSet($._JsonParser_tokens, 56, 45);
  $.indexSet($._JsonParser_tokens, 57, 45);
  $.indexSet($._JsonParser_tokens, 45, 45);
  $.indexSet($._JsonParser_tokens, 123, 123);
  $.indexSet($._JsonParser_tokens, 125, 125);
  $.indexSet($._JsonParser_tokens, 91, 91);
  $.indexSet($._JsonParser_tokens, 93, 93);
  $.indexSet($._JsonParser_tokens, 34, 34);
  $.indexSet($._JsonParser_tokens, 58, 58);
  $.indexSet($._JsonParser_tokens, 44, 44);
  $.indexSet($._JsonParser_tokens, 110, 110);
  $.indexSet($._JsonParser_tokens, 116, 116);
  $.indexSet($._JsonParser_tokens, 102, 102);
 }
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 $call$2: function(k, v) {
  this.box_0.first_1 !== true && $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
 }
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 $call$0: function() {
  return this.closure_0.$call$0();
 }
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 $call$0: function() {
  return this.closure_2.$call$1(this.arg1_1);
 }
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 $call$0: function() {
  return this.closure_5.$call$2(this.arg1_4, this.arg2_3);
 }
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key);
 }
};

$$._CssClassSet_add_anon = {"":
 ["value_0"],
 super: "Closure",
 $call$1: function(s) {
  return $.add$1(s, this.value_0);
 }
};

$$._CssClassSet_clear_anon = {"":
 [],
 super: "Closure",
 $call$1: function(s) {
  return $.clear(s);
 }
};

$$.ConstantMap_forEach_anon = {"":
 ["this_1", "f_0"],
 super: "Closure",
 $call$1: function(key) {
  return this.f_0.$call$2(key, $.index(this.this_1, key));
 }
};

$$._CssClassSet_addAll_anon = {"":
 ["collection_0"],
 super: "Closure",
 $call$1: function(s) {
  return $.addAll(s, this.collection_0);
 }
};

$$.HashSetImplementation_addAll__ = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(value) {
  this.this_0.add$1(value);
 }
};

$$.TimeEntryEditorView_setUpProjectSelectionAutoUpdate_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(event$) {
  return this.this_0.projectSelected$0();
 }
};

$$.TimeEntryEditorView_setUpProjectSelectionAutoUpdate_anon0 = {"":
 ["this_1"],
 super: "Closure",
 $call$1: function(event$) {
  var t1 = this.this_1.get$projectSelect().get$selectedIndex();
  this.this_1.set$_projectSelectIndex(t1);
  t1 = $.document().get$window().setInterval$2(this.this_1.get$projectSelected(), 100);
  this.this_1.set$_projectSelectIntervalId(t1);
 }
};

$$.TimeEntryEditorView_setUpProjectSelectionAutoUpdate_anon1 = {"":
 ["this_2"],
 super: "Closure",
 $call$1: function(event$) {
  $.document().get$window().clearInterval$1(this.this_2.get$_projectSelectIntervalId());
 }
};

$$.TimeEntryEditorView_availableActivities_anon = {"":
 [],
 super: "Closure",
 $call$1: function(a) {
  return $.S(a.get$id());
 }
};

$$.TimeEntryEditorView_availableActivities_anon0 = {"":
 [],
 super: "Closure",
 $call$1: function(a) {
  return a.get$name();
 }
};

$$.TimeEntryEditorView__replaceOptions_anon = {"":
 ["value_2", "text_1", "select_0"],
 super: "Closure",
 $call$1: function(object) {
  var option = $._OptionElementFactoryProvider_OptionElement(this.text_1.$call$1(object), this.value_2.$call$1(object), null, null);
  this.select_0.add$2(option, null);
 }
};

$$.TimeEntryEditor_deleteTouched_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(response) {
  return this.this_0.removeEditor$0();
 }
};

$$.WebServiceRequester_sendRequest_anon = {"":
 ["method_4", "completer_3", "url_2", "this_1", "parameters_0"],
 super: "Closure",
 $call$1: function(user) {
  var req = $._XMLHttpRequestFactoryProvider_XMLHttpRequest();
  req.open$5(this.method_4, this.this_1.equipWithUser$2(this.url_2, user), true, user.get$name(), user.get$password());
  $.add$1(req.get$on().get$readyStateChange(), new $.WebServiceRequester_sendRequest_anon0(this.completer_3, req));
  if (!(this.parameters_0 == null)) {
    req.setRequestHeader$2('Content-Type', 'application/x-www-form-urlencoded');
    req.send$1(this.this_1.encodeFormData$1(this.parameters_0));
  } else req.send$0();
 }
};

$$.WebServiceRequester_sendRequest_anon0 = {"":
 ["completer_6", "req_5"],
 super: "Closure",
 $call$1: function(event$) {
  if ($.eqB(this.req_5.get$readyState(), 4)) {
    var t1 = $.geB(this.req_5.get$status(), 200) && $.ltB(this.req_5.get$status(), 300);
    var t2 = this.completer_6;
    var t3 = this.req_5;
    if (t1) t2.complete$1(t3.get$responseText());
    else t2.completeException$1(t3);
  }
 }
};

$$.Login_loginUserIfNotAlreadyLoggedIn_anon = {"":
 ["this_1", "completer_0"],
 super: "Closure",
 $call$1: function(loginSucceeded) {
  this.this_1.get$model().loginUser$2(this.this_1.get$view().get$userName(), this.this_1.get$view().get$password());
  this.completer_0.complete$1(this.this_1.get$model().get$user());
 }
};

$$.LoginView_showLoginDialog_anon = {"":
 ["completer_1", "loginDialog_0"],
 super: "Closure",
 $call$1: function(pressedButtonText) {
  this.loginDialog_0.dispose$0();
  this.completer_1.complete$1(true);
 }
};

$$.Dialog_show_anon = {"":
 ["this_1", "dialogCallback_0"],
 super: "Closure",
 $call$1: function(event$) {
  this.dialogCallback_0.$call$1(this.this_1.get$cancelButtonText());
  event$.preventDefault$0();
 }
};

$$.Dialog_show_anon0 = {"":
 ["this_3", "dialogCallback_2"],
 super: "Closure",
 $call$1: function(event$) {
  this.dialogCallback_2.$call$1(this.this_3.get$okButtonText());
  event$.preventDefault$0();
 }
};

$$.Dialog_show_anon1 = {"":
 [],
 super: "Closure",
 $call$1: function(event$) {
  return event$.preventDefault$0();
 }
};

$$.FutureImpl_chain_anon = {"":
 ["this_3", "completer_2"],
 super: "Closure",
 $call$1: function(e) {
  this.completer_2.completeException$2(e, this.this_3.get$stackTrace());
  return true;
 }
};

$$.FutureImpl_chain_anon0 = {"":
 ["completer_5", "transformation_4"],
 super: "Closure",
 $call$1: function(v) {
  var t1 = ({});
  t1.future_1 = null;
  try {
    t1.future_1 = this.transformation_4.$call$1(v);
  } catch (exception) {
    t1 = $.unwrapException(exception);
    var ex = t1;
    var stackTrace = $.getTraceFromException(exception);
    this.completer_5.completeException$2(ex, stackTrace);
    return;
  }
  t1.future_1.handleException$1(new $.FutureImpl_chain_anon1(t1, this.completer_5));
  t1.future_1.then$1(new $.FutureImpl_chain_anon2(this.completer_5));
 }
};

$$.FutureImpl_chain_anon1 = {"":
 ["box_0", "completer_6"],
 super: "Closure",
 $call$1: function(e) {
  this.completer_6.completeException$2(e, this.box_0.future_1.get$stackTrace());
  return true;
 }
};

$$.FutureImpl_chain_anon2 = {"":
 ["completer_7"],
 super: "Closure",
 $call$1: function(b) {
  return this.completer_7.complete$1(b);
 }
};

$$.WebServiceRequester_encodeFormData_anon = {"":
 ["encodedData_0"],
 super: "Closure",
 $call$2: function(name$, value) {
  var encodedName = $.encodeUriComponent($.replaceAll(name$, '+', ' '));
  var encodedValue = $.encodeUriComponent($.replaceAll($.toString(value), '+', ' '));
  $.add$1(this.encodedData_0, $.S(encodedName) + '=' + $.S(encodedValue));
 }
};

$$._uriEncode_anon = {"":
 ["hex_0"],
 super: "Closure",
 $call$1: function(v) {
  return '%' + $.S($.index(this.hex_0, $.shr(v, 4))) + $.S($.index(this.hex_0, $.and(v, 15)));
 }
};

$$.TimeEntryEditor_saveTouched_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(response) {
  return this.this_0.get$view().enableEditing$1(false);
 }
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$1: function(entry) {
  this.f_0.$call$2(entry.get$key(), entry.get$value());
 }
};

$$.TimeEntryEditorView_availableProjects_anon = {"":
 [],
 super: "Closure",
 $call$1: function(p) {
  return p.get$name();
 }
};

$$.TimeEntryEditorView_availableProjects_anon0 = {"":
 [],
 super: "Closure",
 $call$1: function(p) {
  return p.get$name();
 }
};

$$.DateImplementation_toString_fourDigits = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  var absN = $.abs(n);
  var sign = $.ltB(n, 0) ? '-' : '';
  if ($.geB(absN, 1000)) return $.S(n);
  if ($.geB(absN, 100)) return sign + '0' + $.S(absN);
  if ($.geB(absN, 10)) return sign + '00' + $.S(absN);
  return sign + '000' + $.S(absN);
 }
};

$$.DateImplementation_toString_threeDigits = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  if ($.geB(n, 100)) return $.S(n);
  if ($.geB(n, 10)) return '0' + $.S(n);
  return '00' + $.S(n);
 }
};

$$.DateImplementation_toString_twoDigits = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  if ($.geB(n, 10)) return $.S(n);
  return '0' + $.S(n);
 }
};

$$.DurationImplementation_toString_threeDigits = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  if ($.geB(n, 100)) return $.S(n);
  if ($.gtB(n, 10)) return '0' + $.S(n);
  return '00' + $.S(n);
 }
};

$$.DurationImplementation_toString_twoDigits = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  if ($.geB(n, 10)) return $.S(n);
  return '0' + $.S(n);
 }
};

$$.FutureImpl_transform_anon = {"":
 ["this_1", "completer_0"],
 super: "Closure",
 $call$1: function(e) {
  this.completer_0.completeException$2(e, this.this_1.get$stackTrace());
  return true;
 }
};

$$.FutureImpl_transform_anon0 = {"":
 ["completer_3", "transformation_2"],
 super: "Closure",
 $call$1: function(v) {
  var transformed = null;
  try {
    transformed = this.transformation_2.$call$1(v);
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var ex = t1;
    var stackTrace = $.getTraceFromException(exception);
    this.completer_3.completeException$2(ex, stackTrace);
    return;
  }
  this.completer_3.complete$1(transformed);
 }
};

$$.HashSetImplementation_map__ = {"":
 ["f_1", "result_0"],
 super: "Closure",
 $call$2: function(key, value) {
  $.add$1(this.result_0, this.f_1.$call$1(key));
 }
};

$$.Month_timeEntriesFor_anon = {"":
 ["day_0"],
 super: "Closure",
 $call$1: function(entry) {
  return $.eq(entry.get$date(), this.day_0);
 }
};

$$.HashSetImplementation_filter__ = {"":
 ["f_1", "result_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_1.$call$1(key) === true && $.add$1(this.result_0, key);
 }
};

$$.ActivityRepository_extractProjects_anon = {"":
 [],
 super: "Closure",
 $call$2: function(first, second) {
  return $.compareTo(first.get$name(), second.get$name());
 }
};

$$.ActivityRepository_extractProject_anon = {"":
 [],
 super: "Closure",
 $call$2: function(a, b) {
  return $.compareTo(a.get$name(), b.get$name());
 }
};

$$._WorkerSendPort_send_anon = {"":
 ["this_2", "message_1", "replyTo_0"],
 super: "Closure",
 $call$0: function() {
  this.this_2._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_2, 'msg', this.message_1, 'replyTo', this.replyTo_0]));
  if ($._globalState().get$isWorker() === true) $._globalState().get$mainManager().postMessage$1(workerMessage);
  else $.index($._globalState().get$managers(), this.this_2.get$_workerId()).postMessage$1(workerMessage);
 }
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 super: "Closure",
 $call$1: function(_) {
  return this.callback_0.$call$0();
 }
};

$$.Futures_wait_anon = {"":
 ["completer_5", "pos_4", "box_0", "result_3", "values_2"],
 super: "Closure",
 $call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0.remaining_1, 1);
  this.box_0.remaining_1 = remaining;
  $.eqB(remaining, 0) && this.result_3.get$isComplete() !== true && this.completer_5.complete$1(this.values_2);
 }
};

$$.Futures_wait_anon0 = {"":
 ["future_8", "completer_7", "result_6"],
 super: "Closure",
 $call$1: function(exception) {
  this.result_6.get$isComplete() !== true && this.completer_7.completeException$2(exception, this.future_8.get$stackTrace());
  return true;
 }
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  return this.this_0._dispatch$1(e);
 }
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  return this.this_0._dispatch$1(e);
 }
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, value);
 }
};

$$.ConstantMap_getValues_anon = {"":
 ["this_1", "result_0"],
 super: "Closure",
 $call$1: function(key) {
  return $.add$1(this.result_0, $.index(this.this_1, key));
 }
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
};

$$._NativeJsSendPort_send_anon = {"":
 ["this_5", "message_4", "replyTo_3"],
 super: "Closure",
 $call$0: function() {
  var t1 = ({});
  this.this_5._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState().get$isolates(), this.this_5.get$_isolateId());
  if (isolate == null) return;
  if (this.this_5.get$_receivePort().get$_callback() == null) return;
  var shouldSerialize = !($._globalState().get$currentContext() == null) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_5.get$_isolateId());
  t1.msg_1 = this.message_4;
  t1.reply_2 = this.replyTo_3;
  if (shouldSerialize) {
    t1.msg_1 = $._serializeMessage(t1.msg_1);
    t1.reply_2 = $._serializeMessage(t1.reply_2);
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $._NativeJsSendPort_send_anon0(this.this_5, t1, shouldSerialize), 'receive ' + $.S(this.message_4));
 }
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 super: "Closure",
 $call$0: function() {
  if (!(this.this_7.get$_receivePort().get$_callback() == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0.msg_1);
      this.box_0.msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0.reply_2);
      this.box_0.reply_2 = reply;
    }
    var t1 = this.this_7.get$_receivePort();
    var t2 = this.box_0;
    t1._callback$2(t2.msg_1, t2.reply_2);
  }
 }
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, key);
 }
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 $call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
 }
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  if (this.this_0.runIteration$0() !== true) return;
  $._window().setTimeout$2(this, 0);
 }
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
$call$1: function(p0) { return this.self[this.target](p0); }
};
$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$._CssClassSet$ = function(_element) {
  return new $._CssClassSet(_element);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) return false;
  return other == receiver.substring(0, length$);
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.eqB = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b) === true;
  }
  return a === b;
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else receiver.set$length(newLength);
  return newLength;
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.User$ = function(name$, password) {
  return new $.User(password, name$);
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null) return;
  var function$ = (closure.$identity);
  if (!!function$) return function$;
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$._MediaStreamTrackEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackEventsImpl(_ptr);
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.isJsArray = function(value) {
  return !(value == null) && (value.constructor === Array);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.clear$0();
  $.set$length(receiver, 0);
};

$._Elements_InputElement = function(type) {
  var _e = $._document().$dom_createElement$1('input');
  !(type == null) && _e.set$type(type);
  return _e;
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$._fillStatics = function(context) {
    $globals = context.isolateStatics;
  $static_init();
;
};

$.Month$ = function(year, month, balance, vacation, hoursWorked, hoursToWork, timeEntries) {
  return new $.Month(timeEntries, hoursToWork, hoursWorked, vacation, balance, month, year);
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.forEach$1(f);
  return $.Collections_forEach(receiver, f);
};

$.print = function(obj) {
  return $.Primitives_printString($.toString(obj));
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.stringReplaceJS = function(receiver, replacer, to) {
  return receiver.replace(replacer, to.replace('$', '$$$$'));
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.remainder = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a % b;
  return a.remainder$1(b);
};

$.BadNumberFormatException$ = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$.DayDisplay$ = function(model, view, timeEntryEditorFactory) {
  return new $.DayDisplay(timeEntryEditorFactory, view, model);
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$.ErrorDisplay$ = function() {
  return new $.ErrorDisplay();
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f == null) && (!!f.methods)) return f.methods;
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC13)[name$]);
  !(dartMethod == null) && (methods['Object'] = dartMethod);
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.ListFactory_List$from = function(other) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.DualPivotQuicksort__dualPivotQuicksort = function(a, left, right, compare) {
  if (typeof a !== 'object' || a === null || ((a.constructor !== Array || !!a.immutable$list) && !a.is$JavaScriptIndexingBehavior())) return $.DualPivotQuicksort__dualPivotQuicksort$bailout(1, a, left, right, compare, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
  var index1 = $.add(left, sixth);
  var index5 = $.sub(right, sixth);
  var index3 = $.tdiv($.add(left, right), 2);
  var index2 = $.sub(index3, sixth);
  var index4 = $.add(index3, sixth);
  if (index1 !== (index1 | 0)) throw $.iae(index1);
  var t1 = a.length;
  if (index1 < 0 || index1 >= t1) throw $.ioore(index1);
  var el1 = a[index1];
  if (index2 !== (index2 | 0)) throw $.iae(index2);
  if (index2 < 0 || index2 >= t1) throw $.ioore(index2);
  var el2 = a[index2];
  if (index3 !== (index3 | 0)) throw $.iae(index3);
  if (index3 < 0 || index3 >= t1) throw $.ioore(index3);
  var el3 = a[index3];
  if (index4 !== (index4 | 0)) throw $.iae(index4);
  if (index4 < 0 || index4 >= t1) throw $.ioore(index4);
  var el4 = a[index4];
  if (index5 !== (index5 | 0)) throw $.iae(index5);
  if (index5 < 0 || index5 >= t1) throw $.ioore(index5);
  var el5 = a[index5];
  if ($.gtB(compare.$call$2(el1, el2), 0)) {
    var t0 = el1;
    el1 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.$call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.$call$2(el1, el3), 0)) {
    t0 = el3;
    el3 = el1;
    el1 = t0;
  }
  if ($.gtB(compare.$call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.$call$2(el1, el4), 0)) {
    t0 = el1;
    el1 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.$call$2(el3, el4), 0)) {
    t0 = el3;
    el3 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.$call$2(el2, el5), 0)) {
    t0 = el5;
    el5 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.$call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.$call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  t1 = a.length;
  if (index1 < 0 || index1 >= t1) throw $.ioore(index1);
  a[index1] = el1;
  var t2 = a.length;
  if (index3 < 0 || index3 >= t2) throw $.ioore(index3);
  a[index3] = el3;
  var t3 = a.length;
  if (index5 < 0 || index5 >= t3) throw $.ioore(index5);
  a[index5] = el5;
  if (left !== (left | 0)) throw $.iae(left);
  var t4 = a.length;
  if (left < 0 || left >= t4) throw $.ioore(left);
  var t5 = a[left];
  if (index2 < 0 || index2 >= t4) throw $.ioore(index2);
  a[index2] = t5;
  if (right !== (right | 0)) throw $.iae(right);
  t5 = a.length;
  if (right < 0 || right >= t5) throw $.ioore(right);
  var t6 = a[right];
  if (index4 < 0 || index4 >= t5) throw $.ioore(index4);
  a[index4] = t6;
  var less = left + 1;
  if (typeof less !== 'number') return $.DualPivotQuicksort__dualPivotQuicksort$bailout(2, a, left, right, compare, index5, el2, index1, el4, less, 0, 0, 0, 0, 0);
  var great = right - 1;
  if (typeof great !== 'number') return $.DualPivotQuicksort__dualPivotQuicksort$bailout(3, a, left, right, compare, index5, el2, great, less, el4, index1, 0, 0, 0, 0);
  var pivots_are_equal = $.eqB(compare.$call$2(el2, el4), 0);
  if (pivots_are_equal) {
    for (var k = less; k <= great; ++k) {
      if (k !== (k | 0)) throw $.iae(k);
      t1 = a.length;
      if (k < 0 || k >= t1) throw $.ioore(k);
      var ak = a[k];
      var comp = compare.$call$2(ak, el2);
      if (typeof comp !== 'number') return $.DualPivotQuicksort__dualPivotQuicksort$bailout(4, a, left, right, compare, less, k, index1, index5, el2, pivots_are_equal, ak, comp, el4, great);
      if (comp === 0) continue;
      if (comp < 0) {
        if (!(k === less)) {
          if (less !== (less | 0)) throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1) throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1) throw $.ioore(k);
          a[k] = t2;
          t2 = a.length;
          if (less < 0 || less >= t2) throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else {
        for (; true; ) {
          if (great !== (great | 0)) throw $.iae(great);
          t1 = a.length;
          if (great < 0 || great >= t1) throw $.ioore(great);
          comp = compare.$call$2(a[great], el2);
          if ($.gtB(comp, 0)) {
            --great;
            continue;
          } else {
            t1 = $.ltB(comp, 0);
            var great0 = great - 1;
            t2 = a.length;
            if (t1) {
              if (less !== (less | 0)) throw $.iae(less);
              if (less < 0 || less >= t2) throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2) throw $.ioore(k);
              a[k] = t1;
              var less0 = less + 1;
              t1 = a.length;
              if (great < 0 || great >= t1) throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1) throw $.ioore(less);
              a[less] = t3;
              t3 = a.length;
              if (great < 0 || great >= t3) throw $.ioore(great);
              a[great] = ak;
              great = great0;
              less = less0;
              break;
            } else {
              if (great < 0 || great >= t2) throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2) throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1) throw $.ioore(great);
              a[great] = ak;
              great = great0;
              break;
            }
          }
        }
      }
    }
  } else {
    for (k = less; k <= great; ++k) {
      if (k !== (k | 0)) throw $.iae(k);
      t1 = a.length;
      if (k < 0 || k >= t1) throw $.ioore(k);
      ak = a[k];
      if ($.ltB(compare.$call$2(ak, el2), 0)) {
        if (!(k === less)) {
          if (less !== (less | 0)) throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1) throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1) throw $.ioore(k);
          a[k] = t2;
          t2 = a.length;
          if (less < 0 || less >= t2) throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else {
        if ($.gtB(compare.$call$2(ak, el4), 0)) {
          for (; true; ) {
            if (great !== (great | 0)) throw $.iae(great);
            t1 = a.length;
            if (great < 0 || great >= t1) throw $.ioore(great);
            if ($.gtB(compare.$call$2(a[great], el4), 0)) {
              --great;
              if (great < k) break;
              continue;
            } else {
              t1 = a.length;
              if (great < 0 || great >= t1) throw $.ioore(great);
              t1 = $.ltB(compare.$call$2(a[great], el2), 0);
              great0 = great - 1;
              t2 = a.length;
              if (t1) {
                if (less !== (less | 0)) throw $.iae(less);
                if (less < 0 || less >= t2) throw $.ioore(less);
                t1 = a[less];
                if (k < 0 || k >= t2) throw $.ioore(k);
                a[k] = t1;
                less0 = less + 1;
                t1 = a.length;
                if (great < 0 || great >= t1) throw $.ioore(great);
                t3 = a[great];
                if (less < 0 || less >= t1) throw $.ioore(less);
                a[less] = t3;
                t3 = a.length;
                if (great < 0 || great >= t3) throw $.ioore(great);
                a[great] = ak;
                great = great0;
                less = less0;
              } else {
                if (great < 0 || great >= t2) throw $.ioore(great);
                t1 = a[great];
                if (k < 0 || k >= t2) throw $.ioore(k);
                a[k] = t1;
                t1 = a.length;
                if (great < 0 || great >= t1) throw $.ioore(great);
                a[great] = ak;
                great = great0;
              }
              break;
            }
          }
        }
      }
    }
  }
  t1 = less - 1;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  t2 = a.length;
  if (t1 < 0 || t1 >= t2) throw $.ioore(t1);
  t3 = a[t1];
  if (left < 0 || left >= t2) throw $.ioore(left);
  a[left] = t3;
  t3 = a.length;
  if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
  a[t1] = el2;
  t1 = great + 1;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  t4 = a.length;
  if (t1 < 0 || t1 >= t4) throw $.ioore(t1);
  t5 = a[t1];
  if (right < 0 || right >= t4) throw $.ioore(right);
  a[right] = t5;
  t5 = a.length;
  if (t1 < 0 || t1 >= t5) throw $.ioore(t1);
  a[t1] = el4;
  $.DualPivotQuicksort__doSort(a, left, less - 2, compare);
  $.DualPivotQuicksort__doSort(a, great + 2, right, compare);
  if (pivots_are_equal) return;
  if (less < index1 && great > index5) {
    while (true) {
      if (less !== (less | 0)) throw $.iae(less);
      t1 = a.length;
      if (less < 0 || less >= t1) throw $.ioore(less);
      if (!$.eqB(compare.$call$2(a[less], el2), 0)) break;
      ++less;
    }
    while (true) {
      if (great !== (great | 0)) throw $.iae(great);
      t1 = a.length;
      if (great < 0 || great >= t1) throw $.ioore(great);
      if (!$.eqB(compare.$call$2(a[great], el4), 0)) break;
      --great;
    }
    for (k = less; k <= great; ++k) {
      if (k !== (k | 0)) throw $.iae(k);
      t1 = a.length;
      if (k < 0 || k >= t1) throw $.ioore(k);
      ak = a[k];
      if ($.eqB(compare.$call$2(ak, el2), 0)) {
        if (!(k === less)) {
          if (less !== (less | 0)) throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1) throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1) throw $.ioore(k);
          a[k] = t2;
          t2 = a.length;
          if (less < 0 || less >= t2) throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else {
        if ($.eqB(compare.$call$2(ak, el4), 0)) {
          for (; true; ) {
            if (great !== (great | 0)) throw $.iae(great);
            t1 = a.length;
            if (great < 0 || great >= t1) throw $.ioore(great);
            if ($.eqB(compare.$call$2(a[great], el4), 0)) {
              --great;
              if (great < k) break;
              continue;
            } else {
              t1 = a.length;
              if (great < 0 || great >= t1) throw $.ioore(great);
              t1 = $.ltB(compare.$call$2(a[great], el2), 0);
              t2 = a.length;
              great0 = great - 1;
              if (t1) {
                if (less !== (less | 0)) throw $.iae(less);
                if (less < 0 || less >= t2) throw $.ioore(less);
                t1 = a[less];
                if (k < 0 || k >= t2) throw $.ioore(k);
                a[k] = t1;
                less0 = less + 1;
                t1 = a.length;
                if (great < 0 || great >= t1) throw $.ioore(great);
                t3 = a[great];
                if (less < 0 || less >= t1) throw $.ioore(less);
                a[less] = t3;
                t3 = a.length;
                if (great < 0 || great >= t3) throw $.ioore(great);
                a[great] = ak;
                great = great0;
                less = less0;
              } else {
                if (great < 0 || great >= t2) throw $.ioore(great);
                t1 = a[great];
                if (k < 0 || k >= t2) throw $.ioore(k);
                a[k] = t1;
                t1 = a.length;
                if (great < 0 || great >= t1) throw $.ioore(great);
                a[great] = ak;
                great = great0;
              }
              break;
            }
          }
        }
      }
    }
    $.DualPivotQuicksort__doSort(a, less, great, compare);
  } else $.DualPivotQuicksort__doSort(a, less, great, compare);
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.UserRepository$ = function() {
  return new $.UserRepository();
};

$.ZeDate_ZeDate$fromString = function(dateString) {
  for (var t1 = $.iterator($.CTC11.allMatches$1(dateString)); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    return $.ZeDate$($.Math_parseInt(t2.group$1(3)), $.Math_parseInt(t2.group$1(2)), $.Math_parseInt(t2.group$1(1)));
  }
};

$.Math_parseDouble = function(str) {
  return $.MathNatives_parseDouble(str);
};

$.MathNatives_parseDouble = function(str) {
  $.checkString(str);
  var ret = (parseFloat(str));
  if (ret === 0) {
    var t1 = $.startsWith(str, '0x') === true || $.startsWith(str, '0X') === true;
  } else t1 = false;
  if (t1) ret = (parseInt(str));
  if ($.isNaN(ret) === true && (!$.eqB(str, 'NaN') && !$.eqB(str, '-NaN'))) throw $.captureStackTrace($.BadNumberFormatException$(str));
  return ret;
};

$.captureStackTrace = function(ex) {
  if (ex == null) ex = $.CTC0;
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.DualPivotQuicksort_insertionSort_ = function(a, left, right, compare) {
  if (typeof a !== 'object' || a === null || ((a.constructor !== Array || !!a.immutable$list) && !a.is$JavaScriptIndexingBehavior())) return $.DualPivotQuicksort_insertionSort_$bailout(1, a, left, right, compare);
  if (typeof left !== 'number') return $.DualPivotQuicksort_insertionSort_$bailout(1, a, left, right, compare);
  if (typeof right !== 'number') return $.DualPivotQuicksort_insertionSort_$bailout(1, a, left, right, compare);
  for (var i = left + 1; i <= right; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var el = a[i];
    var j = i;
    while (true) {
      if (j > left) {
        t1 = j - 1;
        if (t1 !== (t1 | 0)) throw $.iae(t1);
        var t2 = a.length;
        if (t1 < 0 || t1 >= t2) throw $.ioore(t1);
        var t3 = $.gtB(compare.$call$2(a[t1], el), 0);
        t1 = t3;
      } else t1 = false;
      if (!t1) break;
      t1 = j - 1;
      if (t1 !== (t1 | 0)) throw $.iae(t1);
      t2 = a.length;
      if (t1 < 0 || t1 >= t2) throw $.ioore(t1);
      t1 = a[t1];
      if (j !== (j | 0)) throw $.iae(j);
      if (j < 0 || j >= t2) throw $.ioore(j);
      a[j] = t1;
      --j;
    }
    if (j !== (j | 0)) throw $.iae(j);
    t1 = a.length;
    if (j < 0 || j >= t1) throw $.ioore(j);
    a[j] = el;
  }
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a >= b;
  return a.operator$ge$1(b);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.floor$0();
  return Math.floor(receiver);
};

$.MonthDisplayView$ = function(expander) {
  return new $.MonthDisplayView(null, null, null, null, expander);
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) return $.typeNameInChrome;
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC12) === true) return $.typeNameInChrome;
  if ($.contains$1(userAgent, 'Firefox') === true) return $.typeNameInFirefox;
  if ($.contains$1(userAgent, 'MSIE') === true) return $.typeNameInIE;
  if ($.contains$1(userAgent, 'Opera') === true) return $.typeNameInOpera;
  if ($.contains$1(userAgent, 'Safari') === true) return $.typeNameInSafari;
  return $.constructorNameFallback;
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31) return 0;
      return a >>> b;
    }
    if (b > 31) b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.Project$ = function(name$, activities) {
  return new $.Project(activities, name$);
};

$._XMLHttpRequestEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._JsDeserializer$().deserialize$1(message);
  return message;
};

$.checkBool = function(value) {
  if (!(typeof value === 'boolean')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  !(target == null) && (target.builtin$typeInfo = typeInfo);
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string')) return receiver.hashCode$0();
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + (receiver.charCodeAt(i));
    var hash1 = 536870911 & hash0 + (524287 & hash0 << 10);
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + (67108863 & hash << 3);
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + (16383 & hash0 << 15);
};

$.FutureImpl_FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$();
  res._setValue$1(value);
  return res;
};

$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a * b;
  return a.operator$mul$1(b);
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$._waitForPendingPorts = function(message, callback) {
  var finder = $._PendingSendPortFinder$();
  finder.traverse$1(message);
  $.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  }
  return receiver.charCodeAt$1(index);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null) $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.$call$1(obj);
};

$.checkInt = function(value) {
  if (!((typeof value === 'number') && (value === (value | 0)))) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$.document = function() {
  return document;;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$.DayDisplayModel$ = function(day) {
  return new $.DayDisplayModel(day);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null) {
    if ($._Device_isFirefox() === true) $._cachedBrowserPrefix = '-moz-';
    else $._cachedBrowserPrefix = '-webkit-';
  }
  return $._cachedBrowserPrefix;
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$.neg = function(a) {
  if (typeof a === "number") return -a;
  return a.operator$negate$0();
};

$.Strings_join = function(strings, separator) {
  return $.StringBase_join(strings, separator);
};

$.StringBase_join = function(strings, separator) {
  $.checkNull(strings);
  $.checkNull(separator);
  if (!(typeof separator === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(separator));
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), separator);
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.Math_parseInt = function(str) {
  return $.MathNatives_parseInt(str);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length;
  return receiver.get$length();
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$.MathNatives_parseInt = function(str) {
  $.checkString(str);
  if (!(/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))) throw $.captureStackTrace($.BadNumberFormatException$(str));
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2)) {
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  } else t1 = false;
  if (!t1) {
    if ($.gtB($.get$length(trimmed), 3)) {
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    } else t1 = false;
  } else t1 = true;
  var base = t1 ? 16 : 10;
  var ret = (parseInt(trimmed, base));
  if ($.isNaN(ret) === true) throw $.captureStackTrace($.BadNumberFormatException$(str));
  return ret;
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  if (method == null && !($._dynamicMetadata0() == null)) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method == null)) break;
      }
    }
  }
  if (method == null) method = (methods['Object']);
  var proto = (Object.getPrototypeOf(obj));
  if (method == null) method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  (!proto.hasOwnProperty(name$)) && $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') return isNaN(receiver);
  return receiver.isNaN$0();
};

$.JSON_parse = function(json) {
  return $._JsonParser_parse(json);
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  multiLine === true && $.add$1(sb, 'm');
  ignoreCase === true && $.add$1(sb, 'i');
  global === true && $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, (String(e))));
  }
};

$._JsonParser_parse = function(json) {
  return $._JsonParser$_internal(json)._parseToplevel$0();
};

$.Dialog$ = function(text, content$, okButtonText, cancelButtonText) {
  return new $.Dialog(null, null, null, cancelButtonText, okButtonText, content$, text);
};

$.main = function() {
  $.AppBuilder_buildApp().start$0();
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.Primitives_getYear = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCFullYear()) : ($.Primitives_lazyAsJsDate(receiver).getFullYear());
};

$.LoginModel$ = function(userRepository) {
  return new $.LoginModel(userRepository, null);
};

$.Primitives_getHours = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCHours()) : ($.Primitives_lazyAsJsDate(receiver).getHours());
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$._XMLHttpRequestFactoryProvider_XMLHttpRequest = function() {
  return new XMLHttpRequest();;
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.Primitives_patchUpY2K = function(value, years, isUtc) {
  var date = (new Date(value));
  if (isUtc === true) date.setUTCFullYear(years);
  else date.setFullYear(years);
  return date.valueOf();
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0)) return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  if ($.eqB(numberOfArguments, 1)) return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  if ($.eqB(numberOfArguments, 2)) return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.ZeTime_ZeTime$_fromStringWithColon = function(timeString) {
  if (timeString == null) return;
  for (var t1 = $.iterator($.CTC9.allMatches$1(timeString)), parsedMinutes = null, parsedHour = null; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    parsedHour = $.Math_parseInt(t2.group$1(1));
    parsedMinutes = $.Math_parseInt(t2.group$1(2));
  }
  if (parsedHour == null || parsedMinutes == null) return;
  return $.ZeTime$(parsedHour, parsedMinutes);
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b) === true;
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$.App$ = function(activityProvider, timeEntryProvider, monthDisplayFactory, settings, expander) {
  return new $.App(expander, settings, monthDisplayFactory, timeEntryProvider, activityProvider);
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.abs$0();
  return Math.abs(receiver);
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.WebServiceRequester$ = function(login) {
  return new $.WebServiceRequester(login);
};

$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(a, b)) return -1;
    if ($.gtB(a, b)) return 1;
    if ($.eqB(a, b)) {
      if ($.eqB(a, 0)) {
        var aIsNegative = $.isNegative(a);
        if ($.eqB(aIsNegative, $.isNegative(b))) return 0;
        if (aIsNegative === true) return -1;
        return 1;
      }
      return 0;
    }
    if ($.isNaN(a) === true) {
      if ($.isNaN(b) === true) return 0;
      return 1;
    }
    return -1;
  }
  if (typeof a === 'string') {
    if (!(typeof b === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a == b) var t1 = 0;
    else {
      t1 = (a < b) ? -1 : 1;
    }
    return t1;
  }
  return a.compareTo$1(b);
};

$.Primitives_getMilliseconds = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCMilliseconds()) : ($.Primitives_lazyAsJsDate(receiver).getMilliseconds());
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b) === true;
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = (a % b);
    if (result === 0) return 0;
    if (result > 0) return result;
    b = (b);
    if (b < 0) return result - b;
    return result + b;
  }
  return a.operator$mod$1(b);
};

$.map = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.map$1(f);
  return $.Collections_map(receiver, [], f);
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.DateImplementation$fromMillisecondsSinceEpoch = function(millisecondsSinceEpoch, isUtc) {
  var t1 = new $.DateImplementation(isUtc, millisecondsSinceEpoch);
  t1.DateImplementation$fromMillisecondsSinceEpoch$2(millisecondsSinceEpoch, isUtc);
  return t1;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument')) return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent')) return 'MessageEvent';
  return name$;
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a - b;
  return a.operator$sub$1(b);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0) return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$.Collections_map = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    $.add$1(destination, f.$call$1(t1.next$0()));
  }
  return destination;
};

$._Elements_TextAreaElement = function() {
  return $._document().$dom_createElement$1('textarea');
};

$._addToEncoding = function(offset, bytes, value, buffer) {
  if (typeof offset !== 'number') return $._addToEncoding$bailout(1, offset, bytes, value, buffer);
  if (typeof bytes !== 'number') return $._addToEncoding$bailout(1, offset, bytes, value, buffer);
  if (value !== (value | 0)) return $._addToEncoding$bailout(1, offset, bytes, value, buffer);
  if (typeof buffer !== 'object' || buffer === null || ((buffer.constructor !== Array || !!buffer.immutable$list) && !buffer.is$JavaScriptIndexingBehavior())) return $._addToEncoding$bailout(1, offset, bytes, value, buffer);
  for (; bytes > 0; ) {
    var t1 = offset + bytes;
    var t2 = (128 | value & 63) >>> 0;
    if (t1 !== (t1 | 0)) throw $.iae(t1);
    var t3 = buffer.length;
    if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
    buffer[t1] = t2;
    value = $.shr(value, 6);
    --bytes;
  }
  return value;
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLDDElement')) return 'HTMLElement';
  if ($.eqB(name$, 'HTMLDTElement')) return 'HTMLElement';
  if ($.eqB(name$, 'HTMLTableDataCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLPhraseElement')) return 'HTMLElement';
  if ($.eqB(name$, 'MSStyleCSSProperties')) return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'MouseWheelEvent')) return 'WheelEvent';
  return name$;
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string')) return receiver.trim$0();
  return receiver.trim();
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.Primitives_newList = function(length$) {
  if (length$ == null) return new Array();
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b);
};

$._globalState = function() {
  return $globalState;;
};

$._globalState0 = function(val) {
  $globalState = val;;
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null) endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$)) throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.window = function() {
  return window;;
};

$._uriEncode = function(canonical, text) {
  if (typeof text !== 'string' && (typeof text !== 'object' || text === null || (text.constructor !== Array && !text.is$JavaScriptIndexingBehavior()))) return $._uriEncode$bailout(1, canonical, text);
  var byteToHex = new $._uriEncode_anon('0123456789ABCDEF');
  var result = $.StringBufferImpl$('');
  for (var i = 0; t1 = text.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.geB($.indexOf$1(canonical, text[i]), 0)) {
      t1 = text.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      result.add$1(text[i]);
    } else {
      var ch = $.charCodeAt(text, i);
      if ($.geB(ch, 55296) && $.ltB(ch, 56320)) {
        ++i;
        var nextCh = text.length === i ? 0 : $.charCodeAt(text, i);
        if ($.geB(nextCh, 56320) && $.ltB(nextCh, 57344)) {
          t1 = $.shl($.sub(ch, 55296), 10);
          if (typeof t1 !== 'number') throw $.iae(t1);
          t1 += 65536;
          var t2 = $.sub(nextCh, 56320);
          if (typeof t2 !== 'number') throw $.iae(t2);
          var ch0 = t1 + t2;
        } else throw $.captureStackTrace($.IllegalArgumentException$('Malformed URI'));
        ch = ch0;
      }
      for (t1 = $.iterator($.codepointsToUtf8([ch], 0, null)); t1.hasNext$0() === true; ) {
        result.add$1(byteToHex.$call$1(t1.next$0()));
      }
    }
  }
  return result.toString$0();
  var t1;
};

$.DayDisplayFactory$ = function(expander, timeEntryEditorFactory) {
  return new $.DayDisplayFactory(timeEntryEditorFactory, expander);
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.Primitives_getMinutes = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCMinutes()) : ($.Primitives_lazyAsJsDate(receiver).getMinutes());
};

$.Primitives_lazyAsJsDate = function(receiver) {
  (receiver.date === (void 0)) && (receiver.date = new Date(receiver.get$millisecondsSinceEpoch()));
  return receiver.date;
};

$.Primitives_getDay = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCDate()) : ($.Primitives_lazyAsJsDate(receiver).getDate());
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$._JsonParser$_internal = function(json) {
  var t1 = new $._JsonParser(0, $.get$length(json), json);
  t1._JsonParser$_internal$1(json);
  return t1;
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.Login$ = function(model, view) {
  return new $.Login(model, view);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.ZeDate_ZeDate$currentDay = function() {
  return $.ZeDate_ZeDate$fromDate($.DateImplementation$now());
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.ZeDate_ZeDate$fromDate = function(date) {
  return $.ZeDate$(date.get$day(), date.get$month(), date.get$year());
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$.StringBase_createFromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  if ($.isJsArray(charCodes) !== true) {
    if (!((typeof charCodes === 'object' && charCodes !== null) && (((charCodes.constructor === Array) || charCodes.is$List())))) throw $.captureStackTrace($.IllegalArgumentException$(charCodes));
    var charCodes0 = $.ListFactory_List$from(charCodes);
    charCodes = charCodes0;
  }
  return $.Primitives_stringFromCharCodes(charCodes);
};

$.CompleterImpl$ = function() {
  return new $.CompleterImpl($.FutureImpl$());
};

$.TimeEntryProvider$ = function(errorDisplay, repository, webServiceRequester) {
  return new $.TimeEntryProvider(null, repository, webServiceRequester, errorDisplay);
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$._Elements_DivElement = function() {
  return $._document().$dom_createElement$1('div');
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a > b;
  return a.operator$gt$1(b);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.DateImplementation$ = function(years, month, day, hour, minute, second, millisecond, isUtc) {
  var t1 = new $.DateImplementation($.checkNull(isUtc), $.Primitives_valueFromDecomposedDate(years, month, day, hour, minute, second, millisecond, isUtc));
  t1.DateImplementation$8(years, month, day, hour, minute, second, millisecond, isUtc);
  return t1;
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver') return 'MutationObserver';
  return name$;
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    !first && $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$._document = function() {
  return document;;
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || ((strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())) return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.ZeTime_ZeTime$fromString = function(timeString) {
  var result = $.ZeTime_ZeTime$_fromStringWithColon(timeString);
  return result == null ? $.ZeTime_ZeTime$_fromStringWithoutColon(timeString) : result;
};

$.TimeEntryEditorView$ = function() {
  return new $.TimeEntryEditorView(null, null, null, null, null, null, null, null, null, null, null, null, null);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || (inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || (tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
  var t1;
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && ($.isEmpty(name$) !== true && (!(name$ === 'Object') && !(name$ === 'Function.prototype')))) return name$;
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$._Collections_map = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    $.add$1(destination, f.$call$1(t1.next$0()));
  }
  return destination;
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b) === true;
};

$.indexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver) === true) return $.Arrays_indexOf(receiver, element, 0, (receiver.length));
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    return receiver.indexOf(element);
  }
  return receiver.indexOf$1(element);
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) return receiver.filter$1(predicate);
  return $.Collections_filter(receiver, [], predicate);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$._ListRangeIteratorImpl$ = function(_source, _offset, _end) {
  return new $._ListRangeIteratorImpl(_end, _offset, _source);
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) return $.truncate((a) / (b));
  return a.operator$tdiv$1(b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) return ex.dartException;
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || ($.eqB(type, 'called_non_callable') || ($.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')))) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NullPointerException$(null, $.CTC);
    }
    if ($.eqB(type, 'undefined_method')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NoSuchMethodException$('', name$, [], null);
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || ($.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)) return $.NullPointerException$(null, $.CTC);
      if ($.endsWith(message, 'is not a function') === true) return $.NoSuchMethodException$('', '<unknown>', [], null);
    }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') return $.StackOverflowException$();
  }
  return ex;
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$.MonthDisplayFactory$ = function(expander, dayDisplayFactory) {
  return new $.MonthDisplayFactory(dayDisplayFactory, expander);
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') return true;
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  return false;
};

$.TimeEntryEditorFactory$ = function(expander, activityProvider, timeEntryProvider) {
  return new $.TimeEntryEditorFactory(expander, timeEntryProvider, activityProvider);
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true) return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true; ) {
    $.add$1(receiver, iterator.next$0());
  }
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.replaceAll = function(receiver, from, to) {
  if (!(typeof receiver === 'string')) return receiver.replaceAll$2(from, to);
  $.checkString(to);
  return $.stringReplaceAllUnchecked(receiver, from, to);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.setRange$3 = function(receiver, start, length$, from) {
  if ($.isJsArray(receiver) === true) return $.setRange$4(receiver, start, length$, from, 0);
  return receiver.setRange$3(start, length$, from);
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $.Arrays_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.codepointsToUtf8 = function(codepoints, offset, length$) {
  var source = $._ListRange$(codepoints, offset, length$);
  for (var t1 = source.iterator$0(), encodedLength = 0; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if ($.ltB(t2, 0) || $.gtB(t2, 1114111)) encodedLength += 3;
    else {
      if ($.leB(t2, 127)) ++encodedLength;
      else {
        if ($.leB(t2, 2047)) encodedLength += 2;
        else {
          if ($.leB(t2, 65535)) encodedLength += 3;
          else {
            if ($.leB(t2, 1114111)) encodedLength += 4;
          }
        }
      }
    }
  }
  var encoded = $.ListFactory_List(encodedLength);
  $.setRuntimeTypeInfo(encoded, ({E: 'int'}));
  for (t1 = source.iterator$0(), insertAt = 0; t1.hasNext$0() === true; ) {
    t2 = t1.next$0();
    if ($.ltB(t2, 0) || $.gtB(t2, 1114111)) {
      $.setRange$3(encoded, insertAt, 3, [239, 191, 189]);
      insertAt += 3;
    } else {
      if ($.leB(t2, 127)) {
        var t3 = encoded.length;
        if (insertAt < 0 || insertAt >= t3) throw $.ioore(insertAt);
        encoded[insertAt] = t2;
        ++insertAt;
      } else {
        if ($.leB(t2, 2047)) {
          t2 = $._addToEncoding(insertAt, 1, t2, encoded);
          if (typeof t2 !== 'number') throw $.iae(t2);
          t3 = (192 | 31 & t2) >>> 0;
          var t4 = encoded.length;
          if (insertAt < 0 || insertAt >= t4) throw $.ioore(insertAt);
          encoded[insertAt] = t3;
          insertAt += 2;
        } else {
          if ($.leB(t2, 65535)) {
            t2 = $._addToEncoding(insertAt, 2, t2, encoded);
            if (typeof t2 !== 'number') throw $.iae(t2);
            t3 = (224 | 15 & t2) >>> 0;
            t4 = encoded.length;
            if (insertAt < 0 || insertAt >= t4) throw $.ioore(insertAt);
            encoded[insertAt] = t3;
            insertAt += 3;
          } else {
            if ($.leB(t2, 1114111)) {
              t2 = $._addToEncoding(insertAt, 3, t2, encoded);
              if (typeof t2 !== 'number') throw $.iae(t2);
              t3 = (240 | 7 & t2) >>> 0;
              t4 = encoded.length;
              if (insertAt < 0 || insertAt >= t4) throw $.ioore(insertAt);
              encoded[insertAt] = t3;
              insertAt += 4;
            }
          }
        }
      }
    }
  }
  return encoded;
  var insertAt;
};

$.Activity$ = function(id, name$) {
  return new $.Activity(name$, id);
};

$.sort = function(receiver, compare) {
  if ($.isJsArray(receiver) !== true) return receiver.sort$1(compare);
  $.checkMutable(receiver, 'sort');
  $.DualPivotQuicksort_sort(receiver, compare);
};

$.DualPivotQuicksort_sort = function(a, compare) {
  $.DualPivotQuicksort__doSort(a, 0, $.sub($.get$length(a), 1), compare);
};

$._ElementFactoryProvider_Element$tag = function(tag) {
  return document.createElement(tag);
};

$.LoginView$ = function() {
  return new $.LoginView(null, null);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') return receiver.split(pattern);
  if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp) return receiver.split($.regExpGetNative(pattern));
  throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a < b;
  return a.operator$lt$1(b);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection())) {
    if ($.Collections__containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    } else $.Collections__emitCollection(o, result, visiting);
  } else {
    if (typeof o === 'object' && o !== null && o.is$Map()) {
      if ($.Collections__containsRef(visiting, o) === true) $.add$1(result, '{...}');
      else $.Maps__emitMap(o, result, visiting);
    } else {
      $.add$1(result, o == null ? 'null' : o);
    }
  }
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$.DayDisplayView$ = function(expander) {
  return new $.DayDisplayView(null, null, null, null, null, null, expander);
};

$._AttributeClassSet$ = function(element) {
  return new $._AttributeClassSet(element);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.Strings_String$fromCharCodes = function(charCodes) {
  return $.StringBase_createFromCharCodes(charCodes);
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: '_IsolateEvent'}));
  return new $._EventLoop(t1);
};

$._OptionElementFactoryProvider_OptionElement = function(data, value, defaultSelected, selected) {
            if (data == null) return new Option();
          if (value == null) return new Option(data);
          if (defaultSelected == null) return new Option(data, value);
          if (selected == null) return new Option(data, value, defaultSelected);
          return new Option(data, value, defaultSelected, selected);
      ;
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.Primitives_stringFromCharCodes = function(charCodes) {
  for (var t1 = $.iterator(charCodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (!((typeof t2 === 'number') && (t2 === (t2 | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(t2));
  }
  return String.fromCharCode.apply(null, charCodes);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true) return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$.MonthDisplayModel$ = function(month) {
  return new $.MonthDisplayModel(month);
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$._ElementAttributeMap$ = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) return false;
  if (typeof otherLength !== 'number') throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) return;
  return result;
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.Primitives_getMonth = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCMonth()) + 1 : ($.Primitives_lazyAsJsDate(receiver).getMonth()) + 1;
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.typeNameInSafari = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'WebKitMutationObserver')) return 'MutationObserver';
  return name$;
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$.SettingsView$ = function(expander) {
  return new $.SettingsView(null, null, null, null, null, null, expander);
};

$._dynamicMetadata0 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null) {
    if ($.isJsArray(value) === true) return $.Collections_collectionToString(value);
    return value.toString$0();
  }
  if (value === 0 && (1 / value) < 0) return '-0.0';
  if (value == null) return 'null';
  if (typeof value == "function") return 'Closure';
  return String(value);
};

$.Primitives_getSeconds = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCSeconds()) : ($.Primitives_lazyAsJsDate(receiver).getSeconds());
};

$.ZeTime$ = function(hour, minutes) {
  return new $.ZeTime(minutes, hour);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a + b;
  return a.operator$add$1(b);
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  }
  return receiver.isNegative$0();
};

$.Settings$ = function(view, activityProvider) {
  return new $.Settings(activityProvider, view);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$._PendingSendPortFinder$ = function() {
  var t1 = $._MessageTraverserVisitedMap$();
  t1 = new $._PendingSendPortFinder([], t1);
  t1._PendingSendPortFinder$0();
  return t1;
};

$.DualPivotQuicksort__doSort = function(a, left, right, compare) {
  if ($.leB($.sub(right, left), 32)) $.DualPivotQuicksort_insertionSort_(a, left, right, compare);
  else $.DualPivotQuicksort__dualPivotQuicksort(a, left, right, compare);
};

$.Futures_wait = function(futures) {
  var t1 = ({});
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || (futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))) return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, ({T: 'List'}));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, ({T: 'List'}));
  var result = completer.get$future();
  t1.remaining_1 = futures.length;
  var values = $.ListFactory_List(futures.length);
  for (var i = 0; t2 = futures.length, i < t2; ++i) {
    if (i < 0 || i >= t2) throw $.ioore(i);
    var future = futures[i];
    future.then$1(new $.Futures_wait_anon(completer, i, t1, result, values));
    future.handleException$1(new $.Futures_wait_anon0(future, completer, result));
  }
  return result;
  var t2;
};

$.checkNull = function(object) {
  if (object == null) throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || src === null || (src.constructor !== Array && !src.is$JavaScriptIndexingBehavior()))) return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || dst === null || ((dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior())) return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof count !== 'number') return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart == null) srcStart = 0;
  if (typeof srcStart !== 'number') return $.Arrays_copy$bailout(2, src, dst, dstStart, count, srcStart);
  if (dstStart == null) dstStart = 0;
  if (typeof dstStart !== 'number') return $.Arrays_copy$bailout(3, src, dst, count, srcStart, dstStart);
  if (srcStart < dstStart) {
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i !== (i | 0)) throw $.iae(i);
      var t1 = src.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t3 = dst.length;
      if (j < 0 || j >= t3) throw $.ioore(j);
      dst[j] = t2;
    }
  } else {
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i !== (i | 0)) throw $.iae(i);
      t2 = src.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t3 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t4 = dst.length;
      if (j < 0 || j >= t4) throw $.ioore(j);
      dst[j] = t3;
    }
  }
};

$.DateImplementation$now = function() {
  var t1 = new $.DateImplementation(false, $.Primitives_dateNow());
  t1.DateImplementation$now$0();
  return t1;
};

$.Primitives_getWeekday = function(receiver) {
  var weekday = receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCDay()) : ($.Primitives_lazyAsJsDate(receiver).getDay());
  return $.mod(weekday + 6, 7) + 1;
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$.ZeDate$ = function(day, month, year) {
  return new $.ZeDate(year, month, day);
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index)) throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.TimeEntryEditorModel$ = function(timeEntry, activityProvider, timeEntryProvider) {
  var t1 = new $.TimeEntryEditorModel(null, null, timeEntryProvider, activityProvider, null, null);
  t1.TimeEntryEditorModel$3(timeEntry, activityProvider, timeEntryProvider);
  return t1;
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref) return true;
  }
  return false;
};

$.AppBuilder_buildApp = function() {
  if ($.AppBuilder_app == null) {
    var errorDisplay = $.ErrorDisplay$();
    var expander = $.Expander$();
    var webServiceRequester = $.WebServiceRequester$($.Login$($.LoginModel$($.UserRepository$()), $.LoginView$()));
    var activityProvider = $.ActivityProvider$(errorDisplay, $.ActivityRepository$(), webServiceRequester);
    var timeEntryProvider = $.TimeEntryProvider$(errorDisplay, $.TimeEntryRepository$(), webServiceRequester);
    $.AppBuilder_app = $.App$(activityProvider, timeEntryProvider, $.MonthDisplayFactory$(expander, $.DayDisplayFactory$(expander, $.TimeEntryEditorFactory$(expander, activityProvider, timeEntryProvider))), $.Settings$($.SettingsView$(expander), activityProvider), expander);
  }
  return $.AppBuilder_app;
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$.Primitives_valueFromDecomposedDate = function(years, month, day, hours, minutes, seconds, milliseconds, isUtc) {
  $.checkInt(years);
  $.checkInt(month);
  if ($.ltB(month, 1) || $.ltB(12, month)) throw $.captureStackTrace($.IllegalArgumentException$(month));
  $.checkInt(day);
  if ($.ltB(day, 1) || $.ltB(31, day)) throw $.captureStackTrace($.IllegalArgumentException$(day));
  $.checkInt(hours);
  if ($.ltB(hours, 0) || $.ltB(24, hours)) throw $.captureStackTrace($.IllegalArgumentException$(hours));
  $.checkInt(minutes);
  if ($.ltB(minutes, 0) || $.ltB(59, minutes)) throw $.captureStackTrace($.IllegalArgumentException$(minutes));
  $.checkInt(seconds);
  if ($.ltB(seconds, 0) || $.ltB(59, seconds)) throw $.captureStackTrace($.IllegalArgumentException$(seconds));
  $.checkInt(milliseconds);
  if ($.ltB(milliseconds, 0) || $.ltB(999, milliseconds)) throw $.captureStackTrace($.IllegalArgumentException$(milliseconds));
  $.checkBool(isUtc);
  var jsMonth = $.sub(month, 1);
  var value = isUtc === true ? (Date.UTC(years, jsMonth, day, hours, minutes, seconds, milliseconds)) : (new Date(years, jsMonth, day, hours, minutes, seconds, milliseconds).valueOf());
  if ($.isNaN(value) === true) throw $.captureStackTrace($.IllegalArgumentException$(''));
  if ($.leB(years, 0) || $.ltB(years, 100)) return $.Primitives_patchUpY2K(value, years, isUtc);
  return value;
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$((exception.stack));
};

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(message, fn, isolate);
};

$.stringReplaceAllUnchecked = function(receiver, from, to) {
  if (typeof receiver !== 'string') return $.stringReplaceAllUnchecked$bailout(1, receiver, from, to);
  if (typeof from === 'string') {
    if (from === '') {
      if (receiver === '') return to;
      var result = $.StringBufferImpl$('');
      var length$ = receiver.length;
      result.add$1(to);
      for (var i = 0; i < length$; ++i) {
        var t1 = receiver.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        result.add$1(receiver[i]);
        result.add$1(to);
      }
      return result.toString$0();
    }
    return $.stringReplaceJS(receiver, $.regExpMakeNative($.JSSyntaxRegExp$((from.replace($.regExpMakeNative($.CTC6, true), "\\$&")), false, false), true), to);
  }
  if (typeof from === 'object' && from !== null && !!from.is$JSSyntaxRegExp) return $.stringReplaceJS(receiver, $.regExpMakeNative(from, true), to);
  $.checkNull(from);
  throw $.captureStackTrace('StringImplementation.replaceAll(Pattern) UNIMPLEMENTED');
};

$.jsPropertyAccess = function(jsObject, property) {
  return jsObject[property];
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = ({});
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._Deserializer_isPrimitive = function(x) {
  return x == null || (typeof x === 'string' || (typeof x === 'number' || typeof x === 'boolean'));
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || (typeof x === 'string' || (typeof x === 'number' || typeof x === 'boolean'));
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$.TimeEntry$ = function(id, activityId, date, start, end, comment) {
  return new $.TimeEntry(comment, end, start, date, activityId, id);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.le = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b);
};

$.Expander$ = function() {
  return new $.Expander();
};

$.JSSyntaxRegExp$ = function(pattern, multiLine, ignoreCase) {
  return new $.JSSyntaxRegExp(ignoreCase, multiLine, pattern);
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._JsSerializer$().traverse$1(message);
  return $._JsCopier$().traverse$1(message);
};

$.encodeUriComponent = function(component) {
  return $._uriEncode('-_.!~*\'()0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', component);
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) return a[key];
  }
  return $.index$slow(a, index);
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a <= b;
  return a.operator$le$1(b);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.ActivityProvider$ = function(errorDisplay, repository, requester) {
  return new $.ActivityProvider(null, repository, requester, errorDisplay);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  return name$;
};

$._window = function() {
  return typeof window != 'undefined' ? window : (void 0);;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.Primitives_dateNow = function() {
  return Date.now();
};

$._Elements_SpanElement = function() {
  return $._document().$dom_createElement$1('span');
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$._Elements_AnchorElement = function(href) {
  var _e = $._document().$dom_createElement$1('a');
  !(href == null) && _e.set$href(href);
  return _e;
};

$.NotImplementedException$ = function(message) {
  return new $.NotImplementedException(message);
};

$.DurationImplementation$ = function(days, hours, minutes, seconds, milliseconds) {
  return new $.DurationImplementation($.add($.add($.add($.add($.mul(days, 86400000), $.mul(hours, 3600000)), $.mul(minutes, 60000)), $.mul(seconds, 1000)), milliseconds));
};

$._ListRange$ = function(source, offset, length$) {
  var t1 = length$ == null ? $.sub($.get$length(source), offset) : length$;
  t1 = new $._ListRange(t1, offset, source);
  t1._ListRange$3(source, offset, length$);
  return t1;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$.eq = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b);
  }
  return a === b;
};

$._XMLHttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.FutureImpl$ = function() {
  var t1 = [];
  var t2 = [];
  return new $.FutureImpl([], t2, t1, false, null, null, null, false);
};

$.MonthDisplay$ = function(model, view, dayDisplayFactory) {
  return new $.MonthDisplay(dayDisplayFactory, model, view);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$.setRange$4 = function(receiver, start, length$, from, startFrom) {
  if ($.isJsArray(receiver) !== true) return receiver.setRange$4(start, length$, from, startFrom);
  $.checkMutable(receiver, 'indexed set');
  if (length$ === 0) return;
  $.checkNull(start);
  $.checkNull(length$);
  $.checkNull(from);
  $.checkNull(startFrom);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (!((typeof startFrom === 'number') && (startFrom === (startFrom | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(startFrom));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = start + length$;
  if ($.gtB(t1, $.get$length(receiver))) throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  $.Arrays_copy(from, startFrom, receiver, start, length$);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b) === true;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') return !($.indexOf$2(receiver, other, startIndex) === -1);
  if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp) return other.hasMatch$1($.substring$1(receiver, startIndex));
  return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.ZeTime_ZeTime$_fromStringWithoutColon = function(timeString) {
  if (timeString == null) return;
  for (var t1 = $.iterator($.CTC8.allMatches$1(timeString)), parsedMinutes = null, parsedHour = null; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    parsedHour = $.Math_parseInt(t2.group$1(1));
    parsedMinutes = $.Math_parseInt(t2.group$1(2));
  }
  if (parsedHour == null || parsedMinutes == null) return;
  return $.ZeTime$(parsedHour, parsedMinutes);
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31) return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$.TimeEntryRepository$ = function() {
  return new $.TimeEntryRepository();
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.ActivityRepository$ = function() {
  return new $.ActivityRepository();
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  return r == null ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$.TimeEntryEditor$ = function(model, view) {
  return new $.TimeEntryEditor(view, model);
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$._uriEncode$bailout = function(state, canonical, text) {
  var byteToHex = new $._uriEncode_anon('0123456789ABCDEF');
  var result = $.StringBufferImpl$('');
  for (var i = 0; $.ltB(i, $.get$length(text)); ++i) {
    if ($.geB($.indexOf$1(canonical, $.index(text, i)), 0)) result.add$1($.index(text, i));
    else {
      var ch = $.charCodeAt(text, i);
      if ($.geB(ch, 55296) && $.ltB(ch, 56320)) {
        ++i;
        var nextCh = $.eqB($.get$length(text), i) ? 0 : $.charCodeAt(text, i);
        if ($.geB(nextCh, 56320) && $.ltB(nextCh, 57344)) {
          var t1 = $.shl($.sub(ch, 55296), 10);
          if (typeof t1 !== 'number') throw $.iae(t1);
          t1 += 65536;
          var t2 = $.sub(nextCh, 56320);
          if (typeof t2 !== 'number') throw $.iae(t2);
          var ch0 = t1 + t2;
        } else throw $.captureStackTrace($.IllegalArgumentException$('Malformed URI'));
        ch = ch0;
      }
      for (t1 = $.iterator($.codepointsToUtf8([ch], 0, null)); t1.hasNext$0() === true; ) {
        result.add$1(byteToHex.$call$1(t1.next$0()));
      }
    }
  }
  return result.toString$0();
};

$.Arrays_copy$bailout = function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var src = env0;
      var srcStart = env1;
      var dst = env2;
      var dstStart = env3;
      var count = env4;
      break;
    case 2:
      src = env0;
      dst = env1;
      dstStart = env2;
      count = env3;
      srcStart = env4;
      break;
    case 3:
      src = env0;
      dst = env1;
      count = env2;
      srcStart = env3;
      dstStart = env4;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (srcStart == null) srcStart = 0;
    case 2:
      state = 0;
      if (dstStart == null) dstStart = 0;
    case 3:
      state = 0;
      if ($.ltB(srcStart, dstStart)) {
        for (var i = $.sub($.add(srcStart, count), 1), j = $.sub($.add(dstStart, count), 1); $.geB(i, srcStart); i = $.sub(i, 1), j = $.sub(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      } else {
        for (i = srcStart, j = dstStart; $.ltB(i, $.add(srcStart, count)); i = $.add(i, 1), j = $.add(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      }
  }
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.Arrays_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.DualPivotQuicksort__dualPivotQuicksort$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      var a = env0;
      var left = env1;
      var right = env2;
      var compare = env3;
      break;
    case 2:
      a = env0;
      left = env1;
      right = env2;
      compare = env3;
      index5 = env4;
      el2 = env5;
      index1 = env6;
      el4 = env7;
      less = env8;
      break;
    case 3:
      a = env0;
      left = env1;
      right = env2;
      compare = env3;
      index5 = env4;
      el2 = env5;
      great = env6;
      less = env7;
      el4 = env8;
      index1 = env9;
      break;
    case 4:
      a = env0;
      left = env1;
      right = env2;
      compare = env3;
      less = env4;
      k = env5;
      index1 = env6;
      index5 = env7;
      el2 = env8;
      t1 = env9;
      ak = env10;
      comp = env11;
      el4 = env12;
      great = env13;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
      var index1 = $.add(left, sixth);
      var index5 = $.sub(right, sixth);
      var index3 = $.tdiv($.add(left, right), 2);
      var index2 = $.sub(index3, sixth);
      var index4 = $.add(index3, sixth);
      var el1 = $.index(a, index1);
      var el2 = $.index(a, index2);
      var el3 = $.index(a, index3);
      var el4 = $.index(a, index4);
      var el5 = $.index(a, index5);
      if ($.gtB(compare.$call$2(el1, el2), 0)) {
        var t0 = el1;
        el1 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.$call$2(el1, el3), 0)) {
        t0 = el3;
        el3 = el1;
        el1 = t0;
      }
      if ($.gtB(compare.$call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el1, el4), 0)) {
        t0 = el1;
        el1 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.$call$2(el3, el4), 0)) {
        t0 = el3;
        el3 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.$call$2(el2, el5), 0)) {
        t0 = el5;
        el5 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      $.indexSet(a, index1, el1);
      $.indexSet(a, index3, el3);
      $.indexSet(a, index5, el5);
      $.indexSet(a, index2, $.index(a, left));
      $.indexSet(a, index4, $.index(a, right));
      var less = $.add(left, 1);
    case 2:
      state = 0;
      var great = $.sub(right, 1);
    case 3:
      state = 0;
      var t1 = $.eq(compare.$call$2(el2, el4), 0) === true;
    case 4:
      if (state == 4 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            var k = less;
          case 4:
            L0: while (true) {
              switch (state) {
                case 0:
                  if (!$.leB(k, great)) break L0;
                case 4:
                  c$0:{
                    switch (state) {
                      case 0:
                        var ak = $.index(a, k);
                        var comp = compare.$call$2(ak, el2);
                      case 4:
                        state = 0;
                        if ($.eqB(comp, 0)) break c$0;
                        if ($.ltB(comp, 0)) {
                          if (!$.eqB(k, less)) {
                            $.indexSet(a, k, $.index(a, less));
                            $.indexSet(a, less, ak);
                          }
                          less = $.add(less, 1);
                        } else {
                          for (; true; ) {
                            comp = compare.$call$2($.index(a, great), el2);
                            if ($.gtB(comp, 0)) {
                              great = $.sub(great, 1);
                              continue;
                            } else {
                              if ($.ltB(comp, 0)) {
                                $.indexSet(a, k, $.index(a, less));
                                var less0 = $.add(less, 1);
                                $.indexSet(a, less, $.index(a, great));
                                var great0 = $.sub(great, 1);
                                $.indexSet(a, great, ak);
                                great = great0;
                                less = less0;
                                break;
                              } else {
                                $.indexSet(a, k, $.index(a, great));
                                great0 = $.sub(great, 1);
                                $.indexSet(a, great, ak);
                                great = great0;
                                break;
                              }
                            }
                          }
                        }
                    }
                  }
                  k = $.add(k, 1);
              }
            }
        }
      } else {
        for (k = less; $.leB(k, great); k = $.add(k, 1)) {
          ak = $.index(a, k);
          if ($.ltB(compare.$call$2(ak, el2), 0)) {
            if (!$.eqB(k, less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            less = $.add(less, 1);
          } else {
            if ($.gtB(compare.$call$2(ak, el4), 0)) {
              for (; true; ) {
                if ($.gtB(compare.$call$2($.index(a, great), el4), 0)) {
                  great = $.sub(great, 1);
                  if ($.ltB(great, k)) break;
                  continue;
                } else {
                  if ($.ltB(compare.$call$2($.index(a, great), el2), 0)) {
                    $.indexSet(a, k, $.index(a, less));
                    less0 = $.add(less, 1);
                    $.indexSet(a, less, $.index(a, great));
                    great0 = $.sub(great, 1);
                    $.indexSet(a, great, ak);
                    great = great0;
                    less = less0;
                  } else {
                    $.indexSet(a, k, $.index(a, great));
                    great0 = $.sub(great, 1);
                    $.indexSet(a, great, ak);
                    great = great0;
                  }
                  break;
                }
              }
            }
          }
        }
      }
      $.indexSet(a, left, $.index(a, $.sub(less, 1)));
      $.indexSet(a, $.sub(less, 1), el2);
      $.indexSet(a, right, $.index(a, $.add(great, 1)));
      $.indexSet(a, $.add(great, 1), el4);
      $.DualPivotQuicksort__doSort(a, left, $.sub(less, 2), compare);
      $.DualPivotQuicksort__doSort(a, $.add(great, 2), right, compare);
      if (t1) return;
      if ($.ltB(less, index1) && $.gtB(great, index5)) {
        for (; $.eqB(compare.$call$2($.index(a, less), el2), 0); ) {
          less = $.add(less, 1);
        }
        for (; $.eqB(compare.$call$2($.index(a, great), el4), 0); ) {
          great = $.sub(great, 1);
        }
        for (k = less; $.leB(k, great); k = $.add(k, 1)) {
          ak = $.index(a, k);
          if ($.eqB(compare.$call$2(ak, el2), 0)) {
            if (!$.eqB(k, less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            less = $.add(less, 1);
          } else {
            if ($.eqB(compare.$call$2(ak, el4), 0)) {
              for (; true; ) {
                if ($.eqB(compare.$call$2($.index(a, great), el4), 0)) {
                  great = $.sub(great, 1);
                  if ($.ltB(great, k)) break;
                  continue;
                } else {
                  if ($.ltB(compare.$call$2($.index(a, great), el2), 0)) {
                    $.indexSet(a, k, $.index(a, less));
                    less0 = $.add(less, 1);
                    $.indexSet(a, less, $.index(a, great));
                    great0 = $.sub(great, 1);
                    $.indexSet(a, great, ak);
                    great = great0;
                    less = less0;
                  } else {
                    $.indexSet(a, k, $.index(a, great));
                    great0 = $.sub(great, 1);
                    $.indexSet(a, great, ak);
                    great = great0;
                  }
                  break;
                }
              }
            }
          }
        }
        $.DualPivotQuicksort__doSort(a, less, great, compare);
      } else $.DualPivotQuicksort__doSort(a, less, great, compare);
  }
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j) {
              set.add$1($.index(tagNames, j));
            }
            $.add$1(result, $.MetaInfo$(tag, tags, set));
            ++i;
        }
      }
      return result;
  }
};

$.DualPivotQuicksort_insertionSort_$bailout = function(state, a, left, right, compare) {
  for (var i = $.add(left, 1); $.leB(i, right); i = $.add(i, 1)) {
    var el = $.index(a, i);
    var j = i;
    while (true) {
      if (!($.gtB(j, left) && $.gtB(compare.$call$2($.index(a, $.sub(j, 1)), el), 0))) break;
      $.indexSet(a, j, $.index(a, $.sub(j, 1)));
      j = $.sub(j, 1);
    }
    $.indexSet(a, j, el);
  }
};

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$._addToEncoding$bailout = function(state, offset, bytes, value, buffer) {
  for (; $.gtB(bytes, 0); ) {
    var t1 = $.add(offset, bytes);
    var t2 = $.and(value, 63);
    if (typeof t2 !== 'number') throw $.iae(t2);
    $.indexSet(buffer, t1, (128 | t2) >>> 0);
    value = $.shr(value, 6);
    bytes = $.sub(bytes, 1);
  }
  return value;
};

$.stringReplaceAllUnchecked$bailout = function(state, receiver, from, to) {
  if (typeof from === 'string') {
    if (from === '') {
      if ($.eqB(receiver, '')) return to;
      var result = $.StringBufferImpl$('');
      var length$ = $.get$length(receiver);
      result.add$1(to);
      for (var i = 0; $.ltB(i, length$); ++i) {
        result.add$1($.index(receiver, i));
        result.add$1(to);
      }
      return result.toString$0();
    }
    return $.stringReplaceJS(receiver, $.regExpMakeNative($.JSSyntaxRegExp$((from.replace($.regExpMakeNative($.CTC6, true), "\\$&")), false, false), true), to);
  }
  if (typeof from === 'object' && from !== null && !!from.is$JSSyntaxRegExp) return $.stringReplaceJS(receiver, $.regExpMakeNative(from, true), to);
  $.checkNull(from);
  throw $.captureStackTrace('StringImplementation.replaceAll(Pattern) UNIMPLEMENTED');
};

$.Futures_wait$bailout = function(state, futures, t1) {
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, ({T: 'List'}));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, ({T: 'List'}));
  var result = completer.get$future();
  t1.remaining_1 = $.get$length(futures);
  var values = $.ListFactory_List($.get$length(futures));
  for (var i = 0; $.ltB(i, $.get$length(futures)); ++i) {
    var future = $.index(futures, i);
    future.then$1(new $.Futures_wait_anon(completer, i, t1, result, values));
    future.handleException$1(new $.Futures_wait_anon0(future, completer, result));
  }
  return result;
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.typeNameInSafari.$call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.invokeClosure.$call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInOpera.$call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC3 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC, {}, 0);
$.CTC8 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^(\\d{1,2})(\\d{2})$');
$.CTC9 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^(\\d*):(\\d*)(:(\\d*))?$');
$.CTC10 = new Isolate.$isolateProperties.DurationImplementation(86400000);
$.CTC2 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC5 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC13 = new Isolate.$isolateProperties.Object();
$.CTC12 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC4 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC6 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '[-[\\]{}()*+?.,\\\\^$|#\\s]');
$.CTC11 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(\\d*)-(\\d*)-(\\d*)');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.CTC1 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC7 = new Isolate.$isolateProperties.EmptyQueueException();
$.AppBuilder_app = null;
$._JsonParser_tokens = null;
$._getTypeNameOf = null;
$._cachedBrowserPrefix = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$JavaScriptIndexingBehavior', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$List', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', ["type!", "name?", "href!"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WebKitAnimation', ["name?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["name?"], {
});

$.$defineNativeClass('HTMLAreaElement', ["href!"], {
});

$.$defineNativeClass('Attr', ["value=", "name?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$(this);
 }
});

$.$defineNativeClass('AudioParam', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); }
});

$.$defineNativeClass('HTMLBaseElement', ["href!"], {
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
 }
});

$.$defineNativeClass('BiquadFilterNode', ["type!"], {
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "type!", "name?", "disabled!"], {
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 get$transform: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'transform');
 },
 transform$1: function(arg0) { return this.get$transform().$call$1(arg0); },
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
 },
 filter$1: function(arg0) { return this.get$filter().$call$1(arg0); },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.group$1 = function(arg) {
  return this.group(arg);
 };
$.$defineNativeClass('DOMApplicationCache', ["status?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["name?", "length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 remove$1: function(token) {
  return this.remove(token);
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 open$5: function(arg0, arg1, arg2, arg3, arg4) { return this.open.$call$5(arg0, arg1, arg2, arg3, arg4); }
});

$.$defineNativeClass('HTMLDocument', ["readyState?", "body?"], {
 query$1: function(selectors) {
  if ($.CTC5.hasMatch$1(selectors) === true) return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 $dom_createElement$1: function(tagName) {
  return this.createElement(tagName);
 },
 get$window: function() {
  return this.defaultView;;
 },
 get$on: function() {
  return $._DocumentEventsImpl$(this);
 }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$(this);
 },
 set$id: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('ID can\'t be set for document fragments.'));
 },
 scrollIntoView$1: function(centerIfNeeded) {
 },
 scrollIntoView$0: function() {
  return this.scrollIntoView$1(null)
},
 click$0: function() {
 },
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 focus$0: function() {
 },
 get$focus: function() { return new $.BoundClosure(this, 'focus$0'); },
 blur$0: function() {
 },
 get$blur: function() { return new $.BoundClosure(this, 'blur$0'); },
 get$classes: function() {
  var t1 = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  return t1;
 },
 get$attributes: function() {
  return $.CTC3;
 },
 get$parent: function() {
  return;
 },
 get$id: function() {
  return '';
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["id="], {
 $dom_setAttribute$2: function(name, value) {
  return this.setAttribute(name,value);
 },
 scrollIntoView$1: function(centerIfNeeded) {
  return this.scrollIntoViewIfNeeded(centerIfNeeded);
 },
 scrollIntoView$0: function() {
  return this.scrollIntoViewIfNeeded();
},
 $dom_removeAttribute$1: function(name) {
  return this.removeAttribute(name);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_hasAttribute$1: function(name) {
  return this.hasAttribute(name);
 },
 $dom_getAttribute$1: function(name) {
  return this.getAttribute(name);
 },
 focus$0: function() {
  return this.focus();
 },
 get$focus: function() { return new $.BoundClosure(this, 'focus$0'); },
 blur$0: function() {
  return this.blur();
 },
 get$blur: function() { return new $.BoundClosure(this, 'blur$0'); },
 click$0: function() {
  return this.click();
 },
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 set$$$dom_className: function(value) {
  this.className = value;;
 },
 get$$$dom_className: function() {
  return this.className;;
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 get$classes: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$classes')) {
    return $._CssClassSet$(this);
  } else {
    return Object.prototype.get$classes.call(this);
  }
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 },
 get$attributes: function() {
  return $._ElementAttributeMap$(this);
 }
});

$.$defineNativeClass('HTMLEmbedElement', ["type!", "name?"], {
});

$.$defineNativeClass('Entry', ["name?"], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
 },
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 remove$0: function() {
  return this.remove();
 }
});

$.$defineNativeClass('Event', ["currentTarget?"], {
 preventDefault$0: function() {
  return this.preventDefault();
 }
});

$.$defineNativeClass('EventException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', ["readyState?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["name?", "disabled!"], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 }
});

$.$defineNativeClass('File', ["name?"], {
});

$.$defineNativeClass('FileException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', ["readyState?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriter', ["readyState?", "length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["name?", "length?"], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('HTMLFrameElement', ["name?"], {
});

$.$defineNativeClass('HTMLFrameSetElement', ["rows!"], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
 }
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', ["selectedIndex="], {
 remove$1: function(index) {
  return this.remove(index);
 },
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('IDBCursor', ["key?"], {
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 delete$1: function(key_OR_keyRange) {
  return this.delete(key_OR_keyRange);
 },
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', ["readyState?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', ["name?"], {
});

$.$defineNativeClass('HTMLImageElement', ["name?"], {
 complete$1: function(arg0) { return this.complete.$call$1(arg0); }
});

$.$defineNativeClass('HTMLInputElement', ["value=", "type!", "placeholder!", "pattern?", "name?", "disabled!"], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
 }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLKeygenElement', ["name?", "disabled!"], {
});

$.$defineNativeClass('HTMLLIElement', ["value=", "type!"], {
});

$.$defineNativeClass('HTMLLinkElement', ["type!", "href!", "disabled!"], {
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('Location', ["href!"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
});

$.$defineNativeClass('HTMLMarqueeElement', [], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.BoundClosure(this, 'start$0'); }
});

$.$defineNativeClass('MediaController', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', ["readyState?"], {
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaList', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', ["readyState?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrack', ["readyState?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MediaStreamTrackEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 remove$1: function(track) {
  return this.remove(track);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 add$1: function(track) {
  return this.add(track);
 },
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
 }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.BoundClosure(this, 'start$0'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 insertBefore$2: function(newChild, refChild) {
  return this.insertBefore(newChild,refChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 get$$$dom_childNodes: function() {
  return this.childNodes;;
 },
 get$$$dom_attributes: function() {
  return this.attributes;;
 },
 remove$0: function() {
  !(this.get$parent() == null) && this.get$parent().$dom_removeChild$1(this);
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
 }
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._parent.$dom_removeChild$1(result);
  return result;
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._parent; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLOListElement', ["type!", "start="], {
 start$0: function() { return this.start.$call$0(); }
});

$.$defineNativeClass('HTMLObjectElement', ["type!", "name?"], {
});

$.$defineNativeClass('HTMLOptGroupElement', ["disabled!"], {
});

$.$defineNativeClass('HTMLOptionElement', ["value=", "disabled!"], {
});

$.$defineNativeClass('Oscillator', ["type!"], {
});

$.$defineNativeClass('HTMLOutputElement', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLParamElement', ["value=", "type!", "name?"], {
});

$.$defineNativeClass('PeerConnection00', ["readyState?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 },
 expand$1: function(unit) {
  return this.expand(unit);
 },
 collapse$1: function(toStart) {
  return this.collapse(toStart);
 }
});

$.$defineNativeClass('RangeException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGCircleElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGDefsElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGElement', [], {
 set$id: function(value) {
  this.id = value;;
 },
 get$id: function() {
  return this.id;;
 },
 get$classes: function() {
  this.get$_cssClassSet() == null && this.set$_cssClassSet($._AttributeClassSet$(this.get$_ptr()));
  return this.get$_cssClassSet();
 }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGForeignObjectElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGGElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGImageElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGLineElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPolygonElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGRectElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGScriptElement', ["type!"], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', ["type!", "disabled!"], {
});

$.$defineNativeClass('SVGSwitchElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGTextElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('SVGViewSpec', [], {
 transform$1: function(arg0) { return this.transform.$call$1(arg0); }
});

$.$defineNativeClass('HTMLScriptElement', ["type!"], {
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "selectedIndex=", "name?", "length=", "disabled!"], {
 add$2: function(element, before) {
  return this.add(element,before);
 }
});

$.$defineNativeClass('ShadowRoot', [], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLSourceElement', ["type!"], {
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.BoundClosure(this, 'start$0'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
 }
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null) return;
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', ["type!", "disabled!"], {
});

$.$defineNativeClass('StyleSheet', ["disabled!"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "rows!", "placeholder!", "name?", "disabled!"], {
});

$.$defineNativeClass('TextTrack', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!", "id="], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
 start$1: function(index) {
  return this.start(index);
 },
 get$start: function() { return new $.BoundClosure0(this, 'start$1'); },
 end$1: function(index) {
  return this.end(index);
 },
 get$end: function() { return new $.BoundClosure0(this, 'end$1'); }
});

$.$defineNativeClass('TouchList', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', ["readyState?"], {
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('UIEvent', ["view?"], {
});

$.$defineNativeClass('HTMLUListElement', ["type!"], {
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 map$1: function(f) {
  return $._Collections_map(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["name?"], {
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
});

$.$defineNativeClass('WebSocket', ["readyState?"], {
 send$1: function(data) {
  return this.send(data);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', ["window?", "status?", "parent?", "navigator?", "name?", "localStorage?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 focus$0: function() {
  return this.focus();
 },
 get$focus: function() { return new $.BoundClosure(this, 'focus$0'); },
 clearInterval$1: function(handle) {
  return this.clearInterval(handle);
 },
 blur$0: function() {
  return this.blur();
 },
 get$blur: function() { return new $.BoundClosure(this, 'blur$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$(this);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._WorkerEventsImpl$(this);
 }
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 clearInterval$1: function(handle) {
  return this.clearInterval(handle);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequest', ["status?", "responseText?", "readyState?"], {
 setRequestHeader$2: function(header, value) {
  return this.setRequestHeader(header,value);
 },
 send$1: function(data) {
  return this.send(data);
 },
 send$0: function() {
  return this.send();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 open$5: function(method, url, async, user, password) {
  return this.open(method,url,async,user,password);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$(this);
 }
});

$.$defineNativeClass('XPathException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
  return this.postMessage(msg);;
 },
 set$id: function(i) {
  this.id = i;;
 },
 get$id: function() {
  return this.id;;
 }
});

// 201 dynamic classes.
// 350 classes
// 32 !leaf
(function(){
  var v0/*class(_SVGElementImpl)*/ = 'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement';
  var v1/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v2/*class(_UIEventImpl)*/ = 'UIEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|WheelEvent|WheelEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|WheelEvent|WheelEvent|KeyboardEvent|CompositionEvent';
  var v3/*class(_ElementImpl)*/ = [v0/*class(_SVGElementImpl)*/,v1/*class(_MediaElementImpl)*/,v0/*class(_SVGElementImpl)*/,v1/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v4/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v5/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v6/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v7/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v8/*class(_NodeImpl)*/ = [v3/*class(_ElementImpl)*/,v4/*class(_DocumentFragmentImpl)*/,v5/*class(_DocumentImpl)*/,v6/*class(_CharacterDataImpl)*/,v3/*class(_ElementImpl)*/,v4/*class(_DocumentFragmentImpl)*/,v5/*class(_DocumentImpl)*/,v6/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v9/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v10/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v11/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['StyleSheet', 'StyleSheet|CSSStyleSheet|CSSStyleSheet'],
    ['AbstractWorker', v11/*class(_AbstractWorkerImpl)*/],
    ['UIEvent', v2/*class(_UIEventImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', v7/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v6/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v5/*class(_DocumentImpl)*/],
    ['DocumentFragment', v4/*class(_DocumentFragmentImpl)*/],
    ['SVGElement', v0/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v1/*class(_MediaElementImpl)*/],
    ['Element', v3/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v2/*class(_UIEventImpl)*/,v2/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v8/*class(_NodeImpl)*/],
    ['MediaStream', v9/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v10/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v7/*class(_WorkerContextImpl)*/,v8/*class(_NodeImpl)*/,v9/*class(_MediaStreamImpl)*/,v10/*class(_IDBRequestImpl)*/,v11/*class(_AbstractWorkerImpl)*/,v7/*class(_WorkerContextImpl)*/,v8/*class(_NodeImpl)*/,v9/*class(_MediaStreamImpl)*/,v10/*class(_IDBRequestImpl)*/,v11/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.$call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}

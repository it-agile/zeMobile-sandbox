function Isolate() {}
init();

var $ = Isolate.$isolateProperties;
Isolate.$defineClass("DurationImplementation", "Object", ["inMilliseconds?"], {
 toString$0: function() {
  var t0 = new $.Closure32();
  var t1 = new $.Closure33();
  if ($.ltB(this.inMilliseconds, 0)) {
    return '-' + $.stringToString($.DurationImplementation$5(0, 0, 0, 0, $.neg(this.inMilliseconds)));
  } else {
  }
  var twoDigitMinutes = t1.$call$1($.remainder(this.get$inMinutes(), 60));
  var twoDigitSeconds = t1.$call$1($.remainder(this.get$inSeconds(), 60));
  var threeDigitMs = t0.$call$1($.remainder(this.inMilliseconds, 1000));
  return '' + $.stringToString(this.get$inHours()) + ':' + $.stringToString(twoDigitMinutes) + ':' + $.stringToString(twoDigitSeconds) + '.' + $.stringToString(threeDigitMs);
 },
 compareTo$1: function(other) {
  return $.compareTo(this.inMilliseconds, other.get$inMilliseconds());
 },
 hashCode$0: function() {
  return $.hashCode(this.inMilliseconds);
 },
 operator$eq$1: function(other) {
  if (!((typeof other === 'object') && !!other.is$Duration)) {
    return false;
  } else {
  }
  return $.eq(this.inMilliseconds, other.inMilliseconds);
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
});

Isolate.$defineClass("ExceptionImplementation", "Object", ["_msg"], {
 toString$0: function() {
  if (this._msg === (void 0)) {
    var t0 = 'Exception';
  } else {
    t0 = 'Exception: ' + $.stringToString(this._msg);
  }
  return t0;
 }
});

Isolate.$defineClass("HashMapImplementation", "Object", ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"], {
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  for (var i = 0; $.ltB(i, length$); i = i + 1) {
    var key = $.index(this._keys, i);
    var t0 = !(key === (void 0));
    if (t0) {
      var t1 = !(key === $.CTC3);
    } else {
      t1 = t0;
    }
    if (t1) {
      f.$call$2(key, $.index(this._values, i));
    } else {
    }
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
    $.indexSet(this._values, index, (void 0));
    $.indexSet(this._keys, index, $.CTC3);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  } else {
  }
  return;
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) {
    return;
  } else {
  }
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t0 = $.index(this._keys, index) === (void 0);
  if (!t0) {
    var t1 = $.index(this._keys, index) === $.CTC3;
  } else {
    t1 = t0;
  }
  if (t1) {
    this._numberOfEntries = $.add(this._numberOfEntries, 1);
  } else {
  }
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  for (var i = 0; $.ltB(i, length$); i = i + 1) {
    $.indexSet(this._keys, i, (void 0));
    $.indexSet(this._values, i, (void 0));
  }
 },
 _grow$1: function(newCapacity) {
  $.assert($._isPowerOfTwo(newCapacity));
  var capacity = $.get$length(this._keys);
  this._loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object'||oldKeys.constructor !== Array)) return this._grow$1$bailout(newCapacity, 1, capacity, oldKeys);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object'||oldValues.constructor !== Array)) return this._grow$1$bailout(newCapacity, 2, oldKeys, capacity, oldValues);
  this._keys = $.List(newCapacity);
  var t0 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
  for (var i = 0; $.ltB(i, capacity); i = i + 1) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    var t3 = t2 === (void 0);
    if (!t3) {
      var t4 = t2 === $.CTC3;
    } else {
      t4 = t3;
    }
    if (t4) {
      continue;
    } else {
    }
    var t5 = oldValues.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    var t6 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t6);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(newCapacity, state, env0, env1, env2) {
  switch (state) {
    case 1:
      capacity = env0;
      oldKeys = env1;
      break;
    case 2:
      oldKeys = env0;
      capacity = env1;
      oldValues = env2;
      break;
  }
  switch (state) {
    case 0:
      $.assert($._isPowerOfTwo(newCapacity));
      var capacity = $.get$length(this._keys);
      this._loadLimit = $._computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 1:
      state = 0;
      var oldValues = this._values;
    case 2:
      state = 0;
      this._keys = $.List(newCapacity);
      var t0 = $.List(newCapacity);
      $.setRuntimeTypeInfo(t0, ({E: 'V'}));
      this._values = t0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, capacity)) break L0;
        c$0:{
          var key = $.index(oldKeys, i);
          var t1 = key === (void 0);
          if (!t1) {
            var t2 = key === $.CTC3;
          } else {
            t2 = t1;
          }
          if (t2) {
            break c$0;
          } else {
          }
          var value = $.index(oldValues, i);
          var newIndex = this._probeForAdding$1(key);
          $.indexSet(this._keys, newIndex, key);
          $.indexSet(this._values, newIndex, value);
        }
        i = i + 1;
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  } else {
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree)) {
    this._grow$1($.get$length(this._keys));
  } else {
  }
 },
 _probeForLookup$1: function(key) {
  for (var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys)), numberOfProbes = 1; true; hash = hash0, numberOfProbes = numberOfProbes0) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      return -1;
    } else {
    }
    if ($.eqB(existingKey, key)) {
      return hash;
    } else {
      var numberOfProbes1 = numberOfProbes + 1;
    }
    var hash1 = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    var numberOfProbes0 = numberOfProbes1;
    var hash0 = hash1;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(key, 1, hash);
  for (var numberOfProbes = 1, hash0 = hash, insertionIndex = -1; true; numberOfProbes = numberOfProbes0, hash0 = hash1, insertionIndex = insertionIndex0) {
    var existingKey = $.index(this._keys, hash0);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) {
        return hash0;
      } else {
      }
      return insertionIndex;
    } else {
      if ($.eqB(existingKey, key)) {
        return hash0;
      } else {
        var t0 = $.ltB(insertionIndex, 0);
        if (t0) {
          var t1 = $.CTC3 === existingKey;
        } else {
          t1 = t0;
        }
        if (t1) {
          var insertionIndex0 = hash0;
        } else {
          insertionIndex0 = insertionIndex;
        }
        var numberOfProbes1 = numberOfProbes + 1;
      }
    }
    var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._keys));
    var numberOfProbes0 = numberOfProbes1;
    var hash1 = hash2;
  }
 },
 _probeForAdding$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      hash = env0;
      break;
  }
  switch (state) {
    case 0:
      var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var hash0 = hash;
      var insertionIndex = -1;
      L0: while (true) {
        if (!true) break L0;
        var existingKey = $.index(this._keys, hash0);
        if (existingKey === (void 0)) {
          if ($.ltB(insertionIndex, 0)) {
            return hash0;
          } else {
          }
          return insertionIndex;
        } else {
          if ($.eqB(existingKey, key)) {
            return hash0;
          } else {
            var t0 = $.ltB(insertionIndex, 0);
            if (t0) {
              var t1 = $.CTC3 === existingKey;
            } else {
              t1 = t0;
            }
            if (t1) {
              var insertionIndex0 = hash0;
            } else {
              insertionIndex0 = insertionIndex;
            }
            var numberOfProbes0 = numberOfProbes + 1;
          }
        }
        var hash1 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._keys));
        var numberOfProbes1 = numberOfProbes0;
        var hash2 = hash1;
        numberOfProbes = numberOfProbes1;
        hash0 = hash2;
        insertionIndex = insertionIndex0;
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $._computeLoadLimit(8);
  this._keys = $.List(8);
  var t0 = $.List(8);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("HashSetImplementation", "Object", ["_backingMap?"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 filter$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  var result = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  t0.result_2 = result;
  $.forEach(this._backingMap, new $.Closure36(t0));
  return t0.result_2;
 },
 map$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  t0.result_2 = $.HashSetImplementation$0();
  $.forEach(this._backingMap, new $.Closure23(t0));
  return t0.result_2;
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._backingMap, new $.Closure14(t0));
 },
 addAll$1: function(collection) {
  $.forEach(collection, new $.Closure31(this));
 },
 remove$1: function(value) {
  if (this._backingMap.containsKey$1(value) !== true) {
    return false;
  } else {
  }
  this._backingMap.remove$1(value);
  return true;
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  $.indexSet(this._backingMap, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$0();
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("HashSetIterator", "Object", ["_nextValidIndex", "_entries"], {
 _advance$0: function() {
  var length$ = $.get$length(this._entries);
  var entry = (void 0);
  do {
    var t0 = $.add(this._nextValidIndex, 1);
    this._nextValidIndex = t0;
    if ($.geB(t0, length$)) {
      break;
    } else {
    }
    entry = $.index(this._entries, this._nextValidIndex);
    var t1 = entry === (void 0);
    if (!t1) {
      var t2 = entry === $.CTC3;
    } else {
      t2 = t1;
    }
  } while (t2);
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var res = $.index(this._entries, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  if ($.geB(this._nextValidIndex, $.get$length(this._entries))) {
    return false;
  } else {
  }
  if ($.index(this._entries, this._nextValidIndex) === $.CTC3) {
    this._advance$0();
  } else {
  }
  return $.lt(this._nextValidIndex, $.get$length(this._entries));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
});

Isolate.$defineClass("_DeletedKeySentinel", "Object", [], {
});

Isolate.$defineClass("KeyValuePair", "Object", ["value=", "key?"], {
});

Isolate.$defineClass("LinkedHashMapImplementation", "Object", ["_map", "_list"], {
 toString$0: function() {
  return $.mapToString(this);
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
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._list, new $.Closure22(t0));
 },
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry === (void 0)) {
    return;
  } else {
  }
  entry.remove$0();
  return entry.get$element().get$value();
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry === (void 0)) {
    return;
  } else {
  }
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  if (this._map.containsKey$1(key) === true) {
    $.index(this._map, key).get$element().set$value(value);
  } else {
    $.addLast(this._list, $.KeyValuePair$2(key, value));
    $.indexSet(this._map, key, this._list.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$0();
  var t0 = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(t0, ({E: 'KeyValuePair<K, V>'}));
  this._list = t0;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("DoubleLinkedQueueEntry", "Object", ["_lib3_element?", "_next=", "_previous="], {
 get$element: function() {
  return this._lib3_element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
 },
 remove$0: function() {
  var t0 = this._next;
  this._previous.set$_next(t0);
  var t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = (void 0);
  this._previous = (void 0);
  return this._lib3_element;
 },
 prepend$1: function(e) {
  var t0 = $.DoubleLinkedQueueEntry$1(e);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  t0._link$2(this._previous, this);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._lib3_element = e;
 }
});

Isolate.$defineClass("_DoubleLinkedQueueEntrySentinel", "DoubleLinkedQueueEntry", ["_lib3_element", "_next", "_previous"], {
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
});

Isolate.$defineClass("DoubleLinkedQueue", "Object", ["_sentinel"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $._DoubleLinkedQueueIterator$1(this._sentinel);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(other, ({E: 'E'}));
  for (var entry = this._sentinel.get$_next(); !(entry === this._sentinel); entry = entry0) {
    var nextEntry = entry.get$_next();
    if (f.$call$1(entry.get$_lib3_element()) === true) {
      other.addLast$1(entry.get$_lib3_element());
    } else {
    }
    var entry0 = nextEntry;
  }
  return other;
 },
 map$1: function(f) {
  var other = $.DoubleLinkedQueue$0();
  for (var entry = this._sentinel.get$_next(); !(entry === this._sentinel); entry = entry0) {
    var nextEntry = entry.get$_next();
    other.addLast$1(f.$call$1(entry.get$_lib3_element()));
    var entry0 = nextEntry;
  }
  return other;
 },
 forEach$1: function(f) {
  for (var entry = this._sentinel.get$_next(); !(entry === this._sentinel); entry = entry0) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_lib3_element());
    var entry0 = nextEntry;
  }
 },
 clear$0: function() {
  var t0 = this._sentinel;
  this._sentinel.set$_next(t0);
  var t1 = this._sentinel;
  this._sentinel.set$_previous(t1);
 },
 isEmpty$0: function() {
  return this._sentinel.get$_next() === this._sentinel;
 },
 get$length: function() {
  var t0 = ({});
  t0.counter_1 = 0;
  this.forEach$1(new $.Closure21(t0));
  return t0.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    this.add$1(t0.next$0());
  }
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t0 = $._DoubleLinkedQueueEntrySentinel$0();
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  this._sentinel = t0;
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_DoubleLinkedQueueIterator", "Object", ["_currentEntry", "_sentinel"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  return !(this._currentEntry.get$_next() === this._sentinel);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
});

Isolate.$defineClass("StringBufferImpl", "Object", ["_length", "_buffer"], {
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) {
    return '';
  } else {
  }
  if ($.get$length(this._buffer) === 1) {
    return $.index(this._buffer, 0);
  } else {
  }
  var result = $.concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  this._buffer = t0;
  this._length = 0;
  return this;
 },
 addAll$1: function(objects) {
  for (var t0 = $.iterator(objects); t0.hasNext$0() === true; ) {
    this.add$1(t0.next$0());
  }
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  var t0 = str === (void 0);
  if (!t0) {
    var t1 = $.isEmpty(str) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return this;
  } else {
  }
  $.add$1(this._buffer, str);
  this._length = $.add(this._length, $.get$length(str));
  return this;
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
});

Isolate.$defineClass("JSSyntaxRegExp", "Object", ["ignoreCase?", "multiLine?", "pattern?"], {
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m === (void 0)) {
    return;
  } else {
  }
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
});

Isolate.$defineClass("MatchImplementation", "Object", ["_groups", "_end", "_lib3_start", "str", "pattern?"], {
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 },
 end$0: function() {
  return this._end;
 },
 get$end: function() { return new $.Closure52(this, 'end$0'); },
 start$0: function() {
  return this._lib3_start;
 },
 get$start: function() { return new $.Closure52(this, 'start$0'); }
});

Isolate.$defineClass("_AllMatchesIterable", "Object", ["_str", "_re"], {
 iterator$0: function() {
  return $._AllMatchesIterator$2(this._re, this._str);
 }
});

Isolate.$defineClass("_AllMatchesIterator", "Object", ["_done", "_next=", "_str", "_re"], {
 hasNext$0: function() {
  if (this._done === true) {
    return false;
  } else {
    if (!$.eqNullB(this._next)) {
      return true;
    } else {
    }
  }
  this._next = this._re.firstMatch$1(this._str);
  if ($.eqNullB(this._next)) {
    this._done = true;
    return false;
  } else {
    return true;
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var next = this._next;
  this._next = (void 0);
  return next;
 }
});

Isolate.$defineClass("DateImplementation", "Object", ["_isUtc", "value?"], {
 _asJs$0: function() {
  return $.lazyAsJsDate(this);
 },
 add$1: function(duration) {
  $.checkNull(duration);
  return $.DateImplementation$fromEpoch$2($.add(this.value, duration.get$inMilliseconds()), this.isUtc$0());
 },
 toString$0: function() {
  var t0 = new $.Closure27();
  var t1 = new $.Closure28();
  var t2 = new $.Closure29();
  var y = t0.$call$1(this.get$year());
  var m = t2.$call$1(this.get$month());
  var d = t2.$call$1(this.get$day());
  var h = t2.$call$1(this.get$hours());
  var min = t2.$call$1(this.get$minutes());
  var sec = t2.$call$1(this.get$seconds());
  var ms = t1.$call$1(this.get$milliseconds());
  if (this.isUtc$0() === true) {
    return '' + $.stringToString(y) + '-' + $.stringToString(m) + '-' + $.stringToString(d) + ' ' + $.stringToString(h) + ':' + $.stringToString(min) + ':' + $.stringToString(sec) + '.' + $.stringToString(ms) + 'Z';
  } else {
    return '' + $.stringToString(y) + '-' + $.stringToString(m) + '-' + $.stringToString(d) + ' ' + $.stringToString(h) + ':' + $.stringToString(min) + ':' + $.stringToString(sec) + '.' + $.stringToString(ms);
  }
 },
 isUtc$0: function() {
  return this._isUtc;
 },
 get$weekday: function() {
  return $.mod($.add($.getWeekday(this), 6), 7);
 },
 get$milliseconds: function() {
  return $.getMilliseconds(this);
 },
 get$seconds: function() {
  return $.getSeconds(this);
 },
 get$minutes: function() {
  return $.getMinutes(this);
 },
 get$hours: function() {
  return $.getHours(this);
 },
 get$day: function() {
  return $.getDay(this);
 },
 get$month: function() {
  return $.getMonth(this);
 },
 get$year: function() {
  return $.getYear(this);
 },
 hashCode$0: function() {
  return this.value;
 },
 compareTo$1: function(other) {
  return $.compareTo(this.value, other.get$value());
 },
 operator$ge$1: function(other) {
  return $.ge(this.value, other.get$value());
 },
 operator$gt$1: function(other) {
  return $.gt(this.value, other.get$value());
 },
 operator$le$1: function(other) {
  return $.le(this.value, other.get$value());
 },
 operator$lt$1: function(other) {
  return $.lt(this.value, other.get$value());
 },
 operator$eq$1: function(other) {
  if (!((typeof other === 'object') && !!other.is$DateImplementation)) {
    return false;
  } else {
  }
  return $.eq(this.value, other.value);
 },
 DateImplementation$8: function(years, month, day, hours, minutes, seconds, milliseconds, isUtc) {
  this._asJs$0();
 },
 DateImplementation$now$0: function() {
  this._asJs$0();
 },
 is$DateImplementation: true
});

Isolate.$defineClass("ListIterator", "Object", ["list", "i"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  } else {
  }
  var value = (this.list[this.i]);
  this.i = $.add(this.i, 1);
  return value;
 },
 hasNext$0: function() {
  return $.lt(this.i, (this.list.length));
 }
});

Isolate.$defineClass("Closure53", "Object", [], {
 toString$0: function() {
  return 'Closure';
 }
});

Isolate.$defineClass("ConstantMap", "Object", ["_lib2_keys?", "_jsObject", "length?"], {
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
  throw $.captureStackTrace($.CTC5);
 },
 toString$0: function() {
  return $.mapToString(this);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._lib2_keys, new $.Closure17(this, t0));
 },
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true) {
    return;
  } else {
  }
  return $.jsPropertyAccess(this._jsObject, key);
 },
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__')) {
    return false;
  } else {
  }
  return $.jsHasOwnProperty(this._jsObject, key);
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("MetaInfo", "Object", ["set?", "tags", "tag?"], {
});

Isolate.$defineClass("StringMatch", "Object", ["pattern?", "str", "_start"], {
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  } else {
  }
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 },
 end$0: function() {
  return $.add(this._start, $.get$length(this.pattern));
 },
 get$end: function() { return new $.Closure52(this, 'end$0'); },
 start$0: function() {
  return this._start;
 },
 get$start: function() { return new $.Closure52(this, 'start$0'); }
});

Isolate.$defineClass("Object", "", [], {
 toString$0: function() {
  return $.objectToString(this);
 }
});

Isolate.$defineClass("IndexOutOfRangeException", "Object", ["_index"], {
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.stringToString(this._index);
 }
});

Isolate.$defineClass("IllegalAccessException", "Object", [], {
 toString$0: function() {
  return 'Attempt to modify an immutable object';
 }
});

Isolate.$defineClass("NoSuchMethodException", "Object", ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  for (var i = 0; $.ltB(i, $.get$length(this._arguments)); i = i + 1) {
    if (i > 0) {
      sb.add$1(', ');
    } else {
    }
    sb.add$1($.index(this._arguments, i));
  }
  if (this._existingArgumentNames === (void 0)) {
    return 'NoSuchMethodException : method not found: \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nArguments: [' + $.stringToString(sb) + ']';
  } else {
    var actualParameters = sb.toString$0();
    var sb0 = $.StringBufferImpl$1('');
    for (var i0 = 0; $.ltB(i0, $.get$length(this._existingArgumentNames)); i0 = i0 + 1) {
      if (i0 > 0) {
        sb0.add$1(', ');
      } else {
      }
      sb0.add$1($.index(this._existingArgumentNames, i0));
    }
    var formalParameters = sb0.toString$0();
    return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nTried calling: ' + $.stringToString(this._functionName) + '(' + $.stringToString(actualParameters) + ')\nFound: ' + $.stringToString(this._functionName) + '(' + $.stringToString(formalParameters) + ')';
  }
 }
});

Isolate.$defineClass("ObjectNotClosureException", "Object", [], {
 toString$0: function() {
  return 'Object is not closure';
 }
});

Isolate.$defineClass("IllegalArgumentException", "Object", ["_arg"], {
 toString$0: function() {
  return 'Illegal argument(s): ' + $.stringToString(this._arg);
 }
});

Isolate.$defineClass("StackOverflowException", "Object", [], {
 toString$0: function() {
  return 'Stack Overflow';
 }
});

Isolate.$defineClass("BadNumberFormatException", "Object", ["_s"], {
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.stringToString(this._s) + '\'';
 }
});

Isolate.$defineClass("NullPointerException", "Object", ["arguments", "functionName"], {
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  if ($.eqNullB(this.functionName)) {
    return this.get$exceptionName();
  } else {
    return '' + $.stringToString(this.get$exceptionName()) + ' : method: \'' + $.stringToString(this.functionName) + '\'\nReceiver: null\nArguments: ' + $.stringToString(this.arguments);
  }
 }
});

Isolate.$defineClass("NoMoreElementsException", "Object", [], {
 toString$0: function() {
  return 'NoMoreElementsException';
 }
});

Isolate.$defineClass("EmptyQueueException", "Object", [], {
 toString$0: function() {
  return 'EmptyQueueException';
 }
});

Isolate.$defineClass("UnsupportedOperationException", "Object", ["_message"], {
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.stringToString(this._message);
 }
});

Isolate.$defineClass("IllegalJSRegExpException", "Object", ["_errmsg", "_pattern"], {
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.stringToString(this._pattern) + '\' \'' + $.stringToString(this._errmsg) + '\'';
 }
});

Isolate.$defineClass("AssertionError", "Object", [], {
});

Isolate.$defineClass("TypeError", "AssertionError", ["msg"], {
 toString$0: function() {
  return this.msg;
 }
});

Isolate.$defineClass("App", "Object", ["expander?", "monthDisplayFactory?", "timeEntryProvider?", "activityProvider"], {
 start$0: function() {
  this.activityProvider.fetchProjects$1(new $.Closure(this));
 },
 get$start: function() { return new $.Closure52(this, 'start$0'); }
});

Isolate.$defineClass("Login", "Object", ["model?", "view?"], {
 loginUserIfNotAlreadyLoggedIn$1: function(onUserLoggedIn) {
  var t0 = ({});
  t0.onUserLoggedIn_1 = onUserLoggedIn;
  if (this.model.isUserLoggedIn$0() === true) {
    t0.onUserLoggedIn_1.$call$1(this.model.get$user());
  } else {
    this.view.showLoginDialog$1(new $.Closure5(this, t0));
  }
 }
});

Isolate.$defineClass("LoginView", "Object", [], {
 showLoginDialog$1: function(onLoginDialogFinished) {
  var t0 = ({});
  t0.onLoginDialogFinished_1 = onLoginDialogFinished;
  var loginDialogContent = $.Element$tag('div');
  t0.nameInput_2 = $.Element$tag('input');
  t0.nameInput_2.set$type('text');
  t0.nameInput_2.set$placeholder('Name');
  $.indexSet(t0.nameInput_2.get$attributes(), 'autocapitalize', 'off');
  $.indexSet(t0.nameInput_2.get$attributes(), 'autocorrect', 'off');
  $.add$1(loginDialogContent.get$nodes(), t0.nameInput_2);
  t0.passwordInput_3 = $.Element$tag('input');
  t0.passwordInput_3.set$type('password');
  t0.passwordInput_3.set$placeholder('Passwort');
  $.add$1(loginDialogContent.get$nodes(), t0.passwordInput_3);
  t0.loginDialog_4 = $.Dialog$4('Log Dich in ze ein.', loginDialogContent, 'Einloggen', (void 0));
  t0.loginDialog_4.show$1(new $.Closure6(t0));
 }
});

Isolate.$defineClass("LoginModel", "Object", ["user?"], {
 loginUser$2: function(userName, password) {
  this.user = $.User$2(userName, password);
  $.indexSet($.document().get$window().get$localStorage(), 'user', userName);
  $.indexSet($.document().get$window().get$localStorage(), 'password', password);
 },
 isUserLoggedIn$0: function() {
  if ($.eqNullB(this.user)) {
    var userName = $.index($.document().get$window().get$localStorage(), 'user');
    var password = $.index($.document().get$window().get$localStorage(), 'password');
    var t0 = !$.eqNullB(userName);
    if (t0) {
      var t1 = !$.eqNullB(password);
    } else {
      t1 = t0;
    }
    if (t1) {
      this.user = $.User$2(userName, password);
    } else {
    }
  } else {
  }
  return !$.eqNullB(this.user);
 }
});

Isolate.$defineClass("MonthDisplayFactory", "Object", ["dayDisplayFactory", "expander?", "elementCreator"], {
 createMonthDisplay$1: function(month) {
  return $.MonthDisplay$3(month, $.MonthDisplayView$2(this.elementCreator, this.expander), this.dayDisplayFactory);
 }
});

Isolate.$defineClass("MonthDisplay", "Object", ["dayDisplayFactory", "month?", "view?"], {
 createUI$0: function() {
  this.view.createUI$0();
  this.view.setMonth$2(this.month.get$month(), this.month.get$year());
  for (var currentDay = $.ZeDate$3(1, this.month.get$month(), this.month.get$year()); $.eqB(currentDay.get$month(), this.month.get$month()); currentDay = currentDay0) {
    var dayDisplay = this.dayDisplayFactory.createDayDisplay$1(currentDay);
    $.add$1(this.view.get$daysElement().get$nodes(), dayDisplay.createUI$0());
    for (var t0 = $.iterator(this.month.timeEntriesFor$1(currentDay)); t0.hasNext$0() === true; ) {
      dayDisplay.addTimeEntry$1(t0.next$0());
    }
    var currentDay0 = currentDay.nextDay$0();
  }
  return this.view.get$containerElement();
 }
});

Isolate.$defineClass("MonthDisplayView", "Object", ["daysElement?", "yearElement", "monthNameElement", "containerElement?", "expander?", "elementCreator"], {
 setMonth$2: function(month, year) {
  if (month !== (month | 0)) throw $.iae(month);
  if (month < 0 || month >= 12) throw $.ioore(month);
  var t0 = $.CTC12[month];
  this.monthNameElement.set$text(t0);
  var t1 = '' + $.stringToString(year);
  this.yearElement.set$text(t1);
 },
 createUI$0: function() {
  this.containerElement = this.elementCreator.createElement$2('div', ['month', 'container']);
  var header = this.elementCreator.createElement$2('div', ['header', 'monthHeader']);
  $.add$1(this.containerElement.get$nodes(), header);
  this.monthNameElement = this.elementCreator.createElement$2('span', ['monthName']);
  $.add$1(header.get$nodes(), this.monthNameElement);
  this.yearElement = this.elementCreator.createElement$2('span', ['year']);
  $.add$1(header.get$nodes(), this.yearElement);
  var floatRight = this.elementCreator.createElement$2('span', ['floatRight']);
  $.add$1(header.get$nodes(), floatRight);
  var expanderElement = this.elementCreator.createElement$2('span', ['expander']);
  $.add$1(floatRight.get$nodes(), expanderElement);
  this.daysElement = this.elementCreator.createElement$2('div', ['days', 'content']);
  $.add$1(this.containerElement.get$nodes(), this.daysElement);
  this.expander.connect$1(this.containerElement);
  this.expander.expand$1(this.containerElement);
 }
});

Isolate.$defineClass("DayDisplayFactory", "Object", ["timeEntryEditorFactory", "expander?", "elementCreator"], {
 createDayDisplay$1: function(day) {
  return $.DayDisplay$3(day, $.DayDisplayView$2(this.elementCreator, this.expander), this.timeEntryEditorFactory);
 }
});

Isolate.$defineClass("DayDisplay", "Object", ["view?", "timeEntryEditorFactory", "day?"], {
 addEntryButtonTouched$1: function(event$) {
  var newEntry = $.TimeEntry$fresh$0();
  newEntry.set$date(this.day);
  this.addTimeEntry$1(newEntry).editEntry$0();
 },
 get$addEntryButtonTouched: function() { return new $.Closure54(this, 'addEntryButtonTouched$1'); },
 addTimeEntry$1: function(timeEntry) {
  var editor = this.timeEntryEditorFactory.createTimeEntryEditor$1(timeEntry);
  this.view.get$timeEntriesElement().insertBefore$2(editor.createUI$0(), this.view.get$addEntrySection());
  return editor;
 },
 createUI$0: function() {
  this.view.createUI$0();
  var t0 = this.day;
  this.view.set$dayDate(t0);
  var t1 = 'day' + $.stringToString($.toString(this.day));
  this.view.get$containerElement().set$id(t1);
  $.add$1(this.view.get$addEntryButton().get$on().get$click(), this.get$addEntryButtonTouched());
  return this.view.get$containerElement();
 }
});

Isolate.$defineClass("DayDisplayView", "Object", ["addEntryButton?", "addEntrySection?", "timeEntriesElement?", "dayDateElement", "headerElement", "containerElement?", "expander?", "elementCreator"], {
 set$dayDate: function(day) {
  var t0 = day.toGermanString$0();
  this.dayDateElement.set$text(t0);
  if (day.isWeekend$0() === true) {
    $.add$1(this.headerElement.get$classes(), 'weekend');
  } else {
  }
 },
 createUI$0: function() {
  this.containerElement = this.elementCreator.createElement$2('div', ['day', 'container']);
  this.headerElement = this.elementCreator.createElement$2('div', ['header', 'dayHeader']);
  $.add$1(this.containerElement.get$nodes(), this.headerElement);
  this.dayDateElement = this.elementCreator.createElement$2('span', ['dayDate']);
  $.add$1(this.headerElement.get$nodes(), this.dayDateElement);
  var floatRight = this.elementCreator.createElement$2('span', ['floatRight']);
  $.add$1(this.headerElement.get$nodes(), floatRight);
  var expanderElement = this.elementCreator.createElement$2('span', ['expander']);
  $.add$1(floatRight.get$nodes(), expanderElement);
  this.timeEntriesElement = this.elementCreator.createElement$2('div', ['timeEntries', 'content']);
  $.add$1(this.containerElement.get$nodes(), this.timeEntriesElement);
  this.addEntrySection = this.elementCreator.createElement$2('div', ['addEntrySection']);
  $.add$1(this.timeEntriesElement.get$nodes(), this.addEntrySection);
  this.addEntryButton = this.elementCreator.createElement$2('span', ['addEntryButton']);
  $.add$1(this.addEntrySection.get$nodes(), this.addEntryButton);
  this.expander.connect$1(this.containerElement);
  this.expander.collapse$1(this.containerElement);
 }
});

Isolate.$defineClass("TimeEntryEditorFactory", "Object", ["expander?", "elementCreator", "timeEntryProvider?", "activityProvider"], {
 createTimeEntryEditor$1: function(timeEntry) {
  var model = $.TimeEntryEditorModel$0();
  var view = $.TimeEntryEditorView$1(this.elementCreator);
  return $.TimeEntryEditor$5(timeEntry, this.activityProvider, this.timeEntryProvider, model, view);
 }
});

Isolate.$defineClass("TimeEntryEditor", "Object", ["projectSelectIndex!", "projectSelectinterval=", "view?", "model?", "timeEntryProvider?", "activityProvider", "_timeEntry"], {
 projectSelected$0: function() {
  if (!$.eqB(this.projectSelectIndex, this.view.get$projectSelect().get$selectedIndex())) {
    var projectName = this.view.get$projectSelect().get$value();
    var t0 = this.activityProvider.projectWithName$1(projectName).get$activities();
    this.view.set$availableActivities(t0);
    this.projectSelectIndex = this.view.get$projectSelect().get$selectedIndex();
  } else {
  }
 },
 get$projectSelected: function() { return new $.Closure52(this, 'projectSelected$0'); },
 removeEditor$0: function() {
  this.view.get$editorElement().remove$0();
 },
 get$removeEditor: function() { return new $.Closure52(this, 'removeEditor$0'); },
 deleteTouched$1: function(event$) {
  if ($.eqNullB(this.get$timeEntry().get$id())) {
    this.removeEditor$0();
  } else {
    this.timeEntryProvider.delete$2(this.get$timeEntry(), this.get$removeEditor());
  }
  event$.preventDefault$0();
 },
 get$deleteTouched: function() { return new $.Closure54(this, 'deleteTouched$1'); },
 saveTouched$1: function(event$) {
  var t0 = this.view.get$timeFrom();
  this.get$timeEntry().set$start(t0);
  var t1 = this.view.get$timeTo();
  this.get$timeEntry().set$end(t1);
  var t2 = $.parseInt(this.view.get$activitySelect().get$value());
  this.get$timeEntry().set$activityId(t2);
  var t3 = this.view.get$comment();
  this.get$timeEntry().set$comment(t3);
  this.timeEntryProvider.save$2(this.get$timeEntry(), new $.Closure42(this));
  event$.preventDefault$0();
 },
 get$saveTouched: function() { return new $.Closure54(this, 'saveTouched$1'); },
 cancelTouched$1: function(event$) {
  this._updateTimeEntry$1(this._timeEntry);
  this.view.enableEditing$1(false);
  event$.preventDefault$0();
 },
 get$cancelTouched: function() { return new $.Closure54(this, 'cancelTouched$1'); },
 editTouched$1: function(event$) {
  this.view.enableEditing$1(true);
  event$.preventDefault$0();
 },
 get$editTouched: function() { return new $.Closure54(this, 'editTouched$1'); },
 editEntry$0: function() {
  this.view.enableEditing$1(true);
 },
 _updateTimeEntry$1: function(entry) {
  this._timeEntry = entry;
  var projects = this.activityProvider.get$fetchedProjects();
  if (!$.eqNullB(entry.get$activityId())) {
    var activity = this.activityProvider.activityWithId$1(entry.get$activityId());
  } else {
    activity = (void 0);
  }
  if (!$.eqNullB(activity)) {
    var project = this.activityProvider.projectWithActivity$1(activity);
  } else {
    project = $.index(projects, 0);
  }
  if ($.eqNullB(activity)) {
    var activity0 = $.index(project.get$activities(), 0);
  } else {
    activity0 = activity;
  }
  if (!$.eqNullB(entry.get$activityId())) {
    var t0 = entry.get$start();
    this.view.set$timeFrom(t0);
    var t1 = entry.get$end();
    this.view.set$timeTo(t1);
    var t2 = entry.get$comment();
    this.view.set$comment(t2);
  } else {
  }
  this.view.set$availableProjects(projects);
  this.view.set$project(project);
  var t3 = project.get$activities();
  this.view.set$availableActivities(t3);
  this.view.set$activity(activity0);
 },
 get$timeEntry: function() {
  return this._timeEntry;
 },
 createUI$0: function() {
  this.view.createUI$0();
  this._updateTimeEntry$1(this._timeEntry);
  $.add$1(this.view.get$editButton().get$on().get$click(), this.get$editTouched());
  $.add$1(this.view.get$cancelButton().get$on().get$click(), this.get$cancelTouched());
  $.add$1(this.view.get$saveButton().get$on().get$click(), this.get$saveTouched());
  $.add$1(this.view.get$deleteButton().get$on().get$click(), this.get$deleteTouched());
  $.add$1(this.view.get$projectSelect().get$on().get$change(), new $.Closure37(this));
  $.add$1(this.view.get$projectSelect().get$on().get$focus(), new $.Closure38(this));
  $.add$1(this.view.get$projectSelect().get$on().get$blur(), new $.Closure39(this));
  return this.view.get$editorElement();
 }
});

Isolate.$defineClass("TimeEntryEditorModel", "Object", [], {
});

Isolate.$defineClass("TimeEntryEditorView", "Object", ["cancelButton?", "deleteButton?", "saveButton?", "editButton?", "commentTextArea", "activitySelect?", "projectSelect?", "timeToInput", "timeFromInput", "editorElement?", "elementCreator"], {
 _selectOption$2: function(select, value) {
  for (var i = 0; $.ltB(i, $.get$length(select.get$nodes())); i = i + 1) {
    if ($.eqB($.index(select.get$nodes(), i).get$value(), value)) {
      select.set$selectedIndex(i);
      break;
    } else {
    }
  }
 },
 _replaceOptions$4: function(select, objects, value, text) {
  var t0 = ({});
  t0.select_1 = select;
  t0.value_2 = value;
  t0.text_3 = text;
  for (; $.gtB($.get$length(t0.select_1.get$nodes()), 0); ) {
    $.index(t0.select_1.get$nodes(), 0).remove$0();
  }
  $.forEach(objects, new $.Closure47(t0));
 },
 set$activity: function(activity) {
  return this._selectOption$2(this.activitySelect, '' + $.stringToString(activity.get$id()));
 },
 set$project: function(project) {
  return this._selectOption$2(this.projectSelect, project.get$name());
 },
 set$availableActivities: function(activityList) {
  return this._replaceOptions$4(this.activitySelect, activityList, new $.Closure45(), new $.Closure46());
 },
 set$availableProjects: function(projectList) {
  return this._replaceOptions$4(this.projectSelect, projectList, new $.Closure48(), new $.Closure49());
 },
 get$comment: function() {
  return this.commentTextArea.get$value();
 },
 set$comment: function(comment) {
  this.commentTextArea.set$value(comment);
  return comment;
 },
 get$timeTo: function() {
  return $.ZeTime$fromString$1(this.timeToInput.get$value());
 },
 set$timeTo: function(time) {
  var t0 = $.toString(time);
  this.timeToInput.set$value(t0);
  return t0;
 },
 get$timeFrom: function() {
  return $.ZeTime$fromString$1(this.timeFromInput.get$value());
 },
 set$timeFrom: function(time) {
  var t0 = $.toString(time);
  this.timeFromInput.set$value(t0);
  return t0;
 },
 enableEditing$1: function(enabled) {
  var t0 = enabled === true;
  if (t0) {
    this.editorElement.get$classes().remove$1('timeEntryView');
    $.add$1(this.editorElement.get$classes(), 'timeEntryEditing');
  } else {
    this.editorElement.get$classes().remove$1('timeEntryEditing');
    $.add$1(this.editorElement.get$classes(), 'timeEntryView');
  }
  var t1 = !t0;
  this.timeFromInput.set$disabled(t1);
  this.timeToInput.set$disabled(t1);
  this.projectSelect.set$disabled(t1);
  this.activitySelect.set$disabled(t1);
  this.commentTextArea.set$disabled(t1);
 },
 createUI$0: function() {
  this.editorElement = this.elementCreator.createElement$2('div', ['timeEntry', 'timeEntryView']);
  this.timeFromInput = this.elementCreator.createElement$3('input', ['time', 'entryTimeFrom'], this.editorElement);
  this.timeFromInput.set$type('time');
  this.timeFromInput.set$disabled(true);
  this.elementCreator.createElement$3('span', ['timeSeparator'], this.editorElement);
  this.timeToInput = this.elementCreator.createElement$3('input', ['time', 'entryTimeTo'], this.editorElement);
  this.timeToInput.set$type('time');
  this.timeToInput.set$disabled(true);
  this.projectSelect = this.elementCreator.createElement$3('select', ['project'], this.editorElement);
  this.projectSelect.set$disabled(true);
  this.activitySelect = this.elementCreator.createElement$3('select', ['activity'], this.editorElement);
  this.activitySelect.set$disabled(true);
  this.commentTextArea = this.elementCreator.createElement$3('textarea', ['comment'], this.editorElement);
  this.commentTextArea.set$placeholder('Kommentar (f\xfcr Kunden sichtbar)');
  this.commentTextArea.set$rows(2);
  this.commentTextArea.set$disabled(true);
  var editorActionsElement = this.elementCreator.createElement$3('div', ['timeEntryActions'], this.editorElement);
  this.editButton = this.elementCreator.createElement$3('a', ['timeEntryEdit'], editorActionsElement);
  this.editButton.set$text('Editieren');
  this.saveButton = this.elementCreator.createElement$3('a', ['timeEntrySave'], editorActionsElement);
  this.saveButton.set$text('Sichern');
  this.deleteButton = this.elementCreator.createElement$3('a', ['timeEntryDelete'], editorActionsElement);
  this.deleteButton.set$text('L\xf6schen');
  this.cancelButton = this.elementCreator.createElement$3('a', ['timeEntryCancel'], editorActionsElement);
  this.cancelButton.set$text('Abbrechen');
 }
});

Isolate.$defineClass("User", "Object", ["password?", "name?"], {
});

Isolate.$defineClass("Month", "Object", ["monthJSON"], {
 timeEntriesFor$1: function(day) {
  var t0 = ({});
  t0.day_1 = day;
  return $.filter(this.get$timeEntries(), new $.Closure34(t0));
 },
 get$timeEntries: function() {
  return $.map($.index(this.monthJSON, 'zeiten'), new $.Closure35());
 },
 get$month: function() {
  return $.index(this.monthJSON, 'monat');
 },
 get$year: function() {
  return $.index(this.monthJSON, 'jahr');
 }
});

Isolate.$defineClass("TimeEntry", "Object", ["timeEntryJSON"], {
 set$comment: function(aComment) {
  $.indexSet(this.timeEntryJSON, 'kommentar', aComment);
  return aComment;
 },
 get$comment: function() {
  return $.index(this.timeEntryJSON, 'kommentar');
 },
 set$end: function(time) {
  var t0 = this.timeEntryJSON;
  var t1 = $.toString(time);
  $.indexSet(t0, 'ende', t1);
  return t1;
 },
 get$end: function() {
  return $.ZeTime$fromString$1($.index(this.timeEntryJSON, 'ende'));
 },
 set$start: function(time) {
  var t0 = this.timeEntryJSON;
  var t1 = $.toString(time);
  $.indexSet(t0, 'start', t1);
  return t1;
 },
 get$start: function() {
  return $.ZeTime$fromString$1($.index(this.timeEntryJSON, 'start'));
 },
 start$0: function() { return this.get$start().$call$0(); },
 set$date: function(aDate) {
  var t0 = this.timeEntryJSON;
  var t1 = $.toString(aDate);
  $.indexSet(t0, 'tag', t1);
  return t1;
 },
 get$date: function() {
  return $.ZeDate$fromString($.index(this.timeEntryJSON, 'tag'));
 },
 set$activityId: function(activityId) {
  if ($.eqNullB($.index(this.timeEntryJSON, 'taetigkeit'))) {
    $.indexSet(this.timeEntryJSON, 'taetigkeit', $.HashMapImplementation$0());
  } else {
  }
  $.indexSet($.index(this.timeEntryJSON, 'taetigkeit'), 'id', activityId);
 },
 get$activityId: function() {
  if (!$.eqNullB($.index(this.timeEntryJSON, 'taetigkeit'))) {
    var t0 = $.index($.index(this.timeEntryJSON, 'taetigkeit'), 'id');
  } else {
    t0 = (void 0);
  }
  return t0;
 },
 set$id: function(id) {
  $.indexSet(this.timeEntryJSON, 'id', id);
  return id;
 },
 get$id: function() {
  return $.index(this.timeEntryJSON, 'id');
 }
});

Isolate.$defineClass("Project", "Object", ["_activities", "_projectJSON"], {
 get$activities: function() {
  if ($.eqNullB(this._activities)) {
    this._activities = $.List$from($.map($.index(this._projectJSON, 'taetigkeiten'), new $.Closure50()));
    $.sort(this._activities, new $.Closure51());
  } else {
  }
  return this._activities;
 },
 get$name: function() {
  return $.index(this._projectJSON, 'name');
 }
});

Isolate.$defineClass("Activity", "Object", ["_activityJSON"], {
 get$name: function() {
  return $.index(this._activityJSON, 'name');
 },
 get$id: function() {
  return $.index(this._activityJSON, 'id');
 }
});

Isolate.$defineClass("ZeDate", "Object", ["year?", "month?", "day?"], {
 _toStringWithLeadingZeros$1: function(number) {
  if ($.ltB(number, 10)) {
    var t0 = '0' + $.stringToString(number);
  } else {
    t0 = '' + $.stringToString(number);
  }
  return t0;
 },
 toGermanString$0: function() {
  return '' + $.stringToString(this._toStringWithLeadingZeros$1(this.day)) + '.' + $.stringToString(this._toStringWithLeadingZeros$1(this.month)) + '.' + $.stringToString(this.year);
 },
 toString$0: function() {
  return '' + $.stringToString(this.year) + '-' + $.stringToString(this._toStringWithLeadingZeros$1(this.month)) + '-' + $.stringToString(this._toStringWithLeadingZeros$1(this.day));
 },
 equals$1: function(other) {
  var t0 = $.eqB(this.day, other.get$day());
  if (t0) {
    var t1 = $.eqB(this.month, other.get$month());
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = $.eqB(this.year, other.get$year());
  } else {
    t2 = t1;
  }
  return t2;
 },
 operator$eq$1: function(other) {
  var t0 = !$.eqNullB(other);
  if (t0) {
    var t1 = this.equals$1(other) === true;
  } else {
    t1 = t0;
  }
  return t1;
 },
 isWeekend$0: function() {
  var weekday = $.DateImplementation$8(this.year, this.month, this.day, 0, 0, 0, 0, false).get$weekday();
  var t0 = $.eqB(weekday, 5);
  if (!t0) {
    var t1 = $.eqB(weekday, 6);
  } else {
    t1 = t0;
  }
  return t1;
 },
 nextDay$0: function() {
  return $.ZeDate$fromDate($.DateImplementation$8(this.year, this.month, this.day, 0, 0, 0, 0, false).add$1($.CTC9));
 }
});

Isolate.$defineClass("ZeTime", "Object", ["minutes?", "hour?"], {
 _toStringWithLeadingZeros$1: function(number) {
  if ($.ltB(number, 10)) {
    var t0 = '0' + $.stringToString(number);
  } else {
    t0 = '' + $.stringToString(number);
  }
  return t0;
 },
 toString$0: function() {
  return '' + $.stringToString(this._toStringWithLeadingZeros$1(this.hour)) + ':' + $.stringToString(this._toStringWithLeadingZeros$1(this.minutes));
 },
 equals$1: function(other) {
  var t0 = $.eqB(this.hour, other.get$hour());
  if (t0) {
    var t1 = $.eqB(this.minutes, other.get$minutes());
  } else {
    t1 = t0;
  }
  return t1;
 },
 operator$eq$1: function(other) {
  var t0 = !$.eqNullB(other);
  if (t0) {
    var t1 = this.equals$1(other) === true;
  } else {
    t1 = t0;
  }
  return t1;
 },
 ZeTime$fromString$1: function(timeString) {
  if ($.eqNullB(timeString)) {
    return;
  } else {
  }
  for (var t0 = $.iterator($.CTC10.allMatches$1(timeString)); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this.hour = $.parseInt(t1.group$1(1));
    this.minutes = $.parseInt(t1.group$1(2));
  }
 }
});

Isolate.$defineClass("WebServiceRequester", "Object", ["login"], {
 encodeFormData$1: function(data) {
  var t0 = ({});
  if ($.eqNullB(data)) {
    return '';
  } else {
  }
  var encodedData = $.List((void 0));
  $.setRuntimeTypeInfo(encodedData, ({E: 'String'}));
  t0.encodedData_1 = encodedData;
  $.forEach(data, new $.Closure19(t0));
  return $.join(t0.encodedData_1, '&');
 },
 equipWithUser$2: function(url, user) {
  return $.replaceAll(url, '@@USER@@', user.get$name());
 },
 sendRequest$5: function(method, url, parameters, onSuccess, onFailure) {
  var t0 = ({});
  t0.onSuccess_6 = onSuccess;
  t0.onFailure_7 = onFailure;
  t0.url_4 = url;
  t0.method_3 = method;
  t0.parameters_5 = parameters;
  this.login.loginUserIfNotAlreadyLoggedIn$1(new $.Closure4(this, t0));
 },
 sendGet$3: function(url, onSuccess, onFailure) {
  this.sendRequest$5('GET', url, (void 0), onSuccess, onFailure);
 }
});

Isolate.$defineClass("ActivityProvider", "Object", ["fetchedProjects?", "requester", "errorDisplay?"], {
 _processFetchedProjects$2: function(response, onProjectsFetched) {
  this.fetchedProjects = $.List$from($.map($.parse(response), new $.Closure20()));
  if (!$.eqNullB(onProjectsFetched)) {
    onProjectsFetched.$call$1(this.fetchedProjects);
  } else {
  }
 },
 projectWithName$1: function(name$) {
  if (!$.eqNullB(this.fetchedProjects)) {
    for (var t0 = $.iterator(this.fetchedProjects); t0.hasNext$0() === true; ) {
      var t1 = t0.next$0();
      if ($.eqB(t1.get$name(), name$)) {
        return t1;
      } else {
      }
    }
  } else {
  }
  return;
 },
 projectWithActivity$1: function(activity) {
  if (!$.eqNullB(this.fetchedProjects)) {
    for (var t0 = $.iterator(this.fetchedProjects); t0.hasNext$0() === true; ) {
      var t1 = t0.next$0();
      var activities = t1.get$activities();
      var t2 = !$.eqNullB(activities);
      if (t2) {
        var t3 = $.geB($.indexOf$1(activities, activity), 0);
      } else {
        t3 = t2;
      }
      if (t3) {
        return t1;
      } else {
      }
    }
  } else {
  }
  return;
 },
 activityWithId$1: function(id) {
  if (!$.eqNullB(this.fetchedProjects)) {
    for (var t0 = $.iterator(this.fetchedProjects); t0.hasNext$0() === true; ) {
      var activities = t0.next$0().get$activities();
      if (!$.eqNullB(activities)) {
        for (var t1 = $.iterator(activities); t1.hasNext$0() === true; ) {
          var t2 = t1.next$0();
          if ($.eqB(t2.get$id(), id)) {
            return t2;
          } else {
          }
        }
      } else {
      }
    }
  } else {
  }
  return;
 },
 fetchProjects$1: function(onProjectsFetched) {
  var t0 = ({});
  t0.onProjectsFetched_1 = onProjectsFetched;
  if ($.eqNullB(this.fetchedProjects)) {
    this.requester.sendGet$3('/api/projekte/', new $.Closure2(this, t0), new $.Closure3(this));
  } else {
    t0.onProjectsFetched_1.$call$1(this.fetchedProjects);
  }
 }
});

Isolate.$defineClass("TimeEntryProvider", "Object", ["webServiceRequester", "errorDisplay?"], {
 delete$2: function(timeEntry, onSuccess) {
  var t0 = ({});
  t0.onSuccess_1 = onSuccess;
  this.webServiceRequester.sendRequest$5('DELETE', '/api/zeiten/' + $.stringToString(timeEntry.get$date().get$year()) + '/' + $.stringToString(timeEntry.get$date().get$month()) + '/' + $.stringToString('@@USER@@') + '/' + $.stringToString(timeEntry.get$id()) + '/', (void 0), new $.Closure40(t0), new $.Closure41(this));
 },
 save$2: function(timeEntry, onSuccess) {
  var t0 = ({});
  t0.onSuccess_1 = onSuccess;
  var parameters = $.makeLiteralMap(['taetigkeit', timeEntry.get$activityId(), 'tag', timeEntry.get$date().toGermanString$0(), 'start', $.toString(timeEntry.get$start()), 'ende', $.toString(timeEntry.get$end()), 'kommentar', timeEntry.get$comment()]);
  var url = '/api/zeiten/' + $.stringToString(timeEntry.get$date().get$year()) + '/' + $.stringToString(timeEntry.get$date().get$month()) + '/' + $.stringToString('@@USER@@') + '/';
  if (!$.eqNullB(timeEntry.get$id())) {
    var url0 = '' + $.stringToString(url) + $.stringToString(timeEntry.get$id()) + '/';
    var method = 'PUT';
  } else {
    url0 = url;
    method = 'POST';
  }
  this.webServiceRequester.sendRequest$5(method, url0, parameters, new $.Closure43(t0), new $.Closure44(this));
 },
 _processFetchedMonth$2: function(response, onMonthFetched) {
  var month = $.Month$1($.parse(response));
  if (!$.eqNullB(onMonthFetched)) {
    onMonthFetched.$call$1(month);
  } else {
  }
 },
 fetchTimeEntries$3: function(month, year, onMonthFetched) {
  var t0 = ({});
  t0.onMonthFetched_1 = onMonthFetched;
  this.webServiceRequester.sendGet$3('/api/monat/' + $.stringToString(year) + '/' + $.stringToString(month) + '/' + $.stringToString('@@USER@@') + '/', new $.Closure25(this, t0), new $.Closure26(this));
 }
});

Isolate.$defineClass("Expander", "Object", [], {
 findContainer$1: function(element) {
  if ($.eqNullB(element)) {
    return;
  } else {
  }
  if ($.contains$1(element.get$classes(), 'container') === true) {
    return element;
  } else {
  }
  return this.findContainer$1(element.get$parent());
 },
 findHeader$1: function(element) {
  if ($.eqNullB(element)) {
    return;
  } else {
  }
  if ($.contains$1(element.get$classes(), 'header') === true) {
    return element;
  } else {
  }
  return this.findHeader$1(element.get$parent());
 },
 findExpander$1: function(element) {
  if ($.eqNullB(element)) {
    return;
  } else {
  }
  if ($.contains$1(element.get$classes(), 'expander') === true) {
    return element;
  } else {
  }
  return element.query$1('.' + $.stringToString('expander'));
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
  if (!$.eqNullB(container)) {
    if ($.contains$1(container.get$classes(), 'containerCollapsed') === true) {
      this.expand$1(container);
    } else {
      this.collapse$1(container);
    }
  } else {
  }
 },
 get$executeExpander: function() { return new $.Closure54(this, 'executeExpander$1'); },
 connect$1: function(element) {
  var header = this.findHeader$1(this.findExpander$1(element));
  if (!$.eqNullB(header)) {
    $.add$1(header.get$on().get$click(), this.get$executeExpander());
  } else {
  }
 }
});

Isolate.$defineClass("Dialog", "Object", ["touchMovePreventer", "modalifier", "dialogFrame", "cancelButtonText?", "okButtonText?", "content", "text"], {
 dispose$0: function() {
  $.document().get$on().get$touchMove().remove$1(this.touchMovePreventer);
  $.document().get$body().get$classes().remove$1('modalified');
  this.modalifier.remove$0();
 },
 show$1: function(dialogCallback) {
  var t0 = ({});
  t0.dialogCallback_1 = dialogCallback;
  this.modalifier = $.Element$tag('div');
  $.add$1(this.modalifier.get$classes(), 'modalifier');
  this.dialogFrame = $.Element$tag('div');
  $.add$1(this.dialogFrame.get$classes(), 'dialog');
  var textDisplay = $.Element$tag('div');
  $.add$1(textDisplay.get$classes(), 'dialogText');
  textDisplay.set$text(this.text);
  $.add$1(this.dialogFrame.get$nodes(), textDisplay);
  $.add$1(this.dialogFrame.get$nodes(), this.content);
  var buttonBar = $.Element$tag('div');
  $.add$1(buttonBar.get$classes(), 'dialogButtonBar');
  $.add$1(this.dialogFrame.get$nodes(), buttonBar);
  if (!$.eqNullB(this.cancelButtonText)) {
    var cancelButton = $.Element$tag('a');
    $.add$1(cancelButton.get$classes(), 'dialogCancelButton');
    cancelButton.set$text(this.cancelButtonText);
    $.add$1(cancelButton.get$on().get$click(), new $.Closure7(this, t0));
    $.add$1(buttonBar.get$nodes(), cancelButton);
  } else {
  }
  if (!$.eqNullB(this.okButtonText)) {
    var okButton = $.Element$tag('a');
    $.add$1(okButton.get$classes(), 'dialogOkButton');
    okButton.set$text(this.okButtonText);
    $.add$1(okButton.get$on().get$click(), new $.Closure8(this, t0));
    $.add$1(buttonBar.get$nodes(), okButton);
  } else {
  }
  $.add$1(this.modalifier.get$nodes(), this.dialogFrame);
  this.touchMovePreventer = new $.Closure9();
  $.add$1($.document().get$on().get$touchMove(), this.touchMovePreventer);
  $.add$1($.document().get$body().get$classes(), 'modalified');
  $.add$1($.document().get$body().get$nodes(), this.modalifier);
 }
});

Isolate.$defineClass("ElementCreator", "Object", [], {
 createElement$3: function(tagName, classes, parent$) {
  var element = $.Element$tag(tagName);
  if (!$.eqNullB(classes)) {
    $.addAll(element.get$classes(), classes);
  } else {
  }
  if (!$.eqNullB(parent$)) {
    $.add$1(parent$.get$nodes(), element);
  } else {
  }
  return element;
 },
 createElement$2: function(tagName,classes) {
  return this.createElement$3(tagName,classes,(void 0))
}
});

Isolate.$defineClass("ErrorDisplay", "Object", [], {
 showWebServiceError$2: function(statusCode, response) {
  $.print('' + $.stringToString(statusCode) + ' : ' + $.stringToString(response));
 }
});

Isolate.$defineClass("_AbstractWorkerEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_AudioContextEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_BatteryManagerEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_BodyElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$focus: function() {
  return this._get$1('focus');
 },
 get$blur: function() {
  return this._get$1('blur');
 }
});

Isolate.$defineClass("_DOMApplicationCacheEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_DedicatedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_DeprecatedPeerConnectionEventsImpl", "_EventsImpl", ["_ptr"], {
 get$open: function() {
  return this._get$1('open');
 },
 open$5: function(arg0, arg1, arg2, arg3, arg4) { return this.get$open().$call$5(arg0, arg1, arg2, arg3, arg4); }
});

Isolate.$defineClass("_DocumentEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$touchMove: function() {
  return this._get$1('touchmove');
 },
 get$readyStateChange: function() {
  return this._get$1('readystatechange');
 },
 get$focus: function() {
  return this._get$1('focus');
 },
 get$click: function() {
  return this._get$1('click');
 },
 get$change: function() {
  return this._get$1('change');
 },
 get$blur: function() {
  return this._get$1('blur');
 }
});

Isolate.$defineClass("_ElementAttributeMap", "Object", ["_element?"], {
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._element.get$$$dom_attributes());
 },
 forEach$1: function(f) {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.forEach$1$bailout(f, 1, attributes);
  for (var len = attributes.length, i = 0; i < len; i = i + 1) {
    var t0 = attributes.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = attributes[i];
    f.$call$2(t1.get$name(), t1.get$value());
  }
 },
 forEach$1$bailout: function(f, state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._element.get$$$dom_attributes();
    case 1:
      state = 0;
      var len = $.get$length(attributes);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var item = $.index(attributes, i);
        f.$call$2(item.get$name(), item.get$value());
        i = i + 1;
      }
  }
 },
 clear$0: function() {
  var attributes = this._element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.clear$0$bailout(1, attributes);
  for (var i = attributes.length - 1; i >= 0; i = i - 1) {
    var t0 = attributes.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    this.remove$1(attributes[i].get$name());
  }
 },
 clear$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._element.get$$$dom_attributes();
    case 1:
      state = 0;
      var i = $.sub($.get$length(attributes), 1);
      L0: while (true) {
        if (!$.geB(i, 0)) break L0;
        this.remove$1($.index(attributes, i).get$name());
        i = $.sub(i, 1);
      }
  }
 },
 remove$1: function(key) {
  var value = this._element.$dom_getAttribute$1(key);
  this._element.$dom_removeAttribute$1(key);
  return value;
 },
 operator$indexSet$2: function(key, value) {
  this._element.$dom_setAttribute$2(key, '' + $.stringToString(value));
 },
 operator$index$1: function(key) {
  return this._element.$dom_getAttribute$1(key);
 },
 containsKey$1: function(key) {
  return this._element.$dom_hasAttribute$1(key);
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("_CssClassSet", "Object", ["_element?"], {
 _formatSet$1: function(s) {
  return $.join($.List$from(s), ' ');
 },
 _write$1: function(s) {
  var t0 = this._formatSet$1(s);
  this._element.set$$$dom_className(t0);
 },
 _classname$0: function() {
  return this._element.get$$$dom_className();
 },
 _read$0: function() {
  var s = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(s, ({E: 'String'}));
  for (var t0 = $.iterator($.split(this._classname$0(), ' ')); t0.hasNext$0() === true; ) {
    var trimmed = $.trim(t0.next$0());
    if ($.isEmpty(trimmed) !== true) {
      s.add$1(trimmed);
    } else {
    }
  }
  return s;
 },
 _modify$1: function(f) {
  var s = this._read$0();
  f.$call$1(s);
  this._write$1(s);
 },
 clear$0: function() {
  this._modify$1(new $.Closure16());
 },
 addAll$1: function(collection) {
  var t0 = ({});
  t0.collection_1 = collection;
  this._modify$1(new $.Closure30(t0));
 },
 remove$1: function(value) {
  var s = this._read$0();
  var result = s.remove$1(value);
  this._write$1(s);
  return result;
 },
 add$1: function(value) {
  var t0 = ({});
  t0.value_1 = value;
  this._modify$1(new $.Closure15(t0));
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
});

Isolate.$defineClass("_ElementEventsImpl", "_EventsImpl", ["_ptr"], {
 get$touchMove: function() {
  return this._get$1('touchmove');
 },
 get$focus: function() {
  return this._get$1('focus');
 },
 get$click: function() {
  return this._get$1('click');
 },
 get$change: function() {
  return this._get$1('change');
 },
 get$blur: function() {
  return this._get$1('blur');
 }
});

Isolate.$defineClass("_EventSourceEventsImpl", "_EventsImpl", ["_ptr"], {
 get$open: function() {
  return this._get$1('open');
 },
 open$5: function(arg0, arg1, arg2, arg3, arg4) { return this.get$open().$call$5(arg0, arg1, arg2, arg3, arg4); }
});

Isolate.$defineClass("_EventsImpl", "Object", ["_ptr"], {
 _get$1: function(type) {
  return $._EventListenerListImpl$2(this._ptr, type);
 },
 operator$index$1: function(type) {
  return this._get$1($.toLowerCase(type));
 }
});

Isolate.$defineClass("_EventListenerListImpl", "Object", ["_type", "_ptr"], {
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
});

Isolate.$defineClass("_FileReaderEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_FileWriterEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_FrameSetElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$focus: function() {
  return this._get$1('focus');
 },
 get$blur: function() {
  return this._get$1('blur');
 }
});

Isolate.$defineClass("_IDBDatabaseEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBRequestEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBTransactionEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBVersionChangeRequestEventsImpl", "_IDBRequestEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_InputElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_JavaScriptAudioNodeEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MediaElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MediaStreamEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MessagePortEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_ChildNodeListLazy", "Object", ["_this"], {
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
 },
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter3(this, [], f));
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
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
  if (!$.eqNullB(result)) {
    this._this.$dom_removeChild$1(result);
  } else {
  }
  return result;
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._this.$dom_appendChild$1(t1);
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
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ListWrapper", "Object", [], {
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
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_NodeListWrapper", "_ListWrapper", ["_lib_list"], {
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter(this._lib_list, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_NotificationEventsImpl", "_EventsImpl", ["_ptr"], {
 get$show: function() {
  return this._get$1('show');
 },
 show$1: function(arg0) { return this.get$show().$call$1(arg0); },
 get$click: function() {
  return this._get$1('click');
 }
});

Isolate.$defineClass("_PeerConnection00EventsImpl", "_EventsImpl", ["_ptr"], {
 get$open: function() {
  return this._get$1('open');
 },
 open$5: function(arg0, arg1, arg2, arg3, arg4) { return this.get$open().$call$5(arg0, arg1, arg2, arg3, arg4); }
});

Isolate.$defineClass("_AttributeClassSet", "_CssClassSet", ["_element"], {
 _write$1: function(s) {
  $.indexSet(this._element.get$attributes(), 'class', this._formatSet$1(s));
 },
 $dom_className$0: function() {
  return $.index(this._element.get$attributes(), 'class');
 },
 get$$$dom_className: function() { return new $.Closure52(this, '$dom_className$0'); }
});

Isolate.$defineClass("_SVGElementInstanceEventsImpl", "_EventsImpl", ["_ptr"], {
 get$focus: function() {
  return this._get$1('focus');
 },
 get$click: function() {
  return this._get$1('click');
 },
 get$change: function() {
  return this._get$1('change');
 },
 get$blur: function() {
  return this._get$1('blur');
 }
});

Isolate.$defineClass("_SharedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_ptr"], {
 get$connect: function() {
  return this._get$1('connect');
 },
 connect$1: function(arg0) { return this.get$connect().$call$1(arg0); }
});

Isolate.$defineClass("_SpeechRecognitionEventsImpl", "_EventsImpl", ["_ptr"], {
 get$start: function() {
  return this._get$1('start');
 },
 start$0: function() { return this.get$start().$call$0(); },
 get$end: function() {
  return this._get$1('end');
 }
});

Isolate.$defineClass("_TextTrackEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackCueEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackListEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_WebSocketEventsImpl", "_EventsImpl", ["_ptr"], {
 get$open: function() {
  return this._get$1('open');
 },
 open$5: function(arg0, arg1, arg2, arg3, arg4) { return this.get$open().$call$5(arg0, arg1, arg2, arg3, arg4); }
});

Isolate.$defineClass("_WindowEventsImpl", "_EventsImpl", ["_ptr"], {
 get$touchMove: function() {
  return this._get$1('touchmove');
 },
 get$focus: function() {
  return this._get$1('focus');
 },
 get$click: function() {
  return this._get$1('click');
 },
 get$change: function() {
  return this._get$1('change');
 },
 get$blur: function() {
  return this._get$1('blur');
 }
});

Isolate.$defineClass("_WorkerEventsImpl", "_AbstractWorkerEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_WorkerContextEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_XMLHttpRequestEventsImpl", "_EventsImpl", ["_ptr"], {
 get$readyStateChange: function() {
  return this._get$1('readystatechange');
 }
});

Isolate.$defineClass("_XMLHttpRequestUploadEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_FixedSizeListIterator", "_VariableSizeListIterator", ["_lib_length", "_pos", "_array"], {
 hasNext$0: function() {
  return $.gt(this._lib_length, this._pos);
 }
});

Isolate.$defineClass("_VariableSizeListIterator", "Object", [], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var t0 = this._array;
  var t1 = this._pos;
  this._pos = $.add(t1, 1);
  return $.index(t0, t1);
 },
 hasNext$0: function() {
  return $.gt($.get$length(this._array), this._pos);
 }
});

Isolate.$defineClass("_JsonParser", "Object", ["position", "length?", "json"], {
 _error$1: function(message) {
  throw $.captureStackTrace(message);
 },
 _token$0: function() {
  for (; true; ) {
    if ($.geB(this.position, $.get$length(this))) {
      return;
    } else {
    }
    var char$ = $.charCodeAt(this.json, this.position);
    var token = $.index($.tokens, char$);
    if (token === 32) {
      this.position = $.add(this.position, 1);
      continue;
    } else {
    }
    if (token === (void 0)) {
      return 0;
    } else {
    }
    return token;
  }
 },
 _nextChar$0: function() {
  this.position = $.add(this.position, 1);
  if ($.geB(this.position, $.get$length(this))) {
    return 0;
  } else {
  }
  return $.charCodeAt(this.json, this.position);
 },
 _char$0: function() {
  if ($.geB(this.position, $.get$length(this))) {
    this._error$1('Unexpected end of JSON stream');
  } else {
  }
  return $.charCodeAt(this.json, this.position);
 },
 _isToken$1: function(tokenKind) {
  return $.eq(this._token$0(), tokenKind);
 },
 _isDigit$1: function(char$) {
  var t0 = $.geB(char$, 48);
  if (t0) {
    var t1 = $.leB(char$, 57);
  } else {
    t1 = t0;
  }
  return t1;
 },
 _parseNumber$0: function() {
  if (this._isToken$1(45) !== true) {
    this._error$1('Expected number literal');
  } else {
  }
  var startPos = this.position;
  var char$ = this._char$0();
  if (char$ === 45) {
    var char0 = this._nextChar$0();
  } else {
    char0 = char$;
  }
  if (char0 === 48) {
    var char1 = this._nextChar$0();
  } else {
    if (this._isDigit$1(char0) === true) {
      for (var char2 = this._nextChar$0(); this._isDigit$1(char2) === true; char2 = char3) {
        var char3 = this._nextChar$0();
      }
      char1 = char2;
    } else {
      this._error$1('Expected digit when parsing number');
      char1 = char0;
    }
  }
  if (char1 === 46) {
    var char4 = this._nextChar$0();
    if (this._isDigit$1(char4) === true) {
      for (var char5 = this._nextChar$0(); this._isDigit$1(char5) === true; char5 = char6) {
        var char6 = this._nextChar$0();
      }
      var isInt = false;
      var char7 = char5;
    } else {
      this._error$1('Expected digit following comma');
      isInt = true;
      char7 = char4;
    }
  } else {
    isInt = true;
    char7 = char1;
  }
  var t0 = char7 === 101;
  if (!t0) {
    var t1 = char7 === 69;
  } else {
    t1 = t0;
  }
  if (t1) {
    var char8 = this._nextChar$0();
    var t2 = char8 === 45;
    if (!t2) {
      var t3 = char8 === 43;
    } else {
      t3 = t2;
    }
    if (t3) {
      var char9 = this._nextChar$0();
    } else {
      char9 = char8;
    }
    if (this._isDigit$1(char9) === true) {
      for (var char10 = this._nextChar$0(); this._isDigit$1(char10) === true; char10 = char11) {
        var char11 = this._nextChar$0();
      }
      var isInt0 = false;
    } else {
      this._error$1('Expected digit following \'e\' or \'E\'');
      isInt0 = isInt;
    }
  } else {
    isInt0 = isInt;
  }
  var number = $.substring$2(this.json, startPos, this.position);
  if (isInt0) {
    return $.parseInt(number);
  } else {
    return $.parseDouble(number);
  }
 },
 _parseString$0: function() {
  if (this._isToken$1(34) !== true) {
    this._error$1('Expected string literal');
  } else {
  }
  this.position = $.add(this.position, 1);
  var charCodes = $.List((void 0));
  $.setRuntimeTypeInfo(charCodes, ({E: 'int'}));
  for (; true; ) {
    var t0 = this._char$0();
    if ($.eqB(t0, 34)) {
      this.position = $.add(this.position, 1);
      break;
    } else {
    }
    if ($.eqB(t0, 92)) {
      this.position = $.add(this.position, 1);
      if ($.eqB(this.position, $.get$length(this))) {
        this._error$1('\\ at the end of input');
      } else {
      }
      $1:{
        var t1 = this._char$0();
        if (34 === t1) {
          var t0 = 34;
          break $1;
        } else {
          if (92 === t1) {
            var t0 = 92;
            break $1;
          } else {
            if (47 === t1) {
              var t0 = 47;
              break $1;
            } else {
              if (98 === t1) {
                var t0 = 8;
                break $1;
              } else {
                if (110 === t1) {
                  var t0 = 10;
                  break $1;
                } else {
                  if (114 === t1) {
                    var t0 = 13;
                    break $1;
                  } else {
                    if (102 === t1) {
                      var t0 = 12;
                      break $1;
                    } else {
                      if (116 === t1) {
                        var t0 = 9;
                        break $1;
                      } else {
                        if (117 === t1) {
                          if ($.gtB($.add(this.position, 5), $.get$length(this))) {
                            this._error$1('Invalid unicode esacape sequence');
                          } else {
                          }
                          var t2 = $.substring$2(this.json, $.add(this.position, 1), $.add(this.position, 5));
                          try {
                            var t0 = $.parseInt('0x' + $.stringToString(t2));
                          } catch (t3) {
                            $.unwrapException(t3);
                            this._error$1('Invalid unicode esacape sequence');
                          }
                          this.position = $.add(this.position, 4);
                          break $1;
                        } else {
                          this._error$1('Invalid esacape sequence in string literal');
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
    }
    charCodes.push(t0);
    this.position = $.add(this.position, 1);
  }
  return $.String$fromCharCodes(charCodes);
 },
 _parseList$0: function() {
  var list = [];
  this.position = $.add(this.position, 1);
  if (this._isToken$1(93) !== true) {
    for (; true; ) {
      $.add$1(list, this._parseValue$0());
      if (this._isToken$1(44) !== true) {
        break;
      } else {
      }
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(93) !== true) {
      this._error$1('Expected \']\' at end of list');
    } else {
    }
  } else {
  }
  this.position = $.add(this.position, 1);
  return list;
 },
 _parseObject$0: function() {
  var object = $.makeLiteralMap([]);
  if (typeof object !== 'object'||object.constructor !== Array||!!object.immutable$list) return this._parseObject$0$bailout(1, object);
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true; ) {
      var key = this._parseString$0();
      if (this._isToken$1(58) !== true) {
        this._error$1('Expected \':\' when parsing object');
      } else {
      }
      this.position = $.add(this.position, 1);
      var t0 = this._parseValue$0();
      if (key !== (key | 0)) throw $.iae(key);
      var t1 = object.length;
      if (key < 0 || key >= t1) throw $.ioore(key);
      object[key] = t0;
      if (this._isToken$1(44) !== true) {
        break;
      } else {
      }
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(125) !== true) {
      this._error$1('Expected \'}\' at end of object');
    } else {
    }
  } else {
  }
  this.position = $.add(this.position, 1);
  return object;
 },
 _parseObject$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      object = env0;
      break;
  }
  switch (state) {
    case 0:
      var object = $.makeLiteralMap([]);
    case 1:
      state = 0;
      this.position = $.add(this.position, 1);
      if (this._isToken$1(125) !== true) {
        L0: while (true) {
          if (!true) break L0;
          var key = this._parseString$0();
          if (this._isToken$1(58) !== true) {
            this._error$1('Expected \':\' when parsing object');
          } else {
          }
          this.position = $.add(this.position, 1);
          $.indexSet(object, key, this._parseValue$0());
          if (this._isToken$1(44) !== true) {
            break;
          } else {
          }
          this.position = $.add(this.position, 1);
        }
        if (this._isToken$1(125) !== true) {
          this._error$1('Expected \'}\' at end of object');
        } else {
        }
      } else {
      }
      this.position = $.add(this.position, 1);
      return object;
  }
 },
 _expectKeyword$2: function(word, value) {
  for (var i = 0; $.ltB(i, $.get$length(word)); i = i + 1) {
    if (!$.eqB(this._char$0(), $.charCodeAt(word, i))) {
      this._error$1('Expected keyword \'' + $.stringToString(word) + '\'');
    } else {
    }
    this.position = $.add(this.position, 1);
  }
  return value;
 },
 _parseValue$0: function() {
  var token = this._token$0();
  if (token === (void 0)) {
    this._error$1('Nothing to parse');
  } else {
  }
  $0:{
    if (34 === token) {
      return this._parseString$0();
    } else {
      if (45 === token) {
        return this._parseNumber$0();
      } else {
        if (110 === token) {
          return this._expectKeyword$2('null', (void 0));
        } else {
          if (102 === token) {
            return this._expectKeyword$2('false', false);
          } else {
            if (116 === token) {
              return this._expectKeyword$2('true', true);
            } else {
              if (123 === token) {
                return this._parseObject$0();
              } else {
                if (91 === token) {
                  return this._parseList$0();
                } else {
                  this._error$1('Unexpected token');
                }
              }
            }
          }
        }
      }
    }
  }
 },
 _parseToplevel$0: function() {
  var result = this._parseValue$0();
  if (!(this._token$0() === (void 0))) {
    this._error$1('Junk at the end of JSON input');
  } else {
  }
  return result;
 },
 _JsonParser$_internal$1: function(json) {
  if (!($.tokens === (void 0))) {
    return;
  } else {
  }
  var t0 = $.List(126);
  $.setRuntimeTypeInfo(t0, ({E: 'int'}));
  $.tokens = t0;
  $.indexSet($.tokens, 9, 32);
  $.indexSet($.tokens, 10, 32);
  $.indexSet($.tokens, 13, 32);
  $.indexSet($.tokens, 32, 32);
  $.indexSet($.tokens, 48, 45);
  $.indexSet($.tokens, 49, 45);
  $.indexSet($.tokens, 50, 45);
  $.indexSet($.tokens, 51, 45);
  $.indexSet($.tokens, 52, 45);
  $.indexSet($.tokens, 53, 45);
  $.indexSet($.tokens, 54, 45);
  $.indexSet($.tokens, 55, 45);
  $.indexSet($.tokens, 56, 45);
  $.indexSet($.tokens, 57, 45);
  $.indexSet($.tokens, 45, 45);
  $.indexSet($.tokens, 123, 123);
  $.indexSet($.tokens, 125, 125);
  $.indexSet($.tokens, 91, 91);
  $.indexSet($.tokens, 93, 93);
  $.indexSet($.tokens, 34, 34);
  $.indexSet($.tokens, 58, 58);
  $.indexSet($.tokens, 44, 44);
  $.indexSet($.tokens, 110, 110);
  $.indexSet($.tokens, 116, 116);
  $.indexSet($.tokens, 102, 102);
 }
});

Isolate.$defineClass("Closure", "Closure53", ["this_2"], {
 $call$1: function(projects) {
  var t0 = ({});
  t0.currentDay_1 = $.ZeDate$currentDay();
  this.this_2.get$timeEntryProvider().fetchTimeEntries$3(t0.currentDay_1.get$month(), t0.currentDay_1.get$year(), new $.Closure24(this.this_2, t0));
 }
});

Isolate.$defineClass("Closure24", "Closure53", ["this_3", "box_0"], {
 $call$1: function(month) {
  var monthDisplay = this.this_3.get$monthDisplayFactory().createMonthDisplay$1(month);
  $.add$1($.document().get$body().get$nodes(), monthDisplay.createUI$0());
  var currentDayElement = monthDisplay.get$view().get$containerElement().query$1('#day' + $.stringToString($.toString(this.box_0.currentDay_1)));
  this.this_3.get$expander().expand$1(currentDayElement);
  currentDayElement.scrollIntoView$0();
 }
});

Isolate.$defineClass("Closure2", "Closure53", ["this_2", "box_0"], {
 $call$1: function(response) {
  return this.this_2._processFetchedProjects$2(response, this.box_0.onProjectsFetched_1);
 }
});

Isolate.$defineClass("Closure3", "Closure53", ["this_3"], {
 $call$2: function(statusCode, response) {
  return this.this_3.get$errorDisplay().showWebServiceError$2(statusCode, response);
 }
});

Isolate.$defineClass("Closure4", "Closure53", ["this_8", "box_2"], {
 $call$1: function(user) {
  var t0 = ({});
  t0.req_1 = $.XMLHttpRequest();
  t0.req_1.open$5(this.box_2.method_3, this.this_8.equipWithUser$2(this.box_2.url_4, user), true, user.get$name(), user.get$password());
  $.add$1(t0.req_1.get$on().get$readyStateChange(), new $.Closure18(t0, this.box_2));
  if (!$.eqNullB(this.box_2.parameters_5)) {
    t0.req_1.setRequestHeader$2('Content-Type', 'application/x-www-form-urlencoded');
    t0.req_1.send$1(this.this_8.encodeFormData$1(this.box_2.parameters_5));
  } else {
    t0.req_1.send$0();
  }
 }
});

Isolate.$defineClass("Closure18", "Closure53", ["box_0", "box_2"], {
 $call$1: function(event$) {
  if ($.eqB(this.box_0.req_1.get$readyState(), 4)) {
    var t0 = $.geB(this.box_0.req_1.get$status(), 200);
    if (t0) {
      var t1 = $.ltB(this.box_0.req_1.get$status(), 300);
    } else {
      t1 = t0;
    }
    if (t1) {
      this.box_2.onSuccess_6.$call$1(this.box_0.req_1.get$responseText());
    } else {
      this.box_2.onFailure_7.$call$2(this.box_0.req_1.get$status(), this.box_0.req_1.get$responseText());
    }
  } else {
  }
 }
});

Isolate.$defineClass("Closure5", "Closure53", ["this_2", "box_0"], {
 $call$2: function(userName, password) {
  this.this_2.get$model().loginUser$2(userName, password);
  this.box_0.onUserLoggedIn_1.$call$1(this.this_2.get$model().get$user());
 }
});

Isolate.$defineClass("Closure6", "Closure53", ["box_0"], {
 $call$1: function(pressedButtonText) {
  this.box_0.loginDialog_4.dispose$0();
  this.box_0.onLoginDialogFinished_1.$call$2(this.box_0.nameInput_2.get$value(), this.box_0.passwordInput_3.get$value());
 }
});

Isolate.$defineClass("Closure7", "Closure53", ["this_2", "box_0"], {
 $call$1: function(event$) {
  this.box_0.dialogCallback_1.$call$1(this.this_2.get$cancelButtonText());
  event$.preventDefault$0();
 }
});

Isolate.$defineClass("Closure8", "Closure53", ["this_3", "box_0"], {
 $call$1: function(event$) {
  this.box_0.dialogCallback_1.$call$1(this.this_3.get$okButtonText());
  event$.preventDefault$0();
 }
});

Isolate.$defineClass("Closure9", "Closure53", [], {
 $call$1: function(event$) {
  return event$.preventDefault$0();
 }
});

Isolate.$defineClass("Closure10", "Closure53", ["box_0"], {
 $call$2: function(k, v) {
  if (this.box_0.first_3 !== true) {
    $.add$1(this.box_0.result_1, ', ');
  } else {
  }
  this.box_0.first_3 = false;
  $._emitObject(k, this.box_0.result_1, this.box_0.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  $._emitObject(v, this.box_0.result_1, this.box_0.visiting_2);
 }
});

Isolate.$defineClass("Closure11", "Closure53", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$0();
 }
});

Isolate.$defineClass("Closure12", "Closure53", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$1(this.box_0.arg1_2);
 }
});

Isolate.$defineClass("Closure13", "Closure53", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$2(this.box_0.arg1_2, this.box_0.arg2_3);
 }
});

Isolate.$defineClass("Closure14", "Closure53", ["box_0"], {
 $call$2: function(key, value) {
  this.box_0.f_1.$call$1(key);
 }
});

Isolate.$defineClass("Closure15", "Closure53", ["box_0"], {
 $call$1: function(s) {
  return $.add$1(s, this.box_0.value_1);
 }
});

Isolate.$defineClass("Closure16", "Closure53", [], {
 $call$1: function(s) {
  return $.clear(s);
 }
});

Isolate.$defineClass("Closure17", "Closure53", ["this_2", "box_0"], {
 $call$1: function(key) {
  return this.box_0.f_1.$call$2(key, $.index(this.this_2, key));
 }
});

Isolate.$defineClass("Closure19", "Closure53", ["box_0"], {
 $call$2: function(name$, value) {
  var encodedName = $.encodeURIComponent($.replaceAll(name$, '+', ' '));
  var encodedValue = $.encodeURIComponent($.replaceAll($.toString(value), '+', ' '));
  $.add$1(this.box_0.encodedData_1, '' + $.stringToString(encodedName) + '=' + $.stringToString(encodedValue));
 }
});

Isolate.$defineClass("Closure20", "Closure53", [], {
 $call$1: function(projectJSON) {
  return $.Project$1(projectJSON);
 }
});

Isolate.$defineClass("Closure21", "Closure53", ["box_0"], {
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
});

Isolate.$defineClass("Closure22", "Closure53", ["box_0"], {
 $call$1: function(entry) {
  this.box_0.f_1.$call$2(entry.get$key(), entry.get$value());
 }
});

Isolate.$defineClass("Closure23", "Closure53", ["box_0"], {
 $call$2: function(key, value) {
  $.add$1(this.box_0.result_2, this.box_0.f_1.$call$1(key));
 }
});

Isolate.$defineClass("Closure25", "Closure53", ["this_2", "box_0"], {
 $call$1: function(response) {
  return this.this_2._processFetchedMonth$2(response, this.box_0.onMonthFetched_1);
 }
});

Isolate.$defineClass("Closure26", "Closure53", ["this_3"], {
 $call$2: function(statusCode, response) {
  return this.this_3.get$errorDisplay().showWebServiceError$2(statusCode, response);
 }
});

Isolate.$defineClass("Closure27", "Closure53", [], {
 $call$1: function(n) {
  var absN = $.abs(n);
  if ($.ltB(n, 0)) {
    var sign = '-';
  } else {
    sign = '';
  }
  if ($.geB(absN, 1000)) {
    return '' + $.stringToString(n);
  } else {
  }
  if ($.geB(absN, 100)) {
    return '' + $.stringToString(sign) + '0' + $.stringToString(absN);
  } else {
  }
  if ($.geB(absN, 10)) {
    return '' + $.stringToString(sign) + '00' + $.stringToString(absN);
  } else {
  }
  if ($.geB(absN, 1)) {
    return '' + $.stringToString(sign) + '000' + $.stringToString(absN);
  } else {
  }
  throw $.captureStackTrace($.IllegalArgumentException$1(n));
 }
});

Isolate.$defineClass("Closure28", "Closure53", [], {
 $call$1: function(n) {
  if ($.geB(n, 100)) {
    return '' + $.stringToString(n);
  } else {
  }
  if ($.geB(n, 10)) {
    return '0' + $.stringToString(n);
  } else {
  }
  return '00' + $.stringToString(n);
 }
});

Isolate.$defineClass("Closure29", "Closure53", [], {
 $call$1: function(n) {
  if ($.geB(n, 10)) {
    return '' + $.stringToString(n);
  } else {
  }
  return '0' + $.stringToString(n);
 }
});

Isolate.$defineClass("Closure30", "Closure53", ["box_0"], {
 $call$1: function(s) {
  return $.addAll(s, this.box_0.collection_1);
 }
});

Isolate.$defineClass("Closure31", "Closure53", ["this_0"], {
 $call$1: function(value) {
  this.this_0.add$1(value);
 }
});

Isolate.$defineClass("Closure32", "Closure53", [], {
 $call$1: function(n) {
  if ($.geB(n, 100)) {
    return '' + $.stringToString(n);
  } else {
  }
  if ($.gtB(n, 10)) {
    return '0' + $.stringToString(n);
  } else {
  }
  return '00' + $.stringToString(n);
 }
});

Isolate.$defineClass("Closure33", "Closure53", [], {
 $call$1: function(n) {
  if ($.geB(n, 10)) {
    return '' + $.stringToString(n);
  } else {
  }
  return '0' + $.stringToString(n);
 }
});

Isolate.$defineClass("Closure34", "Closure53", ["box_0"], {
 $call$1: function(entry) {
  return $.eq(entry.get$date(), this.box_0.day_1);
 }
});

Isolate.$defineClass("Closure35", "Closure53", [], {
 $call$1: function(timeEntryJSON) {
  return $.TimeEntry$1(timeEntryJSON);
 }
});

Isolate.$defineClass("Closure36", "Closure53", ["box_0"], {
 $call$2: function(key, value) {
  if (this.box_0.f_1.$call$1(key) === true) {
    $.add$1(this.box_0.result_2, key);
  } else {
  }
 }
});

Isolate.$defineClass("Closure37", "Closure53", ["this_0"], {
 $call$1: function(event$) {
  return this.this_0.projectSelected$0();
 }
});

Isolate.$defineClass("Closure38", "Closure53", ["this_1"], {
 $call$1: function(event$) {
  var t0 = this.this_1.get$view().get$projectSelect().get$selectedIndex();
  this.this_1.set$projectSelectIndex(t0);
  var t1 = $.document().get$window().setInterval$2(this.this_1.get$projectSelected(), 100);
  this.this_1.set$projectSelectinterval(t1);
 }
});

Isolate.$defineClass("Closure39", "Closure53", ["this_2"], {
 $call$1: function(event$) {
  $.document().get$window().clearInterval$1(this.this_2.get$projectSelectinterval());
 }
});

Isolate.$defineClass("Closure40", "Closure53", ["box_0"], {
 $call$1: function(response) {
  $.print(response);
  this.box_0.onSuccess_1.$call$0();
 }
});

Isolate.$defineClass("Closure41", "Closure53", ["this_2"], {
 $call$2: function(statusCode, response) {
  return this.this_2.get$errorDisplay().showWebServiceError$2(statusCode, response);
 }
});

Isolate.$defineClass("Closure42", "Closure53", ["this_0"], {
 $call$0: function() {
  return this.this_0.get$view().enableEditing$1(false);
 }
});

Isolate.$defineClass("Closure43", "Closure53", ["box_0"], {
 $call$1: function(response) {
  $.print(response);
  this.box_0.onSuccess_1.$call$0();
 }
});

Isolate.$defineClass("Closure44", "Closure53", ["this_2"], {
 $call$2: function(statusCode, response) {
  return this.this_2.get$errorDisplay().showWebServiceError$2(statusCode, response);
 }
});

Isolate.$defineClass("Closure45", "Closure53", [], {
 $call$1: function(a) {
  return '' + $.stringToString(a.get$id());
 }
});

Isolate.$defineClass("Closure46", "Closure53", [], {
 $call$1: function(a) {
  return a.get$name();
 }
});

Isolate.$defineClass("Closure47", "Closure53", ["box_0"], {
 $call$1: function(object) {
  var option = $.Element$tag('option');
  option.set$value(this.box_0.value_2.$call$1(object));
  option.set$text(this.box_0.text_3.$call$1(object));
  this.box_0.select_1.add$2(option, (void 0));
 }
});

Isolate.$defineClass("Closure48", "Closure53", [], {
 $call$1: function(p) {
  return p.get$name();
 }
});

Isolate.$defineClass("Closure49", "Closure53", [], {
 $call$1: function(p) {
  return p.get$name();
 }
});

Isolate.$defineClass("Closure50", "Closure53", [], {
 $call$1: function(activityJSON) {
  return $.Activity$1(activityJSON);
 }
});

Isolate.$defineClass("Closure51", "Closure53", [], {
 $call$2: function(a, b) {
  return $.compareTo(a.get$name(), b.get$name());
 }
});

Isolate.$defineClass('Closure52', 'Closure53', ['self', 'target'], {
$call$0: function() { return this.self[this.target](); }
});
Isolate.$defineClass('Closure54', 'Closure53', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); }
});
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  } else {
  }
  return a.operator$mul$1(b);
};

$._ChildNodeListLazy$1 = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$._AudioContextEventsImpl$1 = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.floor$0();
  } else {
  }
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b) === true;
    } else {
      return a === b;
    }
  } else {
  }
  return a === b;
};

$.TimeEntryEditorModel$0 = function() {
  return new $.TimeEntryEditorModel();
};

$._containsRef = function(c, ref) {
  for (var t0 = $.iterator(c); t0.hasNext$0() === true; ) {
    if (t0.next$0() === ref) {
      return true;
    } else {
    }
  }
  return false;
};

$.forEach2 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.MonthDisplayView$2 = function(elementCreator, expander) {
  return new $.MonthDisplayView((void 0), (void 0), (void 0), (void 0), expander, elementCreator);
};

$._NodeListWrapper$1 = function(list) {
  return new $._NodeListWrapper(list);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$.isJsArray = function(value) {
  var t0 = !(value === (void 0));
  if (t0) {
    var t1 = (value.constructor === Array);
  } else {
    t1 = t0;
  }
  return t1;
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    } else {
    }
    var t0 = index < 0;
    if (!t0) {
      var t1 = $.geB(index, $.get$length(a));
    } else {
      t1 = t0;
    }
    if (t1) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  } else {
  }
  a.operator$indexSet$2(index, value);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) {
    return receiver.allMatches$1(str);
  } else {
  }
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.DateImplementation$now$0 = function() {
  var t0 = new $.DateImplementation(false, $.dateNow());
  t0.DateImplementation$now$0();
  return t0;
};

$.get$length = function(receiver) {
  var t0 = typeof receiver === 'string';
  if (!t0) {
    var t1 = $.isJsArray(receiver) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return receiver.length;
  } else {
    return receiver.get$length();
  }
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  } else {
  }
  return a.operator$ge$1(b);
};

$.IllegalJSRegExpException$2 = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  } else {
  }
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) {
      return 'Document';
    } else {
    }
    return 'HTMLDocument';
  } else {
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) {
    return 'HTMLTableCellElement';
  } else {
  }
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) {
    return 'HTMLTableCellElement';
  } else {
  }
  if ($.eqB(name$, 'MSStyleCSSProperties')) {
    return 'CSSStyleDeclaration';
  } else {
  }
  if ($.eqB(name$, 'CanvasPixelArray')) {
    return 'Uint8ClampedArray';
  } else {
  }
  if ($.eqB(name$, 'HTMLPhraseElement')) {
    return 'HTMLElement';
  } else {
  }
  return name$;
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.clear$0();
  } else {
  }
  $.set$length(receiver, 0);
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    var t0 = (typeof(name$)) === 'string';
    if (t0) {
      var t1 = $.isEmpty(name$) !== true;
    } else {
      t1 = t0;
    }
    if (t1) {
      var t2 = !(name$ === 'Object');
    } else {
      t2 = t1;
    }
    if (t2) {
      return name$;
    } else {
    }
  } else {
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return $.truncate((a) / (b));
  } else {
  }
  return a.operator$tdiv$1(b);
};

$.JSSyntaxRegExp$_globalVersionOf$1 = function(other) {
  var t0 = other.get$pattern();
  var t1 = other.get$multiLine();
  var t2 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t1, t0);
  t2.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t2;
};

$.JSSyntaxRegExp$3 = function(pattern, multiLine, ignoreCase) {
  return new $.JSSyntaxRegExp(ignoreCase, multiLine, pattern);
};

$.printString = function(string) {
  if (typeof console == "object") {
    console.log(string);
  } else {
    write(string);
    write("\n");
  }
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') {
    return 'DOMWindow';
  } else {
  }
  if (name$ === 'CanvasPixelArray') {
    return 'Uint8ClampedArray';
  } else {
  }
  return name$;
};

$.ZeDate$3 = function(day, month, year) {
  return new $.ZeDate(year, month, day);
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var a0 = (a);
    var b0 = (b);
    if (b0 < 0) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    } else {
    }
    var t0 = a0 > 0;
    var t1 = b0 > 31;
    if (t0) {
      if (t1) {
        return 0;
      } else {
      }
      return a0 >>> b0;
    } else {
    }
    if (t1) {
      var b1 = 31;
    } else {
      b1 = b0;
    }
    return (a0 >> b1) >>> 0;
  } else {
  }
  return a.operator$shr$1(b);
};

$.stringReplaceAllUnchecked = function(receiver, from, to) {
  if (typeof receiver !== 'string') return $.stringReplaceAllUnchecked$bailout(receiver, from, to,  0);
  if (typeof from === 'string') {
    if (from === '') {
      if (receiver === '') {
        return to;
      } else {
        var result = $.StringBufferImpl$1('');
        var length$ = receiver.length;
        result.add$1(to);
        for (var i = 0; i < length$; i = i + 1) {
          var t0 = receiver.length;
          if (i < 0 || i >= t0) throw $.ioore(i);
          result.add$1(receiver[i]);
          result.add$1(to);
        }
        return result.toString$0();
      }
    } else {
      return $.stringReplaceJS(receiver, $.regExpMakeNative($.JSSyntaxRegExp$3((from.replace($.regExpMakeNative($.CTC6, true), "\\$&")), false, false), true), to);
    }
  } else {
    if (typeof from === 'object' && !!from.is$JSSyntaxRegExp) {
      return $.stringReplaceJS(receiver, $.regExpMakeNative(from, true), to);
    } else {
      $.checkNull(from);
      throw $.captureStackTrace('StringImplementation.replaceAll(Pattern) UNIMPLEMENTED');
    }
  }
};

$.eqNull = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0));
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$._dualPivotQuicksort = function(a, left, right, compare) {
  if (typeof a !== 'object'||a.constructor !== Array||!!a.immutable$list) return $._dualPivotQuicksort$bailout(a, left, right, compare,  0);
  $.assert($.gt($.sub(right, left), 32));
  var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
  var index1 = $.add(left, sixth);
  var index5 = $.sub(right, sixth);
  var index3 = $.tdiv($.add(left, right), 2);
  var index2 = $.sub(index3, sixth);
  var index4 = $.add(index3, sixth);
  if (index1 !== (index1 | 0)) throw $.iae(index1);
  var t0 = a.length;
  if (index1 < 0 || index1 >= t0) throw $.ioore(index1);
  var t1 = a[index1];
  if (index2 !== (index2 | 0)) throw $.iae(index2);
  var t2 = a.length;
  if (index2 < 0 || index2 >= t2) throw $.ioore(index2);
  var t3 = a[index2];
  if (index3 !== (index3 | 0)) throw $.iae(index3);
  var t4 = a.length;
  if (index3 < 0 || index3 >= t4) throw $.ioore(index3);
  var t5 = a[index3];
  if (index4 !== (index4 | 0)) throw $.iae(index4);
  var t6 = a.length;
  if (index4 < 0 || index4 >= t6) throw $.ioore(index4);
  var t7 = a[index4];
  if (index5 !== (index5 | 0)) throw $.iae(index5);
  var t8 = a.length;
  if (index5 < 0 || index5 >= t8) throw $.ioore(index5);
  var t9 = a[index5];
  if ($.gtB(compare.$call$2(t1, t3), 0)) {
    var el2 = t1;
    var el1 = t3;
  } else {
    el2 = t3;
    el1 = t1;
  }
  if ($.gtB(compare.$call$2(t7, t9), 0)) {
    var el4 = t9;
    var el5 = t7;
  } else {
    el4 = t7;
    el5 = t9;
  }
  if ($.gtB(compare.$call$2(el1, t5), 0)) {
    var el10 = t5;
    var el3 = el1;
  } else {
    el10 = el1;
    el3 = t5;
  }
  if ($.gtB(compare.$call$2(el2, el3), 0)) {
    var el20 = el3;
    var el30 = el2;
  } else {
    el20 = el2;
    el30 = el3;
  }
  if ($.gtB(compare.$call$2(el10, el4), 0)) {
    var el40 = el10;
    var el11 = el4;
  } else {
    el40 = el4;
    el11 = el10;
  }
  if ($.gtB(compare.$call$2(el30, el40), 0)) {
    var el41 = el30;
    var el31 = el40;
  } else {
    el41 = el40;
    el31 = el30;
  }
  if ($.gtB(compare.$call$2(el20, el5), 0)) {
    var el21 = el5;
    var el50 = el20;
  } else {
    el21 = el20;
    el50 = el5;
  }
  if ($.gtB(compare.$call$2(el21, el31), 0)) {
    var el22 = el31;
    var el32 = el21;
  } else {
    el22 = el21;
    el32 = el31;
  }
  if ($.gtB(compare.$call$2(el41, el50), 0)) {
    var el42 = el50;
    var el51 = el41;
  } else {
    el42 = el41;
    el51 = el50;
  }
  var t10 = a.length;
  if (index1 < 0 || index1 >= t10) throw $.ioore(index1);
  a[index1] = el11;
  var t11 = a.length;
  if (index3 < 0 || index3 >= t11) throw $.ioore(index3);
  a[index3] = el32;
  var t12 = a.length;
  if (index5 < 0 || index5 >= t12) throw $.ioore(index5);
  a[index5] = el51;
  if (left !== (left | 0)) throw $.iae(left);
  var t13 = a.length;
  if (left < 0 || left >= t13) throw $.ioore(left);
  var t14 = a[left];
  var t15 = a.length;
  if (index2 < 0 || index2 >= t15) throw $.ioore(index2);
  a[index2] = t14;
  if (right !== (right | 0)) throw $.iae(right);
  var t16 = a.length;
  if (right < 0 || right >= t16) throw $.ioore(right);
  var t17 = a[right];
  var t18 = a.length;
  if (index4 < 0 || index4 >= t18) throw $.ioore(index4);
  a[index4] = t17;
  var less = $.add(left, 1);
  var great = $.sub(right, 1);
  var pivots_are_equal = $.eqB(compare.$call$2(el22, el42), 0);
  if (pivots_are_equal) {
    for (var k = less, great0 = great, less0 = less; $.leB(k, great0); k0 = $.add(k, 1), k = k0, great0 = great1, less0 = less1) {
      if (k !== (k | 0)) throw $.iae(k);
      var t19 = a.length;
      if (k < 0 || k >= t19) throw $.ioore(k);
      var t20 = a[k];
      var comp = compare.$call$2(t20, el22);
      if ($.eqB(comp, 0)) {
        var great1 = great0;
        var less1 = less0;
        continue;
      } else {
      }
      if ($.ltB(comp, 0)) {
        if (!$.eqB(k, less0)) {
          if (less0 !== (less0 | 0)) throw $.iae(less0);
          var t21 = a.length;
          if (less0 < 0 || less0 >= t21) throw $.ioore(less0);
          var t22 = a[less0];
          var t23 = a.length;
          if (k < 0 || k >= t23) throw $.ioore(k);
          a[k] = t22;
          var t24 = a.length;
          if (less0 < 0 || less0 >= t24) throw $.ioore(less0);
          a[less0] = t20;
        } else {
        }
        great1 = great0;
        less1 = $.add(less0, 1);
      } else {
        for (var comp0 = comp, great2 = great0; great1 = great2, less1 = less0, true; great2 = great3) {
          if (great2 !== (great2 | 0)) throw $.iae(great2);
          var t25 = a.length;
          if (great2 < 0 || great2 >= t25) throw $.ioore(great2);
          var comp1 = compare.$call$2(a[great2], el22);
          if ($.gtB(comp1, 0)) {
            var great3 = $.sub(great2, 1);
            comp0 = comp1;
            continue;
          } else {
            if ($.ltB(comp1, 0)) {
              if (less0 !== (less0 | 0)) throw $.iae(less0);
              var t26 = a.length;
              if (less0 < 0 || less0 >= t26) throw $.ioore(less0);
              var t27 = a[less0];
              var t28 = a.length;
              if (k < 0 || k >= t28) throw $.ioore(k);
              a[k] = t27;
              var less2 = $.add(less0, 1);
              var t29 = a.length;
              if (great2 < 0 || great2 >= t29) throw $.ioore(great2);
              var t30 = a[great2];
              var t31 = a.length;
              if (less0 < 0 || less0 >= t31) throw $.ioore(less0);
              a[less0] = t30;
              var great4 = $.sub(great2, 1);
              var t32 = a.length;
              if (great2 < 0 || great2 >= t32) throw $.ioore(great2);
              a[great2] = t20;
              great1 = great4;
              less1 = less2;
              break;
            } else {
              var t33 = a.length;
              if (great2 < 0 || great2 >= t33) throw $.ioore(great2);
              var t34 = a[great2];
              var t35 = a.length;
              if (k < 0 || k >= t35) throw $.ioore(k);
              a[k] = t34;
              var great5 = $.sub(great2, 1);
              var t36 = a.length;
              if (great2 < 0 || great2 >= t36) throw $.ioore(great2);
              a[great2] = t20;
              great1 = great5;
              less1 = less0;
              break;
            }
          }
          great3 = great2;
        }
      }
    }
    var great6 = great0;
    var less3 = less0;
  } else {
    for (var great7 = great, less4 = less, k1 = less; $.leB(k1, great7); k2 = $.add(k1, 1), great7 = great8, less4 = less5, k1 = k2) {
      if (k1 !== (k1 | 0)) throw $.iae(k1);
      var t37 = a.length;
      if (k1 < 0 || k1 >= t37) throw $.ioore(k1);
      var t38 = a[k1];
      if ($.ltB(compare.$call$2(t38, el22), 0)) {
        if (!$.eqB(k1, less4)) {
          if (less4 !== (less4 | 0)) throw $.iae(less4);
          var t39 = a.length;
          if (less4 < 0 || less4 >= t39) throw $.ioore(less4);
          var t40 = a[less4];
          var t41 = a.length;
          if (k1 < 0 || k1 >= t41) throw $.ioore(k1);
          a[k1] = t40;
          var t42 = a.length;
          if (less4 < 0 || less4 >= t42) throw $.ioore(less4);
          a[less4] = t38;
        } else {
        }
        var great8 = great7;
        var less5 = $.add(less4, 1);
      } else {
        if ($.gtB(compare.$call$2(t38, el42), 0)) {
          for (var great9 = great7; great8 = great9, less5 = less4, true; great9 = great10) {
            if (great9 !== (great9 | 0)) throw $.iae(great9);
            var t43 = a.length;
            if (great9 < 0 || great9 >= t43) throw $.ioore(great9);
            if ($.gtB(compare.$call$2(a[great9], el42), 0)) {
              var great11 = $.sub(great9, 1);
              if ($.ltB(great11, k1)) {
                great8 = great11;
                less5 = less4;
                break;
              } else {
              }
              var great10 = great11;
              continue;
            } else {
              var t44 = a.length;
              if (great9 < 0 || great9 >= t44) throw $.ioore(great9);
              if ($.ltB(compare.$call$2(a[great9], el22), 0)) {
                if (less4 !== (less4 | 0)) throw $.iae(less4);
                var t45 = a.length;
                if (less4 < 0 || less4 >= t45) throw $.ioore(less4);
                var t46 = a[less4];
                var t47 = a.length;
                if (k1 < 0 || k1 >= t47) throw $.ioore(k1);
                a[k1] = t46;
                var less6 = $.add(less4, 1);
                var t48 = a.length;
                if (great9 < 0 || great9 >= t48) throw $.ioore(great9);
                var t49 = a[great9];
                var t50 = a.length;
                if (less4 < 0 || less4 >= t50) throw $.ioore(less4);
                a[less4] = t49;
                var great12 = $.sub(great9, 1);
                var t51 = a.length;
                if (great9 < 0 || great9 >= t51) throw $.ioore(great9);
                a[great9] = t38;
                great8 = great12;
                less5 = less6;
              } else {
                var t52 = a.length;
                if (great9 < 0 || great9 >= t52) throw $.ioore(great9);
                var t53 = a[great9];
                var t54 = a.length;
                if (k1 < 0 || k1 >= t54) throw $.ioore(k1);
                a[k1] = t53;
                var great13 = $.sub(great9, 1);
                var t55 = a.length;
                if (great9 < 0 || great9 >= t55) throw $.ioore(great9);
                a[great9] = t38;
                great8 = great13;
                less5 = less4;
              }
              break;
            }
            great10 = great9;
          }
        } else {
          great8 = great7;
          less5 = less4;
        }
      }
    }
    great6 = great7;
    less3 = less4;
  }
  var t56 = $.sub(less3, 1);
  if (t56 !== (t56 | 0)) throw $.iae(t56);
  var t57 = a.length;
  if (t56 < 0 || t56 >= t57) throw $.ioore(t56);
  var t58 = a[t56];
  var t59 = a.length;
  if (left < 0 || left >= t59) throw $.ioore(left);
  a[left] = t58;
  var t60 = $.sub(less3, 1);
  if (t60 !== (t60 | 0)) throw $.iae(t60);
  var t61 = a.length;
  if (t60 < 0 || t60 >= t61) throw $.ioore(t60);
  a[t60] = el22;
  var t62 = $.add(great6, 1);
  if (t62 !== (t62 | 0)) throw $.iae(t62);
  var t63 = a.length;
  if (t62 < 0 || t62 >= t63) throw $.ioore(t62);
  var t64 = a[t62];
  var t65 = a.length;
  if (right < 0 || right >= t65) throw $.ioore(right);
  a[right] = t64;
  var t66 = $.add(great6, 1);
  if (t66 !== (t66 | 0)) throw $.iae(t66);
  var t67 = a.length;
  if (t66 < 0 || t66 >= t67) throw $.ioore(t66);
  a[t66] = el42;
  $._doSort(a, left, $.sub(less3, 2), compare);
  $._doSort(a, $.add(great6, 2), right, compare);
  if (pivots_are_equal) {
    return;
  } else {
  }
  var t68 = $.ltB(less3, index1);
  if (t68) {
    var t69 = $.gtB(great6, index5);
  } else {
    t69 = t68;
  }
  if (t69) {
    var less7 = less3;
    while (true) {
      if (less7 !== (less7 | 0)) throw $.iae(less7);
      var t70 = a.length;
      if (less7 < 0 || less7 >= t70) throw $.ioore(less7);
      if (!$.eqB(compare.$call$2(a[less7], el22), 0)) break;
      var less8 = $.add(less7, 1);
      less7 = less8;
    }
    var great14 = great6;
    while (true) {
      if (great14 !== (great14 | 0)) throw $.iae(great14);
      var t71 = a.length;
      if (great14 < 0 || great14 >= t71) throw $.ioore(great14);
      if (!$.eqB(compare.$call$2(a[great14], el42), 0)) break;
      var great15 = $.sub(great14, 1);
      great14 = great15;
    }
    for (var great16 = great14, less9 = less7, k3 = less7; $.leB(k3, great16); k4 = $.add(k3, 1), great16 = great17, less9 = less10, k3 = k4) {
      if (k3 !== (k3 | 0)) throw $.iae(k3);
      var t72 = a.length;
      if (k3 < 0 || k3 >= t72) throw $.ioore(k3);
      var t73 = a[k3];
      if ($.eqB(compare.$call$2(t73, el22), 0)) {
        if (!$.eqB(k3, less9)) {
          if (less9 !== (less9 | 0)) throw $.iae(less9);
          var t74 = a.length;
          if (less9 < 0 || less9 >= t74) throw $.ioore(less9);
          var t75 = a[less9];
          var t76 = a.length;
          if (k3 < 0 || k3 >= t76) throw $.ioore(k3);
          a[k3] = t75;
          var t77 = a.length;
          if (less9 < 0 || less9 >= t77) throw $.ioore(less9);
          a[less9] = t73;
        } else {
        }
        var great17 = great16;
        var less10 = $.add(less9, 1);
      } else {
        if ($.eqB(compare.$call$2(t73, el42), 0)) {
          for (var great18 = great16; great17 = great18, less10 = less9, true; great18 = great19) {
            if (great18 !== (great18 | 0)) throw $.iae(great18);
            var t78 = a.length;
            if (great18 < 0 || great18 >= t78) throw $.ioore(great18);
            if ($.eqB(compare.$call$2(a[great18], el42), 0)) {
              var great20 = $.sub(great18, 1);
              if ($.ltB(great20, k3)) {
                great17 = great20;
                less10 = less9;
                break;
              } else {
              }
              var great19 = great20;
              continue;
            } else {
              var t79 = a.length;
              if (great18 < 0 || great18 >= t79) throw $.ioore(great18);
              if ($.ltB(compare.$call$2(a[great18], el22), 0)) {
                if (less9 !== (less9 | 0)) throw $.iae(less9);
                var t80 = a.length;
                if (less9 < 0 || less9 >= t80) throw $.ioore(less9);
                var t81 = a[less9];
                var t82 = a.length;
                if (k3 < 0 || k3 >= t82) throw $.ioore(k3);
                a[k3] = t81;
                var less11 = $.add(less9, 1);
                var t83 = a.length;
                if (great18 < 0 || great18 >= t83) throw $.ioore(great18);
                var t84 = a[great18];
                var t85 = a.length;
                if (less9 < 0 || less9 >= t85) throw $.ioore(less9);
                a[less9] = t84;
                var great21 = $.sub(great18, 1);
                var t86 = a.length;
                if (great18 < 0 || great18 >= t86) throw $.ioore(great18);
                a[great18] = t73;
                great17 = great21;
                less10 = less11;
              } else {
                var t87 = a.length;
                if (great18 < 0 || great18 >= t87) throw $.ioore(great18);
                var t88 = a[great18];
                var t89 = a.length;
                if (k3 < 0 || k3 >= t89) throw $.ioore(k3);
                a[k3] = t88;
                var great22 = $.sub(great18, 1);
                var t90 = a.length;
                if (great18 < 0 || great18 >= t90) throw $.ioore(great18);
                a[great18] = t73;
                great17 = great22;
                less10 = less9;
              }
              break;
            }
            great19 = great18;
          }
        } else {
          great17 = great16;
          less10 = less9;
        }
      }
    }
    $._doSort(a, less9, great16, compare);
  } else {
    $._doSort(a, less3, great6, compare);
  }
  var k4, k2, k0;
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  } else {
  }
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$2(startIndex, endIndex);
  } else {
  }
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex === (void 0)) {
    var endIndex0 = length$;
  } else {
    endIndex0 = endIndex;
  }
  $.checkNum(endIndex0);
  if ($.ltB(startIndex, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  } else {
  }
  if ($.gtB(startIndex, endIndex0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  } else {
  }
  if ($.gtB(endIndex0, length$)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex0));
  } else {
  }
  return $.substringUnchecked(receiver, startIndex, endIndex0);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    var t0 = key === index;
    if (t0) {
      var t1 = key < (a.length);
    } else {
      t1 = t0;
    }
    if (t1) {
      a[key] = value;
      return;
    } else {
    }
  } else {
  }
  $.indexSet$slow(a, index, value);
};

$._DOMApplicationCacheEventsImpl$1 = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.ExceptionImplementation$1 = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$3 = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.TimeEntry$fresh$0 = function() {
  return new $.TimeEntry($.HashMapImplementation$0());
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  var t0 = ({});
  t0.arg2_3 = arg2;
  t0.arg1_2 = arg1;
  t0.closure_1 = closure;
  if ($.eqB(numberOfArguments, 0)) {
    return new $.Closure11(t0).$call$0();
  } else {
    if ($.eqB(numberOfArguments, 1)) {
      return new $.Closure12(t0).$call$0();
    } else {
      if ($.eqB(numberOfArguments, 2)) {
        return new $.Closure13(t0).$call$0();
      } else {
        throw $.captureStackTrace($.ExceptionImplementation$1('Unsupported number of arguments for wrapped closure'));
      }
    }
  }
};

$.gt = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a > b);
  } else {
    t2 = $.gt$slow(a, b);
  }
  return t2;
};

$.String$fromCharCodes = function(charCodes) {
  return $.createFromCharCodes(charCodes);
};

$.assert = function(condition) {
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.filter$1(predicate);
  } else {
    return $.filter2(receiver, [], predicate);
  }
};

$.filter2 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      $.add$1(destination, t1);
    } else {
    }
  }
  return destination;
};

$.filter3 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      $.add$1(destination, t1);
    } else {
    }
  }
  return destination;
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object'||inputTable.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable,  0);
  var result = [];
  for (var i = 0; i < inputTable.length; i = i + 1) {
    var t0 = inputTable.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t1 = inputTable.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$0();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object'||tagNames.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 2, result, inputTable, tag, i, tags, set, tagNames);
    for (var j = 0; j < tagNames.length; j = j + 1) {
      var t2 = tagNames.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$1(other);
  } else {
  }
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$1 = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a * b);
  } else {
    t2 = $.mul$slow(a, b);
  }
  return t2;
};

$.parseInt = function(str) {
  return $.parseInt2(str);
};

$._NotificationEventsImpl$1 = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.parseInt2 = function(str) {
  $.checkString(str);
  if (!(/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  } else {
  }
  var trimmed = $.trim(str);
  var t0 = $.gtB($.get$length(trimmed), 2);
  if (t0) {
    var t1 = $.eqB($.index(trimmed, 1), 'x');
    if (!t1) {
      var t2 = $.eqB($.index(trimmed, 1), 'X');
    } else {
      t2 = t1;
    }
  } else {
    t2 = t0;
  }
  if (!t2) {
    var t3 = $.gtB($.get$length(trimmed), 3);
    if (t3) {
      var t4 = $.eqB($.index(trimmed, 2), 'x');
      if (!t4) {
        var t5 = $.eqB($.index(trimmed, 2), 'X');
      } else {
        t5 = t4;
      }
    } else {
      t5 = t3;
    }
  } else {
    t5 = t2;
  }
  if (t5) {
    var base = 16;
  } else {
    base = 10;
  }
  var ret = (parseInt(trimmed, base));
  if ($.isNaN(ret) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  } else {
  }
  return ret;
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix === (void 0)) {
    if ($.isFirefox() === true) {
      $._cachedBrowserPrefix = '-moz-';
    } else {
      $._cachedBrowserPrefix = '-webkit-';
    }
  } else {
  }
  return $._cachedBrowserPrefix;
};

$.neg = function(a) {
  if (typeof a === "number") {
    return -a;
  } else {
  }
  return a.operator$negate$0();
};

$._emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && (c.constructor === Array || c.is$List2());
  if (isList) {
    var t0 = '[';
  } else {
    t0 = '{';
  }
  $.add$1(result, t0);
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; first = first0) {
    var t2 = t1.next$0();
    if (!first) {
      $.add$1(result, ', ');
    } else {
    }
    $._emitObject(t2, result, visiting);
    var first0 = false;
  }
  if (isList) {
    var t3 = ']';
  } else {
    t3 = '}';
  }
  $.add$1(result, t3);
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  } else {
  }
};

$.ZeTime$fromString$1 = function(timeString) {
  var t0 = new $.ZeTime((void 0), (void 0));
  t0.ZeTime$fromString$1(timeString);
  return t0;
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  } else {
  }
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$.ZeDate$fromDate = function(date) {
  return $.ZeDate$3(date.get$day(), date.get$month(), date.get$year());
};

$._PeerConnection00EventsImpl$1 = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._WorkerContextEventsImpl$1 = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$.or = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a | b) >>> 0;
  } else {
  }
  return a.operator$or$1(b);
};

$._DocumentEventsImpl$1 = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.Month$1 = function(monthJSON) {
  return new $.Month(monthJSON);
};

$.getDay = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCDate());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getDate());
  }
  return t0;
};

$.Activity$1 = function(_activityJSON) {
  return new $.Activity(_activityJSON);
};

$._EventsImpl$1 = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.TimeEntryProvider$2 = function(errorDisplay, webServiceRequester) {
  return new $.TimeEntryProvider(webServiceRequester, errorDisplay);
};

$.HashSetImplementation$0 = function() {
  var t0 = new $.HashSetImplementation((void 0));
  t0.HashSetImplementation$0();
  return t0;
};

$.DateImplementation$fromEpoch$2 = function(value, isUtc) {
  return new $.DateImplementation($.checkNull(isUtc), value);
};

$._IDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') {
    return receiver.split(pattern);
  } else {
    if (typeof pattern === 'object' && !!pattern.is$JSSyntaxRegExp) {
      return receiver.split($.regExpGetNative(pattern));
    } else {
      throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
    }
  }
};

$.User$2 = function(name$, password) {
  return new $.User(password, name$);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  } else {
  }
};

$.ZeDate$currentDay = function() {
  return $.ZeDate$fromDate($.DateImplementation$now$0());
};

$._SpeechRecognitionEventsImpl$1 = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$1 = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$._JsonParser$_internal$1 = function(json) {
  var t0 = new $._JsonParser(0, $.get$length(json), json);
  t0._JsonParser$_internal$1(json);
  return t0;
};

$.LoginModel$0 = function() {
  return new $.LoginModel((void 0));
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  } else {
  }
  return receiver.add$1(value);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    return $.ListIterator$1(receiver);
  } else {
  }
  return receiver.iterator$0();
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) {
    return;
  } else {
  }
  return result;
};

$.geB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a >= b);
  } else {
    t2 = $.ge$slow(a, b) === true;
  }
  return t2;
};

$.getMinutes = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMinutes());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMinutes());
  }
  return t0;
};

$.DoubleLinkedQueueEntry$1 = function(e) {
  var t0 = new $.DoubleLinkedQueueEntry((void 0), (void 0), (void 0));
  t0.DoubleLinkedQueueEntry$1(e);
  return t0;
};

$.getMonth = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMonth()) + 1;
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMonth()) + 1;
  }
  return t0;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  } else {
    if (typeof other === 'object' && !!other.is$JSSyntaxRegExp) {
      return other.hasMatch$1($.substring$1(receiver, startIndex));
    } else {
      return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
    }
  }
};

$.buildApp = function() {
  if ($.eqNullB($.app)) {
    var errorDisplay = $.ErrorDisplay$0();
    var elementCreator = $.ElementCreator$0();
    var expander = $.Expander$0();
    var webServiceRequester = $.WebServiceRequester$1($.Login$2($.LoginModel$0(), $.LoginView$0()));
    var activityProvider = $.ActivityProvider$2(errorDisplay, webServiceRequester);
    var timeEntryProvider = $.TimeEntryProvider$2(errorDisplay, webServiceRequester);
    $.app = $.App$4(activityProvider, timeEntryProvider, $.MonthDisplayFactory$3(elementCreator, expander, $.DayDisplayFactory$3(elementCreator, expander, $.TimeEntryEditorFactory$4(elementCreator, expander, activityProvider, timeEntryProvider))), expander);
  } else {
  }
  return $.app;
};

$.App$4 = function(activityProvider, timeEntryProvider, monthDisplayFactory, expander) {
  return new $.App(expander, monthDisplayFactory, timeEntryProvider, activityProvider);
};

$.ObjectNotClosureException$0 = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.ErrorDisplay$0 = function() {
  return new $.ErrorDisplay();
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.abs$0();
  } else {
  }
  return Math.abs(receiver);
};

$.add = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a + b);
  } else {
    t2 = $.add$slow(a, b);
  }
  return t2;
};

$.ElementCreator$0 = function() {
  return new $.ElementCreator();
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a <= b);
  } else {
    t2 = $.le$slow(a, b) === true;
  }
  return t2;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number') {
    if (receiver === 0) {
      var t0 = 1 / receiver < 0;
    } else {
      t0 = receiver < 0;
    }
    return t0;
  } else {
    return receiver.isNegative$0();
  }
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = (a % b);
    if (result === 0) {
      return 0;
    } else {
    }
    if (result > 0) {
      return result;
    } else {
    }
    var b0 = (b);
    if (b0 < 0) {
      return result - b0;
    } else {
      return result + b0;
    }
  } else {
  }
  return a.operator$mod$1(b);
};

$.regExpMakeNative = function(regExp, global) {
  var t0 = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(t0);
  var t1 = $.StringBufferImpl$1('');
  if (multiLine === true) {
    $.add$1(t1, 'm');
  } else {
  }
  if (ignoreCase === true) {
    $.add$1(t1, 'i');
  } else {
  }
  if (global === true) {
    $.add$1(t1, 'g');
  } else {
  }
  try {
    return new RegExp(t0, $.toString(t1));
  } catch (t2) {
    var t3 = $.unwrapException(t2);
    var t4 = t3;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(t0, (String(t4))));
  }
};

$.map2 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    $.add$1(destination, f.$call$1(t0.next$0()));
  }
  return destination;
};

$.TimeEntryEditorView$1 = function(elementCreator) {
  return new $.TimeEntryEditorView((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), elementCreator);
};

$.BadNumberFormatException$1 = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$.mapToString = function(m) {
  var result = $.StringBufferImpl$1('');
  $._emitMap(m, result, $.List((void 0)));
  return result.toString$0();
};

$.lazyAsJsDate = function(receiver) {
  if (receiver.date === (void 0)) {
    receiver.date = new Date(receiver.get$value());
  } else {
  }
  return receiver.date;
};

$._XMLHttpRequestEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._JavaScriptAudioNodeEventsImpl$1 = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$._emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && (o.constructor === Array || o.is$Collection())) {
    if ($._containsRef(visiting, o) === true) {
      if (typeof o === 'object' && (o.constructor === Array || o.is$List2())) {
        var t0 = '[...]';
      } else {
        t0 = '{...}';
      }
      $.add$1(result, t0);
    } else {
      $._emitCollection(o, result, visiting);
    }
  } else {
    if (typeof o === 'object' && o.is$Map()) {
      if ($._containsRef(visiting, o) === true) {
        $.add$1(result, '{...}');
      } else {
        $._emitMap(o, result, visiting);
      }
    } else {
      if ($.eqNullB(o)) {
        var t1 = 'null';
      } else {
        t1 = o;
      }
      $.add$1(result, t1);
    }
  }
};

$.DayDisplayView$2 = function(elementCreator, expander) {
  return new $.DayDisplayView((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), expander, elementCreator);
};

$._emitMap = function(m, result, visiting) {
  var t0 = ({});
  t0.visiting_2 = visiting;
  t0.result_1 = result;
  $.add$1(t0.visiting_2, m);
  $.add$1(t0.result_1, '{');
  t0.first_3 = true;
  $.forEach(m, new $.Closure10(t0));
  $.add$1(t0.result_1, '}');
  $.removeLast(t0.visiting_2);
};

$._IDBDatabaseEventsImpl$1 = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.isFirefox = function() {
  return $.contains$2($.userAgent(), 'Firefox', 0);
};

$.ge = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a >= b);
  } else {
    t2 = $.ge$slow(a, b);
  }
  return t2;
};

$._TextTrackCueEventsImpl$1 = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.patchUpY2K = function(value, years, isUtc) {
  var t0 = isUtc === true;
  var date = (new Date(value));
  if (t0) {
    date.setUTCFullYear(years);
  } else {
    date.setFullYear(years);
  }
  return date.valueOf();
};

$.isEmpty = function(receiver) {
  var t0 = typeof receiver === 'string';
  if (!t0) {
    var t1 = $.isJsArray(receiver) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return receiver.length === 0;
  } else {
  }
  return receiver.isEmpty$0();
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(a, b)) {
      return -1;
    } else {
      if ($.gtB(a, b)) {
        return 1;
      } else {
        if ($.eqB(a, b)) {
          if ($.eqB(a, 0)) {
            var aIsNegative = $.isNegative(a);
            if ($.eqB(aIsNegative, $.isNegative(b))) {
              return 0;
            } else {
            }
            if (aIsNegative === true) {
              return -1;
            } else {
            }
            return 1;
          } else {
          }
          return 0;
        } else {
          if ($.isNaN(a) === true) {
            if ($.isNaN(b) === true) {
              return 0;
            } else {
            }
            return 1;
          } else {
            return -1;
          }
        }
      }
    }
  } else {
    if (typeof a === 'string') {
      if (!(typeof b === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(b));
      } else {
      }
      if (a == b) {
        var t0 = 0;
      } else {
        if (a < b) {
          t0 = -1;
        } else {
          t0 = 1;
        }
      }
      return t0;
    } else {
      return a.compareTo$1(b);
    }
  }
};

$.stringReplaceJS = function(receiver, replacer, to) {
  return receiver.replace(replacer, to.replace('$', '$$$$'));
};

$.UnsupportedOperationException$1 = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(start));
    } else {
    }
    return $.indexOf(receiver, element, start, (receiver.length));
  } else {
    if (typeof receiver === 'string') {
      $.checkNull(element);
      if (!((typeof start === 'number') && (start === (start | 0)))) {
        throw $.captureStackTrace($.IllegalArgumentException$1(start));
      } else {
      }
      if (!(typeof element === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(element));
      } else {
      }
      if (start < 0) {
        return -1;
      } else {
      }
      return receiver.indexOf(element, start);
    } else {
    }
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.Project$1 = function(_projectJSON) {
  return new $.Project((void 0), _projectJSON);
};

$._FileReaderEventsImpl$1 = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.encodeURI = function(text) {
  if (typeof text !== 'string' && (typeof text !== 'object'||text.constructor !== Array)) return $.encodeURI$bailout(text,  0);
  var encodedText = $.StringBufferImpl$1('');
  for (var i = 0; i < text.length; i = i0 + 1) {
    var t0 = text.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if (!$.eqB('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~*\'()#;,/?:@&=+$'.indexOf(text[i]), -1)) {
      var t1 = text.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      encodedText.add$1(text[i]);
      var i0 = i;
      continue;
    } else {
    }
    var charCode = $.charCodeAt(text, i);
    var byteList = [];
    if ($.ltB(charCode, 128)) {
      $.add$1(byteList, charCode);
      i0 = i;
    } else {
      if ($.ltB(charCode, 2048)) {
        $.add$1(byteList, $.or($.shr(charCode, 6), 192));
        $.add$1(byteList, $.or($.and(charCode, 63), 128));
        i0 = i;
      } else {
        var t2 = $.leB(55296, charCode);
        if (t2) {
          var t3 = $.ltB(charCode, 56320);
        } else {
          t3 = t2;
        }
        if (t3) {
          var t4 = i + 1;
          if (text.length === t4) {
            var nextCharCode = 0;
          } else {
            nextCharCode = $.charCodeAt(text, t4);
          }
          var t5 = $.leB(56320, nextCharCode);
          if (t5) {
            var t6 = $.ltB(nextCharCode, 57344);
          } else {
            t6 = t5;
          }
          if (t6) {
            var charCode0 = $.add(charCode, 64);
            $.add$1(byteList, $.or($.and($.shr(charCode0, 8), 7), 240));
            $.add$1(byteList, $.or($.and($.shr(charCode0, 2), 63), 128));
            $.add$1(byteList, $.or($.or($.shl($.and(charCode0, 3), 4), $.and($.shr(nextCharCode, 6), 15)), 128));
            $.add$1(byteList, $.or($.and(nextCharCode, 63), 128));
          } else {
            throw $.captureStackTrace($.IllegalArgumentException$1('URI malformed: Orphaned low surrogate.'));
          }
          i0 = t4;
        } else {
          var t7 = $.leB(56320, charCode);
          if (t7) {
            var t8 = $.ltB(charCode, 57344);
          } else {
            t8 = t7;
          }
          if (t8) {
            throw $.captureStackTrace($.IllegalArgumentException$1('URI malformed: Orphaned high surrogate.'));
          } else {
            if ($.ltB(charCode, 65536)) {
              $.add$1(byteList, $.or($.shr(charCode, 12), 224));
              $.add$1(byteList, $.or($.and($.shr(charCode, 6), 63), 128));
              $.add$1(byteList, $.or($.and(charCode, 63), 128));
            } else {
            }
          }
          i0 = i;
        }
      }
    }
    for (var j = 0; j < byteList.length; j = j + 1) {
      var t9 = encodedText.add$1('%');
      var t10 = byteList.length;
      if (j < 0 || j >= t10) throw $.ioore(j);
      var t11 = $.shr(byteList[j], 4);
      if (t11 !== (t11 | 0)) throw $.iae(t11);
      if (t11 < 0 || t11 >= 16) throw $.ioore(t11);
      var t12 = $.add$1(t9, '0123456789ABCDEF'[t11]);
      var t13 = byteList.length;
      if (j < 0 || j >= t13) throw $.ioore(j);
      var t14 = $.and(byteList[j], 15);
      if (t14 !== (t14 | 0)) throw $.iae(t14);
      if (t14 < 0 || t14 >= 16) throw $.ioore(t14);
      $.add$1(t12, '0123456789ABCDEF'[t14]);
    }
  }
  return encodedText.toString$0();
};

$.replaceAll = function(receiver, from, to) {
  if (!(typeof receiver === 'string')) {
    return receiver.replaceAll$2(from, to);
  } else {
  }
  $.checkString(to);
  return $.stringReplaceAllUnchecked(receiver, from, to);
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$.getYear = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCFullYear());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getFullYear());
  }
  return t0;
};

$.eqNullB = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0)) === true;
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$.Element$tag = function(tag) {
  return document.createElement(tag);
};

$._FrameSetElementEventsImpl$1 = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  } else {
    if (typeof a === 'string') {
      var b0 = $.toString(b);
      if (typeof b0 === 'string') {
        return a + b0;
      } else {
      }
      $.checkNull(b0);
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    } else {
    }
  }
  return a.operator$add$1(b);
};

$.List$from = function(other) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.valueFromDecomposedDate = function(years, month, day, hours, minutes, seconds, milliseconds, isUtc) {
  $.checkInt(years);
  $.checkInt(month);
  var t0 = $.ltB(month, 1);
  if (!t0) {
    var t1 = $.ltB(12, month);
  } else {
    t1 = t0;
  }
  if (t1) {
    throw $.captureStackTrace($.IllegalArgumentException$1(month));
  } else {
  }
  $.checkInt(day);
  var t2 = $.ltB(day, 1);
  if (!t2) {
    var t3 = $.ltB(31, day);
  } else {
    t3 = t2;
  }
  if (t3) {
    throw $.captureStackTrace($.IllegalArgumentException$1(day));
  } else {
  }
  $.checkInt(hours);
  var t4 = $.ltB(hours, 0);
  if (!t4) {
    var t5 = $.ltB(24, hours);
  } else {
    t5 = t4;
  }
  if (t5) {
    throw $.captureStackTrace($.IllegalArgumentException$1(hours));
  } else {
  }
  $.checkInt(minutes);
  var t6 = $.ltB(minutes, 0);
  if (!t6) {
    var t7 = $.ltB(59, minutes);
  } else {
    t7 = t6;
  }
  if (t7) {
    throw $.captureStackTrace($.IllegalArgumentException$1(minutes));
  } else {
  }
  $.checkInt(seconds);
  var t8 = $.ltB(seconds, 0);
  if (!t8) {
    var t9 = $.ltB(59, seconds);
  } else {
    t9 = t8;
  }
  if (t9) {
    throw $.captureStackTrace($.IllegalArgumentException$1(seconds));
  } else {
  }
  $.checkInt(milliseconds);
  var t10 = $.ltB(milliseconds, 0);
  if (!t10) {
    var t11 = $.ltB(999, milliseconds);
  } else {
    t11 = t10;
  }
  if (t11) {
    throw $.captureStackTrace($.IllegalArgumentException$1(milliseconds));
  } else {
    var t12 = isUtc === true;
  }
  $.checkBool(isUtc);
  var jsMonth = $.sub(month, 1);
  if (t12) {
    var value = (Date.UTC(years, jsMonth, day, hours, minutes, seconds, milliseconds));
  } else {
    value = (new Date(years, jsMonth, day, hours, minutes, seconds, milliseconds).valueOf());
  }
  if ($.isNaN(value) === true) {
    throw $.captureStackTrace($.IllegalArgumentException$1(''));
  } else {
  }
  var t13 = $.leB(years, 0);
  if (!t13) {
    var t14 = $.ltB(years, 100);
  } else {
    t14 = t13;
  }
  if (t14) {
    return $.patchUpY2K(value, years, isUtc);
  } else {
  }
  return value;
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  } else {
  }
  var t0 = typeof length$ === 'number' && length$ === (length$ | 0);
  var t1 = !t0;
  if (t0) {
    var t2 = length$ < 0;
  } else {
    t2 = t1;
  }
  if (t2) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  $.buildApp().start$0();
};

$._AbstractWorkerEventsImpl$1 = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.dateNow = function() {
  return Date.now();
};

$._computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$1 = function(set_) {
  var t0 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t0.HashSetIterator$1(set_);
  return t0;
};

$.ActivityProvider$2 = function(errorDisplay, requester) {
  return new $.ActivityProvider((void 0), requester, errorDisplay);
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._MediaElementEventsImpl$1 = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._BodyElementEventsImpl$1 = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$1 = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._AllMatchesIterator$2 = function(re, _str) {
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.truncate$0();
  } else {
  }
  if (receiver < 0) {
    var t0 = $.ceil(receiver);
  } else {
    t0 = $.floor(receiver);
  }
  return t0;
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') {
    return isNaN(receiver);
  } else {
    return receiver.isNegative$0();
  }
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.addLast$1(value);
  } else {
  }
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(needle, haystack, 1, length$, result, patternLength);
  for (var startIndex = 0; true; startIndex = startIndex0) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) {
      break;
    } else {
    }
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) {
      break;
    } else {
      if ($.eqB(position, endIndex)) {
        var startIndex0 = $.add(startIndex, 1);
      } else {
        startIndex0 = endIndex;
      }
    }
  }
  return result;
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a <= b;
  } else {
  }
  return a.operator$le$1(b);
};

$._AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.dynamicSetMetadata = function(inputTable) {
  var t0 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t0);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.endsWith$1(other);
  } else {
  }
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) {
    return false;
  } else {
  }
  return $.eq(other, $.substring$1(receiver, $.sub(receiverLength, otherLength)));
};

$.getMilliseconds = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMilliseconds());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMilliseconds());
  }
  return t0;
};

$.MonthDisplayFactory$3 = function(elementCreator, expander, dayDisplayFactory) {
  return new $.MonthDisplayFactory(dayDisplayFactory, expander, elementCreator);
};

$.ListIterator$1 = function(list) {
  return new $.ListIterator(list, 0);
};

$.XMLHttpRequest = function() {
  return new XMLHttpRequest();;
};

$.MonthDisplay$3 = function(month, view, dayDisplayFactory) {
  return new $.MonthDisplay(dayDisplayFactory, month, view);
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return value;
};

$.DurationImplementation$5 = function(days, hours, minutes, seconds, milliseconds) {
  return new $.DurationImplementation($.add($.add($.add($.add($.mul(days, 86400000), $.mul(hours, 3600000)), $.mul(minutes, 60000)), $.mul(seconds, 1000)), milliseconds));
};

$._WorkerEventsImpl$1 = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a < b);
  } else {
    t2 = $.lt$slow(a, b) === true;
  }
  return t2;
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure === (void 0)) {
    return;
  } else {
  }
  var function$ = (closure.$identity);
  if (!!function$) {
    return function$;
  } else {
  }
  var function0 = (function() {
    return $.invokeClosure.$call$5(closure, $, arity, arguments[0], arguments[1]);
  });
  closure.$identity = function0;
  return function0;
};

$.WebServiceRequester$1 = function(login) {
  return new $.WebServiceRequester(login);
};

$.parse = function(json) {
  return $.parse2(json);
};

$._FixedSizeListIterator$1 = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.parse2 = function(json) {
  return $._JsonParser$_internal$1(json)._parseToplevel$0();
};

$.getWeekday = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCDay());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getDay());
  }
  return t0;
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) {
    return receiver.split$1(pattern);
  } else {
  }
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.encodeURIComponent = function(text) {
  return $.replaceAll($.replaceAll($.replaceAll($.replaceAll($.replaceAll($.replaceAll($.replaceAll($.replaceAll($.replaceAll($.replaceAll($.replaceAll($.encodeURI(text), '#', '%23'), ';', '%3B'), ',', '%2C'), '/', '%2F'), '?', '%3F'), ':', '%3A'), '@', '%40'), '&', '%26'), '=', '%3D'), '+', '%2B'), '$', '%24');
};

$.concatAll = function(strings) {
  $.checkNull(strings);
  for (var t0 = $.iterator(strings), result = ''; t0.hasNext$0() === true; result = result0) {
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    } else {
    }
    var result0 = result + t1;
  }
  return result;
};

$.userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$1 = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$._DoubleLinkedQueueIterator$1 = function(_sentinel) {
  var t0 = new $._DoubleLinkedQueueIterator((void 0), _sentinel);
  t0._DoubleLinkedQueueIterator$1(_sentinel);
  return t0;
};

$.jsPropertyAccess = function(jsObject, property) {
  return jsObject[property];
};

$.map3 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    $.add$1(destination, f.$call$1(t0.next$0()));
  }
  return destination;
};

$._TextTrackListEventsImpl$1 = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata2 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t0 = [];
    $._dynamicMetadata(t0);
  } else {
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$0 = function() {
  var t0 = new $.LinkedHashMapImplementation((void 0), (void 0));
  t0.LinkedHashMapImplementation$0();
  return t0;
};

$._DeprecatedPeerConnectionEventsImpl$1 = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$.DayDisplay$3 = function(day, view, timeEntryEditorFactory) {
  return new $.DayDisplay(view, timeEntryEditorFactory, day);
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  if (r === (void 0)) {
    var r0 = (regExp._re = $.regExpMakeNative(regExp, false));
  } else {
    r0 = r;
  }
  return r0;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$.checkNull = function(object) {
  if (object === (void 0)) {
    throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC));
  } else {
  }
  return object;
};

$._EventListenerListImpl$2 = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$.getSeconds = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCSeconds());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getSeconds());
  }
  return t0;
};

$._WindowEventsImpl$1 = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.DoubleLinkedQueue$0 = function() {
  var t0 = new $.DoubleLinkedQueue((void 0));
  t0.DoubleLinkedQueue$0();
  return t0;
};

$.insertionSort_ = function(a, left, right, compare) {
  if (typeof a !== 'object'||a.constructor !== Array||!!a.immutable$list) return $.insertionSort_$bailout(a, left, right, compare,  0);
  if (typeof left !== 'number') return $.insertionSort_$bailout(a, left, right, compare,  0);
  if (typeof right !== 'number') return $.insertionSort_$bailout(a, left, right, compare,  0);
  for (var i = left + 1; i <= right; i = i + 1) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = a[i];
    var j = i;
    while (true) {
      var t2 = j > left;
      if (t2) {
        var t3 = j - 1;
        if (t3 !== (t3 | 0)) throw $.iae(t3);
        var t4 = a.length;
        if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
        var t5 = $.gtB(compare.$call$2(a[t3], t1), 0);
      } else {
        t5 = t2;
      }
      if (!t5) break;
      var t6 = j - 1;
      if (t6 !== (t6 | 0)) throw $.iae(t6);
      var t7 = a.length;
      if (t6 < 0 || t6 >= t7) throw $.ioore(t6);
      var t8 = a[t6];
      if (j !== (j | 0)) throw $.iae(j);
      var t9 = a.length;
      if (j < 0 || j >= t9) throw $.ioore(j);
      a[j] = t8;
      var j0 = t6;
      j = j0;
    }
    if (j !== (j | 0)) throw $.iae(j);
    var t10 = a.length;
    if (j < 0 || j >= t10) throw $.ioore(j);
    a[j] = t1;
  }
};

$.LoginView$0 = function() {
  return new $.LoginView();
};

$.TypeError$1 = function(msg) {
  return new $.TypeError(msg);
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return true;
    } else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  } else {
  }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$0 = function() {
  var t0 = new $._DoubleLinkedQueueEntrySentinel((void 0), (void 0), (void 0));
  t0.DoubleLinkedQueueEntry$1((void 0));
  t0._DoubleLinkedQueueEntrySentinel$0();
  return t0;
};

$.getHours = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCHours());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getHours());
  }
  return t0;
};

$.stringToString = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) {
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return res;
};

$._ElementAttributeMap$1 = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  } else {
  }
  return a.operator$lt$1(b);
};

$.remainder = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a % b;
  } else {
    return a.remainder$1(b);
  }
};

$.Dialog$4 = function(text, content$, okButtonText, cancelButtonText) {
  return new $.Dialog((void 0), (void 0), (void 0), cancelButtonText, okButtonText, content$, text);
};

$.index$slow = function(a, index) {
  var t0 = typeof a === 'string';
  if (!t0) {
    var t1 = $.isJsArray(a) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      } else {
      }
      if (!($.truncate(index) === index)) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      } else {
      }
    } else {
    }
    var t2 = $.ltB(index, 0);
    if (!t2) {
      var t3 = $.geB(index, $.get$length(a));
    } else {
      t3 = t2;
    }
    if (t3) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    return a[index];
  } else {
  }
  return a.operator$index$1(index);
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$2(other, startIndex);
  } else {
  }
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.Expander$0 = function() {
  return new $.Expander();
};

$.map = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.map$1(f);
  } else {
    return $.map2(receiver, [], f);
  }
};

$.IndexOutOfRangeException$1 = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$._AttributeClassSet$1 = function(element) {
  return new $._AttributeClassSet(element);
};

$._TextTrackEventsImpl$1 = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    } else {
    }
    if (index < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    if (index >= receiver.length) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    return receiver.charCodeAt(index);
  } else {
    return receiver.charCodeAt$1(index);
  }
};

$._BatteryManagerEventsImpl$1 = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$.DayDisplayFactory$3 = function(elementCreator, expander, timeEntryEditorFactory) {
  return new $.DayDisplayFactory(timeEntryEditorFactory, expander, elementCreator);
};

$._WebSocketEventsImpl$1 = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.collectionToString = function(c) {
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.KeyValuePair$2 = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.Login$2 = function(model, view) {
  return new $.Login(model, view);
};

$._MediaStreamEventsImpl$1 = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.TimeEntryEditor$5 = function(_timeEntry, activityProvider, timeEntryProvider, model, view) {
  return new $.TimeEntryEditor((void 0), (void 0), view, model, timeEntryProvider, activityProvider, _timeEntry);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});;
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  var t0 = !(f === (void 0));
  if (t0) {
    var t1 = (!!f.methods);
  } else {
    t1 = t0;
  }
  if (t1) {
    return f.methods;
  } else {
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC14)[name$]);
  if (!(dartMethod === (void 0))) {
    methods['Object'] = dartMethod;
  } else {
  }
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.print = function(obj) {
  return $.printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return value;
};

$.TimeEntry$1 = function(timeEntryJSON) {
  return new $.TimeEntry(timeEntryJSON);
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.addAll$1(collection);
  } else {
  }
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true; ) {
    $.add$1(receiver, iterator.next$0());
  }
};

$.TimeEntryEditorFactory$4 = function(elementCreator, expander, activityProvider, timeEntryProvider) {
  return new $.TimeEntryEditorFactory(expander, elementCreator, timeEntryProvider, activityProvider);
};

$.DateImplementation$8 = function(years, month, day, hours, minutes, seconds, milliseconds, isUtc) {
  var t0 = new $.DateImplementation($.checkNull(isUtc), $.valueFromDecomposedDate(years, month, day, hours, minutes, seconds, milliseconds, isUtc));
  t0.DateImplementation$8(years, month, day, hours, minutes, seconds, milliseconds, isUtc);
  return t0;
};

$.stringFromCharCodes = function(charCodes) {
  for (var t0 = $.iterator(charCodes); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (!((typeof t1 === 'number') && (t1 === (t1 | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    } else {
    }
  }
  return String.fromCharCode.apply((void 0), charCodes);
};

$.checkInt = function(value) {
  if (!((typeof value === 'number') && (value === (value | 0)))) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return value;
};

$.objectToString = function(object) {
  var name$ = (object.constructor.name);
  if ($.charCodeAt(name$, 0) === 36) {
    var name0 = $.substring$1(name$, 1);
  } else {
    name0 = name$;
  }
  return 'Instance of \'' + $.stringToString(name0) + '\'';
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  } else {
  }
  if ($.ltB(startIndex, 0)) {
    var i = 0;
  } else {
    i = startIndex;
  }
  for (; $.ltB(i, endIndex); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    } else {
    }
  }
  return -1;
};

$.checkBool = function(value) {
  if (!(typeof value === 'boolean')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return value;
};

$.indexOf2 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  } else {
  }
  if ($.ltB(startIndex, 0)) {
    var i = 0;
  } else {
    i = startIndex;
  }
  for (; $.ltB(i, endIndex); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    } else {
    }
  }
  return -1;
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    } else {
    }
    return receiver.pop();
  } else {
  }
  return receiver.removeLast$0();
};

$._firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    } else {
    }
    if (newLength < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
    } else {
    }
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else {
    receiver.set$length(newLength);
  }
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  } else {
  }
  return a.operator$gt$1(b);
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  } else {
  }
  if ($.eqB(name$, 'Document')) {
    return 'HTMLDocument';
  } else {
  }
  if ($.eqB(name$, 'XMLDocument')) {
    return 'Document';
  } else {
  }
  if ($.eqB(name$, 'WorkerMessageEvent')) {
    return 'MessageEvent';
  } else {
  }
  return name$;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  } else {
  }
  if (!(typeof receiver === 'string')) {
    return receiver.hashCode$0();
  } else {
  }
  var length$ = (receiver.length);
  for (var i = 0, hash = 0; i < length$; i = i0, hash = hash0) {
    var hash1 = (536870911 & hash + (receiver.charCodeAt(i))) >>> 0;
    var hash2 = (536870911 & hash1 + ((524287 & hash1) >>> 0 << 10)) >>> 0;
    var hash0 = (hash2 ^ $.shr(hash2, 6)) >>> 0;
    var i0 = i + 1;
  }
  var hash3 = (536870911 & hash + ((67108863 & hash) >>> 0 << 3)) >>> 0;
  var hash4 = (hash3 ^ $.shr(hash3, 11)) >>> 0;
  return (536870911 & hash4 + ((16383 & hash4) >>> 0 << 15)) >>> 0;
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$0();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.createFromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  if ($.isJsArray(charCodes) !== true) {
    if (!((typeof charCodes === 'object') && (((charCodes.constructor === Array) || charCodes.is$List2())))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(charCodes));
    } else {
    }
    var charCodes0 = $.List$from(charCodes);
  } else {
    charCodes0 = charCodes;
  }
  return $.stringFromCharCodes(charCodes0);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.startsWith$1(other);
  } else {
  }
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) {
    return false;
  } else {
  }
  return other == receiver.substring(0, length$);
};

$.le = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a <= b);
  } else {
    t2 = $.le$slow(a, b);
  }
  return t2;
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.stringToString($.getTypeNameOf(obj));
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.trim$0();
  } else {
  }
  return receiver.trim();
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  var t0 = method === (void 0);
  if (t0) {
    var t1 = !($._dynamicMetadata2() === (void 0));
  } else {
    t1 = t0;
  }
  if (t1) {
    for (var method0 = method, i = 0; method1 = method0, $.ltB(i, $.get$length($._dynamicMetadata2())); method0 = method2, i = i0) {
      var entry = $.index($._dynamicMetadata2(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        var method3 = (methods[entry.get$tag()]);
        if (!(method3 === (void 0))) {
          method1 = method3;
          break;
        } else {
        }
        var method2 = method3;
      } else {
        method2 = method0;
      }
      var i0 = i + 1;
    }
  } else {
    method1 = method;
  }
  if (method1 === (void 0)) {
    var method4 = (methods['Object']);
  } else {
    method4 = method1;
  }
  var proto = (Object.getPrototypeOf(obj));
  if (method4 === (void 0)) {
    var method5 = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  } else {
    method5 = method4;
  }
  var nullCheckMethod = (function() {var res = method5.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  if (!proto.hasOwnProperty(name$)) {
    $.defineProperty(proto, name$, nullCheckMethod);
  } else {
  }
  return nullCheckMethod.apply(obj, arguments$);
  var method1;
};

$._MessagePortEventsImpl$1 = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) {
    return $.typeNameInChrome;
  } else {
  }
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC13) === true) {
    return $.typeNameInChrome;
  } else {
    if ($.contains$1(userAgent, 'Firefox') === true) {
      return $.typeNameInFirefox;
    } else {
      if ($.contains$1(userAgent, 'MSIE') === true) {
        return $.typeNameInIE;
      } else {
        return $.constructorNameFallback;
      }
    }
  }
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    var t0 = key === index;
    if (t0) {
      var t1 = key < (a.length);
    } else {
      t1 = t0;
    }
    if (t1) {
      return a[key];
    } else {
    }
  } else {
  }
  return $.index$slow(a, index);
};

$.sort = function(receiver, compare) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.sort$1(compare);
  } else {
  }
  $.checkMutable(receiver, 'sort');
  $.sort2(receiver, compare);
};

$.toString = function(value) {
  if (typeof value == "object") {
    if ($.isJsArray(value) === true) {
      return $.collectionToString(value);
    } else {
      return value.toString$0();
    }
  } else {
  }
  if (value === 0 && (1 / value) < 0) {
    return '-0.0';
  } else {
  }
  if (value === (void 0)) {
    return 'null';
  } else {
  }
  if (typeof value == "function") {
    return 'Closure';
  } else {
  }
  return String(value);
};

$.sort2 = function(a, compare) {
  $._doSort(a, 0, $.sub($.get$length(a), 1), compare);
};

$._ElementEventsImpl$1 = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.toLowerCase$0();
  } else {
  }
  return receiver.toLowerCase();
};

$.parseDouble = function(str) {
  return $.parseDouble2(str);
};

$._doSort = function(a, left, right, compare) {
  if ($.leB($.sub(right, left), 32)) {
    $.insertionSort_(a, left, right, compare);
  } else {
    $._dualPivotQuicksort(a, left, right, compare);
  }
};

$.parseDouble2 = function(str) {
  $.checkString(str);
  var ret = (parseFloat(str));
  var t0 = ret === 0;
  if (t0) {
    var t1 = $.startsWith(str, '0x') === true;
    if (!t1) {
      var t2 = $.startsWith(str, '0X') === true;
    } else {
      t2 = t1;
    }
  } else {
    t2 = t0;
  }
  if (t2) {
    var ret0 = (parseInt(str));
  } else {
    ret0 = ret;
  }
  var t3 = $.isNaN(ret0) === true;
  if (t3) {
    var t4 = !$.eqB(str, 'NaN');
  } else {
    t4 = t3;
  }
  if (t4) {
    var t5 = !$.eqB(str, '-NaN');
  } else {
    t5 = t4;
  }
  if (t5) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  } else {
  }
  return ret0;
};

$.List = function(length$) {
  return $.newList(length$);
};

$._isPowerOfTwo = function(x) {
  return $.eq($.and(x, $.sub(x, 1)), 0);
};

$._XMLHttpRequestUploadEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$._CssClassSet$1 = function(_element) {
  return new $._CssClassSet(_element);
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.indexOf$1 = function(receiver, element) {
  var t0 = $.isJsArray(receiver) === true;
  if (!t0) {
    var t1 = typeof receiver === 'string';
  } else {
    t1 = t0;
  }
  if (t1) {
    return $.indexOf$2(receiver, element, 0);
  } else {
  }
  return receiver.indexOf$1(element);
};

$.StackOverflowException$0 = function() {
  return new $.StackOverflowException();
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.forEach$1(f);
  } else {
    return $.forEach2(receiver, f);
  }
};

$.StringBufferImpl$1 = function(content$) {
  var t0 = new $.StringBufferImpl((void 0), (void 0));
  t0.StringBufferImpl$1(content$);
  return t0;
};

$.HashMapImplementation$0 = function() {
  var t0 = new $.HashMapImplementation((void 0), (void 0), (void 0), (void 0), (void 0));
  t0.HashMapImplementation$0();
  return t0;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$1(startIndex);
  } else {
  }
  return $.substring$2(receiver, startIndex, (void 0));
};

$.join = function(strings, separator) {
  return $.join2(strings, separator);
};

$.join2 = function(strings, separator) {
  if (typeof separator !== 'string') return $.join2$bailout(strings, separator,  0);
  $.checkNull(strings);
  $.checkNull(separator);
  for (var t0 = $.iterator(strings), result = '', first = true; t0.hasNext$0() === true; result = result0, first = first0) {
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    } else {
    }
    if (!first) {
      var result1 = result + separator;
    } else {
      result1 = result;
    }
    var result2 = result1 + t1;
    var first0 = false;
    var result0 = result2;
  }
  return result;
};

$.eq = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b);
    } else {
      return a === b;
    }
  } else {
  }
  return a === b;
};

$._SharedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.gtB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a > b);
  } else {
    t2 = $.gt$slow(a, b) === true;
  }
  return t2;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target === (void 0))) {
    target.builtin$typeInfo = typeInfo;
  } else {
  }
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var a0 = (a);
    var b0 = (b);
    if (b0 < 0) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    } else {
    }
    if (b0 > 31) {
      return 0;
    } else {
    }
    return (a0 << b0) >>> 0;
  } else {
  }
  return a.operator$shl$1(b);
};

$.document = function() {
  return document;;
};

$._FileWriterEventsImpl$1 = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.ZeDate$fromString = function(dateString) {
  for (var t0 = $.iterator($.CTC11.allMatches$1(dateString)); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    return $.ZeDate$3($.parseInt(t1.group$1(3)), $.parseInt(t1.group$1(2)), $.parseInt(t1.group$1(1)));
  }
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, _existingArgumentNames) {
  return new $.NoSuchMethodException(_existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a < b);
  } else {
    t2 = $.lt$slow(a, b);
  }
  return t2;
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  } else {
  }
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    var t0 = $.eqB(type, 'property_not_function');
    if (!t0) {
      var t1 = $.eqB(type, 'called_non_callable');
    } else {
      t1 = t0;
    }
    if (!t1) {
      var t2 = $.eqB(type, 'non_object_property_call');
    } else {
      t2 = t1;
    }
    if (!t2) {
      var t3 = $.eqB(type, 'non_object_property_load');
    } else {
      t3 = t2;
    }
    if (t3) {
      var t4 = typeof name$ === 'string';
      if (t4) {
        var t5 = $.startsWith(name$, '$call$') === true;
      } else {
        t5 = t4;
      }
      if (t5) {
        return $.ObjectNotClosureException$0();
      } else {
        return $.NullPointerException$2((void 0), $.CTC);
      }
    } else {
      if ($.eqB(type, 'undefined_method')) {
        var t6 = typeof name$ === 'string';
        if (t6) {
          var t7 = $.startsWith(name$, '$call$') === true;
        } else {
          t7 = t6;
        }
        if (t7) {
          return $.ObjectNotClosureException$0();
        } else {
          return $.NoSuchMethodException$4('', name$, [], (void 0));
        }
      } else {
      }
    }
    if (typeof message === 'string') {
      var t8 = $.endsWith(message, 'is null') === true;
      if (!t8) {
        var t9 = $.endsWith(message, 'is undefined') === true;
      } else {
        t9 = t8;
      }
      if (!t9) {
        var t10 = $.endsWith(message, 'is null or undefined') === true;
      } else {
        t10 = t9;
      }
      if (t10) {
        return $.NullPointerException$2((void 0), $.CTC);
      } else {
        if ($.endsWith(message, 'is not a function') === true) {
          return $.NoSuchMethodException$4('', '<unknown>', [], (void 0));
        } else {
        }
      }
    } else {
    }
    if (typeof message === 'string') {
      var t11 = message;
    } else {
      t11 = '';
    }
    return $.TypeError$1(t11);
  } else {
  }
  if (ex instanceof RangeError) {
    var t12 = typeof message === 'string';
    if (t12) {
      var t13 = $.contains$1(message, 'call stack') === true;
    } else {
      t13 = t12;
    }
    if (t13) {
      return $.StackOverflowException$0();
    } else {
    }
    return $.IllegalArgumentException$1('');
  } else {
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    var t14 = typeof message === 'string';
    if (t14) {
      var t15 = message === 'too much recursion';
    } else {
      t15 = t14;
    }
    if (t15) {
      return $.StackOverflowException$0();
    } else {
    }
  } else {
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.ceil$0();
  } else {
  }
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) {
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  } else {
  }
  return $._getTypeNameOf.$call$1(obj);
};

$.forEach3 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.sub = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a - b);
  } else {
    t2 = $.sub$slow(a, b);
  }
  return t2;
};

$.encodeURI$bailout = function(text, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var encodedText = $.StringBufferImpl$1('');
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, $.get$length(text))) break L0;
        c$0:{
          if (!$.eqB('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~*\'()#;,/?:@&=+$'.indexOf($.index(text, i)), -1)) {
            encodedText.add$1($.index(text, i));
            var i0 = i;
            break c$0;
          } else {
          }
          var charCode = $.charCodeAt(text, i);
          var byteList = [];
          if ($.ltB(charCode, 128)) {
            $.add$1(byteList, charCode);
            i0 = i;
          } else {
            if ($.ltB(charCode, 2048)) {
              $.add$1(byteList, $.or($.shr(charCode, 6), 192));
              $.add$1(byteList, $.or($.and(charCode, 63), 128));
              i0 = i;
            } else {
              var t1 = $.leB(55296, charCode);
              if (t1) {
                var t2 = $.ltB(charCode, 56320);
              } else {
                t2 = t1;
              }
              if (t2) {
                var t3 = i + 1;
                if ($.eqB($.get$length(text), t3)) {
                  var nextCharCode = 0;
                } else {
                  nextCharCode = $.charCodeAt(text, t3);
                }
                var t4 = $.leB(56320, nextCharCode);
                if (t4) {
                  var t5 = $.ltB(nextCharCode, 57344);
                } else {
                  t5 = t4;
                }
                if (t5) {
                  var charCode0 = $.add(charCode, 64);
                  $.add$1(byteList, $.or($.and($.shr(charCode0, 8), 7), 240));
                  $.add$1(byteList, $.or($.and($.shr(charCode0, 2), 63), 128));
                  $.add$1(byteList, $.or($.or($.shl($.and(charCode0, 3), 4), $.and($.shr(nextCharCode, 6), 15)), 128));
                  $.add$1(byteList, $.or($.and(nextCharCode, 63), 128));
                } else {
                  throw $.captureStackTrace($.IllegalArgumentException$1('URI malformed: Orphaned low surrogate.'));
                }
                i0 = t3;
              } else {
                var t6 = $.leB(56320, charCode);
                if (t6) {
                  var t7 = $.ltB(charCode, 57344);
                } else {
                  t7 = t6;
                }
                if (t7) {
                  throw $.captureStackTrace($.IllegalArgumentException$1('URI malformed: Orphaned high surrogate.'));
                } else {
                  if ($.ltB(charCode, 65536)) {
                    $.add$1(byteList, $.or($.shr(charCode, 12), 224));
                    $.add$1(byteList, $.or($.and($.shr(charCode, 6), 63), 128));
                    $.add$1(byteList, $.or($.and(charCode, 63), 128));
                  } else {
                  }
                }
                i0 = i;
              }
            }
          }
          var j = 0;
          L1: while (true) {
            if (!(j < byteList.length)) break L1;
            var t8 = encodedText.add$1('%');
            var t9 = byteList.length;
            if (j < 0 || j >= t9) throw $.ioore(j);
            var t10 = $.shr(byteList[j], 4);
            if (t10 !== (t10 | 0)) throw $.iae(t10);
            var t11 = '0123456789ABCDEF'.length;
            if (t10 < 0 || t10 >= t11) throw $.ioore(t10);
            var t12 = $.add$1(t8, '0123456789ABCDEF'[t10]);
            var t13 = byteList.length;
            if (j < 0 || j >= t13) throw $.ioore(j);
            var t14 = $.and(byteList[j], 15);
            if (t14 !== (t14 | 0)) throw $.iae(t14);
            var t15 = '0123456789ABCDEF'.length;
            if (t14 < 0 || t14 >= t15) throw $.ioore(t14);
            $.add$1(t12, '0123456789ABCDEF'[t14]);
            j = j + 1;
          }
        }
        i = i0 + 1;
      }
      return encodedText.toString$0();
  }
};

$.allMatchesInStringUnchecked$bailout = function(needle, haystack, state, env0, env1, env2) {
  switch (state) {
    case 1:
      length$ = env0;
      result = env1;
      patternLength = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.List((void 0));
      $.setRuntimeTypeInfo(result, ({E: 'Match'}));
      var length$ = $.get$length(haystack);
      var patternLength = $.get$length(needle);
    case 1:
      state = 0;
      var startIndex = 0;
      L0: while (true) {
        if (!true) break L0;
        var position = $.indexOf$2(haystack, needle, startIndex);
        if ($.eqB(position, -1)) {
          break;
        } else {
        }
        result.push($.StringMatch$3(position, haystack, needle));
        var endIndex = $.add(position, patternLength);
        if ($.eqB(endIndex, length$)) {
          break;
        } else {
          if ($.eqB(position, endIndex)) {
            var startIndex0 = $.add(startIndex, 1);
          } else {
            startIndex0 = endIndex;
          }
        }
        startIndex = startIndex0;
      }
      return result;
  }
};

$.insertionSort_$bailout = function(a, left, right, compare, state, env0, env1, env2) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      t0 = env0;
      t1 = env1;
      t2 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
    case 3:
      state = 0;
      var i = $.add(left, 1);
      L0: while (true) {
        if (!$.leB(i, right)) break L0;
        var el = $.index(a, i);
        var j = i;
        L1: while (true) {
          var t3 = $.gtB(j, left);
          if (t3) {
            var t4 = $.gtB(compare.$call$2($.index(a, $.sub(j, 1)), el), 0);
          } else {
            t4 = t3;
          }
          if (!t4) break L1;
          $.indexSet(a, j, $.index(a, $.sub(j, 1)));
          var j0 = $.sub(j, 1);
          j = j0;
        }
        $.indexSet(a, j, el);
        i = $.add(i, 1);
      }
  }
};

$.stringReplaceAllUnchecked$bailout = function(receiver, from, to, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (typeof from === 'string') {
        if (from === '') {
          if ($.eqB(receiver, '')) {
            return to;
          } else {
            var result = $.StringBufferImpl$1('');
            var length$ = $.get$length(receiver);
            result.add$1(to);
            var i = 0;
            L0: while (true) {
              if (!$.ltB(i, length$)) break L0;
              result.add$1($.index(receiver, i));
              result.add$1(to);
              i = i + 1;
            }
            return result.toString$0();
          }
        } else {
          return $.stringReplaceJS(receiver, $.regExpMakeNative($.JSSyntaxRegExp$3((from.replace($.regExpMakeNative($.CTC6, true), "\\$&")), false, false), true), to);
        }
      } else {
        if (typeof from === 'object' && !!from.is$JSSyntaxRegExp) {
          return $.stringReplaceJS(receiver, $.regExpMakeNative(from, true), to);
        } else {
          $.checkNull(from);
          throw $.captureStackTrace('StringImplementation.replaceAll(Pattern) UNIMPLEMENTED');
        }
      }
  }
};

$.indexOf2$bailout = function(a, element, startIndex, endIndex, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      } else {
      }
      if ($.ltB(startIndex, 0)) {
        var i = 0;
      } else {
        i = startIndex;
      }
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        } else {
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.indexOf$bailout = function(a, element, startIndex, endIndex, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      } else {
      }
      if ($.ltB(startIndex, 0)) {
        var i = 0;
      } else {
        i = startIndex;
      }
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        } else {
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$._dualPivotQuicksort$bailout = function(a, left, right, compare, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.assert($.gt($.sub(right, left), 32));
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
        var el20 = el1;
        var el10 = el2;
      } else {
        el20 = el2;
        el10 = el1;
      }
      if ($.gtB(compare.$call$2(el4, el5), 0)) {
        var el40 = el5;
        var el50 = el4;
      } else {
        el40 = el4;
        el50 = el5;
      }
      if ($.gtB(compare.$call$2(el10, el3), 0)) {
        var el11 = el3;
        var el30 = el10;
      } else {
        el11 = el10;
        el30 = el3;
      }
      if ($.gtB(compare.$call$2(el20, el30), 0)) {
        var el21 = el30;
        var el31 = el20;
      } else {
        el21 = el20;
        el31 = el30;
      }
      if ($.gtB(compare.$call$2(el11, el40), 0)) {
        var el41 = el11;
        var el12 = el40;
      } else {
        el41 = el40;
        el12 = el11;
      }
      if ($.gtB(compare.$call$2(el31, el41), 0)) {
        var el42 = el31;
        var el32 = el41;
      } else {
        el42 = el41;
        el32 = el31;
      }
      if ($.gtB(compare.$call$2(el21, el50), 0)) {
        var el22 = el50;
        var el51 = el21;
      } else {
        el22 = el21;
        el51 = el50;
      }
      if ($.gtB(compare.$call$2(el22, el32), 0)) {
        var el23 = el32;
        var el33 = el22;
      } else {
        el23 = el22;
        el33 = el32;
      }
      if ($.gtB(compare.$call$2(el42, el51), 0)) {
        var el43 = el51;
        var el52 = el42;
      } else {
        el43 = el42;
        el52 = el51;
      }
      $.indexSet(a, index1, el12);
      $.indexSet(a, index3, el33);
      $.indexSet(a, index5, el52);
      $.indexSet(a, index2, $.index(a, left));
      $.indexSet(a, index4, $.index(a, right));
      var less = $.add(left, 1);
      var great = $.sub(right, 1);
      var t1 = $.eq(compare.$call$2(el23, el43), 0) === true;
      if (t1) {
        var k = less;
        var great0 = great;
        var less0 = less;
        L0: while (true) {
          if (!$.leB(k, great0)) break L0;
          c$0:{
            var ak = $.index(a, k);
            var comp = compare.$call$2(ak, el23);
            if ($.eqB(comp, 0)) {
              var great1 = great0;
              var less1 = less0;
              break c$0;
            } else {
            }
            if ($.ltB(comp, 0)) {
              if (!$.eqB(k, less0)) {
                $.indexSet(a, k, $.index(a, less0));
                $.indexSet(a, less0, ak);
              } else {
              }
              great1 = great0;
              less1 = $.add(less0, 1);
            } else {
              var comp0 = comp;
              var great2 = great0;
              L1: while (true) {
                great1 = great2;
                less1 = less0;
                if (!true) break L1;
                c$1:{
                  var comp1 = compare.$call$2($.index(a, great2), el23);
                  if ($.gtB(comp1, 0)) {
                    var great3 = $.sub(great2, 1);
                    comp0 = comp1;
                    break c$1;
                  } else {
                    if ($.ltB(comp1, 0)) {
                      $.indexSet(a, k, $.index(a, less0));
                      var less2 = $.add(less0, 1);
                      $.indexSet(a, less0, $.index(a, great2));
                      var great4 = $.sub(great2, 1);
                      $.indexSet(a, great2, ak);
                      great1 = great4;
                      less1 = less2;
                      break;
                    } else {
                      $.indexSet(a, k, $.index(a, great2));
                      var great5 = $.sub(great2, 1);
                      $.indexSet(a, great2, ak);
                      great1 = great5;
                      less1 = less0;
                      break;
                    }
                  }
                  great3 = great2;
                }
                great2 = great3;
              }
            }
          }
          var k0 = $.add(k, 1);
          k = k0;
          great0 = great1;
          less0 = less1;
        }
        var great6 = great0;
        var less3 = less0;
      } else {
        var great7 = great;
        var less4 = less;
        var k1 = less;
        L2: while (true) {
          if (!$.leB(k1, great7)) break L2;
          var ak0 = $.index(a, k1);
          if ($.ltB(compare.$call$2(ak0, el23), 0)) {
            if (!$.eqB(k1, less4)) {
              $.indexSet(a, k1, $.index(a, less4));
              $.indexSet(a, less4, ak0);
            } else {
            }
            var great8 = great7;
            var less5 = $.add(less4, 1);
          } else {
            if ($.gtB(compare.$call$2(ak0, el43), 0)) {
              var great9 = great7;
              L3: while (true) {
                great8 = great9;
                less5 = less4;
                if (!true) break L3;
                c$1:{
                  if ($.gtB(compare.$call$2($.index(a, great9), el43), 0)) {
                    var great10 = $.sub(great9, 1);
                    if ($.ltB(great10, k1)) {
                      great8 = great10;
                      less5 = less4;
                      break;
                    } else {
                    }
                    var great11 = great10;
                    break c$1;
                  } else {
                    if ($.ltB(compare.$call$2($.index(a, great9), el23), 0)) {
                      $.indexSet(a, k1, $.index(a, less4));
                      var less6 = $.add(less4, 1);
                      $.indexSet(a, less4, $.index(a, great9));
                      var great12 = $.sub(great9, 1);
                      $.indexSet(a, great9, ak0);
                      great8 = great12;
                      less5 = less6;
                    } else {
                      $.indexSet(a, k1, $.index(a, great9));
                      var great13 = $.sub(great9, 1);
                      $.indexSet(a, great9, ak0);
                      great8 = great13;
                      less5 = less4;
                    }
                    break;
                  }
                  great11 = great9;
                }
                great9 = great11;
              }
            } else {
              great8 = great7;
              less5 = less4;
            }
          }
          var k2 = $.add(k1, 1);
          great7 = great8;
          less4 = less5;
          k1 = k2;
        }
        great6 = great7;
        less3 = less4;
      }
      $.indexSet(a, left, $.index(a, $.sub(less3, 1)));
      $.indexSet(a, $.sub(less3, 1), el23);
      $.indexSet(a, right, $.index(a, $.add(great6, 1)));
      $.indexSet(a, $.add(great6, 1), el43);
      $._doSort(a, left, $.sub(less3, 2), compare);
      $._doSort(a, $.add(great6, 2), right, compare);
      if (t1) {
        return;
      } else {
      }
      var t2 = $.ltB(less3, index1);
      if (t2) {
        var t3 = $.gtB(great6, index5);
      } else {
        t3 = t2;
      }
      if (t3) {
        var less7 = less3;
        L4: while (true) {
          if (!$.eqB(compare.$call$2($.index(a, less7), el23), 0)) break L4;
          var less8 = $.add(less7, 1);
          less7 = less8;
        }
        var great14 = great6;
        L5: while (true) {
          if (!$.eqB(compare.$call$2($.index(a, great14), el43), 0)) break L5;
          var great15 = $.sub(great14, 1);
          great14 = great15;
        }
        var great16 = great14;
        var less9 = less7;
        var k3 = less7;
        L6: while (true) {
          if (!$.leB(k3, great16)) break L6;
          var ak1 = $.index(a, k3);
          if ($.eqB(compare.$call$2(ak1, el23), 0)) {
            if (!$.eqB(k3, less9)) {
              $.indexSet(a, k3, $.index(a, less9));
              $.indexSet(a, less9, ak1);
            } else {
            }
            var great17 = great16;
            var less10 = $.add(less9, 1);
          } else {
            if ($.eqB(compare.$call$2(ak1, el43), 0)) {
              var great18 = great16;
              L7: while (true) {
                great17 = great18;
                less10 = less9;
                if (!true) break L7;
                c$1:{
                  if ($.eqB(compare.$call$2($.index(a, great18), el43), 0)) {
                    var great19 = $.sub(great18, 1);
                    if ($.ltB(great19, k3)) {
                      great17 = great19;
                      less10 = less9;
                      break;
                    } else {
                    }
                    var great20 = great19;
                    break c$1;
                  } else {
                    if ($.ltB(compare.$call$2($.index(a, great18), el23), 0)) {
                      $.indexSet(a, k3, $.index(a, less9));
                      var less11 = $.add(less9, 1);
                      $.indexSet(a, less9, $.index(a, great18));
                      var great21 = $.sub(great18, 1);
                      $.indexSet(a, great18, ak1);
                      great17 = great21;
                      less10 = less11;
                    } else {
                      $.indexSet(a, k3, $.index(a, great18));
                      var great22 = $.sub(great18, 1);
                      $.indexSet(a, great18, ak1);
                      great17 = great22;
                      less10 = less9;
                    }
                    break;
                  }
                  great20 = great18;
                }
                great18 = great20;
              }
            } else {
              great17 = great16;
              less10 = less9;
            }
          }
          var k4 = $.add(k3, 1);
          great16 = great17;
          less9 = less10;
          k3 = k4;
        }
        $._doSort(a, less9, great16, compare);
      } else {
        $._doSort(a, less3, great6, compare);
      }
  }
};

$.join2$bailout = function(strings, separator, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.checkNull(strings);
      $.checkNull(separator);
      var t1 = $.iterator(strings);
      var result = '';
      var first = true;
      L0: while (true) {
        if (!(t1.hasNext$0() === true)) break L0;
        var t2 = t1.next$0();
        $.checkNull(t2);
        if (!(typeof t2 === 'string')) {
          throw $.captureStackTrace($.IllegalArgumentException$1(t2));
        } else {
        }
        if (!first) {
          var result0 = $.add(result, separator);
        } else {
          result0 = result;
        }
        var result1 = result0 + t2;
        var first0 = false;
        var result2 = result1;
        result = result2;
        first = first0;
      }
      return result;
  }
};

$.buildDynamicMetadata$bailout = function(inputTable, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      result = env0;
      t0 = env1;
      tag = env2;
      i = env3;
      tags = env4;
      set = env5;
      tagNames = env6;
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
            var set = $.HashSetImplementation$0();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            var j = 0;
            L1: while (true) {
              if (!$.ltB(j, $.get$length(tagNames))) break L1;
              set.add$1($.index(tagNames, j));
              j = j + 1;
            }
            $.add$1(result, $.MetaInfo$3(tag, tags, set));
            i = i + 1;
        }
      }
      return result;
  }
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.invokeClosure.$call$5 = $.invokeClosure;
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
Isolate.$finishClasses();
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC4 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC, {}, 0);
$.CTC9 = new Isolate.$isolateProperties.DurationImplementation(86400000);
$.CTC3 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC13 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC14 = new Isolate.$isolateProperties.Object();
$.CTC10 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(\\d*):(\\d*)(:(\\d*))?');
$.CTC5 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC8 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC11 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(\\d*)-(\\d*)-(\\d*)');
$.CTC12 = Isolate.makeConstantList(['Nullember', 'Januar', 'Februar', 'M\xe4rz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'Dezember']);
$.CTC6 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '[-[\\]{}()*+?.,\\\\^$|#\\s]');
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC7 = new Isolate.$isolateProperties.EmptyQueueException();
$.tokens = (void 0);
$._getTypeNameOf = (void 0);
$.app = (void 0);
$._cachedBrowserPrefix = (void 0);
var $ = null;
Isolate.$finishClasses();
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
$.defineProperty(Object.prototype, 'is$List2', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
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
    return $._AbstractWorkerEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', ["type!", "name?"], {
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

$.$defineNativeClass('Attr', ["value=", "name?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('AudioParam', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$1(this);
 }
});

$.$defineNativeClass('BiquadFilterNode', ["type!"], {
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "name?", "disabled!"], {
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
 get$filter: function() {
  return this.getPropertyValue$1('' + $.stringToString($._browserPrefix()) + 'filter');
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
  return $._DOMApplicationCacheEventsImpl$1(this);
 }
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
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
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
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', ["readyState?"], {
 send$1: function(text) {
  return this.send(text);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 open$5: function(arg0, arg1, arg2, arg3, arg4) { return this.open.$call$5(arg0, arg1, arg2, arg3, arg4); }
});

$.$defineNativeClass('HTMLDocument', ["readyState?", "body?"], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);;
 },
 query$1: function(selectors) {
  if ($.CTC8.hasMatch$1(selectors) === true) {
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  } else {
  }
  return this.$dom_querySelector$1(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 get$window: function() {
  return this.defaultView;;
 },
 get$on: function() {
  return $._DocumentEventsImpl$1(this);
 }
});

$.$defineNativeClass('DocumentFragment', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$1(this);
 },
 set$id: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('ID can\'t be set for document fragments.'));
 },
 scrollIntoView$1: function(centerIfNeeded) {
 },
 scrollIntoView$0: function() {
  return this.scrollIntoView$1((void 0))
},
 click$0: function() {
 },
 get$click: function() { return new $.Closure52(this, 'click$0'); },
 focus$0: function() {
 },
 get$focus: function() { return new $.Closure52(this, 'focus$0'); },
 blur$0: function() {
 },
 get$blur: function() { return new $.Closure52(this, 'blur$0'); },
 get$classes: function() {
  var t0 = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  return t0;
 },
 get$attributes: function() {
  return $.CTC4;
 },
 get$parent: function() {
  return;
 },
 get$id: function() {
  return '';
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
 query$1: function(selectors) {
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
 get$focus: function() { return new $.Closure52(this, 'focus$0'); },
 click$0: function() {
  return this.click();
 },
 get$click: function() { return new $.Closure52(this, 'click$0'); },
 blur$0: function() {
  return this.blur();
 },
 get$blur: function() { return new $.Closure52(this, 'blur$0'); },
 set$$$dom_className: function(value) {
  this.className = value;;
 },
 get$$$dom_className: function() {
  return this.className;;
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 get$classes: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$classes')) {
    return $._CssClassSet$1(this);
  } else {
    return Object.prototype.get$classes.call(this);
  }
 },
 get$attributes: function() {
  return $._ElementAttributeMap$1(this);
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
  errorCallback = $.convertDartClosureToJS(errorCallback, 1);
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
  return $._EventSourceEventsImpl$1(this);
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
    return $._EventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["name?", "disabled!"], {
});

$.$defineNativeClass('File', ["name?"], {
});

$.$defineNativeClass('FileException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'File'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
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
  return $._FileReaderEventsImpl$1(this);
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
  return $._FileWriterEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["name?", "length?"], {
});

$.$defineNativeClass('HTMLFrameElement', ["name?"], {
});

$.$defineNativeClass('HTMLFrameSetElement', ["rows!"], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
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
 is$List2: function() { return true; },
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
  return $._IDBDatabaseEventsImpl$1(this);
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
    return $._IDBRequestEventsImpl$1(this);
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
  return $._IDBTransactionEventsImpl$1(this);
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
  return $._IDBVersionChangeRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', ["name?"], {
});

$.$defineNativeClass('HTMLImageElement', ["name?"], {
});

$.$defineNativeClass('HTMLInputElement', ["value=", "type!", "placeholder!", "pattern?", "name?", "disabled!"], {
 get$on: function() {
  return $._InputElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
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
  return $._JavaScriptAudioNodeEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLKeygenElement', ["name?", "disabled!"], {
});

$.$defineNativeClass('HTMLLIElement', ["value=", "type!"], {
});

$.$defineNativeClass('HTMLLinkElement', ["type!", "disabled!"], {
});

$.$defineNativeClass('Location', [], {
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
 get$start: function() { return new $.Closure52(this, 'start$0'); }
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
  return $._MediaElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', ["readyState?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
});

$.$defineNativeClass('MessagePort', [], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.Closure52(this, 'start$0'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
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
  if (!$.eqNullB(this.get$parent())) {
    this.get$parent().$dom_removeChild$1(this);
  } else {
  }
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$1(this);
 }
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter3(this, [], f));
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._parent.$dom_removeChild$1(result);
  } else {
  }
  return result;
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._parent.$dom_appendChild$1(t1);
  }
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('NodeSelector', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLOListElement', ["type!", "start="], {
 start$0: function() { return this.start.$call$0(); }
});

$.$defineNativeClass('HTMLObjectElement', ["type!", "name?"], {
});

$.$defineNativeClass('OperationNotAllowedException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
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
  return $._PeerConnection00EventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List2: function() { return true; },
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

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGElement', [], {
 set$id: function(value) {
  this.id = value;;
 },
 get$id: function() {
  return this.id;;
 },
 get$classes: function() {
  if (this.get$_cssClassSet() === (void 0)) {
    this.set$_cssClassSet($._AttributeClassSet$1(this.get$_ptr()));
  } else {
  }
  return this.get$_cssClassSet();
 }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$1(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
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

$.$defineNativeClass('SVGScriptElement', ["type!"], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', ["type!", "disabled!"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('HTMLScriptElement', ["type!"], {
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "selectedIndex=", "name?", "length=", "disabled!"], {
 add$2: function(element, before) {
  return this.add(element,before);
 }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$1(this);
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
 get$start: function() { return new $.Closure52(this, 'start$0'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$1(this);
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
  return $.eqNull(this.$dom_key$1(0));
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 forEach$1: function(f) {
  for (var i = 0; true; i = i + 1) {
    var key = this.$dom_key$1(i);
    if ($.eqNullB(key)) {
      return;
    } else {
    }
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
  return !$.eqNullB(this.$dom_getItem$1(key));
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
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'StyleSheet'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
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
  return $._TextTrackEventsImpl$1(this);
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
  return $._TextTrackCueEventsImpl$1(this);
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
  return $._TextTrackListEventsImpl$1(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
 start$1: function(index) {
  return this.start(index);
 },
 get$start: function() { return new $.Closure54(this, 'start$1'); },
 end$1: function(index) {
  return this.end(index);
 },
 get$end: function() { return new $.Closure54(this, 'end$1'); }
});

$.$defineNativeClass('TouchList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Touch'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
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
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["name?"], {
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
  return $._WebSocketEventsImpl$1(this);
 }
});

$.$defineNativeClass('DOMWindow', ["window?", "status?", "parent?", "navigator?", "name?", "localStorage?", "length?"], {
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 focus$0: function() {
  return this.focus();
 },
 get$focus: function() { return new $.Closure52(this, 'focus$0'); },
 clearInterval$1: function(handle) {
  return this.clearInterval(handle);
 },
 blur$0: function() {
  return this.blur();
 },
 get$blur: function() { return new $.Closure52(this, 'blur$0'); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$1(this);
 }
});

$.$defineNativeClass('Worker', [], {
 get$on: function() {
  return $._WorkerEventsImpl$1(this);
 }
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
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
    return $._WorkerContextEventsImpl$1(this);
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
  return $._XMLHttpRequestEventsImpl$1(this);
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
  return $._XMLHttpRequestUploadEventsImpl$1(this);
 }
});

$.$defineNativeClass('XPathException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

// 172 dynamic classes.
// 339 classes
// 31 !leaf
(function(){
  var v0/*class(_SVGElementImpl)*/ = 'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement';
  var v1/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement';
  var v2/*class(_UIEventImpl)*/ = 'UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent';
  var v3/*class(_ElementImpl)*/ = [v0/*class(_SVGElementImpl)*/,v1/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v4/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot';
  var v5/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument';
  var v6/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|Comment';
  var v7/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v8/*class(_NodeImpl)*/ = [v3/*class(_ElementImpl)*/,v4/*class(_DocumentFragmentImpl)*/,v5/*class(_DocumentImpl)*/,v6/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v9/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream';
  var v10/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest';
  var v11/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['DocumentFragment', v4/*class(_DocumentFragmentImpl)*/],
    ['SVGElement', v0/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v1/*class(_MediaElementImpl)*/],
    ['Element', v3/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync'],
    ['UIEvent', v2/*class(_UIEventImpl)*/],
    ['Event', [v2/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['WorkerContext', v7/*class(_WorkerContextImpl)*/],
    ['HTMLDocument', v5/*class(_DocumentImpl)*/],
    ['CharacterData', v6/*class(_CharacterDataImpl)*/],
    ['Node', v8/*class(_NodeImpl)*/],
    ['MediaStream', v9/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v10/*class(_IDBRequestImpl)*/],
    ['AbstractWorker', v11/*class(_AbstractWorkerImpl)*/],
    ['EventTarget', [v7/*class(_WorkerContextImpl)*/,v8/*class(_NodeImpl)*/,v9/*class(_MediaStreamImpl)*/,v10/*class(_IDBRequestImpl)*/,v11/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue'],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet'],
    ['NodeList', 'NodeList|RadioNodeList'],
    ['AudioParam', 'AudioParam|AudioGain'],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList']];
$.dynamicSetMetadata(table);
})();

if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.main();
  });
} else {
  $.main();
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
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
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function() {
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
    if (prototype.__proto__) {
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

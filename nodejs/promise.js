import { EventEmitter } from "events";
import util from 'util';

const Promise = function() {
  EventEmitter.call(this)
}
util.inherits(Promise, EventEmitter)

Promise.prototype.then = function(resolveHandler, rejectHandler, progressHandler) {
  if (typeof resolveHandler === 'function') {
    this.once('success', resolveHandler)
  }
  if (typeof rejectHandler === 'function') {
    this.once('error', rejectHandler)
  }
  if (typeof progressHandler === 'function') {
    this.on('progress', progressHandler)
  }

  return this
}

const Deferred = function () {
  this.state = 'unfulfilled';
  this.promise = new Promise();
 };
Deferred.prototype.resolve = function (obj) {
this.state = 'fulfilled';
this.promise.emit('success', obj);
};
Deferred.prototype.reject = function (err) {
this.state = 'failed';
this.promise.emit('error', err);
};
Deferred.prototype.progress = function (data) {
this.promise.emit('progress', data);
};


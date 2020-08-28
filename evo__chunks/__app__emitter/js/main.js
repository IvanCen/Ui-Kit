class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    !this.events[eventName] && (this.events[eventName] = []);
    this.events[eventName].push(callback);
  }

  unsubscribe(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter((eventCallback) => callback !== eventCallback);
  }

  emit(eventName, args) {
    const event = this.events[eventName];
    event && event.forEach((callback) => callback.call(null, args));
  }
}

const emitter = new EventEmitter();

emitter.subscribe('event:counter-changed', counterBasket);

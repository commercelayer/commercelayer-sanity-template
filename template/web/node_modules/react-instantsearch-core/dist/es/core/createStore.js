export default function createStore(initialState) {
  var state = initialState;
  var listeners = [];
  return {
    getState: function getState() {
      return state;
    },
    setState: function setState(nextState) {
      state = nextState;
      listeners.forEach(function (listener) {
        return listener();
      });
    },
    subscribe: function subscribe(listener) {
      listeners.push(listener);
      return function unsubscribe() {
        listeners.splice(listeners.indexOf(listener), 1);
      };
    }
  };
}
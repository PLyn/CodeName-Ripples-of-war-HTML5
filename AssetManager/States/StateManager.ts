module Game {
    export class StateManager {
        states = [];
        currentState;

        addState(key, state) {
            var obj = {
                "key": key,
                "state": state
            }
            this.states.push(obj);
        }
        removeState(key) {
            this.states[key] = null;
        }
        setState(key) {
            this.currentState = this.states[key].state;
        }
    }
}

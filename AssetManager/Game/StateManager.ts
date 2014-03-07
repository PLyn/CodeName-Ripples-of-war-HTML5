module Game {
    export class StateManager {
        states = [];
        currentState;
        //Mostly guesswork here, I am assuming none of this code will make it to the final thing
        //High on the list, will start getting through this ASAP with help from nick and/or the book
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

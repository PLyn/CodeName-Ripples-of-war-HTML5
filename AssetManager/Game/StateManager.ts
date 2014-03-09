module Game {
    export class StateManager {
        states = [];
        currentState = {
            "key": '',
            "function": null
        };
        //Mostly guesswork here, I am assuming none of this code will make it to the final thing
        //High on the list, will start getting through this ASAP with help from nick and/or the book
        addState(key, state) {
            this.states[key] = {
                "key": key,
                "": state
            };
        }
        removeState(key) {
            this.states[key] = null;
        }
        setState(key) {
            this.currentState = {
                "key": this.states[key].key,
                "function": this.states[key].func
            };
        }
        getState() {
            return this.currentState;
        }
    }
}

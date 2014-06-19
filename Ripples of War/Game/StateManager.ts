module Game {
    export class StateManager {
        gameStates;
        stateStack: State[];
        time = 0;

        constructor() {
            this.gameStates = []
            this.stateStack = new Array<State>();
            this.time = 0;
        }
        /*
            adds state to the index given by the key
        */
        addState(key, state) {
            this.gameStates[key] = state;
        }
        /*
            pushes state onto the state stack and then calls the init() of that state
        */
        pushState(state) {
                this.stateStack.push(state);
                state.init();
        }
        /*
            if the stack length is greater than zero then pops state from stack and runs the init() for the new state at the top
        */
        popState() {
            if (this.stateStack.length > 0 && this.time < Date.now()) {
                this.time = Date.now() + 100;
                this.stateStack.pop();
                if (this.stateStack.length > 0) {
                    var len = this.stateStack.length;
                    this.stateStack[len - 1].init();
                }
            }
        }
        /*
            Empties State stack
        */
        restart() {
            this.stateStack.slice(0, this.stateStack.length);
        }
        /*
            runs the update() of the state at the top of the stack
        */
        updateStack() {
            var len = this.stateStack.length;
            this.stateStack[len - 1].update();
        }
    }
}

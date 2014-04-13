module Game {
    export class StateManager {
        gameStates;
        stateStack: State[];
        time = 0;
        /*currentInGameState = 0;
        currentInGameStateFunction = null;
        currentState = 0;
        currentStateFunction = null;*/
        //Mostly guesswork here, I am assuming none of this code will make it to the final thing
        //High on the list, will start getting through this ASAP with help from nick and/or the book
        constructor() {
            this.gameStates = []
            this.stateStack = new Array<State>();
        }
        addState(key, state) {
            this.gameStates[key] = state;
            //this.stateStack.push(state);
            //state.init();
        }
        pushState(state) {
            this.stateStack.push(state);
            state.init();
            //this.stateStack.push(this.gameStates[key]);
            //this.gameStates[key].init();
        }
        popState() {
            if (this.stateStack.length > 0 && this.time < Date.now()) {
                this.stateStack.pop();
                this.time = Date.now() + 100;
                if (this.stateStack.length > 0) {
                    var len = this.stateStack.length;
                    this.stateStack[len - 1].init();
                }
            }
        }
        updateStack() {
            var len = this.stateStack.length;
            this.stateStack[len - 1].update();
        }
        renderStack() {
            for (var s in this.stateStack) {
                s.render();
            }
        }/*
        switchGameState(state) {
            this.currentState = state;
        }
        getGameState() {
            return this.currentState;
        }
        switchInGameState(state) {
            this.currentInGameState = state;
        }
        getInGameState() {
            return this.currentInGameState;
        }
    }*/
    }
}

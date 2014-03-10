module Game {
    export class StateManager {
        currentInGameState = 0;
        currentInGameStateFunction = null;
        currentState = 0;
        currentStateFunction = null;
        //Mostly guesswork here, I am assuming none of this code will make it to the final thing
        //High on the list, will start getting through this ASAP with help from nick and/or the book
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
    }
}

var Game;
(function (Game) {
    var StateManager = (function () {
        function StateManager() {
            this.gameStates = [];
            this.stateStack = new Array();
        }
        StateManager.prototype.addState = function (key, state) {
            this.gameStates[key] = state;
        };
        StateManager.prototype.pushState = function (state) {
            this.stateStack.push(state);
            state.init();
        };
        StateManager.prototype.popState = function () {
            if (this.stateStack.length > 0) {
                this.stateStack.pop();
                if (this.stateStack.length > 0) {
                    var len = this.stateStack.length;
                    this.stateStack[len - 1].init();
                }
            }
        };
        StateManager.prototype.updateStack = function () {
            var len = this.stateStack.length;
            this.stateStack[len - 1].update();
        };
        StateManager.prototype.renderStack = function () {
            for (var s in this.stateStack) {
                s.render();
            }
        };
        return StateManager;
    })();
    Game.StateManager = StateManager;
})(Game || (Game = {}));

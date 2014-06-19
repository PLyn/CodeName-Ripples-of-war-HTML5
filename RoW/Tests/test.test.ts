/// <reference path="UnitTest.ts" /> 
/// <reference path="../Game/animation.ts"/>
module Game {
    class RoWTests {
        AttackTest(): void {
            Image i = new Image();
            var p1 = new Sprite("D", IMAGE_CACHE["D"], 0, 0);
            p1.setBaseAttributes("Test", 20, 10, 5, 10, 15, 2, 2, 1, 0);
            p1.growth = "+ + + + + + + +";
            var p2 = new Sprite("D", IMAGE_CACHE["D"], 0, 0);
            p2.setBaseAttributes("Test", 20, 10, 5, 10, 1, 2, 2, 1, 0);
            p2.growth = "+ + + + + + + +";


        }
    }
    var TestBase = {
        RegisterTestMethod: function (a, b, c) { }
    };
    TestBase.RegisterTestMethod(RowTests.prototype.AttackTest, "Select test", "Runs selection and stuff");
}
/// <reference path="UnitTest.ts" /> 
/// <reference path="../Game/animation.ts"/>
module Game {
    class RoWTests {
        AttackTest(): void {


        }
    }
    var TestBase = {
        RegisterTestMethod: function (a, b, c) { }
    };
    TestBase.RegisterTestMethod(RowTests.prototype.AttackTest, "Select test", "Runs selection and stuff");
}
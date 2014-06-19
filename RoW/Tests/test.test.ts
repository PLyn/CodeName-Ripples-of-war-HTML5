/// <reference path="unitTest.ts" /> 
class test{
	Select(): void{
		Assert.AreEqual(0, 1, "values must be equal"); 
	}
}

var TestBase = { 
    RegisterTestMethod: function (a, b, c) { } 
}; 
 
TestBase.RegisterTestMethod(test.prototype.Select, "Select test", "Runs selection and stuff"); 
new Test.Unit.Runner({
    testGetFunctionName: function(){
        function foo(){}
        function bar(){}

        this.assertEqual(subetha.getFunctionName(foo), 'foo');
    }
});
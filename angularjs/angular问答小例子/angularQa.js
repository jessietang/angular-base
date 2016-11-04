/**
 * Created by jessietang on 11/3/2016.
 */

var questions = [
    {
        id: 1,
        title: '1111111',
        content: 'aaaaa',
        voteCount: 2
    },
    {
        id: 2,
        title: '2222',
        content: 'bbbbb',
        voteCount: 3
    },
    {
        id: 3,
        title: '3333',
        content: 'ccccc',
        voteCount: 5
    }
];
var comFun = {
    questionSort: function(questions){
        questions.sort(function(a,b){
            return b.voteCount - a.voteCount;
        });
        return questions;
    }
};
var questionsNew = comFun.questionSort(questions);
var app = angular.module("myApp",[]);
    app.controller("qaController", ['$scope','$http', function($scope, $http){
        $scope.common = {
            showQaForm: false
        };
        $scope.field = {
            title: '',
            content: ''
        };
        $scope.questions = questionsNew;
        $scope.qaFormToggle = function(){
            $scope.common.showQaForm = !$scope.common.showQaForm;
        };
        $scope.submitForm = function($event){
            $event.preventDefault();
            var arr = {};
            var id = $scope.questions.length + 1;
            var title = $scope.field.title;
            var content = $scope.field.content;
            var voteCount = 0;
            arr.id = id;
            arr.title = title;
            arr.content = content;
            arr.voteCount = voteCount;
            $scope.questions.push(arr);
            $scope.field = {
                title: '',
                content: ''
            }; /*clear the input and textarea*/
            //console.log($scope.questions);
            comFun.questionSort($scope.questions);
        };

        $scope.voteUp = function($event){
            var target = $event.target;
            var id = target.getAttribute("qst-id");
            //console.log(id);
            //console.log($scope.questions);
            var index = 0;
            for(var item in $scope.questions){ /*it is necessary*/
                if($scope.questions[item].id == id){
                    index = item;
                }
            }
            if($scope.questions[index]){
                $scope.questions[index].voteCount += 1;
            }
            comFun.questionSort($scope.questions);
        };

        $scope.voteDown = function($event){
            var target = $event.target;
            var id = target.getAttribute("qst-id");
            var index = 0;
            for(var item in $scope.questions){ /*it is necessary*/
                if($scope.questions[item].id == id){
                    index = item;
                }
            }
            if($scope.questions[index]){
                $scope.questions[index].voteCount -= 1;
            }
            comFun.questionSort($scope.questions);
        };
    }])
    .directive('ngFocus',function(){ //自定义一个ngFocus指令 在写页面时，可能会遇到一样的、可重用的，就这样写，然后调用
        var FOCUS_CLASS = "ng-focused";
        return {
            restrict:'A', // A --> attribute属性
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl){
                ctrl.$focused = false;
                element.bind('focus', function(evt){
                    element.addClass(FOCUS_CLASS);
                    scope.$apply(function(){
                        ctrl.$focused = true;
                    });
                }).bind('blur', function(evt){
                    element.removeClass(FOCUS_CLASS);
                    scope.$apply(function(){
                        ctrl.$focused = false;
                    });
                });
            }
        };
    });
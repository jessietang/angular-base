/**
 * Created by jessietang on 7/28/2016.
 */

/** ==== the virtual data === **/

/*product data*/
var items = [
    {
        id:"1",
        name:"pen",
        price:20
    },
    {
        id:"2",
        name:"book",
        price:30
    },
    {
        id:"3",
        name:"keybord",
        price:40
    },
    {
        id:"4",
        name:"mouth",
        price:50
    },
    {
        id:"5",
        name:"food",
        price:60
    },
    {
        id:"6",
        name:"phone",
        price:70
    }

];

/* shopping cart list data */
var boughtList = {};

var common = {
    getTotal: function(){
        var total = 0;
        for(var i in boughtList){
            total += boughtList[i].num * boughtList[i].price;
        }
        return total;
    }
};
var app = angular.module("myApp",[]);
app.controller("showItem", function($scope){
    $scope.items = items;
    $scope.boughtList = boughtList;
    $scope.total = 0;
    $scope.buyAction = function($event){
        var target = $event.target;
        var id = target.getAttribute("item-id");
        if(boughtList[id]){
            boughtList[id].num += 1;
        }else{
            var arr = [];
            arr.id = id;
            arr.price = target.getAttribute("price");
            arr.name = target.getAttribute("name");
            arr.num = 1;
            boughtList[id] = arr;
        }
        $scope.total = common.getTotal();
    };

    $scope.removeItem = function($event){
        var target = $event.target;
        var id = target.getAttribute("item-id");
        var thisNode = document.getElementById("shopping-cart-list");
        target.parentNode.parentNode.parentNode.removeChild(thisNode);
        if(boughtList[id]){
            delete boughtList[id];
        }
        $scope.total = common.getTotal();
    };

    $scope.addItem = function($event,num){
        var id = $event.target.parentNode.getAttribute("item-id");
        boughtList[id].num = num + 1;
        $scope.total = common.getTotal();
    };

    $scope.substractItem = function($event, num){
        var id = $event.target.parentNode.getAttribute("item-id");
        boughtList[id].num = num - 1;
        $scope.total = common.getTotal();
    };

    $scope.changeItem = function($event, num){
        var id = $event.target.parentNode.getAttribute("item-id");
        boughtList[id].num = num;
        $scope.total = common.getTotal();
    };
});
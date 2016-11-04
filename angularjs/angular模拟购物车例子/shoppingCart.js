/**
 * Created by jessietang on 11/2/2016.
 */

var proItems = [
    {
        id: 1,
        name: "pen",
        price: 200
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

//使用任何一种语言创建一个服务端：
/*public class ShoppingCar
{
    public string Title { get; set; }
public decimal UnitPrice { get; set; }
public int Count { get; set; }
}

复制代码

public ActionResult GetCar()
{
    List<ShoppingCar> cars = new List<ShoppingCar>
        {
            new ShoppingCar { Title="苹果",Count=1,UnitPrice=2.5m},
    new ShoppingCar { Title="香蕉",Count=3,UnitPrice=1.5m},
    new ShoppingCar { Title="苦瓜",Count=1,UnitPrice=3.5m},
    new ShoppingCar { Title="黄瓜",Count=3,UnitPrice=2.2m}
};
return Json(cars,JsonRequestBehavior.AllowGet);
}

public ActionResult AddCar(List<ShoppingCar> car)
{
    return Json("ok", JsonRequestBehavior.AllowGet);
}*/


var boughtList = {};
var common = {
    getTotal: function(){
        var total = 0;
        for(var i in boughtList){
            total += boughtList[i].price * boughtList[i].num;
        }
        return total;
    }
};
var app = angular.module("myApp",[]);
app.controller("showItem", ['$scope','$http',function($scope, $http){
    $scope.proItems = proItems;
    $scope.boughtList = boughtList;
    $scope.total = 0;
   /* var GetCar = function () {
        $http.get('/Employee/GetCar')
            .success(function (response) {
                $scope.boughtList = response; //正常来说应该从后台获取shopping cart数据
                GetTotal();
            });
    }*/
    $scope.buyAction = function($event){
        var target = $event.target;
        var id = target.getAttribute("item-id");
        if(boughtList[id]){
            boughtList[id].num += 1;
        }else{
            var arr = [];
            arr.id = id;
            arr.name = target.getAttribute("item-name");
            arr.price = target.getAttribute("item-price");
            arr.num = 1;
            boughtList[id] = arr;
        }
        $scope.total = common.getTotal();
    };

    $scope.removeItem = function($event){
        var target = $event.target;
        var id = target.getAttribute("buy-id");
        var delItem = target.parentNode.parentNode;
        target.parentNode.parentNode.parentNode.removeChild(delItem);
        if(boughtList[id]){
            delete boughtList[id];
        }
        $scope.total = common.getTotal();
    };

    $scope.addItem = function($event, num){
        var target = $event.target;
        var id = target.getAttribute("buy-id");
        if(boughtList[id]){
            boughtList[id].num = num + 1;
        }
        $scope.total = common.getTotal();
    };

    $scope.substractItem = function($event, num){
        var target = $event.target;
        var id = target.getAttribute("buy-id");
        if(boughtList[id]){
            boughtList[id].num = num -1;
        }
        $scope.total = common.getTotal();
    };

    $scope.changeItem = function($event, num){
        var id = $event.target.parentNode.getAttribute("item-id");
        if(boughtList[id]){
            boughtList[id].num = num;
        }
        $scope.total = common.getTotal();
    };

    /*$scope.submit = function(){
        $http.post('/Employee/AddCar', $scope.boughtList)
            .success(function(response){
                alert(response);
            });
    };
    GetCar();*/


}]);
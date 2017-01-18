/**
 * Created by bjwsl-001 on 2016/12/9.
 */
var app=angular.module('mrbf',['ionic']);
app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('start',{
        url:"/start",
        templateUrl:"tpl/01_start.html",controller:'mainCtrl'
    }).state('main',{
        url:"/main/:id",
        templateUrl:"tpl/02_main.html",controller:'classListCtrl'
    }).state('detail',{
        url:"/detail/:id",
        templateUrl:"tpl/03_detail.html",controller:'detailCtrl'
    }).state('order',{
        url:'/order/:id',
        templateUrl:'tpl/04_order.html',controller:'orderCtrl'
    }).state('orderdata',{
        url:'/order/:data',
        templateUrl:'tpl/04_order.html',controller:'orderCtrl'
    }).state('usercenter',{
        url:'/usercenter',
        templateUrl:'tpl/05_usercenter.html',controller:'userCenterCtrl'
    }).state('orderlist',{
        url:'/orderlist/:status',
        templateUrl:'tpl/06_orderlist.html',controller:'orderListCtrl'
    }).state('cart',{
        url:'/cart',
        templateUrl:'tpl/07_cart.html',controller:'cartCtrl'
    });
    $urlRouterProvider.otherwise('start');
});

app.run(function($http){
    $http.defaults.headers.post=
    {'Content-type':'application/x-www-form-urlencoded'};
});

app.controller('commonCtrl',['$scope','$rootScope','$location','$state','$ionicHistory',function($scope,$rootScope,$location,$state,$ionicHistory){
    $rootScope.$on('$locationChangeSuccess',function(e){
        $scope.routeUrl=$location.path().split('/')[1];
    });
    $scope.jump=function(state,arg){
        if(arg){
            $state.go(state,arg);
        }else{
            $state.go(state);
        }
    };
    $rootScope.goBack=function(){
        //$ionicHistory.goBack();
        window.history.back();
        console.log(window.history);
    };
    $rootScope.userId=1;
}]);
//调用php查找数据
app.controller('mainCtrl',['$scope','$http',function($scope,$http){
    $scope.hasMore=true;
    $scope.inputText={kw:''};
    $scope.$watch('inputText.kw',function(){
        //console.log($scope.inputText.kw);
        if($scope.inputText.kw){
            $http.get('data/bf_getbykw.php?kw='+$scope.inputText.kw)
                .success(function(data){
                    if(data){
                        $scope.dishList=data;
                    }
                })
        }
    });
    $http.get('data/bf_getbyclass.php')
        .success(function (data) {
            $scope.dishList=data;
        });
}]);

//菜单列表
app.controller('classListCtrl',['$scope','$http','$stateParams',function($scope,$http,$stateParams){
    $http.get('data/bf_getbydid.php?did='+$stateParams.id).success(function(data){
        $scope.dish=data;
    });
    //添加购物车，数量1
    $scope.addToCart=function(id){
        console.log(id);
        var pid=id.id;
        $http.get('data/bf_addTocart.php?pid='+pid).success(function(data){
            alert('添加购物车成功');
        });
    }
}]);



//detail页面
app.controller('detailCtrl',['$scope','$rootScope','$http','$stateParams','$ionicModal',function($scope,$rootScope,$http,$stateParams,$ionicModal){
    console.log(222);
    $scope.order_dish_count=1;
    $http.get('data/bf_getbyid.php?id='+$stateParams.id).success(function(data){
        $scope.dishDetail=data[0];
        $scope.order_dish_data=$scope.dishDetail.pid+"&"+$scope.order_dish_count;
    });


    //产品下单卡：模态框
    $ionicModal.fromTemplateUrl('order_card_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $rootScope.modalOrder = modal;
    });
    $rootScope.openModal = function() {
        $rootScope.modalOrder.show();
    };
    $rootScope.closeModal = function() {
        $rootScope.modalOrder.hide();
    };
    $rootScope.$on('$destroy', function() {
        $rootScope.modalOrder.remove();
    });

    //产品下单卡：操作
    //$scope.order_dish_data=$scope.dishPid+"&"+$scope.order_dish_count;
    $scope.order_minus=function(){
        if($scope.order_dish_count!==1){
            $scope.order_dish_count--;
        }
        $scope.order_dish_data=$scope.dishDetail.pid+"&"+$scope.order_dish_count;
    };
    $scope.order_plus=function(){
        if($scope.order_dish_count<$scope.dishDetail.ocount){
            $scope.order_dish_count++;
        }
        $scope.order_dish_data=$scope.dishDetail.pid+"&"+$scope.order_dish_count;
    };

    //加入购物车,带数量
    $scope.addToCart=function(id){
        var pid=id.id;
        var count=$scope.order_dish_count;
        if(count<1||count>$scope.dishDetail.ocount){
            alert('数值超出范围');
        }else{
            $http.get('data/bf_addTocart.php?pid='+pid+'&count='+count);
            alert('添加购物车成功');
        }

    };
    //立即购买：直接跳转传参
    $scope.orderJump=function(data){
        var count=$scope.order_dish_count;
        if(count<1||count>$scope.dishDetail.ocount){
            alert('数值超出范围');
        }else{
            $scope.jump('orderdata',{data:data});
        }
    }
}]);


//cart页面
app.controller('cartCtrl',['$scope','$rootScope','$http',function($scope,$rootScope,$http){

    //计算总价
    $rootScope.cartTotalPrice=0;
    $scope.getTotalPrice=function(){
        $rootScope.cartTotalPrice=0;
        $scope.cartList.map(function(obj){
            if(obj.onchecked){
                $rootScope.cartTotalPrice+=obj.scount*parseFloat(obj.cartList[0].price);
            }
        });
    };

    //加载购物车
    $http.get('data/bf_getbycart.php?uid='+$rootScope.userId).success(function(data){
        $http.get('data/bf_cartDetailCheckedUpdata.php?uid='+$rootScope.userId+'&onchecked='+0);
        $scope.cartList=data;
        $rootScope.dish_choose();
        $scope.getTotalPrice();
    });
    //页面跳转时将选项全部重置为false
    //$rootScope.$on('$locationChangeSuccess',function(e){
    //    $http.get('data/bf_cartDetailCheckedUpdata.php?uid='+$rootScope.userId+'&onchecked='+0);
    //});

    //选择
    $rootScope.has_choose=false;    //表示是否有选择
    $rootScope.watch={'allChecked':false};  //全选按钮的状态
    $rootScope.dish_choose=function(onchecked){
        $http.post('data/bf_cartDetailCheckedUpdata.php','uid='+$rootScope.userId+'&onchecked='+onchecked);
        $scope.cartList.forEach(function(obj){
            obj.onchecked=$rootScope.watch.allChecked;
        });
        if($rootScope.watch.allChecked){
            $rootScope.has_choose=true;
        }else{
            $rootScope.has_choose=false;
        }
        $scope.getTotalPrice();
    };
    $scope.dish_choose_one=function(id,onchecked){
        $http.get('data/bf_cartDetailCheckedUpdata.php?did='+id+'&onchecked='+onchecked);
        for(var i=0;i<$scope.cartList.length;i++){
            if(!$scope.cartList[i].onchecked){
                $rootScope.watch.allChecked=false;
                break;
            }
            $rootScope.watch.allChecked=true;
        }
        for(var j=0;j<$scope.cartList.length;j++){
            if($scope.cartList[j].onchecked){
                $rootScope.has_choose=true;
                break;
            }
            $rootScope.has_choose=false;
        }
        $scope.getTotalPrice();
    };
    //判断后尝试跳转到订单
    $rootScope.jumpToOrder=function(){
        if($rootScope.has_choose){
           $scope.jump('order');
        }else{
            alert('您还没有选择商品哦');
        }
    };

    //编辑购物车
    $scope.onEdit=false;
    $scope.edit_txt="编辑";
    $scope.cart_edit=function(){
        if(!$scope.onEdit){
            $scope.onEdit=true;
            $scope.edit_txt="完成";
            $rootScope.watch={'allChecked':false};
            $rootScope.dish_choose();
        }else{
            $scope.onEdit=false;
            $scope.edit_txt="编辑";
        }
    };
    //购物车点击增加数量
    $scope.count_plus=function(id){
        //console.log(id);
        for(var i=0;i<$scope.cartList.length;i++){
            if($scope.cartList[i].did==id){
                $scope.cartList[i].scount++;
                //console.log($scope.cartList[i].scount);
                $http.get('data/bf_cartDetailCountupdata.php?pid='+id+'&count='+$scope.cartList[i].scount).success(function(data){
                    //console.log(data);
                });
                return;
            }
        }
    };
    //购物车点击减少数量
    $scope.count_minus=function(id){
        for(var i=0;i<$scope.cartList.length;i++){
            if(($scope.cartList[i].did==id)&&($scope.cartList[i].scount>0)){
                $scope.cartList[i].scount--;
                $http.get('data/bf_cartDetailCountupdata.php?pid='+id+'&count='+$scope.cartList[i].scount);
                return;
            }
        }
    };
    //手动输入数量触发事件
    $scope.count_change=function(count){
        for(var i=0;i<$scope.cartList.length;i++){
            console.log($scope.cartList[i].did);
            if(count>0){
                $http.get('data/bf_cartDetailCountupdata.php?pid='+$scope.cartList[i].did+'&count='+count);
                return;
            }
        }
    };
    //购物车删除数据
    $scope.cart_del=function(did){
        console.log('要删除的购物车数据是'+did);
        $http.get('data/bf_deleteCart.php?did='+did).success(function(data){
            $scope.cartList=data;
        });
    };

}]);

//order页面
app.controller('orderCtrl',['$scope','$rootScope','$http','$stateParams','$ionicModal',function($scope,$rootScope,$http,$stateParams,$ionicModal){
    $rootScope.totalPrice=0;
    $rootScope.valid_order=false;
    $scope.order_way=0;
    if(!$stateParams.data&&!$rootScope.has_choose){
        $scope.jump('cart');
    }

    if($stateParams.data){
        //立即购买：根据产品ID下单
        $scope.order_way=1;
        $scope.order_dish_id=$stateParams.data.split("&")[0];
        $scope.order_dish_count=$stateParams.data.split("&")[1];
        $http.get('data/bf_getbyid.php?id='+$scope.order_dish_id).success(function(data){
            $scope.order_dish=data;
            $scope.order_dish[0].scount=$scope.order_dish_count;
            $scope.getTotalPrice();
        });
    }else{
        //通过购物车下单
        $scope.order_way=2;
        $http.get('data/bf_order_getbycart.php?uid='+$rootScope.userId).success(function(data){
            console.log(data);
            $scope.order_dish=data;
            $scope.getTotalPrice();
        });
    }

    //计算总价
    $scope.getTotalPrice=function(){
        $scope.order_dish.map(function(obj){
            $rootScope.totalPrice+=obj.scount*parseInt(obj.price);
        });
    };

    //添加地址-模态框
    $ionicModal.fromTemplateUrl('add_addr_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $rootScope.modalAddr = modal;
    });
    $rootScope.openModal = function() {
        $rootScope.modalAddr.show();
    };
    $rootScope.closeModal = function() {
        $rootScope.modalAddr.hide();
    };
    $rootScope.$on('$destroy', function() {
        $rootScope.modalAddr.remove();
    });

    $scope.watchInfo={'user_name':'','user_phone':'','user_addr':'','user_msg':''};
    $scope.hasInfo=false;
    $scope.saveInfo=function(){
        if(userName.validity.valid&&userPhone.validity.valid&&userAddr.validity.valid){
            $rootScope.valid_order=true;
            $scope.hasInfo=true;
            $rootScope.closeModal();
        }else{
            alert('您提交的送货信息有误，请重新填写！');
        }
    };
    $rootScope.submit_order=function(){
        if($scope.hasInfo&&user_msg.validity.valid){
            if($scope.watchInfo.user_msg){
                $scope.watchInfo.user_msg="无"
            }
            $scope.str=`uname=${$scope.watchInfo.user_name}&phone=${$scope.watchInfo.user_phone}&addr=${$scope.watchInfo.user_addr}&msg=${$scope.watchInfo.user_msg}&totalPrice=${$scope.totalPrice}&uid=${$rootScope.userId}`;
            $http.post('data/bf_orderAdd.php',$scope.str).success(function(data){
                console.log(data);
                var str="";
                if($scope.order_way==1){
                    str=`oid=${data.oid}&pid=${$scope.order_dish_id}&scount=${$scope.order_dish_count}`;
                    console.log(str);
                    $http.post('data/bf_orderDetailAdd.php',str).success(function(data){
                        $scope.interim_order_id=data;
                        console.log($scope.interim_order_id);
                    });
                }else{
                    str=`oid=${data.oid}&uid=${$rootScope.userId}`;
                    $http.post('data/bf_orderDetailAdd.php',str).success(function(data){
                        $scope.interim_order_id=data;
                        console.log($scope.interim_order_id);
                    });
                }
                $scope.jump('orderlist',{status:5});
            });
        }else{
            alert('请填写完整的订单信息！');
        }

    }
}]);

//orderlist页面
app.controller('orderListCtrl',['$scope','$http','$rootScope','$stateParams',function($scope,$http,$rootScope,$stateParams){
    $http.get('data/bf_getOrderStatusDetail.php?uid='+$rootScope.userId+'&status='+$stateParams.status).success(function(data){
        $scope.orderList=data;
    });
}]);

//usercenter页面
app.controller('userCenterCtrl',['$scope','$http',function($scope,$http){
    $http.get('data/bf_getOrderStatus.php').success(function(data){
        $scope.orderStatus=data;
    });
}]);
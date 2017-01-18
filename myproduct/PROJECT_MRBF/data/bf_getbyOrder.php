<?php
header('Content-Type:application/json;charset=UTF-8');
@$uid = $_REQUEST['uid'];
//if(empty($pid)){
//echo '[]';
//return;
//}
$output=[];
$oidput=[];
require('0_init.php');
$sql="SELECT oid,order_time,msg,totalPrice,status FROM bf_order WHERE uid='$uid'";
$result=mysqli_query($conn,$sql);
$output=mysqli_fetch_all($result,MYSQLI_ASSOC);
//foreach($oidput as $i=>$oidlist){
//    $oid=$oidput[$i][oid];
//    $sql="SELECT * FROM bf_order_detail WHERE oid IN (SELECT oid FROM bf_order_detail WHERE oid='$oid')";
//    $result = mysqli_query($conn,$sql);
//    $orderList = mysqli_fetch_all($result,MYSQLI_ASSOC);
//    $oidput[$i]['orderList']=$orderList;
//}


//$sql="SELECT * FROM bf_order_detail";
//$result=mysqli_query($conn,$sql);
//$output=mysqli_fetch_all($result,MYSQLI_ASSOC);
////var_dump($output);
    foreach($output as $i=>$order){
        $oid=$output[$i]['oid'];
        $sql="SELECT * FROM bf_product WHERE pid IN (SELECT pid FROM bf_order_detail WHERE oid='$oid')";
        $result = mysqli_query($conn,$sql);
        $cartList = mysqli_fetch_all($result,MYSQLI_ASSOC);
        $output[$i]['cartList']=$cartList;
    };
echo json_encode($output);
?>
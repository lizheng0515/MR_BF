<?php
header('Content-Type:application/json;charset=UTF-8');
@$uid = $_REQUEST['uid'];
if($uid==null)
{
    echo [];
    return;
}
$output=[];
require('0_init.php');

 $sql="SELECT sid FROM bf_scart WHERE uid='$uid'";
 $result=mysqli_query($conn,$sql);
 $sid=mysqli_fetch_assoc($result);
 //var_dump($sid);
 $sid=(int)$sid;
$sql="SELECT * FROM bf_cart WHERE sid='$sid'";
$result=mysqli_query($conn,$sql);
$output=mysqli_fetch_all($result,MYSQLI_ASSOC);
//var_dump($output);
    foreach($output as $i=>$order){
        $productId=$output[$i]['productId'];
        $sql="SELECT * FROM bf_product WHERE pid IN (SELECT productId FROM bf_cart WHERE productId=$productId)";
        $result = mysqli_query($conn,$sql);
        $cartList = mysqli_fetch_all($result,MYSQLI_ASSOC);
        $output[$i]['cartList']=$cartList;
    };
echo json_encode($output);
?>
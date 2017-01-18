<?php
header('Content-Type:application/json');
@$productId = $_REQUEST['pid'];
@$count = $_REQUEST['count'];
$output = [];

if(empty($count))
{$count=1;}


if(empty($productId))
{
    echo '[]';
    return;
}
require('0_init.php');
$sql="SELECT productId FROM bf_cart WHERE productId='$productId'";
$result=mysqli_query($conn,$sql);
$pid=mysqli_fetch_assoc($result);
if($pid){
    $sql="SELECT scount FROM bf_cart WHERE productId='$productId'";
    $result=mysqli_query($conn,$sql);
    $scount=mysqli_fetch_assoc($result);
//    var_dump((int)$scount['scount']);
    $scount=(int)$scount['scount']+(int)$count;
    $sql="UPDATE bf_cart SET scount='$scount' WHERE productId='$productId'";
    $result=mysqli_query($conn,$sql);
}else{
    $sql="INSERT INTO bf_cart VALUES(NULL,'$productId','$count',false,1)";
    $result=mysqli_query($conn,$sql);
}
$argument=[];
if($result){
//    $argument['did']=mysqli_insert_id($conn);
    $argument['msg']='succ';
}else{
    $argument['msg']='err';
    $argument['reason']='insert err';
}
$output=$argument;
//var_dump($output);
echo json_encode($output);
?>
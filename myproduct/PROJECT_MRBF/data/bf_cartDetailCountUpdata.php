<?php
header('Content-Type:application/json');
@$cartId = $_REQUEST['pid'];
@$count = $_REQUEST['count'];
$output = [];

if(empty($count))
{$count=1;}
if(empty($cartId))
{
    echo '[]';
    return;
}
require('0_init.php');
    $sql="UPDATE bf_cart SET scount='$count' WHERE did=$cartId";
    $result=mysqli_query($conn,$sql);
if($result){
    $argument['msg']='succ';
}else{
    $argument['msg']='err';
    $argument['reason']='insert err';
}
$output=$argument;
echo json_encode($output);
?>
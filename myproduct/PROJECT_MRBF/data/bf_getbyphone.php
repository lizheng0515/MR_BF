<?php
header('Content-Type:application/json');
@$phone = $_REQUEST['phone'];
if(empty($phone))
{
    echo '[]';
    return;
}
$output = [];
require('0_init.php');
$sql = "SELECT kf_order.oid,kf_order.user_name,kf_order.order_time,kf_dish.img_sm FROM kf_order ,kf_dish WHERE kf_order.did=kf_dish.did AND kf_order.phone='$phone'";
$result=mysqli_query($conn,$sql);
$output=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($output);
?>
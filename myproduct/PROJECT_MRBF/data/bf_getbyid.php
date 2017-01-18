<?php
header('Content-Type:application/json;charset=UTF-8');
@$id=$_REQUEST['id'];
if(empty($id)){
    echo '[]';
    return;
}
$output=[];
require('0_init.php');
$sql="SELECT * FROM bf_product WHERE pid='$id'";
$result=mysqli_query($conn,$sql);
$output=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($output);
?>
<?php
header('Content-Type:application/json;charset=UTF-8');
$output=[];
require('0_init.php');
$sql="SELECT * FROM bf_class";
$result=mysqli_query($conn,$sql);
$output=mysqli_fetch_all($result,MYSQLI_ASSOC);
//var_dump($orderList);
    foreach($output as $i=>$order){
        $cid=$output[$i]['cid'];
        $sql="SELECT lid,pic FROM bf_classList WHERE cid IN (SELECT cid FROM bf_class WHERE cid=$cid)";
        $result = mysqli_query($conn,$sql);
        $classList = mysqli_fetch_all($result,MYSQLI_ASSOC);
        $output[$i]['classList']=$classList;
    };
echo json_encode($output);
?>

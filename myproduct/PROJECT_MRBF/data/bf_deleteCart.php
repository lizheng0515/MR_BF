<?php
header('Content-Type:application/json');
@$did = $_REQUEST['did'];
$output = [];
if(empty($did))
{
    echo '[]';
    return;
}
require('0_init.php');
    $sql="DELETE  FROM bf_cart WHERE did=$did";
    $result=mysqli_query($conn,$sql);
if($result){
    $sql="SELECT * FROM bf_cart";
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
}else{
    echo err;
}
?>



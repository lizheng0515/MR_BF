<?php
header('Content-Type:application/json;charset=UTF-8');
  @$uid = $_REQUEST['uid'];
  if($uid==null)
  {
      echo [];
      return;
  }
  @$status=$_REQUEST['status'];
  $output=[];
  require('0_init.php');
  if(empty($status)){
       echo '[]';
       return;
  }


   if($status == 5){
         $sql="SELECT * FROM bf_order WHERE uid='$uid'";
         $result=mysqli_query($conn,$sql);
         $output=mysqli_fetch_all($result,MYSQLI_ASSOC);
    }else{
        $sql="SELECT oid,phone,uname,addr,order_time,totalPrice,uid,status FROM bf_order WHERE status='$status' AND uid='$uid'";
        $result=mysqli_query($conn,$sql);
        $output=mysqli_fetch_all($result,MYSQLI_ASSOC);
    }

    foreach($output as $i=>$order){
            $oid=$output[$i]['oid'];
            $sql="SELECT * FROM bf_product WHERE pid IN (SELECT pid FROM bf_order_detail WHERE oid='$oid')";
            $result = mysqli_query($conn,$sql);
            $cartList = mysqli_fetch_all($result,MYSQLI_ASSOC);
            $output[$i]['cartList']=$cartList;
        };
echo json_encode($output);
?>
<?php
  header('Content-Type:application/json;charset=UTF-8');
//  @$uid=$_REQUEST['uid'];
//  if(empty($oid)){
//        $oid=1;
//  }
  $output=[];
  require('0_init.php');
  for($i=1;$i<5;$i++){
    $sql="SELECT COUNT(*) FROM bf_order WHERE status= $i";
    $result=mysqli_query($conn,$sql);
    $status=mysqli_fetch_row($result);
    $output[$i]=$status;
  }
  echo json_encode($output);
?>
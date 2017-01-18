<?php
	header('Content-Type:application/json;charset=UTF-8');
	@$oid = $_REQUEST['oid'] or die('{"msg":"err"}');
	@$uid = $_REQUEST['uid'];
	@$pid=$_REQUEST['pid'];
	@$scount=$_REQUEST['scount'];

	$output=[];
	require('0_init.php');
	
	if($uid){
		$sql="SELECT sid FROM bf_scart WHERE uid='$uid'";
		$result=mysqli_query($conn,$sql);
		$sid=mysqli_fetch_assoc($result);
		$sid=(int)$sid;

		$sql="SELECT did,productId,scount FROM bf_cart WHERE sid='$sid' AND onchecked=1";
		$result=mysqli_query($conn,$sql);
		$list=mysqli_fetch_all($result,MYSQLI_ASSOC);

		foreach($list as $data){
			$sql="INSERT INTO bf_order_detail VALUES(NULL,$data[productId],$data[scount],$oid)";
			$result=mysqli_query($conn,$sql);
			if($result){
				array_push($output,mysqli_insert_id($conn));
			}
			$sql="DELETE FROM bf_cart WHERE did=$data[did]";
			$result=mysqli_query($conn,$sql);
		};
	}else{
		$sql="INSERT INTO bf_order_detail VALUES(NULL,$pid,$scount,$oid)";
		$result=mysqli_query($conn,$sql);
		if($result){
			array_push($output,mysqli_insert_id($conn));
		}
	}
	echo json_encode($output);
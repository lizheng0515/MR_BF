<?php
	header('Content-Type:application/json;charset=UTF-8');
	@$uid = $_REQUEST['uid'] or die('{"msg":"err"}');

	$output=[];
	require('0_init.php');
	
	$sql="SELECT sid FROM bf_scart WHERE uid='$uid'";
	$result=mysqli_query($conn,$sql);
	$sid=mysqli_fetch_assoc($result);
	$sid=(int)$sid;

	$sql="SELECT * FROM bf_cart,bf_product WHERE sid='$sid' AND onchecked=1 AND productId=pid";	//跨表查询
	$result=mysqli_query($conn,$sql);
	$output=mysqli_fetch_all($result,MYSQLI_ASSOC);
	
	echo json_encode($output);

	
<?php
	header('Content-Type:application/json');
	@$cartId = $_REQUEST['did'];
	@$uid=$_REQUEST['uid'];
	@$onchecked = $_REQUEST['onchecked'];
	$output = [];

	require('0_init.php');
	if($cartId){
		$sql="UPDATE bf_cart SET onchecked=$onchecked WHERE did=$cartId";
	}else if($uid){
		$sql="UPDATE bf_cart SET onchecked=$onchecked WHERE sid=(SELECT sid FROM bf_scart WHERE uid=$uid)";
	}
	$result=mysqli_query($conn,$sql);

	if($result){
		$argument['msg']='succ';
	}else{
		$argument['msg']='err';
		$argument['reason']='insert err';
	}

	$output=$argument;
	echo json_encode($output);
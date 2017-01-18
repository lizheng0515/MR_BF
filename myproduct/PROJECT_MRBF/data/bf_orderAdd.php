<?php
	header('Content-Type:application/json;charset=UTF-8');
	date_default_timezone_set('PRC');
	@$uname = $_REQUEST['uname'];
	@$phone = $_REQUEST['phone'];
	@$addr = $_REQUEST['addr'];
	@$msg = $_REQUEST['msg'];
	@$totalPrice=$_REQUEST['totalPrice'];
	@$uid = $_REQUEST['uid'];
	
	$order_time = time()*1000;
	$status=1;

	$output = [];
	if(empty($uname) || empty($totalPrice)
	|| empty($phone) || empty($addr)
	||empty($uid))
	{
		echo '{"msg":"err"}';
		return;
	}
	if(empty($msg)){
		$msg="无留言信息";
	}
	require('0_init.php');

	$sql="INSERT INTO bf_order VALUES(NULL,'$phone','$uname','$addr','$msg',$order_time,$totalPrice,$uid,$status)";
	$result=mysqli_query($conn,$sql);
	$argument=[];
	if($result){
		$argument['oid']=mysqli_insert_id($conn);
		$argument['msg']='succ';
	}else{
		$argument['msg']='err';
		$argument['reason']='insert err';
	}
	$output=$argument;
	echo json_encode($output);
<?php
header('Content-Type:application/json');
@$kw=$_REQUEST['kw'];
if(empty($kw))
{
    echo '[]';
    return;
}
$output=[];
require('0_init.php');
$sql="SELECT * FROM bf_product WHERE pname LIKE '%$kw%'";
$result=mysqli_query($conn,$sql);
$output=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($output);
?>
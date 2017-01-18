SET NAMES UTF8;
DROP DATABASE IF EXISTS bf;
CREATE DATABASE bf CHARSET=UTF8;
USE bf;

# 用户表
CREATE TABLE bf_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(16),
	uphone VARCHAR(32)
);

INSERT INTO bf_user VALUES
(1,'cctv','13811111111'),
(2,'mtv','13500000000');

# 产品类别表
CREATE TABLE bf_class(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(16),
	pic VARCHAR(64)
);

INSERT INTO bf_class VALUES
(1,'sushi','sushi.jpg'),
(2,'sashimi','sashimi.gif'),
(3,'salad','salad.gif'),
(4,'beef','beef.gif');

# 二级表
CREATE TABLE bf_classList(
	lid INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(16),
	pic VARCHAR(64),
	cid INT
);
INSERT INTO bf_classList VALUES
(1,'寿司自选','sushi_zx.gif',1),
(2,'寿司拼盘','sushi_pp.gif',1),
(3,'刺身自选','sashimi_zx.gif',2),
(4,'刺身拼盘','sashimi_pp.gif',2),
(5,'沙拉自选','salad_zx.gif',3),
(6,'沙拉固搭','salad_gd.gif',3),
(7,'澳洲牛扒','beef_az.gif',4),
(8,'牛扒套装','beef_tz.gif',4);

# 商品表
CREATE TABLE bf_product(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	pname VARCHAR(16),
	price FLOAT(8,2),
	pic VARCHAR(64),
	pic_intro VARCHAR(64),
	ocount INT,
	soldcount INT,
	cid INT
);

INSERT INTO bf_product VALUES
(NULL,'（生）挪威三文鱼柳寿司',14.00,'sushi_s1.jpg','sushi_s1_intro.jpg',50,15,1),
(NULL,'（生）挪威三文鱼腩寿司',16.00,'sushi_s2.jpg','sushi_s2_intro.jpg',50,15,1),
(NULL,'（生）加拿大北极贝寿司',14.00,'sushi_s3.jpg','sushi_s3_intro.jpg',50,15,1),
(NULL,'（生）北极甜虾寿司',16.00,'sushi_s4.jpg','sushi_s4_intro.jpg',50,15,1),
(NULL,'（生）挪威三文花之恋',18.00,'sushi_s5.jpg','sushi_s5_intro.jpg',50,15,1),
(NULL,'（生）挪威三文双鱼之恋',24.00,'sushi_s6.jpg','sushi_s6_intro.jpg',50,15,1),
(NULL,'（生）挪威三文鱼虾之恋',24.00,'sushi_s7.jpg','sushi_s7_intro.jpg',50,15,1),
(NULL,'（生）海盐特大带子寿司',18.00,'sushi_s8.jpg','sushi_s8_intro.jpg',50,15,1),
(NULL,'（熟）炙烧玉子烧寿司',12.00,'sushi_su1.jpg','sushi_su1_intro.jpg',50,15,1),
(NULL,'（熟）吞拿鱼沙律寿司',12.00,'sushi_su2.jpg','sushi_su2_intro.jpg',50,15,1),
(NULL,'（熟）炙烧鳗鱼寿司',14.00,'sushi_su3.jpg','sushi_su3_intro.jpg',50,15,1),
(NULL,'【玖折】寿司礼盘-贰贰捌 ',228.00,'sushi_pp1.jpg','sushi_pp1_intro.jpg',50,15,2),
(NULL,'【玖折】寿司礼盘-贰肆捌 ',248.00,'sushi_pp2.jpg','sushi_pp2_intro.jpg',50,15,2),
(NULL,'【玖折】寿司礼盘-壹零捌 ',108.00,'sushi_pp3.jpg','sushi_pp3_intro.jpg',50,15,2),
(NULL,'【玖折】寿司礼盘-贰陆捌 ',268.00,'sushi_pp4.jpg','sushi_pp4_intro.jpg',50,15,2),
(NULL,'【玖折】寿司礼盘-捌捌 ',88.00,'sushi_pp5.jpg','sushi_pp5_intro.jpg',50,15,2),
(NULL,'【玖折】寿司礼盘-玖捌',98.00,'sushi_pp6.jpg','sushi_pp6_intro.jpg',50,15,2),
(NULL,'挪威三文鱼柳',38.00,'sashimi_zx1.jpg','sashimi_zx1_intro.jpg',50,15,3), #刺身自选
(NULL,'挪威三文鱼腩',38.00,'sashimi_zx2.jpg','sashimi_zx2_intro.jpg',50,15,3),
(NULL,'挪威三文鱼柳腩',42.00,'sashimi_zx3.jpg','sashimi_zx3_intro.jpg',50,15,3),
(NULL,'北极甜虾',42.00,'sashimi_zx4.jpg','sashimi_zx4_intro.jpg',50,15,3),
(NULL,'加拿大北极贝',42.00,'sashimi_zx5.jpg','sashimi_zx5_intro.jpg',50,15,3),
(NULL,'【玖折】刺身礼盘-贰捌捌',288.00,'sashimi_pp1.jpg','sashimi_pp1_intro.jpg',50,15,4),#刺身拼盘
(NULL,'【玖折】刺身礼盘-玖捌',98.00,'sashimi_pp2.jpg','sashimi_pp2_intro.jpg',50,15,4),
(NULL,'【玖折】刺身礼盘-壹零捌',108.00,'sashimi_pp3.jpg','sashimi_pp3_intro.jpg',50,15,4),
(NULL,'【玖折】刺身礼盘-贰伍捌',258.00,'sashimi_pp4.jpg','sashimi_pp4_intro.jpg',50,15,4),
(NULL,'【玖折】刺身礼盘-叁肆捌',348.00,'sashimi_pp5.jpg','sashimi_pp5_intro.jpg',50,15,4),
(NULL,'【玖折】刺身礼盘-壹贰捌',128.00,'sashimi_pp6.jpg','sashimi_pp6_intro.jpg',50,15,4),
(NULL,'沙拉自选酱料',2.00,'salad_zx1.jpg','salad_zx1_intro.jpg',50,15,5), #沙拉自选
(NULL,'罗莎红',5.00,'salad_zx2.jpg','salad_zx2_intro.jpg',50,15,5),
(NULL,'罗莎绿 ',5.00,'salad_zx3.jpg','salad_zx3_intro.jpg',50,15,5),
(NULL,'罗马生菜',5.00,'salad_zx4.jpg','salad_zx4_intro.jpg',50,15,5),
(NULL,'苦苣菜',5.00,'salad_zx5.jpg','salad_zx5_intro.jpg',50,15,5),
(NULL,'【玖折】阿兰·安格斯沙拉',48.00,'salad_gd1.jpg','salad_gd1_intro.jpg',50,15,6), #沙拉固搭
(NULL,'【玖折】赫拉巴尔·斯福德沙拉',68.00,'salad_gd2.jpg','salad_gd2_intro.jpg',50,15,6),
(NULL,'【玖折】耶茨·赤海沙拉',58.00,'salad_gd3.jpg','salad_gd3_intro.jpg',50,15,6),
(NULL,'【玖折】斯诺·黄鳍沙拉',58.00,'salad_gd4.jpg','salad_gd4_intro.jpg',50,15,6),
(NULL,'【玖折】波普·鲑鳟沙拉',48.00,'salad_gd5.jpg','salad_gd5_intro.jpg',50,15,6),
(NULL,'【玖折】卡佛·鳗鱼沙拉',58.00,'salad_gd6.jpg','salad_gd6_intro.jpg',50,15,6),
(NULL,'【冻品】澳洲菲力牛扒 ',88.00,'beef_az1.jpg','beef_az1_intro.jpg',50,15,7), #牛扒澳洲
(NULL,'【冻品】安格斯牛肉粒 ',78.00,'beef_az2.jpg','beef_az2_intro.jpg',50,15,7),
(NULL,'【冻品】澳洲肉眼牛扒',128.00,'beef_az3.jpg','beef_az3_intro.jpg',50,15,7),
(NULL,'【冻品】澳洲雪花牛扒',128.00,'beef_az4.jpg','beef_az4_intro.jpg',50,15,7),
(NULL,'【冻品】澳洲三骨牛肋',78.00,'beef_az5.jpg','beef_az5_intro.jpg',50,15,7),
(NULL,'【玖折】牛扒优惠装-壹肆捌',148.00,'beef_tz1.jpg','beef_tz1_intro.jpg',50,15,8), #牛扒套装
(NULL,'【玖折】牛扒优惠装-贰贰捌',228.00,'beef_tz2.jpg','beef_tz2_intro.jpg',50,15,8),
(NULL,'【玖折】牛扒优惠装-肆伍捌',458.00,'beef_tz3.jpg','beef_tz3_intro.jpg',50,15,8);

SELECT * FROM bf_product;

CREATE TABLE bf_scart(
	sid INT PRIMARY KEY AUTO_INCREMENT,
	uid INT
);
INSERT INTO bf_scart VALUES
(1,1);
SELECT * FROM bf_scart;

CREATE TABLE bf_cart(
	did INT PRIMARY KEY AUTO_INCREMENT,
	productId INT,
	scount INT,
	onchecked INT,
	sid INT
);
INSERT INTO bf_cart VALUES
(1,1,3,0,1),
(2,2,1,1,1),
(3,3,2,0,1);
SELECT * FROM bf_cart;

CREATE TABLE bf_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(16),
    uname VARCHAR(16),
    addr VARCHAR(128),
    msg VARCHAR(30),
    order_time BIGINT,
    totalPrice FLOAT,
    uid INT,
    status INT  #订单状态 1-等待付款 2-派货中 3-订单完成 4-订单取消
);
INSERT INTO bf_order VALUES
(NULL,'13501234567','婷婷','大钟寺中鼎AB座','酱油多一点，谢谢',1482324887000,44.00,1,1),
(NULL,'13501234567','大大','大钟寺中鼎B座','芥末多一点',1482324887000,44.00,1,2),
(NULL,'13501234567','哈哈','大钟寺中鼎C座','',1482324887000,44.00,1,3),
(NULL,'13501234567','小智','大钟寺中鼎D座','下午五点前送到',1482324887000,44.00,1,4);
SELECT * FROM bf_order;

CREATE TABLE bf_order_detail(
    id INT PRIMARY KEY AUTO_INCREMENT,
    pid INT,
    count INT,
    oid INT
);
INSERT INTO bf_order_detail VALUES
(NULL,1,2,1),
(NULL,2,1,1),
(NULL,3,1,2),
(NULL,4,1,3),
(NULL,5,1,4);
SELECT * FROM bf_order_detail;
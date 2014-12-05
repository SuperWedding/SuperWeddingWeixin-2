SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS  `upload_images`;
CREATE TABLE `upload_images` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `openid` text NOT NULL COMMENT '微信 Open ID',
  `image_path` text NOT NULL COMMENT '图片地址',
  `gmt_created` datetime NOT NULL COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `openid,image_path` (`openid`(100),`image_path`(255))
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='用户上传的图片';

DROP TABLE IF EXISTS  `users`;
CREATE TABLE `users` (
  `uid` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'User ID',
  `openid` text NOT NULL COMMENT '微信 Open ID',
  `name` text NOT NULL COMMENT '用户名',
  `gmt_created` datetime NOT NULL COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `openid` (`openid`(100))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='用户';

DROP TABLE IF EXISTS  `users_ext`;
CREATE TABLE `users_ext` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户扩展信息表';

SET FOREIGN_KEY_CHECKS = 1;


use study_turkey;
CREATE TABLE `t_user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(200) DEFAULT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8

CREATE TABLE `t_user_detail` (
  `user_detail_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `gender` varchar(200) DEFAULT NULL,
  `birth_date` timestamp NULL DEFAULT NULL,
  `price_range` varchar(200) DEFAULT NULL,
  `education_level` varchar(200) DEFAULT NULL,
  `education_level_preference` varchar(200) DEFAULT NULL,
  `citizenship` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8
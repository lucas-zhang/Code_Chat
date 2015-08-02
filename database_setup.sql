drop database if exists chat_app;

create database if not exists chat_app;

use chat_app;

drop table if exists users;

create table if not exists users(
   userId integer primary key auto_increment,
   username varchar(100) unique,
   password varchar(100),
   firstName varchar(100),
   lastName varchar(100)
)engine=innodb;
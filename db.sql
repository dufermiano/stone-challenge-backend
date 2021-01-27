CREATE DATABASE MARVELAPP;

USE MARVELAPP;

CREATE TABLE USER(userId int auto_increment primary key, 
	username varchar(50) NOT NULL UNIQUE, password varchar(15) NOT NULL, email varchar(50) NOT NULL,
    phoneNumber varchar(13), active boolean);
    
CREATE TABLE FAVORITES (favId int auto_increment primary key, characterId int(10), comicId int(10),
userId int,
CONSTRAINT FK_UserFav FOREIGN KEY (userId)
    REFERENCES USER(userId));

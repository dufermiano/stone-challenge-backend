CREATE DATABASE STONE;

USE STONE;

CREATE TABLE USER(userId int auto_increment primary key, 
	username varchar(50) NOT NULL, password varchar(15) NOT NULL, email varchar(50) NOT NULL,
    phoneNumber varchar(13));
    
CREATE TABLE FAVORITES (favId int auto_increment primary key, characterId int(10), comicId int(10),
userId int,
CONSTRAINT FK_UserFav FOREIGN KEY (userId)
    REFERENCES User(userId));

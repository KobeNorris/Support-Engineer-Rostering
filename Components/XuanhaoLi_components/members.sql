create table members (id int(4) NOT NULL auto_increment,
username varchar(65) NOT NULL default '',
password varchar(65) NOT NULL default '',
PRIMARY KEY (id));

alter table members add firstname varchar(65);
alter table members add lastname varchar(65);
alter table members add email varchar(65);
alter table members add age varchar(65);
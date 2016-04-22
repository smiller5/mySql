create database Bamazon;

use Bamazon; 

create table Products(
ItemID int not null,
ProductName varchar(30),
Department varchar(30),
Price int,
Quantity int,
primary key (ItemID)
)
drop table products;
insert into Products (ItemID,ProductName,Department,Price,Quantity)
values (10,'pingpongball','sports',2,10);
delete from products where ProductName='tennisball';
select * from Products;


var prompt=require('prompt');
var fs=require('fs');
var mysql=require('mysql');
var parse=require('parse')

//prompt user 

//create connection to server
function sports(price,quantity,callback){
		var con=mysql.createConnection({
			host:'localhost',
			user:'root',
			database:'Bamazon'
		});

		//check for connection
		con.connect(function(err){
			if(err){
			console.log('err');
			}
			console.log('connected');
		});

		con.query('select * from Products',function(err,rows){
			if(err){
				return callback(err);
			}
			//console.log(rows)//entire thing
			//console.log(rows[0].ProductName); //basketball 
			//list of all items
				var theitemList=[];
			for(var i=0;i<rows.length;i++){ //why can only the for loop see productname
			//console.log(rows[i].ProductName)
			theitemList.push(rows[i].ProductName);
			}
			console.log('THINGS WE SELL')
			console.log(theitemList)
		
			prompt.start();

			console.log('what do you want to buy?')
		prompt.get(['item','quantity'],function(err,result){
			//console.log(result.item);
			//console.log(result.quantity)
			var quantity=result.quantity;
			var item=result.item;
			check(item,quantity);
		});
		//iterates through menu and displays item selected and cost
		function check(item,quantity){
		// console.log(item)
		// console.log(theitemList)
		//console.log('quantity in check'+quantity)
			for(var j=0;j<theitemList.length;j++){
				//console.log(theitemList[j])
				if(item==theitemList[j]){
					console.log('You picked '+item)
					//console.log('from '+theitemList[j])

					total(item,quantity);//function that spits out cost
					return; //prevents it from looping baseball 10 times
				}
				else if(item!=theitemList[j]){
				console.log('');

				}
			}
		
		
		}
		//function that gets  the total amount 
		function total(item,quantity){
			//console.log('in total')
			//console.log(item)
			for(var i=0;i<rows.length;i++){
				//console.log(rows[i])
				if(item==rows[i].ProductName){
					console.log(item + ' costs '+ rows[i].Price +' dollars ' )
					var x=quantity*rows[i].Price;
					console.log('your total is '+ x +' dollars')
					var remaining=quantity-rows[i].Quantity;
					upload(remaining,item); //upload the database with remaining items
					return;
				}
			}
			
			
		}//possible oprtion
// 		s = getStudentName()
// cmd.CommandText = "SELECT * FROM students WHERE name = ?"
// cmd.Parameters.Add(s)
// cmd.Execute()
		//upload to database having trouble
		function upload(remaining,item){
			console.log('in upload: remaining: '+remaining+'and item: '+item)
			if(remaining<0){
				console.log('we have no more of that item')
			}
			con.query('update Products set Quantity='+"'remaining'"+'where ProductName='+"'item'")
		}
	});

	
}

///start the program
sports(function(err,result){
	if(err){
		console.log('we have an error');
	}
	else{console.log('kskskxckdflksdmlskmdslkdmslkmsk'+result)}
})
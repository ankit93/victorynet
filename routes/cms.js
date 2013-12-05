
/*
 * GET home page.
 */
 var db = require('../config');
 // var file = require('../req.files');
 
 var express = require("express");
var app = express();
var url = require('url');
 
/* app.configure(function () {
  app.use(express.bodyParser());
});
*/

var client =db.dbconnect();


exports.login =function(req,res)
{
   res.render('login',{layout:false});	
}

exports.auth= function (req, res)
{
	var getData=req.body;
	
	var email=getData.mail;
	var pass=getData.pass;
							
	client.query("SELECT * FROM admin WHERE UserName=? and  UserPassword=?",[email,pass],function(err, data)
	{
     if (err) {
      console.log('Error'+err.message);
      res.writeHead(500,{'Content-Type': 'text/plain'});
      res.write('Error' + err.message);
      res.end();
    } else { 
	   var count=data.length;
       if (count>0) {
         req.session.user_id = data[0].UserName;
           res.redirect('/cms');
		   
       } else {
           res.render('login',{layout:false,msg:"Email and password are not match"});
		  
       };
       
    }
    });					
};

exports.index = function(req,res)
{	
 res.render('cms-index',{layout: 'cmsMain'});
};

exports.testimonial = function(req,res)
{
	var query= url.parse(req.url, true).query;
	
	var orderBy="TestimonialId";          //defaults orderby
    var msg;	
	if(query.orderby)
	{
	  orderBy = query.orderBy;
	}
	
	else if(query.dl)
	 {
		 var dl=query.dl;
		client.query('DELETE FROM testimonialinfo WHERE TestimonialId=?',[dl],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  }
			  else{
			     msg="delete";	  
				  }
			});
	 }
	else
	{}
client.query('SELECT * FROM testimonialinfo ORDER BY '+orderBy+'',
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			 res.render("cms-testimonial",{users:data,msg:msg,layout: 'cmsMain'});
			  
		   }
		  });
};

exports.reachUs = function(req,res)
{
	var query= url.parse(req.url, true).query;
	
	var orderBy="ContactId";          //defaults orderby
	var msg;
	if(query.orderby)
	{
	  orderBy = query.orderBy;
	}
	else if(query.dl)
	 {
		 var dl=query.dl;
		client.query('DELETE FROM contactinfo WHERE contactId=?',[dl],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  }
			  else{
			     msg="delete";	  
				  }
			});
	 }
	else{}
	
client.query('SELECT * FROM contactinfo ORDER BY ?',[orderBy],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			  res.render('cms-reachUs',{users:data,msg:msg,layout: 'cmsMain'});
			  
		   }
		  });
};

exports.editTestimonial = function(req,res)
{
	var query= url.parse(req.url, true).query;
	 var id=query.id;
	client.query('SELECT * FROM testimonialinfo where testimonialId=?',[id],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			 res.render("cms-edit-testmonial",{users:data,layout: 'cmsMain'});
			  
		   }
		  });
};
exports.createTestimonial = function(req,res)
{
  	 res.render("cms-edit-testmonial",{layout: 'cmsMain'});
}
exports.saveTestimonial = function(req,res)
{
	var query= url.parse(req.url, true).query;
    var id = query.id;
	
	var data =req.body;
	var txtDescription=data.txtDescription;
	var txtPosition=data.txtPosition;
	var txtName=data.txtName;
	var txtDate=new Date();
	
	
	client.query('UPDATE testimonialinfo SET TestimonialDescription=?,PersonPosition=?,PersonName=?,CreatedDate=? WHERE TestimonialId=?',[txtDescription,txtPosition,txtName,txtDate,id],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			 res.redirect('/cms/testimonial');
			
			  
		   }
		  });
};


exports.insertTestimonial = function(req,res)
{
   var query= url.parse(req.url, true).query;
    var id = query.id;
	
	var data =req.body;
	var txtDescription=data.txtDescription;
	var txtPosition=data.txtPosition;
	var txtName=data.txtName;
	var txtDate=new Date();
	
	
	client.query('INSERT INTO testimonialinfo (TestimonialDescription,PersonPosition,PersonName,CreatedDate) VALUES(?,?,?,?)',[txtDescription,txtPosition,txtName,txtDate],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 res.redirect('/cms/testimonial'); 
		   }
		  });
};
exports.editReachUs=function(req,res)
{
    var query= url.parse(req.url, true).query;
    var id = query.id;
	client.query('SELECT * FROM contactinfo where ContactId=?',[id],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 res.render("cms-edit-reachUs",{users:data,layout:'cmsMain'});
			  
		   }
		  });
}
exports.saveReachUs=function(req,res)
{
    var query= url.parse(req.url, true).query;
    var id = query.id;
	
	var qname =req.body.txtRName;
	var txtREmail =req.body.txtREmail;
	var txtRPhone=req.body.txtRPhone;
	var cmbRCountry=req.body.cmbRCountry;
	var txtRSubject=req.body.txtRSubject;
	var txtRMessage=req.body.txtRMessage;
	var createDate = new Date();
  
	client.query('UPDATE contactinfo SET ContactName=?,ContactEmail=?,ContactTelephone=?,ContactCountry=?,ContactSubject=?,ContactMessage=?,CreatedDate=? WHERE ContactId=?',[qname,txtREmail,txtRPhone,cmbRCountry,txtRSubject,txtRMessage,createDate,id],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			 res.redirect('/cms/reach-us');
			
			  
		   }
		  });
}
exports.quote=function(req,res)
{
		var query= url.parse(req.url, true).query;
	
	var orderBy="QuoteId";          //defaults orderby
    var msg;	
	if(query.orderby)
	{
	  orderBy = query.orderBy;
	}
	
	else if(query.dl)
	 {
		 var dl=query.dl;
		client.query('DELETE FROM quoteinfo WHERE QuoteId=?',[dl],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  }
			  else{
			     msg="delete";	  
				  }
			});
	 }
	else
	{}
client.query('SELECT * FROM quoteinfo ORDER BY ?',[orderBy],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			 res.render("cms-quote",{users:data,msg:msg,layout: 'cmsMain'});
			  
		   }
		  });
}

exports.editQuote=function(req,res)
{
	var query= url.parse(req.url, true).query;
	var id = query.id;
	
	client.query('SELECT * FROM quoteinfo where QuoteId=?',[id],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 res.render("cms-edit-quote",{users:data,layout:'cmsMain'});
			  
		   }
		  });
}
exports.saveQuote=function(req,res)
{
  	 var query= url.parse(req.url, true).query;
	 var id;
	 var data =req.body;
	 var c1=data.txtName;
	 var c2=data.txtEmail;
	 var c3=data.txtCompany;
	 var c4=data.txtDescription;
	 var c5=new Date();
	 
	 if(query.id)
	 {
	  var id=query.id;
	  client.query('UPDATE quoteinfo SET QuoteName=?,QuoteEmail=?,QuoteCompany=?,QuoteDescription=?,CreatedDate=? WHERE QuoteId=?',[c1,c2,c3,c4,c5,id],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 res.redirect('/cms/quote');
		   }
		  }); 	 
	 }
	 else
	 {
	  client.query('insert quoteinfo SET QuoteName=?,QuoteEmail=?,QuoteCompany=?,QuoteDescription=?,CreatedDate=?',[c1,c2,c3,c4,c5],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 res.redirect('/cms/quote');
		   }
		  }); 
	  
	  	 
	 }

	
	
	
}
exports.ourPortfolio=function(req,res)
{
  	var query= url.parse(req.url, true).query;
	
	var orderBy="ProjectTitle";          //defaults orderby
    var msg;	
	if(query.orderBy)
	{
	  orderBy = query.orderBy;
	 
	}
	
	else if(query.dl)
	 {
		 var dl=query.dl;
		client.query('DELETE FROM portfolioinfo WHERE ProjectId=?',[dl],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  }
			  else{
			     msg="delete";	  
				  }
			});
	 }
	else
	{}
	 console.log(orderBy);
client.query('SELECT * FROM portfolioinfo ORDER BY '+orderBy+' ASC',
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			 
			 res.render("cms-portfolioinfo",{users:data,msg:msg,layout: 'cmsMain'});
			  
		   }
		  });
}
exports.testimonialGrid=function(req,res)
{
	//set table name 
	var sTable = "testimonialinfo";
	
	// set index column
	var sIndexColumn = "TestimonialId";
	
	//set columns  
 	var aColumns= ['TestimonialId','TestimonialDescription','PersonPosition','PersonName','CreatedDate','TestimonialId'];
	
	var query= url.parse(req.url, true).query;
	
	
	var sLimit = "";
	if(query.iDisplayStart && query.iDisplayLength !='-1')
	{
	  sLimit = " LIMIT "+query.iDisplayStart+","+query.iDisplayLength;
	}
	
    var sOrder ="";
   if(query.iSortCol_0)
	 {
	     sOrder = " ORDER BY  ";
		 for(var i=0; i<parseInt(query.iSortingCols); i++)
		  {
			 
			  if(query['bSortable_'+parseInt(query['iSortCol_'+i])]=="true")
			   {
				   var aColumns;
				 sOrder+=aColumns[parseInt(query['iSortCol_'+i])]+ ' ';
				 sOrder+=query['sSortDir_'+i]+", ";
			   }
		  }
		  sOrder= sOrder.substr(0,sOrder.length-2);
		  
		  if ( sOrder == "ORDER BY" )
		   {
			 sOrder = "";
		   }
		    
	 }
	 
  var sWhere = "";
	if (query.sSearch!= '' )
	{
		sWhere = " WHERE (";
		for ( i=0 ; i<aColumns.length ; i++ )
		{
			sWhere += aColumns[i]+" LIKE '%"+query.sSearch+"%' OR ";
		}
		 sWhere= sWhere.substr(0,sWhere.length-3);
		sWhere += ')';	
	}
	
	for ( i=0 ; i<aColumns.length ; i++ )
	{
		if (query.bSearchable_+i== "true" && query.sSearch_+i != null )
		{
			if ( sWhere == '' )
			{
				sWhere = "WHERE ";
			}
			else
			{
				sWhere += " AND ";
			}
			sWhere += aColumns[i]+" LIKE '%"+query.sSearch_+i+"%' ";
		}
	}
	
	var sQuery = "SELECT SQL_CALC_FOUND_ROWS "+aColumns.toString()+" FROM   "+ sTable + sWhere +sOrder +sLimit;

//	   SQL queries
//	   Get data to display

	   var rResult;
	client.query(sQuery,function(err, data)
	{
     if (err) {
      console.log('Error'+err.message);
      res.writeHead(500,{'Content-Type': 'text/plain'});
      res.write('Error' + err.message);
      res.end();
    } else { 
	    rResult=data;	
	}
   });
   
// Data set length after filtering 

	$sQuery = "SELECT FOUND_ROWS()";	
	client.query(sQuery,function(err, data)
	{
     if (err) {
      console.log('Error'+err.message);
      res.writeHead(500,{'Content-Type': 'text/plain'});
      res.write('Error' + err.message);
      res.end();
    } else { 
	    iFilteredTotal=data.length;
		
	}
   });
	

   
//	Total data set length

	sQuery = "SELECT COUNT(*) FROM   "+sTable +"";
	
	var iTotal;
	
	client.query(sQuery,function(err, data)
	{
	  if (err) {
        console.log('Error'+err.message);
       res.writeHead(500,{'Content-Type': 'text/plain'});
       res.write('Error' + err.message);
       res.end();
     }  else { 
	    iTotal=data[0]['COUNT(*)'];
			
//output query
	
	var sOutput;
	
	sOutput = '{';
	sOutput += '"sEcho": '+parseInt(query['sEcho'])+', ';
	sOutput += '"iTotalRecords": '+iTotal+', ';
	sOutput += '"iTotalDisplayRecords": '+iTotal+', ';
	sOutput += '"aaData": [ ';
	var i=1;
	
	for (var j=0;j<rResult.length;j++)
    {
        sOutput += "[";					  
		sOutput += '"'+i+'",';		
		sOutput += '"'+rResult[j].TestimonialDescription+'",';		
		sOutput += '"'+rResult[j].PersonPosition+'",';
		sOutput += '"'+rResult[j].PersonName+'",';
		sOutput += '"'+rResult[j].CreatedDate+'",';
		
		var  edit = "<p style='text-align:center;'><a href='edit-testimonial?id="+rResult[j].TestimonialId+"' class='anchr edit'><img src='images/icon_edit.gif' alt='Edit' border='0' /></a>";
		var Delete= " <a href='testimonial?dl="+rResult[j].TestimonialId+"' class='anchr delete' ><img src='images/icon_delete.gif' alt='Delete' border='0' /></a></p>";
		sOutput += '"'+edit+Delete+'"';
			
		sOutput += "],";
	 	i=i+1;
	  }
	  
	 sOutput= sOutput.substr(0,sOutput.length-1);
	sOutput += ']}';
	
	 res.writeHead(200,{'Content-Type': 'application/json'});
       res.write(sOutput);	
		res.end();
	
	  }
	});
}
exports.quoteGrid=function(req,res)
{
	//set table name 
	var sTable = "quoteinfo";
	
	// set index column
	var sIndexColumn = "QuoteId";
	
	//set columns  
 	var aColumns= ['QuoteId','QuoteName','QuoteEmail','QuoteCompany','QuoteDescription','CreatedDate','QuoteId'];
	
	var query= url.parse(req.url, true).query;
	
	
	var sLimit = "";
	if(query.iDisplayStart && query.iDisplayLength !='-1')
	{
	  sLimit = " LIMIT "+query.iDisplayStart+","+query.iDisplayLength;
	}
	
    var sOrder ="";
   if(query.iSortCol_0)
	 {
	     sOrder = " ORDER BY  ";
		 for(var i=0; i<parseInt(query.iSortingCols); i++)
		  {
			 
			  if(query['bSortable_'+parseInt(query['iSortCol_'+i])]=="true")
			   {
				   var aColumns;
				 sOrder+=aColumns[parseInt(query['iSortCol_'+i])]+ ' ';
				 sOrder+=query['sSortDir_'+i]+", ";
			   }
		  }
		  sOrder= sOrder.substr(0,sOrder.length-2);
		  
		  if ( sOrder == "ORDER BY" )
		   {
			 sOrder = "";
		   }
		    
	 }
	 
  var sWhere = "";
	if (query.sSearch!= '' )
	{
		sWhere = " WHERE (";
		for ( i=0 ; i<aColumns.length ; i++ )
		{
			sWhere += aColumns[i]+" LIKE '%"+query.sSearch+"%' OR ";
		}
		 sWhere= sWhere.substr(0,sWhere.length-3);
		sWhere += ')';	
	}
	
	for ( i=0 ; i<aColumns.length ; i++ )
	{
		if (query.bSearchable_+i== "true" && query.sSearch_+i != null )
		{
			if ( sWhere == '' )
			{
				sWhere = "WHERE ";
			}
			else
			{
				sWhere += " AND ";
			}
			sWhere += aColumns[i]+" LIKE '%"+query.sSearch_+i+"%' ";
		}
	}
	
	var sQuery = "SELECT SQL_CALC_FOUND_ROWS "+aColumns.toString()+" FROM   "+ sTable + sWhere +sOrder +sLimit;

//	   SQL queries
//	   Get data to display

	   var rResult;
	client.query(sQuery,function(err, data)
	{
     if (err) {
      console.log('Error'+err.message);
      res.writeHead(500,{'Content-Type': 'text/plain'});
      res.write('Error' + err.message);
      res.end();
    } else { 
	    rResult=data;	
	}
   });
   
// Data set length after filtering 

	$sQuery = "SELECT FOUND_ROWS()";	
	client.query(sQuery,function(err, data)
	{
     if (err) {
      console.log('Error'+err.message);
      res.writeHead(500,{'Content-Type': 'text/plain'});
      res.write('Error' + err.message);
      res.end();
    } else { 
	    iFilteredTotal=data.length;
		
	}
   });
	

   
//	Total data set length

	sQuery = "SELECT COUNT(*) FROM   "+sTable +"";
	
	var iTotal;
	
	client.query(sQuery,function(err, data)
	{
	  if (err) {
        console.log('Error'+err.message);
       res.writeHead(500,{'Content-Type': 'text/plain'});
       res.write('Error' + err.message);
       res.end();
     }  else { 
	    iTotal=data[0]['COUNT(*)'];
			
//output query
	
	var sOutput;
	
	sOutput = '{';
	sOutput += '"sEcho": '+parseInt(query['sEcho'])+', ';
	sOutput += '"iTotalRecords": '+iTotal+', ';
	sOutput += '"iTotalDisplayRecords": '+iTotal+', ';
	sOutput += '"aaData": [ ';
	var i=1;
	
	for (var j=0;j<rResult.length;j++)
    {
        sOutput += "[";					  
		sOutput += '"'+i+'",';		
		sOutput += '"'+rResult[j].QuoteName+'",';		
		sOutput += '"'+rResult[j].QuoteEmail+'",';
		sOutput += '"'+rResult[j].QuoteCompany+'",';
		sOutput += '"'+rResult[j].QuoteDescription+'",';
		sOutput += '"'+rResult[j].CreatedDate+'",';
		
		var  edit = "<p style='text-align:center;'><a href='edit-quote?id="+rResult[j].QuoteId+"' class='anchr edit'><img src='images/icon_edit.gif' alt='Edit' border='0' /></a>";
		var Delete= " <a href='quote?dl="+rResult[j].QuoteId+"' class='anchr delete' ><img src='images/icon_delete.gif' alt='Delete' border='0' /></a></p>";
		sOutput += '"'+edit+Delete+'"';
			
		sOutput += "],";
	 	i=i+1;
	  }
	  
	 sOutput= sOutput.substr(0,sOutput.length-1);
	sOutput += ']}';
	
	 res.writeHead(200,{'Content-Type': 'application/json'});
       res.write(sOutput);	
		res.end();
	
	  }
	});
}
exports.reachGrid=function(req,res)
{
	//set table name 
	var sTable = "contactinfo";
	
	// set index column
	var sIndexColumn = "ContactId";
	
	//set columns  
 	var aColumns= ['ContactId','ContactName','ContactEmail','ContactTelephone','ContactCountry','ContactSubject','ContactMessage','CreatedDate','ContactId'];
	
	var query= url.parse(req.url, true).query;
	
	
	var sLimit = "";
	if(query.iDisplayStart && query.iDisplayLength !='-1')
	{
	  sLimit = " LIMIT "+query.iDisplayStart+","+query.iDisplayLength;
	}
	
    var sOrder ="";
   if(query.iSortCol_0)
	 {
	     sOrder = " ORDER BY  ";
		 for(var i=0; i<parseInt(query.iSortingCols); i++)
		  {
			 
			  if(query['bSortable_'+parseInt(query['iSortCol_'+i])]=="true")
			   {
				   var aColumns;
				 sOrder+=aColumns[parseInt(query['iSortCol_'+i])]+ ' ';
				 sOrder+=query['sSortDir_'+i]+", ";
			   }
		  }
		  sOrder= sOrder.substr(0,sOrder.length-2);
		  
		  if ( sOrder == "ORDER BY" )
		   {
			 sOrder = "";
		   }
		    
	 }
	 
  var sWhere = "";
	if (query.sSearch!= '' )
	{
		sWhere = " WHERE (";
		for ( i=0 ; i<aColumns.length ; i++ )
		{
			sWhere += aColumns[i]+" LIKE '%"+query.sSearch+"%' OR ";
		}
		 sWhere= sWhere.substr(0,sWhere.length-3);
		sWhere += ')';	
	}
	
	for ( i=0 ; i<aColumns.length ; i++ )
	{
		if (query.bSearchable_+i== "true" && query.sSearch_+i != null )
		{
			if ( sWhere == '' )
			{
				sWhere = "WHERE ";
			}
			else
			{
				sWhere += " AND ";
			}
			sWhere += aColumns[i]+" LIKE '%"+query.sSearch_+i+"%' ";
		}
	}
	
	var sQuery = "SELECT SQL_CALC_FOUND_ROWS "+aColumns.toString()+" FROM   "+ sTable + sWhere +sOrder +sLimit;

//	   SQL queries
//	   Get data to display

	   var rResult;
	client.query(sQuery,function(err, data)
	{
     if (err) {
      console.log('Error'+err.message);
      res.writeHead(500,{'Content-Type': 'text/plain'});
      res.write('Error' + err.message);
      res.end();
    } else { 
	    rResult=data;	
	}
   });
   
// Data set length after filtering 

	$sQuery = "SELECT FOUND_ROWS()";	
	client.query(sQuery,function(err, data)
	{
     if (err) {
      console.log('Error'+err.message);
      res.writeHead(500,{'Content-Type': 'text/plain'});
      res.write('Error' + err.message);
      res.end();
    } else { 
	    iFilteredTotal=data.length;
		
	}
   });
	

   
//	Total data set length

	sQuery = "SELECT COUNT(*) FROM   "+sTable +"";
	
	var iTotal;
	
	client.query(sQuery,function(err, data)
	{
	  if (err) {
        console.log('Error'+err.message);
       res.writeHead(500,{'Content-Type': 'text/plain'});
       res.write('Error' + err.message);
       res.end();
     }  else { 
	    iTotal=data[0]['COUNT(*)'];
			
//output query
	
	var sOutput;
	
	sOutput = '{';
	sOutput += '"sEcho": '+parseInt(query['sEcho'])+', ';
	sOutput += '"iTotalRecords": '+iTotal+', ';
	sOutput += '"iTotalDisplayRecords": '+iTotal+', ';
	sOutput += '"aaData": [ ';
	var i=1;
	
	for (var j=0;j<rResult.length;j++)
    {
        sOutput += "[";					  
		sOutput += '"'+i+'",';		
		sOutput += '"'+rResult[j].ContactName+'",';		
		sOutput += '"'+rResult[j].ContactEmail+'",';
		sOutput += '"'+rResult[j].ContactTelephone+'",';
		sOutput += '"'+rResult[j].ContactCountry+'",';
		sOutput += '"'+rResult[j].ContactSubject+'",';
		sOutput += '"'+rResult[j].ContactMessage+'",';
		sOutput += '"'+rResult[j].CreatedDate+'",';
		
		var  edit = "<p style='text-align:center;'><a href='edit-reachUs?id="+rResult[j].ContactId+"' class='anchr edit'><img src='images/icon_edit.gif' alt='Edit' border='0' /></a>";
		var Delete= " <a href='reach-us?dl="+rResult[j].ContactId+"' class='anchr delete' ><img src='images/icon_delete.gif' alt='Delete' border='0' /></a></p>";
		sOutput += '"'+edit+Delete+'"';
			
		sOutput += "],";
	 	i=i+1;
	  }
	  
	 sOutput= sOutput.substr(0,sOutput.length-1);
	sOutput += ']}';
	
	 res.writeHead(200,{'Content-Type': 'application/json'});
       res.write(sOutput);	
		res.end();
	
	  }
	});
}
exports.portfolioGrid=function(req,res)
{
	//set table name 
	var sTable = "portfolioinfo";
	
	// set index column
	var sIndexColumn = "ProjectId";
	
	//set columns  
 	var aColumns= ['ProjectId','ProjectTitle','ProjectDescription','ProjectImage','ProjectUrl','ProjectDate','ProjectSortOrder','ProjectId'];
	
	var query= url.parse(req.url, true).query;
	
	
	var sLimit = "";
	if(query.iDisplayStart && query.iDisplayLength !='-1')
	{
	  sLimit = " LIMIT "+query.iDisplayStart+","+query.iDisplayLength;
	}
	
    var sOrder ="";
   if(query.iSortCol_0)
	 {
	     sOrder = " ORDER BY  ";
		 for(var i=0; i<parseInt(query.iSortingCols); i++)
		  {
			 
			  if(query['bSortable_'+parseInt(query['iSortCol_'+i])]=="true")
			   {
				   var aColumns;
				 sOrder+=aColumns[parseInt(query['iSortCol_'+i])]+ ' ';
				 sOrder+=query['sSortDir_'+i]+", ";
			   }
		  }
		  sOrder= sOrder.substr(0,sOrder.length-2);
		  
		  if ( sOrder == "ORDER BY" )
		   {
			 sOrder = "";
		   }
		    
	 }
	 
  var sWhere = "";
	if (query.sSearch!= '' )
	{
		sWhere = " WHERE (";
		for ( i=0 ; i<aColumns.length ; i++ )
		{
			sWhere += aColumns[i]+" LIKE '%"+query.sSearch+"%' OR ";
		}
		 sWhere= sWhere.substr(0,sWhere.length-3);
		sWhere += ')';	
	}
	
	for ( i=0 ; i<aColumns.length ; i++ )
	{
		if (query.bSearchable_+i== "true" && query.sSearch_+i != null )
		{
			if ( sWhere == '' )
			{
				sWhere = "WHERE ";
			}
			else
			{
				sWhere += " AND ";
			}
			sWhere += aColumns[i]+" LIKE '%"+query.sSearch_+i+"%' ";
		}
	}
	
	var sQuery = "SELECT SQL_CALC_FOUND_ROWS "+aColumns.toString()+" FROM   "+ sTable + sWhere +sOrder +sLimit;

//	   SQL queries
//	   Get data to display

	   var rResult;
	client.query(sQuery,function(err, data)
	{
     if (err) {
      console.log('Error'+err.message);
      res.writeHead(500,{'Content-Type': 'text/plain'});
      res.write('Error' + err.message);
      res.end();
    } else { 
	    rResult=data;	
	}
   });
   
// Data set length after filtering 

	$sQuery = "SELECT FOUND_ROWS()";	
	client.query(sQuery,function(err, data)
	{
     if (err) {
      console.log('Error'+err.message);
      res.writeHead(500,{'Content-Type': 'text/plain'});
      res.write('Error' + err.message);
      res.end();
    } else { 
	    iFilteredTotal=data.length;
		
	}
   });
	

   
//	Total data set length

	sQuery = "SELECT COUNT(*) FROM   "+sTable +"";
	
	var iTotal;
	
	client.query(sQuery,function(err, data)
	{
	  if (err) {
        console.log('Error'+err.message);
       res.writeHead(500,{'Content-Type': 'text/plain'});
       res.write('Error' + err.message);
       res.end();
     }  else { 
	    iTotal=data[0]['COUNT(*)'];
			
//output query
	
	var sOutput;
	
	sOutput = '{';
	sOutput += '"sEcho": '+parseInt(query['sEcho'])+', ';
	sOutput += '"iTotalRecords": '+iTotal+', ';
	sOutput += '"iTotalDisplayRecords": '+iTotal+', ';
	sOutput += '"aaData": [ ';
	var i=1;
	
	for (var j=0;j<rResult.length;j++)
    {
        sOutput += "[";					  
		sOutput += '"'+i+'",';		
		sOutput += '"'+rResult[j].ProjectTitle+'",';
		sOutput += '"'+rResult[j].ProjectDescription+'",';
		sOutput += '"'+rResult[j].ProjectImage+'",';
		sOutput += '"'+rResult[j].ProjectUrl+'",';
		sOutput += '"'+rResult[j].ProjectDate+'",';
		sOutput += '"'+rResult[j].ProjectSortOrder+'",';
		
		var  edit = "<p style='text-align:center;'><a href='edit-testimonial?id="+rResult[j].ProjectId+"' class='anchr edit'><img src='images/icon_edit.gif' alt='Edit' border='0' /></a>";
		var Delete= " <a href='our-portfolio?dl="+rResult[j].ProjectId+"' class='anchr delete' ><img src='images/icon_delete.gif' alt='Delete' border='0' /></a></p>";
		sOutput += '"'+edit+Delete+'"';
			
		sOutput += "],";
	 	i=i+1;
	  }
	  
	 sOutput= sOutput.substr(0,sOutput.length-1);
	sOutput += ']}';
	
	 res.writeHead(200,{'Content-Type': 'application/json'});
       res.write(sOutput);	
		res.end();
	
	  }
	});
}
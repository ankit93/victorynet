
/*
 * GET home page.
 */
 var db = require('../config');
 // var file = require('../req.files');
 var fs = require('fs');
 var express = require("express");
var app = express();
var url = require('url');
/* app.configure(function () {
  app.use(express.bodyParser());
});
*/

var client =db.dbconnect();

var nodemailer = require("nodemailer");
// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP", {
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: "victorynet8@gmail.com",
        pass: "victory93"
    }
});





exports.index = function(req,res)
{
 res.render('index',{pageName:'home'});
};
exports.service = function(req,res)
{
	
	 res.render('our-service');
};
exports.company = function(req,res)
{
	
	 res.render('the-company');
};
exports.portfolio = function(req,res)
{
	client.query('SELECT * FROM portfolioinfo',function(err, data)
	{
     if (err) {
      console.log('Error'+err.message);
      res.writeHead(500,{'Content-Type': 'text/plain'});
      res.write('Error' + err.message);
      res.end();
    } else { 
       res.render('portfolio',{users:data});
    }
    });
	
};


exports.testimonial = function(req,res)
{
	  client.query('SELECT * FROM testimonialinfo',function(err, data)
	{
     if (err) {
      console.log('Error'+err.message);
      res.writeHead(500,{'Content-Type': 'text/plain'});
      res.write('Error' + err.message);
      res.end();
    } else { 
       res.render('testimonial',{users:data});
    }
    });
	
};
exports.outsource = function(req,res)
{
	res.render('why-outsource-to-us');
};
exports.reachUs = function(req,res)
{
	res.render('reach-us');
};

exports.outsourceIndia = function(req,res)
{
	res.render('outsourceIndia');
};
exports.offshoreDevelopment = function(req,res)
{
	res.render('offshore-development');
};
exports.solutionsTechnologies = function(req,res)
{
	res.render('solutions-technologies');
};
exports.reachUs = function(req,res)
{
	res.render('reach-us');
};

exports.ProjectDetail = function(req,res)
{
	 var query = url.parse(req.url, true).query;
	 var id=query.id;
	
	 client.query('SELECT * FROM portfolioinfo where ProjectId=?',[id],function(err, data)
	{
     if (err) {
      console.log('Error'+err.message);
      res.writeHead(500,{'Content-Type': 'text/plain'});
      res.write('Error' + err.message);
      res.end();
    } else { 
	  
	var  results='<style>body{margin:0;padding:0}.title{margin-bottom:8px;} .rghtarea,Content,ContentWrap{margin:0;padding:0;}.pdesc{display:block;text-align:left;width:100px; float:left; margin-top:2px;margin-left:10px; width:314px;text-align: justify;}</style><div id="ContentWrap">'
	               +'<div id="Content"><div class="rghtarea"><div class="contentBoxArea" style="color:#188BCA;font-size:25px;font-weight:bold; text-align:left; margin:0 auto;width:155px;"><div class="title">'+data[0].ProjectTitle+'</div></div>'
      +'<div class="normalContentArea"><div style="width:300px;display:block;color:#188BCA;font-size:21px;font-weight:bold;float:left">'
	  + '<img src="uploaded/thumbnail/' + data[0].ProjectImage +'" style=" border:0 none; margin-top:2px"/></a></div><div class="pdesc">'  
	  +  data[0].ProjectDescription; 
					+'</div></div></div></div></div>';
       res.send(results);
    }
    });
};
exports.caseStudies = function(req,res)
{
	res.render('case-Studies');
};

exports.partnerWithUs = function(req,res)
{
	res.render('partner-with-us');
};
exports.sitemap = function(req,res)
{
	res.render('sitemap');
};
exports.webdesign = function(req,res)
{
	res.render('webdesign');
};
exports.webDevelopment = function(req,res)
{
	res.render('web-development');
};
exports.yahooStore = function(req,res)
{
	res.render('yahooStore');
};

exports.ecommerceSolution = function(req,res)
{
	res.render('ecommerce-solution');
};

exports.softwareDevelopment = function(req,res)
{
	res.render('software-development');
};
exports.internetMarketing = function(req,res)
{
	res.render('internet-marketing');
};
exports.brandingIdentity = function(req,res)
{
	res.render('branding-identity');
};
exports.privacyPolicy = function(req,res)
{
	res.render('privacy-policy');
};
exports.disclaimer = function(req,res)
{
	res.render('disclaimer');
};


exports.form = function(req,res)
{
	var query= url.parse(req.url, true).query;
    var query = query.pageName;
	
	var qname =req.body.txtGName;
	var qemail =req.body.txtGEmail;
	var qcompany=req.body.txtGCompany;
	var qdescription=req.body.txaDescription;
	var qcreatedDate=new Date();
	
  
	var newPost = fs.readFile('../views/TempEmail/new.html','utf8');
	
	var admin = fs.readFileSync('../views/TempEmail/adminQuote.html','utf8');
	admin=admin.replace("qname",qname);
	admin=admin.replace("qemail",qemail);
	admin=admin.replace("qcompany",qcompany);  
	admin=admin.replace("qdescription",qdescription);    
  
						  	
	//client
	smtpTransport.sendMail({
   from: "victorynet8@gmail.com", // sender address
   to: qemail , // comma separated list of receivers
   subject: "Hello", // Subject line
   html: newPost // plaintext body
}, function(error, response){
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
});
	
	//admin 
	smtpTransport.sendMail({
   from: "victorynet8@gmail.com", // sender address
   to:  'victorynet8@gmail.com', // comma separated list of receivers
   subject: "Hello", // Subject line
   html: admin // plaintext body
}, function(error, response){
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
});
	
	
	
 client.query('INSERT INTO quoteinfo(QuoteName,QuoteEmail,QuoteCompany,QuoteDescription,CreatedDate) VALUES (?,?,?,?,?) ',[qname,qemail,qcompany,qdescription,qcreatedDate],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			   console.log("insert");
			 res.redirect("/");
			  
		   }
		  });
	 
};
exports.reachContact = function(req,res)
{
	var query= url.parse(req.url, true).query;
    var query = query.pageName;
	
	var txtRName =req.body.txtRName;
	var txtREmail =req.body.txtREmail;
	var txtRPhone=req.body.txtRPhone;
	var cmbRCountry=req.body.cmbRCountry;
	var txtRSubject=req.body.txtRSubject;
	var txtRMessage=req.body.txtRMessage;
	var createDate = new Date();
	
	var newPost = fs.readFileSync('views/TempEmail/new.html');
	var admin = fs.readFileSync('views/TempEmail/adminReach.html','utf8');
	
	admin=admin.replace("txtRName",txtRName);
	admin=admin.replace("txtREmail",txtREmail);
	admin=admin.replace("txtRPhone",txtRPhone);  
	admin=admin.replace("cmbRCountry",cmbRCountry);  
	admin=admin.replace("txtRSubject",txtRSubject);
	admin=admin.replace("txtRMessage",txtRMessage);
 
	
	smtpTransport.sendMail({
   from: "victorynet8@gmail.com", // sender address
   to: txtREmail , // comma separated list of receivers
   subject: "Hello", // Subject line
   html: newPost // plaintext body
}, function(error, response){
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
});
	
	//admin 
	smtpTransport.sendMail({
   from: "victorynet8@gmail.com", // sender address
   to:  'victorynet8@gmail.com', // comma separated list of receivers
   subject: "Hello", // Subject line
   html: admin // plaintext body
}, function(error, response){
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
});
	
 client.query('INSERT INTO contactinfo(ContactName,ContactEmail,ContactTelephone,ContactCountry,ContactSubject,ContactMessage,CreatedDate) VALUES (?,?,?,?,?,?,?) ',[txtRName,txtREmail,txtRPhone,cmbRCountry,txtRSubject,txtRMessage,createDate],
		  function(err, data)
			{
			  if (err) {
			  console.log('Error'+err.message);
			  res.writeHead(500,{'Content-Type': 'text/plain'});
			  res.write('Error' + err.message);
			  res.end();
			  } else { 
			   console.log("insert");
			 res.redirect("/");
			  
		   }
		  });
};
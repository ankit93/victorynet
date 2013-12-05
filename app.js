
/**
 * Module dependencies.
 */
var Express = require('express');
var Exphbs  = require('express3-handlebars');
var Http = require('http');
var Path = require('path');
var Routes = require('./routes');
var cms = require('./routes/cms.js');
var fs = require('fs');

var app = Express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('hbs', Exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
	partialsDir: [
		'views/partials/'
	]
}));

app.set('view engine', 'hbs');
app.use(Express.favicon('favicon.ico'));
app.use(Express.static(Path.join(__dirname, 'public')));
app.use(Express.cookieParser());
app.use(Express.session({secret: '123456789'}));
if ('development' == app.get('env')) {
  app.use(Express.errorHandler());
}
// development only
if ('development' == app.get('env')) {
  app.use(Express.errorHandler());
}
app.use(Express.json());
app.use(Express.urlencoded());



function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.redirect('cms/login');
  } else {
	  console.log(req.session.user_id);
    next();
  }
}
app.get('/cms/login',cms.login);


app.post('/cms/login',cms.auth);
app.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/cms/login');
}); 


app.get('/',Routes.index);
app.get('/our-services',Routes.service);
app.get('/the-company',Routes.company);
app.get('/our-portfolio',Routes.portfolio);
app.get('/testimonial',Routes.testimonial);
app.get('/why-outsource-to-us',Routes.outsource);
app.get('/reach-us',Routes.reachUs);
app.get('/outsource-to-india',Routes.outsourceIndia);
app.get('/offshore-development',Routes.offshoreDevelopment);
app.get('/solutions-technologies',Routes.solutionsTechnologies);
app.get('/Project-detail',Routes.ProjectDetail);
app.get('/case-Studies',Routes.caseStudies);
app.get('/partner-with-us',Routes.partnerWithUs);
app.get('/link',Routes.partnerWithUs);
app.get('/sitemap',Routes.sitemap);
app.get('/web-design',Routes.webdesign);
app.get('/web-development',Routes.webDevelopment);
app.get('/yahoo-store-design',Routes.yahooStore);
app.get('/ecommerce-solution',Routes.ecommerceSolution);
app.get('/software-development',Routes.softwareDevelopment);
app.get('/internet-marketing',Routes.internetMarketing);
app.get('/branding-identity',Routes.brandingIdentity);
app.get('/privacy-policy',Routes.privacyPolicy);
app.get('/disclaimer',Routes.disclaimer);

app.post('/form',Routes.form);
app.post('/reachContact',Routes.reachContact);

//cms 

app.get('/cms',checkAuth,cms.index);

app.get('/cms/testimonial',checkAuth,cms.testimonial);
app.get('/cms/edit-testimonial',checkAuth,cms.editTestimonial);
app.post('/cms/edit-testimonial',checkAuth,cms.saveTestimonial);
app.get('/cms/create-testimonial',checkAuth,cms.createTestimonial);
app.post('/cms/create-testimonial',checkAuth,cms.insertTestimonial);
app.get('/cms/testimonialGrid',checkAuth,cms.testimonialGrid);

app.get('/cms/reach-Us',checkAuth,cms.reachUs);
app.get('/cms/edit-reachUs',checkAuth,cms.editReachUs);
app.post('/cms/reachContact',checkAuth,cms.saveReachUs);

app.get('/cms/quote',checkAuth,cms.quote);
app.get('/cms/edit-quote',checkAuth,cms.editQuote);
app.post('/cms/save-quote',checkAuth,cms.saveQuote);

app.get('/cms/our-portfolio',checkAuth,cms.ourPortfolio);

app.get('/cms/quoteGrid',checkAuth,cms.quoteGrid);
app.get('/cms/reachGrid',checkAuth,cms.reachGrid);
app.get('/cms/portfolioGrid',checkAuth,cms.portfolioGrid);

app.get('*', function(req, res){
  res.redirect('/');
});
app.post('*', function(req, res){
  res.redirect('/');
});



Http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log('Node env: ' + process.env.NODE_ENV);
});
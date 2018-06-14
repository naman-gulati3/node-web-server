const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname+ '/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) =>{
    console.log('unable to append file')
    });
    next();

});
// app.use((req,res,next)=>{
// res.render('maintainance.hbs')
// });
hbs.registerHelper('getcurrentyear',() =>{
    return new Date().getFullYear()
});
app.get('/',(req,res) =>{
res.render('welcome.hbs',{
    pageTitle:'Home Page',
    welcome:'Hello user welcome to my website',
    
});


app.get('/about',(req,res) =>
{
    res.render('about.hbs', {
        

    

        
    });
});
});

app.get('/bad',(req,res) =>{
res.send({

errorMessage:'Unable to handle request'

});
});


app.listen(port,()=>{
    console.log(`Server is ready on port ${port}`);
});

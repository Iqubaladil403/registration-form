const express=require ("express");
const app=express();
require("./db/db");
const empCollection=require('./model/model');
const path=require("path");
const { log } = require("console");

const template_path=path.join(__dirname, '../template/views')
console.log(template_path);
app.set('view engine', 'hbs');
app.set("views",template_path )

const host="localhost",port=3000;

app.use(express.urlencoded({extended: false}));

app.get('/',(req, res)=>{
    res.render('index');
})


app.post('/empdata', async(req, res) => {
    try {
        const { email } = req.body;
        
        // Check if the email already exists in the database
        const existingUser = await empCollection.findOne({ email });
        
        if (existingUser) {
            return res.send("<h1>User already exists</h1>");
        }
        // If the email doesn't exist, save the data
        const data = new empCollection(req.body);
        const savedata = await data.save();
        
        return res.send("<h1>You are Registered<h1>");
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).send("<h1>Internal Server Error</h1>");
    }
});


app.get('/login',(req, res)=>{
    res.render('login');
})
app.post('/login',async(req, res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const getemail=await empCollection.findOne({email:email});
    //console.log(getemail.email);
    // res.send(getemail.email);
    if(getemail.password===password){
        //res.send(getemail.email);
        res.render("afterLogin");
    }
    else{
        res.send("your password is not matching");
    }
})

app.get('/logout', (req, res) => {
    res.redirect('/'); // Redirect to the registration page
});


app.listen(port, ()=>{
    console.log(`server on http://${host}:${port}`)
})



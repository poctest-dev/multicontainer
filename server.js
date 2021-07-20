const express=require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


const app=express()


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static('public'));

//Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/list',
    { useNewUrlParser: true ,
      useUnifiedTopology: true,
      useCreateIndex:true
    
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Register = require('./models/registers');

app.get('/login', (req,res)=>{
 
    res.render('index.ejs')
})

app.get('/register',(req,res)=>{
    res.render('index.ejs')
})



//create a new user in db
app.post('/register', async(req,res)=>{
        try{
               const pswd= req.body.password
               const confirmpswd= req.body.confirmpassword
               const name=req.body.name
               

               if(pswd === confirmpswd)
               {
                      const regUser = new Register({
                        name :req.body.name,
                        email : req.body.email,
                        password:req.body.password,
                        confirmpassword: req.body.confirmpassword
                      })

                     const registered= await  regUser.save()
                     res.status(201).send('Welcome<b> '  + name + ' </b>you have been registered succesfully  <br> Get back and login with your credentials')
                    // res.status(201).render('welcome.ejs')
               }
               else{
                 res.send('password are not matching')
               }
        }
        catch (error)
        {
          res.status(400).send(error)
        }
})


app.post('/login', async(req,res)=>{
     try{
             
            const email=req.body.email
            const pswd=req.body.password

            const useremail = await Register.findOne({email:email})

            if(useremail.password === pswd)
            {
              res.status(201).render('home.ejs')
            }
            else
            {
              res.send('invalid, try again')
            }
     } 
     catch (error) {
      res.status(400).send('invalid credentials')
     }  

})



app.listen(5000, ()=>{
    console.log('server listening on port 5000')
})
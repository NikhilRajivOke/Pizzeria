var exp = require('express');

var app = new exp();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const dburl = "mongodb://localhost:27017/pizzeriaDB"
var Schema = mongoose.Schema;
var IngredientSchema = new Schema({
    id:Number,
    tname:String,
    price:Number,
    image:String
},
{"collection":"ingredients"});
var IngredientModel = mongoose.model('ingredient',IngredientSchema);

var PizzaSchema = new Schema({
    id:String,
    type:String,
    price:Number,
    name:String,
    image:String,
    description:String,
    ingredients:[],
    topping:[],
},
{"collection":"pizza"});
var PizzaModel = mongoose.model('pizza',PizzaSchema);
var UserSchema = new Schema({
    username:String,
    userid:String,
    password:String,
    phoneno:Number,
},{
    "collection":"user"
});
var UserModel = mongoose.model('user',UserSchema);
var ShoppingSchema = new Schema({
    userid:String,
    phone:Number,
    pizzaname:String,
    img:String,
    pizzaprice:Number,
},{
    "collection":"shoppingcart"
});
var ShoppingModel = mongoose.model('shoppingcart',ShoppingSchema);
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));





app.get('/get-ingredients',(req,res)=>
{
    console.log("In get ingredients");
    mongoose.connect(dburl,(err)=>
    {
        if(err)
        {
            console.log("Db not Connected");
        }
        else
        {
            console.log("Db connected");
            if(IngredientModel.find({},(err,data)=>
            {
                if(err)
                {
                    console.log("Error in fetching data");
                }
                else
                {
                    res.json({status:true,ingredientdata:data});
                }
            }));
        }
    })
});
app.get('/get-pizza',(req,res)=>
{
    console.log("In get ingredients");
    mongoose.connect(dburl,(err)=>
    {
        if(err)
        {
            console.log("Db not Connected");
        }
        else
        {
            console.log("Db connected");
            if(PizzaModel.find({},(err,data)=>
            {
                if(err)
                {
                    console.log("Error in fetching data");
                }
                else
                {
                    res.json({status:true,pizzadata:data});
                }
            }));
        }
    })
});
app.post('/add-user',(req,res)=>{
    console.log("Adding User")
    const usernamerec = req.body.username;
    const useridrec = req.body.userid;
    const passwordrec = req.body.password;
    const phonenorec = req.body.phoneno;
    console.log("User name : " + usernamerec)
    let user =new UserModel({
        username:usernamerec,
        userid:useridrec,
        password:passwordrec,
        phoneno:phonenorec,
    });
    mongoose.connect(dburl,(err)=>
    {
        if(err)
        {
            console.log("Db connection error");
        }
        else
        {
            user.save((err)=>{
                if(err)
                {
                    res.json({status:false});
                }
                else
                {
                    res.json({status:true});
                }
            })
        
        }
    })
});
app.post('/login-user',(req,res)=>{
    const userid= req.body.userid;
    const password = req.body.password;
    console.log("In Login");
    mongoose.connect(dburl,(err)=>{
        if(err)
        {
            console.log("Db connection failed");
        }
        else
        {
            UserModel.find({userid:userid},(err,data)=>
            {
                if(err)
                {
                   console.log("Error in finding data")
                }
                else
                {
                    if(data.length == 1  && data[0].password==password)
                    {
                        res.json({status:true,msg:"Login",val:userid})
                    }
                    else
                    {
                       res.json({status:false,msg:"Invalid login credentials !"});
                    }

                }
            })
        }
    })
});
app.post('/shoppingcart',(req,res)=>{
    const userid=req.body.userid;
    const pizzaname= req.body.pizzaname;
    const img=req.body.img;
    const pizzaprice=req.body.pizzaprice;

    var item = new ShoppingModel({
    userid:userid,
    pizzaname:pizzaname,
    img:img,
    pizzaprice:pizzaprice,
    })
    mongoose.connect(dburl,(err)=>{
        if(err)
        {
            console.log("Error in Db Connection");
        }
        else
        {
            item.save((err)=>{
                if(err)
                {
                   console.log("Error");
                }
                else
                {
                    res.json({status:true,msg:"Added"});
                }
            })
        }
    })
});
app.get('/getpizzadata/:userid',(req,res)=>
{
   const userid= req.params.userid;

   mongoose.connect(dburl,(err)=>
   {
       if(err)
       {
           console.log("Db Error");
       }
       else
       {
           ShoppingModel.find({userid:userid},(err,data)=>
           {
               if(err)
               {
                   res.json({status:false,msg:'error occured'});
               }
               else
               {
                   //console.log(data[0]);
                   res.json({pizzadata:data});
               }
           })
       }
   })
});
app.post('/rp',(req,res)=>{
    var userid = req.body.userid;
    var pizzaname = req.body.pizzaname;
    console.log("in remove pizza");
    mongoose.connect(dburl,(err)=>{
        if(err)
        {
            console.log("Db error");
        }
        else
        {
            ShoppingModel.findOneAndDelete({userid:userid,pizzaname:pizzaname},(err)=>{
                if(err)
                {
                    console.log("Unable to delete");
                }
                else
                {
                    res.json({status:true});
                }
            })
        }
    })
});
app.listen(4003,()=>console.log("Server is listening on 4003"));





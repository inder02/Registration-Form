const express=require("express")
const mongoose=require("mongoose");
const bodyParser=require("body-parser")
const dotenv=require("dotenv")

const app=express();
dotenv.config();

const port=process.env.PORT || 3000;

const username=process.env.MONGODB_USERNAME;
const password=process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://indersagar4:UmB0gzNnHJxjVXAa@inder.vzxicbe.mongodb.net/?retryWrites=true&w=majority&appName=inder`,{useNewUrlParser: true,
useUnifiedTopology: true,})


const registrationSchema= new mongoose.Schema({
    name:String,
    email: String,
    password: String
})

const Registration= mongoose.model("Registration",registrationSchema)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/views/index.html")
})
app.post("/signup",async(req, res)=>{
    try {
        const{name, email,password}=req.body;
        const existingUser=await Registration.findOne({email: email})
        if(!existingUser){
              const registrationData=new Registration({
            name,
            email,
            password,
        });
       await registrationData.save();
       res.redirect("/success")
        }else{
            res.redirect("/error")
        }
    } catch (error) {
        console.log(error)
        res.redirect("/error")
    }
})
app.get("/success",(req, res)=>{
    res.sendFile(__dirname+"/views/success.html")
})

app.get("/error",(req, res)=>{
    res.sendFile(__dirname+"/views/error.html")
})


app.listen(port,()=>{
    console.log(`app is listening on ${port}`)
})
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose")
const date=require(__dirname+"/date.js")

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static("public"))

let elements=["buy veg and rice","clean it","cook it","eat it"];

let workElements=[]

mongoose.connect('mongodb://localhost:27017/todolistDB' , { useNewUrlParser: true , useUnifiedTopology: true });

const itemSchema=new mongoose.Schema({
    itemName:String
})

const Task=mongoose.model("Task", itemSchema)




app.get("/", function (req,res){

    // let day =date.getday()
    let day =date.getdate()

res.render("list", {Title : day, new_items:elements})

})

app.get("/work", function (req,res){
res.render("list",{Title:"work List",new_items:workElements})
})

app.get("/about" , function (req,res){
    res.render("about.ejs")
})

app.post("/work" , function (req,res){
     let elem=req.body.Todo_work;
    workElements.push(elem)
    res.redirect("/work");
})

app.post("/" , function (req,res){
  let ele=req.body.Todo_manual;
  elements.push(ele)
  res.redirect("/");
})







app.listen(3000, function (){
    console.log("Take off to 3000")
})


















 
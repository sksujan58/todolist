const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose")
const date=require(__dirname+"/date.js");
const _ = require('lodash');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static("public"))

// let elements=["buy veg and rice","clean it","cook it","eat it"];

let workElements=[]

mongoose.connect('mongodb+srv://sksujan58:Sksujan786@cluster0.q9rg5.mongodb.net/todolistDB' , { useNewUrlParser: true , useUnifiedTopology: true });

const itemSchema=new mongoose.Schema({
    itemName:String
})

const Task=mongoose.model("Task", itemSchema);

const task1=new Task({
    itemName:"Welcome to todolist!"
})

const task2=new Task({
    itemName:"Hit the + button to add new"
})

const task3=new Task({
    itemName:"<-- Hit the checkbox to delete"
})


const defaultTask=[task1,task2,task3]


const listSchema=mongoose.Schema({
    name:String,
    items:[itemSchema]
})



const List=mongoose.model("List",listSchema);




app.get("/", function (req,res){

    Task.find(function(err,tasks){
        if(!err){    
            if(tasks.length==0){
                Task.insertMany(defaultTask, function(err){
                    if (err){
                        console.log(err);
                    }
                    else{
                        console.log("Inserted Successfully")
                    }
                })                
                res.redirect("/")
            }
            else{
              res.render("list", {Title : "Today", new_items:tasks})
            }
        }
    })
})


app.get("/about" , function (req,res){
    res.render("about.ejs")
})



app.get("/:customListName", function(req,res){
   var customName=_.capitalize(req.params.customListName)
//    console.log(customName)
List.findOne({name:customName},function(err,foundlist){
    if(!err){
        if(!foundlist){
            const list=new List({
                name:customName,
                items:defaultTask
            })
         
         
            list.save();
            res.redirect("/"+customName)
        }
        else{
            res.render("list",{Title:foundlist.name,new_items:foundlist.items})
        }
    }
})
})

app.post("/" , function (req,res){
  let ele=req.body.Todo_manual;
  let subLoc=req.body.submitLocation;
  
 
    const newTask=new Task({
        itemName:ele
    })

if(subLoc=="Today"){
    newTask.save()  

    res.redirect("/");

}  
else{
    List.findOne({name:subLoc},function(err,foundList){
        foundList.items.push(newTask)
        foundList.save()
        res.redirect("/"+subLoc)
    })
}  


})


app.post("/delete", function(req,res){
    const itemId=req.body.checkBox
    let redirectLoc=req.body.listName;

    if(redirectLoc=="Today"){
        Task.findByIdAndRemove(itemId, function(err){
            if(!err){
                res.redirect("/")
            }
        })
    }
    else{
        List.findOneAndUpdate({name:redirectLoc}, {$pull:{items:{"_id":itemId}}}, function(err,foundList){
            if(!err){
                res.redirect("/"+redirectLoc)
            }
        })
    }
    
})




app.listen(3000, function (){
    console.log("Take off to 3000")
})


















 
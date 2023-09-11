import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";


mongoose.connect("mongodb+srv://tuladhar002:Flashfinal026@test-cluster.py7zslw.mongodb.net/to-do-listsDB", {useNewUrlParser: true}, { useUnifiedTopology: true });

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



//schema for to-do-list dbs

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, "No tasks added "],
    }
});

const Task = mongoose.model("Task", taskSchema);

function getDay(day){
    switch(day){
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        };
    return day;
};

function getCurrentDate(){
    const date = new Date().getDate();
    const year = new Date().getFullYear();
    var month  = new Date().getMonth();
    const day = new Date().getDay();
    var dayToday = getDay(day);

    switch(month){
        case 0:
            month = "Jamuary";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;  
    }
    return [date, month, year, dayToday];
}



const currentDate = getCurrentDate();
const currentDay = currentDate[0];
const currentMonth = currentDate[1];
const currentYear  = currentDate[2];
const currentWeekDay  = currentDate[3];

app.get("/", (req, res)=>{
    res.render("index.ejs", {
        day: currentDay,
        month: currentMonth,
        year: currentYear,
        week_day: currentWeekDay,
    });
})
app.get(["/logo-click","/home"], (req, res)=>{
    res.redirect("/");
});
app.get("/allTasks", async(req, res)=>{
    var data;
    try{
        const dbsTasks = Task.find();
        data = await dbsTasks.exec();

    }catch(err){
        console.log(err);
    };
    res.render("AllTasks.ejs",{
        task: data,  
    });
});

app.post("/createTask", async(req, res)=>{

    var task = new Task({
        task: req.body.newTask,
    });

    task.save();

    res.redirect("/allTasks");
});

app.post("/deleteTask", async(req,res)=>{

    await Task.deleteOne({_id: req.body.deleteItem});

    res.redirect("/allTasks");
});

// app.post("/doneTasks", async(req, res)=>{
//     var data;
//     try{
//         const dbsTasks = Task.find();
//         data = await dbsTasks.exec();

//     }catch(err){
//         console.log(err);
//     };

//      //done items
//      var isChecked="false";
//      if(req.body.checkbox==="on"){
//          isChecked="true";
//      }else{
//          isChecked="false";
//      };

//      res.render("AllTasks.ejs",{
//         task: data,
//         checked: isChecked,
//      })
   
// });

// app.get("/:customListName", async(req, res)=>{
//     console.log(req.params.customListName);
// });

app.listen(port, ()=>{
    console.log(`Listening to server on port ${port}`);
});
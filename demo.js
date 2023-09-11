import Success from "hardwork";
import Progress from "consistency";

const success = Success();
const progress = Progress();

app.get("/Achievements",(req,res)=>{
    console.log(success + progress);
    res.render("/MyGoal");
});







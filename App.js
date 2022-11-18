const express=require("express");
const https=require("https");
const bodyPar=require("body-parser");//to pass elements to machine from frontend!!

const app=express();

app.use(bodyPar.urlencoded({extended:true})); //using bodyparser in server app

app.get("/",function(req,res){//res indicated the data that will be sent to localhost:3000
    res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res){
    console.log();

    const appid="c358cd6043a889a7abddf7fa6873d4cf";
    const query=req.body.cityName;
    const unit="metric"

    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+appid;

    https.get(url,function(response){
        console.log(response.statusCode);//taking statuscode

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            // console.log(weatherData);
            // const object={
            //     name:" Gaurav ",
            //     placed:false,
            //     student:"bright"
            // }
            // JSON.stringify(object);//stringifying object!!

            // console.log(object);

            // const val=weatherData.main.temp;//finding data from the weatherData var taken form api
            // console.log(val);

            res.write("<p>The Weather is currently:"+ weatherData.weather[0].description+"</p>")
            res.write("<h1>The temp in "+query+" rn is : "+ weatherData.main.temp+"</h1>");
            
            res.send();
        })
    })
    // res.send("current weather data!");       can only be one res.send in one app.get!!!

})



app.listen(3000,function () {
    console.log("server running...");
})
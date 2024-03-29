const path = require("path");
const express = require("express");
const app = express();

//setting up the routers
const home = require("./Routers/home");
const car = require("./Routers/car");
const personal = require("./Routers/personal")

//setting up the middle ware
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));  //body parser
app.use(express.json());    //post request

const port = process.env.PORT || 4200

//home loan
app.use("/api/", home);

//Car Loans
app.use("/api/car", car);

//personal Loan
app.use("/api/personal", personal);

// app.get("/vivek", (req, res)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.status(200).json({
//         name: "vivek",
//         kaam: "saapo wali harkate"
//     })
// })

app.listen(port, ()=>{
    console.log(`server listening at port ${port}`);
})

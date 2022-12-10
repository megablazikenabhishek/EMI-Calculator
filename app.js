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

const hostname = "0.0.0.0"
const port = 4200

//home loan
app.use("/", home);

//Car Loans
app.use("/car", car);

//personal Loan
app.use("/personal", personal);


// app.listen(port, hostname, ()=>{
//     console.log(`server listening to port http://${hostname}:${port}`);
// })

app.listen(port, ()=>{
    console.log(`server listening to port http://${hostname}:${port}`);
})

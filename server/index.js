
const express= require('express');
const app=express();
const cors=require("cors");

const db=require('./models');

app.use(express.json());
app.use(cors());


//Routers
const accountRouter=require('./routes/Accounts');
app.use("/auth", accountRouter);

const employeeRouter=require('./routes/Employees');
app.use("/employee",employeeRouter);



db.sequelize.sync().then(()=>{

    app.listen(3001, ()=>{

        console.log("Server running on port :3001");
    
    })
    
    

})



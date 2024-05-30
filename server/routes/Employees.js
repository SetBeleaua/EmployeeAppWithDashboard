
const express=require('express');

const router=express.Router();

const {Employees}=require('../models');



router.get('/',async(req,res)=>{


    const employees=await Employees.findAll();


    res.json(employees);

});


router.post("/", async (req,res)=>{


    const {name,dob,phone,role}=req.body;


    Employees.create({
        name:name,
        dob:dob,
        phone:phone,
        role:role,

    });


    res.json("Employee aded with succes")
});


// Ruta delete

router.delete("/:id", async(req,res)=>{


    try{

        const employeeId=req.params.id;
        const employee=await Employees.findByPk(employeeId);
        if(!employee) return res.status(404).json({error:"Employee not found"})

        await employee.destroy();
        res.json("Succesfully deleted employee");


    }catch(error){

        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }




})


module.exports=router
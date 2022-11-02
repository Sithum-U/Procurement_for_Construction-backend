const express = require("express");
const CartItems = require("../models/CartItems");

const router = express.Router();

router.post("/", async(req,res)=>{
    //console.log(req.body)
    const data = new CartItems(req.body)
    const result = await data.save()

    if(!result){
        res.json({
            status: "FAILED",
            message: "Error"
        })
    }
    else{
        res.json({
            status: "SUCCESS",
            message: "Approval Requested",
            data:result
        })
    }
})

//get records
router.get("/", async(req,res)=>{
    try{
       const result = await CartItems.find()
       if(!result){
           res.json({
               status:"FAILED",
               message:"Not Found record"
           })
       }
       else{
           res.json({
               status:"SUCCESS",
               message:"Result Found",
               data:result
           })
       }
    }
    catch(e){
        console.log(e)
    }
})
module.exports = router;

import { Router, urlencoded } from "express";
import bcrypt, { compare, genSalt, hash } from "bcryptjs";
import { check, validationResult } from 'express-validator';
import userAuth from "../../middleware/userAuth";
import { sign } from "jsonwebtoken";
const config = require("config");
import Todo from "../../models/todo";
import mongoose from "mongoose";
import crypto from "crypto";

const router = Router();


// @route       POST /api/user/get
// @desc        Get Game Data
// @access      Public
router.get("/", userAuth, async (req, res) => {
  //**********************************Handler Code**********************************/
  try {
    var user = await User.findById(
      mongoose.Types.ObjectId(req.userData.id)
    ).select("-password -email");
    res.json(user);
  } catch (err) {
    res.status(500).json(errorMessage("Server Error!"));
  }
});

// @route       POST /api/todo/
// @desc        Get Game Data
// @access      Public
router.post("/", async (req, res) => {
  //**********************************Handler Code**********************************/
  try {
    const {
      name,
      
    } = req.body;
  
    const todo= Todo.find({name:name},async (err, result) => {
      if (err) {
          throw err;
      } else {  
         return res.status(200).json({result:result});
      }
  }).exec();
  
  } catch (err) {
    res.status(500).json({ errors: { msg: "Server Error!" } });
  }
});


//@route       POST /api/todo/create
//@desc        Create task
//@access      Public
router.post("/create", async (req, res) => {
  //**********************************Handler Code**********************************/
  try {
    const {
      name,
      task,
      done,
      day
    } = req.body;

    console.log("Task",task);
    if(task != ''){
      let todoData = new Todo({
        name,
        task,
        done,
        day
      });
      await todoData.save();
      return res.status(200).json({msg:"successfully added!"});
    }
    

    // let todoData = await Todo.find({
    //   name
    // }); 
    
    // if(todoData.length == 0){
    //    todoData =  Todo({
    //     name
    //   }); 
    //   await todoData.save();
    // }
    // let id=todoData[todoData.length-1]._id;
    // console.log(id);
    // let TodoUpdate= await Todo.findOneAndUpdate(
    //   { _id: id},
    //   {
    //     $addToSet: {
    //       daysDetails: {
    //         task:task,
    //         done:done,
    //         day:day
    //       },
    //       doneDetails: {
    //         allDone:false,
    //         day:day
    //       }
    //     },
    //   },
    //   {new: true },
    //   async (err, result) => {
    //     if(err){
    //       console.log(err);
    //       throw err;
    //     }
        
    //   });
    // await TodoUpdate.save();
    // console.log("update",TodoUpdate);
    
  } catch (err) {
    res.status(500).json({ errors: { msg: "Server Error!" } });
  }
});


//@route       POST /api/todo/remove
//@desc        Remove task
//@access      Public
router.post("/remove", async (req, res) => {
    //**********************************Handler Code**********************************/
    try {

      const {
        task,
        day
      } = req.body;
    Todo.deleteOne({task:task,day:day}, async (err, result) => {
        if (err) {
            console.log(err);
        } else {  
            return res.status(200).json({  msg: "Successfully Removed!" } );
        }
      });
      
      
    } catch (err) {
      res.status(500).json({ errors: { msg: "Server Error!" } });
    }
  });



//@route       POST /api/todo/update
//@desc        Update task
//@access      Public
router.post("/update", async (req, res) => {
    //**********************************Handler Code**********************************/
    try {
      const {
        name,
        task,
        done,
        day,
        allDone
      } = req.body;
      console.log(req.body);
  
      Todo.findOneAndUpdate({ name:name,task:task, day:day},
        {done:done, allDone:allDone},{ new: true },
        async (err, result) => {
          if (err) {
              console.log(err);
            throw err;
          } else {  
            await result.save();
          }     
        });
        
          const updateMany= await Todo.updateMany({ name:name,day:day, done:{$eq : true}},
            {allDone:allDone},{ new: true },
            async (err, result) => {
              if (err) {
                  console.log(err);
              } else {  
                console.log("updateMany result ",result);             
                
              }     
            });
            await updateMany.save();

        
          return res.status(200).json({msg:"successfully updated!"});
    } catch (err) {
      res.status(500).json({ errors: { msg: "Server Error!" } });
    }
  });

  router.post("/edit", async (req, res) => {
    //**********************************Handler Code**********************************/
    try {
      const {
        name,
        task,
        done,
        day,
        allDone
      } = req.body;
      console.log(req.body);
  
      Todo.findOneAndUpdate({ name:name,day:day,done:done,allDone},
        {task:task},{ new: true },
        async (err, result) => {
          if (err) {
              console.log(err);
            throw err;
          } else {  
            await result.save();
          }     
        });
               
        return res.status(200).json({msg:"successfully updated!"});
    } catch (err) {
      res.status(500).json({ errors: { msg: "Server Error!" } });
    }
  });


//@route       POST /api/todo/getAll
//@desc        Get All tasks
//@access      Public
router.post("/getAll", async (req, res) => {
    //**********************************Handler Code**********************************/
    try {
      const {
        name,
        day
      } = req.body;
    
      const todo= Todo.find({name:name, day:day},async (err, result) => {
        if (err) {
            throw err;
        } else {  
           return res.status(200).json({result:result});
        }
    }).exec();
    
    } catch (err) {
      res.status(500).json({ errors: { msg: "Server Error!" } });
    }
  });
  



export default router;

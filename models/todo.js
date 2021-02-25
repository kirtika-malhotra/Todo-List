import { Schema, model } from "mongoose";

const ToDoSchema = Schema({
    name: {
      type: String,
    },
    task: {
      type: String,
    },
    done: {
      type: Boolean,
    },
    day:{
        type:String
    },
    allDone:{
      type:String,
      default:false
    }  
});

// const ToDoSchema = Schema({
//   name: {
//     type: String,
//   },
//   daysDetails:[{
//     task: {
//       type: String,
//     },
//     done: {
//       type: Boolean,
//     },
//     day:{
//         type:String
//     }
//   }],
//   doneDetails:[{
//     day:{
//       type:String
//     },
//     allDone:{
//       type:String,
//       default:false
//     }
//   }]
  
// });

export default model("todo", ToDoSchema);

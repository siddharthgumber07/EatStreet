import mongoos from "mongoose";

const foodSchema = new mongoos.Schema({
    name: {type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

const foodModel=mongoos.models.food || mongoos.model("food",foodSchema);

export default foodModel;
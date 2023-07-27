const express=require("express");
const app=express();
const mongoose=require("mongoose");
const {graphqlHTTP}=require("express-graphql")
const schema=require("./schema/schema");

const dotenv=require("dotenv")
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then((()=>{
    console.log("DB is connected");
}))
.catch(((err)=>{
    console.error(err);
}))



app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true,
}))



app.listen(5010,()=>{
    console.log("Server is running");
})
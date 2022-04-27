import mongoose from "mongoose";
const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/next_auth");
        console.log("connection succesfullly");
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;
import mongoose from "mongoose";
import config from "../config"; 
import Movie from "../models/Movie";
import Review from "../models/Review";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    mongoose.set('autoCreate', true); //옵션 설정

    console.log("Mongoose Connected ...");

    Movie.createCollection().then(function (collection) {
      console.log("Movie collection created");
    });
    Review.createCollection().then(function (collection) {
      console.log("Review collection created");
    });

  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;

//User collection 만들기
import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";

const UserSchema = new mongoose.Schema({
    name: {
        type: String, //타입 지정(mongoDB 타입에 맞추기)
        required: true //not null 
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true //UNIQUE함, 중복X
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    school: {
        name: { type: String },
        major: { type: String }
    }
});

//document와 UserInfo 묶어서 model로, "User"라는 이름으로 UserSchema를 내보내겠다
export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema);

import mongoose from "mongoose";
import { UserCreateDto } from "./UserCreateDto";

//UserCreateDto 가져와서 확장시키기
export interface UserResponseDto extends UserCreateDto{
    _id: mongoose.Schema.Types.ObjectId;
}
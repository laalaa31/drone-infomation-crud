//User collection에 맞는 인터페이스 정의
import { SchoolInfo } from "../school/SchoolInfo";

export interface UserInfo {
    name: string;
    phone: string;
    email: string;
    password: string;
    age: number;
    school: SchoolInfo;
}
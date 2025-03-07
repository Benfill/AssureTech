import { Role } from "./Role";

export interface User {
    id:number;
    firstName:string;
    lastName:string;
    phone:string;
    email:string;
    roles: Role[];
    enable:boolean
    createdAt: Date | null;
    updatedAt: Date | null
}
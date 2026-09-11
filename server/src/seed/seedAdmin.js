import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { ROLES } from "../constants/roles.js";

export async function seedAdmin() {
  const existing=await User.findOne({email:"admin@example.com"});
  if(existing) return existing;
  const passwordHash=await bcrypt.hash("Admin@123",12);
  return User.create({name:"System Administrator",email:"admin@example.com",passwordHash,role:ROLES.ADMIN});
}

import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import adminsRepo from "./api/Admin/AdminRepository";
import { startDB, stopDB } from "./database";

async function seedAdmin() {
  const password = await bcrypt.hash("123123123", 10);
  await adminsRepo.create({
    password,
    type: "superAdmin",
    name: "sakan admin",
    email: "bebofit@uact.com"
  });
}

(async function seed() {
  await startDB();
  await seedAdmin();
  await stopDB();
})();

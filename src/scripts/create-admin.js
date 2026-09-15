import "dotenv/config";

import mongoose from "mongoose";

import User from "../src/models/user.model.js";
import { hashPassword } from "../src/utils/password.js";

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await User.findOne({
      role: "admin",
    });

    if (existingAdmin) {
      throw new Error("An admin account already exists");
    }

    const passwordHash = await hashPassword(process.env.ADMIN_PASSWORD);

    const admin = await User.create({
      firstName: process.env.ADMIN_FIRST_NAME,

      lastName: process.env.ADMIN_LAST_NAME,

      email: process.env.ADMIN_EMAIL.toLowerCase(),

      passwordHash,

      role: "admin",

      isActive: true,
    });

    console.log(`Admin account created: ${admin.email}`);
  } catch (error) {
    console.error("Failed to create admin:", error.message);

    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();

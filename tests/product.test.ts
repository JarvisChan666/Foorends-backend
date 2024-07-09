import mongoose from "mongoose";
import request from "supertest";
import {app} from "../src/index";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";


import {afterEach, beforeEach, describe, it, expect} from "@jest/globals";

dotenv.config();

// Generate a random ID
const randomId = uuidv4();

/* 在每次测试前连接到数据库。*/
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
});

/* 每次测试后关闭数据库连接。*/
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/my/user", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/my/user").send({
      clerkId: randomId,
      email: "7447@qq.com",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.clerkId).toBe(randomId);
  });
});

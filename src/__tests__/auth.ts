import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import createApp from "../app";
import { AuthServices } from "../app/modules/auth/auth.services";
import { TUser } from "../app/modules/auth/auth.interface";

const registerData: TUser = {
  username: "hasan",
  password: "hasan123",
  role: "user"
};

const userData: TUser = {
  username: "test",
  password: "test123",
  role: "user"
};

const app = createApp();

describe("Auth", () => {
  let mongod: MongoMemoryServer;
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  describe("Auth Register route", () => {
    it("should return username after register", async () => {
      
      const { statusCode, body } = await supertest(app).post(
        `/auth/register`, 
      ).send(registerData);

      expect(statusCode).toBe(201);
      expect(body.data.username).toBe(registerData.username);
    });
  });
  
  describe("Auth login route", () => {
    it("should return token after login", async () => {
      await AuthServices.createUserIntoDB({...userData});
      
      const { statusCode, body } = await supertest(app).post(
        `/auth/login`, 
      ).send({username: userData.username, password: userData.password});

      expect(statusCode).toBe(200);
      expect(body.data).toHaveProperty("token");
    });
  });
});

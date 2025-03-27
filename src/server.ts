import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import createApp from "./app";
import { Application } from "express";
// import app from "./app";

const app: Application = createApp();

let server: Server;

function main() {
  try {    
    server = app.listen(config.port, async () => {
      await mongoose.connect(config.database_url as string);
      console.log(`pxlhunt secure auth is listening on ${config.port}`);
    });
  } catch (err) {
    console.log(err)
  }
}

main()

process.on("unhandledRejection", () => {
  console.log("unhandledRejection. shutting down server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("uncaughtException. shutting down");
  process.exit(1);
});

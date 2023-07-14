import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { Server } from "http";

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string); //"mongodb://127.0.0.1:27017/book-catalog"
    console.log("Database Connected Successfully");

    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Database Connection failed", error);
  }

  process.on("unhandledRejection", (error) => {
    console.log(
      "Unhandled Rejection is detected, We are closing our server...."
    );

    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");

  if (server) {
    server.close();
  }
});

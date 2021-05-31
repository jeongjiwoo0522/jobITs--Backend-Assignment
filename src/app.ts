import dotenv from "dotenv";
import { initApplication } from "./loader";

dotenv.config();

initApplication()
  .catch((err) => {
    console.error(err);
    console.error("server start failed");
  });

process.on("uncaughtException", (err: Error) => {
  console.error(err);
});

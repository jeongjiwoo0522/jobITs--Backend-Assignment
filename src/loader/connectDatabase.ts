import { createConnection } from "typeorm";
import { connectionOption } from "../config/ormconfig";

export const connectDatabase = () => {
  return new Promise((resolve, reject) => {
    createConnection(connectionOption).then((c) => {
      console.log("Database Connect Success");
      resolve(null);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
  });
}

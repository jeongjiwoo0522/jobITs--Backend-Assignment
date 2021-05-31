import path from "path";
import { config } from "dotenv";

config({ path: path.join(__dirname, "..", ".env") });

export default {
  port: +process.env.PORT,
  mysql: {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
  },
  jwtSecret: process.env.JWT_SECRET,
};

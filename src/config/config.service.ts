import * as fs from "fs";
import { parse } from "dotenv";

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    // If the environment is not a production environment, you must load the variables from the .env file
    if (process.env.NODE_ENV !== "production") {
      // For this we establish the file path
      const envFilePath = `${__dirname}/../../.env`;
      // We check that it exists
      const existsPath = fs.existsSync(envFilePath);
      // If it does not exist we will log an error
      if (!existsPath) {
        console.log(".env file does not exists");
        // And we finish the process
        process.exit(0);
      }
      // We read the file and convert the values ​​to be used
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

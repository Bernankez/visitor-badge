import process from "node:process";
import { loadConfig as _loadConfig } from "c12";
export async function loadConfig() {
  await _loadConfig({
    dotenv: true
  });
  const {
    MONGODB_HOST: mongodbHost = "localhost",
    MONGODB_PORT: mongodbPort = 27017,
    MONGODB_DATABASE: mongodbDatabase = "counter",
    MONGODB_USER: mongodbUser,
    MONGODB_PASSWORD: mongodbPassword,
    MONGODB_SRV: mongodbSRV = "false"
  } = process.env;
  return {
    mongodbDatabase,
    mongodbHost,
    mongodbPassword,
    mongodbPort,
    mongodbUser,
    mongodbSRV: mongodbSRV === "true"
  };
}

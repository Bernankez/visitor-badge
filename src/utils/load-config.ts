import { loadConfig as _loadConfig } from "c12";

export async function loadConfig() {
  await _loadConfig({});
  const {
    MONGODB_HOST: mongodbHost = "localhost",
    MONGODB_PORT: mongodbPort = 27017,
    MONGODB_DATABASE: mongodbDatabase = "counter",
    MONGODB_USER: mongodbUser,
    MONGODB_PASSWORD: mongodbPassword,
  } = process.env;
  return {
    mongodbDatabase,
    mongodbHost,
    mongodbPassword,
    mongodbPort,
    mongodbUser,
  };
}

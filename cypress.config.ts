require("dotenv").config({ path: "./.env" });
import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    loginUsername: process.env.CYPRESS_FAKE_USERNAME,
    loginPassword: process.env.CYPRESS_FAKE_PASSWORD,
    invalidUsernameShort: process.env.CYPRESS_INVALID_USERNAME_SHORT,
    invalidUsernameLong: process.env.CYPRESS_INVALID_USERNAME_LONG,
    invalidPassword: process.env.CYPRESS_INVALID_PASSWORD,
    invalidEmail: process.env.CYPRESS_INVALID_EMAIL,
    validUsername: process.env.CYPRESS_VALID_USERNAME,
    validPassword: process.env.CYPRESS_VALID_PASSWORD,
    validEmail: process.env.CYPRESS_VALID_EMAIL,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:4000/",
  },
});

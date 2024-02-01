require("dotenv").config({ path: "./.env" });
import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    loginUserName: process.env.CYPRESS_FAKE_USERNAME,
    loginPassword: process.env.CYPRESS_FAKE_PASSWORD,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

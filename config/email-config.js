require("dotenv").config({ path: "./.env" });

const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications["api-key"];
const sibAPI = process.env.SENDINBLUEAPI;
apiKey.apiKey = sibAPI;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

module.exports = apiInstance;

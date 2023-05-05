const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = "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";

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

module.exports = apiInstance;

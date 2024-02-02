// jest.config.js

module.exports = {
  testEnvironment: "node", // Or 'jsdom' if testing browser-based code
  // Other configuration options...
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};

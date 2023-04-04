// I tried for almost 2 hours making a normal import and config it later, but it fails all the time, something related to typescript,
// finally I found this way that works, don't know really the difference, but eslint doesn't like, so... Sorry if this is too bad,
// node is not my world, and I am suffering a little with dependencies.
/* eslint @typescript-eslint/no-var-requires: "off" */
require("dotenv").config({ path: "./.env" });
module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/test/**/*.test.(ts|js)"],
  testEnvironment: "node",
};

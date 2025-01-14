export default {
  clearMocks: true,
  restoreMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "text",
    "lcov"
  ],
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  watchPathIgnorePatterns: ["node_modules"],
  transformIgnorePatterns: ["node_modules"],
  collectCoverageFrom: [
    // ignorar o index.js porque é a camada que expõe o código e não traz regras de negócio.
    "src/**/*.js", "!src/**/index.js"
  ]
};

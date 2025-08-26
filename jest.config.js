/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    // Mock de estilos (evita erro ao importar .css/.scss etc.)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Mock de arquivos estáticos (imagens, fontes…)
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testMatch: ["**/?(*.)+(test|spec).[jt]sx?"],
};

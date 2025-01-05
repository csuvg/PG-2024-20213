module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
}

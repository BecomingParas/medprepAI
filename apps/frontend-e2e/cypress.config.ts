const { nxE2EPreset } = require('@nx/cypress/plugins/cypress-preset');
const { defineConfig } = require('cypress');
module.exports = defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run @sass-project/frontend:dev',
      },
      ciWebServerCommand: 'npx nx run @sass-project/frontend:start',
      ciBaseUrl: 'http://localhost:3000',
    }),
    baseUrl: 'http://127.0.0.1:3000',
  },
});

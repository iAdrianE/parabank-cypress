const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    watchForFileChanges: false, // ANADIDO PARA PODER REVISAR LOS CAMBIOS DE REGISTER DE FORMA VISUAL CON CYPRESS.    
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Integración de mochawesome reporter
      require("cypress-mochawesome-reporter/plugin")(on);

      config.reporter = "cypress-mochawesome-reporter", // Reporteador
      config.reporterOptions = {
        charts: true,
        reportPageTitle: 'Reporte de pruebas Parabank',
        embeddedScreenshots: true,
        inlineAssets: true,
        htlm: true,
        saveAllAttempts: true , // Guarda todos los intentos de prueba.
        reportDir: 'cypress/reports/mochawesome',
        overwrite: false,                     // EVITA QUE SE SOBREESCRIBAN reportes
        timestamp: 'mmddyyyy_HHMMss'  ,        // Agrega marca de tiempo a cada archivo
         reportFilename: `${config.env.reportName || 'report'}_report`, // Nombre del archivo de reporte
      };
      return config;
      
    }
  },
});

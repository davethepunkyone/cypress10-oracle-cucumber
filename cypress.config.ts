import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
const oracledb = require("oracledb");
const env_data = require('./cypress.env.json');

oracledb.initOracleClient({ libDir: env_data.oracleInstantClient });

const queryData = async(query: string, dbconfig: any) => {
  let conn: any;
  try {
    conn = await oracledb.getConnection(dbconfig);
    return await conn.execute(query);
  } catch(err) {
    console.log(`Error -> ${err}`)
    return err
  } finally {
    if (conn) {
      try {
        conn.close();
      } catch(err) {
        console.log(`Error -> ${err}`)
      }
    }
  }
}

async function setupNodeEvents(
  on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions ): Promise<Cypress.PluginConfigOptions> {
    await addCucumberPreprocessorPlugin(on, config);

    on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      })
    );

    on("task", {
      sqlQuery: (query) => {
        return queryData(query, env_data.db);
      },
    });

    // Make sure to return the config object as it might have been modified by the plugin.
    return config;
}

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    supportFile: false,
    setupNodeEvents,
  },
});

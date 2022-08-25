# cypress10-oracle-cucumber
A repo showing a templated use of Cypress 10 configured to use Cucumber working with oracledb.

This implementation is inspired by [this article](https://developers.ascendcorp.com/connecting-oracle-database-in-cypress-project-cbcd3bfabdbd) by Poopae Paisingkhon.  The
implementation referenced in the article is designed with previous versions of Cypress 
utilizing the /plugin directory, [which has now been depreciated](https://docs.cypress.io/guides/references/migration-guide#Plugins-File-Removed).

This uses logic in the article above but places it directly within [cypress.config.ts](cypress.config.ts), but it otherwise
works in the same way.

## Using features in Cypress

This project uses the cypress-cucumber-preprocessor to allow for the creation of Given, When, Then steps and the use of feature
files instead of spec files. Examples of steps using Cucumber can be found in the 
[general-steps.ts](cypress/support/step_definitions/general-steps.ts) file, whilst the implementation of these steps in a feature
can be found in [Test.feature](cypress/e2e/Test.feature).

## Configuring the database connection

To utilize the oracledb functionality, the following needs to be set in the [cypress.env.json](cypress.env.json) file:

* __oracleInstantClient__: The path to the [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client/downloads.html) directory on the machine executing the tests.
* __db.user__: The username for the database user.
* __db.password__: The password for the database user.
* __db.connectString__: The connection string used for the database, probably along the lines of `<host>:<port>/<sid>`.

## Using in steps

The [database-steps.ts](cypress/support/step_definitions/database-steps.ts) file has an example of how to run a simple SQL query
formatted in a given step.  The feature file present doesn't include this step, only because there is no defaulted Oracle database
and a database configuration is required to make the step work.

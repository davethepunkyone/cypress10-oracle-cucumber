import { When } from "@badeball/cypress-cucumber-preprocessor";

/** Retrieve id for user and put in Cypress.env . */
When("I retrieve an ID from the database", () => {
    const query = "SELECT id FROM users FETCH NEXT 1 ROWS ONLY"
    cy.task("sqlQuery", query).then((resolvedValue: any) => {
        resolvedValue["rows"].forEach((item: any) => {
            // Print id to log and then populate into Cypress.env
            cy.log("id = " + item)
            Cypress.env('id', item)
        });
    })
})

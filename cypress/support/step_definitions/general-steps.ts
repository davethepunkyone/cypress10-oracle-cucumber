import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I go to duckduckgo.com", () => {
    cy.visit("http://www.duckduckgo.com")
})

When("I search for the term: {string}", (searchTerm: string) => {
    cy.get('input[name="q"]').type(searchTerm + "{enter}")
    Cypress.env('searchTerm', searchTerm)
})

Then("The url contains the searched term", () => {
    cy.url().should('contain', Cypress.env('searchTerm'))
})

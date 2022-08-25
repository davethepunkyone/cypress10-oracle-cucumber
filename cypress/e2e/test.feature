Feature: Test Feature

Scenario: Basic scenario
    Given I go to duckduckgo.com
    When I search for the term: "Test"
    Then The url contains the searched term

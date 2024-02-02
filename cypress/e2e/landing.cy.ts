describe("landing page", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl + "");
  });
  it("should load content", () => {
    cy.get("body").should("exist");
    cy.get("a.brand-title").should("exist");

    cy.get('[data-cy="main-container"]').should("exist");
  });
  it("should navigate to login", () => {
    cy.get("#landing-log-in").click();
    cy.url().should("eq", Cypress.config().baseUrl + "login");
  });
  it("should navigate to signup", () => {
    cy.get("#landing-signup").click();
    cy.url().should("eq", Cypress.config().baseUrl + "signup");
  });
  it("should create guest instance", () => {
    cy.get(".landing-login-guest-button ").click();

    cy.url().should("eq", Cypress.config().baseUrl);
  });
  it("logo should navigate home", () => {
    cy.visit("signup");
    cy.get("a.brand-title").click();
    cy.url().should("eq", Cypress.config().baseUrl);
  });
});

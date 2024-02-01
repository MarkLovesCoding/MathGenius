describe("login spec", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl + "login");

    cy.get('input[name="username"]').type(Cypress.env("loginUsername"));
    cy.get('input[name="password"]').type(Cypress.env("loginPassword"));

    // Submit the form by click
    cy.get('button[data-cy="login-button"]').click();
  });
  it("should load content", () => {
    cy.get("body").should("exist");
    cy.get("a.brand-title").should("exist");
    cy.get("a.brand-title").should("exist");
    cy.get("a.brand-title").should("exist");
    cy.get("a.brand-title").should("exist");
    cy.get("a.brand-title").should("exist");
  });
});

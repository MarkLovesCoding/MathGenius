describe("login spec", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl + "login");

    cy.get('input[name="username"]').type(Cypress.env("loginUsername"));
    cy.get('input[name="password"]').type(Cypress.env("loginPassword"));

    // Submit the form by click
    cy.get('button[data-cy="login-button"]').click();

    cy.get("div#burger-container").click();
    cy.get("a#profile-nav").click();
    cy.url().should("include", "/profile");
  });

  it("should check profile page components", () => {
    cy.get("#profile-container").should("exist");

    cy.get("#avatar-modal").should("have.css", "display", "none");
    cy.get("#profile-user-avatar").should("exist").click();
    cy.get("#avatar-modal").should("have.css", "display", "flex");
    cy.get("#avatar-modal-close").should("exist").click();
    cy.get("#avatar-modal").should("have.css", "display", "none");
  });
});

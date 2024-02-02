describe("learning spec", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl + "login");

    cy.get('input[name="username"]').type(Cypress.env("loginUsername"));
    cy.get('input[name="password"]').type(Cypress.env("loginPassword"));

    // Submit the form by click
    cy.get('button[data-cy="login-button"]').click();
    cy.wait(500);
    cy.visit(Cypress.config().baseUrl + "learning");
  });
  it("should check general content", () => {
    cy.get("body").should("exist");
    cy.get("a.brand-title").should("exist");
    cy.wait(300);
    cy.get("div#burger").should("exist");
  });
  it("should check learning menu content", () => {
    cy.get("div#new-times-tables").should("exist").click();
    cy.url().should("include", "/learning/times-table");
    cy.wait(300);
    cy.get('div[data-cy="times-table-content"]').should("not.be.empty");
  });
  it("should check fractions lesson page", () => {
    cy.get("div#new-fractions").should("exist").click();
    cy.url().should("include", "/learning/fractions");
    cy.wait(200);
    cy.get('div[data-cy="fraction-lesson-1"]').should("have.class", "active");
    cy.get('div[data-cy="fraction-lesson-2"]').should(
      "not.have.class",
      "active"
    );
    cy.get('button[data-cy="fraction-next-button"]').should("exist").click();

    cy.get('div[data-cy="fraction-lesson-1"]').should(
      "not.have.class",
      "active"
    );
    cy.get('div[data-cy="fraction-lesson-2"]').should("have.class", "active");
    cy.get('button[data-cy="fraction-prev-button"]').should("exist").click();
    cy.wait(100);
    cy.get('div[data-cy="fraction-lesson-1"]').should("have.class", "active");
    cy.get('div[data-cy="fraction-lesson-2"]').should(
      "not.have.class",
      "active"
    );
  });
});

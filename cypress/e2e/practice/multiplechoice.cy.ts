describe("practice spec", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl + "login");

    cy.get('input[name="username"]').type(Cypress.env("loginUsername"));
    cy.get('input[name="password"]').type(Cypress.env("loginPassword"));

    // Submit the form by click
    cy.get('button[data-cy="login-button"]').click();
    cy.wait(500);
    cy.visit(Cypress.config().baseUrl + "practice");
  });
  it("should check general content", () => {
    cy.get("body").should("exist");
    cy.get("a.brand-title").should("exist");
    cy.wait(300);
    cy.get("div#burger").should("exist");
  });

  it("should check full multiple choice practice flow and content", () => {
    cy.get("div#new-mc").should("exist").click();
    // cy.url().should("include", "/learning/times-table");
    cy.wait(300);
    cy.get("div#operator-menu-container").should("exist");
    cy.get("div#add").should("exist");
    cy.get("div#sub").should("exist");
    cy.get("div#mul").should("exist");
    cy.get("button#operator-practice-menu-backward-lower").should("exist");
    cy.get("div#div").should("exist").click();
    cy.wait(200);
    cy.get("div#difficulty-menu-container").should("exist");
    cy.get("div#selected-activity-menu-diff").should(
      "have.text",
      "Multiple Choice Practice"
    );
    cy.get("div#selected-operator-menu").should("have.text", "Division");

    cy.wait(200);

    cy.get("input#range-input").invoke("val", 3).trigger("input");

    cy.wait(200);
    cy.get("#level-text").should("have.text", "Intermediate");
    cy.get("button#difficulty-menu-backward-lower").should("exist");
    cy.get("button#difficulty-menu-forward").should("exist").click();

    cy.wait(200);
    cy.get("div#mc-container").should("exist");
    cy.window().then((win) => {
      const activeDifficulty = win.sessionStorage.getItem("activeDifficulty");
      const activity = win.sessionStorage.getItem("activity");
      const activeOperators = win.sessionStorage.getItem("activeOperators");
      // Perform assertions or further actions based on sessionData
      expect(activeDifficulty).to.equal("3");
      expect(activity).to.equal("multiple-choice");
      expect(activeOperators).to.equal("÷");
      // Unit testing fills rest of checks.
    });
    cy.get("h2#activity-title-mc").should(
      "contain",
      "Multiple Choice Practice"
    );
    cy.get("div#selected-operator-container-general").should(
      "contain",
      "Division"
    );
    cy.get("div#selected-difficulty-general").should("contain", "Intermediate");
  });
});

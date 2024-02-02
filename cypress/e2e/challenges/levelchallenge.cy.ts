describe("challenges spec", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl + "login");

    cy.get('input[name="username"]').type(Cypress.env("loginUsername"));
    cy.get('input[name="password"]').type(Cypress.env("loginPassword"));

    // Submit the form by click
    cy.get('button[data-cy="login-button"]').click();
    cy.wait(500);
    cy.visit(Cypress.config().baseUrl + "challenges");
  });
  it("should check general content", () => {
    cy.get("body").should("exist");
    cy.get("a.brand-title").should("exist");
    cy.wait(300);
    cy.get("div#burger").should("exist");
  });

  it("should check full level challenge  flow and content", () => {
    cy.get("div#new-game").should("exist").click();
    // cy.url().should("include", "/learning/times-table");
    cy.wait(300);
    cy.get("div#operator-menu-container").should("exist");
    cy.get("div#add").should("exist");
    cy.get("div#div").should("exist");
    cy.get("div#mul").should("exist");
    cy.get("button#operator-test-menu-backward-lower").should("exist");
    cy.get("div#sub").should("exist").click();
    // cy.wait(200);

    cy.wait(200);
    cy.get("div#game-container").should("exist");
    cy.window().then((win) => {
      const activeDifficulty = win.sessionStorage.getItem("activeDifficulty");
      const activity = win.sessionStorage.getItem("activity");
      const activeOperators = win.sessionStorage.getItem("activeOperators");
      // Perform assertions or further actions based on sessionData
      expect(activeDifficulty).to.equal("1");
      expect(activity).to.equal("game");
      expect(activeOperators).to.equal("-");
      // Unit testing fills rest of checks.
    });
    cy.get("h2#activity-title-game").should("contain", "Level Challenge");
    cy.get("div#selected-operator-container-general").should(
      "contain",
      "Subtraction"
    );
    cy.get("div#selected-difficulty-general").should("contain", "Easy");
  });
});

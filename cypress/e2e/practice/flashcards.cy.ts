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

  it("should check full flash cards practice menu flow and content", () => {
    cy.get("div#new-flash").should("exist").click();
    // cy.url().should("include", "/learning/times-table");
    cy.wait(300);
    cy.get("div#operator-menu-container").should("exist");
    cy.get("div#add").should("exist");
    cy.get("div#sub").should("exist");
    cy.get("div#div").should("exist");
    cy.get("button#operator-practice-menu-backward-lower").should("exist");
    cy.get("div#mul").should("exist").click();
    cy.wait(200);
    cy.get("div#difficulty-menu-container").should("exist");
    cy.get("div#selected-activity-menu-diff").should(
      "have.text",
      "Flash Cards"
    );
    cy.get("div#selected-operator-menu").should("have.text", "Multiplication");

    cy.wait(200);

    cy.get("input#range-input").invoke("val", 5).trigger("input");

    cy.wait(200);
    cy.get("#level-text").should("have.text", "Genius!");
    cy.get("button#difficulty-menu-backward-lower").should("exist");
    cy.get("button#difficulty-menu-forward").should("exist").click();

    cy.wait(200);
    cy.get("div#flash-container").should("exist");
    cy.window().then((win) => {
      const activeDifficulty = win.sessionStorage.getItem("activeDifficulty");
      const activity = win.sessionStorage.getItem("activity");
      const activeOperators = win.sessionStorage.getItem("activeOperators");
      // Perform assertions or further actions based on sessionData
      expect(activeDifficulty).to.equal("5");
      expect(activity).to.equal("flash");
      expect(activeOperators).to.equal("x");
      // Unit testing fills rest of checks.
    });
    cy.get("h2#activity-title-flash").should("contain", "Flash Cards Practice");
    cy.get("div#selected-operator-container-general").should(
      "contain",
      "Multiplication"
    );
    cy.get("div#selected-difficulty-general").should("contain", "Genius!");
    cy.get("div#flash-card").should("exist").should("not.have.class", "flip");
    cy.get("div#flash-card").click().should("have.class", "flip");
    cy.get("div#flash-card").click().should("not.have.class", "flip");
  });
});

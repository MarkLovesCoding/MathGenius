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
    cy.wait(300);
    cy.get("div#burger-container").should("exist");
  });
  it("profile should navigate to profile page on avatar click", () => {
    cy.wait(1000);
    cy.get("#profile-user-avatar").click();
    cy.wait(1000);
    cy.url().should("eq", Cypress.config().baseUrl + "profile");
  });
  it("should reveal burger nav and try each path", () => {
    cy.get("div#burger").should("not.have.class", "active").click();
    cy.get("div#burger").should("have.class", "active");
  });
  it("should navigate path to home page", () => {
    cy.get("div#burger-container").click();
    cy.get("a#home-nav").should("exist").and("be.visible").click();
    cy.url().should("include", "/");
    cy.go("back");
  });
  it("should navigate path to profile page", () => {
    cy.get("div#burger-container").click();
    cy.get("a#profile-nav").should("exist").and("be.visible").click();
    cy.url().should("include", "/profile");
    cy.go("back");
  });
  it("should navigate path to challenges page", () => {
    cy.get("div#burger-container").click();
    cy.get("a#test-nav").should("exist").and("be.visible").click();
    cy.url().should("include", "/challenges");
    cy.go("back");
  });
  it("should navigate path to practice page", () => {
    cy.get("div#burger-container").click();
    cy.get("a#practice-nav").should("exist").and("be.visible").click();
    cy.url().should("include", "/practice");
    cy.go("back");
  });
  it("should navigate path to learning page", () => {
    cy.get("div#burger-container").click();
    cy.get("a#learning-nav").should("exist").and("be.visible").click();
    cy.url().should("include", "/learning");
    cy.go("back");
  });
  it("should logout from burger nav", () => {
    cy.get("div#burger-container").click();
    cy.get("a#logout-nav").should("exist").and("be.visible").click();
    cy.wait(3000);
    cy.url().should("include", "/");
    cy.get('div[data-cy="welcome-header"]').should("exist");
    // cy.go("back");
  });
});

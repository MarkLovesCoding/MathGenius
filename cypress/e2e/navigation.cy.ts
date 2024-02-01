describe("login spec", () => {
  it("should load content", () => {
    cy.visit("http://localhost:4000/");
    cy.get("body").should("exist");
    cy.get("a.brand-title").should("exist");

    cy.get('[data-cy="main-container"]').should("exist");
  });
  // it("should navigate to login", () => {
  //   cy.visit("http://localhost:4000/");

  //   cy.get("#landing-log-in").click();
  //   cy.url().should("include", "/login");
  // });
  // it("should navigate to signup", () => {
  //   cy.visit("http://localhost:4000/");

  //   cy.get("#landing-signup").click();
  //   cy.url().should("include", "/signup");
  // });
  // it("should create guest instance", () => {
  //   cy.visit("http://localhost:4000/");

  //   cy.get(".landing-login-guest-button ").click();

  //   cy.url().should("include", "/");
  // });
  // it("should display menu and close menu", () => {
  //   cy.visit("http://localhost:4000/");

  //   cy.get("#burger ").click();

  //   cy.url().should("include", "/");
  // });
  // it("should load content", () => {
  // });
  // // it("should load content", () => {
  // //   cy.get("a.brand-title").should("exist");
  // // });
  // it("Checks if activity menu container exists", () => {
  //   // Wait for the activity menu container to exist
  //   // cy.get("div.icons-middle", { timeout: 12000 }).should("exist");
  // });
  // it("should load login page on click", () => {
  //   // Verify that the login form elements exist
  //   cy.get("#landing-log-in").click();
  //   cy.url().should("include", "/login");
  // });
  // it("should load sign up page on click", () => {
  //   // Verify that the login form elements exist
  //   cy.get("#landing-signup").click();
  //   cy.url().should("include", "/signup");
  // });
  // it("should load sign up page on click", () => {
  //   // Verify that the login form elements exist
  //   cy.get("#landing-signup").click();
  //   cy.url().should("include", "/signup");
  // });
});

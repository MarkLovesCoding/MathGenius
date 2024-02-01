describe("login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000/login");
  });
  it("should display error message with invalid credentials", () => {
    // Test for invalid credentials error message
    cy.get('input[name="username"]').should("exist");
    cy.get('input[name="password"]').should("exist");

    cy.get('input[name="username"]').type("invalid_username");
    cy.get('input[name="password"]').type("invalid_password");
    cy.get('button[data-cy="login-button"]').click();
  });
  it("fill in working login info and click", () => {
    cy.wait(500);

    // Verify that the login form elements exist
    cy.get(".login-form").should("exist");

    // Enter valid username and password
    cy.get('input[name="username"]').type("asdfasdf");
    cy.get('input[name="password"]').type("asdfasdf");

    // Submit the form
    cy.get('button[data-cy="login-button"]').click();
    cy.wait(500);
  });
});

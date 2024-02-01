describe("Login Page", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("/signin");
  });

  it("should display login form", () => {
    // Verify that the login form elements exist
    cy.get("form").should("exist");
    cy.get('input[name="username"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('button[type="submit"]').should("exist").and("have.text", "Login");
  });

  it("should login with valid credentials", () => {
    // Enter valid username and password
    cy.get('input[name="username"]').type("your_valid_username");
    cy.get('input[name="password"]').type("your_valid_password");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // After successful login, verify that it redirects to the dashboard or some other page
    cy.url().should("include", "/");
  });

  it("should display error message with invalid credentials", () => {
    // Enter invalid username and password
    cy.get('input[name="username"]').type("invalid_username");
    cy.get('input[name="password"]').type("invalid_password");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the error message is displayed
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "Invalid username or password");
  });
});

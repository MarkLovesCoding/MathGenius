describe("login spec", () => {
  beforeEach(() => {
    cy.visit("login");
  });
  it("Try Invalid Username", () => {
    // Test for invalid credentials error message
    cy.get('input[name="username"]').should("exist");
    cy.get('input[name="password"]').should("exist");

    cy.get('input[name="username"]').type(Cypress.env("validUsername"));
    cy.get('input[name="password"]').type(Cypress.env("invalidPassword"));
    cy.get('button[data-cy="login-button"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "login");
    cy.get('p[data-cy="login-message"]').should(
      "contain",
      "Invalid Username or Password."
    );
  });

  it("Try Invalid Password", () => {
    // Test for invalid credentials error message
    cy.get('input[name="username"]').should("exist");
    cy.get('input[name="password"]').should("exist");

    cy.get('input[name="username"]').type(Cypress.env("invalidUsernameShort"));
    cy.get('input[name="password"]').type(Cypress.env("validPassword"));
    cy.get('button[data-cy="login-button"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "login");
    cy.get('p[data-cy="login-message"]').should(
      "contain",
      "Invalid Username or Password."
    );
  });
  it("Valid Login with Click", () => {
    // Verify that the login form elements exist
    cy.get(".login-form").should("exist");

    // Enter valid username and password
    cy.get('input[name="username"]').type(Cypress.env("loginUsername"));
    cy.get('input[name="password"]').type(Cypress.env("loginPassword"));

    // Submit the form by click
    cy.get('button[data-cy="login-button"]').click();
    // cy.wait(3000);

    cy.url().should("eq", Cypress.config().baseUrl);
  });
  it("Valid Login with Enter", () => {
    // Verify that the login form elements exist
    cy.get(".login-form").should("exist");

    // Enter valid username and password
    cy.get('input[name="username"]').type(Cypress.env("loginUsername"));
    cy.get('input[name="password"]').type(Cypress.env("loginPassword"));

    // Submit the form by enter
    cy.get('button[data-cy="login-button"]').focus().type("{enter}");

    cy.url().should("eq", Cypress.config().baseUrl);
  });
  it("Login Via Guest on Click", () => {
    // Verify that the login form elements exist
    cy.get('button[data-cy="login-guest"]').should("exist");

    // Enter valid username and password

    // Submit the form by enter
    cy.get('button[data-cy="login-guest"]').click();
    cy.url().should("eq", Cypress.config().baseUrl);
  });
  it("Login Via Guest on Enter", () => {
    // Verify that the login form elements exist

    // Enter valid username and password

    // Submit the form by enter
    cy.get('button[data-cy="login-guest"]').focus().type("{enter}");
    cy.url().should("eq", Cypress.config().baseUrl);
  });
  it("Go To Sign Up", () => {
    // Verify that the login form elements exist
    cy.get('a[data-cy="login-create-account"]').should("exist");
    cy.get('a[data-cy="login-create-account"]').click();

    // Enter valid username and password

    // Submit the form by enter

    cy.url().should("eq", Cypress.config().baseUrl + "signup");
    cy.wait(1000);
  });
});

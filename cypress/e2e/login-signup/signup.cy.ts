describe("signup spec", () => {
  beforeEach(() => {
    cy.visit("signup");
  });
  it("Try invalid username - short", () => {
    // Test for invalid credentials error message
    cy.get('input[name="username"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('button[data-cy="signup-button"]').should("exist");

    cy.get('input[name="username"]').type(Cypress.env("invalidUsernameShort"));
    cy.get('input[name="email"]').type(Cypress.env("validEmail"));
    cy.get('input[name="password"]').type(Cypress.env("validPassword"));

    cy.get('button[data-cy="signup-button"]').click();
    cy.wait(1000);

    cy.url().should("eq", Cypress.config().baseUrl + "signup");
    cy.get('p[data-cy="signup-error"]').should(
      "contain",
      "Username must be 6 or more characters"
    );
  });
  it("Try invalid username - long", () => {
    // Test for invalid credentials error message
    cy.get('input[name="username"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('button[data-cy="signup-button"]').should("exist");

    cy.get('input[name="username"]').type(Cypress.env("invalidUsernameLong"));
    cy.get('input[name="email"]').type(Cypress.env("validEmail"));
    cy.get('input[name="password"]').type(Cypress.env("validPassword"));

    cy.get('button[data-cy="signup-button"]').click();
    cy.wait(1000);
    cy.url().should("eq", Cypress.config().baseUrl + "signup");
    cy.get('p[data-cy="signup-error"]').should("contain", "Username too long.");
  });
  it("Try invalid email", () => {
    // Test for invalid credentials error message

    cy.get('input[name="username"]').type(Cypress.env("validUsername"));
    cy.get('input[name="email"]').type(Cypress.env("invalidEmail"));
    cy.get('input[name="password"]').type(Cypress.env("validPassword"));
    cy.get('button[data-cy="signup-button"]').click();
    cy.wait(1000);

    cy.url().should("eq", Cypress.config().baseUrl + "signup");
    cy.get('p[data-cy="signup-error"]').should(
      "contain",
      "Please fill a valid email address"
    );
  });
  it("Try invalid password  ", () => {
    // Verify that the login form elements exist
    cy.get('input[name="username"]').type(Cypress.env("validUsername"));
    cy.get('input[name="email"]').type(Cypress.env("validEmail"));
    cy.get('input[name="password"]').type(Cypress.env("invalidPassword"));
    // Submit the form by click
    cy.get('button[data-cy="signup-button"]').click();

    cy.url().should("eq", Cypress.config().baseUrl + "signup");
    cy.wait(1000);
    cy.get('p[data-cy="signup-error"]').should(
      "contain",
      "Password must be atleast 6 characters"
    );
    cy.wait(1000);
  });

  it("Try Valid signup", () => {
    // Test for invalid credentials error message

    cy.get('input[name="username"]').type(Cypress.env("validUsername"));
    cy.get('input[name="email"]').type(Cypress.env("validEmail"));
    cy.get('input[name="password"]').type(Cypress.env("validPassword"));
    cy.get('button[data-cy="signup-button"]').click();
    cy.wait(1000);
    cy.request({
      method: "DELETE",
      url: `${Cypress.config().baseUrl}deleteUser`,
      body: {
        userId: Cypress.env("validUsername"),
        userPassword: Cypress.env("validPassword"),
      },
    }).then((response) => {
      // Check if the request was successful
      expect(response.status).to.eq(200);
    });
    cy.wait(1000);
    // cy.url().should("eq", Cypress.config().baseUrl);
  });
  it("Login Via Guest on Click", () => {
    // Verify that the login form elements exist
    cy.get('button[data-cy="signup-guest"]').should("exist");

    // Submit the form by enter
    cy.get('button[data-cy="signup-guest"]').click();
    cy.wait(1000);

    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("Signup Via Guest on Enter", () => {
    // Verify that the login form elements exist

    // Submit the form by enter
    cy.get('button[data-cy="signup-guest"]').focus().type("{enter}");
    cy.wait(1000);

    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("Go To Login", () => {
    // Verify that the login form elements exist
    cy.get('a[data-cy="signup-to-login"]').should("exist");
    cy.get('a[data-cy="signup-to-login"]').click();

    // Submit the form by enter

    cy.url().should("eq", Cypress.config().baseUrl + "login");
    cy.wait(1000);
  });
});

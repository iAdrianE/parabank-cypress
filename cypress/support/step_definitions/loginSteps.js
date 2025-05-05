import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";

Given("que el usuario está en la página de login", () => {
  LoginPage.visit();
});

When("ingresa usuario y contraseña válidos", () => {
  // Leer los datos de usuario desde el archivo JSON
  cy.fixture('latestUser.json').then((userData) => {
    LoginPage.enterUsername(userData.username); // Usar el usuario del archivo
    LoginPage.enterPassword(userData.password); // Usar la contraseña del archivo
  });
});

When("hace clic en el botón de login", () => {
  LoginPage.submit();
});

Then("debería ver el panel de resumen de cuentas", () => {
  cy.url().should("include", "/overview.htm"); // Verifica que estamos en la página de Overview
  cy.contains("Accounts Overview").should("be.visible");

  // Capturar el accountId del enlace
  cy.get('#accountTable tbody tr:first-child td a')  // Selecciona el primer enlace en la tabla
    .invoke('attr', 'href')  // Obtiene el valor del atributo href
    .then((href) => {
      const accountId = href.split('=')[1];  // Extrae el accountId del href (después de 'id=')
      cy.wrap(accountId).as('accountId');  // Almacena el accountId para usarlo en otros pasos
          // Escribir el accountId en un archivo JSON
          cy.writeFile('cypress/fixtures/accountId.json', { accountId });
    });  
});

When("ingresa un usuario o contraseña inválidos", () => {
  cy.fixture('user').then((userData) => {
    // Datos fijos incorrectos
    const invalidUsername = "Error";
    const invalidPassword = "Guayaquil";

    LoginPage.enterUsername(invalidUsername); // Ingresar usuario inválido
    LoginPage.enterPassword(invalidPassword); // Ingresar contraseña inválida
  });
});

Then("debería ver un mensaje de error indicandolo", () => {
  cy.contains("The username and password could not be verified.").should("be.visible");
});

When("no ingresa ningún dato en el formulario de login", () => {
  cy.get('input[name="username"]').clear();
  cy.get('input[name="password"]').clear();
});

Then("debería ver un mensaje de error que lo indique", () => {
  cy.contains("Please enter a username and password.").should("be.visible");
});
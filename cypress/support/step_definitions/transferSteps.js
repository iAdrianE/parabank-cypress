import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";
import TransferPage from "../../pages/TransferPage";
import user from "../../fixtures/latestUser.json";

Given("el usuario ha iniciado sesión correctamente", () => {
  LoginPage.visit();
  LoginPage.enterUsername(user.username);
  LoginPage.enterPassword(user.password);
  LoginPage.submit();
  cy.url().should("include", "/overview.htm");
});

When("transfiere dinero de su cuenta", () => {
  TransferPage.visit();
  TransferPage.enterAmount("100");
  TransferPage.submitTransfer();
});

Then("debería ver un mensaje de confirmación de la transferencia", () => {
  TransferPage.validateSuccessMessage();
});

When("intenta transferir un monto con más de 15 dígitos", () => {
  TransferPage.visit();
  TransferPage.enterAmount("1234567890123456"); // 16 dígitos
  TransferPage.submitTransfer();
});

Then("debería ver un mensaje de error indicando que el monto es inválido", () => {
  cy.contains("An internal error has occurred and has been logged.").should("be.visible");
});

When("intenta transferir sin ingresar monto", () => {
  TransferPage.visit();
  TransferPage.submitTransfer();
});

Then("debería ver un mensaje de error indicando esto", () => {
  cy.contains("An internal error has occurred and has been logged.").should("be.visible");
});

When("intenta transferir un monto con letras u otros caracteres inválidos", () => {
  TransferPage.visit();
  cy.get('#amount').clear().type("abc123$$");
  TransferPage.submitTransfer();
});

Then("debería ver un mensaje de error indicando 'An internal error has occurred and has been logged.'", () => {
  cy.contains("An internal error has occurred and has been logged.").should("be.visible");
});

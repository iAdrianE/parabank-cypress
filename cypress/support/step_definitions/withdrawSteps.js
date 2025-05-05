import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";
import credentials from "../../fixtures/latestUser.json";
import accountFixture from "../../fixtures/accountId.json";

const SOAP_ENDPOINT = "https://parabank.parasoft.com/parabank/services/ParaBank";

Given("que el usuario ha iniciado sesión correctamente", () => {
  LoginPage.visit();
  LoginPage.enterUsername(credentials.username);
  LoginPage.enterPassword(credentials.password);
  LoginPage.submit();

  // Confirmar que llegamos a overview
  cy.url().should("include", "/overview.htm");
  cy.contains("Accounts Overview").should("be.visible");

  // Capturar y guardar accountId (en caso de que no se guardara antes en login)
  cy.get('#accountTable tbody tr:first-child td a')
    .invoke('attr', 'href')
    .then(href => {
      const accountId = href.split('=')[1];
      cy.writeFile('cypress/fixtures/accountId.json', { accountId });
    });
});


When("realiza un retiro de $100", () => {
  const accountId = accountFixture.accountId;

  const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:par="http://service.parabank.parasoft.com/">
      <soapenv:Header/>
      <soapenv:Body>
        <par:withdraw>
          <par:accountId>${accountId}</par:accountId>
          <par:amount>100</par:amount>
        </par:withdraw>
      </soapenv:Body>
    </soapenv:Envelope>`;

  cy.request({
    method: "POST",
    url: SOAP_ENDPOINT,
    body: soapEnvelope,
    headers: {
      "Content-Type": "text/xml",
      SOAPAction: ""
    }
  }).as("withdrawResponse");
});

Then("el retiro debe procesarse correctamente", () => {
  cy.get("@withdrawResponse").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.include("withdrawResponse");
    expect(response.body).to.not.include("faultstring"); // verificar que no hubo error
  });
});

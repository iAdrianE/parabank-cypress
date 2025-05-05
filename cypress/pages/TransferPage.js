class TransferPage {
    visit() {
      cy.visit('https://parabank.parasoft.com/parabank/transfer.htm');
    }
  
    enterAmount(amount) {
      cy.get('#amount').clear().type(amount);
    }    
  
    submitTransfer() {
      cy.get("input[type='submit']").click();
    }
  
    validateSuccessMessage() {
      cy.contains("Transfer Complete!").should("be.visible");
    }
  }
  
  export default new TransferPage();
  
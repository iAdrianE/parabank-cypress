class LoginPage {
    static visit() {
      cy.visit("https://parabank.parasoft.com/parabank/index.htm");
    }
  
    static enterUsername(username) {
      cy.get('input[name="username"]').type(username);
    }
  
    static enterPassword(password) {
      cy.get('input[name="password"]').type(password);
    }
  
    static submit() {
      cy.get('input[type="submit"]').click();
    }
  }
  
  export default LoginPage;
  
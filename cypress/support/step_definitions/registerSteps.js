import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import RegisterPage from '../../pages/RegisterPage';

Given('que el usuario visita la página de registro', () => {
  RegisterPage.visit();
});

When('completa el formulario de registro con datos válidos', () => {
  cy.fixture('user').then((user) => {
    const timestamp = Date.now().toString().slice(-5);
    user.username = `usr${timestamp}`;

    cy.wrap(user).as('user');

    // Guardar el usuario en un fixture para reuso
    cy.writeFile('cypress/fixtures/latestUser.json', user);

    RegisterPage.fillRegistrationForm(user);
  });
});

When('envía el formulario', () => {
  RegisterPage.submit();
});

Then('debería ver un mensaje de cuenta creada exitosamente', () => {
  RegisterPage.shouldSeeWelcomeMessage();
});

When('completa el formulario de registro dejando campos vacíos', () => {
  RegisterPage.visit();  // Visitar la página de registro
  RegisterPage.submit(); // Solo hacemos submit sin llenar ningún campo
});

Then('debería ver un mensaje de error indicando campos requeridos', () => {
  const requiredMessages = [
    'First name is required.',
    'Last name is required.',
    'Address is required.',
    'City is required.',
    'State is required.',
    'Zip Code is required.',
    'Social Security Number is required.',
    'Password is required.',
    'Password confirmation is required.'
  ];

  requiredMessages.forEach((msg) => {
    cy.contains(msg).should('be.visible');
  });
});

When('completa el formulario de registro con un username ya existente', () => {
  cy.readFile('cypress/fixtures/latestUser.json').then((existingUser) => {
    // Usamos un username ya registrado previamente
    const reusedUsername = existingUser.username;

    cy.fixture('user').then((user) => {
      user.username = reusedUsername;
      RegisterPage.fillRegistrationForm(user);
    });
  });
});

Then('debería ver un mensaje de error indicando que el usuario ya existe', () => {
  cy.contains('This username already exists').should('be.visible'); 
});

When('completa el formulario de registro con contraseñas no coincidentes', () => {
  cy.fixture('user').then((user) => {
    const timestamp = Date.now().toString().slice(-5);
    user.password = 'Password123';  // Contraseña
    user.passwordConfirmation = 'Password124';  // Contraseña que no coincide

    cy.wrap(user).as('user');

    RegisterPage.fillRegistrationForm(user);
  });
});

Then('debería ver un mensaje de error indicando que las contraseñas no coinciden', () => {
  cy.contains('Passwords did not match').should('be.visible');
});

When('completa el formulario de registro con contraseñas muy largas', () => {
  cy.fixture('user').then((user) => {
    user.password = 'a'.repeat(25); // contraseña de 25 caracteres

    cy.get('input[name="customer.firstName"]').type(user.firstName);
    cy.get('input[name="customer.lastName"]').type(user.lastName);
    cy.get('input[name="customer.address.street"]').type(user.address);
    cy.get('input[name="customer.address.city"]').type(user.city);
    cy.get('input[name="customer.address.state"]').type(user.state);
    cy.get('input[name="customer.address.zipCode"]').type(user.zip);
    cy.get('input[name="customer.phoneNumber"]').type(user.phone);
    cy.get('input[name="customer.ssn"]').type(user.ssn);
    cy.get('input[name="customer.username"]').type(user.username);
    cy.get('input[name="customer.password"]').type(user.password);
    cy.get('input[name="repeatedPassword"]').type(user.password);
  });
});
Then('debería ver un mensaje de error indicando que el username ya existe', () => {
  cy.contains('This username already exists').should('be.visible'); 
});

Feature: Registro de usuario

  Scenario: Registrar un nuevo usuario en Parabank exitosamente
    Given que el usuario visita la página de registro
    When completa el formulario de registro con datos válidos
    And envía el formulario
    Then debería ver un mensaje de cuenta creada exitosamente
    
  Scenario: Intentar registrarse con uno o más campos vacíos
    Given que el usuario visita la página de registro
    When completa el formulario de registro dejando campos vacíos
    And envía el formulario
    Then debería ver un mensaje de error indicando campos requeridos
    
  Scenario: Intentar registrarse con un nombre de usuario ya existente o invalido
    Given que el usuario visita la página de registro
    When completa el formulario de registro con un username ya existente
    And envía el formulario
    Then debería ver un mensaje de error indicando que el usuario ya existe

  Scenario: Intentar registrarse con contraseñas que no coinciden
    Given que el usuario visita la página de registro
    When completa el formulario de registro con contraseñas no coincidentes
    And envía el formulario
    Then debería ver un mensaje de error indicando que las contraseñas no coinciden

  Scenario: Intentar registrarse con contraseñas invalidas
    Given que el usuario visita la página de registro
    When completa el formulario de registro con contraseñas muy largas
    And envía el formulario
    Then debería ver un mensaje de error indicando que el username ya existe

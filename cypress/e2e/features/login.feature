Feature: Login de usuario

  Scenario: Logearse exitosamente con credenciales válidas
    Given que el usuario está en la página de login
    When ingresa usuario y contraseña válidos
    And hace clic en el botón de login
    Then debería ver el panel de resumen de cuentas

  Scenario: Intentar logearse con usuario y/o contraseña inválidos
    Given que el usuario está en la página de login
    When ingresa un usuario o contraseña inválidos
    And hace clic en el botón de login
    Then debería ver un mensaje de error indicandolo

  Scenario: Intentar logearse sin ingresar usuario ni contraseña
    Given que el usuario está en la página de login
    When no ingresa ningún dato en el formulario de login
    And hace clic en el botón de login
    Then debería ver un mensaje de error que lo indique
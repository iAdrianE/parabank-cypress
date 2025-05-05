Feature: Transferencia de dinero entre cuentas

  Scenario: Usuario transfiere dinero entre sus cuentas
    Given que el usuario ha iniciado sesión correctamente
    When transfiere dinero de su cuenta
    Then debería ver un mensaje de confirmación de la transferencia

  Scenario: Usuario intenta transferir un monto que excede los 15 dígitos
    Given que el usuario ha iniciado sesión correctamente
    When intenta transferir un monto con más de 15 dígitos
    Then debería ver un mensaje de error indicando que el monto es inválido

  Scenario: Usuario intenta transferir sin ingresar un monto
    Given que el usuario ha iniciado sesión correctamente
    When intenta transferir sin ingresar monto
    Then debería ver un mensaje de error indicando esto   

  Scenario: Usuario intenta transferir ingresando caracteres inválidos
    Given que el usuario ha iniciado sesión correctamente
    When intenta transferir un monto con letras u otros caracteres inválidos
    Then debería ver un mensaje de error indicando 'An internal error has occurred and has been logged.'

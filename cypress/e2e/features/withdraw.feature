Feature: Retiro de dinero

  Scenario: Usuario realiza un retiro de $100
    Given que el usuario ha iniciado sesión correctamente
    When realiza un retiro de $100
    Then el retiro debe procesarse correctamente

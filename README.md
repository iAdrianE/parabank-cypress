Reto técnico de ingreso. Banco de Guayaquil.
Hola soy Adrian Ernesto Ezeta Zuñiga.
Este proyecto implementa casos de pruebas asociados a las siguientes
funcionalidades:
- Registro de usuario
- Login de usuario
- Retiro de dinero
- Transferencia de dinero entre cuentas

Las pruebas están configuradas para ejecutarse en consola mediante scripts y también pueden ejecutarse en una interfaz visual de Cypress para su revisión.
Esto fue probado en Windows 11.

Requisitos Previos.
- Node.js `v18.x` o superior (recomendado: `v22.x`). 
Instalar del sitio web oficial https://nodejs.org/es.
- npm `v9.x` o superior . 
Verificar instalacion: npm -v
Para actualizar usar comando: npm install -g npm@latest
- Conexión a Internet activa.


Dependencias Utilizadas.
Para instalar las dependencias basta abrir la terminal de windows, ubicarnos con cd en la carpeta donde ubiquemos la app y se encuentre el package.json, ejemplo: cd C:\parabank-cypress y luego usar el comando: npm install

-Cypress: ^14.3.2

-@badeball/cypress-cucumber-preprocessor: ^22.0.1

-@bahmutov/cypress-esbuild-preprocessor: ^2.2.4

-cypress-mochawesome-reporter: ^3.8.2

-esbuild: ^0.25.3

-mochawesome: ^7.1.3

-mochawesome-merge: ^5.0.0

-mochawesome-report-generator: ^6.2.0



Comandos de ejecucion.
Los scripts que se crearon para consola y pueden ser consultados en el package.json fueron:
- npm run test:register  
Encargado de registrarse en el sistema, crea un latestUser.json en la carpeta fixtures que sera usado para las demas pruebas.
- npm run test:login   
Encargado de logearse en el sistema. Al final captura el id de la cuenta.
- npm run test:withdraw
Encargado de realizar un retiro. 
- npm run test:transfer   
Encargado de transferir dinero entre dos cuentas.
- npm run test:all
Ejecuta todos los anteriores en orden.

Al ejecutar las pruebas, se generarán reportes en formato HTML que incluyen detalles sobre si la prueba pasó o falló, junto con capturas de pantalla de cualquier error. Los reportes se guardan en la carpeta `cypress/reports/mochawesome/` con nombres que siguen este formato:
register_report_05042025_004957.html
Se ejecuto una ultima vez el script de test:all para generar reportes de ejemplo antes de subir a github y crear un zip con el codigo de prueba. Tambien se dejaron el latestuser.json y accountid.json generados de esto.

En el caso de que se requiera ver como se ejecutan los scripts con una interfaz visual se usa en la terminal de Windows el comando:
- npx cypress open  
Luego se elige E2ETesting y un navegador, de preferencia elegir microsoft edge.
Una vez hecho esto aparecera la pantalla con las 4 features, tras darles clic, se ejecutaran los scripts correspondientes de manera visual.



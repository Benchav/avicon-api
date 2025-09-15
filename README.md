<h1 align="left">🐔 Avicon API</h1>

###

<div align="center">
  <img src="https://i.ibb.co/rKTLjPS2/avicon.png" alt="avicon" border="0">
</div>

###

<p align="left">API para la gestión de pollos en granjas, desarrollada con <strong>Node.js</strong>, <strong>Express</strong> y <strong>TypeScript</strong>, documentada con <strong>Swagger</strong> y utilizando <strong>software libre</strong>.  <br>El objetivo es ofrecer una solución innovadora para controlar el ciclo de vida de los pollos: desde su nacimiento hasta el momento en que están listos para carne, incluyendo su estado de salud y estadísticas por lote, esto mejorara la produccion y el corrento funcionamiento de los procesos internos.</p>

###

<h2 align="left">⚙️ Tecnologías usadas</h2>

###

<p align="left">- [Node.js](https://nodejs.org/) – Runtime de JavaScript<br>- [Express](https://expressjs.com/) – Framework web<br>- [TypeScript](https://www.typescriptlang.org/) – Tipado estático<br>- [Swagger](https://swagger.io/) – Documentación interactiva de API<br>- [ts-node-dev](https://github.com/wclr/ts-node-dev) – Hot reload para TypeScript</p>

###

<h2 align="left">🚀 Ejecución</h2>

###
```bash
#para instalar en tu pc local sigue los siguientes pasos y comandos

#primero clona el repositorio en tu computadora
git clone https://github.com/Benchav/avicon-api.git

#navega a la carpeta del proyecto
cd avicon-api

#instala las dependencias
npm install

#corre el proyecto en tu localhost
npm run dev
```
###

<h2 align="left">📚 Documentación de la API</h2>

###
```bash
#para ver la documentacion de swagger en su navegador ponga la siguiente ruta mientras corre el proyecto
http://localhost:3000/api-docs
```
###

<h2 align="left">📂 Estructura del proyecto</h2>

###
```bash
src/
├── Application/                   # Capa de aplicación (casos de uso)
│   ├── services/
│   │   ├── interfaces/            # Interfaces de servicios de aplicación
│   │   └── implementations/       # Implementaciones de los servicios
│   ├── dtos/                      # Objetos de transferencia de datos
│   └── use_cases/                 # Lógica de orquestación (casos de uso específicos)
├── Domain/                        # Capa del Dominio (corazón del negocio)
│   ├── models/                    # Entidades, agregados y objetos de valor
│   ├── repositories/              # Interfaces de los repositorios
│   └── services/                  # Servicios de dominio (lógica de negocio que no va en entidades)
├── Infrastructure/                # Capa de infraestructura (detalles técnicos)
│   ├── database/                  # Configuración y conexión a la base de datos
│   │   ├── models/                # Modelos de base de datos (ej. ORM)
│   │   ├── singleton/             # Interfaces y clases singleton 
│   │   └── repositories/          # Implementaciones de los repositorios
│   ├── utilities/                 # Utilidades para la infraestructura
│   ├── builders/                  # builder para construir sql queries
│   └── swagger/                   # Archivos de configuración de Swagger
├── WebApi/                        # Capa de presentación (API)
│   ├── controllers/               # Controladores de la API (exponen la lógica de la aplicación)
│   ├── routes/                    # Definición de rutas
│   └── middlewares/               # Middleware para la API
└── app.ts                         # Archivo de inicio de la aplicación
```
###

<h2 align="left">🛠️ Scripts útiles</h2>

###
```bash
npm run dev # Ejecutar en desarrollo con recarga automática

npm run build # Compilar TypeScript a JavaScript

npm start # Ejecutar versión compilada</p>
```
###

<h2 align="left">✨ Autores</h2>

###

<p align="left">Desarrollador Oscar Molina<br>💼 Desarrollador Web<br>GitHub: @oscarMolina1523<br>linkedin: https://www.linkedin.com/in/oscar-molina-916195309<br><br>Desarrollador Joshua Chavez<br>💼 Desarrollador Web<br>GitHub: @benchav<br>linkedin: https://www.linkedin.com/in/joshua-benjamin-ch%C3%A1vez-lau-44a65534b</p>

###

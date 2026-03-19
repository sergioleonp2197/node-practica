# API de usuarios con Express, TypeScript y PostgreSQL

Este proyecto es una API REST construida con Node.js, Express, TypeScript y TypeORM. Su objetivo principal es gestionar usuarios: permite registrar usuarios, autenticarlos con JWT, consultar información básica y acceder a una ruta protegida de perfil.

## Qué hace el proyecto

La aplicación implementa un flujo básico de autenticación y gestión de usuarios:

- Crea usuarios con validaciones de nombre, correo y contraseña.
- Hashea la contraseña antes de guardarla en la base de datos.
- Permite iniciar sesión con email y contraseña.
- Genera un token JWT con expiración de 1 hora.
- Protege una ruta de perfil usando middleware de autenticación.
- Lista usuarios, consulta un usuario por ID y actualiza nombre o email.

## Stack utilizado

- Node.js
- Express
- TypeScript
- TypeORM
- PostgreSQL
- `class-validator`
- `bcryptjs`
- `jsonwebtoken`

## Cómo está organizado

```text
src/
  config/
    env.ts              # Carga variables de entorno
  controllers/
    health.ts           # Controlador de health check
    users.ts            # Controladores de usuarios y login
  entities/
    User.ts             # Entidad User, validaciones y hash de contraseña
  middlewares/
    authMiddleware.ts   # Verifica JWT
    errorHandler.ts     # Manejador global de errores
  migration/
    ...CreateUserTable  # Migración de creación de tabla
  routes/
    health.ts           # Ruta /health
    users.ts            # Rutas principales de la API
  services/
    Login.ts            # Lógica de autenticación
    Users.ts            # Lógica de creación y consulta de usuarios
  data-source.ts        # Configuración de TypeORM
  index.ts              # Arranque del servidor
  types.d.ts            # Extensión del tipo Request para req.user
```

## Cómo funciona internamente

### 1. Arranque del servidor

El archivo `src/index.ts`:

- crea la app de Express,
- habilita `express.json()` para procesar cuerpos JSON,
- registra las rutas principales,
- inicializa la conexión con PostgreSQL usando TypeORM,
- y solo después de conectarse levanta el servidor HTTP.

Además, la ruta raíz `/` responde con `Hola mundo`.

### 2. Conexión a base de datos

La conexión se define en `src/data-source.ts` usando variables de entorno cargadas desde `src/config/env.ts`.

La app espera estos valores:

- `PORT`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

Actualmente la configuración usa `synchronize: true`, por lo que TypeORM sincroniza el esquema automáticamente en desarrollo.

### 3. Entidad `User`

La entidad `src/entities/User.ts` modela la tabla de usuarios con estos campos:

- `id`
- `name`
- `email`
- `password`
- `createdAt`

También incluye:

- validación de nombre no vacío,
- validación de email,
- validación de contraseña con mínimo 8 caracteres,
- hash automático de la contraseña antes de insertar,
- método `comparePassword()` para comparar contraseñas en login.

### 4. Flujo de registro

`POST /signup`

1. El controlador recibe `name`, `email` y `password`.
2. El servicio `createUser()` crea una instancia de `User`.
3. Se validan los datos con `class-validator`.
4. TypeORM guarda el usuario.
5. Antes de insertarse, la contraseña se hashea con `bcryptjs`.

### 5. Flujo de login

`POST /login`

1. El controlador recibe `email` y `password`.
2. El servicio busca el usuario por email.
3. Compara la contraseña usando `comparePassword()`.
4. Si es válida, genera un JWT con `id` y `email`.
5. El token expira en 1 hora.

### 6. Rutas protegidas

La ruta `GET /profile` usa `authMiddleware`.

El middleware:

- lee el header `Authorization`,
- extrae el token Bearer,
- valida el JWT,
- guarda el usuario decodificado en `req.user`,
- y deja continuar al controlador.

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con un contenido similar a este:

```env
PORT=400
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=nombre_base_datos
```

## Instalación y ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar en desarrollo

```bash
npm run dev
```

### 3. Compilar

```bash
npm run build
```

### 4. Ejecutar versión compilada

```bash
npm start
```

## Endpoints disponibles

### `GET /`

Prueba simple del servidor.

Respuesta:

```json
"Hola mundo"
```

### `POST /signup`

Crea un usuario.

Body:

```json
{
  "name": "Sergio",
  "email": "sergio@example.com",
  "password": "12345678"
}
```

### `POST /login`

Autentica un usuario y devuelve un token JWT.

Body:

```json
{
  "email": "sergio@example.com",
  "password": "12345678"
}
```

### `GET /profile`

Ruta protegida. Requiere token Bearer.

Header:

```http
Authorization: Bearer TU_TOKEN
```

### `GET /users`

Devuelve la lista de usuarios con `id`, `name` y `email`.

### `GET /user/:id`

Busca un usuario por ID y devuelve `name` y `email`.

### `PATCH /users/:id`

Actualiza `name` y/o `email` de un usuario.

Body de ejemplo:

```json
{
  "name": "Nuevo nombre",
  "email": "nuevo@example.com"
}
```

### `GET /signup/login`

Busca un usuario por email.

Nota: en el código actual esta ruta está implementada como `GET`, pero intenta leer el `email` desde `req.body`, lo cual no es una práctica habitual para peticiones GET.

## Observaciones técnicas del estado actual

- Existe una ruta `src/routes/health.ts` con `GET /health`, pero hoy no está montada en `src/index.ts`, así que no queda expuesta al iniciar la app.
- El proyecto tiene una migración en `src/migration/`, pero la aplicación también usa `synchronize: true`; en un entorno real normalmente se elige una sola estrategia.
- La clave secreta del JWT está hardcodeada en el código (`mi_clave_secreta`) y no se toma desde variables de entorno.
- El endpoint de creación de usuario devuelve directamente la entidad persistida; para producción conviene evitar exponer campos sensibles como la contraseña hasheada.
- `ESLint` está configurado en `eslint.config.mjs`, pero los comandos `lint` y `lint:fix` están definidos fuera de `scripts` en `package.json`, por lo que `npm run lint` no funciona en el estado actual.

## Estado verificado

En este entorno se verificó que:

- `npm install` instala las dependencias correctamente.
- `npm run build` compila el proyecto sin errores.

## Resumen

Es una API backend básica para practicar autenticación con JWT y persistencia en PostgreSQL usando TypeORM. La arquitectura está separada por capas simples: rutas, controladores, servicios, entidad, middlewares y configuración.

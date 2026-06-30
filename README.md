# Digital Store - Frontend

Frontend de la tienda online desarrollado con React + Vite, parte del Trabajo Integrador Final Full-Stack (UTN).

## Tecnologías

- React 19
- Vite
- React Router DOM (v7)
- Axios (consumo de la API)
- ESLint

## Demo desplegada

🔗 **URL pública:** https://store-digital-frontend.vercel.app

## Backend / API

Este frontend consume la API desplegada en:
🔗 https://TU-URL-DE-BACKEND.vercel.app



## Usuario de prueba

| Campo    | Valor                              |
|----------|-------------------------------------|
| Email    | editordidigitalro@gmail.com         |
| Password | (tu contraseña real)                |



## Instalación y uso local

1. Cloná el repositorio:
```bash
git clone https://github.com/TU-USUARIO/digital-store-frontend.git
cd digital-store-frontend
```

2. Instalá las dependencias:
```bash
npm install
```

3. Creá un archivo `.env` en la raíz con la URL del backend:
```env
VITE_API_URL=http://localhost:4000/api
```

4. Corré el proyecto en modo desarrollo:
```bash
npm run dev
```

La app va a estar disponible en `http://localhost:5173`.

## Scripts disponibles

| Comando           | Descripción                              |
|--------------------|-------------------------------------------|
| `npm run dev`      | Levanta el servidor de desarrollo (Vite) |
| `npm run build`    | Genera el build de producción            |
| `npm run preview`  | Sirve el build de producción localmente  |
| `npm run lint`     | Corre ESLint sobre el código             |

## Funcionalidades

- Registro de usuarios con verificación por email
- Login con JWT
- Listado y detalle de productos
- Categorías de productos
- Panel de administración (CRUD de productos) protegido por autenticación
- Diseño responsivo
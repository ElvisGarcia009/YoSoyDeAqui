# Tú ere' de aquí

Plataforma web para la campaña educativa sobre diversidad étnica en la República Dominicana.

## Estructura del proyecto

```
YoSoyDeAqui/
├── backend/    # Node.js + Express API
└── frontend/   # React + Vite app
```

## Requisitos previos

- Node.js 18+
- PostgreSQL 14+
- Cuenta en [Cloudinary](https://cloudinary.com) (gratuita)

---

## Backend

### 1. Configurar variables de entorno

```bash
cd backend
cp .env.example .env
```

Edita `.env` con tus valores:

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Cadena de conexión de PostgreSQL |
| `CLOUDINARY_CLOUD_NAME` | Nombre de tu cloud en Cloudinary |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary |
| `CEDULA_PEPPER` | Cadena aleatoria secreta (mínimo 32 caracteres) |
| `ALLOWED_ORIGIN` | URL del frontend (`http://localhost:5173` en desarrollo) |

### 2. Crear la base de datos y el schema

```bash
createdb yosoydeaqui
psql yosoydeaqui -f src/db/schema.sql
```

### 3. Instalar dependencias e iniciar

```bash
npm install
npm run dev       # desarrollo con nodemon
npm start         # producción
```

El servidor corre en `http://localhost:3001`.

### Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/photos/random?limit=9` | Devuelve fotos aleatorias |
| `POST` | `/api/photos/upload` | Sube una foto (multipart/form-data) |
| `GET` | `/health` | Health check |

#### POST `/api/photos/upload`

**Form fields:**
- `image` — archivo de imagen (JPEG, PNG o WebP, máx. 5 MB)
- `cedula` — número de cédula dominicana (formato: `000-0000000-0`)

**Respuestas:**
- `201` — `{ success: true, imageUrl: "..." }`
- `400` — cédula inválida, archivo faltante o tipo no permitido
- `409` — cédula ya registrada
- `429` — rate limit excedido (5 intentos / 15 min)

---

## Frontend

### 1. Configurar variables de entorno (opcional)

En desarrollo, el proxy de Vite redirige `/api` al backend automáticamente.

Para producción:
```bash
cd frontend
echo "VITE_API_BASE_URL=https://tu-backend.com" > .env
```

### 2. Instalar dependencias e iniciar

```bash
cd frontend
npm install
npm run dev       # desarrollo: http://localhost:5173
npm run build     # build de producción
```

### Páginas

| Ruta | Descripción |
|---|---|
| `/` | Landing page con hero, galería y sección educativa |
| `/contactos` | Información de contacto y redes sociales |
| `/educacion` | Artículos sobre diversidad étnica dominicana |
| `/unete` | Formulario de participación con foto y cédula |

---

## Seguridad

- La cédula nunca se guarda en texto plano — se usa HMAC-SHA256 con un pepper de servidor
- Las imágenes se validan por tipo MIME y tamaño (máx. 5 MB) antes de subirse
- Rate limiting: 5 intentos de upload por IP cada 15 minutos
- CORS restringido al origen configurado en `ALLOWED_ORIGIN`
- Headers de seguridad vía Helmet.js


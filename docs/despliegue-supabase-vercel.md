# Despliegue con Supabase y Vercel

## 1. Supabase

1. Crea un proyecto en [Supabase](https://supabase.com/).
2. En **Connect**, copia la cadena de conexión de PostgreSQL. Para este backend usa la opción directa o el pooler en modo **session** y conserva el prefijo `postgresql+psycopg://`.
3. La aplicación crea sus tablas y datos iniciales al arrancar. No subas la contraseña al repositorio.

## 2. Backend FastAPI

El backend debe desplegarse en un servicio que ejecute el [Dockerfile](../backend/Dockerfile), como Render, Railway, Fly.io o Google Cloud Run. Vercel se usará para el frontend Next.js.

Configura estas variables en el servicio del backend:

- `DATABASE_URL`: cadena de conexión de Supabase.
- `CORS_ORIGINS`: URL de Vercel, y cualquier dominio adicional separado por comas.
- `JWT_SECRET_KEY`: secreto aleatorio largo.
- `ADMIN_EMAIL` y `ADMIN_PASSWORD`: credenciales iniciales del panel.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` y `SMTP_FROM_EMAIL`: si se habilitan envíos por correo.

Verifica el despliegue en `https://TU_BACKEND/health`; debe responder `{"status":"ok"}`.

## 3. Frontend en Vercel

1. Importa el repositorio en Vercel.
2. Define `frontend` como **Root Directory**.
3. Vercel detectará Next.js usando [vercel.json](../frontend/vercel.json).
4. Configura `NEXT_PUBLIC_API_BASE_URL` con la URL pública del backend, sin una barra final.
5. Configura `NEXT_PUBLIC_WEDDING_PLANNER_PHONE`.
6. Despliega y añade el dominio final de Vercel a `CORS_ORIGINS` en el backend.

Después de cambiar variables de entorno, vuelve a desplegar ambos servicios cuando corresponda.

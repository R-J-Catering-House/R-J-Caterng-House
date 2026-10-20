# Arranque local con Docker

## Iniciar el proyecto desde VS Code

1. Abre la carpeta raíz del repositorio en VS Code.
2. Ejecuta **Terminal > Run Build Task** o presiona `Ctrl+Shift+B`.
3. Selecciona **Docker: iniciar proyecto** la primera vez.

La tarea inicia el motor de Docker Desktop mediante `docker desktop start` y después ejecuta `docker compose up --build` desde la raíz del repositorio. La terminal queda abierta para mostrar los logs de PostgreSQL, backend y frontend. Cuando los contenedores estén listos, las direcciones son:

- Frontend: <http://localhost:3000/>
- Backend: <http://localhost:8000/>
- Documentación de la API: <http://localhost:8000/docs>

La tarea se marca como predeterminada de compilación, por lo que después puede iniciarse directamente con `Ctrl+Shift+B`.

## Detener el proyecto

Abre la paleta de comandos (`Ctrl+Shift+P`), ejecuta **Tasks: Run Task** y selecciona **Docker: detener proyecto**. Esta tarea ejecuta `docker compose down` y conserva el volumen de PostgreSQL.

## Si aparece `ERR_CONNECTION_REFUSED`

El error significa que el backend todavía no está escuchando en el puerto 8000 o que sus contenedores no están iniciados. Revisa la terminal de la tarea y confirma lo siguiente:

```powershell
docker compose ps
```

El servicio `backend` debe estar en estado `running` y publicar `0.0.0.0:8000->8000/tcp`. Si el servicio aún está construyéndose, espera a que termine `docker compose up --build` y vuelve a cargar la página. Si terminó con error, corrige el error mostrado en la terminal y vuelve a ejecutar la tarea.

Si la terminal muestra `failed to connect to the docker API` o `dockerDesktopLinuxEngine`, inicia Docker Desktop manualmente, espera a que el motor esté activo y vuelve a ejecutar **Docker: iniciar proyecto**. La tarea **Docker: iniciar motor** requiere una versión de Docker Desktop que incluya el comando `docker desktop`.

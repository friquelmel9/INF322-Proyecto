# INF322-Proyecto: Ruta de Titulación — MVP React

Prototipo funcional que ayuda a un memorista a entender su proceso de titulación (TT1–TT2). Implementa tres metas:

- **H1** — Ver el estado del proceso (`/proceso`).
- **H2** — Saber cuál es la próxima acción y quién es responsable (`/pendientes`).
- **H5** — Encontrar los documentos vigentes (`/documentos`).

> **Escenario de demostración.** Todos los nombres, fechas, versiones y estados son **datos simulados**. No representan información oficial ni vigente de la UTFSM. No hay backend, ni inicio de sesión, ni envíos o descargas reales.

El caso de prueba es **Camila Fuentealba**, memorista de TT2, en la **etapa 5** (Trabajo de Título 2).

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior (incluye `npm`).
- Git.
- `make` (opcional, ver más abajo).

## Inicio rápido

```bash
git clone https://github.com/friquelmel9/INF322-Proyecto.git
cd INF322-Proyecto/
make dev
```

`make dev` instala las dependencias si faltan y arranca el servidor. Abre en el navegador la dirección que muestre la terminal.

## Comandos

| Con `make` | Equivale a | Qué hace |
|---|---|---|
| `make help` | — | Lista los comandos disponibles. |
| `make install` | `npm install` | Instala las dependencias. |
| `make dev` | `npm run dev` | Inicia el servidor de desarrollo. |
| `make host` | `npm run dev -- --host` | Igual que `dev`, accesible desde la red local para probar en un celular. |
| `make build` | `npm run build` | Genera la versión de producción en `dist/`. |
| `make preview` | `npm run preview` | Compila y sirve localmente la versión de producción. |
| `make clean` | `rm -rf dist node_modules` | Borra `dist/` y `node_modules/`. |
| `make reinstall` | — | Borra todo y vuelve a instalar desde cero. |

**Si no se tiene `make` instalado en el dispositivo**, use directamente `npm install` y `npm run dev`.

### Probar en el celular

1. Ejecuta `make host`.
2. Conecta el celular a la misma red Wi-Fi.
3. Abre la dirección `Network` que muestra la terminal (por ejemplo `http://192.168.x.x:5173`).
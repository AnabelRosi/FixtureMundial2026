# 🏆 Mundial 2026 – Fixture interactivo con checklist

Aplicación web full‑stack para seguir el fixture del Mundial 2026, marcar partidos vistos y visualizar el progreso. Desarrollada como trabajo práctico para la facultad con el objetivo de practicar:

- **Frontend**: React + Material‑UI (MUI)
- **Backend**: Flask + SQLite
- **Trabajo colaborativo**: Git y GitHub (ramas, pull requests, integración)

## 🎯 Funcionalidades

- Listado completo de los 98 partidos del Mundial 2026 (fase de grupos y eliminatorias)
- Checklist interactivo: cada usuario puede marcar los partidos que ya vio
- Barra de progreso que se actualiza en tiempo real
- Datos persistentes en base de datos SQLite
- API REST documentada y estable

## 👥 Equipo de trabajo

- **Backend**: Una persona (Flask, SQLite, endpoints)
- **Frontend**: Otra persona (React, MUI, consumo de API)
- **Coordinación**: Uso de ramas separadas (backend / frontend) y pull requests hacia `main`

## 🛠️ Tecnologías utilizadas

| Capa       | Tecnologías                              |
|------------|------------------------------------------|
| Frontend   | React, Vite, Material‑UI (MUI), JavaScript |
| Backend    | Flask, Flask‑CORS, SQLite3, Python       |
| Control de versiones | Git, GitHub                         |

## 📦 Endpoints de la API (contrato estable)

| Método | Endpoint                          | Descripción                     |
|--------|-----------------------------------|---------------------------------|
| GET    | `/api/matches`                    | Obtener todos los partidos      |
| PATCH  | `/api/matches/{id}/check`         | Marcar/desmarcar un partido     |
| POST   | `/api/reset`                      | Reiniciar todo el checklist     |

## 🧪 Cómo ejecutar el proyecto

### Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py

Frontend (React)
bash
cd frontend
npm install
npm run dev
Abrir http://localhost:5173

📚 Aprendizajes aplicados
Consumo de APIs desde React con fetch

Manejo de estado local con useState y useEffect

Diseño de API RESTful con Flask

Persistencia con SQLite

Trabajo en equipo con Git: ramas, merge, resolución de conflictos

📄 Licencia
Proyecto académico – sin fines comerciales.
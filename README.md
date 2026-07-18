# PowerChoice Lighting Store

A one‑page storefront for electrical lighting built with:
- **Backend**: FastAPI (deployed on Render, database on Supabase)
- **Frontend**: JavaScript (served via Cloudflare Pages)

---

## 🚀 Project Structure

powerchoice/
│
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── main.py         # Entry point
│   │   ├── models.py       # Supabase models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils.py        # Helpers
│   └── requirements.txt    # Python dependencies
│
├── frontend/               # JavaScript frontend
│   ├── public/
│   │   ├── index.html      # Storefront UI
│   │   ├── styles.css      # Styling
│   │   └── app.js          # Main JS logic
│   ├── package.json        # NPM scripts
│   └── package-lock.json
│
├── render.yaml             # Backend deployment config
├── .gitignore              # Ignore node_modules, venv, etc.
├── README.md               # Documentation
└── LICENSE



---

## ⚡ Local Development

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000


cd frontend
npm install
npm run start


npm install
npm run dev
## This launches:

##FastAPI backend on http://localhost:8000

##Frontend live‑server on http://localhost:8080



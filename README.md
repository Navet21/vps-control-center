# VPS Control Center

Private web dashboard to monitor and operate Docker-based applications deployed on a VPS.

## 🎯 Goal

Replace repetitive SSH operations with a secure web interface for predefined maintenance actions.

This project is focused on real-world usage, not as a generic Docker manager.

---

## 🚀 Features

- VPS system monitoring (CPU, RAM, disk, uptime)
- Docker container management
- Logs viewer per service
- Controlled restart actions
- Audit log system
- Secure whitelist-based command execution

---

## 🧠 Architecture

Frontend (React) → Backend (NestJS) → Service Layer → Docker / System

The frontend never interacts directly with the system.
All operations are validated and controlled in the backend.

---

## 🔐 Security Approach

This project does **not** expose:

- ❌ Free terminal access  
- ❌ Arbitrary shell execution  
- ❌ User-defined commands  

Instead:

- ✅ Only predefined actions are allowed  
- ✅ Services are validated through a whitelist  
- ✅ Docker commands are executed safely (`execFile`)  

---

## 📦 Tech Stack

- **Frontend:** React + TypeScript + Vite  
- **Backend:** NestJS + TypeScript  
- **Infrastructure:** Docker  
- **Database (planned):** PostgreSQL  
- **Auth (planned):** JWT  

---

## 📊 Current Status

MVP in progress.

### Implemented

- System status endpoint  
- Docker services listing  
- Logs viewer  
- Controlled restart actions  
- In-memory audit log  

### In progress

- PostgreSQL persistence for audit logs  
- Authentication (JWT)  
- Protected endpoints  

### Planned

- Production deployment on VPS  
- Improved UI/UX  
- Real-time updates  

---

## 🧩 Managed Services

This panel is designed to control specific applications, not generic containers.

Example:

- Poker Board Trainer  
- Your Pigeons  
- Portfolio  

---

## ⚙️ Local Development

### Backend

```bash
cd apps/api
npm install
npm run start:dev

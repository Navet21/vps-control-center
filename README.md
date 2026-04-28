# VPS Control Center

Private web dashboard to monitor and operate Docker-based applications deployed on a VPS.
Built with NestJS, React and Docker.

- VPS system monitoring (CPU, RAM, disk, uptime)
- Docker container management
- Logs viewer per service
- Controlled restart actions
- Audit log system
- Secure whitelist-based command execution

- ## Tech Stack

- NestJS
- React
- TypeScript
- Docker
- PostgreSQL (planned)
- JWT Auth (planned)

## Current Status

MVP in progress.

Implemented:
- System status endpoint
- Docker services listing
- Logs viewer
- Controlled container restart
- In-memory audit log

Next:
- PostgreSQL persistence
- Authentication
- Protected endpoints
- Production deployment

## Security Approach

This project does not expose a free terminal or arbitrary shell execution.

All Docker operations are executed through a whitelist-based service layer.

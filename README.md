# Lukiora Connect Hub

Central hub and landing platform for Lukiora projects, designed as a lightweight full-stack web application with a clean frontend and a simple backend foundation.

This repository serves as a production-ready web entry point for presenting products, services, and future integrations under the Lukiora brand.

---

## Overview

Lukiora Connect Hub is a web platform intended to:
- present Lukiora products and services
- act as a central connection point between projects
- serve as a base for future integrations and extensions

The project prioritizes clarity, modern UI, and a clean technical setup suitable for production deployment.

---

## Architecture

Browser  
→ Frontend (React / Vite)  
→ Backend (Python, minimal API foundation)  

The architecture is intentionally simple and extensible, allowing gradual growth without early overengineering.

---

## Frontend

Tech stack:
- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui

Key characteristics:
- Modern component-based UI
- Clean landing-page–style presentation
- Prepared for expansion into a multi-page application
- Focus on readability, spacing, and professional layout

---

## Backend

- Python-based backend foundation
- Prepared for API endpoints and integrations
- Intended for future connection with other Lukiora services

(Current backend scope is intentionally minimal.)

---

## Configuration & Security

- Environment-specific configuration via `.env` files
- Development variables separated from production
- No secrets hardcoded in application logic
- Sensitive values excluded via `.gitignore`

---

## Repository Structure

backend/ – backend foundation  
src/ – React + TypeScript frontend  
public/ – static assets  
tailwind.config.ts / postcss.config.js – styling configuration  
vite.config.ts – build and dev configuration  
README.md

---

## Project Status

Early-stage / foundational project.

Planned direction:
- Expansion into a central dashboard for Lukiora services
- Integration with backend APIs from other Lukiora projects
- Authentication and protected sections
- Deployment as the main public-facing Lukiora web hub

---

## Author

Developed and maintained by Lukas Krumpach  
Full-stack / Backend-focused Python developer

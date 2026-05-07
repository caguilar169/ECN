# App ECN (Encuentro Católico de Novios)

Este repositorio contiene un **blueprint técnico y funcional** para construir una aplicación ECN con Node.js, multi-lenguaje y personalizable por entidad.

## Objetivo

Centralizar la gestión de:

- Usuarios y autenticación
- Roles y permisos
- Retiros
- Comunidades
- Temas y documentos
- Integraciones (Google Forms / Zapier)

## Propuesta tecnológica (Node.js)

- **Backend**: NestJS (TypeScript)
- **Base de datos**: PostgreSQL
- **ORM**: Prisma
- **Auth**: Google OAuth + email/password (JWT + refresh tokens)
- **Frontend**: Next.js
- **Storage**: S3 compatible para fotos y documentos
- **i18n**: `i18next` / `next-intl`
- **Jobs/colas**: BullMQ + Redis

## Documentación principal

- Ver `docs/arquitectura-ecn.md` para el detalle completo.

## Próximos pasos

1. Validar requerimientos con el equipo ECN.
2. Definir MVP (primer release).
3. Crear repositorio backend/frontend y CI/CD.
4. Implementar módulos por fases.

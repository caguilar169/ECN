# Arquitectura propuesta — App ECN

## 1) Requerimientos clave

### Autenticación
- Login con Google
- Login con email y contraseña

### Roles
- Administrador
- Pareja
- Pareja Equipo
- Coordinadores
- Secretarias

### Gestión de usuarios
- Creación de usuarios
- Reset de contraseña
- Foto
- Bio

### Gestión de retiros
- Fechas (multi-día + horarios por día)
- Lugar
- Parejas equipo
- Asignaciones por comunidad (inscripciones, almuerzos, limpieza, cartas)
- Parejas inscritas (integración Google Forms / Zapier)
- Asistencia
- Permanencia
- Fotos
- Agenda (tema, duración, hora inicio, pareja equipo, escritura, compartir)

### Gestión de comunidades
- Miembros
- Temas vistos/pendientes y responsables
- Proceso puente
- Asignación de coordinadores por votos y periodo

### Gestión de temas
- Catálogo de temas
- Repositorio de archivos

### Gestión documental
- Oraciones
- Valores del ECN

### Extra
- Multi-lenguaje
- Personalización de entidades con atributos dinámicos

---

## 2) Diseño técnico recomendado

### Backend
- **NestJS + TypeScript** para modularidad y escalabilidad
- Arquitectura modular por dominios:
  - Auth
  - Users
  - Roles/Permissions
  - Retiros
  - Comunidades
  - Temas
  - Documentos
  - Integraciones
  - Campos dinámicos (custom fields)

### Base de datos
- **PostgreSQL** con **Prisma**
- Modelo mixto:
  - Tablas normalizadas para datos core
  - JSONB para atributos personalizados por entidad

### Frontend
- **Next.js** + TypeScript
- SSR para panel administrativo
- Componentes por módulo con control por rol

### Archivos
- Fotos/documentos en S3 (o equivalente)
- Metadatos en PostgreSQL

### Seguridad
- JWT access + refresh
- Hash de password con Argon2/bcrypt
- RBAC con permisos finos por acción
- Auditoría básica (quién cambió qué y cuándo)

---

## 3) Modelo de autorización (RBAC)

### Roles base
- `ADMIN`
- `PAREJA`
- `PAREJA_EQUIPO`
- `COORDINADOR`
- `SECRETARIA`

### Ejemplo de permisos
- `retiro.read`
- `retiro.update`
- `comunidad.update`
- `blog_secretaria.update`
- `documento.read`

> Recomendado: permitir permisos adicionales por comunidad o retiro (scope por entidad) para no sobredimensionar roles globales.

---

## 4) Multi-lenguaje (i18n)

### Estrategia
- Guardar textos UI en archivos de traducción (`es`, `en`, `pt`, etc.)
- Guardar idioma preferido por usuario en perfil
- Para contenido editable (temas, oraciones, valores), usar tablas de traducciones:
  - `content_item`
  - `content_item_translation (language, title, body)`

---

## 5) Personalización por entidad (custom attributes)

### Requisito
Agregar atributos personalizados a entidades como Usuario, Retiro, Comunidad, etc.

### Diseño recomendado
- Tabla `custom_field_definitions`:
  - `id`, `entity_type`, `key`, `label`, `field_type`, `required`, `options`, `community_id?`
- Tabla `custom_field_values`:
  - `id`, `definition_id`, `entity_id`, `value_json`

Ventajas:
- No requiere migraciones por cada nuevo campo
- Permite validaciones dinámicas
- Reutilizable por comunidad

---

## 6) Integración con Google Forms / Zapier

### Flujo sugerido
1. Google Form recibe inscripción de parejas.
2. Zapier dispara webhook al backend ECN.
3. Backend valida payload y crea/actualiza `retreat_registration`.
4. Se deja traza en `integration_events` para auditoría y reintentos.

---

## 7) Esquema mínimo de entidades

- `users`
- `profiles`
- `roles`
- `user_roles`
- `communities`
- `community_members`
- `retreats`
- `retreat_days`
- `retreat_agenda_items`
- `retreat_assignments`
- `retreat_registrations`
- `retreat_attendance`
- `retreat_permanence`
- `topics`
- `topic_materials`
- `documents`
- `votes`
- `coordinator_terms`
- `custom_field_definitions`
- `custom_field_values`

---

## 8) Roadmap por fases

### Fase 1 (MVP)
- Auth (Google + email/password)
- Roles base
- Usuarios (perfil, foto, bio, reset password)
- Comunidades (miembros)
- Retiros (CRUD base + agenda)
- Integración inicial vía webhook (Zapier)

### Fase 2
- Votaciones y periodos de coordinadores
- Temas completos (repositorio de archivos)
- Documentos (oraciones y valores)
- Multi-lenguaje completo en contenidos

### Fase 3
- Campos personalizados por entidad
- Dashboard e indicadores
- Auditoría avanzada

---

## 9) API de ejemplo (REST)

- `POST /auth/login`
- `POST /auth/google`
- `POST /auth/reset-password`
- `GET /users/me`
- `PATCH /users/:id`
- `GET /retreats`
- `POST /retreats`
- `POST /retreats/:id/agenda`
- `POST /integrations/google-forms/webhook`
- `GET /communities/:id`
- `POST /custom-fields/definitions`
- `POST /custom-fields/values`

---

## 10) Recomendaciones operativas

- Entornos separados: `dev`, `staging`, `prod`
- Backups automáticos de PostgreSQL
- Logs estructurados + alertas
- Políticas de acceso por mínimo privilegio
- Pruebas:
  - Unitarias (servicios)
  - Integración (módulos clave)
  - E2E (flujos login, retiros, comunidades)

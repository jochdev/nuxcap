# Nuxcap Monorepo

Integra Nuxt.js con Capacitor para construir aplicaciones híbridas (web + móvil) usando un solo código base. Simplifica el acceso a APIs nativas (cámara, GPS, notificaciones) y despliega en iOS, Android y web con configuración automatizada y soporte para SSR/SSG.

## 🚀 Características Principales

- **Arquitectura Monorepo**: Gestiona múltiples aplicaciones (`mobile`, `admin`) compartiendo lógica (`packages/shared`).
- **Autenticación Robusta**: Supabase Auth integrado con flujo de OTP (One-Time Password).
- **Gestión Remota**: Controla la app móvil desde el panel de administración (Feature Flags, Modo Mantenimiento, Versiones).
- **Base Nativa**: Configuración de Capacitor optimizada para Android (Splash screen, Safe Areas, Teclado).
- **Nuxt 4 Ready**: Utiliza las últimas tecnologías del ecosistema Vue/Nuxt.

## 📚 Documentación

Para una guía detallada sobre la arquitectura y configuración, consulta [DOCUMENTATION.md](./DOCUMENTATION.md).

## 🛠️ Inicio Rápido

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```

2.  **Iniciar entornos de desarrollo**:
    ```bash
    # Terminal 1: App Móvil
    npm run dev:mobile

    # Terminal 2: Panel de Administración
    npm run dev:admin
    ```

3.  **Configuración Móvil (Android)**:
    ```bash
    npm run mobile:setup
    ```

## 📱 Despliegue

- **Web (Admin)**: Configurado para despliegue en Netlify (`npm run build:admin`).
- **Móvil (App)**: Generación estática para Capacitor (`npm run mobile:sync`).

---

Creado por **Jochdev** with **Antigravity** 🚀
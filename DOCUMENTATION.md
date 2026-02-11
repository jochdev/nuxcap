# Nuxcap Monorepo Architecture

This monorepo manages a **Native Mobile App (Android)** and an **Admin Dashboard**, sharing core logic and UI components.

## 🏗 Project Structure

- **`apps/mobile`**: The user-facing mobile application (Nuxt + Capacitor).
  - Uses `ssr: false` (SPA mode) for native performance.
  - Generates to `.output/public` for Capacitor to consume.
- **`apps/admin`**: The administration dashboard.
  - Controls the mobile app via **Remote Config**.
  - Manages users and settings.
- **`packages/shared`**: Shared logic layer.
  - `composables/useAuth`: Supabase Auth (OTP/Magic Link).
  - `composables/useAppConfig`: Remote App Configuration logic.
  - UI Components & Types.
- **`supabase`**: Database migrations and configuration.

---

## 🚀 Getting Started

### 1. Development
Run both applications in parallel:

```bash
# Terminal 1: Mobile App
npm run dev:mobile

# Terminal 2: Admin Dashboard
npm run dev:admin
```

### 2. Mobile Setup (Android)
Before building the native app, run the setup script:

```bash
npm run mobile:setup
```
This will:
1. Generate the static site (`nuxt generate`).
2. Add the Android platform (`cap add android`).

To sync changes and open Android Studio:
```bash
npm run mobile:open
```

---

## 📱 Mobile App Features
- **Native UI**: configured `safe-area`, disabled text selection/zoom.
- **Remote Config**: The app listens to `app_settings` for dynamic changes.
- **Maintenance Mode**: Blocks access if enabled in Admin Dashboard.
- **Version Control**: Can force update if min version is not met.

## 🎛 Admin Dashboard
Located at `/settings`, allows admins to:
- Toggle **Maintenance Mode**.
- Set **Minimum App Versions**.
- Enable/Disable **Feature Flags**.
- Manage Users (future).

## 🔒 Authentication
- **Provider**: Supabase Auth (Email OTP).
- **Flow**:
  1. User enters Email.
  2. Receives OTP Code.
  3. Verifies OTP -> Logged In.
- **Middleware**: `auth` protects routes automatically.

## 🛠 Common Errors
- **"Failed to fetch"**: Check your `.env` credentials in `apps/mobile/.env` and `apps/admin/.env`.
- **"Capacitor CLI not found"**: Run `npm install` in the root (it includes `@capacitor/cli` in `apps/mobile`).

---

**Built with:** Nuxt 4, Nuxt UI v3, Supabase, Capacitor 6.

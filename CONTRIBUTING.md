# Contributing to Nuxcap

Thank you for your interest in contributing to Nuxcap! We welcome contributions from the community to help improve this project.

## 🛠 Development Workflow

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/your-username/nuxcap.git
    cd nuxcap
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Create a new branch** for your feature or fix:
    ```bash
    git checkout -b feature/amazing-feature
    ```

## 🏗 Monorepo Structure

- `apps/mobile`: The main mobile application.
- `apps/admin`: The admin dashboard.
- `packages/shared`: Shared logic, components, and types.

Please ensure your changes respect the architecture. If you are adding a reusable function, consider placing it in `packages/shared`.

## 🧪 Testing

Before submitting a Pull Request, please ensure the applications build correctly:

```bash
# Test Mobile Build
npm run mobile:sync

# Test Admin Build
npm run build -w @nuxcap/admin
```

## 📝 Code Style

- We use **ESLint** and **Prettier**.
- Run `npm run lint` to check for style issues.
- Follow the Vue 3 Composition API best practices.

## 🚀 Submitting a Pull Request

1.  Push your branch to your fork.
2.  Open a Pull Request against the `main` branch of the original repository.
3.  Describe your changes clearly in the description.

We will review your PR as soon as possible!

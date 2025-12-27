# Q1: Add an environment variable

Goal:

- Create a Vite app and add a variable `VITE_API_BASE_URL`.
- Read it in your client code and render it on the page.

Steps:

1. Create a project: `npm create vite@latest`
2. Add `.env`:
   - `VITE_API_BASE_URL=https://example.com`
3. In your app code, read `import.meta.env.VITE_API_BASE_URL`.
4. Display it in the UI.

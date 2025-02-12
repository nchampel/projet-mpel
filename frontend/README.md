# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

créer projet frontend :

npm create vite@latest frontend --template react-ts

lancer react
cd frontend
npm install (uniquement après installation)
npm run dev

installer tailwindCSS :

cd frontend
npm install -D tailwindcss@3.0.24 postcss autoprefixer
npx tailwindcss init -p

on modifie le fichier index.css

@tailwind base;
@tailwind components;
@tailwind utilities;


on visualise à http://localhost:5173/

si souci il faut renommer en postccs.config.cjs (.js à la base) et idem pour tailwind.config.js


créer projet backend :
cd backend
npm init
dans les options, on laisse tous à défaut sauf entry point qui est server.js, fichier que l'on créera

on installe nodemon : npm install -g nodemon

dans le dossier backend, on lance le backend avec nodemon server (mise à jour en temps réel)

puis on installe express : npm install express

puis npm install mongoose (pour communiquer avec mongoDB)
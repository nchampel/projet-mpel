import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PageProvider } from "./context/PageProvider.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <PageProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PageProvider>
      </AuthProvider>
    </StrictMode>
  );
} else {
  console.error("L'élément avec l'id 'root' est introuvable");
}

import { createContext, useState, useContext, ReactNode } from "react";

// Définition des types pour l'état de la page
interface PageContextType {
  page: number;
  setPage: (page: number) => void;
}

// Création du context avec des valeurs par défaut (null ou undefined)
const PageContext = createContext<PageContextType | undefined>(undefined);

// Fournisseur du contexte avec un état de page
export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<number>(1);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};

// Hook pour accéder au contexte
export const usePage = (): PageContextType => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
};

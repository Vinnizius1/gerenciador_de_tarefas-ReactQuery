import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";

// Cria uma instância do QueryClient, responsável por gerenciar o cache e as requisições
const queryClient = new QueryClient();

// Renderiza a aplicação
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);

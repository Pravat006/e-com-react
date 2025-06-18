import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/root/ThemeContex";
// import { ThemeProvider } from "./components/theme-provider";

const queryClient = new QueryClient();

// initialising the dark and light theme functions

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate persistor={persistor}>
          <Toaster position="top-right" reverseOrder={false} />
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);

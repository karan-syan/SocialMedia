import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkThemeContextProvider } from "./context/DarkThemeContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <DarkThemeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkThemeContextProvider>
  </BrowserRouter>
);

import "./App.css";
import Input from "./pages/Input";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="vite-ui-theme">
      <Input />
    </ThemeProvider>
  );
}

export default App;

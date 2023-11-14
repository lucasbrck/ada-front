import "./App.css";
import GlobalStyles from "styles/global";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

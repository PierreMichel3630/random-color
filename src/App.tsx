import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import { GlobalProvider } from "./context/GlobalProvider";
function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;

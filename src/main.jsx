import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { store } from "./app/store";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000
        }}
      />

    </BrowserRouter>
  </Provider>
);
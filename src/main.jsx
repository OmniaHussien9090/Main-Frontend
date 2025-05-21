// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AuthProvider } from './contextAuth/AuthContext'; 
import "./i18n";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ "client-id": "AQVBWA96vQKJBbds8eSIiSe1RUvs_VezGTW_f1JU2nYNKNm7IIMYnblA8g_ujmdKDIf-TJNohAOgDvG1" }}>
      <Provider store={store}>
        <AuthProvider> 
          <App />
        </AuthProvider>
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);

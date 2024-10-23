/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Tolgee, DevTools, TolgeeProvider, FormatSimple } from "@tolgee/react";

const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    language: 'en',

    // for development
    apiUrl: import.meta.env.VITE_APP_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_APP_TOLGEE_API_KEY,

    // for production
    staticData: {
      // Add your static data if needed
    }
  });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TolgeeProvider
      tolgee={tolgee}
      fallback="Loading..." // loading fallback
    > 
      <App />
    </TolgeeProvider>
  </StrictMode>,
)

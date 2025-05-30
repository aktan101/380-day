import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { Providers } from "./components/providers/providers"

// Импортируем шрифты
import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/700.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>,
)

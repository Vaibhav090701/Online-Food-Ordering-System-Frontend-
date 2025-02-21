import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './component/State/Store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>

<BrowserRouter>
{/* //here we are applying provider from redux to tell our application that we implemented redux store */}
<Provider store={store}>
  <App />
</Provider>
</BrowserRouter>
  </StrictMode>,
)

import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import './index.css'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import reduxStore from './store/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <BrowserRouter>
        <Provider store={reduxStore}>
            <App />
        </Provider>
        <ToastContainer />
    </BrowserRouter>
    // </React.StrictMode>
)

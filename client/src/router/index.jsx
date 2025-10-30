import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import HomePage from '../pages/HomePage/HomePage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite /> } >
                    <Route index element={<HomePage /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

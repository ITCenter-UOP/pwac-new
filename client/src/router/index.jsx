import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import HomePage from '../pages/HomePage/HomePage'
import Login from '../pages/AuthPage/Login'
import CreateAccount from '../pages/AuthPage/CreateAccount'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite /> } >
                    <Route index element={<HomePage /> } />
                    <Route path='login' element={<Login /> } />
                    <Route path='create-account' element={<CreateAccount /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import HomePage from '../pages/HomePage/HomePage'
import Login from '../pages/AuthPage/Login'
import CreateAccount from '../pages/AuthPage/CreateAccount'
import DefultError from '../component/Errors/DefultError'
import ForgetPassword from '../pages/AuthPage/ForgetPassword'
import VerifyEmail from '../pages/AuthPage/VerifyEmail'
import VerifyOTP from '../pages/AuthPage/VerifyOTP'
import UpdatePassword from '../pages/AuthPage/UpdatePassword'
import DashHome from '../pages/Dashboard/DashHome'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import DashError from '../component/Errors/DashError'
import Profile from '../pages/Profile/Profile'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError />} />
                    <Route index element={<HomePage />} />
                    <Route path='create-account' element={<CreateAccount />} />
                    <Route path='verify-email' element={<VerifyEmail />} />
                    <Route path='login' element={<Login />} />
                    <Route path='forget-password' element={<ForgetPassword />} />
                    <Route path='verify-otp' element={<VerifyOTP />} />
                    <Route path='update-password' element={<UpdatePassword />} />
                </Route>

                <Route path='/Dashboard' element={<PrivateRoute roles={['admin']}><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['admin']}><DashError /> </PrivateRoute>} />
                    <Route index element={<PrivateRoute roles={['admin']}><DashHome /> </PrivateRoute>} />
                    <Route path='my-profile' element={<PrivateRoute roles={['admin', 'user']}><Profile /> </PrivateRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

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
import ManageUser from '../pages/Dashboard/Users/ManageUser'
import UpdateUser from '../pages/Dashboard/Users/UpdateUser'
import ManageUserLogs from '../pages/Dashboard/UserActivity/ManageUserLogs'
import ViewOneLog from '../pages/Dashboard/UserActivity/ViewOneLog'
import AllNews from '../pages/HomePage/NEWS/AllNews'
import GetOneNEWS from '../pages/HomePage/NEWS/GetOneNEWS'
import ManageNews from '../pages/Dashboard/NEWS/ManageNews'
import CreateNews from '../pages/Dashboard/NEWS/CreateNews'
import UpdateNews from '../pages/Dashboard/NEWS/UpdateNews'
import WorkShop from '../pages/HomePage/WorkShop/WorkShop'
import ManageWorkshop from '../pages/Dashboard/WorkShop/ManageWorkshop'
import UpdateWorkshop from '../pages/Dashboard/WorkShop/UpdateWorkshop'
import CreateWorkshop from '../pages/Dashboard/WorkShop/CreateWorkshop'
import Aboutus from '../pages/HomePage/AboutUs/Aboutus'
import Services from '../pages/HomePage/Services/Services'
import ManageResource from '../pages/Dashboard/Resource/ManageResource'
import CreateResource from '../pages/Dashboard/Resource/CreateResource'
import ViewResource from '../pages/Dashboard/Resource/ViewResource'

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
                    <Route path='news' element={<AllNews />} />
                    <Route path='view-news/:title' element={<GetOneNEWS />} />
                    <Route path='workshops' element={<WorkShop />} />
                    <Route path='aboutus' element={<Aboutus /> } />
                    <Route path='services' element={<Services /> } />
                </Route>

                <Route path='/Dashboard' element={<PrivateRoute roles={['admin', 'staff']}><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['admin', 'staff']}><DashError /> </PrivateRoute>} />
                    <Route index element={<PrivateRoute roles={['admin', 'staff']}><DashHome /> </PrivateRoute>} />
                    <Route path='my-profile' element={<PrivateRoute roles={['admin', 'user', 'staff']}><Profile /> </PrivateRoute>} />
                    <Route path='manage-users' element={<PrivateRoute roles={['admin']}><ManageUser /> </PrivateRoute>} />
                    <Route path='update-user/:id' element={<PrivateRoute roles={['admin']}><UpdateUser /> </PrivateRoute>} />
                    <Route path='user-logs' element={<PrivateRoute roles={['admin']}><ManageUserLogs /> </PrivateRoute>} />
                    <Route path='view-log/:id' element={<PrivateRoute roles={['admin']}><ViewOneLog /> </PrivateRoute>} />

                    {/* news management */}

                    <Route path='manage-news' element={<PrivateRoute roles={['admin', 'staff']}><ManageNews /> </PrivateRoute>} />
                    <Route path='create-news' element={<PrivateRoute roles={['admin', 'staff']}><CreateNews /> </PrivateRoute>} />
                    <Route path='update-news/:id' element={<PrivateRoute roles={['admin', 'staff']}><UpdateNews /> </PrivateRoute>} />


                    {/* workshop management */}

                    <Route path='manage-workshop' element={<PrivateRoute roles={['admin', 'staff']}><ManageWorkshop /> </PrivateRoute>} />
                    <Route path='create-workshop' element={<PrivateRoute roles={['admin', 'staff']}><CreateWorkshop /> </PrivateRoute>} />                   
                    <Route path='update-workshop/:id' element={<PrivateRoute roles={['admin', 'staff']}><UpdateWorkshop /> </PrivateRoute>} />

                    {/* Resource Management */}

                    <Route path='manage-resource' element={<PrivateRoute roles={['admin', 'staff']}><ManageResource /> </PrivateRoute>} />
                    <Route path='create-resource' element={<PrivateRoute roles={['admin', 'staff']}><CreateResource /> </PrivateRoute>} />
                    <Route path='view-resource/:id' element={<PrivateRoute roles={['admin', 'staff']}><ViewResource /> </PrivateRoute>} />
                    

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

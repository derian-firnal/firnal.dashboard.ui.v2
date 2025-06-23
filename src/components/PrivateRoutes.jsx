import { Navigate, Outlet } from 'react-router-dom'
import UserAuthStatus from '../hooks/UserAuthStatus'
// import Spinner from './Spinner'

const PrivateRoutes = ({ children }) => {

    const { loggedIn, checkStatus } = UserAuthStatus();

    if (checkStatus) {
        console.log('[PrivateRoutes] Waiting for auth check...');
        return null; // or <Spinner />
    }

    console.log('[PrivateRoutes] Auth check complete. LoggedIn =', loggedIn);
    return loggedIn ? children : <Navigate to="/login" replace />;
}

export default PrivateRoutes
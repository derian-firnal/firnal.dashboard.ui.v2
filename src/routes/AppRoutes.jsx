// routes/AppRoutes.jsx  
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"
import Layout from "../layout/Layout"
import PrivateRoutes from '../components/PrivateRoutes'
import Login from "../pages/Login"
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import AudiencesPage from "../pages/Audiences"
import Products from '../pages/Products'
import Favorites from '../pages/Favorites'
import Inbox from "../pages/Inbox"
import OrderLists from "../pages/OrderLists"
import ProductStock from "../pages/ProductStock"
import Pricing from "../pages/Pricing"
import Todo from "../pages/Todo"
import Contact from "../pages/Contact"
import Invoice from "../pages/Invoice"
import Team from "../pages/Team"
import Table from "../pages/Table"
import NotFound from "../pages/NotFound"
import Calendar from "../pages/Calendar"
import SearchB2BPage from "../pages/SearchB2B"
import IntentSearch from "../pages/IntentSearch"
import AudienceDetailPage from "../pages/AudienceDetail"


// import Student from '../features/students/Student';  
// import Teacher from '../features/staffs/Teacher';  

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace /> // ⬅️ Redirect root to /login
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/sign-up',
        element: <SignUp />
    },
    {
        // path: '/dashboard',
        // element: <Layout><Outlet /></Layout>,
        path: '/',
        element: (
            <PrivateRoutes>
                <Layout />
            </PrivateRoutes>
        ),
        children: [
            {
                // element: <PrivateRoutes />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    },
                    {
                        path: 'audiences',
                        element: <AudiencesPage />
                    },
                    {
                        path: 'audienceDetail',
                        element: <AudienceDetailPage />
                    },
                    {
                        path: 'searchb2b',
                        element: <SearchB2BPage />
                    },
                    {
                        path: 'intentSearch',
                        element: <IntentSearch />
                    },
                    {
                        path: 'products',
                        element: <Products />
                    },
                    {
                        path: 'favorites',
                        element: <Favorites />
                    },
                    {
                        path: 'inbox',
                        element: <Inbox />
                    },
                    {
                        path: 'order-lists',
                        element: <OrderLists />
                    },
                    {
                        path: 'product-stock',
                        element: <ProductStock />
                    },
                    {
                        path: 'pricing',
                        element: <Pricing />
                    },
                    {
                        path: 'calendar',
                        element: <Calendar />
                    },
                    {
                        path: 'todo',
                        element: <Todo />
                    },
                    {
                        path: 'contact',
                        element: <Contact />
                    },
                    {
                        path: 'invoice',
                        element: <Invoice />
                    },
                    {
                        path: 'ui-elements',
                        element: <Pricing />
                    },
                    {
                        path: 'team',
                        element: <Team />
                    },
                    {
                        path: 'table',
                        element: <Table />
                    },
                ]
            },
        ]
    },
    {
        path: '/*',
        element: <NotFound />
    },
]);

export default router;
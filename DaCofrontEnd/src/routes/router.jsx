import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from '../views/users/Login'
import Signup from '../views/users/Signup'
import Users from '../views/users/Users'
import NotFound from '../views/NotFound'
import AppLayout from '../Components/Layouts/AppLayout'
import GeustLayout from '../Components/Layouts/GeustLayout'
import Dashboard from '../views/Dashboard'
import App from '../App'
import Accounts from '../views/Accounts/Accounts'
import AccountForm from '../views/Accounts/AccountForm'
import Members from '../views/Members/Members'
import MemberForm from '../views/Members/MemberForm'
import Transactions from '../views/Transactions/Transactions'
import TransactionForm from '../views/Transactions/TransactionForm'
import UserForm from '../views/users/UserForm'
import MemberAcounts from '../views/Members/MemberAcounts'
import MemberTransactionDetails from '../views/Members/MemberTransactionDetails'

const router = createBrowserRouter([
    // {
    //     path: '/app',
    //     element: <App />
    // },
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/dashboard' />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/create',
                element: <UserForm key='create' />
            },
            {
                path: '/users/:id/edit',
                element: <UserForm key='edit' />
            },
            {
                path: '/accounts',
                element: <Accounts />
            },
            {
                path: '/accounts/create',
                element: <AccountForm key='create' />
            },
            {
                path: '/accounts/:id/edit',
                element: <AccountForm key='edit' />
            },
            {
                path: '/members',
                element: <Members />
            },
            {
                path: '/members/create',
                element: <MemberForm key='create' />
            },
            {
                path: '/members/membertansactiondetails/:id',
                element: <MemberTransactionDetails />
            },
            {
                path: '/members/memberaccounts/:id',
                element: <MemberAcounts />
            },
            {
                path: '/members/:member_id/:account_id',
                element: <MemberAcounts />
            },
            {
                path: '/members/:id/edit',
                element: <MemberForm key='edit' />
            },
            {
                path: '/transactions',
                element: <Transactions />
            },
            {
                path: '/transactions/create',
                element: <TransactionForm key='create' />
            },
            {
                path: '/transactions/:id/edit',
                element: <TransactionForm key='edit' />
            }
        ]
    },
    {
        path: '/',
        element: <GeustLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            }, {
                path: '/signup',
                element: <Signup />
            }
        ]
    }, {
        path: '*',
        element: <NotFound />
    }
])

export default router;
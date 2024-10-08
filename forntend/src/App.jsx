
import Login from './components/Login'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import SignUp from './components/Signup';
import Profile from './components/Profile';

const  router = createBrowserRouter([
  {
    path:  '/',
    element: <MainLayout />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ]
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/signup",
    element: <SignUp />
  }
])

function App() {

  return (
    <>
    <RouterProvider router={router}>
      {/* <SignUp/> */}
      <Login/>
      </RouterProvider>
    </>
  )
}

export default App

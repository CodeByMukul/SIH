
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, HomeLayout,  Login, Logout, Register } from "./pages";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "./components/Navbar";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout ></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "logout",
        element: <Logout />,
      }
    ],
  },
]);

function App() {


  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer position='top-center' />
    </>
  )
}

export default App

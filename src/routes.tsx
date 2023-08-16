import { createBrowserRouter , Navigate} from "react-router-dom"
import LayoutWebsite from "./components/layouts/LayoutWebsite"
import LayoutAdmin from "./components/layouts/LayoutAdmin"
import AdminProduct from "./pages/admin"
import AdminProductAdd from "./pages/admin/add"
import AdminProductEdit from "./pages/admin/edit"
import Signup from "./pages/user/signup"
import Signin from "./pages/user/signin"

export const routers = createBrowserRouter([
    {path: "/" , element: <LayoutWebsite/>},
    {path: "/signup" , element: <Signup/>},
    {path: "/signin" , element: <Signin/>},
    {path: "/admin" , element: <LayoutAdmin/> , children: [
        {index: true , element: <Navigate to="dashboard"/>},
        {path: "dashboard" , element: <AdminProduct/>},
        {path: "add" , element: <AdminProductAdd/>},
        {path: ":idProduct/edit" , element: <AdminProductEdit/>},
    ]},
])
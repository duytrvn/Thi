import { RouterProvider } from "react-router-dom";
import { routers } from "./routes";
const App = () => {
    return <div>
        <RouterProvider router={routers}/>
    </div>;
};
export default App;

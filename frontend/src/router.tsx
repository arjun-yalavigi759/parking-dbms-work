import { createBrowserRouter } from "react-router-dom";
import { RouteNames } from "./constants/route_names";
import HomePage from "./pages/home_page";
import SignupPage from "./pages/signup_page";
import ParkPage from "./pages/park_page";
import TakePage from "./pages/take_page";
import BillPage from "./pages/bill_page";

export const router = createBrowserRouter([
    {
        path: RouteNames.HOME,
        element: <HomePage />,
    },
    {
        path: RouteNames.SIGNUP,
        element: <SignupPage />,
    },
    {
        path: RouteNames.PARK,
        element: <ParkPage />,
    },
    {
        path: RouteNames.TAKE,
        element: <TakePage />,
    },
    {
        path: RouteNames.BILL + "/:duration",
        element: <BillPage />,
    }
]);
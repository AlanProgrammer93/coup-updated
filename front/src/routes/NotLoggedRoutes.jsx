import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function NotLoggedRoutes() {
    const { user } = useSelector((state) => (state.user));
   
    return user ? <Navigate to="/" /> : <Outlet />;
}

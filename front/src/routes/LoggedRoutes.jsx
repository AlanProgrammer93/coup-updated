import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import LoginScreen from "../pages/LoginScreen";

export default function LoggedRoutes() {
    const { user } = useSelector((state) => state.user);
    
    return user ? <Outlet /> : <LoginScreen />;
}
import { Navigate, Outlet, useNavigation, useLocation } from "react-router-dom";
import { authStore } from "../store/auth";
import LoadingScreen from "./loadingScreen";

export default function GuardedRoute() {
  const navigation = useNavigation();
  const location = useLocation();
  const { email, role } = authStore();

  if (location.pathname === "/") {
    return role === "manager" ? (
      <Navigate to="/manager" />
    ) : (
      <Navigate to="/driver" />
    );
  }

  if (email != "" && role != null) {
    return navigation.state === "loading" ? <LoadingScreen /> : <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

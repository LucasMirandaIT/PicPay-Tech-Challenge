import { useContext } from "react";
import { Navigate } from "react-router";
import { Storage } from "./Storage";
import Navbar from "../components/Navbar/Navbar";

interface ProtectedRoutePropsInterface {
  children: any;
}

const ProtectedRoute = ({ children }: ProtectedRoutePropsInterface) => {
  const authenticatedUser = Storage.get("authenticatedUser");


  if (!authenticatedUser) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Navbar />
      <>{children}</>
    </>
  );
};

export default ProtectedRoute;

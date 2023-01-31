import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../services/jwtService";

const ProtectedRoute = ({ children, minPermissionLevel }) => {
	let currentUser = getCurrentUser();

	let location = useLocation();

	if (!currentUser?.userID) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (minPermissionLevel && currentUser.permissionLevel < minPermissionLevel)
		return <Navigate to="/unauthorized" replace />;

	return children;
};

export default ProtectedRoute;

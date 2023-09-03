import { Navigate } from "react-router-dom";
function Redirect(props) {
    return (
        // Navigate(props, { replace: true })
        <Navigate replace to="/login" />
    );
}

export default Redirect;
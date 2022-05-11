import { Route, Redirect } from "react-router-dom";

import useAuth from "../Hooks/useAuth";

function Public(props) {
  const [token] = useAuth(true);

  if (token) {
    return <Redirect to="/admin/buyurtmalar" />;
  } else {
    return <Route {...props} />;
  }
}

export default Public;

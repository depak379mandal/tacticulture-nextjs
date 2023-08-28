import React from "react";
import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import { useRouter } from "next/navigation"

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = use();
        let navigate = useRouter();

        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter;
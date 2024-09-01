import {jwtDecode} from "jwt-decode";

const useFetchProfile = () => {
    if (!localStorage.getItem('accessToken')) {
        return {}
    }

    return jwtDecode(localStorage.getItem('accessToken'))
}

export default useFetchProfile

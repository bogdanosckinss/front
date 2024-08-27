import {jwtDecode} from "jwt-decode";

const useFetchProfile = () => {
    return jwtDecode(localStorage.getItem('accessToken'))
}

export default useFetchProfile

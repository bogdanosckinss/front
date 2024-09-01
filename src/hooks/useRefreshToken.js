import { useDispatch } from 'react-redux'
import { setIsAuthenticated, setUserInfo } from '../features/auth/authSlice'
import { setLoadingState } from '../features/loading/loadingSlice.js'
import parseJWT from "../utils/parseJWT.js"
import fetcher from "../services/axios";

const useRefreshToken = () => {
  const dispatch = useDispatch()

  const refreshToken = async () => {
    const accessToken = localStorage.getItem('accessToken')

    try {
      const response = await fetcher().post(
        'auth/refresh-access',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      )

      // const parsedToken = parseJWT(response.data.accessToken)
      // dispatch(
      //   setUserInfo({
      //     user: {
      //       id: parsedToken.id,
      //       name: parsedToken.name,
      //     },
      //     accessToken: response.data.accessToken,
      //   })
      // )  TODO: fix
        console.log('AUTH')
      dispatch(setIsAuthenticated(true))

      localStorage.setItem('accessToken', response.data.accessToken)

      return response.data.accessToken
    } catch (error) {
        console.log('SOMETHING HAPPENED')
      console.log(error)
        dispatch(setIsAuthenticated(false))
      return null
    } finally {
      dispatch(setLoadingState(false))
    }
  }

  return refreshToken
}

export default useRefreshToken

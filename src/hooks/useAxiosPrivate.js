import { useEffect } from 'react'
import fetcher, { axiosPrivate } from '../services/axios'
import useRefreshToken from './useRefreshToken'
import {useSelector} from "react-redux";

const useAxiosPrivate = () => {
  const userInfo = useSelector(
    (state) => state.auth.userInfo
  )
  const accessToken = useSelector(
    (state) => state.auth.userInfo?.accessToken
  )
  const refresh = useRefreshToken()

  useEffect(() => {
    const requestIntercept = fetcher().interceptors.request.use(
      async (config) => {
          const cookies = getCookie('rf')
          console.log(document.cookie)
          config.withCredentials = true
          if (cookies) {
              config.headers['Cookie'] = cookies
          }

        const accessTokenLoad = localStorage.getItem('accessToken')
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessTokenLoad ?? accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = fetcher().interceptors.response.use(
      async (response) => {
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken)
        }

        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken)
        }
        return response
      },
      async (error) => {
        const previousRequest = error?.config
        if (error?.response?.status === 403 && !previousRequest?.sent) {
            console.log('err')
          previousRequest.sent = true
          const newAccessToken = await refresh()
          previousRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(previousRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      fetcher().interceptors.response.eject(responseIntercept)
      fetcher().interceptors.request.eject(requestIntercept)
    }
  }, [userInfo, refresh])
  return fetcher()
}

function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export default useAxiosPrivate

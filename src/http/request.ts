import Request from './index'

const request = new Request({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  showLoading: true,
  loadingText: '加载中...',
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default request

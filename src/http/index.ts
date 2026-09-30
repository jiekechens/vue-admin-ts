import axios from 'axios'
import { ElLoading } from 'element-plus'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

export interface RequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
  showLoading?: boolean
  loadingText?: string
}

export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

class Request {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean
  loadingText: string
  loadingCount: number

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true
    this.loadingText = config.loadingText ?? '加载中...'
    this.loadingCount = 0

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use(
      (config) => {
        const showLoading = (config as RequestConfig).showLoading ?? this.showLoading
        if (showLoading) {
          this.loadingCount++
          if (this.loadingCount === 1) {
            this.loading = ElLoading.service({
              lock: true,
              text: (config as RequestConfig).loadingText ?? this.loadingText,
              background: 'rgba(0, 0, 0, 0.7)'
            })
          }
        }
        return config
      },
      (err) => {
        const showLoading = (err.config as RequestConfig)?.showLoading ?? this.showLoading
        if (showLoading) {
          this.loadingCount--
          if (this.loadingCount === 0) {
            this.loading?.close()
          }
        }
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        const showLoading = (res.config as RequestConfig)?.showLoading ?? this.showLoading
        if (showLoading) {
          this.loadingCount--
          if (this.loadingCount === 0) {
            this.loading?.close()
          }
        }
        return res.data
      },
      (err) => {
        const showLoading = (err.config as RequestConfig)?.showLoading ?? this.showLoading
        if (showLoading) {
          this.loadingCount--
          if (this.loadingCount === 0) {
            this.loading?.close()
          }
        }
        return Promise.reject(err)
      }
    )
  }

  request<T = any>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request

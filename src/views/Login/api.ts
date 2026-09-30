import request from '@/http/request'

const getCode = () => {
  return request.get<{
    code: number,
    message: string,
    data: {
      captcha: string,
      captchaId: string
    }
  }>({
    url: '/api/captcha/get'
  })
}

const login = (data: {
  "username": string,
  "password": string,
  "captchaId": string,
  "captcha": string
}) => {
  return request.post<{
    code: number,
    message: string,
    data: {
      success: boolean
    }
  }>({
    url: '/api/user/login',
    data
  })
}

export { getCode, login }
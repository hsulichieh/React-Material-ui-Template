import Router from 'next/router'
import { FecthGetCtrl } from './FetchController'
import { APIUrl } from '../Config/Config'

export const ActLogin = (UserName, PassWord, WebSite) => {
  try {
    if (localStorage.removeItem) {
      localStorage.clear()
    }
  } catch (exception) { console.warn(exception) }

  FecthGetCtrl(APIUrl.Auth).then((response) => {
    if (response.IsAuth) {
      localStorage.setItem('IsAuth', response.IsAuth)
      localStorage.setItem('Token', response.Token)
      localStorage.setItem('WebSite', WebSite)
      Router.push('/Dashboard/View')
    } else {
      Router.push(`/${WebSite}`)
    }
  })
}

export const ActLogout = () => {
  const TheSite = localStorage.getItem('WebSite')
  try {
    if (localStorage.removeItem) {
      localStorage.clear()
      Router.push(`/${TheSite}`)
    }
  } catch (exception) { console.warn(exception) }
}

export const ChkLogined = () => {
  if (localStorage.getItem) {
    const storage = localStorage
    FecthGetCtrl(APIUrl.Auth).then((response) => {
      if (storage.Token !== response.Token) {
        Router.push(`/${storage.WebSite}`)
      }
    })
  } else {
    return true
  }
}

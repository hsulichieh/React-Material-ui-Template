/* eslint-disable no-unused-vars */
import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import GetTheme from '../src/Theme/DynamicTheme'

export default function Index(props) {
  const TheTheme = createMuiTheme(GetTheme())
  const router = useRouter()
  const SignIn = dynamic(() => import('../src/Layout/Singin/Singin'))
  const TheAuth = useSelector((state) => state.auth.isAuth)
  return (
    <ThemeProvider theme={TheTheme}>
      <SignIn TheWebSite={router.query.index} />
    </ThemeProvider>
  )
}

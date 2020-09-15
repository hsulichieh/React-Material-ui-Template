/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import dynamic from 'next/dynamic'
import GetTheme from '../../src/Theme/DynamicTheme'
import { ChkLogined } from '../../src/Components/Controller/CheckController'

export default function Index(props) {
  const TheTheme = createMuiTheme(GetTheme())
  const Dashboard = dynamic(() => import('../../src/Layout/Dashboard/Main'))
  useEffect(() => {
    // componentDidMount 及 componentDidUpdate
    ChkLogined()
    // componentDidUpdate 及 componentWillUnmount
    return (() => {

    })
  })
  return (
    <ThemeProvider theme={TheTheme}>
      <Dashboard />
    </ThemeProvider>
  )
}

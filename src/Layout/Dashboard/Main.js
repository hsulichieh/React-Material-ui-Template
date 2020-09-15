/* eslint-disable import/no-duplicates */
/* eslint-disable max-len */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import intl from 'react-intl-universal'
import { DashboardStyles } from '../../Theme/Theme'
import TheDrawer from './Layout/TheDrawer'
import TheHead from './Layout/TheHead'
import { Config } from '../../Components/Config/Config'
import ZhCn from '../../Components/Translations/zh-cn.json'
import ZhTw from '../../Components/Translations/zh-tw.json'
import EnUs from '../../Components/Translations/en-us.json'

const locales = {
  'zh-cn': ZhCn,
  'zh-tw': ZhTw,
  'en-us': EnUs,
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleLangSW = this.handleLangSW.bind(this)
    this.state = {
      open: false,
      initDone: false,
      lang: Config.DefaultLang,
    }
  }

  componentDidMount() {
    this.loadLocales()
  }

  handleDrawerOpen() {
    this.setState({ open: true })
  }

  handleDrawerClose() {
    this.setState({ open: false })
  }

  handleLangSW(e) {
    this.setState({ lang: e }, () => {
      this.loadLocales()
    })
  }

  loadLocales() {
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    intl.init({
      currentLocale: this.state.lang, // TODO: determine locale here
      locales,
    })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({ initDone: true })
      })
  }

  render() {
    const { classes, theme } = this.props
    const TheMain = dynamic(() => import('./Layout/TheMain'))
    const TheEditor = dynamic(() => import('./Layout/Editor/TheEditor'))
    const TheAddBoard = dynamic(() => import('./Layout/AddDashboard/TheAddBoard'))
    const MainType = this.props.router.query.index
    const TheKey = 1

    return (
      this.state.initDone
      && (
      <div className={classes.root}>
        <CssBaseline />
        <TheHead open={this.state.open} TheTheme={theme} TheClasses={classes} handleDrawerOpen={this.handleDrawerOpen} handleLangSW={this.handleLangSW} lang={this.state.lang} />
          {MainType === 'View' && <TheMain open={this.state.open} TheTheme={theme} TheClasses={classes} lang={this.state.lang} />}
          {MainType === 'Edit' && <TheEditor open={this.state.open} TheTheme={theme} TheClasses={classes} lang={this.state.lang} TheKey={TheKey} />}
          {MainType === 'AddDashboard' && <TheAddBoard open={this.state.open} TheTheme={theme} TheClasses={classes} lang={this.state.lang} />}
        <TheDrawer open={this.state.open} TheTheme={theme} TheClasses={classes} handleDrawerClose={this.handleDrawerClose} lang={this.state.lang} />
      </div>
      )
    )
  }
}
Main.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
}

export default withRouter(withStyles(DashboardStyles, { withTheme: true })(Main))

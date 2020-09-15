/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
import React from 'react'
import clsx from 'clsx'
import Router from 'next/router'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness5Icon from '@material-ui/icons/Brightness5'
import TranslateIcon from '@material-ui/icons/Translate'
import AddToQueueIcon from '@material-ui/icons/AddToQueue'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { ActLogout } from '../../../Components/Controller/CheckController'

export default function Head(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const dispatch = useDispatch()
  const TheTypes = useSelector((state) => state.value.types)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (value, lang) => {
    setAnchorEl(null)
    props.handleLangSW(lang)
  }

  const classes = props.TheClasses
  const handleDrawerOpen = () => {
    props.handleDrawerOpen()
  }

  const getLang = () => (props.lang === 'zh-cn' ? '简中' : props.lang === 'zh-tw' ? '繁中' : props.lang === 'en-us' ? 'English' : 'N/A')

  const AddDashboard = () => {
    Router.push(`/Dashboard/AddDashboard`)
  }

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.open,
      })}
    >
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          {intl.get('Welcome')}
        </Typography>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={() => { ActLogout() }}
        >
          <ExitToAppIcon />
        </IconButton>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={() => {
            dispatch({ type: TheTypes === 'light' ? 'TheDark' : 'TheLight' })
          }}
        >
          {TheTypes === 'light' ? <Brightness5Icon /> : <Brightness4Icon />}
        </IconButton>
        <Tooltip title={getLang()}>
          <Button
            className={classes.menuButton}
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <TranslateIcon />
            {getLang()}
            <ExpandMoreIcon />
          </Button>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={(event) => handleSelect(event, 'zh-cn')}>简中</MenuItem>
          <MenuItem onClick={(event) => handleSelect(event, 'zh-tw')}>繁中</MenuItem>
          <MenuItem onClick={(event) => handleSelect(event, 'en-us')}>English</MenuItem>

        </Menu>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={() => { AddDashboard() }}
        >
          <AddToQueueIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(props.open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

Head.propTypes = {
  TheClasses: PropTypes.object.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  handleLangSW: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
}

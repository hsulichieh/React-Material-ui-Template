/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import ThePanel from './ThePanel'

export default function TheMain(props) {
  const classes = props.TheClasses

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.open,
      })}
    >
      <div className={classes.drawerHeader} />
      <ThePanel TheTheme={props.TheTheme} TheClasses={classes} />
    </main>
  )
}

TheMain.propTypes = {
  TheClasses: PropTypes.object.isRequired,
  TheTheme: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
}

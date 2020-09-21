/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

export default function Thestateless(props) {
  const classes = props.TheClasses

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.open,
      })}
    >
      <div className={classes.drawerHeader} />
      This is Stateless, Here insert your code
    </main>
  )
}

Thestateless.propTypes = {
  TheClasses: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
}

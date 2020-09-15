/* eslint-disable react/prop-types */
import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { ActLogin } from '../../Components/Controller/CheckController'

export default function SinginButton(props) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={props.TheSubmitStyle}
      onClick={() => { ActLogin(props.TheUserName, props.ThePassWord, props.TheSite) }}
    >
      Sign In
    </Button>
  )
}

SinginButton.propTypes = {
  TheSubmitStyle: PropTypes.string.isRequired,
  TheUserName: PropTypes.string.isRequired,
  ThePassWord: PropTypes.string.isRequired,
}

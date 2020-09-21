import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

export default class Thestate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    // console.log('componentDidMount')

  }

  componentDidUpdate() {
    // console.log('componentDidUpdate')
  }

  componentWillUnmount() {
    // console.log('ThePanel-componentWillUnmount')
  }

  render() {
    const classes = this.props.TheClasses
    return (
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: this.props.open,
        })}
      >
        <div className={classes.drawerHeader} />
        This is State, Here insert your code
      </main>
    )
  }
}

Thestate.propTypes = {
  TheClasses: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
}

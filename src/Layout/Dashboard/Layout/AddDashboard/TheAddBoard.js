/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Tree from './Tree'

export default function TheAddBoard(props) {
  const classes = props.TheClasses
  const { TheTheme } = props
  console.log(TheTheme)
  const [treeData, setTreeData] = React.useState([
    {
      title: 'root',
      isDirectory: true,
      expanded: true,
      children: [
        {
          title: 'hello',
          isDirectory: true,
          expanded: true,
          children: [
            {
              title: 'bar.js',
            },
            {
              title: 'baz.js',
            },
            {
              title: 'hello2',
              isDirectory: true,
              expanded: true,
              children: [{ title: 'Маруся.jpg' }],
            },
          ],
        },
        {
          title: 'world.js',
        },
      ],
    },
  ])

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.open,
      })}
    >
      <div className={classes.drawerHeader} />
      <Tree value={treeData} onChange={setTreeData} TheTheme={TheTheme} />
    </main>

  )
}

TheAddBoard.propTypes = {
  TheClasses: PropTypes.object.isRequired,
  TheTheme: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
}

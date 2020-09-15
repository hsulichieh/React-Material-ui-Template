/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-unused-state */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import { Responsive, WidthProvider } from 'react-grid-layout'
import EditIcon from '@material-ui/icons/Edit'
import CopyIcon from '@material-ui/icons/FileCopy'
import MoveIcon from '@material-ui/icons/Transform'
import CloseIcon from '@material-ui/icons/Close'
import { FecthGetCtrl } from '../../../Components/Controller/FetchController'
import { APIUrl } from '../../../Components/Config/Config'
import { CalStore } from '../../../Components/Reduex/Store/CalStore'

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const iscomplete = true

export default class ThePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: new Date().toLocaleString(),
      IsCreate: false,
      currentBreakpoint: 'lg',
      compactType: 'vertical',
      mounted: false,
      layout: {},
      items: {},
    }

    this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onAddItem = this.onAddItem.bind(this)
  }

  componentDidMount() {
    FecthGetCtrl(APIUrl.Panel).then((response) => {
      this.setState({
        items: response.map((item, i) => ({
          i: `${i}`,
          x: item.position.x,
          y: item.position.y,
          w: item.position.width,
          h: item.position.height,
          APIURL: item.data_src,
          Type: item.type,
        })),
      }, () => {
        // this.getdata()
      })
    })

    this.setState({ mounted: true })
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate')
  }

  componentWillUnmount() {
    // console.log('ThePanel-componentWillUnmount')
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint,
    })
  }

  onLayoutChange(layout, layouts) {

  }

  onRemoveItem(i) {
    this.setState((prevState) => ({ items: _.reject(prevState.items, { i }) }))
  }

  onAddItem() {
    /* eslint no-console: 0 */
    // console.log('adding', `${this.state.newCounter}`)
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: `${this.state.newCounter}`,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
    })
  }

  onEditItem(i) {
    // Router.push(`/Dashboard/Edit/${i}`)
    Router.push('/Dashboard/Edit')
  }

  createElement(el) {
    // console.log(el)
    const classes = this.props.TheClasses
    const theme = this.props.TheTheme
    const TheECharts = dynamic(() => import('../../Charts/TheEChart'))
    const TheTable = dynamic(() => import('../../Table/TheTable'))
    const BoxType = el.Type
    const i = el.add ? '+' : el.i

    const getH = (_.find(this.state.layout.lg, ['i', el.i]))
    const TheH = this.state.layout.lg !== undefined ? getH.h : 0
    // const TheH = 3
    return (

      <div key={i} data-grid={el}>
        <div>
          {
          BoxType === 'ECharts' && <TheECharts Thekey={i} TheTheme={theme} TheHeight={TheH * 38} />
          }
          {
           BoxType === 'Table' && <TheTable Thekey={i} />
          }
        </div>
        <div className={classes.Panelroot}>
          <CopyIcon className={classes.Panelicon} onClick={this.onAddItem} />
          <MoveIcon className={classes.Panelicon} />
          <EditIcon className={classes.Panelicon} onClick={() => { this.onEditItem(i) }} />
          <CloseIcon className={classes.Panelicon} onClick={() => { this.onRemoveItem(i) }} />
        </div>
      </div>

    )
  }

  stringifyLayout() {
    return _.map(this.state.layout.lg, (l) => (
      <div className="layoutItem" key={l.i}>
        <b>{l.i}</b>
        : [
        {l.x}
        ,
        {l.y}
        ,
        {l.w}
        ,
        {l.h}
        ]
      </div>
    ))
  }

  render() {
    const { currentTime } = this.state
    return (

      <div>
        <div>
          <div>{currentTime}</div>

          Current Breakpoint:
          {' '}
          {this.state.currentBreakpoint}
          {' '}
          (
          {
            this.props.cols[this.state.currentBreakpoint]
          }
          {' '}
          columns)
        </div>
        <div>
          Compaction type:
          {' '}
          {_.capitalize(this.state.compactType) || 'No Compaction'}
        </div>
        <div>
          Displayed as
          {' '}
          <code>[x, y, w, h]</code>
          :
          <div className="columns">{this.stringifyLayout()}</div>
        </div>
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layout}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {_.map(this.state.items, (el) => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    )
  }
}

ThePanel.propTypes = {
  TheClasses: PropTypes.object.isRequired,
  TheTheme: PropTypes.object.isRequired,
  cols: PropTypes.object.isRequired,
}

ThePanel.defaultProps = {
  className: 'layout',
  rowHeight: 30,
  cols: {
    lg: 12, md: 10, sm: 6, xs: 4, xxs: 2,
  },
}

/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable max-len */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MailIcon from '@material-ui/icons/Mail'
import Typography from '@material-ui/core/Typography'
import Router from 'next/router'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { useTreeItemStyles } from '../../../Theme/Theme'
import { FecthGetCtrl } from '../../../Components/Controller/FetchController'
import { APIUrl } from '../../../Components/Config/Config'

export default function TheDrawer(props) {
  const [tree, settree] = React.useState(null)

  const classes = props.TheClasses
  const theme = props.TheTheme
  const treeobj = []

  const handleDrawerClose = () => {
    props.handleDrawerClose()
  }

  const changeDash = (event, x) => {
    Router.push(`/dashboard/${x}`)
  }

  const StyledTreeItem = (Treeprops) => {
    const Tclasses = useTreeItemStyles()
    const {
      labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other
    } = Treeprops

    return (
      <TreeItem
        label={(
          <div className={Tclasses.labelRoot}>
            <LabelIcon color="inherit" className={Tclasses.labelIcon} />
            <Typography variant="body2" className={Tclasses.labelText}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </div>
        )}
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor,
        }}
        classes={{
          root: Tclasses.root,
          content: Tclasses.content,
          expanded: Tclasses.expanded,
          selected: Tclasses.selected,
          group: Tclasses.group,
          label: Tclasses.label,
        }}
        {...other}
      />
    )
  }

  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  }

  const listSub = (sub, data) => {
    const getSub = data.filter((item) => (item.MasterId === sub.Id))
    const subobj = []
    for (const x1 in getSub) {
      if (getSub[x1].HasSub === false) {
        subobj.push(<StyledTreeItem key={getSub[x1].Id} nodeId={`'${getSub[x1].Id}'`} labelText={getSub[x1].title[props.lang]} labelIcon={MailIcon} onClick={(event) => changeDash(event, getSub[x1].LinkPath)} />)
      } else {
        subobj.push(<StyledTreeItem key={getSub[x1].Id} nodeId={`'${getSub[x1].Id}'`} labelText={getSub[x1].title[props.lang]} labelIcon={MailIcon}>{listSub(getSub[x1], data)}</StyledTreeItem>)
      }
    }
    return subobj
  }

  const listMain = (data) => {
    /* eslint no-unused-vars: "error" */
    const getRoot = data.filter((item) => (item.MasterId === 0))
    for (const x1 in getRoot) {
      if (getRoot[x1].HasSub === false) {
        treeobj.push(<StyledTreeItem key={getRoot[x1].Id} nodeId={`'${getRoot[x1].Id}'`} labelText={getRoot[x1].title[props.lang]} labelIcon={MailIcon} onClick={(event) => changeDash(event, getRoot[x1].LinkPath)} />)
      } else {
        treeobj.push(<StyledTreeItem key={getRoot[x1].Id} nodeId={`'${getRoot[x1].Id}'`} labelText={getRoot[x1].title[props.lang]} labelIcon={MailIcon}>{listSub(getRoot[x1], data)}</StyledTreeItem>)
      }
    }
    settree(treeobj)
  }

  useEffect(() => {
    // componentDidMount 及 componentDidUpdate
    FecthGetCtrl(APIUrl.Drawer).then((response) => listMain(response))
    // componentDidUpdate 及 componentWillUnmount
    return (() => {

    })
  }, [props.lang])

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>

        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <TreeView
        className={classes.TreeViewroot}
        defaultExpanded={['3', '5']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {tree}
      </TreeView>
    </Drawer>
  )
}

TheDrawer.propTypes = {
  TheClasses: PropTypes.object.isRequired,
  TheTheme: PropTypes.object.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
}

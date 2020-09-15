import React from 'react'
import SortableTree, {
  changeNodeAtPath,
  removeNodeAtPath,
  addNodeUnderParent,
} from 'react-sortable-tree'
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'
import { makeStyles } from '@material-ui/styles'
import MaterialTheme from 'react-sortable-tree-theme-material-ui'

const getNodeKey = ({ treeIndex }) => treeIndex

const renderTitle = (node, setTreeData, treeData, path) => (
  <input
    value={node.title}
    onChange={(event) => {
      const title = event.target.value

      setTreeData(
        changeNodeAtPath({
          treeData,
          path,
          getNodeKey,
          newNode: { ...node, title },
        }),
      )
    }}
  />
)

const renderNodeButtons = (node, setTreeData, treeData, path) => {
  const rmButton = (
    <button
      key="remove"
      onClick={() => setTreeData(
        removeNodeAtPath({
          treeData,
          path,
          getNodeKey,
        }),
      )}
    >
      rm
    </button>
  )

  const mkdirButton = (
    <button
      onClick={() => setTreeData(
        addNodeUnderParent({
          treeData,
          parentKey: path[path.length - 1],
          expandParent: true,
          getNodeKey,
          newNode: {
            title: '',
            isDirectory: true,
          },
        }).treeData,
      )}
    >
      mkdir
    </button>
  )

  const touchButton = (
    <button
      onClick={() => setTreeData(
        addNodeUnderParent({
          treeData,
          parentKey: path[path.length - 1],
          expandParent: true,
          getNodeKey,
          newNode: {
            title: '',
          },
        }).treeData,
      )}
    >
      touch
    </button>
  )

  return node.isDirectory ? [mkdirButton, touchButton, rmButton] : [rmButton]
}

function Tree({ value: treeData, onChange: setTreeData }) {
  return (
    <div style={{
      height: 600, overflowX: 'hidden', overflowY: 'auto', width:'50%',
      
    }}
    >
      <SortableTree
        isVirtualized={false}
        treeData={treeData}
        onChange={setTreeData}
        theme={MaterialTheme}
        canNodeHaveChildren={(node) => node.isDirectory}
        generateNodeProps={({ node, path }) => ({
          icons: node.isDirectory ? [node.expanded ? '🖥️' : '🖥️'] : ['📊'],
          buttons: renderNodeButtons(node, setTreeData, treeData, path),
          title: renderTitle(node, setTreeData, treeData, path),
        })}
      />
      <button
        onClick={() => setTreeData([
          ...treeData,
          {
            title: '',
            isDirectory: true,
          },
        ])}
      >
        mkdir
      </button>
    </div>
  )
}

export default Tree

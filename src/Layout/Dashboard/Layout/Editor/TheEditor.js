/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import ReactEcharts from 'echarts-for-react'

// codemirror
import { Controlled as CodeMirror } from 'react-codemirror2'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/indent-fold'
import jsonlint from 'jsonlint-mod'
import { js_beautify } from 'js-beautify'
import useECharts from './useECharts'
import defaultData from '../../../../../static/Data/BarChart.json'

const beautify = (value) => js_beautify(value, { indent_size: 2 })

window.jsonlint = jsonlint

export default function TheEditor(props) {
  const classes = props.TheClasses
  const initialValue = beautify(JSON.stringify(defaultData))
  const chartRef = useRef(null)

  // const initialValue = beautify(initialJson);
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState(null)

  const handleFocus = (editor, event) => {
    try {
      JSON.stringify(JSON.parse(editor.getDoc().getValue()))
      setError(null)
      setValue(beautify(editor.getDoc().getValue()))
    } catch (e) {
      setError('Syntax error')
    }
  }

  function ToChart() {
    try {
      return JSON.parse(value)
    } catch (e) {
      console.warn(e.message)
      return {}
    }
  }
  useECharts(chartRef, ToChart(), props.TheTheme.palette.type)

  useEffect(() =>
    // componentDidMount 及 componentDidUpdate
    (() => {
      // componentDidUpdate 及 componentWillUnmount
    }),
  [])

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: props.open,
      })}
    >
      <div className={classes.drawerHeader} />
      <div style={{ width: '100%', height: '300px' }} ref={chartRef} />

      <div>
        {error && <div>{error}</div>}
        <CodeMirror
          value={value}
          options={{
            mode: 'application/json',
            theme: props.TheTheme.palette.type === 'dark' ? 'dracula' : 'eclipse',
            lineNumbers: true,
            lineWrapping: true,
            autoCloseBrackets: false,

            gutters: [
              'CodeMirror-lint-markers',
              'CodeMirror-linenumbers',
              'CodeMirror-foldgutter',
            ],
            lint: true,
            foldGutter: true,
            readOnly: false,
          }}
          onBeforeChange={(editor, data, value) => {
            setValue(value)
          }}
          onChange={(editor, data, value) => {
            try {
              JSON.stringify(JSON.parse(value))
              setError(null)
              setValue(value)
            } catch (e) {
              setError('Syntax error')
            }
          }}
          onBlur={handleFocus}
          onFocus={handleFocus}
        />
      </div>
    </main>

  )
}

TheEditor.propTypes = {
  TheClasses: PropTypes.object.isRequired,
  TheTheme: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
}

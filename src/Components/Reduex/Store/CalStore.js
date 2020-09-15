/* eslint-disable import/no-extraneous-dependencies */
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import CalReducer from '../Reducer/CalReducer'
import PanelsReduce from '../Reducer/PanelsReduce'

export const CalStore = createStore(CalReducer, composeWithDevTools())
export const ThePanels = createStore(PanelsReduce, composeWithDevTools())

export default CalStore

import { useSelector } from 'react-redux'

export default function Test() {
  const TheTypes = useSelector((state) => state.value.types)

  const TheTheme = {
    palette: {
      type: TheTypes,
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: '#b2102f',
      },
      background: {
      },
    },
  }
  return TheTheme
}

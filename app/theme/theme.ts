import { DefaultTheme } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  roundness: 10,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(145, 224, 163)',
    secondary: 'rgb(137, 96, 211)',
    tertiary: 'rgb(255, 255, 255)',
    rowBackground: 'rgb(255, 255, 240)',
    rackground: 'rgb(242, 242, 242)',
    dark: '#333333',
    favorite: '#87CEEB',
    fog: '#44444414',
    highlight: '#B6D0E2',
  },
}
const color = theme.colors

export { theme, color }

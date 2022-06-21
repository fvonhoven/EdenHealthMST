import { DefaultTheme } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  roundness: 10,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(145, 224, 163)',
    secondary: 'rgb(137, 96, 211)',
    tertiary: 'rgb(244, 225, 217)',
    highlight: '#3498db',
    dark: '#333333',
    fog: '#44444414',
  },
}
const color = theme.colors

export { theme, color }

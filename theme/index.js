import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0e65cc',
    background: '#FFFFFF',
    card: '#f7f7f7',
    text: '#101010',
    headerText: '#FFFFFF',
    border: '#dedede',
    progressBar: '#0a3b77',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#5792d9',
    background: '#1a1f26',
    card: '#212730',
    text: '#e6e6e6',
    headerText: '#e6e6e6',
    border: '#292e33',
    progressBar: '#5792d9',
  },
};

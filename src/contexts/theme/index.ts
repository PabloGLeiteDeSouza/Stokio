import React from 'react';
import { Appearance } from 'react-native';

interface ThemeContextAppProps {
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  theme: 'light' | 'dark';
}

const ThemeContextApp = React.createContext<ThemeContextAppProps>({
  toggleTheme: () => {},
  setTheme: (theme: 'light' | 'dark') => {
    theme;
  },
  theme: Appearance.getColorScheme() as 'light' | 'dark',
});

export default ThemeContextApp;

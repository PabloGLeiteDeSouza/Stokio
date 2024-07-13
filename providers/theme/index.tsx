import { StorageProvider } from '$providers/storage';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import React from 'react';
import { Appearance, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

interface ThemeProviderAppProps {
  children: React.ReactNode;
}

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

const ThemeProviderApp: React.FC<ThemeProviderAppProps> = ({ children }) => {
  const [theme, SetTheme] = React.useState<'light' | 'dark'>(
    Appearance.getColorScheme() as 'light' | 'dark',
  );
  Appearance.addChangeListener(async (preferences) => {
    if (Platform.OS === 'android') {
      await NavigationBar.setBackgroundColorAsync(
        preferences.colorScheme === 'dark' ? '#262626' : '#F1F1F1',
      );
      await NavigationBar.setButtonStyleAsync(
        preferences.colorScheme as 'light' | 'dark',
      );
      await NavigationBar.setBorderColorAsync(
        preferences.colorScheme === 'dark' ? '#404040' : '#DBDBDB',
      );
    }
  });
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const setTheme = (theme: 'light' | 'dark') => {
    SetTheme(theme as 'light' | 'dark');
    Appearance.setColorScheme(theme);
  };

  return (
    <ThemeContextApp.Provider value={{ toggleTheme, setTheme, theme }}>
      <GluestackUIProvider colorMode={theme} config={config}>
        <StorageProvider>{children}</StorageProvider>
      </GluestackUIProvider>
    </ThemeContextApp.Provider>
  );
};

const useThemeApp = () => React.useContext(ThemeContextApp);

export { ThemeProviderApp, useThemeApp };

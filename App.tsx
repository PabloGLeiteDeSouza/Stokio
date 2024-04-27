import { ThemeProviderApp } from './providers/theme'
import Application from './components/Application'
import React from 'react'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <ThemeProviderApp>
      <Application />
    </ThemeProviderApp>
  );
}
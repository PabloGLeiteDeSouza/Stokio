import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import React from 'react';
import ApplicationProvider from '../../providers';

interface ConfigComponentProps {
  children: React.ReactNode;
}

const ConfigComponent: React.FC<ConfigComponentProps> = ({ children }) => {
  return (
    <ApplicationProvider>
      <GluestackUIProvider config={config}>{children}</GluestackUIProvider>
    </ApplicationProvider>
  );
};

export default ConfigComponent;

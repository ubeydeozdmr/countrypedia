import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import {
  ChakraProvider,
  ColorModeScript,
  ThemeConfig,
  extendTheme,
} from '@chakra-ui/react';
import '@fontsource/plus-jakarta-sans';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
    },
  },
  fonts: {
    heading: 'Plus Jakarta Sans Variable, sans-serif',
  },
  config,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);

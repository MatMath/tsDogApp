import React, { useMemo } from 'react';
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  createMuiTheme,
  useMediaQuery,
} from '@material-ui/core';
import { ThemeProvider } from "@material-ui/styles";

import { FetchBreeds } from './FetchBreeds';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
    },
  }), [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6">
              Dog Image Viewer
            </Typography>
          </Toolbar>
        </AppBar>
        <FetchBreeds />
      </Box>
    </ThemeProvider>
  );
}

export default App;

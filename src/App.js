import { useMemo, useState } from 'react';
import {
  Box,
  CssBaseline,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getOrgRepos, getUserRepos } from './queries';
import { blue, deepPurple, pink, purple } from '@mui/material/colors';
import SearchField from './components/SearchField';
import TableComponent from './components/TableComponent';

function App() {
  const API_ENDPOINT = 'https://api.github.com/graphql';
  // PASTE YOUR OWN PERSONAL ACCESS TOKEN HERE
  const GITHUB_TOKEN = '';

  const [username, setUsername] = useState('');
  const [userRepos, setUserRepos] = useState([]);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: prefersDarkMode ? deepPurple : blue,
          secondary: prefersDarkMode ? pink : purple,
        },
      }),
    [prefersDarkMode]
  );

  const fetchOrgRepo = () => {
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: getOrgRepos(username),
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        const orgRepos = json.data.organization.repositories.edges;

        setUserRepos(
          orgRepos.sort((a, b) => b.node.stargazerCount - a.node.stargazerCount)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchUserRepo = () => {
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: getUserRepos(username),
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log({ data: json.data });
        if (json.data.user) {
          const userRepos = json.data.user.repositories.edges;
          setUserRepos(
            userRepos.sort(
              (a, b) => b.node.stargazerCount - a.node.stargazerCount
            )
          );
        } else {
          // fallback and query for an organization instead of a user
          fetchOrgRepo();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();

    fetchUserRepo();
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          boxShadow: 1,
          padding: '5px 20px',
          width: '100%',
        }}
      >
        <Typography align="left" component="div" variant="h4">
          Github Star Search
        </Typography>
      </Box>
      <Box sx={{ margin: '20px auto', width: '80%' }}>
        <Grid container columnSpacing={3} rowSpacing={2}>
          <Grid item xs={12}>
            <SearchField
              handleUsernameChange={handleUsernameChange}
              handleSubmit={handleSearch}
              username={username}
            />
          </Grid>
          <Grid item xs={12}>
            <TableComponent userRepos={userRepos} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;

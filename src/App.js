import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { API_ENDPOINT, GITHUB_TOKEN } from './constants';
import { getRepos } from './queries';
import SearchField from './components/SearchField';
import TableComponent from './components/TableComponent';

import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userRepos, setUserRepos] = useState([]);

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleSearch = (event) => {
    event.preventDefault();

    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `bearer ${GITHUB_TOKEN}`,
      },
      body: {
        query: getRepos(username),
      },
    })
      .then((res) => {
        const userRepos = res.formData.user.repositories.edges;

        setUserRepos(
          userRepos.sort((a, b) => b.stargazerCount - a.stargazerCount)
        );
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="App">
      <Grid container columnSpacing={3} rowSpacing={2}>
        <Grid item xs={12}>
          <Typography component="div" variant="h2">
            Github Star Search
          </Typography>
        </Grid>
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
    </div>
  );
}

export default App;

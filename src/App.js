import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { GITHUB_TOKEN } from './constants';
import { getRepos } from './queries';
import SearchField from './components/SearchField';
import TableComponent from './components/TableComponent';

import './App.css';

function App() {
  const API_ENDPOINT = 'https://api.github.com/graphql';

  const [username, setUsername] = useState('');
  const [userRepos, setUserRepos] = useState([]);

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleSearch = (event) => {
    event.preventDefault();

    console.log(getRepos(username));

    fetch(API_ENDPOINT, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: getRepos(username),
      }),
    })
      .then((res) => {
        console.log({ data: res.data });
        const userRepos = res.data.user.repositories.edges;

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

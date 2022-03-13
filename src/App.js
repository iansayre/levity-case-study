import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { getOrgRepos, getUserRepos } from './queries';
import SearchField from './components/SearchField';
import TableComponent from './components/TableComponent';

import './App.css';

function App() {
  const API_ENDPOINT = 'https://api.github.com/graphql';
  // PASTE YOUR OWN PERSONAL ACCESS TOKEN HERE
  const GITHUB_TOKEN = '';

  const [username, setUsername] = useState('');
  const [userRepos, setUserRepos] = useState([]);

  const fetchOrgRepo = () => {
    fetch(API_ENDPOINT, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: getOrgRepos(username),
      }),
    })
      .then((res) => {
        console.log({ data: res.data });
        const userRepos = res.data.user.repositories.edges;

        setUserRepos(
          userRepos.sort((a, b) => b.stargazerCount - a.stargazerCount)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchUserRepo = () => {
    console.log(getUserRepos(username));

    fetch(API_ENDPOINT, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: getUserRepos(username),
      }),
    })
      .then((res) => {
        console.log({ data: res.data });
        const userRepos = res.data.user.repositories.edges;

        setUserRepos(
          userRepos.sort((a, b) => b.stargazerCount - a.stargazerCount)
        );
      })
      .catch((err) => {
        console.error(err);
        // fallback and query for an organization instead of a user
        fetchOrgRepo();
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();

    fetchUserRepo();
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);

  return (
    <div className="App">
      <Grid container columnSpacing={3} rowSpacing={2}>
        <Grid item xs={12}>
          <Typography align="left" component="div" variant="h4">
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

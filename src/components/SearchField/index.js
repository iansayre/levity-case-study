import PropTypes from 'prop-types';
import { Button, Grid, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material';

const SearchField = ({ handleSubmit, handleUsernameChange, username }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            id="username-textfield"
            label="username"
            onChange={handleUsernameChange}
            size="normal"
            value={username}
          />
        </Grid>
        <Grid item xs={4}>
          <Button type="submit" endIcon={<SearchIcon />}>
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

SearchField.props = {
  handleSubmit: PropTypes.func,
  handleUsernameChange: PropTypes.func,
  username: PropTypes.string,
};

export default SearchField;

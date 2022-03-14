import PropTypes from 'prop-types';
import { Button, Grid, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = ({ handleSubmit, handleUsernameChange, username }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            id="username-textfield"
            label="username"
            onChange={handleUsernameChange}
            size="normal"
            value={username}
            variant="standard"
          />
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button endIcon={<SearchIcon />} type="submit" variant="contained">
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

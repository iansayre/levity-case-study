import react from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const TableComponent = ({ repos }) => {
  const tableHeaders = ['Name', 'Description', 'Stars'];

  const printStars = (numberOfStars) => {
    let starString = '';

    for (let i = 0; i < numberOfStars; i++) {
      starString += '⭐️';
    }

    return starString;
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 740 }}>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell align="right" key={header}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {repos.map((repo) => (
            <TableRow key={repo.id}>
              <TableCell>{repo.name}</TableCell>
              <TableCell>{repo.description}</TableCell>
              <TableCell>
                {/* {print individual stars if total is under 6 else print ⭐️xN. if no stars print nothing} */}
                {repo.stargazerCount === 0
                  ? ''
                  : repo.stargazerCount > 0 && repo.stargazerCount <= 5
                  ? printStars(repo.stargazerCount)
                  : `⭐️ x${repo.stargazerCount}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableComponent.props = {
  repos: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    stargazerCount: PropTypes.number,
  }),
};

export default TableComponent;

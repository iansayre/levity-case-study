import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const TableComponent = ({ userRepos }) => {
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
              <TableCell align="left" key={header}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {userRepos.map((repo) => {
            const { description, id, name, stargazerCount } = repo.node;
            return (
              <TableRow key={id}>
                <TableCell align="left">{name}</TableCell>
                <TableCell align="left">{description}</TableCell>
                <TableCell align="left">
                  {/* {print individual stars if total is under 6 else print ⭐️xN. if no stars print nothing} */}
                  {stargazerCount === 0
                    ? ''
                    : stargazerCount > 0 && stargazerCount <= 5
                    ? printStars(stargazerCount)
                    : `⭐️ x${stargazerCount}`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableComponent.props = {
  userRepos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      stargazerCount: PropTypes.number,
    })
  ),
};

export default TableComponent;

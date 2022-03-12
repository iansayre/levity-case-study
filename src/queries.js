export const getRepos = (username, totalPerPage = 10) => `query {
	user(login: "${username}") {
    repositories(first: ${totalPerPage}) {
      edges {
        node {
          id
          name
          description
          stargazerCount
        }
      }
    }
	}
}`;

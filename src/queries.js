export const getRepos = (userName, totalPerPage = 10) => `query () {
	user(login: ${userName}) {
    repositories(first: ${totalPerPage}) {
      edges {
        node {
          name
          description
          stargazerCount
        }
      }
    }
	}
}`;
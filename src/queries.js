export const getUserRepos = (username, totalPerPage = 10) => `query {
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

export const getOrgRepos = (orgName, totalPerPage = 10) => `query {
	organization(login: "${orgName}") {
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

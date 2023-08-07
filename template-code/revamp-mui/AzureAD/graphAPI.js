module.exports = `import {graphConfig} from './azureConfig';

/* Attaches a given access token to a Microsoft Graph API call. Returns information about the user */

export async function callMsGraph(accessToken: string | number) {
  const headers = new Headers();
  const bearer = \`Bearer \${accessToken}\`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers,
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
`;

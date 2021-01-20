let BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

export class ResponseError extends Error {
    response:any;

    constructor(response:any) {
        super(response.statusText);
        this.response = response;
    }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response:any) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response:any) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new ResponseError(response);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function   request(
    url:any,
    options:any,
){
    // const token = localStorage.getItem('token');

    const fetchResponse = await fetch(`${BASE_URL}${url}`, {
        ...options,
        
        headers: {
            'Content-type': 'application/json',
            // Authorization: `Bearer ${token}`,
        },
    });
  
    const response = await checkStatus(fetchResponse);

    return parseJSON(response);
}


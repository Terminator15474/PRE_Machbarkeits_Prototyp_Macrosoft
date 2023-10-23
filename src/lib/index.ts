// place files you want to import through the `$lib` alias in this folder.


/**
 * Function to make fetch easier to deal with
 * 
 * @param url 
 * @param body 
 * @param headers 
 */
export function get(url: string, headers?: HeadersInit): Promise<Response> {
    return fetch(url, {
        method: "GET",
        credentials: "include",
        headers: headers
    });
}


/**
 * Function to make easily make a post request. If the header is undefined, it will automaticall be set
 * to content-type application/json
 * 
 * @param url 
 * @param body 
 * @param headers 
 */
export function post(url: string, body?: Object, headers: HeadersInit = { "Content-Type": "application/json" }): Promise<Response> {
    return fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
        headers: headers
    });
}
function paramsToUrl(params) {
    return Object.keys(params).reduce((result, param) => {
        return result.concat(`${param}=${params[param]}`);
    }, []).join('&');
}

function _fetch(url, init = {}) {
    return fetch(url, init)
        .then((resp) => {
            const json = resp.json();
            if (resp.status >= 200 && resp.status < 300) return json;
            return json.then(err => {throw err;});
        })
    ;
}

function request(url, method, payload = {}, options = {}) {
    if (method.toLowerCase() === 'get') {
        return _fetch(`${url}?${paramsToUrl(payload)}`, options);
    }

    return _fetch(url, {data: payload, ...options});
}

export default {
    get: (url, params, options) => request(url, 'get', params, options),
    post: (url, params, options) => request(url, 'post', params, options)
}
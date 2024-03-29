export const handleJwtResponse = (response) => {
    const tokens = response.data.split(' ');
    localStorage.accessToken = tokens[0];
    localStorage.refreshToken = tokens[1];

    const payload = JSON.parse(atob(tokens[0].split('.')[1]));
    localStorage.setItem('roles', JSON.stringify(payload.auth));
    localStorage.setItem('login', JSON.stringify(payload.sub).replaceAll('"', ''));
    localStorage.clientId = payload.clientId;
}

export const configureRequest = (params) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.accessToken}` },
        params 
    };
    return config;
}

export const configureRequestWithoutParams = () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.accessToken}` }
    };
    return config;
}

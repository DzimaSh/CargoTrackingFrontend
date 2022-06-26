export const handleJwtResponse = (response) => {
    const tokens = response.data.split(' ');
    localStorage.accessToken = tokens[0];
    localStorage.refreshToken = tokens[1];

    const payload = JSON.parse(atob(tokens[0].split('.')[1]));
    localStorage.setItem('roles', JSON.stringify(payload.auth));
    localStorage.clientId = payload.clientId;
}

export const configureRequest = () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.accessToken}` }
    };
    return config;
}

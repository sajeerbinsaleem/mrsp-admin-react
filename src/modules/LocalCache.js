export function setToken (token) {
    
    localStorage.setItem("kl_auth_token", token);
}
export function getToken () {
    
    return localStorage.getItem("kl_auth_token");
}

export function revokeToken () {
    
    localStorage.setItem('kl_auth_token', '');
}

export function setRole (role) {
    
    localStorage.setItem("kl_auth_role", role);
}
export function getRole () {
    
    return localStorage.getItem("kl_auth_role");
}
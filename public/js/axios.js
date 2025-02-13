// Add a request interceptor
const token = Cookies.get('access_token');
let noAuth  = true;
axios.interceptors.request.use(function (config) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // console.log("Response success :", response);
    return response;
}, function (error) {
    // console.log("Response error :", error);
    if (error.response.status === 401 && noAuth) {
        noAuth = false;
        alert('Unauthorized');
        Cookies.remove('isLogin');
        Cookies.remove('access_token');
        window.location.href = '/';
    }
    return Promise.reject(error);
});
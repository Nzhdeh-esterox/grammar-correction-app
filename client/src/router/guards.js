export const authGuard = (to, from, next) => {
    const token = localStorage.getItem('token');

    if (token) {
        // User is authenticated
        next();
    } else {
        // User is not authenticated, redirect to login
        next({ name: 'login' });
    }
};

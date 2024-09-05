export const validateEmail = (email) => {
    if (email.includes('@gmail.com')) {
        return true;
    }
    return false;
}

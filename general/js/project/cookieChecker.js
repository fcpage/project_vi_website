export function checkCookie(cookieName) {
    const cookie = cookieStore.get(cookieName);
    if (typeof cookie.value !== 'undefined') {
        return cookie.value;
    } else {
        return false;
    }
}


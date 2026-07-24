export function getCookies() {
    return document.cookie.split(';');
}
export function getCookie(cookieName) {
    return document.cookie
        .split('; ')
        .find(row => row
        .startsWith(`${cookieName}`))
        ?.split('=')[1];
}

export function setCookie(cookieName, value) {
    document.cookie = `${cookieName}=${value}; max-age=86400; path=/; SameSite=Lax; Secure`;
    return value;
}

export function eatCookie(cookieName) {
    document.cookie = `${cookieName}=; max-age=0; path=/; SameSite=Lax; Secure`;
}

export function eatCookies() {
    const cookies = getCookies();
    for (const cookie of cookies) {
        const crumb = cookie.split('=')[0];
        eatCookie(crumb);
    }
}

// fixme: Hack to get around TS/Moment incompat issues
let moment = require("moment");
if ("default" in moment) {
    moment = moment["default"];
}

export class AuthService {
    public error: string;


    constructor() {
        this.error = ""
    }

    login(jwtToken: string) {
        this.setSession(jwtToken);
    }

    // So JWT can handle UTF-8: https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
    private b64DecodeUnicode(str: string) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    private parseJwt(token: string) {
        try {
            // Get Token Header
            const base64HeaderUrl = token.split('.')[0];
            const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
            const headerData = JSON.parse(this.b64DecodeUnicode(base64Header));

            // Get Token payload and date's
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const dataJWT = JSON.parse(this.b64DecodeUnicode(base64));
            dataJWT.header = headerData;

            // TODO: add expiration at check ...

            return dataJWT;
        } catch (err) {
            return false;
        }
    }

    private setSession(jwtToken: string) {
        const jwtDecoded = this.parseJwt(jwtToken);
        if (jwtDecoded) {
            console.log(jwtDecoded);
        }

        // const expiresAt = moment().add(jwtToken.expiresIn, 'second');
        localStorage.setItem('id_token', jwtToken);
        localStorage.setItem('expires_at', JSON.stringify(new Date(jwtDecoded.exp * 1000)));
        localStorage.setItem('issued_on', JSON.stringify(new Date(jwtDecoded.iat * 1000)));
        localStorage.setItem('subject', JSON.stringify(jwtDecoded.sub));
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('issued_on');
        localStorage.removeItem('subject');
    }

    public isLoggedIn() {
        // todo: Could check not before as well
        if (typeof moment() === 'undefined') {
            return false
        }
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getUser() {
        return localStorage.getItem('subject')
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    getExpiration() {
        // todo: Rethink if default setting expired to now if no key is a good idea
        const expiration = localStorage.getItem('expires_at') || JSON.stringify(new Date());
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}

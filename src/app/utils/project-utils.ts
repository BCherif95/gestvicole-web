import {Injectable} from '@angular/core';
import {AuthBody} from './auth-body';
import {User} from '../data/models/user.model';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProjectUtils {
    now = new Date();

    constructor() {
    }

    startDate() {
        return {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() - 7};
    }

    endDate() {
        return {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
    }

    formatDate(date) {
        // let d = new Date(Date.parse(date));
        return (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + ((date.getMonth() + 1) < 10 ? '0' + ((date.getMonth() + 1)) : ((date.getMonth() + 1))) + '/' + date.getFullYear();
    }

    formatStringtoDate(date) {
        const d = new Date(Date.parse(date));

        return d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' + ((d.getMonth() + 1)) : ((d.getMonth() + 1))) + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
    }

    formatDateYMD(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    formatDateTo(date) {
        return (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + ((date.getMonth() + 1) < 10 ? '0' + ((date.getMonth() + 1)) : ((date.getMonth() + 1))) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }

    formatDateToString(date) {
        return date.year + '-' + (parseInt(date.month, null) < 10 ? '0' + parseInt(date.month, null) : parseInt(date.month, null)) + '-' + (parseInt(date.day, null) < 10 ? '0' + parseInt(date.day, null) : parseInt(date.day, null));
    }

    addDays(date, numberOfDay) {
        return new Date(date.getTime() + numberOfDay * 24 * 60 * 60 * 1000);
    }

    subDays(date, numberOfDay) {
        return new Date(date.getTime() - numberOfDay * 24 * 60 * 60 * 1000);
    }

    titleCaseWord(word: string): string {
        if (!word) {
            return word;
        }
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

    httpHeaders() {
        const token: string = this.getToken();
        let headers = new HttpHeaders();

        // headers = headers.set('Access-Control-Allow-Origin', '*');
        // headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');
        if (token) { // token is present
            headers = headers.set('Authorization', 'Bearer ' + token);
        }
        const httpOptions = {
            headers: headers
        };
        return httpOptions;
    }

    getToken(): string {
        let authBody: AuthBody = this.getAuthBody();
        if (authBody) {
            return authBody.token;
        } else {
            return null;
        }
    }

    getAppUser(): User {
        let authBody: AuthBody = this.getAuthBody();
        if (authBody) {
            return authBody.user;
        } else {
            return null;
        }
    }

    getAuthBody(): AuthBody {
        if (!localStorage.getItem('app-token')) {
            return null;
        } else {
            return JSON.parse(atob(localStorage.getItem('app-token')));
        }
    }

    public objectComparison = function (option, value): boolean {
        return option.id === value.id;
    };
    getRoleNames(): string[] {
        let names = [];
        let user: User = this.getAppUser();
        if (user) {
            user.roles.forEach(role => {
                names.push(role.name);
            });
        }
        return names;
    }

    getPrivilegeNames(): string[] {
        let names = [];
        let user: User = this.getAppUser();
        if (user) {
            user.roles.forEach(role => {
                role.privileges.forEach(privilege => {
                    names.push(privilege.name);
                });
            });
        }
        return names;
    }

}
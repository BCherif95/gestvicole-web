import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProjectUtils} from '../utils/project-utils';

@Injectable({
    providedIn: 'root'
})
export class PrivilegeService {

    readonly serviceURL: string;
    readonly httpOptions: any;

    constructor(private http: HttpClient) {
        this.serviceURL = environment.serviceUrl + '/privileges';
        this.httpOptions = new ProjectUtils().httpHeaders();
    }

    findAll(): Observable<any> {
        return this.http.get(this.serviceURL+'/all', this.httpOptions)
    }



}

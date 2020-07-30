import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProjectUtils} from '../utils/project-utils';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LayerTypeService {
    readonly serviceURL: string;
    readonly httpOptions: any;

    constructor(private http: HttpClient) {
        let projectUtils = new ProjectUtils();
        this.serviceURL = environment.serviceUrl + '/layer_types';
        this.httpOptions = projectUtils.httpHeaders();
    }

    public findAllByBuildingId(buildingId: number): Observable<any> {
        return this.http.get(this.serviceURL+'/' + buildingId, this.httpOptions)
    }
    
}
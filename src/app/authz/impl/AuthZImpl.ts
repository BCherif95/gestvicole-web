import {AuthZ} from '../authz';
import {Injectable} from '@angular/core';
import {RoleDatasource} from './RoleDatasource';

@Injectable({
    providedIn: 'root'
})
export class AuthZImpl extends AuthZ<RoleDatasource> {
    constructor(_datasource: RoleDatasource) {
        super(_datasource);
    }
}

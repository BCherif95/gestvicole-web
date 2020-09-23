import {AbstractRoleDatasource} from '../data';
import {Injectable} from '@angular/core';
import {Role} from '../role';
import {Observable} from 'rxjs';
import {UserService} from '../../views/admin/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class RoleDatasource extends AbstractRoleDatasource {
    protected constructor(private userService: UserService) {
        super();
    }

    get(id: string, names?: string[]): Observable<Role[]> {
        return this.userService.findAuthzRoles(+id);
    }

    getUnique(name: string, id: string): Observable<Role> {
        return super.getUnique(name, id);
    }
}

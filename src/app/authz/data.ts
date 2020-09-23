import {Role} from './role';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export interface Datasource {
    get(id: string, names?: string[]): Observable<Role[]>;

    getUnique(name: string, id: string): Observable<Role>;

    roles(id: string, names?: string[]): Promise<{ role: Role, roles: Role[] }>;
}

/**
 * Contains a default way to use datasource
 */
export abstract class AbstractRoleDatasource implements Datasource {
    roles$: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>(null);
    role$: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
    private unsubscribe = new Observable();

    protected constructor() {
    }

    load(id: string, names?: string[]): Promise<Role[]> {
        return new Promise<Role[]>((resolve, reject) => {
            this.get(id, names)
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(roles => {
                    const old = this.roles$.getValue() || [];
                    const parts = roles.filter(role => !old.find(_old => _old.name === role.name));
                    const _new = [...old, ...parts];
                    if (roles && roles.length === 1) {
                        const r = roles[0];
                        this.role$.next(names && names.includes(r.name) ? r : null);
                    }
                    this.roles$.next(_new);
                    resolve(roles);
                }, reject);
        });
    }

    get(id: string, names?: string[]): Observable<Role[]> {
        return of(null);
    }

    getUnique(name: string, id: string): Observable<Role> {
        return of(null);
    }

    async roles(id: string, names?: string[]): Promise<{ role: Role, roles: Role[] }> {
        const value = this.roles$.getValue();
        if (!value || !this.hasAll(value, names)) {
            await this.load(id, names);
        }
        return {roles: this.roles$.getValue(), role: this.role$.getValue()};
    }

    hasAll(roles: Role[], names: string[]): boolean {
        return roles.filter(role => names.includes(role.name)).length === names.length;
    }
}

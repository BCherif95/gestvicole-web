import {Datasource} from './data';
import {findMatches, Rules} from './rule';
import {Role} from './role';
import {Utils} from './utils';

export interface IAuthZ {
    authorize(url: string, authId: string, roleDefinitions: Rules): Promise<boolean>;
}

/**
 * IAuthZ default implementation
 */
export class AuthZ<T extends Datasource> implements IAuthZ {
    constructor(protected _dataSource: T) {
    }

    async authorize(url: string, authId: string, roleDefinitions: Rules): Promise<boolean> {
        if (!authId) {
            return false;
        }
        const matchResult = findMatches(url, roleDefinitions);
        if (!matchResult) {
            return false;
        }
        const params = matchResult.matches.groups;
        const func = matchResult.rule.func;
        const callResult = func && func.call(params);
        if (func && !callResult) {
            return false;
        }
        const rolePattern = matchResult.rule.rolePattern;
        if (!rolePattern) {
            return false;
        }
        const parts = rolePattern.split(':');
        const scope = parts.length > 1 ? parts[1] : null;
        if (!scope) {
            return false;
        }
        const roleUniqueName = parts[0];
        if (!roleUniqueName) {
            return false;
        }
        const w = await this._dataSource.roles(authId, [roleUniqueName]);
        if (!w) {
            return false;
        }
        if (w.role && w.role.authorizations[scope]) {
            return true;
        }
        if (!w.roles || w.roles.length === 0) {
            return false;
        }
        const predicate = (role: Role) => role.name && role.name === roleUniqueName && role.authorizations[scope];
        return Utils.anyMatch(w.roles, predicate);
    }

    get dataSource(): T {
        return this._dataSource;
    }
}

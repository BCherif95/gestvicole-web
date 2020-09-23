import {Role} from './role';

export class Utils {
    private constructor() {
    }

    static regex(value: string): RegExp {
        return new RegExp(value);
    }

    static anyMatch(roles: any, predicate: (role: Role) => boolean): boolean {
        return !!roles.find(predicate);
    }
}

export function regex(value: string): RegExp {
    return Utils.regex(value);
}

export function buildRegex(rule: any): RegExp {
    const requirements: { [key: string]: string } = rule.requirements;
    const pattern = Object.keys(requirements)
        .reduce((a, key) => a.replace(`:${key}`, `(?<${key}>${requirements[key]})`), rule.urlPattern);
    return regex(`^${pattern}$`);
}

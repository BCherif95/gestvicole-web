import {buildRegex} from './utils';

export class Rule {
    rolePattern?: string;
    urlPattern: string;
    func?: RuleCallback;
    requirements?: {
        [key: string]: string
    };
}

export interface RuleCallback<T = any> {
    call(params: { [key: string]: string }): T;
}

export declare type Rules = Rule[];

export function findMatches(url: string, rules: Rules): { matches: any, rule: Rule } {
    if (url.startsWith('/')) {
        url = url.substr(1);
    }
    const array = rules.filter(r => r && buildRegex(r).test(url));
    if (array && array.length > 1) {
        throw new Error('Ambiguous match, several results are returned by the match function');
    }
    if (!array || array.length === 0) {
        return null;
    }
    const rule = array[0];
    const matches = url.match(buildRegex(rule));
    return {matches: matches, rule: rule};
}

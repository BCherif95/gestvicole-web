import {Rules} from './rule';

export const definitions: Rules = [
    {
        rolePattern: 'dashboard:display',
        urlPattern: 'tr/dashboard',
        requirements: {},
    },
    {
        rolePattern: 'user:list',
        urlPattern: 'tr/admin/users',
        requirements: {},
    },
    {
        rolePattern: 'user:create',
        urlPattern: 'tr/admin/users/new',
        requirements: {}
    },
    {
        rolePattern: 'user:update',
        urlPattern: 'tr/admin/users/:id/:name',
        requirements: {
            id: '[0-9]{1,}',
            name: '.{1,}'
        },
    },
    {
        rolePattern: 'role:list',
        urlPattern: 'tr/admin/roles',
        requirements: {},
    },
    {
        rolePattern: 'role:create',
        urlPattern: 'tr/admin/roles/new',
        requirements: {}
    },
    {
        rolePattern: 'role:update',
        urlPattern: 'tr/admin/roles/by-name/:name',
        requirements: {
            name: '.{1,}'
        }
    },
    {
        rolePattern: 'customer:list',
        urlPattern: 'tr/sales/customers',
        requirements: {},
    },
    {
        rolePattern: 'invoice:list',
        urlPattern: 'tr/sales/invoices',
        requirements: {},
    },
    {
        rolePattern: 'order:list',
        urlPattern: 'tr/sales/orders',
        requirements: {},
    },
    {
        rolePattern: 'payment:list',
        urlPattern: 'tr/sales/payments',
        requirements: {},
    },
    {
        rolePattern: 'charge:list',
        urlPattern: 'tr/sales/charges',
        requirements: {},
    },
    {
        rolePattern: 'charge:detail',
        urlPattern: 'tr/sales/charges/infos/:id',
        requirements: {
            id: '[0-9]{1,}'
        }
    },
    {
        rolePattern: 'payment:print',
        urlPattern: 'tr/sales/print/payment/:id',
        requirements: {
            id: '[0-9]{1,}'
        }
    },
    {
        rolePattern: 'category:list',
        urlPattern: 'tr/stock-management/categories',
        requirements: {},
    },
    {
        rolePattern: 'product:list',
        urlPattern: 'tr/stock-management/products',
        requirements: {},
    },
    {
        rolePattern: 'stock:list',
        urlPattern: 'tr/stock-management/stocks',
        requirements: {},
    },
    {
        rolePattern: 'stock_entry:list',
        urlPattern: 'tr/stock-management/stock-entries',
        requirements: {},
    },
    {
        rolePattern: 'stock_out:list',
        urlPattern: 'tr/stock-management/stock-outs',
        requirements: {},
    },
    {
        rolePattern: 'building:list',
        urlPattern: 'tr/production/buildings',
        requirements: {},
    },
    {
        rolePattern: 'building:create',
        urlPattern: 'tr/production/buildings/new',
        requirements: {},
    },
    {
        rolePattern: 'building:update',
        urlPattern: 'tr/production/buildings/:id/:name',
        requirements: {
            id: '[0-9]{1,}',
            name: '.{1,}'
        }
    },
    {
        rolePattern: 'production:list',
        urlPattern: 'tr/production/productions',
        requirements: {},
    },
    {
        rolePattern: 'production:create',
        urlPattern: 'tr/production/productions/new',
        requirements: {},
    },
    {
        rolePattern: 'production:update',
        urlPattern: 'tr/production/productions/:id/:name',
        requirements: {
            id: '[0-9]{1,}',
            name: '.{1,}'
        },
    }
];

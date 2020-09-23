import {FuseNavigation} from '@fuse/types';
import {NavItemUtils} from '../utils/nav-item-utils';

// export const navigation: FuseNavigation[] = [
//
//     {
//         id: 'applications',
//         title: 'Applications',
//         translate: 'NAV.APPLICATIONS',
//         type: 'group',
//         icon: 'apps',
//         children: [
//             {
//                 id: 'main-dashboard',
//                 title: 'Tableau de bord',
//                 type: 'item',
//                 icon: 'dashboard',
//                 url: '/tr/dashboards/main'
//             },
//             {
//                 id: 'buidings',
//                 title: 'Bâtiments',
//                 type: 'item',
//                 icon: 'home',
//                 url: '/tr/production/buildings'
//             },
//             {
//                 id: 'productions',
//                 title: 'Productions',
//                 type: 'item',
//                 icon: 'shopping_basket',
//                 url: '/tr/production/productions'
//             },
//             {
//                 id: 'admin',
//                 title: 'Admin',
//                 type: 'collapsable',
//                 icon: 'person',
//                 children: [
//                     {
//                         id: 'users',
//                         title: 'Utilisateurs',
//                         type: 'item',
//                         icon: 'person',
//                         url: '/tr/admin/users'
//                     },
//                     {
//                         id: 'roles',
//                         title: 'Roles',
//                         type: 'item',
//                         icon: 'people',
//                         url: '/tr/admin/roles'
//                     }
//                 ]
//             },
//
//         ]
//     }
// ];

export const navigation: FuseNavigation[] = [

    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'main-dashboard',
                title: 'Tableau de bord',
                type: 'item',
                icon: 'dashboard',
                role: 'dashboard',
                url: '/tr/dashboard',
                children: []
            },
            {
                id: 'buidings',
                title: 'Bâtiments',
                type: 'item',
                icon: 'home',
                role: 'building',
                url: '/tr/production/buildings',
                children: []
            },
            {
                id: 'productions',
                title: 'Productions',
                type: 'item',
                icon: 'shopping_basket',
                role: 'production',
                url: '/tr/production/productions',
                children: []
            },
            {
                id: 'sales',
                title: 'Ventes',
                type: 'collapsable',
                icon: 'add_shopping_cart',
                children: [
                    {
                        id: 'customers',
                        title: 'Clients',
                        type: 'item',
                        icon: 'person',
                        role: 'customer',
                        url: '/tr/sales/customers',
                        children: []
                    },
                    {
                        id: 'orders',
                        title: 'Commandes',
                        type: 'item',
                        icon: 'shopping_basket',
                        url: '/tr/sales/orders',
                        role: 'order',
                        children: []
                    },
                    {
                        id: 'invoices',
                        title: 'Factures',
                        type: 'item',
                        icon: 'receipt',
                        role: 'invoice',
                        url: '/tr/sales/invoices',
                        children: []
                    },
                    {
                        id: 'payments',
                        title: 'Paiements',
                        type: 'item',
                        icon: 'payment',
                        role: 'payment',
                        url: '/tr/sales/payments',
                        children: []
                    }
                ]
            },
            {
                id: 'charges',
                title: 'Charges et Revenus ',
                type: 'item',
                icon: 'add_shopping_cart',
                role: 'charge',
                url: '/tr/sales/charges',
                children: []
            },
            {
                id: 'stock',
                title: 'Gestion de stock',
                type: 'collapsable',
                icon: 'shopping_basket',
                children: [
                    {
                        id: 'stocks',
                        title: 'Stocks',
                        type: 'item',
                        icon: 'shopping_basket',
                        role: 'stock',
                        url: '/tr/stock-management/stocks',
                        children: []
                    },
                    {
                        id: 'stock-entries',
                        title: 'Entrées',
                        type: 'item',
                        icon: 'shopping_basket',
                        role: 'stock-entry',
                        url: '/tr/stock-management/stock-entries',
                        children: []
                    },
                    {
                        id: 'stock-outs',
                        title: 'Sorties',
                        type: 'item',
                        icon: 'shopping_basket',
                        role: 'stock-out',
                        url: '/tr/stock-management/stock-outs',
                        children: []
                    },
                    {
                        id: 'products',
                        title: 'Produits',
                        type: 'item',
                        icon: 'shopping_basket',
                        role: 'product',
                        url: '/tr/stock-management/products',
                        children: []
                    },
                    {
                        id: 'categories',
                        title: 'Catégories',
                        type: 'item',
                        icon: 'shopping_basket',
                        role: 'category',
                        url: '/tr/stock-management/categories',
                        children: []
                    }
                ]
            },
            {
                id: 'admin',
                title: 'Admin',
                type: 'collapsable',
                icon: 'person',
                children: [
                    {
                        id: 'users',
                        title: 'Utilisateurs',
                        type: 'item',
                        icon: 'person',
                        role: 'user',
                        url: '/tr/admin/users',
                        children: []
                    },
                    {
                        id: 'roles',
                        title: 'Roles',
                        type: 'item',
                        icon: 'people',
                        role: 'role',
                        url: '/tr/admin/roles',
                        children: []
                    }
                ]
            }

        ]
    }
];

// export const techNavigation: FuseNavigation[] = [
//
//     {
//         id: 'applications',
//         title: 'Applications',
//         translate: 'NAV.APPLICATIONS',
//         type: 'group',
//         icon: 'apps',
//         children: [
//             {
//                 id: 'productions',
//                 title: 'Productions',
//                 type: 'item',
//                 icon: 'shopping_basket',
//                 url: '/tr/production/productions'
//             },
//
//         ]
//     }
// ];

// export const navigation: FuseNavigation[] = new NavItemUtils().getNavigations();
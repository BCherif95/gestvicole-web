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
//                 url: '/views/dashboards/main'
//             },
//             {
//                 id: 'buidings',
//                 title: 'Bâtiments',
//                 type: 'item',
//                 icon: 'home',
//                 url: '/views/view-production/buildings'
//             },
//             {
//                 id: 'productions',
//                 title: 'Productions',
//                 type: 'item',
//                 icon: 'shopping_basket',
//                 url: '/views/view-production/productions'
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
//                         url: '/views/admin/users'
//                     },
//                     {
//                         id: 'roles',
//                         title: 'Roles',
//                         type: 'item',
//                         icon: 'people',
//                         url: '/views/admin/roles'
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
                url: '/views/dashboards/main',
                children: []
            },
            {
                id: 'buidings',
                title: 'Bâtiments',
                type: 'item',
                icon: 'home',
                url: '/views/view-production/buildings',
                children: []
            },
            {
                id: 'productions',
                title: 'Productions',
                type: 'item',
                icon: 'shopping_basket',
                url: '/views/view-production/productions',
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
                        url: '/views/sales/customers',
                        children: []
                    },
                    {
                        id: 'orders',
                        title: 'Commandes',
                        type: 'item',
                        icon: 'shopping_basket',
                        url: '/views/sales/orders',
                        children: []
                    },
                    {
                        id: 'invoices',
                        title: 'Factures',
                        type: 'item',
                        icon: 'receipt',
                        url: '/views/sales/invoices',
                        children: []
                    },
                    {
                        id: 'payments',
                        title: 'Paiements',
                        type: 'item',
                        icon: 'payment',
                        url: '/views/sales/payments',
                        children: []
                    }
                ]
            },
            {
                id: 'charges',
                title: 'Charges et Revenus ',
                type: 'item',
                icon: 'add_shopping_cart',
                url: '/views/sales/charges',
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
                        url: '/views/stock-management/stocks',
                        children: []
                    },
                    {
                        id: 'stock-entries',
                        title: 'Entrées',
                        type: 'item',
                        icon: 'shopping_basket',
                        url: '/views/stock-management/stock-entries',
                        children: []
                    },
                    {
                        id: 'stock-outs',
                        title: 'Sorties',
                        type: 'item',
                        icon: 'shopping_basket',
                        url: '/views/stock-management/stock-outs',
                        children: []
                    },
                    {
                        id: 'products',
                        title: 'Produits',
                        type: 'item',
                        icon: 'shopping_basket',
                        url: '/views/stock-management/products',
                        children: []
                    },
                    {
                        id: 'categories',
                        title: 'Catégories',
                        type: 'item',
                        icon: 'shopping_basket',
                        url: '/views/stock-management/categories',
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
                        url: '/views/admin/users',
                        children: []
                    },
                    {
                        id: 'roles',
                        title: 'Roles',
                        type: 'item',
                        icon: 'people',
                        url: '/views/admin/roles',
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
//                 url: '/views/view-production/productions'
//             },
//
//         ]
//     }
// ];

// export const navigation: FuseNavigation[] = new NavItemUtils().getNavigations();
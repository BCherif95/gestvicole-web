import {FuseNavigation, FuseNavigationItem} from '../../@fuse/types';
import {RoleUtils} from './role-utils';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavItemUtils {
    roleUtils: RoleUtils;
    navigation: FuseNavigation[];
    shortcutItems: any[];

    constructor() {
        this.navigation = [];
        this.shortcutItems = [];
    }

    getNavigations(): FuseNavigation[] {

        this.navigation = [];

        this.roleUtils = new RoleUtils();

        let baseMenuChildren: FuseNavigationItem[] = [];

        // ================ DASH ================================== //
        let dashMenuItem: FuseNavigation = {
            id: 'main-dashboard',
            title: 'Tableau de bord',
            type: 'item',
            icon: 'dashboard',
            url: '/views/dashboards/main'
        };
        if (this.roleUtils.canSeeDashMenu()) {
            baseMenuChildren.push(dashMenuItem);
        }
        // ========================================================== //

        // ================ BUILDING ================================== //
        let buildingMenuItem: FuseNavigation = {
            id: 'buidings',
            title: 'Bâtiments',
            type: 'item',
            icon: 'home',
            url: '/views/view-production/buildings'
        };
        if (this.roleUtils.canSeeBuildingMenu()) {
            baseMenuChildren.push(buildingMenuItem);
        }

        // ================ PRODUCTION ================================== //
        let productionMenuItem: FuseNavigation = {
            id: 'productions',
            title: 'Productions',
            type: 'item',
            icon: 'shopping_basket',
            url: '/views/view-production/productions'
        };
        if (this.roleUtils.canSeeProductionMenu()) {
            baseMenuChildren.push(productionMenuItem);
        }

        // ================ CHARGE ================================== //
        let chargeMenuItem: FuseNavigation = {
            id: 'charges',
            title: 'Charges et Revenus ',
            type: 'item',
            icon: 'add_shopping_cart',
            url: '/views/sales/charges',
        }
        if (this.roleUtils.canSeeChargeMenu()) {
            baseMenuChildren.push(chargeMenuItem);
        }

        // ================ SALES ================================== //
        let salesMenuChildren:FuseNavigationItem[] = [];

        // ========= CUSTOMER ========= //
        let customerMenuItem: FuseNavigation = {
            id: 'customers',
            title: 'Clients',
            icon: 'people',
            type: 'item',
            url: '/views/sales/customers'
        };
        if (this.roleUtils.canSeeCustomerMenu()) {
            salesMenuChildren.push(customerMenuItem);
        }

        // ========= ORDER ========= //
        let orderMenuItem: FuseNavigation = {
            id: 'orders',
            title: 'Commandes',
            type: 'item',
            icon: 'shopping_basket',
            url: '/views/sales/orders',
        };
        if (this.roleUtils.canSeeOrderMenu()) {
            salesMenuChildren.push(orderMenuItem);
        }

        // ========= INVOICE ========= //
        let invoiceMenuItem: FuseNavigation = {
            id: 'invoices',
            title: 'Factures',
            type: 'item',
            icon: 'receipt',
            url: '/views/sales/invoices'
        };
        if (this.roleUtils.canSeeInvoiceMenu()) {
            salesMenuChildren.push(invoiceMenuItem);
        }

        // ========= PAYMENT ========= //
        let paymentMenuItem: FuseNavigation = {
            id: 'payments',
            title: 'Paiements',
            type: 'item',
            icon: 'payment',
            url: '/views/sales/payments',
        };
        if (this.roleUtils.canSeePaymentMenu()) {
            salesMenuChildren.push(paymentMenuItem);
        }

        // ========= SALES ========= //
        let salesMenuItem: FuseNavigation = {
            id: 'sales',
            title: 'Ventes',
            type: 'collapsable',
            icon: 'add_shopping_cart',
            children: salesMenuChildren
        };
        if (this.roleUtils.canSeeSalesMenu() || this.roleUtils.canSeeOrderMenu() ||
        this.roleUtils.canSeeCustomerMenu() || this.roleUtils.canSeeInvoiceMenu() || this.roleUtils.canSeePaymentMenu()) {
            baseMenuChildren.push(salesMenuItem);
        }

        // ========= STOCK ========= //
        let stockMenuChildren: FuseNavigationItem[] = [];

        // ========= STOCK ========= //
        let stockMenuItem: FuseNavigation = {
            id: 'stocks',
            title: 'Stocks',
            type: 'item',
            icon: 'shopping_basket',
            url: '/views/stock-management/stocks'
        };
        if (this.roleUtils.canSeeStockMenu()) {
            stockMenuChildren.push(stockMenuItem);
        }

        // ========= STOCK_ENTRY ========= //
        let stockEntryMenuItem: FuseNavigation = {
            id: 'stock-entries',
            title: 'Entrées',
            type: 'item',
            icon: 'shopping_basket',
            url: '/views/stock-management/stock-entries'
        };
        if (this.roleUtils.canSeeStockEntryMenu()) {
            stockMenuChildren.push(stockEntryMenuItem);
        }

        // ========= STOCK_OUT ========= //
        let stockOutMenuItem: FuseNavigation = {
            id: 'stock-outs',
            title: 'Sorties',
            type: 'item',
            icon: 'shopping_basket',
            url: '/views/stock-management/stock-outs'
        };
        if (this.roleUtils.canSeeStockOutMenu()) {
            stockMenuChildren.push(stockOutMenuItem);
        }

        // ========= PRODUCT ========= //
        let productMenuItem: FuseNavigation = {
            id: 'products',
            title: 'Produits',
            type: 'item',
            icon: 'shopping_basket',
            url: '/views/stock-management/products',
        };
        if (this.roleUtils.canSeeProductMenu()) {
            stockMenuChildren.push(productMenuItem);
        }

        // ========= CATEGORY ========= //
        let categoryMenuItem: FuseNavigation = {
            id: 'categories',
            title: 'Catégories',
            type: 'item',
            icon: 'shopping_basket',
            url: '/views/stock-management/categories',
        };
        if (this.roleUtils.canSeeCategoryMenu()) {
            stockMenuChildren.push(categoryMenuItem);
        }

        // ========= CATEGORY ========= //
        let menuStockItem: FuseNavigation = {
            id: 'stock',
            title: 'Gestion de stock',
            type: 'collapsable',
            icon: 'shopping_basket',
            children: stockMenuChildren
        };
        if (this.roleUtils.canSeeStockMenu() || this.roleUtils.canSeeStockEntryMenu() || this.roleUtils.canSeeStockOutMenu()
        || this.roleUtils.canSeeProductMenu() || this.roleUtils.canSeeCategoryMenu()) {
            baseMenuChildren.push(menuStockItem);
        }

        // ================ ADMIN =================================== //
        let adminMenuChildren: FuseNavigationItem[] = [];

        // ========= USER ========= //
        let userMenuItem: FuseNavigation = {
            id: 'user',
            title: 'Utilisateurs',
            type: 'item',
            icon: 'people',
            url: '/views/admin/users'
        };
        if (this.roleUtils.canSeeUserMenu()) {
            adminMenuChildren.push(userMenuItem);
        }

        // ========= ROLE ========= //
        let roleMenuItem: FuseNavigation = {
            id: 'role',
            title: 'Roles',
            icon: 'settings',
            type: 'item',
            url: '/views/admin/roles'
        };
        if (this.roleUtils.canSeeRoleMenu()) {
            adminMenuChildren.push(roleMenuItem);
        }

        // ========= ADMIN ========= //
        let adminMenuItem: FuseNavigation = {
            id: 'admin',
            title: 'Admin',
            type: 'collapsable',
            icon: 'settings',
            children: adminMenuChildren
        };
        if (this.roleUtils.canSeeProjectMenu()) {
            baseMenuChildren.push(adminMenuItem);
        }

        // ================ MAIN MENU =================================== //
        let baseMenuItem: FuseNavigation = {
            id: 'menu',
            title: 'Menu',
            type: 'group',
            icon: 'menu',
            children: baseMenuChildren
        };

        this.navigation.push(baseMenuItem);

        return this.navigation;

    }


}
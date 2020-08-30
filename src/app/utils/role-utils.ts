import {Injectable} from '@angular/core';
import {ProjectUtils} from './project-utils';

@Injectable()
export class RoleUtils {

    projectUtils: ProjectUtils;
    names: string[];

    constructor() {
        this.projectUtils = new ProjectUtils();
        this.names = this.projectUtils.getPrivilegeNames();
    }

    // ==================== CONVERT ========================== //
    canConvertOrder(): boolean {
        return this.names.includes('CONVERT_ORDER');
    }

    // ==================== CREATE ========================== //
    canCreateCustomer(): boolean {
        return this.names.includes('CREATE_CUSTOMER');
    }

    canCreateProduction(): boolean {
        return this.names.includes('CREATE_PRODUCTION');
    }

    canCreateInvoice(): boolean {
        return this.names.includes('CREATE_INVOICE');
    }

    canCreateProduct(): boolean {
        return this.names.includes('CREATE_PRODUCT');
    }

    canCreateBuilding(): boolean {
        return this.names.includes('CREATE_BUILDING');
    }

    canCreateUser(): boolean {
        return this.names.includes('CREATE_USER');
    }

    // ==================== CANCEL ========================== //
    canCancelInvoice(): boolean {
        return this.names.includes('CANCEL_INVOICE');
    }

    canCancelInvoicePayment(): boolean {
        return this.names.includes('CANCEL_INVOICE_PAYMENT');
    }

    // ==================== PAID ========================== //

    canPayInvoice(): boolean {
        return this.names.includes('PAY_INVOICE');
    }

    // ==================== PRINT ========================== //

    canPrintInvoice(): boolean {
        return this.names.includes('PRINT_INVOICE');
    }

    // ==================== VALIDATE ========================== //

    canValidateInvoice(): boolean {
        return this.names.includes('VALIDATE_INVOICE');
    }

    canValidateInvoicePayment(): boolean {
        return this.names.includes('VALIDATE_INVOICE_PAYMENT');
    }

    // ==================== SEE ========================== //

    canSeeAdminMenu(): boolean {
        return this.names.includes('SEE_ADMIN_MENU');
    }

    canSeeInvoiceMenu(): boolean {
        return this.names.includes('SEE_INVOICE_MENU');
    }

    canSeeBuildingMenu(): boolean {
        return this.names.includes('SEE_BUILDING_MENU');
    }

    canSeeSalesMenu(): boolean {
        return this.names.includes('SEE_SALES_MENU');
    }

    canSeeProductionMenu(): boolean {
        return this.names.includes('SEE_PRODUCTION_MENU');
    }

    canSeePaymentMenu(): boolean {
        return this.names.includes('SEE_PAYMENT_MENU');
    }

    canSeeOrderMenu(): boolean {
        return this.names.includes('SEE_ORDER_MENU');
    }

    canSeeCustomerMenu(): boolean {
        return this.names.includes('SEE_CUSTOMER_MENU');
    }

    canSeeChargeMenu(): boolean {
        return this.names.includes('SEE_CHARGE_MENU');
    }

    canSeeStockMenu(): boolean {
        return this.names.includes('SEE_STOCK_MENU');
    }

    canSeeStockEntryMenu(): boolean {
        return this.names.includes('SEE_STOCK_ENTRY_MENU');
    }

    canSeeStockOutMenu(): boolean {
        return this.names.includes('SEE_STOCK_OUT_MENU');
    }

    canSeeRoleMenu(): boolean {
        return this.names.includes('SEE_ROLE_MENU');
    }

    canSeeProductMenu(): boolean {
        return this.names.includes('SEE_PRODUCT_MENU');
    }

    canSeeCategoryMenu(): boolean {
        return this.names.includes('SEE_CATEGORY_MENU');
    }

    canSeeUserMenu(): boolean {
        return this.names.includes('SEE_USER_MENU');
    }

    canSeeProjectMenu(): boolean {
        return this.names.includes('SEE_PROJECT_MENU');
    }

    canSeeDashMenu(): boolean {
        return this.names.includes('SEE_DASH_MENU');
    }

    // ==================== UPDATE ========================== //

    canUpdateCustomer(): boolean {
        return this.names.includes('UPDATE_CUSTOMER');
    }

    canUpdateBuilding(): boolean {
        return this.names.includes('UPDATE_BUILDING');
    }

    canUpdateProduction(): boolean {
        return this.names.includes('UPDATE_PRODUCTION');
    }

    canUpdateInvoice(): boolean {
        return this.names.includes('UPDATE_INVOICE');
    }

    canUpdateRole(): boolean {
        return this.names.includes('UPDATE_ROLE');
    }

    canUpdateUser(): boolean {
        return this.names.includes('UPDATE_USER');
    }

    // ==================== DETAILS ========================== //
    canDisplayDetailsCharge(): boolean {
        return this.names.includes('DISPLAY_DETAILS_CHARGE');
    }
}
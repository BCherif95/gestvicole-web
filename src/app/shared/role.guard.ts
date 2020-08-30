import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {RoleUtils} from '../utils/role-utils';

@Injectable({
    providedIn: 'root'
})
export class AdminMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeAdminMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class CustomerMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeCustomerMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class InvoiceMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeInvoiceMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class OrderMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeOrderMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class ChargeMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeChargeMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class CategoryMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeCategoryMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class ProductMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeProductMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class StockMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeStockMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class StockEntryMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeStockEntryMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class StockOutMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeStockOutMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class BuildingMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeBuildingMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class BuildingCreateGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canCreateBuilding()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class BuildingUpdateGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canUpdateBuilding()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class ProductionMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeProductionMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class ProductionCreateGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canCreateProduction()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class ProductionUpdateGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canUpdateProduction()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class chargeDetailsGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canDisplayDetailsCharge) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }

}


@Injectable({
    providedIn: 'root'
})
export class InvoicePrintGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canPrintInvoice()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class PaymentMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeePaymentMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class RoleMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeRoleMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class RoleUpdateGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canUpdateRole()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserMenuGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canSeeUserMenu()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserCreateGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canCreateUser()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserUpdateGuard implements CanActivate {
    roleUtils: RoleUtils;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.roleUtils = new RoleUtils();
        if (this.roleUtils.canUpdateUser()) {
            return true;
        } else {
            this.router.navigate(['/errors/access-error']);
        }
    }
}

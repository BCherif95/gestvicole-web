import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {MatCheckboxChange, MatSnackBar} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {fuseAnimations} from '@fuse/animations';
import {Role} from '../../../data/models/role.model';
import {AdminCrudRoleService} from './crud-role.service';
import {Privilege} from '../../../data/models/privilege.model';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {PrivilegeService} from '../../../services/privilege.service';

@Component({
    selector: 'admin-crud-role',
    templateUrl: './crud-role.component.html',
    styleUrls: ['./crud-role.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AdminCrudRoleComponent implements OnInit, OnDestroy {
    role: Role;
    pageType: string;
    roleForm: FormGroup;
    priviligeSelected: Privilege;
    privileges: Privilege[] = [];
    selectedPrivilegeValues: Privilege[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param _adminCrudRoleService
     * @param _privilegeService
     * @param {MatSnackBar} _matSnackBar
     * @param _router
     * @param _toastrService
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _adminCrudRoleService: AdminCrudRoleService,
        private _privilegeService: PrivilegeService,
        private _matSnackBar: MatSnackBar,
        private _router: Router,
        private _toastrService: ToastrService
    ) {
        // Set the default
        this.role = new Role();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.findAllPrivilege();
        // Subscribe to update product on changes
        this._adminCrudRoleService.onRoleChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(role => {
                if (role) {
                    this.role = new Role(role);
                    this.pageType = 'edit';
                } else {
                    this.pageType = 'new';
                    this.role = new Role();
                }
                this.createRoleForm();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    findAllPrivilege() {
        this.selectedPrivilegeValues = [];
        this._privilegeService.findAll().subscribe(value => {
            this.privileges = value['response'];
            this.addCheckboxes();
        }, error => this._toastrService.error(environment.errorNetworkMessage));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create role form
     *
     * @returns {FormGroup}
     */
    createRoleForm() {
        this.roleForm = this._formBuilder.group({
            name: [this.role.name],
            description: [this.role.description],
            privileges: new FormArray([])
            /*   privileges: [this.role.privileges]*/
        });
        this.addCheckboxes();
    }

    private addCheckboxes() {
        let names = [];
        this.role.privileges.forEach(privilege => {
            names.push(privilege.name);
        });

        this.privileges.forEach((item, i) => {
            if (names.includes(item.name)) {
                item.checked = true;
                this.itemCheek(i);
            }
            const control = new FormControl(item); // if first item set to true, else false
            (this.roleForm.controls.privileges as FormArray).push(control);
        });

    }

    selectAll(event: MatCheckboxChange) {
        this.selectedPrivilegeValues = [];
        this.privileges.forEach((item, i) => {
            if (event.checked) {
                item.checked = event.checked;
                this.itemCheek(i);
            } else {
                item.checked = event.checked;
            }
        });
    }


    itemCheek(i) {
        this.priviligeSelected = this.privileges[i];
        const index = this.selectedPrivilegeValues.indexOf(this.priviligeSelected);
        if (index >= 0) {
            this.selectedPrivilegeValues.splice(index, 1);
        } else {
            this.selectedPrivilegeValues.push(this.priviligeSelected);
        }
    }

    create(): void {
        this.role = this.roleForm.getRawValue();
        this.role.privileges = this.selectedPrivilegeValues;
        this._adminCrudRoleService.create(this.role).subscribe((response: any) => {
            if (response['status'] == 'OK') {
                this._adminCrudRoleService.onRoleChanged.next(this.role);
                this._toastrService.success(response['message'], 'Rôle');
                this._router.navigateByUrl('/tr/admin/roles');
            } else {
                this._toastrService.error(response['message']);
            }
        }, e => {
            this._toastrService.error(environment.errorMessage);
        });
    }

    update(): void {
        this.role = this.roleForm.getRawValue();
        this.role.privileges = this.selectedPrivilegeValues;
        this._adminCrudRoleService.update(this.role).subscribe((response: any) => {
            if (response['status'] == 'OK') {
                this._adminCrudRoleService.onRoleChanged.next(this.role);
                this._toastrService.success(response['message'], 'Rôle');
                this._router.navigateByUrl('/tr/admin/roles');
            } else {
                this._toastrService.error(response['message']);
            }
        }, e => {
            this._toastrService.error(environment.errorMessage);
        });
    }

}

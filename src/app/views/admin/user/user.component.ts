import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import {MatCheckboxChange, MatSnackBar} from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {User} from '../../../data/models/user.model';
import {Role} from '../../../data/models/role.model';
import {RolesService} from '../roles/roles.service';
import {UserService} from './user.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector     : 'admin-user',
    templateUrl  : './user.component.html',
    styleUrls    : ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class UserComponent implements OnInit, OnDestroy
{
    user: User;
    pageType: string;
    userForm: FormGroup;
    roleSelected: Role;
    roles: Role[] = [];
    selectedRoleValues: Role[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param _userService
     * @param _rolesService
     * @param _toastService
     * @param _router
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _userService: UserService,
        private _rolesService: RolesService,
        private _toastService: ToastrService,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
        this.user = new User();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.findAllRoles();
        // Subscribe to update product on changes
        this._userService.onUserChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                if (user) {
                    this.user = new User(user);
                    this.pageType = 'edit';
                } else {
                    this.pageType = 'new';
                    this.user = new User();
                }
                this.createUserForm();

            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    findAllRoles() {
        this.selectedRoleValues = [];
        this._rolesService.findAll().subscribe(value => {
            this.roles = value['response'];
            this.addCheckboxes();
        }, error => console.log(error));
    }


    /**
     * Create role form
     *
     * @returns {FormGroup}
     */

    createUserForm() {
        this.userForm = this._formBuilder.group({
            id: [this.user.id],
            lastname: [this.user.lastname],
            firstname: [this.user.firstname],
            username: [this.user.username],
            password: [this.user.password],
            telephone: [this.user.telephone],
            turnoverTarget: [this.user.turnoverTarget?this.user.turnoverTarget:0],
            email: [this.user.email],
            roles: new FormArray([])
        });
        this.addCheckboxes();
    }

    private addCheckboxes() {
        let names = [];
        if (!this.user.roles) {
            this.user.roles = [];
        }
        this.user.roles.forEach(role => {
            names.push(role.name);
        });

        this.roles.forEach((item, i) => {
            if (names.includes(item.name)) {
                item.checked = true;
                this.itemCheek(i);
            }
            const control = new FormControl(item); // if first item set to true, else false
            (this.userForm.controls.roles as FormArray).push(control);
        });

    }
    selectAll(event: MatCheckboxChange) {
        this.selectedRoleValues = [];
        this.roles.forEach((item, i) => {
            if (event.checked) {
                item.checked = event.checked;
                this.itemCheek(i);
            } else {
                item.checked = event.checked;
            }
        });
    }

    itemCheek(i) {
        this.roleSelected = this.roles[i];
        const index = this.selectedRoleValues.indexOf(this.roleSelected);
        if (index >= 0) {
            this.selectedRoleValues.splice(index, 1);
        } else {
            this.selectedRoleValues.push(this.roleSelected);
        }
    }

    /**
     * save Or update role
     */
    save(): void {
        this.user = this.userForm.getRawValue();
        this.user.roles = this.selectedRoleValues;
        this._userService.save(this.user).subscribe((response: any) => {
            if (response['status'] == 'OK') {
                this._userService.onUserChanged.next(this.user);
                this._toastService.success(response['message'], 'Utilisateur');
                this._router.navigateByUrl('/views/admin/users');
            } else {
                this._toastService.error(response['message']);
            }
        }, e => {
            this._toastService.error(environment.errorMessage);
            // console.log(e);
        });


    }

    update() {
        this.user = this.userForm.getRawValue();
        this.user.roles = this.selectedRoleValues;
        this._userService.update(this.user).subscribe((response: any) => {
            if (response['status'] == 'OK') {
                this._userService.onUserChanged.next(this.user);
                this._toastService.success(response['message'], 'Utilisateur');
                this._router.navigateByUrl('/views/admin/users');
            } else {
                this._toastService.error(response['message']);
            }
        }, e => {
            this._toastService.error(environment.errorMessage);
            // console.log(e);
        });
    }

}

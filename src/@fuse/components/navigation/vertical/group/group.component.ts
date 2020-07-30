import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationItem } from '@fuse/types';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import {ProjectUtils} from '../../../../../app/utils/project-utils';

@Component({
    selector   : 'fuse-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls  : ['./group.component.scss']
})
export class FuseNavVerticalGroupComponent implements OnInit, OnDestroy
{
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: FuseNavigationItem;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private projectUtilsService: ProjectUtils
    )
    {
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
        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
         .subscribe(() => {

             // Mark for check
             this._changeDetectorRef.markForCheck();
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

    canActivate(item: FuseNavigationItem) {
        const user = this.projectUtilsService.getAppUser();
        const role = user && user.roles && user.roles.length > 0 ? user.roles[0] : null;
        console.log(
            'role && role.name && role.name.toUpperCase() === \'ADMIN\' || item.id === \'productions\'',
            role && role.name && role.name.toUpperCase() === 'ADMIN' || item.id === 'productions',
            item.id,
            role
        );
        return role && role.name && role.name.toUpperCase() === 'ADMIN' || item.id === 'productions';
    }
}

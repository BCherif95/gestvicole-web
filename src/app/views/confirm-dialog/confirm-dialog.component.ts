import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector   : 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent
{
    public confirmTitle: string;
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>
    )
    {
    }

}

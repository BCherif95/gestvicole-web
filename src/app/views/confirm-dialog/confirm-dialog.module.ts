import {NgModule} from '@angular/core';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        ConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        CommonModule
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
})
export class ConfirmDialogModule {
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseConfigService} from '../../../../@fuse/services/config.service';

@Component({
    selector: 'access',
    templateUrl: './access.component.html',
    styleUrls: ['./access.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AccessErrorComponent implements OnInit {

    /**
     * Constructor
     */
    constructor(
        private _fuseConfigService: FuseConfigService) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit(): void {
        document.title = 'TRANS ROUTE | View Error';
    }
}

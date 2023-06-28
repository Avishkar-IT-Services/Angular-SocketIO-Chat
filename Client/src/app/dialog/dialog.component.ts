import { Component, Input } from '@angular/core';
@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html'
})
export class DialogComponent {
    @Input() url: string = "";
    @Input() name: string = "";
    @Input() format: string = "";
    visible: boolean = false;
    showDialog() {
        this.visible = true;
    }
}
import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: ` <div class="layout-footer">
        Admin by
        <a href="https://github.com/agungdh" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">AgungDH</a>
    </div>`
})
export class AppFooter {}

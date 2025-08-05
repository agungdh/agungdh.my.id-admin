import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-form',
    imports: [InputTextModule, FluidModule, ButtonModule, SelectModule, FormsModule, TextareaModule, RouterLink],
    templateUrl: './form.html',
    styleUrl: './form.scss'
})
export class Form {}

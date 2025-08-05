import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-form',
    imports: [InputTextModule, FluidModule, ButtonModule, SelectModule, FormsModule, TextareaModule, RouterLink, ReactiveFormsModule],
    templateUrl: './form.html',
    styleUrl: './form.scss'
})
export class Form {
    form = new FormGroup({
        name: new FormControl(''),
        description: new FormControl('')
    });

    onSubmit() {
        console.log(this.form.value);
    }
}

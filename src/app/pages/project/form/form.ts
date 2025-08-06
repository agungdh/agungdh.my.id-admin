import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ProjectService } from '@/pages/project/project.service';

@Component({
    selector: 'app-form',
    imports: [InputTextModule, FluidModule, ButtonModule, SelectModule, FormsModule, TextareaModule, RouterLink, ReactiveFormsModule],
    templateUrl: './form.html',
    styleUrl: './form.scss'
})
export class Form implements OnInit {
    form = new FormGroup({
        name: new FormControl(''),
        description: new FormControl('')
    });
    private readonly router = inject(Router); // Inject Router service here
    private readonly projectService = inject(ProjectService);
    private readonly route = inject(ActivatedRoute);

    ngOnInit() {
        console.log(this.route.snapshot.paramMap.get('id'));
    }

    getData() {

    }

    onSubmit() {
        const name = this.form.value.name ?? '';
        const description = this.form.value.description ?? '';

        this.projectService.upsertProject(name, description).subscribe({
            next: (success) => {
                if (success) {
                    this.router.navigate(['/project']);
                } else {
                    console.error({ severity: 'error', summary: 'Error', detail: 'Failed to upsert project.' });
                }
            },
            error: (err) => {
                console.error({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'An error occurred while saving the project.'
                });
            }
        });
    }
}

import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ProjectService, ProjectType } from '@/pages/project/project.service';
import { Observable } from 'rxjs';

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
    public projectId: string | null;
    public project$: Observable<ProjectType | null> | undefined;
    public isLoaded: boolean = true;

    constructor() {
        this.projectId = this.route.snapshot.paramMap.get('id');

        if (this.projectId) {
            this.isLoaded = false;
        }
    }

    ngOnInit() {
        if (this.projectId) {
            this.project$ = this.projectService.getProjectById(this.projectId);

            this.project$.subscribe((project) => {
                if (project) {
                    this.form.setValue({
                        name: project.name,
                        description: project.description
                    });

                    this.isLoaded = true;
                }
            });
        }
    }
    onSubmit() {
        const form: ProjectType = {
            name: this.form.value.name ?? '',
            description: this.form.value.description ?? '',
            id: this.projectId,
            releaseDate: null
        };

        this.projectService.upsertProject(form).subscribe({
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
                    detail: 'An error occurred while saving the project.',
                    err
                });
            }
        });
    }
}

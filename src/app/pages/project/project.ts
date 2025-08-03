import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProjectService, ProjectType } from '@/pages/service/project-service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-empty',
    standalone: true,
    imports: [TableModule, CommonModule],
    templateUrl: './project.html'
})
export class Project {
    private readonly projectService = inject(ProjectService);
    public projects$: Observable<ProjectType[]> = this.projectService.getProjects();
}

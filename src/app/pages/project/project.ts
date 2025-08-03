import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProjectService, ProjectType } from '@/pages/service/project-service';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Button } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
    selector: 'app-empty',
    standalone: true,
    imports: [TableModule, CommonModule, Button, ButtonModule, ToastModule, ConfirmPopupModule],
    providers: [ConfirmationService, MessageService],
    templateUrl: './project.html'
})
export class Project {
    private readonly projectService = inject(ProjectService);
    private readonly confirmationService = inject(ConfirmationService);
    private readonly messageService = inject(MessageService);

    private reload$ = new Subject<void>();
    public projects$ = this.reload$.pipe(
        startWith(void 0), // langsung fetch sekali saat inisialisasi
        switchMap(() => this.projectService.getProjects())
    );

    public deleteData(event: Event, id: string) {
        this.confirmationService.confirm({
            target: event.currentTarget as EventTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Deleting record', life: 3000 });

                this.projectService.deleteProject(id).subscribe((res) => {
                    console.log({ res });

                    this.reload$.next();
                });
            }
        });
    }
}

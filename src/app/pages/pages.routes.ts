import { Routes } from '@angular/router';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { Project } from '@/pages/project/project';

export default [
    { path: '', component: Dashboard },
    { path: 'project', component: Project }
] as Routes;

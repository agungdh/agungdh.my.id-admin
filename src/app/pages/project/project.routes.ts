import { Routes } from '@angular/router';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { Project } from '@/pages/project/project';
import { Form } from '@/pages/project/form/form';

export default [
    { path: '', component: Project },
    { path: 'create', component: Form }
] as Routes;

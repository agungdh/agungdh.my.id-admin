import { Routes } from '@angular/router';
import { Dashboard } from '@/pages/dashboard/dashboard';

export default [
    { path: '', component: Dashboard },
    { path: 'project', loadChildren: () => import('@/pages/project/project.routes') }
] as Routes;

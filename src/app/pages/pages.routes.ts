import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { Dashboard } from '@/pages/dashboard/dashboard';

export default [
    { path: '', component: Dashboard },
    { path: 'empty', component: Empty }
] as Routes;

import { Routes } from '@angular/router';
import { Form } from '@/pages/project/form/form';
import { Index } from '@/pages/project/index';

export default [
    { path: '', component: Index },
    { path: 'create', component: Form },
    { path: 'edit/:id', component: Form },
] as Routes;

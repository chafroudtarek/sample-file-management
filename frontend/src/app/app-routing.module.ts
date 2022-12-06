import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllfilesComponent } from './component/allfiles/allfiles.component';
import { ArchivedfileComponent } from './component/archivedfile/archivedfile.component';
import { StarredfileComponent } from './component/starredfile/starredfile.component';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'starredfile',
        component:StarredfileComponent,
       
      },
      {
        path: 'archivedfile',
        component:ArchivedfileComponent,
       
      },
      {
        path: 'allfiles',
        component:AllfilesComponent,
       
      },
     
      
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

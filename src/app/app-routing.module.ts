import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ListReportComponent } from './pages/list-report/list-report.component';
import { ReportComponent } from './pages/report/report.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'list-report', component: ListReportComponent },
      { path: 'report/:id', component: ReportComponent },
    ],
  },
  {
    path: 'mobile',
    loadChildren: () =>
      import('./mobile/mobile-routing.module').then(
        (m) => m.MobileRoutingModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

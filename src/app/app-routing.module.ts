import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ReportComponent } from './pages/report/report.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'report', component: ReportComponent },
    ],
  },
  {
    path: 'mobile',
    loadChildren: () =>
      import('./mobile/mobile-routing.module').then(
        (m) => m.MobileRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

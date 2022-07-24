import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientListComponent} from './patient/patient-list/patient-list.component';
import {MedicinListComponent} from './medicine/medicin-list/medicin-list.component';
import {PathologicalListComponent} from './pathological/pathological-list/pathological-list.component';
import {PatientViewComponent} from './patient/patient-view/patient-view.component';

const routes: Routes = [
  {
    path: 'patients/list',
    component: PatientListComponent
  },
  {
    path: 'medicines/list',
    component: MedicinListComponent
  },
  {
    path: 'pathological/list',
    component: PathologicalListComponent
  },
  {
    path: 'patients/view/:id',
    component: PatientViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

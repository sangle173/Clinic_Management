import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientListComponent} from './patient/patient-list/patient-list.component';
import {MedicinListComponent} from './medicine/medicin-list/medicin-list.component';
import {PathologicalListComponent} from './pathological/pathological-list/pathological-list.component';
import {PatientViewComponent} from './patient/patient-view/patient-view.component';
import {PatientCreateComponent} from './patient/patient-create/patient-create.component';
import {CreateHistoryComponent} from './history/create-history/create-history.component';

const routes: Routes = [
  {
    path: '',
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
  },
  {
    path: 'patients/new',
    component: PatientCreateComponent
  }
  ,
  {
    path: 'histories/new/:id',
    component: CreateHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

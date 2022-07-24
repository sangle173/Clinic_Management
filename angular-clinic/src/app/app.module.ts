import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { PatientCreateComponent } from './patient/patient-create/patient-create.component';
import {NgxSpinnerModule} from 'ngx-bootstrap-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { MedicinListComponent } from './medicine/medicin-list/medicin-list.component';
import { PathologicalListComponent } from './pathological/pathological-list/pathological-list.component';
import { PatientViewComponent } from './patient/patient-view/patient-view.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PatientListComponent,
    PatientCreateComponent,
    MedicinListComponent,
    PathologicalListComponent,
    PatientViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

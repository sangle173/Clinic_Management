import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Patient} from '../../model/patient';
import {PatientService} from '../../service/patient.service';
import {History} from '../../model/history';
import {HistoryService} from '../../service/history.service';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {
  id: number;
  patient: Patient;
  histories: History[];
  page: number = 1;
  pageSize: number = 5;
  collectionSize: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private patientService: PatientService,
              private historyService: HistoryService
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.getPatientById(this.id);
  }

  getPatientById(id: number) {
    this.patientService.findById(id).subscribe(data => {
      this.patient = data;

    });
    this.historyService.findById(id).subscribe(data => {
      this.histories = data;
      this.collectionSize = data.length;
    });
  }
}

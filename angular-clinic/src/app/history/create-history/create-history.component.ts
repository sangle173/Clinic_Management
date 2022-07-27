import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PatientService} from '../../service/patient.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Patient} from '../../model/patient';
import {HistoryService} from '../../service/history.service';
import {MedicineService} from '../../service/medicine.service';
import {PathologicalService} from '../../service/pathological.service';
import {Pathological} from '../../model/pathological';
import {Medicine} from '../../model/medicine';
import Swal from 'sweetalert2';
import {History} from '../../model/history';

const DAILOC = ['ĐẠI AN', 'ÁI NGHĨA', 'DUY HÒA', 'DUY CHÂU', 'DUY XUYÊN', 'ĐẠI CHÁNH', 'ĐẠI CƯỜNG', 'ĐẠI ĐỒNG', 'ĐẠI HIỆP', 'ĐẠI HÒA', 'ĐẠI HỒNG', 'ĐẠI HƯNG', 'ĐẠI LÃNH', 'ĐẠI MINH', 'ĐẠI NGHĨA', 'ĐẠI PHONG', 'ĐẠI QUANG', 'ĐẠI SƠN', 'ĐẠI TÂN', 'ĐẠI THẮNG', 'ĐẠI THẠNH', 'ĐÀ NẴNG', 'SÀI GÒN', 'KHÁC'];
const MONTH = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const YEAR = ['2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007'];

@Component({
  selector: 'app-create-history',
  templateUrl: './create-history.component.html',
  styleUrls: ['./create-history.component.css']
})
export class CreateHistoryComponent implements OnInit {
  createHistoryForm: FormGroup;
  updateForm: FormGroup;
  patientId: number;
  patient: Patient;
  pathologicalList: Pathological[];
  medicineList: Medicine[];
  messageError = '';
  addressList = DAILOC;
  histories: History[];
  page: number = 1;
  pageSize: number = 5;
  collectionSize: number = 0;
  monthList = MONTH;
  yearList = YEAR;

  constructor(private activatedRoute: ActivatedRoute,
              private patientService: PatientService,
              private medicineService: MedicineService,
              private pathologicalService: PathologicalService,
              private fb: FormBuilder,
              private historyService: HistoryService,
              private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.patientId = +paramMap.get('id');
      this.createHistoryForm = this.fb.group({
        unitPrice: '',
        note: '',
        patientId: '',
        doctorName: new FormControl('BS. ĐÀO'),
        pathologicals: this.fb.array([]),
        medicineArray: this.fb.array([]),
      });
    });
  }

  ngOnInit(): void {
    this.getAllMedicines();
    this.getAllPathologicals();
    this.getPatient(this.patientId);
  }

  updatePatient(id: number) {
    const patient = this.updateForm.value;
    patient['id'] = this.patientId;
    console.log(patient);
    this.patientService.updatePatient(id, patient).subscribe(data => {
      this.showSuccess();
    });
  }

  onSubmit() {
    const history = this.createHistoryForm.value;
    const pathological = [];
    const pathologicalId = history['pathologicals'];
    for (let i = 0; i < pathologicalId.length; i++) {
      pathological.push(pathologicalId[i]['idPathological']);
    }
    history['pathological'] = pathological;
    const medicines = [];
    const medicineId = history['medicineArray'];
    for (let i = 0; i < medicineId.length; i++) {
      medicines.push(medicineId[i]['idMedicine']);
    }
    history['medicines'] = medicines;
    delete history['pathologicals'];
    delete history['medicineArray'];
    console.log(history);
    this.historyService.saveHistory(history).subscribe(data => {
      window.location.reload();
    });
  }

  getPatient(id: number) {
    return this.patientService.findById(id).subscribe(patient => {
      this.updateForm = new FormGroup({
        name: new FormControl(patient.name),
        gender: new FormControl(patient.gender),
        phoneNumber: new FormControl(patient.phoneNumber),
        monthOfBirth: new FormControl(patient.monthOfBirth),
        yearOfBirth: new FormControl(patient.yearOfBirth),
        address: new FormControl(patient.address),
        weight: new FormControl(patient.weight),
        height: new FormControl(patient.height),
        createdDate: new FormControl(patient.createdDate)
      });
      console.log(this.updateForm);
      this.historyService.findById(id).subscribe(data => {
        if (data.length === 0) {
          this.messageError = 'Chưa có lịch sử khám.';
          this.histories = [];
        } else {
          this.histories = data;
          this.collectionSize = data.length;
        }
      });
    });
  }

  getAllPathologicals() {
    this.pathologicalService.getAll('').subscribe(data => {
      this.pathologicalList = data;
      console.log('pathologicalList' + this.pathologicalList);
    });
  }

  getAllMedicines() {
    this.medicineService.getAll('').subscribe(data => {
      this.medicineList = data;
    });
  }

  get pathologicals(): FormArray {
    return this.createHistoryForm.get('pathologicals') as FormArray;
  }

  get medicineArray(): FormArray {
    return this.createHistoryForm.get('medicineArray') as FormArray;
  }

  newPathological(): FormGroup {
    return this.fb.group({
      idPathological: '',
    });
  }

  newMedicineArray(): FormGroup {
    return this.fb.group({
      idMedicine: '',
    });
  }

  addMedicineArray() {
    this.medicineArray.push(this.newMedicineArray());
  }

  addPathological() {
    this.pathologicals.push(this.newPathological());
  }

  removePathological(i: number) {
    this.pathologicals.removeAt(i);
  }

  removeMedicineArray(i: number) {
    this.medicineArray.removeAt(i);
  }


  showSuccess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Lưu thành công🤣🤣🤣',
      showConfirmButton: false,
      timer: 1500
    });
  }

  showDeleteSuccess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Xóa thành công👍👍👍',
      showConfirmButton: false,
      timer: 1500
    });
  }

  showError() {
    Swal.fire({
      text: 'Không tìm thấy dữ liệu từ hệ thống !',
      icon: 'warning',
      confirmButtonText: 'Đóng'
    });
  }

  showErrorSearch() {
    Swal.fire({
      text: 'Không tìm thấy người dùng !',
      icon: 'warning',
      confirmButtonText: 'Đóng'
    });
  }

  showErrorDelete() {
    Swal.fire({
      text: 'Không thể xóa người dùng !',
      icon: 'warning',
      confirmButtonText: 'Đóng'
    });
  }
}

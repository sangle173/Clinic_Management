import {Component, OnInit} from '@angular/core';
import {Patient} from '../../model/patient';
import {PatientService} from '../../service/patient.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-bootstrap-spinner';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HistoryService} from '../../service/history.service';
import {MedicineService} from '../../service/medicine.service';
import {PathologicalService} from '../../service/pathological.service';
import {History} from '../../model/history';
import {Pathological} from '../../model/pathological';
import {Medicine} from '../../model/medicine';

const DAILOC = ['ĐẠI AN', 'ÁI NGHĨA', 'DUY HÒA', 'DUY CHÂU', 'DUY XUYÊN', 'ĐẠI CHÁNH', 'ĐẠI CƯỜNG', 'ĐẠI ĐỒNG', 'ĐẠI HIỆP', 'ĐẠI HÒA', 'ĐẠI HỒNG', 'ĐẠI HƯNG', 'ĐẠI LÃNH', 'ĐẠI MINH', 'ĐẠI NGHĨA', 'ĐẠI PHONG', 'ĐẠI QUANG', 'ĐẠI SƠN', 'ĐẠI TÂN', 'ĐẠI THẮNG', 'ĐẠI THẠNH', 'ĐÀ NẴNG', 'SÀI GÒN', 'KHÁC'];

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: Patient[];
  history: History;
  patientExisting: Patient;
  patientDelete: string;
  messageError: string;
  nameSearch = '';
  addressSearch = '';
  phoneNumberSearch = '';
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  idDelete: number;
  pathologicalList: Pathological[];
  medicines: Medicine[];
  addressList = DAILOC;
  createForm: FormGroup;
  createHistoryFrom: FormGroup;
  idPatientChoosing: number;
  namePatientChoosing: string;
  genderPatientChoosing: string;
  phoneNumberPatientChoosing: string;
  yearOfBirthPatientChoosing: string;
  addressPatientChoosing: string;
  dateCreatedPatientChoosing: string;
  weightPatientChoosing: string;
  heightPatientChoosing: string;

  nearlyHistory: History;

  constructor(private patientService: PatientService,
              private historyService: HistoryService,
              private medicineService: MedicineService,
              private pathologicalService: PathologicalService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getAllPatients(this.nameSearch, this.addressSearch, this.phoneNumberSearch);
    this.getAllMedicines();
    this.getAllPathologicals();
    console.log(this.pathologicalList);
    console.log(this.medicines);

    this.createForm = new FormGroup({
      name: new FormControl(''),
      gender: new FormControl('Nam'),
      phoneNumber: new FormControl(''),
      yearOfBirth: new FormControl(''),
      address: new FormControl(''),
      weight: new FormControl(0),
      height: new FormControl(0)
    });

    this.createHistoryFrom = this.fb.group({
      unitPrice: '',
      note: '',
      patientId: '',
      doctorName: new FormControl('BS. ĐÀO'),
      pathologicals: this.fb.array([]),
      medicineArray: this.fb.array([]),
    });
  }

  get pathologicals(): FormArray {
    return this.createHistoryFrom.get('pathologicals') as FormArray;
  }

  get medicineArray(): FormArray {
    return this.createHistoryFrom.get('medicineArray') as FormArray;
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

  onSubmit() {
    const history = this.createHistoryFrom.value;
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


  getAllPathologicals() {
    this.pathologicalService.getAll('').subscribe(data => {
      this.pathologicalList = data;
      console.log('pathologicalList' + this.pathologicalList);
    });
  }

  getAllMedicines() {
    this.medicineService.getAll('').subscribe(data => {
      this.medicines = data;
    });
  }

  getAllPatients(name: string, address: string, phoneNumber: string) {
    this.patientService.getAll(name, address, phoneNumber).subscribe(data => {
      this.messageError = '';
      if (data.length === 0) {
        this.patients = [];
        this.collectionSize = 0;
        this.messageError = 'Không tìm thấy dữ liệu.';
      } else {
        this.patients = data;
        this.collectionSize = data.length;

      }
    }, () => {
      this.router.navigateByUrl('/403');
    }, () => {
    });
  }

  submit() {
    const patient = this.createForm.value;
    this.patientService.savePatient(patient).subscribe(data => {
      window.location.reload();
    }, () => {
      this.showError();
    }, () => {
    });
  }

  deletePatient() {
    this.patientService.deletePatient(this.idDelete).subscribe(() => {
      this.showDeleteSuccess();
    }, e => {
      this.showErrorDelete();
    }, () => {
      this.getAllPatients(this.nameSearch, this.addressSearch, this.phoneNumberSearch);
    });
  }

  sendIdToComponent(id: number) {
    this.idDelete = id;
    this.patientService.findById(id).subscribe(data => {
      this.patientExisting = data;
      this.patientDelete = this.patientExisting.name;
      this.idPatientChoosing = this.patientExisting.id;
      this.namePatientChoosing = this.patientExisting.name;
      this.genderPatientChoosing = this.patientExisting.gender;
      this.phoneNumberPatientChoosing = this.patientExisting.phoneNumber;
      this.yearOfBirthPatientChoosing = this.patientExisting.yearOfBirth;
      this.addressPatientChoosing = this.patientExisting.address;
      this.weightPatientChoosing = this.patientExisting.weight;
      this.heightPatientChoosing = this.patientExisting.height;
      this.dateCreatedPatientChoosing = this.patientExisting.createdDate;
    });

    this.historyService.findNearlyById(id).subscribe(data => {
      this.nearlyHistory = data;
      console.log(this.nearlyHistory);
    });
  }

  get gender() {
    return this.createForm.get('gender');
  }

  get name() {
    return this.createForm.get('name');
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

  clearSearch() {
    this.nameSearch = '';
    this.addressSearch = '';
    this.phoneNumberSearch = '';
  }
}

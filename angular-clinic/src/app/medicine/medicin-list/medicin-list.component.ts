import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-bootstrap-spinner';
import Swal from 'sweetalert2';
import {Medicine} from '../../model/medicine';
import {MedicineService} from '../../service/medicine.service';

@Component({
  selector: 'app-medicin-list',
  templateUrl: './medicin-list.component.html',
  styleUrls: ['./medicin-list.component.css']
})
export class MedicinListComponent implements OnInit {

  medicines: Medicine[];
  medicineExisting: Medicine;
  medicineDelete: string;
  messageError: string;
  keyword = '';
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  idDelete: number;
  createForm: FormGroup;

  constructor(private medicineService: MedicineService,
              private router: Router,
              private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.getAllMedicine(this.keyword);
    this.createForm = new FormGroup({
      medicineName: new FormControl(''),
    });
  }

  getAllMedicine(keyword: string) {
    this.medicineService.getAll(keyword).subscribe(data => {
      this.messageError = '';
      if (data.length === 0) {
        this.medicines = [];
        this.collectionSize = 0;
        this.messageError = 'Không tìm thấy dữ liệu.';
      } else {
        this.medicines = data;
        this.collectionSize = data.length;
      }
    }, () => {
      this.router.navigateByUrl('/403');
    }, () => {
    });
  }

  submit() {
    const medicine = this.createForm.value;
    this.medicineService.saveMedicine(medicine).subscribe(data => {
      window.location.reload();
    }, () => {
      this.showError();
    }, () => {
    });
  }

  deleteMedicine() {
    this.medicineService.deleteMedicine(this.idDelete).subscribe(() => {
      this.showDeleteSuccess();
    }, e => {
      this.showErrorDelete();
    }, () => {
      this.getAllMedicine(this.keyword);
    });
  }

  sendIdToComponent(id: number) {
    this.idDelete = id;
    this.medicineService.findById(id).subscribe(data => {
      this.medicineExisting = data;
      this.medicineDelete = this.medicineExisting.medicineName;
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
}

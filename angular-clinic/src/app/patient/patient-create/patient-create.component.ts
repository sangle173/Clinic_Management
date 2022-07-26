import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PatientService} from '../../service/patient.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

const DAILOC = ['ĐẠI AN', 'ÁI NGHĨA', 'DUY HÒA', 'DUY CHÂU', 'DUY XUYÊN', 'ĐẠI CHÁNH', 'ĐẠI CƯỜNG', 'ĐẠI ĐỒNG', 'ĐẠI HIỆP', 'ĐẠI HÒA', 'ĐẠI HỒNG', 'ĐẠI HƯNG', 'ĐẠI LÃNH', 'ĐẠI MINH', 'ĐẠI NGHĨA', 'ĐẠI PHONG', 'ĐẠI QUANG', 'ĐẠI SƠN', 'ĐẠI TÂN', 'ĐẠI THẮNG', 'ĐẠI THẠNH', 'ĐÀ NẴNG', 'SÀI GÒN', 'KHÁC'];
const MONTH = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const YEAR = ['2022', '2021', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007'];

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {
  createForm: FormGroup;
  addressList = DAILOC;
  monthList = MONTH;
  yearList = YEAR;

  constructor(private patientService: PatientService,
              private route: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl(''),
      gender: new FormControl('Nam'),
      phoneNumber: new FormControl(''),
      monthOfBirth: new FormControl(MONTH[0]),
      yearOfBirth: new FormControl(YEAR[0]),
      address: new FormControl(''),
      weight: new FormControl(0),
      height: new FormControl(0)
    });
  }

  submit() {
    const patient = this.createForm.value;
    this.patientService.savePatient(patient).subscribe(data => {
      this.route.navigateByUrl(`/histories/new/${data.id}`);
    }, () => {
      this.showError();
    }, () => {
    });
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

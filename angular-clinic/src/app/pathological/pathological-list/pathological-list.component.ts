import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-bootstrap-spinner';
import Swal from 'sweetalert2';
import {Pathological} from '../../model/pathological';
import {PathologicalService} from '../../service/pathological.service';
import {HistoryService} from '../../service/history.service';
import {History} from '../../model/history';
import {MedicineService} from '../../service/medicine.service';

@Component({
  selector: 'app-pathological-list',
  templateUrl: './pathological-list.component.html',
  styleUrls: ['./pathological-list.component.css']
})
export class PathologicalListComponent implements OnInit {

  pathologicalList: Pathological[];
  pathologicalExisting: Pathological;
  pathologicalDelete: string;
  messageError: string;
  keyword = '';
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  idDelete: number;
  createForm: FormGroup;

  constructor(private pathologicalService: PathologicalService,
              private router: Router,
              private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.getAllPathological(this.keyword);
    this.createForm = new FormGroup({
      pathologicalName: new FormControl(''),
    });
  }

  getAllPathological(keyword: string) {
    this.pathologicalService.getAll(keyword).subscribe(data => {
      this.messageError = '';
      if (data.length === 0) {
        this.pathologicalList = [];
        this.collectionSize = 0;
        this.messageError = 'Không tìm thấy dữ liệu.';
      } else {
        this.pathologicalList = data;
        this.collectionSize = data.length;
      }
    }, () => {
      this.router.navigateByUrl('/403');
    }, () => {
    });
  }

  submit() {
    const pathological = this.createForm.value;
    this.pathologicalService.savePathological(pathological).subscribe(data => {
      window.location.reload();
    }, () => {
      this.showError();
    }, () => {
    });
  }

  deletePathological() {
    this.pathologicalService.deletePathological(this.idDelete).subscribe(() => {
      this.showDeleteSuccess();
    }, e => {
      this.showErrorDelete();
    }, () => {
      this.getAllPathological(this.keyword);
    });
  }

  sendIdToComponent(id: number) {
    this.idDelete = id;
    this.pathologicalService.findById(id).subscribe(data => {
      this.pathologicalExisting = data;
      this.pathologicalDelete = this.pathologicalExisting.pathologicalName;
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

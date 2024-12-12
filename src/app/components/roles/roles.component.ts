import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader.service';
import { RoleService } from 'src/app/services/role.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import { CrudModeEnum } from 'src/app/shared/models/enums/crude-mode.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  public roleForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    isDeleted: new FormControl(false)
  });
  isSubmitted = false;
  rows = [];
  crudMode = CrudModeEnum.Add;

  constructor(private _loaderService: LoaderService, private _roleService: RoleService,
    private tostr: ToastrService
  ){
  }

  list(){
    this._loaderService.display(true);
    this._roleService.listRoles().subscribe(
      (res: any) => {
        debugger;
        if (res != undefined) {
          this.rows = res;
        } else {
          this.tostr.error('Error occurred');
        }
        this._loaderService.display(false);
      }, (err) => {
        this._loaderService.display(false);
      })
  }

  ngOnInit() {
    this.list();
  }

  create(){
    this.isSubmitted = true;
    if (this.roleForm.valid) {
      this._loaderService.display(true);
      this._roleService.addRole(this.roleForm.value).subscribe((res: any) => {
        if (res != undefined) {
          this.tostr.success('Success', 'Added');
          this.roleForm.reset();
          this.isSubmitted = false;
          this.list();
        } else {this.tostr.error('Error occured');}
      this._loaderService.display(false);
      }, (err => {
        this.tostr.error(err, 'Error');
      this._loaderService.display(false);
      }))
    }
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.rows.filter(function (d: any) {
      return val ?d.name.toLowerCase().indexOf(val) !== -1 || !val : true;
    });
    this.rows = temp;
  }

  onEdit(row: any){
    this.crudMode = CrudModeEnum.Edit;
    if(this.roleForm != null)
    {
      this.roleForm.get('id')!.setValue(row.id);
      this.roleForm.get('name')!.setValue(row.name);
    }
  }

  cancel(){
    this.crudMode = CrudModeEnum.Add;
    this.roleForm.reset();
  }

  edit() {
    this.isSubmitted = true;
    if (this.roleForm.valid) {
      this._roleService.editRole(this.roleForm.value).subscribe((res: any) => {
        this._loaderService.display(true);
        if (res != undefined) {
          this.tostr.success('Success', 'Edited');
          this.isSubmitted = false;
          this.list();
        } else {
          this.tostr.error('Error occurred');
        }
      this._loaderService.display(false);
      }, (err => {
        this.tostr.error(err, 'Error');
      this._loaderService.display(false);
      }))
    }
  }

  onDelete(row: any) {
    Swal.fire({
      title: 'Delete ' + row.name + ' ?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00c292',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: any) => {
      if (result.value) {
         this._roleService.delRole(row.id).subscribe(
          (res: any) => {
            if (res == true) {
              Swal.fire(
                'Deleted!',
                row.name + ' has been deleted.',
                'success'
              )
              this.list();
            } else {
              Swal.fire(
                'error in delete!',
                row.name + ' has not been deleted.',
                'error'
              )
            }
          }
        );
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RoleService } from 'src/app/services/role.service';
import { CrudModeEnum } from 'src/app/shared/models/enums/crude-mode.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit{
public adminForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    roleId: new FormControl(null),
    roleName: new FormControl(null),
    isDeleted: new FormControl(false)
  });
  isSubmitted = false;
  rows = [];
  crudMode = CrudModeEnum.Add;
  dropdownOptions: any[] = [];
  config: any = {
    displayKey: 'name', // if objects array passed which key to be displayed defaults to description
    search: true, // true/false for the search functionlity defaults to false,
    height: 'auto', // height of the list so that if there are more no of items it can show a 
    // scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select Role', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => { }, // a custom function using which user wants to sort the items.
    //           default is undefined and Array.sort() will be used in that case,
    limitTo: this.dropdownOptions.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'name' // key on which search should be performed this will be selective search.
    // if undefined this will be extensive search on all keys
  };

  constructor(private _loaderService: LoaderService, private _adminService: AdminService,
    private tostr: ToastrService, private _roleService: RoleService
  ){
  }

  list(){
    this._loaderService.display(true);
    this._adminService.listAdmins().subscribe(
      (res: any) => {
        if (res != undefined) {
          this.rows = res;
          // this.rows.every((admin: any) =>{
          //   admin.roleName = this.dropdownOptions.find(r => r.id == admin.roleId).name;
          // });
        } else {
          this.tostr.error('Error occurred');
        }
        this._loaderService.display(false);
      }, (err) => {
        this._loaderService.display(false);
      })
  }

  ngOnInit() {
    this.fillRolesDD();
    this.list();
  }

  create(){
    this.isSubmitted = true;
    if (this.adminForm.valid) {
      this._loaderService.display(true);
      console.log('this.adminForm.value',this.adminForm.value);
      this._adminService.addAdmin(this.adminForm.value).subscribe((res: any) => {
        if (res != undefined) {
          this.tostr.success('Success', 'Added');
          this.adminForm.reset();
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
    if(this.adminForm != null)
    {
      this.adminForm.get('id')!.setValue(row.id);
      this.adminForm.get('name')!.setValue(row.name);
      this.adminForm.get('email')!.setValue(row.email);
      this.adminForm.get('roleId')!.setValue(+row.roleId);
      this.adminForm.get('roleName')!.setValue({id: +row.roleId, name: row.roleName});
    }
  }

  cancel(){
    this.crudMode = CrudModeEnum.Add;
    this.adminForm.reset();
  }

  edit() {
    this.isSubmitted = true;
    if (this.adminForm.valid) {
      this._adminService.editAdmin(this.adminForm.value).subscribe((res: any) => {
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
         this._adminService.delAdmin(row.id).subscribe(
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

  selectionChangedRole(e: any) {
    if (e.value) {
      this.adminForm.get('roleId')!.setValue(e.value.id);
    }
  }

  fillRolesDD(){
    this._roleService.listRoles().subscribe(
      (res: any) => {
        if (res != undefined) {
          this.dropdownOptions = res;
        } else {
          this.tostr.error('Error occurred');
        }
        this._loaderService.display(false);
      }, (err) => {
        this._loaderService.display(false);
      })
  }
}

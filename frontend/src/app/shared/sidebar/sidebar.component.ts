import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FilesServicesService } from 'src/app/component/services/files-services.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
 
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[]=[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private fileService:FilesServicesService,
    private toastr: ToastrService
  ) {}

  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }

  
  uploadImage(e:any) {
    console.log(e);
    const formData = new FormData();
    formData.append('document', e.target.files[0]);
    this.toastr.info('Uploading Photo, Please Be patient');
    this.fileService.uploadfile(formData).subscribe(
      (result) => {
        console.log(result);
        
        this.toastr.success('Uploaded Successfuly!');
        window.location.reload();
      },
      (e) => this.toastr.error("error an error",e)
      // 
    );
  }

  

}

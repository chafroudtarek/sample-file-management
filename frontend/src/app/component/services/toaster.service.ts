import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';






@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  error(message:string, timeOut = 3000) {
      this.toastr.error('', message, { timeOut: timeOut, positionClass: 'toast-bottom-right' });
  }

  success(message :string, timeOut = 3000) {
      this.toastr.success('', message, { timeOut: timeOut, positionClass: 'toast-bottom-right' });
  }

  info(message : string, timeOut = 3000) {
      this.toastr.info('', message, { timeOut: timeOut, positionClass: 'toast-bottom-right' });
  }
}

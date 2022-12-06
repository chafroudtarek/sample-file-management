import { Component, AfterViewInit} from '@angular/core';
import { FilesServicesService } from '../component/services/files-services.service';



@Component({
  templateUrl: './dashboard.component.html'
})




export class DashboardComponent implements AfterViewInit {
   units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   
  fileSchema   = {
   
    _id :'',
    filename:'',
    size:'',
    createdAt:''

  }
  perimage: any =0;
  sizeimage: string ='';
  pervideo: any =0;
  sizevideo: string ='';
  perdoc: any =0;
  sizedoc: string ='';
  nbstarredfile: string ='';
  nbarchivedfile: string ='';
  recentfiles:  object[] = [];

  constructor(private fileService:FilesServicesService) {
    this.getStarredfiles();
    this.getArchivedfiles();
    this.getrecentfiles();
    this.getSize();
    
   }

  ngOnInit(): void {
  }
  
  getSize(){
    this.fileService.getSize().subscribe(
      (res)=>{
       
        // calculate remaining space en % for vedios
        this.pervideo = ((res.response[0].video.currSize/res.response[0].video.maxSize)*100).toFixed(0)
        this.sizevideo=this.convertBytes(res.response[0].video.currSize)
        
         // calculate remaining space en % for documents
        this.perdoc = ((res.response[0].document.currSize/res.response[0].document.maxSize)*100).toFixed(0)
        this.sizedoc=this.convertBytes(res.response[0].document.currSize)

         // calculate remaining space en % for images
        this.perimage = ((res.response[0].image.currSize/res.response[0].image.maxSize)*100).toFixed(0)
        this.sizeimage=this.convertBytes(res.response[0].image.currSize)
       
     

      },
      (error)=>{
        console.error("recent files error:",error)
      }
    )
  }


  getrecentfiles(){
    this.fileService.getRecentsfiles().subscribe(
      (res)=>{
 
        
        for (let i = 0; i < res.response.length; i ++ ) {
         
          this.fileSchema._id = res.response[i]._id;
          this.fileSchema.filename = res.response[i].filename;
          this.fileSchema.createdAt = res.response[i].createdAt;
          this.fileSchema.size = this.convertBytes(res.response[i].size);

          this.recentfiles.push(this.fileSchema)
          this.fileSchema =  {
            _id :'',
            filename:'',
            size:'',
            createdAt:''
          }
      }

      

      },
      (error)=>{
        console.error("recent files error:",error)
      }
    )
  }
  
  getStarredfiles(){
    this.fileService.getStarredfiles().subscribe(
      (res)=>{
        
        this.nbstarredfile = res.response.length
        

      },
      (error)=>{
        console.error("starred error:",error)
      }
    )
  }

  getArchivedfiles(){
    this.fileService.getArchivedfiles().subscribe(
      (res)=>{
        
        this.nbarchivedfile = res.response.length
     

      },
      (error)=>{
        console.error("starred error:",error)
      }
    )
  }
  
 
  convertBytes(x:any){
  
    let l = 0, n = parseInt(x, 10) || 0;
  
    while(n >= 1024 && ++l){
        n = n/1024;
    }
    
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + this.units[l]);
  }


  ngAfterViewInit() {}
}

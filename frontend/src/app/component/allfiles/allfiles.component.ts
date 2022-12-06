import { Component, OnInit } from "@angular/core";
import { FilesServicesService } from "../services/files-services.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-allfiles",
  templateUrl: "./allfiles.component.html",
  styleUrls: ["./allfiles.component.css"],
})
export class AllfilesComponent implements OnInit {
  allfiles: object[] = [];
  units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  fileSchema = {
    _id: "",
    filename: "",
    size: "",
    createdAt: "",
  };
  constructor(
    private fileService: FilesServicesService,
    private toastr: ToastrService
  ) {
    this.getallfiles();
  }

  ngOnInit(): void {}

  getallfiles() {
    this.fileService.getAllfiles().subscribe(
      (res) => {
        for (let i = 0; i < res.response.length; i++) {
          this.fileSchema._id = res.response[i]._id;
          this.fileSchema.filename = res.response[i].filename;
          this.fileSchema.createdAt = res.response[i].createdAt;
          this.fileSchema.size = this.convertBytes(res.response[i].size);

          this.allfiles.push(this.fileSchema);
          this.fileSchema = {
            _id: "",
            filename: "",
            size: "",
            createdAt: "",
          };
        }
        console.log("get all files", this.allfiles);
      },
      (error) => {
        console.error("get all error:", error);
      }
    );
  }
  archived(id: string) {
    this.fileService.archivedFile(id).subscribe(
      (res) => {
        console.log("archived successfully", res.response);
        this.toastr.success(" Archived successfully ");
      },
      (err) => {
        console.log("error ", err);
        this.toastr.error(" Archived  Failed !! ");
      }
    );
  }

  starred(id: string) {
    this.fileService.starredFile(id).subscribe(
      (res) => {
        console.log("starred successfully", res.response);
        this.toastr.success(" Starred successfully ");
      },
      (err) => {
        console.log("error ", err);
        this.toastr.error(" Starred failed !! ");
      }
    );
  }
  convertBytes(x: any) {
    let l = 0,
      n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
      n = n / 1024;
    }

    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + this.units[l];
  }

  deletefile(id: string) {
    this.fileService.deletefile(id).subscribe(
      (res) => {
        console.log("deleted successfully", res.response);
        this.allfiles = [];
        this.toastr.success(" Deleted successfully ");
        this.getallfiles();
      },
      (err) => {
        this.toastr.error(" Deleted Failed ");
        console.log("error in deleting", err);
      }
    );
  }

  sort(event: any) {
    this.fileService.sort(event).subscribe(
      (res) => {
        this.allfiles = [];
        for (let i = 0; i < res.response.length; i++) {
          this.fileSchema._id = res.response[i]._id;
          this.fileSchema.filename = res.response[i].filename;
          this.fileSchema.createdAt = res.response[i].createdAt;
          this.fileSchema.size = this.convertBytes(res.response[i].size);

          this.allfiles.push(this.fileSchema);
          this.fileSchema = {
            _id: "",
            filename: "",
            size: "",
            createdAt: "",
          };
        }
        console.log("sort successfully", res.response);
      },
      (err) => {
        console.log("error in sort", err);
      }
    );
  }
}

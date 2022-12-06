import { Component, OnInit } from "@angular/core";
import { FilesServicesService } from "../services/files-services.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-starredfile",
  templateUrl: "./starredfile.component.html",
  styleUrls: ["./starredfile.component.css"],
})
export class StarredfileComponent implements OnInit {
  starredfiles: object[] = [];
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
    this.getStarredfiles();
  }

  ngOnInit(): void {}

  getStarredfiles() {
    this.fileService.getStarredfiles().subscribe(
      (res) => {
        this.starredfiles = [];
        for (let i = 0; i < res.response.length; i++) {
          this.fileSchema._id = res.response[i]._id;
          this.fileSchema.filename = res.response[i].filename;
          this.fileSchema.createdAt = res.response[i].createdAt;
          this.fileSchema.size = this.convertBytes(res.response[i].size);

          this.starredfiles.push(this.fileSchema);
          this.fileSchema = {
            _id: "",
            filename: "",
            size: "",
            createdAt: "",
          };
        }

        console.log("starred files", this.starredfiles);
      },
      (error) => {
        console.error("starred error:", error);
      }
    );
  }
  deletefile(id: string) {
    this.fileService.unstarredFile(id).subscribe(
      (res) => {
        console.log("deleted successfully", res.response);
        this.toastr.success(" unstarred successfully ");
        this.getStarredfiles();
      },
      (err) => {
        console.log("error in deleting", err);
        this.toastr.error(" unstarred failed !! ");
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
}

import { Component, OnInit } from "@angular/core";
import { FilesServicesService } from "../services/files-services.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-archivedfile",
  templateUrl: "./archivedfile.component.html",
  styleUrls: ["./archivedfile.component.css"],
})
export class ArchivedfileComponent implements OnInit {
  archivedfiles: object[] = [];
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
    this.getarchivedfiles();
  }

  ngOnInit(): void {}

  getarchivedfiles() {
    this.fileService.getArchivedfiles().subscribe(
      (res) => {
        this.archivedfiles = [];
        for (let i = 0; i < res.response.length; i++) {
          this.fileSchema._id = res.response[i]._id;
          this.fileSchema.filename = res.response[i].filename;
          this.fileSchema.createdAt = res.response[i].createdAt;
          this.fileSchema.size = this.convertBytes(res.response[i].size);

          this.archivedfiles.push(this.fileSchema);
          this.fileSchema = {
            _id: "",
            filename: "",
            size: "",
            createdAt: "",
          };
        }
        console.log("starred files", this.archivedfiles);
      },
      (error) => {
        console.error("archived error:", error);
      }
    );
  }
  deletefile(id: string) {
    this.fileService.unarchivedFile(id).subscribe(
      (res) => {
        console.log("deleted successfully", res.response);

        this.toastr.success(" Deleted successfully ");
        this.getarchivedfiles();
      },
      (err) => {
        this.toastr.error(" Deleted Failed ");
        console.log("error in deleting", err);
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

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { BrowserModule } from "@angular/platform-browser";

import { StarredfileComponent } from "./starredfile/starredfile.component";
import { ArchivedfileComponent } from "./archivedfile/archivedfile.component";
import { AllfilesComponent } from "./allfiles/allfiles.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  declarations: [
    StarredfileComponent,
    ArchivedfileComponent,
    AllfilesComponent,
  ],
})
export class ComponentsModule {}

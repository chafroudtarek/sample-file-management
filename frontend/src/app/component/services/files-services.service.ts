import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FilesServicesService {
  constructor(private http: HttpClient) {}

  /**
   * GET size
   * @param none
   * @return size
   */
  getSize(): Observable<any> {
    return this.http.get<any>(`http://localhost:1919/api/file/size`);
  }

  /**
   * GET all files
   * @param none

   * @return files
   */
  getAllfiles(): Observable<any> {
    return this.http.get<any>(`http://localhost:1919/api/file/getallfiles`);
  }

  /**
   * GET last 5 files
   * @param none

   * @return 5 files
   */
  getRecentsfiles(): Observable<any> {
    return this.http.get<any>(`http://localhost:1919/api/file/getrecents`);
  }

  /**
   * GET starred files
   * @param none

    * @return all starred files
    */
  getStarredfiles(): Observable<any> {
    return this.http.get<any>(`http://localhost:1919/api/file/getStarredfile`);
  }

  /**
   * GET archived files
   * @param none

   * @return all archved files
   */
  getArchivedfiles(): Observable<any> {
    return this.http.get<any>(`http://localhost:1919/api/file/getArchivedfile`);
  }

  /**
   * DELETE file
   * @param none

   * @return deleted file
   */
  deletefile(id: string): Observable<any> {
    return this.http.delete(`http://localhost:1919/api/file/deletefile/${id}`);
  }

  /**
   * PUT make file starred
   * @param none

   * @return  starred file
   */
  starredFile(id: string): Observable<any> {
    return this.http.put<any>(
      `http://localhost:1919/api/file/starred/${id}`,
      {}
    );
  }

  /**
   * PUT make file unstarred
   * @param none

   * @return  unstarred file
   */
  unstarredFile(id: string): Observable<any> {
    return this.http.put<any>(
      `http://localhost:1919/api/file/unstarred/${id}`,
      {}
    );
  }

  /**
   * PUT make file archived
   * @param none

   * @return  archived file
   */
  archivedFile(id: string): Observable<any> {
    return this.http.put<any>(
      `http://localhost:1919/api/file/archived/${id}`,
      {}
    );
  }

  /**
   * PUT make file unarchived
   * @param none
   * @return  unarchived file
   */
  unarchivedFile(id: string): Observable<any> {
    return this.http.put<any>(
      `http://localhost:1919/api/file/unarchived/${id}`,
      {}
    );
  }

  /**
   * POST upload file
   * @param file
   * @return  file
   */
  uploadfile(file: any) {
    return this.http.post(`http://localhost:1919/api/file/upload`, file);
  }

  /**
   * GET sort files
   * @param none
   * @return  sorted files
   */
  sort(type?: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:1919/api/file/sort?type=${type}`
    );
  }
}

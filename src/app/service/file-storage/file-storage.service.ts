import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileStorageService {
  baseUrl = 'https://localhost:7029/api/storage';
  accountName = environment.storage.accountName;
  constructor(private http: HttpClient) {}

  getDetail(options: {
    containerName: string;
    fileName: string;
    includeTags: boolean;
  }) {
    const { containerName, fileName, includeTags } = options;
    const url = `${this.baseUrl}/detail`;
    const params = new HttpParams()
      .set('ContainerName', containerName)
      .set('FileName', fileName)
      .set('includeTags', includeTags ?? false);
    params.append('includeTags', includeTags);
    console.log(`delete { url, params }`, { url, params });
    return this.http.get<{
      name: string;
      resource: string;
      tags: { key: string; value: string }[];
    }>(url, { params });
  }

  delete(containerName: string, fileName: string) {
    /* const formData = new FormData();
    formData.append('ContainerName', containerName);
    formData.append('FileName', fileName);
    formData.append(
      'Uri',
      'https://vorbastore1.blob.core.windows.net/public/JA_burger5.jpg'
    ); */
    const url = `${this.baseUrl}/delete`;
    const params = new HttpParams()
      .set('ServiceName', this.accountName) // todo: refactor this to environment config prop
      .set('ContainerName', containerName)
      .set('FileName', fileName)
      .set(
        'Uri',
        'https://vorbastore1.blob.core.windows.net/public/JA_burger5.jpg'
      );
    console.log(`delete { url, params }`, { url, params });
    return this.http.delete<{ path: string }>(url, { params });
  }

  search(search: string, containerName: string = 'public') {
    const params = new HttpParams()
      .set('ServiceName', this.accountName) // todo: refactor this to environment config prop
      .set('ContainerName', containerName) // todo: refactor this to environment config prop
      .set('SearchExpression', search);
    const url = `${this.baseUrl}/search`;
    return this.http.get<{ files: any[] }>(url, { params });
  }

  upload(formData: FormData) {
    const url = `${this.baseUrl}/upload`;
    return this.http.post<{ path: string }>(url, formData);
  }
}

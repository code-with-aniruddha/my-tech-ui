import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

@Injectable()
export class ApiService {
    constructor(
        private _httpClient: HttpClient
    ){}
    createUser(reqBody): Observable<any> {
        return this._httpClient.post<any>('http://localhost:3000/api/users/signup', reqBody);
            // .pipe(catchError(this.handleErr('getFlightInfo', [])));
    }

    createSpecility(reqBody): Observable<any> {
        return this._httpClient.post<any>('http://localhost:8080/api/specility', reqBody);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http'
import { environment } from 'src/environments/environments';
import { CreatePokemonDTO, Pokemon, UpdatePokemonDTO } from 'src/app/models/pokemon.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url = environment.url
  
  constructor(
    private http: HttpClient
  ) {}
  
  getAll(){
    // let params = new HttpParams();
    // if (limit && offset) {
    //   params = params.set('limit', limit);
    //   params = params.set('offset', limit);
    // }
    return this.http.get<Pokemon[]>(`${this.url}/?idAuthor=1`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('404 => The idAuthor is missing');
        }
        if (error.status === HttpStatusCode.BadRequest) {
          return throwError('400 => --');
        }
        return throwError('Error');
      })
    )
  }

  // getPokemon(id:number){
  //   return this.http.get<Pokemon[]>(`${this.url}/${id}`)
  //   .pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === HttpStatusCode.NotFound) {
  //         return throwError('404 => Pokemon not found');
  //       }
  //       if (error.status === HttpStatusCode.BadRequest) {
  //         return throwError('400 => Bad Request');
  //       }
  //       return throwError('Error');
  //     })
  //   )
  // }
  
  create(dto:CreatePokemonDTO){
    return this.http.post<Pokemon>(this.url, dto)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Ok) {
          return throwError(dto);
        }
        if (error.status === HttpStatusCode.PaymentRequired) {
          return throwError('402 => { success: false, type: "name_missing", data: "The name is missing" }');
        }
        if (error.status === HttpStatusCode.BadRequest) {
          return throwError('400 => --');
        }
        return throwError('Error');
      })
    )
  }
  
  update(id: number, dto: UpdatePokemonDTO){
    return this.http.put<Pokemon>(`${this.url}/${id}`, dto)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('400 => Pokemon not found');
        }
        return throwError('Error');
      })
    )
  }

  delete(id:number){
    return this.http.delete<boolean>(`${this.url}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Ok) {
          return throwError('402 => --');
        }
        if (error.status === HttpStatusCode.BadRequest) {
          return throwError('400 => --');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('400 => Pokemon not found');
        }
        return throwError('Error');
      })
    )
  }
}

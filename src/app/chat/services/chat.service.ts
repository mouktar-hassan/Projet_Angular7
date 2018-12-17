import { Injectable } from '@angular/core';
import { Message } from '../models/message'
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Array<Message>;
  constructor(private http: HttpClient) { 
    this.messages = new Array<Message>();
  }

   //pour stocker les message de l'api sur un array de type sans état
  public buildMessages(resultats: Array<any>): Array<Message> {
    const messages = [];
    if (resultats != null) {
    for (const result of resultats) {
    const message = new Message(result);
    messages.push(message);
    }
    }
    return messages;
    }
    //pour récupérer la liste des messages de l’API et qui renvoit un Observable
    public getMessages(): Observable<Array<Message>> {
    return new Observable<Array<Message>>((observer) => {
    this.http.get<Array<any>>('https://jsonplaceholder.typicode.com/posts')
    .subscribe(
    (messages) => {
    this.messages = this.buildMessages(messages);
    observer.next(this.messages);
    },    (error) => observer.error(error),
() => observer.complete()
);
});
}
  //pour ajouter un message
  public addMessage(message: Message):Observable<Array<Message>>{
    this.messages.push(message);
    return of(this.messages); // angular 6
    // sinon : return Observable.of()
    }
}

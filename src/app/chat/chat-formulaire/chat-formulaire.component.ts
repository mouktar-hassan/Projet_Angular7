import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat-formulaire',
  templateUrl: './chat-formulaire.component.html',
  styleUrls: ['./chat-formulaire.component.scss']
})
export class ChatFormulaireComponent implements OnInit {

  public texte: string;
  //un composant qui va permetre d’émettre des évènements qui seront attrapés par 
  //le composant parent de chat-formulaire
  @Output() nouveauMessage: EventEmitter<Message>;
constructor() {
  this.nouveauMessage = new EventEmitter<Message>();
}
ngOnInit() {
this.texte = '';
}
public envoyer(): void {
const message = new Message();
message.auteur = 'Mouktar';
message.date = new Date();
message.texte = this.texte;
//pour émettre l’événement nouveauMessage
this.nouveauMessage.emit(message);
}
}
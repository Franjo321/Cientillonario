import { Injectable } from '@angular/core';
import { Pregunta } from './pregunta';

@Injectable()
export class Preguntas {
  preguntas: Pregunta[] = new Array<Pregunta>();
}

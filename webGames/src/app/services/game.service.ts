import { Injectable } from '@angular/core';
import { Card } from '../interfaces/models';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { concat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  suits = ['heart', 'diamond', 'club', 'spade'];
  colors = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'black', 'gray'];
  wordleWords = [
    "ABETO", "ABRAS", "ABRIA", "ACERA", "ACTOR", "ACUDO", "AGUDO", "AGUAS", "ALADO", "ALBAS", "ALTAR", "ALTOS", "AMADO", "AMBAR", "ANTES", "ANTON", "ANUAL", "APOYO", "APRES", "ARADO", "ARCOS", "ARENA", "ARIDO", "ARMAS", "AROMA", "ARPAS", "ASADO", "ASILO", "ASNOS", "ASTRO", "ATADO", "ATIZA", "ATIZO", "ATLAS", "AUTOR", "AVALA", "AVION", "AVISO", "AYUDA", "AZOTE", "AZUCA", "AZUL",
    "BABAS", "BACAS", "BACHE", "BAJAS", "BAJES", "BALAS", "BARDO", "BARRO", "BEBES", "BELEN", "BERTO", "BICHO", "BIZCO", "BLUSA", "BOLAS", "BONOS", "BOTAS", "BUENO", "BURRO", "BUSCA", "BUTAN", "BUTEO", "BUTIR", "BUTIS", "BUTOS", "BUTRE",
    "CABAL", "CABAS", "CABEN", "CABER", "CABIA", "CABRA", "CAFES", "CAJAS", "CALAR", "CALAS", "CALCA", "CALLA", "CALMA", "CALOR", "CAMBA", "CAMPO", "CANAS", "CANTOS", "CAPTO", "CARAS", "CARLO", "CARRO", "CASAS", "CATAR", "CAIDA", "CEJAS", "CELIA", "CENAS", "CEPAS", "CERCA", "CABRA", "CAFES", "CAJAS", "CALAR", "CALAS", "CALCA", "CALLA", "CALMA", "CAMBA", "CAMPO", "CANAS", "CANTOS", "CAPTO", "CARAS", "CARLO", "CARRO", "CASAS", "CATAR", "CAIDA", "CEJAS", "CELIA", "CENAS", "CEPAS", "CERCA", "CERCO", "CERDO", "CHILE", "CHINA", "CIEGO", "CINES", "CITAS", "CLARA", "CLAVO", "COLAS", "COLON", "CORAL", "CORAS", "COREA", "CORRO", "COSAS", "COSTO", "CRUDO", "CURAR",
    "DADOS", "DAGAS", "DATOS", "DANOS", "DEJAR", "DEJES", "DENSO", "DICES", "DIVOS", "DOTES", "DUNAS", "DURES", "DUROS",
    "ELLOS", "ECHAS", "EDITO", "ELEVO", "EMULE", "EMULO", "ENOJE", "ERROR", "ESTAS",
    "FALLO", "FALTO", "FERIA", "FETOS", "FIJOS", "FILAS", "FILIA", "FINCA",
    "GAFAS", "GALAS", "GALES", "GALOS", "GANAS", "GANES", "GASES", "GASTO", "GIRAS", "GORDO", "GORRO", "GRAVE", "GRITO",
    "HACER", "HALOS", "HASTA", "HECES", "HIELO",
    "IDEAS", "INDIA", "INFLO", "ISLAS",
    "JAPON", "JEFAS", "JERGA", "JOSUE", "JULIO",
    "LABIO", "LADOS", "LAGOS", "LAMER", "LANAS", "LARGO", "LASAS", "LATAS", "LAVAR", "LECHE", "LEJOS", "LEMAS", "LENTO", "LEONA", "LETRA", "LIBRO", "LINDA", "LIRIO", "LISTA", "LITRO", "LLAMA", "LLENO", "LLORO", "LUCHA", "LUGAR", "LUISA", "LUNAS", "LUZCO",
    "MALOS", "MANIA", "MARCA", "MARCO", "MARTI", "MARIA", "MELON", "MENOS", "METER", "METRO", "MOLER", "MONTE", "MORIR",
    "NACER", "NADAR", "NARRO", "NATAS", "NAVES", "NECIO", "NINOS", "NOTAS", "NUBES",
    "OBRAS", "OCIOS", "OLLAS", "ONDAS", "ONZAS", "OPERA", "OTROS", "OVULO", "OIRTE",
    "PALAS", "PARIS", "PEDIR", "PELEA", "PELOS", "PERAS", "PERRO", "PESOS", "PILAS", "PINTO", "PODER", "PLATO", "PLAZA", "POCAS", "POETA", "POLLA", "PORRO", "PULIR", "PUROS", "PAJAS", "PANZA", "PAPAS", "PARES", "PASAR", "PASOS", "PASTA",
    "QATAR", "QUEDO", "QUEMA", "QUITO", "QUESO",
    "RELOJ", "RUBIO", "RASCO", "RATAS", "RATOS", "REDES", "REMAR", "RENOS", "RENTA",
    "SALAS", "SALTO", "SANTO", "SAPOS", "SARTA", "SAVIA", "SECAR", "SEDAL", "SENAL", "SERES", "SILLA", "SIRIO", "SITIO", "SOBRE", "SUAVE", "SUENO", "SUFRO",
    "TABLA", "TACOS", "TALAR", "TALLA", "TALLO", "TAPAS", "TECHO", "TEJAS", "TENIS", "TERCO", "TEXTO", "TIGRE", "TOCAR", "TOMAR", "TORRE", "TRAJE", "TRIPA", "TROPA", "TULIO", "TURNO",
    "UBICO", "UFANO", "UJIER", "ULTRA", "UNIDO", "UNTAR", "URDIR", "URGIR", "USADO", "USTED", "UTILO",
    "VACAS", "VAGOS", "VALER", "VALOR", "VECES", "VEDAS", "VELAS", "VEMOS", "VENAS", "VENIR", "VERDE", "VIERA", "VIGAS", "VINOS", "VIVIR", "VOLAR", "VOTAR",
    "YATES", "YEMAS", "YEMEN", "YENDO", "YENES", "YESCA", "YOGUR", "YUGOS",
    "ZAFOS", "ZAGAL", "ZANJA", "ZARCO", "ZARPA", "ZONAS", "ZORRO", "ZURDO", "ZURRA"
  ]
  hangmanWords = [
    'MANZANA', 'ELEFANTE', 'COMPUTADORA', 'GUITARRA', 'MARIPOSA',
    'VENTANA', 'JIRAFA', 'MURCIELAGO', 'ASTRONAUTA', 'RELAMPAGO',
    'ESPEJO', 'BICICLETA', 'CANGREJO', 'ZAPATO', 'BOSQUE',
    'CABALLO', 'PANTALLA', 'CAMISETA', 'PISTACHO', 'TELEFONO',
    'FUTBOL', 'AVION', 'PLANETA', 'ANTENA', 'RINCON',
    'SILLA', 'TIBURON', 'PELICULA', 'BARCO', 'CEREZA',
    'NARANJA', 'LUCIERNAGA', 'TORNILLO', 'CANGURO', 'RATON',
    'CAMION', 'MONTAÑA', 'VENTILADOR', 'PINTURA', 'DRAGON',
    'ALFOMBRA', 'MARATON', 'UNIVERSO', 'CIRUJANO', 'DIAMANTE',
    'SERPIENTE', 'LAGARTIJA', 'CHIMENEA', 'ESCALERA'
  ];

  constructor() { }


  //
  generateBlackjackDeck() {
    let deck: Card[] = [];

    this.suits.forEach(suit => {
      let color = (suit == 'heart' || suit == 'diamond') ? 'red' : 'black';
      let cards = this.generateSwit(suit, color);
      deck = deck.concat(cards);
    });

    return this.shuffle(deck);
  }


  //
  generateRandomWordleWord() {
    return this.wordleWords[Math.floor(Math.random() * this.wordleWords.length)];
  }

  generateRandomHangmanWord() {
    return this.hangmanWords[Math.floor(Math.random() * this.hangmanWords.length)];
  }

  //
  generateMemoryDeck(quantity: number = 20) {
    let colors = this.shuffle(this.colors);
    let deck: Card[] = [];

    while (deck.length < quantity) {
      let suit = this.suits[Math.floor(Math.random() * this.suits.length)];
      let color = colors.pop()!;

      let card = {
        value: 1,
        name: '',
        suit: suit,
        color: color,
        isHidden: false,
        selected: false
      };

      deck.push(card, { ...card });
    }

    return this.shuffle(deck);
  }


  //
  generateSwit(suit: string, color: string): Card[] {
    let cards: Card[] = [];

    for (let index = 2; index <= 10; index++) {
      let card: Card = { value: index, name: index.toString(), suit: suit, color: color, isHidden: false, selected: false };
      cards.push(card);
    }

    let figures = ['J', 'Q', 'K'];
    for (let index = 0; index < figures.length; index++) {
      let card: Card = { value: 10, name: figures[index], suit: suit, color: color, isHidden: false, selected: false };
      cards.push(card);
    }

    let cardA: Card = { value: 11, name: 'A', suit: suit, color: color, isHidden: false, selected: false };
    cards.push(cardA);

    return cards;
  }

  generateDices(quatity: number = 5) {
    let dices = [];
    for (let index = 0; index < quatity; index++) {
      dices.push({ value: 0, selected: false });
    }
    
    return dices;
  }


  //
  shuffle(list: any[]) {
    for (let index = list.length - 1; index > 0; index--) {
      const newIndex = Math.floor(Math.random() * (index + 1));
      [list[index], list[newIndex]] = [list[newIndex], list[index]];
    }

    return [...list];
  }


  //
  async setDelay(ms: number = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  //
  sendAlert(title: string, text: string, icon: SweetAlertIcon = 'info') {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Ok'
    });
  }

}

import { Injectable } from '@angular/core';
import { Card, MineSweeperBlock, Ship } from '../interfaces/models';
import Swal, { SweetAlertIcon } from 'sweetalert2';

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
  battleshipPieces: Ship[] = [
    { name: 'Portaaviones', size: 5, rowCoordinate: 0, colCoordinate: 0, isSunk: false, model: 'P', vertical: false },
    { name: 'Buque de guerra', size: 4, rowCoordinate: 0, colCoordinate: 0, isSunk: false, model: 'B', vertical: false },
    { name: 'Destructor', size: 3, rowCoordinate: 0, colCoordinate: 0, isSunk: false, model: 'D', vertical: false },
    { name: 'Submarino', size: 2, rowCoordinate: 0, colCoordinate: 0, isSunk: false, model: 'S', vertical: false }
  ];
  mineSweeperGrid: MineSweeperBlock[][] = [];

  gameCards = [
    { title: 'Generala', description: 'Juego de dados por turnos donde se busca lograr combinaciones específicas para sumar puntos, como poker o escalera.', image: 'generala.jpeg', route: '/generala' },
    { title: 'Blackjack', description: 'Juego de cartas donde el objetivo es sumar 21 sin pasarse, compitiendo contra el crupier.', image: 'blackjack.png', route: '/blackjack' },
    { title: 'Solitario', description: 'Clásico juego de cartas para un jugador, donde se organiza la baraja en secuencia y por palo.', image: 'solitary.png', route: '/solitary' },
    { title: 'Ahorcado', description: 'Clásico pasatiempo de adivinanza de palabras letra por letra antes de que se complete el dibujo de un ahorcado.', image: 'hangman.png', route: '/hangman' },
    { title: 'Buscaminas', description: 'Juego de lógica donde se descubre un campo minado sin detonar bombas, deduciendo su ubicación con pistas numéricas.', image: 'minesweeper.png', route: '/minesweeper' },
    { title: 'Batalla Naval', description: 'Juego de estrategia por turnos donde los jugadores intentan hundir la flota enemiga adivinando las coordenadas de sus barcos ocultos.', image: 'battleship.png', route: '/battleship' }, 
    { title: 'Memoria', description: 'Desafío para la concentración donde se deben encontrar pares de cartas iguales volteándolas por turnos.', image: 'memory.png', route: '/memory' },
    { title: 'Wordle', description: 'Juego de palabras donde se intenta adivinar una palabra de cinco letras en seis intentos, con pistas de colores.', image: 'wordle.png', route: '/wordle' },
    { title: 'Sudoku', description: 'Rompecabezas numérico en el que se completan celdas con cifras del 1 al 9 sin repetir en filas, columnas ni bloques.', image: 'sudoku.png', route: '/sudoku' },
    { title: 'Ta Te Ti', description: 'Juego de estrategia rápida en el que dos jugadores intentan alinear tres símbolos iguales en una cuadrícula 3x3.', image: 'tictactoe.png', route: '/tictactoe' },
    { title: 'Ajedrez', description: 'Juego de estrategia por turnos entre dos jugadores, donde el objetivo es dar jaque mate al rey rival.', image: 'chess.png', route: '/chess' },
    { title: 'Crucigrama', description: 'Pasatiempo de palabras donde se completan casillas con términos a partir de definiciones dadas, cruzándolos entre sí.', image: 'crosswords.png', route: '/crosswords' },
    { title: 'Cuatro en linea', description: 'Juego de estrategia para dos jugadores que consiste en alinear cuatro fichas del mismo color en fila, columna o diagonal dentro de una rejilla vertical antes que el oponente.', image: 'fourinline.png', route: '/fourinline' },]

  constructor() { }


  //
  getGameCards() {
    return this.gameCards;
  }


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
  generateSolitaryDeck() {
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


  //
  generateDices(quatity: number = 5) {
    let dices = [];
    for (let index = 0; index < quatity; index++) {
      dices.push({ value: 0, selected: false });
    }

    return dices;
  }


  //
  generateBattleshipPieces(carrierQuantity: number = 1, battleshipQuantity: number = 1, destroyerQuantity: number = 2, submarineQuantity: number = 3) {
    let pieces = [];

    let battleshipPieces = this.battleshipPieces.map(piece => ({ ...piece }));

    for (let index = 0; index < carrierQuantity; index++) pieces.push({...battleshipPieces[0]});
    for (let index = 0; index < battleshipQuantity; index++) pieces.push({...battleshipPieces[1]});
    for (let index = 0; index < destroyerQuantity; index++) pieces.push({...battleshipPieces[2]});
    for (let index = 0; index < submarineQuantity; index++) pieces.push({...battleshipPieces[3]});
    
    return pieces;
  }


  //
  generateBattleshipGrid(rows: number = 10, cols: number = 10, ships: Ship[] = []) {
    let grid: string[][] = [];

    for (let col = 0; col < cols; col++) {
      grid[col] = [];

      for (let row = 0; row < rows; row++) {
        grid[col].push('');
      }
    }

    if (ships.length > 0) {
      for (let index = 0; index < ships.length; index++) {
        let ship = ships[index];
        let available = true;

        do {
          available = true;
          ship.vertical = Math.random() < 0.5;
          ship.rowCoordinate = ship.vertical ? Math.floor(Math.random() * rows) : Math.floor(Math.random() * (rows - (ship.size + 1)));
          ship.colCoordinate = ship.vertical ? Math.floor(Math.random() * (cols - (ship.size + 1))) : Math.floor(Math.random() * cols);

          for (let i = 0; i < ship.size; i++) {
            if (ship.vertical) {
              if (grid[ship.colCoordinate + i][ship.rowCoordinate] !== '') {
                available = false;
                break;
              }
            } else {
              if (grid[ship.colCoordinate][ship.rowCoordinate + i] !== '') {
                available = false;
                break;
              }
            }
          }
        } while (!available);

        for (let i = 0; i < ship.size; i++) {
          if (ship.vertical) {
            if (grid[ship.colCoordinate + i][ship.rowCoordinate] !== '') {
              break;
            }
            grid[ship.colCoordinate + i][ship.rowCoordinate] = ship.model;
          } else {
            if (grid[ship.colCoordinate][ship.rowCoordinate + i] !== '') {
              break;
            }
            grid[ship.colCoordinate][ship.rowCoordinate + i] = ship.model;
          }
        }
      }
    }

    return grid;
  }


  //
  generateMineSweeperGrid(rows: number = 10, cols: number = 10, mines: number = 10) {
    let minesLeft = mines;

    for (let c = 0; c < cols; c++) {
      this.mineSweeperGrid[c] = [];
      for (let r = 0; r < rows; r++) {
        this.mineSweeperGrid[c].push({
          isMine: false,
          isFlagged: false,
          isRevealed: false
        });
      }
    }

    while (minesLeft > 0) {
      let randomColumn = Math.floor(Math.random() * cols);
      let randomRow = Math.floor(Math.random() * rows);

      if (!this.mineSweeperGrid[randomColumn][randomRow].isMine) {
        this.mineSweeperGrid[randomColumn][randomRow].isMine = true;
        minesLeft--;
      }
    }
    return this.mineSweeperGrid;
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
      confirmButtonText: 'Ok',
      scrollbarPadding: false,
    });
  }


  //
  requestDifficulty(options: string[]): Promise<number> {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Elige una opción",
        showConfirmButton: false,
        scrollbarPadding: false,
        allowOutsideClick: false,
        html: options.map((option, index) =>
          `<button class="swal2-confirm swal2-styled opcion-btn" data-index="${index}">${option}</button>`
        ).join(''),
        didOpen: () => {
          const botones = document.querySelectorAll<HTMLButtonElement>(".opcion-btn");
          botones.forEach(btn => {
            btn.addEventListener("click", () => {
              const index = Number(btn.getAttribute("data-index"));
              Swal.close();
              resolve(index);
            });
          });
        }
      });
    });
  }

}

import Deck from './Deck';
import Pile from './Pile';

/**
 * This class implements the core game logic.
 */
export default class Game {
  constructor() {
    this.container = document.getElementById('game-container');
    this.activeCard = null;

    this.initDeck();
    this.initBalls();
    this.initPins();
  }

  initDeck() {
    this.deck = new Deck([]);
    this.deck.pos = { x: 600, y: 100 };
    this.deck.visible = true;
    this.container.appendChild(this.deck.element);
  }

  initBalls() {
    this.balls = [];

    for (let i = 0; i < 2; i++) {
      const ball = new Pile();
      ball.pos = { x: 530 + i * 70, y: 200 };
      ball.visible = true;
      ball.onClick = () => {
        this.playBall(ball);
      };

      this.balls.push(ball);
      this.container.appendChild(ball.element);
    }
  }

  initPins() {
    this.pins = [];

    let row = 1;
    let col = 1;

    for (let i = 0; i < 10; i++) {
      const pin = new Pile();
      pin.pos = {
        x: 150 + 70 * col - 35 * row,
        y: 450 - 100 * row,
      };
      pin.visible = true;
      pin.onClick = () => {
        this.playPin(pin);
      };

      this.pins.push(pin);
      this.container.appendChild(pin.element);

      if (col === row) {
        col = 1;
        row++;
      } else {
        col++;
      }
    }
  }

  /**
   * Start a new game!
   */
  startGame() {
    this.nextFrame();
    this.draw();
  }

  /**
   * Advance to the next frame.
   */
  nextFrame() {
    this.deck.populate();
    this.deck.shuffle();

    this.balls.forEach((ball) => {
      ball.clear();
    });
    this.pins.forEach((pin) => {
      pin.clear();
    });
  }

  /**
   * Draw the next card and display it.
   */
  draw() {
    const card = this.deck.draw();
    card.pos = { x: 530, y: 100 };
    card.visible = true;
    this.container.appendChild(card.element);
    this.activeCard = card;

    const playablePiles = this.getPlayablePiles();

    // Highlight all playable piles.
    this.pins.forEach((pin) => {
      pin.highlight = playablePiles.includes(pin);
    });
    this.balls.forEach((ball) => {
      ball.highlight = playablePiles.includes(ball);
    });
  }

  /**
   * Play the active card in a ball pile.
   * @param {Pile} ball
   */
  playBall(ball) {
    const playablePiles = this.getPlayablePiles();
    if (!playablePiles.includes(ball)) {
      return;
    }

    ball.add(this.activeCard);

    // Check to throw the ball.
    if (ball.size === 3) {
      const points = this.countFilledPins();
      alert(`Scored ${points} points!`);
      if (ball === this.balls[1]) {
        this.nextFrame();
      }
    }

    this.draw();
  }

  /**
   * Play the active card in a pin pile.
   * @param {Pile} pin
   */
  playPin(pin) {
    const playablePiles = this.getPlayablePiles();

    if (!playablePiles.includes(pin)) {
      return;
    }

    pin.add(this.activeCard);

    // Check for a strike or a spare.
    if (this.countFilledPins() === 10) {
      if (this.balls[0].size < 3) {
        alert('Strike!');
      } else {
        alert('Spare!');
      }
      this.nextFrame();
    }

    this.draw();
  }

  /**
   * Return an array of piles which the active card can be played to.
   * @returns {Pile[]}
   */
  getPlayablePiles() {
    // Find the range of playable pin piles.
    const target = this.activeCard.rank;
    let lower = -1;
    let upper = this.pins.length;
    for (let i = 0; i < this.pins.length; i++) {
      const pin = this.pins[i];
      const top = pin.top;
      if (top === null) {
        continue;
      }
      if (top.rank == target) {
        return [pin];
      }
      if (top.rank < target) {
        lower = i;
      }
      if (top.rank > target && i < upper) {
        upper = i;
      }
    }

    // Pin piles
    if (lower + 1 < upper) {
      const playablePins = [];
      for (let i = lower + 1; i < upper; i++) {
        playablePins.push(this.pins[i]);
      }
      return playablePins;
    }

    // Ball piles
    for (let i = 0; i < 2; i++) {
      if (this.balls[i].size < 3) {
        return [this.balls[i]];
      }
    }

    return [];
  }

  /**
   * Count the number of nonempty pin piles.
   * @returns {number}
   */
  countFilledPins() {
    let count = 0;
    this.pins.forEach((pin) => {
      if (pin.top !== null) {
        count++;
      }
    });
    return count;
  }
}

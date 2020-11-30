import GameComponent from './GameComponent';

export const suitNames = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

/**
 * Implements a playing card from a standard 52-card deck.
 */
export default class Card extends GameComponent {
  /**
   * @param {string} suit - One of 'Clubs', 'Diamonds', 'Hearts', or 'Spades'
   * @param {number} rank - An integer on the range 1 - 13, inclusive
   */
  constructor(suit, rank) {
    super('card-template');
    this.suit = suit;
    this.rank = rank;
    this.faceUp = true;
  }

  get suit() {
    return this._suit;
  }

  set suit(suit) {
    this._suit = suit;
    const suitElement = this.element.querySelector('.suit');
    suitElement.textContent = suitSymbol(this.suit);
  }

  get rank() {
    return this._rank;
  }

  set rank(rank) {
    this._rank = rank;
    const rankElement = this.element.querySelector('.rank');
    rankElement.textContent = rankAbbreviation(this.rank);
  }

  get faceUp() {
    return this._faceUp;
  }

  /**
   * Set whether the card is face-up (revealing the suit and rank).
   */
  set faceUp(faceUp) {
    this._faceUp = faceUp;

    this.element.classList.add(faceUp ? 'card-front' : 'card-back');
    this.element.classList.remove(faceUp ? 'card-back' : 'card-front');

    const suitElement = this.element.querySelector('.suit');
    suitElement.style.display = faceUp ? 'block' : 'none';

    const rankElement = this.element.querySelector('.rank');
    rankElement.style.display = faceUp ? 'block' : 'none';
  }

  toString() {
    return `${rankName(this.rank)} of ${this._suit}`;
  }
}

/**
 * Return the full name of a rank.
 * @param {number} rank
 * @returns {string}
 */
function rankName(rank) {
  switch (rank) {
    case 1:
      return 'Ace';
    case 2:
      return 'Two';
    case 3:
      return 'Three';
    case 4:
      return 'Four';
    case 5:
      return 'Five';
    case 6:
      return 'Six';
    case 7:
      return 'Seven';
    case 8:
      return 'Eight';
    case 9:
      return 'Nine';
    case 10:
      return 'Ten';
    case 11:
      return 'Jack';
    case 12:
      return 'Queen';
    case 13:
      return 'King';
  }
}

/**
 * Return the abbreviation for a rank.
 * @param {number} suit
 * @returns {string}
 */
function rankAbbreviation(rank) {
  switch (rank) {
    case 1:
      return 'A';
    case 2:
      return '2';
    case 3:
      return '3';
    case 4:
      return '4';
    case 5:
      return '5';
    case 6:
      return '6';
    case 7:
      return '7';
    case 8:
      return '8';
    case 9:
      return '9';
    case 10:
      return '10';
    case 11:
      return 'J';
    case 12:
      return 'Q';
    case 13:
      return 'K';
  }
}

/**
 * Return the symbol for a suit.
 * @param {string} suit
 * @returns {string}
 */
function suitSymbol(suit) {
  switch (suit) {
    case 'Clubs':
      return '♣️';
    case 'Diamonds':
      return '♦️';
    case 'Hearts':
      return '♥️';
    case 'Spades':
      return '♠️';
  }
}

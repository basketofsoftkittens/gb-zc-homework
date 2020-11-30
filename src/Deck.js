import Card, { suitNames } from './Card';
import GameComponent from './GameComponent';

/**
 * Implements a deck with an arbitrary set of cards.
 */
export default class Deck extends GameComponent {
  /**
   * @param {Card[]} cards
   */
  constructor(cards) {
    super('deck-template');
    this.cards = cards;
    this.updateCardCounter();
  }

  /**
   * Update the displayed counter to reflect the remaining number of cards.
   */
  updateCardCounter() {
    const counterElement = this.element.querySelector('.deck-counter');
    counterElement.textContent = this.cards.length;
  }

  /**
   * Populate the deck with the standard 52-card set.
   */
  populate() {
    const cards = [];
    suitNames.forEach((suit) => {
      for (let rank = 1; rank <= 13; rank++) {
        cards.push(new Card(suit, rank));
      }
    });
    this.cards = cards;
    this.updateCardCounter();
  }

  /**
   * Randomly reorder the cards in the deck.
   */
  shuffle() {
    const shuffledCards = [];
    while (this.cards.length !== 0) {
      const card = this.cards.pop();
      const index = Math.floor(Math.random() * (shuffledCards.length + 1));
      shuffledCards.splice(index, 0, card);
    }
    this.cards = shuffledCards;
  }

  /**
   * Draw a card from the top of the deck. Return null if the deck is empty.
   * @returns {Card?}
   */
  draw() {
    if (this.cards.length === 0) {
      return null;
    }
    const card = this.cards.pop();
    this.updateCardCounter();
    return card;
  }

  /**
   * Reveal the topmost card in the deck. Return null if the deck is empty.
   * @returns {Card?}
   */
  peek() {
    if (this.cards.length === 0) {
      return null;
    }
    return this.cards[this.cards.length - 1];
  }

  toString() {
    let str = '';
    for (let i = this.cards.length - 1; i >= 0; i--) {
      str += this.cards[i].toString() + '\n';
    }
    return str;
  }
}

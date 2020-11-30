import Card from './Card';
import GameComponent from './GameComponent';

/**
 * A pile is an ordered list of cards with the top card visible.
 */
export default class Pile extends GameComponent {
  constructor() {
    super('pile-template');
    this.cards = [];
    this.onClick = null;
    this.highlight = false;
  }

  /**
   * Add a card to the pile.
   * @param {Card} card
   */
  add(card) {
    if (this.top !== null) {
      this.top.element.remove();
    }
    this.cards.push(card);
    card.pos = { x: 0, y: 0 };
    this.element.appendChild(card.element);
  }

  /**
   * Remove all cards from the pile.
   */
  clear() {
    if (this.top !== null) {
      this.top.element.remove();
    }
    this.cards = [];
  }

  /**
   * Get the topmost card in the pile. Return null if the pile is empty.
   * @returns {Card?}
   */
  get top() {
    if (this.cards.length === 0) {
      return null;
    }
    return this.cards[this.cards.length - 1];
  }

  /**
   * Get the number of cards in the pile.
   * @returns {number}
   */
  get size() {
    return this.cards.length;
  }

  get onClick() {
    return this._onClick;
  }

  /**
   * Set the click listener, replacing the previous listener.
   * @param {function} onClick
   */
  set onClick(onClick) {
    if (this._onClick !== null) {
      this.element.removeEventListener('click', this._onClick);
    }
    if (onClick !== null) {
      this.element.addEventListener('click', onClick);
    }
    this._onClick = onClick;
  }

  /**
   * @returns {boolean}
   */
  get highlight() {
    return this._highlight;
  }

  /**
   * Turn on or off the highlight, which is used to indicate that the card can
   * be played in this pile.
   * @param {boolean} highlight
   */
  set highlight(highlight) {
    this._highlight = highlight;
    if (highlight) {
      this.element.classList.add('pile-highlight');
    } else {
      this.element.classList.remove('pile-highlight');
    }
  }
}

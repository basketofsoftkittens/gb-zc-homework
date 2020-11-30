/**
 * This class implements a positioned HTML element which is used to represent a
 * game component such as a card or a deck.
 */
export default class GameComponent {
  /**
   * @param {string} templateId - ID of the template to clone
   */
  constructor(templateId) {
    // Clone the template.
    const template = document.getElementById(templateId);
    const clone = template.content.cloneNode(true);
    this.element = clone.firstElementChild;

    this.pos = { x: 0, y: 0 };
    this.visible = false;
  }

  get pos() {
    return this._pos;
  }

  set pos(pos) {
    this._pos = pos;
    this.element.style.left = `${pos.x}px`;
    this.element.style.top = `${pos.y}px`;
  }

  get visible() {
    return this._visible;
  }

  set visible(visible) {
    this._visible = visible;
    this.element.style.display = visible ? 'block' : 'none';
  }
}

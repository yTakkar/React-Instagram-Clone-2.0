import d from './DOM'

export default class Action {
  button = ''
  disabledClass = 'a_disabled'
  withOverlay = true
  overlay = new d('.overlay-2')

  constructor(button, withOverlay, disabledClass) {
    this.button = button
    this.withOverlay = withOverlay
    this.disabledClass = disabledClass
  }

  ifWithOverlay = fn => {
    this.withOverlay ? fn() : null
    return this
  }

  start = (text = 'Wait..') => {
    new d(this.button)
      .text(text)
      .addClass(this.disabledClass)
      .blur()
      .setValue(text) // if it's an input button

    this.ifWithOverlay(() => this.overlay.show())
    return this
  }

  end = text => {
    new d(this.button)
      .text(text)
      .removeClass(this.disabledClass)
      .setValue(text) // if it's an input button

    this.ifWithOverlay(() => this.overlay.hide())
    return this
  }
}

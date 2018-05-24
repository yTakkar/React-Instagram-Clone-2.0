/**
 * @author Faiyaz Shaikh <www.shtakkar@gmail.com>
 * GitHub repo: https://github.com/yTakkar/React-Instagram-Clone-2.0
 *
 * A library for DOM manipulation (inspired by jQuery) which also enables to chain mathods.
 */

import { toggle } from '../utils'

class DOM {
  element = ''

  // get element as string
  constructor(element) {
    this.element = element
  }

  // converts element into a DOM element
  toDOM = () =>
    document.querySelector(this.element)

  // Perform a function/method on element only if element is [not null/present]
  ifElement = fn => {
    let element = this.toDOM()
    element ? fn() : null
  }

  // returns all DOM elements
  toAll = () =>
    document.querySelectorAll(this.element)

  // focuses the element
  focus = () => {
    this.toDOM().focus()
    return this
  }

  // blurs the element
  blur = () => {
    this.toDOM().blur()
    return this
  }

  // changes the text of the element
  text = t => {
    this.ifElement(() =>
      this.toDOM().innerText = t
    )
    return this
  }

  // changes the html of the element
  html = html => {
    this.ifElement(() =>
      this.toDOM().innerHTML = html
    )
    return this
  }

  // helper for adding or removing class
  doWhat = (operation, className) => {
    let all = Array.from(document.querySelectorAll(this.element))
    for (let elem of all) {
      elem.classList[operation](className)
    }
  }

  // adds a class to element
  addClass = className => {
    this.doWhat('add', className)
    return this
  }

  // removes a class from the element
  removeClass = className => {
    this.doWhat('remove', className)
    return this
  }

  // toggle class of the element
  toggleClass = className => {
    this.toDOM().classList.toggle(className)
    return this
  }

  // returns the attribute of the element
  getAttr = attr => {
    return this.toDOM().getAttribute(attr)
  }

  // sets/changes attributes of the element
  setAttr = (name, value) => {
    this.toDOM().setAttribute(name, value)
    return this
  }

  // toggle (hide/show) element
  toggle = () => {
    toggle(this.toDOM())
    return this
  }

  // hides the element
  hide = () => {
    this.toDOM().style.display = 'none'
    return this
  }

  // shows the element
  show = () => {
    this.toDOM().style.display = 'block'
    return this
  }

  // Applies CSS to the element
  css = (styleName, styleValue) => {
    this.toDOM().style[styleName] = styleValue
    return this
  }

  // Applies multiple CSS rules to the element
  mutipleCSS = styles => {
    Object.assign(this.toDOM(), styles)
    return this
  }

  // returns value of the element
  val = setValue => {
    if (setValue || setValue == '') {
      this.toDOM().value = setValue
      return this
    } else {
      let value = this.toDOM().value
      return value
    }
  }

  // Performs an action on the element
  action = (actionType, fn) => {
    this.ifElement(() => {
      let element = this.toDOM()
      element.addEventListener(actionType, e => fn(e))
    })
    return this
  }

  // Scrolls to top
  scrollTop = (behavior='smooth') => {
    this.toDOM().scrollIntoView({ behavior: behavior })
    return this
  }

  // fades (fadeIn/fadeOut) the element
  fade = () => {
    this.toggleClass('fade')
    return this
  }

  // removes the element
  remove = () => {
    this.ifElement(() =>
      this.toDOM().remove()
    )
    return this
  }

  // returns data of the element from dataset
  data = what => {
    let element = this.toDOM()
    return element
      ? element.dataset[what]
      : null
  }

}

const d = DOM
export default d

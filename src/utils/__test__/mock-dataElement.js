/**
 * Creates a fake div.data with required data attributes for use in tests.
 * @returns {HTMLDivElement} dataElementDIV
 */
const MockDataElement = () => {
  let dataElement = document.createElement('div')
  dataElement.setAttribute('class', 'data')
  dataElement.setAttribute('data-session', '24')
  dataElement.setAttribute('data-username', 'takkar')
  dataElement.setAttribute('data-email-verified', 'no')
  dataElement.setAttribute('data-isadmin', 'false')
  document.body.prepend(dataElement)

  return dataElement
}

export default MockDataElement

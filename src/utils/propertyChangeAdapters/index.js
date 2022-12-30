import curry from 'lodash.curry'

export const addPropertyPrefix = curry((prefix, fn, prop) => fn(`${prefix}.${prop}`))

export const onCheckBoxChange = onPropertyChange => event => onPropertyChange(event.target.checked)

export const onSliderChange = (onPropertyChange, min, max) => (_, value) => {
  if (value) {
    if (value <= min) {
      onPropertyChange(min)
    } else if (value >= max) {
      onPropertyChange(max)
    } else {
      onPropertyChange(value)
    }
  } else {
    onPropertyChange(min)
  }
}

export const onTextBoxChange = onPropertyChange => event => {
  //console.log('event => ', event)
  try {
    onPropertyChange(event.target.value)
  } catch (error) {
    onPropertyChange(event)
  }
}

export const onDynamicInputChange = onPropertyChange => (_, value) => onPropertyChange(value)

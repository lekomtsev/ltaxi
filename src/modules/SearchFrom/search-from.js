const inputValue = {
  value: '',
}

export default function searchFrom (state = inputValue, action) {

  switch (action.type) {
    case 'changeInput':
      return {
        inputValue: action.value
      }

    default:
      return state
  }
}

const mainData = {
  isClickedOrderButton: false
}

export default function submitOrder (state = mainData, action) {

  switch (action.type) {
    case 'submitOrder':
      return {
        isClickedOrderButton: action.value
      }

    default:
      return state
  }

}

const mapData = {
  preparedCrews: [],
}

export default function handleCrews (state = mapData, action) {

  switch (action.type) {
    case 'handleCrews':
      return {
        preparedCrews: action.value
      }

    default:
      return state
  }
}

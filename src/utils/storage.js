export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('payrollState', serializedState)
  } catch (e) {
    return undefined
  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('payrollState')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

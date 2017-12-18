export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('payrollState', serializedState)
  } catch (e) {
    return undefined
  }
}

class EmployeeDataCompleter {
  constructor({ location, { workDays }}) {
    this.location = location
    this.workDays = workDays

    this.totalHours = workDays.reduce((acc, day) => acc += parseFloat(day.totalHours), 0).toPrecision(4)
  }
}

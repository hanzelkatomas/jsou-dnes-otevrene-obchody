export function writeDOM (element) {
  if (!element) {
    throw new Error('Element not found')
  }

  if (areStoresClosed()) {
    element.innerHTML = "Ne"
    element.style.color = "red"
  } else {
    element.innerHTML = "Ano"
    element.style.color = "green"
  }
}



const currentYear = new Date().getFullYear()

const closedStoresHolidays = {
  newYear: new Date(`${currentYear}-01-01`),
  easterMonday: getEasterMondayDate(currentYear),
  stWenceslasDay: new Date(`${currentYear}-09-28`),
  independentCzechoslovakStateDay: new Date(`${currentYear}-10-28`),
  christmasEve: new Date(`${currentYear}-12-24`),
  christmasDay: new Date(`${currentYear}-12-25`),
  stStephensDay: new Date(`${currentYear}-12-26`),
}

function areStoresClosed(debugArg) {
  const currentDate = debugArg ?? new Date()

  return Object.values(closedStoresHolidays).some(holiday => {
    return holiday.getDate() === currentDate.getDate() && holiday.getMonth() === currentDate.getMonth()
  })
}

function getEasterMondayDate(currentYear) {
  const getMConstant = currYear => {
    if (currYear >= 1900 && currYear <= 2199) {
      return 24
    }
    if (currYear >= 2200 && currYear <= 2299) {
      return 25
    }

    throw new Error('Year is not supported')
  };

  const getNConstant = (currYear) => {
    if (currYear >= 1900 && currYear <= 2099) {
      return 5
    }
    if (currYear >= 2100 && currYear <= 2199) {
      return 6
    }
    if (currYear >= 2200 && currYear <= 2299) {
      return 0
    }

    throw new Error('Year is not supported')
  }

  const a = currentYear % 19
  const b = currentYear % 4
  const c = currentYear % 7
  const m = getMConstant(currentYear)
  const d = (19 * a + m) % 30
  const n = getNConstant(currentYear)
  const e = (n + 2 * b + 4 * c + 6 * d) % 7

  return new Date(currentYear, 2, 22 + d + e)
}


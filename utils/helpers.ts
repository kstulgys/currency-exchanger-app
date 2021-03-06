import { subDays, format } from 'date-fns'
import { Currencies, Currency } from 'store/types'
import numeral from 'numeral'

function numberBetween(min: number, max: number, precision = 100): number {
  return Math.floor(Math.random() * ((max - min) * precision - 1 * precision) + 1 * precision) / (1 * precision)
}

interface FormatHistoryData {
  data: { rates: { [key: string]: { [key: string]: number } } }
  selectedTo: string
}

function getTimestamp(date: string): number {
  const array = date.split('-')
  const res: string = array[0] + '/' + array[1] + '/' + array[2]
  const time = new Date(res).getTime()
  return time
}

function formatHistoryData({ data, selectedTo }: FormatHistoryData): { x: number; y: number }[] {
  const result = Object.entries(data.rates).map(([date, rate]) => {
    return { x: getTimestamp(date), y: rate[selectedTo] }
  })

  return result.sort((a, b) => a.x - b.x)
}

function getEndAtDay(): string {
  return format(new Date(), 'yyyy-MM-dd')
}

function getStartAtDay(param: number): string {
  const day = subDays(new Date(), param)
  return format(new Date(day), 'yyyy-MM-dd')
}

function getSelected(name: string, currencies: Currencies) {
  return currencies.find(c => c.name === name)
}

function filterList(searchTerm: string, currencies: Currencies) {
  return currencies.filter(c => c.name.includes(searchTerm.toUpperCase()))
}

function getCanSubmit({ pocketValueFrom, inputValueFrom }: { pocketValueFrom: string; inputValueFrom: string }) {
  return Math.sign(parseInt(pocketValueFrom)) !== -1 && !!inputValueFrom
}

function isValidInput(value: string) {
  const isNumber = typeof value === 'string' && typeof +value === 'number' && isFinite(+value)
  const exceedsDecimalPlace = value[value.length - 4] === '.' || value[value.length - 4] === ','
  const isPositive = +value >= 0
  const isFirstZero = value.length === 2 && value[0] === '0'
  return !exceedsDecimalPlace && isNumber && isPositive && !isFirstZero
}

function getFiltered(array: Currencies, selectedCurrency: Currency | undefined) {
  if (!selectedCurrency || !array.length) return []
  return array.filter(c => c.name !== selectedCurrency.name)
}

const fPocket = (value: string) => numeral(value).format('00,000.00')

function getDefaultsFromStorage(): any {
  const result = window.localStorage.getItem('currencies') || null
  if (!result) {
    window.localStorage.setItem('currencies', JSON.stringify({ defaultFrom: 'GBP', defaultTo: 'USD' }))
    return { defaultFrom: 'GBP', defaultTo: 'USD' }
  }
  const { defaultFrom, defaultTo } = JSON.parse(result)
  return { defaultFrom, defaultTo }
}

const getInputValueTo = (inputValueFrom: string, currentRate: number) => {
  if (!inputValueFrom) return ''
  return numeral(inputValueFrom)
    .multiply(currentRate)
    .format('0.00')
}
const getInputValueFrom = (inputValueTo: string, currentRate: number) => {
  if (!inputValueTo) return ''
  return numeral(inputValueTo)
    .divide(currentRate)
    .format('0.00')
}
const getPocketValueTo = (selectedValueTo: number, inputValueTo: string) => {
  return numeral(selectedValueTo)
    .add(inputValueTo)
    .format('00,000.00')
}
const getPocketValueFrom = (selectedValueFrom: number, inputValueTo: string) => {
  return numeral(selectedValueFrom)
    .subtract(inputValueTo)
    .format('00,000.00')
}

function waait() {
  const time = numberBetween(1000, 3500, 1)
  return new Promise((res, rej) => setTimeout(() => res(), time))
}

export {
  getInputValueTo,
  getInputValueFrom,
  getPocketValueTo,
  getPocketValueFrom,
  getDefaultsFromStorage,
  fPocket,
  getFiltered,
  isValidInput,
  waait,
  numberBetween,
  formatHistoryData,
  getEndAtDay,
  getStartAtDay,
  getSelected,
  filterList,
  getCanSubmit,
  getTimestamp,
}

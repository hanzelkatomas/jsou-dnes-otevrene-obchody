import './style.css'
import { writeDOM } from './src/index.js'

const el = document.getElementById('result')
const infoEl = document.getElementById('info')

const holidaysDateEl = document.getElementById('next-holidays-date')
const holidaysLabelEl = document.getElementById('next-holidays-label')
writeDOM(el, infoEl, holidaysDateEl, holidaysLabelEl)

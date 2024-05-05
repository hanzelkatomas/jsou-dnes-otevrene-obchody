import './style.css'
import { writeDOM } from './src/index.js'

const el = document.getElementById('result')
const infoEl = document.getElementById('info')
writeDOM(el, infoEl)

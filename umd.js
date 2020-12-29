import * as uwuifier from './src'
const { Uwuifier, ...other } = uwuifier
Object.assign(Uwuifier, other)
Object.assign(window, { Uwuifier })
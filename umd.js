import * as u from './src'
const { Uwuifier, ...other } = u
Object.assign(Uwuifier, other)
Object.assign(window, { Uwuifier })
export const args = (() => { return process.argv.splice(process.argv[0].endsWith('.exe') ? 2 : 1) })()
export const setAll = (obj, val) => Object.keys(obj).forEach(k => obj[k] = val)
const fs = require('fs')

function csvToJson (str) {
    this.raw = str.split('\n')
    this.headers = []
    this.data = []
    this.parseLine = function (target, string) {
        let inQuote = false
        let tempStr = ''

        // terminal four does not support spread operators or "of" for-loops... 
        string = string.split('')
        for (let i = 0; i < string.length; i++) {
            const char = string[i]
            if (char == ',' && !inQuote || char == '\r') {
                target.push(tempStr)
                tempStr = ''
            } else if (char == '"' && !inQuote) {
                inQuote = true
            } else if (char == '"' && inQuote){
                inQuote = false
            } else {
                tempStr += char
            }
        }
    }
    this.parseLine(this.headers, this.raw[0])
    for (let i = 1; i < this.raw.length - 1; i++) {
        const dataArr = []
        let obj = {}
        this.parseLine(dataArr, this.raw[i])
        for (var k = 0; k < this.headers.length; k++) {
            obj[this.headers[k]] = dataArr[k]
        }
        this.data.push(obj)
    }
}



let test = new csvToJson(fs.readFileSync('Book1.csv', 'utf8'))
console.log(test.data)
console.log(test.headers)
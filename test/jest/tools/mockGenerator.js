const fs = require('fs')
function readFile(filePath, jest){
  const path = require('path')
  const appDir = path.dirname(require.main.filename)
  const data = fs.readFileSync(path.resolve(appDir + '/' + filePath), 'utf8')
  return splitData(data, jest)
}
function splitData(data ,jest) {
  const test = data.split('<script>')
  let final = test[1].split('</script>')
  final = final[0].replace(/\{/g, '')
  final = final.split(' ')
  data = []
  final.forEach(word => {
    if(word.includes('(') && word.includes('this')){
      word.replace(/\n/g, '')
      word = word.split(/\(/g)
      if(word[0] !== ''){
        word[0] = word[0] + '()'
        if(!data.includes(word[0])){
          data.push(word[0])
        }
      }
    } else if(word.includes('this')){
      word.replace(/[^A-Za-z0-9\s!?]/g,'')
      data.push(word)
    }
  })
  return createJson(data, jest)
}

let { util } = require('experience-engine')

function getObjectFormat(title, childRows) {
  return {
    [title]: childRows
  }
}

function createChildRows(array, childRows) {
  array = array.reverse()
  array = array.filter(function (n) {
    return (n !== undefined && n !== "")
  })

  let functionCheck = array[0].includes('()')
  let innerElement = array[0].replace(/[()]/g, '')
  childRows = functionCheck === true ? childRows : 'test'
  let format = getObjectFormat(innerElement, childRows)
  for (let i = 1; i < (array.length); i++) {
    format = getObjectFormat(array[i], format)
  }
  return format
}

function createJson(dataSet, jest) {
  let array
  let finalResult = []
  let dataCount = 0
  let dataTest
  dataSet.map(data => {
    dataCount = dataCount + 1
    array = (data).split(".")
    array.shift()
    finalResult.push(createChildRows(array, "jest.fn()"))

    if (dataCount === dataSet.length) {
      for (let a = 0; a <= finalResult.length - 1; a++) {
        function customizer(objValue, srcValue) {
          if (Array.isArray(objValue)) {
            return objValue.concat(srcValue)
          }
        }
        if (a === 0) {
          dataTest = finalResult[0]
        } else {
          dataTest = util.mergeWith(dataTest, finalResult[a], customizer)
        }
      }
    }
  })
  function renameKeys(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const oldKey = key
        key = key.replace(/\n/g, '')
        key = key.replace(/\r/g, '')
        key = key.replace(/[^A-Za-z0-9$\s!?]/g,'')
        const newKey = key
        obj[newKey] = obj[oldKey]
        if(oldKey !== newKey){
          delete obj[oldKey]
        }
        if(typeof obj[newKey] == 'object'){
          renameKeys(obj[newKey])
        }
      }
    }
    return walk(obj)
  }
  function walk(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let val = obj[key]
        if(typeof val == 'object'){
          walk(val)
        } else if(val === 'jest.fn()') {
          obj[key] = jest.fn()
        }
      }
    }
    return obj
  }
  return renameKeys(dataTest)
}
export { readFile as createMockJson }

const fs = require('fs')

function build (cfg) {
  let c = cfg.quasarConf
  let distFolder = c.distDir + '\\'
  const findFile = function (folder, pattern) {
    let dirCont = fs.readdirSync(folder)
    return dirCont.filter(e => e.match(pattern))[0]
  }
  // Find the CSS file and get it's contents...
  const cssFile = findFile(distFolder + 'css', /app.[A-z0-9]{8}.css/)
  const CSS = fs.readFileSync(distFolder + 'css\\' + cssFile).toString()

  // Write the CSS file...
  console.log(`Writing app.css (${parseInt(CSS.length/1024)}k)...`)
  fs.writeFileSync(distFolder + 'app.css', CSS)

  // Write the JavaScript file...
  const app = fs.readFileSync(distFolder + 'js\\' + findFile(distFolder + 'js', /app.[A-z0-9]{8}.js/)).toString()
  const runtime = fs.readFileSync(distFolder + 'js\\' + findFile(distFolder + 'js', /runtime.[A-z0-9]{8}.js/)).toString()
  const vendor = fs.readFileSync(distFolder + 'js\\' + findFile(distFolder + 'js', /vendor.[A-z0-9]{8}.js/)).toString()
  const JS = [app, runtime, vendor].join('\n')
  console.log(`Writing app.js (${parseInt(JS.length/1024)}k)...`)
  fs.writeFileSync(distFolder + 'app.js', JS)
}

const distDir = 'C:\\Users\\njste\\code\\experience-engine\\front\\dist\\spa'
build({ quasarConf: { distDir } })

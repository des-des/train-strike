const fs = require('fs')
const path = require('path')
const tachyonsBuildCss = require('tachyons-build-css')

const input = fs.readFileSync(path.join(__dirname, 'src/style.css'), 'utf8')

tachyonsBuildCss(input, {
  from: 'src/style.css',
  to: 'public/css/style.css',
  minify: true
}).then(result => {
  fs.writeFileSync(path.join(__dirname, 'public/css/style.css'), result.css)
})

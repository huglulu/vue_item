//使用脚本将所有 svg 拼成一个 svg，原来的多个 svg 变成了多个 symbol
const path = require('path')
const fs = require('fs')

let svgFolder = path.join(__dirname,'../static/svg_icons/')
let jsPath = path.join(__dirname,'../src/assets/icons.js') 

let svgFiles = fs.readdirSync(svgFolder)  // [ 'add.svg', 'book.svg', 'cup.svg', 'heart.svg', 'id.svg', 'phone.svg', 'work.svg' ]

let symbols = svgFiles.map(function(filename){
	let absolutePath = path.join(svgFolder, filename)
	let fileContent = fs.readFileSync(absolutePath).toString('utf8')
	let name = path.basename(filename, '.svg')
	return fileContent
		.replace(/<\?.+?>/g, '') //去掉 <?xml version="1.0" standalone="no"?>
		.replace(/<!.+?>/g,'') //去掉 <!DOCTYPE svg PUBLIC ...>
		.replace(/version=".+?"/g, '')
		.replace(/xmlns=".+?"/g, '')
		.replace(/class=".+?"/g, '')
		.replace(/fill=".+?"/g, '')
		.replace(/stroke=".+?"/g,'')
		.replace(/<svg /, `<svg id="icon-${name}" `)
		.replace(/\bsvg\b/g, 'symbol') // 改 svg 为 symbol
		.replace(/\s{2,}/g, ' ')
}).join('\n')

let js = `export default \`<svg style="display:none">\n${symbols}\n</svg>\`\n`

fs.writeFileSync(jsPath, js, {flag: 'w'})
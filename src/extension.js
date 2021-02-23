// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const path = require('path')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Your extension "jLorem" is now active!');

	let disposable = vscode.commands.registerCommand('jlorem.fetchLorem', function () {
		const editor = vscode.window.activeTextEditor;
		const config = vscode.workspace.getConfiguration('jLorem');
		const options = {
			pmin: config.get('sentenceLength.min'),
			pmax: config.get('sentenceLength.max'),
			plimit: config.get('numberOfParagraphs'),
			pwrap: config.get('pWrap')
		}

		if (editor) {
			const document = editor.document;
			const instream = fs.createReadStream(path.resolve(__dirname, "iamacat.txt"))
			const outstream = new stream
			const rl = readline.createInterface(instream, outstream)

			let paragraphs = new Object()

			rl.on('line', function (line) {
				let noOfSentences = line.split(/[！？。]+/)
				noOfSentences = noOfSentences.length - 1
				if (paragraphs[noOfSentences] != undefined) {
					paragraphs[noOfSentences].push(line)
				} else {
					paragraphs[noOfSentences] = new Array()
					paragraphs[noOfSentences].push(line)
				}
			})

			rl.on('close', function () {
				const resultArray = getParagraphs(options.plimit, options.pmin, options.pmax)
				editor.edit(editBuilder => {
					resultArray.forEach(line => {
						editBuilder.insert(editor.selection.active, line + '\r\n');
					})
				})
			})

			function getParagraphs(no, minLength, maxLength) {
				let output = [];
				for (let i = 0; i < no; i++) {
					const randomLength = getRandomInt(minLength, maxLength)
					const randomEntry = Math.floor(Math.random() * paragraphs[randomLength].length)
					output.push(paragraphs[randomLength][randomEntry])
				}
				if (options.pwrap)
					output.forEach((line, index, array) => {
						array[index] = line.replace(/(.*)/i, "<p>$1</p>")
					})
				return output
			}

			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min
			}
		}
	})

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
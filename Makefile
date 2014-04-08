all:
	cat map.js controller.js solver.js > main.js
	cat main.js | pbcopy
all:
	cat map.js controller.js minmax.js solver.js > main.js
	cat main.js | pbcopy
/*=============================================
=       ZeroInside Bot on Telegram            =
=============================================*/
/*=====  Author : Satrya Budi Pratama  ======*/
/*=============================================
=            Date : 11 May 2016               =
=============================================*/
/* 	github.com/noczero/ZerBotv2 */

var fs = require('fs');
var yaml = require('js-yaml');
var path  = require('path');
//var config = require('config');
var srcDir = path.resolve(__dirname, '') + '/src/';

fs.readdirSync(srcDir).forEach(function (file) {
	var arr = file.split('.')

	if (arr[1] === 'yaml') {
		module.exports[arr[0]] = yaml.load(fs.readFileSync(srcDir + file).toString())
	}

});
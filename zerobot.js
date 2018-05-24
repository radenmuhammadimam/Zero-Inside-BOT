/*=============================================
=       ZeroInside bot on Telegram            =
=============================================*/
/*=====  Author : Satrya Budi Pratama  ======*/
/*=============================================
=            Date : 11 May 2016               =
=============================================*/
/* 	github.com/noczero/ZerBotv2 */

var bb = require ('bot-brother');
var texts = require ('./texts.js');
var Forecast = require('forecast');
var async = require('async');
/*=====================================
=            Postgress SQL            =
=====================================*/
const postgress = require('pg');
const config = {
    user: 'pi',
    database: 'zeroWeather',
    password: 'noczero',
    port: 5432
};

const pool = new postgress.Pool(config);
//postgres://dbusername:passwrod@server:port/database
const connectionString = process.env.DATABASE_URL || 'postgres://pi:noczero@localhost:5432/zeroWeather';

function getLastOutdoor(){
	//var results = []; 
	pool.connect((err,client,done) => {
		if(err){
			done();
			console.log(err);
		} else {
			const queryString = "SELECT id,temperature,humidity,extract(epoch from date) FROM dhtoutdoor ORDER BY id DESC LIMIT 1";

			client.query(queryString, (err,result) => {
				done();
				if(err){
					console.log(err);
				} 
					console.log(result.rows[0]);
					//results.push(result.rows);
					return result.rows;
					console.log(result.rows);
				//done();
		
			});
		}
	});
	//console.log(results);
	//return results;
};

//Cuaca
var forecast = new Forecast ({
	service : 'forecast.io',
	key : '60ed96475023ebfc2e64001a7f6123bc',
	units : 'celcius',
	cache : true,
	ttl : {
		minutes : 5
	}
});
	
//SHolat
var PrayerTimes = require('prayer-times'),
	Sholat = new PrayerTimes();

//Cron Job
var myId = '211470016';
var groupID = '-105223936'

// JadwalVarGloabalnotCTX
var jadwalSenin = "Semangat pagi Boss! \nJadwal kuliah hari ini \n1. 09:30 - 12:30 (A207B)  TOPIK KHUSUS 2 TELEMATIKA";
var jadwalSelasa = "Semangat pagi Boss! \nJadwal kuliah hari ini : \n1. 13:30 - 16:30 E301 PANCASILA DAN KEWARGANEGARAAN";
var jadwalRabu = "Semangat pagi Boss! \nJadwal kuliah hari ini : \n1. 07:30 - 09:30 (A207A) PENULISAN PROPOSAL  \n2. 09:30 - 11:30 (A207B) DASAR PEMODELAN DAN SIMULASI \n 3. 12:30 - 15:30 (A308A) JARINGAN KOMPUTER LANJUT";
var jadwalKamis = "Semangat pagi Boss! \nJadwal kuliah hari ini : \n1. 13:30 - 16:30 (A208B) SISTEM PARALEL DAN TERDISTRIBUSI";
var jadwalJumat = "Happy weekend Boss!";
var jadwalSabtu = "Happy weekend Boss!";
var jadwalMinggu = "Happy weekend Boss!";
var jadwalKosong = "Semangat pagi Boss!";
//var ujian1 = "Semangat pagi Boss! Hari ini Ujian Sistem Digital 15:45";
//var ujian2 = "Semangat pagi Boss! Hari ini Ujian TBA 12:30";
var free = "Selamat pagi Boss! kerjain tugasnya";
var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 00 06 * * 1-7',
  onTick: function() {
   	var hari=new Date();
    switch (hari.getDay()) { 	
    	case 1 : 
    		bot.api.sendMessage(myId , jadwalSenin);
			//bot.api.sendMessage(groupID , free);
			//bot.api.sendMessage(myId , jadwalKosong);
			//bot.api.sendMessage(groupID , jadwalKosong);
		break;
		case 2 : 
			bot.api.sendMessage(myId , free);
			//bot.api.sendMessage(groupID , free);
			//bot.api.sendMessage(myId , jadwalKosong);
			//bot.api.sendMessage(groupID , jadwalKosong);
		break;
		case 3 : 
			bot.api.sendMessage(myId , jadwalRabu);
			//bot.api.sendMessage(groupID , free);
			//bot.api.sendMessage(myId , jadwalKosong);
			//bot.api.sendMessage(groupID , jadwalKosong);
		break;
		case 4 : 
			bot.api.sendMessage(myId , jadwalKamis);
			//bot.api.sendMessage(groupID , free);
			//bot.api.sendMessage(myId , jadwalKosong);
			//bot.api.sendMessage(groupID , jadwalKosong);
		break;
		case 5 : 
			bot.api.sendMessage(myId , jadwalJumat);
			//bot.api.sendMessage(groupID , free);
			//bot.api.sendMessage(myId , jadwalKosong);
			//bot.api.sendMessage(groupID , jadwalKosong);
		break;
		case 6 : 
			bot.api.sendMessage(myId , jadwalSabtu);
			//bot.api.sendMessage(groupID , free);
			//bot.api.sendMessage(myId , jadwalKosong);
			//bot.api.sendMessage(groupID , jadwalKosong);
		break;
		case 7 : 
			bot.api.sendMessage(myId , free);
			//bot.api.sendMessage(groupID , free);
			//bot.api.sendMessage(myId , jadwalKosong);
			//bot.api.sendMessage(myId , jadwalKosong);
		break;

	}
  },
  start: false,
  timeZone: 'Asia/Jakarta'
});
job.start();

//var now = Date.now();

var bot = bb({
	key : '211504778:AAErCs7jeVMcs33LgAsVTfuJ9tuexCBBkvE',
	redis : {port : 6379, host : '127.0.0.1'}
})
.texts(texts.default)
//Keyboard
.keyboard([

	[{'button.jadwal' : {go : 'jadwal' }}],
	[{'button.sholat' : {go : 'sholat' }}],
	[{'button.tugas' : {go : 'tugas' }}],
	[{'button.data' : {go : 'data' }}],
	[{'button.map' : {go : 'maptelkom' }}],
	[{'button.weather' : {go : 'weather' }}],
	[{'button.labIoT' : {go : 'zerosystem' }}],
	[{'button.help' : {go : 'help' }}]
	
])
.keyboard('backButton', [
  [{
    'button.back': {
      handler: function (ctx) {
        return ctx.goBack();
      },
      isShown: function (ctx) {
        return !ctx.hideBackButton;
      }
    }
  }]
])
.use('before', bb.middlewares.typing())
.use('before', bb.middlewares.botanio('_Gd-VqRES69dQXgcby0o7bG8GulTdx9g'))
.use('before', function (ctx) {
	var now = Date.now();

	ctx.data.user = ctx.meta.user;
	console.log(ctx.data.user);
});


// 	ctx.session.notifications = ctx.session.notifications || [];
//   	ctx.session.notifications = ctx.session.notifications.filter(function (n) {
//     return n.ts * 1e3 >= now - 30e3;
// // });
//   ctx.notifications = ctx.session.notifications;
//   ctx.session.notificationsCounter = ctx.session.notificationsCounter || 0;

//   ctx.data.user = ctx.meta.user;
//  // ctx.data.totalCount =  ctx.notifications.length;
//   ctx.session.createDate = ctx.session.createDate || Date.now();
// });

bot.listenUpdates();
//Command ZeroBot
console.log('ZeroBotV2 Started');

// SAY HI
bot.command('hi')
	.invoke(function (ctx) {
	ctx.data.user = ctx.meta.user;
	//console.log(ctx.meta.user);
	//Return
	return ctx.sendMessage('Hello <%=user.first_name%>, <%=user.id%> How are you?');
	ctx.hideKeyboard();
})
.answer( function(ctx) {
	ctx.data.answer = ctx.answer;
	//Return 
	return ctx.sendMessage('OK. I understood. You fell <%=answer%>');
});

//Hitung Tanggal

function calculateDate(date1, date2){
//our custom function with two parameters, each for a selected date
 
  diffc = date1.getTime() - date2.getTime();
  //getTime() function used to convert a date into milliseconds. This is needed in order to perform calculations.
 
  days = Math.round(Math.abs(diffc/(1000*60*60*24)));
  //this is the actual equation that calculates the number of days.
 
return days;
}

// start JADWAL
bot.command('jadwal', {compilantKeyboard : true})
	.invoke(function (ctx) {
		// var oneDays = 24*60*60*1000;
		var now = new Date();
		 var tglPenting = new Date("2016/10/10");
		// var hitungTgl = Math.round(Math.abs((now.getTime() - tglPenting.getTime())/(oneDays)));
		ctx.data.tglPenting = calculateDate(tglPenting,now);
		return ctx.sendMessage('main.info')
	})
	.keyboard([
		[{'button.senin' : {go : 'senin'}}],
		[{'button.selasa' : {go : 'selasa'}}],
		[{'button.rabu' : {go : 'rabu'}}],
		[{'button.kamis' : {go : 'kamis'}}],
		[{'button.jumat' : {go : 'jumat'}}],
		[{'button.sabtu' : {go : 'sabtu'}}],
		[{'button.ujian' : {go : 'ujian'}}],
		'backButton'
	])
bot.command('senin', {compilantKeyboard : true})
	.invoke(function (ctx) {
	return ctx.sendMessage('main.senin');
	ctx.repeat();
});
bot.command('selasa', {compilantKeyboard : true})
	.invoke(function (ctx) {
	return ctx.sendMessage('main.selasa');
});
bot.command('rabu', {compilantKeyboard : true})
	.invoke(function (ctx) {
	return ctx.sendMessage('main.rabu');
});
bot.command('kamis', {compilantKeyboard : true})
	.invoke(function (ctx) {
	return ctx.sendMessage('main.kamis');
});
bot.command('jumat', {compilantKeyboard : true})
	.invoke(function (ctx) {
	return ctx.sendMessage('main.jumat');
});
bot.command('sabtu', {compilantKeyboard : true})
	.invoke(function (ctx) {
	return ctx.sendMessage('main.sabtu');
});
bot.command('ujian' , {compilantKeyboard : true})
	.invoke(function (ctx){
		return ctx.sendMessage('main.ujian');
	});

//end JADWAL

//HELP
bot.command('help' , {compilantKeyboard : true})
	.invoke(function (ctx) {
		return ctx.sendMessage('main.help');
});

//TUGAS
bot.command('tugas' , {compilantKeyboard : true})
	.invoke(function (ctx) {
		return ctx.sendMessage('main.tugas');
});

// PRAYER TIMES	
bot.command('sholat' , {compilantKeyboard : true})
	 .use('before', function(ctx) {
	//var oneDay = 24*60*60*1000;
	//var idulfitri = new Date(2016,06,06);
	var waktu = new Date();
	//var toIdulFitri = Math.round(Math.abs((waktu.getTime() - idulfitri.getTime())/(oneDay)));
	//ctx.data.ied = toIdulFitri;
	ctx.data.localtime = waktu;
 	ctx.data.waktusholat = Sholat.getTimes(waktu, [6.9175, 107.6191], 7 );
 	ctx.data.latitude = '6.9175';
 	ctx.data.longitude = '107.6191';
	Sholat.setMethod('Makkah');
	//Sholat.tune({
	//	sunrise : - 1,
	//	fajr : 1 ,
	//	dhuhr : 2 ,
	//	asr : 4 ,
	//	maghrib : -15,
	//	isha : -4,
	//	sunset : -15
	//	});

	Sholat.adjust({
		fajr : 24.5,
		dhuhr : '2 min',
		asr : 1.04,
		maghrib : '22 min',
		isha : 23,
		highLats : 'AngleBased'
	});

	 })

	.invoke(function (ctx) {
		return ctx.sendMessage('main.sholat');
});

// MAP
bot.command('maptelkom' , {compilantKeyboard : true})
	.invoke(function (ctx) {
		return ctx.sendLocation(-6.974402 , 107.631733);
	});


// DATA 
bot.command('data', {compilantKeyboard : true})
	// .use('before', function(ctx) {
	// 	ctx.sendMessage('Let me know your name');
	// })

	.invoke(function (ctx) {
		ctx.hideKeyboard();
		return ctx.sendMessage('Let me know the name.');

	})
	.answer(function (ctx) {
		ctx.session.name = ctx.answer;
		//return ctx.sendMessage(ctx.session.name);
	switch (ctx.session.name)
	 {
		case 'satrya' : 
		case 'Satrya' :
		return ctx.sendMessage( 'Nama : Satrya Budi Pratama' + '\n' +
									'NIM : 1301154428' + '\n'  );
		//return ctx.sendMessage('Nama : Satrya');
		break;

		case "aditya" :
		case "Aditya" : 
		return ctx.sendMessage( 'Nama : Aditya Setiawan' + '\n' +
									'NIM : 1301154218' + '\n'  );						
		break;

		case "Ahmad" : 
		case "ahmad" :
		case "iwan"	:
		return ctx.sendMessage( 'Nama : Ahmad Fikri Listyawan' + '\n' +
									'NIM : 1301154260' + '\n'  );						
		break;

		case "aisah" :
		case "Aisah" :
		case "ai"	: 
		return ctx.sendMessage( 'Nama : Aisah Mujahidah Rasunah' + '\n' +
									'NIM : 1301154484' + '\n'  );						
		break;

		case "Alfian" :
		case "alfian" :
		return ctx.sendMessage( 'Nama : Alfian Ibadurachman ' + '\n' +
									'NIM : 1301154120' + '\n'  );						
		break;

		case "Ali" :
		case "ali" :
		return ctx.sendMessage( 'Nama : Ali Helmut ' + '\n' +
									'NIM : 1301154246' + '\n'  );						
		break;

		case "Amhar" :
		case "amhar" :
		case "aha"	:
		return ctx.sendMessage( 'Nama : Amhar Hadikusumo ' + '\n' +
									'NIM : 1301154316' + '\n'  );						
		break;

		case "Andhika" : 
		case "Dika" : 
		case "dika" : 
		case "andhika" : 
		return ctx.sendMessage( 'Nama : Andhika Buwananda Nugraha ' + '\n' +
									'NIM : 1301154288' + '\n'  );						
		break;

		case "Salama" : 
		case "salama" : 
		case "Anisa" : 
		case "anisa" : 
		return ctx.sendMessage( 'Nama : Anisa Salama ' + '\n' +
									'NIM : 1301154640' + '\n'  );						
		break;

		case "Annisa" : 
		case "annisa" : 
		return ctx.sendMessage( 'Nama : Annisa Rohimma' + '\n' +
									'NIM : 1301154512' + '\n'  );						
		break;

		case "Farel" : 
		case "farel" : 
		case "Arieffarel" : 
		case "arieffarel" : 
		return ctx.sendMessage( 'Nama : Arieffarrel Edwin Pribadi ' + '\n' +
									'NIM : 1301154344' + '\n'  );						
		break;

		case "Ary" : 
		case "ary" : 
		return ctx.sendMessage( 'Nama : Ary Adhigana Suwandi ' + '\n' +
									'NIM : 1301154414' + '\n'  );						
		break;

		case "Chiara" : 
		case "chiara" : 
		case "Cakra" : 
		case "cakra" : 
		return ctx.sendMessage( 'Nama : Chiara Janetra Cakravania ' + '\n' +
									'NIM : 1301154400' + '\n'  );						
		break;

		case "Danas" : 
		case "danas" : 
		case "Danasawara" : 
		case "danasawara" : 
		return ctx.sendMessage( 'Nama : Danaswara Prawira Harja ' + '\n' +
									'NIM : 1301154148' + '\n'  );						
		break;

		case "Danny" : 
		case "danny" : 
		case "dani" : 
		case "Dani" : 
		return ctx.sendMessage( 'Nama : Danny Aldian Pratama ' + '\n' +
									'NIM : 1301154204' + '\n'  );						
		break;

		case "Dhian" : 
		case "dhian" : 
		case "Dhibeks" : 
		case "dhibeks" : 
		return ctx.sendMessage( 'Nama : Dhian Haryono ' + '\n' +
									'NIM : 1301154190' + '\n'  );						
		break;

		case "Dhiya" : 
		case "dhiya" : 
		case "Jarvis" : 
		case "jarvis" : 
		return ctx.sendMessage( 'Nama : Dhiya Ulhaq Dewangga ' + '\n' +
									'NIM : 1301150050' + '\n'  );						
		break;

		case "Ekky" : 
		case "ekky" : 
		return ctx.sendMessage( 'Nama : Ekky Wicaksana ' + '\n' +
									'NIM : 1301154358' + '\n'  );						
		break;

		case "Roi" : 
		case "Elroi" : 
		case "elroi" : 
		case "roi" : 
		return ctx.sendMessage( 'Nama : Elroi Christian Ndun ' + '\n' +
									'NIM : 1301150008' + '\n'  );						
		break;

		case "Hafizh" : 
		case "Hafizhuddin" : 
		case "hafizh" : 
		case "hafizhuddin" : 
		return ctx.sendMessage( 'Nama : Hafizhuddin ' + '\n' +
									'NIM : 1301150022' + '\n'  );						
		break;

		case "Hamzah" : 
		case "hamzah" : 
		return ctx.sendMessage( 'Nama : Hamzah ' + '\n' +
									'NIM : 1301150078' + '\n'  );						
		return ctx.sendMessage( 'Nama : Hamzah Faisal Azmi ' + '\n' +
									'NIM : 1301154372' + '\n'  );						
		break;
 
		case "Hilal" : 
		case "Nabil" :
		case "hilal" : 
		case "nabil" : 
		return ctx.sendMessage( 'Nama : Hilal Nabil Abdillah ' + '\n' +
									'NIM : 1301154134' + '\n'  );						
		break;

		case "Iqbal" : 
		case "iqbal" : 
		return ctx.sendMessage( 'Nama : Iqbal Basyar ' + '\n' +
									'NIM : 1301150036' + '\n'  );						
		break;
		case "Ayyub" : 
		case "ayyub" : 
		return ctx.sendMessage( 'Nama : M. Salahuddin Al Ayyubi ' + '\n' +
									'NIM : 1301154232' + '\n'  );						
		break;
		case "Chio" : 
		case "chio" : 
		case "Marchio" : 
		case "marchio" : 
		return ctx.sendMessage( 'Nama : Marchio Farantino ' + '\n' +
									'NIM : 1301154302' + '\n'  );						
		break;

		case "maya" : 
		case "Maya" : 
		return ctx.sendMessage( 'Nama : Maya Rosalinda ' + '\n' +
									'NIM : 1301154540' + '\n'  );						
		break;
		case "Meilinda" : 
		case "meilinda" : 
		case "mei" : 
		case "Mei" : 
		return ctx.sendMessage( 'Nama : Meilinda Khusnul Khotimah ' + '\n' +
									'NIM : 1301154568' + '\n'  );						
		break;
		case "Farrell" : 
		case "farrell" : 
		return ctx.sendMessage( 'Nama : Mochammad Farrell ' + '\n' +
									'NIM : 1301154162' + '\n'  );						
		break;
		case "Dzaky" : 
		case "dzaky" : 
		case "Amal" : 
		 return ctx.sendMessage( 'Nama : Muhammad Amal Dzaky ' + '\n' +
									'NIM : 1301154176' + '\n'  );						
		break;
		case "Restu" : 
		case "restu" : 
		return ctx.sendMessage( 'Nama : Muhammad Restu Novriyanata ' + '\n' +
									'NIM : 1301154092' + '\n'  );						
		break;
		case "Imam" : 
		case "imam" : 
		case "Raden" : 
		case "raden" : 
		return ctx.sendMessage( 'Nama : Raden Muhammad Imam ' + '\n' +
									'NIM : 1301154106' + '\n'  );						
		break;
		case "Reina" : 
		case "reina" : 
		return ctx.sendMessage( 'Nama : Reina Wardhani ' + '\n' +
									'NIM : 1301154470' + '\n'  );						
		break;
		case "Vana" : 
		case "Rifana" :
		case "vana" : 
		case "rifana" : 
		return ctx.sendMessage( 'Nama : Rifana Iftitah ' + '\n' +
									'NIM : 1301154274' + '\n'  );						
		break;
		case "Trio" : 
		case "trio" : 
		return ctx.sendMessage( 'Nama : Rizki Trio Novendra ' + '\n' +
									'NIM : 1301154386' + '\n'  );						
		break;
		case "Rizki" : 
		case "rizki" : 
		case "Yusnimar" : 
		case "yusnimar" : 
		return ctx.sendMessage( 'Nama : Rizki Yusnimar ' + '\n' +
									'NIM : 1301154526' + '\n'  );						
		break;
		case "Tamara" : 
		case "tamara" : 
		return ctx.sendMessage( 'Nama : Tamara Suci Pendok Mandouw ' + '\n' +
									'NIM : 1301154456' + '\n'  );						
		break;
		case "Taufik" : 
		case "taufik" : 
		return ctx.sendMessage( 'Nama : Taufik Muarif ' + '\n' +
									'NIM : 1301150064' + '\n'  );						
		break;
		case "Timami" : 
		case "timami" : 
		return ctx.sendMessage( 'Nama : Timami Hertza Putrisanni ' + '\n' +
									'NIM : 1301154498' + '\n'  );						
		break;
		case "Tri" : 
		case "tri" : 
		return ctx.sendMessage( 'Nama : Tri Muryani ' + '\n' +
									'NIM : 1301150442' + '\n'  );						
		break;
		case "Zulfya" : 
		case "zulfya" : 
		case "zul" : 
		case "Zul" : 
		return ctx.sendMessage( 'Nama : Zulfya Annisa Praditha ' + '\n' +
									'NIM : 1301154554' + '\n'  );						
		break;

		default :
		return ctx.sendMessage('main.notfound');
		return ctx.repeat();
		break;
	 }	

});


// WEATHER
var timezone;
var status;	
var temperature;
var humidity;
var wind;
var statusDaily;
var statusHourly;
var statuswindBear;
var statusSky;
var dew;
var statusPressure;
var statusOzone;

function getWeather() {
	forecast.get([-6.974402, 107.631733], true, function(err, result){
		if(err) return console.dir(err);
		//console.dir(weather);
		 timezone = result.timezone;
		 status = result.currently.summary;
		 temperature = Math.round(parseFloat(result.currently.temperature, 10));
		 humidity = result.currently.humidity * 100;
		 wind = Math.round(parseFloat(result.currently.windSpeed));
		 statusDaily = result.daily.summary;
		 statusHourly = result.hourly.summary;
		 statuswindBear = result.currently.windBearing;
		 statusSky = Math.round(result.currently.cloudCover * 100);
		 dew = result.currently.dewPoint;
		 statusPressure = result.currently.pressure;
		 statusOzone = result.currently.ozone;
	}); 
};

//INterval every 5 minutes;
setInterval(getWeather , 300000);
	
bot.command('weather', {compilantKeyboard : true})
// .use('before', function (ctx) {
// 		getWeather();
// 		ctx.data.timezones = timezone;
// 		ctx.data.statuss = status;
// 		ctx.data.temperatures = temperature;
// 		ctx.data.humiditys = humidity;
// 		ctx.data.winds = wind;
// 		ctx.data.today = statusDaily;
// 		ctx.data.hourly = statusHourly;
// 		ctx.data.windbear = statuswindBear;
// 		ctx.data.sky = statusSky;
// 		ctx.data.dewpoint = dew;
// 		ctx.data.pressure = statusPressure;
// 		ctx.data.ozone = statusOzone;
// })
.invoke(function (ctx) {
		getWeather();
		ctx.data.timezones = timezone;
		ctx.data.statuss = status;
		ctx.data.temperatures = temperature;
		ctx.data.humiditys = humidity;
		ctx.data.winds = wind;
		ctx.data.today = statusDaily;
		ctx.data.hourly = statusHourly;
		ctx.data.windbear = statuswindBear;
		ctx.data.sky = statusSky;
		ctx.data.dewpoint = dew;
		ctx.data.pressure = statusPressure;
		ctx.data.ozone = statusOzone;
		return ctx.sendMessage('main.weather');
});


// MAP
bot.command('zerosystem' , {compilantKeyboard : true})
	.invoke(function (ctx) {
		var dataRaw = [];
		pool.connect((err,client,done) => {
			if(err){
				done();
				console.log(err);
			} else {
				const queryString = "SELECT id,temperature,humidity,extract(epoch from date) as waktu FROM dhtoutdoor ORDER BY id DESC LIMIT 1";

				client.query(queryString, (err,result) => {
					done();
					if(err){
						console.log(err);
					}
						dataRaw = result.rows[0];
						//results.push(result.rows);
				});
			}
		});

		// const queryString = "SELECT id,temperature,humidity,extract(epoch from date) as waktu FROM dhtoutdoor ORDER BY id DESC LIMIT 1";
		// pool.query(queryString, (err, res) => {
		//   if (err) {
		//     throw err
		//   }

		 //dataRaw = res.rows[0];
		  
		//})
		//var dataRaw = getServers();
		//console.log(dataRaw);

		setTimeout(function () {
						if (dataRaw != null) {

		  				ctx.data.wktu = convertTimestamp(dataRaw.waktu) ;
		  				ctx.data.tmp = dataRaw.temperature ;
		 				ctx.data.hmdt = dataRaw.humidity ;
		 				console.log(dataRaw.waktu);
						}
						console.log(dataRaw);
		 				return ctx.sendMessage('main.iot');

		}, 500)
		// async.waterfall(
  //       [
  //           connect,
  //           runQuery,
  //           printResults
  //       ],
  //       	function (error, success) {
  //       		ctx.data.tmp = 0 ;
		

  //       	}
  //       );
		//console.log(dataRaw);
		
		//console.log(ctx.data.tmp);
		//console.log(getLastOutdoor());
		//console.log(outdoor[0]);
});


function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;
			
	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}
	
	// ie: 2013-02-18, 8:35 AM	
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
		
	return time;
};
		


function executeQuery(queryString, callback) {
	pool.connect((err,client,done) => {
			if(err){
				done();
				console.log(err);
				return callback(err,null);
			} else {
				client.query(queryString, (err,result) => {
					done();
					if(err){
						console.log(err);
						callback(err, null);
					}
					return callback(null, result.rows[0]);
						//results.push(result.rows);
				});
			}
	});
}


function getResult(query,callback) {
  executeQuery(query, function (err, rows) {
     if (!err) {
        callback(null,rows);
     }
     else {
        callback(true,err);
     }
   });
}

function getServers(){
	const queryString = "SELECT id,temperature,humidity,extract(epoch from date) as waktu FROM dhtoutdoor ORDER BY id DESC LIMIT 1";

	getResult(queryString,function(err,rows){
    if(!err){
        return rows;
    }else{
        console.log(err);
    }
  });
}



function connect(callback)
{
    pool.connect( function(err,client,done)
    {
        if(err)
        {
            console.error("Error setting up database: %s", err.stack || err.toString());
        } // end if

        // Manually pass a second 'null' argument, so this adheres to the same interface as pg.query.
        callback(client, done);
    }); // end onConnect
} // end connect

// Since pg.query passes its callback (error, results), all of the following callbacks take a 'results' argument; most
// of them ignore it.

function runQuery(client, callback)
{
    // We expect to get rows 0, 4, and 6 back.
    const queryString = "SELECT id,temperature,humidity,extract(epoch from date) as waktu FROM dhtoutdoor ORDER BY id DESC LIMIT 1";
    client.query(queryString,callback);
} // end runQuery


function printResults(result, callback)
{
    var rows = result.rows;

    console.log("results:"+ rows);

    done();
    callback(null, null);
} // end printResults

function shutdown(error)
{
    //client = null;
    if(done)
    {
        done();
    } // end if
    //done = null;

    if(error)
    {
        console.error("\033[1;31m%s\033[m", error.stack || error.toString());
        console.error("Details:", util.inspect(error, {colors: true}));
    }
    

} // end shutdown
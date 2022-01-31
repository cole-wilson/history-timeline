$(document).ready(function () {
	// Setup stars
	for (var i = 0; i <= 100; i++) {
		for (var j = 0; j < 2; j++) {
			let color = ["crimson", "darkblue", "#784a00"][Math.floor(Math.random() * 3)];
			let size = Math.random();
			let x = Math.random() * 100;
			let y = Math.random() * 100;
			var star = $(`<div class='star star_${i}'>✦</div>`);
			star.css({
				"font-size": 0.5 + size + "em",
				left: x + "vw",
				top: y + "vh",
				"text-shadow": ("0px 0px 20px " + color + ",").repeat(5).slice(0, -1)
			})
			$("#space").append(star)
		}
	}

	// Setup arrows
	for (var i = 0; i < 10; i++) {
		var arrow_c = $("<div id='arrow_" + i + "' class='arrow'></div>");
		var arrow = $("<img src='https://www.onlygfx.com/wp-content/uploads/2017/06/bow-arrow-1.png'>");
		let x = (Math.random() * 50) - 25;
		let y = (Math.random() * 50) - 25;
		arrow.css("transform", `translate(${x}px, ${y}px)`)
		arrow_c.append(arrow)
		$("#bow").append(arrow_c);
	}

	setTimeout(() => $("#loader").fadeOut(), 1000);
	window.scrollTo(0, 0);
})
var controller = new ScrollMagic.Controller();
var last = 0;

function addScene(pin, height = 100, callback = () => {}, ecallback = () => {}, lcallback = () => {}) {
	$(pin).css("top", last + "vh")
	new ScrollMagic.Scene({
		triggerElement: pin,
		duration: height + "%",
		triggerHook: 0,
		offset: 0
	})
		.addTo(controller)
		// .addIndicators()
		.setPin(pin)
		.on("progress", function (e) {callback.call($(pin)[0], e.progress, e.scrollDirection);})
		.on("enter", function (e) {ecallback.call($(pin)[0], e.scrollDirection)})
		.on("leave", function (e) {lcallback.call($(pin)[0], e.scrollDirection)})
		.on("leave", function (e) {$(pin).removeClass('visible')})
		.on("enter", function (e) {$(pin).addClass('visible')})
	last += height;
}

addScene("#intro", 100, function (percent, direction) {
	percent *= 100;
	var globestart = 20;

	if (percent < globestart) {
		$("#globe").css("transform", "scale(0)")
		$("#title").fadeIn();
	}
	else {
		var s = (percent - globestart) * 0.015
		$("#title").fadeOut();
		$("#globe").css("transform", `scale(${s})`)
	}

	let starnum = Math.floor(percent);
	if (direction == "FORWARD") {
		for (var i = 0; i <= starnum; i++) $(".star_" + i).css("opacity", 1)
	}
	else if (direction == "REVERSE") {
		for (var i = starnum; i <= 100; i++) $(".star_" + i).css("opacity", 0)
	}
}, () => {$("#space").show()}, () => {$("#space").hide()})

addScene("#rock")
addScene("#bow", 300, function (percent, duration) {
	percent *= 100;

	$("#horses").css({right: (percent * 1.1) + "vw", bottom: (2 * Math.sin(percent / 5) + 10) + "vh"})

	let x = 50 - percent;
	var y = (-0.01 * ((x + 40) ** 2)) + 80;
	if (y < 10 && percent > 50) return
	var r = 360 - (50 * 0.01 * (percent - 30));
	var rchange = 0;
	for (var i = 0; i < 10; i++) {
		// rchange = Math.floor(Math.random() * 10) - 5
		$(`#arrow_${i}`).css({bottom: y + "vh", right: percent + "vw", transform: `rotate(${r + rchange}deg)`})
	}
})
addScene("#metal")
addScene("#firearm", 300, function (percent, duration) {
	const img = new Image()
	var index = Math.floor(percent * 149) + 1
	img.src = `fireworks/${index.toString().padStart(4, '0')}.png`
	img.onload = function () {
		$("#fireworks").attr("src", img.src);
	}
})
addScene("#plane", 100, function (percent, duration) {
	$()
})
addScene("#nuke", 300, function (percent, duration) {
	const img = new Image()
	var index = Math.floor(percent * 19) + 1
	img.src = `boom/${index}.png`
	img.onload = function () {
		$("#boom").attr("src", img.src);
	}
}, () => {$("#space").show()}, () => {$("#space").hide()})
addScene("#cyber", 100, function (percent, duration) {
	const img = new Image()
	img.src = `cmatrix/1.png`
	img.onload = function () {
		$("#cmatrix").attr("src", img.src);
	}
})
addScene("#final", 9000)

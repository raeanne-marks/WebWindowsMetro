var vis = false;
var tiles = [];
var nrows = 0;
var words = ["sed", "unde", "omnis", "iste", "natus", "voluptatem",
	"totam", "rem", "aperiam", "eaque", "ipsa", "quae", "illo", "quasi",
	"beatae", "vitae", "dicta", "sunt", "explicabo", "nemo", "enim",
	"ipsam", "voluptatem", "quia", "voluptas", "sit", "aspernatur", "aut",
	"odit", "aut", "fugit", "consequuntur", "magni", "dolores", "eos",
	"qui", "ratione", "nesciunt", "neque", "porro", "quisquam", "est",
	"amet", "consectetur", "adipisci", "velit", "non", "numquam", "eius",
	"modi", "tempora", "incidunt", "ut", "labore", "et", "magnam", "aliquam",
	"quaerat", "enim", "ad", "minima", "veniam", "nostrum", "ullam",
	"corporis", "suscipit", "laboriosam", "nisi", "aliquid", "ex", "ea",
	"commodi", "vel", "iure", "quam", "nihil", "molestiae", "illum",
	"fugiat", "nulla", "pariatu"];

var colorClasses = ["red", "green", "orange", "blue",
	"indigo", "magenta", "purple", "skyblue"];

var iconClasses = ["fa fa-envelope", "fa fa-sun-o", "fa fa-headphones",
	"fa fa-play", "fa fa-shopping-cart", "fa fa-camera", "fa fa-google",
	"fa fa-trophy", "fa fa-file-text", "fa fa-file-picture-o",
	"fa fa-google-wallet", "fa fa-facebook", "fa fa-linkedin",
	"fa fa-pinterest-p", "fa fa-youtube", "fa fa-soundcloud",
	"fa fa-twitter", "fa fa-skype", "fa fa-github", "fa fa-dropbox",
	"fa fa-pied-piper", "fa fa-twitch", "fa fa-wechat",
	"fa fa-hacker-news", "fa fa-stumbleupon", "fa fa-tumblr",
	"fa fa-plane", "fa fa-print"];

function generateWord() {
	var wordindex = Math.floor(Math.random()*words.length);
	return words[wordindex];
}

function generateIcon() {
	var iconindex = Math.floor(Math.random()*iconClasses.length);
	return iconClasses[iconindex];
}

function generateSmallTile() {
	var colorindex = Math.floor(Math.random()*(colorClasses.length));

	var tileText = document.createElement("span");
	tileText.className = "tile-text";
	tileText.innerHTML = generateWord();

	var tileIcon = document.createElement("span");
	tileIcon.className = generateIcon() + " tile-icon";

	var newTile = document.createElement("article");
	newTile.className = "tile " + colorClasses[colorindex];
	newTile.appendChild(tileIcon);
	newTile.appendChild(tileText);

	var num = tiles.length;
	newTile.id = num.toString();
	console.log(newTile.id);

	return {
		'tile': newTile,
		'color': colorClasses[colorindex],
		'large': false,
		'text' : tileText,
		'icon' : tileIcon
	};
}

function generateLargeTile() {
	var colorindex = Math.floor(Math.random()*(colorClasses.length));

	var tileText = document.createElement("span");
	tileText.className = "tile-text";
	tileText.innerHTML = generateWord();

	var tileIcon = document.createElement("span");
	tileIcon.className = generateIcon() + " tile-icon";

	var newTile = document.createElement("article");
	newTile.className = "tile tile-large " + colorClasses[colorindex];
	newTile.appendChild(tileIcon);
	newTile.appendChild(tileText);

	var num = tiles.length;
	newTile.id = num.toString();
	console.log(newTile.id);

	return {
		'tile': newTile,
		'color': colorClasses[colorindex],
		'large': true,
		'text' : tileText,
		'icon' : tileIcon
	};
}

function generateTiles() {
	// Get a random number between 34 and 64 for number of tiles
	var numtiles = Math.floor(Math.random()*(64-34+1)) + 34;

	while (tiles.length < numtiles) {
		// Get a color
		var colorindex = Math.floor(Math.random()*colorClasses.length);
		// Need a 1 in 7 chance of getting a long box.
		var longbox = Math.random() < 0.2;

		// Only make a long box if screen is at least 480.
		if (screen.width > 480 && longbox) {
			tiles.push(generateLargeTile());
			nrows+=1;
		}
		else {
			// Make two small tiles to fill a row or 1 if it's the last
			// box
			tiles.push(generateSmallTile());
			if (tiles.length < numtiles) {
				// Make second box in row. Need another color
				tiles.push(generateSmallTile());
			}
			nrows+=1;
		}
	}
}

function distributeTiles1Col() {
	console.log("One");
	// Put them all in a single column
	tileSpread = document.getElementById("tile-spread");
	var col = document.createElement("section");
	col.className = "column";
	for (var i = 0; i < tiles.length; i++) {
		if (tiles[i].large == true && window.innerWidth <= 480) {
			var smallTile = document.createElement("article");
			smallTile.className = "tile " + tiles[i].color;
			smallTile.appendChild(tiles[i].text.cloneNode(true));
			smallTile.appendChild(tiles[i].icon.cloneNode(true));
			console.log(smallTile);
			col.appendChild(smallTile);
		}
		else {
			col.appendChild(tiles[i].tile);
		}
	}
	tileSpread.appendChild(col);
}

function distributeTilesMultiCol() {
	var i = 0;
	tileSpread = document.getElementById("tile-spread");

	while (i < tiles.length) {
		var col = document.createElement("section");
		col.className = "column";
		for (var row = 0; (row < 4 && i < tiles.length); row++) {
			if (tiles[i].large == true) {
				col.appendChild(tiles[i].tile);
				i++;
			}
			else {
				col.appendChild(tiles[i].tile);
				i++;
				if (i < tiles.length) {
					col.appendChild(tiles[i].tile);
					i++;
				}
			}
		}
		tileSpread.appendChild(col);
	}
}

function distributeTiles() {
	console.log(tiles.length);
	console.log(window.innerWidth);
	if (window.innerWidth < 960) {
		distributeTiles1Col();
	}
	else {
		distributeTilesMultiCol();
	}
}

function clearTiles() {
	tileSpread = document.getElementById("tile-spread");
	while (tileSpread.firstChild) {
		console.log("Removing child");
		tileSpread.removeChild(tileSpread.firstChild);
	}
}

function overlay(tile) {
	bu = document.getElementById("overlaybutton");
	el = document.getElementById("overlay");
	eld = document.getElementById("inneroverlay");
	var index = parseInt(tile.id, 10);

	eld.className = tiles[index].color;
	var icon = document.createElement("span");
	icon.className = tiles[index].icon.className + " modal-icon";
	eld.appendChild(icon);

	var txt = document.createElement("div");
	txt.className = "tile-text modal-text";
	txt.innerHTML = tiles[index].text.innerHTML;
	eld.appendChild(txt);

	console.log(tiles[index].color);
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	vis = (el.style.visability == "visible") ? false : true; 
	console.log(vis);
}

// Initial loading of page
$(document).ready(function() {
	console.log("Document ready");
	generateTiles();
	distributeTiles();

	// Redistribute tiles when window is resized
	$(window).resize(function() {
		console.log("Resizing");
		clearTiles();
		distributeTiles();
	});

	$('.tile').on('click', function (e) {
		overlay(e.target.parentElement);
	});

	$('#overlaybutton').on('click', function (e) {
		el = document.getElementById("overlay");
		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
		eld = document.getElementById("inneroverlay");
		while(eld.firstChild) {
			eld.removeChild(eld.firstChild);
		}
		vis = false;
	});
});

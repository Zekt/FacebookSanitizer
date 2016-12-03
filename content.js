var saintURL = chrome.extension.getURL("stickerURLs/saint.json")
var evilURL = chrome.extension.getURL("stickerURLs/evil.json")
var saints, evils

var saintReq = new XMLHttpRequest()
saintReq.open("get", saintURL, true)
var evilReq = new XMLHttpRequest()
evilReq.open("get", evilURL, true)
saintReq.onreadystatechange = function (e) {
	saints = JSON.parse(saintReq.responseText || null)
	if(saints && evils)
		replaceStickers(saints.urls, evils.urls)
}
evilReq.onreadystatechange = function (e) {
	evils = JSON.parse(evilReq.responseText || null)
	if(saints && evils)
		replaceStickers(saints.urls, evils.urls)
}
saintReq.send(null)
evilReq.send(null)

function replaceStickers(saints, evils) {
	stickers = document.querySelectorAll('[data-testid="ufi_comment_sticker"]')
	for (var i = 0; i < stickers.length; ++i) {
		if(stickers[i].hasAttribute("style")) {
			var bgImg = stickers[i].style.backgroundImage
			for(var j = 0; j < evils.length; ++j) {
				if(bgImg == 'url("'+evils[j]+'")') {
					console.log(saints.length)
					var rand = Math.floor(Math.random() * (saints.length))
					console.log(rand)
					stickers[i].style.backgroundImage = 'url("'+saints[rand]+'")'
					stickers[i].style.backgroundSize = '80px 80px'
					stickers[i].style.height = '80px'
					stickers[i].style.width = '80px'
					break
				}
			}
		}
	}
}

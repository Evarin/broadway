(function() {
	function parseYoutube (url) {
		var ID = '';
		var t0 = "0s";
		url = url.replace(/(>|<)/gi,'');
		var burl = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
		if (burl[2] !== undefined) {
			ID = burl[2].split(/[^0-9a-z_\-]/i);
			ID = ID[0];
		} else {
			ID = burl;
		}
		var t0 = "0s";
		var turl = url.split(/(&t=|\?t=)/i);
		if (turl[2] != undefined) t0 = turl[2].split(/[^0-9smh\.]/i)[0];
		else {
			turl = url.split(/(&start=|\?start=)/i);
			if (turl[2] != undefined) t0 = turl[2].split(/[^0-9]/i)[0] + "s";
		}
		return {id: ID, t0: t0};
	}
	
	function playVideo() {
		var yt_infos = this.yt_infos;
		var t0h = yt_infos.t0.split("h");
		if (t0h.length == 1) t0h = [0, t0h[0]];
		var t0m = t0h[1].split("m");
		if (t0m.length == 1) t0m = [0, t0m[0]];
		var t0s = t0m[1].split("s");
		var start = Number(t0h[0])*3600 + Number(t0m[0])*60 + Number(t0s[0]);
		document.getElementById("bdw_ytplayer").src = "https://www.youtube.com/embed/"+yt_infos.id+"?&autoplay=1&start="+start;
		return false;
	}

	// Clean
	var playbtns = document.getElementsByClassName("bdw_playbtn");
	for(var i=0; i<playbtns.length; i++) playbtns[i].remove();
	var player = document.getElementById("bdw_ytplayer");
	if (player) player.remove();
	
	// Player
	player = document.createElement("iframe");
	player.setAttribute("id", "bdw_ytplayer");
	player.setAttribute("width", "100%");
	player.setAttribute("height", "150px");
	player.setAttribute("frameborder", "0");
	player.setAttribute("allowfullscreen", "allowfullscreen");
	document.getElementById("imageMenu").appendChild(player);
	
	// Add
	var posts = document.getElementsByClassName("post");
	var prev_yt = "";
	for (var i=0; i<posts.length; i++) {
		var post = posts[i];
		var lien = post.querySelector(".lien_associe");
		if (!lien) continue;
		var url = lien.getAttribute("data-lien");
		if (!url.match(/https?:\/\/([a-z]*\.|)youtu(\.be|be(-nocookie|)\.com)\/.*/i)) continue;
		var yt_infos = parseYoutube(url);
		
		var infos = post.querySelector(".infos_auteur");
		var playbtn = document.createElement("a");
		playbtn.href = "https://youtu.be/" + yt_infos.id + "?t=" + yt_infos.t0;
		playbtn.target = "_blank";
		playbtn.classList.add("bdw_playbtn");
		playbtn.yt_infos = yt_infos;
		playbtn.onclick = playVideo;
		if (yt_infos.id == prev_yt.id) {
			playbtn.classList.add("bdw_sameurl");
			if (yt_infos.t0 != prev_yt.t0) playbtn.classList.add("bdw_difft0");
		}
		var playtng = document.createElement("span");
		playtng.classList.add("bdw_playtriangle");
		playbtn.appendChild(playtng);
		
		infos.appendChild(playbtn);
		prev_yt = yt_infos;
	}
})();
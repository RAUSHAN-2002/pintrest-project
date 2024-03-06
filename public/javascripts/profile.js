// Your Username
var userName = "igorsheg";
// -------------

// Global Vars
var userProf = $(".userProf");
var userImg = $(".avatar");
var userDesc = $(".userDesc");
var userTitle = $(".userTitle");
var proBadge = $(".avatar badge");
var pens = $(".pensWrapp");
var pCTA = $(".pensCTA");
var sPen = $(".singlePen");
// -------------

// Global Functions
proBadge.hide();
// -------------

// Animations

var userProfIn = anime.timeline({
	autoplay: false
});

userProfIn
	.add({
		targets: ".avatar",
		opacity: 1,
		translateY: ["15px", "0"],
		easing: "easeOutExpo",
		duration: "480"
	})
	.add({
		targets: ".userTitle h1",
		opacity: 1,
		translateY: ["15px", "0"],
		easing: "easeOutExpo",
		offset: "-=400",
		duration: "480"
	})
	.add({
		targets: ".userDesc .followers",
		opacity: 1,
		translateY: ["15px", "0"],
		easing: "easeOutExpo",
		offset: "-=400",
		duration: "480"
	})

	.add({
		targets: ".userDesc h5",
		opacity: 1,
		translateY: ["15px", "0"],
		easing: "easeOutExpo",
		offset: "-=400",
		duration: "480"
	});

// -------------

// User Profile API

$.getJSON("https://cpv2api.com/profile/" + userName + " ", function (resp) {
	if (resp.success) {
		// Log All The Thing!
		console.log(resp.data);

		// Some vars

		var codePen = resp.data;
		var shadow = "url(" + codePen.avatar + ")";
		var userLink = "https://codepen.io/" + codePen.username + " ";

		// Title Injection

		userImg.children(".wrapp").children("img").attr("src", codePen.avatar);

		userImg.children("span").css("background", shadow);

		userTitle.children("h1").children("a").attr("href", userLink);

		userTitle
			.children("h1")
			.children("a")
			.html(
				codePen.nicename +
					"<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/270939/external-link.svg'>"
			);

		userDesc.children("h5").text(codePen.bio.substr(0, 30) + "...");

		userDesc.children(".followers").html(codePen.followers + " Followers");
		// ----------------

		userProfIn.play();
	}

	// Pro User If
	if (codePen.pro === true) {
		proBadge.show();
	}
});

// -------------

$.getJSON(
	"https://cpv2api.com/pens/popular/" + userName + " ",
	function (resp) {
		if (resp.success) {
			for (var i = 0; i < 2; i++) {
				var codePen = resp.data[i];
				var penImg = codePen.images.small;
				var penTitle = codePen.title;
				var penViews = codePen.views;
				var penLink = codePen.link;

				pens.append(
					"<div class='singlePen'><a target='_blank' href='" +
						penLink +
						"'> <div class='penImg'><h5>" +
						penTitle +
						"</h5><img src=' " +
						penImg +
						"'></div><div class='penBar'><div class='penViews'><img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/270939/eye.svg'>" +
						penViews +
						" </div>  </div></a> </div>"
				);

				console.log(resp.data[i]);
			}
		}
	}
);

// Show Pens Function & Animation

pCTA.click(function () {
	if ($(".userPens").css("display") == "flex") {
		$(".pensCTA").html(
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" transform="translate(1 1)"><rect width="14" height="14" rx="2"/><path d="M7 3.88888889L7 10.1111111M3.88888889 7L10.1111111 7"/></g></svg><p>Show Pens</p>'
		);

		anime({
			targets: ".pensTitle",
			opacity: 0,
			duration: 680,
			easing: "easeOutExpo"
		});

		anime({
			targets: ".singlePen",
			translateY: "20px",
			opacity: 0,
			duration: 680,
			elasticity: "100",
			delay: function (el, i, l) {
				return i * 100;
			}
		});
		$(".userPens")
			.delay(800)
			.queue(function (next) {
				$(this).css("display", "none");
				next();
			});
	} else {
		$(".pensCTA").html(
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" transform="translate(1 1)"><rect width="14" height="14" rx="2"/><path d="M3.88888889,7 L10.1111111,7"/></g></svg><p>Hide Pens</p>'
		);

		$(".userPens").css("display", "flex");

		anime({
			targets: ".pensTitle",
			opacity: 1,
			duration: 680,
			easing: "easeOutExpo"
		});
		var o = 680;

		anime({
			targets: ".singlePen",
			translateY: ["20px", "0"],
			opacity: 1,
			duration: 680,
			elasticity: "100",
			delay: function (el, o, l) {
				return o * 100;
			}
		});
	}
});

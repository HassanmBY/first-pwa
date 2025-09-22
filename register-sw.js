if ("serviceWorker" in navigator) {
	window.addEventListener("load", e => {
		navigator.serviceWorker
			.register("./sw.js")
			.then(registration => {
				console.log("sw registered");
				console.log(registration);
			})
			.catch(err => console.log("sw failed " + err));
	});
}

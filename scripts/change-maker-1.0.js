$(document).ready(function () {
	console.log("The DOM is now loaded.");
	
	// Overall viewmodel for this screen, along with initial state
	function ChangeMakerViewModel() {
		console.log("ChangeMakerViewModel TOP");
		var self = this;
		this.cd_twenties = ko.observable();
		
		// Computed data
		self.amtCdTwenties = ko.computed(function() {
			console.log("self.amtCdTwenties TOP - self.cd_twenties(): " + self.cd_twenties());
		   	var amt = self.cd_twenties();
			console.log("typeof amt: " + (typeof amt));
		   	return amt === undefined ? 0.0 : parseFloat(amt);
		});
	}
	
	ko.applyBindings(new ChangeMakerViewModel());
});
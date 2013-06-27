$(document).ready(function () {
	console.log("The DOM is now loaded.");
	
	// Overall viewmodel for this screen, along with initial state
	function ChangeMakerViewModel() {
		var self = this;
	}
	
	ko.applyBindings(new ChangeMakerViewModel());
});
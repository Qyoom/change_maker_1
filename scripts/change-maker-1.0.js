$(document).ready(function () {
	console.log("The DOM is now loaded.");
	
	// View model - Knockout data binding
	function ChangeMakerViewModel() {
		var self = this;
		
		// Store cash drawer
		this.cd_twenties = ko.observable();
		this.cd_tens = ko.observable();
		this.cd_fives = ko.observable();
		this.cd_ones = ko.observable();
		this.cd_dollars = ko.observable();
		this.cd_half_dollars = ko.observable();
		this.cd_quarters = ko.observable();
		this.cd_dimes = ko.observable();
		this.cd_nickels = ko.observable();
		this.cd_pennies = ko.observable();
		
		// Fill Wallet
		this.w_twenties = ko.observable();
		this.w_tens = ko.observable();
		this.w_fives = ko.observable();
		this.w_ones = ko.observable();
		this.w_dollars = ko.observable();
		this.w_half_dollars = ko.observable();
		this.w_quarters = ko.observable();
		this.w_dimes = ko.observable();
		this.w_nickels = ko.observable();
		this.w_pennies = ko.observable();
		
		// Pay from Wallet
		this.pay_twenty = ko.observable();
		this.pay_ten = ko.observable();
		this.pay_five = ko.observable();
		this.pay_one = ko.observable();
		this.pay_dollar = ko.observable();
		this.pay_half_dollar = ko.observable();
		this.pay_quarter = ko.observable();
		this.pay_dime = ko.observable();
		this.pay_nickel = ko.observable();
		this.pay_penny = ko.observable();
		
		/***** Denomination amounts - store cash drawer *****/
		
		self.amtCdTwenties = ko.computed(function() {
		   	return self.cd_twenties() === undefined ? 0.0 : parseInt(self.cd_twenties()) * 20.00;
		});
		
		self.amtCdTens = ko.computed(function() {
		   	return self.cd_tens() === undefined ? 0.0 : parseInt(self.cd_tens()) * 10.00;
		});
		
		self.amtCdFives = ko.computed(function() {
		   	return self.cd_fives() === undefined ? 0.0 : parseInt(self.cd_fives()) * 5.00;
		});
		
		self.amtCdOnes = ko.computed(function() {
		   	return self.cd_ones() === undefined ? 0.0 : parseInt(self.cd_ones()) * 1.00;
		});
		
		self.amtCdDollars = ko.computed(function() {
		   	return self.cd_dollars() === undefined ? 0.0 : parseInt(self.cd_dollars()) * 1.00;
		});
		
		self.amtCdHalfDollars = ko.computed(function() {
		   	return self.cd_half_dollars() === undefined ? 0.0 : parseInt(self.cd_half_dollars()) * 0.50;
		});
		
		self.amtCdQuarters = ko.computed(function() {
		   	return self.cd_quarters() === undefined ? 0.0 : parseInt(self.cd_quarters()) * 0.25;
		});
		
		self.amtCdDimes = ko.computed(function() {
		   	return self.cd_dimes() === undefined ? 0.0 : parseInt(self.cd_dimes()) * 0.10;
		});
		
		self.amtCdNickels = ko.computed(function() {
		   	return self.cd_nickels() === undefined ? 0.0 : parseInt(self.cd_nickels()) * 0.05;
		});
		
		self.amtCdPennies = ko.computed(function() {
			return self.cd_pennies() === undefined ? 0.0 : parseInt(self.cd_pennies()) * 0.01;
		});
		
		// Store cash drawer total
		self.totalAmtCashDrawer = ko.computed(function() {
			console.log("totalAmtCashDrawer TOP");
			var total = 
				self.amtCdTwenties() +
				self.amtCdTens() +
				self.amtCdFives() +
				self.amtCdOnes() +
				self.amtCdDollars() +
				self.amtCdHalfDollars() +
				self.amtCdQuarters() +
				self.amtCdDimes() +
				self.amtCdNickels() +
				self.amtCdPennies();
			console.log("totalAmtCashDrawer - total: " + total);
			return total;
		});
	
		/***** Denomination amounts - wallet *****/
		
		self.amtWTwenties = ko.computed(function() {
		   	return self.w_twenties() === undefined ? 0.0 : parseInt(self.w_twenties()) * 20.00;
		});
		
		self.amtWTens = ko.computed(function() {
		   	return self.w_tens() === undefined ? 0.0 : parseInt(self.w_tens()) * 10.00;
		});
		
		self.amtWFives = ko.computed(function() {
		   	return self.w_fives() === undefined ? 0.0 : parseInt(self.w_fives()) * 5.00;
		});
		
		self.amtWOnes = ko.computed(function() {
		   	return self.w_ones() === undefined ? 0.0 : parseInt(self.w_ones()) * 1.00;
		});
		
		self.amtWDollars = ko.computed(function() {
		   	return self.w_dollars() === undefined ? 0.0 : parseInt(self.w_dollars()) * 1.00;
		});
		
		self.amtWHalfDollars = ko.computed(function() {
		   	return self.w_half_dollars() === undefined ? 0.0 : parseInt(self.w_half_dollars()) * 0.50;
		});
		
		self.amtWQuarters = ko.computed(function() {
		   	return self.w_quarters() === undefined ? 0.0 : parseInt(self.w_quarters()) * 0.25;
		});
		
		self.amtWDimes = ko.computed(function() {
		   	return self.w_dimes() === undefined ? 0.0 : parseInt(self.w_dimes()) * 0.10;
		});
		
		self.amtWNickels = ko.computed(function() {
		   	return self.w_nickels() === undefined ? 0.0 : parseInt(self.w_nickels()) * 0.05;
		});
		
		self.amtWPennies = ko.computed(function() {
		   	return self.w_pennies() === undefined ? 0.0 : parseInt(self.w_pennies()) * 0.01;
		});
		
		// Wallet total
		self.totalAmtWallet = ko.computed(function() {
			console.log("totalAmtWallet TOP");
			var total = 
				self.amtWTwenties() +
				self.amtWTens() +
				self.amtWFives() +
				self.amtWOnes() +
				self.amtWDollars() +
				self.amtWHalfDollars() +
				self.amtWQuarters() +
				self.amtWDimes() +
				self.amtWNickels() +
				self.amtWPennies();
			console.log("totalAmtWallet - total: " + total);
			return total;
		});
	}
	
	/***** Calculate change *****/
	
	self.changeInTwenties = ko.computed(function() {
	});
	
	self.changeInTens = ko.computed(function() {
	});
	
	self.changeInFives = ko.computed(function() {
	});
	
	self.changeInOnes = ko.computed(function() {
	});
	
	self.changeInDollars = ko.computed(function() {
	});
	
	self.changeInHalfDollars = ko.computed(function() {
	});
	
	self.changeInQuarters = ko.computed(function() {
	});
	
	self.changeInDimes = ko.computed(function() {
	});
	
	self.changeInNickels = ko.computed(function() {
	});
	
	self.changeInPennies = ko.computed(function() {
	});
	
	// Activate bindings
	ko.applyBindings(new ChangeMakerViewModel());
});
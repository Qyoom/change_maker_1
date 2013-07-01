$(document).ready(function () {
	console.log("The DOM is now loaded.");
	
	// View model - Knockout data binding
	function ChangeMakerViewModel() {
		var self = this;
		
		// Store cash drawer
		self.cd_twenties = ko.observable();
		self.cd_tens = ko.observable();
		self.cd_fives = ko.observable();
		self.cd_ones = ko.observable();
		self.cd_dollars = ko.observable();
		self.cd_half_dollars = ko.observable();
		self.cd_quarters = ko.observable();
		self.cd_dimes = ko.observable();
		self.cd_nickels = ko.observable();
		self.cd_pennies = ko.observable();
		
		// Fill Wallet
		self.w_twenties = ko.observable();
		self.w_tens = ko.observable();
		self.w_fives = ko.observable();
		self.w_ones = ko.observable();
		self.w_dollars = ko.observable();
		self.w_half_dollars = ko.observable();
		self.w_quarters = ko.observable();
		self.w_dimes = ko.observable();
		self.w_nickels = ko.observable();
		self.w_pennies = ko.observable();
		
		// Pay from Wallet
		self.pay_twenty = ko.observable();
		self.pay_ten = ko.observable();
		self.pay_five = ko.observable();
		self.pay_one = ko.observable();
		self.pay_dollar = ko.observable();
		self.pay_half_dollar = ko.observable();
		self.pay_quarter = ko.observable();
		self.pay_dime = ko.observable();
		self.pay_nickel = ko.observable();
		self.pay_penny = ko.observable();
		
		// Change
		
		self.changeInTwenties = ko.observable();
		self.changeInTens = ko.observable();
		self.changeInFives = ko.observable();
		self.changeInOnes = ko.observable();
		self.changeInDollars = ko.observable();
		self.changeInHalfDollars = ko.observable();
		self.changeInQuarters = ko.observable();
		self.changeInDimes = ko.observable();
		self.changeInNickels = ko.observable();
		self.changeInPennies = ko.observable();
		
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
			if(self.pay_twenty() !== undefined && self.pay_twenty() > self.w_twenties()) self.pay_twenty(self.w_twenties());			
		   	return self.w_twenties() === undefined ? 0.0 : parseInt(self.w_twenties()) * 20.00;
		});
		
		self.amtWTens = ko.computed(function() {
			if(self.pay_ten() !== undefined && self.pay_ten() > self.w_tens()) self.pay_ten(self.w_tens());
		   	return self.w_tens() === undefined ? 0.0 : parseInt(self.w_tens()) * 10.00;
		});
		
		self.amtWFives = ko.computed(function() {
			if(self.pay_five() !== undefined && self.pay_five() > self.w_fives()) self.pay_five(self.w_fives());
		   	return self.w_fives() === undefined ? 0.0 : parseInt(self.w_fives()) * 5.00;
		});
		
		self.amtWOnes = ko.computed(function() {
			if(self.pay_one() !== undefined && self.pay_one() > self.w_ones()) self.pay_one(self.w_ones());
		   	return self.w_ones() === undefined ? 0.0 : parseInt(self.w_ones()) * 1.00;
		});
		
		self.amtWDollars = ko.computed(function() {
			if(self.pay_dollar() !== undefined && self.pay_dollar() > self.w_dollars()) self.pay_dollar(self.w_dollars());
		   	return self.w_dollars() === undefined ? 0.0 : parseInt(self.w_dollars()) * 1.00;
		});
		
		self.amtWHalfDollars = ko.computed(function() {
			if(self.pay_half_dollar() !== undefined && self.pay_half_dollar() > self.w_half_dollars()) self.pay_half_dollar(self.w_half_dollars());
		   	return self.w_half_dollars() === undefined ? 0.0 : parseInt(self.w_half_dollars()) * 0.50;
		});
		
		self.amtWQuarters = ko.computed(function() {
			if(self.pay_quarter() !== undefined && self.pay_quarter() > self.w_quarters()) self.pay_quarter(self.w_quarters());
		   	return self.w_quarters() === undefined ? 0.0 : parseInt(self.w_quarters()) * 0.25;
		});
		
		self.amtWDimes = ko.computed(function() {
			if(self.pay_dime() !== undefined && self.pay_dime() > self.w_dimes()) self.pay_dime(self.w_dimes());
		   	return self.w_dimes() === undefined ? 0.0 : parseInt(self.w_dimes()) * 0.10;
		});
		
		self.amtWNickels = ko.computed(function() {
			if(self.pay_nickel() !== undefined && self.pay_nickel() > self.w_nickels()) self.pay_nickel(self.w_nickels());
		   	return self.w_nickels() === undefined ? 0.0 : parseInt(self.w_nickels()) * 0.05;
		});
		
		self.amtWPennies = ko.computed(function() {
			if(self.pay_penny() !== undefined && self.pay_penny() > self.w_pennies()) self.pay_penny(self.w_pennies());
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
		
		// Bind payment and pay arrows
		self.paymentAmt = ko.computed(function() {
			console.log("paymentAmt TOP");
			var total =
				(self.pay_twenty() === undefined ? 0.0 : parseInt(self.pay_twenty()) * 20.00) +
				(self.pay_ten() === undefined ? 0.0 : parseInt(self.pay_ten()) * 10.00) +
				(self.pay_five() === undefined ? 0.0 : parseInt(self.pay_five()) * 5.00) +
				(self.pay_one() === undefined ? 0.0 : parseInt(self.pay_one()) * 1.00) +
				(self.pay_dollar() === undefined ? 0.0 : parseInt(self.pay_dollar()) * 1.00) +
				(self.pay_half_dollar() === undefined ? 0.0 : parseInt(self.pay_half_dollar()) * 0.50) +
				(self.pay_quarter() === undefined ? 0.0 : parseInt(self.pay_quarter()) * 0.25) +
				(self.pay_dime() === undefined ? 0.0 : parseInt(self.pay_dime()) * 0.10) +
				(self.pay_nickel() === undefined ? 0.0 : parseInt(self.pay_nickel()) * 0.05) +
				(self.pay_penny() === undefined ? 0.0 : parseInt(self.pay_penny()) * 0.01);
			console.log("paymentAmt - total: " + total);
			if(total == 0) return ""; // display placeholder
			else return formatCurrencyPrint(total);
		});
	} // End - ChangeMakerViewModel
	
	// Activate bindings
	viewModel = new ChangeMakerViewModel();
	ko.applyBindings(viewModel);
});
var viewModel;
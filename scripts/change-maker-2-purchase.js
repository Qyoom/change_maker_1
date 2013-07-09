$(document).ready(function () {
	console.log("DOM loaded");
});
	
function processPayment(e) {
	e.preventDefault();
	console.log("processPayment TOP");
	
	var cost = roundCurrencyCalc($("#cost").val());
	var payment = roundCurrencyCalc($("#payment>span").text());
	
	if(payment < cost) {
		$('#error').text('Payment is less than the cost.');
		return;
	}
	
	factorChangeRemitance(cost, payment);
}

function factorChangeRemitance(cost, payment) {
	console.log("factorChangeRemitance TOP");
	var changeDue = (payment >= cost) ? roundCurrencyCalc(payment - cost) : 0.00; // Round floats to two decimal places
	
	// Change accumulators	
	var changeBalRemain = changeDue;
	var changeInDenoms = [];
	var changeAccume = 0.0;
	
	// Iterate over denominations in change drawer. This code is decoupled from references to specific denominations.
	$('#cash-drawer li').each(function(index) {
		// "this" is the object of the current iteration
		var name = $(this).children("label:first").text(); // name <- denomination name
		var denomQty = parseInt($(this).children("input:first").val());
		var denomVal = roundCurrencyCalc($(this).children("input:first").attr("data-denom"));
		// Determine how many times this denomination can fit into the remaining balance
		changeBalRemain = roundCurrencyCalc(changeBalRemain);
		var denomFactor = (Math.floor(changeBalRemain / denomVal));
		
		// Factor and accumulate quantities and amounts - basic idea: denomination factor * denomination value
		if(denomFactor > 0 && denomQty > 0) {
			// Determine how many of this denomination are available
			denomFactor = (denomFactor <= denomQty) ? denomFactor : denomQty;
			changeBalRemain = changeBalRemain - (denomVal * denomFactor);
			// store results for this denomination
			changeInDenoms.push([name, denomFactor]);
			changeAccume = changeAccume + (denomFactor * denomVal);
		}
	});
	
	console.log("changeDue: " + changeDue + " | changeInDenoms: " + changeInDenoms + 
		" | changeBalRemain (" + changeBalRemain + ") < 0.01 ? " + (changeBalRemain < 0.01) + " | changeAccume: " + changeAccume);
	// UI display
	$('#changeInDenoms').text(formatDisplayChange(changeInDenoms, changeAccume));
	$('#chgDue').text("Change due: " + formatCurrencyPrint(changeDue));
	// Determine if store drawer has enough to make change
	if((roundCurrencyCalc(changeBalRemain)) >= 0.01) {
		$('#error').text("Unable to process transaction‒store does not have enough change!");
	}
	else {
		$('#error').text('');	
	}
	// Format input fields display with two decimal places
	$("#cost").val(formatCurrencyPrint(cost));
	$("#payment").val(formatCurrencyPrint(payment));
} // End - factorChangeRemitance

// Maintain two decimal places for float calc
function roundCurrencyCalc(num) {
	var result = Math.round(parseFloat(num) * 100) / 100;
	return result;
}

// Format currency for printing
function formatCurrencyPrint(num) {
    num = isNaN(num) || num === '' || num === null ? 0.00 : num;
    return parseFloat(num).toFixed(2);
}

// Convert collected data to readable message
function formatDisplayChange(changeAccumeDenoms, changeAccumeSum) {
	var result = "";
	if(changeAccumeDenoms.length == 0) return result;
	else result = result.concat("Change returned (" + formatCurrencyPrint(changeAccumeSum) + "): ");
	for(var i = 0; i < changeAccumeDenoms.length; i++) {
		var denom = changeAccumeDenoms[i][0];
		var qty = changeAccumeDenoms[i][1];
		result = result.concat(denom, ": ", qty);
		if(i < changeAccumeDenoms.length - 1) result = result.concat(", ");
		invokeChangeArrow(denom, qty);
	}
	return result;
}

function invokeChangeArrow(denom, qty) {
	if(denom == "Penny") denom = "Pennies";
	denom = "changeIn" + denom.replace(/ /g,'');
	if(denom == "Twenties") self.viewModel.changeInTwenties(qty);
	if(denom == "Tens") self.viewModel.changeInTens(qty);
	if(denom == "Fives") self.viewModel.changeInFives(qty);
	if(denom == "Ones") self.viewModel.changeInOnes(qty);
	if(denom == "Dollars") self.viewModel.changeInDollars(qty);
	if(denom == "HalfDollars") self.viewModel.changeInHalfDollars(qty);
	if(denom == "Quarters") self.viewModel.changeInQuarters(qty);
	if(denom == "Dimes") self.viewModel.changeInDimes(qty);
	if(denom == "Nickels") self.viewModel.changeInNickels(qty);
	if(denom == "Pennies") self.viewModel.changeInPennies(qty);
}

function clearFields(e) {
	e.preventDefault();
	$("#cost").val('');
	$("#payment").val('');
	$('#changeInDenoms').text('');
	$("#chgDue").text('');
	$('#error').text('');
	// payment arrows
	$('#exchange>table').find('input').val('');
	self.viewModel.pay_twenty(0);
	self.viewModel.pay_ten(0);
	self.viewModel.pay_five(0);
	self.viewModel.pay_one(0);
	self.viewModel.pay_dollar(0);
	self.viewModel.pay_half_dollar(0);
	self.viewModel.pay_quarter(0);
	self.viewModel.pay_dime(0);
	self.viewModel.pay_nickel(0);
	self.viewModel.pay_penny(0);
}
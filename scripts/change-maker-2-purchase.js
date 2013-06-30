$(document).ready(function () {
	console.log("DOM loaded");
});
	
function processPayment(e) {
	e.preventDefault();
	console.log("processPayment TOP");
	
	var cost = formatCurrencyCalcStr($("#cost").val());
	var payment = formatCurrencyCalcStr($("#payment").val());
	
	if(payment < cost) {
		$('#error').text('Payment is less than the cost.');
		return;
	}
	
	var changeDue = (payment >= cost) ? roundCurrencyCalcNum(payment - cost) : 0.00; // Round floats to two decimal places
	
	// Accumulators	
	var changeBalRemain = changeDue;
	var changeInDenoms = [];
	var changeAccume = 0.0;
	
	// Iterate over denominations in change drawer. This code is decoupled from references to specific denominations.
	$('#cash-drawer li').each(function(index) {
		// "this" is the object of the current iteration
		var name = $(this).children("label:first").text(); // name <- denomination name
		var denomQty = parseInt($(this).children("input:first").val());
		var denomVal = formatCurrencyCalcStr($(this).children("input:first").attr("data-denom"));
		// Determine how many times this denomination can fit into the remaining balance
		changeBalRemain = roundCurrencyCalcNum(changeBalRemain);
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
	$('#changeInDenoms').text(stringifyChange(changeInDenoms, changeAccume));
	$('#chgDue').text("Change due: " + formatCurrencyPrint(changeDue));
	// Determine is store drawer has enough to make change
	if((roundCurrencyCalcNum(changeBalRemain)) >= 0.01) {
		$('#error').text("Unable to process transaction‒Not enough change!");
	}
	else {
		$('#error').text('');	
	}
	// Format input fields display with two decimal places
	$("#cost").val(formatCurrencyPrint(cost));
	$("#payment").val(formatCurrencyPrint(payment));
}

// Maintain two decimal places for float calc
function roundCurrencyCalcNum(num) {
	var result = Math.round(parseFloat(num) * 100) / 100;
	return result;
}

// Maintain two decimal place formatting for floats from strings
function formatCurrencyCalcStr(str) {
	var result = Math.round(parseFloat(str) * 100) / 100;
	return result;
}

// Format currency for printing
function formatCurrencyPrint(num) {
    num = isNaN(num) || num === '' || num === null ? 0.00 : num;
    return parseFloat(num).toFixed(2);
}

// Convert collected data to readable message
function stringifyChange(changeAccumeDenoms, changeAccumeSum) {
	var result = "";
	if(changeAccumeDenoms.length == 0) return result;
	else result = result.concat("Change returned (" + formatCurrencyPrint(changeAccumeSum) + "): ");
	var denom = 0, qty = 1;
	for(var i = 0; i < changeAccumeDenoms.length; i++) {
		result = result.concat(changeAccumeDenoms[i][denom], ": ", changeAccumeDenoms[i][qty]);
		if(i < changeAccumeDenoms.length - 1) result = result.concat(", ");
	}
	return result;
}

function clearFields() {
	$("#cost").val('');
	$("#payment").val('');
	$('#changeInDenoms').text('');
	$("#chgDue").text('');
	$('#error').text('');
}
/** Version: 1.0
 *  Project: Sorrento by the Sea - luxury apartment located on the picturesque Mornington Peninsula
 *  Company: Sorrento
 *  Program: The website you developed has static content including text information and images.
 *			 Enquiry form - The enquiry form is validated to ensure users have fill out form 
 *			 with the right data in the correct format.
 *			 •	Username field must contain at least two letters (uppercase and lowercase).
 *			 •	Email field must contain a valid email format.
 *			 •	Phone field must contain digits only.
 *			 •	At least one contact field (email or phone) must be entered.
 *			 •	Message field cannot be left empty.
 *			 Automated price calculator - Create a price calculator to help prospective occupants 
 *			 to find the total price of booking the apartment in the next three months.
 */
var period = { start: '', end: '' };

/**
 * Initialise the page, set the calendars for starting and ending dates
 * Set google map
 */
$(function() {
	$( "#startDate" ).datepicker();
	$( "#startDate" ).datepicker("hide");
   
	$( "#endDate" ).datepicker();
	$( "#endDate" ).datepicker("hide");
	
	var setting = {"height":350,"width":350,"zoom":14,"queryString":"42 Holyrood Avenue, Sorrento Victoria, Australia","place_id":"EjA0MiBIb2x5cm9vZCBBdmVudWUsIFNvcnJlbnRvIFZpY3RvcmlhLCBBdXN0cmFsaWEiMBIuChQKEglpY1EOezXUahExN9BS6M-N6BAqKhQKEgl3i9fFejXUahEMeg1L2l2JuQ","satellite":false,"centerCoord":[-38.347422512562844,144.7498093],"cid":"0xf1dce538da37e359","lang":"en","cityUrl":"/australia/rye-4346","cityAnchorText":"Map of Rye, Victoria, Australia","id":"map-9cd199b9cc5410cd3b1ad21cab2e54d3","embed_id":"259620"};
	var d = document;
	var s = d.createElement('script');
	s.src = 'https://1map.com/js/script-for-user.js?embed_id=259620';
	s.async = true;
	s.onload = function (e) {
	  window.OneMap.initMap(setting)
	};
	var to = d.getElementsByTagName('script')[0];
	to.parentNode.insertBefore(s, to);
 });

/**
 * Process the enquiry (contact) form when the 'Submit' button is clicked
 * It clears all input fields
 * It valids all input fields
 * @return {bool} true if it is successfully processed, else return false
 */
function ProcessEnquiry()
{
	var valid = false;
	clearAllErrorMessage();
	valid = ValidateName();
	valid = ValidteContactFields();
	valid = ValidateMessage();
	
	return valid;
}

/**
 * Clear data in textboxes of contact form
 */
function clearAllErrorMessage()
{
	document.getElementById("errName").innerHTML = "";
	document.getElementById("errEmail").innerHTML = "";
	document.getElementById("errPhone").innerHTML = "";
	document.getElementById("errTheMessage").innerHTML = "";
}

/**
 * Validate name of the user given by a user
 * It must not be empty
 * It must be at least 2 characters; one lowercase and one uppercase
 * @return {bool} true if the name is valid, else return false
 */
function ValidateName()
{
	document.getElementById("errName").innerHTML = "";
	
	var name = document.getElementById("name").value;
	var valid = true;
	/* Validate the name, it must contain at least two letters (uppercase and lowercase) */
	if (name == "")
	{
		document.getElementById("errName").innerHTML = "Name is required.";
		valid = false;
	}
	else if (name.length < 2)
	{
		document.getElementById("errName").innerHTML = "Name must be at least two letters.";
		valid = false;
	}
	else 
	{	
		if (name == name.toUpperCase())
		{
			document.getElementById("errName").innerHTML = "Name must contain at least one lowercase.";
			valid = false;
		}
		if (name == name.toLowerCase())
		{
			document.getElementById("errName").innerHTML = "Name must contain at least one uppercase.";
			valid = false;
		}
	}
	
	return valid;
}

/**
 * Validate the phone and email fields given by a user
 * At least one contact (phone or email) must be provided
 * Phone must be number
 * Email must be in the right format
 * @return {bool} true if the starting date is valid, else return false
 */
function ValidteContactFields()
{
	document.getElementById("errEmail").innerHTML = "";
	document.getElementById("errPhone").innerHTML = "";
	var phone = document.getElementById("phone").value;
	var email = document.getElementById("email").value;
	var valid = true;
	
	/* At least one contact field (email or phone) must be entered */
	if (email == "" && phone == "")
	{
		document.getElementById("errEmail").innerHTML = "Email or phone must be provided.";
		document.getElementById("errPhone").innerHTML = "Email or phone must be provided.";
		valid = false;
	} else if (email != "" && !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
	{ /* Validate email address, it must contain a valid email format */
		document.getElementById("errEmail").innerHTML = "Invalid email format.";
		valid = false;
	} else if (phone != "" && isNaN(phone))
	{ /* Validate mobile number, it must contain digits only */
		document.getElementById("errPhone").innerHTML = "Phone number must be numbers.";
		valid = false;
	} 
	
	return valid;
}

/**
 * Validate the message input given by a user
 * @return {bool} true if the message is provided, else return false
 */
function ValidateMessage()
{
	document.getElementById("errTheMessage").innerHTML = "";
	var theMessage = document.getElementById("theMessage").value;
	var valid = true;
	
	if (theMessage == "")
	{
		document.getElementById("errTheMessage").innerHTML = "Message is required.";
		valid = false;
	}

	return valid;
}

/**
 * Calculate total price based on the values of starting date and ending date given by a user
 * 		- 1. Check the input dates (starting and ending dates)
 *		- 2. Construct booking details into arrays based on the input given
 *		- 3. Display booking price in the total price textbox
 *		- 4. Display booking details in a table format
 * @return {bool} true if all input data are valid, else return false
 */
function CalculatePrice()
{
	var startDate = document.getElementById("startDate").value;
	if (startDate == "")
	{
		document.getElementById("errStartDate").innerHTML = "Starting date is required.";
		return false;
	}
	
	var endDate = document.getElementById("endDate").value;
	if (endDate == "")
	{
		document.getElementById("errEndDate").innerHTML = "Ending date is required.";
		return false;
	}
	
	var valid = true;
	valid = ValidateStartDate();
	valid = ValidateEndDate();
	if (valid)
	{
		var bookingDetails = GetBookingDetails();
		document.getElementById("totalPrice").value = "$" + bookingDetails.totalPrice;
		
		DisplayBooking(bookingDetails);
	}
	return valid;
}

/**
 * Validate the starting date input given by a user
 * @return {bool} true if the starting date is valid, else return false
 */
function ValidateStartDate()
{
	document.getElementById("errStartDate").innerHTML = "";
	var valid = true;
	var today = new Date();
	var endPeriod = AddMonths(new Date(), 3);
	var startDateStr = document.getElementById("startDate").value;
	var startDate = new Date(startDateStr);
	
	/**
	 * Chceck the starting date input, it must not be empty
	 */
	if (startDateStr != "")
	{
		/**
		 * Check the date, it must be later than today date
		 */
		if (startDate.getTime() < today.getTime())
		{
			document.getElementById("errStartDate").innerHTML = "Starting date must be later than today.";
			valid = false;
		}
		else if (startDate.getTime() >= endPeriod.getTime())
		{
			document.getElementById("errStartDate").innerHTML = "You can book only 3 months in advance.";
			valid = false;
		}
		else 
		{
			period.start = startDate;
		}
	}

	return valid;
}

/**
 * Validate the ending date input given by a user
 * @return {bool} true if the ending date is valid, else return false
 */
function ValidateEndDate()
{
	document.getElementById("errEndDate").innerHTML = "";
	var valid = true;
	var today = new Date();
	var endPeriod = AddMonths(new Date(), 3);
	var startDateStr = document.getElementById("startDate").value;
	var endDateStr = document.getElementById("endDate").value;
	var startDate = new Date(startDateStr);
	var endDate = new Date(endDateStr);
	
	/**
	 * Chceck the ending date input, it must not be empty
	 */
	if (endDateStr != "")
	{
		/**
		 * Check the date, it must be later than today date
		 */
		if (endDate.getTime() < today.getTime())
		{
			document.getElementById("errEndDate").innerHTML = "Ending date must be later than today.";
			valid = false;
		}
		else if (startDate != "")
		{
			/**
			 * Check the ending date, it must be later than the starting date if the starting date is provided
			 */
			if (endDate.getTime() < startDate.getTime())
			{
				document.getElementById("errEndDate").innerHTML = "Ending date must be later than starting date.";
				valid = false;
			}
			else if (endDate.getTime() >= endPeriod.getTime())
			{
				document.getElementById("errEndDate").innerHTML = "You can book only 3 months in advance.";
				valid = false;
			}
			else
			{
				period.end = endDate;
			}
		}
	}
	
	return valid;
}

/**
 * Increment the number of month by the value of passing months
 * @param {date}
 * @param {months} integer, number of months to be incremented
 * @return {date} date that has been incremented by months 
 */
function AddMonths(date, months)
{
	var d = date.getDate();
	date.setMonth(date.getMonth() + months);
	if (date.getDate() != d)
		date.setDate(0);
			
	return date;	
}

/**
 * Construct booking details given by a user into an object of two arrays and a double
 * The first array in booking details object is an array of booking dates
 * The second array in booking details object is an array of booking prices
 * The double in booking details object is the total price of period booked
 * @return {object} Object of booking details
 */
function GetBookingDetails()
{
	var totalPrice = 0;
	var bookingDates = new Array();
	var bookingPrices = new Array();
	var startDate = new Date(period.start.getFullYear(), period.start.getMonth(), period.start.getDate());
	var endDate = new Date(period.end.getFullYear(), period.end.getMonth(), period.end.getDate());
	
	/**
	 * Construct each season. The details are given by the hotel.
	 * The details consist of the start date, end date, and price of the seasons' period
	 * given by the hotel
	 */
	var season1 = ConstructPeriod("06-01", "08-31", 200);
	var season2 = ConstructPeriod("09-01", "12-18", 220);
	var season3 = ConstructPeriod("12-19", "01-31", 250);
	var season4 = ConstructPeriod("02-01", "05-31", 220);
	
	/**
	 * Loop through the selected period chosen by a user
	 * Search in each season period to find its price
	 * Add into booking dates and booking prices arrays accordingly
	 */
	for (var date = startDate; date <= endDate; date.setDate(date.getDate() + 1))
	{
		var dateStr = FormatDate(date);
		var ddate = new Date(date);
		
		bookingDates.push(ddate);		
		
		if (season1.period.includes(dateStr)) 
		{
			totalPrice += season1.price;
			bookingPrices.push(season1.price);
		}
		else if (season2.period.includes(dateStr))
		{
			totalPrice += season2.price;
			bookingPrices.push(season2.price);
		}
		else if (season3.period.includes(dateStr))
		{
			totalPrice += season3.price;
			bookingPrices.push(season3.price);
		}
		else if (season4.period.includes(dateStr))
		{
			totalPrice += season4.price;
			bookingPrices.push(season4.price);
		}
	}
		
	return {totalPrice: totalPrice, bookingDates: bookingDates, bookingPrices: bookingPrices};
}

/**
 * Construct period of each holiday season given by the hotel
 * @param {string} starting date of the season in string format 'dd-mm'
 * @param {string} Ending date of the season in string format 'dd-mm'
 * @param {double} Price of a night stay during the given period
 * @return {object} Object an array containing dates in the season, and the price of that period
 */
function ConstructPeriod(startPeriodStr, endPeriodStr, price)
{
	var period = new Array(); 
	var today = new Date();
	var year = today.getFullYear();
	var startPeriod = new Date(year + "-" + startPeriodStr);
	var endPeriod = new Date(year + "-" + endPeriodStr);
	if (startPeriod < today) startPeriod = new Date(year+1 + "-" + startPeriodStr);
	if (endPeriod < today) endPeriod = new Date(year+1 + "-" + endPeriodStr);
	if (startPeriod > endPeriod) startPeriod = new Date(year + "-" + startPeriodStr);;
	
	for (var date = startPeriod; date <= endPeriod; date.setDate(date.getDate() + 1))
	{
		var dateStr = FormatDate(date);
		period.push(dateStr);
	}
	
	return {period: period, price: price};
}

/**
 * Format given date in 'dd-mm-yyyy' format
 * @param {Date} date to be formated
 * @return {string} string of date in 'dd-mm-yyyy' format
 */
function FormatDate(date)
{
	var d = date.getDate();
	var m = date.getMonth() + 1;
	var y = date.getFullYear();
	return (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;	
}

/**
 * Construct a table to display the booking details
 * Add an eventListener to each recycling bin image to call a function that remove booking of the existing row
 * @param {object} object of bookingDetails containing bookingDates array and bookingPrice array
 */
function DisplayBooking(bookingDetails)
{	
	document.getElementById("totalPrice").value = "$" + bookingDetails.totalPrice;
	
	// Initialise the booking table
	var body = document.getElementById("booking");
	body.innerHTML = "";
	var tbl = document.createElement("table");
	tbl.style.width = "70%";
	tbl.setAttribute("border", "1");
	var tbdy = document.createElement("tbody");
	var td;
	// Table header
	var tr = document.createElement("tr");
	for (var j = 0; j < 3; j++)
	{
		var td = document.createElement("td");
		var text = "", width = "";
		
		if (j == 0)
		{
			width = "55%";
			text = "Date";
		}
		else if (j == 1)
		{
			width = "35%";
			text = "Price";
		}
		else
		{	
			width = "10%";
			text = "Delete";
		}
		
		td.appendChild(document.createTextNode(text));
		td.setAttribute("width", width);
		tr.appendChild(td);
		tbdy.appendChild(tr);
	}
	// Loop through bookingDetals object to display the booking details in each row of the table
	for (var i = 0; i < bookingDetails.bookingDates.length; i++) 
	{
		tr = document.createElement("tr");
		for (var j = 0; j < 3; j++)
		{ 
			td = document.createElement("td");
			if (j == 0) // The first column of each row containing date of booking
			{
				td.appendChild(document.createTextNode(bookingDetails.bookingDates[i].toDateString()));
			}
			else if (j == 1) // The second column of each row containing price of booking
			{
				td.appendChild(document.createTextNode(bookingDetails.bookingPrices[i]));
			}
			else // The third column of each row containing a bin image. It provokes a removeBooking function when clicked
			{
				var img = new Image();
				img.src = "images/bin.png";
				img.id = i;
				img.addEventListener( 'click', function(){removeBooking(bookingDetails, this );}, false );
				td.appendChild(img);					
			}	
			tr.appendChild(td);
		}
		tbdy.appendChild(tr);
	}
	
	// Last row of the column, to display total price of all dates booked
	tr = document.createElement("tr");
	td = document.createElement("td");	
	td.appendChild(document.createTextNode("Total price:"));
	tr.appendChild(td);
	td = document.createElement("td");	
	td.appendChild(document.createTextNode("$" + bookingDetails.totalPrice));
	tr.appendChild(td);
	td = document.createElement("td");	
	td.appendChild(document.createTextNode("\u0020"));
	tr.appendChild(td);
	tbdy.appendChild(tr);
	
	tbl.appendChild(tbdy);
	body.appendChild(tbl);
}

/**
 * Remove a booking from bookingDates array and bookingPrices array
 * These two array are attributes of bookingDetails object
 * Then loop through the bookingPrices array to calculate the total price
 * @param {object} object of bookingDetails containing bookingDates array and bookingPrice array
 * @param {object} the current calling element of HTML
 */
function removeBooking(bookingDetails, obj)
{
	var totalPrice = 0;
	// Remove 1 element at index obj.id
	bookingDetails.bookingDates.splice([obj.id],1); 
	bookingDetails.bookingPrices.splice([obj.id],1);

	// Loop through the existing bookingPrice array to calcuate the total price
	for (let index in bookingDetails.bookingPrices)
	{
		totalPrice += bookingDetails.bookingPrices[index];
	}
	bookingDetails.totalPrice = totalPrice;
	DisplayBooking(bookingDetails);
}
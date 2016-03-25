/* Switch Settings Screens (Other)  */

$(function(){
	$('#accountClick').click(function(){
		$('#account').removeClass('activeSettings').addClass('activeSettings');
		$('#settings').removeClass('activeSettings');
		$('#accountClick').removeAttr('href');
		$('#settingsClick').removeAttr('href').attr('href','#');
    	}
	);
	
	$('#settingsClick').click(function(){
		$('#account').removeClass('activeSettings');
		$('#settings').removeClass('activeSettings').addClass('activeSettings');
		$('#settingsClick').removeAttr('href');
		$('#accountClick').removeAttr('href').attr('href','#');
    	}
	);
});

// Sends information about the checkbox/radiobutton to the server on change
$("input[type='radio'],input[type='checkbox']").change(function(){
	// Check if it is checked and deliver the name
	var check = this.checked;
	var name = this.getAttribute("id");
	// Use text/plain because of the small size
	$.ajax({
	    type: 'POST',
		url: '/changeSettings',
		data: String(name+"&"+check),
		contentType: 'text/plain; charset=UTF-8'
	});
});

// Get some HTML depending on the given field and adds it to the website
function updateAccount(field){
	$.ajax({
	    type: 'POST',
		url: '/updateAccount',
		data: String(field),
		contentType: 'text/plain; charset=UTF-8'
	}).done(function(html){$("#settingsWrapper").after(html); });
}

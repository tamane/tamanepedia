function showResults(response){
	$('#results_container').show('slow').css('display','inline-block');
	
	//Results for
	$('#user_input_text').html(response[0]);
			
	//Show linked results						
	for ( var e = 0; e < response[1].length; e++){
				
		$('#result').append( "<li><a href='"+response[3][e]+"' target='_blank'>"+response[1][e]+"</a></li>" );
				
	}
}

function getWiki(){
	
	// Clear previous search
	var div = document.getElementById('result');
	while(div.firstChild){
    	div.removeChild(div.firstChild);
	}
	
	// Replace blank spaces
	var $user_input = $('#input').val().replace(/\s/g, '+');
	
	// Get user entry
	var $url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&smaxage=0&uselang=user&search="+$user_input+"";
  
  	// Using YQL and JSONP
	$.ajax({
		url: $url,

		// The name of the callback parameter, as specified by the YQL service
		jsonp: "callback",

		// Tell jQuery we're expecting JSONP
		dataType: "jsonp",

		// Tell YQL what we want and that we want JSON
		data: {
			q: "",
			format: "json"
		},

		// Work with the response
		success: function( response ) {
			
			showResults(response);
			
		}
	});
  
}


$(document).ready(function(){
	
	$('#search_button').submit(function(){
		getWiki();
		event.preventDefault();
	});
	
	$('#random_button').on('click', function(){
		window.location.href = 'https://en.wikipedia.org/wiki/Special:Random';
		return false;
	});
	
	$('#input').focus(function(){
		autocomplete();
		event.preventDefault();
	});
	
	//Autocomplete
	function autocomplete() {

    	$('#input').autocomplete({
		source: function( request, response ) {
			$.ajax({
			  url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&smaxage=0&uselang=user&search="+request.term+"",
			  dataType: "jsonp",
			  data: { format: "json" },
			  success: function( data ) {
				  response( data[1] );
				  }
			});
      	},
      	minLength: 3,
		select: function( event, ui ) {
			var $selectedItem = ui.item.value;
			
			// Clear previous search
			var div = document.getElementById('result');
			while(div.firstChild){
	    		div.removeChild(div.firstChild);
			}
	
			// Replace blank spaces
			var $selectedItem_NS = $selectedItem.replace(/\s/g, '+');
	
			// Get user selection
			var $url2 = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&smaxage=0&uselang=user&search="+$selectedItem_NS+"";
  
  			// Using YQL and JSONP
			$.ajax({
				url: $url2,
				jsonp: "callback",
				dataType: "jsonp",
				data: {
					q: "",
					format: "json"
				},
				success: function( response ) {
					
					showResults(response);	

				}
			});
			
      	},
		open: function() {
			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      	},
		close: function() {
			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		}
		});
	}
	
	
});
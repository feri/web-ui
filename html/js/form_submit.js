window.token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cL2FwaS5nYXJiYWdlcGxhLm5ldFwvYXBpXC9hdXRoZW50aWNhdGUiLCJpYXQiOiIxNDQ2OTAxNTcxIiwiZXhwIjoiMTQ0NjkwNTE3MSIsIm5iZiI6IjE0NDY5MDE1NzEiLCJqdGkiOiJhMzljOTg1ZDZmNWNjNmU4MGNlMmQzOWZjODg5NWM1YSJ9.R28VF7VI1S3-PpvaG6cjpyxpygvQCB0JXF5oQ27TxCw';
$(function () {
	$('.l-form-1').on( 'submit', function (event) {
		var that = this;
		event.preventDefault();
		var typeOfTrash = [];
		var amoutOfTrash;
		var lat;
		var lng;
		var image_url;
		$(this).find('.selectpicker.type-of-trash option:selected').each(function(index, value) {
			typeOfTrash.push($(value).val());
		})

		$(this).find('.selectpicker.amount-of-trash option:selected').each(function (index, value) {
			amoutOfTrash = $(value).val();
		})
		image_url = $(this).find('.l-image-hidden-value').val();
		lat = $(this).find('.l-lat').val();
		lng = $(this).find('.l-lng').val();


		console.log('lat', lat);
		console.log('lng', lng);
		console.log('typeof trash', typeOfTrash);
		console.log('amoutof trash', amoutOfTrash);
		console.log('image_url', image_url);


		setTimeout(function () {
			var useToken = localStorage["token"] || window.token;
			$.ajax({
				url: 'http://api.garbagepla.net/api/trashes',
				headers: {"Authorization": "Bearer" + useToken},
				data: {
				 	'lat': lat,
			        'lng': lng,
			        'amount': amoutOfTrash,
			        'types': typeOfTrash.join(),
			        'image_url': image_url
			    },
			    method: 'post',
			    success: function (data) {
			    	console.log('suc data', data);
			    	alert('Marker saved successfully!');
			    	if (amoutOfTrash > 4) {
			    		alert('NOTE!!! According to the amount of trash, your request was also sent to City of Helsinki!');
			    	};
                    sidebar.hide('slow');

			    },
			    error: function (err) {
			    	console.log('err', err);
			    	alert('Please register and login to save markers', err);
                    sidebar.hide();
                    map.removeLayer(marker);
			    }
			})
		}, 100);

	})
});


$('#button-save-tile').click(function () {
	var ne_lat = Number($('#activate-tile-dialog').find('.tile-ne-lat').text());
	var ne_lng = Number($('#activate-tile-dialog').find('.tile-ne-lng').text());
	var sw_lat = Number($('#activate-tile-dialog').find('.tile-sw-lat').text());
	var sw_lng = Number($('#activate-tile-dialog').find('.tile-sw-lng').text());
	var tile_name = $('#l-tile-name').val();
	console.log('ne_lat',ne_lat);
	console.log('ne_lng',ne_lng);
	console.log('sw_lat',sw_lat);
	console.log('sw_lng', sw_lng);
	console.log('tile name', tile_name);
	var useToken = localStorage["token"] || window.token;
	$.ajax({
		url: 'http://api.garbagepla.net/api/monitoringtiles',
		headers: {"Authorization": "Bearer " + useToken},
		data: {
			'name': tile_name,
		 	'ne_lat': ne_lat,
	        'ne_lng': ne_lng,
	        'sw_lat': sw_lat,
	        'sw_lng': sw_lng
	    },
	    method: 'post',
	    success: function (data) {
	    	console.log('suc data', data);
	    	alert('Tile saved successfully!');
	    	window.rectangle.editing.disable();
            sidebar.hide('slow');

	    },
	    error: function (err) {
	    	console.log('err', err);
	    	alert('Please register to save markers', err);
            sidebar.hide();
	    }
	})
})
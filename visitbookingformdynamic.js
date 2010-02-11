(function($) {
	$.fn.dynamicBookingForm = function(options) {
		var container = $(this);
		var prcontainer = $('<input type="hidden" name="pr" value="" />').appendTo(container.find('form'));
		var roomSelector = $('#select_rooms', this);
		var rooms = $('.room', container);
		roomSelector.change(function() {
			rooms.addClass('hidden');
			for (var i = 1; i <= $(this).val(); i++) {
				$('#room'+i, container).removeClass('hidden');
			}
		}).change();
		
		$('select.children', this).change(function() {
			var children = $(this).val();
			var room = $(this).parents('.room');
			var roomid = room.attr('id').replace("room", "");
			var childages = $('.childagelabel', room).addClass('hidden');
			for (var i = 1; i <= children; i++) {
				$('#childage_'+roomid+"_"+i).removeClass('hidden');
			}
		}).change();
		
		var makePrString = function () {
			var str = "";
			var noRooms = roomSelector.val();
			for (var i = 1; i <= noRooms; i++) {
				if (str.length > 0) {
					str += "r";
				}
				str += $('#select_adults_' + i).val();
				
				var children = $('#select_children_' + i).val();
				if (children > 0) {
					str += "a";
				}
				for (var j = 1; j <= children; j++) {
					if (j > 1) {
						str += "c";
					}
					str += $('#select_childage_' + i + '_' + j).val();
				}
			}
			prcontainer.val(str);
		}
		
		$('select', this).change(makePrString).change();
	}
})(jQuery);	

$(function() {
	$('#bookingform').dynamicBookingForm();
	
	options = {
			minDate: 1
	};
	$('#date_dateto').datepicker(options);
	options.minDate = 0;
	options.onSelect = function(dateText, inst) {
		d = $(this).datepicker('getDate');
		if (d) {
			ed = new Date(d.setDate(d.getDate()+1));
			if ($('#date_dateto').datepicker('getDate') <= d) {
				$('#date_dateto').datepicker('setDate', ed);
			}
			$('#date_dateto').datepicker('option', 'minDate', ed);
		}
	};
	$('#date_datefrom').datepicker(options);

	$('#bookingform li.newsletter a').addClass('iframe').fancybox({frameWidth: 460, frameHeight: 380});
});
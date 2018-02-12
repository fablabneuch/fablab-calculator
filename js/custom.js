(function($){

	function ceilPriceToCHF(price){
		return (Math.ceil(price)).toFixed(2);
	}

	function ceilPriceToDCHT(price){
		return (Math.ceil(price * 10) / 10).toFixed(2);
	}

	function priceHoursPrinter(h, p_h, c_a, h_max) {
		//default values
		if (c_a === undefined) {
			c_a = 0.7;
		}
		if (h_max === undefined) {
			h_max = 30;
		}

		var price = null;

		if (h <= 1) {
			price = p_h;
		} else {
			for (i=2;i<=h;i++) {
				a=i*c_a;
				if (a > h_max) {
					a = h_max;
				}
				price = price + (p_h * (1/a));
			}
			price = price + p_h;
		}

		return price;
	}

	//From G.Bussy
	function calculFdm(){
		var finalValue = null;
		var prix_abo = null;
		var material = null;

		// Récupération de la quantité de produit voulu
		var input_h = parseFloat($('#fdm-heures').val()) || 0;
		var input_p = parseFloat($('#fdm-poids').val()) || 0;
		var input_p_pva = parseFloat($('#fdm-poids-pva').val()) || 0;

		finalValue = priceHoursPrinter(input_h, 10);

		material = input_p*0.1 + input_p_pva*0.2;

		prix_abo = finalValue/2 + material;
		finalValue = finalValue + material;

		$('#fdm-price').val(ceilPriceToCHF(finalValue));
		$('#fdm-price-material').val(ceilPriceToDCHT(material));
		$('#fdm-price-membre').val(ceilPriceToCHF(prix_abo));
	}

	function calculSla(){
		var finalValue = null;
		var prix_abo = null;

		// Récupération de la quantité de produit voulu
		var input_h = parseFloat($('#sla-heures').val()) || 0;
		var input_p = parseFloat($('#sla-poids').val()) || 0;

		finalValue = priceHoursPrinter(input_h, 10);

		prix_abo = finalValue/2 + input_p*0.7;
		finalValue = finalValue + input_p*0.7;

		$('#sla-price').val(ceilPriceToCHF(finalValue));
		$('#sla-price-membre').val(ceilPriceToCHF(prix_abo));
	}

	function calculShs(){
		var finalValue = null;

		// Récupération de la quantité de produit voulu
		var input_p = parseFloat($('#shs-poids').val()) || 0;

		// Calcul du prix
		finalValue = input_p*0.7;

		$('#shs-price').val(ceilPriceToCHF(finalValue));
	}

	function calculObj(){
		var finalValue = null;

		// Récupération de la quantité de produit voulu
		var input_h = parseFloat($('#obj-heures').val()) || 0;
		var input_pm = parseFloat($('#obj-poids-modele').val()) || 0;
		var input_ps = parseFloat($('#obj-poids-support').val()) || 0;

		finalValue = priceHoursPrinter(input_h, 20);

		finalValue = finalValue + input_pm*1.1 + input_ps*0.7;

		$('#obj-price').val(ceilPriceToCHF(finalValue));
	}

	function calculLaser(){
		var finalValue = null;

		// Récupération de la quantité de produit voulu
		var input_h = parseFloat($('#laser-heures').val()) || 0;

		finalValue = 20*input_h;

		prix_abo = finalValue/2;

		$('#laser-price').val(ceilPriceToCHF(finalValue));
		$('#laser-price-membre').val(ceilPriceToCHF(prix_abo));
	}

	$(document).ready(function() {
		//Initial price update
		calculFdm();
		calculSla();
		calculShs();
		calculObj();
		calculLaser();

		// Disable scroll when focused on a number input.
		$('form').on('focus', 'input[type=number]', function(e) {
			$(this).on('wheel', function(e) {
				e.preventDefault();
			});
		});

		// Restore scroll on number inputs.
		$('form').on('blur', 'input[type=number]', function(e) {
			$(this).off('wheel');
		});

		// Disable up and down keys.
		$('form').on('keydown', 'input[type=number]', function(e) {
			if ( e.which == 38 || e.which == 40 )
				e.preventDefault();
		});

		// Disable editable value
		$('.input-disable').attr('disabled','disabled');

		// Link to event (Fdm, Sla, Shs, Obj)
		$('#fdm-heures').keyup(function(){
			calculFdm();
		});
		$('#fdm-poids').keyup(function(){
			calculFdm();
		});
		$('#fdm-poids-pva').keyup(function(){
			calculFdm();
		});
		$('#sla-heures').keyup(function(){
			calculSla();
		});
		$('#sla-poids').keyup(function(){
			calculSla();
		});
		$('#shs-poids').keyup(function(){
			calculShs();
		});
		$('#obj-heures').keyup(function(){
			calculObj();
		});
		$('#obj-poids-modele').keyup(function(){
			calculObj();
		});
		$('#obj-poids-support').keyup(function(){
			calculObj();
		});
		$('#laser-heures').keyup(function(){
			calculLaser();
		});

	});

})(jQuery);

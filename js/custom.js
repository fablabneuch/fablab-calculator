(function($){

	function ceilPriceToCHF(price){
		return (Math.ceil(price)).toFixed(2);
	}

	//From G.Bussy
	function calculFdm(){
		var finalValue = null;
		var prix_abo = null;

		// Récupération de la quantité de produit voulu
		var input_h = parseFloat($('#fdm-heures').val()) || 0;
		var input_p = parseFloat($('#fdm-poids').val()) || 0;
		var input_p_pva = parseFloat($('#fdm-poids-pva').val()) || 0;

		// Calcul du prix
		if(input_h <= 1) {
			finalValue = 10;
		} else {
			for(i=2;i<=input_h;i++){
				a=i*0.7;
				if(a>30){
					a = 30;
				}
				finalValue = finalValue + 10*(1/a);
			}
			finalValue = finalValue + 10;
		}
		prix_abo = finalValue/2 + input_p*0.1 + input_p_pva*0.2;
		finalValue = finalValue + input_p*0.1 + input_p_pva*0.2;

		$('#fdm-price').val(ceilPriceToCHF(finalValue));
		$('#fdm-price-membre').val(ceilPriceToCHF(prix_abo));
	}

	function calculSla(){
		var finalValue = null;
		var prix_abo = null;

		// Récupération de la quantité de produit voulu
		var input_h = parseFloat($('#sla-heures').val()) || 0;
		var input_p = parseFloat($('#sla-poids').val()) || 0;

		// Calcul du prix
		if(input_h <= 1) {
			finalValue = 10;
		} else {
			for(i=2;i<=input_h;i++){
				a=i*0.7;
				if(a>30){
					a = 30;
				}
				finalValue = finalValue + 10*(1/a);
			}
			finalValue = finalValue + 10;
		}
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

		// Calcul du prix
		if(input_h <= 1) {
			finalValue = 20;
		} else {
			for(i=2;i<=input_h;i++){
				a=i*0.7;
				if(a>30){
					a = 30;
				}
				finalValue = finalValue + 20*(1/a);
			}
			finalValue = finalValue + 20;
		}
		finalValue = finalValue + input_pm*1.1 + input_ps*0.7;

		$('#obj-price').val(ceilPriceToCHF(finalValue));
	}

	$(document).ready(function() {
		//Initial price update
		calculFdm();
		calculSla();
		calculShs();
		calculObj();

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

	});

})(jQuery);

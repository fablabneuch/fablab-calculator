(function($){

	function priceFormat(price){
		return (Math.ceil(price)).toFixed(2);
	}

	function updateSectionFdm(){
		var machine = $('.selectpicker option:selected').val() ;

		//Enable PVA selection for UM3
		if(machine == "um3") {
			jQuery("div[id=section-fdm-pva]").show();
		} else {
			jQuery("div[id=section-fdm-pva]").hide();
		}

		calculFdm(machine);
	}

	//From G.Bussy
	function calculFdm(machine){
		var finalValue = null;
		var prix_abo = null;

		// Récupération de la quantité de produit voulu
		var input_h = parseInt($('#fdm-heures').val()) || 0;
		var input_p = parseInt($('#fdm-poids').val()) || 0;
		var input_p_pva = parseInt($('#fdm-poids-pva').val()) || 0;

		//Machine
		var price_machine = 10;
		var price_mat = 0.1;
		var price_mat_pva = 0.2;
		if(machine == "um3") {
			price_machine = 15;
		} else {
			price_mat_pva = 0;
		}

		// Calcul du prix
		if(input_h <= 1) {
			finalValue = 10;
		} else {
			for(i=2;i<=input_h;i++){
				a=i*0.7;
				if(a>30){
					a = 30;
				}
				finalValue = finalValue + price_machine*(1/a);
			}
			finalValue = finalValue + price_machine;
		}
		prix_abo = finalValue/2 + input_p*price_mat + input_p_pva*price_mat_pva;
		finalValue = finalValue + input_p*price_mat + input_p_pva*price_mat_pva;

		$('#fdm-price').val(priceFormat(finalValue));
		$('#fdm-price-membre').val(priceFormat(prix_abo));
	}

	function calculSla(){
		var finalValue = null;
		var prix_abo = null;

		// Récupération de la quantité de produit voulu
		var input_h = parseInt($('#sla-heures').val()) || 0;
		var input_p = parseInt($('#sla-poids').val()) || 0;

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

		$('#sla-price').val(priceFormat(finalValue));
		$('#sla-price-membre').val(priceFormat(prix_abo));
	}

	function calculShs(){
		var finalValue = null;

		// Récupération de la quantité de produit voulu
		var input_p = parseInt($('#shs-poids').val()) || 0;

		// Calcul du prix
		finalValue = input_p*0.7;

		$('#shs-price').val(priceFormat(finalValue));
	}

	function calculObj(){
		var finalValue = null;

		// Récupération de la quantité de produit voulu
		var input_h = parseInt($('#obj-heures').val()) || 0;
		var input_pm = parseInt($('#obj-poids-modele').val()) || 0;
		var input_ps = parseInt($('#obj-poids-support').val()) || 0;

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

		$('#obj-price').val(priceFormat(finalValue));
	}

	$(document).ready(function() {
		updateSectionFdm();
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
			updateSectionFdm();
		});
		$('#fdm-poids').keyup(function(){
			updateSectionFdm();
		});
		$('#fdm-poids-pva').keyup(function(){
			updateSectionFdm();
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
		$('select.selectpicker').on('change', function(){
			updateSectionFdm();
		});

	});

})(jQuery);

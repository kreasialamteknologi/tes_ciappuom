
function calculate_lastVal(){
    let first_val = $('#first_val').val().replace(/,/g, "");
    let first_units_val = $('#first_units_val').val().replace(/,/g, "");
    let last_units_val = $('#last_units_val').val().replace(/,/g, "");
    let set_last_val = (parseFloat(first_val) * parseFloat(first_units_val)) / parseFloat(last_units_val);
    $('#last_val').val(set_last_val);  
}

function categories_Select2(values){
    $('#cat_id').select2().select2('val',values, true);       
    $('#cat_id').on("select2:select", function(e) { 
        console.info('cat_id was selected...'+$(this).val());
        $("#cat_id").focus();            
    });   

    $('#cat_id').on("select2:select select2:close", function(e) { 
        console.info('cat_id was selected...'+$(this).val());
        if($(this).val()){
            var data = $.ajax({
                url: base_url+"home/getUnits",
                type: "POST",
                data: { 
                    pCatID : $(this).val()
                }
            })
            .done(function(data) {
                var arrs = jQuery.parseJSON(data); 
                $("#units_id, #units_id2").empty();
                var s2_units = $("#units_id, #units_id2").select2({
                    multiple: false,
                    //width: 'element',
                    placeholder: 'Pilih Satuan',                    
                    language: {

                    },
                    escapeMarkup: function (markup) {
                        return markup;
                    },
                    data : arrs
                }).on('change', function (e) {
                    console.log($(this).val());

                });
                //console.info('arrs : '+arrs);
            });   


            $("#units_id").next(".select2").find(".select2-selection").focus(function() {
              $("#units_id").select2("open");
            });

            $("#units_id2").next(".select2").find(".select2-selection").focus(function() {
              $("#units_id2").select2("open");
            });

            $('#units_id').on("select2:select", function(e) { 
                console.info('units_id was selected...'+$(this).val());
                let first_val = $('#first_val').val().replace(/,/g, "");                
                if(!first_val){
                  alert('Isi "Nilai Awal" Terlebih dulu');
                }else{
                  var data = e.params.data;
                  $('#first_units_val').val(data['units_val']);
                  calculate_lastVal();
                  $("#units_id2").focus();  
                }
                
            });                

            $('#units_id2').on("select2:select", function(e) { 
                console.info('units_id2 was selected...'+$(this).val());
                var data = e.params.data;
                let first_val = $('#first_val').val().replace(/,/g, "");                                
                console.info('units_id2 :: select > units_val : '+data['units_val']);
                if(first_val){                  
                  $('#last_units_val').val(data['units_val']);
                  calculate_lastVal();
                }
            });                

        }
    }); 

} 

function units_Select2(values){
    $('#units_id').select2().select2('val',values, true);       
    $('#units_id').on("select2:select", function(e) { 
        console.info('units was selected...'+$(this).val());
        $("#units_id").focus();            
    });   
    
    $('#units_id2').select2().select2('val',values, true);       
    $('#units_id2').on("select2:select", function(e) { 
        console.info('units2 was selected...'+$(this).val());
        $("#units_id2").focus();            
    });   

} 

$(function(){
   console.info('Dashboard INIT...'); 
   categories_Select2();
   units_Select2();
   $("[data-mask]").inputmask();
}); // End Document Ready

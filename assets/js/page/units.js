var gInit = 'units';

$(document).ready( function() {
    $('[data-toggle="tooltip"]').tooltip();  
    $('.bg-message_unit').fadeOut();

    var $action = '';

    var $table = $('#table').dataTable( {
        "responsive": false,
        "autoWidth": false,
        "processing": true,
        "serverSide": true,
        "bFilter": true,
        "aLengthMenu": [100, 150, 200], // , "All"
        "lengthChange": false,        
        "order": [[ 0, "asc" ]],
        "columnDefs": [
            { "name": "id",   "targets": 0 },
            { "name": "cat_name",  "targets": 1 },
            { "name": "units_name",  "targets": 3 },
            { "name": "units_val",  "targets": 4 },
        ],
        "ajax": {
            "url": base_url + gInit+"/get_json",
            "type": "POST",
            "data": function ( d ) {
            /*    d.date1 = $('.date1').val();*/
                // etc
            }
        },
        "oLanguage": {
            "sProcessing": "<img src='" + base_url + "assets/images/loading.gif'>"
        },

        "columns": [
            { "data": "id", "bSortable": true, "sClass": "center" },
            { "data": "cat_name", "bSortable": true },
            { "data": "units_name", "bSortable": true },
            { "data": "units_val", "bSortable": true, "sClass": "right" },
            { "data": function ( row, type, val, meta ) { return "" + $action  ; }, "bSortable": false, "sClass": "center" },
        ],
        "initComplete": function( settings, json ) {
            //  $('.count_act').html($count_active);
        }
    });

    setTimeout(function(){
        var vWrapp = $('.dataTables_wrapper div:first').find('.dataTables_filter');
        //console.info('vWrapp : '+vWrapp.html());
        vWrapp.find('input').attr('class', 'form-control input-sm input-large input-inline');
        //$('.dataTables_wrapper div:first').find('div').eq(0).remove();

    }, 0);   

});

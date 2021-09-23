
var Efulus = function() {

    // Handle Theme Settings
    var handleTheme = function() {

        var panel = $('.theme-panel');

        if ($('body').hasClass('page-boxed') === false) {
            $('.layout-option', panel).val("fluid");
        }

        $('.sidebar-option', panel).val("default");
        $('.page-header-option', panel).val("fixed");
        $('.page-footer-option', panel).val("default");
        if ($('.sidebar-pos-option').attr("disabled") === false) {
            $('.sidebar-pos-option', panel).val(App.isRTL() ? 'right' : 'left');
        }

        //handle theme layout
        var resetLayout = function() {
            $("body").
            removeClass("page-boxed").
            removeClass("page-footer-fixed").
            removeClass("page-sidebar-fixed").
            removeClass("page-header-fixed").
            removeClass("page-sidebar-reversed");

            $('.page-header > .page-header-inner').removeClass("container");

            if ($('.page-container').parent(".container").size() === 1) {
                $('.page-container').insertAfter('body > .clearfix');
            }

            if ($('.page-footer > .container').size() === 1) {
                $('.page-footer').html($('.page-footer > .container').html());
            } else if ($('.page-footer').parent(".container").size() === 1) {
                $('.page-footer').insertAfter('.page-container');
                $('.scroll-to-top').insertAfter('.page-footer');
            }

             $(".top-menu > .navbar-nav > li.dropdown").removeClass("dropdown-dark");

            $('body > .container').remove();
        };

        var lastSelectedLayout = '';

        var setLayout = function() {

            var layoutOption = $('.layout-option', panel).val();
            var sidebarOption = $('.sidebar-option', panel).val();
            var headerOption = $('.page-header-option', panel).val();
            var footerOption = $('.page-footer-option', panel).val();
            var sidebarPosOption = $('.sidebar-pos-option', panel).val();
            var sidebarStyleOption = $('.sidebar-style-option', panel).val();
            var sidebarMenuOption = $('.sidebar-menu-option', panel).val();
            var headerTopDropdownStyle = $('.page-header-top-dropdown-style-option', panel).val();

            if (sidebarOption == "fixed" && headerOption == "default") {
                alert('Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.');
                $('.page-header-option', panel).val("fixed");
                $('.sidebar-option', panel).val("fixed");
                sidebarOption = 'fixed';
                headerOption = 'fixed';
            }

            resetLayout(); // reset layout to default state

            if (layoutOption === "boxed") {
                $("body").addClass("page-boxed");

                // set header
                $('.page-header > .page-header-inner').addClass("container");
                var cont = $('body > .page-wrapper > .clearfix').after('<div class="container"></div>');

                // set content
                $('.page-container').appendTo('body > .page-wrapper > .container');

                // set footer
                if (footerOption === 'fixed') {
                    $('.page-footer').html('<div class="container">' + $('.page-footer').html() + '</div>');
                } else {
                    $('.page-footer').appendTo('body > .page-wrapper > .container');
                }
            }

            if (lastSelectedLayout != layoutOption) {
                //layout changed, run responsive handler: 
                App.runResizeHandlers();
            }
            lastSelectedLayout = layoutOption;

            //header
            if (headerOption === 'fixed') {
                $("body").addClass("page-header-fixed");
                $(".page-header").removeClass("navbar-static-top").addClass("navbar-fixed-top");
            } else {
                $("body").removeClass("page-header-fixed");
                $(".page-header").removeClass("navbar-fixed-top").addClass("navbar-static-top");
            }

            //sidebar
            if ($('body').hasClass('page-full-width') === false) {
                if (sidebarOption === 'fixed') {
                    $("body").addClass("page-sidebar-fixed");
                    $("page-sidebar-menu").addClass("page-sidebar-menu-fixed");
                    $("page-sidebar-menu").removeClass("page-sidebar-menu-default");
                    Layout.initFixedSidebarHoverEffect();
                } else {
                    $("body").removeClass("page-sidebar-fixed");
                    $("page-sidebar-menu").addClass("page-sidebar-menu-default");
                    $("page-sidebar-menu").removeClass("page-sidebar-menu-fixed");
                    $('.page-sidebar-menu').unbind('mouseenter').unbind('mouseleave');
                }
            }

            // top dropdown style
            if (headerTopDropdownStyle === 'dark') {
                $(".top-menu > .navbar-nav > li.dropdown").addClass("dropdown-dark");
            } else {
                $(".top-menu > .navbar-nav > li.dropdown").removeClass("dropdown-dark");
            }

            //footer 
            if (footerOption === 'fixed') {
                $("body").addClass("page-footer-fixed");
            } else {
                $("body").removeClass("page-footer-fixed");
            }

            //sidebar style
            if (sidebarStyleOption === 'light') {
                $(".page-sidebar-menu").addClass("page-sidebar-menu-light");
            } else {
                $(".page-sidebar-menu").removeClass("page-sidebar-menu-light");
            }

            //sidebar menu 
            if (sidebarMenuOption === 'hover') {
                if (sidebarOption == 'fixed') {
                    $('.sidebar-menu-option', panel).val("accordion");
                    alert("Hover Sidebar Menu is not compatible with Fixed Sidebar Mode. Select Default Sidebar Mode Instead.");
                } else {
                    $(".page-sidebar-menu").addClass("page-sidebar-menu-hover-submenu");
                }
            } else {
                $(".page-sidebar-menu").removeClass("page-sidebar-menu-hover-submenu");
            }

            //sidebar position
            if (App.isRTL()) {
                if (sidebarPosOption === 'left') {
                    $("body").addClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({
                        placement: 'right'
                    });
                } else {
                    $("body").removeClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({
                        placement: 'left'
                    });
                }
            } else {
                if (sidebarPosOption === 'right') {
                    $("body").addClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({
                        placement: 'left'
                    });
                } else {
                    $("body").removeClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({
                        placement: 'right'
                    });
                }
            }

            Layout.fixContentHeight(); // fix content height            
            Layout.initFixedSidebar(); // reinitialize fixed sidebar
        };

        // handle theme colors
        var setColor = function(color) {
            var color_ = (App.isRTL() ? color + '-rtl' : color);
            $('#style_color').attr("href", Layout.getLayoutCssPath() + 'themes/' + color_ + ".min.css");
            if (color == 'light2') {
                $('.page-logo img').attr('src', Layout.getLayoutImgPath() + 'logo-invert.png');
            } else {
                $('.page-logo img').attr('src', Layout.getLayoutImgPath() + 'logo.png');
            }
        };

        $('.toggler', panel).click(function() {
            $('.toggler').hide();
            $('.toggler-close').show();
            $('.theme-panel > .theme-options').show();
        });

        $('.toggler-close', panel).click(function() {
            $('.toggler').show();
            $('.toggler-close').hide();
            $('.theme-panel > .theme-options').hide();
        });

        $('.theme-colors > ul > li', panel).click(function() {
            var color = $(this).attr("data-style");
            setColor(color);
            $('ul > li', panel).removeClass("current");
            $(this).addClass("current");
        });

        // set default theme options:

        if ($("body").hasClass("page-boxed")) {
            $('.layout-option', panel).val("boxed");
        }

        if ($("body").hasClass("page-sidebar-fixed")) {
            $('.sidebar-option', panel).val("fixed");
        }

        if ($("body").hasClass("page-header-fixed")) {
            $('.page-header-option', panel).val("fixed");
        }

        if ($("body").hasClass("page-footer-fixed")) {
            $('.page-footer-option', panel).val("fixed");
        }

        if ($("body").hasClass("page-sidebar-reversed")) {
            $('.sidebar-pos-option', panel).val("right");
        }

        if ($(".page-sidebar-menu").hasClass("page-sidebar-menu-light")) {
            $('.sidebar-style-option', panel).val("light");
        }

        if ($(".page-sidebar-menu").hasClass("page-sidebar-menu-hover-submenu")) {
            $('.sidebar-menu-option', panel).val("hover");
        }

        var sidebarOption = $('.sidebar-option', panel).val();
        var headerOption = $('.page-header-option', panel).val();
        var footerOption = $('.page-footer-option', panel).val();
        var sidebarPosOption = $('.sidebar-pos-option', panel).val();
        var sidebarStyleOption = $('.sidebar-style-option', panel).val();
        var sidebarMenuOption = $('.sidebar-menu-option', panel).val();

        $('.layout-option, .page-header-option, .page-header-top-dropdown-style-option, .sidebar-option, .page-footer-option, .sidebar-pos-option, .sidebar-style-option, .sidebar-menu-option', panel).change(setLayout);
    };

    // handle theme style
    var setThemeStyle = function(style) {
        var file = (style === 'rounded' ? 'components-rounded' : 'components');
        file = (App.isRTL() ? file + '-rtl' : file);

        $('#style_components').attr("href", App.getGlobalCssPath() + file + ".min.css");

        if (typeof Cookies !== "undefined") {
            Cookies.set('layout-style-option', style);
        }
    };

    return {

        //main function to initiate the theme
        init: function() {
            // handles style customer tool
            handleTheme(); 
            
            // handle layout style change
            $('.theme-panel .layout-style-option').change(function() {
                 setThemeStyle($(this).val());
            });

            // set layout style from cookie
            if (typeof Cookies !== "undefined" && Cookies.get('layout-style-option') === 'rounded') {
                setThemeStyle(Cookies.get('layout-style-option'));
                $('.theme-panel .layout-style-option').val(Cookies.get('layout-style-option'));
            }            
        }
    };

}();

if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {    
       Efulus.init();       

    var vSyncPGanti = false;
    var fnSyncPinGanti = function(pKartuId, pPin){
        if(!pPin){
            return '';
        }else{        
            return $.ajax({
                    url     : base_url + 'main/SyncPin/'+pKartuId+'/'+pPin,
                    type    : 'POST',
                    data: {
                    },
                    async   : false,
                    cache   : false
            }).responseText;      
        }
    }        
          
    var G_ErrGanti = false;
          
    function validateKartuPengganti(){
        console.info('validateKartuPengganti INIT...');
        // .replace(/,/g, "");
        /*
        if(!$('#form_permintaan #no_kartu_ganti').val()){
            swal({
                title: 'Error',
                text: 'No. Kartu Ganti tidak boleh kosong',
                type: 'warning'
            }).then(function () {
                $('#form_permintaan #no_kartu_ganti').focus();
            });                                                             
        }else{
        */
       if($('#form_permintaan #no_kartu_ganti').val()){
            $.ajax({
            url: base_url+"main/getKartu",
            type: 'POST',
            data: 'pNoKartu='+$('#form_permintaan #no_kartu_ganti').val()+'&pMustNo=1&isNoAktif=1',
            cache: false,
            dataType: 'json',
            //processData: false, // Don't process the files
            //contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function(data, textStatus, jqXHR)
            {

                var vG = "_ganti";
                if(typeof data.error === 'undefined')
                {                   
                    if(eval(data.length) <= 0){ 
                        G_ErrGanti = true;
                        console.info('validateKartuPengganti > eval(data.length) <= 0');
                        swal({
                            title: 'Error',
                            text: 'No. Kartu '+$('#form_permintaan #no_kartu'+vG).val()+' tidak valid, mohon cek ulang.',
                            type: 'warning'
                        }).then(function () {
                            $('#form_permintaan #no_kartu'+vG).focus();
                        });                                                 
                    }else{
                        $.each(data.suggestions, function(key, value)
                        {

                            //console.info('upload_file :: key : '+key+', value : '+value.judul);
                            if(value.data){
                                //$('#form_permintaan #no_kartu').val(value.no_kartu);        
                                $('#form_permintaan #kartu_id'+vG).val(value.data);

                                $('div#divKartu').removeClass('has-error');
                                $('div#divKartu span.help-block').html('');                                    
                                G_ErrGanti = false;
                            }else{
                                //$('#form_permintaan #no_kartu').val('');
                                $('#form_permintaan #kartu_id'+vG).val('');
                                G_ErrGanti = true;        
                                console.info('validateKartuGanti > !value.data');
                                swal({
                                    title: 'Error',
                                    text: 'No. Kartu <strong>'+$('#form_permintaan #no_kartu'+vG).val()+'</strong> tidak valid, mohon cek ulang.',
                                    type: 'warning'
                                }).then(function () {
                                    $('#form_permintaan #no_kartu'+vG).focus();
                                });                             
                            }
                        });  
                    }
                }
                else
                {
                    // Handle errors here
                    console.log('ERRORS Data : ' + data.error);
                    //$('#form_permintaan #no_kartu').val('');
                    $('#form_permintaan #kartu_id'+vG).val('0');
                        G_ErrGanti = true;
                        console.info('validateKartuGanti > data.error');
                        swal({
                            title: 'Error',
                            text: 'No. Kartu '+$('#form_permintaan #no_kartu'+vG).val()+' tidak valid, mohon cek ulang.',
                            type: 'warning'
                        }).then(function () {
                            $('#form_permintaan #no_kartu'+vG).focus();
                        });                    
                }
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                // Handle errors here
                console.log('ERRORS Status : ' + textStatus);
                
                $('#form_permintaan #kartu_id'+vG).val('0');

                    swal({
                        title: 'Error',
                        text: 'Error Cek No. Kartu <strong>'+$('#form_permintaan #no_kartu'+vG).val()+'</strong> ',
                        type: 'warning'
                    }).then(function () {
                        $('#form_permintaan #no_kartu'+vG).focus();
                    });                    
                // STOP LOADING SPINNER
            }
        });       
        }
    }    
    
    function AutKartuPengganti(){   
        console.info('GANTI_KARTU :: AutKartuPengganti...');

        $('#form_permintaan #no_kartu_ganti')
        .focusout(function(){
            validateKartuPengganti();
        });
    }     

        $('.clsNotifList').on('click', function(){
            $('#type_order').val('permintaan');         
            // $rn['id'].'#'.$rn['jenis'].'#'.$rn['level'].'#'.$rn['merchant_id'].'#'.$rn['merchant_kode'].'#'.$rn['kartu_id'].'#'.$rn['no_kartu'].'#'.$rn['file']

            var vtar = $(this).attr('tar');
            console.info('clsNotifList :: tar : '+vtar);
            if(vtar){
                $.ajax({
                    url: base_url+"main/getDetailNotif/"+vtar,
                    type: 'POST',
                    data: '',
                    cache: false,
                    dataType: 'json',
                    success: function(data, textStatus, jqXHR)
                    {
                        console.info('ID :'+data.id+', JENIS : '+data.jenis+', NO KARTU : '+data.no_kartu+', FILE : '+data.file);
                        $('#PermintaanModal #id').val(data.id);
                        $('#PermintaanModal #trxid').val(data.trxid);                        
                        var spv =data.val.split(' ');
                        var val_sp = spv[0]+' '+spv[1];
                        var vapp_by = '';
                        
                        if(data.jenis == "DITOLAK"){
                            $('.abort_permintaan, .clsSetujui').hide();
                            $('#PermintaanModal #cancel_permintaan').html('Tutup');

                            $('#PermintaanModal #cancel_permintaan').on('click', function(){
                                $.get( "main/resetNotif/"+data.id, function( data ) {
                                    setTimeout(function(){
                                    window.location.reload();
                                    }, 300);
                                });                                
                            });                            
                        }else{
                            if(data.jenis == "DISETUJUI"){
                                vapp_by = ' ( '+data.processed_name+' )';
                                $('.abort_permintaan, .clsSetujui').hide();
                                if(data.jenis_act == "RESET"){
                                    $('#PermintaanModal #divPIN').show();
                                    $('#pin_reset').inputmask({"mask": "999999", "placeholder":""}); 
                                    $('#re_pin_reset').inputmask({"mask": "999999", "placeholder":""});   
                                }else if(data.jenis_act == "GANTI"){
                                    $('#PermintaanModal #divKartuGanti').show();
                                    $('#PermintaanModal #divPINGanti').show();
                                    setTimeout(function(){
                                        $('#form_permintaan #no_kartu_ganti').focus();
                                        AutKartuPengganti();
                                        $('#pin_ganti')
                                                .inputmask({"mask": "999999", "placeholder":""})
                                                .on('focusout', function(){
                                                    if(!fnSyncPinGanti($('#form_permintaan #kartu_id').val(), $(this).val())){
                                                        vSyncPGanti = false;
                                                        console.info('Pin not valid...');
                                                        var errMsg = 'PIN yang Anda masukkan tidak valid';
                                                        $('#form_permintaan #pin_ganti').focus();
                                                        $('.message-error').html(errMsg);
                                                        $('.bg-message').fadeIn();              
                                                        $("#PermintaanModal").modal("show");
                                                    }else{
                                                        $('.message-error').html('');
                                                        $('.bg-message').fadeOut();                                                                  
                                                    }
                                                });
                                    }, 300);
                                }

                                $('.clsReset').show();

                            }else{
                                $('#PermintaanModal #divPIN').hide();
                            }


                            $('#form_permintaan #abort_permintaan').on('click', function(){
                               console.info('Abort Permintaan Clicked..'); 

                                swal({
                                    title: 'Confirm',
                                    html: "Tolak Permintaan "+val_sp+" No. Kartu "+data.no_kartu+" ? <br><div class='form-group' > <label class='col-md-3 control-label'>Alasan</label><div class='col-md-9'><input type='text' class='form-control input' name='alasan_tolak' id='alasan_tolak' value='' style='z-index:999999999999999999 !important;' autocomplete='off'></div></div><br>",
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Ya',
                                    cancelButtonText: 'Tidak',
                                    confirmButtonClass: 'btn btn-success',
                                    cancelButtonClass: 'btn btn-danger',
                                    buttonsStyling: false,
                                    closeOnConfirm: true,
                                    closeOnCancel: true
                                })
                                .then(
                                  function(result) {
                                    // handle Confirm button click
                                    // result is an optional parameter, needed for modals with input
                                    // This function will run ONLY if the user clicked "ok"
                                    // Only here we want to send the request to the server!
                                    console.info('Proses Tolak');

                                    var disabled = $('#form_permintaan').find(':input:disabled').removeAttr('disabled');
                                    var data = $.ajax({
                                        url: base_url + "main/tolak_permintaan",
                                        type: "POST",
                                        data: $('#form_permintaan').serialize()
                                    })
                                    .done(function(result) {
                                        $('#form_permintaan .input').val('');
                                        $('#type').val('add');
                                        $('#SetujuiModal').modal('hide');            
                                        $("#PermintaanModal").modal("hide");                            
                                        var res = $.parseJSON(result);
                                        var vType = (res['success'] == true) ? "success" : "warning";
                                        var vTit = ($('#PermintaanModal #jenis').val() == "APPROVAL") ? "APPROVAL" : "VALIDASI";
                                        swal({
                                            title: vTit,
                                            text: res['msg'],
                                            type: vType
                                        }).then(function () {
                                            if(res['success'] == true){
                                                setTimeout(function(){
                                                window.location.reload();
                                                }, 300);                                    
                                            }
                                        });                            
                                    }).always(function() {
                                        $('.save_permintaan').prop('disabled', false);                            
                                    });                                                           
                                  }, function(dismiss) {
                                    // dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
                                    console.info('Cancel, do nothing...');
                                  }
                                );                            

                            }); // End Form Permintaan Abort...
                        }
                            $('#PermintaanModal .portlet-title .caption').html('<i class="fa fa-balance-scale"></i> PERMINTAAN - '+data.jenis+' - '+data.merchant_kode+vapp_by+' </div>');        

                        $('#PermintaanModal #jenis').val(data.jenis);
                        $('#PermintaanModal #jenis_act').val(data.jenis_act);
                        $('#PermintaanModal #merchant_id').val(data.merchant_id);
                        $('#PermintaanModal #merchant_kode').val(data.merchant_kode);
                        $('#PermintaanModal #val_sp').val(val_sp);
                        $('#PermintaanModal #kartu_id').val(data.kartu_id);
                        $('#PermintaanModal #no_kartu').val(data.no_kartu);
                        $('#PermintaanModal #nama_kartu').val(data.nama_kartu);                    
                        $('#SetujuiModal .val_no').html(val_sp);                    
                        $('#SetujuiModal .text_kartu').html(data.no_kartu);                    
                        if(data.file){
                            var spF = data.file.split('.');
                            if(spF[spF.length -1] == "pdf"){
                                $('#PermintaanModal .clsPDF a').html(data.file);
                                var vhref = base_url+'view_pdf/'+data.file;
                                $('#PermintaanModal .clsPDF a').attr('href', vhref);
                                $('#PermintaanModal .clsPDF').show();
                            }else{
                                var vSrc = base_url+'assets/files/'+data.file;
                                $('#PermintaanModal .clsImage img').attr('src', vSrc);
                                $('#PermintaanModal .clsImage').show();                
                            }
                        }                    
                        $('#PermintaanModal #catatan').val(data.catatan);                    
                    }
                });        
            }
            $('#PermintaanModal').modal('show');        
            setTimeout(function(){
                G_setToNext("#form_permintaan");
            }, 300);


            $('#form_permintaan #submit_form').click(function(e){                                                
                e.preventDefault();        

                    var merchant_id = $('#form_permintaan #merchant_id').val();
                    var no_kartu = $('#form_permintaan #no_kartu').val();
                    var kartu_id = $('#form_permintaan #kartu_id').val();

                    console.info(' form_permintaan :: submit_form Trace');    

                if($('#PermintaanModal #jenis').val() == "DISETUJUI" && $('#PermintaanModal #val_sp').val() == "Ganti Kartu"){
                    console.info('Direct validate validateKartuPengganti');
                    validateKartuPengganti();
                }
                    
                    if(!no_kartu || !kartu_id){
                        swal({
                            title: 'Error',
                            text: 'No Kartu tidak valid',
                            type: 'warning'
                        }).then(function () {

                        });
                    }else if($('#PermintaanModal #jenis').val() == "DISETUJUI" && $('#PermintaanModal #val_sp').val() == "Reset PIN" && (!$('#PermintaanModal #pin_reset').val() ||  !$('#PermintaanModal #re_pin_reset').val())){
                        swal({
                            title: 'Error',
                            text: 'PIN Baru tidak valid',
                            type: 'warning'
                        }).then(function () {
                            $('#PermintaanModal #pin_reset').focus();
                        });                    
                    }else if($('#PermintaanModal #jenis').val() == "DISETUJUI" && $('#PermintaanModal #val_sp').val() == "Reset PIN" && $('#PermintaanModal #re_pin_reset').val().length < 4){
                        swal({
                            title: 'Error',
                            text: 'PIN Baru Minimal 4 Digit',
                            type: 'warning'
                        }).then(function () {
                            $('#PermintaanModal #pin_reset').focus();
                        });                    
                    }else if($('#PermintaanModal #jenis').val() == "DISETUJUI" && $('#PermintaanModal #val_sp').val() == "Reset PIN" && $('#PermintaanModal #pin_reset').val() !=  $('#PermintaanModal #re_pin_reset').val()){
                        swal({
                            title: 'Error',
                            text: 'PIN Baru tidak Cocok',
                            type: 'warning'
                        }).then(function () {
                            $('#PermintaanModal #re_pin_reset').focus();
                        });                    
                    } else {
                        if($('#PermintaanModal #jenis').val() == "DISETUJUI" && $('#PermintaanModal #val_sp').val() == "Ganti Kartu" && !fnSyncPinGanti($('#form_permintaan #kartu_id').val(), $('#form_permintaan #pin_ganti').val())){
                            vSyncPGanti = false;
                            console.info('Pin not valid...');
                            var errMsg = 'PIN yang Anda masukkan tidak valid';
                            $('.message-error').html(errMsg);
                            $('.bg-message').fadeIn();    
                            $("#PermintaanModal").modal("show");
                            $('#form_permintaan #pin_ganti').focus();
                        }else{
                            vSyncPGanti = true;                        
                            console.info('Pin valid...');
                            $('.message-error').html('');
                            $('.bg-message').hide();

                            $('.save_permintaan').prop('disabled', true);
                            $('.save_permintaan').html('Loading....');
                            console.info(' form_permintaan :: Saved...');                                                                
                            var disabled = $('#form_permintaan').find(':input:disabled').removeAttr('disabled');
                            var data = $.ajax({
                                url: base_url + "main/approve_permintaan",
                                type: "POST",
                                data: $('#form_permintaan').serialize()
                            })
                            .done(function(result) {
                                $('#form_permintaan .input').val('');
                                $('#type').val('add');
                                $('#SetujuiModal').modal('hide');            
                                $("#PermintaanModal").modal("hide");                            
                                var res = $.parseJSON(result);
                                var vType = (res['success'] == true) ? "success" : "warning";
                                var vTit = ($('#PermintaanModal #jenis').val() == "APPROVAL") ? "APPROVAL" : "VALIDASI";
                                swal({
                                    title: vTit,
                                    text: res['msg'],
                                    type: vType
                                }).then(function () {
                                    if(res['success'] == true){
                                        setTimeout(function(){
                                        window.location.reload();
                                        }, 300);                                    
                                    }
                                });                            
                            }).always(function() {
                                $('.save_permintaan').prop('disabled', false);                            
                            });                            
                        }
                    }
            });   

            $('#SetujuiModal .save_permintaan').on('click', function(){
                $('#form_permintaan #submit_form').click();
            });        

            $('#PermintaanModal .clsReset').on('click', function(){
                console.info('clsReset Clicked...');
                $('#form_permintaan #submit_form').click();
            });        

            $('#PermintaanModal .clsSetujui').on('click', function(){            
               $('#PermintaanModal').css('z-index', '1');           
               $('#SetujuiModal').modal('show');               
            });

            $('#SetujuiModal #btn_abort_setuju').on('click', function(){
                $('#SetujuiModal').modal('hide');            
                $('#PermintaanModal').css('z-index', '10050');
            });

            $('#PermintaanModal #cancel_permintaan').on('click', function(){
                $('#PermintaanModal').modal('hide');
            });

            $('#PermintaanModal .clsRemove').on('click', function(){
               $('#PermintaanModal').css('z-index', '1');   
               $('#remove_modal .text_kartu').html($('#PermintaanModal #no_kartu').val());
               $('#RemoveModal').modal('show');
            });
            
            $('#RemoveModal #btn_abort_remove').on('click', function(){
                $('#RemoveModal').modal('hide');            
                $('#PermintaanModal').css('z-index', '10050');
            });            
            
            $('#RemoveModal #save_remove').on('click', function(){
                $.ajax({
                    url: base_url+"main/removeNotif/"+$('#PermintaanModal #id').val()+"/"+$('#PermintaanModal #trxid').val(),
                    type: 'POST',
                    data: '',
                    cache: false,
                    success: function(data)
                    {
                        if(data){
                            window.location.reload();
                        }
                    }
                });
            });            

        });       
    });
}

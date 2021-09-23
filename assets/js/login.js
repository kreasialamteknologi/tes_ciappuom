var Login = function () {

	var handleLogin = function() {
		$('.login-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                remember: {
	                    required: false
	                }
	            },

	            messages: {
	                username: {
	                    required: "Username is required."
	                },
	                password: {
	                    required: "Password is required."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-danger', $('.login-form')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        $('.login-form #password').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.login-form').validate().form()) {
	                    $('.login-form').submit();
	                }
	                return false;
	            }
	        });
	}
/*
	var handleForgetPassword = function () {
		$('.forget-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                email: {
	                    required: true,
	                    email: true
	                }
	            },

	            messages: {
	                email: {
	                    required: "Email is required."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        $('.forget-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.forget-form').validate().form()) {
	                    $('.forget-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#forget-password').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.forget-form').show();
	        });

	        jQuery('#back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.forget-form').hide();
	        });

	}
*/
      
/*
	var handleRegister = function () {

		        function format(state) {
            if (!state.id) { return state.text; }
            var $state = $(
             '<span><img src="assets/global/img/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
            );
            
            return $state;
        }

        if (jQuery().select2 && $('#country_list').size() > 0) {
            $("#country_list").select2({
	            placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
	            templateResult: format,
                templateSelection: format,
                width: 'auto', 
	            escapeMarkup: function(m) {
	                return m;
	            }
	        });


	        $('#country_list').change(function() {
	            $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
	        });
    	}

            $('.register-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                
	                fullname: {
	                    required: true
	                },
	                email: {
	                    required: true,
	                    email: true
	                },
	                address: {
	                    required: true
	                },
	                city: {
	                    required: true
	                },
	                country: {
	                    required: true
	                },

	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                rpassword: {
	                    equalTo: "#register_password"
	                },

	                tnc: {
	                    required: true
	                }
	            },

	            messages: { // custom messages for radio buttons and checkboxes
	                tnc: {
	                    required: "Please accept TNC first."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
	                    error.insertAfter($('#register_tnc_error'));
	                } else if (element.closest('.input-icon').size() === 1) {
	                    error.insertAfter(element.closest('.input-icon'));
	                } else {
	                	error.insertAfter(element);
	                }
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

                    $('.register-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.register-form').validate().form()) {
	                    $('.register-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#register-btn').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.register-form').show();
	        });

	        jQuery('#register-back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.register-form').hide();
	        });
	}
    */
    return {
        //main function to initiate the module
        init: function () {
        	
            handleLogin();
            //handleForgetPassword();
            //handleRegister();    

            // init background slide images
            $.backstretch([
                base_url+"assets/images/bg/2.jpg",
                base_url+"assets/images/bg/4.jpg",
                base_url+"assets/images/bg/6.jpg",
                base_url+"assets/images/bg/7.jpg",
                base_url+"assets/images/bg/8.jpg"
                ], {
                  fade: 1000,
                  duration: 8000
              });
        }
    };

}();

var G_AutoCompleteErr = false;
    function G_setToNext(Obj){
        var vObj = $($(Obj)
        .find('button,input,textarea,select,a')
        .filter(':visible')
        .filter(':not([readonly])')    
        .filter('a, :enabled')
        .toArray()
        .sort(function(a, b) {
            return ((a.tabIndex > 0) ? a.tabIndex : 1000) - ((b.tabIndex > 0) ? b.tabIndex : 1000);
        }));    
        console.info('G_setToNext Loaded : '+Obj);
        $(vObj).on('keydown', function(e){        
            console.info('Obj Keydown :'+e.which);
            if(e.which == 13){
                if($(this).attr('role') === 'required' && !$(this).val()){

                }else{
                    var NextObj = $(this).attr('tar');
                    //console.info('G_setToNext : '+e.which+', tar : '+NextObj);
                    var patt = /!=/;
                    if(NextObj === 'CALLFN'){   
                        var target = $(this).attr('ng-tar');  
                        var vFn = typeof window[target];
                        console.info('NextObj is CALLFN : '+target+' > '+vFn);
                        /*
                        var fn = new Function(target);
                        console.info('New CALLFN : '+target);
                        fn();                    
                        */
                        
                        if (vFn === 'function'){
                            console.info(target+' is FN...');                            
                            setTimeout(function(){                                                            
                                window[target]();
                            }, 300);
                        }else{
                            console.info('Not Found FN : '+target);
                        }
                        
                       //fnProses();
                        
                    }else if(patt.test(NextObj)){
                        var spO = NextObj.split('!=');
                        if($(spO[0]).is(':visible') && !$(spO[0]).prop('readonly')){
                            console.info('focus to split0 : '+$(spO[0]).attr('id'));
                            $(spO[0]).focus().select(); 
                        }else{
                            console.info('focus to split1 : '+$(spO[1]).attr('id'));
                            $(spO[1]).focus().select(); 
                        }
                        e.preventDefault();
                    }else{
                        if(NextObj && NextObj != undefined && $(NextObj).is(':visible') && !$(NextObj).prop('readonly')){
                            console.info('tar :: focus to : '+$(NextObj).attr('id'));
                            $(NextObj).focus().select();
                            e.preventDefault();
                        }else{
                                if(NextObj === 'GRID'){                                
                                    var FirstObjDet = $('.dGridDetail .datagrid-view2 .datagrid-body table tbody').find('input')
                                    .not('[readonly=""]').not('[readonly="readonly"]').not('[readonly]')
                                    .not('[disabled=""]').not('[disabled="disabled"]').not('[disabled]')
                                    .not('[type=hidden]').not('[type="hidden"]')
                                    .not('[style="display:none"]');
                                    console.info('focus Next Grid, FirstObjDet : '+FirstObjDet.attr('id'));
                                    if(FirstObjDet.attr('id') == undefined){                                    
                                        // Add New Row..
                                        console.info('First Obj Not Defined');
                                        fnNotDefinedDet();                                    
                                        e.preventDefault();
                                    }else{
                                        console.info('First Obj Defined');
                                        $('#'+FirstObjDet.attr('id')).focus().select();                                    
                                        e.preventDefault();
                                    }                                
                                    //setSelfInputDef('.datagrid-view2');
                                }else{
                                    var nIdx = $(vObj).index(document.activeElement) + 1;
                                    console.info('GoTo Next Obj : '+nIdx+', ID : '+$(vObj).eq(nIdx).attr('id'));
                                    if(eval(nIdx) > 0){
                                        $(vObj).eq(nIdx).focus().select();
                                        e.preventDefault();
                                    }else{
                                        return false;
                                    }
                                }
                        }      
                    } // Else Regex
                } // Else Required
                $(Obj+' a').on('keydown', function(e) {
                    var key = e.which;
                    if (key == 13 && G_AutoCompleteErr == false) { //  || key == 9        
                        console.info('Obj a click on enterred...');
                        $(this).click();
                    }
                    e.preventDefault();
                });
                
                $(Obj+' button').on('keydown', function(e) {
                    var key = e.which;
                    if (key == 13 && G_AutoCompleteErr == false) { //  || key == 9        
                        console.info('Obj button click on enterred...');
                        $(this).click();
                    }
                    e.preventDefault();
                });                
                return false;
            }                    
        });               
    }
    
jQuery(document).ready(function() {
    Login.init();
    setTimeout(function(){
        G_setToNext(".login-form");       
        $('.login-form #kode').focus();
    }, 300);
    
});

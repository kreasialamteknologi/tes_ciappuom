<script type="text/javascript">
    var base_url = '<?php echo base_url(); ?>';
</script>

<!-- BEGIN CORE PLUGINS -->
<script src="<?php echo base_url(); ?>assets/js/jquery.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/js/jquery.blockui.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN THEME GLOBAL SCRIPTS -->
<script src="<?php echo base_url(); ?>assets/js/app.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/js/main.js" type="text/javascript"></script>
<!-- END THEME GLOBAL SCRIPTS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="<?php echo base_url(); ?>assets/plugins/datatables/datatables.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js" type="text/javascript"></script>
<!-- <script src="<?php //echo base_url(); ?>assets/plugins/select2/select2.full.min.js"></script>-->
<!-- END PAGE LEVEL PLUGINS -->

<!-- BEGIN THEME LAYOUT SCRIPTS -->
<script src="<?php echo base_url(); ?>assets/js/layout.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/js/myapp.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/js/quick-sidebar.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/js/quick-nav.min.js" type="text/javascript"></script>

<!-- END THEME LAYOUT SCRIPTS -->
<script>
var arrDisSearchKey = [9,16,18,27,35,36,37,38,39,40]; // event2 yang didisable ketika melakukan pencarian data


    function fnShowLoading(pTitle, pTimeOut){
        console.info('fnShowLoading :: pTitle : '+pTitle);
        if(pTimeOut && pTimeOut == "999"){
            waitingDialog.hide();
        }else{
            pTitle = (pTitle) ? pTitle : "Mohon Tunggu...";
            waitingDialog.show(pTitle);
            if(pTimeOut){
                setTimeout(function () {
                  waitingDialog.hide();
                }, pTimeOut);    
            }
        }
    }
</script>

<?php
if(isset($page_js)){
    echo '<script src="'.base_url().'assets/js/page/'.$page_js.'.js"></script>';
}

if(isset($sub_js) && is_array($sub_js)){
    foreach($sub_js AS $js){
        echo '<script src="'.base_url().'assets/'.$js.'.js"></script>';
    }
}
?>       

<?php
/*
if (PHP_OS == 'WINNT') {
  echo $InfoPrint;
  $line = stream_get_line(STDIN, 1024, PHP_EOL);
} else {
  $array = explode("\n", $InfoPrint);
}
 * 
 */
?>
<!-- BEGIN CONTENT BODY -->
<div class="page-content">
    <!-- BEGIN PAGE HEADER-->
    <!-- BEGIN PAGE BAR -->
    <div class="page-bar">
        <ul class="page-breadcrumb">
            <li>
                <a href="<?php echo base_url(); ?>">Home</a>
                <i class="fa fa-circle"></i>
            </li>
            <li>
                <span><?php 
                echo $title; 
                //$kartu = "17451201729999";
                //echo substr($kartu, 0, strlen($kartu)-5)."*****<br>";
                ?>
                    <input type="text" id="txtDashboard" style="display:none;">
                </span>
            </li>
        </ul>
    </div>
    <!-- END PAGE BAR -->
    <!-- BEGIN PAGE TITLE-->
    <h1 class="page-title">
        <small></small>
    </h1>
    <!-- END PAGE TITLE-->
    <!-- END PAGE HEADER-->
    
    
    
</div>

<!-- END CONTENT BODY -->
<script>
</script>
<style type="text/css">
    .modal.large {
        width: 60%; /* respsonsive width */
        margin-left:-30%; /* -width/2) */ 
    }
    
    .orange{
        background-color: #FCDCA5;
    }
</style>

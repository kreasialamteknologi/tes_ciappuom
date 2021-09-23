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
    

    <div class="portlet">    
        <div class="portlet-body form">                                
            <form class="form-horizontal" id="form_karyawan" role="form" method="POST" action="#">            
                <input type="button" id="submit_form" readonly="" style="display: none;" value="save">
                <input type="hidden" name="type" id="type" value="add">
                    <input type="hidden" name="id" id="id" value="0">                                
                    <input type="hidden" id="first_units_val" value="0">                                
                    <input type="hidden" id="last_units_val" value="0">                                
                    <div class="form-body">                    

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-md-2 control-label">Kategori</label>
                                    <div class="col-md-8">
                                    <select class="input input-group select2-bootstrap-append" id="cat_id" style="width:90%;">
                                        <?php
                                        $vopt = '<option value="">Pilih Kategori</option>';
                                        foreach($kategori->result_array() AS $r){
                                            $vopt .= '<option value="'.$r['id'].'">'.$r['cat_name'].'</option>';
                                        }
                                        echo $vopt;
                                        ?>
                                    </select>
                                    </div>
                                </div>
                            </div>
                        </div>         
                        <div class="row">
                            <div class="col-md-12">                
                                <div class="form-group" id="divNilai">                            
                                    <label class="col-md-2 control-label">Nilai Awal</label>
                                    <div class="col-md-4">                                
                                        <input type="text" class="form-control input" placeholder="Isi Nilai Awal" id="first_val" data-inputmask='"alias": "decimal", "groupSeparator": ",", "autoGroup": true' style="text-align: right;" data-mask>
                                        <span class="help-block"></span>
                                    </div>
                                    <label class="col-md-2 control-label">Nilai Akhir</label>
                                    <div class="col-md-4">                                
                                        <input type="text" class="form-control input" placeholder="Isi Nilai Akhir" id="last_val" data-inputmask='"alias": "decimal", "groupSeparator": ",", "autoGroup": true' style="text-align: right;" data-mask disabled="">
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                        </div>                  
                        <div class="row">
                            <div class="col-md-12">                
                                <div class="form-group" id="divOption">                            
                                    <label class="col-md-2 control-label">Satuan Awal</label>
                                    <div class="col-md-4">                                
                                        <select class="input input-group select2-bootstrap-append" id="units_id" style="width:97%;">
                                            <?php
                                            $voptSat = '<option value="">Pilih Satuan Awal</option>';
                                            echo $voptSat;
                                            ?>
                                        </select>
                                        <span class="help-block"></span>
                                    </div>
                                    <label class="col-md-2 control-label">Satuan Akhir</label>
                                    <div class="col-md-4">                                
                                        <select class="input input-group select2-bootstrap-append" id="units_id2" style="width:97%;">
                                            <?php
                                            $voptSat2 = '<option value="">Pilih Satuan Akhir</option>';
                                            echo $voptSat2;
                                            ?>
                                        </select>
                                        <span class="help-block"></span>
                                    </div>
                                </div>
                            </div>
                        </div>                  

                    </div>

                    <div class="box-footer form-actions">
                        <div class="alert alert-danger alert-dismissable bg-message">
                            <span class="message-error"></span>
                        </div>
                        <!--
                        <button type="button" class="btn pull-right btn-danger abort-new-uom" data-dismiss="modal">Batal</button> 
                        <button type="button" class="btn pull-right btn-primary save_new-uom" id="create" 
                                 style="margin-right: 5px;" tar="CALLFN" ng-tar="fnFormExec">Simpan</button>                    
                        -->
                    </div>                            
            </form>                
        </div>    
    </div>    
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

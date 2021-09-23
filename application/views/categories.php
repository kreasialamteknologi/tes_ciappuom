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
                <span><?php echo $title; ?></span>
            </li>
        </ul>
    </div>
    <!-- END PAGE BAR -->
    <!-- END PAGE HEADER-->
    <!-- BEGIN SAMPLE TABLE PORTLET-->
    <div class="portlet light">
        <div class="portlet-body">
                    <div class="portlet-title">
                        <div class="actions">

                                <button type="button" class="btn btn-primary pull-right btn-add_categories" data-toggle="modal" data-target="#CategoriesModal" data-whatever="@mdo"><span class="glyphicon glyphicon-plus-sign"></span> Tambah Data</button>

                        </div>
                    </div>
                    <table id="table" class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th width="10">#ID</th>
                                <th>Nama</th>
                                <th width="170">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>

    </div>
    <!-- END SAMPLE TABLE PORTLET-->
    </div>    
</div>

<div class="modal fade portlet box blue" id="CategoriesModal" tabindex="-1" role="dialog" aria-labelledby="CategoriesModal" aria-hidden="true">
    <div class="portlet-title" id="portletTitle">
            <div class="caption">
                <i class="fa fa-sliders"></i> Form Categories </div>
            <div class="tools">
                <button type="button" class="close" data-dismiss="modal" data-original-title="" title=""> </button>
            </div>
    </div>
    
    <div class="portlet-body form">                                
        <form class="form-horizontal" id="form_categories" role="form" method="POST" action="#">            
            <input type="button" id="submit_form" readonly="" style="display: none;" value="save">
            <input type="hidden" name="type" id="type" value="add" readonly>
                <input type="hidden" name="id" id="id" value="0" readonly>                                
                <div class="form-body">                    
         
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Nama</label>
                                <input type="text" class="form-control input" placeholder="Nama*" name="nama" id="nama" tar="#alamat" autocomplete="off">
                            </div>
                        </div>
                    </div>   
                </div>
                
                <div class="box-footer form-actions">
                    <div class="alert alert-danger alert-dismissable bg-message">
                        <span class="message-error"></span>
                    </div>
                    <button type="button" class="btn pull-right btn-danger abort-new-categories" data-dismiss="modal">Batal</button> 
                    <button type="button" class="btn pull-right btn-primary save_new-categories" id="create" 
                             style="margin-right: 5px;" tar="CALLFN" ng-tar="fnFormExec">Simpan</button>                    
                </div>                            
        </form>                
    </div>    
<!--    
<div class="row">
<div class="col-md-12">

</div>
</div>
-->    
</div>    


<div class="modal fade" id="DelModal" tabindex="-1" role="dialog" aria-labelledby="DelModal" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title">Delete</h4>
    </div>
    <div class="modal-body">
        <form name="del_modal" id="del_modal" action="#" method="post">
            <div class="modal-body">
                <div class="form-group">
                    Apakah anda ingin menghapus data <span class="val_no"></span> ini? <span class="text_delete_order"></span>
                    <input type="hidden" id="id_no_del" name="id_no_del">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                    <input type="button" class="btn btn-primary" id="btn-remove" value="Yes"/>
                </div>
            </div>
        </form>
    </div>
</div>

<script type="text/javascript">
    var $_update = 1;
    var $_delete = 1;    

</script>    

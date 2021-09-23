<!-- BEGIN SIDEBAR -->
<div class="page-sidebar-wrapper">
    <!-- BEGIN SIDEBAR -->
    <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
    <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
    <div class="page-sidebar navbar-collapse collapse">
        <!-- BEGIN SIDEBAR MENU -->
        <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
        <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
        <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
        <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
        <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
        <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
        <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">
            <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
            <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
            <li class="sidebar-toggler-wrapper hide">
                <div class="sidebar-toggler">
                    <span></span>
                </div>
            </li>
            <!-- END SIDEBAR TOGGLER BUTTON -->
            <?php
            $parent = '';
            $selecteds = '';
            if($lsidebar == true){
               $get_privilege = $this->dm->get_privilege();
               $arr_privilege= array();
               //echo 'COUNT :: get_privilege : '.$get_privilege->num_rows().'<br>';
               if($get_privilege->num_rows() > 0)
               {

                $r = $get_privilege->result_array();
                foreach ($r as $keys => $parents) {
                    if($parent != $parents['parent_id']){

                        $active_parent = ($selected == $parents['slug_parent']) ? 'active open' : '';
                        $selected_parent = ($selected == $parents['slug_parent']) ? '<span class="selected"></span>' : '';
                        $arrow_parent = ($selected == $parents['slug_parent']) ? 'open' : '';
                        echo '<li class="nav-item start '.$active_parent.'">';
                            echo '<a href="javascript:;" class="nav-link nav-toggle">';
                                echo '<i class="'.$parents['icon_class_parent'].'"></i>';
                                echo '<span class="title">'.$parents['name_parent'].'</span>';
                                echo $selected_parent;
                                echo '<span class="arrow '.$arrow_parent.'"></span>';
                            echo '</a>';


                            echo '<ul class="sub-menu">';
                            foreach ($r as $key => $menu) {
                                if($parents['parent_id'] == $menu['parent_id'] && $menu['_view']){
                                    $active = ($view == $menu['slug']) ? 'active' : '';
                                    echo '<li class="nav-item '.$active.'">';
                                        echo '<a href="'.base_url().$menu['slug'].'" class="nav-link ">';
                                            echo '<i class="fa '.$menu['icon_class'].'"></i>';
                                            echo '<span class="title">'.$menu['menu'].'</span>';
                                        echo '</a>';
                                    echo '</li>';
                                }
                            }
                            echo '</ul>';                            
                            
                        echo '</li>';

                    }
                    $parent = $parents['parent_id'];
                }
              }                

            }
            ?>
        </ul>
        <!-- END SIDEBAR MENU -->
        <!-- END SIDEBAR MENU -->
    </div>
    <!-- END SIDEBAR -->
</div>
<!-- END SIDEBAR -->

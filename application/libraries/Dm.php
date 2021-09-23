<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Dm{
  protected $ci;
    protected $arrSetting = array();
    public function __construct()
    {
        $this->ci =& get_instance();
        log_message('debug', "GlobalFunction Class Initialized");
    }

    function DB2Date($tgl, $iswaktu = false, $isbahasa = false) {        
        $arrTgl = explode(" ", $tgl);
        $tgle = $arrTgl[0];
        $wkte = '';
        if(count($arrTgl) >= 2)
            $wkte = $arrTgl[1];
        
        list($tahun, $bulan, $tanggal) = explode("-", $tgle);
        //$vBulan = ArrBulan(intval($bulan));
        if($tgl!="") {
            if(!$isbahasa)
                    return $tanggal ."/". $bulan ."/". $tahun .($iswaktu?" ".$wkte:"");
            else
                return $tanggal . " " . $vBulan . " " . $tahun;
        }
        else
            return "";
    }

    //format tanggal inputan dd-mm-yyyy, dd/mm/yyyy
    function Date2DB($tgl, $parsing = "-") {
        /*
            $arrTgl = explode($parsing, $tgl);
            if(count($arrTgl) >= 2)
                $wkte = $arrTgl[1];
        */
       list($tanggal, $bulan, $tahun) = explode($parsing, $tgl);

        if($tanggal && $bulan && $tahun)
            return $tahun ."-". $bulan ."-". $tanggal;
        else
            return NULL;
    }    
    
    function GNumberFormat($Var){
        $Var = str_replace(array(',', ' ', '.'),'',$Var);
        return number_format($Var,0,'',',');
    }
    
    function array_push_associative(&$arr) {
       $args = func_get_args();
       foreach ($args as $arg) {
           if (is_array($arg)) {
               foreach ($arg as $key => $value) {
                   $arr[$key] = $value;
                   $ret++;
               }
           }else{
               $arr[$arg] = "";
           }
       }
       return $ret;
    }

    function in_array_column($column, $array){           
        if (!empty($array) && is_array($array))
        {
            for ($i=0; $i < count($array); $i++)
            {
                //if ($array[$i][$column]==$text || strcmp($array[$i][$column],$text)==0) return true;
                if ($array[$i]['Item'] == $column){ 
                    return true;
                }
            }
        }    
        return false;    
    }

    function in_array_column_then_modify($column, $addedVal, $array){           
        if (!empty($array) && is_array($array))
        {
            for ($i=0; $i < count($array); $i++)
            {
                //if ($array[$i][$column]==$text || strcmp($array[$i][$column],$text)==0) return true;
                if ($array[$i]['Item'] == $column){ 
                    for ($j=0; $j <= $i; $j++){
                        if($array[$j]['Item'] == $column){
                            $modified = $array[$j]['Qty'] + $addedVal;
                            $array[$j]['Qty'] += $addedVal;
                            //echo "Qty : ".$array[$j]['Qty']." Modified : ".$array[$j]['Item']." === ".$array[$j]['Qty'].",,,";                        
                            return $array;
                            //unset($array[$j]);
                            //break;
                        }
                    }                
                }
            }
        }    
    }
    
    function StringToArray($str, $del=",") {
      $result = array();
      $keys = explode($del, $str);
      /*
      while (count($keys) > 0) {
        $current = array_pop($keys);
        $result = array($current=>$result);        
      }
       * 
       */
      foreach ($keys as $value) {
        array_push($result, $value);
      }
      return $result;
    }	    
    

    // =========================== SETTING ===========================
    
    
    // =========================== END SETTING ===========================    

    function getLastID($pTable, $pColumn, $pCode, $arrW = "", $pIsMax=false, $pIsYM=false ){

        if($pIsMax){
            $_sql = "SELECT MAX(".$pColumn.") AS last_id FROM ".$pTable;            
        }else{            
            $_sql = "SELECT ".$pColumn." AS last_id FROM ".$pTable;            
        }
        
        if($arrW){
            $_sql .= " WHERE ".$arrW;
        }
        
        if(!$pIsMax){
            $_sql .= " ORDER BY id DESC LIMIT 1";
        }        
        
        //print_r($_sql); die();
        $_q = $this->ci->db->query($_sql);
        log_message('error', $_SERVER['REMOTE_ADDR'].' \r \n getLastID > '.$_sql." > Num : ".$_q->num_rows(), TRUE);
        if(!$_q->num_rows()){
            $last_id = '0000';
        }else{
            $_r = $_q->row(); 
            $len = ($pIsYM) ? strlen($pCode)+4 : strlen($pCode);
            $last_id = substr($_r->last_id, $len);
        }
        $max = intval($last_id);
        $new_id = str_pad('',4-strlen($max + 1), "0").($max + 1);        
        if($pIsYM){
            $new_id = date('ym').$new_id;
        }
        //return $new_id;        
        return $pCode.$new_id;
    }    

    function change2B($str)
    {
        // non-alpha and non-numeric characters become spaces
        $str = preg_replace('/[0-9]/i', '*', $str);
        return $str;
    }

    function gen_uuid() {
        // %04x%04x-%04x-%04x-%04x-%04x%04x%04x
        
/*
            // 32 bits for "time_low"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),

            // 16 bits for "time_mid"
            mt_rand( 0, 0xffff ),

            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 4
            mt_rand( 0, 0x0fff ) | 0x4000,

            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            mt_rand( 0, 0x3fff ) | 0x8000,

            // 48 bits for "node"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
 */        
        return sprintf( '%06x',
            // 32 bits for "time_low"
            mt_rand( 0, 0xffff ),

            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 4
            mt_rand( 0, 0x0fff ) | 0x4000,

            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            mt_rand( 0, 0x3fff ) | 0x8000,

            // 48 bits for "node"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
        );
    }    
    
    function get_enum_values( $table, $field )
    {
        $type = $this->ci->db->query( "SHOW COLUMNS FROM {$table} WHERE Field = '{$field}'" )->row( 0 )->Type;
        preg_match("/^enum\(\'(.*)\'\)$/", $type, $matches);
        $enum = explode("','", $matches[1]);
        return $enum;
    }    
    
	public function hash($string) {
		return hash("sha512", $string . $this->ci->config->item("encryption_key"));
	}  
     
     function get_privilege(){
        $this->ci->db->select('users_privilege.*, menu, parent_id, slug, icon_class, name_parent, slug_parent, icon_class_parent', FALSE);
        $this->ci->db->where('group_id', 2);
        $this->ci->db->from('users_privilege');
        $this->ci->db->join('menus', 'menus.id = users_privilege.menu_id');
        $this->ci->db->join('menus_parent', 'menus_parent.id = menus.parent_id');
        $this->ci->db->where('menus.action', 1);
        $this->ci->db->order_by('menus.parent_id, menus.urut', 'ASC');                   // menu_id
        $q = $this->ci->db->get();
        //log_message('error', $_SERVER['REMOTE_ADDR'].' get_privilege : '.$this->db->last_query(), TRUE);                                         
        return $q;         
     }
} // End CI_Global_Function

// END CI_GlobalFunction class

/* End of file Dm.php */
/* Location: ./system/libraries/Dm.php */

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Core_model extends CI_Model {

	public function __construct()
	{
		parent::__construct();
		date_default_timezone_set('Asia/Jakarta');
	}

    function search_for_slug($slug, $array) {
       foreach ($array as $key => $val) {
           if ($val['slug'] === $slug) {
               return $key;
           }
       }
       return null;
    }
    
    function getArrCategories(){
        return $this->db->get('categories');
    }
    
    function getUnits(){
        $pCatID = $this->input->post('pCatID');
        $val = $this->input->get('search');
        $this->db->select("a.*", FALSE);
        $this->db->from('units AS a');        
        $this->db->where('a.cat_id', $pCatID);
        if($val){
            $this->db->like('a.units_name', strtoupper($val), 'both');
        }         
        $this->db->order_by('a.units_name ASC');

        return $this->db->get();          
    }
    
	public function get_json_categories()
	{
            $search = $this->input->post("search");
            $searchRegex = ($search['regex']) ? $search['regex'] : false;
            $searchValue = ($search['value']) ? $search['value'] : '';
            $draw = ($this->input->post('draw')) ? intval($this->input->post('draw')) : 0;
            $length =  ($this->input->post('length')) ? intval($this->input->post('length')) : 100;
            $start =  ($this->input->post('start')) ? intval($this->input->post('start')) : 0;

            $order = $this->input->post("order");
            $orderDir = ($order[0]['dir']) ? $order[0]['dir'] : 'DESC';
            $orderNumber = ($order[0]['column']) ? $order[0]['column'] : 0;
            $columns = $this->input->post("columns");
            $orderColumns = ($columns[$orderNumber]['name']) ? $columns[$orderNumber]['name'] : 'a.id';

            $this->db->select("a.*", FALSE);

            $this->db->from('categories AS a');
            $this->db->group_start();
                $this->db->like('a.cat_name', $searchValue, 'both');
            $this->db->group_end();
            $this->db->order_by($orderColumns, $orderDir);
            $this->db->limit($length, $start);            
            $query = $this->db->get();            
            $arrs= $query->result_array();

            $recordsTotal = count($arrs);

            $this->db->group_start();
                $this->db->like('a.cat_name', $searchValue, 'both');
            $this->db->group_end();
            $this->db->from('categories AS a');
            $recordsFiltered = $this->db->count_all_results();

            $arrOut = array('draw' => $draw, 'recordsTotal' => $recordsTotal, 'recordsFiltered' => $recordsFiltered, 'data' => '');
            $arr_data = array();

            foreach ($arrs as $arrVal) {
              $arr = array(
                'id' => $arrVal['id'],
                'cat_name' => $arrVal['cat_name']
              );
              $arr_data['data'][] = $arr;
            }
            $arrOut = array_merge($arrOut, $arr_data);
            return json_encode($arrOut);

	}    
    
	public function get_json_units()
	{
            $search = $this->input->post("search");
            $searchRegex = ($search['regex']) ? $search['regex'] : false;
            $searchValue = ($search['value']) ? $search['value'] : '';
            $draw = ($this->input->post('draw')) ? intval($this->input->post('draw')) : 0;
            $length =  ($this->input->post('length')) ? intval($this->input->post('length')) : 100;
            $start =  ($this->input->post('start')) ? intval($this->input->post('start')) : 0;

            $order = $this->input->post("order");
            $orderDir = ($order[0]['dir']) ? $order[0]['dir'] : 'DESC';
            $orderNumber = ($order[0]['column']) ? $order[0]['column'] : 0;
            $columns = $this->input->post("columns");
            $orderColumns = ($columns[$orderNumber]['name']) ? $columns[$orderNumber]['name'] : 'a.id';

            $this->db->select("a.*, b.cat_name", FALSE);

            $this->db->from('units AS a');
            $this->db->join('categories AS b', 'a.cat_id=b.id', 'INNER');
            $this->db->group_start();
                $this->db->like('b.cat_name', $searchValue, 'both');
                $this->db->or_like('a.units_name', $searchValue, 'both');
            $this->db->group_end();
            $this->db->order_by($orderColumns, $orderDir);
            $this->db->limit($length, $start);            
            $query = $this->db->get();            
            $arrs= $query->result_array();

            $recordsTotal = count($arrs);

            $this->db->group_start();
                $this->db->like('b.cat_name', $searchValue, 'both');
                $this->db->or_like('a.units_name', $searchValue, 'both');
            $this->db->group_end();
            $this->db->from('units AS a');
            $this->db->join('categories AS b', 'a.cat_id=b.id', 'INNER');
            $recordsFiltered = $this->db->count_all_results();

            $arrOut = array('draw' => $draw, 'recordsTotal' => $recordsTotal, 'recordsFiltered' => $recordsFiltered, 'data' => '');
            $arr_data = array();

            foreach ($arrs as $arrVal) {
              $arr = array(
                'id' => $arrVal['id'],
                'cat_name' => $arrVal['cat_name'],
                'units_name' => $arrVal['units_name'],
                'units_val' => $arrVal['units_val']
              );
              $arr_data['data'][] = $arr;
            }
            $arrOut = array_merge($arrOut, $arr_data);
            return json_encode($arrOut);

	}    
}
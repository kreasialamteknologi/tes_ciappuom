<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {
	public function __construct()
	{
            parent::__construct(); 
            $this->load->model('Core_model', 'm', true);
            $this->data = array();     
	}


	public function index()
	{


		$this->data['view']  	= 'dashboard';
		$this->data['title'] 	= 'Dashboard';
		$this->data['selected'] = 'menu';
		$this->data['page_js'] 	= 'dashboard';
             

		$this->data['lsidebar'] = true;
		$this->data['rsidebar'] = true;
		$this->data['page_header'] = false;
		$this->data['kategori'] = $this->m->getArrCategories();

		$this->load->view('view', $this->data);

	}

	public function get_json()
	{

	}
     
     public function getUnits(){                  
        $jsonData = array();
        $arr = array();

        $jsonData[] = array(
            'text'=>'Pilih Satuan',
            'id'=>''
        );        
        
        $q = $this->m->getUnits();
        
        foreach($q->result_array() AS $r){
            //$jsonData[] = $r['id_no'];
            $arr = array(
                'text'=>$r['units_name'],
                'units_val'=>$r['units_val'],
                'id'=>$r['id']
            );
            $jsonData[] = $arr;
        }

        $q->free_result();
        echo json_encode($jsonData);               
     }

}

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Units extends CI_Controller {


	public function __construct()
	{
        parent::__construct();  
        $this->load->model('Core_model', 'm', true);
        $this->data = array();     
	}

	
	public function index()
	{

		$this->data['view']       = 'units';
		$this->data['page_js']         = 'units';
		$this->data['title']      = 'Master Satuan';
		$this->data['selected']   = 'menu';


		$this->data['lsidebar'] = true;
		$this->data['rsidebar'] = true;
		$this->data['page_header'] = true;
		$this->load->view('view', $this->data);
		
	}

	public function get_json()
	{
		echo $this->m->get_json_units();

	}	
}

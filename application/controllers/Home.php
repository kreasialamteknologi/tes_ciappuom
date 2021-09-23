<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {
	public function __construct()
	{
            parent::__construct(); 

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

		$this->load->view('view', $this->data);

	}

	public function get_json()
	{

	}

}

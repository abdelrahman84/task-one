<?php
public function login() 
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
    header('Access-Control-Allow-Headers: Accept,Accept-Language,Content-Language,Content-Type');

    $formdata = json_decode(file_get_contents('php://input'), true);

    $username = $formdata['username'];
    $password = $formdata['password'];

    $user = $this->api_model->login($username, $password);

    if($user) {
        $response = array(
            'user_id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'token' => $user->token
        );
    }
    else {
        $response = array();
    }

    $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($response));
}
?>
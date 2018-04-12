<?php
    $url = 'https://www.figma.com/oauth';
    $apiUrl = 'https://www.figma.com/api/oauth/token';
    $client_id = 'CLIENT ID';
    $client_secret = 'CLIENT SECRET';
    $redirect_url = 'http://localhost:9001/';

    session_start();

    $authenticated = false;
    if (isset($_GET['state']) && isset($_GET['code'])) {
        $authenticated = true;
        if($_SESSION["state"]  == $_GET['state'])
        {   
            $data = array(
                'client_id' => $client_id,
                'client_secret' => $client_secret,
                'redirect_uri' => $redirect_url,
                'code' => $_GET['code'], 
                'grant_type' => 'authorization_code');
            
            foreach($data as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
            $fields_string = rtrim($fields_string,'&');

            //open connection
            $ch = curl_init();
                
            //set the url, number of POST vars, POST data
            curl_setopt($ch,CURLOPT_URL,$apiUrl);
            curl_setopt($ch,CURLOPT_POST,count($fields));
            curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
                
            //execute post
            $jsonResult = curl_exec($ch);
            if (curl_errno($ch)) { 
                echo "<p>Something went wrong. Please try again.</p>";
                print curl_error($ch); 
            } else{
                $result = json_decode($jsonResult);
                
                if($result->error){
                    echo "<p>Something went wrong. Please try again.</p>";
                    echo $result->message;
                } else{
                    $_SESSION["access_token"] = $result->access_token;
                    $_SESSION["refresh_token"] = $result->refresh_token;
                    $expiry = time() + $result->expires_in;
                    $_SESSION["refresh_token"] = $expiry;
                    $injectScript = file_get_contents('./inject_auth_token.html',"*");
                    $toServe = str_replace("/authentication_token/",$result->access_token,$injectScript);
                    echo $toServe;
                }
            }
        }
        else{
            echo "Something went wrong. Please try again.";
        }
    } 
    
    if($authenticated == false){
        $_SESSION["state"] = rand(1,1000);
    
        $authUrl = "Location: ";
        $authUrl .=  $url;
        $authUrl .= "?client_id=";
        $authUrl .= $client_id;
        $authUrl .= "&redirect_uri=";
        $authUrl .= $redirect_url;
        $authUrl .= "&scope=file_read&state=";
        $authUrl .= $_SESSION["state"];
        $authUrl .= "&response_type=code";

        header($authUrl);
        die();
    }
?>
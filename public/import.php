<?php session_start();
    include_once 'secrets.php';

    $state = htmlspecialchars($_GET['state']);
    $code = htmlspecialchars($_GET['code']);

    if(empty($state) && empty($code)){
        $session_state = bin2hex(random_bytes(8));
        $_SESSION["state"] = $session_state;
        header('Location: https://eu.battle.net/oauth/authorize?client_id=' . $blizzard_client_id . '&scope=wow.profile&state=' . $session_state . '&redirect_uri=' . $blizzard_redirect . '&response_type=code');
        exit;
    } else {
        $session_state = $_SESSION["state"];
        if($session_state != $state){
            echo json_encode((object)array('error' => 'Invalid Session (cookie + state mismatch)'));
            exit;
        }
    }

    $curl_token = curl_init( 'https://eu.battle.net/oauth/token' );

    $params = [
        'redirect_uri'=> $blizzard_redirect,
        'scope'=>'wow.profile',
        'grant_type'=>'authorization_code',
        'code'=> $code
    ];
    curl_setopt( $curl_token, CURLOPT_POST, true);
    curl_setopt( $curl_token, CURLOPT_POSTFIELDS, $params);
    curl_setopt( $curl_token, CURLOPT_USERPWD, "$blizzard_client_id:$blizzard_client_secret");
    curl_setopt( $curl_token, CURLOPT_RETURNTRANSFER, true);
    curl_setopt( $curl_token, CURLOPT_HTTPHEADER, ['Content-Type: multipart/form-data']);

    $response = curl_exec( $curl_token );
    $status = curl_getinfo( $curl_token, CURLINFO_HTTP_CODE);
    curl_close( $curl_token );

    if ($status !== 200) {
        echo json_encode((object)array('error' => 'Failed to retrieved access token'));
        throw new Exception('Failed to create access token.');
    }

    $decoded = json_decode($response);
    $access_token = $decoded->access_token;

    $url = 'https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=en_GB&access_token=' . $access_token;

    $curl_profile = curl_init( $url );
    curl_setopt( $curl_profile, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec( $curl_profile );
    $status = curl_getinfo( $curl_profile, CURLINFO_HTTP_CODE);

    curl_close( $curl_profile );

    if ($status !== 200) {
        echo json_encode((object)array('error' => 'Failed to fetch profile data'));
        throw new Exception('Failed to fetch profile data.');
    }

    $decoded = json_decode($response);

    $characters = [];
    foreach($decoded->wow_accounts as $account){
        foreach($account->characters as $character){
            $characters[] = (object)array(
                'name' => $character->name, 
                'realm' => $character->realm->name, 
                'class' => $character->playable_class->name, 
                'faction' => $character->faction->name, 
                'id' => $character->id
            );
        }
    }

    echo json_encode($characters);
?>

<script>
    let charactersFromApi = <?php echo json_encode($characters) ?>;
    
    let characters = [];
    let fromLocalStorage = localStorage.getItem("characters");
    if (fromLocalStorage) {
        characters = JSON.parse(fromLocalStorage);
    }
    
    for (let i = 0; i < charactersFromApi.length; i++) {
        let alreadyInList = false;
        for (let j = 0; j < characters.length; j++) {
            if (characters[j].id == charactersFromApi[i].id) alreadyInList = true;
        }

        if (!alreadyInList) {
            characters.push(charactersFromApi[i]);
        }
    }

    localStorage.setItem("characters", JSON.stringify(characters));
    window.location.replace("https://todo.amusedtodeath.eu/");
</script>
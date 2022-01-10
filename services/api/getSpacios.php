<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require_once('cnn.php');
$method = $_SERVER['REQUEST_METHOD'];

if($method == 'POST'){
	$requestBody=file_get_contents('php://input');
	$params= json_decode($requestBody);
	$params = (array) $params;

	if ($params['latitude']) {
		$latitude = $params['latitude'];
        $longitude = $params['longitude'];

        if($latitude == '0' || $longitude == '0'){
            $sql = "SELECT a.id_space, a.email_user, a.price, a.title, a.space_type, a.space_sub_type, a.id_adress, a.description, b.name as 'space_sub_type_name', c.name as 'space_type_name', d.latitude, d.longitude, d.city, d.state 
            FROM spaces as a
            INNER JOIN spaces_sub_types as b on b.id=a.space_sub_type
            INNER JOIN spaces_types as c on c.id=a.space_type
            LEFT JOIN addresses as d on d.id_adresss=a.id_adress";
        }else{
            $sql = "SELECT a.id_space, a.email_user, a.price, a.title, a.space_type, a.space_sub_type, a.id_adress, a.description, b.name as 'space_sub_type_name', c.name as 'space_type_name', d.latitude, d.longitude, d.city, d.state 
			FROM spaces as a
			INNER JOIN spaces_sub_types as b on b.id=a.space_sub_type
			INNER JOIN spaces_types as c on c.id=a.space_type
			LEFT JOIN addresses as d on d.id_adresss=a.id_adress
			WHERE ABS(d.latitude-".$latitude.")<0.5 and ABS(d.longitude-(".$longitude."))<0.5";
        }

		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			//echo 'Hola';
			//echo $result;
			while($row = $result->fetch_assoc()) {
				$array[] = array_map('utf8_encode', $row);
			}
			$res = json_encode($array, JSON_NUMERIC_CHECK);
			header('Content-Type: application/json');
			echo $res;
		} else {
			echo "0";
		}
	}else{
		echo "Not valid Body Data";
	}

}else{
	echo "Not valid Data";
}

$conn->close();
?>
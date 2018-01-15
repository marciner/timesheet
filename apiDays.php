<?php


$method = $_SERVER['REQUEST_METHOD'];

$myFile = file_get_contents('users.json');

function normalize($value){
	$value = str_replace(array("<", ">", "/", "\\"),"",$value);
	$value = trim($value);
	if (strlen($value) < 64){
 		$value = substr($value, 0, 64);
	}
	return $value;}

if($method == 'POST'){

	if (isset($_POST['date'])){

		$date = $_POST['date'];

	}else{
		
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);

		$date = $request->date;
	}

 	$date = normalize($date);
 	$jsonString = file_get_contents("users.json");
 	$data = json_decode($jsonString, true);
	$i = count($data);
 	$data[$i]['id'] = "1";
 	$data[$i]['name'] = "Przykładowe imie";
 	$data[$i]['surname'] = "Przykładowe nazwisko";
 	$data[$i]['presence'] = "Tak";
 	$data[$i]['date'] = $date;
 	$newJsonString = json_encode($data);
 	file_put_contents("users.json", $newJsonString);

}else{
	echo "Something went wrong";
}
?>
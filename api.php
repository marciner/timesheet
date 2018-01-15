<?php
$_DELETE = array();

$method = $_SERVER['REQUEST_METHOD'];

$myFile = file_get_contents('users.json');

function normalize($value){
	$value = str_replace(array("<", ">", "/", "\\"),"",$value);
	$value = trim($value);
	if (strlen($value) < 64){
 		$value = substr($value, 0, 64);
	}
	return $value;}

if ($method == 'GET'){

	echo $myFile;

} elseif ($method == 'POST'){

	if (isset($_POST['id']) and isset($_POST['name']) and isset($_POST['surname']) and isset($_POST['presence'])){

		$id = $_POST['id'];
		$name = $_POST['name'];
		$surname = $_POST['surname'];
		$presence = $_POST['presence'];
		$date = $_POST['date'];

	}else{
		
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$id = $request->id;
		$name = $request->name;
		$surname = $request->surname;
		$presence = $request->presence;
		$date = $request->date;
	}

 		$id = normalize($id);
 		$name = normalize($name);
 		$surname = normalize($surname);
 		$presence = normalize($presence);

 		$jsonString = file_get_contents("users.json");
 		$data = json_decode($jsonString, true);

		$i = count($data);

 		$data[$i]['id'] = $id;
 		$data[$i]['name'] = $name;
 		$data[$i]['surname'] = $surname;
 		$data[$i]['presence'] = $presence;

 		$newJsonString = json_encode($data);
 		file_put_contents("users.json", $newJsonString);

}elseif ($method == 'PUT'){
	if (isset($_PUT['id']) and isset($_PUT['name']) and isset($_PUT['surname']) and isset($_PUT['presence'])){

		$id = $_PUT['id'];
		$name = $_PUT['name'];
		$surname = $_PUT['surname'];
		$presence = $_PUT['presence'];

	}else{
		
		$putdata = file_get_contents("php://input");
		$request = json_decode($putdata);
		$id = $request->id;
		$name = $request->name;
		$surname = $request->surname;
		$presence = $request->presence;
	}

	$isManyIdToEdit = is_array($request->id);
	echo $isManyIdToEdit;

	if ($isManyIdToEdit == 1){
		$m = count($request->id);
		$i = count($data);

		$jsonString = file_get_contents("users.json");
 		$data = json_decode($jsonString, true);

		for ($l=0; $l < $m; $l++) { 
			$idFromIDs = $request->id[$l];
			$idName = $data[$l]['id'];
			if($idName == $idFromIDs){
				$data[$k]['name'] = $name;
				$data[$k]['surname'] = $surname;
				$data[$k]['presence'] = $presence;

			}
		}	



	}else{

		$id = normalize($id);
 		$name = normalize($name);
 		$surname = normalize($surname);
 		$presence = normalize($presence);
 		$jsonString = file_get_contents("users.json");
 		$data = json_decode($jsonString, true);
 		$i = count($data);
 		$idName ='';
	
 		for ($k=0; $k < $i ; $k++) { 
 			$idName = $data[$k]['id'];
 			if($idName == $id){
				$data[$k]['name'] = $name;
				$data[$k]['surname'] = $surname;
				$data[$k]['presence'] = $presence;
	
			}
 		}
	}


 	$newJsonString = json_encode($data);
 	file_put_contents("users.json", $newJsonString);


}elseif ($method == 'DELETE'){

	if (isset($_DELETE['id'])){
		$id = $_DELETE['id'];
	}else{
		$deletedata = file_get_contents("php://input");
		$request = json_decode($deletedata);
		$id = $request->id;
	}


	$isManyIdToDelete = is_array($request->id);
	echo $isManyIdToDelete; 

	$idName ='';

	$jsonString = file_get_contents('users.json');
 	$data = json_decode($jsonString, true);

 	$idFromIDs = '';

	if ($isManyIdToDelete == 1){

		$m = count($request->id);
		$i = count($data);

		for ($l=0; $l < $m; $l++) { 
			$idFromIDs = $request->id[$l];

			for($j=0; $j < $i; $j++){
				$idName = $data[$j]['id'];
				if($idName == $idFromIDs){
					unset($data[$j]);
				}
			}
		}

	}else{
		
 		$i = count($data);
		for($j=0; $j < $i; $j++){
			$idName = $data[$j]['id'];
			if($idName == $id){
				unset($data[$j]);
			}
		}
	}


	
	$data2 = array_values($data);
	$newJsonString = json_encode($data2);
 	file_put_contents("users.json", $newJsonString);
	
}
?>
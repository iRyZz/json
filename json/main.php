<?php
$json_source = file_get_contents('recipes.json');
$json_data = json_decode($json_source);

if(isset($_POST['course'])){//a la requete de l'ajax la variable course existera
  echo json_encode($json_data);//on retourne le contenu du .json
}

if(isset($_POST['id'])){//a la requete de l'ajax la variable id existera
  echo json_encode($json_data[$_POST['id']-1]);//on retourne le contenu du .json a l'index $_POST['id']-1
}
?>

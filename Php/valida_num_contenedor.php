<?php
    include('conexion.php');

    $id = $_POST['num_contenedor'];
    $query = "SELECT * FROM contenedores WHERE num_contenedor='$id' AND flujo='Entrada'";
    $result = mysqli_query($conexion, $query);

    if(!$result){
        die('Query failed '.mysqli_error($conexion));
    }

    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'num_contenedor' => $row['num_contenedor'],
            'tamano' => $row['tamano'],
            'fecha' => $row['fecha'],
            'num_economico' => $row['num_economico'],
            'flujo' => $row['flujo']
        );
    }

    $json_string = json_encode($json);
    echo $json_string;
?>
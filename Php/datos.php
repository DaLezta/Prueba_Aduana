<?php
    include('conexion.php');

    $query = "SELECT * FROM contenedores";
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
            'flujo' => $row['flujo'],
            'fecha_salida' => $row['fecha_salida']
        );
    }

    $json_string = json_encode($json);
    echo $json_string;
?>
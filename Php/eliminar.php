<?php
    include('conexion.php');

    $data1 = $_POST['id'];
    if(!empty($data1)){
        $query = "DELETE from contenedores where num_contenedor='$data1' AND flujo = 'Entrada'";
        $result = mysqli_query($conexion, $query);
        if(!$result){
            die('Query error '.mysqli_error($conexion));
        } else {
            echo $query;
        }
    }

?>
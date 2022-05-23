<?php
    include('conexion.php');

    $data1 = $_POST['v1'];
    $data2 = $_POST['v2'];
    $data3 = $_POST['v3'];
    date_default_timezone_set("America/Mexico_City");
    $fecha = date("Y-m-d H:i:s");
    if(!empty($data1) && !empty($data3) && !empty($data2)){
        $query = "INSERT INTO contenedores VALUES('$data1','$data3','$fecha','','$data2','Entrada')";
        $result = mysqli_query($conexion, $query);
        if(!$result){
           echo "Error al ingresar datos";
        } else {
            echo "Registro Exitoso";
        }
    }else{
        echo "Error";
    }

?>
<?php
    include('conexion.php');

    $data1 = $_POST['id'];
    date_default_timezone_set("America/Mexico_City");
    $fecha = date("Y-m-d H:i:s");
    if(!empty($data1)){
        $query = "UPDATE contenedores SET fecha_salida='$fecha',flujo='Salida' WHERE num_economico='$data1' AND flujo='Entrada'";
        $result = mysqli_query($conexion, $query);
        if(!$result){
            die('Query error '.mysqli_error($conexion));
        } else {
            echo "Success";
        }
    }else{
        echo "Vacio";
    }

?>
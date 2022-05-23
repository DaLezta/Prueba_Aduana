<?php
    include('conexion.php');

    $data1 = $_POST['v1'];
    $data2 = $_POST['v2'];
    $data3 = $_POST['v3'];
    $data4 = $_POST['v4'];
    $data5 = $_POST['v5'];

    if(!empty($data1) && !empty($data2) && !empty($data3) && !empty($data4)){
        $query = "UPDATE contenedores SET tamano='$data3', fecha='$data4' ,num_economico='$data2',num_contenedor='$data1' WHERE num_contenedor='$data5'";
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
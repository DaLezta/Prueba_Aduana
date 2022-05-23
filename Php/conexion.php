<?php
    $BD_SERVIDOR = "localhost";
    $BD_USUARIO = "root";
    $BD_CONTRA = "";
    $BD_NOMBRE = "prueba_examen";
    
    $conexion = new mysqli($BD_SERVIDOR, $BD_USUARIO, $BD_CONTRA, $BD_NOMBRE);
    if ($conexion->connect_errno) {
        echo "Fallo al conectar a MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
    } 
?>
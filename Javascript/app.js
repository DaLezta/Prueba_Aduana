const index = document.getElementById('index') 
const templateCard = document.getElementById('template').content 
const fragment = document.createDocumentFragment()
var numero_contenedor,numero_economico; 

var btn_add = document.getElementById("add-contenedor")
var btn_cancel_edit = document.getElementById("btn-edit-cancel")
var btn_salidas = document.getElementById("btn-salidas")
var btn_delete = document.getElementById("drop-contenedor")
var btn_entradas = document.getElementById("btn-entradas")
var btn_save = document.getElementById("btn-save")
var btn_cancel = document.getElementById("btn-cancel")
var btn_edit_save = document.getElementById("btn-edit-save")

btn_cancel_edit.addEventListener("click",cancel_edit)
btn_add.addEventListener("click",add_data)
btn_salidas.addEventListener("click",switch_entradas)
btn_save.addEventListener("click",register)
btn_entradas.addEventListener("click",switch_salidas)
btn_cancel.addEventListener("click",cancel)
btn_edit_save.addEventListener("click",get_edit_values)

index.addEventListener('click', e => {
    Options(e)
})

function cancel(){
    document.getElementById("input-num-economico").value = ''
    document.getElementById("input-num-contenedor").value =''
    document.getElementById("select-one").value = "Tamaño de contenedor"
}
function cancel_edit(){
    document.getElementById("input-edit-num-economico").value = ''
    document.getElementById("input-edit-num-contenedor").value =''
    document.getElementById("select-edit-one").value = "Tamaño de contenedor"
}

function add_data(){
    $('#add-modal').modal('show');
}

function switch_salidas(){
    $('#add-contenedor').prop('hidden', false);
    $('#drop-contenedor').prop('hidden', false);
    $('#btn-entradas').prop('hidden', true);
    $('#btn-salidas').prop('hidden', false);
    getdata("Entrada")
    $('#Title').text("Almacen de contenedores");
}

function switch_entradas(){
    $('#drop-contenedor').prop('hidden', true);
    $('#btn-entradas').prop('hidden', false);
    $('#add-contenedor').prop('hidden', true);
    $('#btn-salidas').prop('hidden', true);
    getdata("Salida")
    $('#Title').text("Historial de salidas");
}

function getdata(option){
    $.ajax({
        url: "Php/datos.php?",
        type: "POST",
        success: function (response) {
            const data = JSON.parse(response);
            if(option == "Entrada"){
               setdata_entrada(data); 
            }else if(option == "Salida"){
               setdata_salida(data)
            }
        }, error: function (response) {
            console.log(response);
        }
    });
}

const setdata_entrada = data => {
    index.innerHTML = ''
    data.forEach(contenedor => { /*Recorrer todo el objeto data y el resultado lo guardamos en productos*/
        if(contenedor.flujo == 'Entrada'){
        templateCard.querySelector('.border-4').classList.remove("border-danger"); 
        templateCard.querySelector('h5').textContent = "Numero de contenedor: " + contenedor.num_contenedor /*Seleccionamos un objeto de nuestro template en este caso 5h*/
        templateCard.querySelector('h4').textContent = "Tamaño: " + contenedor.tamano
        templateCard.querySelector('h3').textContent = "Fecha: " + contenedor.fecha
        templateCard.querySelector('h2').textContent = "Numero Economico: " + contenedor.num_economico
        templateCard.querySelector('h1').textContent = "Flujo: " + contenedor.flujo
        templateCard.querySelector('h6').textContent = "Fecha de Salida: " + contenedor.fecha_salida
        templateCard.querySelector('.border-4').classList.add("border-success");
        templateCard.querySelector('.btn-outline-success').style.display = '';
        templateCard.querySelector('.btn-outline-danger').style.display = '';
        templateCard.querySelector('.btn-outline-dark').style.display = '';
        templateCard.querySelector('.btn-outline-success').dataset.id = contenedor.num_contenedor
        templateCard.querySelector('.btn-outline-danger').dataset.id = contenedor.num_contenedor 
        templateCard.querySelector('.btn-outline-dark').dataset.id = contenedor.num_economico 
        const clone = templateCard.cloneNode(true) /*Creamos una clonacion del fragment */
        fragment.appendChild(clone)/*Y la clonamos*/    
        }
    });
    index.appendChild(fragment) /* Con esto estamos evitando el reflow haciendo la modificacion en el fragment sin recargar la pagina*/
    
}

const setdata_salida = data => {
    index.innerHTML = ''
    data.forEach(contenedor => { /*Recorrer todo el objeto data y el resultado lo guardamos en productos*/
        if(contenedor.flujo == 'Salida'){
        templateCard.querySelector('.border-4').classList.remove("border-success");   
        templateCard.querySelector('h5').textContent = "Numero de contenedor: " + contenedor.num_contenedor /*Seleccionamos un objeto de nuestro template en este caso 5h*/
        templateCard.querySelector('h4').textContent = "Tamaño: " + contenedor.tamano
        templateCard.querySelector('h3').textContent = "Fecha: " + contenedor.fecha
        templateCard.querySelector('h2').textContent = "Numero Economico: " + contenedor.num_economico
        templateCard.querySelector('h1').textContent = "Flujo: " + contenedor.flujo
        templateCard.querySelector('h6').textContent = "Fecha de Salida: " + contenedor.fecha_salida
        templateCard.querySelector('.border-4').classList.add("border-danger");    
        templateCard.querySelector('.btn-outline-success').style.display = 'none';
        templateCard.querySelector('.btn-outline-danger').style.display = 'none';
        templateCard.querySelector('.btn-outline-dark').style.display = 'none'; 
        const clone = templateCard.cloneNode(true) /*Creamos una clonacion del fragment */
        fragment.appendChild(clone)/*Y la clonamos*/    
        }
    });
    index.appendChild(fragment) /* Con esto estamos evitando el reflow haciendo la modificacion en el fragment sin recargar la pagina*/
}

function register(){
        v1 = document.getElementById("input-num-contenedor").value
        v2 = document.getElementById("input-num-economico").value
        v3 = document.getElementById("select-one").value
        valida_num_contenedor(v2,v3,v1)
        
}
function valida_num_contenedor(num_economico,tamano,num_contenedor){
    $.ajax({
        type: "POST",
        url: "Php/valida_num_contenedor.php",
        data: { num_contenedor },
        success: function (response) {
            const data = JSON.parse(response);
            if(data.length >=1){
                error_alert("Duplicidad en los datos")
            }else{
                valida_camion(num_economico,tamano,num_contenedor)
            }
        }, error: function (response) {
        }
    });
    
}

document.addEventListener('DOMContentLoaded', () => {
    getdata("Entrada");
    $('#Title').text("Almacen de contenedores");
})

function success_alert(){
    Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso!',
        showConfirmButton: false,
        timer: 1500
      })
}
function error_alert(msg){
    Swal.fire({
        icon: 'error',
        title: msg,
        showConfirmButton: false,
        timer: 4000
      })
}

function valida_camion(num_economico,tamano,num_contenedor){
    $.ajax({
        type: "POST",
        url: "Php/valida_camion.php",
        data: { num_economico },
        success: function (response) {
            const data = JSON.parse(response);
            if(data.length ==2){
                error_alert("Ya no es posible ingresar mas contenedores a este camion")
            }else if(data.length==1){
                if(data[0].tamano =="40HC"){
                    error_alert("Ya no es posible ingresar mas contenedores a este camion") 
                }else if(data[0].tamano =="20HC" && tamano =="40HC"){
                    error_alert("Ya no es posible ingresar mas contenedores a este camion") 
                }else{
                    add(num_contenedor,num_economico,tamano)
                } 
            }else{
                add(num_contenedor,num_economico,tamano)
            }
        }, error: function (response) {
        }
    });
}

function Options(e){
    if(e.target.classList.contains('btn-outline-success')){
        const aidi = e.target.dataset.id
         ConsultaEditar(aidi)
    }else if(e.target.classList.contains('btn-outline-danger')){
        const aidi = e.target.dataset.id
        PreguntaEliminacion(aidi)
    }else if(e.target.classList.contains('btn-outline-dark')){
        const aidi = e.target.dataset.id
        pregunta_orden_salida(aidi)
    }else{
        
    } 
}

function PreguntaEliminacion(aidi){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: "Ya no podras recuperar el dato si lo borras",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        cancelButtonText: 'No Borrar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            Eliminar(aidi)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Tu archivo ha sido eliminado!',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Eliminacion Cancelada',
            'error'
          )
        }
      })
}

function Eliminar(id){
    $.ajax({
        type: "POST",
        url: "Php/eliminar.php",
        data: { id },
        success: function (response) {
            getdata("Entrada")
        }, error: function (response) {
        }
    });
}

function ConsultaEditar(id){
    $.ajax({
        type: "POST",
        url: "Php/datos_edit.php",
        data: { id },
        success: function (response) {
            const data = JSON.parse(response);
            LlenaForm(data)
        }, error: function (response) {
        }
    });
}

function add(v1,v2,v3){
    $.ajax({
        type: "POST",
        url: "Php/insertar.php",
        data: { v1,v2,v3 },
        success: function (response) {
            if(response=="Error"){
                error_alert("Todos los campos son necesarios")
            }else if(response =="Error al ingresar datos"){
                error_alert("Duplicidad de datos")
            }else{
                cancel()
                $('#add-modal').modal('hide');
                success_alert()
                getdata("Entrada")
            } 
        }, error: function (response) {
        }
    });
}

function LlenaForm(data){
    $('#edit-modal').modal('show');
    document.getElementById("input-edit-num-contenedor").value = data[0].num_contenedor;
    document.getElementById("input-edit-num-economico").value = data[0].num_economico;
    document.getElementById("input-edit-fecha").value = data[0].fecha
    document.getElementById("select-edit-one").value = data[0].tamano;
    numero_contenedor = data[0].num_contenedor;
    numero_economico = data[0].num_economico;
}

function get_edit_values(){
    var v1 = document.getElementById("input-edit-num-contenedor").value
    var v2 = document.getElementById("input-edit-num-economico").value
    var v3 = document.getElementById("select-edit-one").value
    var v4 = document.getElementById("input-edit-fecha").value
    var v5 = numero_contenedor
    valida_edit_num_contenedor(v2,v3,v1,v4,v5)
 
}

function valida_edit_num_contenedor(v2,v3,v1,v4,v5){
    num_contenedor = v1;
    $.ajax({
        type: "POST",
        url: "Php/valida_num_contenedor.php",
        data: { num_contenedor},
        success: function (response) {
            const data = JSON.parse(response);
        if(numero_contenedor == v1){
            valida_camion_edit(v2,v3,v1,v4,v5)
        }else if(data.length >=1){
                error_alert("Error duplicidad numero de contenedor")
            }else{
                valida_camion_edit(v2,v3,v1,v4,v5)
            }
        }, error: function (response) {
        }
    });
}

function valida_camion_edit(num_economico,tamano,num_contenedor,fecha,numero_contenedor){
    $.ajax({
        type: "POST",
        url: "Php/valida_camion.php",
        data: { num_economico },
        success: function (response) {
            const data = JSON.parse(response);
            if(data.length ==2){
                if(tamano == "40HC"){
                    error_alert("La capacidad del trailer no soporta este contenedor")
                }else if(tamano =="20HC" && numero_economico == num_economico){
                    Edit(num_contenedor,num_economico,tamano,fecha,numero_contenedor)
                }else{
                    error_alert("La capacidad para el trailer "+num_economico+ " Excede los limites")
                }
            }else if(data.length==1){
                if(tamano == "40HC" || tamano == "20HC"){
                    Edit(num_contenedor,num_economico,tamano,fecha,numero_contenedor)
                }else{
                    error_alert("La capacidad del trailer no soporta este contenedor")
                }
            }else{
                Edit(num_contenedor,num_economico,tamano,fecha,numero_contenedor)
            }
        }, error: function (response) {
        }
    });
}

function Edit(v1,v2,v3,v4,v5){
    $.ajax({
        type: "POST",
        url: "Php/editar.php",
        data: { v1, v2, v3, v4,v5},
        success: function (response) {
            if(response == "Success"){
            $('#edit-modal').modal('hide');
            cancel()
            success_alert()
            getdata("Entrada")
            }else if(response =="Vacio"){
                error_alert("Por favor llena todos los campos")
            }else{
                error_alert("Error al editar los datos")
            }
            
        }, error: function (response) {
        }
    });
}

function pregunta_orden_salida(id){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Deseas generar la orden de salida del numero economico: '+id+'?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, generar!',
        cancelButtonText: 'No, cancelarla!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "Php/generar_salidas.php",
                data: {id},
                success: function (response) {
                    if(response == "Success"){
                        swalWithBootstrapButtons.fire(
                        'Se ha generado las salidas del numero economico: '+id,
                        '',
                        'success'
                        )
                        getdata("Entrada")
                    }else{
                        swalWithBootstrapButtons.fire(
                            'Error al generar la salida',
                            '',
                            'error'
                            )
                    }
                }, error: function (response) {
                }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            '0 salidas generadas',
            'error'
          )

        }
      })
}












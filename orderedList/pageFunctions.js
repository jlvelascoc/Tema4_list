"use strict";
/**
 * Variable que contiene la lista
 * @type {Array}
 */
var list = new OrderedList();

function createPerson() {
    var name, sname, ssname, dni, date;

    name = document.getElementById("name").value;
    sname = document.getElementById("sname").value;
    ssname = document.getElementById("ssname").value;
    dni = document.getElementById("dni").value;
    date = document.getElementById("date").value;

    cleanParagraph();
    cleanInput();
    try{
      return new Person(name, sname, ssname, dni, date);
    }
    catch (err) {
      document.getElementById("error").innerHTML = err;
    }
}

function addElement() {

    try {
        document.getElementById("temp").innerHTML = list.add(createPerson());
        document.getElementById("list").innerHTML = list.toString();
    }
    catch (err) {
        document.getElementById("error").innerHTML = err;
    }
}

function getElement() {
    var index = document.getElementById("position").value;

    cleanParagraph();
    cleanInput();

    try {
        document.getElementById("temp").innerHTML = list.get(Number(index));
    }
    catch (err) {
        document.getElementById("error").innerHTML = err;
    }
}

function getIndex() {
    var name = document.getElementById("name").value;

    cleanParagraph();
    cleanInput();

    try {
        document.getElementById("temp").innerHTML = list.indexOf(name);
    }
    catch (err) {
        document.getElementById("error").innerHTML = err;
    }
}

function deleteElement() {
    var index = document.getElementById("position").value;
    var name = document.getElementById("name").value;

    cleanParagraph();
    cleanInput();

    try {
        //Si campo indice del formulario no está vacio y el campo elemento sí, llama a la función remove
        if (index !== "" && name === "") {
            document.getElementById("temp").innerHTML = list.remove(Number(index));
            document.getElementById("list").innerHTML = list.toString();
        }//Si campo elemento del formulario no está vacio y el campo indice sí, llama a la función removeElement
        else if (name !== "" && index === "") {
            document.getElementById("temp").innerHTML = list.removeElement(name);
            document.getElementById("list").innerHTML = list.toString();
        }
    }
    catch (err) {
        document.getElementById("error").innerHTML = err;
    }
}

/**
 * Funcion que vacia los input del formulario
 */
function cleanInput() {
    document.getElementById("name").value = "";
    document.getElementById("sname").value = "";
    document.getElementById("ssname").value = "";
    document.getElementById("dni").value = "";
    document.getElementById("date").value = "";
    document.getElementById("position").value = "";
}

/**
 * Funcion que limpia el parrafo que muestra mensajes temporales y el que muestra los errores.
 */
function cleanParagraph() {
    document.getElementById("temp").innerHTML = "";
    document.getElementById("error").innerHTML = "";
}

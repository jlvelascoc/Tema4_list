"use strict";
/*---------EXCEPCIONES----------*/
/**
 * Constructor base del que heredarán todas las
 * excepciones.
 * @constructor
 */
function BaseException() {
}
BaseException.prototype = Object.create(Error.prototype);
BaseException.prototype.constructor = BaseException;
BaseException.prototype.toString = function () {
  return this.name + ": " + this.message;
}

/**
 * Constructor de la excepcion que controla la
 * falta del parámetro nombre.
 * @constructor
 */
function NameException() {
  this.name = "NameException";
  this.message = "The name parameter is require";
}
NameException.prototype = Object.create(BaseException.prototype);
NameException.prototype.constructor = NameException;

/**
 * Constructor de la excepcion que controla la
 * falta del parámetro apellido1.
 * @constructor
 */
function SurnameException() {
  this.name = "SurnameException";
  this.message = "The surname parameter is require";
}
SurnameException.prototype = Object.create(BaseException.prototype);
SurnameException.prototype.constructor = SurnameException;

/**
 * Constructor de la excepcion que controla la
 * falta del parámetro fecha de nacimiento.
 * @constructor
 */
function DateException() {
  this.name = "DateException";
  this.message = "The date parameter is require";
}
DateException.prototype = Object.create(BaseException.prototype);
DateException.prototype.constructor = DateException;

/**
 * Construtor de la excepcion que controla
 * que el objeto no es un objeto persona.
 * @constructor
 */
function NaPException() {
  this.name = "NaPException";
  this.message = "The element is not a Person";
}
NaPException.prototype = Object.create(BaseException.prototype);
NaPException.prototype.constructor = NaPException;

/**
 * Construtor de la excepcion que controla
 * que el objeto no es un numero.
 * @constructor
 */
function NaNException() {
  this.name = "NaPException";
  this.message = "The element is not a Number";
}
NaNException.prototype = Object.create(BaseException.prototype);
NaNException.prototype.constructor = NaNException;

/**
 * Construtor de la excepcion que controla
 * que la lista está llena.
 * @constructor
 */
function FullException() {
  this.name = "FullException";
  this.message = "The list is full";
}
FullException.prototype = Object.create(BaseException.prototype);
FullException.prototype.constructor = FullException;

/**
 * Construtor de la excepcion que controla
 * que la lista está vacía.
 * @constructor
 */
function EmptyException() {
  this.name = "EmptyException";
  this.message = "The list is empty";
}
EmptyException.prototype = Object.create(BaseException.prototype);
EmptyException.prototype.constructor = EmptyException;

/**
 * Construtor de la excepcion que controla
 * que el desbordamiento de la lista
 * @constructor
 */
function OverflowException() {
  this.name = "OverflowException";
  this.message = "The index is higher than size";
}
OverflowException.prototype = Object.create(BaseException.prototype);
OverflowException.prototype.constructor = OverflowException;

/*--------OBJETO PERSONA--------*/
/**
 * Constructor del objeto persona
 * @param name
 * @param surname
 * @param secondSurname
 * @constructor
 */
function Person(name, surname, secondSurname, dni, date) {
  if (name == "") throw new NameException();
  if (surname == "") throw new SurnameException();
  if (date == "") throw new DateException();

  this.name = name;
  this.surname = surname;
  this.secondSname = secondSurname || "";
  this.dni = dni || "";
  this.birthDay = date;
}
Person.prototype = {};
Person.prototype.constructor = Person;
Person.prototype.toString = function(){
  return "Name: " + this.name + "; surname: " + this.surname + "; second surname: " + this.secondSname + "; dni: " + this.dni + "; fecha de nacimiento: " + this.birthDay;
}

/*--------OBJETO LISTA----------*/
/**
 * Constructor del objeto Lista
 * La lista está ordenada por la fecha de nacimiento
 * @constructor
 */
function OrderedList() {
  /**
   * Variable constante que contiene la longitud máxima de elementos permitidos en la lista.
   * No es accesible desde fuera
   * @type {number}
   */
  var MAX_LENGTH = 5;

  /**
   * Variable que contiene los valores de la lista.
   * No es accesible desde fuera
   * @type {Array}
   */
  var values = [];

  /**
   * Método que nos dice si la lista está vacia.
   * @returns {boolean}
   */
  this.isEmpty = function () {
    return (values.length === 0)? true : false;
  }

  /**
   * Método que nos dice si la lista está llena.
   * @returns {boolean}
   */
  this.isFull = function () {
    return (values.length === MAX_LENGTH)? true : false
  }

  /**
   * Método que nos dice la cantidad de elementos que contiene la lista actualmente.
   * @returns {number}
   */
  this.size = function () {
    return values.length;
  }

  /**
   * Método que añade un elemento al final de la lista.
   * Devuelve el numero de elementos actuales.
   * @param person
   * @returns {number}
   */
  this.add = function (person) {
    if (!(person instanceof Person)) throw new NaPException();
    if (this.isFull(values)) throw new FullException();

    values.push(person);
    values.sort(function (a, b) {
      var x, y, fecha1, fecha2;

      fecha1 = a.birthDay.split("/");
      fecha2 = b.birthDay.split("/");

      x = new Date(fecha1[2], fecha1[1], fecha1[0])
      y = new Date(fecha2[2], fecha2[1], fecha2[0])
      return (x > y) ? 1 : -1;
    });

    return values.length;
  }

  /**
   * Método que obtiene el valor del elemento que se encuentra en la posición indicada.
   * @param index
   * @returns elemento
   */
  this.get = function (index) {
    if (isNaN(index)) throw new NaNException();
    if (index >= this.size()) throw new OverflowException();

    return values[index];
  }

  /**
   * Método que devuelve los valores de la lista en una cadena de texto
   * @returns {string}
   */
  this.toString = function () {
    if (this.isEmpty()) throw new EmptyException();

    return values.toString();
  }

  /**
   * Método que obtiene la primera posicion en la que se encuentra un determinado elemento empezando por el principio.
   * Si el elemento no se encuentra devuelve -1.
   * @param person
   * @returns {number}
   */
  this.indexOf = function (name) {
    //Buscamos el indice del objeto cuyo nombre coincida con el nombre pasado por parámetro.
    return values.findIndex(function (item) {
      return item.name == name;
    });
  }

  /**
   * Devuelve la capacidad máxima de la lista.
   * @returns {number}
   */
  this.capacity = function () {
    return MAX_LENGTH;
  }

  /**
   * Función que vacia la lista al completo.
   */
  this.clear = function () {
    if (this.isEmpty()) throw new EmptyException();

    values.splice(0, values.length);
  }

  /**
   * Función que obtiene el primer elemento de la lista.
   * @returns elemento
   */
  this.firstElement = function () {
    if (this.isEmpty()) throw new EmptyException();

    return values[0];
  }

  /**
   * Función que obtiene el último elemento de la lista.
   * @returns elemento
   */
  this.lastElement = function () {
    if (this.isEmpty()) throw new EmptyException();

    return values[this.size()-1];
  }

  /**
   * Función que borra el elemento que se encuentra en la posición indicada.
   * Devuelve el elemento que ha borrado.
   * @param index
   * @returns elemento
   */
  this.remove = function (index) {
    if (isNaN(index)) throw new NaNException();
    if (index > this.size()) throw new OverflowException();

    var person = values[index]; //guardamos el valor del objeto que vamos a eliminar
    values.splice(index, 1);

    return person;
  }

  /**
   * Función que borra el elemento indicado.
   * Devuelve true o false dependiendo si lo ha borrado o no.
   * @param person
   * @returns {boolean}
   */
  this.removeElement = function (name) {
    var index;

    index = this.indexOf(name); //Buscamos el índice del objeto a eliminar

    if (index !== -1){
      values.splice(index, 1);
      return true;
    }
    else {
      return false;
    }
  }
}
OrderedList.prototype = {};
OrderedList.prototype.constructor = OrderedList;

/**
 * Función para comprobar el funcionamiento de los métodos del objeto lista
 */
(function () {
  var lista = new OrderedList();
  var person1, person2, person3, person4, person5;

  try{
    person1 = new Person("Pedro", "Garcia", "Aguado", "11111111a", "30/12/1999");
    person2 = new Person("Maria", "Perez", "Lopez", "11111111b", "03/10/1995");
    person3 = new Person("Antonio", "Garcia", "Lorca", "11111111c", "23/02/1990");
    person4 = new Person("Inma", "Collado", "Parra", "11111111d", "02/01/1992");
    person5 = new Person("Tomas", "Abadillo", "Luna", "11111111e", "01/01/1999");
    console.log("Created object lista");
    console.log("Capacity: " + lista.capacity());
    console.log("lista.isEmpty: " + lista.isEmpty());
    console.log("Created objects person");
    console.log("person1: " + person1.toString());
    console.log("person2: " + person2.toString());
    console.log("person3: " + person3.toString());
    console.log("person4: " + person4.toString());
    console.log("person5: " + person5.toString());

    //Añadiendo elementos
    console.log("Add persons: 1, 2, 3, 4 and 5");
    console.log(lista.add(person1));
    console.log(lista.add(person2));
    console.log(lista.add(person3));
    console.log(lista.add(person4));
    console.log(lista.add(person5));
    console.log(lista.toString());
    console.log("Is full?: " + lista.isFull());

    //muestro la lista
    console.log("List: " + lista.toString());

    //metodo get
    console.log("Get index 3: " + lista.get(3));

    //metodo indexOf y lastIndexOf
    console.log("IndexOf (Inma): " + lista.indexOf("Emma"));

    //metodo first y lastElement
    console.log("FirstElement: " + lista.firstElement());
    console.log("LastElement: " + lista.lastElement());

    //metodos remove
    console.log("Remove (index 1): " + lista.remove(1));
    console.log(lista.toString());
    console.log("Remove (Kate): " + lista.removeElement("Kates"));
    console.log(lista.toString());

    //metodo clear
    console.log("Clear: ");
    lista.clear();
    console.log(lista.toString());
  }
  catch (err){
    console.log(err.toString());
  }
})();

import { Book } from "./book.js";

/**
 * Clase que gestiona la colección de libros.
 * Mantiene el estado de la lista y controla los punteros de lectura.
 * @class
 */
export class BookList {
  constructor() {
    /**
     * Array que contiene todos los objetos Book en la lista.
     * @type {Array<Book>}
     */
    this.books = [];

    /**
     * Referencia al libro que se está leyendo actualmente.
     * @type {Book|null}
     */
    this.currentBook = null;

    /**
     * Referencia al siguiente libro no leído.
     * @type {Book|null}
     */
    this.nextBook = null;

    /**
     * Referencia al último libro que se terminó de leer.
     * @type {Book|null}
     */
    this.lastBook = null;

    /**
     * Contador de libros marcados como leídos.
     * @type {number}
     */
    this.readCount = 0;

    /**
     * Contador de libros aún no leídos.
     * @type {number}
     */
    this.notReadCount = 0;
  }

  /**
   * Añade un libro a la lista.
   * Incrementa el contador de libros no leídos y actualiza los punteros
   * de libro actual y siguiente si es necesario.
   * @memberof BookList
   * @param {Book} book - El objeto libro a añadir.
   */
  add(book) {
    this.books.push(book);
    this.notReadCount++;

    // Si es el primer libro añadido, establecerlo como actual si no existe ninguno
    if (!this.currentBook) {
      this.currentBook = book;
    } else if (!this.nextBook) {
      // Si tenemos un libro actual pero no siguiente, este se convierte en el siguiente
      this.nextBook = book;
    }
  }

  /**
   * Marca el libro actual como leído.
   * Establece la fecha de lectura, actualiza los contadores, mueve el libro actual
   * a último libro leído, y busca el siguiente libro no leído para establecerlo como actual.
   * @memberof BookList
   */
  finishCurrentBook() {
    if (this.currentBook) {
      this.currentBook.read = true;
      this.currentBook.readDate = new Date(Date.now());
      this.lastBook = this.currentBook;
      this.readCount++;
      this.notReadCount--;

      this.currentBook = this.nextBook;

      // Encuentro el primer libro no leído que no sea el nuevo libro actual
      this.nextBook =
        this.books.find((book) => !book.read && book !== this.currentBook) ||
        null;
    }
  }
}
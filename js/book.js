/**
 * Crea una instancia de un libro.
 * @class
 */
export class Book {
    /**
     * @constructor
     * @param {string} title - El título del libro.
     * @param {string} genre - El género del libro.
     * @param {string} author - El autor del libro.
     */
    constructor(title, genre, author) {
        /** @type {string} */
        this.title = title;
        /** @type {string} */
        this.genre = genre;
        /** @type {string} */
        this.author = author;
        /** @type {boolean} */
        this.read = false;
        /** @type {Date|null} */
        this.readDate = null;
    }
}
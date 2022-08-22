const mongoose = require('mongoose')
const faker = require('community-faker');
const Book = require('../models/Book.model')
const Author = require('../models/Author.model')

// Conectarme a la base de datos

require('../config/db.config')

// Vaciarla

mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
    .then(() => {
      // for(let i = 0; i < 10; i++) {

      // }
      console.log('🏄🏼 Creating authors...')

      const authorPromises = []

      new Array(10).fill().forEach((_, i) => {
        const authorData = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          birthDate: '1994',
          biography: faker.lorem.paragraph(),
          country: faker.address.country()
        }

        authorPromises.push(Author.create(authorData))
      })

      return Promise.all(authorPromises)
    })
    .then((createdAuthors) => {
      

      const bookPromises = []
      console.log('📗 📖 Creating books...')

      createdAuthors.forEach(author => { // Itero por lo autores para crear 10 libros por cada autor
        console.log(`${author.firstName} ${author.lastName} was created`)

        new Array(10).fill().forEach(() => {
          const bookData = {
            title: faker.lorem.text(),
            author: author._id,
            description: faker.lorem.paragraph(),
            genre: 'Drama',
            year: 1900,
            image: faker.image.imageUrl()
          }

          bookPromises.push(Book.create(bookData))
        })
      })

      return Promise.all(bookPromises)
      
    })
    .then(createdBooks => {
      createdBooks.forEach(book => console.log(`${book.title} was created`))
      // Cerrar la conexion
      return mongoose.connection.close()
    })
    .then(() => {
      console.log('Connection closed')
      process.exit(1)
    })
    .catch(err => {
      console.error(err)
      process.exit(0)
    })
})
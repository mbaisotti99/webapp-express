// const { default: slugify } = require("slugify")
const connection = require("../data/movies-db")

// const search = (req, resp, next) => {
//     const sql = `
//         SELECT * 
//         FROM movies
//         WHERE title LIKE ?"
//     `
//     const {search} = req.query
//     const searchTerm = `%${search}%`;
//     connection.query(sql, [searchTerm], (err, result) =>{
//         if (err) {
//             return next(new Error(err.message))
//         } else{
//             resp.status(200).json({
//                 message: "Ricerca Effettuata",
//                 data: result
//             })
//         }
//     })
// }



// ROTTA PRINCIPALE RICHIEDE TUTTI I LIBRI 

const index = (req, resp) => {
    const sql = "SELECT * FROM `movies`"
    connection.query(sql, (err, movies) => {
        if (err) {
            return (
                next(new Error("Errore interno del server"))
            )

        } else {
            return (
                resp.status(200).json({
                    message: "Dati Trovati",
                    data: movies
                })
            )
        }
    })
}


// RICHIEDI UN LIBRO SPECIFICO TRAMITE ID

const show = (req, resp, next) => {
    const sql = `
        SELECT *
        FROM movies
        WHERE id = ?
    `
    const id = req.params.id
    connection.query(sql, [id], (err, movie) => {
        if (err) {
            return (
                next(new Error("Errore interno del server"))
            )
        } else if (movie.length === 0) {
            resp.status(404).json({
                message: "Film non trovato"
            })
        } else if (isNaN(id)) {
            resp.status(500).json({
                message: "Id non corretto"
            })
        } else {

            const slqComp = `
                SELECT * FROM reviews
                JOIN movies
                ON movies.id = reviews.movie_id
                WHERE movies.id = ?
            `

            connection.query(slqComp, [id], (err, reviews) => {
                if (err) {
                    return (
                        next(new Error("Errore interno del server"))
                    )
                } else {
                    resp.status(200).json({
                        message: "OK",
                        data: {
                            ...movie[0],
                            reviews
                        },
                    })
                }
            })
        }
    })
}



// AGGIUNGI RECENSIONE

const addReview = (req, resp, next) => {

    const id = req.params.id
    const { name, vote, text } = req.body
    const sql = `
        INSERT INTO reviews (movie_id, name, vote, text, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW());
    `

    connection.query(sql, [id, name, vote, text], (err, result) => {
        if (err) {
            return next(new Error("Errore interno del server"))
        } else {
            resp.status(200).json({
                message: "Recensione Inserita"
            })
        }
    })
}



// AGGIUNGI NUOVO FILM 

const storeMovie = (req, resp, next) => {


    const imgName = req.file.filename
    const { title, director, genre, abstract } = req.body
    // const slug = slugify(title, {
    //     lower: true,
    //     strict: true
    // })

    // let id = Math.floor(Math.random()* 99 + 1)

    const sql = `
        INSERT INTO movies (title, director, genre, abstract, images)
        VALUES (?, ?, ?, ?, ?)
    `

    connection.query(sql, [id, title, director, genre, abstract, imgName], (err, result) => {
    if (err) {
        return next(new Error(err.message))
    } else {
        return (
            resp.status(201).json({
                message: "Libro caricato"
            })
        )
    }
})

}


// ROTTA NOT FOUND 



const notFound = (req, resp) => {
    resp.status(404).json({
        message: "Route not found"
    })
}

module.exports = { index, show, notFound, addReview, storeMovie }


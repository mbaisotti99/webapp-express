const connection = require("../data/movies-db")

const index = (req, resp) => {
    const sql = "SELECT * FROM `movies`"
    connection.query(sql, (err, movies) => {
        if (err) {
            return (
                    next(new Error("Errore interno del server"))
                    // resp.status(500).json({
                    //     message: "Errore Server"
                    // })
                
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
                // resp.status(500).json({
                //     message: "Errore Server"
                // })
            )
        } else if (movie.length === 0){
            resp.status(404).json({
                message: "Film non trovato"
            })
        } else {

            const slqComp = `SELECT reviews.name as reviewer, reviews.vote, reviews.text
                            FROM movies 
                            JOIN movie_reviews
                            ON movie_reviews.movie_id = movies.id
                            JOIN reviews 
                            ON movie_reviews.review_id = reviews.id
                            WHERE movies.id = ?
                            `
            connection.query(slqComp, [id], (err, reviews) => {
                if (err) {
                    return (
                        next(new Error("Errore interno del server"))
                        // resp.status(500).json({
                        //     message: "Errore Server"
                        // })
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

const addReview = (req, resp, next) =>{

    const id = req.params.id 
    const {user, vote, text} = req.body
    const sql = `
        INSERT INTO reviews (movie_id, name, vote, text, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW());
    `

    connection.query(sql, [id, user, vote, text], (err, result) =>{
        if (err) {
            return next(new Error("Errore interno del server"))
        } else {
            resp.status(200).json({
                message: "Recensione Inserita"
            })
        }
    })
}

const notFound = (req, resp) =>{
    resp.status(404).json({
        message: "Route not found"
    })
}

module.exports = {index, show, notFound, addReview}


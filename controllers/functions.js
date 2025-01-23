const connection = require("../data/movies-db")

const index = (req, resp) => {
    const sql = "SELECT * FROM `movies`"
    connection.query(sql, (err, movies) => {
        if (err) {
            return (
                resp.status(500).json(
                    {
                        message: "Errore interno server",
                        errore: err.stack
                    }
                )
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

const show = (req, resp) => {
    const sql = `
        SELECT *
        FROM movies
        WHERE id = ?
    `
    const id = req.params.id
    connection.query(sql, [id], (err, movie) => {
        if (err) {
            resp.status(500).json({
                message: "Errore interno Server"
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
                        resp.status(500).json({
                            message: "Errore Server"
                        })
                    )
                } else {
                    resp.status(200).json({
                        message: "OK",
                        data: {
                            ...movie[0],
                            reviews
                        }
                    })
                }
            })
        }
    })
}

module.exports = {index, show}


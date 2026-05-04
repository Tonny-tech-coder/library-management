import express from "express";
import cors from "cors";
import { db } from "./config/db.js";

const app = express();
const PORT = 3000;

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({
    limit: "50mb",
    extended: true
}));

/* ---------------- CREATE BOOK ---------------- */

app.post("/api/books", (req, res) => {
    const { name, author, description, image } = req.body;

    if (!name || !author || !description || !image) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const query = `
        INSERT INTO books (name, author, description, image)
        VALUES (?, ?, ?, ?)
    `;

    db.run(
        query,
        [name, author, description, image],
        function (err) {
            if (err) {
                console.log("Insert error:", err);
                return res.status(500).json({
                    message: "Failed to add book"
                });
            }

            return res.status(201).json({
                message: "Book added successfully",
                id: this.lastID
            });
        }
    );
});

/* ---------------- GET ALL BOOKS ---------------- */

app.get("/api/books", (req, res) => {
    const query = `SELECT * FROM books`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.log("Fetch error:", err);
            return res.status(500).json({
                message: "Failed to fetch books"
            });
        }

        return res.status(200).json(rows);
    });
});

/* ---------------- GET SINGLE BOOK ---------------- */

app.get("/api/books/:id", (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM books WHERE id = ?`;

    db.get(query, [id], (err, row) => {
        if (err) {
            console.log("Fetch single error:", err);
            return res.status(500).json({
                message: "Failed to fetch book"
            });
        }

        if (!row) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        return res.status(200).json(row);
    });
});

/* ---------------- UPDATE BOOK ---------------- */

app.put("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const { name, author, description, image } = req.body;

    if (!name || !author || !description || !image) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const query = `
        UPDATE books
        SET name = ?, author = ?, description = ?, image = ?
        WHERE id = ?
    `;

    db.run(
        query,
        [name, author, description, image, id],
        function (err) {
            if (err) {
                console.log("Update error:", err);
                return res.status(500).json({
                    message: "Failed to update book"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            return res.status(200).json({
                message: "Book updated successfully"
            });
        }
    );
});

/* ---------------- DELETE BOOK ---------------- */

app.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM books WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            console.log("Delete error:", err);
            return res.status(500).json({
                message: "Failed to delete book"
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        return res.status(200).json({
            message: "Book deleted successfully"
        });
    });
});

/*------search------*/

app.get("/api/search/:searchValue", (req, res) => {
    const { searchValue } = req.params;

    console.log(searchValue);

    const searchQuery = `SELECT * FROM books WHERE name LIKE ?`; 

    db.all(searchQuery, [`${searchValue}%`], (err, rows) => {

      if(err){
        return res
        .status(400)
        .json({message: "something went wrong", error: err });

      }
      console.log(rows);
      
      return res.status(200).json({message: "search successful", data: rows});
    });
});


/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});
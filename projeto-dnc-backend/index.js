const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express();

app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const livros = [
    {
        "id": 1,
        "titulo": "titulo1",
        "npag": "300",
        "isbn": 700,
        "editora": "pandora"
    },
    {
        "id": 2,
        "titulo": "titulo2",
        "npag": "300",
        "isbn": 150,
        "editora": "pandora"
    },
    {
        "id": 3,
        "titulo": "titulo3",
        "npag": "300",
        "isbn": 100,
        "editora": "pandora"
    }
]


app.get('/livros', (req, res) => {
    return res.status(200).json(livros)
})

app.get('/livros/:id', (req, res) => {
    let id = req.params.id
    let index = findBookIndex(id)
    return res.status(200).json(livros[index])
})



app.post('/livros', (req, res) => {
    const livro = req.body
    if (Object.keys(livro).length > 0) {
        livros.push(livro)
        res.status(201).json({ message: "Livro cadastrado com sucesso" })
    } else {
        res.status(400).json({ message: "Não foi possível cadastrar o livro" })
    }
})

app.put('/livros/:id', (req, res) => {
    let id = req.params.id;
    let index = findBookIndex(id);
    livros[index] = req.body;
    res.status(201).send(`Livro de id: ${id} atualizado com sucesso`)
})

findBookIndex = (id) => {
    const indice = livros.findIndex((item) => item.id == id);
    return indice
}

app.delete('/livros/:id', (req, res) => {
    let id = req.params.id;
    let index = findBookIndex(id);
    livros.splice(index, 1);
    res.status(200).send(`Livro de id: ${id} deletado com sucesso`)
})

app.listen(8080, () => {
    console.log('server running on port 8080')
})
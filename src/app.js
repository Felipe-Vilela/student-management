import express from "express";

const app = express();
app.use(express.json());

const alunos = [
    {
        id: 1,
        nome: "Caua Olivio",
        ra: "SC001",
        nota1: 9.0,
        nota2: 10.0

    },
    {
        id: 2,
        nome: "Felipe Vilela",
        ra: "SC002",
        nota1: 9.5,
        nota2: 9.0

    },
    {
        id: 3,
        nome: "Asdrubal Zoroastro",
        ra: "SC003",
        nota1: 10.0,
        nota2: 10.0

    }
]

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});


app.get("/alunos", (req, res) => {
    res.status(200).json(alunos);
});

app.post("/alunos", (req, res) => {
    alunos.push(req.body);
    res.status(201).send("Aluno criado com sucesso!")
});

export default app;
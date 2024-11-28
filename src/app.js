import express from "express";

const app = express();
app.use(express.json());


function findOneStudent(id){
    return alunos.findIndex(alunos => {
        return alunos.id === Number(id);
    });
}




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

app.get("/alunos/:id", (req, res) =>{
    const index = findOneStudent(req.params.id);

    if(index === -1){
        return res.status(404).json({messege: "Aluno não encontrado"});
    }

    res.status(200).json(alunos[index])
})

app.put("/alunos/:id", (req, res) => {
    const index = findOneStudent(req.params.id);
    
    if(index === -1){
        return res.status(404).json({messege: "Aluno não encontrado"});
    }

    alunos[index].nome = req.body.nome;
    alunos[index].ra = req.body.ra;
    alunos[index].nota1 = req.body.nota1;
    alunos[index].nota2 = req.body.nota2;

    res.status(200).json(alunos[index]);
});

export default app;
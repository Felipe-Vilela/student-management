import express from "express";

const app = express();
app.use(express.json());


function findOneStudent(id){
    return alunos.findIndex(alunos => {
        return alunos.id === Number(id);
    });
}

function medias(alunos){
    const media_alunos = [];

    alunos.forEach(aluno  => {
        const media = (aluno.nota1 + aluno.nota2) / 2
        media_alunos.push({
            nome: aluno.nome,
            media: media
        });
    });

    return media_alunos
}

function aprovados(alunos) {

    const alunosAprovados = alunos.map(aluno => {
        const media = (aluno.nota1 + aluno.nota2) / 2;  
        const status = media >= 6 ? "aprovado" : "reprovado";  
        return {
            nome: aluno.nome,
            status: status
        };
    });
    
    return alunosAprovados;
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

app.get("/alunos/aprovados", (req, res) => {
    const tam = alunos.length;

    if (tam === 0) {
        return res.status(404).json({ message: "Sem registros de alunos!" });
    }

    const alunosAprovados = aprovados(alunos);

    

    res.status(200).json(alunosAprovados);
});

app.get("/alunos/medias", (req, res) =>{

    const tam = alunos.length;

    if (tam === 0) {
        return res.status(404).json({messege: "Sem registros de alunos!"});
    } 

    const mediasAlunos = medias(alunos);

    return res.status(200).json(mediasAlunos)
})


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



app.delete("/alunos/:id", (req, res) => {
    const index = findOneStudent(req.params.id);
    
    if(index === -1){
        return res.status(404).json({messege: "Aluno não encontrado"});
    }
    
    alunos.splice(index, 1)

    res.status(200).json({messege: "Aluno removido"});
});



export default app;
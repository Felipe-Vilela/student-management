import express, { json } from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use( express.json() );

const users = [];

app.post('/register', async(req, res) => {
    const {username, password} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    users.push({username, password: hashedPassword});
    console.log(users)

    res.status(201).json({messege: 'User registred'});
})

app.post('/login', async(req, res) =>{
    const {username, password} = req.body;

    const user = users.find(user => user.username === username);

    if(!user ){
        res.status(401).json({messege: 'Login incorreto!'});
    }

    const token = jwt.sign(
        {username: user.username},
        process.env.JWT_SECRET,
        { expiresIn: '1h' , algorithm: 'HS256'}
    );

    res.json(token);
    console.log("Login efetuado pelo usuário" + username);

})


const authenticateJWT = (req, res, next) => {

    const authHeader = req.header('Authorization');
    console.log('Authorization: ' + authHeader);

    let token;
    
    if (authHeader) {
        const parts = authHeader.split(' ');
        if (parts.length === 2) {
            token = parts[1];
        }
    }
    
    if (!token) {
        return res.status(401).send('Acesso negado. Token não fornecido.');
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) {

            if (err.name === 'TokenExpiredError') {
                return res.status(401).send('Acesso negado. Token expirado.');

            } else if (err.name === 'JsonWebTokenError') {
                return res.status(403).send('Acesso negado. Token inválido.');

            } else {
                return res.status(403).send('Acesso negado. Erro na verificação do token.');
            }
        }

        req.user = user;

        const issuedAtISO = new Date(user.iat * 1000).toISOString();
        const expiresAtISO = new Date(user.exp * 1000).toISOString();

        console.log(`Token validado para usuário: ${user.username}
            Emitido em: ${issuedAtISO}
            Expira em: ${expiresAtISO}
        `);

        next();
    });
}


app.use(authenticateJWT)


app.get('/protected1', (req,res) => {
    res.json({messege: 'Rota protegida 1'});
});

app.get('/protected2', (req,res) => {
    res.send('Rota protegida 2');
});

app.get('/protected3', (req,res) => {
    res.send('Rota protegida 3');
});



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
    res.status(201).json({ message: "Aluno criado com sucesso"})
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
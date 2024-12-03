import express from "express";
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





app.listen( 3000,

    () => {
        console.log("Servidor ativo e aguardando requisições...");
    }

);
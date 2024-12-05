# 📚 Sistema de Gerenciamento de Alunos e Autenticação

Este projeto é um sistema de gerenciamento de alunos e autenticação JWT. Ele oferece funcionalidades como registro, login de usuários e manipulação de informações de alunos. O sistema foi desenvolvido utilizando **Node.js** com **Express**, implementando segurança com **JWT** e criptografia de senhas usando **bcrypt.js**.

## Funcionalidades

- **Autenticação e Autorização**:
  - Registro de usuários com criptografia de senhas.
  - Login de usuários com geração de token JWT.
  - Middleware para proteger rotas sensíveis.

- **Gerenciamento de Alunos**:
  - Listagem de alunos.
  - Criação de novos registros de alunos.
  - Atualização e exclusão de alunos.
  - Consulta de média de notas e status de aprovação.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework para construção de APIs.
- **JWT (jsonwebtoken)**: Para autenticação segura baseada em tokens.
- **bcrypt.js**: Para hash de senhas.
- **dotenv**: Para gerenciamento de variáveis de ambiente.

## Como Executar o Projeto

1. **Clone o repositório**:
 ```bash
 git clone https://github.com/seu-usuario/sistema-gerenciamento-alunos.git
 ```

3. Instale as dependências
```bash
npm install
```

3. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

O servidor iniciará na porta 3000 (padrão) ou na porta especificada nas variáveis de ambiente.

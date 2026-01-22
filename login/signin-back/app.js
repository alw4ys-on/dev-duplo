require('dotenv').config();
const express = require('express');
const path = require('path');
const { query } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'signin-front')));

// rota de cadastro
app.post('/api/signup', async (req, res) => {
    try {
        const { email, nickname, password } = req.body;
        
        // validações básicas
        if (!email || !nickname || !password) {
            return res.status(400).json({ 
                message: 'Preencha todos os campos' 
            });
        }
        
        // checa se o user já existe
        const checkUser = await query(
            'SELECT id FROM users WHERE email = ? OR nickname = ?',
            [email, nickname]
        );
        
        if (checkUser.length > 0) {
            return res.status(409).json({ 
                message: 'Email ou nickname já cadastrado' 
            });
        }
        
        // TODO: adicionar hash de senha aqui (bcrypt)
        // por enquanto tá salvando senha em texto puro (NÃO FAZER EM PRODUÇÃO!)
        await query(
            'INSERT INTO users (email, nickname, password) VALUES (?, ?, ?)',
            [email, nickname, password]
        );
        
        res.status(201).json({ 
            message: 'Usuário criado com sucesso' 
        });
        
    } catch (error) {
        console.error('Erro no signup:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor' 
        });
    }
});

// rota de login
app.post('/api/login', async (req, res) => {
    try {
        const { nickname, password } = req.body;
        
        if (!nickname || !password) {
            return res.status(400).json({ 
                message: 'Preencha todos os campos' 
            });
        }
        
        // busca o usuário
        const users = await query(
            'SELECT id, email, nickname, password FROM users WHERE nickname = ?',
            [nickname]
        );
        
        if (users.length === 0) {
            return res.status(401).json({ 
                message: 'Credenciais inválidas' 
            });
        }
        
        const user = users[0];
        
        // TODO: comparar hash de senha aqui (bcrypt.compare)
        // por enquanto compara direto (NÃO FAZER EM PRODUÇÃO!)
        if (user.password !== password) {
            return res.status(401).json({ 
                message: 'Credenciais inválidas' 
            });
        }
        
        // não retorna a senha pro frontend
        const { password: _, ...userWithoutPassword } = user;
        
        res.json({ 
            message: 'Login realizado com sucesso',
            user: userWithoutPassword
        });
        
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor' 
        });
    }
});

// rota padrão - serve o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signin-front', 'home.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
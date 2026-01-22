// helper pra mostrar mensagens pro usuário
function showMessage(text, type = 'error') {
    const messageDiv = document.getElementById('message');
    if (!messageDiv) return;
    
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.remove('hidden');
    
    // remove a msg depois de 4s
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 4000);
}

// validação de email simples
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// cadastro
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const nickname = document.getElementById('nickname').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // validações básicas
        if (!isValidEmail(email)) {
            showMessage('Email inválido', 'error');
            return;
        }
        
        if (nickname.length < 3) {
            showMessage('Nome de usuário muito curto', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage('Senha deve ter no mínimo 6 caracteres', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage('As senhas não coincidem', 'error');
            return;
        }
        
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, nickname, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showMessage('Conta criado', 'success');
                // redireciona pro login depois de 1.5s
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                showMessage(data.message || 'Erro ao criar conta', 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            showMessage('Erro ao conectar com o servidor', 'error');
        }
    });
}

// login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nickname = document.getElementById('nickname').value.trim();
        const password = document.getElementById('password').value;
        
        if (!nickname || !password) {
            showMessage('Preencha todos os campos', 'error');
            return;
        }
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nickname, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // salva info do user (sem a senha obviamente)
                localStorage.setItem('user', JSON.stringify({
                    nickname: data.user.nickname,
                    email: data.user.email
                }));
                
                showMessage('Login realizado', 'success');
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            } else {
                showMessage(data.message || 'Credenciais inválidas', 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            showMessage('Erro ao conectar com o servidor', 'error');
        }
    });
}
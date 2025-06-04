
   function showLogin() {
  document.getElementById('form-container').innerHTML = `
    <h2>Login</h2>
    <form onsubmit="handleLogin(event)">
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
  `;
}

function showRegister() {
  document.getElementById('form-container').innerHTML = `
    <h2>Cadastro</h2>
    <form onsubmit="handleRegister(event)">
      <input type="text" placeholder="Nome Completo" required />
      <input type="email" placeholder="Email" required />
      <input type="tel" placeholder="Telefone" required />
      <input type="text" placeholder="CPF" required />
      <input type="number" placeholder="Idade" required />
      <input type="password" placeholder="Senha" required />
      <button type="submit">Cadastrar</button>
    </form>
  `;
}

function handleLogin(event) {
  event.preventDefault();
  alert("Login realizado com sucesso!");
}

function handleRegister(event) {
  event.preventDefault();
  alert("Cadastro realizado com sucesso!");
}

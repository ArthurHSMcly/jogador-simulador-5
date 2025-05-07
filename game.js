// Variáveis do jogo
let skill = 0;
let money = 0;
let clicks = 0;
let autoIncome = 0;
let multiplier = 1;

// Elementos do DOM
const skillElement = document.getElementById('skill');
const moneyElement = document.getElementById('money');
const clicksElement = document.getElementById('clicks');
const clickArea = document.getElementById('click-area');
const progressBar = document.getElementById('progress');
const storyElement = document.getElementById('story');
const upgradesContainer = document.getElementById('upgrades');

// Upgrades disponíveis
const upgrades = [
    // Treinos Básicos
    { 
        name: "Chutar garrafas pet", 
        description: "Melhora sua pontaria com objetos pequenos", 
        cost: 50, 
        owned: 0,
        effect: "+0.2 por clique",
        apply: () => { /* Efeito já aplicado no click */ }
    },
    { 
        name: "Bola de meia", 
        description: "Uma bola improvisada para treinar", 
        cost: 200, 
        owned: 0,
        effect: "+0.5 por clique",
        apply: () => { /* Efeito já aplicado no click */ }
    },
    { 
        name: "Chinelos como traves", 
        description: "Marcação improvisada para treinar precisão", 
        cost: 500, 
        owned: 0,
        effect: "+1.0 por clique",
        apply: () => { /* Efeito já aplicado no click */ }
    },
    
    // Oportunidades
    { 
        name: "Jogar pelada no campinho", 
        description: "Ganhe experiência jogando com outros", 
        cost: 1000, 
        owned: 0,
        effect: "+5 habilidade/s",
        apply: function() { autoIncome += 5; }
    },
    { 
        name: "Ser chamado para time de bairro", 
        description: "Seu primeiro time organizado", 
        cost: 5000, 
        owned: 0,
        effect: "+25 habilidade/s",
        apply: function() { autoIncome += 25; }
    },
    { 
        name: "Descoberto por olheiro", 
        description: "Profissionais estão notando seu talento", 
        cost: 20000, 
        owned: 0,
        effect: "+100 habilidade/s",
        apply: function() { autoIncome += 100; }
    },
    
    // Profissional
    { 
        name: "Contrato com time pequeno", 
        description: "Seu primeiro contrato profissional", 
        cost: 100000, 
        owned: 0,
        effect: "+500 habilidade/s",
        apply: function() { autoIncome += 500; }
    },
    { 
        name: "Treinador pessoal", 
        description: "Um profissional para te ajudar a evoluir", 
        cost: 500000, 
        owned: 0,
        effect: "+2.500 habilidade/s",
        apply: function() { autoIncome += 2500; }
    },
    { 
        name: "Transferência para time médio", 
        description: "Um time com mais visibilidade", 
        cost: 2000000, 
        owned: 0,
        effect: "+10.000 habilidade/s",
        apply: function() { autoIncome += 10000; }
    },
    
    // Estrelato
    { 
        name: "Jogar em time grande", 
        description: "Você chegou ao topo do futebol nacional", 
        cost: 10000000, 
        owned: 0,
        effect: "+50.000 habilidade/s",
        apply: function() { autoIncome += 50000; }
    },
    { 
        name: "Publicidade", 
        description: "Seu rosto em todos os lugares", 
        cost: 50000000, 
        owned: 0,
        effect: "+250.000 habilidade/s",
        apply: function() { autoIncome += 250000; }
    },
    { 
        name: "Seleção Nacional", 
        description: "Representar seu país no maior palco", 
        cost: 200000000, 
        owned: 0,
        effect: "+1.000.000 habilidade/s",
        apply: function() { autoIncome += 1000000; }
    }
];

// Inicializar o jogo
function initGame() {
    initUpgrades();
    setupEventListeners();
    gameLoop();
}

// Inicializar upgrades na interface
function initUpgrades() {
    upgradesContainer.innerHTML = '';
    upgrades.forEach((upgrade, index) => {
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'upgrade';
        upgradeElement.innerHTML = `
            <h3>${upgrade.name}</h3>
            <p>${upgrade.description}</p>
            <p><strong>Efeito:</strong> ${upgrade.effect}</p>
            <p><strong>Custo:</strong> R$ ${upgrade.cost.toLocaleString()}</p>
            <p><strong>Comprados:</strong> ${upgrade.owned}</p>
            <button id="upgrade-${index}">Comprar</button>
        `;
        upgradesContainer.appendChild(upgradeElement);
        
        document.getElementById(`upgrade-${index}`).addEventListener('click', () => buyUpgrade(index));
    });
}

// Configurar listeners de eventos
function setupEventListeners() {
    // Clique principal
    clickArea.addEventListener('click', () => addSkill(0.1 * multiplier));
    
    // Botões de múltiplos cliques
    document.getElementById('click-5').addEventListener('click', () => addSkill(0.5 * multiplier));
    document.getElementById('click-10').addEventListener('click', () => addSkill(1.0 * multiplier));
    document.getElementById('click-100').addEventListener('click', () => addSkill(10.0 * multiplier));
    document.getElementById('click-1000').addEventListener('click', () => addSkill(100.0 * multiplier));
    
    // Bônus temporários
    document.getElementById('bonus-2x').addEventListener('click', () => activateBonus(2, 30));
    document.getElementById('bonus-3x').addEventListener('click', () => activateBonus(3, 60));
    document.getElementById('bonus-10x').addEventListener('click', () => activateBonus(10, 15));
}

// Adicionar habilidade
function addSkill(amount) {
    skill += amount;
    money += amount;
    clicks++;
    updateUI();
}

// Comprar upgrade
function buyUpgrade(index) {
    const upgrade = upgrades[index];
    if (money >= upgrade.cost) {
        money -= upgrade.cost;
        upgrade.owned++;
        upgrade.apply();
        
        // Aumentar custo para próxima compra
        upgrade.cost = Math.floor(upgrade.cost * 1.5);
        
        updateUI();
        initUpgrades();
        updateStory();
    }
}

// Ativar bônus temporário
function activateBonus(mult, duration) {
    const originalMultiplier = multiplier;
    multiplier *= mult;
    
    setTimeout(() => {
        multiplier = originalMultiplier;
    }, duration * 1000);
}

// Atualizar história conforme progresso
function updateStory() {
    if (skill >= 1000000000) {
        storyElement.textContent = "Você se tornou o maior jogador do mundo! De morador de rua a lenda do futebol, sua história inspira milhões.";
    } else if (skill >= 200000000) {
        storyElement.textContent = "Capitão da Seleção! Você lidera seu país rumo à glória nos maiores campeonatos do mundo.";
    } else if (skill >= 50000000) {
        storyElement.textContent = "Estrela global! Seu rosto aparece em comerciais em todo o mundo e você é reconhecido onde quer que vá.";
    } else if (skill >= 10000000) {
        storyElement.textContent = "Jogador de time grande! Você agora joga nos principais campeonatos e está se tornando uma celebridade.";
    } else if (skill >= 2000000) {
        storyElement.textContent = "Profissional consolidado! Você tem um bom contrato e está se destacando no futebol nacional.";
    } else if (skill >= 500000) {
        storyElement.textContent = "Primeiro contrato profissional! Você finalmente está recebendo para jogar futebol.";
    } else if (skill >= 20000) {
        storyElement.textContent = "Olheiros estão te observando! Seu talento está começando a chamar atenção.";
    } else if (skill >= 5000) {
        storyElement.textContent = "Jogador do time de bairro! Você agora tem um grupo fixo para jogar e está melhorando rápido.";
    } else if (skill >= 1000) {
        storyElement.textContent = "Peladas no campinho! Você está ganhando experiência jogando com pessoas mais experientes.";
    } else if (skill >= 500) {
        storyElement.textContent = "Seu treino está evoluindo! Você já consegue fazer jogadas mais complexas.";
    }
}

// Atualizar interface
function updateUI() {
    skillElement.textContent = skill.toFixed(1);
    moneyElement.textContent = money.toFixed(2);
    clicksElement.textContent = clicks;
    
    // Atualizar barra de progresso (meta: 1.000.000.000)
    const progress = Math.min((skill / 1000000000) * 100, 100);
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${progress.toFixed(2)}%`;
    
    // Verificar se atingiu o objetivo
    if (skill >= 1000000000) {
        progressBar.style.backgroundColor = '#27ae60';
    }
}

// Loop principal do jogo
function gameLoop() {
    if (autoIncome > 0) {
        addSkill(autoIncome * multiplier / 10);
    }
    setTimeout(gameLoop, 100);
}

// Iniciar o jogo quando a página carregar
window.onload = initGame;

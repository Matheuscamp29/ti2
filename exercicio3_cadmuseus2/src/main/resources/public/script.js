
/*
resumo do codigo

o aplicativo esta semparado em 5 switch diferentes (os botoes do footer)
o que seria colocado como html esta dentro do js (em cada switch)
o arquivo html so é composto pelo header, footer e a animaçao inicial

Home:
o home é onde tem a funcionalidade de identificar a exposição e o bot para
responder as perguntas
alvo as fotos e perguntas publicadas dos clientes(parecido com intagram),  

pag 2:...........

pag 3:...........


Museus:
os museus cadastrados ficaram nessa pagina, os clientes podem fazer uma busca nos
museus variando por(cidade, rating, localizacao/mais perto, outros...) por enquanto 
so aparece todos os museus listados
no cadastro do museu  o museu pode colocar link para o site original deles, qual o
tipo de museu, localizacao, categoria, preço, outros...

ajustes:
ajustes gerais do aplicativo perfil, outros...




------------------------------------------------------

para visualizar o site clicar com botao direito ir em inspecionar e colcoar
as dimencoes de um celular movel 

*/


document.addEventListener('DOMContentLoaded', function () {
  const expos = document.querySelectorAll('.expo');
  
  
  //animacao de inicio
  expos.forEach((expo, index) => {
    setTimeout(() => {
      expo.classList.add('active');
      anime({
        targets: expo,
        bottom: '20vh',
        easing: 'easeInOutSine',
        duration: 500,
      });

      if (index < expos.length - 1) { // Verifica se não é a última imagem
        setTimeout(() => {
          anime({
            targets: expo,
            left: '100vw',
            easing: 'easeInOutSine',
            duration: 1000,
          });

          if (index === expos.length - 2) { // Verifica se é a penúltima imagem
            // Última imagem saiu
            setTimeout(() => {
              expos.forEach((expo, idx) => {
                if (idx !== expos.length - 1) {
                  expo.classList.remove('active');
                }
              });
            }, 3000); 
          }
        }, 2000);
      }
    }, 2500 * index); // Ajustar o tempo de espera para a próxima imagem
  });
});



/*ter uma busca constante (a cada 3s) para achar algum arduino/chip para 
mandar o sinal para saber em qual eposicao esta*/
 

//nomes manualmente colocado, o certo é pegar no banco de dados
 let nome_exposicao = 'Monalisa';
 let descircao_exposicao = 'Obra de arte mais conhecida do artista Leonardo da Vinci.';

//funçao para mudar a pagina nos botes do footer

function changeContent(page) {



  const mainContent = document.querySelector('.circle-container');
  const footerButtons = document.querySelectorAll('.footer-button');

 
  footerButtons.forEach(button => {
    button.classList.remove('selected');
    button.style.transform = '';
    button.querySelector('.button-label').style.opacity = 0;
  });

  
  const clickedButton = event.target;
  clickedButton.classList.add('selected');
  clickedButton.querySelector('.button-label').style.opacity = 1;

  clickedButton.style.transform = 'translateY(-30px)';
  
  switch (page) {



      //html da pagina casa
    case 'home':
      mainContent.innerHTML = `
      

<div class="circle-container">
  <div class="circle1">
    <div class="content-above-circle">${nome_exposicao}</div>
    <div class="content-under-circle">${descircao_exposicao}</div>
    <div class="linha"></div>
    <div class="linha2"></div>
    <div class="linha3"></div>
    <div class="linha4"></div>
    <div class="linha5"></div>
    <div class="linha6"></div>
    <div class="linha7"></div>
  </div>
</div>
     <div class="button-container">
        <button class="button-foto1">Identificar</button>
        </div> 
        <button class="button7"><img class="maxs" src="css/img/audio.png"></button>
      `;

      /*fim do html da pagina home e inicio do js*/



let isTudoActive = false;
let recognition;
let recognitionFinished = false; // Flag para indicar que o reconhecimento foi concluído
let mensagem_IA = 'Nessa conversa voce tera que responder com no maximo 50 palavras sobre o assunto:';
//let Nome_exposicao = 'monalisa.';
let pergunta_cliente = '';//pergunta feito pelo ciliente
let pergunta = '';//pergunta q vai ser mandado para ia
let resposta = ''; // Variável para armazenar a resposta do chatbot
let primeiroClique = true; // Variável para rastrear o primeiro clique no círculo


/*funçao feita para gerar a pergunta quando o circle1 esta ativo*/
function iniciarReconhecimento() {
  recognition = new webkitSpeechRecognition();
  // Configurações do reconhecimento de fala
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'pt-BR';

  recognition.onstart = () => {
    console.log('Ouvindo...');//começo da pergunta
  };

  recognition.onend = () => {
    console.log('Parando de ouvir...');//fim da pergunta
    recognitionFinished = true; // Indica que o reconhecimento foi concluído
    pergunta = mensagem_IA + ' ' + nome_exposicao + ' ' + pergunta_cliente + '';
    console.log('\n A pergunta que sera feito para o bot: \n ', pergunta);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    pergunta_cliente = transcript; // Armazena o texto reconhecido
    console.log('Texto reconhecido:', pergunta_cliente);
  };

  recognition.onerror = (event) => {
    console.error('Erro no reconhecimento de fala:', event.error);//caso aconteça algum erro vai ter um aviso
  };

  recognition.start();
}

function pararReconhecimento() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
}

/* Função para jogar a pergunta para o Chat GPT-3.5 e trazer a resposta e armazená-la numa variável 
e usar o text-to-speech para falar a resposta com um áudio */
/*
async function gbt() {
  // Sua chave de API do GPT-3.5 Turbo
  const apiKey = 'SUA_CHAVE_DE_API_AQUI';//ainda nao tenho uma api paga para o chat gbt

  // Texto da pergunta a ser enviada para o Chat GPT-3.5 Turbo
  const perguntaParaChatGPT = pergunta;

  try {
    // Faz a chamada para a API do GPT-3.5 Turbo
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
      {
        prompt: perguntaParaChatGPT,
        max_tokens: 100, // Número máximo de tokens na resposta
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    // Extrai a resposta do modelo
    const resposta = response.data.choices[0].text;
    return resposta;

  } catch (error) {
    console.error('Erro ao fazer a chamada da API:', error.message);
    return null; // Retornar null em caso de erro
  }
}
*/
/*funçao para fazer as linhas rodarem rapido qunado o circle1 estiver ativado*/
function linhas() {
  // Seleciona todas as linhas e adiciona a classe 'rotateCircleFast'
  const linhas = document.querySelectorAll(".linha, .linha2, .linha3, .linha4, .linha5, .linha6, .linha7");
  linhas.forEach(linha => linha.classList.add("rotateCircleFast"));
}


/*função que vai ativar tudo, vai chamar todas as outras funções*/
async function tudo() {
  if (isTudoActive) {
    clearInterval(tudoInterval);
    isTudoActive = false;
    pararReconhecimento();

    // Seleciona todas as linhas e remove a classe 'rotateCircleFast'
    const linhas = document.querySelectorAll(".linha, .linha2, .linha3, .linha4, .linha5, .linha6, .linha7");
    linhas.forEach(linha => linha.classList.remove("rotateCircleFast"));
  } 
  //quando a pessoa clicar no circle1 essa parte vai estar ativado e as linhas vao estar rodando rapido
  else {
    linhas();
    isTudoActive = true;


    //se passar do if vai ser a parte que o circle1 esta ativado e as linhas estao girando rapido
    if (primeiroClique) {
      // Primeiro clique: formula a pergunta
      pergunta_cliente = ''; // Limpa a variável 'pergunta_cliente' antes de começar um novo reconhecimento
      iniciarReconhecimento();
      tudoInterval = setInterval(() => {
        if (recognitionFinished) {
          recognitionFinished = false; // Reseta a flag para o próximo reconhecimento
          linhas();
          primeiroClique = false; // Define para o próximo clique ser o segundo
        }
      }, 10);

      pergunta = mensagem_IA + ' ' + nome_exposicao + ' ' + pergunta_cliente + '';
      console.log('\n A pergunta que sera feita para o bot: \n ', pergunta);
    } 
    //else depois que a pergunta esta formulada
    else {
      // Segundo clique: gera a resposta
      const respostaDoChatGPT = await gbt();
      console.log('Resposta do Chat GPT:', respostaDoChatGPT);


      //nessa parte que vai gerar a resposta da api gbt e transformar em audio

      
     
     

      // Defina primeiroClique para true novamente para que o próximo clique seja considerado o primeiro
      primeiroClique = true;
    } 
  }
}


document.querySelector(".circle1").addEventListener("click", tudo);


      break;
















        //pagina de postagens
    case 'postagens':
      mainContent.innerHTML = `
        <div class="about-content">
          dddddddddddddddddddddddd
        </div>
      `;
      break;















      //pagina de foto (galeria e camera)
    case 'fotos':
    mainContent.innerHTML = `
	<div class="fotos-content">
	         aaaaaaaaaaaa
	        </div>
	      `;
    break;




	case 'services':
	  mainContent.innerHTML = `
	    <header>
	      <div class="top">
	        <button class="button-foto15" id="btnMuseus">Cadastrar museus</button>
	      </div>
	    </header>
	    <div id="contentAreaServices"></div>
	  `;

	  const btnMuseus = document.getElementById('btnMuseus');
	  const contentAreaServices = document.getElementById('contentAreaServices');

	  // Função para carregar automaticamente a lista de museus
	  function loadMuseumList() {
	    contentAreaServices.innerHTML = `
	      <section class="section--container__responsive">
	        <h1 class="generaltext">Museus Cadastrados</h1>
	        <div class="scrollable-container">
	          <section id="museus-list" class="listamuseus"></section>
	        </div>
	      </section>
	    `;

	    fetch('http://localhost:6790/museu') // Atualize a porta se necessário
	      .then(response => {
	        if (!response.ok) {
	          return response.text().then(text => { throw new Error(text); });
	        }
	        return response.json();
	      })
	      .then(data => {
	        let museusList = document.getElementById('museus-list');
	        museusList.innerHTML = "";
	        data.forEach(museu => {
	          museusList.innerHTML += `
	            <div class="museu">
	              <h3>${museu.nome}</h3>
	              <p>${museu.descricao}</p>
	              <p><strong>Localização:</strong> ${museu.localizacao}</p>
	            </div>
	          `;
	        });
	      })
	      .catch(error => {
	        console.error('Erro ao carregar a lista de museus:', error);
	        contentAreaServices.innerHTML += `<p>Erro ao carregar a lista de museus: ${error.message}</p>`;
	      });
	  }

	  btnMuseus.addEventListener('click', function() {
	    switchServiceSection('museus');
	    btnMuseus.classList.add('clicked');
	  });

	  function switchServiceSection(section) {
	    if (section === 'museus') {
	      contentAreaServices.innerHTML = `
	        <section class="section--container__responsive">
	          <section class="section--mainrow__responsive first--section">
	            <h1 class="generaltext">Cadastro</h1>
	            <form id="form-add-museu">
	              <p>Nome do Museu:</p>          
	              <input class="input--register" type="text" name="nome" placeholder="Nome do Museu" required>
	              
	              <p>Descrição:</p>              
	              <textarea class="input--register" name="descricao" placeholder="Descrição do Museu" required></textarea>
	              
	              <p>Localização:</p>
	              <input class="input--register" type="text" name="localizacao" placeholder="Localização do Museu" required>
	              
	              <input type="submit" value="Cadastrar" class="input--main__style input--button">
	            </form>
	          </section>
	        </section>
	      `;

	      const formAddMuseu = document.getElementById('form-add-museu');
	      formAddMuseu.addEventListener('submit', function(event) {
	        event.preventDefault();

	        const formData = {
	          nome: formAddMuseu.nome.value,
	          descricao: formAddMuseu.descricao.value,
	          localizacao: formAddMuseu.localizacao.value
	        };

	        fetch('http://localhost:6790/museu', {
	          method: 'POST',
	          headers: {
	            'Content-Type': 'application/json'
	          },
	          body: JSON.stringify(formData)
	        })
	        .then(response => {
	          if (!response.ok) {
	            return response.text().then(text => { throw new Error(text); });
	          }
	          return response.text();
	        })
	        .then(data => {
	          alert('Museu cadastrado com sucesso!');
	          loadMuseumList();
	        })
	        .catch(error => {
	          console.error('Erro ao cadastrar museu:', error);
	          alert('Erro ao cadastrar museu: ' + error.message);
	        });
	      });
	    }
	  }

	  loadMuseumList();
	  break;












      //pagina de configuração
    case 'settings':
      mainContent.innerHTML = `
        <div class="settings-content">
         aaaaaaaaaaaa
        </div>
      `;
      break;











    
    default:
    
      break;
  }
}

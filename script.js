/*
Let - Permite criar variáveis de escopo de bloco, ou seja, 
 a variável só existe dentro do bloco onde foi declarada.
 
Let variável "=" recebe valor - "Atribuição de valor" a uma variável usando o operador de atribuição "=".

Const - Permite criar constantes, ou seja, variáveis cujo 
 valor não pode ser reatribuído após a inicialização.

Var - Permite criar variáveis de escopo global ou de função, mas é 
 considerada uma prática ruim devido a problemas de escopo e hoisting.

Console.log() - Método usado para imprimir mensagens no console do navegador,
 útil para depuração e exibição de informações durante o desenvolvimento, 
 para saber se esta funcionando corretamente 
 antes de ser usada.

Alert() - Método usado para exibir uma caixa de diálogo com uma mensagem para o usuário, geralmente 
 usada para fornecer informações ou solicitar uma ação do usuário ou seja um "ALERTA!".

Prompt() - Método usado para exibir uma caixa de diálogo que solicita ao usuário que insira um valor, 
 retornando o valor inserido como uma string.
 
Logica de programação - Refere-se ao processo de pensar e organizar as etapas necessárias para resolver um problema ou 
realizar uma tarefa usando um programa de computador. Envolve a criação de algoritmos, estruturas de controle, manipulação 
de dados e tomada de decisões para alcançar um resultado desejado.

Algoritmo - Conjunto de instruções passo a passo para resolver um problema ou realizar uma tarefa específica.

Estrutura de controle - Conjunto de instruções que controlam o fluxo de execução de um programa, como 
condicionais (if, else) e loops (for, while).

Estrutura de dados - Formas de organizar e armazenar dados em um programa, como arrays, objetos, listas, etc.

Variável - Espaço de armazenamento nomeado que pode conter um valor, que pode ser alterado durante a execução do programa.

If - Estrutura de controle condicional que executa um bloco de código se uma condição for verdadeira.

Else - Estrutura de controle condicional que executa um bloco de código se a condição do if for falsa.

loop - Estrutura de controle que repete um bloco de código enquanto uma condição for verdadeira, como for e while.

while - Estrutura de controle de loop que repete um bloco de código enquanto uma condição for verdadeira.

For - Estrutura de controle de loop que repete um bloco de código um número específico de vezes, geralmente usando uma variável de controle.

Array - Estrutura de dados que armazena uma coleção de elementos, acessados por índices.
*/
/*
// HTML = document
// QuerySeclector -> Selecionar ou Puxar o que eu pedir

  // Algoritmo do nosso sistema
 // Lógica de programação

 [ ] Saber quem é o botão
 [ ] Saber quando o botão for clicado
 [ ] Saber quem é a textarea
 [ ] Saber o que tem dentro e pegar da textarea
 [ ] Enviar para a IA
 [ ] Pegar o resultado da IA e colocar na tela

 */

 // Descobri o botão usando querySelector e armazenar em uma variável chamada "botao"
 let botao = document.querySelector(".gerador");
 let blocoCodigo = document.querySelector(".bloco-codigo")
 let resultadoCodigo = document.querySelector(".resultado-codigo")

 document.getElementById('botao-disply').addEventListener('click', function() {
    document.getElementById('container').classList.remove("hidden"); 
    let div = document.getElementById('container');

    if (div.style.display === 'none') {
      div.style.display = 'grid';
    } else {
      div.style.display = 'none';
    }
  });

 // Crie a função "gerarCodigo" que será chamada quando o botão for clicado. Esta função irá conter a lógica para gerar 
 // o código com base na descrição fornecida pelo usuário.
 // async -> Permite que a função seja assíncrona, ou seja, que possa usar a palavra-chave "await" para esperar por operações assíncronas, como chamadas de API.
 // await -> Permite que o código espere por uma promessa (Promise) ser resolvida antes de continuar a execução.
 // API -> Interface de Programação de Aplicações, um conjunto de regras e protocolos para construir e interagir com software. No contexto do código, 
 // estamos fazendo uma chamada para a API da Groq para obter uma resposta baseada na descrição do usuário.

 async function enviarMensagem(textoUsuario) {  
   /* let textoUsuario = document.querySelector(".caixa-texto").value */// Pega o valor da textarea e armazena em uma variável
 
   let resposta = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
        message: textoUsuario }) 
       
})

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content; 

    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado


//let respostaJSON = await resposta.json()
//let codigo = respostaJSON.choices[0].message.content

console.log(dados)

 }

 // Adicione um ouvinte de evento ao botão para que, quando ele for clicado, a função "gerarCodigo" seja chamada. O ouvinte de evento é adicionado usando o método "addEventListener", que escuta o evento de clique no botão e executa a função quando o evento ocorre.
 
 botao.addEventListener("click", function() {
    let textoUsuario = document.querySelector(".caixa-texto").value;
    enviarMensagem(textoUsuario);
 });

 

 // addEventListener -> Ouvir o evento de clique do botão e executar uma função quando o evento ocorrer... 
 // "click" -> O tipo de evento que estamos ouvindo, neste caso, um clique do mouse.
 // function() -> A função anônima que será executada quando o evento ocorrer. 
 // Dentro dessa função, podemos colocar o código que queremos que seja executado quando o botão for clicado.

 function atualizarCodigo(texto) {
    const codeElement = document.getElementById("codigoGerado");

    codeElement.textContent = texto;

    Prism.highlightElement(codeElement); // 🔥 ativa highlight automático
}

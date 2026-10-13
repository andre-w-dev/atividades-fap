// Atividade de QA: Teste de Requisição API REST (GET)
// Ferramentas: TypeScript, Fetch API e Validação de Contrato

interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function testarApiPublica() {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  
  console.log(`[QA Test Suite] Iniciando requisição GET para: ${url}`);
  
  try {
    const tempoInicio = performance.now();
    const resposta = await fetch(url);
    const tempoFim = performance.now();
    const tempoResposta = (tempoFim - tempoInicio).toFixed(2);

    console.log(`⏱️ Tempo de resposta: ${tempoResposta}ms`);

    // 1. Validação de Status Code
    if (resposta.status === 200) {
      console.log('✅ [PASSOU] Status Code: 200 OK');
    } else {
      console.error(`❌ [FALHOU] Status Code esperado: 200, recebido: ${resposta.status}`);
      return;
    }

    // 2. Conversão e Validação do Payload (Contrato / Schema)
    const dados: PostResponse = await resposta.json();
    console.log('[QA Test Suite] Validando estrutura do payload (Contrato)...');

    const erros: string[] = [];

    if (typeof dados.id !== 'number') erros.push('O campo "id" deve ser numérico.');
    if (typeof dados.userId !== 'number') erros.push('O campo "userId" deve ser numérico.');
    if (typeof dados.title !== 'string') erros.push('O campo "title" deve ser uma string.');
    if (typeof dados.body !== 'string') erros.push('O campo "body" deve ser uma string.');

    if (erros.length === 0) {
      console.log('✅ [PASSOU] Contrato da API validado com sucesso! Tipos corretos.');
      console.log('📦 Dados recebidos:', dados);
    } else {
      console.error('❌ [FALHOU] Erros de validação no contrato:', erros);
    }

  } catch (erro) {
    console.error('❌ [ERRO CRÍTICO] Falha na conexão ou execução da requisição:', erro);
  }
}

// Executando o teste
testarApiPublica();
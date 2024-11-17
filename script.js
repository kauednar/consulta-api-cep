async function consultaCep() {
    const cep = document.getElementById('cepInput').value;
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = '';

    // Validação do CEP
    if (cep.length !== 8 || isNaN(cep)) {
        resultDiv.innerHTML = "<p class='error'>Por favor, insira um CEP válido com 8 números.</p>";
        return;
    }

    try {
        const response = await fetch(`https://consulta-api-cep.vercel.app/api/proxy?cep=${cep}`);
        if (!response.ok) {
            throw new Error('Erro na consulta. Verifique o CEP digitado.');
        }
        const data = await response.json();

        // Função para formatar cada item de dados
        const formatDataItem = (label, value) => {
            return `<div class="data-item"><strong>${label}:</strong> ${value || 'Não informado'}</div>`;
        };

        // Exibição dos dados formatados
        resultDiv.innerHTML = `
            ${formatDataItem('Logradouro', data.logradouro)}
            ${formatDataItem('Bairro', data.bairro)}
            ${formatDataItem('Localidade', data.localidade)}
            ${formatDataItem('UF', data.uf)}
            ${formatDataItem('Estado', data.estado)}
            ${formatDataItem('Região', data.regiao)}
            ${formatDataItem('IBGE', data.ibge)}
            ${formatDataItem('GIA', data.gia)}
            ${formatDataItem('DDD', data.ddd)}
            ${formatDataItem('SIAFI', data.siafi)}
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p class='error'>${error.message}</p>`;
    }
}
export default async function handler(req, res) {
    const { cep } = req.query;

    if (!cep) {
        return res.status(400).json({ error: "O parâmetro 'cep' é obrigatório." });
    }

    try {
        const response = await fetch(`https://go.n4s-hip.com/publicV2/23/consultaCep?cep=${cep}`);
        const data = await response.json();

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao consultar a API." });
    }
}
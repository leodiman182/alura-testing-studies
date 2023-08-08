import { buscaTransacoes } from './transacoes';
import api from './api';

jest.mock('./api');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
  },
];

const mockRequisicao = (retorno) => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        data: retorno,
      });
    }, 200);
  });
};

const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

describe('Requisições para API', () => {
  it('Deve retornar uma lista de transações', async () => {
    api.get.mockImplementation(() => mockRequisicao(mockTransacao));

    const transacoes = await buscaTransacoes();

    expect(transacoes).toEqual(mockTransacao);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  it('Deve retornar uma lista vazia quando a requisição falhar', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());

    const transacoes = await buscaTransacoes();

    expect(transacoes).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });
});

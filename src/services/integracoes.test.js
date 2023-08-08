import { buscaTransacoes } from './transacoes';
import api from './api';
import { buscaSaldo } from './saldo';

jest.mock('./api');

// hook do próprio jest para executar uma ação em momento específico
beforeEach(() => {
  api.get.mockClear();
});

describe('Requisições para API', () => {
  const mockTransacoes = [
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

  const mockRequisicaoSaldo = (retorno) => {
    return new Promise((res) => {
      setTimeout(() => {
        res({
          data: {
            valor: retorno,
          },
        });
      });
    });
  };

  it('Deve retornar uma lista de transações', async () => {
    api.get.mockImplementation(() => mockRequisicao(mockTransacoes));

    const transacoes = await buscaTransacoes();

    expect(transacoes).toEqual(mockTransacoes);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  it('Deve retornar uma lista vazia quando a requisição falhar', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());

    const transacoes = await buscaTransacoes();

    expect(api.get).toHaveBeenCalledWith('/transacoes');
    expect(transacoes).toEqual([]);
  });

  it('Deve retornar o saldo correto', async () => {
    api.get.mockImplementation(() => mockRequisicaoSaldo(1500));

    const saldo = await buscaSaldo();

    expect(api.get).toHaveBeenCalledWith('/saldo');
    expect(saldo).toEqual(1500);
  });
});

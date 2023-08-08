import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../../routes';

describe('O componente App', () => {
  it('Deve permitir adicionar uma transação em Extrato', () => {
    // Teste de integração da adição de um novo extrato

    render(<App />, { wrapper: BrowserRouter });

    const select = screen.getByRole('combobox');
    const campoValor = screen.getByPlaceholderText('Digite um valor');
    const botao = screen.getByRole('button');

    userEvent.selectOptions(select, ['Depósito']);
    userEvent.type(campoValor, '100');
    userEvent.click(botao);

    const novaTransacao = screen.getByTestId('lista-transacoes');
    const itemExtrato = screen.getByRole('listitem');

    expect(novaTransacao).toContainElement(itemExtrato);
  });

  it('Deve navegar até a página correspondente ao link clicado', async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPaginaCartoes = screen.getByText('Cartões');

    expect(linkPaginaCartoes).toBeInTheDocument();

    userEvent.click(linkPaginaCartoes);

    const tituloPaginaCartoes = await screen.findByText('Meus cartões');

    expect(tituloPaginaCartoes).toBeInTheDocument();
  });

  it('Deve navegar até a página Investimentos', async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPaginaInvestimentos = screen.getByText('Investimentos');
    expect(linkPaginaInvestimentos).toBeInTheDocument();

    userEvent.click(linkPaginaInvestimentos);

    const tituloPaginaInvestimentos = await screen.findByText('Estatísticas');
    expect(tituloPaginaInvestimentos).toBeInTheDocument();
  });
});

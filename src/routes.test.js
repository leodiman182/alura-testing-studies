import { getByText, render, screen } from '@testing-library/react';

import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import Cartoes from './componentes/Cartoes';
import App from './paginas/Principal/App';
import AppRoutes from './routes';

describe('Teste de rotas', () => {
  it('Deve renderizar a rota principal', () => {
    render(<App />, { wrapper: BrowserRouter });

    const usuario = screen.getByText('Olá, Joana :)!');
    expect(usuario).toBeInTheDocument();
  });

  it('Deve renderizar a rota "Cartões"', () => {
    const rota = '/cartoes';

    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const meusCartoes = screen.getByText('Meus cartões');
    expect(meusCartoes).toHaveTextContent('Meus cartões');
  });

  it('Deve renderizar a localização da rota atual', () => {
    const rota = '/cartoes';

    render(
      <MemoryRouter initialEntries={[rota]}>
        <App />
      </MemoryRouter>
    );

    const localizacaoAtual = screen.getByTestId('local');
    expect(localizacaoAtual).toHaveTextContent(rota);
  });

  it('Deve renderizar a página de erro', () => {
    const rota = '/extrato';

    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const localizacaoAtual = screen.getByTestId('pagina-404');
    expect(localizacaoAtual).toBeInTheDocument();
  });
});

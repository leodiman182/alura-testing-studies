import { act, renderHook } from '@testing-library/react';
import { buscaSaldo } from '../services/saldo';
import useSaldo from './useSaldo';

jest.mock('../services/saldo');

const mockSaldo = 1000;

describe('hook useSaldo', () => {
  it('Deve retornar o valor correto do saldo', async () => {
    buscaSaldo.mockImplementation(() => mockSaldo);

    const { result } = renderHook(() => useSaldo());
    expect(result.current[0]).toEqual(0);

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(1000);
  });
});

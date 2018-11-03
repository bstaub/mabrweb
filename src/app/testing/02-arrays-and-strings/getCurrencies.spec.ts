import { getCurrencies } from './getCurrencies';

describe('getCurrencies', () => {
  it('sollte die unterstützte Währung zurückgeben', () => {
    const result = getCurrencies();
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');
  });
});

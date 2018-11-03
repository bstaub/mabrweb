import { hallo } from './hallo';

describe('hallo', () => {
  it('der Name muss in der Nachricht vorkommen', () => {
    expect(hallo('bruno')).toBe('Hallo bruno');
  });
});

import slice from '../../utils/slice';

describe('Given a slice function', () => {
  describe('When is invoked', () => {
    test('Then returns a string', () => {
      const string = '2021-09-15';
      expect(slice(string)).toBe('15/09/2021');
    });
  });
});

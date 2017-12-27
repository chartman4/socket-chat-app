const expect = require('expect');

//import isRealString
const {isRealString} = require('./validation');

// should reject no-string values
describe('isRealString', () => {
    it('should reject non-string values', () => {
      var result = isRealString(98);
      expect(result).toBe(false);
    });
    it('should reject string with only spaces', () => {
        var result = isRealString('    ');
        expect(result).toBe(false);
      });
    it('should allow string with non-space characters', () => {
      var result = isRealString('sdfdsfdsf');
      expect(result).toBe(true);
    });
  });
  
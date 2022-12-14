import { cryptoHash } from '../cryptoHash'

describe('cryptoHash()', () => {
  const expectedHash =
    '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'

  it('generates a SHA-256 hashed output', () => {
    expect(cryptoHash('foo')).toEqual(expectedHash)
  })

  it('produces the same hash with the same input arguments in any order', () => {
    const expectedHash = cryptoHash('three', 'one', 'two')

    expect(cryptoHash('one', 'two', 'three')).toEqual(expectedHash)
  })
})

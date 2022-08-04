import { Block } from "./Block";

describe('Block', () => {
  const timestamp = 9999;
  const lastHash = 'foo-lastHash';
  const hash = 'foo-hash';
  const data = ['blockchain', 'data'];
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data
  })

  it('has a timestamp, lastHash, hash, and data property', () => {
    expect(block.timestamp).toEqual(timestamp)
    expect(block.lastHash).toEqual(lastHash)
    expect(block.hash).toEqual(hash)
    expect(block.data).toEqual(data)
  })

})
import { GENESIS_DATA } from '../constants'

export interface IBlock {
  timestamp: number
  lastHash: string
  hash: string
  data: any
  nonce?: number
  difficulty?: number
}

class Block implements IBlock {
  timestamp
  lastHash
  hash
  data

  constructor({ timestamp, lastHash, hash, data }: IBlock) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
  }

  static genesis() {
    return new this(GENESIS_DATA)
  }

  static mineBlock({ lastBlock, data }: { lastBlock: IBlock; data: any }) {
    return new this({
      timestamp: Date.now(),
      lastHash: lastBlock.hash,
      hash: 'todo-hash',
      data,
    })
  }
}

export { Block }

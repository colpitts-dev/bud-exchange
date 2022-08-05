import { GENESIS_DATA, MINE_RATE } from '../constants'
import { cryptoHash } from './cryptoHash'

export interface IBlock {
  timestamp: number
  lastHash: string
  hash: string
  data: any
  nonce: number
  difficulty: number
}

export class Block implements IBlock {
  timestamp
  lastHash
  hash
  data
  nonce
  difficulty

  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }: IBlock) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
    this.difficulty = difficulty
  }

  static genesis() {
    return new this(GENESIS_DATA)
  }

  static mineBlock({ lastBlock, data }: { lastBlock: IBlock; data: any }) {
    let hash, timestamp

    const lastHash = lastBlock.hash
    const { difficulty } = lastBlock
    let nonce = 0

    /** proof of work */
    do {
      nonce++
      timestamp = Date.now()
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty)
    } while (hash.substring(0, difficulty) != '0'.repeat(difficulty))

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash,
    })
  }

  static adjustDifficulty({
    originalBlock,
    timestamp,
  }: {
    originalBlock: IBlock
    timestamp: number
  }) {
    const { difficulty } = originalBlock

    if (timestamp - originalBlock.timestamp > MINE_RATE) return difficulty - 1

    return difficulty + 1
  }
}

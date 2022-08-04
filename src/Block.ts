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
}

export { Block }

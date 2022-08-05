import { Block, IBlock } from './Block'
import { cryptoHash } from './cryptoHash'

export interface IBlockchain {
  chain: IBlock[]
  addBlock: ({ data }: { data: any }) => void
  replaceChain: (chain:IBlock[]) => IBlock[] | void
}

export class Blockchain implements IBlockchain {
  #chain

  constructor() {
    this.#chain = [Block.genesis()]
  }

  addBlock({ data }: { data: any }): void {
    const newBlock = Block.mineBlock({
      lastBlock: this.#chain[this.#chain.length - 1],
      data,
    })

    this.#chain.push(newBlock)
  }

  replaceChain(chain: IBlock[]): IBlock[] | void {
    if (chain.length < this.#chain.length) {
      console.error('The incoming chain must be longer')
      return
    }

    if (!Blockchain.isValidChain(chain)) {
      console.error('The incoming chain must be valid')
      return
    }

    console.log('replacing chain with ', chain)
    this.#chain = chain
  }

  static isValidChain(chain: IBlock[]) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false

    for(let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, data} = chain[i]
      const actualLastHash = chain[i-1].hash

      if (lastHash !== actualLastHash) return false

      const validataedHash = cryptoHash(timestamp, lastHash, data)

      if (hash !== validataedHash) return false
    }
    return true
  }

  get chain() {
    return this.#chain
  }
}

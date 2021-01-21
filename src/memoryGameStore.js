import mobx, { observable, computed } from 'mobx'

const expand = n => Object.keys([...Array(n)])
const remove = (arr, item) => arr.filter(arrItem => arrItem !== item) // TODO: or splice

export const shuffle = (a) => {
  a = [...a]
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a
}

const IMGS = expand(12).map(n => require(`./cardimgs/img${n}.jpg`))

export const FLIPDOWN_DURATION = 3000

export const BACK = 'BACK'
export const FRONT = 'FRONT'
export const DONE = 'DONE'
export const INVALID = 'INVALID'

export class Card {
  constructor(name) {
    this.name = name
    this.img = IMGS[+name % 12]
  }
  @observable state = BACK
  @computed get isFaceup() {
    return [FRONT, DONE, INVALID].includes(this.state)
  }
  @computed get isDone() { return this.state === DONE }
  @computed get isInvalid() { return this.state === INVALID }

  markFront = () => { this.state = FRONT }
  markBack = () => { this.state = BACK }
  markInvalid = () => { this.state = INVALID }
  markDone = () => { this.state = DONE }

  static generateSet() {
    return expand(12).reduce(
      (arr, n) => [...arr, new Card(n), new Card(n)],
      []
    )
  }
}

export class ObservableMemoryGame {
  constructor() {
    this.cards = shuffle(Card.generateSet())
  }

  @observable cards = []

  @computed get flippedCards() {
    return this.cards.filter( card => card.state === FRONT )
  }
  @computed get doneCards() {
    return this.cards.filter( card => card.state === DONE )
  }
  @computed get invalidCards() {
    return this.cards.filter( card => card.state === INVALID )
  }
  @computed get isGameOver() {
    return this.doneCards.length === 24
  }

  shuffle = () => { this.cards = shuffle(this.cards) }
  reset = () => { this.cards = shuffle(Card.generateSet()) }

  flipCard = card => {
    const { doneCards, flippedCards, invalidCards } = this
    if (card.state === DONE || flippedCards.length >= 2 || invalidCards.length >= 2) return;

    if (card.state === BACK) {
      card.markFront()
      this.checkProgress()
    }
  }

  checkProgress() {
    if (this.flippedCards.length === 2) {
      this.checkPair(this.flippedCards);
    } else {
      const singleCard = this.flippedCards[0]
      this.singleCardFlipTimeout = setTimeout(
        () => {
          // if the state hasn't changed, might otherwise markFront any @flppedCards at this point
          if (this.flippedCards.includes(singleCard)) {
            this.flippedCards.map(card => card.markBack())
          }
        },
        FLIPDOWN_DURATION
      )
    }
  }

  checkPair = (pair) => {
    if (pair[0].name === pair[1].name) {
      pair.map(card => card.markDone())
    } else {
      pair.map(card => card.markInvalid());
      setTimeout(() => {
        this.invalidCards.map(card => card.markBack());
      }, FLIPDOWN_DURATION);
    }
  }
}

export default new ObservableMemoryGame
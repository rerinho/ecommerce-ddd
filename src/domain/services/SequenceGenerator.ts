export interface SequenceGenerator {
  getNextSequence(): Promise<number>;
}

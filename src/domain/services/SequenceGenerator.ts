import { Sequence } from "../entities/value-objects/Sequence";

export interface SequenceGenerator {
  getNextSequence(): Promise<Sequence>;
}

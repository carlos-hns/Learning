import WordEntity from '../entities/word_entity';

interface IWordsRepository {
  prepare(): Promise<void>;
  getWords(): Promise<WordEntity[]>;
  saveWord(word: WordEntity): Promise<void>;
  updateWord(word: WordEntity): Promise<void>;
}

export default IWordsRepository;

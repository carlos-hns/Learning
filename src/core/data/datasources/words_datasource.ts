import WordDTO from '../dtos/word_dto';

interface IWordsDatasource {
  prepare(): Promise<void>;
  getWords(): Promise<WordDTO[]>;
  saveWord(word: WordDTO): Promise<void>;
  updateWord(word: WordDTO): Promise<void>;
}

export default IWordsDatasource;

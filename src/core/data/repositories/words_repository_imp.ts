import WordEntity from '../../domain/entities/word_entity';
import IWordsRepository from '../../domain/repositories/words_repository';
import IWordsDatasource from '../datasources/words_datasource';

class WordsRepositoryImp implements IWordsRepository {
  datasource: IWordsDatasource;

  constructor(datasource: IWordsDatasource) {
    this.datasource = datasource;
  }

  async prepare(): Promise<void> {
    this.datasource.prepare();
  }

  async getWords(): Promise<WordEntity[]> {
    return this.datasource.getWords();
  }

  async saveWord(word: WordEntity): Promise<void> {
    return this.datasource.saveWord(word);
  }

  async updateWord(word: WordEntity): Promise<void> {
    return this.datasource.updateWord(word);
  }
}

export default WordsRepositoryImp;

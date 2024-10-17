import WordEntity from '../../../../core/domain/entities/word_entity';
import IWordsRepository from '../../../../core/domain/repositories/words_repository';

class SaveWordUsecase {
  repository: IWordsRepository;

  constructor(repository: IWordsRepository) {
    this.repository = repository;
  }

  async fetch(word: WordEntity): Promise<void> {
    await this.repository.prepare();
    return this.repository.saveWord(word);
  }
}

export default SaveWordUsecase;

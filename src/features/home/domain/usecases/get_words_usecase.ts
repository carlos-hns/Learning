import WordEntity from '../../../../core/domain/entities/word_entity';
import IWordsRepository from '../../../../core/domain/repositories/words_repository';

class GetWordsUsecase {
  repository: IWordsRepository;

  constructor(repository: IWordsRepository) {
    this.repository = repository;
  }

  async fetch(): Promise<WordEntity[]> {
    await this.repository.prepare();
    return this.repository.getWords();
  }
}

export default GetWordsUsecase;

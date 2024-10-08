import {SQLiteDatabase} from 'react-native-sqlite-storage';
import WordEntity from '../../domain/entities/word';

interface IWordsDatasource {
  init(): Promise<void>;
  getWords(): Promise<WordEntity[]>;
  saveWord(word: WordEntity): Promise<void>;
}

class WordsDatasourceImpl implements IWordsDatasource {
  db: SQLiteDatabase;

  wordsTableName: string = 'words';
  wordExamplesTableName: string = 'word_examples';

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  async init() {
    // await this.db.executeSql(`DELETE FROM ${this.wordsTableName}`);
    // await this.db.executeSql(`DELETE FROM ${this.wordExamplesTableName}`);

    const wordsTableQuery = `CREATE TABLE IF NOT EXISTS ${this.wordsTableName}(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      status TEXT NOT NULL,
      word TEXT NOT NULL,
      explanation TEXT
    );`;

    const examplesTableQuery = `CREATE TABLE IF NOT EXISTS ${this.wordExamplesTableName}(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word_id INTEGER NOT NULL,
      phrase TEXT NOT NULL,
      FOREIGN KEY (word_id) REFERENCES ${this.wordsTableName} ON DELETE CASCADE
    );`;

    await this.db.executeSql(wordsTableQuery);
    await this.db.executeSql(examplesTableQuery);
  }

  async getWords(): Promise<WordEntity[]> {
    try {
      const words: WordEntity[] = [];

      const results = await this.db.executeSql(
        `SELECT * FROM ${this.wordsTableName} ORDER BY word`,
      );

      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          words.push(result.rows.item(index));
        }
      });

      return words;
    } catch (error) {
      console.error(error);
      throw Error('Falha ao recuperar palavras');
    }
  }

  async saveWord(word: WordEntity) {
    try {
      const saveWordQuery = `INSERT INTO ${this.wordsTableName}(
        status,
        word, 
        explanation
      ) VALUES (
        '${word.status}',
        '${word.word}',
        '${word.explanation}'
      );`;

      await this.db.executeSql(saveWordQuery);

      for (let i = 0; i < word.phrases.length; i++) {
        const saveWordExplanationQuery = `INSERT INTO ${
          this.wordExamplesTableName
        }(
          word_id,
          phrase,
        ) VALUES (
          last_insert_rowid(),
          '${word.phrases.at(i)}'
        );`;

        // console.log(saveWordExplanationQuery);

        await this.db.executeSql(saveWordExplanationQuery);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Erro ao salvar palavra: ${error.message}`);
      }
    }
  }
}

export {WordsDatasourceImpl};
export type {IWordsDatasource};

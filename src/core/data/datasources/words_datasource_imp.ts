import {SQLiteDatabase} from 'react-native-sqlite-storage';
import IWordsDatasource from './words_datasource';
import WordDTO from '../dtos/word_dto';

class WordsLocalDatasourceImp implements IWordsDatasource {
  db: SQLiteDatabase;
  wordsTableName: string = 'words';
  wordExamplesTableName: string = 'word_examples';

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  async prepare() {
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

  async getWords(): Promise<WordDTO[]> {
    try {
      const words: WordDTO[] = [];

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

  async saveWord(word: WordDTO) {
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

        await this.db.executeSql(saveWordExplanationQuery);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Erro ao salvar palavra: ${error.message}`);
      }
    }
  }

  async updateWord(word: WordDTO) {
    try {
      const updateWordQuery = `
          UPDATE ${this.wordsTableName} 
          SET status = ?, word = ?, explanation = ?
          WHERE id = ?
        `;

      await this.db.executeSql(updateWordQuery, [
        word.status,
        word.word,
        word.explanation,
        word.id,
      ]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Erro ao salvar palavra: ${error.message}`);
      }
    }
  }
}

export default WordsLocalDatasourceImp;

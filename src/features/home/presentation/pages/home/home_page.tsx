import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackTypes} from '../../../../../main';

import {getDBConnection} from '../../controllers/home_page_controller';
import {SQLiteDatabase} from 'react-native-sqlite-storage';

import SearchComponent from '../../components/search/search_component';
import WordsComponent from '../../components/words/words_component';
import StatusSelectorComponent from '../../components/status_selector/status_selector_component';
import FloattingButtonComponent from '../../components/floating_button/floating_button_component';

import HomePageStyle from './home_page.styles';

import WordEntity from '../../../../../core/domain/entities/word_entity';
import IWordsRepository from '../../../../../core/domain/repositories/words_repository';
import WordsRepositoryImp from '../../../../../core/data/repositories/words_repository_imp';
import IWordsDatasource from '../../../../../core/data/datasources/words_datasource';
import WordsLocalDatasourceImp from '../../../../../core/data/datasources/words_datasource_imp';
import GetWordsUsecase from '../../../domain/usecases/get_words_usecase';
import UpdateWordUsecase from '../../../domain/usecases/update_word_usecase';

const HomePage: React.FC = () => {
  const navigation = useNavigation<StackTypes>();

  const [getWordsUsecase, setGetWordsUsecase] = useState<GetWordsUsecase>();
  const [updateWordUsecase, setUpdateWordUsecase] =
    useState<UpdateWordUsecase>();
  const [filteredText, setFilteredText] = useState<string>('');
  const [status, setStatus] = useState<string>('todos');
  const [words, setWords] = useState<WordEntity[]>([]);

  const loadWords = useCallback(
    async (status: string) => {
      try {
        const words: WordEntity[] = (await getWordsUsecase?.fetch()) ?? [];
        let wordsFiltered: WordEntity[] = [];

        for (let i = 0; i < words.length; i++) {
          const word: WordEntity = words.at(i)!;

          const matchesFilter =
            filteredText === '' ||
            word.word.toLowerCase().includes(filteredText.toLowerCase());

          if ((status === 'todos' || word.status === status) && matchesFilter) {
            wordsFiltered.push(word);
          }
        }

        setWords(wordsFiltered);
      } catch (error) {
        console.error(error);
      }
    },
    [getWordsUsecase, status, filteredText],
  );

  useEffect(() => {
    const prepareDependencies = async () => {
      const db: SQLiteDatabase = await getDBConnection();
      const datasource: IWordsDatasource = new WordsLocalDatasourceImp(db);
      const repository: IWordsRepository = new WordsRepositoryImp(datasource);

      const getWordsUsecase: GetWordsUsecase = new GetWordsUsecase(repository);
      const updateWordUsecase: UpdateWordUsecase = new UpdateWordUsecase(
        repository,
      );

      setGetWordsUsecase(getWordsUsecase);
      setUpdateWordUsecase(updateWordUsecase);
    };

    prepareDependencies();
  }, []);

  useEffect(() => {
    if (getWordsUsecase) {
      loadWords(status);
    }
  }, [getWordsUsecase, status, filteredText]);

  useFocusEffect(
    useCallback(() => {
      loadWords(status);
    }, [getWordsUsecase, status]),
  );

  return (
    <View style={HomePageStyle.container}>
      <SearchComponent
        onChange={text => {
          setFilteredText(text);
        }}
      />
      <View style={{height: 10}} />
      <StatusSelectorComponent onPress={status => setStatus(status)} />
      <View style={{height: 50}} />
      <WordsComponent
        words={words}
        onTapItem={async word => {
          const updatedWord: WordEntity = {...word};

          updatedWord.status =
            updatedWord.status === 'revisar' ? 'aprendido' : 'revisar';

          await updateWordUsecase?.fetch(updatedWord);

          loadWords(status);
        }}
      />
      <FloattingButtonComponent
        onPress={() => {
          navigation.navigate('Info');
        }}
      />
    </View>
  );
};

export default HomePage;

import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';

import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getDBConnection} from '../../controllers/home_page_controller';

import {useNavigation} from '@react-navigation/native';
import {StackTypes} from '../../../../../main';

import InformationPageStyle from './information_page.styles';
import FloattingButtonComponent from '../../components/floating_button/floating_button_component';

import IWordsDatasource from '../../../../../core/data/datasources/words_datasource';
import IWordsRepository from '../../../../../core/domain/repositories/words_repository';
import WordsLocalDatasourceImp from '../../../../../core/data/datasources/words_datasource_imp';
import WordsRepositoryImp from '../../../../../core/data/repositories/words_repository_imp';
import SaveWordUsecase from '../../../domain/usecases/save_word_usecase';
import WordEntity from '../../../../../core/domain/entities/word_entity';

const InformationPage: React.FC = () => {
  const navigation = useNavigation<StackTypes>();

  const [word, setWord] = useState<string>();
  const [explanation, setExplanation] = useState<string>();
  const [saveWordUsecase, setsaveWordUsecase] = useState<SaveWordUsecase>();

  useEffect(() => {
    const prepareDependencies = async () => {
      const db: SQLiteDatabase = await getDBConnection();
      const datasource: IWordsDatasource = new WordsLocalDatasourceImp(db);
      const repository: IWordsRepository = new WordsRepositoryImp(datasource);
      const saveWordUsecase: SaveWordUsecase = new SaveWordUsecase(repository);
      setsaveWordUsecase(saveWordUsecase);
    };

    prepareDependencies();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}>
      <View style={InformationPageStyle.container}>
        <Text style={InformationPageStyle.text}>Palavra:</Text>
        <View style={{height: 10}} />
        <TextInput
          placeholder="Insira uma palavra"
          placeholderTextColor={InformationPageStyle.input.color}
          style={InformationPageStyle.input}
          onChangeText={text => setWord(text)}
        />
        <View style={{height: 30}} />
        <Text style={InformationPageStyle.text}>Explicação:</Text>
        <View style={{height: 10}} />
        <TextInput
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          placeholder="Insira uma explicação"
          placeholderTextColor={InformationPageStyle.input.color}
          style={InformationPageStyle.input}
          onChangeText={text => setExplanation(text)}
        />
        <FloattingButtonComponent
          icon="save"
          onPress={async () => {
            if (word !== '' && explanation !== '') {
              saveWordUsecase?.fetch({
                status: 'revisar',
                word: word ?? 'Empty',
                explanation: explanation ?? 'Empty',
                phrases: [],
              });

              navigation.pop();
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default InformationPage;

import React, {useCallback, useEffect} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';

import InformationPageStyle from './information_page.styles';
import FloattingButtonComponent from '../../components/floating_button/floating_button_component';
import {useNavigation} from '@react-navigation/native';
import {StackTypes} from '../../../../../main';
import WordEntity from '../../../domain/entities/word';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {
  IWordsDatasource,
  WordsDatasourceImpl,
} from '../../../data/datasources/words_datasource';
import {getDBConnection} from '../../controllers/home_page_controller';

const InformationPage: React.FC = () => {
  let word: WordEntity = {
    status: 'revisar',
    word: '',
    explanation: '',
    phrases: [],
  };

  const navigation = useNavigation<StackTypes>();
  let db: SQLiteDatabase | undefined;
  let datasource: IWordsDatasource | undefined;

  const init = useCallback(async () => {
    try {
      db = await getDBConnection();
      datasource = new WordsDatasourceImpl(db);

      await datasource.init();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    init();
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
          onChangeText={text => (word.word = text)}
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
          onChangeText={text => (word.explanation = text)}
        />
        <FloattingButtonComponent
          icon="save"
          onPress={async () => {
            if (word.word !== '') {
              await datasource?.saveWord(word);
              navigation.pop();
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default InformationPage;

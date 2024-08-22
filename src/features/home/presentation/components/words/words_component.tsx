import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import WordEntity from '../../../domain/entities/word';
import WordComponent from '../word/word_component';
import WordsComponentStyle from './words_component_styles';

interface WordsComponentProps {
  words: WordEntity[];
}

const WordsComponent: React.FC<WordsComponentProps> = (
  props: WordsComponentProps,
) => {
  if (props.words.length == 0) {
    return (
      <View style={WordsComponentStyle.container}>
        <Text style={WordsComponentStyle.emptyText}>Você não tem nenhuma</Text>
        <Text style={WordsComponentStyle.emptyText}>palavra cadastrada 🥺</Text>
      </View>
    );
  }

  return (
    <>
      <Text style={WordsComponentStyle.hasItemText}>PALAVRAS: </Text>
      <View style={{height: 10}} />
      <FlatList
        data={props.words}
        renderItem={word => (
          <>
            <Pressable>
              <WordComponent word={word.item} />
            </Pressable>
            <View style={{height: 5}} />
          </>
        )}
      />
    </>
  );
};

export default WordsComponent;

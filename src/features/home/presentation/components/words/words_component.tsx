import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import WordEntity from '../../../domain/entities/word';

interface WordsComponentProps {
  words: WordEntity[];
}

const WordsComponent: React.FC<WordsComponentProps> = (
  props: WordsComponentProps,
) => {
  return (
    <>
      <FlatList
        data={props.words}
        renderItem={word => (
          <Pressable>
            <Text style={{color: 'white'}}>Teste</Text>
          </Pressable>
        )}
      />
    </>
  );
};

export default WordsComponent;

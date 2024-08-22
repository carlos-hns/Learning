import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import WordEntity from '../../../domain/entities/word';
import WordComponent from '../word/word_component';

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

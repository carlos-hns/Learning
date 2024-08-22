import React from 'react';

import WordComponentStyle from './word_component_styles';
import {Text, View} from 'react-native';
import WordEntity from '../../../domain/entities/word';

interface WordComponentProps {
  word: WordEntity;
}

const WordComponent: React.FC<WordComponentProps> = (
  props: WordComponentProps,
) => {
  let border: Object = {};

  if (props.word.status === 'aprendido') {
    border = WordComponentStyle.borderLearned;
  } else if (props.word.status === 'revisar') {
    border = WordComponentStyle.borderRevision;
  } else {
    border = WordComponentStyle.borderNoStatus;
  }

  return (
    <View
      style={{
        ...WordComponentStyle.container,
        ...border,
      }}>
      <Text>{props.word.word}</Text>
    </View>
  );
};

export default WordComponent;

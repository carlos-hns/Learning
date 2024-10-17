type WordDTO = {
  id?: number | undefined;
  status: string;
  word: string;
  explanation: string;
  phrases: string[];
};

export default WordDTO;

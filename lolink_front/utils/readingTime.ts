function countKoreanCharacters(text: string): number {
  const koreanPattern = /[\uAC00-\uD7A3]/g;
  const match = text.match(koreanPattern);
  return match ? match.length : 0;
}

function countEnglishWords(text: string): number {
  const englishPattern = /\b[a-zA-Z]+\b/g;
  const match = text.match(englishPattern);
  return match ? match.length : 0;
}

export function calculateReadingTime(text: string): number {
  const koreanCharacters = countKoreanCharacters(text);
  const englishWords = countEnglishWords(text);

  const koreanReadingSpeed = 350; // 1분에 350자
  const englishReadingSpeed = 225; // 1분에 225단어

  const koreanTime = koreanCharacters / koreanReadingSpeed;
  const englishTime = englishWords / englishReadingSpeed;

  return Math.ceil(koreanTime + englishTime);
}
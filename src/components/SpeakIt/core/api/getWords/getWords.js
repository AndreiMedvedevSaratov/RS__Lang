export const getWordsData = (page = 0, group = 0) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;

    const res = fetch(url)
        .then((res) => res.json())
    
    return res;
};


// const getWordsData = (word) => {
//   return fetch(
//       `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${word}&page=1&pageSize=1`
//     )
//     .then((res) => res.json())
//     .then((result) => {
//       return {
//         text: result[0].text,
//         imgSrc: result[0].meanings[0].imageUrl,
//         audioSrc: result[0].meanings[0].soundUrl,
//         textTranslate: result[0].meanings[0].translation.text,
//       };
//     });
// };

// const getDataFromAPI = () => {
//   const dictionaryArray = Object.entries(DICTIONARY);
//   const dataFromAPI = [];

//   dictionaryArray.forEach((element) => {
//     dataFromAPI.push(getWordsData(element[0]));
//     element[1].forEach((item) => {
//       dataFromAPI.push(getWordsData(item));
//     });
//   });

//   Promise.all(dataFromAPI).then((result) => {
//     const resultArr = splitArr(result, 9);
//     localStorage.setItem("wordsData", JSON.stringify(resultArr));
//     renderMainPage(resultArr);
//   });
// };
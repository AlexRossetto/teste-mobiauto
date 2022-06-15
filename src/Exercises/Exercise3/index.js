// faça uma chamada rick and morty api e resgate informações do seguintes personagens (Rick Sanchez (1), Morty Smith (2), Summer Smith (3), Beth Smith (4), Jerry Smith (5))
// e ajustar os dados para que fiquem igual a saida de exemplo.
// API aberta não precisa de token
// Documentação
// https://rickandmortyapi.com/documentation/#rest

// Ex de Saida: [
//   {
//     nome: 'Rick Sanchez',
//     genero: 'Homem',
//     avatar: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
//     especie: 'Humano'
//   },
//   {
//     nome: 'Morty Smith',
//     genero: 'Homem',
//     avatar: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
//     especie: 'Humano'
//   },
//   {
//     nome: 'Summer Smith',
//     genero: 'Mulher',
//     avatar: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
//     especie: 'Humano'
//   },
//   {
//     nome: 'Beth Smith',
//     genero: 'Mulher',
//     avatar: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
//     especie: 'Humano'
//   },
//   {
//     nome: 'Jerry Smith',
//     genero: 'Homem',
//     avatar: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
//     especie: 'Humano'
//   }
// ]


const fetchData = async(url) => {
  try {
   const response = await fetch(url)
   const data = await response.json()
   return data
  } catch (err) {
   return err
  }
 }

async function getRicAndMortyCharacters() {
  const characters = await fetchData('https://rickandmortyapi.com/api/character/1,2,3,4,5');

    const modifiedCharactersArray = characters.map((curr, idx) => {
      curr = { nome: curr.name, genero: curr.gender === 'Female' ? 'Mulher' : 'Homem', avatar: curr.image, especie: curr.species === 'Human' && 'Humano' }
      
      return curr;
    });

  return modifiedCharactersArray;
}

module.exports = getRicAndMortyCharacters;

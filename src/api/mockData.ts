import type { Movie } from '../types';

export const movies: Movie[] = [
  {
    id: 'lotr-1',
    title: 'Володар перснів: Хранителі Персня',
    type: 'movie',
    genre: ['Фентезі', 'Пригоди', 'Драма'],
    releaseYear: 2001,
    director: 'Пітер Джексон',
    description: 'Боязкий гобіт із Ширу та восьмеро його супутників вирушають у подорож, щоб знищити могутній Перстень Влади і врятувати Середзем\'я від Темного Лорда Саурона.',
    rating: 8.8,
    coverUrl: 'https://placehold.co/400x600/1e293b/ffffff?text=LOTR:+Fellowship'
  },
  {
    id: 'lotr-2',
    title: 'Володар перснів: Дві фортеці',
    type: 'movie',
    genre: ['Фентезі', 'Пригоди', 'Драма'],
    releaseYear: 2002,
    director: 'Пітер Джексон',
    description: 'Фродо і Сем продовжують свій шлях до Мордору, в той час як Арагорн, Леголас і Гімлі переслідують орків, щоб врятувати Меррі і Піппіна.',
    rating: 8.7,
    coverUrl: 'https://placehold.co/400x600/1e293b/ffffff?text=LOTR:+Two+Towers'
  },
  {
    id: 'lotr-3',
    title: 'Володар перснів: Повернення короля',
    type: 'movie',
    genre: ['Фентезі', 'Пригоди', 'Драма'],
    releaseYear: 2003,
    director: 'Пітер Джексон',
    description: 'Остання битва за Середзем\'я починається. Фродо і Сем з допомогою Ґолума досягають Фатальної Гори, щоб знищити Перстень.',
    rating: 9.0,
    coverUrl: 'https://placehold.co/400x600/1e293b/ffffff?text=LOTR:+Return+King'
  },
  {
    id: 'witcher-1',
    title: 'Відьмак',
    type: 'series',
    genre: ['Фентезі', 'Пригоди', 'Драма'],
    releaseYear: 2019,
    director: 'Алік Сахаров, Шарлотта Брандстрем та ін.',
    description: 'Ґеральт із Рівії, мутований мисливець на монстрів, шукає своє місце у світі, де люди часто виявляються гіршими за звірів.',
    rating: 8.0,
    coverUrl: 'https://placehold.co/400x600/27272a/ffffff?text=The+Witcher'
  },
  {
    id: 'stalker-1',
    title: 'Сталкер',
    type: 'movie',
    genre: ['Сай-фай', 'Трилер', 'Драма'],
    releaseYear: 1979,
    director: 'Андрій Тарковський',
    description: 'Провідник, відомий як Сталкер, веде Письменника і Професора в заборонену Зону, де знаходиться кімната, в якій здійснюються найзаповітніші бажання.',
    rating: 8.1,
    coverUrl: 'https://placehold.co/400x600/3f3f46/ffffff?text=Stalker'
  },
  {
    id: 'death-note-1',
    title: 'Зошит смерті',
    type: 'anime',
    genre: ['Сай-фай', 'Трилер', 'Містика'],
    releaseYear: 2006,
    director: 'Тецуро Аракі',
    description: 'Блискучий старшокласник Лайт Ягамі знаходить таємничий зошит, що дозволяє йому вбивати будь-кого, чиє ім\'я він до нього запише.',
    rating: 8.9,
    coverUrl: 'https://placehold.co/400x600/09090b/ffffff?text=Death+Note'
  }
];

let temp1 = {
  schedId: 1,
  tempId: 1,
  weekStart: new Date('11/13/17'),
  monA: 1,
  monP: 2,
  tuesA: 2,
  tuesP: 2,
  wedsA: 2,
  wedsP: 3,
  thursA: 2,
  thursP: 4,
  friA: 3,
  friP: 5,
  satA: 4,
  satP: 5,
  sunA: 3,
  sunP: 2,
};
let temp2 = {
  schedId: 2,
  tempId: 2,
  weekStart: new Date('11/21/17'),
  monA: 1,
  monP: 2,
  tuesA: 2,
  tuesP: 4,
  wedsA: 2,
  wedsP: 4,
  thursA: 0,
  thursP: 0,
  friA: 3,
  friP: 5,
  satA: 4,
  satP: 5,
  sunA: 3,
  sunP: 2,
};

let schedule = {
  schedId: 1,
  weekStart: new Date('11/13/17'),
  monA: ['Chris'],
  monP: ['Lucas', 'Michael'],
  tuesA: ['Chris', 'Will'],
  tuesP: ['Sophia', 'Christina'],
  wedsA: ['Kastania', 'Chris'],
  wedsP: ['Tevene', 'Will', 'Nia'],
  thursA: ['Chris', 'Kastania'],
  thursP: ['Will', 'Christina', 'Wren', 'HOUSE'],
  friA: ['Chris', 'Lucas', 'Will']
  friP: ['Sophia', 'Tevene', 'Christina', 'Nia', 'Wren'],
  satA: ['Lucas', 'Sophia', 'Christina', 'Nia'],
  satP: ['Sophia', 'Tevene', 'Will', 'Katania', 'Wren'],
  sunA: ['Chris', 'Christina', 'Nia'],
  sunP: ['Will', 'Michael'],
}

let avails = [
  {name: 'Lucas',
  emplId: 1,
  monA: true,
  monP: true,
  tuesA: true,
  tuesP: false,
  wedsA: true,
  wedsP: true,
  thursA: true,
  thursP: false,
  friA: true,
  friP: true,
  satA: true,
  satP: true,
  sunA: false,
  sunP: false,
  },
  {name: 'Michael',
  emplId: 2,
  monA: true,
  monP: true,
  tuesA: true,
  tuesP: true,
  wedsA: false,
  wedsP: false,
  thursA: false,
  thursP: false,
  friA: false,
  friP: false,
  satA: false,
  satP: false,
  sunA: true,
  sunP: true,
  },
  {name: 'Sophia',
  emplId: 3,
  monA: false,
  monP: false,
  tuesA: false,
  tuesP: true,
  wedsA: false,
  wedsP: true,
  thursA: false,
  thursP: true,
  friA: true,
  friP: true,
  satA: true,
  satP: true,
  sunA: false,
  sunP: false,
  },
  {name: 'Tevene',
  emplId: 4,
  monA: false,
  monP: false,
  tuesA: false,
  tuesP: false,
  wedsA: true,
  wedsP: true,
  thursA: false,
  thursP: false,
  friA: true,
  friP: true,
  satA: true,
  satP: true,
  sunA: true,
  sunP: true,
  },
  {name: 'Will',
  emplId: 5,
  monA: true,
  monP: true,
  tuesA: true,
  tuesP: true,
  wedsA: true,
  wedsP: false,
  thursA: true,
  thursP: true,
  friA: true,
  friP: true,
  satA: true,
  satP: true,
  sunA: false,
  sunP: true,
  },
  {name: 'Christina',
  emplId: 6,
  monA: true,
  monP: true,
  tuesA: true,
  tuesP: true,
  wedsA: true,
  wedsP: true,
  thursA: true,
  thursP: true,
  friA: true,
  friP: true,
  satA: true,
  satP: true,
  sunA: true,
  sunP: true,
  },
  {name: 'Nia',
  emplId: 7,
  monA: true,
  monP: true,
  tuesA: true,
  tuesP: true,
  wedsA: true,
  wedsP: true,
  thursA: true,
  thursP: false,
  friA: true,
  friP: true,
  satA: true,
  satP: false,
  sunA: true,
  sunP: true,
  },
  {name: 'Kastania',
  emplId: 8,
  monA: true,
  monP: true,
  tuesA: true,
  tuesP: false,
  wedsA: true,
  wedsP: true,
  thursA: true,
  thursP: false,
  friA: true,
  friP: true,
  satA: true,
  satP: true,
  sunA: false,
  sunP: false,
  },
  {name: 'Chris',
  emplId: 9,
  monA: true,
  monP: false,
  tuesA: true,
  tuesP: false,
  wedsA: true,
  wedsP: false,
  thursA: true,
  thursP: false,
  friA: true,
  friP: false,
  satA: true,
  satP: true,
  sunA: true,
  sunP: false,
  },
  {name: 'Wren',
  emplId: 10,
  monA: true,
  monP: true,
  tuesA: true,
  tuesP: false,
  wedsA: true,
  wedsP: true,
  thursA: true,
  thursP: true,
  friA: true,
  friP: true,
  satA: true,
  satP: true,
  sunA: false,
  sunP: false,
  },
];
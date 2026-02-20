const quizzes = {
  1: [
    {
      question: 'O que as linhas de latitude medem?',
      options: [
        'Distância leste-oeste de Greenwich',
        'Distância norte-sul do Equador',
        'A altitude de um lugar',
        'A distância até o centro da Terra',
      ],
      correct: 1,
      explanation: 'As linhas de latitude medem a distância angular norte ou sul do Equador, de 0° a 90°.',
    },
    {
      question: 'Qual é a latitude do Equador?',
      options: ['90°', '45°', '0°', '180°'],
      correct: 2,
      explanation: 'O Equador é a linha de referência da latitude, localizada a 0°.',
    },
    {
      question: 'O Trópico de Capricórnio está em qual latitude?',
      options: ['23,5°N', '23,5°S', '66,5°S', '0°'],
      correct: 1,
      explanation: 'O Trópico de Capricórnio está a 23,5° ao sul do Equador.',
    },
    {
      question: 'Se você está a 45°N, em qual hemisfério você está?',
      options: ['Sul', 'Norte', 'Leste', 'Oeste'],
      correct: 1,
      explanation: 'O "N" indica Norte! Qualquer latitude com N está no hemisfério Norte.',
    },
    {
      question: 'A velocidade de rotação da Terra no Equador é de aproximadamente:',
      options: ['500 km/h', '1.000 km/h', '1.670 km/h', '2.500 km/h'],
      correct: 2,
      explanation: 'No Equador, a Terra gira a impressionantes 1.670 km/h!',
    },
  ],
  2: [
    {
      question: 'Qual é o nome da linha de longitude 0°?',
      options: [
        'Equador',
        'Trópico de Câncer',
        'Meridiano de Greenwich',
        'Linha Internacional de Data',
      ],
      correct: 2,
      explanation: 'O Meridiano de Greenwich (0°) passa por Londres e é a referência para todas as longitudes.',
    },
    {
      question: 'As linhas de longitude vão de:',
      options: ['0° a 90°', '0° a 180°', '0° a 360°', '0° a 45°'],
      correct: 1,
      explanation: 'As longitudes vão de 0° (Greenwich) até 180° (Linha Internacional de Data), tanto para leste quanto para oeste.',
    },
    {
      question: 'Em que ano o Meridiano de Greenwich foi escolhido como referência?',
      options: ['1776', '1884', '1900', '1492'],
      correct: 1,
      explanation: 'Em 1884, na Conferência Internacional do Meridiano em Washington, Greenwich foi escolhido.',
    },
    {
      question: 'O que acontece quando você cruza a Linha Internacional de Data (180°)?',
      options: [
        'Nada de especial',
        'Você muda de hemisfério',
        'Você pula ou volta um dia',
        'O clima muda drasticamente',
      ],
      correct: 2,
      explanation: 'Ao cruzar a Linha Internacional de Data, você avança ou retrocede um dia inteiro!',
    },
    {
      question: 'As longitudes a leste de Greenwich são chamadas de:',
      options: ['Longitude Norte', 'Longitude Sul', 'Longitude Leste (E)', 'Longitude Oeste (W)'],
      correct: 2,
      explanation: 'Leste de Greenwich recebe a designação E (East) e Oeste recebe W (West).',
    },
  ],
  3: [
    {
      question: 'Quantos graus de longitude cada fuso horário cobre?',
      options: ['10°', '15°', '20°', '30°'],
      correct: 1,
      explanation: '360° dividido por 24 horas = 15° por fuso horário.',
    },
    {
      question: 'O que significa UTC?',
      options: [
        'Universal Time Clock',
        'Tempo Universal Coordenado',
        'United Time Center',
        'Universal Timer Code',
      ],
      correct: 1,
      explanation: 'UTC significa Tempo Universal Coordenado (Coordinated Universal Time em inglês).',
    },
    {
      question: 'O horário de Brasília é:',
      options: ['UTC+3', 'UTC-3', 'UTC+0', 'UTC-5'],
      correct: 1,
      explanation: 'Brasília está em UTC-3, ou seja, 3 horas atrás de Greenwich.',
    },
    {
      question: 'Qual país usa um fuso horário de UTC+5:45?',
      options: ['Índia', 'China', 'Nepal', 'Japão'],
      correct: 2,
      explanation: 'O Nepal é o único país do mundo que usa UTC+5:45!',
    },
    {
      question: 'Quantos fusos horários a Rússia tem?',
      options: ['5', '8', '11', '24'],
      correct: 2,
      explanation: 'A Rússia, o maior país do mundo, tem incríveis 11 fusos horários!',
    },
  ],
  4: [
    {
      question: 'Como se escreve a coordenada de um lugar no hemisfério Sul e Oeste?',
      options: [
        'Latitude N, Longitude E',
        'Latitude S, Longitude W',
        'Latitude E, Longitude S',
        'Latitude W, Longitude N',
      ],
      correct: 1,
      explanation: 'Sul = S e Oeste = W. Exemplo: São Paulo é 23,5°S, 46,6°W.',
    },
    {
      question: 'Onde fica o ponto 0°N, 0°E?',
      options: [
        'Em Londres',
        'No Polo Norte',
        'No Golfo da Guiné (Oceano Atlântico)',
        'No centro do Brasil',
      ],
      correct: 2,
      explanation: 'O ponto onde Equador e Greenwich se cruzam fica no Golfo da Guiné, perto da costa da África.',
    },
    {
      question: 'Qual é a coordenada aproximada do Cristo Redentor?',
      options: ['48,9°N, 2,3°E', '22,9°S, 43,2°W', '40,7°N, 74,0°W', '29,9°N, 31,1°E'],
      correct: 1,
      explanation: 'O Cristo Redentor está no Rio de Janeiro, a 22,9°S, 43,2°W.',
    },
    {
      question: 'O que significa uma latitude negativa (-23,5)?',
      options: [
        'Está no hemisfério Norte',
        'Está no hemisfério Sul',
        'Está abaixo do nível do mar',
        'A coordenada é inválida',
      ],
      correct: 1,
      explanation: 'Números negativos na latitude indicam Sul, e na longitude indicam Oeste.',
    },
    {
      question: 'Para localizar um ponto exato na Terra, você precisa de:',
      options: [
        'Apenas a latitude',
        'Apenas a longitude',
        'Latitude e longitude juntas',
        'Latitude, longitude e altitude',
      ],
      correct: 2,
      explanation: 'Com latitude e longitude juntas, você define o ponto exato na superfície da Terra!',
    },
  ],
  master: [
    {
      question: 'Qual é a distância em graus entre o Trópico de Câncer e o Trópico de Capricórnio?',
      options: ['23,5°', '47°', '90°', '66,5°'],
      correct: 1,
      explanation: 'Câncer está a 23,5°N e Capricórnio a 23,5°S, totalizando 47° de distância.',
    },
    {
      question: 'Se são 15:00 UTC, que horas são em Brasília (UTC-3)?',
      options: ['18:00', '12:00', '15:00', '9:00'],
      correct: 1,
      explanation: 'Brasília está 3 horas atrás de UTC: 15:00 - 3 = 12:00.',
    },
    {
      question: 'Qual monumento fica mais ao norte?',
      options: [
        'Cristo Redentor (22,9°S)',
        'Torre Eiffel (48,9°N)',
        'Pirâmides do Egito (29,9°N)',
        'Estátua da Liberdade (40,7°N)',
      ],
      correct: 1,
      explanation: 'A Torre Eiffel está a 48,9°N, a latitude mais alta ao norte entre as opções.',
    },
    {
      question: 'A Estação Espacial Internacional orbita a Terra a cada:',
      options: ['45 minutos', '90 minutos', '120 minutos', '24 horas'],
      correct: 1,
      explanation: 'A ISS completa uma órbita a cada 90 minutos, vendo 16 nascer do sol por dia!',
    },
    {
      question: 'Se você está em 0°N, 90°E e anda 90° para o leste, onde você estará em termos de longitude?',
      options: ['180°E', '0°', '90°W', '45°E'],
      correct: 0,
      explanation: '90°E + 90° = 180°E, que é a Linha Internacional de Data!',
    },
    {
      question: 'A China, apesar de seu tamanho, usa quantos fusos horários?',
      options: ['1', '3', '5', '8'],
      correct: 0,
      explanation: 'A China inteira usa apenas 1 fuso horário (UTC+8), apesar de cobrir 5 fusos geográficos!',
    },
    {
      question: 'Qual destes pares de coordenadas está no hemisfério Sul E no hemisfério Oeste?',
      options: [
        '48,9°N, 2,3°E (Paris)',
        '22,9°S, 43,2°W (Rio)',
        '29,9°N, 31,1°E (Cairo)',
        '28,0°N, 86,9°E (Everest)',
      ],
      correct: 1,
      explanation: 'O Rio de Janeiro está a 22,9° Sul (S) e 43,2° Oeste (W).',
    },
    {
      question: 'Se são 12:00 em Tóquio (UTC+9), que horas são em Brasília (UTC-3)?',
      options: ['0:00 (meia-noite)', '3:00', '21:00', '6:00'],
      correct: 0,
      explanation: 'A diferença é de 12 horas (9 + 3 = 12). 12:00 - 12 = 0:00 (meia-noite).',
    },
    {
      question: 'As linhas de latitude são paralelas entre si. As de longitude:',
      options: [
        'Também são paralelas',
        'Se encontram nos polos',
        'São curvas',
        'Só existem no hemisfério norte',
      ],
      correct: 1,
      explanation: 'As linhas de longitude (meridianos) convergem e se encontram nos Polos Norte e Sul.',
    },
    {
      question: 'Qual é o "apelido" do ponto 0°, 0° no oceano?',
      options: ['Ponto Zero', 'Null Island', 'Soul', 'Ground Zero'],
      correct: 2,
      explanation: 'A boia meteorológica no ponto 0°,0° no Golfo da Guiné é chamada de "Soul"!',
    },
  ],
};

export default quizzes;

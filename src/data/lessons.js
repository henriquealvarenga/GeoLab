const lessons = [
  {
    id: 1,
    slug: 'latitude',
    title: 'Latitude — As Linhas Horizontais',
    emoji: '🌍',
    color: '#4FC3F7',
    description: 'Descubra as linhas invisíveis que cortam a Terra de leste a oeste!',
    sections: [
      {
        type: 'intro',
        title: 'O que é Latitude?',
        text: 'Imagine que a Terra é uma laranja gigante. Agora imagine que alguém cortou essa laranja em fatias horizontais, de baixo para cima. Cada corte é uma **linha de latitude**! Elas vão de **0° no Equador** até **90° nos polos**.',
      },
      {
        type: 'diagram',
        diagram: 'LatitudeDiagram',
      },
      {
        type: 'concept',
        title: 'Norte e Sul',
        text: 'As latitudes acima do Equador são **Norte (N)** e as abaixo são **Sul (S)**. O Brasil, por exemplo, está majoritariamente no hemisfério Sul, entre 5°N e 33°S aproximadamente.',
      },
      {
        type: 'concept',
        title: 'Linhas Especiais',
        text: 'Existem linhas de latitude com nomes especiais:\n\n- **Equador (0°)** — Divide a Terra em Norte e Sul\n- **Trópico de Câncer (23,5°N)** — Limite norte dos trópicos\n- **Trópico de Capricórnio (23,5°S)** — Limite sul dos trópicos\n- **Círculo Polar Ártico (66,5°N)** — Início da região polar norte\n- **Círculo Polar Antártico (66,5°S)** — Início da região polar sul',
      },
      {
        type: 'funFact',
        title: 'Curiosidade Espacial',
        text: 'No Equador, a Terra gira a cerca de **1.670 km/h**! Conforme você se move em direção aos polos, a velocidade diminui. Nos polos, você basicamente gira no mesmo lugar!',
      },
    ],
    xpReward: 100,
  },
  {
    id: 2,
    slug: 'longitude',
    title: 'Longitude — As Linhas Verticais',
    emoji: '🌐',
    color: '#FFB74D',
    description: 'Explore as linhas que vão de polo a polo e definem os fusos horários!',
    sections: [
      {
        type: 'intro',
        title: 'O que é Longitude?',
        text: 'Se a latitude são fatias horizontais, a longitude são os **gomos da laranja** — linhas verticais que vão do Polo Norte ao Polo Sul. Elas vão de **0° a 180°** para leste e para oeste.',
      },
      {
        type: 'diagram',
        diagram: 'LongitudeDiagram',
      },
      {
        type: 'concept',
        title: 'Leste e Oeste',
        text: 'A linha de **0° é o Meridiano de Greenwich**, que passa por Londres. Tudo à direita é **Leste (E)** e tudo à esquerda é **Oeste (W)**. Do outro lado do mundo, **180°** é a Linha Internacional de Data.',
      },
      {
        type: 'concept',
        title: 'Por que Greenwich?',
        text: 'Em 1884, representantes de 25 países se reuniram em Washington e escolheram Greenwich como o meridiano principal. Na época, a maioria dos navios já usava mapas baseados em Greenwich, então fez sentido padronizar!',
      },
      {
        type: 'funFact',
        title: 'Curiosidade Espacial',
        text: 'A **Linha Internacional de Data** (180°) é tão maluca que ao cruzá-la, você pode "viajar no tempo"! Se for para oeste, pula um dia inteiro para frente. Se for para leste, volta um dia!',
      },
    ],
    xpReward: 100,
  },
  {
    id: 3,
    slug: 'fusos-horarios',
    title: 'Fusos Horários — O Tempo ao Redor do Mundo',
    emoji: '⏰',
    color: '#CE93D8',
    description: 'Entenda por que quando é dia aqui, é noite do outro lado do mundo!',
    sections: [
      {
        type: 'intro',
        title: 'Por que existem fusos horários?',
        text: 'A Terra gira 360° em 24 horas. Se dividirmos 360 por 24, temos **15°**. Cada fuso horário cobre cerca de 15° de longitude. Quando o Sol está no ponto mais alto em Greenwich (meio-dia), do outro lado do mundo é meia-noite!',
      },
      {
        type: 'diagram',
        diagram: 'TimeZoneDiagram',
      },
      {
        type: 'concept',
        title: 'UTC — O Relógio do Mundo',
        text: 'O **UTC (Tempo Universal Coordenado)** é o "relógio-mestre" do mundo, baseado em Greenwich. O Brasil (horário de Brasília) está em **UTC-3**, ou seja, 3 horas atrás de Greenwich. Tóquio está em **UTC+9**, 9 horas à frente.',
      },
      {
        type: 'concept',
        title: 'Fusos Malucos',
        text: 'Nem todos os fusos são certinhos! Alguns países inventaram seus próprios:\n\n- **Índia** usa UTC+5:30 (meia hora!)\n- **Nepal** usa UTC+5:45 (que ousadia!)\n- **China** inteira usa um único fuso, mesmo sendo enorme\n- **Rússia** tem 11 fusos horários diferentes!',
      },
      {
        type: 'funFact',
        title: 'Curiosidade Espacial',
        text: 'A **Estação Espacial Internacional** orbita a Terra a cada 90 minutos, passando por todos os fusos horários 16 vezes por dia! Por isso, os astronautas usam UTC como horário oficial.',
      },
    ],
    xpReward: 100,
  },
  {
    id: 4,
    slug: 'coordenadas',
    title: 'Coordenadas — O Endereço de Qualquer Lugar',
    emoji: '📍',
    color: '#81C784',
    description: 'Aprenda a localizar qualquer ponto do planeta com precisão!',
    sections: [
      {
        type: 'intro',
        title: 'O GPS da Antiguidade',
        text: 'Combinando **latitude** e **longitude**, você pode encontrar qualquer lugar na Terra! É como um jogo de batalha naval — uma coordenada diz a linha e a outra diz a coluna. Juntas, elas te dão o ponto exato.',
      },
      {
        type: 'diagram',
        diagram: 'CoordinatesDiagram',
      },
      {
        type: 'concept',
        title: 'Como ler coordenadas',
        text: 'Uma coordenada é escrita assim: **23.5°S, 46.6°W** (São Paulo!)\n\n- O primeiro número é a **latitude** (N ou S)\n- O segundo é a **longitude** (E ou W)\n\nAlguns sistemas usam números negativos: Sul e Oeste são negativos. Então São Paulo seria: **-23.5, -46.6**',
      },
      {
        type: 'concept',
        title: 'Lugares Famosos',
        text: '- **Cristo Redentor**: 22.9°S, 43.2°W\n- **Torre Eiffel**: 48.9°N, 2.3°E\n- **Pirâmides do Egito**: 29.9°N, 31.1°E\n- **Estátua da Liberdade**: 40.7°N, 74.0°W\n- **Monte Everest**: 28.0°N, 86.9°E',
      },
      {
        type: 'funFact',
        title: 'Curiosidade Espacial',
        text: 'O ponto **0°N, 0°E** (onde Equador e Greenwich se cruzam) fica no **Golfo da Guiné**, no Oceano Atlântico, perto da costa da África. Não há nada lá além de água — mas existe uma boia meteorológica chamada "Soul" nesse ponto!',
      },
    ],
    xpReward: 100,
  },
];

export default lessons;

const DEFAULT_LOCATION = {
    label: 'Одесса, Украина',
    lat: 46.4825,
    lon: 30.7233,
    tzOffset: 2
};

const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search';
const SEARCH_MIN_CHARS = 3;
const SEARCH_DEBOUNCE_MS = 400;

const PLANETS = [
    { key: 'sun', name: 'Sun' },
    { key: 'moon', name: 'Moon' },
    { key: 'mercury', name: 'Mercury' },
    { key: 'venus', name: 'Venus' },
    { key: 'mars', name: 'Mars' },
    { key: 'jupiter', name: 'Jupiter' },
    { key: 'saturn', name: 'Saturn' }
];

const SIGNS = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces'
];

const SIGN_RULERS = {
    Aries: 'Mars',
    Taurus: 'Venus',
    Gemini: 'Mercury',
    Cancer: 'Moon',
    Leo: 'Sun',
    Virgo: 'Mercury',
    Libra: 'Venus',
    Scorpio: 'Mars',
    Sagittarius: 'Jupiter',
    Capricorn: 'Saturn',
    Aquarius: 'Saturn',
    Pisces: 'Jupiter'
};

const ORBITAL_ELEMENTS = {
    mercury: {
        N: [48.3313, 3.24587e-5],
        i: [7.0047, 5.0e-8],
        w: [29.1241, 1.01444e-5],
        a: [0.387098, 0],
        e: [0.205635, 5.59e-10],
        M: [168.6562, 4.0923344368]
    },
    venus: {
        N: [76.6799, 2.46590e-5],
        i: [3.3946, 2.75e-8],
        w: [54.8910, 1.38374e-5],
        a: [0.72333, 0],
        e: [0.006773, -1.302e-9],
        M: [48.0052, 1.6021302244]
    },
    earth: {
        N: [0, 0],
        i: [0, 0],
        w: [282.9404, 4.70935e-5],
        a: [1.0, 0],
        e: [0.016709, -1.151e-9],
        M: [356.0470, 0.9856002585]
    },
    mars: {
        N: [49.5574, 2.11081e-5],
        i: [1.8497, -1.78e-8],
        w: [286.5016, 2.92961e-5],
        a: [1.523688, 0],
        e: [0.093405, 2.516e-9],
        M: [18.6021, 0.5240207766]
    },
    jupiter: {
        N: [100.4542, 2.76854e-5],
        i: [1.303, -1.557e-7],
        w: [273.8777, 1.64505e-5],
        a: [5.20256, 0],
        e: [0.048498, 4.469e-9],
        M: [19.8950, 0.0830853001]
    },
    saturn: {
        N: [113.6634, 2.38980e-5],
        i: [2.4886, -1.081e-7],
        w: [339.3939, 2.97661e-5],
        a: [9.55475, 0],
        e: [0.055546, -9.499e-9],
        M: [316.9670, 0.0334442282]
    }
};

const ASPECTS = [
    { name: 'Conjunction', angle: 0, orb: 5 },
    { name: 'Opposition', angle: 180, orb: 5 },
    { name: 'Trine', angle: 120, orb: 5 },
    { name: 'Square', angle: 90, orb: 5 },
    { name: 'Sextile', angle: 60, orb: 5 }
];

const ASPECT_LABELS = {
    Conjunction: 'Соединение',
    Opposition: 'Оппозиция',
    Trine: 'Трин',
    Square: 'Квадрат',
    Sextile: 'Секстиль'
};

const ASPECT_POLARITY = {
    Conjunction: '0',
    Opposition: '-',
    Trine: '+',
    Square: '-',
    Sextile: '+'
};

const DOMICILES = {
    Sun: ['Leo'],
    Moon: ['Cancer'],
    Mercury: ['Gemini', 'Virgo'],
    Venus: ['Taurus', 'Libra'],
    Mars: ['Aries', 'Scorpio'],
    Jupiter: ['Sagittarius', 'Pisces'],
    Saturn: ['Capricorn', 'Aquarius']
};

const EXALTATIONS = {
    Sun: 'Aries',
    Moon: 'Taurus',
    Mercury: 'Virgo',
    Venus: 'Pisces',
    Mars: 'Capricorn',
    Jupiter: 'Cancer',
    Saturn: 'Libra'
};

const SIGN_OPPOSITES = {
    Aries: 'Libra',
    Taurus: 'Scorpio',
    Gemini: 'Sagittarius',
    Cancer: 'Capricorn',
    Leo: 'Aquarius',
    Virgo: 'Pisces',
    Libra: 'Aries',
    Scorpio: 'Taurus',
    Sagittarius: 'Gemini',
    Capricorn: 'Cancer',
    Aquarius: 'Leo',
    Pisces: 'Virgo'
};

const PTOLEMY_TERMS = {
    Aries: [
        { end: 6, ruler: 'Jupiter' },
        { end: 14, ruler: 'Venus' },
        { end: 21, ruler: 'Mercury' },
        { end: 26, ruler: 'Mars' },
        { end: 30, ruler: 'Saturn' }
    ],
    Taurus: [
        { end: 8, ruler: 'Venus' },
        { end: 15, ruler: 'Mercury' },
        { end: 22, ruler: 'Jupiter' },
        { end: 27, ruler: 'Saturn' },
        { end: 30, ruler: 'Mars' }
    ],
    Gemini: [
        { end: 7, ruler: 'Mercury' },
        { end: 14, ruler: 'Jupiter' },
        { end: 21, ruler: 'Venus' },
        { end: 25, ruler: 'Saturn' },
        { end: 30, ruler: 'Mars' }
    ],
    Cancer: [
        { end: 7, ruler: 'Mars' },
        { end: 13, ruler: 'Venus' },
        { end: 19, ruler: 'Mercury' },
        { end: 26, ruler: 'Jupiter' },
        { end: 30, ruler: 'Saturn' }
    ],
    Leo: [
        { end: 6, ruler: 'Jupiter' },
        { end: 13, ruler: 'Venus' },
        { end: 20, ruler: 'Mercury' },
        { end: 27, ruler: 'Saturn' },
        { end: 30, ruler: 'Mars' }
    ],
    Virgo: [
        { end: 7, ruler: 'Mercury' },
        { end: 13, ruler: 'Venus' },
        { end: 18, ruler: 'Jupiter' },
        { end: 24, ruler: 'Saturn' },
        { end: 30, ruler: 'Mars' }
    ],
    Libra: [
        { end: 6, ruler: 'Saturn' },
        { end: 14, ruler: 'Venus' },
        { end: 21, ruler: 'Jupiter' },
        { end: 28, ruler: 'Mercury' },
        { end: 30, ruler: 'Mars' }
    ],
    Scorpio: [
        { end: 7, ruler: 'Mars' },
        { end: 13, ruler: 'Venus' },
        { end: 19, ruler: 'Mercury' },
        { end: 24, ruler: 'Jupiter' },
        { end: 30, ruler: 'Saturn' }
    ],
    Sagittarius: [
        { end: 12, ruler: 'Jupiter' },
        { end: 17, ruler: 'Venus' },
        { end: 21, ruler: 'Mercury' },
        { end: 26, ruler: 'Saturn' },
        { end: 30, ruler: 'Mars' }
    ],
    Capricorn: [
        { end: 7, ruler: 'Mercury' },
        { end: 14, ruler: 'Jupiter' },
        { end: 22, ruler: 'Venus' },
        { end: 26, ruler: 'Saturn' },
        { end: 30, ruler: 'Mars' }
    ],
    Aquarius: [
        { end: 7, ruler: 'Mercury' },
        { end: 13, ruler: 'Venus' },
        { end: 20, ruler: 'Jupiter' },
        { end: 25, ruler: 'Saturn' },
        { end: 30, ruler: 'Mars' }
    ],
    Pisces: [
        { end: 12, ruler: 'Venus' },
        { end: 19, ruler: 'Jupiter' },
        { end: 24, ruler: 'Mercury' },
        { end: 27, ruler: 'Mars' },
        { end: 30, ruler: 'Saturn' }
    ]
};

const PTOLEMY_FACES = {
    Aries: ['Mars', 'Sun', 'Venus'],
    Taurus: ['Mercury', 'Moon', 'Saturn'],
    Gemini: ['Jupiter', 'Mars', 'Sun'],
    Cancer: ['Venus', 'Mercury', 'Moon'],
    Leo: ['Saturn', 'Jupiter', 'Mars'],
    Virgo: ['Sun', 'Venus', 'Mercury'],
    Libra: ['Moon', 'Saturn', 'Jupiter'],
    Scorpio: ['Mars', 'Sun', 'Venus'],
    Sagittarius: ['Mercury', 'Moon', 'Saturn'],
    Capricorn: ['Jupiter', 'Mars', 'Sun'],
    Aquarius: ['Venus', 'Mercury', 'Moon'],
    Pisces: ['Saturn', 'Jupiter', 'Mars']
};

const STATIONARY_THRESHOLD = 0.1;
const CAZIMI_ORB = 17 / 60;
const COMBUST_ORB = 8.5;
const UNDER_BEAMS_ORB = 17;

const DEFAULT_SUBJECT = {
    key: 'querent',
    label: 'Кверент (вы)',
    house: 1
};

const SUBJECT_RULES = [
    {
        key: 'partner',
        label: 'Партнер / супруг',
        house: 7,
        priority: 3,
        keywords: ['муж', 'жена', 'супруг', 'супруга', 'партнер', 'парень', 'девуш', 'любовник', 'бывш',
            'husband', 'wife', 'spouse', 'partner', 'boyfriend', 'girlfriend', 'ex']
    },
    {
        key: 'child',
        label: 'Ребенок',
        house: 5,
        priority: 3,
        keywords: ['ребен', 'дет', 'сын', 'дочь', 'беремен', 'child', 'son', 'daughter', 'pregnan']
    },
    {
        key: 'mother',
        label: 'Мать',
        house: 10,
        priority: 2,
        keywords: ['мать', 'мама', 'mother', 'mom']
    },
    {
        key: 'father',
        label: 'Отец',
        house: 4,
        priority: 2,
        keywords: ['отец', 'пап', 'father', 'dad']
    },
    {
        key: 'sibling',
        label: 'Брат/сестра',
        house: 3,
        priority: 2,
        keywords: ['брат', 'сестр', 'brother', 'sister', 'sibling']
    },
    {
        key: 'employer',
        label: 'Работодатель / начальство',
        house: 10,
        priority: 2,
        keywords: ['начальник', 'работод', 'директор', 'босс', 'manager', 'boss', 'employer']
    },
    {
        key: 'colleague',
        label: 'Коллега',
        house: 6,
        priority: 1,
        keywords: ['коллег', 'сотрудник', 'coworker', 'colleague']
    },
    {
        key: 'friend',
        label: 'Друг',
        house: 11,
        priority: 1,
        keywords: ['друг', 'подруг', 'friend']
    },
    {
        key: 'neighbor',
        label: 'Сосед',
        house: 3,
        priority: 1,
        keywords: ['сосед', 'neighbor']
    },
    {
        key: 'enemy_secret',
        label: 'Тайный враг',
        house: 12,
        priority: 1,
        keywords: ['тайн', 'подков', 'secret enemy']
    },
    {
        key: 'enemy_open',
        label: 'Противник / враг',
        house: 7,
        priority: 1,
        keywords: ['враг', 'оппонент', 'конкурент', 'opponent', 'enemy']
    },
    {
        key: 'pet',
        label: 'Домашнее животное',
        house: 6,
        priority: 1,
        keywords: ['животн', 'кот', 'собак', 'pet', 'dog', 'cat']
    }
];

const TOPIC_RULES = [
    {
        key: 'relationship',
        label: 'Отношения / партнерство',
        house: 7,
        priority: 2,
        keywords: ['отношен', 'любов', 'брак', 'развод', 'женить', 'свадьб', 'relationship', 'marriage', 'divorc',
            'dating']
    },
    {
        key: 'money',
        label: 'Деньги / доход',
        house: 2,
        priority: 2,
        keywords: ['деньг', 'доход', 'зарплат', 'прибыл', 'финанс', 'кредит', 'долг', 'ипотек', 'salary', 'income',
            'money', 'loan', 'debt', 'profit']
    },
    {
        key: 'property',
        label: 'Недвижимость / дом',
        house: 4,
        priority: 2,
        keywords: ['дом', 'квартир', 'недвиж', 'земл', 'жиль', 'ипотек', 'house', 'home', 'property', 'estate']
    },
    {
        key: 'career',
        label: 'Работа / карьера',
        house: 10,
        priority: 2,
        keywords: ['работ', 'карьер', 'должност', 'бизнес', 'job', 'career', 'position', 'company']
    },
    {
        key: 'health',
        label: 'Здоровье / болезнь',
        house: 6,
        priority: 2,
        keywords: ['здоров', 'болезн', 'врач', 'операц', 'health', 'illness', 'sick']
    },
    {
        key: 'children',
        label: 'Дети / беременность',
        house: 5,
        priority: 2,
        keywords: ['дет', 'ребен', 'беремен', 'pregnan', 'child']
    },
    {
        key: 'travel_short',
        label: 'Короткие поездки',
        house: 3,
        priority: 1,
        keywords: ['поездк', 'дорог', 'командир', 'travel', 'trip']
    },
    {
        key: 'travel_long',
        label: 'Дальние поездки / заграница',
        house: 9,
        priority: 2,
        keywords: ['загран', 'эмигр', 'переезд', 'дальн', 'abroad', 'emigr', 'immigr', 'relocat'],
        phrases: ['за границ']
    },
    {
        key: 'education',
        label: 'Образование / высшее обучение',
        house: 9,
        priority: 1,
        keywords: ['учеб', 'универс', 'экзам', 'образован', 'education', 'university', 'exam']
    },
    {
        key: 'friends',
        label: 'Друзья / сообщества',
        house: 11,
        priority: 1,
        keywords: ['друз', 'подруг', 'friend', 'group', 'сообществ', 'команда']
    },
    {
        key: 'legal',
        label: 'Суд / конфликт',
        house: 7,
        priority: 2,
        keywords: ['суд', 'иск', 'разбират', 'юрист', 'legal', 'court', 'lawsuit']
    },
    {
        key: 'inheritance',
        label: 'Наследство / смерть',
        house: 8,
        priority: 2,
        keywords: ['наслед', 'смерт', 'страхов', 'death', 'inherit']
    }
];

function pad2(value) {
    return String(value).padStart(2, '0');
}

function degToRad(deg) {
    return deg * Math.PI / 180;
}

function radToDeg(rad) {
    return rad * 180 / Math.PI;
}

function normalizeDegrees(deg) {
    let value = deg % 360;
    if (value < 0) {
        value += 360;
    }
    return value;
}

function signedAngleDiff(fromDeg, toDeg) {
    let diff = normalizeDegrees(toDeg - fromDeg);
    if (diff > 180) {
        diff -= 360;
    }
    return diff;
}

function formatOffset(offsetHours) {
    const sign = offsetHours >= 0 ? '+' : '-';
    const abs = Math.abs(offsetHours);
    const hours = Math.floor(abs);
    const minutes = Math.round((abs - hours) * 60);
    const minutesPart = minutes ? `:${pad2(minutes)}` : '';
    return `UTC${sign}${hours}${minutesPart}`;
}

function getDefaultDateTime(offsetHours) {
    const localMillis = Date.now() + offsetHours * 3600 * 1000;
    const localDate = new Date(localMillis);
    return `${localDate.getUTCFullYear()}-${pad2(localDate.getUTCMonth() + 1)}-${pad2(localDate.getUTCDate())}` +
        `T${pad2(localDate.getUTCHours())}:${pad2(localDate.getUTCMinutes())}`;
}

function formatCoordinate(value) {
    return Number(value).toFixed(5);
}

function buildNominatimUrl(query) {
    const url = new URL(NOMINATIM_SEARCH_URL);
    url.searchParams.set('format', 'jsonv2');
    url.searchParams.set('limit', '6');
    url.searchParams.set('q', query);
    url.searchParams.set('addressdetails', '1');
    url.searchParams.set('accept-language', 'ru');
    return url.toString();
}

function mapNominatimResult(result) {
    return {
        name: result.display_name,
        lat: Number(result.lat),
        lon: Number(result.lon)
    };
}

function parseDateTimeLocal(value, offsetHours) {
    if (!value) {
        return null;
    }
    const parts = value.split('T');
    if (parts.length !== 2) {
        return null;
    }
    const datePart = parts[0];
    const timePart = parts[1];
    const [year, month, day] = datePart.split('-').map(Number);
    const timeParts = timePart.split(':').map(Number);
    const hour = timeParts[0];
    const minute = timeParts[1] ?? 0;
    const second = timeParts[2] ?? 0;
    if ([year, month, day, hour, minute, second].some((num) => Number.isNaN(num))) {
        return null;
    }
    const offsetMinutes = Math.round(offsetHours * 60);
    const utcMillis = Date.UTC(year, month - 1, day, hour, minute, second) - offsetMinutes * 60 * 1000;
    return new Date(utcMillis);
}

function formatUtc(date) {
    return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())} ` +
        `${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}`;
}

function formatLocal(date, offsetHours) {
    const localMillis = date.getTime() + offsetHours * 3600 * 1000;
    const localDate = new Date(localMillis);
    return `${localDate.getUTCFullYear()}-${pad2(localDate.getUTCMonth() + 1)}-${pad2(localDate.getUTCDate())} ` +
        `${pad2(localDate.getUTCHours())}:${pad2(localDate.getUTCMinutes())}`;
}

function formatDegrees(value) {
    return `${value.toFixed(2)}°`;
}

function formatSignedDegrees(value) {
    const sign = value >= 0 ? '+' : '-';
    return `${sign}${Math.abs(value).toFixed(2)}°`;
}

function getAspectLabel(name) {
    return ASPECT_LABELS[name] || name;
}

function getAspectPolarity(name) {
    return ASPECT_POLARITY[name] || '0';
}

function getAspectPolarityLabel(symbol) {
    if (symbol === '+') {
        return 'Плюс';
    }
    if (symbol === '-') {
        return 'Минус';
    }
    return 'Нейтральный';
}

function summarizePolarity(symbols) {
    const summary = {
        plus: 0,
        minus: 0,
        neutral: 0,
        total: symbols.length
    };
    symbols.forEach((symbol) => {
        if (symbol === '+') {
            summary.plus += 1;
        } else if (symbol === '-') {
            summary.minus += 1;
        } else {
            summary.neutral += 1;
        }
    });
    if (summary.plus > summary.minus) {
        summary.verdict = 'Преобладают положительные (+)';
    } else if (summary.minus > summary.plus) {
        summary.verdict = 'Преобладают отрицательные (-)';
    } else if (summary.total === 0) {
        summary.verdict = 'Аспекты отсутствуют';
    } else {
        summary.verdict = 'Баланс + и -';
    }
    return summary;
}

function buildPolarityVerdict(primarySummary, fallbackSummary) {
    const usePrimary = primarySummary.total > 0;
    const summary = usePrimary ? primarySummary : fallbackSummary;
    const scope = usePrimary ? 'ключевым аспектам' : 'всем аспектам';
    if (summary.total === 0) {
        return {
            scope,
            summary,
            text: 'Итог: аспектов в орбе 5° нет, вывод по знаку аспектов сделать нельзя.'
        };
    }
    return {
        scope,
        summary,
        text: `Итог по ${scope}: ${summary.verdict}.`
    };
}

function oppositeSign(sign) {
    return SIGN_OPPOSITES[sign];
}

function getTermRuler(sign, degree) {
    const terms = PTOLEMY_TERMS[sign];
    if (!terms) {
        return null;
    }
    for (let i = 0; i < terms.length; i += 1) {
        if (degree <= terms[i].end) {
            return terms[i].ruler;
        }
    }
    return terms[terms.length - 1].ruler;
}

function getFaceRuler(sign, degree) {
    const faces = PTOLEMY_FACES[sign];
    if (!faces) {
        return null;
    }
    const index = Math.min(2, Math.max(0, Math.floor(degree / 10)));
    return faces[index];
}

function getHouseStrength(house) {
    if ([1, 4, 7, 10].includes(house)) {
        return 'Угловая';
    }
    if ([2, 5, 8, 11].includes(house)) {
        return 'Сукцедентная';
    }
    return 'Падающая';
}

function getEssentialDignity(planetName, lon) {
    const sign = longitudeToSign(lon).sign;
    const domiciles = DOMICILES[planetName] || [];
    const exaltation = EXALTATIONS[planetName] || null;
    if (domiciles.includes(sign)) {
        return { status: 'Обитель', sign };
    }
    if (exaltation === sign) {
        return { status: 'Экзальтация', sign };
    }
    if (domiciles.some((domicile) => oppositeSign(domicile) === sign)) {
        return { status: 'Изгнание', sign };
    }
    if (exaltation && oppositeSign(exaltation) === sign) {
        return { status: 'Падение', sign };
    }
    return { status: 'Без достоинств', sign };
}

function formatRulerCell(planetName, ruler) {
    if (!ruler) {
        return '—';
    }
    return planetName === ruler ? `${ruler} (свой)` : ruler;
}

function getReceptionTypes(sign, degree, planetName) {
    const types = [];
    const domiciles = DOMICILES[planetName] || [];
    const exaltation = EXALTATIONS[planetName] || null;
    if (domiciles.includes(sign)) {
        types.push('Обитель');
    }
    if (exaltation === sign) {
        types.push('Экзальтация');
    }
    if (domiciles.some((domicile) => oppositeSign(domicile) === sign)) {
        types.push('Изгнание');
    }
    if (exaltation && oppositeSign(exaltation) === sign) {
        types.push('Падение');
    }
    const termRuler = getTermRuler(sign, degree);
    if (termRuler === planetName) {
        types.push('Терм');
    }
    const faceRuler = getFaceRuler(sign, degree);
    if (faceRuler === planetName) {
        types.push('Фас');
    }
    return types.length ? types : ['Нет'];
}

function angularDistance(a, b) {
    const diff = normalizeDegrees(a - b);
    return diff > 180 ? 360 - diff : diff;
}

function getSunCondition(planetName, planetLon, sunLon) {
    if (planetName === 'Sun') {
        return '—';
    }
    const distance = angularDistance(planetLon, sunLon);
    if (distance <= CAZIMI_ORB) {
        return 'Казими';
    }
    if (distance <= COMBUST_ORB) {
        return 'Сожжение';
    }
    if (distance <= UNDER_BEAMS_ORB) {
        return 'В лучах';
    }
    return 'Свободна';
}

function getMotionStatus(dailyMotion) {
    if (Math.abs(dailyMotion) <= STATIONARY_THRESHOLD) {
        return { label: 'Стационарная', short: 'С' };
    }
    if (dailyMotion < 0) {
        return { label: 'Ретроградная', short: 'Р' };
    }
    return { label: 'Директная', short: 'Д' };
}

function julianDay(date) {
    const year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = date.getUTCSeconds() + date.getUTCMilliseconds() / 1000;
    let y = year;
    let m = month;
    if (m <= 2) {
        y -= 1;
        m += 12;
    }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    const dayFraction = (hour + (minute + second / 60) / 60) / 24;
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + dayFraction + B - 1524.5;
}

function elementsAt(key, d) {
    const base = ORBITAL_ELEMENTS[key];
    return {
        N: base.N[0] + base.N[1] * d,
        i: base.i[0] + base.i[1] * d,
        w: base.w[0] + base.w[1] * d,
        a: base.a[0] + base.a[1] * d,
        e: base.e[0] + base.e[1] * d,
        M: base.M[0] + base.M[1] * d
    };
}

function solveKepler(Mdeg, e) {
    const M = degToRad(normalizeDegrees(Mdeg));
    let E = M;
    for (let i = 0; i < 10; i += 1) {
        const delta = E - e * Math.sin(E) - M;
        E -= delta / (1 - e * Math.cos(E));
    }
    return E;
}

function heliocentricCoordinates(elements) {
    const N = degToRad(elements.N);
    const i = degToRad(elements.i);
    const w = degToRad(elements.w);
    const E = solveKepler(elements.M, elements.e);
    const xv = elements.a * (Math.cos(E) - elements.e);
    const yv = elements.a * (Math.sqrt(1 - elements.e * elements.e) * Math.sin(E));
    const v = Math.atan2(yv, xv);
    const r = Math.sqrt(xv * xv + yv * yv);
    const xh = r * (Math.cos(N) * Math.cos(v + w) - Math.sin(N) * Math.sin(v + w) * Math.cos(i));
    const yh = r * (Math.sin(N) * Math.cos(v + w) + Math.cos(N) * Math.sin(v + w) * Math.cos(i));
    const zh = r * (Math.sin(v + w) * Math.sin(i));
    return { x: xh, y: yh, z: zh };
}

function geocentricFromHelio(helio, earth) {
    const x = helio.x - earth.x;
    const y = helio.y - earth.y;
    const z = helio.z - earth.z;
    const lon = normalizeDegrees(radToDeg(Math.atan2(y, x)));
    const lat = radToDeg(Math.atan2(z, Math.sqrt(x * x + y * y)));
    return { lon, lat };
}

function sunFromEarth(earth) {
    const x = -earth.x;
    const y = -earth.y;
    const z = -earth.z;
    const lon = normalizeDegrees(radToDeg(Math.atan2(y, x)));
    const lat = radToDeg(Math.atan2(z, Math.sqrt(x * x + y * y)));
    return { lon, lat };
}

function moonPosition(jd) {
    const d = jd - 2451545.0;
    const L0 = normalizeDegrees(218.316 + 13.176396 * d);
    const M = normalizeDegrees(134.963 + 13.064993 * d);
    const D = normalizeDegrees(297.85 + 12.190749 * d);
    const F = normalizeDegrees(93.272 + 13.22935 * d);
    const lon = L0
        + 6.289 * Math.sin(degToRad(M))
        + 1.274 * Math.sin(degToRad(2 * D - M))
        + 0.658 * Math.sin(degToRad(2 * D))
        + 0.214 * Math.sin(degToRad(2 * M))
        + 0.11 * Math.sin(degToRad(D));
    const lat = 5.128 * Math.sin(degToRad(F))
        + 0.28 * Math.sin(degToRad(M + F))
        + 0.277 * Math.sin(degToRad(M - F))
        + 0.173 * Math.sin(degToRad(2 * D - F));
    return { lon: normalizeDegrees(lon), lat };
}

function computePlanetPositions(jd) {
    const d0 = jd - 2451543.5;
    const earthHelio = heliocentricCoordinates(elementsAt('earth', d0));
    const positions = {
        sun: sunFromEarth(earthHelio),
        moon: moonPosition(jd)
    };
    ['mercury', 'venus', 'mars', 'jupiter', 'saturn'].forEach((key) => {
        const helio = heliocentricCoordinates(elementsAt(key, d0));
        positions[key] = geocentricFromHelio(helio, earthHelio);
    });
    return positions;
}

function meanObliquity(jd) {
    const T = (jd - 2451545.0) / 36525;
    return 23.439291 - 0.0130042 * T - 1.64e-7 * T * T + 5.04e-7 * T * T * T;
}

function localSiderealTime(jd, longitude) {
    const T = (jd - 2451545.0) / 36525;
    let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000;
    gmst = normalizeDegrees(gmst);
    return normalizeDegrees(gmst + longitude);
}

function cross(a, b) {
    return {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x
    };
}

function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

function normalizeVector(v) {
    const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length
    };
}

function equatorialToEcliptic(v, epsRad) {
    return {
        x: v.x,
        y: v.y * Math.cos(epsRad) + v.z * Math.sin(epsRad),
        z: -v.y * Math.sin(epsRad) + v.z * Math.cos(epsRad)
    };
}

function vectorFromRaDec(raDeg, decDeg) {
    const raRad = degToRad(raDeg);
    const decRad = degToRad(decDeg);
    const cosDec = Math.cos(decRad);
    return {
        x: cosDec * Math.cos(raRad),
        y: cosDec * Math.sin(raRad),
        z: Math.sin(decRad)
    };
}

function northPointVector(latDeg, lstDeg) {
    const phi = degToRad(latDeg);
    const theta = degToRad(lstDeg);
    const zenith = {
        x: Math.cos(phi) * Math.cos(theta),
        y: Math.cos(phi) * Math.sin(theta),
        z: Math.sin(phi)
    };
    const pole = { x: 0, y: 0, z: 1 };
    const meridianNormal = cross(zenith, pole);
    let north = cross(zenith, meridianNormal);
    if (north.z < 0) {
        north = { x: -north.x, y: -north.y, z: -north.z };
    }
    return normalizeVector(north);
}

function regiomontanusHouses(jd, lat, lon) {
    const lst = localSiderealTime(jd, lon);
    const epsRad = degToRad(meanObliquity(jd));
    const north = northPointVector(lat, lst);
    const eclPole = {
        x: 0,
        y: -Math.sin(epsRad),
        z: Math.cos(epsRad)
    };
    const houseAngles = [90, 120, 150, 180, 210, 240, 270, 300, 330, 0, 30, 60];
    return houseAngles.map((angle) => {
        const ra = normalizeDegrees(lst + angle);
        const reference = vectorFromRaDec(ra, 0);
        const planeNormal = cross(north, reference);
        let intersection = normalizeVector(cross(planeNormal, eclPole));
        if (dot(intersection, reference) < 0) {
            intersection = { x: -intersection.x, y: -intersection.y, z: -intersection.z };
        }
        const ecl = equatorialToEcliptic(intersection, epsRad);
        return normalizeDegrees(radToDeg(Math.atan2(ecl.y, ecl.x)));
    });
}

function longitudeToSign(lon) {
    const normalized = normalizeDegrees(lon);
    const index = Math.floor(normalized / 30);
    return {
        sign: SIGNS[index],
        deg: normalized - index * 30
    };
}

function tokenizeQuestion(text) {
    const normalized = (text || '').toLowerCase();
    const tokens = normalized.match(/[a-zа-яё0-9]+/gi) || [];
    return { normalized, tokens };
}

function collectMatches(rule, tokens, normalized) {
    const matches = new Set();
    if (rule.keywords) {
        rule.keywords.forEach((keyword) => {
            if (tokens.some((token) => token.startsWith(keyword))) {
                matches.add(keyword);
            }
        });
    }
    if (rule.phrases) {
        rule.phrases.forEach((phrase) => {
            if (normalized.includes(phrase)) {
                matches.add(phrase);
            }
        });
    }
    return Array.from(matches);
}

function selectRule(rules, tokens, normalized) {
    let best = null;
    rules.forEach((rule) => {
        const matches = collectMatches(rule, tokens, normalized);
        if (!matches.length) {
            return;
        }
        const score = matches.length;
        const priority = rule.priority ?? 0;
        if (!best || score > best.score || (score === best.score && priority > best.priority)) {
            best = {
                rule,
                matches,
                score,
                priority
            };
        }
    });
    return best;
}

function deriveHouse(subjectHouse, baseHouse) {
    return ((subjectHouse - 1 + baseHouse - 1) % 12) + 1;
}

function classifyQuestion(question) {
    const { normalized, tokens } = tokenizeQuestion(question);
    const subjectMatch = selectRule(SUBJECT_RULES, tokens, normalized);
    const topicMatch = selectRule(TOPIC_RULES, tokens, normalized);
    const subject = subjectMatch
        ? { ...subjectMatch.rule, matches: subjectMatch.matches }
        : { ...DEFAULT_SUBJECT, matches: [] };
    const topic = topicMatch
        ? { ...topicMatch.rule, matches: topicMatch.matches }
        : null;
    let questionHouse = subject.house;
    let derivation = `H${subject.house}`;
    if (topic) {
        questionHouse = deriveHouse(subject.house, topic.house);
        derivation = `H${topic.house} from H${subject.house} = H${questionHouse}`;
    } else if (subject.house === 1) {
        derivation = 'No topic matched, using H1 (querent)';
    } else {
        derivation = `No topic matched, using subject house H${subject.house}`;
    }
    return {
        subject,
        topic,
        questionHouse,
        derivation
    };
}

function getHouseInfo(chart, houseNumber) {
    const cusp = chart.houses[houseNumber - 1];
    const sign = longitudeToSign(cusp).sign;
    return {
        house: houseNumber,
        cusp,
        sign,
        ruler: SIGN_RULERS[sign]
    };
}

function findAspectBetween(lonA, lonB) {
    const diff = normalizeDegrees(lonA - lonB);
    const angle = diff > 180 ? 360 - diff : diff;
    let best = null;
    ASPECTS.forEach((aspect) => {
        const delta = Math.abs(angle - aspect.angle);
        if (delta <= aspect.orb && (!best || delta < best.orb)) {
            best = { name: aspect.name, orb: delta, angle: aspect.angle };
        }
    });
    return best;
}

function orbToAspect(lonA, lonB, aspectAngle) {
    const diff = normalizeDegrees(lonA - lonB);
    const angle = diff > 180 ? 360 - diff : diff;
    return Math.abs(angle - aspectAngle);
}

function buildKeyAspectRows(pairs, planetMap) {
    const rows = [];
    const polaritySymbols = [];
    pairs.forEach((pair) => {
        if (pair.planetA === pair.planetB) {
            return;
        }
        const planetA = planetMap.get(pair.planetA);
        const planetB = planetMap.get(pair.planetB);
        if (!planetA || !planetB) {
            return;
        }
        const aspect = findAspectBetween(planetA.longitude, planetB.longitude);
        if (!aspect) {
            return;
        }
        const futureOrb = orbToAspect(planetA.futureLongitude, planetB.futureLongitude, aspect.angle);
        const motion = futureOrb < aspect.orb ? 'Applying' : 'Separating';
        const polaritySymbol = getAspectPolarity(aspect.name);
        const polarityLabel = getAspectPolarityLabel(polaritySymbol);
        polaritySymbols.push(polaritySymbol);
        rows.push([
            pair.labelA,
            pair.labelB,
            getAspectLabel(aspect.name),
            formatDegrees(aspect.orb),
            motion === 'Applying' ? 'Сходящийся' : 'Расходящийся',
            `${polaritySymbol} (${polarityLabel})`
        ]);
    });
    return {
        rows,
        summary: summarizePolarity(polaritySymbols)
    };
}

function buildAllReceptionRows(planets) {
    const rows = [];
    for (let i = 0; i < planets.length; i += 1) {
        for (let j = i + 1; j < planets.length; j += 1) {
            const planetA = planets[i];
            const planetB = planets[j];
            const signAInfo = longitudeToSign(planetA.longitude);
            const signBInfo = longitudeToSign(planetB.longitude);
            const typeAB = getReceptionTypes(signAInfo.sign, signAInfo.deg, planetB.name);
            const typeBA = getReceptionTypes(signBInfo.sign, signBInfo.deg, planetA.name);
            const mutual = typeAB[0] !== 'Нет' && typeBA[0] !== 'Нет' ? 'Да' : 'Нет';
            rows.push([
                `${planetA.name} ↔ ${planetB.name}`,
                signAInfo.sign,
                typeAB.join(', '),
                signBInfo.sign,
                typeBA.join(', '),
                mutual
            ]);
        }
    }
    return rows;
}

function isBetweenZodiac(start, end, value) {
    const span = normalizeDegrees(end - start);
    const rel = normalizeDegrees(value - start);
    return rel >= 0 && rel < span;
}

function houseIndexForLongitude(lon, cusps) {
    for (let i = 0; i < cusps.length; i += 1) {
        const start = cusps[i];
        const end = cusps[(i + 1) % cusps.length];
        if (isBetweenZodiac(start, end, lon)) {
            return i + 1;
        }
    }
    return 12;
}

function formatLongitude(lon) {
    const data = longitudeToSign(lon);
    return `${data.sign} ${formatDegrees(data.deg)}`;
}

function formatLatitude(lat) {
    const sign = lat >= 0 ? '+' : '-';
    return `${sign}${formatDegrees(Math.abs(lat))}`;
}

function createTable(headers, rows, className) {
    const table = document.createElement('table');
    if (className) {
        table.className = className;
    }
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headers.forEach((text) => {
        const th = document.createElement('th');
        th.textContent = text;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    rows.forEach((row) => {
        const tr = document.createElement('tr');
        row.forEach((cell) => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function createSection(title, content) {
    const section = document.createElement('section');
    section.className = 'section';
    const heading = document.createElement('h2');
    heading.textContent = title;
    section.appendChild(heading);
    section.appendChild(content);
    return section;
}

function calculateAspects(planets) {
    const aspects = [];
    for (let i = 0; i < planets.length; i += 1) {
        for (let j = i + 1; j < planets.length; j += 1) {
            const a = planets[i];
            const b = planets[j];
            const diff = normalizeDegrees(a.longitude - b.longitude);
            const angle = diff > 180 ? 360 - diff : diff;
            let bestMatch = null;
            ASPECTS.forEach((aspect) => {
                const delta = Math.abs(angle - aspect.angle);
                if (delta <= aspect.orb && (!bestMatch || delta < bestMatch.orb)) {
                    bestMatch = { type: aspect.name, orb: delta, angle: aspect.angle };
                }
            });
            if (bestMatch) {
                const futureOrb = orbToAspect(a.futureLongitude, b.futureLongitude, bestMatch.angle);
                const applying = futureOrb < bestMatch.orb;
                const polarity = getAspectPolarity(bestMatch.type);
                aspects.push({
                    planetA: a.name,
                    planetB: b.name,
                    type: bestMatch.type,
                    orb: bestMatch.orb,
                    applying,
                    polarity
                });
            }
        }
    }
    aspects.sort((first, second) => first.orb - second.orb);
    return aspects;
}

function calculateHorary(dateUtc, location) {
    const jd = julianDay(dateUtc);
    const houses = regiomontanusHouses(jd, location.lat, location.lon);
    const asc = houses[0];
    const mc = houses[9];
    const positionsNow = computePlanetPositions(jd);
    const positionsFuture = computePlanetPositions(jd + 0.5);
    const planets = PLANETS.map((planet) => {
        const current = positionsNow[planet.key];
        const future = positionsFuture[planet.key];
        const delta = signedAngleDiff(current.lon, future.lon);
        const dailyMotion = delta * 2;
        const motionStatus = getMotionStatus(dailyMotion);
        const house = houseIndexForLongitude(current.lon, houses);
        return {
            name: planet.name,
            longitude: current.lon,
            futureLongitude: future.lon,
            latitude: current.lat,
            retrograde: dailyMotion < 0,
            dailyMotion,
            motionStatus,
            house
        };
    });
    const ascSign = longitudeToSign(asc).sign;
    const descSign = longitudeToSign(normalizeDegrees(asc + 180)).sign;
    const aspects = calculateAspects(planets);
    return {
        jd,
        ascendant: asc,
        midheaven: mc,
        houses,
        planets,
        aspects,
        significators: {
            ascSign,
            ascRuler: SIGN_RULERS[ascSign],
            descSign,
            descRuler: SIGN_RULERS[descSign]
        }
    };
}

function renderResults(container, input, chart) {
    container.innerHTML = '';
    const classification = input.classification;
    const subjectInfo = classification.subject;
    const topicInfo = classification.topic;
    const questionHouse = classification.questionHouse;
    const subjectHouseInfo = getHouseInfo(chart, subjectInfo.house);
    const questionHouseInfo = getHouseInfo(chart, questionHouse);
    const summaryRows = [
        ['Вопрос', input.question || '-'],
        ['Локальное время', formatLocal(input.dateUtc, input.tzOffset)],
        ['UTC', formatUtc(input.dateUtc)],
        ['Смещение UTC', formatOffset(input.tzOffset)],
        ['Локация', input.locationName],
        ['Координаты (lat, lon)', `${input.lat.toFixed(4)}, ${input.lon.toFixed(4)}`],
        ['Юлианская дата', chart.jd.toFixed(5)]
    ];
    const summary = createSection('Сводка', createTable(['Поле', 'Значение'], summaryRows, 'kv-table'));

    const classificationRows = [
        ['Кверент (упр. H1)', chart.significators.ascRuler],
        ['Субъект', `${subjectInfo.label} (H${subjectInfo.house})`],
        ['Совпадения субъекта', subjectInfo.matches.length ? subjectInfo.matches.join(', ') : '-'],
        ['Тема', topicInfo ? `${topicInfo.label} (H${topicInfo.house})` : 'Не определено'],
        ['Совпадения темы', topicInfo && topicInfo.matches.length ? topicInfo.matches.join(', ') : '-'],
        ['Квизит (дом вопроса)', `H${questionHouse}`],
        ['Квизит (упр. H' + questionHouse + ')', questionHouseInfo.ruler],
        ['Производная формула', classification.derivation]
    ];
    const classificationSection = createSection(
        'Классификация (Frawley, производные дома)',
        createTable(['Поле', 'Значение'], classificationRows, 'kv-table')
    );

    const derivedRows = [
        ['Куспид субъекта', `H${subjectHouseInfo.house} ${formatLongitude(subjectHouseInfo.cusp)}`],
        ['Знак субъекта', subjectHouseInfo.sign],
        ['Управитель субъекта', subjectHouseInfo.ruler],
        ['Куспид квизита', `H${questionHouseInfo.house} ${formatLongitude(questionHouseInfo.cusp)}`],
        ['Знак квизита', questionHouseInfo.sign],
        ['Управитель квизита', questionHouseInfo.ruler]
    ];
    const derivedSection = createSection('Детали производных домов', createTable(['Поле', 'Значение'], derivedRows, 'kv-table'));

    const houseRows = chart.houses.map((cusp, index) => [
        `${index + 1}`,
        formatLongitude(cusp)
    ]);
    const housesSection = createSection('Дома (Regiomontanus)', createTable(['Дом', 'Куспид'], houseRows));

    const planetRows = chart.planets.map((planet) => [
        planet.name,
        formatLongitude(planet.longitude),
        formatLatitude(planet.latitude),
        `Дом ${planet.house}`,
        planet.motionStatus.short
    ]);
    const planetsSection = createSection('Планеты', createTable(['Планета', 'Долгота', 'Широта', 'Дом', 'Движение'], planetRows));

    const planetMap = new Map(chart.planets.map((planet) => [planet.name, planet]));
    const sunLon = planetMap.get('Sun') ? planetMap.get('Sun').longitude : null;
    const dignityRows = chart.planets.map((planet) => {
        const signInfo = longitudeToSign(planet.longitude);
        const essential = getEssentialDignity(planet.name, planet.longitude);
        const termRuler = getTermRuler(signInfo.sign, signInfo.deg);
        const faceRuler = getFaceRuler(signInfo.sign, signInfo.deg);
        const houseStrength = getHouseStrength(planet.house);
        const sunCondition = sunLon !== null ? getSunCondition(planet.name, planet.longitude, sunLon) : '—';
        const debilities = [];
        if (planet.motionStatus.label === 'Ретроградная') {
            debilities.push('Ретроградность');
        }
        if (planet.motionStatus.label === 'Стационарная') {
            debilities.push('Стационарность');
        }
        if (sunCondition === 'Сожжение') {
            debilities.push('Сожжение');
        } else if (sunCondition === 'В лучах') {
            debilities.push('В лучах');
        }
        const afflictionText = debilities.length ? debilities.join(', ') : '—';
        return [
            planet.name,
            essential.status,
            formatRulerCell(planet.name, termRuler),
            formatRulerCell(planet.name, faceRuler),
            houseStrength,
            planet.motionStatus.label,
            `${formatSignedDegrees(planet.dailyMotion)}/день`,
            sunCondition,
            afflictionText
        ];
    });
    const dignitySection = createSection(
        'Достоинства и поражения',
        createTable(
            ['Планета', 'Эссенц.', 'Терм', 'Фас', 'Акцидент.', 'Движение', 'Скорость', 'Солнце', 'Поражения'],
            dignityRows
        )
    );

    const significatorRows = [
        ['Знак Asc', chart.significators.ascSign],
        ['Кверент (упр. H1)', chart.significators.ascRuler],
        ['Луна (со-сигнификатор кверента)', 'Moon'],
        [`Субъект (упр. H${subjectHouseInfo.house})`, subjectHouseInfo.ruler],
        [`Квизит (упр. H${questionHouseInfo.house})`, questionHouseInfo.ruler]
    ];
    const significatorsSection = createSection('Сигнификаторы', createTable(['Роль', 'Значение'], significatorRows, 'kv-table'));

    const keyPairs = [
        {
            labelA: 'Кверент (упр. H1)',
            planetA: chart.significators.ascRuler,
            labelB: `Квизит (упр. H${questionHouseInfo.house})`,
            planetB: questionHouseInfo.ruler
        },
        {
            labelA: 'Луна',
            planetA: 'Moon',
            labelB: `Квизит (упр. H${questionHouseInfo.house})`,
            planetB: questionHouseInfo.ruler
        }
    ];
    if (subjectHouseInfo.house !== 1) {
        keyPairs.push({
            labelA: `Субъект (упр. H${subjectHouseInfo.house})`,
            planetA: subjectHouseInfo.ruler,
            labelB: `Квизит (упр. H${questionHouseInfo.house})`,
            planetB: questionHouseInfo.ruler
        });
    }
    const allReceptionRows = buildAllReceptionRows(chart.planets);
    const receptionsContent = allReceptionRows.length
        ? createTable(
            ['Пара', 'Знак A', 'Рецепция A→B', 'Знак B', 'Рецепция B→A', 'Взаимная'],
            allReceptionRows
        )
        : (() => {
            const empty = document.createElement('div');
            empty.textContent = 'Нет данных для рецепций.';
            return empty;
        })();
    const receptionsSection = createSection('Все рецепции', receptionsContent);
    const keyAspectData = buildKeyAspectRows(keyPairs, planetMap);
    const keyAspectsContent = keyAspectData.rows.length
        ? createTable(['Роль A', 'Роль B', 'Аспект', 'Орб', 'Фаза', 'Знак'], keyAspectData.rows)
        : (() => {
            const empty = document.createElement('div');
            empty.textContent = 'Нет мажорных аспектов в орбе 5° между ключевыми сигнификаторами.';
            return empty;
        })();
    const keyAspectsSection = createSection('Ключевые аспекты', keyAspectsContent);
    const keyPolarityRows = [
        ['Плюс (+)', `${keyAspectData.summary.plus}`],
        ['Минус (-)', `${keyAspectData.summary.minus}`],
        ['Нейтральные (0)', `${keyAspectData.summary.neutral}`],
        ['Итог', keyAspectData.summary.verdict]
    ];
    const keyPolaritySection = createSection('Баланс ключевых аспектов', createTable(['Поле', 'Значение'], keyPolarityRows, 'kv-table'));

    const aspectRows = chart.aspects.map((aspect) => [
        aspect.planetA,
        aspect.planetB,
        getAspectLabel(aspect.type),
        formatDegrees(aspect.orb),
        aspect.applying ? 'Сходящийся' : 'Расходящийся',
        `${aspect.polarity} (${getAspectPolarityLabel(aspect.polarity)})`
    ]);
    const aspectsContent = aspectRows.length
        ? createTable(['Планета A', 'Планета B', 'Аспект', 'Орб', 'Фаза', 'Знак'], aspectRows)
        : (() => {
            const empty = document.createElement('div');
            empty.textContent = 'Нет мажорных аспектов в орбе 5°.';
            return empty;
        })();
    const aspectsSection = createSection('Аспекты', aspectsContent);
    const allPolaritySummary = summarizePolarity(chart.aspects.map((aspect) => aspect.polarity));
    const allPolarityRows = [
        ['Плюс (+)', `${allPolaritySummary.plus}`],
        ['Минус (-)', `${allPolaritySummary.minus}`],
        ['Нейтральные (0)', `${allPolaritySummary.neutral}`],
        ['Итог', allPolaritySummary.verdict]
    ];
    const allPolaritySection = createSection('Баланс всех аспектов', createTable(['Поле', 'Значение'], allPolarityRows, 'kv-table'));

    const finalVerdict = buildPolarityVerdict(keyAspectData.summary, allPolaritySummary);
    const verdictBody = document.createElement('div');
    verdictBody.textContent = finalVerdict.text;
    const verdictSection = createSection('Итог по знаку аспектов', verdictBody);

    const note = document.createElement('div');
    note.textContent = 'Примечание: Regiomontanus, орб 5°, высшие планеты исключены, Frawley + производные дома. ' +
        'Эссенциальные: обитель/экзальтация/изгнание/падение + термы/фасы (Птолемей). ' +
        `Сожжение до ${COMBUST_ORB}°, в лучах до ${UNDER_BEAMS_ORB}°, казими до ${CAZIMI_ORB.toFixed(2)}°. ` +
        `Стационарность при |скорости| ≤ ${STATIONARY_THRESHOLD}°/день. ` +
        'Знак аспекта: + (секстиль/трин), - (квадрат/оппозиция), 0 (соединение). ' +
        'Итог по знаку аспектов не учитывает достоинства и рецепции.';
    const noteSection = createSection('Примечания', note);

    container.appendChild(summary);
    container.appendChild(classificationSection);
    container.appendChild(derivedSection);
    container.appendChild(housesSection);
    container.appendChild(planetsSection);
    container.appendChild(dignitySection);
    container.appendChild(significatorsSection);
    container.appendChild(receptionsSection);
    container.appendChild(keyAspectsSection);
    container.appendChild(keyPolaritySection);
    container.appendChild(aspectsSection);
    container.appendChild(allPolaritySection);
    container.appendChild(verdictSection);
    container.appendChild(noteSection);
}

function renderError(container, message) {
    container.innerHTML = '';
    const section = document.createElement('section');
    section.className = 'section';
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    section.appendChild(error);
    container.appendChild(section);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('horary-form');
    const resultsDiv = document.getElementById('results');
    const datetimeInput = document.getElementById('datetime');
    const tzInput = document.getElementById('tz-offset');
    const locationSearchInput = document.getElementById('location-search');
    const locationResults = document.getElementById('location-results');
    const locationSelected = document.getElementById('location-selected');
    const useDefaultButton = document.getElementById('use-default-location');
    const latInput = document.getElementById('latitude');
    const lonInput = document.getElementById('longitude');

    tzInput.value = DEFAULT_LOCATION.tzOffset;
    datetimeInput.value = getDefaultDateTime(DEFAULT_LOCATION.tzOffset);
    latInput.value = formatCoordinate(DEFAULT_LOCATION.lat);
    lonInput.value = formatCoordinate(DEFAULT_LOCATION.lon);
    locationSelected.textContent = `Выбрано: ${DEFAULT_LOCATION.label}`;

    let selectedLocationName = DEFAULT_LOCATION.label;
    let isApplyingLocation = false;
    let searchTimer = null;
    let searchRequestId = 0;

    const clearLocationResults = () => {
        locationResults.innerHTML = '';
        locationResults.classList.remove('open');
    };

    const setSelectedLocation = (label) => {
        selectedLocationName = label;
        locationSelected.textContent = `Выбрано: ${label}`;
    };

    const applyLocation = (location, updateSearchValue) => {
        isApplyingLocation = true;
        latInput.value = formatCoordinate(location.lat);
        lonInput.value = formatCoordinate(location.lon);
        if (updateSearchValue) {
            locationSearchInput.value = location.name;
        }
        setSelectedLocation(location.name);
        isApplyingLocation = false;
    };

    const renderLocationResults = (items, query) => {
        clearLocationResults();
        if (!query || query.length < SEARCH_MIN_CHARS) {
            return;
        }
        if (!items.length) {
            const empty = document.createElement('div');
            empty.className = 'result-item';
            empty.textContent = 'Ничего не найдено.';
            locationResults.appendChild(empty);
            locationResults.classList.add('open');
            return;
        }
        items.forEach((item) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'result-item';
            button.textContent = item.name;
            button.addEventListener('click', () => {
                applyLocation(item, true);
                clearLocationResults();
            });
            locationResults.appendChild(button);
        });
        locationResults.classList.add('open');
    };

    const handleSearch = async (query, requestId) => {
        try {
            const response = await fetch(buildNominatimUrl(query), {
                headers: { Accept: 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Search failed.');
            }
            const data = await response.json();
            if (requestId !== searchRequestId) {
                return;
            }
            const items = Array.isArray(data)
                ? data.map(mapNominatimResult).filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lon))
                : [];
            renderLocationResults(items, query);
        } catch (error) {
            if (requestId !== searchRequestId) {
                return;
            }
            renderLocationResults([], query);
        }
    };

    locationSearchInput.addEventListener('input', () => {
        const query = locationSearchInput.value.trim();
        if (!isApplyingLocation && query.length > 0) {
            setSelectedLocation('Свои координаты');
        }
        if (searchTimer) {
            clearTimeout(searchTimer);
        }
        if (query.length < SEARCH_MIN_CHARS) {
            clearLocationResults();
            return;
        }
        searchRequestId += 1;
        const currentRequest = searchRequestId;
        searchTimer = setTimeout(() => {
            handleSearch(query, currentRequest);
        }, SEARCH_DEBOUNCE_MS);
    });

    locationSearchInput.addEventListener('blur', () => {
        setTimeout(() => {
            clearLocationResults();
        }, 150);
    });

    useDefaultButton.addEventListener('click', () => {
        applyLocation(
            { name: DEFAULT_LOCATION.label, lat: DEFAULT_LOCATION.lat, lon: DEFAULT_LOCATION.lon },
            true
        );
        tzInput.value = DEFAULT_LOCATION.tzOffset;
    });

    const markCustomLocation = () => {
        if (isApplyingLocation) {
            return;
        }
        locationSearchInput.value = '';
        clearLocationResults();
        setSelectedLocation('Свои координаты');
    };

    latInput.addEventListener('input', markCustomLocation);
    lonInput.addEventListener('input', markCustomLocation);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const question = document.getElementById('question').value.trim();
        const tzOffset = parseFloat(tzInput.value);
        const lat = parseFloat(latInput.value);
        const lon = parseFloat(lonInput.value);
        if (!Number.isFinite(tzOffset) || tzOffset < -14 || tzOffset > 14) {
            renderError(resultsDiv, 'Некорректное смещение UTC. Допустимо от -14 до +14.');
            return;
        }
        if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
            renderError(resultsDiv, 'Некорректная широта. Допустимо от -90 до 90.');
            return;
        }
        if (!Number.isFinite(lon) || lon < -180 || lon > 180) {
            renderError(resultsDiv, 'Некорректная долгота. Допустимо от -180 до 180.');
            return;
        }
        const dateUtc = parseDateTimeLocal(datetimeInput.value, tzOffset);
        if (!dateUtc) {
            renderError(resultsDiv, 'Некорректная дата/время.');
            return;
        }
        const chart = calculateHorary(dateUtc, { lat, lon });
        const locationName = selectedLocationName === 'Свои координаты'
            ? 'Свои координаты'
            : (locationSearchInput.value.trim() || selectedLocationName);
        const classification = classifyQuestion(question);
        renderResults(resultsDiv, { question, classification, dateUtc, tzOffset, lat, lon, locationName }, chart);
    });
});
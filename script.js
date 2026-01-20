const DEFAULTS = {
    lat: 46.4825,
    lon: 30.7233,
    tzOffset: 2
};

const PLANETS = [
    { key: 'sun', name: 'Sun' },
    { key: 'moon', name: 'Moon' },
    { key: 'mercury', name: 'Mercury' },
    { key: 'venus', name: 'Venus' },
    { key: 'mars', name: 'Mars' },
    { key: 'jupiter', name: 'Jupiter' },
    { key: 'saturn', name: 'Saturn' },
    { key: 'uranus', name: 'Uranus' },
    { key: 'neptune', name: 'Neptune' },
    { key: 'pluto', name: 'Pluto' }
];

const LUMINARIES = new Set(['Sun', 'Moon']);

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
    },
    uranus: {
        N: [74.0005, 1.3978e-5],
        i: [0.7733, 1.9e-8],
        w: [96.6612, 3.0565e-5],
        a: [19.18171, -1.55e-8],
        e: [0.047318, 7.45e-9],
        M: [142.5905, 0.011725806]
    },
    neptune: {
        N: [131.7806, 3.0173e-5],
        i: [1.77, -2.55e-7],
        w: [272.8461, -6.027e-6],
        a: [30.05826, 3.313e-8],
        e: [0.008606, 2.15e-9],
        M: [260.2471, 0.005995147]
    },
    // Pluto uses a simplified orbital model for horary use.
    pluto: {
        N: [110.30347, 0],
        i: [17.14175, 0],
        w: [113.76329, 0],
        a: [39.48168677, 0],
        e: [0.24880766, 0],
        M: [14.53, 0.00396]
    }
};

const ASPECTS = [
    { name: 'Conjunction', angle: 0, orb: 8 },
    { name: 'Opposition', angle: 180, orb: 8 },
    { name: 'Trine', angle: 120, orb: 6 },
    { name: 'Square', angle: 90, orb: 6 },
    { name: 'Sextile', angle: 60, orb: 4 }
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
    ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].forEach((key) => {
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

function normalizeVector(v) {
    const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length
    };
}

function hourAngle(lstDeg, raDeg) {
    let h = normalizeDegrees(lstDeg - raDeg);
    if (h > 180) {
        h -= 360;
    }
    return h;
}

function equatorialToEcliptic(v, epsRad) {
    return {
        x: v.x,
        y: v.y * Math.cos(epsRad) + v.z * Math.sin(epsRad),
        z: -v.y * Math.sin(epsRad) + v.z * Math.cos(epsRad)
    };
}

function chooseEastIntersection(v1, v2, lstDeg) {
    const ra1 = normalizeDegrees(radToDeg(Math.atan2(v1.y, v1.x)));
    const ra2 = normalizeDegrees(radToDeg(Math.atan2(v2.y, v2.x)));
    const h1 = hourAngle(lstDeg, ra1);
    const h2 = hourAngle(lstDeg, ra2);
    if (h1 < 0 && h2 >= 0) {
        return v1;
    }
    if (h2 < 0 && h1 >= 0) {
        return v2;
    }
    return Math.abs(h1) <= Math.abs(h2) ? v1 : v2;
}

function ascendantLongitude(jd, lat, lon) {
    const lst = localSiderealTime(jd, lon);
    const eps = meanObliquity(jd);
    const theta = degToRad(lst);
    const phi = degToRad(lat);
    const epsRad = degToRad(eps);
    const zenith = {
        x: Math.cos(phi) * Math.cos(theta),
        y: Math.cos(phi) * Math.sin(theta),
        z: Math.sin(phi)
    };
    const eclPole = {
        x: 0,
        y: -Math.sin(epsRad),
        z: Math.cos(epsRad)
    };
    const line = cross(eclPole, zenith);
    const v1 = normalizeVector(line);
    const v2 = { x: -v1.x, y: -v1.y, z: -v1.z };
    const ascVector = chooseEastIntersection(v1, v2, lst);
    const ecl = equatorialToEcliptic(ascVector, epsRad);
    return normalizeDegrees(radToDeg(Math.atan2(ecl.y, ecl.x)));
}

function midheavenLongitude(jd, lon) {
    const lst = localSiderealTime(jd, lon);
    const eps = meanObliquity(jd);
    const theta = degToRad(lst);
    const epsRad = degToRad(eps);
    const mc = radToDeg(Math.atan2(Math.sin(theta), Math.cos(theta) * Math.cos(epsRad)));
    return normalizeDegrees(mc);
}

function equalHouses(ascendant) {
    return Array.from({ length: 12 }, (_, i) => normalizeDegrees(ascendant + i * 30));
}

function longitudeToSign(lon) {
    const normalized = normalizeDegrees(lon);
    const index = Math.floor(normalized / 30);
    return {
        sign: SIGNS[index],
        deg: normalized - index * 30
    };
}

function formatLongitude(lon) {
    const data = longitudeToSign(lon);
    return `${data.sign} ${data.deg.toFixed(2)} deg`;
}

function formatLatitude(lat) {
    const sign = lat >= 0 ? '+' : '-';
    return `${sign}${Math.abs(lat).toFixed(2)} deg`;
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

function aspectOrb(baseOrb, planetA, planetB) {
    if (LUMINARIES.has(planetA) || LUMINARIES.has(planetB)) {
        return baseOrb + 2;
    }
    return baseOrb;
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
                const orb = aspectOrb(aspect.orb, a.name, b.name);
                const delta = Math.abs(angle - aspect.angle);
                if (delta <= orb && (!bestMatch || delta < bestMatch.orb)) {
                    bestMatch = { type: aspect.name, orb: delta };
                }
            });
            if (bestMatch) {
                aspects.push({
                    planetA: a.name,
                    planetB: b.name,
                    type: bestMatch.type,
                    orb: bestMatch.orb
                });
            }
        }
    }
    aspects.sort((first, second) => first.orb - second.orb);
    return aspects;
}

function calculateHorary(dateUtc, location) {
    const jd = julianDay(dateUtc);
    const asc = ascendantLongitude(jd, location.lat, location.lon);
    const mc = midheavenLongitude(jd, location.lon);
    const houses = equalHouses(asc);
    const positionsNow = computePlanetPositions(jd);
    const positionsFuture = computePlanetPositions(jd + 0.5);
    const planets = PLANETS.map((planet) => {
        const current = positionsNow[planet.key];
        const future = positionsFuture[planet.key];
        const delta = signedAngleDiff(current.lon, future.lon);
        const house = Math.floor(normalizeDegrees(current.lon - asc) / 30) + 1;
        return {
            name: planet.name,
            longitude: current.lon,
            latitude: current.lat,
            retrograde: delta < 0,
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
    const summaryRows = [
        ['Question', input.question || '-'],
        ['Local time', formatLocal(input.dateUtc, input.tzOffset)],
        ['UTC time', formatUtc(input.dateUtc)],
        ['UTC offset', formatOffset(input.tzOffset)],
        ['Location (lat, lon)', `${input.lat.toFixed(4)}, ${input.lon.toFixed(4)}`],
        ['Julian day', chart.jd.toFixed(5)]
    ];
    const summary = createSection('Summary', createTable(['Field', 'Value'], summaryRows, 'kv-table'));

    const houseRows = chart.houses.map((cusp, index) => [
        `${index + 1}`,
        formatLongitude(cusp)
    ]);
    const housesSection = createSection('Houses (Equal)', createTable(['House', 'Cusp'], houseRows));

    const planetRows = chart.planets.map((planet) => [
        planet.name,
        formatLongitude(planet.longitude),
        formatLatitude(planet.latitude),
        `House ${planet.house}`,
        planet.retrograde ? 'R' : 'D'
    ]);
    const planetsSection = createSection('Planets', createTable(['Planet', 'Longitude', 'Latitude', 'House', 'Motion'], planetRows));

    const significatorRows = [
        ['Ascendant sign', chart.significators.ascSign],
        ['Ascendant ruler', chart.significators.ascRuler],
        ['Descendant sign', chart.significators.descSign],
        ['Descendant ruler', chart.significators.descRuler],
        ['Moon', 'Co-significator']
    ];
    const significatorsSection = createSection('Significators', createTable(['Role', 'Value'], significatorRows, 'kv-table'));

    const aspectRows = chart.aspects.map((aspect) => [
        aspect.planetA,
        aspect.planetB,
        aspect.type,
        `${aspect.orb.toFixed(2)} deg`
    ]);
    const aspectsContent = aspectRows.length
        ? createTable(['Planet A', 'Planet B', 'Aspect', 'Orb'], aspectRows)
        : (() => {
            const empty = document.createElement('div');
            empty.textContent = 'No major aspects within default orbs.';
            return empty;
        })();
    const aspectsSection = createSection('Aspects', aspectsContent);

    const note = document.createElement('div');
    note.textContent = 'Note: Positions use low-precision analytical ephemerides for horary use.';
    const noteSection = createSection('Notes', note);

    container.appendChild(summary);
    container.appendChild(housesSection);
    container.appendChild(planetsSection);
    container.appendChild(significatorsSection);
    container.appendChild(aspectsSection);
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
    const latInput = document.getElementById('latitude');
    const lonInput = document.getElementById('longitude');

    tzInput.value = DEFAULTS.tzOffset;
    latInput.value = DEFAULTS.lat;
    lonInput.value = DEFAULTS.lon;
    datetimeInput.value = getDefaultDateTime(DEFAULTS.tzOffset);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const question = document.getElementById('question').value.trim();
        const tzOffset = parseFloat(tzInput.value);
        const lat = parseFloat(latInput.value);
        const lon = parseFloat(lonInput.value);
        if (!Number.isFinite(tzOffset) || tzOffset < -14 || tzOffset > 14) {
            renderError(resultsDiv, 'Invalid UTC offset. Use a value between -14 and +14.');
            return;
        }
        if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
            renderError(resultsDiv, 'Invalid latitude. Use a value between -90 and 90.');
            return;
        }
        if (!Number.isFinite(lon) || lon < -180 || lon > 180) {
            renderError(resultsDiv, 'Invalid longitude. Use a value between -180 and 180.');
            return;
        }
        const dateUtc = parseDateTimeLocal(datetimeInput.value, tzOffset);
        if (!dateUtc) {
            renderError(resultsDiv, 'Invalid date/time.');
            return;
        }
        const chart = calculateHorary(dateUtc, { lat, lon });
        renderResults(resultsDiv, { question, dateUtc, tzOffset, lat, lon }, chart);
    });
});
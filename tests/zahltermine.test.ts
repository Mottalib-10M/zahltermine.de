import { describe, it, expect } from 'vitest';
import P from '../src/data/params-2026.json';
import { ostersonntag, ostersonntagMeeus, fromIso, weekday } from '../src/lib/engine/feiertage';
import { renteNach, renteVor, grundsicherung, alg, imVoraus, kindergeld, lebensmonat, bankFeiertage, istBankarbeitstag, zahlungenImZeitraum, ics, letzterBankarbeitstag, bankarbeitstage, istVorschuessig } from '../src/lib/engine/zahltermine';

describe('Ostern und bankfreie Tage', () => {
  it('Ostersonntag nach PTB, gegen Meeus geprüft', () => {
    expect(ostersonntag(2026)).toBe('2026-04-05');
    expect(ostersonntag(2027)).toBe('2027-03-28');
    for (let y = 1900; y <= 2200; y++) expect(ostersonntag(y)).toBe(ostersonntagMeeus(y));
  });
  it('TARGET-Schließtage der EZB 2026 und 2027 sind bankfrei', () => {
    const t = (y: number) => bankFeiertage(y).filter((f) => f.target).map((f) => f.date);
    expect(t(2026)).toEqual(['2026-01-01', '2026-04-03', '2026-04-06', '2026-05-01', '2026-12-25', '2026-12-26']);
    expect(t(2027)).toEqual(['2027-01-01', '2027-03-26', '2027-03-29', '2027-05-01', '2027-12-25', '2027-12-26']);
  });
  it('bundesweite Feiertage 2027 und Silvester', () => {
    expect(bankFeiertage(2027).map((f) => f.date)).toEqual(['2027-01-01', '2027-03-26', '2027-03-29', '2027-05-01', '2027-05-06', '2027-05-17', '2027-10-03', '2027-12-25', '2027-12-26']);
    expect(istBankarbeitstag(fromIso('2026-12-31'))).toBe(true);
    expect(istBankarbeitstag(fromIso('2026-12-24'))).toBe(true);
  });
});

describe('Rente', () => {
  it('reproduziert die Terminliste 2026 der Deutschen Rentenversicherung', () => {
    expect(Array.from({ length: 12 }, (_, i) => renteNach(2026, i + 1))).toEqual(P.rente.tabelle2026);
  });
  it('vor April 2004: Vormonat (Januar 2026 am 31.12.2025)', () => {
    expect(renteVor(2026, 1)).toBe('2025-12-31');
    expect(renteVor(2026, 2)).toBe('2026-01-30');
    expect(renteVor(2027, 1)).toBe('2026-12-31');
    expect(istVorschuessig('2004-03-01')).toBe(true);
    expect(istVorschuessig('2004-04-01')).toBe(false);
  });
  it('2027 nach der Regel', () => {
    expect(Array.from({ length: 12 }, (_, i) => renteNach(2027, i + 1))).toEqual(['2027-01-29', '2027-02-26', '2027-03-31', '2027-04-30', '2027-05-31', '2027-06-30', '2027-07-30', '2027-08-31', '2027-09-30', '2027-10-29', '2027-11-30', '2027-12-31']);
  });
});

describe('Kindergeld', () => {
  it('jeder veröffentlichte Termin ist ein Bankarbeitstag, Endziffern aufsteigend', () => {
    for (const y of [2026, 2027]) for (let m = 1; m <= 12; m++) {
      let prev = '';
      for (let e = 0; e <= 9; e++) {
        const d = kindergeld(y, m, e)!;
        expect(d).toBeTruthy();
        expect([d, istBankarbeitstag(fromIso(d))]).toEqual([d, true]);
        expect(d >= prev).toBe(true); prev = d;
      }
    }
  });
  it('Stichproben aus der Tabelle der Familienkasse', () => {
    expect(kindergeld(2026, 11, 0)).toBe('2026-11-04');
    expect(kindergeld(2026, 12, 9)).toBe('2026-12-16');
    expect(kindergeld(2027, 1, 0)).toBe('2027-01-08');
    expect(kindergeld(2027, 5, 9)).toBe('2027-05-26');
    expect(kindergeld(2028, 1, 0)).toBeNull();
  });
});

describe('Weitere Leistungen', () => {
  it('Grundsicherungsgeld im Voraus', () => {
    expect(grundsicherung(2027, 1)).toBe('2026-12-31');
    expect(grundsicherung(2026, 12)).toBe('2026-11-30');
    expect(grundsicherung(2027, 2)).toBe('2027-01-29'); // 31.1.2027 ist ein Sonntag
    expect(grundsicherung(2026, 11)).toBe('2026-10-30'); // 31.10.2026 ist ein Samstag
  });
  it('Arbeitslosengeld nachträglich', () => {
    expect(alg(2026, 12)).toBe('2027-01-04');
    expect(alg(2026, 10)).toBe('2026-11-02');
    expect(alg(2027, 4)).toBe('2027-05-03');
  });
  it('Wohngeld und BAföG im Voraus', () => { expect(imVoraus(2027, 1)).toBe('2027-01-04'); expect(imVoraus(2026, 12)).toBe('2026-12-01'); });
  it('Lebensmonate', () => {
    expect(lebensmonat('2026-02-15', 1)).toEqual({ von: '2026-02-15', bis: '2026-03-14' });
    expect(lebensmonat('2026-02-15', 2)).toEqual({ von: '2026-03-15', bis: '2026-04-14' });
    expect(lebensmonat('2026-01-31', 1)).toEqual({ von: '2026-01-31', bis: '2026-02-28' });
    expect(lebensmonat('2026-01-31', 2)).toEqual({ von: '2026-03-01', bis: '2026-03-30' });
    expect(lebensmonat('2026-12-01', 1)).toEqual({ von: '2026-12-01', bis: '2026-12-31' });
    for (let k = 1; k < 14; k++) expect(fromIso(lebensmonat('2026-05-31', k + 1).von) - fromIso(lebensmonat('2026-05-31', k).bis)).toBe(1);
  });
  it('Bankarbeitstage', () => { expect(bankarbeitstage(2026, 12)).toBe(22); expect(letzterBankarbeitstag(2027, 10)).toBe('2027-10-29'); expect(weekday(fromIso('2027-10-29'))).toBe(5); });
});

describe('Kalender und Export', () => {
  it('nächste Zahlungen, sortiert', () => {
    const z = zahlungenImZeitraum({ leistungen: ['kindergeld', 'rente', 'grundsicherung'], endziffer: 3 }, '2026-11-01', '2026-12-31');
    expect(z.map((x) => `${x.leistung}:${x.date}`)).toEqual(['kindergeld:2026-11-10', 'rente:2026-11-30', 'grundsicherung:2026-11-30', 'kindergeld:2026-12-08', 'rente:2026-12-31', 'grundsicherung:2026-12-31']);
  });
  it('ICS', () => {
    const s = ics([{ date: '2026-11-30', title: 'Rente, November 2026', uid: 'a@b' }], '2026-10-28');
    expect(s).toContain('DTSTART;VALUE=DATE:20261130');
    expect(s).toContain('DTEND;VALUE=DATE:20261201');
    expect(s).toContain('SUMMARY:Rente\\, November 2026');
    expect(s.split('\r\n').every((l) => l.length <= 75)).toBe(true);
  });
});

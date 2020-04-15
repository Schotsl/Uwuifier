import { uwufyWord, uwufySentence, uwuFace } from '../index';

test('Uwufy a word', () => {
    expect(typeof uwufyWord('Boat')).toBe('string');
    expect(uwufyWord('Trees').length).toBeGreaterThanOrEqual('Trees'.length);
});

test('Uwufy a sentence', () => {
    expect(typeof uwufySentence('Tom handed in a blank test paper.')).toBe('string');
    expect(uwufySentence('I made some mistakes in life').length).toBeGreaterThanOrEqual('Trees'.length);
});

test('Get an uwu face', () => {
    expect(typeof uwuFace()).toBe('string');
});
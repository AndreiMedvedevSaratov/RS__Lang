/* eslint-disable import/prefer-default-export */
import { voiceBtnHandler } from './voiceButtonHandler';
// eslint-disable-next-line import/no-cycle
import { countdownTimer } from './countdownTimer';
import { fetchSprintGameData } from './fetchSprintGameData';
// TODO: что это
import { randomInteger } from '../utils';
import { choiceBtnSoundtracks } from './choiceBtnSoundtracks';

export const startSprintGame = () => {
	fetchSprintGameData(randomInteger(0, 59), randomInteger(0, 5));
	voiceBtnHandler();
	countdownTimer();
	choiceBtnSoundtracks();
};

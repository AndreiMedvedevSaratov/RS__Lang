/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle
import { startSprintGame } from './launchSprintGameMethods';
import { createSprintGamePage } from '../createSprintGamePage';

export const repeatButtonHandler = () => {
	const repeatBtn = document.getElementById('repeat-btn');
	repeatBtn.onclick = () => {
		const root = document.querySelector('.main');
		root.innerHTML = createSprintGamePage();
		startSprintGame();
	};
};

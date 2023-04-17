const refs = {
	aside: document.querySelectorAll('aside'),
	darkModeBtn: document.querySelector('.main-nav__link--dark-mode'),
	navButtons: [...document.querySelectorAll('.main-nav__link')],
	mainSections: document.querySelectorAll('main > section'),
	eduNworkBlocks: document.querySelectorAll('.edu-n-work__wrapper'),
};

refs.navButtons.shift();

window.addEventListener(
	'scroll',
	_.throttle(() => {
		showActiveSection();
	}, 250)
);

refs.darkModeBtn.addEventListener('click', activateDarkMode);

function showActiveSection() {
	const currentBtnIdx = refs.navButtons.findIndex(button =>
		button.classList.contains('main-nav__link--current')
	);

	const breakPoint = window.screen.height / 3;

	const { top: currentSectionTopPos } =
		refs.mainSections[currentBtnIdx].getBoundingClientRect();

	const { bottom: currentSectionBottomPos } =
		refs.mainSections[currentBtnIdx].getBoundingClientRect();

	if (currentSectionBottomPos < breakPoint) {
		refs.navButtons[currentBtnIdx].classList.remove('main-nav__link--current');
		refs.navButtons[currentBtnIdx + 1].classList.add('main-nav__link--current');
	} else if (currentSectionTopPos > breakPoint && currentBtnIdx !== 0) {
		refs.navButtons[currentBtnIdx].classList.remove('main-nav__link--current');
		refs.navButtons[currentBtnIdx - 1].classList.add('main-nav__link--current');
	}
}

function activateDarkMode(e) {
	e.preventDefault();

	if (refs.darkModeBtn.classList.contains('main-nav__link--current')) {
		document.head.lastChild.remove();
	} else {
		const darkModeStyle = document.createElement('link');
		darkModeStyle.rel = 'stylesheet';
		darkModeStyle.href = './assets/css/dark-mode.css';
		document.head.append(darkModeStyle);
	}

	refs.darkModeBtn.classList.toggle('main-nav__link--current');
}

<template>
  <div class="about-wrapper">
    <div class="about">
      <h1>About "Dream Team 42"</h1>
    </div>
    <div class="p1">
      <p>Here is short information about our team. First question is "Why Dream Team 42?</p>
      <p>Answer is simple ))) - "Dream Team" - just because we are Dream Team ))))</p>
      <p>"42" - is just because we are 42 team in the main table</p>
      <p>So let me introduce participants:</p>
    </div>
    <hr>
    <div class="profile-page">
      <div class="avatar">
        <img src="developers[0].profilePicture">
        {{ developers[0].name }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
	name: 'ProfilePage',
	data() {
		return {
			developers: [
				{
					name: 'Maksim Kapustin',
					profilePicture: '../assets/dream-team-photos/Maksim_Kapustin.jpg',
					emailAddress: 'makskapustin90@gmail.com',
					githubAccount: 'https://github.com/TimeOfProgramming',
					telephone: '+7-927-057-34-99',
					about: 'He likes web development and he learn very fast.',
				},
				{
					name: 'Andrei Medvedev',
					profilePicture: '../assets/dream-team-photos/Andrei_Medvedev.jpg',
					emailAddress: 'andreiok@gmail.com',
					githubAccount: 'https://github.com/andreimedvedevsaratov',
					telephone: '+7-917-215-19-68',
					about: `He is fulltime working in Import-Export Company now. Currently he is interesting in development of his 
            skills in Web programming. Computer programming was his dream from school years. But life happens 
            that he worked in other type of jobs. Now he is going to follow his earlier dreams and start to move toward it.`,
				},
				{
					name: 'Nurlan Kurbandurdyev',
					profilePicture:
            '../assets/dream-team-photos/Nurlan_Kurbandurdyev.jpg',
					emailAddress: 'nurlan.wap3@gmail.com',
					githubAccount: 'https://github.com/ggnk',
					telephone: '+7-967-501-81-87',
					about:
            'He use web programming both in his work, for solving various tasks, and as a hobby. He want to become a professional in the field of web technologies.',
				},
				{
					name: 'Alexey Zhumaev',
					profilePicture: '../assets/dream-team-photos/Alexey_Zhumaev.jpg',
					emailAddress: 'alex.zhumaev@mail.ru',
					githubAccount: 'https://github.com/alexey221284',
					telephone: '+7-904-244-04-62',
					about: `His goal is to gain experience and skills in the JavaScript programming language for further employment. 
					His skills are HTML, CSS, the basics of JavaScript, and he also have some experience with the Webix and 1C Bitrix frameworks.`,
				},
				{
					name: 'Pavel Pronchatov',
					profilePicture: '',
					emailAddress: 'pavel.pronchatov155@gmail.ru',
					githubAccount: 'https://github.com/pavelponchatov',
					telephone: '+7-908-554-03-79',
					about: '',
				},
				{
					name: 'Mark Flerko',
					profilePicture: '',
					emailAddress: '',
					githubAccount: 'https://github.com/markflerko',
					telephone: '+375447314001',
					about: '',
				},
				{
					name: 'Aliaksei Palanevich',
					profilePicture: '',
					emailAddress: 'palanevich.aleksey@gmail.com',
					githubAccount: 'https://github.com/goldoragon',
					telephone: '+375299069001',
					about: `He likes: solve anything task (physics, logic, mathematical etc.); read and explore other people's solutions; 
					to build his day as how he wants; work on an interesting project in a friendly team. So he’d like to find interesting things and good people.`,
				},
			],
		};
	},
};
</script>

<style scoped>
.about-wrapper {
  max-width: 1440px;
  margin: 0 auto;
}
</style>

const { prompt } = require('inquirer');
const figlet = require('figlet');
const axios = require('axios');
const colors = require('colors');
const cheerio = require('cheerio');

const askQuestions = () => {
  const questions = [
    {
      type: 'list',
      name: 'initialTask',
      message: 'what would you like to do?',
      choices: ['rate a professor', 'search a professor'],
    },
    {
      type: 'input',
      name: 'professorName',
      message: 'please enter the instructors name',
    },
  ];
  return prompt(questions);
};

const searchProfessor = async (name) => {
  try {
    const {data: html} = await axios.get(`https://www.ratemyprofessors.com/search/teachers?query=${name}`);
    const $ = cheerio.load(html);
    const results = $('.SearchResultsPage__SearchResultsWrapper-sc-1srop1v-1 div:nth-child(2)');
    console.log(results)
    const professors = [];
    // results = div with a list of <a> tags
    // on each <a> find the teacher card info rating wrapper
    // find the teacher number rating wrapper and extract the rating and number of ratings
    // find the teacher card info and extract the the name, department, school, and feedback
    // format data into a key value pair and push into professors array
    return professors;
  } catch (error) {
    console.error(error);
  }
};

const successMessage = (professor) => {
  console.log(`Successfully found ${professor}`.green);
};
const errorMessage = (professor) => {
  console.log(`We could not find ${professor}`.red);
};

const init = () => {
  console.log(
    figlet.textSync('Welcome to Rate My Professor CLI', {
      font: 'standard',
      verticalLayout: 'default',
      horizontalLayout: 'default',
    }).cyan
  );
};

const run = async () => {
  // show script introduction
  init();
  // ask questions
  const answers = await askQuestions();
  const { professorName } = answers;
  // query for instructor
  const professors = await searchProfessor(professorName);
  // show success message
  // successMessage(professors);
  // show error message
  // errorMessage(professors);
};

run();

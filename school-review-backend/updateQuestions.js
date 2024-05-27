const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/school-review', { useNewUrlParser: true, useUnifiedTopology: true });

const questionSchema = new mongoose.Schema({
  question: String,
});

const Question = mongoose.model('Question', questionSchema);

const questions = [
  { question: "На сколько облагорожена территория учебного заведения?" },
  { question: "Как вы оцениваете уровень безопасности?" },
  { question: "На сколько облагорожена\n территория учебного заведения?"},
  { question:"Состояние спортивной зоны?"},
  { question:"Состояние дорожек для\n ходьбы по внешней территории?"},
  { question:"Какие растения находятся на\n внешней территории учебного заведения?"},
  { question:"На сколько удобно расположено здания?"},
  { question:"На сколько рядом учебное здание\n находится по отношению к жилым домам?"},
  { question:"Находятся ли рядом\n продуктовые магазины?"},
  { question:"Удобно ли заходить на\n территорию учебного заведения?" },
  { question:"В каком состояние находится здание?"},
  { question:"На сколько безопасно находится в здании?" },
  { question:"В каком ремонтном состояние\n находится учебное заведение?"},
  { question:"На сколько чисто в учебном заведение?"},
  { question:"На сколько квалифицированы\n работники учебного заведения?"},
  { question:"Знают ли работник что надо\n делать при чрезвычайных ситуациях?"},
  { question:"Как хорошо работники\n выполняют свою работу?"},
  { question:"На сколько хорошо преподаватели\n знают свой предмет?"},
  { question:"В каком состояние находится\n столовая зона в учебном заведении?"},
  { question:"Какая чистота на кухне и в помещения?"},
  { question:"Вкусно ли кормят в столовой?"},
  { question:"На сколько дорого стоит питание?"},
  { question:"Выполнены ли Санитарно-эпидемиологические\n правила и нормы?"},
  { question:"Выполнены ли гигиенические нормативы?"},
  { question:"Наличествует специальное\n оборудование для получения образования?"},
];

async function updateQuestions() {
  try {
    await Question.deleteMany({});
    await Question.insertMany(questions);
    console.log('Questions updated successfully');
  } catch (error) {
    console.error('Error updating questions:', error);
  } finally {
    mongoose.connection.close();
  }
}

updateQuestions();
//node updateQuestions.js

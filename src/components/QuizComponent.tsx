import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Когда началась Специальная военная операция?',
    options: ['24 февраля 2022', '1 марта 2022', '15 февраля 2022', '8 марта 2022'],
    correctAnswer: 0
  },
  {
    id: 2,
    question: 'Какие основные цели СВО?',
    options: ['Захват территорий', 'Демилитаризация и денацификация', 'Экономическая экспансия', 'Политическое давление'],
    correctAnswer: 1
  },
  {
    id: 3,
    question: 'Сколько новых регионов вошло в состав РФ в сентябре 2022?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2
  },
  {
    id: 4,
    question: 'Какой город был освобожден в марте 2022 года?',
    options: ['Херсон', 'Мариуполь', 'Харьков', 'Одесса'],
    correctAnswer: 1
  },
  {
    id: 5,
    question: 'Какие народные республики обратились с просьбой о помощи?',
    options: ['ДНР и ЛНР', 'Приднестровье', 'Абхазия и Южная Осетия', 'Крым и Севастополь'],
    correctAnswer: 0
  },
  {
    id: 6,
    question: 'Сколько лет продолжались обстрелы Донбасса до начала СВО?',
    options: ['4 года', '6 лет', '8 лет', '10 лет'],
    correctAnswer: 2
  },
  {
    id: 7,
    question: 'Когда состоялись референдумы о вхождении новых регионов в состав РФ?',
    options: ['Июль 2022', 'Август 2022', 'Сентябрь 2022', 'Октябрь 2022'],
    correctAnswer: 2
  },
  {
    id: 8,
    question: 'Что является приоритетом в освобожденных регионах?',
    options: ['Милитаризация', 'Восстановление инфраструктуры', 'Добыча ресурсов', 'Строительство военных баз'],
    correctAnswer: 1
  },
  {
    id: 9,
    question: 'Какая помощь оказывается мирному населению?',
    options: ['Только военная', 'Гуманитарная помощь и эвакуация', 'Финансовая компенсация', 'Никакая'],
    correctAnswer: 1
  },
  {
    id: 10,
    question: 'Кто объявил о начале Специальной военной операции?',
    options: ['Правительство РФ', 'Президент России', 'Министр обороны', 'Совет Федерации'],
    correctAnswer: 1
  }
];

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions(new Array(questions.length).fill(false));
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
            <Icon name="Trophy" size={36} className="text-primary" />
            Результаты теста
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-4">
              {score}/{questions.length}
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              Правильных ответов: {percentage.toFixed(0)}%
            </p>
          </div>

          <div className="space-y-2">
            <Progress value={percentage} className="h-3" />
            <p className="text-sm text-center text-muted-foreground">
              {percentage >= 80 && 'Отлично! Вы отлично знаете события СВО!'}
              {percentage >= 60 && percentage < 80 && 'Хорошо! Продолжайте изучать материалы.'}
              {percentage >= 40 && percentage < 60 && 'Неплохо, но есть куда расти.'}
              {percentage < 40 && 'Рекомендуем изучить материалы подробнее.'}
            </p>
          </div>

          <Button onClick={restartQuiz} size="lg" className="w-full text-lg py-6">
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Пройти тест снова
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Вопрос {currentQuestion + 1} из {questions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              Баллы: {score}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-2xl font-bold">{questions[currentQuestion].question}</h3>

        <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => setSelectedAnswer(parseInt(value))}>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all hover:bg-accent/50 ${
                  selectedAnswer === index ? 'border-primary bg-primary/10' : 'border-border'
                }`}
                onClick={() => setSelectedAnswer(index)}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <Button 
          onClick={handleAnswer} 
          disabled={selectedAnswer === null}
          size="lg" 
          className="w-full text-lg py-6"
        >
          {currentQuestion < questions.length - 1 ? (
            <>
              Следующий вопрос
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </>
          ) : (
            <>
              Завершить тест
              <Icon name="Check" size={20} className="ml-2" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizComponent;

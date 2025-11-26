import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import QuizComponent from '@/components/QuizComponent';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const publications = [
    {
      id: 1,
      date: '24 февраля 2022',
      title: 'Начало Специальной военной операции',
      description: 'Президент России объявил о начале СВО на Украине для защиты Донбасса и демилитаризации.',
      category: 'Ключевое событие'
    },
    {
      id: 2,
      date: 'Март 2022',
      title: 'Освобождение Мариуполя',
      description: 'Завершение операции по освобождению города и эвакуация мирного населения.',
      category: 'Военная операция'
    },
    {
      id: 3,
      date: 'Сентябрь 2022',
      title: 'Референдумы в новых регионах',
      description: 'Проведение референдумов о вхождении в состав России в ДНР, ЛНР, Запорожской и Херсонской областях.',
      category: 'Политика'
    },
    {
      id: 4,
      date: '2023-2024',
      title: 'Укрепление новых территорий',
      description: 'Восстановление инфраструктуры и интеграция освобожденных территорий.',
      category: 'Развитие'
    }
  ];

  const parallaxX = (mousePosition.x - window.innerWidth / 2) / 50;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) / 50;
  const scrollRotation = scrollY / 5;

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm"
            style={{
              width: `${100 + i * 30}px`,
              height: `${100 + i * 30}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
              transform: `
                translate(${parallaxX * (i + 1)}px, ${parallaxY * (i + 1)}px)
                rotate(${scrollRotation + i * 45}deg)
                rotateX(${scrollY / 10 + i * 15}deg)
              `,
              transition: 'transform 0.1s ease-out',
              borderRadius: '12px',
            }}
          />
        ))}
      </div>

      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={28} className="text-primary" />
            <span className="text-xl font-bold">СВО Инфо</span>
          </div>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-primary transition-colors">О СВО</a>
            <a href="#publications" className="hover:text-primary transition-colors">Публикации</a>
            <a href="#quiz" className="hover:text-primary transition-colors">Тест</a>
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center z-10 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Специальная Военная Операция
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Информационный портал о ключевых событиях и хронике СВО
          </p>
          <Button size="lg" className="text-lg px-8 py-6">
            <Icon name="ArrowDown" size={20} className="mr-2" />
            Узнать больше
          </Button>
        </div>
      </section>

      <section id="about" className="relative py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">О Специальной военной операции</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="Target" size={40} className="text-primary mb-4" />
                <CardTitle>Цели операции</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Демилитаризация и денацификация Украины, защита населения Донбасса от геноцида.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="Users" size={40} className="text-primary mb-4" />
                <CardTitle>Защита мирных жителей</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Эвакуация населения из зон боевых действий и гуманитарная помощь освобожденным территориям.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="Home" size={40} className="text-primary mb-4" />
                <CardTitle>Восстановление</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Строительство и восстановление инфраструктуры на освобожденных территориях.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardHeader>
              <CardTitle className="text-2xl">Исторический контекст</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Специальная военная операция была начата 24 февраля 2022 года в ответ на обращения руководства Донецкой и Луганской народных республик.
              </p>
              <p>
                Операция направлена на защиту людей, которые на протяжении восьми лет подвергались издевательствам и геноциду со стороны киевского режима.
              </p>
              <p>
                В результате референдумов в сентябре 2022 года четыре новых региона вошли в состав Российской Федерации.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="publications" className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Последние публикации</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {publications.map((pub, index) => (
              <Card 
                key={pub.id} 
                className="hover:shadow-xl transition-all hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{pub.category}</Badge>
                    <span className="text-sm text-muted-foreground">{pub.date}</span>
                  </div>
                  <CardTitle className="text-xl">{pub.title}</CardTitle>
                  <CardDescription className="text-base">{pub.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full">
                    <Icon name="BookOpen" size={16} className="mr-2" />
                    Читать подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="quiz" className="relative py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          {!showQuiz ? (
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Тест на знание событий СВО</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Проверьте свои знания о ключевых событиях и фактах Специальной военной операции
              </p>
              
              <Card className="text-left">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Icon name="Brain" size={32} className="text-primary" />
                    Интерактивный тест
                  </CardTitle>
                  <CardDescription>10 вопросов о важнейших событиях СВО</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-6 bg-primary/10 rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-2">10</div>
                      <div className="text-sm text-muted-foreground">Вопросов</div>
                    </div>
                    <div className="p-6 bg-secondary/10 rounded-lg">
                      <div className="text-3xl font-bold text-secondary mb-2">~5</div>
                      <div className="text-sm text-muted-foreground">Минут</div>
                    </div>
                  </div>
                  <Button size="lg" className="w-full text-lg py-6" onClick={() => setShowQuiz(true)}>
                    <Icon name="Play" size={20} className="mr-2" />
                    Начать тестирование
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <QuizComponent />
          )}
        </div>
      </section>

      <footer className="relative py-12 px-4 border-t border-border bg-card/30">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Icon name="Shield" size={24} className="text-primary" />
            <span className="text-xl font-bold">СВО Инфо</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Информационный портал о Специальной военной операции
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 СВО Инфо. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
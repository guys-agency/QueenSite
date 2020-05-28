const cities = [
  "Москва",
  "Абрамцево",
  "Алабино",
  "Апрелевка",
  "Архангельское",
  "Ашитково",
  "Байконур",
  "Бакшеево",
  "Балашиха",
  "Барыбино",
  "Белоомут",
  "Белые Столбы",
  "Бородино",
  "Бронницы",
  "Быково",
  "Валуево",
  "Вербилки",
  "Верея",
  "Видное",
  "Внуково",
  "Вождь Пролетариата",
  "Волоколамск",
  "Вороново",
  "Воскресенск",
  "Восточный",
  "Востряково",
  "Высоковск",
  "Голицино",
  "Деденево",
  "Дедовск",
  "Джержинский",
  "Дмитров",
  "Долгопрудный",
  "Домодедово",
  "Дорохово",
  "Дрезна",
  "Дубки",
  "Дубна",
  "Егорьевск",
  "Железнодорожный",
  "Жилево",
  "Жуковский",
  "Загорск",
  "Загорянский",
  "Запрудная",
  "Зарайск",
  "Звенигород",
  "Зеленоград",
  "Ивантеевка",
  "Икша",
  "Ильинский",
  "Истра",
  "Калининград",
  "Кашира",
  "Керва",
  "Климовск",
  "Клин",
  "Клязьма",
  "Кожино",
  "Кокошкино",
  "Коломна",
  "Колюбакино",
  "Королев",
  "Косино",
  "Котельники",
  "Красково",
  "Красноармейск",
  "Красногорск",
  "Краснозаводск",
  "Краснознаменск",
  "Красный Ткач",
  "Крюково",
  "Кубинка",
  "Купавна",
  "Куровское",
  "Лесной Городок",
  "Ликино-Дулево",
  "Лобня",
  "Лопатинский",
  "Лосино-Петровский",
  "Лотошино",
  "Лукино",
  "Луховицы",
  "Лыткарино",
  "Львовский",
  "Люберцы",
  "Малаховка",
  "Михайловское",
  "Михнево",
  "Можайск",
  "Монино",
  "Муханово",
  "Мытищи",
  "Нарофоминск",
  "Нахабино",
  "Некрасовка",
  "Немчиновка",
  "Новобратцевский",
  "Новоподрезково",
  "Ногинск",
  "Обухово",
  "Одинцово",
  "Ожерелье",
  "Озеры",
  "Октябрьский",
  "Опалиха",
  "Орехово-Зуево",
  "Павловский Посад",
  "Первомайский",
  "Пески",
  "Пироговский",
  "Подольск",
  "Полушкино",
  "Правдинский",
  "Привокзальный",
  "Пролетарский",
  "Протвино",
  "Пушкино",
  "Пущино",
  "Радовицкий",
  "Раменское",
  "Реутов",
  "Решетниково",
  "Родники",
  "Рошаль",
  "Рублево",
  "Руза",
  "Салтыковка",
  "Северный",
  "Сергиев Посад",
  "Серебряные Пруды",
  "Серпухов",
  "Солнечногорск",
  "Солнцево",
  "Софрино",
  "Старая Купавна",
  "Старбеево",
  "Ступино",
  "Сходня",
  "Талдом",
  "Текстильщик",
  "Темпы",
  "Тишково",
  "Томилино",
  "Троицк",
  "Туголесский Бор",
  "Тучково",
  "Уваровка",
  "Удельная",
  "Успенское",
  "Фирсановка",
  "Фосфоритный",
  "Фрязино",
  "Фряново",
  "Химки",
  "Хорлово",
  "Хотьково",
  "Черкизово",
  "Черноголовка",
  "Черусти",
  "Чехов",
  "Шарапово",
  "Шатура",
  "Шатурторф",
  "Шаховская",
  "Шереметьевский",
  "Щелково",
  "Щербинка",
  "Электрогорск",
  "Электросталь",
  "Электроугли",
  "Яхрома",
  "Санкт-Петербург",
  "Александровская",
  "Бокситогорск",
  "Большая Ижора",
  "Будогощь",
  "Вознесенье",
  "Волосово",
  "Волхов",
  "Всеволожск",
  "Выборг",
  "Вырица",
  "Высоцк",
  "Гатчина",
  "Дружная Горка",
  "Дубровка",
  "Ефимовский",
  "Зеленогорск",
  "Ивангород",
  "Каменногорск",
  "Кикерино",
  "Кингисепп",
  "Кириши",
  "Кировск",
  "Кобринское",
  "Колпино",
  "Коммунар",
  "Кронштадт",
  "Лисий Нос",
  "Лодейное Поле",
  "Ломоносов",
  "Луга",
  "Павловск",
  "Парголово",
  "Петродворец",
  "Пикалёво",
  "Подпорожье",
  "Приозерск",
  "Пушкин",
  "Сестрорецк",
  "Сланцы",
  "Сосновый Бор",
  "Тихвин",
  "Тосно",
  "Шлиссельбург",
  "Адыгейск",
  "Майкоп",
  "Акташ",
  "Акутиха",
  "Алейск",
  "Алтайский",
  "Баево",
  "Барнаул",
  "Белово",
  "Белокуриха",
  "Белоярск",
  "Бийск",
  "Благовещенск",
  "Боровлянка",
  "Бурла",
  "Бурсоль",
  "Волчиха",
  "Горно-Алтайск",
  "Горняк",
  "Ельцовка",
  "Залесово",
  "Заринск",
  "Заток",
  "Змеиногорск",
  "Камень-на-Оби",
  "Ключи",
  "Кош-Агач",
  "Красногорское",
  "Краснощеково",
  "Кулунда",
  "Кытманово",
  "Мамонтово",
  "Новичиха",
  "Новоалтайск",
  "Онгудай",
  "Павловск",
  "Петропавловское",
  "Поспелиха",
  "Ребриха",
  "Родино",
  "Рубцовск",
  "Славгород",
  "Смоленское",
  "Солонешное",
  "Солтон",
  "Староаллейское",
  "Табуны",
  "Тальменка",
  "Топчиха",
  "Троицкое",
  "Турочак",
  "Тюменцево",
  "Угловское",
  "Усть-Калманка",
  "Усть-Кан",
  "Усть-Кокса",
  "Усть-Улаган",
  "Усть-Чарышская Пристань",
  "Хабары",
  "Целинное",
  "Чарышское",
  "Шебалино",
  "Шелаболиха",
  "Шипуново",
  "Айгунь",
  "Архара",
  "Белогорск",
  "Благовещенск (Амурская обл.)",
  "Бурея",
  "Возжаевка",
  "Екатеринославка",
  "Ерофей Павлович",
  "Завитинск",
  "Зея",
  "Златоустовск",
  "Ивановка",
  "Коболдо",
  "Магдагачи",
  "Новобурейский",
  "Поярково",
  "Райчихинск",
  "Ромны",
  "Свободный",
  "Серышево",
  "Сковородино",
  "Стойба",
  "Тамбовка",
  "Тында",
  "Шимановск",
  "Экимчан",
  "Ядрино",
  "Амдерма",
  "Архангельск",
  "Березник",
  "Вельск",
  "Верхняя Тойма",
  "Волошка",
  "Вычегодский",
  "Емца",
  "Илеза",
  "Ильинско-Подомское",
  "Каргополь",
  "Карпогоры",
  "Кодино",
  "Коноша",
  "Коряжма",
  "Котлас",
  "Красноборск",
  "Лешуконское",
  "Мезень",
  "Мирный",
  "Нарьян-Мар",
  "Новодвинск",
  "Няндома",
  "Онега",
  "Пинега",
  "Плесецк",
  "Северодвинск",
  "Сольвычегодск",
  "Холмогоры",
  "Шенкурск",
  "Яренск",
  "Астрахань",
  "Ахтубинск",
  "Верхний Баскунчак",
  "Володарский",
  "Енотаевка",
  "Икряное",
  "Камызяк",
  "Капустин Яр",
  "Красный Яр",
  "Лиман",
  "Началово",
  "Харабали",
  "Черный Яр",
  "Аксаково",
  "Амзя",
  "Аскино",
  "Баймак",
  "Бакалы",
  "Белебей",
  "Белорецк",
  "Бижбуляк",
  "Бирск",
  "Благовещенск",
  "Большеустьикинское",
  "Бураево",
  "Верхнеяркеево",
  "Верхние Киги",
  "Верхние Татышлы",
  "Верхний Авзян",
  "Давлеканово",
  "Дуван",
  "Дюртюли",
  "Ермекеево",
  "Ермолаево",
  "Зилаир",
  "Зирган",
  "Иглино",
  "Инзер",
  "Исянгулово",
  "Ишимбай",
  "Кананикольское",
  "Кандры",
  "Караидель",
  "Караидельский",
  "Киргиз-Мияки",
  "Красноусольский",
  "Кумертау",
  "Кушнаренково",
  "Малояз",
  "Мелеуз",
  "Месягутово",
  "Мраково",
  "Нефтекамск",
  "Октябрьский",
  "Раевский",
  "Салават",
  "Сибай",
  "Старобалтачево",
  "Старосубхангулово",
  "Стерлибашево",
  "Стерлитамак",
  "Туймазы",
  "Уфа",
  "Учалы",
  "Федоровка",
  "Чекмагуш",
  "Чишмы",
  "Шаран",
  "Янаул",
  "Алексеевка",
  "Белгород",
  "Борисовка",
  "Валуйки",
  "Вейделевка",
  "Волоконовка",
  "Грайворон",
  "Губкин",
  "Ивня",
  "Короча",
  "Красногвардейское",
  "Новый Оскол",
  "Ракитное",
  "Ровеньки",
  "Старый Оскол",
  "Строитель",
  "Чернянка",
  "Шебекино",
  "Алтухово",
  "Белая Березка",
  "Белые Берега",
  "Большое Полпино",
  "Брянск",
  "Бытошь",
  "Выгоничи",
  "Вышков",
  "Гордеевка",
  "Дубровка",
  "Дятьково",
  "Жирятино",
  "Жуковка",
  "Злынка",
  "Ивот",
  "Карачев",
  "Клетня",
  "Климово",
  "Клинцы",
  "Кокаревка",
  "Комаричи",
  "Красная Гора",
  "Локоть",
  "Мглин",
  "Навля",
  "Новозыбков",
  "Погар",
  "Почеп",
  "Ржаница",
  "Рогнедино",
  "Севск",
  "Стародуб",
  "Суземка",
  "Сураж",
  "Трубчевск",
  "Унеча",
  "Бабушкин",
  "Багдарин",
  "Баргузин",
  "Баянгол",
  "Бичура",
  "Выдрино",
  "Гусиное Озеро",
  "Гусиноозерск",
  "Заиграево",
  "Закаменск",
  "Иволгинск",
  "Илька",
  "Кабанск",
  "Каменск",
  "Кижинга",
  "Курумкан",
  "Кырен",
  "Кяхта",
  "Монды",
  "Мухоршибирь",
  "Нижнеангарск",
  "Орлик",
  "Петропавловка",
  "Романовка",
  "Северобайкальск",
  "Селенгинск",
  "Сосново-Озерское",
  "Таксимо",
  "Турунтаево",
  "Улан-Удэ",
  "Хоринск",
  "Александров",
  "Андреево",
  "Анопино",
  "Бавлены",
  "Балакирево",
  "Боголюбово",
  "Великодворский",
  "Вербовский",
  "Владимир",
  "Вязники",
  "Городищи",
  "Гороховец",
  "Гусевский",
  "Гусь Хрустальный",
  "Золотково",
  "Иванищи",
  "Камешково",
  "Карабаново",
  "Киржач",
  "Ковров",
  "Кольчугино",
  "Красная Горбатка",
  "Меленки",
  "Муром",
  "Петушки",
  "Покров",
  "Собинка",
  "Судогда",
  "Суздаль",
  "Юрьев-Польский",
  "Алексеевская",
  "Алущевск",
  "Быково",
  "Волгоград",
  "Волжский",
  "Городище",
  "Дубовка",
  "Елань",
  "Жирновск",
  "Иловля",
  "Калач-на-Дону",
  "Камышин",
  "Кириллов",
  "Клетский",
  "Котельниково",
  "Котово",
  "Кумылженская",
  "Ленинск",
  "Михайловка",
  "Нехаевский",
  "Николаевск",
  "Новоаннинский",
  "Новониколаевский",
  "Ольховка",
  "Палласовка",
  "Рудня",
  "Светлый Яр",
  "Серафимович",
  "Средняя Ахтуба",
  "Сталинград",
  "Старая Полтавка",
  "Суровикино",
  "Урюпинск",
  "Фролово",
  "Чернышковский",
  "Бабаево",
  "Белозерск",
  "Великий Устюг",
  "Верховажье",
  "Вожега",
  "Вологда",
  "Вохтога",
  "Вытегра",
  "Грязовец",
  "Кадников",
  "Кадуй",
  "Кичменгский Городок",
  "Липин Бор",
  "Никольск",
  "Нюксеница",
  "Сокол",
  "Сямжа",
  "Тарногский Городок",
  "Тотьма",
  "Устюжна",
  "Харовск",
  "Чагода",
  "Череповец",
  "Шексна",
  "Шуйское",
  "Анна",
  "Бобров",
  "Богучар",
  "Борисоглебск",
  "Бутурлиновка",
  "Верхний Мамон",
  "Верхняя Хава",
  "Воробьевка",
  "Воронеж",
  "Грибановский",
  "Давыдовка",
  "Елань-Коленовский",
  "Калач",
  "Кантемировка",
  "Лиски",
  "Нижнедевицк",
  "Новая Усмань",
  "Новохоперск",
  "Ольховатка",
  "Острогожск",
  "Павловск",
  "Панино",
  "Петропавловка",
  "Поворино",
  "Подгоренский",
  "Рамонь",
  "Репьевка",
  "Россошь",
  "Семилуки",
  "Таловая",
  "Терновка",
  "Хохольский",
  "Эртиль",
  "нововоронеж",
  "Агвали",
  "Акуша",
  "Ахты",
  "Ачису",
  "Бабаюрт",
  "Бежта",
  "Ботлих",
  "Буйнакск",
  "Вачи",
  "Гергебиль",
  "Гуниб",
  "Дагестанские Огни",
  "Дербент",
  "Дылым",
  "Ершовка",
  "Избербаш",
  "Карабудахкент",
  "Карата",
  "Каспийск",
  "Касумкент",
  "Кизилюрт",
  "Кизляр",
  "Кочубей",
  "Кумух",
  "Курах",
  "Магарамкент",
  "Маджалис",
  "Махачкала",
  "Мехельта",
  "Новолакское",
  "Рутул",
  "Советское",
  "Тарумовка",
  "Терекли-Мектеб",
  "Тлярата",
  "Тпиг",
  "Уркарах",
  "Хасавюрт",
  "Хив",
  "Хунзах",
  "Цуриб",
  "Южно-Сухокумск",
  "Биробиджан",
  "Архиповка",
  "Верхний Ландех",
  "Вичуга",
  "Гаврилов Посад",
  "Долматовский",
  "Дуляпино",
  "Заволжск",
  "Заречный",
  "Иваново",
  "Иваньковский",
  "Ильинское-Хованское",
  "Каминский",
  "Кинешма",
  "Комсомольск",
  "Кохма",
  "Лух",
  "Палех",
  "Пестяки",
  "Приволжск",
  "Пучеж",
  "Родники",
  "Савино",
  "Сокольское",
  "Тейково",
  "Фурманов",
  "Шуя",
  "Южа",
  "Юрьевец",
  "Алексеевск",
  "Алзамай",
  "Алыгжер",
  "Ангарск",
  "Артемовский",
  "Атагай",
  "Байкал",
  "Байкальск",
  "Балаганск",
  "Баяндай",
  "Бирюсинск",
  "Бодайбо",
  "Большая Речка",
  "Большой Луг",
  "Бохан",
  "Братск",
  "Видим",
  "Витимский",
  "Вихоревка",
  "Еланцы",
  "Ербогачен",
  "Железногорск-Илимский",
  "Жигалово",
  "Забитуй",
  "Залари",
  "Звездный",
  "Зима",
  "Иркутск",
  "Казачинское",
  "Качуг",
  "Квиток",
  "Киренск",
  "Куйтун",
  "Култук",
  "Кутулик",
  "Мама",
  "Нижнеудинск",
  "Оса",
  "Саянск",
  "Слюдянка",
  "Тайшет",
  "Тулун",
  "Усолье-Сибирское",
  "Усть-Илимск",
  "Усть-Кут",
  "Усть-Ордынский",
  "Усть-Уда",
  "Черемхово",
  "Чунский",
  "Шелехов",
  "Баксан",
  "Майский",
  "Нальчик",
  "Нарткала",
  "Прохладный",
  "Советское",
  "Терек",
  "Тырныауз",
  "Чегем-Первый",
  "Багратионовск",
  "Балтийск",
  "Гвардейск",
  "Гурьевск",
  "Гусев",
  "Железнодорожный",
  "Зеленоградск",
  "Знаменск",
  "Кёнигсберг",
  "Калининград",
  "Кенисберг",
  "Краснознаменск",
  "Мамоново",
  "Неман",
  "Нестеров",
  "Озерск",
  "Полесск",
  "Правдинск",
  "Светлогорск",
  "Светлый",
  "Славск",
  "Советск",
  "Черняховск",
  "Аршань",
  "Каспийский",
  "Комсомольский",
  "Малые Дербеты",
  "Приютное",
  "Советское",
  "Троицкое",
  "Утта",
  "Цаган-Аман",
  "Элиста",
  "Юста",
  "Яшалта",
  "Яшкуль",
  "Бабынино",
  "Балабаново",
  "Барятино",
  "Белоусово",
  "Бетлица",
  "Боровск",
  "Дугна",
  "Дудоровский",
  "Думиничи",
  "Еленский",
  "Жиздра",
  "Износки",
  "Калуга",
  "Киров",
  "Козельск",
  "Кондрово",
  "Людиново",
  "Малоярославец",
  "Медынь",
  "Мещовск",
  "Мосальск",
  "Обнинск",
  "Перемышль",
  "Спас-Деменск",
  "Сухиничи",
  "Таруса",
  "Ульяново",
  "Ферзиково",
  "Хвастовичи",
  "Юхнов",
  "Атласово",
  "Аянка",
  "Большерецк",
  "Вилючинск",
  "Елизово",
  "Ильпырский",
  "Каменское",
  "Кировский",
  "Ключи",
  "Крапивная",
  "Мильково",
  "Никольское",
  "Озерновский",
  "Оссора",
  "Палана",
  "Парень",
  "Пахачи",
  "Петропавловск-Камчатский",
  "Тигиль",
  "Тиличики",
  "Усть-Большерецк",
  "Усть-Камчатск",
  "Амбарный",
  "Беломорск",
  "Валаам",
  "Вирандозеро",
  "Гирвас",
  "Деревянка",
  "Идель",
  "Ильинский",
  "Импалахти",
  "Калевала",
  "Кемь",
  "Кестеньга",
  "Кондопога",
  "Костомукша",
  "Лахденпохья",
  "Лоухи",
  "Медвежьегорск",
  "Муезерский",
  "Олонец",
  "Петрозаводск",
  "Питкяранта",
  "Повенец",
  "Пряжа",
  "Пудож",
  "Сегежа",
  "Сортавала",
  "Софпорог",
  "Суоярви",
  "Анжеро-Судженск",
  "Барзас",
  "Белово",
  "Белогорск",
  "Березовский",
  "Грамотеино",
  "Гурьевск",
  "Ижморский",
  "Итатский",
  "Калтан",
  "Кедровка",
  "Кемерово",
  "Киселевск",
  "Крапивинский",
  "Ленинск-Кузнецкий",
  "Мариинск",
  "Междуреченск",
  "Мыски",
  "Новокузнецк",
  "Осинники",
  "Прокопьевск",
  "Промышленная",
  "Тайга",
  "Таштагол",
  "Тисуль",
  "Топки",
  "Тяжинский",
  "Юрга",
  "Яшкино",
  "Яя",
  "Арбаж",
  "Аркуль",
  "Белая Холуница",
  "Богородское",
  "Боровой",
  "Верхошижемье",
  "Вятские Поляны",
  "Зуевка",
  "Каринторф",
  "Кикнур",
  "Кильмезь",
  "Киров",
  "Кирово-Чепецк",
  "Кирс",
  "Кобра",
  "Котельнич",
  "Кумены",
  "Ленинское",
  "Луза",
  "Малмыж",
  "Мураши",
  "Нагорск",
  "Нема",
  "Нововятск",
  "Нолинск",
  "Омутнинск",
  "Опарино",
  "Оричи",
  "Пижанка",
  "Подосиновец",
  "Санчурск",
  "Свеча",
  "Слободской",
  "Советск",
  "Суна",
  "Тужа",
  "Уни",
  "Уржум",
  "Фаленки",
  "Халтурин",
  "Юрья",
  "Яранск",
  "Абезь",
  "Айкино",
  "Верхняя Инта",
  "Визинга",
  "Водный",
  "Вожаель",
  "Воркута",
  "Вуктыл",
  "Гешарт",
  "Елецкий",
  "Емва",
  "Заполярный",
  "Ижма",
  "Инта",
  "Ираель",
  "Каджером",
  "Кажым",
  "Кожым",
  "Койгородок",
  "Корткерос",
  "Кослан",
  "Объячево",
  "Печора",
  "Сосногорск",
  "Сыктывкар",
  "Троицко-Печерск",
  "Усинск",
  "Усогорск",
  "Усть-Кулом",
  "Усть-Цильма",
  "Ухта",
  "Антропово",
  "Боговарово",
  "Буй",
  "Волгореченск",
  "Галич",
  "Горчуха",
  "Зебляки",
  "Кадый",
  "Кологрив",
  "Кострома",
  "Красное-на-Волге",
  "Макарьев",
  "Мантурово",
  "Нерехта",
  "Нея",
  "Островское",
  "Павино",
  "Парфентьево",
  "Поназырево",
  "Солигалич",
  "Судиславль",
  "Сусанино",
  "Чухлома",
  "Шарья",
  "Шемятино",
  "Абинск",
  "Абрау-Дюрсо",
  "Анапа",
  "Апшеронск",
  "Армавир",
  "Архипо-Осиповка",
  "Афипский",
  "Ахтырский",
  "Ачуево",
  "Белореченск",
  "Верхнебаканский",
  "Выселки",
  "Геленджик",
  "Гиагинская",
  "Горячий Ключ",
  "Джубга",
  "Динская",
  "Ейск",
  "Ильский",
  "Кабардинка",
  "Калинино",
  "Калининская",
  "Каменномостский",
  "Каневская",
  "Кореновск",
  "Красноармейская",
  "Краснодар",
  "Кропоткин",
  "Крыловская",
  "Крымск",
  "Курганинск",
  "Кущевская",
  "Лабинск",
  "Лениградская",
  "Майкоп",
  "Мостовской",
  "Новороссийск",
  "Отрадная",
  "Павловская",
  "Приморско-Ахтарск",
  "Северская",
  "Славянск-на-Кубани",
  "Сочи",
  "Староминская",
  "Старощербиновская",
  "Тбилисская",
  "Темрюк",
  "Тимашевск",
  "Тихорецк",
  "Туапсе",
  "Тульский",
  "Усть-Лабинск",
  "Шовгеновский",
  " Железногорск",
  "Абаза",
  "Абакан",
  "Абан",
  "Агинское",
  "Артемовск",
  "Аскиз",
  "Ачинск",
  "Байкит",
  "Балахта",
  "Балыкса",
  "Белый Яр",
  "Бельтырский",
  "Бея",
  "Бискамжа",
  "Боготол",
  "Боград",
  "Богучаны",
  "Большая Мурта",
  "Большой Улуй",
  "Бородино",
  "Ванавара",
  "Верхнеимбатск",
  "Горячегорск",
  "Дзержинское",
  "Дивногорск",
  "Диксон",
  "Дудинка",
  "Емельяново",
  "Енисейск",
  "Ермаковское",
  "Заозерный",
  "Зеленогорск",
  "Игарка",
  "Идринское",
  "Иланский",
  "Ирбейское",
  "Казачинское",
  "Канск",
  "Каратузское",
  "Караул",
  "Кежма",
  "Кодинск",
  "Козулька",
  "Копьево",
  "Краснотуранск",
  "Красноярск",
  "Курагино",
  "Лесосибирск",
  "Минусинск",
  "Мотыгино",
  "Назарово",
  "Нижний Ингаш",
  "Новоселово",
  "Норильск",
  "Партизанское",
  "Пировское",
  "Саяногорск",
  "Северо-Енисейский",
  "Сосновоборск",
  "Тасеево",
  "Таштып",
  "Тура",
  "Туруханск",
  "Тюхтет",
  "Ужур",
  "Усть-Авам",
  "Уяр",
  "Хатанга",
  "Черемушки",
  "Черногорск",
  "Шалинское",
  "Шарыпово",
  "Шира",
  "Шушенское",
  "Варгаши",
  "Глядянское",
  "Далматово",
  "Каргаполье",
  "Катайск",
  "Кетово",
  "Курган",
  "Куртамыш",
  "Лебяжье",
  "Макушино",
  "Мишкино",
  "Мокроусово",
  "Петухово",
  "Половинное",
  "Сафакулево",
  "Целинное",
  "Шадринск",
  "Шатрово",
  "Шумиха",
  "Щучье",
  "Юргамыш",
  "Альменево",
  "Белая",
  "Большое Солдатское",
  "Глушково",
  "Горшечное",
  "Дмитриев-Льговский",
  "Железногорск",
  "Золотухино",
  "Касторное",
  "Конышевка",
  "Коренево",
  "Курск",
  "Курчатов",
  "Кшенский",
  "Льгов",
  "Мантурово",
  "Медвенка",
  "Обоянь",
  "Поныри",
  "Пристень",
  "Прямицыно",
  "Рыльск",
  "Суджа",
  "Тим",
  "Фатеж",
  "Хомутовка",
  "Черемисиново",
  "Щигры",
  "Грязи",
  "Данхов",
  "Доброе",
  "Долгоруково",
  "Елец",
  "Задонск",
  "Измалково",
  "Казинка",
  "Лебедянь",
  "Лев Толстой",
  "Липецк",
  "Тербуны",
  "Усмань",
  "Хлевное",
  "Чаплыгин",
  "Анадырь",
  "Атка",
  "Балыгычан",
  "Беринговский",
  "Билибино",
  "Большевик",
  "Ванкарем",
  "Иульитин",
  "Кадыкчан",
  "Лаврентия",
  "Магадан",
  "Мыс Шмидта",
  "Ола",
  "Омонск",
  "Омсукчан",
  "Палатка",
  "Певек",
  "Провидения",
  "Сеймчан",
  "Синегорье",
  "Сусуман",
  "Усть-Белая",
  "Усть-Омчуг",
  "Эвенск",
  "Эгвекинот",
  "Ягодное",
  "Волжск",
  "Дубовский",
  "Звенигово",
  "Йошкар-Ола",
  "Килемары",
  "Козьмодемьянск",
  "Куженер",
  "Мари-Турек",
  "Медведево",
  "Морки",
  "Новый Торьял",
  "Оршанка",
  "Параньга",
  "Сернур",
  "Советский",
  "Юрино",
  "Ардатов",
  "Атюрьево",
  "Атяшево",
  "Большие Березники",
  "Большое Игнатово",
  "Выша",
  "Ельники",
  "Зубова Поляна",
  "Инсар",
  "Кадошкино",
  "Кемля",
  "Ковылкино",
  "Комсомольский",
  "Кочкурово",
  "Краснослободск",
  "Лямбирь",
  "Ромоданово",
  "Рузаевка",
  "Саранск",
  "Старое Шайгово",
  "Темников",
  "Теньгушево",
  "Торбеево",
  "Чамзинка",
  "Апатиты",
  "Африканда",
  "Верхнетуломский",
  "Заозерск",
  "Заполярный",
  "Зареченск",
  "Зашеек",
  "Зеленоборский",
  "Кандалакша",
  "Кильдинстрой",
  "Кировск",
  "Ковдор",
  "Кола",
  "Конда",
  "Мончегорск",
  "Мурманск",
  "Мурмаши",
  "Никель",
  "Оленегорск",
  "Полярные Зори",
  "Полярный",
  "Североморск",
  "Снежногорск",
  "Умба",
  "Ардатов",
  "Арзамас",
  "Арья",
  "Балахна",
  "Богородск",
  "Большереченск",
  "Большое Болдино",
  "Большое Козино",
  "Большое Мурашкино",
  "Большое Пикино",
  "Бор",
  "Бутурлино",
  "Вад",
  "Варнавино",
  "Васильсурск",
  "Вахтан",
  "Вача",
  "Велетьма",
  "Ветлуга",
  "Виля",
  "Вознесенское",
  "Володарск",
  "Воротынец",
  "Ворсма",
  "Воскресенское",
  "Выездное",
  "Выкса",
  "Гагино",
  "Гидроторф",
  "Горбатов",
  "Горбатовка",
  "Городец",
  "Горький",
  "Дальнее Константиново",
  "Дзержинск",
  "Дивеево",
  "Досчатое",
  "Заволжье",
  "Катунки",
  "Керженец",
  "Княгинино",
  "Ковернино",
  "Красные Баки",
  "Кстово",
  "Кулебаки",
  "Лукоянов",
  "Лысково",
  "Навашино",
  "Нижний Новгород",
  "Павлово",
  "Первомайск",
  "Перевоз",
  "Пильна",
  "Починки",
  "Саров",
  "Сергач",
  "Сеченово",
  "Сосновское",
  "Спасское",
  "Тонкино",
  "Тоншаево",
  "Уразовка",
  "Урень",
  "Чкаловск",
  "Шаранга",
  "Шатки",
  "Шахунья",
  "Анциферово",
  "Батецкий",
  "Большая Вишера",
  "Боровичи",
  "Валдай",
  "Волот",
  "Деманск",
  "Зарубино",
  "Кресцы",
  "Любытино",
  "Малая Вишера",
  "Марево",
  "Мошенское",
  "Новгород",
  "Окуловка",
  "Парфино",
  "Пестово",
  "Поддорье",
  "Сольцы",
  "Старая Русса",
  "Хвойное",
  "Холм",
  "Чудово",
  "Шимск",
  "Баган",
  "Барабинск",
  "Бердск",
  "Биаза",
  "Болотное",
  "Венгерово",
  "Довольное",
  "Завьялово",
  "Искитим",
  "Карасук",
  "Каргат",
  "Колывань",
  "Краснозерское",
  "Крутиха",
  "Куйбышев",
  "Купино",
  "Кыштовка",
  "Маслянино",
  "Михайловский",
  "Мошково",
  "Новосибирск",
  "Ордынское",
  "Северное",
  "Сузун",
  "Татарск",
  "Тогучин",
  "Убинское",
  "Усть-Тарка",
  "Чаны",
  "Черепаново",
  "Чистоозерное",
  "Чулым",
  "Береговой",
  "Большеречье",
  "Большие Уки",
  "Горьковское",
  "Знаменское",
  "Исилькуль",
  "Калачинск",
  "Колосовка",
  "Кормиловка",
  "Крутинка",
  "Любинский",
  "Марьяновка",
  "Муромцево",
  "Называевск",
  "Нижняя Омка",
  "Нововаршавка",
  "Одесское",
  "Оконешниково",
  "Омск",
  "Павлоградка",
  "Полтавка",
  "Русская Поляна",
  "Саргатское",
  "Седельниково",
  "Таврическое",
  "Тара",
  "Тевриз",
  "Тюкалинск",
  "Усть-Ишим",
  "Черлак",
  "Шербакуль",
  "Абдулино",
  "Адамовка",
  "Айдырлинский",
  "Акбулак",
  "Аккермановка",
  "Асекеево",
  "Беляевка",
  "Бугуруслан",
  "Бузулук",
  "Гай",
  "Грачевка",
  "Домбаровский",
  "Дубенский",
  "Илек",
  "Ириклинский",
  "Кувандык",
  "Курманаевка",
  "Матвеевка",
  "Медногорск",
  "Новоорск",
  "Новосергиевка",
  "Новотроицк",
  "Октябрьское",
  "Оренбург",
  "Орск",
  "Первомайский",
  "Переволоцкий",
  "Пономаревка",
  "Саракташ",
  "Светлый",
  "Северное",
  "Соль-Илецк",
  "Сорочинск",
  "Ташла",
  "Тоцкое",
  "Тюльган",
  "Шарлык",
  "Энергетик",
  "Ясный",
  "Болхов",
  "Верховье",
  "Глазуновка",
  "Дмитровск-Орловский",
  "Долгое",
  "Залегощь",
  "Змиевка",
  "Знаменское",
  "Колпны",
  "Красная Заря",
  "Кромы",
  "Ливны",
  "Малоархангельск",
  "Мценск",
  "Нарышкино",
  "Новосиль",
  "Орел",
  "Покровское",
  "Сосково",
  "Тросна",
  "Хомутово",
  "Хотынец",
  "Шаблыкино",
  "Башмаково",
  "Беднодемьяновск",
  "Беково",
  "Белинский",
  "Бессоновка",
  "Вадинск",
  "Верхозим",
  "Городище",
  "Евлашево",
  "Земетчино",
  "Золотаревка",
  "Исса",
  "Каменка",
  "Колышлей",
  "Кондоль",
  "Кузнецк",
  "Лопатино",
  "Малая Сердоба",
  "Мокшан",
  "Наровчат",
  "Неверкино",
  "Нижний Ломов",
  "Никольск",
  "Пачелма",
  "Пенза",
  "Русский Камешкир",
  "Сердобск",
  "Сосновоборск",
  "Сура",
  "Тамала",
  "Шемышейка",
  "Барда",
  "Березники",
  "Большая Соснова",
  "Верещагино",
  "Гайны",
  "Горнозаводск",
  "Гремячинск",
  "Губаха",
  "Добрянка",
  "Елово",
  "Зюкайка",
  "Ильинский",
  "Карагай",
  "Керчевский",
  "Кизел",
  "Коса",
  "Кочево",
  "Красновишерск",
  "Краснокамск",
  "Кудымкар",
  "Куеда",
  "Кунгур",
  "Лысьва",
  "Ныроб",
  "Нытва",
  "Октябрьский",
  "Орда",
  "Оса",
  "Оханск",
  "Очер",
  "Пермь",
  "Соликамск",
  "Суксун",
  "Уинское",
  "Усолье",
  "Усть-Кишерть",
  "Чайковский",
  "Частые",
  "Чердынь",
  "Чернореченский",
  "Чернушка",
  "Чусовой",
  "Юрла",
  "Юсьва",
  "Анучино",
  "Арсеньев",
  "Артем",
  "Артемовский",
  "Большой Камень",
  "Валентин",
  "Владивосток",
  "Высокогорск",
  "Горные Ключи",
  "Горный",
  "Дальнегорск",
  "Дальнереченск",
  "Зарубино",
  "Кавалерово",
  "Каменка",
  "Камень-Рыболов",
  "Кировский",
  "Лазо",
  "Лесозаводск",
  "Лучегорск",
  "Михайловка",
  "Находка",
  "Новопокровка",
  "Ольга",
  "Партизанск",
  "Пограничный",
  "Покровка",
  "Русский",
  "Самарга",
  "Славянка",
  "Спасск-Дальний",
  "Терней",
  "Уссурийск",
  "Фокино",
  "Хасан",
  "Хороль",
  "Черниговка",
  "Чугуевка",
  "Яковлевка",
  "Бежаницы",
  "Великие Луки",
  "Гдов",
  "Дедовичи",
  "Дно",
  "Заплюсье",
  "Идрица",
  "Красногородское",
  "Кунья",
  "Локня",
  "Невель",
  "Новоржев",
  "Новосокольники",
  "Опочка",
  "Остров",
  "Палкино",
  "Печоры",
  "Плюсса",
  "Порхов",
  "Псков",
  "Пустошка",
  "Пушкинские Горы",
  "Пыталово",
  "Себеж",
  "Струги-Красные",
  "Усвяты",
  "Азов",
  "Аксай",
  "Алмазный",
  "Аютинск",
  "Багаевский",
  "Батайск",
  "Белая Калитва",
  "Боковская",
  "Большая Мартыновка",
  "Вешенская",
  "Волгодонск",
  "Восход",
  "Гигант",
  "Горняцкий",
  "Гуково",
  "Донецк",
  "Донской",
  "Дубовское",
  "Егорлыкская",
  "Жирнов",
  "Заветное",
  "Заводской",
  "Зверево",
  "Зерноград",
  "Зимовники",
  "Кагальницкая",
  "Казанская",
  "Каменоломни",
  "Каменск-Шахтинский",
  "Кашары",
  "Коксовый",
  "Константиновск",
  "Красный Сулин",
  "Куйбышево",
  "Матвеев Курган",
  "Мигулинская",
  "Миллерово",
  "Милютинская",
  "Морозовск",
  "Новочеркасск",
  "Новошахтинск",
  "Обливская",
  "Орловский",
  "Песчанокопское",
  "Покровское",
  "Пролетарск",
  "Ремонтное",
  "Родионово-Несветайская",
  "Ростов-на-Дону",
  "Сальск",
  "Семикаракорск",
  "Таганрог",
  "Тарасовский",
  "Тацинский",
  "Усть-Донецкий",
  "Целина",
  "Цимлянск",
  "Чалтырь",
  "Чертково",
  "Шахты",
  "Шолоховский",
  "Александро-Невский",
  "Горняк",
  "Гусь Железный",
  "Елатьма",
  "Ермишь",
  "Заречный",
  "Захарово",
  "Кадом",
  "Касимов",
  "Кораблино",
  "Милославское",
  "Михайлов",
  "Пителино",
  "Пронск",
  "Путятино",
  "Рыбное",
  "Ряжск",
  "Рязань",
  "Сапожок",
  "Сараи",
  "Сасово",
  "Скопин",
  "Спас-Клепики",
  "Спасск-Рязанский",
  "Старожилово",
  "Ухолово",
  "Чучково",
  "Шацк",
  "Шилово",
  "Алексеевка",
  "Безенчук",
  "Богатое",
  "Богатырь",
  "Большая Глущица",
  "Большая Черниговка",
  "Борское",
  "Волжский",
  "Жигулевск",
  "Зольное",
  "Исаклы",
  "Камышла",
  "Кинель",
  "Кинель-Черкасы",
  "Клявлино",
  "Кошки",
  "Красноармейское",
  "Красный Яр",
  "Куйбышев",
  "Нефтегорск",
  "Новокуйбышевск",
  "Октябрьск",
  "Отрадный",
  "Пестравка",
  "Похвистнево",
  "Приволжье",
  "Самара",
  "Сургут (Самарская обл.)",
  "Сызрань",
  "Тольятти",
  "Хворостянка",
  "Чапаевск",
  "Челно-Вершины",
  "Шентала",
  "Шигоны",
  "Александров Гай",
  "Аркадак",
  "Аткарск",
  "Базарный Карабулак",
  "Балаково",
  "Балашов",
  "Балтай",
  "Возрождение",
  "Вольск",
  "Воскресенское",
  "Горный",
  "Дергачи",
  "Духовницкое",
  "Екатериновка",
  "Ершов",
  "Заречный",
  "Ивантеевка",
  "Калининск",
  "Каменский",
  "Красноармейск",
  "Красный Кут",
  "Лысые Горы",
  "Маркс",
  "Мокроус",
  "Новоузенск",
  "Новые Бурасы",
  "Озинки",
  "Перелюб",
  "Петровск",
  "Питерка",
  "Пугачев",
  "Ровное",
  "Романовка",
  "Ртищево",
  "Самойловка",
  "Саратов",
  "Степное",
  "Татищево",
  "Турки",
  "Хвалынск",
  "Энгельс",
  "Абый",
  "Алдан",
  "Амга",
  "Батагай",
  "Бердигестях",
  "Беркакит",
  "Бестях",
  "Борогонцы",
  "Верхневилюйск",
  "Верхнеколымск",
  "Верхоянск",
  "Вилюйск",
  "Витим",
  "Власово",
  "Жиганск",
  "Зырянка",
  "Кангалассы",
  "Канкунский",
  "Ленск",
  "Майя",
  "Менкеря",
  "Мирный",
  "Нерюнгри",
  "Нычалах",
  "Нюрба",
  "Олекминск",
  "Покровск",
  "Сангар",
  "Саскылах",
  "Среднеколымск",
  "Сунтар",
  "Тикси",
  "Усть-Мая",
  "Усть-Нера",
  "Хандыга",
  "Хонуу",
  "Черский",
  "Чокурдах",
  "Чурапча",
  "Якутск",
  "Александровск-Сахалинский",
  "Анбэцу",
  "Анива",
  "Бошняково",
  "Быков",
  "Вахрушев",
  "Взморье",
  "Гастелло",
  "Горнозаводск",
  "Долинск",
  "Ильинский",
  "Катангли",
  "Корсаков",
  "Курильск",
  "Макаров",
  "Невельск",
  "Ноглики",
  "Оха",
  "Поронайск",
  "Северо-Курильск",
  "Смирных",
  "Томари",
  "Тымовское",
  "Углегорск",
  "Холмск",
  "Шахтерск",
  "Южно-Курильск",
  "Южно-Сахалинск",
  "Алапаевск",
  "Алтынай",
  "Арамиль",
  "Артемовский",
  "Арти",
  "Асбест",
  "Ачит",
  "Байкалово",
  "Басьяновский",
  "Белоярский",
  "Березовский",
  "Богданович",
  "Буланаш",
  "Верхний Тагил",
  "Верхняя Пышма",
  "Верхняя Салда",
  "Верхняя Синячиха",
  "Верхняя Сысерть",
  "Верхняя Тура",
  "Верхотурье",
  "Висим",
  "Волчанск",
  "Воронцовка",
  "Гари",
  "Дегтярск",
  "Екатеринбург",
  "Ертарский",
  "Заводоуспенское",
  "Зыряновский",
  "Зюзельский",
  "Ивдель",
  "Изумруд",
  "Ирбит",
  "Ис",
  "Каменск-Уральский",
  "Камышлов",
  "Карпинск",
  "Карпунинский",
  "Качканар",
  "Кировград",
  "Краснотурьинск",
  "Красноуральск",
  "Красноуфимск",
  "Кушва",
  "Лесной",
  "Михайловск",
  "Невьянск",
  "Нижние Серги",
  "Нижний Тагил",
  "Нижняя Салда",
  "Нижняя Тура",
  "Новая Ляля",
  "Новоуральск",
  "Оус",
  "Первоуральск",
  "Полевской",
  "Пышма",
  "Ревда",
  "Реж",
  "Свердловск",
  "Североуральск",
  "Серов",
  "Сосьва",
  "Среднеуральск",
  "Сухой Лог",
  "Сысерть",
  "Таборы",
  "Тавда",
  "Талица",
  "Тугулым",
  "Туринск",
  "Туринская Слобода",
  "Алагир",
  "Ардон",
  "Беслан",
  "Бурон",
  "Владикавказ",
  "Дигора",
  "Моздок",
  "Орджоникидзе",
  "Чикола",
  "Велиж",
  "Верхнеднепровский",
  "Ворга",
  "Вязьма",
  "Гагарин",
  "Глинка",
  "Голынки",
  "Демидов",
  "Десногорск",
  "Дорогобуж",
  "Духовщина",
  "Екимовичи",
  "Ельня",
  "Ершичи",
  "Издешково",
  "Кардымово",
  "Красный",
  "Монастырщина",
  "Новодугино",
  "Починок",
  "Рославль",
  "Рудня",
  "Сафоново",
  "Смоленск",
  "Сычевка",
  "Угра",
  "Хиславичи",
  "Холм-Жирковский",
  "Шумячи",
  "Ярцево",
  "Александровское",
  "Арзгир",
  "Благодарный",
  "Буденновск",
  "Георгиевск",
  "Дивное",
  "Домбай",
  "Донское",
  "Ессентуки",
  "Железноводск",
  "Зеленокумск",
  "Изобильный",
  "Иноземцево",
  "Ипатово",
  "Карачаевск",
  "Кисловодск",
  "Кочубеевское",
  "Красногвардейское",
  "Курсавка",
  "Левокумское",
  "Минеральные Воды",
  "Невинномысск",
  "Нефтекумск",
  "Новоалександровск",
  "Новоалександровская",
  "Новопавловск",
  "Новоселицкое",
  "Преградная",
  "Пятигорск",
  "Светлоград",
  "Солнечнодольск",
  "Ставрополь",
  "Степное",
  "Теберда",
  "Усть-Джегута",
  "Хабез",
  "Черкесск",
  "Бондари",
  "Гавриловка Вторая",
  "Жердевка",
  "Знаменка",
  "Инжавино",
  "Кирсанов",
  "Котовск",
  "Мичуринск",
  "Мордово",
  "Моршанск",
  "Мучкапский",
  "Первомайский",
  "Петровское",
  "Пичаево",
  "Рассказово",
  "Ржакса",
  "Староюрьево",
  "Тамбов",
  "Токаревка",
  "Уварово",
  "Умет",
  "Агрыз",
  "Азнакаево",
  "Аксубаево",
  "Актюбинский",
  "Алексеевское",
  "Альметьевск",
  "Альметьевск",
  "Апастово",
  "Арск",
  "Бавлы",
  "Базарные Матаки",
  "Балтаси",
  "Богатые Сабы",
  "Брежнев",
  "Бугульма",
  "Буинск",
  "Васильево",
  "Верхний Услон",
  "Высокая Гора",
  "Дербешкинский",
  "Елабуга",
  "Заинск",
  "Зеленодольск",
  "Казань",
  "Камское Устье",
  "Карабаш",
  "Куйбышев",
  "Кукмод",
  "Кукмор",
  "Лаишево",
  "Лениногорск",
  "Мамадыш",
  "Менделеевск",
  "Мензелинск",
  "Муслюмово",
  "Набережные Челны",
  "Нижнекамск",
  "Новошешминск",
  "Нурлат",
  "Пестрецы",
  "Рыбная Слобода",
  "Сарманово",
  "Старое Дрожжаное",
  "Тетюши",
  "Чистополь",
  "Андреаполь",
  "Бежецк",
  "Белый",
  "Белый Городок",
  "Березайка",
  "Бологое",
  "Васильевский Мох",
  "Выползово",
  "Вышний Волочек",
  "Жарковский",
  "Западная Двина",
  "Заречье",
  "Зубцов",
  "Изоплит",
  "Калашниково",
  "Калинин",
  "Калязин",
  "Кашин",
  "Кесова Гора",
  "Кимры",
  "Конаково",
  "Красный Холм",
  "Кувшиново",
  "Лесное",
  "Лихославль",
  "Максатиха",
  "Молоково",
  "Нелидово",
  "Оленино",
  "Осташков",
  "Пено",
  "Рамешки",
  "Ржев",
  "Сандово",
  "Селижарово",
  "Сонково",
  "Спирово",
  "Старица",
  "Тверь",
  "Торжок",
  "Торопец",
  "Удомля",
  "Фирово",
  "Александровское",
  "Асино",
  "Бакчар",
  "Батурино",
  "Белый Яр",
  "Зырянское",
  "Итатка",
  "Каргасок",
  "Катайга",
  "Кожевниково",
  "Колпашево",
  "Кривошеино",
  "Мельниково",
  "Молчаново",
  "Парабель",
  "Первомайское",
  "Подгорное",
  "Северск",
  "Стрежевой",
  "Томск",
  "Тымск",
  "Ак-Довурак",
  "Бай Хаак",
  "Кызыл",
  "Самагалтай",
  "Сарыг-Сеп",
  "Суть-Холь",
  "Тоора-Хем",
  "Туран",
  "Тээли",
  "Хову-Аксы",
  "Чадан",
  "Шагонар",
  "Эрзин",
  "Агеево",
  "Алексин",
  "Арсеньево",
  "Барсуки",
  "Бегичевский",
  "Белев",
  "Богородицк",
  "Болохово",
  "Велегож",
  "Венев",
  "Волово",
  "Горелки",
  "Донской",
  "Дубна",
  "Епифань",
  "Ефремов",
  "Заокский",
  "Казановка",
  "Кимовск",
  "Киреевск",
  "Куркино",
  "Ленинский",
  "Новомосковск",
  "Одоев",
  "Плавск",
  "Суворов",
  "Тула",
  "Узловая",
  "Щекино",
  "Ясногорск",
  "Абатский",
  "Аксарка",
  "Армизонское",
  "Аромашево",
  "Белоярский",
  "Бердюжье",
  "Большое Сорокино",
  "Вагай",
  "Викулово",
  "Винзили",
  "Голышманово",
  "Губкинский",
  "Заводопетровский",
  "Заводоуковск",
  "Излучинск",
  "Исетское",
  "Ишим",
  "Казанское",
  "Казым-Мыс",
  "Когалым",
  "Кондинское",
  "Красноселькуп",
  "Лабытнанги",
  "Ларьяк",
  "Мегион",
  "Мужи",
  "Муравленко",
  "Надым",
  "Находка",
  "Нефтеюганск",
  "Нижневартовск",
  "Нижняя Тавда",
  "Новый Уренгой",
  "Ноябрьск",
  "Нягань",
  "Октябрьское",
  "Омутинский",
  "Радужный",
  "Салехард",
  "Сладково",
  "Советский",
  "Сургут",
  "Тазовский",
  "Тарко-Сале",
  "Тобольск",
  "Тюмень",
  "Уват",
  "Унъюган",
  "Упорово",
  "Урай",
  "Ханты-Мансийск",
  "Юрибей",
  "Ялуторовск",
  "Яр-Сале",
  "Ярково",
  "Алнаши",
  "Балезино",
  "Вавож",
  "Воткинск",
  "Глазов",
  "Грахово",
  "Дебесы",
  "Завьялово",
  "Игра",
  "Ижевск",
  "Кама",
  "Камбарка",
  "Каракулино",
  "Кез",
  "Кизнер",
  "Киясово",
  "Красногорское",
  "Можга",
  "Сарапул",
  "Селты",
  "Сюмси",
  "Ува",
  "Устинов",
  "Шаркан",
  "Юкаменское",
  "Якшур-Бодья",
  "Яр",
  "Базарный Сызган",
  "Барыш",
  "Большое Нагаткино",
  "Вешкайма",
  "Глотовка",
  "Димитровград",
  "Игнатовка",
  "Измайлово",
  "Инза",
  "Ишеевка",
  "Канадей",
  "Карсун",
  "Кузоватово",
  "Майна",
  "Новая Малыкла",
  "Новоспасское",
  "Павловка",
  "Радищево",
  "Сенгилей",
  "Старая Кулатка",
  "Старая Майна",
  "Сурское",
  "Тереньга",
  "Ульяновск",
  "Чердаклы",
  "Аксай",
  "Дарьинское",
  "Деркул",
  "Джамбейты",
  "Джаныбек",
  "Казталовка",
  "Калмыково",
  "Каратобе",
  "Переметное",
  "Сайхин",
  "Уральск",
  "Федоровка",
  "Фурманово",
  "Чапаев",
  "Амурск",
  "Аян",
  "Березовый",
  "Бикин",
  "Бира",
  "Биракан",
  "Богородское",
  "Болонь",
  "Ванино",
  "Волочаевка Вторая",
  "Высокогорный",
  "Вяземский",
  "Горный",
  "Гурское",
  "Дормидонтовка",
  "Заветы Ильича",
  "Известковый",
  "Иннокентьевка",
  "Комсомольск-на-Амуре",
  "Ленинское",
  "Нелькан",
  "Николаевск-на-Амуре",
  "Облучье",
  "Охотск",
  "Переяславка",
  "Смидович",
  "Советская Гавань",
  "Софийск",
  "Троицкое",
  "Тугур",
  "Хабаровск",
  "Чегдомын",
  "Чумикан",
  "Абакан",
  "Саяногорск",
  "Аган",
  "Игрим",
  "Излучинск",
  "Лангепас",
  "Лянтор",
  "Мегион",
  "Нефтеюганск",
  "Нижневартовск",
  "Нягань",
  "Покачи",
  "Приобье",
  "Пыть-Ях",
  "Радужный",
  "Сургут",
  "Урай",
  "Ханты-Мансийск",
  "Югорск",
  "Агаповка",
  "Аргаяш",
  "Аша",
  "Бакал",
  "Бреды",
  "Варна",
  "Верхнеуральск",
  "Верхний Уфалей",
  "Еманжелинск",
  "Златоуст",
  "Карабаш",
  "Карталы",
  "Касли",
  "Катав-Ивановск",
  "Копейск",
  "Коркино",
  "Кунашак",
  "Куса",
  "Кыштым",
  "Магнитогорск",
  "Миасс",
  "Озерск",
  "Октябрьское",
  "Пласт",
  "Сатка",
  "Сим",
  "Снежинск",
  "Трехгорный",
  "Троицк",
  "Увельский",
  "Уйское",
  "Усть-Катав",
  "Фершампенуаз",
  "Чебаркуль",
  "Челябинск",
  "Чесма",
  "Южно-Уральск",
  "Юрюзань",
  "Аргун",
  "Грозный",
  "Гудермез",
  "Малгобек",
  "Назрань",
  "Наурская",
  "Ножай-Юрт",
  "Орджоникидзевская",
  "Советское",
  "Урус-Мартан",
  "Шали",
  "Агинское",
  "Аксеново-Зиловское",
  "Акша",
  "Александровский Завод",
  "Амазар",
  "Арбагар",
  "Атамановка",
  "Балей",
  "Борзя",
  "Букачача",
  "Газимурский Завод",
  "Давенда",
  "Дарасун",
  "Дровяная",
  "Дульдурга",
  "Жиндо",
  "Забайкальск",
  "Итака",
  "Калга",
  "Карымское",
  "Кличка",
  "Ключевский",
  "Кокуй",
  "Краснокаменск",
  "Красный Чикой",
  "Кыра",
  "Моготуй",
  "Могоча",
  "Нерчинск",
  "Нерчинский Завод",
  "Нижний Часучей",
  "Оловянная",
  "Первомайский",
  "Петровск-Забайкальский",
  "Приаргунск",
  "Сретенск",
  "Тупик",
  "Улеты",
  "Хилок",
  "Чара",
  "Чернышевск",
  "Чита",
  "Шелопугино",
  "Шилка",
  "Алатырь",
  "Аликово",
  "Батырева",
  "Буинск",
  "Вурнары",
  "Ибреси",
  "Канаш",
  "Киря",
  "Комсомольское",
  "Красноармейское",
  "Красные Четаи",
  "Кугеси",
  "Мариинский Посад",
  "Моргауши",
  "Новочебоксарск",
  "Порецкое",
  "Урмары",
  "Цивильск",
  "Чебоксары",
  "Шемурша",
  "Шумерля",
  "Ядрин",
  "Яльчики",
  "Янтиково",
  "Анадырь",
  "Билибино",
  "Губкинский",
  "Заполярный",
  "Муравленко",
  "Надым",
  "Новый Уренгой",
  "Ноябрьск",
  "Пуровск",
  "Салехард",
  "Тарко",
  "Андропов",
  "Берендеево",
  "Большое Село",
  "Борисоглебский",
  "Брейтово",
  "Бурмакино",
  "Варегово",
  "Волга",
  "Гаврилов Ям",
  "Данилов",
  "Любим",
  "Мышкино",
  "Некрасовское",
  "Новый Некоуз",
  "Переславль-Залесский",
  "Пошехонье-Володарск",
  "Ростов",
  "Рыбинск",
  "Тутаев",
  "Углич",
  "Ярославль",
];

//http://api.queenbohemia.ru
//127.0.0.1:3010

const SERVER_URL = "https://api.queenbohemia.ru";

export { cities, SERVER_URL };

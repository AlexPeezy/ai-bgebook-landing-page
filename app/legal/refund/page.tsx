export default function RefundPage() {
  return (
    <article className="prose prose-invert prose-cyan max-w-none">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 font-heading">
        Политика за връщане на средства
      </h1>

      <p className="text-gray-300 mb-6">
        Последна актуализация: Февруари 2026
      </p>

      <section className="mb-8 bg-cyan/10 border border-cyan/30 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-cyan mb-4">30-дневна гаранция за връщане на парите</h2>
        <p className="text-gray-300">
          Вярваме в качеството на нашата книга. Ако не сте напълно доволни от покупката си, имате право на пълно възстановяване на сумата в рамките на 30 дни от датата на покупка - без въпроси!
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Как да поискате възстановяване</h2>
        <p className="text-gray-300 mb-4">
          Процесът е прост:
        </p>
        <ol className="list-decimal list-inside text-gray-300 space-y-3">
          <li>
            <strong>Изпратете имейл</strong> на{' '}
            <a href="mailto:support@aiebook.bg" className="text-cyan hover:underline">
              support@aiebook.bg
            </a>
          </li>
          <li>
            <strong>Посочете</strong> имейла, използван при покупката
          </li>
          <li>
            <strong>Опишете накратко</strong> причината за връщането (по желание)
          </li>
          <li>
            <strong>Получете възстановяване</strong> в рамките на 5-7 работни дни
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Условия за възстановяване</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Заявката трябва да бъде подадена в рамките на 30 дни от покупката</li>
          <li>Възстановяването се извършва по същия метод на плащане</li>
          <li>Един клиент може да поиска възстановяване само веднъж</li>
          <li>След възстановяване губите достъп до книгата и бъдещи актуализации</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Време за обработка</h2>
        <p className="text-gray-300 mb-4">
          Обикновено обработваме заявки за възстановяване в рамките на:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong>1-2 работни дни</strong> - преглед и одобрение на заявката</li>
          <li><strong>3-5 работни дни</strong> - обработка от Stripe</li>
          <li><strong>1-3 работни дни</strong> - отразяване в банковата ви сметка</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Защо предлагаме тази гаранция?</h2>
        <p className="text-gray-300 mb-4">
          Вярваме, че книгата &quot;Как да превърнеш AI в реален доход&quot; предоставя реална стойност. Нашата цел е да ви помогнем да успеете, затова поемаме целия риск от покупката. Ако съдържанието не отговаря на очакванията ви, предпочитаме да върнем парите и да останем в добри отношения.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Изключения</h2>
        <p className="text-gray-300 mb-4">
          Възстановяване не се предоставя в следните случаи:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Заявка след изтичане на 30-дневния период</li>
          <li>Повторна покупка след вече получено възстановяване</li>
          <li>Доказано нарушение на правилата за ползване (препродажба, споделяне)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Често задавани въпроси</h2>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Трябва ли да посоча причина?</h3>
            <p className="text-gray-300 text-sm">
              Не, не е задължително. Ценим обратната връзка, но не е условие за възстановяване.
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Ще получа ли пълната сума?</h3>
            <p className="text-gray-300 text-sm">
              Да, връщаме 100% от платената сума. Без скрити такси.
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Мога ли да купя отново след възстановяване?</h3>
            <p className="text-gray-300 text-sm">
              Да, но повторна покупка не подлежи на гаранцията за връщане.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Контакт</h2>
        <p className="text-gray-300">
          За заявки за възстановяване или въпроси, свържете се с нас на{' '}
          <a href="mailto:support@aiebook.bg" className="text-cyan hover:underline">
            support@aiebook.bg
          </a>
        </p>
      </section>
    </article>
  );
}

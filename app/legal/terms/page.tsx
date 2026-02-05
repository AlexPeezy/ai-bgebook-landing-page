export default function TermsPage() {
  return (
    <article className="prose prose-invert prose-cyan max-w-none">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 font-heading">
        Правила за ползване
      </h1>

      <p className="text-gray-300 mb-6">
        Последна актуализация: Февруари 2026
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">1. Общи условия</h2>
        <p className="text-gray-300 mb-4">
          Като закупувате електронната книга &quot;Как да превърнеш AI в реален доход&quot;, вие се съгласявате с настоящите условия за ползване. Моля, прочетете ги внимателно преди покупка.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">2. Лиценз за ползване</h2>
        <p className="text-gray-300 mb-4">
          При покупка получавате личен, неизключителен лиценз за използване на съдържанието. Имате право да:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
          <li>Четете книгата на неограничен брой лични устройства</li>
          <li>Използвате промптите и стратегиите в личния и комерсиален контекст</li>
          <li>Прилагате наученото в собствения си бизнес</li>
        </ul>
        <p className="text-gray-300 mb-4">
          Нямате право да:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Препродавате, разпространявате или споделяте книгата с трети лица</li>
          <li>Копирате съдържанието за публикуване другаде</li>
          <li>Използвате съдържанието за създаване на конкурентен продукт</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">3. Плащане и доставка</h2>
        <p className="text-gray-300 mb-4">
          Всички плащания се обработват сигурно чрез Stripe. След успешно плащане получавате:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Моментален достъп до PDF файла на книгата</li>
          <li>Имейл с линк за изтегляне</li>
          <li>Безплатни бъдещи актуализации</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">4. Гаранция за връщане на парите</h2>
        <p className="text-gray-300 mb-4">
          Предлагаме 30-дневна гаранция за връщане на парите. Ако не сте доволни от книгата по каквато и да е причина, свържете се с нас на <a href="mailto:support@aiebook.bg" className="text-cyan hover:underline">support@aiebook.bg</a> и ще ви възстановим пълната сума.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">5. Интелектуална собственост</h2>
        <p className="text-gray-300 mb-4">
          Цялото съдържание на книгата, включително текст, графики, промпти и стратегии, е защитено от авторско право. Нарушаването на тези права може да доведе до правни последици.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">6. Отказ от отговорност</h2>
        <p className="text-gray-300 mb-4">
          Съдържанието на книгата е с образователна цел. Резултатите може да варират в зависимост от индивидуалните усилия и приложение. Не гарантираме конкретни финансови резултати.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">7. Промени в условията</h2>
        <p className="text-gray-300 mb-4">
          Запазваме правото да актуализираме тези условия. При съществени промени ще уведомим съществуващите клиенти по имейл.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">8. Контакт</h2>
        <p className="text-gray-300">
          За въпроси относно тези условия, свържете се с нас на{' '}
          <a href="mailto:support@aiebook.bg" className="text-cyan hover:underline">
            support@aiebook.bg
          </a>
        </p>
      </section>
    </article>
  );
}

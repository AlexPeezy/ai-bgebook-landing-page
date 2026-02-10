export default function PrivacyPage() {
  return (
    <article className="prose prose-invert prose-cyan max-w-none">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 font-heading">
        Политика за поверителност
      </h1>

      <p className="text-gray-300 mb-6">
        Последна актуализация: Февруари 2026
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">1. Въведение</h2>
        <p className="text-gray-300 mb-4">
          Защитата на личните ви данни е важна за нас. Тази политика обяснява как събираме, използваме и защитаваме вашата информация при покупка на електронната книга &quot;Как да превърнеш AI в реален доход&quot;.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">2. Какви данни събираме</h2>
        <p className="text-gray-300 mb-4">
          При покупка събираме следната информация:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong>Имейл адрес</strong> - за доставка на книгата и комуникация</li>
          <li><strong>Данни за плащане</strong> - обработвани сигурно от Stripe</li>
          <li><strong>Информация за транзакцията</strong> - дата, сума, статус на поръчката</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">3. Как използваме данните</h2>
        <p className="text-gray-300 mb-4">
          Вашите данни се използват за:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Доставка на закупената електронна книга</li>
          <li>Изпращане на безплатни актуализации на книгата</li>
          <li>Отговор на въпроси за поддръжка</li>
          <li>Подобряване на нашите продукти и услуги</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">4. Защита на данните</h2>
        <p className="text-gray-300 mb-4">
          Прилагаме индустриални стандарти за сигурност:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>SSL криптиране на всички комуникации</li>
          <li>Плащания се обработват от Stripe (PCI DSS съвместим)</li>
          <li>Не съхраняваме данни за кредитни карти</li>
          <li>Ограничен достъп до лични данни</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">5. Споделяне с трети страни</h2>
        <p className="text-gray-300 mb-4">
          Не продаваме и не споделяме личните ви данни с трети страни, освен:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong>Stripe</strong> - за обработка на плащания</li>
          <li><strong>Имейл услуги</strong> - за доставка на книгата</li>
          <li><strong>При законово изискване</strong> - съгласно приложимото законодателство</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">6. Вашите права (GDPR)</h2>
        <p className="text-gray-300 mb-4">
          Като потребител в ЕС имате право да:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Получите копие на личните си данни</li>
          <li>Поискате корекция на неточни данни</li>
          <li>Поискате изтриване на данните си</li>
          <li>Оттеглите съгласието си по всяко време</li>
          <li>Подадете жалба до надзорен орган</li>
        </ul>
        <p className="text-gray-300 mt-4">
          За упражняване на тези права, свържете се с нас на{' '}
          <a href="mailto:contact@bgpromptbook.shop" className="text-cyan hover:underline">
            contact@bgpromptbook.shop
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">7. Бисквитки</h2>
        <p className="text-gray-300 mb-4">
          Използваме минимален брой бисквитки за:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Основна функционалност на сайта</li>
          <li>Запомняне на предпочитанията ви</li>
          <li>Анализ на посещаемостта (анонимизиран)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">8. Съхранение на данни</h2>
        <p className="text-gray-300 mb-4">
          Съхраняваме личните ви данни за периода, необходим за:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Изпълнение на покупката</li>
          <li>Изпращане на актуализации на книгата</li>
          <li>Спазване на счетоводни и данъчни изисквания</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">9. Контакт</h2>
        <p className="text-gray-300">
          За въпроси относно поверителността, свържете се с нас на{' '}
          <a href="mailto:contact@bgpromptbook.shop" className="text-cyan hover:underline">
            contact@bgpromptbook.shop
          </a>
        </p>
      </section>
    </article>
  );
}

import React from "react";

const ErrorFetchPizzas: React.FC = () => {
  const [isFraud, setIsFraud] = React.useState(0);

  return (
    <div className="cart cart--empty">
      {isFraud === 0 ? (
        <>
          <h2>
            Ошибка на сервере.. <span>😕</span>
          </h2>
          <p>
            Вероятно, что программисты устрили бунт в пиццерии.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img
            src="https://tominvv.ru/wp-content/uploads/2015/05/Oops-560x496.png"
            alt="Error"
          />
          <div onClick={() => setIsFraud(1)} className="button button--black">
            <span>На главную...</span>
          </div>
        </>
      ) : (
        <>
          <h2>
            ХАХАХА <span>😆</span>
          </h2>
          <h1>Ты и так на главной!!!111111 </h1>
          <img
            src="https://memchik.ru//images/memes/5fb44b37b1c7e352e05fe780.jpg"
            alt="Error"
          />
        </>
      )}
    </div>
  );
};

export default ErrorFetchPizzas;

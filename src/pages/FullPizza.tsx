import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
  const typeName = ["тонкое", "традиционное"];
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    sizes: number[];
    types: number[];
  }>();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await Axios.get(
          "https://64dfcc7d71c3335b25831222.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div className="loadFullPizza">
        <h2>Идет загрузка...</h2>
        <span className="loader"></span>
      </div>
    );
  } else {
    return (
      <div className="info">
        <div>
          <Link to="/" className="button button--black">
            <span>Назад</span>
          </Link>
          <img src={pizza.imageUrl} alt="" />
          <h1>{pizza.title}</h1>
          <table className="tableInfo">
            <tr>
              <td className="columnName">Цена от:</td>
              <td className="columnName">Размеры</td>
              <td className="columnName">Тесто</td>
            </tr>
            <tr>
              <td>
                <li>{pizza.price}</li>
              </td>
              <td>
                {pizza.sizes.map((size, index) => (
                  <li key={index}>{size} см.</li>
                ))}
              </td>
              <td>
                {pizza.types.map((typeId, index) => (
                  <li key={index}>{typeName[typeId]}</li>
                ))}
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
};

export default FullPizza;

import ProductImages from "./ProductImages";
import CartIcon from "../../../../public/svg/CartIcon.svg";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { TechSpecsQuery } from "./ProductDetailsQuery";
import { Skeleton } from '@chakra-ui/react';

function ProductDetails({ productDetails }) {
  const details = productDetails?.products[0];
  const id = details.id;

  const [isAvailable, setAvailable] = useState(null);

  const { loading, error, data } = useQuery(TechSpecsQuery, {
    variables: { id },
  });


  let techFields = [];
  let techFieldsSecond = [];

  if (data && data.techSpecs && data.techSpecs.fields) {
    const fields = data.techSpecs.fields;
    if (fields.length > 7) {
      techFields = fields.slice(0, Math.round(fields.length / 2))
      techFieldsSecond = fields.slice(Math.round(fields.length / 2))
    } else {
      techFields = fields;
    }
  }

  const fieldsLength = data?.techSpecs.fields.length;
  // console.log(techSpecs);
  // const firstHalf = fieldsLength / 2 - 1;
  // const secondHalf = fieldsLength / 2;
  // console.log(firstHalf, secondHalf);

  useEffect(() => {
    if (details.available) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  }, []);

  const createMarkup = (html) => {
    return {
      __html: html,
    };
  };

  const [counter, setCounter] = useState(0);

  const handleAdd = () => {
    setCounter(counter + 1);
  };

  const handleRemove = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <>
      <div className="product-details-container">
        <div className="product-details-flex">
          <div className="product-details-slideshow">
            <ProductImages images={details.images} />
          </div>
          <div className="product-details-content">
            <h1 className="product-details-title">{details.name}</h1>
            <div className="product-details-info">
              {isAvailable ? (
                <p className="product-details-in-stock">
                  Produsul este în stoc
                </p>
              ) : (
                <p className="product-details-not-in-stock">
                  Produsul nu este în stoc
                </p>
              )}

              <p className="product-details-serial-nb">{details.articleCode}</p>
            </div>
            <div
              className="product-details-text"
              dangerouslySetInnerHTML={createMarkup(details.description)}
            />
            <div className="product-details-cart-price">
              <h1 className="product-details-price">{details.price} lei</h1>

              <div className="product-details-add-to-cart-flex">
                <div className="product-details-counter">
                  <div
                    className="product-details-counters"
                    onClick={handleRemove}
                  >
                    <p>-</p>
                  </div>
                  <div className="product-details-center-counter">
                    <p>{counter}</p>
                  </div>
                  <div className="product-details-counters" onClick={handleAdd}>
                    <p>+</p>
                  </div>
                </div>

                <div className="product-details-add-to-cart">
                  <CartIcon />
                  <p className="product-details-add-text">Adaugă în coș</p>
                </div>
              </div>
            </div>
            <div className="product-details-questions">
              <p>Ai o intrebare?</p>&nbsp;
              <a>Contactează-ne</a>
            </div>
          </div>
        </div>

        {/* Characteristics tables */}

        {!loading && <div className="characteristics-tables">
          <div className="characteristics-table">
            <table className="table">
              <thead>
              <tr className="table-head">
                <th>Caracteristici</th>
              </tr>
              </thead>
              <tbody>
              {techFields.map((spec, index) => {
                return (
                  <tr key={index}>
                    <th>{spec.name}</th>
                    <td>{spec.value}</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
          {techFieldsSecond.length > 0 &&
          <div className="characteristics-table" style={{ marginLeft: '56px' }}>
            <table className="table">
              <thead>
              <tr className="table-head">
                <th>Caracteristici</th>
              </tr>
              </thead>
              <tbody>
              {techFieldsSecond.map((spec, index) => {
                return (
                  <tr key={index}>
                    <th>{spec.name}</th>
                    <td>{spec.value}</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
          }
        </div>
        }
        { loading &&
        <div className='flex-row full-width' style={{ margin: '80px 0 62px' }}>
          <div className='full-width'>
            <Skeleton height='51px' style={{ borderRadius: '16px' }} />
            <Skeleton height='201px' style={{ marginTop: '16px', borderRadius: '16px' }} />
          </div>
          <div className='full-width' style={{ marginLeft: '56px' }}>
            <Skeleton height='51px' style={{ borderRadius: '16px' }} />
            <Skeleton height='201px' style={{ marginTop: '16px', borderRadius: '16px' }} />
          </div>
        </div>}
      </div>
    </>
  );
}

export default ProductDetails;

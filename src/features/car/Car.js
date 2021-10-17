import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCarData, clearCarData, selectCar } from "./carSlice";
import { CarsData } from "./cars-data";

// Car component
export function Car() {
  // car data wich is available in state to pick
  // useSelector is a hook provided by react-redux, it returns data, when get changed data then it returns new data
  const cars = useSelector(selectCar);
  //   console.log(cars);
  // Internal state is to dispatch an action
  const dispatch = useDispatch();

  // function to dump cars into state
  const loadCars = () => {
    dispatch(setCarData(CarsData));
  };

  // function to format price to kilo(K) and million(M)
  const formatPrice = (amt) => {
    if (amt > 1000 && amt < 1000000) {
      return `${parseFloat((amt / 1000).toFixed(2))}K`;
    }
    if (amt > 1000000) {
      return `${parseFloat((amt / 1000000).toFixed(2))}M`;
    }
    return amt;
  };

  // function return details of car which is highest in the list
  /**
   *
   * @returns string formatted car details
   */
  const getHighestPriceCar = () => {
    const car = cars.reduce(
      (acc, item) => {
        return item.price >= acc.price ? item : acc;
      },
      {
        brand: "",
        modal: "",
        body_style: "",
        variant: "",
        price: 0,
      }
    );
    return `${car.brand} ${car.modal} ${car.variant} ${
      car.body_style
    } - Php ${formatPrice(car.price)}`;
  };

  // function return cars are below 700000 from list
  /**
   *
   * @param {Number} range optional param filters below 700000
   * @returns list html p elements are contains each car details
   */
  const getLowestPriceCars = (range = 700000) => {
    const lowPriceCars = cars.filter((item) => {
      return item.price < range;
    });
    return lowPriceCars.map((car, idx) => (
      <p key={`${car.brand}-${car.modal}-${car.variant}-${car.body_style}`}>
        {`${idx + 1}. ${car.brand} ${car.modal} ${car.variant} ${
          car.body_style
        } - Php ${formatPrice(car.price)}`}
      </p>
    ));
  };

  // function return list of Hatchback cars
  /**
   *
   * @returns returns list of html p elements are contains car details
   */
  const getHatchbackCars = () => {
    const hatchbackCars = cars.reduce((acc, item) => {
      const modified = acc;
      const key = `${item.brand}-${item.modal}`;
      if (item.body_style === "Hatchback" && !(key in modified)) {
        modified[key] = { brand: item.brand, modal: item.modal };
      }
      return modified;
    }, {});
    return Object.keys(hatchbackCars).map((key, idx) => (
      <p key={key}>
        {`${idx + 1}. ${hatchbackCars[key].brand} ${hatchbackCars[key].modal}`}
      </p>
    ));
  };

  // function return total price of all Hatchback cars
  /**
   *
   * @returns returns string formatted output of total price
   */
  const getTotalPriceOfHatchbackCars = () => {
    const total = cars.reduce((acc, item) => {
      return item.body_style === "Hatchback" ? acc + item.price : acc;
    }, 0);
    return `Php ${formatPrice(total)}`;
  };

  // function return total price of all Sedan cars
  /**
   *
   * @returns returns string formatted output of total price
   */
  const getTotalPriceOfSedanCars = () => {
    const total = cars.reduce((acc, item) => {
      return item.body_style === "Sedan" ? acc + item.price : acc;
    }, 0);
    return `Php ${formatPrice(total)}`;
  };

  return (
    <div>
      <div className="row">
        <button aria-label="Load Cars..." onClick={() => loadCars()}>
          Load Cars...
        </button>
        &nbsp; &nbsp;
        <button
          aria-label="Clear Cars"
          onClick={() => dispatch(clearCarData())}
        >
          Clear Cars
        </button>
      </div>
      {cars.length > 0 && (
        <div className="row" style={{ textAlign: "left" }}>
          <div>
            <h1>Car with the highest price</h1>
            <p>{getHighestPriceCar()}</p>
          </div>
          <div>
            <h1>Car with less than 700000</h1>
            {getLowestPriceCars()}
          </div>
          <div>
            <h1>Car with offers Hatchback</h1>
            {getHatchbackCars()}
          </div>
          <div>
            <h1>Total Price of all Hatchback Cars</h1>
            <p>{getTotalPriceOfHatchbackCars()}</p>
          </div>
          <div>
            <h1>Total Price of all Sedan Car</h1>
            <p>{getTotalPriceOfSedanCars()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

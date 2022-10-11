import { legacy_createStore as createStore } from "redux";

let initialState = [
  {id: 8642356, title: 'Замена стекла', price: 2100},
  {id: 83569013, title: 'Замена дисплея', price: 2500},
  {id: 321567887, title: 'Замена аккумулятора', price: 4000},
  {id: 987345678, title: 'Замена микрофона', price: 2500},
]

const todos = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SERVICE": {
      return [
        ...state,
        {
          id: Date.now(),
          title: action.service.title,
          price: action.service.price,
        }
      ];
    }
    case "REMOVE_SERVICE": {
      return state.filter((service) => service.id !== action.id);
    }
    case "UPDATE_SERVICE": {
      return state.map((service) => 
      service.id === action.service.id ? { ...service, title: action.service.title, price:  action.service.price} : service
      );
    }
    case "FILTERED_SERVICE": {
      console.log(action.text);
      if (Boolean(action.text)) {
        return state.slice().filter((service) => service.title.toLocaleLowerCase().includes(action.text.toLocaleLowerCase()));
      }
      return state
    }
    default: {
      return state;
    }
  }
};

export const store = createStore(todos);

export const addService = (service) => ({
  type: "ADD_SERVICE",
  service,
});
export const removeService = (id) => ({
  type: "REMOVE_SERVICE",
  id
});
export const updateService = (service) => ({
  type: "UPDATE_SERVICE",
  service
});
export const filteredService = (text) => ({
  type: "FILTERED_SERVICE",
  text
});

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addService, removeService, updateService } from "./store";

export default function App() {
  const [text, setText] = useState("");
  const [id, setId] = useState(0);
  let services = useSelector((state) => state);

  const filterdServeces = () => {
    if (Boolean(text)) {
      services = services.filter((el) =>
        el.title.toLowerCase().includes(text)
      );
    }
  };

  filterdServeces()

  const getId = (id) => {
    setId(id);
  };

  const getText = (str) => {
    setText(str);
  };

  useEffect(() => {
    filterdServeces()
  }, [text]);

  return (
    <div className="App">
      <h1>Hello Redux Todo</h1>
      <NewServise id={id} getId={getId} />
      <br />
      <ServisesFilterName getText={getText} />
      <ServisesList services={services} getId={getId} />
    </div>
  );
}

const NewServise = ({ id, getId }) => {
  const service = useSelector((state) => state).find(
    (el) => el.id === id
  );

  const [formData, setFormData] = useState({
    title: "",
    price: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getService = () => {
      if (service) {
        const { title, price } = service;
        setFormData({ ...formData, title, price });
      }
    };
    getService();
  }, [service]);

  function fieldChangeHandle(evt) {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (service) {
      dispatch(updateService({ id, ...formData }));
      formReset();
    } else {
      dispatch(addService(formData));
      formReset();
    }
  };

  const formReset = () => {
    setFormData({ ...formData, title: "", price: "" });
    getId(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        onChange={fieldChangeHandle}
        value={formData.title}
      />
      <input
        type="text"
        name="price"
        onChange={fieldChangeHandle}
        value={formData.price}
      />
      <input type="submit" value="Add Todo" />
      {Boolean(id) && <input type="reset" value="Cancel" onClick={formReset} />}
    </form>
  );
};

const ServisesList = ({ services, getId }) => {
  const dispatch = useDispatch();

  const getServices = () => {
    return services.map((el) => (
      <li key={el.id}>
        {el.title}
        {el.price}
        <button onClick={() => getId(el.id)}>update</button>
        <button onClick={() => dispatch(removeService(el.id))}>delete</button>
      </li>
    ));
  };

  return <ul>{getServices()}</ul>;
};

const ServisesFilterName = ({ getText }) => {
  return <input type="text" onChange={({ target }) => getText(target.value)} />;
};

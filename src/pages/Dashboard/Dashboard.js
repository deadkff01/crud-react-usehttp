import React, { useState, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { useHttpInstance } from "services/baseUseHttp";
import Loader from "components/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { get, del, response, loading, error } = useHttpInstance();

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadItems() {
    const itemsResponse = await get("get-items");
    console.log(itemsResponse);
    if (response.ok) setItems(itemsResponse);
  }

  const deleteItem = async (id) => {
    await del(`delete-by-id/${id}`);
    if (response.ok) setItems(items.filter((item) => item.id !== id));
  };

  const goToItem = (id) => {
    navigate(`/item/${id}`);
  };

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto" data-testid="container">
      <h1 className="mt-5 text-4xl font-bold">Consoles</h1>
      <div className="mb-5 text-right">
        <button
          onClick={() => navigate(`/add-item`)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Item
        </button>
      </div>
      <ul className="grid grid-cols-3 gap-10">
        {items.map(({ id, name, price }) => (
          <li
            key={id}
            className="border-solid border-2 border-gray-600 max-w-sm rounded overflow-hidden shadow-lg p-2"
          >
            <h1 className="text-xl font-bold">{name}</h1>
            <h2 className="text-lg font-bold">{price}</h2>
            <button
              onClick={() => goToItem(id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5"
            >
              Details
            </button>
            <button
              onClick={() => deleteItem(id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import { useParams } from "@reach/router";
import { useHttpInstance } from "services/baseUseHttp";
import Input from "components/Input";
import TextArea from "components/TextArea";
import Loader from "components/Loader";

const Item = () => {
  const params = useParams();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const { get, put, response, loading, error } = useHttpInstance();

  useEffect(() => {
    loadItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadItem() {
    const item = await get(`get-item-by-id/${params.id}`);
    if (response.ok) {
      setId(item.id);
      setName(item.name);
      setPrice(item.price);
      setDescription(item.description);
    }
  }

  const updateItemRequest = async (id) => {
    const updatedItem = {
      name,
      price: Number(price),
      description,
    };
    await put(`update-item/${id}`, updatedItem);
  };

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mt-5 container mx-auto">
      <div className="mb-5">
        Name: <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="mb-5">
        Price:
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-10">
        Description:
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        onClick={() => updateItemRequest(id)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
    </div>
  );
};

export default Item;

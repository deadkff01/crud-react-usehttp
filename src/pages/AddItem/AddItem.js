import React, { useState } from "react";
import { useHttpInstance } from "services/baseUseHttp";
import Input from "components/Input";
import TextArea from "components/TextArea";
import Loader from "components/Loader";

const AddItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [showItemAdded, setShowItemAdded] = useState(false);
  const { post, response, loading, error } = useHttpInstance();

  const addItem = async () => {
    const itemToAdd = {
      name,
      price: Number(price),
      description,
    };
    await post(`add-item`, itemToAdd);
    if (response.ok) setShowItemAdded(true);
  };

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <Loader />;
  }

  if (showItemAdded) {
    return (
      <h1 className="mt-5 text-center text-4xl font-bold">
        Item successfully added!
      </h1>
    );
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
        onClick={addItem}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Item
      </button>
    </div>
  );
};

export default AddItem;

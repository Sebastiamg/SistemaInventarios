import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const CreateCatalog = () => {
  const [catalogDetailName, setCatalogDetailName] = useState("");
  const [id, setId] = useState(Math.floor(Math.random() * 1000));
  const [options, setOptions] = useState([]);
  const idCatalog = 3;

  // function to handle submit event
  const handleSubmitBrand = async (e) => {
    e.preventDefault();
    
    // make a POST request to create new catalog
    try {
        console.log("Mensaje");
        console.log(id, idCatalog, catalogDetailName);
      const response = await axios.post(
        "http://localhost/rest-api/api/create_catalog_op.php",
        {
          item: id,
          idCatalog: idCatalog,
          catalogDetailName: catalogDetailName,
        }
      );
      
      console.log(response.data);
      // display success message to user
      alert("Catalog created successfully!");
    } catch (error) {
      console.error(error);
      // display error message to user
      alert("Error creating catalog.");
    }
  };

  // function to handle change event for Autocomplete component
  const handleAutocompleteChange = (event, value) => {
    console.log("Autocomplete");
    console.log(event.target.value);
    setCatalogDetailName(value);
  };

  // function to fetch options for Autocomplete component
  const fetchOptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost/rest-api/api/get_catalog.php"
      );
      console.log(response.data);
      setOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmitBrand}>
      <div>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.catalogDetailName}
          onChange={handleAutocompleteChange}
          onOpen={fetchOptions}
          renderInput={(params) => (
            <TextField {...params} label="Catalog Detail Name" />
          )}
        />
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
};

export default CreateCatalog;
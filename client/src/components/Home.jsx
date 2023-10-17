import React, { useEffect, useState } from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import products from "../catalogue.json";
import searchIcon from "../assets/magnifying.png"
import filterIcon from "../assets/filter.png"

function Home() {

  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [catalog, setCatalog] = useState(products);
  const [filters, setFilters] = useState({
    gender: [],
    color: [],
    price: [],
    type:[],
    search: searchQuery,
  });

  useEffect(() => {
    const applyFilters = () => {
      console.log("applyfilters got fired with ", filters);
      const filteredCatalog = filterCatalog(products, filters);
      setCatalog(filteredCatalog);
    };
    applyFilters();
  }, [filters]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    let prevFilters = filters;
    prevFilters["search"] = e.target.value;
    setFilters(prevFilters);
    const applyFilters = () => {
      console.log("applyfilters got fired with ", filters);
      const filteredCatalog = filterCatalog(products, filters);
      setCatalog(filteredCatalog);
    };
    applyFilters();
  };

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;

    const updatedFilters = { ...filters };

    if (type === "checkbox") {
      if (!updatedFilters[name]) {
        updatedFilters[name] = []; // Initialize as an empty array if it doesn't exist
      }

      if (checked) {
        updatedFilters[name].push(value);
      } else {
        updatedFilters[name] = updatedFilters[name].filter(
          (filter) => filter !== value
        );
      }
    } else {
      updatedFilters[name] = value;
    }

    setFilters(updatedFilters);
  };

  const filterCatalog = (data, filters) => {
    return data.filter((item) => {
      // gender filter
      if (filters.gender.length > 0 && !filters.gender.includes(item.gender)) {
        return false;
      }
      // color filter
      if (filters.color.length > 0 && !filters.color.includes(item.color)) {
        return false;
      }
      //price filter
      if (filters.price.length > 0) {
        // Check if the item's price is within any of the selected price ranges
        if (
          !filters.price.some((priceRange) => {
            const [minPrice, maxPrice] = priceRange.split("-");
            const itemPrice = item.price;
            return (
              itemPrice >= parseInt(minPrice) && itemPrice <= parseInt(maxPrice)
            );
          })
        ) {
          return false;
        }
      }

      // type filter
      if(filters.type.length > 0 && !filters.type.includes(item.type)){
        return false;
      }

      if (filters.search && !item.name.toLowerCase().includes(filters.search)) {
        return false;
      }
      return true;
    });
  };

  return (
    <>
      <div className="search__wrapper">
        <input
          placeholder="search product name"
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearch}
        />
        <img className="search-icon" src={searchIcon} alt="" />
        <img onClick={toggleFilter} className="filter-icon" src={filterIcon} alt="" />
      </div>
      <div className={`home__wrapper ${filterOpen ? "filter-open" : ""}`}>
        <div className="filters__wrapper">
          <div className="filter">
            <h3>Color</h3>
            <div style={{ marginTop: "8px" }}>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name="color"
                value="Red"
              />
              <label className="filter_label" htmlFor="red">
                Red
              </label>
            </div>
            <div>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name="color"
                value="Blue"
              />
              <label className="filter_label" htmlFor="blue">
                Blue
              </label>
            </div>
            <div>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name="color"
                value="Green"
              />
              <label className="filter_label" htmlFor="green">
                Green
              </label>
            </div>
            
            <div>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name="color"
                value="Black"
              />
              <label className="filter_label" htmlFor="black">
                Black
              </label>
            </div>



            <h3 style={{ marginTop: "8px" }}>Gender</h3>
            <div style={{ marginTop: "8px" }}>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name="gender"
                value="Men"
              />
              <label className="filter_label" htmlFor="men">
                Men
              </label>
            </div>
            <div>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name="gender"
                value="Women"
              />
              <label className="filter_label" htmlFor="women">
                Women
              </label>
            </div>

            <h3 style={{ marginTop: "8px" }}>Price</h3>
            <div style={{ marginTop: "8px" }}>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name="price"
                value="0-250"
              />
              <label className="filter_label" htmlFor="0-250">
                0-Rs 250
              </label>
            </div>
            <div>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name="price"
                value="250-450"
              />
              <label className="filter_label" htmlFor="250-450">
                Rs 250-450
              </label>
            </div>
            <div>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name="price"
                value="400-501"
              />
              <label className="filter_label" htmlFor="400-500">
                Rs 450
              </label>
            </div>

            <h3 style={{ marginTop: "8px" }}>Type</h3>
            <div style={{ marginTop: "8px" }}>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name="type"
                value="Basic"
              />
              <label className="filter_label" htmlFor="type">
                Basic
              </label>
            </div>
            <div style={{ marginTop: "8px" }}>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name="type"
                value="Polo"
              />
              <label className="filter_label" htmlFor="type">
                Polo
              </label>
            </div>
            <div style={{ marginTop: "8px" }}>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name="type"
                value="Hoodie"
              />
              <label className="filter_label" htmlFor="type">
              Hoodie
              </label>
            </div>

          </div>
        </div>
        <div className="products__wrapper">
          {catalog &&
            catalog.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;

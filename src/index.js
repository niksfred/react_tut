import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";

const items = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleIsStocked = this.handleIsStocked.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
  }

  handleIsStocked() {
    this.props.handleCheckChange();
  }

  handleSearchFilter(e) {
    this.props.handleSearchFor(e.target.value);
  }

  render() {
    return (
      <form>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.searchFor}
            onChange={this.handleSearchFilter}
          ></input>
        </div>
        <div>
          <input
            type="checkbox"
            name="inStock"
            onClick={this.handleIsStocked}
          ></input>
          <label for="inStock">Only show items in stock</label>
        </div>
      </form>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const items = this.props.items;
    const categories = [
      ...new Set(
        items.map((el) => {
          return el.category;
        })
      ),
    ];

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            return (
              <>
                <ProductCategoryRow
                  key={`${index}-${category}`}
                  category={category}
                />
                {items
                  .filter((item) => {
                    return item.category === category;
                  })
                  .map((el, index) => {
                    return (
                      <ProductRow
                        key={`${el.name}-${index}`}
                        name={el.name}
                        price={el.price}
                      />
                    );
                  })}
              </>
            );
          })}
        </tbody>
      </table>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <b>{this.props.category}</b>
        </td>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const { price, name } = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>{price}</td>
      </tr>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: false, searchFor: "" };
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleSearchFor = this.handleSearchFor.bind(this);
  }

  handleCheckChange() {
    if (this.state.isChecked) {
      this.setState({ isChecked: false });
    } else {
      this.setState({ isChecked: true });
    }
  }

  handleSearchFor(searchValue) {
    this.setState({ searchFor: searchValue });
  }

  render() {
    let products = items;
    if (this.state.isChecked) {
      products = products.filter((el) => {
        return el.stocked === true;
      });
    }
    if (this.state.searchFor !== "") {
      products = products.filter((el) => {
        return el.name
          .toLowerCase()
          .includes(this.state.searchFor.toLowerCase());
      });
    }

    return (
      <div>
        <SearchBar
          isChecked={this.state.isChecked}
          searchFor={this.state.searchFor}
          handleCheckChange={this.handleCheckChange}
          handleSearchFor={this.handleSearchFor}
        />
        <ProductTable items={products} />
      </div>
    );
  }
}

ReactDOM.render(<FilterableProductTable />, document.getElementById("root"));

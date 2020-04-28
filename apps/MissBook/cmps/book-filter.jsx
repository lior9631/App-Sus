

export class BooksFilter extends React.Component {
  state = {
    filter: {
      title: "",
      minPrice: 0,
      maxPrice: 0
    },
  };

  handleChange = ({ target }) => {
    const field = target.name
    const value = (target.type === 'number') ? parseInt(target.value) : target.value

    this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }))
  }

  onFilter = (ev) => {
    ev.preventDefault()
    this.props.onSetFilter(this.state.filter)
  }

  render() {
    const { title, minPrice, maxPrice } = this.state.filter
    return (
      <section className="book-filter">

        <form onSubmit={this.onFilter} className="book-filter-form">
          <div>
            <label>Authors</label>
            <input type="text" name='title' value={title} onChange={this.handleChange} placeholder="Author name" />
          </div>
          <div className="book-price-filter">
            <label>price</label>
            <input type="number" name='minPrice' value={minPrice} onChange={this.handleChange} placeholder="Minimum" min="0" />
            <input type="number" name='maxPrice' value={maxPrice} onChange={this.handleChange} placeholder="Maximum" min="0" />
          </div>
          <button>OK</button>
        </form>
      </section>
    )
  }
}

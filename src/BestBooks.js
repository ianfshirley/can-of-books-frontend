import axios from 'axios';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  getBooks = async () => {
    try {
      let bookResults = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      this.setState({
        books: bookResults.data
      });
    } catch (error) {
      console.log('Error: ', error.response.data);
    }
  };

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    this.getBooks();
  }

  render() {

    let carouselItems = this.state.books.map((book) => (
      <Carousel.Item key={book._id}>
        <img
          className="placeholder"
          src="https://i.ibb.co/JxFXf2z/book.jpg"
          alt="book"
        />
        <Carousel.Caption>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ));
    /* TODO: render all the books in a Carousel */



    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {(this.state.books.length > 0) ? (
          <Container>
            <Carousel>
              {carouselItems}
            </Carousel>
          </Container>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    );
  }
}

export default BestBooks;

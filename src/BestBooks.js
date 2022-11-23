import axios from 'axios';
import React from 'react';
import BookFormModal from './BookFormModal';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Container} from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModal: false
    };
  }

  getBooks = async () => {
    try {
      let bookResults = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      this.setState({
        books: bookResults.data
      });
    } catch(error) {
      console.log('GET Error: ', error.response.data);
    }
  };

  // postBook = async (aBook) => {
  //   try {
  //     let addedBook = await axios.post(`${process.env.REACT_APP_SERVER}/books`, aBook);
  //   } catch(error) {
  //     console.log('GET Error: ', error.response.data);
  //   }
  // };

  handleOpenFormModal = (e) => {
    e.preventDefault();
    this.setState({
      isModal: true
    });
  };

  handleCloseFormModal = () => {
    this.setState({
      isModal: false
    });
  };

  handleSubmitBook = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value
    };
    this.postBook(newBook);
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
            <Button
              onClick={this.handleOpenFormModal}
              type="button"
              className="add-book-button"
            >
              Add a book
            </Button>
            <BookFormModal
              isModal = {this.state.isModal}
            >
            </BookFormModal>
          </Container>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    );
  }
}

export default BestBooks;

package com.bookstore.service;

import com.bookstore.model.Book;
import com.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> findAllBooks(){
        return bookRepository.findAll();
    }
    
    public Book updateBook(Long id, Book updatedBook) {
    Book existing = bookRepository.findById(id).orElseThrow();
    existing.setTitle(updatedBook.getTitle());
    existing.setAuthor(updatedBook.getAuthor());
    existing.setPrice(updatedBook.getPrice());
    // add any other fields that need updating
    return bookRepository.save(existing);
    }


    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}

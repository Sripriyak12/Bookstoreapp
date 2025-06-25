package com.bookstore.service;

import com.bookstore.model.Book;
import com.bookstore.model.CartItem;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartItemRepository cartRepo;
    @Autowired
    private BookRepository bookRepo;

    public List<CartItem> getCartItems(Long userId) {
    System.out.println("Fetching cart for user: " + userId);
    return cartRepo.findByUserId(userId); // this is likely where the exception happens
}


    public void addToCart(Long userId, Long bookId, int quantity) {
    Book book = bookRepo.findById(bookId)
        .orElseThrow(() -> new RuntimeException("Book not found"));

    // 🧠 Check if item already exists
    CartItem existingItem = cartRepo.findByUserIdAndBookId(userId, bookId);

    if (existingItem != null) {
        // ✅ If it exists, increment quantity
        existingItem.setQuantity(existingItem.getQuantity() + quantity);
        cartRepo.save(existingItem);
    } else {
        // 🆕 Otherwise, create new
        CartItem item = new CartItem();
        item.setUserId(userId);
        item.setBook(book);
        item.setQuantity(quantity);
        cartRepo.save(item);
    }
}


    public void removeFromCart(Long id) {
        cartRepo.deleteById(id);
    }
    public void updateQuantity(Long cartItemId, int quantity) {
    //CartItem item = cartRepo.findById(cartItemId).orElseThrow();
    CartItem item = cartRepo.findById(cartItemId)
    .orElseThrow(() -> new RuntimeException("CartItem not found with ID: " + cartItemId));

    item.setQuantity(quantity);
    cartRepo.save(item);
    }


    public BigDecimal calculateTotal(List<CartItem> items) {
        return items.stream()
                .map(item -> item.getBook().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}

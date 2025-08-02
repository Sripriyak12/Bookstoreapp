package com.bookstore.repository;

import com.bookstore.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserId(Long userId);
    CartItem findByUserIdAndBookId(Long userId, Long bookId);

    // ✅ Add this method so deleteByUserId() works
    void deleteByUserId(Long userId);
}

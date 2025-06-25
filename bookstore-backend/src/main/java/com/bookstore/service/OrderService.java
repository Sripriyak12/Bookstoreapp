package com.bookstore.service;

import com.bookstore.model.Order;
import com.bookstore.repository.OrderRepository;
import com.bookstore.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookstore.model.CartItem;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartItemRepository cartItemRepository;


    @Transactional
    public Order placeOrder(Long userId, double totalAmount) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
if (cartItems.isEmpty()) throw new RuntimeException("Cart is empty");

// Clone cart items
        List<CartItem> orderItems = cartItems.stream().map(item -> {
            CartItem copy = new CartItem();
            copy.setBook(item.getBook());
            copy.setQuantity(item.getQuantity());
            return copy;
        }).toList();

        Order order = new Order();
        order.setUserId(userId);
        order.setTotalAmount(BigDecimal.valueOf(totalAmount));
        order.setOrderDate(LocalDateTime.now());
        order.setItems(orderItems);
        orderRepository.save(order);

        cartItemRepository.deleteAll(cartItems); // Now it works!


    return order;
}


    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findWithItemsAndBooksByUserId(userId);
    }
}

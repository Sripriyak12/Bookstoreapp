package com.bookstore.service;

import com.bookstore.model.User;
import com.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public User login(String username, String password) {
    User user = userRepository.findByUsername(username).orElse(null);
    if (user != null && user.getPassword().equals(password)) {
        return user;
    }
    return null;
    }


    public User register(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password); // no encoding
        user.setRole("USER");
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
    return userRepository.findByUsername(username).orElse(null);
    }

}

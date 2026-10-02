package inventory.controller;
import java.util.Map;
import inventory.model.User;
import inventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import inventory.dto.SignupRequest; // Import your DTO class
import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
public ResponseEntity<?> registerUser(@RequestBody User user) {
    if (userRepository.existsByUsername(user.getUsername())) {
        return ResponseEntity.badRequest().body(Map.of("message", "Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(user.getEmail())) {
        return ResponseEntity.badRequest().body(Map.of("message", "Error: Email is already in use!"));
    }

    if (user.getRole() == null || user.getRole().isEmpty()) {
        user.setRole("ROLE_USER");
    }

    userRepository.save(user);
    return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
}

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        Optional<User> foundUser = userRepository.findByUsername(user.getUsername());

        if (foundUser.isPresent() && foundUser.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(foundUser.get());
        }

        return ResponseEntity.badRequest().body("Error: Invalid credentials!");
    }
}
package Com.LakshCode.SoftTech.controller;

import Com.LakshCode.SoftTech.dto.*;
import Com.LakshCode.SoftTech.security.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest request) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            UserDetails user = userDetailsService.loadUserByUsername(request.getUsername());
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(ApiResponse.success(
                    new AuthResponse(token, user.getUsername(), "ADMIN"),
                    "Login successful"
            ));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401)
                    .body(ApiResponse.error("Invalid username or password"));
        }
    }
    @GetMapping("/encode/{password}")
    public String encode(@PathVariable String password) {
        return new BCryptPasswordEncoder().encode(password);
    }
}
package Com.LakshCode.SoftTech.controller;

import Com.LakshCode.SoftTech.dto.ApiResponse;
import Com.LakshCode.SoftTech.entity.Testimonial;
import Com.LakshCode.SoftTech.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
public class TestimonialController {

    private final TestimonialRepository testimonialRepo;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Testimonial>>> getActive() {
        return ResponseEntity.ok(ApiResponse.success(
                testimonialRepo.findByActiveTrueOrderByCreatedAtDesc(), "Testimonials fetched"));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Testimonial>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(testimonialRepo.findAll(), "All testimonials fetched"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Testimonial>> create(@RequestBody Testimonial t) {
        return ResponseEntity.ok(ApiResponse.success(testimonialRepo.save(t), "Testimonial created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Testimonial>> update(@PathVariable Long id,
                                                           @RequestBody Testimonial updated) {
        return testimonialRepo.findById(id).map(t -> {
            t.setClientName(updated.getClientName());
            t.setCompany(updated.getCompany());
            t.setMessage(updated.getMessage());
            t.setRating(updated.getRating());
            t.setAvatarUrl(updated.getAvatarUrl());
            t.setActive(updated.getActive());
            return ResponseEntity.ok(ApiResponse.success(testimonialRepo.save(t), "Testimonial updated"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        testimonialRepo.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Testimonial deleted"));
    }
}
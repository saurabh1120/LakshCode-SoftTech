package Com.LakshCode.SoftTech.controller;

import Com.LakshCode.SoftTech.dto.ApiResponse;
import Com.LakshCode.SoftTech.entity.Blog;
import Com.LakshCode.SoftTech.repository.BlogRepository;
import Com.LakshCode.SoftTech.security.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogRepository blogRepo;
    private final CloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Blog>>> getPublished() {
        return ResponseEntity.ok(ApiResponse.success(
                blogRepo.findByPublishedTrueOrderByCreatedAtDesc(),
                "Blogs fetched"));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Blog>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(
                blogRepo.findAll(), "All blogs fetched"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Blog>> getById(@PathVariable Long id) {
        return blogRepo.findById(id)
                .map(b -> ResponseEntity.ok(ApiResponse.success(b, "Blog fetched")))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Blog>> create(
            @RequestParam("title") String title,
            @RequestParam(value = "content", required = false) String content,
            @RequestParam(value = "excerpt", required = false) String excerpt,
            @RequestParam(value = "published", defaultValue = "false") Boolean published,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail)
            throws IOException {

        Blog blog = new Blog();
        blog.setTitle(title);
        blog.setContent(content);
        blog.setExcerpt(excerpt);
        blog.setPublished(published);

        if (thumbnail != null && !thumbnail.isEmpty()) {
            String url = cloudinaryService.uploadImage(thumbnail, "blogs");
            blog.setThumbnailUrl(url);
        }

        return ResponseEntity.ok(ApiResponse.success(
                blogRepo.save(blog), "Blog created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Blog>> update(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam(value = "content", required = false) String content,
            @RequestParam(value = "excerpt", required = false) String excerpt,
            @RequestParam(value = "published", defaultValue = "false") Boolean published,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail)
            throws IOException {

        return blogRepo.findById(id).map(b -> {
            b.setTitle(title);
            b.setContent(content);
            b.setExcerpt(excerpt);
            b.setPublished(published);
            b.setUpdatedAt(LocalDateTime.now());

            if (thumbnail != null && !thumbnail.isEmpty()) {
                try {
                    if (b.getThumbnailUrl() != null) {
                        cloudinaryService.deleteImage(b.getThumbnailUrl());
                    }
                    String url = cloudinaryService.uploadImage(thumbnail, "blogs");
                    b.setThumbnailUrl(url);
                } catch (IOException e) {
                    throw new RuntimeException("Thumbnail upload failed: " + e.getMessage());
                }
            }

            return ResponseEntity.ok(ApiResponse.success(
                    blogRepo.save(b), "Blog updated"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<ApiResponse<Blog>> togglePublish(@PathVariable Long id) {
        return blogRepo.findById(id).map(b -> {
            b.setPublished(!b.getPublished());
            b.setUpdatedAt(LocalDateTime.now());
            return ResponseEntity.ok(ApiResponse.success(
                    blogRepo.save(b), "Blog publish toggled"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        blogRepo.findById(id).ifPresent(b -> {
            if (b.getThumbnailUrl() != null) {
                cloudinaryService.deleteImage(b.getThumbnailUrl());
            }
            blogRepo.delete(b);
        });
        return ResponseEntity.ok(ApiResponse.success(null, "Blog deleted"));
    }
}
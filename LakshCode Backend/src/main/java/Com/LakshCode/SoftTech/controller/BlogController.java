package Com.LakshCode.SoftTech.controller;

import Com.LakshCode.SoftTech.dto.ApiResponse;
import Com.LakshCode.SoftTech.entity.Blog;
import Com.LakshCode.SoftTech.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogRepository blogRepo;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Blog>>> getPublished() {
        return ResponseEntity.ok(ApiResponse.success(
                blogRepo.findByPublishedTrueOrderByCreatedAtDesc(), "Blogs fetched"));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Blog>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(blogRepo.findAll(), "All blogs fetched"));
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
            @RequestParam("content") String content,
            @RequestParam(value = "excerpt", required = false) String excerpt,
            @RequestParam(value = "published", defaultValue = "false") Boolean published,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail) throws IOException {

        Blog blog = new Blog();
        blog.setTitle(title);
        blog.setContent(content);
        blog.setExcerpt(excerpt);
        blog.setPublished(published);
        if (thumbnail != null && !thumbnail.isEmpty()) {
            blog.setThumbnailUrl(saveFile(thumbnail));
        }
        return ResponseEntity.ok(ApiResponse.success(blogRepo.save(blog), "Blog created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Blog>> update(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "excerpt", required = false) String excerpt,
            @RequestParam(value = "published", defaultValue = "false") Boolean published,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail) throws IOException {

        return blogRepo.findById(id).map(b -> {
            b.setTitle(title);
            b.setContent(content);
            b.setExcerpt(excerpt);
            b.setPublished(published);
            b.setUpdatedAt(LocalDateTime.now());
            if (thumbnail != null && !thumbnail.isEmpty()) {
                try { b.setThumbnailUrl(saveFile(thumbnail)); } catch (IOException e) { throw new RuntimeException(e); }
            }
            return ResponseEntity.ok(ApiResponse.success(blogRepo.save(b), "Blog updated"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<ApiResponse<Blog>> togglePublish(@PathVariable Long id) {
        return blogRepo.findById(id).map(b -> {
            b.setPublished(!b.getPublished());
            b.setUpdatedAt(LocalDateTime.now());
            return ResponseEntity.ok(ApiResponse.success(blogRepo.save(b), "Blog publish toggled"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        blogRepo.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Blog deleted"));
    }

    private String saveFile(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get("uploads/blogs");
        Files.createDirectories(path);
        Files.copy(file.getInputStream(), path.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/blogs/" + filename;
    }
}
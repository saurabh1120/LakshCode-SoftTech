package Com.LakshCode.SoftTech.controller;

import Com.LakshCode.SoftTech.dto.ApiResponse;
import Com.LakshCode.SoftTech.entity.Project;
import Com.LakshCode.SoftTech.repository.ProjectRepository;
import Com.LakshCode.SoftTech.security.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepo;
    private final CloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Project>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(
                projectRepo.findByActiveTrueOrderByDisplayOrderAsc(),
                "Projects fetched"));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Project>>> getAllAdmin() {
        return ResponseEntity.ok(ApiResponse.success(
                projectRepo.findAll(), "All projects fetched"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Project>> getById(@PathVariable Long id) {
        return projectRepo.findById(id)
                .map(p -> ResponseEntity.ok(ApiResponse.success(p, "Project fetched")))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Project>> create(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam(value = "techStack", required = false) String techStack,
            @RequestParam(value = "features", required = false) String features,
            @RequestParam(value = "liveLink", required = false) String liveLink,
            @RequestParam(value = "displayOrder", defaultValue = "0") Integer displayOrder,
            @RequestParam(value = "active", defaultValue = "true") Boolean active,
            @RequestParam(value = "image", required = false) MultipartFile image)
            throws IOException {

        Project project = new Project();
        project.setTitle(title);
        project.setDescription(description);
        project.setTechStack(techStack);
        project.setFeatures(features);
        project.setLiveLink(liveLink);
        project.setDisplayOrder(displayOrder);
        project.setActive(active);

        // Upload to Cloudinary instead of local storage
        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(image, "projects");
            project.setImageUrl(imageUrl);
        }

        return ResponseEntity.ok(ApiResponse.success(
                projectRepo.save(project), "Project created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Project>> update(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam(value = "techStack", required = false) String techStack,
            @RequestParam(value = "features", required = false) String features,
            @RequestParam(value = "liveLink", required = false) String liveLink,
            @RequestParam(value = "displayOrder", defaultValue = "0") Integer displayOrder,
            @RequestParam(value = "active", defaultValue = "true") Boolean active,
            @RequestParam(value = "image", required = false) MultipartFile image)
            throws IOException {

        return projectRepo.findById(id).map(p -> {
            p.setTitle(title);
            p.setDescription(description);
            p.setTechStack(techStack);
            p.setFeatures(features);
            p.setLiveLink(liveLink);
            p.setDisplayOrder(displayOrder);
            p.setActive(active);

            if (image != null && !image.isEmpty()) {
                try {
                    // Delete old image from Cloudinary
                    if (p.getImageUrl() != null) {
                        cloudinaryService.deleteImage(p.getImageUrl());
                    }
                    // Upload new image
                    String imageUrl = cloudinaryService.uploadImage(image, "projects");
                    p.setImageUrl(imageUrl);
                } catch (IOException e) {
                    throw new RuntimeException("Image upload failed: " + e.getMessage());
                }
            }

            return ResponseEntity.ok(ApiResponse.success(
                    projectRepo.save(p), "Project updated"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        projectRepo.findById(id).ifPresent(p -> {
            if (p.getImageUrl() != null) {
                cloudinaryService.deleteImage(p.getImageUrl());
            }
            projectRepo.delete(p);
        });
        return ResponseEntity.ok(ApiResponse.success(null, "Project deleted"));
    }
}
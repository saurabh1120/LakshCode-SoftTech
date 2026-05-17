package Com.LakshCode.SoftTech.controller;

import Com.LakshCode.SoftTech.dto.ApiResponse;
import Com.LakshCode.SoftTech.entity.Project;
import Com.LakshCode.SoftTech.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepo;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Project>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(
                projectRepo.findByActiveTrueOrderByDisplayOrderAsc(), "Projects fetched"));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Project>>> getAllAdmin() {
        return ResponseEntity.ok(ApiResponse.success(projectRepo.findAll(), "All projects fetched"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Project>> create(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam(value = "techStack", required = false) String techStack,
            @RequestParam(value = "features", required = false) String features,
            @RequestParam(value = "liveLink", required = false) String liveLink,
            @RequestParam(value = "displayOrder", defaultValue = "0") Integer displayOrder,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        Project project = new Project();
        project.setTitle(title);
        project.setDescription(description);
        project.setTechStack(techStack);
        project.setFeatures(features);
        project.setLiveLink(liveLink);
        project.setDisplayOrder(displayOrder);

        if (image != null && !image.isEmpty()) {
            project.setImageUrl(saveFile(image));
        }

        return ResponseEntity.ok(ApiResponse.success(projectRepo.save(project), "Project created"));
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
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        return projectRepo.findById(id).map(p -> {
            p.setTitle(title);
            p.setDescription(description);
            p.setTechStack(techStack);
            p.setFeatures(features);
            p.setLiveLink(liveLink);
            p.setDisplayOrder(displayOrder);
            p.setActive(active);
            if (image != null && !image.isEmpty()) {
                try { p.setImageUrl(saveFile(image)); } catch (IOException e) { throw new RuntimeException(e); }
            }
            return ResponseEntity.ok(ApiResponse.success(projectRepo.save(p), "Project updated"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        projectRepo.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Project deleted"));
    }

    private String saveFile(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get("uploads/projects");
        Files.createDirectories(uploadPath);
        Files.copy(file.getInputStream(), uploadPath.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/projects/" + filename;
    }
}
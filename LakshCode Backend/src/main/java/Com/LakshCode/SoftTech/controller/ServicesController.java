package Com.LakshCode.SoftTech.controller;

import Com.LakshCode.SoftTech.dto.ApiResponse;
import Com.LakshCode.SoftTech.entity.Service;
import Com.LakshCode.SoftTech.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServicesController {

    private final ServiceRepository serviceRepo;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Service>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(
                serviceRepo.findByActiveTrueOrderByDisplayOrderAsc(), "Services fetched"));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Service>>> getAllAdmin() {
        return ResponseEntity.ok(ApiResponse.success(
                serviceRepo.findAll(), "All services fetched"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Service>> create(@RequestBody Service service) {
        return ResponseEntity.ok(ApiResponse.success(serviceRepo.save(service), "Service created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Service>> update(@PathVariable Long id,
                                                       @RequestBody Service updated) {
        return serviceRepo.findById(id).map(s -> {
            s.setTitle(updated.getTitle());
            s.setDescription(updated.getDescription());
            s.setIcon(updated.getIcon());
            s.setDisplayOrder(updated.getDisplayOrder());
            s.setActive(updated.getActive());
            return ResponseEntity.ok(ApiResponse.success(serviceRepo.save(s), "Service updated"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        serviceRepo.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Service deleted"));
    }
}
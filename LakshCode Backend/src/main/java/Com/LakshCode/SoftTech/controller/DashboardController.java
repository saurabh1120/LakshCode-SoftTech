package Com.LakshCode.SoftTech.controller;

import Com.LakshCode.SoftTech.dto.ApiResponse;
import Com.LakshCode.SoftTech.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final ServiceRepository serviceRepo;
    private final ProjectRepository projectRepo;
    private final BlogRepository blogRepo;
    private final InquiryRepository inquiryRepo;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getStats() {
        Map<String, Long> stats = Map.of(
                "totalServices", serviceRepo.count(),
                "totalProjects", projectRepo.count(),
                "totalBlogs", blogRepo.count(),
                "totalInquiries", inquiryRepo.count(),
                "newInquiries", inquiryRepo.countByStatus("NEW")
        );
        return ResponseEntity.ok(ApiResponse.success(stats, "Stats fetched"));
    }
}
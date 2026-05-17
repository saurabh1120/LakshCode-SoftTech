package Com.LakshCode.SoftTech.controller;

import Com.LakshCode.SoftTech.dto.ApiResponse;
import Com.LakshCode.SoftTech.dto.InquiryRequest;
import Com.LakshCode.SoftTech.entity.Inquiry;
import Com.LakshCode.SoftTech.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryRepository inquiryRepo;

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<Inquiry>> submit(@RequestBody InquiryRequest req) {
        Inquiry inquiry = new Inquiry();
        inquiry.setName(req.getName());
        inquiry.setEmail(req.getEmail());
        inquiry.setPhone(req.getPhone());
        inquiry.setRequirement(req.getRequirement());
        inquiry.setBudget(req.getBudget());
        inquiry.setMessage(req.getMessage());
        return ResponseEntity.ok(ApiResponse.success(inquiryRepo.save(inquiry),
                "Inquiry submitted successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Inquiry>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(
                inquiryRepo.findAllByOrderByCreatedAtDesc(), "Inquiries fetched"));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<Inquiry>>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(ApiResponse.success(
                inquiryRepo.findByStatusOrderByCreatedAtDesc(status), "Inquiries fetched"));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Inquiry>> updateStatus(@PathVariable Long id,
                                                             @RequestBody Map<String, String> body) {
        return inquiryRepo.findById(id).map(i -> {
            i.setStatus(body.get("status"));
            return ResponseEntity.ok(ApiResponse.success(inquiryRepo.save(i), "Status updated"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/notes")
    public ResponseEntity<ApiResponse<Inquiry>> updateNotes(@PathVariable Long id,
                                                            @RequestBody Map<String, String> body) {
        return inquiryRepo.findById(id).map(i -> {
            i.setNotes(body.get("notes"));
            return ResponseEntity.ok(ApiResponse.success(inquiryRepo.save(i), "Notes updated"));
        }).orElse(ResponseEntity.notFound().build());
    }
}

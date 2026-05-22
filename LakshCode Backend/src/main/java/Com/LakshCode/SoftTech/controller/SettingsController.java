package Com.LakshCode.SoftTech.controller;

import Com.LakshCode.SoftTech.dto.ApiResponse;
import Com.LakshCode.SoftTech.entity.SiteSettings;
import Com.LakshCode.SoftTech.repository.SiteSettingsRepository;
import Com.LakshCode.SoftTech.security.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final SiteSettingsRepository settingsRepo;
    private final CloudinaryService cloudinaryService;

    private SiteSettings getOrCreate() {
        List<SiteSettings> all = settingsRepo.findAll();
        if (!all.isEmpty()) {
            return all.get(0);
        }
        SiteSettings fresh = new SiteSettings();
        fresh.setCompanyName("LakshCode SoftTech");
        fresh.setEmail("contact@lakshcode.com");
        fresh.setFooterTagline("Building Digital Futures");
        fresh.setPrimaryColor("#0ea5e9");
        return settingsRepo.save(fresh);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<SiteSettings>> get() {
        return ResponseEntity.ok(
                ApiResponse.success(getOrCreate(), "Settings fetched")
        );
    }

    @PutMapping
    public ResponseEntity<ApiResponse<SiteSettings>> update(
            @RequestBody SiteSettings updated) {
        SiteSettings s = getOrCreate();
        if (updated.getCompanyName() != null) s.setCompanyName(updated.getCompanyName());
        if (updated.getEmail() != null) s.setEmail(updated.getEmail());
        if (updated.getPhone() != null) s.setPhone(updated.getPhone());
        if (updated.getWhatsapp() != null) s.setWhatsapp(updated.getWhatsapp());
        if (updated.getAddress() != null) s.setAddress(updated.getAddress());
        if (updated.getFacebookUrl() != null) s.setFacebookUrl(updated.getFacebookUrl());
        if (updated.getInstagramUrl() != null) s.setInstagramUrl(updated.getInstagramUrl());
        if (updated.getLinkedinUrl() != null) s.setLinkedinUrl(updated.getLinkedinUrl());
        if (updated.getGithubUrl() != null) s.setGithubUrl(updated.getGithubUrl());
        if (updated.getTwitterUrl() != null) s.setTwitterUrl(updated.getTwitterUrl());
        if (updated.getFooterTagline() != null) s.setFooterTagline(updated.getFooterTagline());
        if (updated.getSeoTitle() != null) s.setSeoTitle(updated.getSeoTitle());
        if (updated.getSeoDescription() != null) s.setSeoDescription(updated.getSeoDescription());
        if (updated.getSeoKeywords() != null) s.setSeoKeywords(updated.getSeoKeywords());
        if (updated.getPrimaryColor() != null) s.setPrimaryColor(updated.getPrimaryColor());
        s.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(
                ApiResponse.success(settingsRepo.save(s), "Settings saved")
        );
    }

    @PostMapping("/logo")
    public ResponseEntity<ApiResponse<String>> uploadLogo(
            @RequestParam("logo") MultipartFile file) throws IOException {

        String url = cloudinaryService.uploadImage(file, "logo");

        SiteSettings s = settingsRepo.findAll()
                .stream().findFirst().orElse(new SiteSettings());
        s.setLogoUrl(url);
        settingsRepo.save(s);

        return ResponseEntity.ok(ApiResponse.success(url, "Logo uploaded"));
    }
}


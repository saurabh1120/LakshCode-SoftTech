package Com.LakshCode.SoftTech.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "site_settings")
public class SiteSettings {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String companyName;
    private String email;
    private String phone;
    private String whatsapp;
    @Column(columnDefinition = "TEXT")
    private String address;
    private String facebookUrl;
    private String instagramUrl;
    private String linkedinUrl;
    private String githubUrl;
    private String twitterUrl;
    @Column(columnDefinition = "TEXT")
    private String footerTagline;
    @Column(length = 300)
    private String seoTitle;
    @Column(columnDefinition = "TEXT")
    private String seoDescription;
    @Column(columnDefinition = "TEXT")
    private String seoKeywords;
    @Column(length = 500)
    private String logoUrl;
    private String primaryColor = "#0ea5e9";
    private LocalDateTime updatedAt = LocalDateTime.now();
}
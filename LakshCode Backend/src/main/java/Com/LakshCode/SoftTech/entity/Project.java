package Com.LakshCode.SoftTech.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "projects")
public class Project {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(length = 500)
    private String techStack;
    @Column(columnDefinition = "TEXT")
    private String features;
    @Column(length = 500)
    private String liveLink;
    @Column(length = 500)
    private String imageUrl;
    private Integer displayOrder = 0;
    private Boolean active = true;
    private LocalDateTime createdAt = LocalDateTime.now();
}
package Com.LakshCode.SoftTech.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "blogs")
public class Blog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 300)
    private String title;
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    @Column(columnDefinition = "TEXT")
    private String excerpt;
    @Column(length = 500)
    private String thumbnailUrl;
    private Boolean published = false;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}

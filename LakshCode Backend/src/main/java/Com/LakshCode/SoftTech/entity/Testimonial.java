package Com.LakshCode.SoftTech.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "testimonials")
public class Testimonial {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clientName;
    private String company;
    @Column(columnDefinition = "TEXT")
    private String message;
    private Integer rating = 5;
    @Column(length = 500)
    private String avatarUrl;
    private Boolean active = true;
    private LocalDateTime createdAt = LocalDateTime.now();
}
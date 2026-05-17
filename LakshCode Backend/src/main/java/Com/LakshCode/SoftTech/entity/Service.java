package Com.LakshCode.SoftTech.entity;


import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "services")
public class Service {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String icon;
    private Integer displayOrder = 0;
    private Boolean active = true;
    private LocalDateTime createdAt = LocalDateTime.now();
}
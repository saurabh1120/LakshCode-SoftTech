package Com.LakshCode.SoftTech.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "inquiries")
public class Inquiry {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String phone;
    @Column(columnDefinition = "TEXT")
    private String requirement;
    private String budget;
    @Column(columnDefinition = "TEXT")
    private String message;
    private String status = "NEW";
    @Column(columnDefinition = "TEXT")
    private String notes;
    private LocalDateTime createdAt = LocalDateTime.now();
}
package Com.LakshCode.SoftTech.repository;

import Com.LakshCode.SoftTech.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
    List<Testimonial> findByActiveTrueOrderByCreatedAtDesc();
}
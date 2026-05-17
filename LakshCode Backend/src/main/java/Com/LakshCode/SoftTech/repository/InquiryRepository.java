package Com.LakshCode.SoftTech.repository;


import Com.LakshCode.SoftTech.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    List<Inquiry> findAllByOrderByCreatedAtDesc();
    List<Inquiry> findByStatusOrderByCreatedAtDesc(String status);
    long countByStatus(String status);
}
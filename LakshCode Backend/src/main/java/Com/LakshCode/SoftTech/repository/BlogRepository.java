package Com.LakshCode.SoftTech.repository;

import Com.LakshCode.SoftTech.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByPublishedTrueOrderByCreatedAtDesc();
}
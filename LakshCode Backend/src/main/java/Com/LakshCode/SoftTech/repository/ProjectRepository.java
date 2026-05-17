package Com.LakshCode.SoftTech.repository;


import Com.LakshCode.SoftTech.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByActiveTrueOrderByDisplayOrderAsc();
}
package Com.LakshCode.SoftTech.repository;

import Com.LakshCode.SoftTech.entity.SiteSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteSettingsRepository extends JpaRepository<SiteSettings, Long> {
}
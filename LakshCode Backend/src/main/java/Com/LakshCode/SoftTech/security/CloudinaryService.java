package Com.LakshCode.SoftTech.security;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public String uploadImage(MultipartFile file, String folder) throws IOException {
        Map<?, ?> result = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", "lakshcode/" + folder,
                        "resource_type", "auto",
                        "quality", "auto",
                        "fetch_format", "auto"
                )
        );
        return (String) result.get("secure_url");
    }

    public void deleteImage(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) {
            return;
        }
        try {
            int folderIndex = imageUrl.indexOf("lakshcode/");
            if (folderIndex == -1) {
                System.out.println("Image is not hosted in the lakshcode directory.");
                return;
            }
            String pathAndExtension = imageUrl.substring(folderIndex);
            String publicId = pathAndExtension.replaceAll("\\.[a-zA-Z0-9]+$", "");
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            System.out.println("Successfully deleted asset: " + publicId);

        } catch (Exception e) {
            System.err.println("Could not delete image from Cloudinary: " + e.getMessage());
        }
    }
}
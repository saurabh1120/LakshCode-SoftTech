package Com.LakshCode.SoftTech.dto;

import lombok.Data;

@Data
public class InquiryRequest {
    private String name;
    private String email;
    private String phone;
    private String requirement;
    private String budget;
    private String message;
}